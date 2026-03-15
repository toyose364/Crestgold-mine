
import { Upgrade } from './types';

export const INITIAL_UPGRADES: Upgrade[] = [
  {
    id: 'basic_crest',
    name: 'Basic Crest',
    type: 'click',
    currency: 'NGN',
    price: 500,
    basePower: 10,
    dailyLimit: 100,
    count: 0,
    costMultiplier: 1, 
    icon: '🥉',
    description: 'Entry level mining rig. Increases tap power.'
  },
  {
    id: 'standard_crest',
    name: 'Standard Crest',
    type: 'click',
    currency: 'NGN',
    price: 1000,
    basePower: 25,
    dailyLimit: 200,
    count: 0,
    costMultiplier: 1,
    icon: '🥈',
    description: 'Reliable gold extraction unit.'
  },
  {
    id: 'advanced_crest',
    name: 'Advanced Crest',
    type: 'click',
    currency: 'NGN',
    price: 1500,
    basePower: 50,
    dailyLimit: 300,
    count: 0,
    costMultiplier: 1,
    icon: '🥇',
    description: 'High efficiency industrial miner.'
  },
  {
    id: 'elite_crest',
    name: 'Elite Crest',
    type: 'click',
    currency: 'NGN',
    price: 2000,
    basePower: 100,
    dailyLimit: 400,
    count: 0,
    costMultiplier: 1,
    icon: '💎',
    description: 'Top tier mining technology.'
  },
  {
    id: 'royal_crest',
    name: 'Royal Crest',
    type: 'click',
    currency: 'NGN',
    price: 2500,
    basePower: 250,
    dailyLimit: 500,
    count: 0,
    costMultiplier: 1,
    icon: '👑',
    description: 'Fit for a king. Massive output.'
  },
  {
    id: 'imperial_crest',
    name: 'Imperial Crest',
    type: 'click',
    currency: 'NGN',
    price: 3000,
    basePower: 500,
    dailyLimit: 600,
    count: 0,
    costMultiplier: 1,
    icon: '🪐',
    description: 'Dominates the entire sector.'
  },
];

export const GEODE_CHANCE = 0.05; // 5% chance per click to find a geode
