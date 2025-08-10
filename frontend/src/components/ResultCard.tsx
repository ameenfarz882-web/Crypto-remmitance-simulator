import type { ConvertResponse } from '../types';

interface ResultCardProps {
  result: ConvertResponse | null;
}

export default function ResultCard({ result }: ResultCardProps): JSX.Element | null {
  if (!result) return null;
  const formattedAmount = new Intl.NumberFormat('en-AE', { style: 'currency', currency: 'AED' }).format(result.amountAED);
  const formattedRate = new Intl.NumberFormat('en-AE', { minimumFractionDigits: 4, maximumFractionDigits: 8 }).format(result.rate);
  const time = new Date(result.timestamp).toLocaleString();

  return (
    <div className="mt-6 w-full max-w-xl rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Conversion Result</h3>
        <span className="text-xs text-gray-500">{time}</span>
      </div>
      <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
        <div className="text-sm text-gray-600 dark:text-gray-300">Amount in AED</div>
        <div className="text-sm font-medium">{formattedAmount}</div>
        <div className="text-sm text-gray-600 dark:text-gray-300">Rate Used</div>
        <div className="text-sm font-medium">{formattedRate} AED per 1 unit</div>
      </div>
      <div className="mt-4 rounded-md bg-emerald-50 dark:bg-emerald-900/20 p-3 text-emerald-700 dark:text-emerald-300 text-sm">
        Transferred {formattedAmount} to {result.country} {result.purpose}
      </div>
    </div>
  );
}