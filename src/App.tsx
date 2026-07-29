import { useState } from 'react';
import { ChartComponent } from './components/ChartComponent';
import { SymbolSelector } from './components/SymbolSelector';
import { LayoutTemplate, LineChart, BarChart3 } from 'lucide-react';

function App() {
  const [symbol, setSymbol] = useState('BTCUSD');
  const [interval, setInterval] = useState('1m');
  const [isCandlestick, setIsCandlestick] = useState(true);

  const intervals = ['1m', '5m', '15m', '1h', '4h', '1d'];

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-100">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-900">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <LayoutTemplate className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-lg font-bold tracking-tight">ProTrader</h1>
          </div>

          <div className="h-6 w-px bg-slate-700 mx-2" />

          <SymbolSelector currentSymbol={symbol} onSymbolChange={setSymbol} />

          <div className="h-6 w-px bg-slate-700 mx-2" />

          <div className="flex items-center bg-slate-800 rounded-md p-1">
            {intervals.map((int) => (
              <button
                key={int}
                onClick={() => setInterval(int)}
                className={`px-3 py-1 text-sm font-medium rounded-sm transition-colors ${interval === int
                    ? 'bg-slate-700 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                  }`}
              >
                {int}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex items-center bg-slate-800 rounded-md p-1">
            <button
              onClick={() => setIsCandlestick(true)}
              className={`p-1.5 rounded-sm transition-colors ${isCandlestick ? 'bg-slate-700 text-blue-400' : 'text-slate-400 hover:text-slate-200'}`}
              title="Candlestick"
            >
              <BarChart3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsCandlestick(false)}
              className={`p-1.5 rounded-sm transition-colors ${!isCandlestick ? 'bg-slate-700 text-blue-400' : 'text-slate-400 hover:text-slate-200'}`}
              title="Line"
            >
              <LineChart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative overflow-hidden">
        <ChartComponent symbol={symbol} interval={interval} isCandlestick={isCandlestick} />

        {/* Overlay Info (TradingView style) */}
        <div className="absolute top-4 left-4 z-10 flex flex-col pointer-events-none">
          <h2 className="text-2xl font-bold text-slate-200">{symbol}</h2>
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-slate-400">Massive Data</span>
            <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
            <span className="text-green-500 font-medium">Market Open</span>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
