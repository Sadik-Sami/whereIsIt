import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CTA() {
  return (
    <section className="py-20 bg-gradient-to-b from-light-muted to-light-background dark:from-dark-muted dark:to-dark-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-light-card dark:bg-dark-card rounded-2xl shadow-xl overflow-hidden">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/10 dark:bg-primary/5" />
            <div className="relative px-6 py-16 sm:px-12 lg:px-16">
              <div className="text-center max-w-3xl mx-auto">
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="text-3xl sm:text-4xl font-bold text-light-foreground dark:text-dark-foreground mb-6"
                >
                  Lost Something Important?
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-xl text-light-foreground/70 dark:text-dark-foreground/70 mb-8"
                >
                  Don't worry! Join our community and increase your chances of finding your lost items.
                  Our platform has helped thousands of people recover their belongings.
                </motion.p>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                  <Link
                    to="/report/lost"
                    className="inline-flex items-center justify-center px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-md transition-colors text-lg font-medium group"
                  >
                    Report Lost Item
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    to="/lost-found"
                    className="inline-flex items-center justify-center px-6 py-3 bg-secondary hover:bg-secondary-dark text-white rounded-md transition-colors text-lg font-medium group"
                  >
                    Browse Lost Items
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

