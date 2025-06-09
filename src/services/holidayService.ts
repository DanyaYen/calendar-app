import type { IHoliday } from '../types';

const API_BASE_URL = 'https://date.nager.at/api/v3';

export const getPublicHolidays = async (year: number, countryCode: string): Promise<IHoliday[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/PublicHolidays/${year}/${countryCode}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch holidays: ${response.statusText}`);
    }
    const data: IHoliday[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error in getPublicHolidays:", error);
    return [];
  }
};