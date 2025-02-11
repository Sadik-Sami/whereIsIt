import { motion } from 'framer-motion';
import { Search, Shield, Clock, MapPin, Users, Award } from 'lucide-react';

const features = [
	{
		icon: Search,
		title: 'Smart Search',
		description: 'Advanced search algorithms to help you find lost items quickly and efficiently.',
	},
	{
		icon: Shield,
		title: 'Secure Platform',
		description: 'Your data is protected with enterprise-grade security and encryption.',
	},
	{
		icon: Clock,
		title: 'Real-time Updates',
		description: 'Get instant notifications when your item is found or matched.',
	},
	{
		icon: MapPin,
		title: 'Location Tracking',
		description: 'Track where items were lost and found with precise location data.',
	},
	{
		icon: Users,
		title: 'Community Driven',
		description: 'Join a helpful community dedicated to reuniting lost items with their owners.',
	},
	{
		icon: Award,
		title: 'Verified Returns',
		description: 'Secure and verified item return process with tracking.',
	},
];

export default function Features() {
	return (
		<section className='py-16 md:py-24 bg-light-background dark:bg-dark-background'>
			<div className='container mx-auto px-4 md:px-6'>
				<div className='text-center mb-12'>
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-light-foreground dark:text-dark-foreground'>
						Why Choose WhereIsIt?
					</motion.h2>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.2 }}
						className='mt-4 text-light-foreground/70 dark:text-dark-foreground/70 md:text-lg'>
						Discover the features that make our platform the best choice for lost and found items
					</motion.p>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
					{features.map((feature, index) => (
						<motion.div
							key={feature.title}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.1 }}
							className='relative group'>
							<div className='bg-light-card dark:bg-dark-card p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow h-full flex flex-col'>
								<div className='flex-1 flex flex-col'>
									<div className='flex items-center space-x-4 mb-4'>
										<div className='p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors flex-shrink-0'>
											<feature.icon className='w-6 h-6 text-primary' />
										</div>
										<h3 className='text-xl font-semibold text-light-foreground dark:text-dark-foreground'>
											{feature.title}
										</h3>
									</div>
									<p className='text-light-foreground/70 dark:text-dark-foreground/70 min-h-[3rem]'>
										{feature.description}
									</p>
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
