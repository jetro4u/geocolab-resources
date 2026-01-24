// src/apps/sgs/api/services/sheetsService.ts
import { google } from 'googleapis';
import type { ChallengeMetrics } from '../types/metrics.types';

export class SheetsService {
  private sheets: any;
  private spreadsheetId: string;

  constructor(credentials: any, spreadsheetId: string) {
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });
    this.sheets = google.sheets({ version: 'v4', auth });
    this.spreadsheetId = spreadsheetId;
  }

  /**
   * Initialize challenge sheet with proper headers
   */
  async createChallengeSheet(challengeName: string): Promise<void> {
    const headers = [
      ['Handle', 'Platform', 'Signal Strength', 'Baseline', 'Current', 
       'Improvement', 'Rank', 'Spam Risk', 'Points', 'Status']
    ];

    await this.sheets.spreadsheets.values.update({
      spreadsheetId: this.spreadsheetId,
      range: `${challengeName}!A1:J1`,
      valueInputOption: 'RAW',
      resource: { values: headers }
    });
  }

  /**
   * Add participant row
   */
  async addParticipant(
    sheetName: string,
    data: {
      handle: string;
      platform: string;
      signalStrength: number;
      baseline: number;
      spamRisk: number;
    }
  ): Promise<void> {
    const values = [[
      data.handle,
      data.platform,
      data.signalStrength,
      data.baseline,
      data.signalStrength, // current = baseline initially
      0, // improvement
      '', // rank (formula)
      data.spamRisk,
      0, // points
      'Active'
    ]];

    await this.sheets.spreadsheets.values.append({
      spreadsheetId: this.spreadsheetId,
      range: `${sheetName}!A2:J2`,
      valueInputOption: 'USER_ENTERED',
      resource: { values }
    });
  }

  /**
   * Update signal score (triggers rank recalculation)
   */
  async updateSignalScore(
    sheetName: string,
    handle: string,
    newScore: number
  ): Promise<void> {
    // 1. Find row
    const response = await this.sheets.spreadsheets.values.get({
      spreadsheetId: this.spreadsheetId,
      range: `${sheetName}!A:A`
    });

    const rowIndex = response.data.values.findIndex(
      (row: string[]) => row[0] === handle
    );

    if (rowIndex === -1) throw new Error('Participant not found');

    // 2. Update current score (column E) and improvement (column F = E - D)
    await this.sheets.spreadsheets.values.update({
      spreadsheetId: this.spreadsheetId,
      range: `${sheetName}!E${rowIndex + 1}:F${rowIndex + 1}`,
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [[newScore, `=E${rowIndex + 1}-D${rowIndex + 1}`]]
      }
    });
  }

  /**
   * Fetch leaderboard (sorted by signal strength)
   */
  async getLeaderboard(sheetName: string): Promise<LeaderboardEntry[]> {
    const response = await this.sheets.spreadsheets.values.get({
      spreadsheetId: this.spreadsheetId,
      range: `${sheetName}!A2:J`
    });

    return response.data.values
      .map((row: any[], index: number) => ({
        rank: index + 1,
        handle: row[0],
        signalStrength: parseFloat(row[2]),
        improvement: parseFloat(row[5]),
        points: parseFloat(row[8]),
        status: row[9]
      }))
      .sort((a, b) => b.signalStrength - a.signalStrength)
      .map((entry, index) => ({ ...entry, rank: index + 1 }));
  }

  /**
   * Log point action
   */
  async logPoints(
    handle: string,
    action: string,
    points: number,
    signalImpact: number
  ): Promise<void> {
    const values = [[
      new Date().toISOString(),
      handle,
      action,
      points,
      'Auto (Grok)', // verified by
      signalImpact
    ]];

    await this.sheets.spreadsheets.values.append({
      spreadsheetId: this.spreadsheetId,
      range: `Points Log!A:F`,
      valueInputOption: 'USER_ENTERED',
      resource: { values }
    });
  }
}