"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, Link as LinkIcon, Database, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminAgentsPage() {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState<"idle" | "scraping" | "integrating" | "success" | "error">("idle");
  const [logs, setLogs] = useState<string[]>([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [toolData, setToolData] = useState<any>(null);

  const addLog = (msg: string) => setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);

  const handleRunAgents = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    
    setStatus("scraping");
    setLogs([]);
    setErrorMsg("");
    setToolData(null);
    addLog(`Agent 1 (Scraper) initialized for URL: ${url}`);

    try {
      // Step 1: Call Scraper Agent
      const scrapeRes = await fetch("/api/agents/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url })
      });
      
      const scrapeData = await scrapeRes.json();
      
      if (!scrapeRes.ok || !scrapeData.success) {
        throw new Error(scrapeData.error || "Failed to scrape the website.");
      }

      addLog(`Agent 1 successfully extracted data: ${scrapeData.data.name}`);
      addLog(`Agent 2 (Integrator) taking over... validating schema.`);
      setStatus("integrating");

      // Step 2: Call Integrator Agent
      const insertRes = await fetch("/api/agents/insert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(scrapeData.data)
      });

      const insertData = await insertRes.json();

      if (!insertRes.ok || !insertData.success) {
        throw new Error(insertData.error || "Integration schema validation failed.");
      }

      addLog(`Agent 2 successfully wrote to Database (all-tools.json).`);
      addLog(`Mission Accomplished. Tools directory updated safely.`);
      setToolData(insertData.tool);
      setStatus("success");
      setUrl("");

    } catch (err: any) {
      setErrorMsg(err.message);
      addLog(`ERROR: ${err.message}`);
      setStatus("error");
    }
  };

  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-6">
          <Bot className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-4xl font-extrabold mb-4">AI Agent Control Center</h1>
        <p className="text-muted-foreground text-lg">
          Deploy autonomous agents to scrape, parse, and safely integrate new AI tools into the directory.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="bg-card border-white/5 shadow-2xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16" />
          <CardHeader>
            <CardTitle>Deploy Agents</CardTitle>
            <CardDescription>Enter a tool's URL to begin the automated ingestion process.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRunAgents} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Target URL</label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input 
                    placeholder="https://example.ai" 
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="pl-10 bg-secondary/50"
                    disabled={status === "scraping" || status === "integrating"}
                    required
                    type="url"
                  />
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full gap-2 font-bold" 
                disabled={status === "scraping" || status === "integrating"}
              >
                {status === "scraping" && <><Loader2 className="h-4 w-4 animate-spin" /> Agent 1 Scraping...</>}
                {status === "integrating" && <><Loader2 className="h-4 w-4 animate-spin" /> Agent 2 Integrating...</>}
                {status === "idle" || status === "success" || status === "error" ? <><Bot className="h-4 w-4" /> Start Ingestion</> : null}
              </Button>
            </form>

            <div className="mt-8">
              <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                <Database className="h-4 w-4 text-muted-foreground" /> System Architecture
              </h3>
              <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2 p-2 rounded bg-secondary/30">
                  <Badge variant="outline">Agent 1</Badge> OpenRouter + Cheerio (Web Scraper)
                </div>
                <div className="flex items-center gap-2 p-2 rounded bg-secondary/30">
                  <Badge variant="outline">Agent 2</Badge> Zod + JSON (Safe DB Integrator)
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black border-white/10 font-mono flex flex-col h-[400px]">
          <CardHeader className="border-b border-white/5 pb-3">
            <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Terminal Output
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-2 text-xs md:text-sm">
            {logs.length === 0 && <span className="text-muted-foreground/50">Waiting for deployment...</span>}
            {logs.map((log, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -10 }} 
                animate={{ opacity: 1, x: 0 }}
                className={log.includes("ERROR") ? "text-red-400" : log.includes("Accomplished") ? "text-green-400" : "text-gray-300"}
              >
                {log}
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </div>

      {toolData && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
          <Card className="bg-green-500/10 border-green-500/20">
            <CardContent className="p-6 flex items-start gap-4">
              <CheckCircle2 className="h-8 w-8 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-green-400 mb-2">Tool Successfully Integrated!</h3>
                <p className="text-muted-foreground mb-4">
                  <strong>{toolData.name}</strong> was successfully parsed and added to the directory.
                </p>
                <div className="flex gap-4">
                  <Button variant="outline" asChild className="border-green-500/30 text-green-400 hover:bg-green-500/20">
                    <a href={`/tool/${toolData.id}`} target="_blank">View Live Page</a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {errorMsg && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
          <Card className="bg-red-500/10 border-red-500/20">
            <CardContent className="p-6 flex items-start gap-4">
              <AlertCircle className="h-8 w-8 text-red-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-red-400 mb-2">Integration Failed</h3>
                <p className="text-muted-foreground">{errorMsg}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
