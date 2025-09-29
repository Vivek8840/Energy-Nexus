import React, { useState } from 'react';
import { Download } from 'lucide-react';
import Button from '../ui/Button';

interface ExportButtonProps {
  onExport: (format: 'pdf' | 'csv') => void;
  isLoading?: boolean;
}

const ExportButton: React.FC<ExportButtonProps> = ({ onExport, isLoading = false }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="relative">
      <Button
        variant="secondary"
        size="sm"
        onClick={() => setShowDropdown(!showDropdown)}
        disabled={isLoading}
        loading={isLoading}
      >
        <Download className="w-4 h-4 mr-1" />
        Export
      </Button>
      
      {showDropdown && (
        <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          <button
            onClick={() => {
              onExport('csv');
              setShowDropdown(false);
            }}
            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-t-lg"
          >
            Export CSV
          </button>
          <button
            onClick={() => {
              onExport('pdf');
              setShowDropdown(false);
            }}
            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-b-lg"
          >
            Export PDF
          </button>
        </div>
      )}
      
      {showDropdown && (
        <div 
          className="fixed inset-0 z-5"
          onClick={() => setShowDropdown(false)}
        />
      )}
    </div>
  );
};

export default ExportButton;