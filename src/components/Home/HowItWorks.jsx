import { motion } from 'framer-motion';
import { Search, Upload, Bell, HandshakeIcon } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: Upload,
      title: "Report Item",
      description: "Lost something? Found something? Create a detailed post with photos and location."
    },
    {
      icon: Search,
      title: "Search & Match",
      description: "Our system helps match lost items with found items in the same area."
    },
    {
      icon: Bell,
      title: "Get Notified",
      description: "Receive instant notifications when potential matches are found."
    },
    {
      icon: HandshakeIcon,
      title: "Connect & Recover",
      description: "Securely connect with the finder/owner and arrange for item recovery."
    }
  ];

  return (
    <section className="py-20 bg-light-background dark:bg-dark-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-light-foreground dark:text-dark-foreground mb-4">
            How WhereIsIt Works
          </h2>
          <p className="text-xl text-light-foreground/70 dark:text-dark-foreground/70 max-w-2xl mx-auto">
            Follow these simple steps to recover your lost items or help others find theirs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              <div className="bg-light-card dark:bg-dark-card p-6 rounded-lg shadow-lg text-center h-full">
                <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-6">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-light-foreground dark:text-dark-foreground mb-4">
                  {step.title}
                </h3>
                <p className="text-light-foreground/70 dark:text-dark-foreground/70">
                  {step.description}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                  <div className="w-8 h-0.5 bg-primary"></div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

