"use client";

import { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CATEGORIES } from "@/data/tools";
import allToolsData from "@/data/all-tools.json";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { VideoBackground } from "@/components/ui/VideoBackground";

// Helper to render dynamic Lucide icons
const IconComponent = ({ name, ...props }: { name: string, [key: string]: any }) => {
  const Icon = (LucideIcons as any)[name];
  return Icon ? <Icon {...props} /> : <LucideIcons.Box {...props} />;
};

// Text typing animation variants
const textVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.3 }
  })
};

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTools = allToolsData.filter((tool: any) =>
    tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 px-4 text-center hero-grid bg-background border-b border-white/5">
        <VideoBackground />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(202,138,4,0.15),transparent_70%)] pointer-events-none" />
        <div className="container relative z-10 mx-auto max-w-4xl flex flex-col items-center">
          <Badge variant="outline" className="mb-6 bg-primary/10 text-primary border-primary/30 px-4 py-1.5 text-sm font-medium">
            🚀 {allToolsData.length}+ AI Tools & Growing Weekly
          </Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Find the Best <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary to-yellow-500">AI Tools</span><br />
            for Your Work
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Search, filter and discover the perfect AI solution across {CATEGORIES.length} categories — all in one place.
          </p>
          
          <div className="w-full max-w-2xl mx-auto">
            <div className="relative flex items-center bg-card rounded-full p-2 shadow-2xl border border-white/10 transition-all focus-within:ring-2 focus-within:ring-primary/50">
              <Search className="absolute left-6 h-5 w-5 text-muted-foreground" />
              <Input 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search AI tools, categories, use cases..."
                className="flex-1 bg-transparent border-0 focus-visible:ring-0 px-14 text-base h-12 shadow-none"
              />
              <Button size="lg" className="rounded-full px-8 font-bold" onClick={() => {}}>Search</Button>
            </div>
            
            <div className="flex flex-wrap gap-2 justify-center mt-6">
              {['ChatGPT', 'Image Generation', 'Code', 'Healthcare', 'freemium'].map(tag => (
                <Badge 
                  key={tag} 
                  variant="secondary" 
                  className="cursor-pointer hover:bg-primary/20 hover:text-primary transition-colors py-1.5 px-4"
                  onClick={() => setSearchTerm(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <div className="bg-card border-b border-white/5 py-8">
        <div className="container mx-auto px-4 flex flex-wrap justify-center gap-12 md:gap-24 text-center">
          <div><strong className="block text-3xl font-black text-primary">{allToolsData.length}</strong><span className="text-sm text-muted-foreground uppercase tracking-widest font-semibold mt-1">AI Tools</span></div>
          <div><strong className="block text-3xl font-black text-primary">{CATEGORIES.length}</strong><span className="text-sm text-muted-foreground uppercase tracking-widest font-semibold mt-1">Categories</span></div>
          <div><strong className="block text-3xl font-black text-primary">10K+</strong><span className="text-sm text-muted-foreground uppercase tracking-widest font-semibold mt-1">Users</span></div>
          <div><strong className="block text-3xl font-black text-primary">Weekly</strong><span className="text-sm text-muted-foreground uppercase tracking-widest font-semibold mt-1">Updates</span></div>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-20 container mx-auto px-4">
        {searchTerm ? (
          <div>
            <h2 className="text-2xl font-bold mb-8">Search Results for "{searchTerm}"</h2>
            {filteredTools.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredTools.map((tool: any, i: number) => (
                  <motion.div key={tool.id} initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: i * 0.05}}>
                    <Link href={`/tool/${tool.id}`}>
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
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 text-muted-foreground">
                <p className="text-xl">No tools found matching your search.</p>
              </div>
            )}
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-end mb-10">
              <div>
                <h2 className="text-3xl font-extrabold">Browse Categories</h2>
                <p className="text-muted-foreground mt-2">Find the exact tool you need by industry or function.</p>
              </div>
              <Link href="/categories" className="text-primary hover:underline font-medium hidden md:block">
                View All Categories →
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {CATEGORIES.map((cat, i) => (
                <motion.div key={cat.id} initial={{opacity: 0, scale: 0.95}} animate={{opacity: 1, scale: 1}} transition={{delay: i * 0.05}}>
                  <Link href={`/category/${cat.id}`}>
                    <Card className="hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer border-white/5 group h-full">
                      <CardContent className="p-6 text-center flex flex-col items-center justify-center">
                        <div className="mb-4 text-primary bg-primary/10 p-4 rounded-2xl group-hover:scale-110 group-hover:bg-primary group-hover:text-black transition-all duration-300">
                          <IconComponent name={cat.icon} className="h-8 w-8" />
                        </div>
                        <h3 className="font-bold text-sm text-foreground group-hover:text-primary flex">
                          {cat.name.split('').map((char, index) => (
                            <motion.span
                              key={index}
                              custom={index}
                              initial="hidden"
                              whileInView="visible"
                              viewport={{ once: true }}
                              variants={textVariants}
                            >
                              {char === ' ' ? '\u00A0' : char}
                            </motion.span>
                          ))}
                        </h3>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-24">
              <h2 className="text-3xl font-extrabold mb-10">Featured Tools</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allToolsData.slice(0, 6).map((tool: any, i: number) => (
                  <motion.div key={tool.id} initial={{opacity: 0, y: 20}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}}>
                    <Link href={`/tool/${tool.id}`}>
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
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
