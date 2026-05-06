import { useState, useEffect, useCallback } from 'react';
import * as math from 'mathjs';

export const useCalculatorLogic = () => {
  const [equation, setEquation] = useState('');
  const [result, setResult] = useState('0');
  const [isRadians, setIsRadians] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Evaluate the current equation
  const evaluateEquation = useCallback((eq, radiansMode) => {
    if (!eq) return '0';
    try {
      // Replace symbols with math.js understandable format
      let formattedEq = eq
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/π/g, 'pi')
        .replace(/e/g, 'e')
        // mathjs evaluates functions like sin, cos automatically if valid.
        // We need to handle degrees vs radians
        .replace(/sin\(/g, radiansMode ? 'sin(' : 'sin(deg ')
        .replace(/cos\(/g, radiansMode ? 'cos(' : 'cos(deg ')
        .replace(/tan\(/g, radiansMode ? 'tan(' : 'tan(deg ');

      // Basic cleanup for implicit multiplication like 2pi -> 2*pi
      formattedEq = formattedEq.replace(/(\d)(pi|e|sin|cos|tan|log|ln)/g, '$1*$2');

      const res = math.evaluate(formattedEq);
      
      // Handle floating point precision issues (e.g. 0.1 + 0.2)
      return math.format(res, { precision: 14 });
    } catch (error) {
      return ''; // If invalid equation, don't update result (live preview)
    }
  }, []);

  // Update result whenever equation changes
  useEffect(() => {
    if (equation) {
      const liveResult = evaluateEquation(equation, isRadians);
      if (liveResult !== '') {
        setResult(liveResult);
        setHasError(false);
      }
    } else {
      setResult('0');
      setHasError(false);
    }
  }, [equation, isRadians, evaluateEquation]);

  const handleInput = (value) => {
    if (hasError) {
      setEquation(value);
      setResult('0');
      setHasError(false);
      return;
    }

    setEquation(prev => {
      // Basic validation logic
      if (prev === '' && ['+', '×', '÷', '^'].includes(value)) {
        return prev; // Prevent starting with operator
      }
      return prev + value;
    });
  };

  const calculate = () => {
    try {
      const finalResult = evaluateEquation(equation, isRadians);
      if (finalResult === '') {
        throw new Error('Invalid Expression');
      }
      setEquation(finalResult.toString());
      setResult(finalResult.toString());
      setHasError(false);
    } catch (error) {
      setResult('Error');
      setHasError(true);
    }
  };

  const clear = () => {
    setEquation('');
    setResult('0');
    setHasError(false);
  };

  const deleteLast = () => {
    setEquation(prev => prev.slice(0, -1));
    if (hasError) setHasError(false);
  };

  const toggleAngleMode = () => {
    setIsRadians(!isRadians);
  };

  // Keyboard support mapping
  const handleKeyDown = useCallback((e) => {
    const key = e.key;
    
    // Ignore keydown if a modifier is pressed (so we don't block refresh, devtools, etc.)
    if (e.ctrlKey || e.metaKey || e.altKey) return;

    // Mapping physical keys to calculator functions
    if (/[0-9.]/.test(key)) {
      handleInput(key);
    } else if (['+', '-'].includes(key)) {
      handleInput(key);
    } else if (key === '*') {
      handleInput('×');
    } else if (key === '/') {
      handleInput('÷');
      e.preventDefault(); // Prevent quick search in Firefox
    } else if (key === 'Enter' || key === '=') {
      calculate();
      e.preventDefault(); // Prevent form submission
    } else if (key === 'Backspace') {
      deleteLast();
    } else if (key === 'Escape') {
      clear();
    } else if (key === '(' || key === ')') {
      handleInput(key);
    } else if (key === '^') {
      handleInput('^');
    }
  }, [equation, hasError]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return {
    equation,
    result,
    isRadians,
    handleInput,
    calculate,
    clear,
    deleteLast,
    toggleAngleMode
  };
};
