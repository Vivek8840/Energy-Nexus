import { useState, useEffect } from "react";
import Card, { CardContent } from "@/components/ui/Card";
import { TrendingUp, Leaf, Home, IndianRupee, Zap } from "lucide-react";

interface CounterProps {
  target: number;
  suffix: string;
  prefix?: string;
  icon: React.ReactNode;
  label: string;
  color: string;
}

function AnimatedCounter({ target, suffix, prefix = "", icon, label, color }: CounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60; // 60 frames for smooth animation
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <Card className="hover-elevate text-center p-6 transition-all duration-300">
      <CardContent className="p-6">
        <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${
          color === 'green'
            ? 'bg-green-100 dark:bg-green-900/20'
            : color === 'blue'
              ? 'bg-blue-100 dark:bg-blue-900/20'
              : 'bg-purple-100 dark:bg-purple-900/20'
        }`}>
          {icon}
        </div>
        <div className="text-4xl font-bold font-mono mb-2 text-foreground" data-testid={`counter-${label.toLowerCase().replace(/\s+/g, '-')}`}>
          {prefix}{count.toLocaleString()}{suffix}
        </div>
        <div className="text-muted-foreground font-medium">{label}</div>
      </CardContent>
    </Card>
  );
}

export function ImpactCounter() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation when component mounts
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const impactData = [
    {
      target: 150000,
      suffix: "+",
      prefix: "₹ ",
      icon: <IndianRupee className="w-8 h-8 text-green-600" />,
      label: "Total Community Earnings",
      color: "green"
    },
    {
      target: 5000,
      suffix: "+ Kg",
      icon: <Leaf className="w-8 h-8 text-blue-600" />,
      label: "CO₂ Reduced",
      color: "blue"
    },
    {
      target: 200,
      suffix: "+",
      icon: <Home className="w-8 h-8 text-purple-600" />,
      label: "Homes Powered",
      color: "purple"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-green-600/10 rounded-full border border-green-600/20 mb-4">
            <TrendingUp className="w-4 h-4 text-green-600 mr-2" />
            <span className="text-green-600 font-medium text-sm">COMMUNITY IMPACT</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            The Power of <span className="text-primary">Collective Action</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Every energy trade on EnergyNexus contributes to a larger movement. Together, we're not just saving money - we're building a sustainable future.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {impactData.map((data, index) => (
            <div key={index} className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <AnimatedCounter {...data} />
            </div>
          ))}
        </div>

        <div className="mt-16 max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-primary/10 to-green-500/10 border-primary/20">
            <CardContent className="p-8 text-center">
              <Zap className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">
                More Than a Business - A Social Movement
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl mx-auto">
                EnergyNexus isn't just transforming individual energy bills. We're creating a decentralized,
                community-driven grid that reduces dependence on fossil fuels, empowers local energy
                producers, and builds climate resilience one solar panel at a time.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 text-sm">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                  <div className="text-left">
                    <div className="font-semibold text-foreground">Environmental Impact</div>
                    <div className="text-muted-foreground">Each kWh traded replaces grid electricity, reducing carbon emissions</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <div className="text-left">
                    <div className="font-semibold text-foreground">Economic Empowerment</div>
                    <div className="text-muted-foreground">Local energy trading keeps money in the community</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                  <div className="text-left">
                    <div className="font-semibold text-foreground">Grid Resilience</div>
                    <div className="text-muted-foreground">Distributed energy reduces strain on centralized infrastructure</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0" />
                  <div className="text-left">
                    <div className="font-semibold text-foreground">Energy Democracy</div>
                    <div className="text-muted-foreground">Every citizen becomes an active participant in energy transition</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
