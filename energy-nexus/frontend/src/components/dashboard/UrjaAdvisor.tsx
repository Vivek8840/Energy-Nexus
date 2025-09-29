import { useState, useEffect } from "react";
import Card, { CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { Brain, Lightbulb, AirVent, Zap, Droplets, Refrigerator, Tv } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

interface ProTip {
  icon: React.ReactNode;
  title: string;
  description: string;
  savings: string;
  color: string;
}

const proTips: ProTip[] = [
  {
    icon: <AirVent className="w-5 h-5" />,
    title: "AC Optimization",
    description: "Your AC is your biggest energy consumer. By running it at 24°C instead of 21°C, you can save up to 18% on your monthly electricity bill.",
    savings: "₹300/month",
    color: "blue"
  },
  {
    icon: <Droplets className="w-5 h-5" />,
    title: "Geyser Timing",
    description: "Your geyser's peak usage is at 8 AM. Shifting this to peak solar hours (12-3 PM) will let you use free energy and save an estimated ₹300 per month.",
    savings: "₹300/month",
    color: "orange"
  },
  {
    icon: <Refrigerator className="w-5 h-5" />,
    title: "Fridge Efficiency",
    description: "Your refrigerator runs 24/7. Setting it to 4°C instead of 2°C and defrosting regularly can reduce consumption by 15%.",
    savings: "₹180/month",
    color: "green"
  },
  {
    icon: <Tv className="w-5 h-5" />,
    title: "Entertainment System",
    description: "TVs and entertainment systems in standby mode consume 10-15W continuously. Using smart plugs can eliminate this phantom load.",
    savings: "₹150/month",
    color: "purple"
  },
  {
    icon: <Lightbulb className="w-5 h-5" />,
    title: "Lighting Optimization",
    description: "Switching to LED bulbs and using daylight sensors can reduce lighting costs by 60%. Consider smart switches for automated control.",
    savings: "₹120/month",
    color: "yellow"
  }
];

// Mock consumption data - todo: remove mock functionality
const consumptionData = [
  { name: 'AC', value: 45, color: '#3b82f6' },
  { name: 'Geyser', value: 20, color: '#f97316' },
  { name: 'Fridge', value: 15, color: '#10b981' },
  { name: 'Entertainment', value: 10, color: '#8b5cf6' },
  { name: 'Lighting', value: 5, color: '#eab308' },
  { name: 'Others', value: 5, color: '#6b7280' }
];

export function UrjaAdvisor() {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  // Rotate tips every 5 seconds - todo: remove mock functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTipIndex(prev => (prev + 1) % proTips.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentTip = proTips[currentTipIndex];

  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 to-green-500/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-4">
            <Brain className="w-4 h-4 text-primary mr-2" />
            <span className="text-primary font-medium text-sm">AI INTELLIGENCE</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Meet Your Personal <span className="text-primary">Urja Advisor</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            EnergyNexus is more than a marketplace. It's your personal AI assistant, working 24/7 to save you money and keep you prepared.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Energy Consumption Breakdown */}
          <Card className="hover-elevate">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                Your Energy Consumption Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={consumptionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {consumptionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-2">
                {consumptionData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span>{item.name}</span>
                    </div>
                    <span className="font-medium">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pro Tips Section */}
          <Card className="hover-elevate">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <Lightbulb className="w-5 h-5 mr-2" />
                  Pro Tips from Urja Advisor
                </span>
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  AI Powered
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div
                className="transition-all duration-500 ease-in-out"
                data-testid={`pro-tip-${currentTipIndex}`}
              >
                <div className={`p-6 rounded-lg border ${
                  currentTip.color === 'blue'
                    ? 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800'
                    : currentTip.color === 'orange'
                      ? 'bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-800'
                      : currentTip.color === 'green'
                        ? 'bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800'
                        : currentTip.color === 'purple'
                          ? 'bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800'
                          : 'bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-yellow-200 dark:border-yellow-800'
                }`}>
                  <div className="flex items-start space-x-3 mb-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white flex-shrink-0 ${
                      currentTip.color === 'blue'
                        ? 'bg-blue-500'
                        : currentTip.color === 'orange'
                          ? 'bg-orange-500'
                          : currentTip.color === 'green'
                            ? 'bg-green-500'
                            : currentTip.color === 'purple'
                              ? 'bg-purple-500'
                              : 'bg-yellow-500'
                    }`}>
                      {currentTip.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg text-foreground mb-2">
                        Pro Tip: {currentTip.title}
                      </h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {currentTip.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className={`${
                      currentTip.color === 'blue'
                        ? 'border-blue-500 text-blue-600'
                        : currentTip.color === 'orange'
                          ? 'border-orange-500 text-orange-600'
                          : currentTip.color === 'green'
                            ? 'border-green-500 text-green-600'
                            : currentTip.color === 'purple'
                              ? 'border-purple-500 text-purple-600'
                              : 'border-yellow-500 text-yellow-600'
                    }`}>
                      Potential Savings: {currentTip.savings}
                    </Badge>
                    <div className={`text-sm font-medium ${
                      currentTip.color === 'blue'
                        ? 'text-blue-600'
                        : currentTip.color === 'orange'
                          ? 'text-orange-600'
                          : currentTip.color === 'green'
                            ? 'text-green-600'
                            : currentTip.color === 'purple'
                              ? 'text-purple-600'
                              : 'text-yellow-600'
                    }`}>
                      Tip {currentTipIndex + 1} of {proTips.length}
                    </div>
                  </div>
                </div>
              </div>

              {/* Tip Navigation Dots */}
              <div className="flex justify-center space-x-2" data-testid="tip-navigation">
                {proTips.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTipIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentTipIndex
                        ? 'bg-primary w-6'
                        : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                    }`}
                    data-testid={`tip-indicator-${index}`}
                  />
                ))}
              </div>

              <div className="text-center pt-4 border-t">
                <p className="text-xs text-muted-foreground">
                  💡 Tips automatically rotate every 5 seconds based on your consumption patterns
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-primary/10 to-green-500/10 border-primary/20">
            <CardContent className="p-6">
              <Brain className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Smart Energy Management</h3>
              <p className="text-muted-foreground">
                Your Urja Advisor learns from your consumption patterns and provides personalized recommendations to maximize savings and efficiency.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
