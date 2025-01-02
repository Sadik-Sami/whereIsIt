import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Phone, Mail, Search, AlertCircle, CheckCircle, ArrowRight, Loader2 } from 'lucide-react';

export default function ItemsGrid() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/posts');
        setPosts(response.data.posts.slice(0, 6)); // Only take first 6 posts
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch posts');
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Format date to readable string
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

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-[400px]'>
        <Loader2 className='w-8 h-8 animate-spin text-primary' />
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex items-center justify-center min-h-[400px] text-red-500'>
        <AlertCircle className='w-6 h-6 mr-2' />
        {error}
      </div>
    );
  }

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
      <div className='flex justify-between items-center mb-8'>
        <h2 className='text-2xl font-bold text-light-foreground dark:text-dark-foreground'>
          Recent Lost & Found Items
        </h2>
      </div>

      <motion.div
        variants={container}
        initial='hidden'
        animate='show'
        className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {posts.map((post) => (
          <motion.div
            key={post._id}
            variants={item}
            className='bg-light-card dark:bg-dark-card rounded-lg shadow-lg overflow-hidden flex flex-col h-full border border-light-border dark:border-dark-border hover:shadow-xl transition-shadow duration-300'>
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
      </motion.div>

      {/* See More Button */}
      <div className='flex justify-center mt-12'>
        <Link
          to='/lost-found'
          className='inline-flex items-center justify-center px-6 py-3 bg-secondary hover:bg-secondary-dark text-white rounded-md transition-colors text-lg font-medium group'>
          See All Items
          <ArrowRight className='w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform' />
        </Link>
      </div>
    </div>
  );
}
