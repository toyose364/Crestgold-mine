import React from 'react';
import { Upgrade } from '../types';
import { ArrowUpCircle, MousePointer2, Settings, Wallet } from 'lucide-react';

interface UpgradeCardProps {
  upgrade: Upgrade;
  canAfford: boolean;
  onBuy: (id: string) => void;
}

export const UpgradeCard: React.FC<UpgradeCardProps> = ({ upgrade, canAfford, onBuy }) => {
  // If currency is NGN, price is fixed usually, for CREDITS it scales
  const currentCost = upgrade.currency === 'CREDITS' 
    ? Math.floor(upgrade.price * Math.pow(upgrade.costMultiplier, upgrade.count))
    : upgrade.price;

  return (
    <button
      onClick={() => onBuy(upgrade.id)}
      disabled={!canAfford && upgrade.currency === 'CREDITS'} // NGN always clickable: either buy or deposit
      className={`w-full flex items-center p-3 mb-3 rounded-xl border transition-all duration-200 text-left group relative overflow-hidden
        ${(canAfford || upgrade.currency === 'NGN')
          ? 'bg-slate-800 border-slate-700 hover:bg-slate-700 hover:border-yellow-500/50 shadow-md cursor-pointer' 
          : 'bg-slate-900/50 border-slate-800 opacity-60 cursor-not-allowed'
        }`}
    >
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl mr-4 shrink-0
         ${(canAfford || upgrade.currency === 'NGN') ? 'bg-yellow-900/50 text-yellow-200 border border-yellow-700/50' : 'bg-slate-800 text-slate-600'}
      `}>
        {upgrade.icon}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-baseline mb-1">
          <h4 className="font-bold text-slate-200 truncate pr-2">{upgrade.name}</h4>
          <span className="text-xs text-slate-500 font-mono">Lvl {upgrade.count}</span>
        </div>
        <p className="text-xs text-slate-400 truncate mb-1">{upgrade.description}</p>
        <div className="flex items-center text-xs font-mono">
           <span className={`${(canAfford || upgrade.currency === 'NGN') ? 'text-yellow-400' : 'text-slate-500'} font-bold`}>
             {upgrade.currency === 'NGN' ? `₦${currentCost}` : `${currentCost.toLocaleString()} Gold`}
           </span>
           <span className="mx-2 text-slate-600">•</span>
           <span className="text-amber-400 flex items-center gap-1">
             {upgrade.type === 'click' ? <MousePointer2 size={10} /> : <Settings size={10} />}
             +{upgrade.basePower} {upgrade.type === 'click' ? 'Click' : 'EPS'}
           </span>
        </div>
      </div>

      <div className="ml-3">
        {upgrade.currency === 'NGN' ? (
           // Logic for NGN Buttons
           canAfford ? (
              <div className="bg-green-600 hover:bg-green-500 text-white border border-green-500 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors shadow-lg">
                Purchase
              </div>
           ) : (
              <div className="bg-yellow-600/20 text-yellow-400 border border-yellow-600/50 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-yellow-600/30 transition-colors flex items-center gap-1">
                <Wallet size={12} /> Deposit
              </div>
           )
        ) : (
           <div className={`opacity-0 group-hover:opacity-100 transition-opacity ${(upgrade.currency === 'CREDITS' && !canAfford) ? 'hidden' : ''}`}>
             <ArrowUpCircle className="text-yellow-400" size={24} />
           </div>
        )}
      </div>
    </button>
  );
};