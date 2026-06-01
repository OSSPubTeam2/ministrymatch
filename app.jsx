import React, { useState, useEffect, useRef } from 'react';
import { 
  Trophy, 
  RotateCcw, 
  Timer, 
  Brain, 
  HelpCircle, 
  Search, 
  Award, 
  BookOpen, 
  Play, 
  CheckCircle2, 
  Check, 
  TrendingUp,
  ArrowRight,
  XCircle
} from 'lucide-react';

// --- GAME DATA POOL (16 Ministries & 7 Agencies) ---
const CONTENT_POOL = [
  // --- Ministries (16) ---
  {
    id: 'pmo',
    type: 'Ministry',
    name: "Prime Minister’s Office (PMO)",
    shortName: "PMO",
    definition: "Oversees national strategic priorities, public service coordination, corruption prevention (via CPIB), elections, and population strategies.",
    color: "#E11D48", // Rose Red
    iconPath: "pmo"
  },
  {
    id: 'mccy',
    type: 'Ministry',
    name: "Ministry of Culture, Community and Youth (MCCY)",
    shortName: "MCCY",
    definition: "Fosters a cohesive society, promotes the arts and heritage, develops sports, and engages youth and community groups.",
    color: "#0284C7", // Sky Blue
    iconPath: "mccy"
  },
  {
    id: 'mindef',
    type: 'Ministry',
    name: "Ministry of Defence (MINDEF)",
    shortName: "MINDEF",
    definition: "Enhances Singapore's peace and security through deterrence and diplomacy, and oversees the Singapore Armed Forces (SAF).",
    color: "#1E3A8A", // Navy Blue
    iconPath: "mindef"
  },
  {
    id: 'mddi',
    type: 'Ministry',
    name: "Ministry of Digital Development and Information (MDDI)",
    shortName: "MDDI",
    definition: "Drives the nation's digital economy, public communication, digital infrastructure, cybersecurity, and tech literacy.",
    color: "#4F46E5", // Indigo
    iconPath: "mddi"
  },
  {
    id: 'moe',
    type: 'Ministry',
    name: "Ministry of Education (MOE)",
    shortName: "MOE",
    definition: "Formulates education policies, manages national schools and tertiary institutions, and directs the curriculum.",
    color: "#2563EB", // Blue
    iconPath: "moe"
  },
  {
    id: 'mof',
    type: 'Ministry',
    name: "Ministry of Finance (MOF)",
    shortName: "MOF",
    definition: "Manages the state's budget, fiscal policies, and government assets to ensure a sustainable national economy.",
    color: "#16A34A", // Green
    iconPath: "mof"
  },
  {
    id: 'mfa',
    type: 'Ministry',
    name: "Ministry of Foreign Affairs (MFA)",
    shortName: "MFA",
    definition: "Formulates and implements Singapore's foreign policy, manages diplomatic relations, and supports Singaporeans overseas.",
    color: "#D97706", // Amber
    iconPath: "mfa"
  },
  {
    id: 'moh',
    type: 'Ministry',
    name: "Ministry of Health (MOH)",
    shortName: "MOH",
    definition: "Ensures access to affordable, quality healthcare, manages public health emergencies, and promotes healthy living.",
    color: "#DC2626", // Red
    iconPath: "moh"
  },
  {
    id: 'mha',
    type: 'Ministry',
    name: "Ministry of Home Affairs (MHA)",
    shortName: "MHA",
    definition: "Maintains internal security and public safety (oversees the police, civil defence, immigration, and prison services).",
    color: "#334155", // Slate Blue
    iconPath: "mha"
  },
  {
    id: 'minlaw',
    type: 'Ministry',
    name: "Ministry of Law (MINLAW)",
    shortName: "MINLAW",
    definition: "Directs the national legal framework, oversees land policies, intellectual property rights, and community legal resources.",
    color: "#6D28D9", // Purple
    iconPath: "minlaw"
  },
  {
    id: 'mom',
    type: 'Ministry',
    name: "Ministry of Manpower (MOM)",
    shortName: "MOM",
    definition: "Develops a productive workforce, handles progressive workplace regulations, and manages foreign worker employment.",
    color: "#0369A1", // Teal/Blue
    iconPath: "mom"
  },
  {
    id: 'mnd',
    type: 'Ministry',
    name: "Ministry of National Development (MND)",
    shortName: "MND",
    definition: "Oversees land-use planning, public housing, infrastructure development, and property market regulations.",
    color: "#047857", // Emerald
    iconPath: "mnd"
  },
  {
    id: 'msf',
    type: 'Ministry',
    name: "Ministry of Social and Family Development (MSF)",
    shortName: "MSF",
    definition: "Supports families, protects the vulnerable, and manages social safety nets and welfare assistance.",
    color: "#BE185D", // Pink
    iconPath: "msf"
  },
  {
    id: 'mse',
    type: 'Ministry',
    name: "Ministry of Sustainability and the Environment (MSE)",
    shortName: "MSE",
    definition: "Manages water supply, food security, environmental public health, zero-waste initiatives, and climate resilience.",
    color: "#0F766E", // Teal
    iconPath: "mse"
  },
  {
    id: 'mti',
    type: 'Ministry',
    name: "Ministry of Trade and Industry (MTI)",
    shortName: "MTI",
    definition: "Drives economic growth, creates good jobs, secures trade agreements, and promotes industry development.",
    color: "#B45309", // Warm Brown
    iconPath: "mti"
  },
  {
    id: 'mot',
    type: 'Ministry',
    name: "Ministry of Transport (MOT)",
    shortName: "MOT",
    definition: "Overlooks land, sea, and air transport infrastructure and connections, ensuring efficient movement of people and goods.",
    color: "#0E7490", // Cyan
    iconPath: "mot"
  },
  // --- Government Agencies (7) ---
  {
    id: 'hdb',
    type: 'Agency',
    name: "Housing & Development Board (HDB)",
    shortName: "HDB",
    definition: "Develops and manages Singapore's public housing estates to provide affordable homes.",
    color: "#EA580C", // Orange
    iconPath: "hdb"
  },
  {
    id: 'lta',
    type: 'Agency',
    name: "Land Transport Authority (LTA)",
    shortName: "LTA",
    definition: "Plans, builds, and manages Singapore's land transport infrastructure, including the MRT network and public buses.",
    color: "#1D4ED8", // Navy Blue
    iconPath: "lta"
  },
  {
    id: 'nea',
    type: 'Agency',
    name: "National Environment Agency (NEA)",
    shortName: "NEA",
    definition: "Ensures a clean, sustainable environment, manages waste disposal, controls pollution, and oversees hawker centers.",
    color: "#15803D", // Green
    iconPath: "nea"
  },
  {
    id: 'pub',
    type: 'Agency',
    name: "PUB, Singapore's National Water Agency",
    shortName: "PUB",
    definition: "Manages Singapore's entire water loop—from supply and drainage to sewerage and water reclamation.",
    color: "#0284C7", // Water Blue
    iconPath: "pub"
  },
  {
    id: 'hpb',
    type: 'Agency',
    name: "Health Promotion Board (HPB)",
    shortName: "HPB",
    definition: "Empowers citizens to attain optimal health through healthy lifestyle programs, screening initiatives, and education.",
    color: "#E11D48", // Crimson
    iconPath: "hpb"
  },
  {
    id: 'nparks',
    type: 'Agency',
    name: "National Parks Board (NParks)",
    shortName: "NParks",
    definition: "Develops and manages Singapore’s urban green spaces, parks, and nature reserves to advance the 'City in Nature' vision.",
    color: "#166534", // Dark Green
    iconPath: "nparks"
  },
  {
    id: 'pa',
    type: 'Agency',
    name: "People's Association (PA)",
    shortName: "PA",
    definition: "Builds community cohesion and racial harmony through grassroots activities and community clubs.",
    color: "#C2185B", // Pink
    iconPath: "pa"
  }
];

