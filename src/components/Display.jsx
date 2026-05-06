import React from 'react';
import { cn } from '../utils';

const Display = ({ equation, result, isDark }) => {
  return (
    <div className="w-full flex flex-col items-end justify-between bg-surface/50 dark:bg-surface/30 p-6 rounded-2xl mb-6 shadow-inner border border-white/10 overflow-hidden h-32 relative">
      {/* Equation / Input String */}
      <div 
        className={cn(
          "w-full text-right font-mono text-xl md:text-2xl tracking-wider text-muted-foreground truncate transition-all duration-300",
          equation ? 'opacity-100' : 'opacity-0'
        )}
      >
        {equation || '\u00A0'}
      </div>

      {/* Main Result */}
      <div 
        className={cn(
          "w-full text-right font-mono text-4xl md:text-5xl font-bold tracking-tight text-foreground truncate transition-all duration-300 mt-2",
        )}
      >
        {result || '0'}
      </div>
      
      {/* Subtle overlay for glass effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/5 pointer-events-none rounded-2xl" />
    </div>
  );
};

export default Display;
