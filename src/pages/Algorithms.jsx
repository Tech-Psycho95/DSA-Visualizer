import { Link } from 'react-router-dom';
import { ArrowRight, BarChart2 } from 'lucide-react';

export default function Algorithms() {
  const algorithms = [
    {
      id: 'bubble-sort',
      title: 'Bubble Sort',
      description: 'A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
      path: '/visualizer/bubble-sort'
    },
    {
      id: "selection-sort",
      title:"Selection Sort",
      description:"Selection sort repeatedly finds the smallest element in the unsorted part of the array and places it in its correct position. ",
      path: '/visualizer/selection-sort'
    }
    // Future algorithms can be added here easily!
  ];

  return (
    <div className="max-w-6xl mx-auto py-16 px-6">
      <div className="mb-12">
        <h1 className="text-4xl font-black text-white">Algorithms</h1>
        <p className="text-slate-400 mt-2">Select an algorithm to start the visualization.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {algorithms.map((algo) => (
          <div key={algo.id} className="bg-slate-800/50 border border-slate-700 rounded-3xl p-8 hover:border-blue-500 transition-all group shadow-xl">
            <div className="bg-blue-500/10 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 text-blue-500">
              <BarChart2 size={24} />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">{algo.title}</h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              {algo.description}
            </p>
            <Link 
              to={algo.path} 
              className="flex items-center gap-2 text-blue-500 font-bold hover:gap-4 transition-all"
            >
              Visualize Now <ArrowRight size={18} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}