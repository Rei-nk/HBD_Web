import React from 'react';
import { motion } from 'framer-motion';
import './GalleryPage.css';

// Import UI Fixed
import cahaya from '../assets/cahaya.png';

// Import Assets Atas
import bgJendela from '../assets/bg-jendela.png';
import nanad3 from '../assets/nanad3.png';

// Import Semua Frames
import frameImg from '../assets/frame.png';

// Import Semua Photos
import glry1 from '../assets/glry1.png';
import glry2 from '../assets/glry2.png';
import glry3 from '../assets/glry3.png';
import glry4 from '../assets/glry4.png';
import glry5 from '../assets/glry5.png';
import glry6 from '../assets/glry6.png';
import glry7 from '../assets/glry7.png';
import glry8 from '../assets/glry8.png';

export default function GalleryPage({ setActivePage }) {
  // Array data biar gampang di-looping di grid
  const galleryData = [
    { id: 1, frame: frameImg, photo: glry1 },
    { id: 2, frame: frameImg, photo: glry2 },
    { id: 3, frame: frameImg, photo: glry3 },
    { id: 4, frame: frameImg, photo: glry4 },
    { id: 5, frame: frameImg, photo: glry5 },
    { id: 6, frame: frameImg, photo: glry6 },
    { id: 7, frame: frameImg, photo: glry7 },
    { id: 8, frame: frameImg, photo: glry8 },
  ];

  return (
    <div className="gallery-container">
      
      {/* ==========================================
          FIXED UI (MENU & MUSIK) - Pake class dari landing page
          ========================================== */}
      <motion.div 
        className="layer-scrolls"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span onClick={() => setActivePage('Home')} style={{ cursor: 'pointer' }}>Home</span>
        <span className="active">Gallery</span>
        <span onClick={() => setActivePage('Letter')} style={{ cursor: 'pointer' }}>Letter</span>
        
      </motion.div>

      {/* CAHAYA FIXED DI PALING DEPAN */}
      <img src={cahaya} className="layer-cahaya-gallery" alt="Cahaya Flare" />

      {/* ==========================================
          SECTION 1: JENDELA
          ========================================== */}
      <div className="window-section">
        <img src={bgJendela} className="layer-bg-jendela" alt="Background Jendela" />
        
        <motion.img 
          src={nanad3} 
          className="layer-nanad3" 
          alt="Nadia di Jendela"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        />
        
        <div className="layer-pembatas"></div>
      </div>

      {/* ==========================================
          SECTION 2: DINDING GALLERY
          ========================================== */}
      <div className="wall-section">
        <motion.h1 
          className="gallery-title"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 1 }}
        >
          Gallery of our love
        </motion.h1>

        <div className="gallery-grid">
          {galleryData.map((item, index) => (
            <motion.div 
              key={item.id} 
              className="frame-wrapper"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.1 }} /* Efek muncul berurutan (stagger) */
            >
              {/* Foto ditaruh di layer 1 (belakang) */}
              <img src={item.photo} className="layer-glry" alt={`Gallery ${item.id}`} />
              
              {/* Bingkai emas ditaruh di layer 2 (depan nutupin tepi foto) */}
              <img src={item.frame} className="layer-frame" alt={`Frame ${item.id}`} />
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
}