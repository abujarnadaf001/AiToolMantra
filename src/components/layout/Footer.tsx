export function Footer() {
  return (
    <footer className="border-t border-white/10 mt-auto pt-16 pb-8 bg-black">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          
          {/* Brand & Support Info */}
          <div>
            <div className="flex items-center mb-6">
              <span className="text-2xl mr-2">⚡</span>
              <span className="font-bold text-xl text-foreground tracking-tight">AURA AI</span>
            </div>
            
            <h3 className="text-lg font-semibold text-foreground mb-4">📞 Support & Contact</h3>
            <p className="text-muted-foreground mb-4 max-w-sm">
              Need help or want to report an issue? Reach out to us.
            </p>
            
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                <a href="mailto:support@yzservicelimited.com" className="hover:text-primary transition-colors">
                  support@yzservicelimited.com
                </a>
              </p>
              <p>
                <a href="https://www.aura-ai.in" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  www.aura-ai.in
                </a>
              </p>
            </div>
          </div>

          {/* Developer Info */}
          <div className="md:text-right flex flex-col md:items-end justify-center">
            <h3 className="text-lg font-semibold text-foreground mb-4">Developer Information</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="font-medium text-foreground/80">Abujar Nadaf</p>
              <p>YZ Service Limited</p>
              <div className="mt-4 pt-4 border-t border-white/10 inline-block md:ml-auto">
                <p className="font-medium text-foreground/80 mb-1">📍 Location</p>
                <p>KBPCOES, Satara</p>
                <p>Maharashtra, India</p>
              </div>
            </div>
          </div>

        </div>

        {/* Copyright Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground/60">
          <p>© 2025 AURA - YZ Service Limited. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Developed by Abujar Nadaf</p>
        </div>
      </div>
    </footer>
  );
}
