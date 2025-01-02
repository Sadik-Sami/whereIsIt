import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Loader2,
  AlertCircle,
  ArrowRight,
  X,
  SlidersHorizontal,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LostAndFound() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    type: 'all',
    category: 'all',
    searchQuery: '',
  });
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['all', 'electronics', 'documents', 'pets', 'accessories', 'jewelry', 'wallets', 'keys', 'others'];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/posts');
        setPosts(response.data.posts);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch posts');
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = posts.filter((post) => {
    const matchesType = filters.type === 'all' || post.postType.toLowerCase() === filters.type;
    const matchesCategory = filters.category === 'all' || post.category.toLowerCase() === filters.category;
    const matchesSearch =
      post.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      post.location.toLowerCase().includes(filters.searchQuery.toLowerCase());

    return matchesType && matchesCategory && matchesSearch;
  });

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-light-background dark:bg-dark-background'>
        <Loader2 className='w-8 h-8 animate-spin text-primary' />
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-light-background dark:bg-dark-background text-red-500'>
        <AlertCircle className='w-6 h-6 mr-2' />
        {error}
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-light-background dark:bg-dark-background'>
      {/* Header */}
      <div className='bg-light-card dark:bg-dark-card border-b border-light-border dark:border-dark-border'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
            <div>
              <h1 className='text-2xl font-bold text-light-foreground dark:text-dark-foreground'>Lost & Found Items</h1>
              <p className='text-light-foreground/70 dark:text-dark-foreground/70 mt-1'>
                {filteredPosts.length} items found
              </p>
            </div>

            {/* Search and Filter Controls */}
            <div className='flex flex-col sm:flex-row gap-4'>
              <div className='relative'>
                <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-light-foreground/50 dark:text-dark-foreground/50' />
                <input
                  type='text'
                  placeholder='Search items...'
                  value={filters.searchQuery}
                  onChange={(e) => setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))}
                  className='pl-10 pr-4 py-2 w-full sm:w-64 rounded-lg border border-light-border dark:border-dark-border bg-light-background dark:bg-dark-background text-light-foreground dark:text-dark-foreground placeholder-light-foreground/50 dark:placeholder-dark-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary'
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className='inline-flex items-center px-4 py-2 rounded-lg border border-light-border dark:border-dark-border hover:bg-light-muted dark:hover:bg-dark-muted transition-colors'>
                <SlidersHorizontal className='w-5 h-5 mr-2' />
                Filters
              </button>
            </div>
          </div>

          {/* Filters Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className='overflow-hidden'>
                <div className='mt-6 p-4 border border-light-border dark:border-dark-border rounded-lg'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                      <label className='block text-sm font-medium text-light-foreground dark:text-dark-foreground mb-2'>
                        Type
                      </label>
                      <div className='flex gap-2'>
                        {['all', 'lost', 'found'].map((type) => (
                          <button
                            key={type}
                            onClick={() => setFilters((prev) => ({ ...prev, type }))}
                            className={`px-4 py-2 rounded-lg capitalize ${
                              filters.type === type
                                ? 'bg-primary text-white'
                                : 'bg-light-muted dark:bg-dark-muted text-light-foreground dark:text-dark-foreground hover:bg-light-border dark:hover:bg-dark-border'
                            } transition-colors`}>
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-light-foreground dark:text-dark-foreground mb-2'>
                        Category
                      </label>
                      <select
                        value={filters.category}
                        onChange={(e) => setFilters((prev) => ({ ...prev, category: e.target.value }))}
                        className='w-full px-4 py-2 rounded-lg border border-light-border dark:border-dark-border bg-light-background dark:bg-dark-background text-light-foreground dark:text-dark-foreground focus:outline-none focus:ring-2 focus:ring-primary capitalize'>
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Items Grid */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filteredPosts.map((post) => (
            <motion.div
              key={post._id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className='bg-light-card dark:bg-dark-card rounded-lg shadow-lg overflow-hidden flex flex-col border border-light-border dark:border-dark-border hover:shadow-xl transition-shadow duration-300'>
              {/* Image Container */}
              <div className='relative h-48 overflow-hidden group'>
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
                />
                <div
                  className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${
                    post.postType === 'Lost' ? 'bg-red-500/90 text-white' : 'bg-green-500/90 text-white'
                  }`}>
                  {post.postType}
                </div>
              </div>

              {/* Content Container */}
              <div className='p-6 flex-grow flex flex-col'>
                <div className='flex-grow'>
                  <h3 className='text-xl font-semibold text-light-foreground dark:text-dark-foreground mb-2'>
                    {post.title}
                  </h3>
                  <p className='text-light-foreground/80 dark:text-dark-foreground/80 mb-4 line-clamp-2'>
                    {post.description}
                  </p>

                  {/* Meta Information */}
                  <div className='space-y-2 mb-4'>
                    <div className='flex items-center text-sm text-light-foreground/70 dark:text-dark-foreground/70'>
                      <Calendar className='w-4 h-4 mr-2 flex-shrink-0' />
                      {formatDate(post.date)}
                    </div>
                    <div className='flex items-center text-sm text-light-foreground/70 dark:text-dark-foreground/70'>
                      <MapPin className='w-4 h-4 mr-2 flex-shrink-0' />
                      {post.location}
                    </div>
                    <div className='flex items-center text-sm text-light-foreground/70 dark:text-dark-foreground/70'>
                      <Mail className='w-4 h-4 mr-2 flex-shrink-0' />
                      {post.email}
                    </div>
                  </div>

                  {/* Category Tag */}
                  <div className='inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-light-muted dark:bg-dark-muted text-light-foreground dark:text-dark-foreground'>
                    {post.category}
                  </div>
                </div>

                {/* Action Button */}
                <Link
                  to={`/post-details/${post._id}`}
                  className='inline-flex items-center justify-center px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-md transition-colors mt-4 w-full group'>
                  View Details
                  <ArrowRight className='w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform' />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className='text-center py-12'>
            <AlertCircle className='w-12 h-12 mx-auto text-primary mb-4' />
            <h3 className='text-xl font-semibold text-light-foreground dark:text-dark-foreground mb-2'>
              No items found
            </h3>
            <p className='text-light-foreground/70 dark:text-dark-foreground/70'>
              Try adjusting your filters or search query
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
