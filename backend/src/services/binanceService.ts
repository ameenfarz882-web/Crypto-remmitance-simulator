import axios from 'axios';
import type { BinanceTickerResponse, SupportedStablecoin } from '../types/index.js';

export async function fetchAedRateForStablecoin(stablecoin: SupportedStablecoin): Promise<number> {
  const symbol = stablecoin === 'USDT' ? 'USDTAED' : 'USDCAED';
  const url = `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`;

  const response = await axios.get<BinanceTickerResponse>(url, {
    timeout: 8000,
    headers: { 'Content-Type': 'application/json' }
  });

  const priceNumber = Number(response.data.price);
  if (!Number.isFinite(priceNumber) || priceNumber <= 0) {
    throw new Error('Invalid price returned from Binance');
  }
  return priceNumber;
}