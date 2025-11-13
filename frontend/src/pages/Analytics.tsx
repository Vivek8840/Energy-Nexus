import React, { useState, useEffect } from 'react';
import { Calendar, Download, TrendingUp, Zap, DollarSign, Leaf, BarChart3, LineChart as LineChartIcon } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Import components
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

// Types
interface EnergyData {
  date: string;
  generated: number;
  consumed: number;
  sold: number;
  earnings: number;
}

interface SummaryStats {
  lifetimeEarnings: number;
  totalEnergySold: number;
  totalCarbonSaved: number;
  totalGenerated: number;
  totalConsumed: number;
}

type DateRange = 'week' | 'month' | 'year' | 'custom';

const Analytics: React.FC = () => {
  // State management
  const [selectedRange, setSelectedRange] = useState<DateRange>('month');
  const [customDateStart, setCustomDateStart] = useState<string>('');
  const [customDateEnd, setCustomDateEnd] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [energyData, setEnergyData] = useState<EnergyData[]>([]);
  const [summaryStats, setSummaryStats] = useState<SummaryStats>({
    lifetimeEarnings: 0,
    totalEnergySold: 0,
    totalCarbonSaved: 0,
    totalGenerated: 0,
    totalConsumed: 0
  });

  // Mock data generator
  const generateMockData = (range: DateRange): EnergyData[] => {
    const data: EnergyData[] = [];
    let days = 30;
    let interval = 1;
    
    switch (range) {
      case 'week':
        days = 7;
        interval = 1;
        break;
      case 'month':
        days = 30;
        interval = 1;
        break;
      case 'year':
        days = 12;
        interval = 30;
        break;
      default:
        days = 30;
    }

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - (i * interval));
      
      const generated = 15 + Math.random() * 25; // 15-40 kWh
      const consumed = 8 + Math.random() * 15; // 8-23 kWh
      const sold = Math.max(0, generated - consumed);
      const earnings = sold * (6.5 + Math.random() * 2); // ₹6.5-8.5 per kWh
      
      data.push({
        date: range === 'year' ? date.toLocaleDateString('en-IN', { month: 'short' }) : date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }),
        generated: Math.round(generated * 100) / 100,
        consumed: Math.round(consumed * 100) / 100,
        sold: Math.round(sold * 100) / 100,
        earnings: Math.round(earnings)
      });
    }
    
    return data;
  };

  // Calculate summary statistics
  const calculateSummaryStats = (data: EnergyData[]): SummaryStats => {
    const totalGenerated = data.reduce((sum, item) => sum + item.generated, 0);
    const totalConsumed = data.reduce((sum, item) => sum + item.consumed, 0);
    const totalSold = data.reduce((sum, item) => sum + item.sold, 0);
    const totalEarnings = data.reduce((sum, item) => sum + item.earnings, 0);
    
    return {
      lifetimeEarnings: Math.round(totalEarnings * 12), // Extrapolate to yearly
      totalEnergySold: Math.round(totalSold * 100) / 100,
      totalCarbonSaved: Math.round(totalGenerated * 0.82 * 100) / 100, // kg CO2 per kWh
      totalGenerated: Math.round(totalGenerated * 100) / 100,
      totalConsumed: Math.round(totalConsumed * 100) / 100
    };
  };

  // Fetch data based on selected range
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const data = generateMockData(selectedRange);
      setEnergyData(data);
      setSummaryStats(calculateSummaryStats(data));
      setIsLoading(false);
    }, 500);
  }, [selectedRange]);

  // Export data function
  const handleExportData = (format: 'pdf' | 'csv') => {
    setIsLoading(true);
    
    // Simulate export process
    setTimeout(() => {
      if (format === 'csv') {
        // Create CSV content
        const csvContent = [
          ['Date', 'Generated (kWh)', 'Consumed (kWh)', 'Sold (kWh)', 'Earnings (₹)'].join(','),
          ...energyData.map(row => [
            row.date,
            row.generated,
            row.consumed,
            row.sold,
            row.earnings
          ].join(','))
        ].join('\n');
        
        // Download CSV
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `energy-report-${selectedRange}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        // PDF export would typically use a library like jsPDF
        alert(`PDF export functionality would be implemented here for ${selectedRange} data.`);
      }
      
      setIsLoading(false);
    }, 1000);
  };

  // Chart colors
  const chartColors = {
    generated: '#22c55e',
    consumed: '#3b82f6',
    sold: '#f59e0b',
    earnings: '#10b981'
  };

  // Energy distribution pie chart data
  const pieData = [
    { name: 'Self Consumed', value: summaryStats.totalConsumed, color: '#3b82f6' },
    { name: 'Sold to Market', value: summaryStats.totalEnergySold, color: '#22c55e' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 className="w-8 h-8 text-green-600" />
            <h1 className="text-3xl font-bold text-gray-900">Energy Passbook</h1>
          </div>
          <p className="text-gray-600">Track your solar energy performance and earnings over time</p>
        </div>

        {/* Date Range Selector */}
        <Card className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex flex-wrap gap-2">
              {(['week', 'month', 'year'] as DateRange[]).map((range) => (
                <Button
                  key={range}
                  variant={selectedRange === range ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setSelectedRange(range)}
                  className="capitalize"
                >
                  {range}
                </Button>
              ))}
              <Button
                variant={selectedRange === 'custom' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setSelectedRange('custom')}
              >
                <Calendar className="w-4 h-4 mr-1" />
                Custom
              </Button>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleExportData('csv')}
                disabled={isLoading}
                loading={isLoading}
              >
                <Download className="w-4 h-4 mr-1" />
                Export CSV
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleExportData('pdf')}
                disabled={isLoading}
                loading={isLoading}
              >
                <Download className="w-4 h-4 mr-1" />
                Export PDF
              </Button>
            </div>
          </div>
          
          {/* Custom Date Range Inputs */}
          {selectedRange === 'custom' && (
            <div className="flex gap-4 mt-4 pt-4 border-t border-gray-200">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                <input
                  type="date"
                  value={customDateStart}
                  onChange={(e) => setCustomDateStart(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                <input
                  type="date"
                  value={customDateEnd}
                  onChange={(e) => setCustomDateEnd(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
          )}
        </Card>

        {/* Summary Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card gradient hover className="text-center">
            <DollarSign className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Lifetime Earnings</h3>
            <p className="text-3xl font-bold text-green-600">₹{summaryStats.lifetimeEarnings.toLocaleString()}</p>
            <p className="text-sm text-gray-500 mt-1">Total revenue generated</p>
          </Card>
          
          <Card gradient hover className="text-center">
            <Zap className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Energy Sold</h3>
            <p className="text-3xl font-bold text-blue-600">{summaryStats.totalEnergySold.toLocaleString()} kWh</p>
            <p className="text-sm text-gray-500 mt-1">Energy sold to marketplace</p>
          </Card>
          
          <Card gradient hover className="text-center">
            <Leaf className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Carbon Saved</h3>
            <p className="text-3xl font-bold text-emerald-600">{summaryStats.totalCarbonSaved.toLocaleString()} kg</p>
            <p className="text-sm text-gray-500 mt-1">CO₂ emissions prevented</p>
          </Card>
          
          <Card gradient hover className="text-center">
            <TrendingUp className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Efficiency</h3>
            <p className="text-3xl font-bold text-purple-600">
              {summaryStats.totalGenerated > 0 ? Math.round((summaryStats.totalEnergySold / summaryStats.totalGenerated) * 100) : 0}%
            </p>
            <p className="text-sm text-gray-500 mt-1">Energy sold vs generated</p>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Energy Flow Chart */}
          <Card>
            <div className="flex items-center gap-2 mb-6">
              <LineChartIcon className="w-6 h-6 text-green-600" />
              <h3 className="text-xl font-semibold text-gray-900">Energy Flow Analysis</h3>
            </div>
            
            {isLoading ? (
              <div className="flex items-center justify-center h-80">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={320}>
                <AreaChart data={energyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value: number, name: string) => [
                      `${value} ${name === 'earnings' ? '₹' : 'kWh'}`,
                      name === 'generated' ? 'Generated' : 
                      name === 'consumed' ? 'Consumed' : 
                      name === 'sold' ? 'Sold' : 'Earnings'
                    ]}
                  />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="generated" 
                    stackId="1" 
                    stroke={chartColors.generated} 
                    fill={chartColors.generated}
                    fillOpacity={0.6}
                    name="Generated"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="consumed" 
                    stackId="2" 
                    stroke={chartColors.consumed} 
                    fill={chartColors.consumed}
                    fillOpacity={0.6}
                    name="Consumed"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="sold" 
                    stackId="3" 
                    stroke={chartColors.sold} 
                    fill={chartColors.sold}
                    fillOpacity={0.6}
                    name="Sold"
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </Card>

          {/* Earnings Chart */}
          <Card>
            <div className="flex items-center gap-2 mb-6">
              <DollarSign className="w-6 h-6 text-green-600" />
              <h3 className="text-xl font-semibold text-gray-900">Financial Performance</h3>
            </div>
            
            {isLoading ? (
              <div className="flex items-center justify-center h-80">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={energyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value: number) => [`₹${value}`, 'Earnings']}
                  />
                  <Legend />
                  <Bar 
                    dataKey="earnings" 
                    fill={chartColors.earnings}
                    name="Daily Earnings"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </Card>
        </div>

        {/* Energy Distribution */}
        <Card>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-green-500"></div>
            <h3 className="text-xl font-semibold text-gray-900">Energy Distribution</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              {isLoading ? (
                <div className="flex items-center justify-center h-64">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => [`${value} kWh`, 'Energy']} />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
            
            <div className="space-y-4">
              {pieData.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.value.toLocaleString()} kWh</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      {summaryStats.totalGenerated > 0 
                        ? Math.round((item.value / summaryStats.totalGenerated) * 100) 
                        : 0}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;