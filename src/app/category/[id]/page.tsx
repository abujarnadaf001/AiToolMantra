import allToolsData from "@/data/all-tools.json";
import { CATEGORIES } from "@/data/tools";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";

// Helper to render dynamic Lucide icons
const IconComponent = ({ name, ...props }: { name: string, [key: string]: any }) => {
  const Icon = (LucideIcons as any)[name];
  return Icon ? <Icon {...props} /> : <LucideIcons.Box {...props} />;
};

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const category = CATEGORIES.find((c) => c.id === id);
  if (!category) return { title: "Not Found" };
  return { title: `${category.name} AI Tools — AiToolMantra` };
}

export default async function CategoryPage({ params }: Props) {
  const { id } = await params;
  const category = CATEGORIES.find((c) => c.id === id);

  if (!category) {
    notFound();
  }

  const categoryTools = allToolsData.filter((t: any) => t.category === id);

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <Link href="/categories" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Categories
      </Link>
      
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <div className="text-primary bg-primary/10 p-4 rounded-2xl">
            <IconComponent name={category.icon} className="h-10 w-10" />
          </div>
          <div>
            <h1 className="text-4xl font-extrabold">{category.name} AI Tools</h1>
            <p className="text-xl text-muted-foreground mt-2">Explore the best {categoryTools.length} tools for {category.name.toLowerCase()}.</p>
          </div>
        </div>
      </div>

      {categoryTools.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categoryTools.map((tool: any, i: number) => (
            <Link key={tool.id} href={`/tool/${tool.id}`}>
              <Card className="h-full hover:border-primary/50 transition-colors cursor-pointer group bg-card border-white/5">
                <CardContent className="p-6 flex flex-col items-start gap-4">
                  {tool.details?.logoUrl ? (
                    <img src={tool.details.logoUrl} alt={tool.name} className="w-12 h-12 rounded-lg object-cover bg-white/5 group-hover:scale-110 transition-transform" />
                  ) : (
                    <div className="text-3xl bg-primary/10 p-3 rounded-2xl group-hover:scale-110 transition-transform">
                      {tool.emoji || '🔧'}
                    </div>
                  )}
                  <div>
                    <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{tool.name}</h3>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{tool.desc}</p>
                  </div>
                  <Badge variant="outline" className="mt-auto">{tool.tag}</Badge>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-card rounded-2xl border border-white/5">
          <p className="text-xl text-muted-foreground mb-4">No tools found in this category yet.</p>
          <Link href="/">
            <Badge variant="secondary" className="px-6 py-2 text-base">Explore all tools</Badge>
          </Link>
        </div>
      )}
    </div>
  );
}
