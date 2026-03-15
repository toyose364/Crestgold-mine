import React, { useState } from 'react';
import { DepositRequest, WithdrawalRequest } from '../types';
import { Check, X, Clock, FileText, Image as ImageIcon, ArrowRightLeft, CreditCard, Users, History, CheckCircle, XCircle, ShieldCheck, ArrowDownLeft, ArrowUpRight } from 'lucide-react';

interface AdminPanelProps {
  depositRequests: DepositRequest[];
  withdrawalRequests: WithdrawalRequest[];
  userCount: number;
  onApproveDeposit: (id: string) => void;
  onDeclineDeposit: (id: string) => void;
  onApproveWithdrawal: (id: string) => void;
  onDeclineWithdrawal: (id: string) => void;
}

type AdminTab = 'deposits' | 'withdrawals' | 'history';

export const AdminPanel: React.FC<AdminPanelProps> = ({ 
  depositRequests, 
  withdrawalRequests, 
  userCount,
  onApproveDeposit, 
  onDeclineDeposit,
  onApproveWithdrawal,
  onDeclineWithdrawal
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('deposits');
  
  const pendingDeposits = depositRequests.filter(r => r.status === 'pending');
  const pendingWithdrawals = withdrawalRequests.filter(r => r.status === 'pending');
  const processedDeposits = depositRequests.filter(r => r.status !== 'pending');
  const processedWithdrawals = withdrawalRequests.filter(r => r.status !== 'pending');

  return (
    <div className="h-full flex flex-col p-4 md:p-6 bg-slate-900 pb-24 overflow-y-auto">
      <div className="max-w-4xl mx-auto w-full">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <ShieldCheck className="text-red-500" />
          Admin HQ
        </h2>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex items-center gap-4 shadow-lg">
                <div className="p-3 bg-blue-900/30 rounded-lg text-blue-400">
                    <Users size={24} />
                </div>
                <div>
                    <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Total Users</p>
                    <p className="text-2xl font-bold text-white">{userCount.toLocaleString()}</p>
                </div>
            </div>
             <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex items-center gap-4 shadow-lg">
                <div className="p-3 bg-yellow-900/30 rounded-lg text-yellow-400">
                    <Clock size={24} />
                </div>
                <div>
                    <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Queue</p>
                    <p className="text-2xl font-bold text-white">{pendingDeposits.length + pendingWithdrawals.length}</p>
                </div>
            </div>
             <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex items-center gap-4 shadow-lg">
                <div className="p-3 bg-green-900/30 rounded-lg text-green-400">
                    <History size={24} />
                </div>
                <div>
                    <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Processed</p>
                    <p className="text-2xl font-bold text-white">{processedDeposits.length + processedWithdrawals.length}</p>
                </div>
            </div>
        </div>

        {/* Admin Tabs */}
        <div className="flex gap-4 mb-6 border-b border-slate-700 pb-2">
            <button 
                onClick={() => setActiveTab('deposits')}
                className={`pb-2 px-4 font-bold transition-colors ${activeTab === 'deposits' ? 'text-yellow-400 border-b-2 border-yellow-400' : 'text-slate-500'}`}
            >
                Pending Deposits ({pendingDeposits.length})
            </button>
            <button 
                onClick={() => setActiveTab('withdrawals')}
                className={`pb-2 px-4 font-bold transition-colors ${activeTab === 'withdrawals' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-slate-500'}`}
            >
                Pending Payouts ({pendingWithdrawals.length})
            </button>
            <button 
                onClick={() => setActiveTab('history')}
                className={`pb-2 px-4 font-bold transition-colors ${activeTab === 'history' ? 'text-green-400 border-b-2 border-green-400' : 'text-slate-500'}`}
            >
                System History
            </button>
        </div>

        {activeTab === 'deposits' && (
            pendingDeposits.length === 0 ? (
            <div className="bg-slate-800 rounded-xl p-8 text-center border border-slate-700">
                <p className="text-slate-400 font-bold uppercase text-xs">No pending deposits.</p>
            </div>
            ) : (
            <div className="grid gap-4">
                {pendingDeposits.map(req => (
                <div key={req.id} className="bg-slate-800 rounded-xl p-4 border border-slate-700 flex flex-col md:flex-row gap-4 items-start md:items-center shadow-lg">
                    <div className="w-full md:w-32 h-32 bg-black rounded-lg overflow-hidden shrink-0 border border-slate-600 relative group">
                    {req.proofImage ? (
                        <img src={URL.createObjectURL(req.proofImage)} alt="Proof" className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-slate-500">
                            <ImageIcon size={24} className="mb-1 opacity-50"/>
                            <span className="text-[10px]">No Image</span>
                        </div>
                    )}
                    {req.proofImage && (
                        <a href={URL.createObjectURL(req.proofImage)} target="_blank" rel="noreferrer" className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs transition-opacity font-bold underline">
                        View Full
                        </a>
                    )}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                            <h3 className="font-bold text-white text-lg">{req.minerName}</h3>
                            <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                                <Clock size={12}/> {new Date(req.timestamp).toLocaleTimeString()}
                            </span>
                        </div>
                        <p className="text-[10px] text-blue-400 font-black uppercase tracking-widest mb-2">UID: {req.userId}</p>
                        <div className="bg-slate-900/50 p-2 rounded mb-2 border border-slate-700/50">
                            <p className="text-xs text-slate-500 uppercase">Amount</p>
                            <p className="text-yellow-400 font-bold text-xl">₦{req.amount.toLocaleString()}</p>
                        </div>
                    </div>
                    <div className="flex md:flex-col gap-2 w-full md:w-auto">
                        <button onClick={() => onApproveDeposit(req.id)} className="flex-1 bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 text-sm font-bold transition-colors">
                            <Check size={16} /> Approve
                        </button>
                        <button onClick={() => onDeclineDeposit(req.id)} className="flex-1 bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 text-sm font-bold transition-colors">
                            <X size={16} /> Decline
                        </button>
                    </div>
                </div>
                ))}
            </div>
            )
        )}

        {activeTab === 'withdrawals' && (
             pendingWithdrawals.length === 0 ? (
                <div className="bg-slate-800 rounded-xl p-8 text-center border border-slate-700">
                    <p className="text-slate-400 font-bold uppercase text-xs">No pending payouts.</p>
                </div>
                ) : (
                <div className="grid gap-4">
                    {pendingWithdrawals.map(req => (
                    <div key={req.id} className="bg-slate-800 rounded-xl p-4 border border-slate-700 flex flex-col gap-4 shadow-lg">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-bold text-white text-lg flex items-center gap-2">
                                    <CreditCard size={18} className="text-blue-400"/>
                                    Payout Request
                                </h3>
                                <p className="text-xs text-blue-400 font-black uppercase tracking-widest">UID: {req.userId}</p>
                            </div>
                            <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                                <Clock size={12}/> {new Date(req.timestamp).toLocaleTimeString()}
                            </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-slate-900/50 p-3 rounded border border-slate-700/50">
                                <p className="text-xs text-slate-500 uppercase mb-1">Total Payout</p>
                                <p className="text-green-400 font-bold text-2xl">₦{req.totalNgnValue.toLocaleString()}</p>
                            </div>
                            <div className="bg-slate-900/50 p-3 rounded border border-slate-700/50 text-xs">
                                <p className="text-[10px] text-slate-500 uppercase mb-1">Bank</p>
                                <p className="text-white font-bold">{req.bankDetails.bankName}</p>
                                <p className="text-white font-mono">{req.bankDetails.accountNumber}</p>
                                <p className="text-slate-400 italic">{req.bankDetails.accountName}</p>
                            </div>
                        </div>
                        <div className="flex gap-2 w-full">
                            <button onClick={() => onApproveWithdrawal(req.id)} className="flex-1 bg-green-600 hover:bg-green-500 text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 text-sm font-bold transition-colors">
                                <Check size={16} /> Mark Paid
                            </button>
                            <button onClick={() => onDeclineWithdrawal(req.id)} className="flex-1 bg-red-600 hover:bg-red-500 text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 text-sm font-bold transition-colors">
                                <X size={16} /> Decline
                            </button>
                        </div>
                    </div>
                    ))}
                </div>
            )
        )}

        {activeTab === 'history' && (
            <div className="space-y-8">
                {/* Deposit History */}
                <section>
                    <h3 className="text-yellow-500 font-black uppercase text-xs tracking-widest mb-4 flex items-center gap-2">
                        <ArrowDownLeft size={16} /> Deposit Ledger
                    </h3>
                    {processedDeposits.length === 0 ? (
                        <p className="text-slate-600 text-xs font-bold uppercase text-center py-4 bg-slate-800/20 rounded-xl">No processed deposits.</p>
                    ) : (
                        <div className="space-y-2">
                            {processedDeposits.map(req => (
                                <div key={req.id} className="bg-slate-800/40 border border-slate-800 p-3 rounded-xl flex items-center justify-between text-xs font-bold">
                                    <div className="flex items-center gap-3">
                                        {req.status === 'approved' ? <CheckCircle size={16} className="text-green-500"/> : <XCircle size={16} className="text-red-500"/>}
                                        <div>
                                            <p className="text-white">{req.minerName} (UID: {req.userId.slice(-5)})</p>
                                            <p className="text-slate-600 text-[10px]">{new Date(req.timestamp).toLocaleString()}</p>
                                        </div>
                                    </div>
                                    <p className={req.status === 'approved' ? 'text-green-500' : 'text-red-500'}>
                                        ₦{req.amount.toLocaleString()}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                {/* Payout History */}
                <section>
                    <h3 className="text-blue-500 font-black uppercase text-xs tracking-widest mb-4 flex items-center gap-2">
                        <ArrowUpRight size={16} /> Payout Ledger
                    </h3>
                    {processedWithdrawals.length === 0 ? (
                        <p className="text-slate-600 text-xs font-bold uppercase text-center py-4 bg-slate-800/20 rounded-xl">No processed payouts.</p>
                    ) : (
                        <div className="space-y-2">
                            {processedWithdrawals.map(req => (
                                <div key={req.id} className="bg-slate-800/40 border border-slate-800 p-3 rounded-xl flex items-center justify-between text-xs font-bold">
                                    <div className="flex items-center gap-3">
                                        {req.status === 'approved' ? <CheckCircle size={16} className="text-green-500"/> : <XCircle size={16} className="text-red-500"/>}
                                        <div>
                                            <p className="text-white">Withdrawal (UID: {req.userId.slice(-5)})</p>
                                            <p className="text-slate-600 text-[10px]">{new Date(req.timestamp).toLocaleString()}</p>
                                        </div>
                                    </div>
                                    <p className={req.status === 'approved' ? 'text-green-500' : 'text-red-500'}>
                                        ₦{req.totalNgnValue.toLocaleString()}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        )}
      </div>
    </div>
  );
};