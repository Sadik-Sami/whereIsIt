import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import {
  CheckCircle,
  Loader2,
  AlertCircle,
  Calendar,
  MapPin,
  LayoutGrid,
  LayoutList,
  User,
  Search,
} from 'lucide-react';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAuthContext from '../hooks/useAuthContext';
import SEO from '../components/SEO';

export default function RecoveredItems() {
  const { user } = useAuthContext();
  const axiosSecure = useAxiosSecure();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isGridView, setIsGridView] = useState(true);

  useEffect(() => {
    fetchRecoveredItems();
  }, [user?.email, axiosSecure]);

  const fetchRecoveredItems = async () => {
    try {
      const response = await axiosSecure.get(`/recovered-items?email=${user?.email}`);
      setItems(response.data.items);
      setError(null);
    } catch (error) {
      setError('Failed to fetch recovered items');
      toast.error('Could not load recovered items');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className='min-h-screen bg-light-background dark:bg-dark-background flex items-center justify-center'>
        <SEO title='Loading...' description='Loading recovered items' />
        <div className='text-center'>
          <Loader2 className='w-8 h-8 animate-spin text-primary mx-auto mb-4' />
          <p className='text-light-foreground/70 dark:text-dark-foreground/70'>Loading recovered items...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen bg-light-background dark:bg-dark-background flex items-center justify-center'>
        <SEO title='Error' description='Failed to load recovered items' />
        <div className='text-center'>
          <AlertCircle className='w-12 h-12 text-red-500 mx-auto mb-4' />
          <p className='text-light-foreground/70 dark:text-dark-foreground/70 mb-4'>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-light-background dark:bg-dark-background py-12'>
      <SEO title="Recovered Items"/>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='bg-light-card dark:bg-dark-card rounded-lg shadow-xl overflow-hidden'>
          <div className='p-6 border-b border-light-border dark:border-dark-border'>
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
              <div className='flex items-center'>
                <CheckCircle className='h-6 w-6 text-primary mr-2' />
                <h1 className='text-2xl font-bold text-light-foreground dark:text-dark-foreground'>Recovered Items</h1>
              </div>
              <button
                onClick={() => setIsGridView(!isGridView)}
                className='inline-flex items-center px-4 py-2 bg-light-muted dark:bg-dark-muted hover:bg-light-border dark:hover:bg-dark-border text-light-foreground dark:text-dark-foreground rounded-lg transition-colors'>
                {isGridView ? (
                  <>
                    <LayoutList className='w-5 h-5 mr-2' />
                    Switch to Table View
                  </>
                ) : (
                  <>
                    <LayoutGrid className='w-5 h-5 mr-2' />
                    Switch to Grid View
                  </>
                )}
              </button>
            </div>
          </div>

          {items.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='p-12 text-center'>
              <div className='max-w-sm mx-auto'>
                <CheckCircle className='w-12 h-12 text-primary mx-auto mb-4' />
                <h3 className='text-xl font-semibold text-light-foreground dark:text-dark-foreground mb-2'>
                  No Recovered Items Yet
                </h3>
                <p className='text-light-foreground/70 dark:text-dark-foreground/70'>
                  When items are marked as recovered, they will appear here.
                </p>
              </div>
            </motion.div>
          ) : (
            <AnimatePresence mode='wait'>
              {isGridView ? (
                // Grid View
                <motion.div
                  key='grid'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className='p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                  {items.map((item) => (
                    <motion.div
                      key={item._id}
                      layout
                      className='bg-light-muted dark:bg-dark-muted rounded-lg overflow-hidden shadow-md'>
                      <div className='relative h-48'>
                        <img
                          src={item.originalPost.thumbnail}
                          alt={item.originalPost.title}
                          className='w-full h-full object-cover'
                          onError={(e) => {
                            e.target.src = '/placeholder.svg?height=192&width=384';
                          }}
                        />
                        <div className='absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium bg-green-500/90 text-white'>
                          Recovered
                        </div>
                      </div>
                      <div className='p-4'>
                        <h3 className='text-lg font-semibold text-light-foreground dark:text-dark-foreground mb-2'>
                          {item.originalPost.title}
                        </h3>
                        <div className='space-y-2 text-sm text-light-foreground/70 dark:text-dark-foreground/70'>
                          <div className='flex items-center'>
                            <Calendar className='w-4 h-4 mr-2' />
                            Recovered on {formatDate(item.recoveryDate)}
                          </div>
                          <div className='flex items-center'>
                            <MapPin className='w-4 h-4 mr-2' />
                            {item.recoveredLocation}
                          </div>
                          <div className='flex items-center'>
                            <User className='w-4 h-4 mr-2' />
                            Recovered by {item.recoveredBy.name}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                // Table View
                <motion.div
                  key='table'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className='overflow-x-auto'>
                  <table className='w-full'>
                    <thead className='bg-light-muted dark:bg-dark-muted'>
                      <tr>
                        <th className='px-6 py-3 text-left text-sm font-medium text-light-foreground dark:text-dark-foreground'>
                          Item
                        </th>
                        <th className='px-6 py-3 text-left text-sm font-medium text-light-foreground dark:text-dark-foreground'>
                          Recovery Details
                        </th>
                        <th className='px-6 py-3 text-left text-sm font-medium text-light-foreground dark:text-dark-foreground'>
                          Location
                        </th>
                        <th className='px-6 py-3 text-left text-sm font-medium text-light-foreground dark:text-dark-foreground'>
                          Recovered By
                        </th>
                      </tr>
                    </thead>
                    <tbody className='divide-y divide-light-border dark:divide-dark-border'>
                      {items.map((item) => (
                        <motion.tr
                          key={item._id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className='hover:bg-light-muted/50 dark:hover:bg-dark-muted/50 transition-colors'>
                          <td className='px-6 py-4'>
                            <div className='flex items-center'>
                              <div className='w-16 h-16 rounded-lg overflow-hidden bg-light-muted dark:bg-dark-muted flex-shrink-0'>
                                <img
                                  src={item.originalPost.thumbnail}
                                  alt={item.originalPost.title}
                                  className='w-full h-full object-cover'
                                  onError={(e) => {
                                    e.target.src = '/placeholder.svg?height=64&width=64';
                                  }}
                                />
                              </div>
                              <div className='ml-4'>
                                <div className='text-sm font-medium text-light-foreground dark:text-dark-foreground'>
                                  {item.originalPost.title}
                                </div>
                                <div className='text-sm text-light-foreground/70 dark:text-dark-foreground/70'>
                                  {item.originalPost.category}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className='px-6 py-4'>
                            <div className='text-sm text-light-foreground dark:text-dark-foreground'>
                              {formatDate(item.recoveryDate)}
                            </div>
                            <div className='text-sm text-light-foreground/70 dark:text-dark-foreground/70'>
                              {item.originalPost.postType} Item
                            </div>
                          </td>
                          <td className='px-6 py-4'>
                            <div className='text-sm text-light-foreground dark:text-dark-foreground'>
                              {item.recoveredLocation}
                            </div>
                          </td>
                          <td className='px-6 py-4'>
                            <div className='flex items-center'>
                              {item.recoveredBy.image ? (
                                <img
                                  src={item.recoveredBy.image}
                                  alt={item.recoveredBy.name}
                                  className='w-8 h-8 rounded-full'
                                />
                              ) : (
                                <div className='w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center'>
                                  <User className='w-4 h-4' />
                                </div>
                              )}
                              <div className='ml-3'>
                                <div className='text-sm font-medium text-light-foreground dark:text-dark-foreground'>
                                  {item.recoveredBy.name}
                                </div>
                                <div className='text-sm text-light-foreground/70 dark:text-dark-foreground/70'>
                                  {item.recoveredBy.email}
                                </div>
                              </div>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
}
