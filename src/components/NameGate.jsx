import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './NameGate.css'; 

export default function NameGate({ onUnlock }) {
  // step 0: Text 1, step 1: Text 2, step 2: Text 3 + Input
  const [step, setStep] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState(false);

  // Daftar nama yang diperbolehkan (huruf kecil semua buat gampang ngeceknya)
  const validNames = ['nadia', 'nadia salsabila', 'nadia salsabila ayodya'];

  // Logic Auto-Next untuk Teks 1 dan Teks 2
  useEffect(() => {
    if (step === 0) {
      const timer = setTimeout(() => setStep(1), 4000); // 4 detik
      return () => clearTimeout(timer);
    } else if (step === 1) {
      const timer = setTimeout(() => setStep(2), 4000); // 4 detik
      return () => clearTimeout(timer);
    }
  }, [step]);

  // Handle Validasi Input
  const handleSubmit = (e) => {
    e.preventDefault(); // Biar web gak ke-refresh pas di-enter
    
    // Cek apakah inputan user ada di daftar validNames
    if (validNames.includes(inputValue.toLowerCase().trim())) {
      setError(false);
      // Panggil fungsi dari App.jsx buat pindah ke halaman selanjutnya
      if (onUnlock) onUnlock(); 
    } else {
      setError(true);
      setInputValue(''); // Kosongin input kalau salah
    }
  };

  // Konfigurasi Animasi Ngetik Framer Motion
  const sentenceVariant = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 } // Jeda waktu per huruf (0.1 detik)
    }
  };

  const letterVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  // Komponen bantuan buat mecah string jadi per-huruf
  const AnimatedText = ({ text }) => (
    <motion.div
      variants={sentenceVariant}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, filter: "blur(5px)", transition: { duration: 0.5 } }}
      className="handwriting-text"
    >
      {text.split('').map((char, index) => (
        <motion.span key={index} variants={letterVariant}>
          {char}
        </motion.span>
      ))}
    </motion.div>
  );

  return (
    <div className="gate-container">
      {/* --- URUTAN LAYER (Z-INDEX) --- */}
      <div className="layer-pattern"></div>
      <div className="layer-tulip"></div>
      <div className="layer-overlay"></div>

      {/* Konten Utama di Layer Paling Atas */}
      <div className="layer-content">
        <AnimatePresence mode="wait">
          
          {step === 0 && (
            <AnimatedText key="text1" text="Wait.. how did u get here?" />
          )}

          {step === 1 && (
            <AnimatedText key="text2" text="This is just for special person" />
          )}

          {step === 2 && (
            <motion.div
              key="text3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="flex flex-col items-center"
            >
              <div className="handwriting-text">Who are u?</div>
              
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                    setError(false); // Ilangin error pas dia ngetik lagi
                  }}
                  className="secret-input"
                  placeholder=""
                  autoFocus
                />
              </form>

              {error && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="error-text"
                >
                  Oops, that's not the correct name...
                </motion.div>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}