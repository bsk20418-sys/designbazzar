import React from 'react';
import { motion } from 'motion/react';

/**
 * Static hero character using the user's supplied cutout.
 * A softly blurred duplicate is used only near the lower edge so the character
 * blends naturally into the dark hero background.
 */
export const CharacterGaze: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
      className="hero-character-gaze absolute left-1/2 top-1/2 z-10"
      aria-hidden="true"
    >
      <img src="/assets/hero-character-user.png" alt="" className="hero-character-image" />
      <img src="/assets/hero-character-user.png" alt="" className="hero-character-bottom-blur" />
    </motion.div>
  );
};
