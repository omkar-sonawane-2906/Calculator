import { useState, useEffect } from 'react';
import { Sun, Moon, Delete } from 'lucide-react';
import Display from './components/Display';
import Button from './components/Button';
import { useCalculatorLogic } from './hooks/useCalculatorLogic';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  
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
    <div className="min-h-screen flex items-center justify-center p-4 transition-colors duration-500 bg-background relative overflow-hidden">
      
      {/* Decorative background blobs for aesthetic */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-accent/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-pink-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>

      {/* Main Calculator Container */}
      <main className="w-full max-w-md glass-panel p-6 sm:p-8 rounded-[2rem] z-10">
        
        {/* Header Controls */}
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={toggleAngleMode}
            className="px-4 py-2 rounded-full bg-surface-hover/50 text-sm font-semibold tracking-wider hover:bg-surface-hover transition-colors border border-border/50 text-muted-foreground"
          >
            {isRadians ? 'RAD' : 'DEG'}
          </button>
          
          <button 
            onClick={toggleTheme}
            className="p-3 rounded-full bg-surface-hover/50 hover:bg-surface-hover transition-colors border border-border/50 text-foreground"
            aria-label="Toggle Theme"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Display Area */}
        <Display equation={equation} result={result} isDark={isDarkMode} />

        {/* Keypad Grid */}
        <div className="grid grid-cols-4 gap-3 sm:gap-4">
          
          {/* Scientific Functions */}
          <Button onClick={() => handleInput('sin(')} variant="secondary" className="text-sm">sin</Button>
          <Button onClick={() => handleInput('cos(')} variant="secondary" className="text-sm">cos</Button>
          <Button onClick={() => handleInput('tan(')} variant="secondary" className="text-sm">tan</Button>
          <Button onClick={() => handleInput('^')} variant="secondary" className="text-sm">x^y</Button>

          <Button onClick={() => handleInput('log(')} variant="secondary" className="text-sm">log</Button>
          <Button onClick={() => handleInput('ln(')} variant="secondary" className="text-sm">ln</Button>
          <Button onClick={() => handleInput('e')} variant="secondary" className="text-sm">e</Button>
          <Button onClick={() => handleInput('π')} variant="secondary" className="text-sm">π</Button>
          
          <Button onClick={() => handleInput('(')} variant="secondary" className="text-sm">(</Button>
          <Button onClick={() => handleInput(')')} variant="secondary" className="text-sm">)</Button>
          <Button onClick={deleteLast} variant="danger"><Delete size={20} /></Button>
          <Button onClick={clear} variant="danger" className="font-bold">C</Button>

          {/* Numbers & Core Operators */}
          <Button onClick={() => handleInput('7')}>7</Button>
          <Button onClick={() => handleInput('8')}>8</Button>
          <Button onClick={() => handleInput('9')}>9</Button>
          <Button onClick={() => handleInput('÷')} variant="accent" className="text-2xl">÷</Button>

          <Button onClick={() => handleInput('4')}>4</Button>
          <Button onClick={() => handleInput('5')}>5</Button>
          <Button onClick={() => handleInput('6')}>6</Button>
          <Button onClick={() => handleInput('×')} variant="accent" className="text-2xl">×</Button>

          <Button onClick={() => handleInput('1')}>1</Button>
          <Button onClick={() => handleInput('2')}>2</Button>
          <Button onClick={() => handleInput('3')}>3</Button>
          <Button onClick={() => handleInput('-')} variant="accent" className="text-3xl">-</Button>

          <Button onClick={() => handleInput('0')} size="wide">0</Button>
          <Button onClick={() => handleInput('.')}>.</Button>
          <Button onClick={() => handleInput('+')} variant="accent" className="text-2xl">+</Button>

          <Button onClick={calculate} variant="accent" size="wide" className="col-span-4 mt-2">
            <span className="text-2xl">=</span>
          </Button>

        </div>
      </main>
    </div>
  );
}

export default App;
