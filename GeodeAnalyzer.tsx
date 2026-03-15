import React, { useState } from 'react';
import { GeodeResult } from '../types';
import { analyzeGeode } from '../services/geminiService';
import { Sparkles, Loader2, Diamond } from 'lucide-react';

interface GeodeAnalyzerProps {
  geodeCount: number;
  onAnalyzeComplete: (result: GeodeResult) => void;
}

const GeodeAnalyzer: React.FC<GeodeAnalyzerProps> = ({ geodeCount, onAnalyzeComplete }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [lastResult, setLastResult] = useState<GeodeResult | null>(null);

  const handleAnalyze = async () => {
    if (geodeCount <= 0 || isAnalyzing) return;
    
    setIsAnalyzing(true);
    setLastResult(null);

    const result = await analyzeGeode();
    
    setLastResult(result);
    onAnalyzeComplete(result);
    setIsAnalyzing(false);
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Legendary': return 'text-yellow-400 border-yellow-400/30 bg-yellow-900/20 shadow-[0_0_15px_rgba(250,204,21,0.2)]';
      case 'Epic': return 'text-purple-400 border-purple-400/30 bg-purple-900/20';
      case 'Rare': return 'text-blue-400 border-blue-400/30 bg-blue-900/20';
      default: return 'text-slate-300 border-slate-600/30 bg-slate-800/50';
    }
  };

  return (
    <div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-6 flex flex-col h-full relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
        <Sparkles size={120} className="text-yellow-100" />
      </div>

      <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
        <Diamond className="text-yellow-400" />
        Xeno-Geologist
      </h2>
      <p className="text-slate-400 text-sm mb-6">
        Use Gemini AI to scan unidentified geodes found during mining operations.
      </p>

      <div className="flex-1 flex flex-col items-center justify-center min-h-[200px]">
        {isAnalyzing ? (
          <div className="text-center animate-pulse">
            <Loader2 size={48} className="animate-spin text-yellow-500 mx-auto mb-4" />
            <p className="text-yellow-400 font-mono">Scanning molecular structure...</p>
            <p className="text-xs text-yellow-600 mt-2">Consulting Galactic Database</p>
          </div>
        ) : lastResult ? (
          <div className={`w-full p-4 rounded-xl border ${getRarityColor(lastResult.rarity)} animate-fade-in`}>
             <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg">{lastResult.name}</h3>
                <span className={`text-xs px-2 py-1 rounded-full border font-mono uppercase ${getRarityColor(lastResult.rarity)}`}>
                  {lastResult.rarity}
                </span>
             </div>
             <p className="text-sm opacity-90 mb-4 italic">"{lastResult.description}"</p>
             <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/10">
                <span className="text-xs text-slate-400">Estimated Value</span>
                <span className="text-xl font-bold text-yellow-400">+{lastResult.value.toLocaleString()} Gold</span>
             </div>
          </div>
        ) : (
          <div className="text-center text-slate-600 border-2 border-dashed border-slate-700 rounded-xl p-8 w-full">
            <Diamond size={48} className="mx-auto mb-2 opacity-50" />
            <p>Ready to Scan</p>
          </div>
        )}
      </div>

      <div className="mt-6 pt-6 border-t border-slate-700">
        <div className="flex justify-between items-center mb-4">
            <span className="text-slate-400 text-sm">Inventory</span>
            <span className="font-mono text-white bg-slate-700 px-3 py-1 rounded-lg">
              {geodeCount} Geodes
            </span>
        </div>
        
        <button
          onClick={handleAnalyze}
          disabled={geodeCount === 0 || isAnalyzing}
          className={`w-full py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all
            ${geodeCount > 0 && !isAnalyzing
              ? 'bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-500 hover:to-amber-500 text-white shadow-lg shadow-yellow-900/20' 
              : 'bg-slate-700 text-slate-500 cursor-not-allowed'
            }`}
        >
          {isAnalyzing ? 'Processing...' : 'Analyze Geode'}
          {!isAnalyzing && <Sparkles size={18} />}
        </button>
        {geodeCount === 0 && (
            <p className="text-center text-xs text-slate-500 mt-2">Mine asteroids to find more geodes.</p>
        )}
      </div>
    </div>
  );
};

export default GeodeAnalyzer;