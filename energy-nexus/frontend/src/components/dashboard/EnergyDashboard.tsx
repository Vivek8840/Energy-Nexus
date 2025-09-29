import Card, { CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Zap, Sun, Home, TrendingUp, Battery, DollarSign } from "lucide-react";
import { EnergyChart } from "@/components/dashboard/EnergyChart";
import { UrjaAdvisor } from "@/components/dashboard/UrjaAdvisor";
import { useState } from "react";

// Mock data - todo: remove mock functionality
const mockEnergyData = {
  generating: 8.5,
  consuming: 4.2,
  surplus: 4.3,
  pricePerKwh: 6.50,
  todayEarnings: 28.5,
  batteryLevel: 85,
};

const analyticsData = {
  day: {
    generation: [0.5, 3.2, 6.1, 8.5, 9.2, 7.8, 4.1, 1.2],
    consumption: [2.1, 2.8, 3.2, 4.1, 3.8, 4.5, 5.2, 6.1],
  },
  week: {
    generation: [5.5, 6.2, 7.1, 8.5, 9.0, 7.5, 6.1],
    consumption: [4.1, 4.8, 5.2, 5.1, 4.8, 5.5, 6.0],
  },
  month: {
    generation: [20, 25, 30, 28, 27, 26, 24, 22, 21, 23, 25, 27],
    consumption: [15, 18, 20, 19, 18, 17, 16, 15, 14, 16, 18, 20],
  }
};

export function EnergyDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState<"day" | "week" | "month">("day");

  const currentData = analyticsData[selectedPeriod];

  return (
    <div className="space-y-6">
      {/* Main Energy Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover-elevate">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Solar Generation</CardTitle>
            <Sun className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-2">{mockEnergyData.generating} kW</div>
            <p className="text-xs text-muted-foreground">
              +12% from yesterday
            </p>
          </CardContent>
        </Card>

        <Card className="hover-elevate">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Home Consumption</CardTitle>
            <Home className="h-4 w-4 text-chart-3" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-3">{mockEnergyData.consuming} kW</div>
            <p className="text-xs text-muted-foreground">
              -5% from yesterday
            </p>
          </CardContent>
        </Card>

        <Card className="hover-elevate border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Surplus</CardTitle>
            <Zap className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{mockEnergyData.surplus} kW</div>
            <p className="text-xs text-muted-foreground">
              Ready to sell
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Period Selector */}
      <div className="flex space-x-4 mb-4">
        {["day", "week", "month"].map((period) => (
          <Button
            key={period}
            variant={selectedPeriod === period ? "primary" : "secondary"}
            onClick={() => setSelectedPeriod(period as "day" | "week" | "month")}
          >
            {period.charAt(0).toUpperCase() + period.slice(1)}
          </Button>
        ))}
      </div>

      {/* Chart and Trading Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Real-Time Energy Flow</CardTitle>
          </CardHeader>
          <CardContent>
            <EnergyChart
              generation={currentData.generation}
              consumption={currentData.consumption}
            />
          </CardContent>
        </Card>

        <div className="space-y-4">
          {/* Current Pricing */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">AI-Powered Pricing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-3xl font-bold text-primary font-mono">
                  ₹{mockEnergyData.pricePerKwh}/kWh
                </div>
                <p className="text-sm text-muted-foreground">Current market rate</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Today's Earnings</span>
                  <span className="font-semibold text-chart-2">₹{mockEnergyData.todayEarnings}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Battery Level</span>
                  <div className="flex items-center space-x-2">
                    <Battery className="h-4 w-4" />
                    <span className="font-semibold">{mockEnergyData.batteryLevel}%</span>
                  </div>
                </div>
              </div>

              <Button
                className="w-full"
                size="lg"
                data-testid="button-sell-energy"
                onClick={() => console.log('Sell surplus energy triggered')}
              >
                <DollarSign className="mr-2 h-4 w-4" />
                Sell Surplus Energy
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="secondary"
                className="w-full justify-start"
                data-testid="button-view-marketplace"
                onClick={() => console.log('View marketplace triggered')}
              >
                <TrendingUp className="mr-2 h-4 w-4" />
                Browse Marketplace
              </Button>
              <Button
                variant="secondary"
                className="w-full justify-start"
                data-testid="button-view-history"
                onClick={() => console.log('View transaction history triggered')}
              >
                <Zap className="mr-2 h-4 w-4" />
                Transaction History
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Urja Advisor Section */}
      <div className="mt-6">
        <UrjaAdvisor />
      </div>
    </div>
  );
}
