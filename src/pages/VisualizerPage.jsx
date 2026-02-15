import React, { useEffect, useState, useRef } from 'react';
import { useVisualizer } from '../hooks/useVisualizer';
import { motion } from 'framer-motion';
import { RefreshCw, Play, Pause, RotateCcw, Code2 } from 'lucide-react';
import { bubbleSort } from '../algorithms/bubbleSort';

export default function VisualizerPage({ name, codeSnippet }) {
  const { array, setArray, generateRandomArray } = useVisualizer();
  const [isSorting, setIsSorting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  const stopSignal = useRef(false);
  const pauseSignal = useRef(false);

  useEffect(() => {
    generateRandomArray(40);
  }, []);

  const handleReset = () => {
    stopSignal.current = true;
    pauseSignal.current = false;
    setIsSorting(false);
    setIsPaused(false);
    generateRandomArray(40);
  };

  const handleStart = async () => {
    stopSignal.current = false;
    pauseSignal.current = false;
    setIsSorting(true);
    setIsPaused(false);
    await bubbleSort(array, setArray, 30, stopSignal, pauseSignal);
    if (!stopSignal.current && !pauseSignal.current) setIsSorting(false);
  };

  return (
    <div className="flex flex-col items-center w-full bg-slate-900">
      
      {/* Heading */}
      <div className="pt-12 pb-8 text-center">
        <h1 className="text-6xl font-black tracking-tighter text-white uppercase italic">
          DSA <span className="text-blue-500">Visualizer</span>
        </h1>
        <h2 className="text-2xl font-semibold text-slate-400 mt-2 tracking-[0.3em] uppercase">
          {name}
        </h2>
      </div>

      {/* Visualizer Canvas */}
      <div className="flex flex-col items-center px-4 md:px-10 pb-12 w-full max-w-7xl">
        <div className="relative flex items-end justify-center gap-1 h-[450px] w-full bg-slate-800/20 p-8 rounded-3xl border border-slate-700/50 shadow-2xl backdrop-blur-sm">
          {array.map((item, idx) => (
            <motion.div
              key={idx}
              layout
              className={`flex-grow rounded-t-lg transition-colors duration-150 ${
                item.status === 'comparing' ? 'bg-yellow-400' :
                item.status === 'swapping' ? 'bg-red-500' :
                item.status === 'sorted' ? 'bg-green-500' : 'bg-blue-600'
              }`}
              style={{ height: `${(item.value / 400) * 100}%` }} 
            />
          ))}
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <button onClick={handleReset} className="flex gap-2 items-center bg-slate-800 hover:bg-slate-700 border border-slate-600 px-8 py-4 rounded-2xl font-black text-white">
            <RotateCcw size={22} /> RESET
          </button>
          {!isSorting ? (
            <button onClick={handleStart} className="flex gap-2 items-center bg-blue-600 hover:bg-blue-500 px-12 py-4 rounded-2xl font-black text-white">
              <Play size={22} fill="currentColor" /> START
            </button>
          ) : isPaused ? (
            <button onClick={() => { pauseSignal.current = false; setIsPaused(false); }} className="flex gap-2 items-center bg-green-600 hover:bg-green-500 px-12 py-4 rounded-2xl font-black text-white">
              <Play size={22} fill="currentColor" /> RESUME
            </button>
          ) : (
            <button onClick={() => { pauseSignal.current = true; setIsPaused(true); }} className="flex gap-2 items-center bg-yellow-500 hover:bg-yellow-400 px-12 py-4 rounded-2xl font-black text-slate-900">
              <Pause size={22} fill="currentColor" /> STOP
            </button>
          )}
        </div>
      </div>

      {/* C++ Code Section */}
      <div className="w-full max-w-5xl px-4 pb-24 mt-12">
        <div className="bg-slate-950 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden">
          <div className="bg-slate-900 px-6 py-4 border-b border-slate-800 flex items-center gap-3 text-white">
            <Code2 size={20} className="text-blue-500" />
            <span className="font-bold tracking-widest text-sm uppercase">C++ Implementation</span>
          </div>
          <div className="p-8 overflow-x-auto">
            <pre className="text-sm font-mono leading-relaxed text-blue-100 whitespace-pre">
              <code>{codeSnippet}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
