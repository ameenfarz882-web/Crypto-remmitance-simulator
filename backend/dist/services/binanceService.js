import axios from 'axios';
export async function fetchAedRateForStablecoin(stablecoin) {
    const symbol = stablecoin === 'USDT' ? 'USDTAED' : 'USDCAED';
    const url = `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`;
    const response = await axios.get(url, {
        timeout: 8000,
        headers: { 'Content-Type': 'application/json' }
    });
    const priceNumber = Number(response.data.price);
    if (!Number.isFinite(priceNumber) || priceNumber <= 0) {
        throw new Error('Invalid price returned from Binance');
    }
    return priceNumber;
}
//# sourceMappingURL=binanceService.js.map