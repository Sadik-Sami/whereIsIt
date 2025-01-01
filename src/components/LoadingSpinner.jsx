import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ size = 'default' }) => {
  const spinTransition = {
    repeat: Infinity,
    ease: 'linear',
    duration: 1,
  };

  const sizeClasses = {
    small: 'w-6 h-6',
    default: 'w-12 h-12',
    large: 'w-16 h-16',
  };

  return (
    <div className='flex items-center justify-center'>
      <motion.div
        animate={{ rotate: 360 }}
        transition={spinTransition}
        className={`${sizeClasses[size]} border-4 border-primary border-t-transparent rounded-full`}
      />
    </div>
  );
};

export default LoadingSpinner;
