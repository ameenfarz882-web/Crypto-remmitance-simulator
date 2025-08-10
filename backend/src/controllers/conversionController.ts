import type { Request, Response } from 'express';
import { fetchAedRateForStablecoin } from '../services/binanceService.js';
import { validateConvertRequest } from '../utils/validation.js';
import type { ConvertResponse, ErrorResponse } from '../types/index.js';

export async function convertHandler(req: Request, res: Response<ConvertResponse | ErrorResponse>): Promise<void> {
  const validation = validateConvertRequest(req.body);
  if (!validation.valid || !validation.data) {
    res.status(400).json({ error: validation.message ?? 'Invalid request' });
    return;
  }

  try {
    const rate = await fetchAedRateForStablecoin(validation.data.currency);
    const amountAEDRaw = validation.data.amount * rate;
    const amountAED = Math.round((amountAEDRaw + Number.EPSILON) * 100) / 100;

    const payload: ConvertResponse = {
      amountAED,
      rate,
      timestamp: new Date().toISOString(),
      country: validation.data.country,
      purpose: validation.data.purpose
    };

    res.status(200).json(payload);
  } catch (_err) {
    res.status(502).json({ error: 'Unable to fetch live rate at the moment' });
  }
}