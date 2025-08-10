import axios from 'axios';
import type { ConvertRequest, ConvertResponse, ErrorResponse } from '../types';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? 'http://localhost:4000';

export async function convertToAed(request: ConvertRequest): Promise<ConvertResponse> {
  const client = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' }
  });

  try {
    const { data } = await client.post<ConvertResponse>('/convert', request);
    return data;
  } catch (error) {
    if (axios.isAxiosError<ErrorResponse>(error) && error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error('Network error. Please try again later.');
  }
}