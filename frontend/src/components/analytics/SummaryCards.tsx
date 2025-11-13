import React from 'react';
import { DollarSign, Zap, Leaf, TrendingUp } from 'lucide-react';
import Card from '../ui/Card';

interface SummaryCardsProps {
  data: {
    lifetimeEarnings: number;
    totalEnergySold: number;
    totalCarbonSaved: number;
    efficiency: number;
  };
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ data }) => {
  const cards = [
    {
      title: 'Lifetime Earnings',
      value: `₹${data.lifetimeEarnings.toLocaleString()}`,
      subtitle: 'Total revenue generated',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'Total Energy Sold',
      value: `${data.totalEnergySold.toLocaleString()} kWh`,
      subtitle: 'Energy sold to marketplace',
      icon: Zap,
      color: 'text-blue-600'
    },
    {
      title: 'Carbon Saved',
      value: `${data.totalCarbonSaved.toLocaleString()} kg`,
      subtitle: 'CO₂ emissions prevented',
      icon: Leaf,
      color: 'text-emerald-600'
    },
    {
      title: 'Efficiency',
      value: `${data.efficiency}%`,
      subtitle: 'Energy sold vs generated',
      icon: TrendingUp,
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <Card key={index} gradient hover className="text-center">
            <Icon className={`w-12 h-12 ${card.color} mx-auto mb-4`} />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">{card.title}</h3>
            <p className={`text-3xl font-bold ${card.color}`}>{card.value}</p>
            <p className="text-sm text-gray-500 mt-1">{card.subtitle}</p>
          </Card>
        );
      })}
    </div>
  );
};

export default SummaryCards;
