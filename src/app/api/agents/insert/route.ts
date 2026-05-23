import { NextResponse } from "next/server";
import { z } from "zod";
import fs from "fs";
import path from "path";

// Strict Zod schema to prevent breaking the frontend
const toolSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  category: z.enum([
    "nlp", "ml", "healthcare", "finance", "creative", "analytics", 
    "cybersec", "education", "gaming", "autonomous", "marketing", "customer"
  ]).catch("nlp"),
  tag: z.string(),
  emoji: z.string(),
  desc: z.string(),
  page: z.string(),
  details: z.object({
    visitUrl: z.string(),
    logoUrl: z.string().optional().default(""),
    sections: z.object({
      about: z.string(),
      key_features: z.array(z.string()).default([]),
      use_cases: z.array(z.string()).default([]),
      pros: z.array(z.string()).default([]),
      cons: z.array(z.string()).default([]),
      pricing: z.string().optional(),
      target_users: z.string().optional(),
    }).passthrough()
  })
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Step 1: Validate data
    const validatedData = toolSchema.parse(body);

    // Step 2: Ensure ID uniqueness
    const dbPath = path.join(process.cwd(), "src", "data", "all-tools.json");
    
    let existingTools = [];
    try {
      const fileContent = fs.readFileSync(dbPath, "utf8");
      existingTools = JSON.parse(fileContent);
    } catch (e) {
      console.warn("Could not read all-tools.json, starting fresh.");
    }

    if (existingTools.some((t: any) => t.id === validatedData.id || t.details.visitUrl === validatedData.details.visitUrl)) {
      return NextResponse.json({ success: false, error: "Tool already exists in the database." }, { status: 409 });
    }

    // Step 3: Insert into "Database" (JSON file for now)
    existingTools.unshift(validatedData); // Add to the top
    fs.writeFileSync(dbPath, JSON.stringify(existingTools, null, 2));

    return NextResponse.json({ success: true, message: "Tool successfully integrated!", tool: validatedData });
  } catch (error: any) {
    console.error("Integration error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", details: (error as any).errors }, { status: 400 });
    }
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