// --- SOUND UTILITIES (Web Audio API) ---
class SoundManager {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  playOscillator(freqs, duration, type = 'sine', delay = 0) {
    if (this.muted) return;
    this.init();
    
    setTimeout(() => {
      try {
        const osc = this.ctx.createOscillator();
        const gainNode = this.ctx.createGain();
        
        osc.type = type;
        osc.connect(gainNode);
        gainNode.connect(this.ctx.destination);
        
        if (Array.isArray(freqs)) {
          const now = this.ctx.currentTime;
          let time = now;
          freqs.forEach(([f, d]) => {
            osc.frequency.setValueAtTime(f, time);
            time += d;
          });
        } else {
          osc.frequency.setValueAtTime(freqs, this.ctx.currentTime);
        }

        gainNode.gain.setValueAtTime(0.12, this.ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);
        
        osc.start();
        osc.stop(this.ctx.currentTime + duration);
      } catch (e) {
        console.warn("Audio context error:", e);
      }
    }, delay * 1000);
  }

  click() {
    this.playOscillator(600, 0.08, 'triangle');
  }

  match() {
    this.playOscillator([[440, 0.1], [554.37, 0.1], [659.25, 0.15]], 0.35, 'sine');
  }

  mismatch() {
    this.playOscillator([[220, 0.12], [180, 0.18]], 0.35, 'sawtooth');
  }

  victory() {
    const melody = [
      [261.63, 0.15],
      [329.63, 0.15],
      [392.00, 0.15],
      [523.25, 0.3],
      [392.00, 0.15],
      [523.25, 0.5]
    ];
    this.playOscillator(melody, 1.5, 'sine');
  }
}

const sounds = new SoundManager();

