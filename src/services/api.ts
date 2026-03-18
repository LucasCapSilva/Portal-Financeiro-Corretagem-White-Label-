import { MOCK_STOCKS, MOCK_INDICES, MOCK_PORTFOLIO, MOCK_ORDERS, generateChartData } from './mockData';
import type { Stock, MarketIndex, TimeRange } from '../types/market';
import { AlphaVantageService } from './alphaVantage';

// Simulation of API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const MarketService = {
  getIndices: async (): Promise<MarketIndex[]> => {
    // Try to get real IBOV data if API is enabled
    if (AlphaVantageService.isEnabled()) {
      try {
        const ibovData = await AlphaVantageService.getQuote('^BVSP'); // IBOVESPA symbol on Alpha Vantage
        if (ibovData) {
          const realIbov: MarketIndex = {
            symbol: 'IBOV',
            name: 'IBOVESPA',
            value: ibovData.price,
            change: ibovData.change,
            changePercent: ibovData.changePercent
          };
          
          // Return mixed real/mock data
          return [realIbov, ...MOCK_INDICES.filter(i => i.symbol !== 'IBOV')];
        }
      } catch (error) {
        console.warn('Failed to fetch real IBOV data, using mock', error);
      }
    }

    await delay(500);
    return MOCK_INDICES;
  },

  getStocks: async (): Promise<Stock[]> => {
    // Due to rate limits (5 calls/min), we can't fetch all stocks.
    // We'll stick to mocks for the list view to ensure good UX.
    // In a production app with a paid plan, we would fetch all or use a batch endpoint.
    await delay(800);
    return MOCK_STOCKS;
  },

  getStockDetails: async (symbol: string): Promise<Stock | undefined> => {
    if (AlphaVantageService.isEnabled()) {
      const realStock = await AlphaVantageService.getQuote(symbol);
      if (realStock) return realStock;
    }

    await delay(600);
    return MOCK_STOCKS.find(s => s.symbol === symbol);
  },

  getChartData: async (symbol: string, range: TimeRange) => {
    if (AlphaVantageService.isEnabled()) {
      // Alpha Vantage uses different symbols for indices sometimes, or standard for stocks
      const querySymbol = symbol === 'IBOV' ? '^BVSP' : symbol;
      const realData = await AlphaVantageService.getDailySeries(querySymbol);
      if (realData && realData.length > 0) return realData;
    }

    await delay(1000);
    const stock = MOCK_STOCKS.find(s => s.symbol === symbol) || MOCK_INDICES.find(i => i.symbol === symbol);
    const basePrice = stock ? ( 'price' in stock ? stock.price : stock.value ) : 100;
    const points = range === '1D' ? 24 : range === '1W' ? 7 : 30;
    return generateChartData(basePrice, points, range);
  },

  getPortfolio: async () => {
    await delay(700);
    return MOCK_PORTFOLIO;
  },

  getOrders: async () => {
    await delay(600);
    return MOCK_ORDERS;
  }
};

