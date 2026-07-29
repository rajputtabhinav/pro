// import axios from 'axios';

// Configuration
// const API_BASE_URL = 'https://api.massive.com'; // Placeholder
// const WS_URL = 'wss://ws.massive.com'; // Placeholder
// const API_KEY = '18dd78cc-6754-484b-8844-bab2f181d590'; // From user image
// const SECRET_KEY = '...'; // Not safe to expose in client-side code usually, but might be needed for some APIs

export interface Candle {
    time: number;
    open: number;
    high: number;
    low: number;
    close: number;
}

export const massiveClient = {
    async getCandles(symbol: string, interval: string): Promise<Candle[]> {
        // MOCK DATA GENERATOR
        // In a real app, we would fetch from API
        // const response = await axios.get(`${API_BASE_URL}/candles`, { params: { symbol, interval, key: API_KEY } });
        // return response.data;

        console.log(`Fetching historical data for ${symbol} ${interval}`);
        const now = Math.floor(Date.now() / 1000);
        const candles: Candle[] = [];
        let price = 100 + Math.random() * 50;

        // Generate 1000 candles
        for (let i = 1000; i > 0; i--) {
            const time = now - i * 60; // 1 minute interval
            const change = (Math.random() - 0.5) * 2;
            const open = price;
            const close = price + change;
            const high = Math.max(open, close) + Math.random();
            const low = Math.min(open, close) - Math.random();

            candles.push({
                time: time as any, // Lightweight charts expects seconds for UTCTimestamp
                open,
                high,
                low,
                close,
            });
            price = close;
        }
        return candles;
    },

    subscribeToTicker(symbol: string, callback: (candle: Candle) => void) {
        console.log(`Subscribing to ${symbol}`);

        // MOCK LIVE DATA
        const intervalId = setInterval(() => {
            const now = Math.floor(Date.now() / 1000);
            const lastPrice = 100 + Math.random() * 50; // Just random for now, ideally should continue from last candle
            const change = (Math.random() - 0.5) * 0.5;
            const open = lastPrice;
            const close = lastPrice + change;
            const high = Math.max(open, close) + Math.random() * 0.1;
            const low = Math.min(open, close) - Math.random() * 0.1;

            callback({
                time: now as any,
                open,
                high,
                low,
                close,
            });
        }, 1000); // Update every second

        return () => clearInterval(intervalId);
    }
};
