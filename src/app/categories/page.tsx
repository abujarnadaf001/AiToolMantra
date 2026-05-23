"use client";

import { CATEGORIES } from "@/data/tools";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";

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

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-6xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Browse Categories</h1>
        <p className="text-xl text-muted-foreground">Explore 15+ categories of AI tools tailored to your workflow.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {CATEGORIES.map((cat, i) => (
          <motion.div key={cat.id} initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: i * 0.05}}>
            <Link href={`/category/${cat.id}`}>
              <Card className="hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer border-white/5 group h-full bg-card">
                <CardContent className="p-8 text-center flex flex-col items-center justify-center">
                  <div className="mb-6 text-primary bg-primary/10 p-5 rounded-2xl group-hover:scale-110 group-hover:bg-primary group-hover:text-black transition-all duration-300">
                    <IconComponent name={cat.icon} className="h-10 w-10" />
                  </div>
                  <h3 className="font-bold text-lg text-foreground group-hover:text-primary flex">
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
                  <span className="text-sm text-muted-foreground mt-3 bg-white/5 px-3 py-1 rounded-full">{cat.count} tools</span>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
