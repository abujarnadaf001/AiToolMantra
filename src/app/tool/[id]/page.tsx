import allToolsData from "@/data/all-tools.json";
import { CATEGORIES } from "@/data/tools";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, ShieldCheck, CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const tool = allToolsData.find((t: any) => t.id === id);
  if (!tool) return { title: "Not Found" };
  return { title: `${tool.name} — AiToolMantra` };
}

export default async function ToolPage({ params }: Props) {
  const { id } = await params;
  const tool = allToolsData.find((t: any) => t.id === id);

  if (!tool) {
    notFound();
  }

  const sections = tool.details?.sections || {};

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Directory
      </Link>
      
      <div className="bg-card border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden mb-8">
        <div className="absolute top-0 right-0 p-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
        
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
            {tool.details?.logoUrl ? (
              <img src={tool.details.logoUrl} alt={tool.name} className="w-24 h-24 rounded-2xl object-cover bg-white/5 border border-white/10" />
            ) : (
              <div className="text-6xl bg-primary/10 p-6 rounded-3xl border border-primary/20 flex items-center justify-center min-w-24 h-24">
                {tool.emoji || '🚀'}
              </div>
            )}
            
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge variant="outline" className="border-primary/30 text-primary uppercase tracking-wider">{tool.category}</Badge>
                <Badge variant="secondary" className="uppercase tracking-wider">{tool.tag}</Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{tool.name}</h1>
              <p className="text-xl text-muted-foreground leading-relaxed">{tool.desc}</p>
            </div>
          </div>
          
          <div className="my-10 h-px bg-white/10" />
          
          <div className="flex flex-col md:flex-row gap-6 justify-between items-center bg-secondary/30 p-6 rounded-2xl border border-white/5">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 text-green-500" />
              <span className="font-medium text-foreground">Verified by AiToolMantra</span>
            </div>
            {tool.details?.visitUrl && (
              <a href={tool.details.visitUrl} target="_blank" rel="noreferrer">
                <Button size="lg" className="w-full md:w-auto gap-2 hover-glow px-8 py-6 text-lg rounded-xl">
                  Visit {tool.name}
                  <ExternalLink className="h-5 w-5" />
                </Button>
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          {Object.entries(sections).map(([key, value]) => {
            if (key.includes('badge') || key.includes('pros') || key.includes('cons')) return null;
            
            const title = key.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
            return (
              <div key={key} className="bg-card border border-white/5 p-8 rounded-2xl">
                <h2 className="text-2xl font-bold mb-4 text-primary">{title}</h2>
                {Array.isArray(value) ? (
                  <ul className="space-y-3">
                    {value.map((item: string, i: number) => (
                      <li key={i} className="flex gap-3 text-muted-foreground">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {value as string}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="space-y-8">
          {sections.pros && (
            <div className="bg-card border border-white/5 p-6 rounded-2xl">
              <h3 className="text-xl font-bold mb-4 text-green-500">Pros</h3>
              <ul className="space-y-3">
                {(sections.pros as string[]).map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {sections.cons && (
            <div className="bg-card border border-white/5 p-6 rounded-2xl">
              <h3 className="text-xl font-bold mb-4 text-red-500">Cons</h3>
              <ul className="space-y-3">
                {(sections.cons as string[]).map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                    <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
