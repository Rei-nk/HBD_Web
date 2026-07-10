import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './GiftPage.css';

// Import Assets
import bgGift from '../assets/bg-gift.png';
import closedBox from '../assets/closed-box.png';
import openedBox from '../assets/opened-box.png';
import hirono from '../assets/hirono.png';
import cahaya from '../assets/cahaya.png';

// Komponen Custom buat Efek Confetti Ulang Tahun
const ConfettiEffect = () => {
  // Bikin 40 potongan confetti
  const pieces = Array.from({ length: 40 });
  const colors = ['#FFC700', '#FF3D00', '#00E676', '#2979FF', '#FF4081'];

  return (
    <div className="confetti-container">
      {pieces.map((_, i) => (
        <motion.div
          key={i}
          className="confetti-piece"
          style={{
            left: `${Math.random() * 100}vw`,
            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
            // Beberapa dibikin bentuk bulat (lingkaran)
            borderRadius: Math.random() > 0.5 ? '50%' : '4px',
            width: Math.random() > 0.5 ? '15px' : '10px',
            height: Math.random() > 0.5 ? '15px' : '25px',
          }}
          initial={{ y: '-10vh', rotate: 0, opacity: 1 }}
          animate={{ y: '110vh', rotate: 360, opacity: 0.8 }}
          transition={{
            duration: 2 + Math.random() * 3, // Kecepatan jatuhnya random
            ease: 'linear',
            repeat: Infinity,
            delay: Math.random() * 2 // Mulai jatuhnya ga barengan
          }}
        />
      ))}
    </div>
  );
};

export default function GiftPage() {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <div className="gift-container">
      
      {/* 1. LAYER BG */}
      <img src={bgGift} className="layer-bg-gift" alt="Background Gift" />
      
      {/* 2. LAYER CAHAYA */}
      <img src={cahaya} className="layer-cahaya-gift" alt="Cahaya" />

      {/* 3. JUDUL YOUR GIFT */}
      <motion.h1 
        className="gift-title"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        Your Gift
      </motion.h1>

      {/* 4. AREA KADO */}
      <div className="gift-center">
        {!isOpened ? (
          
          /* KONDISI 1: KOTAK BELUM DIBUKA */
          <motion.img
            src={closedBox}
            className="closed-box"
            alt="Closed Box"
            onClick={() => setIsOpened(true)}
            whileHover={{ scale: 1.05 }} // Efek pas mouse di atas kado
            animate={{
              rotate: [0, -3, 3, -3, 3, 0], // Efek Shake/Goyang minta dibuka
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              repeatDelay: 2.5 // Goyang tiap 2.5 detik
            }}
          />

        ) : (

          /* KONDISI 2: KOTAK UDAH DIBUKA */
          <div className="opened-scene">
            
            {/* Hirono loncat dari dalam */}
            <motion.img
              src={hirono}
              className="hirono-toy"
              initial={{ y: 80, scale: 0.5, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              transition={{ type: 'spring', bounce: 0.5, duration: 1.2 }}
            />
            
            {/* Wujud Kotak Terbuka */}
            <motion.img
              src={openedBox}
              className="opened-box"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            />

          </div>
        )}
      </div>

      {/* 5. CONFETTI JATUH (Muncul kalau kado udah dibuka) */}
      {isOpened && <ConfettiEffect />}

      {/* 6. BUTTON CTA (Muncul 1.5 detik setelah kado dibuka) */}
      {isOpened && (
        <motion.div
          className="cta-message"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          onClick={() => {
            window.open('https://wa.me/6282223006494?text=Halo%20sayang,%20aku%20udah%20liat%20kadonya!%20Makasih%20ya%20udah%20bikinin%20web%20selucu%20ini...', '_blank');
          }}
        >
          sampaikan sesuatu?
        </motion.div>
      )}

    </div>
  );
}