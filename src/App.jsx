import { useState, useRef, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import NameGate from './components/NameGate';
import LandingPage from './components/LandingPage';
import GalleryPage from './components/GalleryPage';
import LetterPage from './components/LetterPage';
import GiftPage from './components/GiftPage'; 
import iconMusic from './assets/music-icon.svg';
import jvkeHer from './assets/jvke-her.mp3';
import coverMusic from './assets/nanad6.png'; // 👈 Mantap udah pake nanad6
import './App.css';

// ==========================================
// KOMPONEN KUNANG-KUNANG (FIREFLIES)
// ==========================================
const Fireflies = () => {
  const fireflies = useMemo(() => {
    return Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}vw`,
      size: Math.random() * 3 + 2, 
      duration: Math.random() * 12 + 10, 
      delay: Math.random() * 15, 
      xOffset: (Math.random() - 0.5) * 80 
    }));
  }, []);

  // 👇 INI BAGIAN YANG KEPOTONG DI KODE LU TADI BRE 👇
  return (
    <div className="fireflies-container">
      {fireflies.map((ff) => (
        <motion.div
          key={ff.id}
          className="firefly"
          style={{
            left: ff.left,
            width: `${ff.size}px`,
            height: `${ff.size}px`,
          }}
          animate={{
            // 👇 Ini yang diganti, mulai dari 0 (bawah) meluncur ke -120vh (atas layar)
            y: [0, '-120vh'], 
            x: [0, ff.xOffset, -ff.xOffset, ff.xOffset, 0],
            opacity: [0, 1, 0.8, 0]
          }}
          transition={{
            y: { duration: ff.duration, repeat: Infinity, ease: 'linear', delay: ff.delay },
            x: { duration: ff.duration * 0.7, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: ff.delay },
            opacity: { duration: ff.duration, repeat: Infinity, ease: 'easeInOut', delay: ff.delay }
          }}
        />
      ))}
    </div>
  );
};

function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [activePage, setActivePage] = useState('Home');
  
  // State Musik & Player
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false); // State buat pop-up
  const [progress, setProgress] = useState(0); // State buat progress bar
  
  const audioRef = useRef(null);

  // Fungsi toggle play/pause
  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Fungsi buat ngitung detik berjalannya lagu
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      // Itung persentase progress
      if (duration) {
        setProgress((current / duration) * 100);
      }
    }
  };

  return (
    <>
      {/* ==========================================
          PEMUTAR MUSIK GLOBAL
          onTimeUpdate bakal terus jalan tiap detik lagu muter
          ========================================== */}
      <audio 
        ref={audioRef} 
        src={jvkeHer} 
        loop 
        onTimeUpdate={handleTimeUpdate} 
      />
      
      {isUnlocked && <Fireflies />}
      
      {/* ==========================================
          TOMBOL ICON MUSIC (Pojok Kanan Atas)
          Sekarang fungsinya buat buka/tutup Pop-up
          ========================================== */}
      {isUnlocked && (
        <img 
          src={iconMusic} 
          alt="Toggle Music" 
          onClick={() => setShowPlayer(!showPlayer)} 
          style={{
            position: 'fixed',
            top: '3vh',
            right: '5vw',
            width: '35px',
            zIndex: 9999,
            cursor: 'pointer',
            animation: isPlaying ? 'spinMusic 3s linear infinite' : 'none',
            opacity: isPlaying ? 1 : 0.6
          }}
        />
      )}

      {/* ==========================================
          POP UP MUSIC PLAYER ALA SPOTIFY
          ========================================== */}
      <AnimatePresence>
        {showPlayer && (
          <motion.div 
            className="music-player-overlay"
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <div className="player-header">Music</div>
            
            <img src={coverMusic} alt="Cover Album" className="player-cover" />
            
            <div className="player-title">JVKE - her</div>

            {/* Progress Bar (Hijau - Abu abu) */}
            <div className="progress-bar-bg">
              <div 
                className="progress-bar-fill" 
                style={{ width: `${progress}%` }} 
              ></div>
            </div>

            {/* Tombol Play/Pause */}
            <button className="play-pause-btn" onClick={togglePlay}>
              {isPlaying ? '⏸' : '▶'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          <motion.div 
            key="gate"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50, filter: 'blur(10px)' }}
            transition={{ duration: 1 }}
            style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}
          >
            <NameGate onUnlock={() => {
              setIsUnlocked(true);
              if (audioRef.current) {
                audioRef.current.play().then(() => {
                  setIsPlaying(true);
                }).catch(err => console.log("Gagal autoplay:", err));
              }
            }} />
          </motion.div>
        ) : (
          <motion.div 
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            style={{ width: '100%', height: '100%' }}
          >
            {activePage === 'Home' && <LandingPage setActivePage={setActivePage} />}
            {activePage === 'Gallery' && <GalleryPage setActivePage={setActivePage} />}
            {activePage === 'Letter' && <LetterPage setActivePage={setActivePage} />}
            {activePage === 'Gift' && <GiftPage setActivePage={setActivePage} />}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;