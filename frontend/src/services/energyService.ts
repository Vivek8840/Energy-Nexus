import { api } from './api';

export interface SellEnergyRequest {
  energyKWh: number;
  pricePerKwh: number;
}

export interface SellEnergyResponse {
  success: boolean;
  transactionId?: string;
  message: string;
}

export interface EnergyDataPoint {
  timestamp: string;
  date: string;
  day_of_week: string;
  time: string;
  hour: number;
  minute: number;
  solar_generation_kw: number;
  home_consumption_kw: number;
  grid_import_kw: number;
  grid_export_surplus_kw: number;
  net_surplus_kw: number;
  delhi_export_tariff_per_kwh: number;
  delhi_import_tariff_per_kwh: number;
  fair_market_price_per_kwh: number;
  earnings_from_export_at_tariff: number;
  earnings_from_export_at_fair_price: number;
  cost_of_grid_import: number;
  voltage_v: number;
  frequency_hz: number;
  current_a: number;
  power_factor: number;
  grid_frequency_status: string;
}

export interface AggregatedEnergyData {
  generation: number[];
  consumption: number[];
  surplus: number[];
  timestamps: string[];
}

export interface CurrentEnergyMetrics {
  generating: number;
  consuming: number;
  surplus: number;
  pricePerKwh: number;
  todayEarnings: number;
  batteryLevel: number;
}

