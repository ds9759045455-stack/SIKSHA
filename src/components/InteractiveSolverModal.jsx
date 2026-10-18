import React, { useState } from 'react';
import { X, Calculator, Play, RotateCcw, CheckCircle2, ChevronRight, Sparkles, Sliders, Edit3, ArrowRight } from 'lucide-react';

export const InteractiveSolverModal = ({ isOpen, onClose }) => {
  // Methods: 'bisection' | 'regula' | 'newton'
  const [method, setMethod] = useState('bisection');
  
  // Equation mode: 'polynomial' | 'trig'
  const [equationMode, setEquationMode] = useState('polynomial');

  // Polynomial coefficients: f(x) = a*x^3 + b*x^2 + c*x + d
  const [coeffA, setCoeffA] = useState(1);   // x^3
  const [coeffB, setCoeffB] = useState(0);   // x^2
  const [coeffC, setCoeffC] = useState(-4);  // x
  const [coeffD, setCoeffD] = useState(-9);  // constant

  // Trig coefficients: f(x) = tA * x * sin(x) + tB * cos(x) + tC
  const [trigA, setTrigA] = useState(1);
  const [trigB, setTrigB] = useState(1);
  const [trigC, setTrigC] = useState(0);

  // Interval & search bounds
  const [bisectionA, setBisectionA] = useState(2);
  const [bisectionB, setBisectionB] = useState(3);
  const [newtonX0, setNewtonX0] = useState(3.0);

  // Solver parameters
  const [maxIterations, setMaxIterations] = useState(7);
  const [tolerance, setTolerance] = useState(0.001);

  if (!isOpen) return null;

  // Evaluate f(x) with user's customized equation values
  const evalCustomFunc = (x) => {
    if (equationMode === 'polynomial') {
      const a = parseFloat(coeffA) || 0;
      const b = parseFloat(coeffB) || 0;
      const c = parseFloat(coeffC) || 0;
      const d = parseFloat(coeffD) || 0;
      return a * Math.pow(x, 3) + b * Math.pow(x, 2) + c * x + d;
    } else {
      const a = parseFloat(trigA) || 0;
      const b = parseFloat(trigB) || 0;
      const c = parseFloat(trigC) || 0;
      return a * x * Math.sin(x) + b * Math.cos(x) + c;
    }
  };

  // Derivative f'(x)
  const evalCustomDerivative = (x) => {
    if (equationMode === 'polynomial') {
      const a = parseFloat(coeffA) || 0;
      const b = parseFloat(coeffB) || 0;
      const c = parseFloat(coeffC) || 0;
      return 3 * a * Math.pow(x, 2) + 2 * b * x + c;
    } else {
      const a = parseFloat(trigA) || 0;
      const b = parseFloat(trigB) || 0;
      // d/dx [a*x*sin(x) + b*cos(x) + c] = a*sin(x) + a*x*cos(x) - b*sin(x)
      return a * Math.sin(x) + a * x * Math.cos(x) - b * Math.sin(x);
    }
  };

  // Helper to format equation string
  const getEquationDisplay = () => {
    if (equationMode === 'polynomial') {
      const parts = [];
      const a = parseFloat(coeffA) || 0;
      const b = parseFloat(coeffB) || 0;
      const c = parseFloat(coeffC) || 0;
      const d = parseFloat(coeffD) || 0;

      if (a !== 0) parts.push(`${a === 1 ? '' : a === -1 ? '-' : a}x³`);
      if (b !== 0) parts.push(`${b > 0 && parts.length ? '+ ' : ''}${b === 1 ? '' : b === -1 ? '-' : b}x²`);
      if (c !== 0) parts.push(`${c > 0 && parts.length ? '+ ' : ''}${c === 1 ? '' : c === -1 ? '-' : c}x`);
      if (d !== 0) parts.push(`${d > 0 && parts.length ? '+ ' : ''}${d}`);
      if (!parts.length) return 'f(x) = 0';
      return `f(x) = ${parts.join(' ')} = 0`;
    } else {
      return `f(x) = ${trigA}·x·sin(x) + ${trigB}·cos(x) ${trigC >= 0 ? '+ ' + trigC : trigC} = 0`;
    }
  };

  const getDerivativeDisplay = () => {
    if (equationMode === 'polynomial') {
      const a = parseFloat(coeffA) || 0;
      const b = parseFloat(coeffB) || 0;
      const c = parseFloat(coeffC) || 0;
      const parts = [];
      if (3 * a !== 0) parts.push(`${3 * a}x²`);
      if (2 * b !== 0) parts.push(`${2 * b > 0 && parts.length ? '+ ' : ''}${2 * b}x`);
      if (c !== 0) parts.push(`${c > 0 && parts.length ? '+ ' : ''}${c}`);
      return `f'(x) = ${parts.join(' ') || '0'}`;
    } else {
      return `f'(x) = ${trigA}·sin(x) + ${trigA}·x·cos(x) - ${trigB}·sin(x)`;
    }
  };

  // Quick preset loader
  const applyPreset = (key) => {
    if (key === 'bca-ex1') {
      setEquationMode('polynomial');
      setCoeffA(1);
      setCoeffB(0);
      setCoeffC(-4);
      setCoeffD(-9);
      setBisectionA(2);
      setBisectionB(3);
      setNewtonX0(2.5);
    } else if (key === 'bca-ex2') {
      setEquationMode('polynomial');
      setCoeffA(1);
      setCoeffB(0);
      setCoeffC(-2);
      setCoeffD(-5);
      setBisectionA(2);
      setBisectionB(3);
      setNewtonX0(2.0);
    } else if (key === 'bca-ex3') {
      setEquationMode('trig');
      setTrigA(1);
      setTrigB(1);
      setTrigC(0);
      setNewtonX0(3.0);
      setBisectionA(2.5);
      setBisectionB(3.5);
    } else if (key === 'sqrt2') {
      setEquationMode('polynomial');
      setCoeffA(0);
      setCoeffB(1);
      setCoeffC(0);
      setCoeffD(-2);
      setBisectionA(1);
      setBisectionB(2);
      setNewtonX0(1.5);
    } else if (key === 'cube8') {
      setEquationMode('polynomial');
      setCoeffA(1);
      setCoeffB(0);
      setCoeffC(0);
      setCoeffD(-8);
      setBisectionA(1);
      setBisectionB(3);
      setNewtonX0(2.5);
    }
  };

  // Execution algorithm
  const solveEquations = () => {
    let a = parseFloat(bisectionA);
    let b = parseFloat(bisectionB);
    const rows = [];

    if (method === 'bisection' || method === 'regula') {
      let fa = evalCustomFunc(a);
      let fb = evalCustomFunc(b);

      if (isNaN(fa) || isNaN(fb)) {
        return { error: 'Error calculating function values at interval endpoints.', rows: [] };
      }

      if (fa * fb > 0) {
        return {
          error: `Initial bracket warning: f(${a})=${fa.toFixed(2)} and f(${b})=${fb.toFixed(2)} have the SAME sign. Bolzano's theorem requires f(a) * f(b) < 0. Try adjusting interval [a, b].`,
          rows: []
        };
      }

      for (let k = 1; k <= maxIterations; k++) {
        let xk;
        if (method === 'bisection') {
          // Midpoint
          xk = (a + b) / 2;
        } else {
          // Regula-Falsi chord intersection
          xk = (a * fb - b * fa) / (fb - fa);
        }

        const fxk = evalCustomFunc(xk);

        rows.push({
          k,
          a: a.toFixed(4),
          b: b.toFixed(4),
          xk: xk.toFixed(4),
          fxk: fxk.toFixed(4),
          nextInterval: fa * fxk < 0 ? `[${a.toFixed(4)}, ${xk.toFixed(4)}]` : `[${xk.toFixed(4)}, ${b.toFixed(4)}]`
        });

        if (Math.abs(fxk) < tolerance || Math.abs(b - a) < tolerance) {
          break;
        }

        if (fa * fxk < 0) {
          b = xk;
          fb = fxk;
        } else {
          a = xk;
          fa = fxk;
        }
      }

      return { rows, root: rows[rows.length - 1]?.xk };
    } else {
      // Newton-Raphson
      let xn = parseFloat(newtonX0);

      for (let k = 1; k <= maxIterations; k++) {
        const fxn = evalCustomFunc(xn);
        const dfxn = evalCustomDerivative(xn);

        if (Math.abs(dfxn) < 0.000001) {
          return {
            error: `Derivative is approximately zero: f'(${xn.toFixed(4)}) ≈ 0. Tangent line is parallel to x-axis. Try a different initial guess x₀.`,
            rows
          };
        }

        const h = -fxn / dfxn;
        const xNext = xn + h;

        rows.push({
          k,
          xn: xn.toFixed(4),
          fxn: fxn.toFixed(5),
          dfxn: dfxn.toFixed(4),
          xNext: xNext.toFixed(4),
          diff: Math.abs(xNext - xn).toFixed(5)
        });

        xn = xNext;
        if (Math.abs(fxn) < tolerance) {
          break;
        }
      }

      return { rows, root: rows[rows.length - 1]?.xNext };
    }
  };

  const results = solveEquations();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-2xl animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl bg-gradient-to-b from-[#201633] via-[#161024] to-[#110c1b] border border-white/20 shadow-[0_25px_70px_rgba(0,0,0,0.9)] text-white overflow-hidden">
        
        {/* Glow */}
        <div className="absolute top-0 right-10 w-80 h-44 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-44 bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Top Bar */}
        <div className="relative z-10 px-5 sm:px-6 py-4 flex items-center justify-between border-b border-white/10 bg-white/[0.04]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-pink-600 flex items-center justify-center text-white shadow-lg">
              <Calculator size={20} />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center space-x-2">
                <span>Interactive Math Equation Solver</span>
                <span className="hidden sm:inline-block text-[10px] px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30">
                  Custom Equation Values
                </span>
              </h2>
              <p className="text-xs text-purple-200/60 font-medium">
                Change coefficients & parameters dynamically • Develop by Shiv.org
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-rose-500/30 text-slate-300 transition-all cursor-pointer border border-white/10"
            title="Close Solver"
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="relative z-10 flex-1 p-4 sm:p-6 overflow-y-auto space-y-5">
          
          {/* Quick Presets Bar */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none text-xs">
            <span className="text-[11px] text-purple-300/70 font-semibold shrink-0">Presets:</span>
            {[
              { id: 'bca-ex1', label: 'x³ - 4x - 9 = 0 (BCA Ex 1)' },
              { id: 'bca-ex2', label: 'x³ - 2x - 5 = 0 (BCA Ex 2)' },
              { id: 'bca-ex3', label: 'x·sin(x) + cos(x) = 0 (Ex 3)' },
              { id: 'sqrt2', label: 'x² - 2 = 0 (√2)' },
              { id: 'cube8', label: 'x³ - 8 = 0 (∛8)' }
            ].map(p => (
              <button
                key={p.id}
                onClick={() => applyPreset(p.id)}
                className="whitespace-nowrap px-3 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-purple-200 hover:text-white transition-all text-xs cursor-pointer active:scale-95"
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Equation Configuration Box (Change Equation Values Feature) */}
          <div className="rounded-2xl p-4 sm:p-5 bg-gradient-to-r from-white/[0.08] to-white/[0.02] border border-white/15 backdrop-blur-xl shadow-lg space-y-4">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div className="flex items-center space-x-2">
                <Sliders size={16} className="text-amber-400" />
                <span className="text-xs sm:text-sm font-bold text-white tracking-wide">
                  Change Equation Values & Coefficients
                </span>
              </div>

              {/* Equation Type Tabs */}
              <div className="inline-flex p-1 rounded-full bg-black/40 border border-white/10 text-xs">
                <button
                  onClick={() => setEquationMode('polynomial')}
                  className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                    equationMode === 'polynomial'
                      ? 'bg-pink-600 text-white font-semibold shadow-sm'
                      : 'text-purple-200/60 hover:text-white'
                  }`}
                >
                  Polynomial: ax³ + bx² + cx + d
                </button>
                <button
                  onClick={() => setEquationMode('trig')}
                  className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                    equationMode === 'trig'
                      ? 'bg-pink-600 text-white font-semibold shadow-sm'
                      : 'text-purple-200/60 hover:text-white'
                  }`}
                >
                  Trigonometric
                </button>
              </div>
            </div>

            {/* Dynamic Formula Banner */}
            <div className="p-3 rounded-xl bg-black/50 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-center sm:text-left">
              <div>
                <div className="text-[10px] text-purple-300/60 uppercase tracking-widest font-mono">Current Equation</div>
                <div className="text-lg sm:text-xl font-mono font-bold text-amber-300">
                  {getEquationDisplay()}
                </div>
              </div>
              <div className="sm:text-right">
                <div className="text-[10px] text-purple-300/60 uppercase tracking-widest font-mono">Calculated Derivative</div>
                <div className="text-xs sm:text-sm font-mono text-purple-200">
                  {getDerivativeDisplay()}
                </div>
              </div>
            </div>

            {/* Coefficient Inputs */}
            {equationMode === 'polynomial' ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10">
                  <label className="block text-[11px] font-semibold text-purple-200 mb-1">
                    a (x³ coeff)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={coeffA}
                    onChange={(e) => setCoeffA(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-black/60 border border-white/15 text-white font-mono text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10">
                  <label className="block text-[11px] font-semibold text-purple-200 mb-1">
                    b (x² coeff)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={coeffB}
                    onChange={(e) => setCoeffB(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-black/60 border border-white/15 text-white font-mono text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10">
                  <label className="block text-[11px] font-semibold text-purple-200 mb-1">
                    c (x coeff)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={coeffC}
                    onChange={(e) => setCoeffC(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-black/60 border border-white/15 text-white font-mono text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10">
                  <label className="block text-[11px] font-semibold text-purple-200 mb-1">
                    d (Constant)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={coeffD}
                    onChange={(e) => setCoeffD(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-black/60 border border-white/15 text-white font-mono text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10">
                  <label className="block text-[11px] font-semibold text-purple-200 mb-1">
                    a (for a·x·sin x)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={trigA}
                    onChange={(e) => setTrigA(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-black/60 border border-white/15 text-white font-mono text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10">
                  <label className="block text-[11px] font-semibold text-purple-200 mb-1">
                    b (for b·cos x)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={trigB}
                    onChange={(e) => setTrigB(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-black/60 border border-white/15 text-white font-mono text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10">
                  <label className="block text-[11px] font-semibold text-purple-200 mb-1">
                    c (Constant)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={trigC}
                    onChange={(e) => setTrigC(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-black/60 border border-white/15 text-white font-mono text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Method & Interval Parameters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Method selection */}
            <div>
              <label className="block text-xs font-semibold text-purple-200 mb-1.5">
                Root Finding Method
              </label>
              <div className="space-y-1.5">
                {[
                  { id: 'bisection', name: 'Bisection (Bolzano)' },
                  { id: 'regula', name: 'Regula-Falsi (Chord)' },
                  { id: 'newton', name: 'Newton-Raphson (Tangent)' }
                ].map(m => (
                  <button
                    key={m.id}
                    onClick={() => setMethod(m.id)}
                    className={`w-full py-2 px-3 rounded-xl text-xs font-semibold text-left transition-all cursor-pointer border ${
                      method === m.id
                        ? 'bg-gradient-to-r from-pink-600/30 to-purple-600/30 border-pink-400 text-white shadow-sm'
                        : 'bg-white/[0.04] border-white/10 text-purple-200/60 hover:text-white'
                    }`}
                  >
                    {m.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Intervals / Initial Guess */}
            <div className="md:col-span-2 space-y-3">
              <label className="block text-xs font-semibold text-purple-200 mb-1">
                Interval & Iteration Controls
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {method !== 'newton' ? (
                  <>
                    <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10">
                      <span className="block text-[10px] text-purple-300 mb-1">Interval [a]</span>
                      <input
                        type="number"
                        step="0.1"
                        value={bisectionA}
                        onChange={(e) => setBisectionA(e.target.value)}
                        className="w-full px-2 py-1 rounded bg-black/50 border border-white/15 text-white font-mono text-xs text-center"
                      />
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10">
                      <span className="block text-[10px] text-purple-300 mb-1">Interval [b]</span>
                      <input
                        type="number"
                        step="0.1"
                        value={bisectionB}
                        onChange={(e) => setBisectionB(e.target.value)}
                        className="w-full px-2 py-1 rounded bg-black/50 border border-white/15 text-white font-mono text-xs text-center"
                      />
                    </div>
                  </>
                ) : (
                  <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 col-span-2">
                    <span className="block text-[10px] text-purple-300 mb-1">Initial Guess (x₀)</span>
                    <input
                      type="number"
                      step="0.1"
                      value={newtonX0}
                      onChange={(e) => setNewtonX0(e.target.value)}
                      className="w-full px-2 py-1 rounded bg-black/50 border border-white/15 text-white font-mono text-xs text-center"
                    />
                  </div>
                )}

                <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10">
                  <span className="block text-[10px] text-purple-300 mb-1">Max Iterations</span>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={maxIterations}
                    onChange={(e) => setMaxIterations(parseInt(e.target.value) || 6)}
                    className="w-full px-2 py-1 rounded bg-black/50 border border-white/15 text-white font-mono text-xs text-center"
                  />
                </div>

                <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10">
                  <span className="block text-[10px] text-purple-300 mb-1">Tolerance (ε)</span>
                  <select
                    value={tolerance}
                    onChange={(e) => setTolerance(parseFloat(e.target.value))}
                    className="w-full px-1.5 py-1 rounded bg-[#1e152d] border border-white/15 text-white text-[11px]"
                  >
                    <option value="0.01">0.01</option>
                    <option value="0.001">0.001</option>
                    <option value="0.0001">0.0001</option>
                    <option value="0.00001">0.00001</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Results Table */}
          <div className="border border-white/15 rounded-2xl bg-black/50 overflow-hidden shadow-xl">
            {results.error ? (
              <div className="p-4 text-xs text-amber-300 bg-amber-500/10 border-l-4 border-amber-500 font-medium leading-relaxed">
                ⚠️ {results.error}
              </div>
            ) : (
              <div className="overflow-x-auto max-h-[260px]">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="sticky top-0 bg-[#251b3d] text-purple-200 border-b border-white/15 text-[11px]">
                    {method !== 'newton' ? (
                      <tr>
                        <th className="p-2.5">Iter (k)</th>
                        <th className="p-2.5">a</th>
                        <th className="p-2.5">b</th>
                        <th className="p-2.5">x_k ({method === 'bisection' ? 'Mid' : 'Chord'})</th>
                        <th className="p-2.5">f(x_k)</th>
                        <th className="p-2.5">Next Interval</th>
                      </tr>
                    ) : (
                      <tr>
                        <th className="p-2.5">Iter (n)</th>
                        <th className="p-2.5">x_n</th>
                        <th className="p-2.5">f(x_n)</th>
                        <th className="p-2.5">f'(x_n)</th>
                        <th className="p-2.5">x_{'{n+1}'}</th>
                        <th className="p-2.5">|Step Error|</th>
                      </tr>
                    )}
                  </thead>
                  <tbody className="divide-y divide-white/5 text-slate-200">
                    {results.rows?.map((row, idx) => (
                      <tr key={idx} className="hover:bg-white/[0.04]">
                        <td className="p-2.5 font-bold text-pink-300">{row.k}</td>
                        {method !== 'newton' ? (
                          <>
                            <td className="p-2.5">{row.a}</td>
                            <td className="p-2.5">{row.b}</td>
                            <td className="p-2.5 text-white font-bold">{row.xk}</td>
                            <td className="p-2.5">{row.fxk}</td>
                            <td className="p-2.5 text-purple-300">{row.nextInterval}</td>
                          </>
                        ) : (
                          <>
                            <td className="p-2.5">{row.xn}</td>
                            <td className="p-2.5">{row.fxn}</td>
                            <td className="p-2.5">{row.dfxn}</td>
                            <td className="p-2.5 text-amber-300 font-bold">{row.xNext}</td>
                            <td className="p-2.5 text-purple-200/70">{row.diff}</td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Root summary outcome */}
          {results.root && !results.error && (
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-500/20 via-teal-500/15 to-transparent border border-emerald-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-emerald-300">
              <div className="flex items-center space-x-2">
                <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                <span>
                  Calculated Approximate Root:{' '}
                  <strong className="text-white font-mono text-base ml-1">
                    x ≈ {results.root}
                  </strong>
                </span>
              </div>
              <span className="text-[11px] font-medium text-emerald-200/80 bg-emerald-500/20 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                Method Converged ({results.rows.length} iterations)
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
