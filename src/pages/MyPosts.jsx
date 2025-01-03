import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { Pencil, Trash2, AlertCircle, Loader2, Search, Plus, X } from 'lucide-react';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAuthContext from '../hooks/useAuthContext';

export default function MyPosts() {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const axiosSecure = useAxiosSecure();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, [user?.email, axiosSecure]);

  const fetchPosts = async () => {
    try {
      const response = await axiosSecure.get(`/my-posts?email=${user?.email}`);
      setPosts(response.data.posts);
      setError(null);
    } catch (error) {
      setError('Failed to fetch your posts');
      toast.error('Could not load your posts');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setDeleting(true);
    try {
      const response = await axiosSecure.delete(`/posts/${id}?email=${user?.email}`);

      if (response.data.success) {
        setPosts(posts.filter((post) => post._id !== id));
        toast.success('Post deleted successfully');
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete post');
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  };

  if (loading) {
    return (
      <div className='min-h-screen bg-light-background dark:bg-dark-background flex items-center justify-center'>
        <div className='text-center'>
          <Loader2 className='w-8 h-8 animate-spin text-primary mx-auto mb-4' />
          <p className='text-light-foreground/70 dark:text-dark-foreground/70'>Loading your posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen bg-light-background dark:bg-dark-background flex items-center justify-center'>
        <div className='text-center'>
          <AlertCircle className='w-12 h-12 text-red-500 mx-auto mb-4' />
          <p className='text-light-foreground/70 dark:text-dark-foreground/70 mb-4'>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-light-background dark:bg-dark-background py-12'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='bg-light-card dark:bg-dark-card rounded-lg shadow-xl overflow-hidden'>
          {/* Header */}
          <div className='p-6 border-b border-light-border dark:border-dark-border'>
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
              <div className='flex items-center'>
                <Search className='h-6 w-6 text-primary mr-2' />
                <h1 className='text-2xl font-bold text-light-foreground dark:text-dark-foreground'>My Posts</h1>
              </div>
              <Link
                to='/add-post'
                className='inline-flex items-center px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors'>
                <Plus className='w-5 h-5 mr-2' />
                Add New Post
              </Link>
            </div>
          </div>

          {posts.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='p-12 text-center'>
              <div className='max-w-sm mx-auto'>
                <Search className='w-12 h-12 text-primary mx-auto mb-4' />
                <h3 className='text-xl font-semibold text-light-foreground dark:text-dark-foreground mb-2'>
                  No Posts Yet
                </h3>
                <p className='text-light-foreground/70 dark:text-dark-foreground/70 mb-6'>
                  You haven't created any lost or found posts yet. Start by adding your first post!
                </p>
                <Link
                  to='/add-post'
                  className='inline-flex items-center px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors'>
                  <Plus className='w-5 h-5 mr-2' />
                  Create Your First Post
                </Link>
              </div>
            </motion.div>
          ) : (
            <div className='overflow-x-auto'>
              <table className='w-full'>
                <thead className='bg-light-muted dark:bg-dark-muted'>
                  <tr>
                    <th className='px-6 py-3 text-left text-sm font-medium text-light-foreground dark:text-dark-foreground'>
                      Image
                    </th>
                    <th className='px-6 py-3 text-left text-sm font-medium text-light-foreground dark:text-dark-foreground'>
                      Title
                    </th>
                    <th className='px-6 py-3 text-left text-sm font-medium text-light-foreground dark:text-dark-foreground'>
                      Type
                    </th>
                    <th className='px-6 py-3 text-left text-sm font-medium text-light-foreground dark:text-dark-foreground'>
                      Location
                    </th>
                    <th className='px-6 py-3 text-right text-sm font-medium text-light-foreground dark:text-dark-foreground'>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-light-border dark:divide-dark-border'>
                  {posts.map((post) => (
                    <motion.tr
                      key={post._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className='hover:bg-light-muted/50 dark:hover:bg-dark-muted/50 transition-colors'>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='w-16 h-16 rounded-lg overflow-hidden bg-light-muted dark:bg-dark-muted'>
                          <img
                            src={post.thumbnail}
                            alt={post.title}
                            className='w-full h-full object-cover'
                            onError={(e) => {
                              e.target.src = '/placeholder.svg?height=64&width=64';
                            }}
                          />
                        </div>
                      </td>
                      <td className='px-6 py-4'>
                        <div className='text-sm font-medium text-light-foreground dark:text-dark-foreground'>
                          {post.title}
                        </div>
                        <div className='text-sm text-light-foreground/70 dark:text-dark-foreground/70'>
                          {new Date(post.date).toLocaleDateString()}
                        </div>
                      </td>
                      <td className='px-6 py-4'>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            post.postType === 'Lost'
                              ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                              : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          }`}>
                          {post.postType}
                        </span>
                      </td>
                      <td className='px-6 py-4 text-sm text-light-foreground dark:text-dark-foreground'>
                        {post.location}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                        <div className='flex items-center justify-end gap-2'>
                          <button
                            onClick={() => navigate(`/update-item/${post._id}`)}
                            className='p-2 text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 transition-colors'
                            title='Edit post'>
                            <Pencil className='w-5 h-5' />
                          </button>
                          <button
                            onClick={() => setDeleteId(post._id)}
                            className='p-2 text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 transition-colors'
                            title='Delete post'>
                            <Trash2 className='w-5 h-5' />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Delete Modal */}
      <AnimatePresence>
        {deleteId && (
          <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className='bg-light-card dark:bg-dark-card rounded-lg shadow-xl p-6 m-4 max-w-sm w-full'>
              <div className='flex justify-between items-center mb-6'>
                <h2 className='text-xl font-semibold text-light-foreground dark:text-dark-foreground'>
                  Confirm Delete
                </h2>
                <button
                  onClick={() => setDeleteId(null)}
                  className='text-light-foreground/70 dark:text-dark-foreground/70 hover:text-primary'>
                  <X className='w-6 h-6' />
                </button>
              </div>

              <p className='text-light-foreground/70 dark:text-dark-foreground/70 mb-6'>
                Are you sure you want to delete this post? This action cannot be undone.
              </p>

              <div className='flex justify-end gap-4'>
                <button
                  onClick={() => setDeleteId(null)}
                  className='px-4 py-2 text-light-foreground/70 dark:text-dark-foreground/70 hover:text-primary'
                  disabled={deleting}>
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteId)}
                  disabled={deleting}
                  className='px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center disabled:opacity-50'>
                  {deleting ? (
                    <>
                      <Loader2 className='w-5 h-5 animate-spin mr-2' />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className='w-5 h-5 mr-2' />
                      Delete
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
