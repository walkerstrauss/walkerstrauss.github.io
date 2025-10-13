import React from 'react';
import { motion } from 'framer-motion';
import art1 from '../assets/artwork/artwork10.png';
import art2 from '../assets/artwork/artwork1.png';
import art3 from '../assets/artwork/artwork5.png';
import art4 from '../assets/artwork/artwork4.png';
import art5 from '../assets/artwork/artwork0.png';

export default function Artwork() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: 'easeOut' },
  };

  return (
    <div className="page">
      <motion.h2
        {...fadeIn}
        style={{ textAlign: 'center', marginBottom: '2rem' }}
      >
        Artwork
      </motion.h2>.

      {/* Top two images side by side */}
      <motion.div
        className="artwork-top"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '1.5rem',
          marginBottom: '2.5rem',
        }}
      >
        <motion.img
          src={art1}
          alt="Artwork 1"
          className="art-img-large"
          style={{
            width: '100%',
            maxWidth: '600px',
            borderRadius: '12px',
            objectFit: 'cover',
          }}
          whileHover={{ scale: 1.02 }}
        />
        <motion.img
          src={art2}
          alt="Artwork 2"
          className="art-img-large"
          style={{
            width: '100%',
            maxWidth: '600px',
            borderRadius: '12px',
            objectFit: 'cover',
          }}
          whileHover={{ scale: 1.02 }}
        />
      </motion.div>

      {/* Five horizontal images */}
      <motion.div
        className="artwork-gallery"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '1rem',
        }}
      >
        {[art3, art4, art5].map((img, index) => (
          <motion.img
            key={index}
            src={img}
            alt={`Artwork ${index + 3}`}
            className="art-img-small"
            style={{
              width: '100%',
              maxWidth: '600px',
              borderRadius: '10px',
              objectFit: 'cover',
            }}
            whileHover={{ scale: 1.05 }}
          />
        ))}
      </motion.div>
    </div>
  );
}


