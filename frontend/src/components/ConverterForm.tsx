import { useState } from 'react';
import type { ConvertRequest, ConvertResponse, SupportedStablecoin } from '../types';
import { convertToAed } from '../services/api';

const countries = [
  'United Arab Emirates',
  'India',
  'Philippines',
  'Egypt',
  'Pakistan',
  'Bangladesh',
  'Sri Lanka',
  'Nepal',
  'Jordan',
  'Kenya'
] as const;

const purposes = ['Govt Payment', 'Family Remittance'] as const;

export default function ConverterForm({ onResult }: { onResult: (result: ConvertResponse) => void }): JSX.Element {
  const [amount, setAmount] = useState<string>('');
  const [currency, setCurrency] = useState<SupportedStablecoin>('USDT');
  const [country, setCountry] = useState<string>('United Arab Emirates');
  const [purpose, setPurpose] = useState<string>('Govt Payment');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  function validate(): string | null {
    const value = Number(amount);
    if (!Number.isFinite(value) || value <= 0) return 'Amount must be a positive number';
    if (!country) return 'Country is required';
    if (!purpose) return 'Purpose is required';
    return null;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setError('');
    const message = validate();
    if (message) {
      setError(message);
      return;
    }

    const payload: ConvertRequest = {
      amount: Number(amount),
      currency,
      country,
      purpose
    };

    try {
      setLoading(true);
      const result = await convertToAed(payload);
      onResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="amount">Amount</label>
        <div className="flex items-center gap-2">
          <input
            id="amount"
            type="number"
            inputMode="decimal"
            min={0}
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="flex-1 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value as SupportedStablecoin)}
            className="w-28 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="USDT">USDT</option>
            <option value="USDC">USDC</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="country">Destination Country</label>
          <select
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          >
            {countries.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="purpose">Purpose</label>
          <select
            id="purpose"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          >
            {purposes.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-3 text-sm text-red-700 dark:text-red-300">{error}</div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-md bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 px-4 py-2 text-white font-medium"
      >
        {loading ? 'Converting…' : 'Convert'}
      </button>
    </form>
  );
}