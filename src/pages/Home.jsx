import React from 'react';
import HeroCarousel from '../components/Home/HeroCarousel';
import ItemsGrid from '../components/Home/ItemsGrid';
import Stats from '../components/Home/Stats';
import HowItWorks from '../components/Home/HowItWorks';
import Reviews from '../components/Home/Reviews';
import CTA from '../components/Home/CTA';
import SEO from '../components/SEO';
import Features from '../components/Home/Features';

const Home = () => {
	return (
		<div className='bg-light-background dark:bg-dark-background'>
			<SEO title='Home' description='Manage your lost and found items' />
			<HeroCarousel />
			<Stats />
			<HowItWorks />
			<ItemsGrid />
			<Features />
			<Reviews />
			<CTA />
		</div>
	);
};

export default Home;
