import { motion } from 'framer-motion';
import { Users, CheckCircle, Clock, Shield } from 'lucide-react';

export default function Stats() {
  const stats = [
    {
      icon: Users,
      value: '5,000+',
      label: 'Active Users',
      description: 'Trusted community members',
    },
    {
      icon: CheckCircle,
      value: '80%',
      label: 'Success Rate',
      description: 'Items successfully returned',
    },
    {
      icon: Clock,
      value: '2 Hours',
      label: 'Average Response',
      description: 'Quick community feedback',
    },
    {
      icon: Shield,
      value: '100%',
      label: 'Secure Platform',
      description: 'Verified user system',
    },
  ];

  return (
    <section className='py-16 bg-light-muted dark:bg-dark-muted'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className='bg-light-card dark:bg-dark-card p-6 rounded-lg shadow-lg text-center'>
              <stat.icon className='w-12 h-12 mx-auto mb-4 text-primary' />
              <h3 className='text-3xl font-bold text-light-foreground dark:text-dark-foreground mb-2'>{stat.value}</h3>
              <p className='text-lg font-semibold text-light-foreground dark:text-dark-foreground mb-2'>{stat.label}</p>
              <p className='text-light-foreground/70 dark:text-dark-foreground/70'>{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
