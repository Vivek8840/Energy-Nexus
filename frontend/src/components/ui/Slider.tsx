import React from 'react';

interface SliderProps {
  label?: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min: number;
  max: number;
  step?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  showValue?: boolean;
  showMinMax?: boolean;
  color?: 'green' | 'blue' | 'red' | 'purple';
  disabled?: boolean;
  formatValue?: (value: number) => string;
}

const Slider: React.FC<SliderProps> = ({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  prefix = '',
  suffix = '',
  className = '',
  showValue = true,
  showMinMax = true,
  color = 'green',
  disabled = false,
  formatValue
}) => {
  const percentage = ((value - min) / (max - min)) * 100;
  
  const colorClasses = {
    green: {
      track: 'bg-green-500',
      thumb: 'bg-green-500 focus:ring-green-500',
      text: 'text-green-600'
    },
    blue: {
      track: 'bg-blue-500',
      thumb: 'bg-blue-500 focus:ring-blue-500',
      text: 'text-blue-600'
    },
    red: {
      track: 'bg-red-500',
      thumb: 'bg-red-500 focus:ring-red-500',
      text: 'text-red-600'
    },
    purple: {
      track: 'bg-purple-500',
      thumb: 'bg-purple-500 focus:ring-purple-500',
      text: 'text-purple-600'
    }
  };
  
  const displayValue = formatValue ? formatValue(value) : `${prefix}${value.toLocaleString()}${suffix}`;
  
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700">
            {label}
          </label>
          {showValue && (
            <span className={`text-sm font-semibold ${colorClasses[color].text}`}>
              {displayValue}
            </span>
          )}
        </div>
      )}
      
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`
            w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            slider
          `}
          style={{
            background: `linear-gradient(to right, ${color === 'green' ? '#10b981' : color === 'blue' ? '#3b82f6' : color === 'red' ? '#ef4444' : '#8b5cf6'} 0%, ${color === 'green' ? '#10b981' : color === 'blue' ? '#3b82f6' : color === 'red' ? '#ef4444' : '#8b5cf6'} ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`
          }}
        />
        
        {/* Custom thumb styling via CSS */}
        <style jsx>{`
          .slider::-webkit-slider-thumb {
            appearance: none;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: ${color === 'green' ? '#10b981' : color === 'blue' ? '#3b82f6' : color === 'red' ? '#ef4444' : '#8b5cf6'};
            cursor: pointer;
            border: 2px solid white;
            box-shadow: 0 2px 6px rgba(0,0,0,0.2);
            transition: all 0.2s ease;
          }
          .slider::-webkit-slider-thumb:hover {
            transform: scale(1.1);
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          }
          .slider::-moz-range-thumb {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: ${color === 'green' ? '#10b981' : color === 'blue' ? '#3b82f6' : color === 'red' ? '#ef4444' : '#8b5cf6'};
            cursor: pointer;
            border: 2px solid white;
            box-shadow: 0 2px 6px rgba(0,0,0,0.2);
            transition: all 0.2s ease;
          }
          .slider::-moz-range-thumb:hover {
            transform: scale(1.1);
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          }
          .slider:disabled::-webkit-slider-thumb {
            cursor: not-allowed;
          }
          .slider:disabled::-moz-range-thumb {
            cursor: not-allowed;
          }
        `}</style>
      </div>
      
      {showMinMax && (
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>{prefix}{min.toLocaleString()}{suffix}</span>
          <span>{prefix}{max.toLocaleString()}{suffix}</span>
        </div>
      )}
    </div>
  );
};

export default Slider;