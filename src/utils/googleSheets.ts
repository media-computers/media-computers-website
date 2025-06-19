import { google } from 'googleapis';
import { JWT } from 'google-auth-library';
import { SHEETS, formatDataForSheet, parseDataFromSheet } from './sheetsData';

// Debug logging for environment variables
console.log('Environment Variables Check:');
console.log('GOOGLE_SERVICE_ACCOUNT_EMAIL:', process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ? 'Present' : 'Missing');
console.log('GOOGLE_PRIVATE_KEY:', process.env.GOOGLE_PRIVATE_KEY ? 'Present' : 'Missing');
console.log('GOOGLE_SHEET_ID:', process.env.GOOGLE_SHEET_ID ? 'Present' : 'Missing');

// Initialize the Google Sheets API
const auth = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: Buffer.from(process.env.GOOGLE_PRIVATE_KEY_BASE64!, 'base64').toString('utf-8'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

// Test the authentication
auth.authorize()
  .then(() => console.log('Google Sheets authentication successful'))
  .catch(error => console.error('Google Sheets authentication failed:', error));

const sheets = google.sheets({ version: 'v4', auth });
const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;

// Cache for sheet data
const cache = new Map<string, { data: any[]; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Batch write queue
let batchQueue: { sheetName: string; data: any }[] = [];
let batchTimeout: NodeJS.Timeout | null = null;
const BATCH_DELAY = 1000; // 1 second

// Helper function to normalize field names
function normalizeFieldName(field: string): string {
  return field.toLowerCase();
}

// Function to read data from a specific sheet with caching
export async function readSheet(sheetName: keyof typeof SHEETS) {
  try {
    const cached = cache.get(sheetName);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEETS[sheetName]}!A1:Z`, // Read only until last row
    });

    const values = response.data.values || [];
    if (values.length === 0) {
      return [];
    }

    const parsedData = values.slice(1).map(row => parseDataFromSheet(sheetName, row));
    cache.set(sheetName, { data: parsedData, timestamp: Date.now() });
    return parsedData;
  } catch (error) {
    console.error(`Error reading from ${sheetName}:`, error);
    throw error;
  }
}

// Function to append data to a specific sheet (batched)
export async function appendToSheet(sheetName: keyof typeof SHEETS, data: any) {
  try {
    const normalizedData = Object.entries(data).reduce((acc, [key, value]) => {
      acc[normalizeFieldName(key)] = value;
      return acc;
    }, {} as Record<string, any>);

    const requiredFields = ['name', 'email'];
    const missingFields = requiredFields.filter(field => !normalizedData[field]);
    
    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }

    // Add to batch queue
    batchQueue.push({ sheetName, data: normalizedData });

    // Clear existing timeout
    if (batchTimeout) {
      clearTimeout(batchTimeout);
    }

    // Set new timeout
    batchTimeout = setTimeout(async () => {
      await processBatchQueue();
    }, BATCH_DELAY);

    return { success: true, message: 'Data queued for batch write' };
  } catch (error) {
    console.error(`Error appending to ${sheetName}:`, error);
    throw error;
  }
}

// Process batch queue
async function processBatchQueue() {
  if (batchQueue.length === 0) return;

  const batchData = batchQueue.splice(0, batchQueue.length);
  const sheetGroups = batchData.reduce((acc, { sheetName, data }) => {
    if (!acc[sheetName]) acc[sheetName] = [];
    acc[sheetName].push(data);
    return acc;
  }, {} as Record<string, any[]>);

  for (const [sheetName, dataArray] of Object.entries(sheetGroups)) {
    const formattedData = dataArray.map(data => formatDataForSheet(sheetName as keyof typeof SHEETS, data));
    
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEETS[sheetName as keyof typeof SHEETS]}!A1`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: formattedData,
      },
    });

    // Invalidate cache
    cache.delete(sheetName);
  }
}

// Function to update a specific row in a sheet
export async function updateSheetRow(sheetName: keyof typeof SHEETS, rowIndex: number, data: any) {
  try {
    const normalizedData = Object.entries(data).reduce((acc, [key, value]) => {
      acc[normalizeFieldName(key)] = value;
      return acc;
    }, {} as Record<string, any>);

    const formattedData = formatDataForSheet(sheetName, normalizedData);
    
    const response = await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEETS[sheetName]}!A${rowIndex + 1}`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [formattedData],
      },
    });

    // Invalidate cache
    cache.delete(sheetName);

    return response.data;
  } catch (error) {
    console.error(`Error updating ${sheetName} row ${rowIndex}:`, error);
    throw error;
  }
}

// Function to find a row by a specific value
export async function findRowByValue(sheetName: keyof typeof SHEETS, columnIndex: number, value: string) {
  try {
    const cached = cache.get(sheetName);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      const rowIndex = cached.data.findIndex(row => row[columnIndex] === value);
      if (rowIndex === -1) return null;
      return { rowIndex: rowIndex + 1, data: cached.data[rowIndex] };
    }

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEETS[sheetName]}!A1:Z`,
    });

    const values = response.data.values || [];
    const rowIndex = values.findIndex((row, index) => index > 0 && row[columnIndex] === value);
    
    if (rowIndex === -1) return null;

    const parsedData = values.slice(1).map(row => parseDataFromSheet(sheetName, row));
    cache.set(sheetName, { data: parsedData, timestamp: Date.now() });

    return {
      rowIndex: rowIndex + 1,
      data: parseDataFromSheet(sheetName, values[rowIndex]),
    };
  } catch (error) {
    console.error(`Error finding row in ${sheetName}:`, error);
    throw error;
  }
} 