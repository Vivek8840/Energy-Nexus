import React from 'react';
import { Calendar } from 'lucide-react';
import Button from '../ui/Button';

interface DateRangePickerProps {
  selectedRange: 'week' | 'month' | 'year' | 'custom';
  onRangeChange: (range: 'week' | 'month' | 'year' | 'custom') => void;
  customDateStart?: string;
  customDateEnd?: string;
  onCustomDateChange?: (start: string, end: string) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ 
  selectedRange, 
  onRangeChange, 
  customDateStart = '',
  customDateEnd = '',
  onCustomDateChange
}) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {(['week', 'month', 'year'] as const).map((range) => (
          <Button
            key={range}
            variant={selectedRange === range ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => onRangeChange(range)}
            className="capitalize"
          >
            {range}
          </Button>
        ))}
        <Button
          variant={selectedRange === 'custom' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => onRangeChange('custom')}
        >
          <Calendar className="w-4 h-4 mr-1" />
          Custom
        </Button>
      </div>
      
      {selectedRange === 'custom' && onCustomDateChange && (
        <div className="flex gap-4 pt-4 border-t border-gray-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
            <input
              type="date"
              value={customDateStart}
              onChange={(e) => onCustomDateChange(e.target.value, customDateEnd)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
            <input
              type="date"
              value={customDateEnd}
              onChange={(e) => onCustomDateChange(customDateStart, e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
