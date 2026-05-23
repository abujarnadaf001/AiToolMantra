export function VideoBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* 4K Cinematic Video Background */}
      {/* This automatically looks for "dragon.mp4" in your public folder */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-80"
      >
        <source src="/dragon.webm" type="video/webm" />
      </video>

      {/* Dark overlay gradient to ensure your white text remains perfectly readable against bright fire */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30 z-10 mix-blend-multiply" />
      
      {/* Subtle cinematic vignette (darkens the edges to focus on the center) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.8)_100%)] z-10" />
    </div>
  );
}
