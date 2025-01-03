import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import DatePicker from 'react-datepicker';
import { toast } from 'react-toastify';
import {
  Calendar,
  MapPin,
  Mail,
  User,
  Clock,
  Tag,
  CheckCircle,
  XCircle,
  Loader2,
  AlertCircle,
  ArrowLeft,
  HandshakeIcon,
} from 'lucide-react';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAuthContext from '../hooks/useAuthContext';
import ScrollToTop from '../components/ScrollToTop';
import SEO from '../components/SEO';

const PostDetails = () => {
  const { id } = useParams();
  const { user } = useAuthContext();
  const axiosSecure = useAxiosSecure();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [recoveryData, setRecoveryData] = useState({
    recoveredLocation: '',
    recoveryDate: new Date(),
    recoveredBy: {
      name: user?.displayName || '',
      email: user?.email || '',
      image: user?.photoURL || '',
    },
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axiosSecure.get(`/post/${id}?email=${user?.email}`);
        setPost(response.data.post);
        setError(null);
      } catch (error) {
        setError('Failed to fetch post details');
        toast.error('Could not load post details');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, axiosSecure]);

  const handleRecoverySubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const recoveryPayload = {
        postId: id,
        ...recoveryData,
        originalPost: {
          title: post.title,
          postType: post.postType,
          category: post.category,
          thumbnail: post.thumbnail,
        },
      };

      await axiosSecure.post(`/recover-item?email=${user.email}`, recoveryPayload);
      toast.success('Item recovery recorded successfully!');
      setShowModal(false);
      setPost((prev) => ({ ...prev, status: 'recovered' }));
    } catch (error) {
      toast.error('Failed to record item recovery');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className='min-h-screen bg-light-background dark:bg-dark-background flex items-center justify-center'>
        <SEO title='Loading...' description='Loading post details' />
        <Loader2 className='w-8 h-8 animate-spin text-primary' />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className='min-h-screen bg-light-background dark:bg-dark-background flex items-center justify-center'>
        <SEO title='Post Not Found' description='The requested post could not be found' />
        <div className='text-center'>
          <AlertCircle className='w-12 h-12 text-red-500 mx-auto mb-4' />
          <p className='text-light-foreground/70 dark:text-dark-foreground/70 mb-4'>{error || 'Post not found'}</p>
          <Link to='/lost-found' className='text-primary hover:text-primary-dark'>
            <ArrowLeft className='w-4 h-4 inline-block mr-2' />
            Back to Lost & Found
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-light-background dark:bg-dark-background py-12'>
      <SEO title={post.title} description={post.description} type='article' image={post.thumbnail} />
      <ScrollToTop />
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Back Button */}
        <Link
          to='/lost-found'
          className='inline-flex items-center text-light-foreground/70 dark:text-dark-foreground/70 hover:text-primary mb-6'>
          <ArrowLeft className='w-4 h-4 mr-2' />
          Back to Lost & Found
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='bg-light-card dark:bg-dark-card rounded-lg shadow-xl overflow-hidden'>
          {/* Image Section */}
          <div className='relative h-[400px]'>
            <img src={post.thumbnail} alt={post.title} className='w-full h-full object-cover' />
            <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />
            <div className='absolute bottom-0 left-0 right-0 p-6 text-white'>
              <div className='mb-2'>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    post.postType === 'Lost' ? 'bg-red-500' : 'bg-green-500'
                  }`}>
                  {post.postType}
                </span>
                {post.status === 'recovered' && (
                  <span className='ml-2 inline-block px-3 py-1 rounded-full text-sm font-medium bg-primary'>
                    Recovered
                  </span>
                )}
              </div>
              <h1 className='text-3xl font-bold mb-2'>{post.title}</h1>
              <div className='flex items-center text-white/80'>
                <Calendar className='w-4 h-4 mr-2' />
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className='p-6 space-y-6'>
            {/* Description */}
            <div>
              <h2 className='text-xl font-semibold text-light-foreground dark:text-dark-foreground mb-3'>
                Description
              </h2>
              <p className='text-light-foreground/70 dark:text-dark-foreground/70'>{post.description}</p>
            </div>

            {/* Details Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='space-y-4'>
                <div className='flex items-center'>
                  <MapPin className='w-5 h-5 text-primary mr-3' />
                  <div>
                    <p className='text-sm text-light-foreground/70 dark:text-dark-foreground/70'>Location</p>
                    <p className='text-light-foreground dark:text-dark-foreground'>{post.location}</p>
                  </div>
                </div>
                <div className='flex items-center'>
                  <Tag className='w-5 h-5 text-primary mr-3' />
                  <div>
                    <p className='text-sm text-light-foreground/70 dark:text-dark-foreground/70'>Category</p>
                    <p className='text-light-foreground dark:text-dark-foreground capitalize'>{post.category}</p>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className='space-y-4'>
                <div className='flex items-center'>
                  <User className='w-5 h-5 text-primary mr-3' />
                  <div>
                    <p className='text-sm text-light-foreground/70 dark:text-dark-foreground/70'>Posted by</p>
                    <p className='text-light-foreground dark:text-dark-foreground'>{post.name}</p>
                  </div>
                </div>
                <div className='flex items-center'>
                  <Mail className='w-5 h-5 text-primary mr-3' />
                  <div>
                    <p className='text-sm text-light-foreground/70 dark:text-dark-foreground/70'>Contact Email</p>
                    <p className='text-light-foreground dark:text-dark-foreground'>{post.email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Button */}
            {!post.status && (
              <div className='flex justify-center pt-6'>
                <button
                  onClick={() => setShowModal(true)}
                  className='inline-flex items-center px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors'>
                  <HandshakeIcon className='w-5 h-5 mr-2' />
                  {post.postType === 'Lost' ? 'Found This!' : 'This is Mine!'}
                </button>
              </div>
            )}

            {post.status === 'recovered' && (
              <div className='flex items-center justify-center pt-6 text-green-500'>
                <CheckCircle className='w-5 h-5 mr-2' />
                Item has been claimed and recovered
              </div>
            )}
          </div>
        </motion.div>

        {/* Recovery Modal */}
        <AnimatePresence>
          {showModal && (
            <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className='bg-light-card dark:bg-dark-card rounded-lg shadow-xl p-6 m-4 max-w-md w-full'>
                <div className='flex justify-between items-center mb-6'>
                  <h2 className='text-xl font-semibold text-light-foreground dark:text-dark-foreground'>
                    Record Item Recovery
                  </h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className='text-light-foreground/70 dark:text-dark-foreground/70 hover:text-primary'>
                    <XCircle className='w-6 h-6' />
                  </button>
                </div>

                <form onSubmit={handleRecoverySubmit} className='space-y-6'>
                  <div>
                    <label className='block text-sm font-medium text-light-foreground dark:text-dark-foreground mb-2'>
                      <MapPin className='w-4 h-4 inline-block mr-2' />
                      Recovery Location
                    </label>
                    <input
                      type='text'
                      value={recoveryData.recoveredLocation}
                      onChange={(e) =>
                        setRecoveryData((prev) => ({
                          ...prev,
                          recoveredLocation: e.target.value,
                        }))
                      }
                      required
                      className='w-full px-4 py-2 rounded-lg border border-light-border dark:border-dark-border bg-light-background dark:bg-dark-background text-light-foreground dark:text-dark-foreground focus:outline-none focus:ring-2 focus:ring-primary'
                      placeholder='Enter recovery location'
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-light-foreground dark:text-dark-foreground mb-2'>
                      <Clock className='w-4 h-4 inline-block mr-2' />
                      Recovery Date
                    </label>
                    <DatePicker
                      selected={recoveryData.recoveryDate}
                      onChange={(date) =>
                        setRecoveryData((prev) => ({
                          ...prev,
                          recoveryDate: date,
                        }))
                      }
                      maxDate={new Date()}
                      className='w-full px-4 py-2 rounded-lg border border-light-border dark:border-dark-border bg-light-background dark:bg-dark-background text-light-foreground dark:text-dark-foreground focus:outline-none focus:ring-2 focus:ring-primary'
                    />
                  </div>

                  {/* Readonly User Information */}
                  <div className='space-y-4 bg-light-muted dark:bg-dark-muted p-4 rounded-lg'>
                    <h3 className='font-medium text-light-foreground dark:text-dark-foreground'>Your Information</h3>
                    <div className='flex items-center'>
                      {user?.photoURL && (
                        <img src={user.photoURL} alt={user.displayName} className='w-10 h-10 rounded-full mr-3' />
                      )}
                      <div>
                        <p className='text-light-foreground dark:text-dark-foreground'>{user?.displayName}</p>
                        <p className='text-sm text-light-foreground/70 dark:text-dark-foreground/70'>{user?.email}</p>
                      </div>
                    </div>
                  </div>

                  <div className='flex justify-end gap-4'>
                    <button
                      type='button'
                      onClick={() => setShowModal(false)}
                      className='px-4 py-2 text-light-foreground/70 dark:text-dark-foreground/70 hover:text-primary'>
                      Cancel
                    </button>
                    <button
                      type='submit'
                      disabled={submitting}
                      className='px-6 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors flex items-center disabled:opacity-50'>
                      {submitting ? (
                        <>
                          <Loader2 className='w-5 h-5 animate-spin mr-2' />
                          Processing...
                        </>
                      ) : (
                        <>
                          <CheckCircle className='w-5 h-5 mr-2' />
                          Confirm Recovery
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
export default PostDetails;
