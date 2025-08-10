import { useState } from 'react';
import ThemeToggle from './components/ThemeToggle';
import ConverterForm from './components/ConverterForm';
import ResultCard from './components/ResultCard';
import type { ConvertResponse } from './types';

export default function App(): JSX.Element {
  const [result, setResult] = useState<ConvertResponse | null>(null);

  return (
    <div className="min-h-full">
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur">
        <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
          <h1 className="text-lg sm:text-xl font-semibold">Crypto → AED Remittance Simulator</h1>
          <ThemeToggle />
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">
        <div className="mx-auto flex w-full max-w-xl flex-col items-center text-center">
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
            Convert USDT/USDC to AED using live rates from Binance.
          </p>
          <ConverterForm onResult={setResult} />
          <ResultCard result={result} />
        </div>
      </main>

      <footer className="text-center text-xs text-gray-500 dark:text-gray-400 py-6">
        Rates are fetched live. If unavailable, you may see a helpful error message.
      </footer>
    </div>
  );
}