import { useState, useEffect } from "react";
import Card, { CardContent, CardHeader, CardTitle } from "../ui/Card";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import {
  Cloud,
  Sun,
  CloudRain,
  AlertTriangle,
  TrendingUp,
  Battery,
  Zap,
  Clock,
  ThermometerSun
} from "lucide-react";
import { energyService, EnergyDataPoint, WeatherForecast } from "@/services/energyService";

interface WeatherAlert {
  id: string;
  type: 'weather' | 'price' | 'system';
  icon: React.ReactNode;
  title: string;
  message: string;
  action?: string;
  urgency: 'low' | 'medium' | 'high';
  timestamp: string;
}

interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  icon: React.ReactNode;
  currentPrice: number;
  forecast: Array<{
    time: string;
    condition: string;
    temperature: number;
    solarPotential: number;
    priceEstimate: number;
  }>;
}

const mockWeatherData: WeatherData = {
  location: "Delhi",
  temperature: 32,
  condition: "Sunny",
  icon: <Sun className="w-8 h-8 text-yellow-500" />,
  currentPrice: 8.5,
  forecast: [
    { time: "Now", condition: "Sunny", temperature: 32, solarPotential: 95, priceEstimate: 8.5 },
    { time: "1h", condition: "Sunny", temperature: 33, solarPotential: 90, priceEstimate: 8.7 },
    { time: "2h", condition: "Partly Cloudy", temperature: 31, solarPotential: 70, priceEstimate: 9.0 },
    { time: "3h", condition: "Cloudy", temperature: 29, solarPotential: 40, priceEstimate: 9.5 },
  ]
};

const initialAlerts: WeatherAlert[] = [
  {
    id: "1",
    type: "weather",
    icon: <CloudRain className="w-5 h-5 text-blue-500" />,
    title: "Weather Alert",
    message: "Heavy clouds forecasted for tomorrow afternoon. Our AI recommends you buy 5 units of energy from the marketplace now while prices are low to keep your inverter fully charged.",
    action: "Buy Energy Now",
    urgency: "medium",
    timestamp: "2 minutes ago"
  },
  {
    id: "2",
    type: "price",
    icon: <TrendingUp className="w-5 h-5 text-green-500" />,
    title: "Price Alert",
    message: "Peak sun hours are starting! It's the perfect time to sell your surplus energy. Prices are expected to be highest in the next 2 hours.",
    action: "Sell Energy",
    urgency: "high",
    timestamp: "5 minutes ago"
  },
  {
    id: "3",
    type: "system",
    icon: <Battery className="w-5 h-5 text-orange-500" />,
    title: "System Alert",
    message: "Your battery is at 85% capacity. Consider using stored energy during evening peak hours to avoid high grid prices.",
    urgency: "low",
    timestamp: "10 minutes ago"
  }
];

export function EnergyForecast() {
  const [alerts, setAlerts] = useState<WeatherAlert[]>(initialAlerts);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    const loadWeatherData = async () => {
      try {
        const forecast = await energyService.getWeatherForecast();
        const weatherData: WeatherData = {
          location: forecast.location,
          temperature: forecast.temperature,
          condition: forecast.condition,
          icon: <Sun className="w-8 h-8 text-yellow-500" />, // Default icon, could be made dynamic
          currentPrice: forecast.currentPrice,
          forecast: forecast.forecast
        };
        setWeatherData(weatherData);
      } catch (error) {
        console.error('Failed to load weather forecast:', error);
      }
    };
    loadWeatherData();
  }, []);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time and simulate new alerts - todo: remove mock functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());

      // Occasionally add new alerts
      if (Math.random() > 0.95) {
        const newAlert: WeatherAlert = {
          id: Date.now().toString(),
          type: Math.random() > 0.5 ? 'price' : 'weather',
          icon: Math.random() > 0.5
            ? <Sun className="w-5 h-5 text-yellow-500" />
            : <Cloud className="w-5 h-5 text-gray-500" />,
          title: Math.random() > 0.5 ? "Price Opportunity" : "Weather Update",
          message: "New market conditions detected. Check your dashboard for updated recommendations.",
          urgency: 'medium',
          timestamp: 'Just now'
        };

        setAlerts(prev => [newAlert, ...prev.slice(0, 4)]);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'border-red-500 bg-red-50 dark:bg-red-900/20';
      case 'medium': return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      default: return 'border-blue-500 bg-blue-50 dark:bg-blue-900/20';
    }
  };

  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-blue-500/10 rounded-full border border-blue-500/20 mb-4">
            <ThermometerSun className="w-4 h-4 text-blue-500 mr-2" />
            <span className="text-blue-500 font-medium text-sm">WEATHER INTELLIGENCE</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            The Energy Forecast: <span className="text-primary">Stay One Step Ahead</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our AI combines weather data with market intelligence to keep you prepared for optimal energy trading opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Weather Widget */}
          <Card className="hover-elevate">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <ThermometerSun className="w-5 h-5 mr-2" />
                  Energy Weather Forecast
                </span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs text-muted-foreground">Live</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Current Weather */}
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-yellow-50 dark:from-blue-900/20 dark:to-yellow-900/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  {mockWeatherData.icon}
                  <div>
                    <div className="font-bold text-xl">{mockWeatherData.location}: {mockWeatherData.condition}</div>
                    <div className="text-muted-foreground">{mockWeatherData.temperature}°C</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary font-mono">
                    ₹{mockWeatherData.currentPrice}/unit
                  </div>
                  <div className="text-sm text-muted-foreground">Current Price</div>
                </div>
              </div>

              {/* Hourly Forecast */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  Next 4 Hours Forecast
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {mockWeatherData.forecast.map((hour, index) => (
                    <div key={index} className="p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{hour.time}</span>
                        <span className="text-xs text-muted-foreground">{hour.temperature}°C</span>
                      </div>
                      <div className="text-xs text-muted-foreground mb-1">{hour.condition}</div>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          {hour.solarPotential}% solar
                        </Badge>
                        <span className="text-sm font-mono">₹{hour.priceEstimate}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Smart Alerts */}
          <Card className="hover-elevate">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Smart Alerts & Recommendations
                </span>
                <Badge variant="secondary" className="bg-green-500/10 text-green-600">
                  {alerts.length} active
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-4 rounded-lg border-l-4 ${getUrgencyColor(alert.urgency)} transition-all duration-300`}
                    data-testid={`alert-${alert.id}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {alert.icon}
                        <span className="font-semibold text-sm">{alert.title}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{alert.timestamp}</span>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                      {alert.message}
                    </p>

                    {alert.action && (
                      <Button
                        size="sm"
                        variant="outline"
                        data-testid={`alert-action-${alert.id}`}
                        onClick={() => console.log(`Alert action: ${alert.action} triggered`)}
                      >
                        {alert.action}
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t text-center">
                <p className="text-xs text-muted-foreground flex items-center justify-center">
                  <Zap className="w-3 h-3 mr-1" />
                  Powered by AI weather analysis and market intelligence
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-blue-500/10 to-green-500/10 border-blue-500/20">
            <CardContent className="p-6">
              <ThermometerSun className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Proactive Energy Intelligence</h3>
              <p className="text-muted-foreground">
                Don't just react to market changes - stay ahead of them. Our weather-smart system alerts you to opportunities before they happen.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
