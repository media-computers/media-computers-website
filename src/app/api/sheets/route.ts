import { NextResponse } from 'next/server';
import { readSheet, appendToSheet, updateSheetRow, findRowByValue } from '@/utils/googleSheets';
import { SHEETS } from '@/utils/sheetsData';

type SheetName = keyof typeof SHEETS;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sheetName = searchParams.get('sheet') as SheetName;
    const columnIndex = searchParams.get('columnIndex');
    const value = searchParams.get('value');

    if (!sheetName || !SHEETS[sheetName]) {
      return NextResponse.json({ error: 'Invalid sheet name' }, { status: 400 });
    }

    const data = columnIndex && value
      ? await findRowByValue(sheetName, parseInt(columnIndex), value)
      : await readSheet(sheetName);

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error in GET /api/sheets:', error);
    return NextResponse.json(
      { error: 'Failed to read from Google Sheets' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { sheetName, data, rowIndex } = body as {
      sheetName: SheetName;
      data: any;
      rowIndex?: number;
    };

    console.log('POST /api/sheets - Received body:', body);
    console.log('POST /api/sheets - sheetName:', sheetName, 'data:', data, 'rowIndex:', rowIndex);

    if (!sheetName || !SHEETS[sheetName]) {
      return NextResponse.json({ error: 'Invalid sheet name' }, { status: 400 });
    }

    if (!data) {
      return NextResponse.json({ error: 'No data provided' }, { status: 400 });
    }

    const result = rowIndex !== undefined
      ? await updateSheetRow(sheetName, rowIndex, data)
      : await appendToSheet(sheetName, data);

    console.log('POST /api/sheets - Google Sheets API result:', result);

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('Error in POST /api/sheets:', error);
    return NextResponse.json(
      { 
        error: 'Failed to write to Google Sheets',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 