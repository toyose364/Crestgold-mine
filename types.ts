
export interface Upgrade {
  id: string;
  name: string;
  type: 'click' | 'auto';
  currency: 'CREDITS' | 'NGN';
  price: number; // For display
  basePower: number;
  dailyLimit: number; // Maximum gold this specific miner can produce per day
  count: number;
  costMultiplier: number;
  icon: string;
  description: string;
}

export interface GeodeResult {
  name: string;
  description: string;
  value: number;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
}

export interface FloatingText {
  id: number;
  text: string;
  x: number;
  y: number;
}

export interface DepositRequest {
  id: string;
  userId: string;
  minerId: string;
  minerName: string;
  amount: number;
  timestamp: number;
  proofImage: File | null;
  status: 'pending' | 'approved' | 'declined';
}

export interface BankDetails {
  bankName: string;
  accountNumber: string;
  accountName: string;
}

export interface WithdrawalRequest {
  id: string;
  userId: string;
  amountGold: number;
  amountReferralNgn: number; 
  totalNgnValue: number;
  bankDetails: BankDetails;
  timestamp: number;
  status: 'pending' | 'approved' | 'declined';
}

export interface GameState {
  credits: number;
  totalMined: number;
  clickPower: number;
  autoPower: number;
  upgrades: Upgrade[];
  geodesFound: number;
}
