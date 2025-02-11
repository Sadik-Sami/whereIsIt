import { motion } from 'framer-motion';
import { Heart, Shield, Target } from 'lucide-react';
import SEO from '../components/SEO';

const values = [
	{
		icon: Heart,
		title: 'Empathy',
		description: 'We understand the emotional impact of losing valuable items and strive to help.',
	},
	{
		icon: Shield,
		title: 'Trust',
		description: 'Building a safe and secure platform for our community is our top priority.',
	},
	{
		icon: Target,
		title: 'Efficiency',
		description: 'We aim to reunite people with their lost items as quickly as possible.',
	},
];

const team = [
	{
		name: 'Alex Johnson',
		role: 'Founder & CEO',
		image: 'https://i.ibb.co.com/NWqmFzn/sami.jpg',
		bio: 'Passionate about helping people recover their lost belongings.',
	},
	{
		name: 'Archer Ken',
		role: 'Head of Operations',
		image: 'https://i.ibb.co.com/nQZB0zs/kazi.png',
		bio: 'Expert in building and scaling community-driven platforms.',
	},
	{
		name: 'Michael Brown',
		role: 'Tech Lead',
		image: 'https://i.ibb.co.com/Z1BDDZR/shafin.png',
		bio: 'Dedicated to creating innovative solutions for lost and found management.',
	},
];

const timeline = [
	{
		year: '2020',
		title: 'The Beginning',
		description: 'WhereIsIt was founded with a mission to revolutionize lost and found.',
	},
	{
		year: '2021',
		title: 'Rapid Growth',
		description: 'Expanded to 50+ cities and helped recover 5000+ items.',
	},
	{
		year: '2022',
		title: 'Community Focus',
		description: 'Launched community features and reached 25,000 active users.',
	},
	{
		year: '2023',
		title: 'Global Expansion',
		description: 'Now operating in multiple countries with advanced AI features.',
	},
];

export default function About() {
	return (
		<>
			<SEO
				title='About Us | WhereIsIt'
				description="Learn about WhereIsIt's mission to help people find their lost items and build a helpful community."
			/>

			{/* Hero Section */}
			<section className='relative py-20 md:py-28 bg-light-background dark:bg-dark-background overflow-hidden'>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 0.1 }}
					className='absolute inset-0 grid grid-cols-2 md:grid-cols-3 gap-4 p-4'>
					{[...Array(12)].map((_, i) => (
						<div key={i} className='h-full bg-primary/5 rounded-lg' />
					))}
				</motion.div>

				<div className='container mx-auto relative px-4 md:px-6'>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className='text-center max-w-3xl mx-auto'>
						<h1 className='text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-light-foreground dark:text-dark-foreground'>
							Reuniting People with Their Valuables
						</h1>
						<p className='mt-6 text-xl text-light-foreground/70 dark:text-dark-foreground/70'>
							We're on a mission to make the world a little better by helping people find what they've lost.
						</p>
					</motion.div>
				</div>
			</section>

			{/* Values Section */}
			<section className='py-16 md:py-24 bg-light-muted/50 dark:bg-dark-muted/50'>
				<div className='container mx-auto px-4 md:px-6'>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className='text-center mb-12'>
						<h2 className='text-3xl font-bold tracking-tighter sm:text-4xl text-light-foreground dark:text-dark-foreground'>
							Our Values
						</h2>
					</motion.div>

					<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
						{values.map((value, index) => (
							<motion.div
								key={value.title}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: index * 0.2 }}
								className='text-center'>
								<div className='mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6'>
									<value.icon className='w-8 h-8 text-primary' />
								</div>
								<h3 className='text-xl font-semibold mb-4 text-light-foreground dark:text-dark-foreground'>
									{value.title}
								</h3>
								<p className='text-light-foreground/70 dark:text-dark-foreground/70'>{value.description}</p>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Team Section */}
			<section className='py-16 md:py-24 bg-light-background dark:bg-dark-background'>
				<div className='container mx-auto px-4 md:px-6'>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className='text-center mb-12'>
						<h2 className='text-3xl font-bold tracking-tighter sm:text-4xl text-light-foreground dark:text-dark-foreground'>
							Meet Our Team
						</h2>
					</motion.div>

					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
						{team.map((member, index) => (
							<motion.div
								key={member.name}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: index * 0.2 }}
								className='group'>
								<div className='relative overflow-hidden rounded-lg aspect-square mb-4'>
									<img
										src={member.image || '/placeholder.svg'}
										alt={member.name}
										className='object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300'
									/>
								</div>
								<h3 className='text-xl font-semibold text-light-foreground dark:text-dark-foreground'>{member.name}</h3>
								<p className='text-primary font-medium mb-2'>{member.role}</p>
								<p className='text-light-foreground/70 dark:text-dark-foreground/70'>{member.bio}</p>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Timeline Section */}
			<section className='py-16 md:py-24 bg-light-muted/50 dark:bg-dark-muted/50'>
				<div className='container mx-auto px-4 md:px-6'>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className='text-center mb-12'>
						<h2 className='text-3xl font-bold tracking-tighter sm:text-4xl text-light-foreground dark:text-dark-foreground'>
							Our Journey
						</h2>
					</motion.div>

					<div className='relative'>
						<div className='absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-light-border dark:bg-dark-border' />

						<div className='space-y-12'>
							{timeline.map((item, index) => (
								<motion.div
									key={item.year}
									initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
									whileInView={{ opacity: 1, x: 0 }}
									viewport={{ once: true }}
									transition={{ delay: index * 0.2 }}
									className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
									<div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
										<div className='bg-light-card dark:bg-dark-card p-6 rounded-lg shadow-lg'>
											<div className='text-primary font-bold text-xl mb-2'>{item.year}</div>
											<h3 className='text-lg font-semibold mb-2 text-light-foreground dark:text-dark-foreground'>
												{item.title}
											</h3>
											<p className='text-light-foreground/70 dark:text-dark-foreground/70'>{item.description}</p>
										</div>
									</div>
								</motion.div>
							))}
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