// --- CUSTOM SVG GRAPHICS COMPONENT ---
const AgencySvgIcon = ({ iconType, className = "w-10 h-10" }) => {
  switch (iconType) {
    case 'pmo':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 6v12M8 12h8" strokeLinecap="round" />
          <circle cx="12" cy="12" r="3" fill="none" />
        </svg>
      );
    case 'mccy':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2a5 5 0 100 10 5 5 0 000-10z" />
          <path d="M4 19c0-3 3-3 8-3s8 0 8 3v1H4v-1z" strokeLinecap="round" />
          <path d="M16 8a3 3 0 116 0c0 1.5-1 2.5-3 2.5s-3-1-3-2.5z" />
          <path d="M2 8a3 3 0 116 0c0 1.5-1 2.5-3 2.5s-3-1-3-2.5z" />
        </svg>
      );
    case 'mindef':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 10l6 4M15 10l-6 4" strokeLinecap="round" />
        </svg>
      );
    case 'mddi':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
          <path d="M12 6h.01M16 10h.01M8 14h.01M12 18h.01" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case 'moe':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
          <path d="M12 6v6M10 8h4" strokeLinecap="round" />
        </svg>
      );
    case 'mof':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <line x1="12" y1="4" x2="12" y2="20" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <circle cx="12" cy="12" r="3" fill="none" />
        </svg>
      );
    case 'mfa':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 3c-1.5 3-2 6-2 9s.5 6 2 9" />
          <path d="M12 3c1.5 3 2 6 2 9s-.5 6-2 9" />
          <path d="M3 12h18" strokeLinecap="round" />
        </svg>
      );
    case 'moh':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12s4.477 10 10 10 10-4.477 10-10z" />
          <path d="M12 8v8M8 12h8" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case 'mha':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <circle cx="12" cy="11" r="2" />
          <path d="M12 13v4M11 15h2" />
        </svg>
      );
    case 'minlaw':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 3v17M12 5L5 9M12 5l7 4M5 21h14" strokeLinecap="round" />
          <path d="M5 9c0 3 1.5 5 3.5 5S12 12 12 9" />
          <path d="M12 9c0 3 1.5 5 3.5 5s3.5-2 3.5-5" />
        </svg>
      );
    case 'mom':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 00-3-3.87" />
          <path d="M16 3.13a4 4 0 010 7.75" />
        </svg>
      );
    case 'mnd':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M9 3v18M15 3v18M3 9h18M3 15h18" strokeLinecap="round" />
        </svg>
      );
    case 'msf':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="none" />
        </svg>
      );
    case 'mse':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2a10 10 0 00-10 10c0 5.52 4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm-1 15v-6h2v6h-2zm0-8V7h2v2h-2z" />
          <path d="M17.5 12.5a5.5 5.5 0 00-11 0" strokeLinecap="round" />
        </svg>
      );
    case 'mti':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
          <path d="M12 8l4 4M12 8v8M12 8l-4 4" strokeLinecap="round" />
        </svg>
      );
    case 'mot':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 16V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2h14a2 2 0 002-2z" />
          <circle cx="7" cy="16" r="2" />
          <circle cx="17" cy="16" r="2" />
          <path d="M12 6V3M9 3h6" strokeLinecap="round" />
        </svg>
      );
    case 'hdb':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 21h18M5 21V8l7-4 7 4v13M9 9h2v2H9V9zm4 0h2v2h-2V9zm-4 4h2v2H9v-2zm4 0h2v2h-2v-2z" strokeLinecap="round" />
        </svg>
      );
    case 'lta':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="4" y="3" width="16" height="14" rx="3" />
          <path d="M4 11h16M8 3v4M16 3v4M6 17l-2 4M18 17l2 4" strokeLinecap="round" />
          <circle cx="8" cy="14" r="1" fill="currentColor" />
          <circle cx="16" cy="14" r="1" fill="currentColor" />
        </svg>
      );
    case 'nea':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M11 20A7 7 0 019.8 6.1C15.5 5 17 4.48 21 3c-1 5.5-2.5 11-9 15.5" strokeLinecap="round" />
          <path d="M9 22a9 9 0 01-9-9c0-4.97 4.03-9 9-9" strokeLinecap="round" />
        </svg>
      );
    case 'pub':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22a7 7 0 007-7c0-4.3-7-13-7-13S5 10.7 5 15a7 7 0 007 7z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'hpb':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
          <path d="M8 10s1.5-2 4-2 4 2 4 2-1.5 5-4 5-4-5-4-5z" strokeLinecap="round" />
          <path d="M12 5V3" strokeLinecap="round" />
        </svg>
      );
    case 'nparks':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 20v-8M9 20h6" strokeLinecap="round" strokeWidth="2" />
          <path d="M12 3a6 6 0 00-6 6c0 3 3 5 6 8 3-3 6-5 6-8a6 6 0 00-6-6z" />
        </svg>
      );
    case 'pa':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22a10 10 0 100-20 10 10 0 000 20z" />
          <path d="M8 12h8M12 8v8" strokeLinecap="round" />
          <circle cx="12" cy="12" r="6" strokeDasharray="3 3" />
        </svg>
      );
    default:
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01" />
        </svg>
      );
  }
};

