import { Bell, Search, User } from 'lucide-react';
import { useThemeStore } from '../../store/useThemeStore';

export const Header = () => {
  const { toggleTheme, themeMode } = useThemeStore();

  return (
    <header className="h-16 px-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative max-w-md w-full hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Buscar ativos, ordens..." 
            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border-none rounded-lg focus:ring-2 focus:ring-brand-500 transition-all text-sm outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 transition-colors"
        >
          {themeMode === 'dark' ? '🌞' : '🌙'}
        </button>
        
        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-900"></span>
        </button>

        <div className="h-8 w-px bg-gray-200 dark:bg-gray-700 mx-2"></div>

        <button className="flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-800 py-1.5 px-3 rounded-lg transition-colors">
          <div className="w-8 h-8 rounded-full bg-brand-100 dark:bg-brand-900 flex items-center justify-center text-brand-600 dark:text-brand-400 font-bold">
            <User size={18} />
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-sm font-medium text-gray-900 dark:text-white">Investidor</p>
            <p className="text-xs text-gray-500">Premium</p>
          </div>
        </button>
      </div>
    </header>
  );
};
