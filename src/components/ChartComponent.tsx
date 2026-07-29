import { useEffect, useRef } from 'react';
import { createChart, ColorType, type IChartApi, type ISeriesApi, type Time, CandlestickSeries, AreaSeries } from 'lightweight-charts';
import { massiveClient } from '../api/massiveClient';

interface ChartComponentProps {
    symbol: string;
    interval: string;
    isCandlestick?: boolean;
}

export const ChartComponent = ({ symbol, interval, isCandlestick = true }: ChartComponentProps) => {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<IChartApi | null>(null);
    const seriesRef = useRef<ISeriesApi<"Candlestick"> | ISeriesApi<"Area"> | null>(null);

    useEffect(() => {
        if (!chartContainerRef.current) return;

        const chart = createChart(chartContainerRef.current, {
            layout: {
                background: { type: ColorType.Solid, color: '#0f172a' }, // Tailwind slate-900
                textColor: '#d1d5db',
            },
            grid: {
                vertLines: { color: '#334155' },
                horzLines: { color: '#334155' },
            },
            width: chartContainerRef.current.clientWidth,
            height: chartContainerRef.current.clientHeight,
        });

        chartRef.current = chart;

        const newSeries = isCandlestick
            ? chart.addSeries(CandlestickSeries, {
                upColor: '#26a69a',
                downColor: '#ef5350',
                borderVisible: false,
                wickUpColor: '#26a69a',
                wickDownColor: '#ef5350',
            })
            : chart.addSeries(AreaSeries, {
                lineColor: '#2962FF',
                topColor: '#2962FF',
                bottomColor: 'rgba(41, 98, 255, 0.28)',
            });

        seriesRef.current = newSeries;

        const handleResize = () => {
            if (chartContainerRef.current) {
                chart.applyOptions({ width: chartContainerRef.current.clientWidth });
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            chart.remove();
        };
    }, [isCandlestick]);

    useEffect(() => {
        if (!seriesRef.current) return;

        const fetchData = async () => {
            const data = await massiveClient.getCandles(symbol, interval);
            // Sort data by time just in case
            const sortedData = data.sort((a, b) => (a.time as number) - (b.time as number));

            if (isCandlestick) {
                const candlestickData = sortedData.map(d => ({
                    time: d.time as Time,
                    open: d.open,
                    high: d.high,
                    low: d.low,
                    close: d.close,
                }));
                (seriesRef.current as ISeriesApi<"Candlestick">).setData(candlestickData);
            } else {
                // For Area series, we only need time and value (close price)
                const areaData = sortedData.map(d => ({ time: d.time as Time, value: d.close }));
                (seriesRef.current as ISeriesApi<"Area">).setData(areaData);
            }
        };

        fetchData();

        const unsubscribe = massiveClient.subscribeToTicker(symbol, (candle) => {
            if (seriesRef.current) {
                if (isCandlestick) {
                    (seriesRef.current as ISeriesApi<"Candlestick">).update({
                        time: candle.time as Time,
                        open: candle.open,
                        high: candle.high,
                        low: candle.low,
                        close: candle.close,
                    });
                } else {
                    (seriesRef.current as ISeriesApi<"Area">).update({ time: candle.time as Time, value: candle.close });
                }
            }
        });

        return () => {
            unsubscribe();
        };
    }, [symbol, interval, isCandlestick]);

    return (
        <div ref={chartContainerRef} className="w-full h-full" />
    );
};
