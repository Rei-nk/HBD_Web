import React from 'react';
import { motion } from 'framer-motion';
import './LandingPage.css';
import hbdText from '../assets/teks hbd.png';
import balon from '../assets/balon.png';
import nanad2 from '../assets/nanad2.png';
import bouquet from '../assets/bouquet.png';
import elemenDudukan from '../assets/elemen dudukan.svg';
import cake1 from '../assets/cake 1.png';
import cahaya from '../assets/cahaya.png';

export default function LandingPage({ setActivePage }) {
  return (
    <div className="landing-container">
      
      {/* ==========================================
          FIXED UI (MUNCUL TERUS)
          ========================================== */}
      <motion.div 
        className="layer-scrolls"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <span className="active">Home</span>
        <span onClick={() => setActivePage('Gallery')} style={{ cursor: 'pointer' }}>Gallery</span>
        <span onClick={() => setActivePage('Letter')} style={{ cursor: 'pointer' }}>Letter</span>
        
      </motion.div>

      {/* ==========================================
          VIEWPORT 1 (ATAS)
          ========================================== */}
      <div className="layer-tulip-bg"></div>
      
      <motion.img 
        src={bouquet} 
        className="layer-bouquet" 
        alt="Bouquet"
        initial={{ opacity: 0, x: 100, rotate: 0 }}
        animate={{ opacity: 1, x: 0, rotate: -12 }}
        transition={{ duration: 1.2, delay: 0.3 }}
      />

      {/* Transisi Tengah */}
      <div className="layer-blur-transition"></div>

      {/* ==========================================
          VIEWPORT 2 (BAWAH)
          ========================================== */}
      
      {/* Background Paling Belakang Viewport 2 */}
      <div className="layer-pattern-2"></div>
      
      {/* 1. Efek Glow di belakang gambar */}
      <div className="glow-effect-hbd"></div>

      {/* 2. Gambar Teks HBD di Atas */}
      <motion.img 
        src={hbdText} 
        className="hbd-text-img" 
        alt="Happy Birthday"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      />

      {/* 3. Gambar Balon di samping Cake */}
      <motion.img 
        src={balon} 
        className="balon-img" 
        alt="Balon"
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", bounce: 0.5, duration: 1.5 }}
      />

      <motion.img 
        src={nanad2} 
        className="layer-nanad2" 
        alt="Nadia"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.2 }}
      />

      {/* Pattern 1 di depan Nadia */}
      <div className="layer-pattern-1"></div>

      <motion.img 
        src={elemenDudukan} 
        className="layer-elemen-dudukan" 
        alt="Cake Stand"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1 }}
      />

      <motion.img 
        src={cake1} 
        className="layer-cake" 
        alt="Birthday Cake"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, delay: 0.3 }}
      />

      <motion.div 
        className="layer-name"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        Nadia Salsabila Ayodya
      </motion.div>

      <motion.div 
        className="layer-bubble"
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <span className="text-20th">20th</span>
      </motion.div>

      <img 
        src={cahaya} 
        className="layer-cahaya" 
        alt="Cahaya"
      />

    </div>
  );
}