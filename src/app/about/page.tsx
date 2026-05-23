import { Card, CardContent } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
          About <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary to-yellow-500">AiToolMantra</span>
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          Your ultimate directory for discovering, comparing, and mastering the best Artificial Intelligence tools on the market.
        </p>
      </div>

      <div className="grid gap-8">
        <Card className="bg-card border-white/5">
          <CardContent className="p-8 md:p-10">
            <h2 className="text-2xl font-bold mb-4 text-primary">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              The AI landscape is moving at lightning speed. Every day, dozens of new tools are launched, making it incredibly difficult to separate the signal from the noise. Our mission at AiToolMantra is to curate and organize the most impactful AI tools so you can find exactly what you need to boost your productivity, creativity, and business growth.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-white/5">
          <CardContent className="p-8 md:p-10">
            <h2 className="text-2xl font-bold mb-4 text-primary">What We Offer</h2>
            <ul className="space-y-4 text-lg text-muted-foreground leading-relaxed list-disc pl-5">
              <li><strong>Comprehensive Directory:</strong> 500+ hand-picked AI tools across 15+ categories.</li>
              <li><strong>Detailed Insights:</strong> In-depth breakdowns of features, pricing, pros, and cons for every tool.</li>
              <li><strong>Premium Experience:</strong> A lightning-fast, beautifully designed platform built for readability and ease of use.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
