// Sheet names
export const SHEETS = {
  CONTACTS: 'Media Computers Data',
  SIGNUPS: 'SIGNUPS'
} as const;

// Column headers for each sheet
export const COLUMNS = {
  CONTACTS: ['Name', 'Email', 'Phone', 'Message', 'Date'],
  SIGNUPS: ['Name', 'Email', 'Password', 'Date']
} as const;

// Type definitions
export type SheetName = keyof typeof SHEETS;
export type ContactData = {
  name: string;
  email: string;
  phone: string;
  message: string;
  date: string;
};

export type SignupData = {
  name: string;
  email: string;
  password: string;
  date: string;
};

// Helper function to generate a unique ID
export function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Helper function to format data for sheet
export function formatDataForSheet(sheetName: SheetName, data: any): string[] {
  const columns = COLUMNS[sheetName];
  return columns.map(column => {
    const key = column.toLowerCase();
    return data[key] || '';
  });
}

// Helper function to parse data from sheet
export function parseDataFromSheet(sheetName: SheetName, row: string[]): any {
  const columns = COLUMNS[sheetName];
  return columns.reduce((obj, column, index) => {
    obj[column.toLowerCase()] = row[index] || '';
    return obj;
  }, {} as Record<string, string>);
} 