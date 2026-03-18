import { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { MarketService } from '../../services/api';
import type { TimeRange, ChartDataPoint } from '../../types/market';
import clsx from 'clsx';

const ranges: TimeRange[] = ['1D', '1W', '1M', '3M', '1Y'];

export const MarketOverviewChart = () => {
  const [data, setData] = useState<ChartDataPoint[]>([]);
  const [range, setRange] = useState<TimeRange>('1D');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await MarketService.getChartData('IBOV', range);
        setData(result);
      } catch (error) {
        console.error('Failed to fetch chart data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [range]);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card p-6 col-span-2 lg:col-span-3 h-[400px] flex flex-col"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Visão Geral do Mercado (IBOV)</h3>
        <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          {ranges.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={clsx(
                "px-3 py-1 text-xs font-medium rounded-md transition-all",
                range === r 
                  ? "bg-white dark:bg-gray-700 text-brand-600 dark:text-brand-400 shadow-sm" 
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              )}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 w-full min-h-0">
        {loading ? (
          <div className="h-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-500"></div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="rgb(var(--color-brand-500))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="rgb(var(--color-brand-500))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgb(var(--color-secondary-200))" opacity={0.1} />
              <XAxis 
                dataKey="time" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: 'currentColor', fontSize: 12, opacity: 0.6 }} 
                dy={10}
              />
              <YAxis 
                domain={['auto', 'auto']} 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: 'currentColor', fontSize: 12, opacity: 0.6 }} 
                tickFormatter={(value) => value.toLocaleString('pt-BR', { notation: 'compact' })}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--bg-card)', 
                  borderColor: 'rgb(var(--color-secondary-200))',
                  backdropFilter: 'blur(8px)',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  color: 'currentColor'
                }}
                itemStyle={{ color: 'rgb(var(--color-brand-500))', fontWeight: 'bold' }}
                labelStyle={{ color: 'currentColor', opacity: 0.7, marginBottom: '4px' }}
                formatter={(value: any) => [Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), 'Valor']}
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="rgb(var(--color-brand-500))" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorValue)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </motion.div>
  );
};
