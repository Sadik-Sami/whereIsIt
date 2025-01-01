import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export default function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const reviews = [
    {
      name: 'Sarah Ahmed',
      location: 'Dhaka',
      rating: 5,
      text: 'Lost my phone at Gulshan-1, and thanks to WhereIsIt, I got it back within hours! The community here is incredibly helpful and trustworthy.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120&h=120',
    },
    {
      name: 'Rafiq Islam',
      location: 'Chittagong',
      rating: 5,
      text: "Found someone's wallet and was able to return it through this platform. The process was smooth and secure. Great initiative!",
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120&h=120',
    },
    {
      name: 'Nusrat Jahan',
      location: 'Sylhet',
      rating: 5,
      text: "My cat went missing and I was devastated. Posted here and someone found him! The community's support was overwhelming.",
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=120&h=120',
    },
    {
      name: 'Kamal Hassan',
      location: 'Khulna',
      rating: 4,
      text: 'Very user-friendly platform. The notification system is great, and I love how easy it is to post lost items.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=120&h=120',
    },
    {
      name: 'Fatima Rahman',
      location: 'Rajshahi',
      rating: 5,
      text: 'Lost my important documents on a bus. Someone found them and contacted me through WhereIsIt. Eternally grateful!',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120&h=120',
    },
    {
      name: 'Mohammad Ali',
      location: 'Barisal',
      rating: 5,
      text: 'The verification system is excellent. Feels safe to connect with strangers when recovering lost items.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120&h=120',
    },
    {
      name: 'Tasnim Khan',
      location: 'Mymensingh',
      rating: 5,
      text: 'Found my lost laptop bag with all my work equipment. The quick response from the community saved my job!',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120&h=120',
    },
    {
      name: 'Rahim Mia',
      location: 'Rangpur',
      rating: 4,
      text: "Great platform! The categorization system makes it easy to find what you're looking for. Very organized.",
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=120&h=120',
    },
  ];

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

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => (prevIndex + newDirection + reviews.length) % reviews.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className='py-20 bg-light-muted dark:bg-dark-muted overflow-hidden'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className='text-3xl font-bold text-light-foreground dark:text-dark-foreground mb-4'>
            What Our Users Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className='text-xl text-light-foreground/70 dark:text-dark-foreground/70'>
            Real stories from our community members
          </motion.p>
        </div>

        <div className='relative'>
          <div className='relative h-[400px] w-full'>
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial='enter'
                animate='center'
                exit='exit'
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                drag='x'
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);
                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
                className='absolute w-full'>
                <div className='bg-light-card dark:bg-dark-card rounded-2xl shadow-xl p-8 mx-auto max-w-4xl'>
                  <div className='flex flex-col items-center text-center'>
                    <Quote className='w-12 h-12 text-primary mb-6 rotate-180' />
                    <img
                      src={reviews[currentIndex].image}
                      alt={reviews[currentIndex].name}
                      className='w-20 h-20 rounded-full object-cover mb-4'
                    />
                    <div className='flex gap-1 mb-4'>
                      {[...Array(reviews[currentIndex].rating)].map((_, i) => (
                        <Star key={i} className='w-5 h-5 fill-primary text-primary' />
                      ))}
                    </div>
                    <p className='text-xl text-light-foreground dark:text-dark-foreground mb-6 italic'>
                      "{reviews[currentIndex].text}"
                    </p>
                    <h3 className='text-lg font-semibold text-light-foreground dark:text-dark-foreground'>
                      {reviews[currentIndex].name}
                    </h3>
                    <p className='text-light-foreground/70 dark:text-dark-foreground/70'>
                      {reviews[currentIndex].location}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <button
            className='absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 w-12 h-12 rounded-full bg-light-card dark:bg-dark-card shadow-lg flex items-center justify-center text-light-foreground dark:text-dark-foreground hover:bg-primary hover:text-white transition-colors'
            onClick={() => paginate(-1)}>
            <ChevronLeft className='w-6 h-6' />
          </button>
          <button
            className='absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 w-12 h-12 rounded-full bg-light-card dark:bg-dark-card shadow-lg flex items-center justify-center text-light-foreground dark:text-dark-foreground hover:bg-primary hover:text-white transition-colors'
            onClick={() => paginate(1)}>
            <ChevronRight className='w-6 h-6' />
          </button>

          {/* Dots Indicator */}
          <div className='flex justify-center mt-8 gap-2'>
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  const newDirection = index > currentIndex ? 1 : -1;
                  setDirection(newDirection);
                  setCurrentIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? 'w-8 bg-primary'
                    : 'bg-light-foreground/20 dark:bg-dark-foreground/20 hover:bg-primary/50'
                }`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
