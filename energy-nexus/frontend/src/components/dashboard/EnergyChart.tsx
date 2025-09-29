import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

interface EnergyChartProps {
  generation: number[];
  consumption: number[];
}

// Example: generation and consumption arrays should be of same length and correspond to time points
// For simplicity, time points are fixed as in mock data below
const timePoints = ["06:00", "08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00"];

export function EnergyChart({ generation, consumption }: EnergyChartProps) {
  // Build data array from props
  const energyData = timePoints.map((time, index) => ({
    time,
    generation: generation[index] ?? 0,
    consumption: consumption[index] ?? 0,
  }));

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={energyData}>
          <defs>
            <linearGradient id="colorGeneration" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0.1}/>
            </linearGradient>
            <linearGradient id="colorConsumption" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--chart-3))" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="hsl(var(--chart-3))" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis
            dataKey="time"
            tick={{ fontSize: 12 }}
            className="text-muted-foreground"
          />
          <YAxis
            tick={{ fontSize: 12 }}
            className="text-muted-foreground"
            label={{ value: 'kW', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '6px'
            }}
          />
          <Area
            type="monotone"
            dataKey="generation"
            stroke="hsl(var(--chart-2))"
            strokeWidth={2}
            fill="url(#colorGeneration)"
            name="Solar Generation (kW)"
          />
          <Area
            type="monotone"
            dataKey="consumption"
            stroke="hsl(var(--chart-3))"
            strokeWidth={2}
            fill="url(#colorConsumption)"
            name="Home Consumption (kW)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
