import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Algorithms from './pages/Algorithms';
import Contact from './pages/Contact';
import VisualizerPage from './pages/VisualizerPage';
import { bubbleSort, bubbleSortCPP } from './algorithms/bubbleSort';
import { selectionSort , selectionSortCPP} from './algorithms/selectionSort';

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-slate-900 text-white selection:bg-blue-500/30">
        <Navbar />
        
        {/* Changed 'flex' to 'block' to avoid layout issues with the footer */}
        <main className="block"> 
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/algorithms" element={<Algorithms />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* ONLY ONE ROUTE HERE */}
            <Route 
              path="/visualizer/bubble-sort" 
              element={<VisualizerPage name="Bubble Sort" codeSnippet={bubbleSortCPP} />} 
            />
            <Route 
              path="/visualizer/selection-sort"
              element={<VisualizerPage name="Selection Sort" codeSnippet={selectionSortCPP} />}
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}
