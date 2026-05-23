import { NextResponse } from "next/server";
import * as cheerio from "cheerio";
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY || "dummy-key",
});

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Step 1: Scrape the website
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: `Failed to fetch URL: ${response.statusText}` }, { status: 400 });
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Clean up unnecessary tags
    $("script, style, nav, footer, iframe, noscript").remove();
    const cleanText = $("body").text().replace(/\s+/g, " ").trim().slice(0, 15000); // Limit context length

    // Step 2: Use LLM to extract structured data
    const completion = await openai.chat.completions.create({
      model: process.env.OPENROUTER_MODEL || "meta-llama/llama-3.1-8b-instruct:free", // Use ENV or reliable free fallback
      messages: [
        {
          role: "system",
          content: `You are an expert AI tool directory curator. 
Extract information from the provided website text and return it strictly as a JSON object matching this schema:
{
  "id": "kebab-case-name",
  "name": "Tool Name",
  "category": "One of: nlp, ml, healthcare, finance, creative, analytics, cybersec, education, gaming, autonomous, marketing, customer",
  "tag": "freemium or paid or free or open-source",
  "emoji": "A single relevant emoji",
  "desc": "A concise 2-sentence description of what the tool does.",
  "page": "tool-id.html",
  "details": {
    "visitUrl": "The URL of the tool",
    "logoUrl": "",
    "sections": {
      "about": "A detailed 1-2 paragraph description.",
      "key_features": ["Feature 1", "Feature 2", "Feature 3"],
      "use_cases": ["Use Case 1", "Use Case 2"],
      "pros": ["Pro 1", "Pro 2"],
      "cons": ["Con 1", "Con 2"],
      "pricing": "Summary of pricing",
      "target_users": "Who is this for?"
    }
  }
}
Return ONLY valid JSON. No markdown formatting, no explanations.`,
        },
        {
          role: "user",
          content: `Website URL: ${url}\nWebsite Text: ${cleanText}`,
        },
      ],
      response_format: { type: "json_object" },
    });

    const aiResponse = completion.choices[0]?.message?.content || "{}";
    
    // Parse the JSON safely
    let parsedData;
    try {
      // Clean potential markdown blocks if the model ignored instructions
      const cleanJson = aiResponse.replace(/```json/g, "").replace(/```/g, "").trim();
      parsedData = JSON.parse(cleanJson);
      
      // Ensure visitUrl is correct
      if (parsedData.details && !parsedData.details.visitUrl) {
        parsedData.details.visitUrl = url;
      }
    } catch (e) {
      console.error("Failed to parse LLM JSON:", aiResponse);
      return NextResponse.json({ error: "LLM failed to return valid JSON" }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: parsedData });
  } catch (error: any) {
    console.error("Scraping error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
