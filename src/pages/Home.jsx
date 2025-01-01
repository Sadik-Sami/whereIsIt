import React from 'react';
import HeroCarousel from '../components/Home/HeroCarousel';
import ItemsGrid from '../components/Home/ItemsGrid';
import Stats from '../components/Home/Stats';
import HowItWorks from '../components/Home/HowItWorks';
import Reviews from '../components/Home/Reviews';
import CTA from '../components/Home/CTA';

const Home = () => {
  return (
    <div className='bg-light-background dark:bg-dark-background'>
      <HeroCarousel />
      <Stats />
      <HowItWorks />
      <ItemsGrid />
      <Reviews />
      <CTA />
    </div>
  );
};

export default Home;
