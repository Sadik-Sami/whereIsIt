import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Typewriter from 'react-typewriter-effect';
import slide1 from '../../assets/slides/Slide1.jpg';
import slide2 from '../../assets/slides/Slide2.jpg';
import slide3 from '../../assets/slides/Slide3.jpg';
import slide4 from '../../assets/slides/Slide4.jpg';
import slide5 from '../../assets/slides/Slide5.jpg';

const slides = [
  {
    image: slide1,
    title: 'Lost Something?',
    description: 'We help you find your valuable belongings',
    stats: '90% Success Rate in Item Recovery',
  },
  {
    image: slide2,
    title: 'Found Something?',
    description: 'Help others recover their lost items',
    stats: 'Over 1000+ Items Returned',
  },
  {
    image: slide3,
    title: 'Community Support',
    description: 'Join our network of helpful individuals',
    stats: '5000+ Active Community Members',
  },
  {
    image: slide4,
    title: 'Quick Response',
    description: 'Fast and efficient lost & found system',
    stats: 'Average Response Time: 2 Hours',
  },
  {
    image: slide5,
    title: 'Secure Platform',
    description: 'Your information is safe with us',
    stats: '100% Secure Verification Process',
  },
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isAnimating) {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }
    }, 5000);

    return () => clearInterval(timer);
  }, [isAnimating]);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <div className='relative w-full h-screen overflow-hidden'>
      <AnimatePresence initial={false} custom={currentSlide}>
        <motion.div
          key={currentSlide}
          custom={currentSlide}
          variants={slideVariants}
          initial='enter'
          animate='center'
          exit='exit'
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          onAnimationStart={() => setIsAnimating(true)}
          onAnimationComplete={() => setIsAnimating(false)}
          className='absolute w-full h-full'>
          {/* Background Image */}
          <div
            className='absolute inset-0 bg-cover bg-center'
            style={{
              backgroundImage: `url(${slides[currentSlide].image})`,
            }}>
            <div className='absolute inset-0 bg-black/50' />
          </div>

          {/* Content */}
          <div className='relative h-full flex flex-col items-center justify-center text-white px-4 sm:px-6 lg:px-8'>
            <div className='max-w-3xl mx-auto text-center'>
              <motion.h1
                className='text-4xl sm:text-5xl md:text-6xl font-bold mb-6'
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}>
                <Typewriter text={slides[currentSlide].title} cursor={false} typeSpeed={70} />
              </motion.h1>

              <motion.p
                className='text-xl sm:text-2xl mb-8'
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}>
                {slides[currentSlide].description}
              </motion.p>

              <motion.div
                className='text-lg sm:text-xl font-semibold'
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}>
                {slides[currentSlide].stats}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slide Indicators */}
      <div className='absolute bottom-8 left-0 right-0 flex justify-center gap-2'>
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentSlide === index ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
