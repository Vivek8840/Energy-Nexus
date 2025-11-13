export interface EnergyData {
  date: string;
  generated: number;
  consumed: number;
  sold: number;
  earnings: number;
}

export interface SummaryStats {
  lifetimeEarnings: number;
  totalEnergySold: number;
  totalCarbonSaved: number;
  totalGenerated: number;
  totalConsumed: number;
}

export type DateRange = 'week' | 'month' | 'year' | 'custom';

export interface AnalyticsFilters {
  dateRange: DateRange;
  customStart?: string;
  customEnd?: string;
}
