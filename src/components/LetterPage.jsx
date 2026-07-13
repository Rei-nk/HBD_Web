import React from 'react';
import { motion } from 'framer-motion';
import './LetterPage.css';


// Import Assets Sesuai Layer
import tulipBawah from '../assets/tulip bawah.png';
import tulipBgLetter from '../assets/tulip-bg-letter.png';
import buku from '../assets/buku.png';
import nanad5 from '../assets/nanad5.png';

export default function LetterPage({ setActivePage }) {
  return (
    <div className="letter-container">
      
      {/* ==========================================
          FIXED UI (MENU & MUSIK) 
          ========================================== */}
      <motion.div 
        className="layer-scrolls"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ pointerEvents: 'auto', zIndex: 9999 }}
      >
        <span onClick={() => setActivePage('Home')}>Home</span>
        <span onClick={() => setActivePage('Gallery')}>Gallery</span>
        <span className="active">Letter</span> 
      </motion.div>


      {/* ==========================================
          LAYER 1 & 2: TULIP & NANAD 4
          ========================================== */}
      <img src={tulipBgLetter} className="layer-tulip-letter" alt="Background Tulip" />

      <img src={tulipBawah} className="layer-tulipbawah" alt="Tulip Bawah" />

      <div className="layer-pattern-1"></div>
      
      <div className="tulip-transition"></div>

      {/* ==========================================
          LAYER 3: BUKU BESERTA TEKS SURATNYA
          ========================================== */}
      <div className="book-wrapper">
        <motion.img 
          src={buku} 
          className="layer-buku" 
          alt="Buku"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1 }}
        />
        
        {/* Teks Halaman Kiri */}
        <motion.div 
          className="book-text page-left"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
        </motion.div>

        {/* Teks Halaman Kanan */}
        <motion.div 
          className="book-text page-right"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.5, delay: 0.8 }}
        >
        </motion.div>
      </div>

      {/* ==========================================
          LAYER 4, 5, & CTA: KAIN, NANAD 5, LINK GIFT
          ========================================== */}

      <motion.img 
        src={nanad5} 
        className="layer-nanad5" 
        alt="Nadia 5"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
      />

      <motion.div 
        className="cta-gift"
        onClick={() => setActivePage('Gift')} // <-- LARI KE PAGE GIFT
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        Ur gift honey !
      </motion.div>

    </div>
  );
}