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
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import {toast} from 'react-toastify';

export default function LostAndFound() {
  const [allPosts, setAllPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    type: 'all',
    category: 'all',
    searchQuery: '',
  });
  const [showFilters, setShowFilters] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 6,
    total: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });
  const itemsPerPageOptions = [6, 7, 8, 9];

  const categories = ['all', 'electronics', 'documents', 'pets', 'accessories', 'jewelry', 'wallets', 'keys', 'others'];

  useEffect(() => {
    fetchPosts();
  }, [pagination.page, pagination.limit]);
  useEffect(() => {
    applyFilters();
  }, [filters, allPosts]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://whereisit-tau.vercel.app/posts', {
        params: {
          page: pagination.page,
          limit: pagination.limit,
        },
      });

      setAllPosts(response.data.posts);
      setPagination((prev) => ({
        ...prev,
        ...response.data.pagination,
      }));
      setError(null);
    } catch (err) {
      setError('Failed to fetch posts');
      toast.error('Could not load posts');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...allPosts];
    if (filters.type !== 'all') {
      filtered = filtered.filter((post) => post.postType.toLowerCase() === filters.type);
    }
    if (filters.category !== 'all') {
      filtered = filtered.filter((post) => post.category.toLowerCase() === filters.category.toLowerCase());
    }
    if (filters.searchQuery) {
      const searchLower = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchLower) ||
          post.description.toLowerCase().includes(searchLower) ||
          post.location.toLowerCase().includes(searchLower)
      );
    }

    setFilteredPosts(filtered);
  };

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({
      ...prev,
      page: newPage,
    }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLimitChange = (newLimit) => {
    setPagination((prev) => ({
      ...prev,
      limit: parseInt(newLimit),
      page: 1,
    }));
  };

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

  if (loading && !allPosts.length) {
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
      <SEO
        title='Lost & Found Items'
        description='Browse and search for lost and found items in your area. Help others recover their belongings or find your lost items.'
      />
      <div className='bg-light-card dark:bg-dark-card border-b border-light-border dark:border-dark-border'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
            <div>
              <h1 className='text-2xl font-bold text-light-foreground dark:text-dark-foreground'>Lost & Found Items</h1>
              <p className='text-light-foreground/70 dark:text-dark-foreground/70 mt-1'>
                {filteredPosts.length} items found
              </p>
            </div>
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
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='flex flex-col sm:flex-row justify-between items-center mb-6'>
          <div className='text-light-foreground/70 dark:text-dark-foreground/70 mb-4 sm:mb-0'>
            Showing {filteredPosts.length} of {pagination.total} items
          </div>
          <div className='flex items-center gap-4'>
            <label className='text-light-foreground/70 dark:text-dark-foreground/70'>Items per page:</label>
            <select
              value={pagination.limit}
              onChange={(e) => handleLimitChange(e.target.value)}
              className='px-2 py-1 rounded-lg border border-light-border dark:border-dark-border bg-light-background dark:bg-dark-background text-light-foreground dark:text-dark-foreground focus:outline-none focus:ring-2 focus:ring-primary'>
              {itemsPerPageOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {loading
            ? [...Array(pagination.limit)].map((_, index) => (
                <div
                  key={index}
                  className='bg-light-card dark:bg-dark-card rounded-lg shadow-lg overflow-hidden animate-pulse'>
                  <div className='h-48 bg-light-muted dark:bg-dark-muted' />
                  <div className='p-6 space-y-4'>
                    <div className='h-6 bg-light-muted dark:bg-dark-muted rounded w-3/4' />
                    <div className='h-4 bg-light-muted dark:bg-dark-muted rounded w-1/2' />
                    <div className='space-y-2'>
                      <div className='h-4 bg-light-muted dark:bg-dark-muted rounded w-full' />
                      <div className='h-4 bg-light-muted dark:bg-dark-muted rounded w-2/3' />
                    </div>
                  </div>
                </div>
              ))
            : filteredPosts.map((post) => (
                <motion.div
                  key={post._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className='bg-light-card dark:bg-dark-card rounded-lg shadow-lg overflow-hidden flex flex-col border border-light-border dark:border-dark-border hover:shadow-xl transition-shadow duration-300'>
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
                  <div className='p-6 flex-grow flex flex-col'>
                    <div className='flex-grow'>
                      <h3 className='text-xl font-semibold text-light-foreground dark:text-dark-foreground mb-2'>
                        {post.title}
                      </h3>
                      <p className='text-light-foreground/80 dark:text-dark-foreground/80 mb-4 line-clamp-2'>
                        {post.description}
                      </p>
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
                      <div className='inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-light-muted dark:bg-dark-muted text-light-foreground dark:text-dark-foreground'>
                        {post.category}
                      </div>
                    </div>
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

        {/* Pagination Controls */}
        {pagination.totalPages > 1 && (
          <div className='mt-8 flex justify-center items-center gap-2'>
            <button
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={!pagination.hasPrevPage}
              className='p-2 rounded-lg border border-light-border dark:border-dark-border text-light-foreground dark:text-dark-foreground hover:bg-light-muted dark:hover:bg-dark-muted disabled:opacity-50 disabled:cursor-not-allowed'>
              <ChevronLeft className='w-5 h-5' />
            </button>

            {[...Array(pagination.totalPages)].map((_, index) => {
              const pageNumber = index + 1;
              if (
                pageNumber === 1 ||
                pageNumber === pagination.totalPages ||
                Math.abs(pageNumber - pagination.page) <= 1
              ) {
                return (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`min-w-[40px] h-10 rounded-lg border ${
                      pagination.page === pageNumber
                        ? 'bg-primary text-white border-primary'
                        : 'border-light-border dark:border-dark-border text-light-foreground dark:text-dark-foreground hover:bg-light-muted dark:hover:bg-dark-muted'
                    }`}>
                    {pageNumber}
                  </button>
                );
              } else if (pageNumber === 2 || pageNumber === pagination.totalPages - 1) {
                return (
                  <span key={pageNumber} className='text-light-foreground/70 dark:text-dark-foreground/70'>
                    ...
                  </span>
                );
              }
              return null;
            })}

            <button
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={!pagination.hasNextPage}
              className='p-2 rounded-lg border border-light-border dark:border-dark-border text-light-foreground dark:text-dark-foreground hover:bg-light-muted dark:hover:bg-dark-muted disabled:opacity-50 disabled:cursor-not-allowed'>
              <ChevronRight className='w-5 h-5' />
            </button>
          </div>
        )}
        {filteredPosts.length === 0 && !loading && (
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
