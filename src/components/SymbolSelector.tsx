import { Search } from 'lucide-react';

interface SymbolSelectorProps {
    currentSymbol: string;
    onSymbolChange: (symbol: string) => void;
}

const SYMBOLS = [
    { id: 'BTCUSD', name: 'Bitcoin', type: 'Crypto' },
    { id: 'ETHUSD', name: 'Ethereum', type: 'Crypto' },
    { id: 'EURUSD', name: 'Euro / USD', type: 'Forex' },
    { id: 'GBPUSD', name: 'GBP / USD', type: 'Forex' },
    { id: 'AAPL', name: 'Apple', type: 'Stock' },
];

export const SymbolSelector = ({ currentSymbol, onSymbolChange }: SymbolSelectorProps) => {
    return (
        <div className="relative group">
            <div className="flex items-center space-x-2 bg-slate-800 p-2 rounded-md cursor-pointer hover:bg-slate-700 transition-colors">
                <Search className="w-4 h-4 text-slate-400" />
                <span className="font-bold text-white">{currentSymbol}</span>
            </div>

            <div className="absolute top-full left-0 mt-2 w-64 bg-slate-800 border border-slate-700 rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <div className="p-2 text-xs font-semibold text-slate-500 uppercase">Select Symbol</div>
                {SYMBOLS.map((s) => (
                    <div
                        key={s.id}
                        className={`px-4 py-2 cursor-pointer hover:bg-slate-700 flex justify-between items-center ${currentSymbol === s.id ? 'bg-slate-700' : ''}`}
                        onClick={() => onSymbolChange(s.id)}
                    >
                        <span className="text-white font-medium">{s.id}</span>
                        <span className="text-xs text-slate-400">{s.type}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
