// Mock location data based on Indian pincodes
// In a real application, this would call an external API
const pincodeData: Record<string, {
  city: string;
  state: string;
  district: string;
  region: string;
  solarPotential: 'high' | 'medium' | 'low';
  avgElectricityRate: number; // in ₹/kWh
  localGridPrice: number; // in ₹/kWh
  carbonIntensity: number; // kg CO2/kWh
}> = {
  '110001': {
    city: 'Delhi',
    state: 'Delhi',
    district: 'Central Delhi',
    region: 'Northern India',
    solarPotential: 'medium',
    avgElectricityRate: 8.5,
    localGridPrice: 7.2,
    carbonIntensity: 0.85
  },
  '400001': {
    city: 'Mumbai',
    state: 'Maharashtra',
    district: 'Mumbai City',
    region: 'Western India',
    solarPotential: 'high',
    avgElectricityRate: 9.2,
    localGridPrice: 8.1,
    carbonIntensity: 0.78
  },
  '560001': {
    city: 'Bangalore',
    state: 'Karnataka',
    district: 'Bangalore Urban',
    region: 'Southern India',
    solarPotential: 'high',
    avgElectricityRate: 7.8,
    localGridPrice: 6.5,
    carbonIntensity: 0.65
  },
  '700001': {
    city: 'Kolkata',
    state: 'West Bengal',
    district: 'Kolkata',
    region: 'Eastern India',
    solarPotential: 'medium',
    avgElectricityRate: 6.8,
    localGridPrice: 5.9,
    carbonIntensity: 0.72
  },
  '600001': {
    city: 'Chennai',
    state: 'Tamil Nadu',
    district: 'Chennai',
    region: 'Southern India',
    solarPotential: 'high',
    avgElectricityRate: 7.5,
    localGridPrice: 6.8,
    carbonIntensity: 0.68
  },
  '380001': {
    city: 'Ahmedabad',
    state: 'Gujarat',
    district: 'Ahmedabad',
    region: 'Western India',
    solarPotential: 'high',
    avgElectricityRate: 8.1,
    localGridPrice: 7.3,
    carbonIntensity: 0.71
  },
  '302001': {
    city: 'Jaipur',
    state: 'Rajasthan',
    district: 'Jaipur',
    region: 'Northern India',
    solarPotential: 'high',
    avgElectricityRate: 7.9,
    localGridPrice: 6.9,
    carbonIntensity: 0.69
  },
  '500001': {
    city: 'Hyderabad',
    state: 'Telangana',
    district: 'Hyderabad',
    region: 'Southern India',
    solarPotential: 'high',
    avgElectricityRate: 8.3,
    localGridPrice: 7.1,
    carbonIntensity: 0.67
  },
  '201001': {
    city: 'Ghaziabad',
    state: 'Uttar Pradesh',
    district: 'Ghaziabad',
    region: 'Northern India',
    solarPotential: 'medium',
    avgElectricityRate: 6.9,
    localGridPrice: 5.8,
    carbonIntensity: 0.82
  },
  '110096': {
    city: 'Delhi',
    state: 'Delhi',
    district: 'South Delhi',
    region: 'Northern India',
    solarPotential: 'medium',
    avgElectricityRate: 8.5,
    localGridPrice: 7.2,
    carbonIntensity: 0.85
  }
};

export interface LocationData {
  city: string;
  state: string;
  district: string;
  region: string;
  solarPotential: 'high' | 'medium' | 'low';
  avgElectricityRate: number;
  localGridPrice: number;
  carbonIntensity: number;
}

export const locationService = {
  getLocationByPincode: (pincode: string): LocationData | null => {
    // Clean the pincode
    const cleanPincode = pincode.replace(/\D/g, '');

    // Check if we have data for this pincode
    if (pincodeData[cleanPincode]) {
      return pincodeData[cleanPincode];
    }

    // For unknown pincodes, try to match the first 3 digits for region-based estimation
    const prefix = cleanPincode.substring(0, 3);
    const regionMap: Record<string, Partial<LocationData>> = {
      '110': { region: 'Northern India', solarPotential: 'medium' as const, avgElectricityRate: 8.5, localGridPrice: 7.2, carbonIntensity: 0.85 },
      '400': { region: 'Western India', solarPotential: 'high' as const, avgElectricityRate: 9.2, localGridPrice: 8.1, carbonIntensity: 0.78 },
      '560': { region: 'Southern India', solarPotential: 'high' as const, avgElectricityRate: 7.8, localGridPrice: 6.5, carbonIntensity: 0.65 },
      '700': { region: 'Eastern India', solarPotential: 'medium' as const, avgElectricityRate: 6.8, localGridPrice: 5.9, carbonIntensity: 0.72 },
      '600': { region: 'Southern India', solarPotential: 'high' as const, avgElectricityRate: 7.5, localGridPrice: 6.8, carbonIntensity: 0.68 },
      '380': { region: 'Western India', solarPotential: 'high' as const, avgElectricityRate: 8.1, localGridPrice: 7.3, carbonIntensity: 0.71 },
      '302': { region: 'Northern India', solarPotential: 'high' as const, avgElectricityRate: 7.9, localGridPrice: 6.9, carbonIntensity: 0.69 },
      '500': { region: 'Southern India', solarPotential: 'high' as const, avgElectricityRate: 8.3, localGridPrice: 7.1, carbonIntensity: 0.67 },
      '201': { region: 'Northern India', solarPotential: 'medium' as const, avgElectricityRate: 6.9, localGridPrice: 5.8, carbonIntensity: 0.82 }
    };

    if (regionMap[prefix]) {
      return {
        city: 'Unknown City',
        state: 'Unknown State',
        district: 'Unknown District',
        ...regionMap[prefix]
      } as LocationData;
    }

    // Default fallback for completely unknown pincodes
    return {
      city: 'Unknown Location',
      state: 'Unknown State',
      district: 'Unknown District',
      region: 'Unknown Region',
      solarPotential: 'medium',
      avgElectricityRate: 8.0,
      localGridPrice: 7.0,
      carbonIntensity: 0.75
    };
  },

  getLocalEnergyPrice: (pincode: string): number => {
    const location = locationService.getLocationByPincode(pincode);
    return location?.localGridPrice || 7.0;
  },

  getSolarPotential: (pincode: string): 'high' | 'medium' | 'low' => {
    const location = locationService.getLocationByPincode(pincode);
    return location?.solarPotential || 'medium';
  },

  getCarbonIntensity: (pincode: string): number => {
    const location = locationService.getLocationByPincode(pincode);
    return location?.carbonIntensity || 0.75;
  }
};
