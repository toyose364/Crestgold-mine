import React, { useState } from 'react';
import { Pickaxe, Zap, Lock, AlertOctagon } from 'lucide-react';

interface MiningAreaProps {
  onMine: (e: React.MouseEvent) => void;
  clickPower: number;
  miningInProgress: boolean;
  isLocked?: boolean;
  isLimitReached?: boolean;
}

const MiningArea: React.FC<MiningAreaProps> = ({ onMine, clickPower, miningInProgress, isLocked = false, isLimitReached = false }) => {
  const [scale, setScale] = useState(1);

  const handleMouseDown = () => !isLocked && !isLimitReached && setScale(0.95);
  const handleMouseUp = () => setScale(1);

  const isDisabled = isLocked || isLimitReached;

  return (
    <div className="flex flex-col items-center justify-center h-full p-6 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-900/20 via-slate-900/50 to-slate-900 z-0 pointer-events-none" />
      
      {/* Decorative Orbit Rings - Gold Theme */}
      <div className="absolute w-[300px] h-[300px] border border-yellow-500/10 rounded-full animate-spin-slow z-0 pointer-events-none" style={{ animationDuration: '20s' }}></div>
      <div className="absolute w-[400px] h-[400px] border border-amber-500/10 rounded-full animate-reverse-spin z-0 pointer-events-none" style={{ animationDuration: '30s' }}></div>

      <div className="z-10 relative group">
        <button
          className={`relative w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br shadow-[0_0_50px_rgba(234,179,8,0.2)] border-4 flex items-center justify-center transition-transform duration-75 outline-none 
          ${isDisabled
             ? 'from-slate-800 to-slate-900 border-slate-700 cursor-not-allowed opacity-75' 
             : 'from-slate-800 to-black border-yellow-700 hover:shadow-[0_0_80px_rgba(234,179,8,0.4)] hover:border-yellow-400'}`}
          style={{ transform: `scale(${scale})` }}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onClick={onMine}
          onMouseLeave={handleMouseUp}
          disabled={isDisabled}
        >
          {/* Rock Texture Overlay */}
          <div className="absolute inset-0 rounded-full opacity-50 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')]"></div>
          
          <div className="relative text-yellow-200 pointer-events-none">
             {isLocked ? (
                 <div className="flex flex-col items-center text-slate-500">
                    <Lock size={64} className="mb-2" />
                    <span className="text-xs font-bold uppercase tracking-wider">Miner Locked</span>
                 </div>
             ) : isLimitReached ? (
                <div className="flex flex-col items-center text-red-400">
                    <AlertOctagon size={64} className="mb-2" />
                    <span className="text-xs font-bold uppercase tracking-wider">Limit Reached</span>
                 </div>
             ) : (
                <div className={`transition-all duration-300 ${scale < 1 ? 'scale-110 text-white' : 'scale-100'}`}>
                    <div className="p-8 bg-yellow-900/30 rounded-full backdrop-blur-sm border border-yellow-600/50">
                    <Pickaxe size={64} className="text-yellow-400 fill-yellow-400/20" />
                    </div>
                </div>
             )}
          </div>
          
          {/* Particles hint */}
          {!isDisabled && (
             <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                <div className="w-full h-full bg-gradient-to-t from-yellow-900/40 to-transparent"></div>
             </div>
          )}
        </button>
        
        <div className="mt-8 text-center pointer-events-none select-none">
            {isLocked ? (
                <div className="flex flex-col items-center gap-2">
                    <p className="text-red-400 font-bold text-sm bg-red-900/20 px-4 py-2 rounded-lg border border-red-500/20">
                        Purchase a Miner to Start
                    </p>
                    <p className="text-slate-500 text-xs">Deposits required for activation</p>
                </div>
            ) : isLimitReached ? (
                <div className="flex flex-col items-center gap-2">
                    <p className="text-red-400 font-bold text-sm bg-red-900/20 px-4 py-2 rounded-lg border border-red-500/20">
                        Daily Mining Cap Hit
                    </p>
                    <p className="text-slate-500 text-xs">Upgrade miners to increase limit</p>
                </div>
            ) : (
                <>
                    <p className="text-yellow-600/80 text-sm tracking-widest uppercase mb-1">Mining Power</p>
                    <div className="flex items-center justify-center gap-2 text-2xl font-bold text-white">
                        <Zap className="text-yellow-400 fill-yellow-400" size={24} />
                        <span>{clickPower.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-2">Tap to mine Gold</p>
                </>
            )}
        </div>
      </div>
    </div>
  );
};

export default MiningArea;