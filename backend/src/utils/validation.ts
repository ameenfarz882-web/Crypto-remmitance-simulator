import type { ConvertRequest } from '../types/index.js';

export function validateConvertRequest(body: unknown): { valid: boolean; data?: ConvertRequest; message?: string } {
  if (typeof body !== 'object' || body === null) {
    return { valid: false, message: 'Invalid request body' };
  }

  const { amount, currency, country, purpose } = body as Record<string, unknown>;

  if (typeof amount !== 'number' || !Number.isFinite(amount) || amount <= 0) {
    return { valid: false, message: 'Amount must be a positive number' };
  }

  if (currency !== 'USDT' && currency !== 'USDC') {
    return { valid: false, message: 'Currency must be USDT or USDC' };
  }

  if (typeof country !== 'string' || country.trim().length === 0) {
    return { valid: false, message: 'Country is required' };
  }

  if (typeof purpose !== 'string' || purpose.trim().length === 0) {
    return { valid: false, message: 'Purpose is required' };
  }

  const req: ConvertRequest = {
    amount,
    currency,
    country: country.trim(),
    purpose: purpose.trim()
  };

  return { valid: true, data: req };
}