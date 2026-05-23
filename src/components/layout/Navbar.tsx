"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { LogOut, LayoutDashboard } from "lucide-react";

export function Navbar() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for changes on auth state (log in, log out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 glass-effect">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">⚡</span>
          <span className="text-xl font-bold tracking-tight text-primary">AiToolMantra</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">Directory</Link>
          <Link href="/categories" className="hover:text-foreground transition-colors">Categories</Link>
          <Link href="/about" className="hover:text-foreground transition-colors">About</Link>
        </nav>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link href="/admin">
                <Button variant="outline" className="hidden sm:flex gap-2 border-primary/30 text-primary">
                  <LayoutDashboard className="h-4 w-4" /> Admin Dashboard
                </Button>
              </Link>
              <Button variant="ghost" onClick={handleLogout} className="text-muted-foreground hover:text-destructive">
                <LogOut className="h-4 w-4 mr-2" /> Log out
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" className="hidden sm:inline-flex">Log in</Button>
              </Link>
              <Link href="/signup">
                <Button className="hover-glow">Submit Tool</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
