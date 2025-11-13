import Card, { CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Zap, Sun, Home, TrendingUp, Battery, DollarSign } from "lucide-react";
import { EnergyChart } from "@/components/dashboard/EnergyChart";
import { UrjaAdvisor } from "@/components/dashboard/UrjaAdvisor";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import { UserType } from "@/types";
import { energyService, EnergyDataPoint, CurrentEnergyMetrics, AggregatedEnergyData } from "@/services/energyService";

export function EnergyDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState<"day" | "week" | "month">("day");
  const { state } = useUser();
  const [currentMetrics, setCurrentMetrics] = useState<CurrentEnergyMetrics | null>(null);
  const [aggregatedData, setAggregatedData] = useState<AggregatedEnergyData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [metrics, aggregated] = await Promise.all([
          energyService.getCurrentMetrics(),
          energyService.getAggregatedData(selectedPeriod)
        ]);
        setCurrentMetrics(metrics);
        setAggregatedData(aggregated);
      } catch (error) {
        console.error('Failed to load energy data:', error);
      }
    };
    loadData();
  }, [selectedPeriod]);

  // Adjust data based on user type
  const adjustedMetrics = currentMetrics ? {
    ...currentMetrics,
    generating: state.user?.userType === UserType.PROSUMER ? currentMetrics.generating : 0,
    surplus: state.user?.userType === UserType.PROSUMER ? currentMetrics.surplus : 0,
  } : null;

  const currentData = aggregatedData ? {
    generation: aggregatedData.generation,
    consumption: aggregatedData.consumption,
  } : {
    generation: [],
    consumption: [],
  };

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
            <div className="text-2xl font-bold text-chart-2">{adjustedMetrics?.generating.toFixed(1) || '0.0'} kW</div>
            <p className="text-xs text-muted-foreground">
              {state.user?.userType === UserType.PROSUMER ? '+12% from yesterday' : 'Not available for customers'}
            </p>
          </CardContent>
        </Card>

        <Card className="hover-elevate">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Home Consumption</CardTitle>
            <Home className="h-4 w-4 text-chart-3" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-3">{adjustedMetrics?.consuming.toFixed(1) || '0.0'} kW</div>
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
            <div className="text-2xl font-bold text-primary">{adjustedMetrics?.surplus.toFixed(1) || '0.0'} kW</div>
            <p className="text-xs text-muted-foreground">
              {state.user?.userType === UserType.PROSUMER ? 'Ready to sell' : 'Not available for customers'}
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
                  ₹{adjustedMetrics?.pricePerKwh.toFixed(2) || '6.50'}/kWh
                </div>
                <p className="text-sm text-muted-foreground">Current market rate</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Today's Earnings</span>
                  <span className="font-semibold text-chart-2">₹{adjustedMetrics?.todayEarnings.toFixed(2) || '0.00'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Battery Level</span>
                  <div className="flex items-center space-x-2">
                    <Battery className="h-4 w-4" />
                    <span className="font-semibold">{adjustedMetrics?.batteryLevel || 85}%</span>
                  </div>
                </div>
              </div>

              <Button
                className="w-full"
                size="lg"
                data-testid="button-sell-energy"
                onClick={() => navigate('/app/sell-energy')}
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
                onClick={() => navigate('/app/marketplace')}
              >
                <TrendingUp className="mr-2 h-4 w-4" />
                Browse Marketplace
              </Button>
              <Button
                variant="secondary"
                className="w-full justify-start"
                data-testid="button-view-history"
                onClick={() => navigate('/app/wallet')}
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
