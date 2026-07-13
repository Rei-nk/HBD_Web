import { useState, useRef, useMemo, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import NameGate from './components/NameGate';
import LandingPage from './components/LandingPage';
import GalleryPage from './components/GalleryPage';
import LetterPage from './components/LetterPage';
import GiftPage from './components/GiftPage'; 
import iconMusic from './assets/music-icon.svg';

// ==========================================
// 1. IMPORT SEMUA LAGU LU DI SINI
// ==========================================
import jvkeHer from './assets/jvke-her.mp3';
import oursToKeep from './assets/ours-to-keep.mp3'; // Ganti nama file sesuai yg lu punya
import enchanted from './assets/enchanted.mp3';     // Ganti nama file
import thousandYears from './assets/thousand-years.mp3'; // Ganti nama file

// ==========================================
// 2. IMPORT SEMUA GAMBAR COVER LU DI SINI
// ==========================================
import coverHer from './assets/nanad6.png'; // Cover buat lagu Her
import coverOurs from './assets/cover-ours.png'; // Cover buat Ours to Keep (Ganti path-nya)
import coverEnchanted from './assets/cover-enchanted.png'; // Cover buat Enchanted
import coverThousand from './assets/cover-thousand.png'; // Cover buat Thousand Years

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

// ==========================================
// DATABASE PLAYLIST LAGU
// ==========================================
const playlist = [
  { title: "JVKE - her", src: jvkeHer, cover: coverHer },
  { title: "Ours to Keep", src: oursToKeep, cover: coverOurs },
  { title: "Taylor Swift - Enchanted", src: enchanted, cover: coverEnchanted },
  { title: "Christina Perri - A Thousand Years", src: thousandYears, cover: coverThousand }
];

function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [activePage, setActivePage] = useState('Home');
  
  // State Musik & Player
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false); 
  const [progress, setProgress] = useState(0); 
  
  // State buat nyimpen urutan lagu ke-berapa yg lagi muter (mulai dari 0)
  const [currentSongIndex, setCurrentSongIndex] = useState(0); 
  
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

  // Fungsi Next Lagu
  const nextSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % playlist.length);
  };

  // Fungsi Prev Lagu
  const prevSong = () => {
    setCurrentSongIndex((prevIndex) => 
      prevIndex === 0 ? playlist.length - 1 : prevIndex - 1
    );
  };

  // Efek ganti lagu otomatis langsung nge-play
  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play().catch(err => console.log("Play interrupted", err));
    }
  }, [currentSongIndex, isPlaying]);

  // Fungsi buat ngitung detik berjalannya lagu
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      if (duration) {
        setProgress((current / duration) * 100);
      }
    }
  };

  return (
    <>
      {/* ==========================================
          PEMUTAR MUSIK GLOBAL
          onEnded bikin otomatis ganti lagu pas abis
          ========================================== */}
      <audio 
        ref={audioRef} 
        src={playlist[currentSongIndex].src} // Sumber lagu dinamis ngikutin state
        onEnded={nextSong} // Kalau lagu abis, panggil fungsi nextSong
        onTimeUpdate={handleTimeUpdate} 
      />
      
      {isUnlocked && <Fireflies />}
      
      {/* TOMBOL ICON MUSIC (Pojok Kanan Atas) */}
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
            className="music-player-wrapper" 
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            style={{ 
              position: 'fixed', 
              top: '9vh', 
              right: '5vw', 
              zIndex: 10000 
            }}
          >
            {/* 👇 KOTAK KACA DIBUKA (JANGAN DITUTUP DULU) 👇 */}
            <div className="music-player-overlay">
              
              <div className="player-header">Music</div>
              
              {/* Gambar Cover Dinamis */}
              <img 
                src={playlist[currentSongIndex].cover} 
                alt="Cover Album" 
                className="player-cover" 
                style={{ width: '150px', height: '150px', borderRadius: '15px', objectFit: 'cover', margin: '15px 0' }}
              />
              
              {/* Judul Dinamis */}
              <div className="player-title" style={{ fontSize: '1.2rem', marginBottom: '10px' }}>
                {playlist[currentSongIndex].title}
              </div>

              {/* Progress Bar (Hijau - Abu abu) */}
              <div className="progress-bar-bg" style={{ width: '100%', height: '5px', background: '#ccc', borderRadius: '5px', marginBottom: '15px' }}>
                <div 
                  className="progress-bar-fill" 
                  style={{ width: `${progress}%`, height: '100%', background: '#a7ff9c', borderRadius: '5px' }} 
                ></div>
              </div>

              {/* Tombol Kontrol (Prev, Play/Pause, Next) */}
              <div className="player-controls" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <button 
                  className="control-btn"
                  onClick={prevSong} 
                  style={{ background: 'none', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer' }}
                >
                  ⏮
                </button>
                
                <button 
                  className="play-pause-btn" 
                  onClick={togglePlay}
                  style={{ background: '#a7ff9c', color: '#000', border: 'none', borderRadius: '50%', width: '45px', height: '45px', fontSize: '1.2rem', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                  {isPlaying ? '⏸' : '▶'}
                </button>

                <button 
                  className="control-btn"
                  onClick={nextSong} 
                  style={{ background: 'none', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer' }}
                >
                  ⏭
                </button>
              </div>

            {/* 👇 KOTAK KACA BARU DITUTUP DI SINI BRE! 👇 */}
            </div>
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