export interface WeatherForecast {
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

export const energyService = {
  async sellEnergy(data: SellEnergyRequest): Promise<SellEnergyResponse> {
    try {
      const response = await api.post<SellEnergyResponse>('/energy/sell', data);
      return response;
    } catch (error) {
      console.error('Sell energy error:', error);
      return {
        success: false,
        message: 'Failed to sell energy. Please try again.',
      };
    }
  },

  async getEnergyData(): Promise<EnergyDataPoint[]> {
    try {
      // For now, load from CSV file
      const response = await fetch('/database/energynexus_7day_meter_data (1).csv');
      const csvText = await response.text();
      return this.parseCSV(csvText);
    } catch (error) {
      console.error('Get energy data error:', error);
      return [];
    }
  },

  parseCSV(csvText: string): EnergyDataPoint[] {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',');
    const data: EnergyDataPoint[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',');
      const row: any = {};
      headers.forEach((header, index) => {
        const value = values[index];
        if (header.includes('kw') || header.includes('kwh') || header.includes('v') || header.includes('hz') || header.includes('a')) {
          row[header] = parseFloat(value) || 0;
        } else if (header === 'hour' || header === 'minute') {
          row[header] = parseInt(value) || 0;
        } else {
          row[header] = value;
        }
      });
      data.push(row as EnergyDataPoint);
    }
    return data;
  },

  // Get current/latest energy metrics
  async getCurrentMetrics(): Promise<CurrentEnergyMetrics> {
    const data = await this.getEnergyData();
    if (data.length === 0) {
      return {
        generating: 0,
        consuming: 0,
        surplus: 0,
        pricePerKwh: 6.50,
        todayEarnings: 0,
        batteryLevel: 85
      };
    }

    const latest = data[data.length - 1];
    const todayData = data.filter(d => d.date === latest.date);

    const todayEarnings = todayData.reduce((sum, d) => sum + d.earnings_from_export_at_fair_price, 0);

    return {
      generating: latest.solar_generation_kw,
      consuming: latest.home_consumption_kw,
      surplus: latest.net_surplus_kw,
      pricePerKwh: latest.fair_market_price_per_kwh,
      todayEarnings: Math.round(todayEarnings * 100) / 100, // Round to 2 decimal places
      batteryLevel: 85 // Mock for now
    };
  },

  // Get aggregated data for charts
  async getAggregatedData(period: 'day' | 'week' | 'month'): Promise<AggregatedEnergyData> {
    const data = await this.getEnergyData();
    if (data.length === 0) {
      return {
        generation: [],
        consumption: [],
        surplus: [],
        timestamps: []
      };
    }

    let filteredData: EnergyDataPoint[];
    let groupBy: (d: EnergyDataPoint) => string;

    switch (period) {
      case 'day':
        // Last 24 hours (96 data points for 15-min intervals)
        filteredData = data.slice(-96);
        groupBy = (d) => d.time.split(':')[0]; // Group by hour
        break;
      case 'week':
        // Last 7 days
        const last7Days = [...new Set(data.slice(-7*96).map(d => d.date))].slice(-7);
        filteredData = data.filter(d => last7Days.includes(d.date));
        groupBy = (d) => d.date; // Group by date
        break;
      case 'month':
        // Last 30 days (approximate)
        filteredData = data.slice(-30*96);
        groupBy = (d) => d.date.split('-')[2]; // Group by day of month
        break;
      default:
        filteredData = data.slice(-96);
        groupBy = (d) => d.time.split(':')[0];
    }

    // Group and aggregate data
    const grouped = new Map<string, EnergyDataPoint[]>();
    filteredData.forEach(d => {
      const key = groupBy(d);
      if (!grouped.has(key)) grouped.set(key, []);
      grouped.get(key)!.push(d);
    });

    const generation: number[] = [];
    const consumption: number[] = [];
    const surplus: number[] = [];
    const timestamps: string[] = [];

    Array.from(grouped.entries()).forEach(([key, points]) => {
      const avgGen = points.reduce((sum, p) => sum + p.solar_generation_kw, 0) / points.length;
      const avgCons = points.reduce((sum, p) => sum + p.home_consumption_kw, 0) / points.length;
      const avgSurp = points.reduce((sum, p) => sum + p.net_surplus_kw, 0) / points.length;

      generation.push(Math.round(avgGen * 100) / 100);
      consumption.push(Math.round(avgCons * 100) / 100);
      surplus.push(Math.round(avgSurp * 100) / 100);
      timestamps.push(key);
    });

    return { generation, consumption, surplus, timestamps };
  },

  // Generate weather forecast based on historical patterns
  async getWeatherForecast(): Promise<WeatherForecast> {
    const data = await this.getEnergyData();
    if (data.length === 0) {
      return {
        location: "Delhi",
        temperature: 28,
        condition: "Sunny",
        icon: null,
        currentPrice: 6.80,
        forecast: []
      };
    }

    const latest = data[data.length - 1];
    const currentHour = latest.hour;

    // Calculate average solar generation by hour from historical data
    const hourlyAverages = new Map<number, number>();
    data.forEach(d => {
      if (!hourlyAverages.has(d.hour)) hourlyAverages.set(d.hour, 0);
      hourlyAverages.set(d.hour, hourlyAverages.get(d.hour)! + d.solar_generation_kw);
    });

    const totalDays = new Set(data.map(d => d.date)).size;
    hourlyAverages.forEach((total, hour) => {
      hourlyAverages.set(hour, total / totalDays);
    });

    // Generate next 4 hours forecast
    const forecast = [];
    for (let i = 1; i <= 4; i++) {
      const forecastHour = (currentHour + i) % 24;
      const avgGeneration = hourlyAverages.get(forecastHour) || 0;
      const solarPotential = Math.min(100, (avgGeneration / 4) * 100); // Normalize to percentage

      // Estimate price based on solar potential (higher generation = lower prices)
      const priceEstimate = 8.5 - (solarPotential / 100) * 2;

      forecast.push({
        time: `${forecastHour.toString().padStart(2, '0')}:00`,
        condition: solarPotential > 70 ? "Sunny" : solarPotential > 30 ? "Partly Cloudy" : "Cloudy",
        temperature: 25 + (solarPotential / 100) * 10, // Temperature correlates with solar
        solarPotential: Math.round(solarPotential),
        priceEstimate: Math.round(priceEstimate * 100) / 100
      });
    }

    return {
      location: "Delhi",
      temperature: 28,
      condition: "Sunny",
      icon: null, // Will be set by component
      currentPrice: latest.fair_market_price_per_kwh,
      forecast
    };
  }
};
