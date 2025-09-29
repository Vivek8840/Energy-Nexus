import { ApiResponse, EnergyData, SummaryStats, AnalyticsFilters } from '../types';
import { APP_CONFIG } from '../utils/constants';

class AnalyticsService {
  private baseUrl = `${APP_CONFIG.API_BASE_URL}/analytics`;

  async getEnergyData(filters: AnalyticsFilters): Promise<ApiResponse<EnergyData[]>> {
    try {
      const params = new URLSearchParams({
        dateRange: filters.dateRange,
        ...(filters.customStart && { startDate: filters.customStart }),
        ...(filters.customEnd && { endDate: filters.customEnd })
      });

      const response = await fetch(`${this.baseUrl}/energy-data?${params}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json'
        }
      });

      return await response.json();
    } catch (error) {
      return {
        success: false,
        data: [],
        error: 'Failed to fetch energy data'
      };
    }
  }

  async getSummaryStats(): Promise<ApiResponse<SummaryStats>> {
    try {
      const response = await fetch(`${this.baseUrl}/summary`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json'
        }
      });

      return await response.json();
    } catch (error) {
      return {
        success: false,
        data: {} as SummaryStats,
        error: 'Failed to fetch summary statistics'
      };
    }
  }

  async exportData(format: 'csv' | 'pdf', filters: AnalyticsFilters): Promise<Blob | null> {
    try {
      const params = new URLSearchParams({
        format,
        dateRange: filters.dateRange,
        ...(filters.customStart && { startDate: filters.customStart }),
        ...(filters.customEnd && { endDate: filters.customEnd })
      });

      const response = await fetch(`${this.baseUrl}/export?${params}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      if (response.ok) {
        return await response.blob();
      }
      return null;
    } catch (error) {
      console.error('Export failed:', error);
      return null;
    }
  }
}

export default new AnalyticsService();