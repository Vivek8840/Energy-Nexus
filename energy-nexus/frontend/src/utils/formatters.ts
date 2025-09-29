export const formatCurrency = (amount: number, currency = '₹'): string => {
  return `${currency}${amount.toLocaleString('en-IN')}`;
};

export const formatEnergy = (amount: number, unit = 'kWh'): string => {
  return `${amount.toLocaleString()} ${unit}`;
};

export const formatDate = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};

export const formatDateTime = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const formatAccountNumber = (accountNumber: string): string => {
  return accountNumber.replace(/(.{4})(?=.)/g, '$1 ');
};

export const maskAccountNumber = (accountNumber: string): string => {
  if (accountNumber.length <= 4) return accountNumber;
  return `***${accountNumber.slice(-4)}`;
};

export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};