export default function App() {
  // --- STATE ---
  const [gameState, setGameState] = useState('welcome'); // 'welcome', 'playing', 'victory', 'timeout'
  const [level, setLevel] = useState(1); // Progresses from level 1 up to level 8 (capped at Level 8)
  const [sessionAgencies, setSessionAgencies] = useState([]); // Keeps a stable list for progression during the current campaign
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]); // indices
  const [matchedIds, setMatchedIds] = useState([]); // list of matched agency IDs
  const [moves, setMoves] = useState(0);
  
  // --- Change 1 Scoring States ---
  const [score, setScore] = useState(100); // starts with 100 points
  const [timeLeft, setTimeLeft] = useState(120); // 120 seconds countdown
  const [levelScoreBonus, setLevelScoreBonus] = useState(0); // tracks bonus score from countdown remaining seconds
  
  const [highScore, setHighScore] = useState({ score: 0 }); // Stores best overall score
  const [showFactSheet, setShowFactSheet] = useState(false);
  const [accuracy, setAccuracy] = useState(100);

  // Fact Sheet Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all', 'Ministry', 'Agency'

  const timerRef = useRef(null);

  // --- PERSISTENCE & INIT ---
  useEffect(() => {
    // Load local storage high scores (Score is the primary indicator of best performance)
    const savedBestScore = localStorage.getItem('sg_memory_match_best_score');
    if (savedBestScore) {
      setHighScore({
        score: parseInt(savedBestScore, 10)
      });
    }

    // Set stable randomized agency progression for this campaign play
    initSessionAgencies();
  }, []);

  const initSessionAgencies = () => {
    const shuffled = [...CONTENT_POOL].sort(() => Math.random() - 0.5);
    setSessionAgencies(shuffled);
  };

  // Timer interval control (120s Countdown)
  useEffect(() => {
    if (gameState === 'playing') {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setGameState('timeout');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState]);

  // --- GAMEPLAY LEVEL BUILDER ---
  const startNewGame = (targetLevel = level) => {
    sounds.click();
    setLevel(targetLevel);
    
    // Level 1 starts with 2 agencies, Level 2 with 3, ... Level 8 with 9 agencies
    const agenciesCount = targetLevel + 1;
    
    // Grab the first N agencies.
    const chosenAgencies = sessionAgencies.slice(0, agenciesCount);

    // Split chosen agencies into Keyword Card and Definition Card
    const cardSet = [];
    chosenAgencies.forEach((agency) => {
      cardSet.push({
        id: `${agency.id}_keyword`,
        agencyId: agency.id,
        type: 'keyword',
        name: agency.name,
        shortName: agency.shortName,
        text: agency.name,
        color: agency.color,
        iconPath: agency.iconPath,
        agencyType: agency.type
      });
      cardSet.push({
        id: `${agency.id}_definition`,
        agencyId: agency.id,
        type: 'definition',
        name: agency.name,
        shortName: agency.shortName,
        text: agency.definition,
        color: agency.color,
        iconPath: agency.iconPath,
        agencyType: agency.type
      });
    });

    const finalShuffledCards = cardSet.sort(() => Math.random() - 0.5);

    // Set level values
    setCards(finalShuffledCards);
    setSelectedCards([]);
    setMatchedIds([]);
    setMoves(0);
    setAccuracy(100);
    
    // Level stats resets
    setTimeLeft(120); // 120 seconds level duration limit
    if (targetLevel === 1) {
      setScore(100); // starts with 100 points on Level 1
    }
    setLevelScoreBonus(0);
    setGameState('playing');
  };

  // --- CARD INTERACTION ---
  const handleCardClick = (clickedIndex) => {
    if (gameState !== 'playing') return;
    if (selectedCards.length >= 2) return;
    if (selectedCards.includes(clickedIndex)) return;
    if (matchedIds.includes(cards[clickedIndex].agencyId)) return;

    sounds.click();

    const newSelected = [...selectedCards, clickedIndex];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      setMoves(prev => prev + 1);
      const cardA = cards[newSelected[0]];
      const cardB = cards[newSelected[1]];

      const isMatch = (cardA.agencyId === cardB.agencyId) && (cardA.type !== cardB.type);

      if (isMatch) {
        // Correct Match: +50 points
        setScore(prev => prev + 50);
        setTimeout(() => {
          setMatchedIds(prev => {
            const nextMatched = [...prev, cardA.agencyId];
            sounds.match();
            
            // Check if level is completed
            if (nextMatched.length === (level + 1)) {
              handleVictory();
            }
            return nextMatched;
          });
          setSelectedCards([]);
        }, 600);
      } else {
        // Wrong Match: -10 points
        setScore(prev => Math.max(0, prev - 10)); // Prevent negative score
        setTimeout(() => {
          sounds.mismatch();
          setSelectedCards([]);
        }, 1300);
      }
    }
  };

  // Calculate matching accuracy
  useEffect(() => {
    if (moves > 0) {
      const successfulAttempts = matchedIds.length;
      const computedAccuracy = Math.round((successfulAttempts / moves) * 100);
      setAccuracy(Math.min(100, Math.max(0, computedAccuracy)));
    } else {
      setAccuracy(100);
    }
  }, [moves, matchedIds]);

  // --- LEVEL VICTORY TRIGGER ---
  const handleVictory = () => {
    // Save state
    clearInterval(timerRef.current);
    
    // +1 point for each second remaining in countdown
    const bonusPoints = timeLeft;
    const finalLevelScore = score + 50 + bonusPoints; // Add remaining 50 for the last match + bonus remaining seconds
    setScore(finalLevelScore);
    setLevelScoreBonus(bonusPoints);
    
    setGameState('victory');
    sounds.victory();

    // Check high score
    const currentBestScore = localStorage.getItem('sg_memory_match_best_score');
    if (!currentBestScore || finalLevelScore > parseInt(currentBestScore, 10)) {
      localStorage.setItem('sg_memory_match_best_score', finalLevelScore.toString());
      setHighScore({ score: finalLevelScore });
    }
  };

  // Proceed to next level
  const handleNextLevel = () => {
    const nextLvl = level + 1;
    if (nextLvl > 8) {
      // Reached ultimate campaign limit (capped at level 8)
      resetCampaign();
    } else {
      setLevel(nextLvl);
      startNewGame(nextLvl);
    }
  };

  const resetCampaign = () => {
    sounds.click();
    setLevel(1);
    setScore(100);
    initSessionAgencies();
    setGameState('welcome');
  };

  const quitToMenu = () => {
    sounds.click();
    setGameState('welcome');
  };

  const filteredAgencies = CONTENT_POOL.filter(agency => {
    const matchesSearch = agency.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          agency.shortName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          agency.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || agency.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-rose-500 selection:text-white overflow-x-hidden">
      
      {/* --- SIMPLIFIED MINIMAL HEADER --- */}
      <header className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-slate-200 px-4 py-3 md:px-8 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="bg-rose-600 p-2 rounded-xl shadow-md flex items-center justify-center">
            <Brain className="w-5.5 h-5.5 text-white" />
          </div>
          <span className="text-lg font-extrabold text-slate-900 tracking-tight">
            Ministry Match
          </span>
        </div>

        {gameState === 'playing' && (
          <button 
            onClick={resetCampaign}
            className="text-xs md:text-sm font-bold text-slate-500 hover:text-rose-600 px-3.5 py-1.5 rounded-xl transition-colors border border-slate-200 hover:border-rose-200 hover:bg-rose-50/50"
          >
            Quit Game
          </button>
        )}
      </header>

      {/* --- MAIN CONTAINER --- */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 flex flex-col justify-center">
        
        {/* ==================== WELCOME LOBBY ==================== */}
        {gameState === 'welcome' && (
          <div className="max-w-md mx-auto w-full my-auto py-12 flex flex-col items-center text-center space-y-8">
            
            {/* 1. Game Title */}
            <div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                Ministry Match
              </h2>
              <div className="h-1 w-20 bg-rose-600 mx-auto mt-3 rounded-full" />
            </div>

            {/* 2. Personal Best Score */}
            <div className="w-full bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col items-center justify-center space-y-2">
              <div className="flex items-center space-x-2 text-slate-400 font-extrabold uppercase tracking-wider text-xs">
                <Trophy className="w-4 h-4 text-amber-500" />
                <span>Personal Best Score</span>
              </div>
              <span className="text-3xl font-black text-slate-800">
                {highScore.score > 0 ? `${highScore.score} pts` : '—'}
              </span>
            </div>

            {/* 3. Start Button & 4. Fact File Directory */}
            <div className="w-full flex flex-col gap-3">
              <button
                onClick={() => startNewGame(1)}
                className="w-full flex items-center justify-center space-x-3 bg-rose-600 hover:bg-rose-500 text-white px-8 py-4 rounded-2xl font-extrabold text-lg shadow-md shadow-rose-600/10 active:scale-98 transition-all duration-200"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>Start Campaign</span>
              </button>

              <button 
                onClick={() => { sounds.click(); setShowFactSheet(true); }}
                className="w-full flex items-center justify-center space-x-2 px-6 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all text-sm font-bold border border-slate-200"
              >
                <BookOpen className="w-4 h-4 text-rose-600" />
                <span>Fact File Directory</span>
              </button>
            </div>

          </div>
        )}

        {/* ==================== ACTIVE MEMORY GRID GAMEPLAY ==================== */}
        {gameState === 'playing' && (
          <div className="space-y-6">
            
            {/* Gameplay Info Bar */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              
              <div className="flex flex-wrap items-center gap-3 text-sm">
                
                {/* Level Display */}
                <div className="flex items-center space-x-2 bg-rose-50 text-rose-700 px-3.5 py-2 rounded-xl border border-rose-100 font-bold">
                  <Award className="w-4 h-4 text-rose-600" />
                  <span>Level {level} / 8</span>
                </div>

                {/* Score Display */}
                <div className="flex items-center space-x-2 bg-slate-900 text-white px-4 py-2 rounded-xl border border-slate-800 font-bold">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <span>Score: {score} pts</span>
                </div>

                {/* Countdown Timer */}
                <div className="flex items-center space-x-2 bg-amber-50 text-amber-800 px-3.5 py-2 rounded-xl border border-amber-200">
                  <Timer className="w-4 h-4 text-amber-600" />
                  <span className="font-mono font-bold text-base">{timeLeft}s remaining</span>
                </div>

                {/* Level Matches */}
                <div className="flex items-center space-x-2 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-100">
                  <span className="text-slate-500 font-medium">Matches:</span>
                  <span className="font-bold text-slate-800 text-base">
                    {matchedIds.length} / {level + 1}
                  </span>
                </div>

                {/* Flip Turns Counter */}
                <div className="flex items-center space-x-2 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-100">
                  <TrendingUp className="w-4 h-4 text-indigo-500" />
                  <span className="text-slate-500 font-medium">Moves:</span>
                  <span className="font-bold text-slate-800 text-base">{moves}</span>
                </div>

              </div>

              {/* Board Actions */}
              <div className="flex items-center space-x-2 justify-end">
                <button
                  onClick={() => startNewGame(level)}
                  className="flex items-center space-x-2 bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 px-4 py-2 rounded-xl text-sm font-bold transition-all border border-slate-200"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Restart Level</span>
                </button>
              </div>

            </div>

            {/* Instruction Banner */}
            <div className="text-center text-xs text-slate-500 flex items-center justify-center space-x-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
              <span className="font-medium">Match a <strong className="text-rose-600">Ministry/Agency Name Card</strong> to its corresponding <strong className="text-amber-600">Scope of Mandate Card</strong>!</span>
            </div>

            {/* The Actual Game Grid */}
            <div className={`grid gap-4 ${
              (level + 1) <= 3 
                ? 'grid-cols-2 md:grid-cols-3 max-w-3xl mx-auto' 
                : (level + 1) <= 6 
                  ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4' 
                  : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-6'
            }`}>
              {cards.map((card, index) => {
                const isSelected = selectedCards.includes(index);
                const isMatched = matchedIds.includes(card.agencyId);
                const isFailedSelection = selectedCards.length === 2 && isSelected && !isMatched;

                return (
                  <div
                    key={card.id}
                    onClick={() => handleCardClick(index)}
                    className="aspect-[4/5] sm:aspect-[4/4.5] cursor-pointer group relative [perspective:1000px] select-none"
                  >
                    {/* Inner 3D Flip Container */}
                    <div className={`w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${
                      (isSelected || isMatched) ? '[transform:rotateY(180deg)]' : ''
                    }`}>
                      
                      {/* CARD BACK DESIGN (UNFLIPPED) */}
                      <div className="absolute inset-0 w-full h-full rounded-2xl bg-white border-2 border-slate-200 hover:border-rose-500 hover:shadow-lg p-4 flex flex-col justify-between [backface-visibility:hidden] transition-all group-hover:scale-[1.03] active:scale-95 shadow-sm">
                        
                        <div className="absolute inset-1.5 border border-slate-100 rounded-xl pointer-events-none border-dashed" />
                        
                        <div className="flex justify-between items-center w-full">
                          <span className="text-[10px] uppercase font-extrabold text-slate-400 tracking-wider">SG GOV</span>
                          <div className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
                        </div>

                        <div className="flex flex-col items-center justify-center space-y-2.5 my-auto">
                          <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-rose-50 group-hover:border-rose-200 transition-all">
                            <Brain className="w-6 h-6 text-slate-400 group-hover:text-rose-600 transition-colors" />
                          </div>
                          <span className="text-xs font-extrabold tracking-tight text-slate-600">MEMORY MATCH</span>
                        </div>

                        <div className="text-center text-[9px] text-slate-400 font-bold uppercase tracking-widest">
                          TAP TO REVEAL
                        </div>
                      </div>

                      {/* CARD FRONT DESIGN (FLIPPED UP) */}
                      <div className={`absolute inset-0 w-full h-full rounded-2xl p-4 flex flex-col justify-between [backface-visibility:hidden] [transform:rotateY(180deg)] border-2 ${
                        isMatched 
                          ? 'bg-emerald-50/70 border-emerald-500 shadow-md shadow-emerald-100' 
                          : isFailedSelection
                            ? 'bg-rose-50/70 border-rose-500 shadow-sm'
                            : isSelected
                              ? 'bg-indigo-50/70 border-indigo-500 ring-2 ring-indigo-500/10'
                              : 'bg-white border-slate-200'
                      }`}>
                        
                        {/* Header within flipped card */}
                        <div className="flex items-center justify-between w-full">
                          <span className={`text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-wide ${
                            card.agencyType === 'Ministry' 
                              ? 'bg-rose-100 text-rose-800' 
                              : 'bg-teal-100 text-teal-800'
                          }`}>
                            {card.agencyType}
                          </span>

                          {isMatched ? (
                            <div className="flex items-center space-x-1 text-emerald-600 text-xs font-black">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                              <span className="hidden sm:inline text-[9px]">MATCHED</span>
                            </div>
                          ) : (
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                              {card.type === 'keyword' ? 'Entity' : 'Mandate'}
                            </span>
                          )}
                        </div>

                        {/* Card body content */}
                        <div className="flex flex-col items-center justify-center my-auto w-full text-center space-y-3">
                          
                          {/* KEYWORD CARD SPECIFIC VIEW (Name & Logo) */}
                          {card.type === 'keyword' && (
                            <>
                              <div 
                                className="p-3 rounded-2xl border flex items-center justify-center shadow-sm transition-transform"
                                style={{ 
                                  backgroundColor: `${card.color}08`, 
                                  borderColor: `${card.color}40`,
                                  color: card.color 
                                }}
                              >
                                <AgencySvgIcon iconType={card.iconPath} className="w-12 h-12" />
                              </div>
                              <h3 className="text-xs sm:text-sm font-black text-slate-800 leading-snug px-1 line-clamp-3">
                                {card.name}
                              </h3>
                            </>
                          )}

                          {/* DEFINITION CARD SPECIFIC VIEW (Responsibilities description - No helper label) */}
                          {card.type === 'definition' && (
                            <>
                              <div className="p-2 rounded-full bg-amber-50 border border-amber-200 text-amber-600">
                                <HelpCircle className="w-5 h-5" />
                              </div>
                              <p className="text-[11px] text-slate-600 leading-relaxed font-semibold px-0.5 max-h-[110px] overflow-y-auto custom-scrollbar">
                                {card.text}
                              </p>
                            </>
                          )}

                        </div>

                        {/* Card bottom identity reference */}
                        <div className="text-center w-full border-t border-slate-100 pt-2 flex items-center justify-between text-slate-400 font-bold text-[10px]">
                          <span className="font-mono text-slate-500">
                            {card.type === 'keyword' ? card.shortName : '???'}
                          </span>
                          <span className="text-[9px] font-medium">Card #{index + 1}</span>
                        </div>

                      </div>

                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* ==================== VICTORY STATE MODAL ==================== */}
        {gameState === 'victory' && (
          <div className="max-w-xl mx-auto w-full bg-white border border-slate-200 rounded-3xl p-6 md:p-8 text-center my-auto shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-rose-500 to-amber-500" />

            <div className="w-20 h-20 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-sm">
              <Award className="w-12 h-12" />
            </div>

            <h2 className="text-2xl md:text-4xl font-black text-slate-900 mb-2">
              Level {level} Completed!
            </h2>
            <p className="text-slate-500 text-sm md:text-base mb-6 font-medium">
              You matched all <strong className="text-slate-800">{level + 1}</strong> active Singapore Ministries &amp; Agencies with their primary public mandates.
            </p>

            {/* Score & Bonus Stats Board */}
            <div className="grid grid-cols-3 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-6">
              
              <div className="flex flex-col items-center">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Time Remaining</span>
                <span className="text-lg md:text-xl font-mono font-black text-slate-800">{timeLeft}s</span>
              </div>

              <div className="flex flex-col items-center border-x border-slate-200">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Time Bonus</span>
                <span className="text-lg md:text-xl font-black text-emerald-600">+{levelScoreBonus} pts</span>
              </div>

              <div className="flex flex-col items-center">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Total Score</span>
                <span className="text-lg md:text-xl font-black text-rose-600">{score} pts</span>
              </div>

            </div>

            {/* Campaign Stats Overview */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/50 text-xs text-slate-500 space-y-1.5 mb-6 text-left">
              <div className="flex items-center space-x-1.5 text-slate-700 font-bold">
                <Trophy className="w-4 h-4 text-amber-500" />
                <span>All-Time Scoreboard</span>
              </div>
              <div className="flex justify-between mt-1 text-slate-600 font-medium">
                <span>Personal Best Score:</span>
                <strong className="text-slate-900 font-black">{highScore.score} pts</strong>
              </div>
              <div className="flex justify-between text-slate-600 font-medium">
                <span>Current Campaign Level:</span>
                <strong className="text-slate-900 font-black">Level {level} / 8</strong>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleNextLevel}
                className="flex-1 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-extrabold px-6 py-3 rounded-xl transition-all shadow-sm active:scale-95 flex items-center justify-center space-x-2"
              >
                <span>{level < 8 ? `Proceed to Level ${level + 1}` : 'Restart Campaign'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={quitToMenu}
                className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold px-6 py-3 rounded-xl transition-all active:scale-95"
              >
                Main Menu
              </button>
            </div>

          </div>
        )}

        {/* ==================== TIMEOUT FAILURE MODAL ==================== */}
        {gameState === 'timeout' && (
          <div className="max-w-xl mx-auto w-full bg-white border border-slate-200 rounded-3xl p-6 md:p-8 text-center my-auto shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-rose-600" />

            <div className="w-20 h-20 rounded-full bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-6 shadow-sm">
              <XCircle className="w-12 h-12" />
            </div>

            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">
              Time's Up!
            </h2>
            <p className="text-slate-500 text-sm md:text-base mb-6 font-medium">
              You couldn't complete the Level {level} board in time. Keep trying to master the matches!
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => startNewGame(level)}
                className="flex-1 bg-rose-600 hover:bg-rose-500 text-white font-extrabold px-6 py-3 rounded-xl transition-all shadow-sm active:scale-95 flex items-center justify-center space-x-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retry Level {level}</span>
              </button>

              <button
                onClick={quitToMenu}
                className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold px-6 py-3 rounded-xl transition-all active:scale-95"
              >
                Main Menu
              </button>
            </div>
          </div>
        )}

      </main>

      {/* --- FOOTER --- */}
      <footer className="bg-white border-t border-slate-200 text-center py-4 text-xs text-slate-400 px-4 mt-auto">
        <p className="font-semibold">© 2026 Singapore Governance Literacy Project. For educational and public reference purposes.</p>
        <p className="mt-1 font-medium">Designed with accessible visual layouts, vector imagery, and Web Audio synthesizers.</p>
      </footer>

      {/* ==================== INTERACTIVE FACT SHEET MODAL ==================== */}
      {showFactSheet && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            
            {/* Header */}
            <div className="p-6 bg-white border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-rose-50 p-2.5 rounded-xl border border-rose-100 text-rose-600">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-950">Singapore Ministries &amp; Agencies Directory</h3>
                  <p className="text-xs text-slate-500 font-medium">Complete database reference for all 23 major government bodies</p>
                </div>
              </div>
              <button 
                onClick={() => { sounds.click(); setShowFactSheet(false); }}
                className="text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3.5 py-1.5 rounded-xl transition-colors text-xs font-bold"
              >
                Close Directory
              </button>
            </div>

            {/* Search & Filter bar */}
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col md:flex-row gap-3">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search name, abbreviation, or core mandate..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-slate-800 text-sm focus:outline-none focus:border-rose-500 transition-colors shadow-sm"
                />
              </div>

              {/* Filter */}
              <div className="flex items-center space-x-2 shrink-0">
                <span className="text-xs text-slate-400 font-bold uppercase shrink-0">Show:</span>
                <div className="flex bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
                  {[
                    { value: 'all', label: 'All Entities' },
                    { value: 'Ministry', label: 'Ministries' },
                    { value: 'Agency', label: 'Agencies' }
                  ].map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => { sounds.click(); setFilterType(opt.value); }}
                      className={`px-3.5 py-1.5 text-xs rounded-lg font-bold transition-all ${
                        filterType === opt.value 
                          ? 'bg-rose-50 text-rose-700 border border-rose-100 shadow-sm' 
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Content List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar bg-slate-50/50">
              
              {filteredAgencies.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  <p className="text-base font-bold mb-1 text-slate-700">No government bodies match your search</p>
                  <p className="text-xs">Try searching for other words like "housing", "defence", "health", etc.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredAgencies.map((agency) => (
                    <div 
                      key={agency.id}
                      className="bg-white hover:border-rose-200 border border-slate-200 rounded-2xl p-4 flex gap-4 items-start transition-all shadow-sm"
                    >
                      {/* Left icon wrapper */}
                      <div 
                        className="p-3 rounded-xl border flex items-center justify-center shrink-0"
                        style={{ 
                          backgroundColor: `${agency.color}08`, 
                          borderColor: `${agency.color}40`,
                          color: agency.color 
                        }}
                      >
                        <AgencySvgIcon iconType={agency.iconPath} className="w-10 h-10" />
                      </div>

                      {/* Details on right */}
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-sm font-extrabold text-slate-900">{agency.name}</h4>
                          <span className={`text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-wide shrink-0 ${
                            agency.type === 'Ministry' 
                              ? 'bg-rose-50 text-rose-700 border border-rose-100' 
                              : 'bg-teal-50 text-teal-700 border border-teal-100'
                          }`}>
                            {agency.type}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                          {agency.definition}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>

            {/* Footer */}
            <div className="p-4 bg-white border-t border-slate-100 flex items-center justify-between shadow-inner">
              <span className="text-xs text-slate-500 font-bold">
                Showing {filteredAgencies.length} of 23 government institutions.
              </span>
              <button
                onClick={() => {
                  sounds.click();
                  setShowFactSheet(false);
                  startNewGame(level);
                }}
                className="bg-rose-600 hover:bg-rose-500 active:scale-95 text-white text-xs font-extrabold px-4 py-2.5 rounded-xl transition-all shadow-sm"
              >
                Reset Level &amp; Play
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Basic global styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(244, 63, 94, 0.2);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(244, 63, 94, 0.4);
        }
      `}</style>

    </div>
  );
}