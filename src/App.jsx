import { useState, useEffect } from 'react';
import { Sun, Moon, Delete, Calculator, Beaker } from 'lucide-react';
import Display from './components/Display';
import Button from './components/Button';
import { useCalculatorLogic } from './hooks/useCalculatorLogic';
import { cn } from './utils';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showScientific, setShowScientific] = useState(false);
  
  const {
    equation,
    result,
    isRadians,
    handleInput,
    calculate,
    clear,
    deleteLast,
    toggleAngleMode
  } = useCalculatorLogic();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <div className="min-h-[100dvh] w-full flex items-center justify-center p-3 sm:p-6 transition-colors duration-500 bg-background relative overflow-hidden pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))]">
      
      {/* Decorative background blobs for aesthetic */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-accent/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob pointer-events-none"></div>
      <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000 pointer-events-none"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-pink-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000 pointer-events-none"></div>

      {/* Main Calculator Container */}
      <main className="w-full max-w-sm md:max-w-3xl glass-panel p-4 sm:p-8 rounded-[2rem] z-10 flex flex-col shadow-2xl">
        
        {/* Header Controls */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <button 
            onClick={toggleAngleMode}
            className="px-4 py-2 rounded-full bg-surface-hover/50 text-xs sm:text-sm font-semibold tracking-wider hover:bg-surface-hover transition-colors border border-border/50 text-muted-foreground"
          >
            {isRadians ? 'RAD' : 'DEG'}
          </button>
          
          <div className="flex items-center gap-2">
            {/* Mobile Scientific Toggle */}
            <button 
              onClick={() => setShowScientific(!showScientific)}
              className={cn(
                "md:hidden flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-colors border",
                showScientific 
                  ? "bg-accent/10 border-accent/20 text-accent" 
                  : "bg-surface-hover/50 border-border/50 text-muted-foreground hover:bg-surface-hover"
              )}
            >
              {showScientific ? <Calculator size={16} /> : <Beaker size={16} />}
              {showScientific ? 'BASIC' : 'SCI'}
            </button>

            <button 
              onClick={toggleTheme}
              className="p-2 sm:p-3 rounded-full bg-surface-hover/50 hover:bg-surface-hover transition-colors border border-border/50 text-foreground"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun size={18} className="sm:w-5 sm:h-5" /> : <Moon size={18} className="sm:w-5 sm:h-5" />}
            </button>
          </div>
        </div>

        {/* Display Area */}
        <Display equation={equation} result={result} />

        {/* Keypads Container */}
        <div className="flex flex-col md:flex-row gap-3 sm:gap-6">
          
          {/* Scientific Panel (Hidden on mobile unless toggled, side-by-side on desktop) */}
          <div className={cn(
            "grid grid-cols-4 md:grid-cols-2 gap-2 sm:gap-3 md:w-48 lg:w-56",
            showScientific ? "grid" : "hidden md:grid"
          )}>
            <Button onClick={() => handleInput('sin(')} variant="secondary" className="text-sm">sin</Button>
            <Button onClick={() => handleInput('cos(')} variant="secondary" className="text-sm">cos</Button>
            <Button onClick={() => handleInput('tan(')} variant="secondary" className="text-sm">tan</Button>
            <Button onClick={() => handleInput('%')} variant="secondary" className="text-sm">%</Button>

            <Button onClick={() => handleInput('log(')} variant="secondary" className="text-sm">log</Button>
            <Button onClick={() => handleInput('ln(')} variant="secondary" className="text-sm">ln</Button>
            <Button onClick={() => handleInput('e')} variant="secondary" className="text-sm">e</Button>
            <Button onClick={() => handleInput('π')} variant="secondary" className="text-sm">π</Button>
            
            <Button onClick={() => handleInput('sqrt(')} variant="secondary" className="text-sm">√</Button>
            <Button onClick={() => handleInput('^2')} variant="secondary" className="text-sm">x²</Button>
            <Button onClick={() => handleInput('^')} variant="secondary" className="text-sm">x^y</Button>
            <Button onClick={() => handleInput('!')} variant="secondary" className="text-sm">!</Button>
          </div>

          {/* Basic Panel (Always visible) */}
          <div className="grid grid-cols-4 gap-2 sm:gap-3 flex-1">
            <Button onClick={() => handleInput('(')} variant="secondary">(</Button>
            <Button onClick={() => handleInput(')')} variant="secondary">)</Button>
            <Button onClick={deleteLast} variant="danger"><Delete size={18} className="sm:w-5 sm:h-5" /></Button>
            <Button onClick={clear} variant="danger" className="font-bold">C</Button>

            <Button onClick={() => handleInput('7')}>7</Button>
            <Button onClick={() => handleInput('8')}>8</Button>
            <Button onClick={() => handleInput('9')}>9</Button>
            <Button onClick={() => handleInput('÷')} variant="accent" className="text-xl sm:text-2xl">÷</Button>

            <Button onClick={() => handleInput('4')}>4</Button>
            <Button onClick={() => handleInput('5')}>5</Button>
            <Button onClick={() => handleInput('6')}>6</Button>
            <Button onClick={() => handleInput('×')} variant="accent" className="text-xl sm:text-2xl">×</Button>

            <Button onClick={() => handleInput('1')}>1</Button>
            <Button onClick={() => handleInput('2')}>2</Button>
            <Button onClick={() => handleInput('3')}>3</Button>
            <Button onClick={() => handleInput('-')} variant="accent" className="text-2xl sm:text-3xl">-</Button>

            <Button onClick={() => handleInput('0')} size="wide">0</Button>
            <Button onClick={() => handleInput('.')}>.</Button>
            <Button onClick={() => handleInput('+')} variant="accent" className="text-xl sm:text-2xl">+</Button>

            <Button onClick={calculate} variant="accent" size="wide" className="col-span-4 mt-1 sm:mt-2">
              <span className="text-2xl">=</span>
            </Button>
          </div>

        </div>
      </main>
    </div>
  );
}

export default App;
