export type SupportedStablecoin = 'USDT' | 'USDC';

export interface ConvertRequest {
  amount: number;
  currency: SupportedStablecoin;
  country: string;
  purpose: string;
}

export interface ConvertResponse {
  amountAED: number;
  rate: number;
  timestamp: string;
  country: string;
  purpose: string;
}

export interface ErrorResponse {
  error: string;
}

export interface BinanceTickerResponse {
  symbol: string;
  price: string;
}