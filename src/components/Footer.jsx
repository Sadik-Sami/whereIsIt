import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Search } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-light-card dark:bg-dark-card border-t border-light-border dark:border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Search className="h-6 w-6 text-primary" />
              <span className="text-2xl font-bold text-light-foreground dark:text-dark-foreground">
                WhereIsIt
              </span>
            </Link>
            <p className="text-light-foreground/70 dark:text-dark-foreground/70 mb-6">
              Helping people find their lost items and connect with their community.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-light-foreground/70 dark:text-dark-foreground/70 hover:text-primary transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-light-foreground/70 dark:text-dark-foreground/70 hover:text-primary transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-light-foreground/70 dark:text-dark-foreground/70 hover:text-primary transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-light-foreground dark:text-dark-foreground mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/lost-found" className="text-light-foreground/70 dark:text-dark-foreground/70 hover:text-primary transition-colors">
                  Lost & Found Items
                </Link>
              </li>
              <li>
                <Link to="/report/lost" className="text-light-foreground/70 dark:text-dark-foreground/70 hover:text-primary transition-colors">
                  Report Lost Item
                </Link>
              </li>
              <li>
                <Link to="/report/found" className="text-light-foreground/70 dark:text-dark-foreground/70 hover:text-primary transition-colors">
                  Report Found Item
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-light-foreground/70 dark:text-dark-foreground/70 hover:text-primary transition-colors">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold text-light-foreground dark:text-dark-foreground mb-4">
              Categories
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/category/electronics" className="text-light-foreground/70 dark:text-dark-foreground/70 hover:text-primary transition-colors">
                  Electronics
                </Link>
              </li>
              <li>
                <Link to="/category/documents" className="text-light-foreground/70 dark:text-dark-foreground/70 hover:text-primary transition-colors">
                  Documents
                </Link>
              </li>
              <li>
                <Link to="/category/pets" className="text-light-foreground/70 dark:text-dark-foreground/70 hover:text-primary transition-colors">
                  Pets
                </Link>
              </li>
              <li>
                <Link to="/category/accessories" className="text-light-foreground/70 dark:text-dark-foreground/70 hover:text-primary transition-colors">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-light-foreground dark:text-dark-foreground mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center text-light-foreground/70 dark:text-dark-foreground/70">
                <MapPin className="h-5 w-5 mr-2" />
                123 Lost & Found Street, Dhaka 1200
              </li>
              <li className="flex items-center text-light-foreground/70 dark:text-dark-foreground/70">
                <Phone className="h-5 w-5 mr-2" />
                +880 1234-567890
              </li>
              <li className="flex items-center text-light-foreground/70 dark:text-dark-foreground/70">
                <Mail className="h-5 w-5 mr-2" />
                support@whereisit.com
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-light-border dark:border-dark-border text-center text-light-foreground/70 dark:text-dark-foreground/70">
          <p>© {currentYear} WhereIsIt. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

