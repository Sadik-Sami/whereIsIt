import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  MapPin,
  ImageIcon,
  FileText,
  Tag,
  Send,
  Search,
  AlertCircle,
  Loader2,
  User,
  Mail,
  ArrowLeft,
} from 'lucide-react';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAuthContext from '../hooks/useAuthContext';
import SEO from '../components/SEO';

const categories = ['electronics', 'documents', 'pets', 'accessories', 'jewelry', 'wallets', 'keys', 'others'];

const AddPost = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const axiosSecure = useAxiosSecure();

  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [formData, setFormData] = useState({
    postType: 'Lost',
    thumbnail: '',
    title: '',
    description: '',
    category: '',
    location: '',
    date: new Date(),
  });

  // Image preview effect
  useEffect(() => {
    if (formData.thumbnail) {
      setImagePreview(formData.thumbnail);
    }
  }, [formData.thumbnail]);

  const validateForm = () => {
    if (!formData.title.trim()) {
      toast.error('Title is required');
      return false;
    }
    if (!formData.description.trim()) {
      toast.error('Description is required');
      return false;
    }
    if (!formData.location.trim()) {
      toast.error('Location is required');
      return false;
    }
    if (!formData.category) {
      toast.error('Category is required');
      return false;
    }
    if (!formData.thumbnail.trim()) {
      toast.error('Thumbnail URL is required');
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const postData = {
        ...formData,
        name: user.displayName,
        email: user.email,
        status: null,
        createdAt: new Date().toISOString(),
      };

      const response = await axiosSecure.post('/posts', postData);

      if (response.data.success) {
        toast.success('Post created successfully!');
        navigate('/lost-found');
      } else {
        throw new Error(response.data.message || 'Failed to create post');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to create post';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-light-background dark:bg-dark-background py-12'>
      <SEO
        title='Add New Post'
        description="Create a new lost or found item post. Help others find their lost items or report items you've found."
      />
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
          {/* Header */}
          <div className='border-b border-light-border dark:border-dark-border p-6'>
            <div className='flex items-center justify-center mb-4'>
              <Search className='h-12 w-12 text-primary' />
            </div>
            <h1 className='text-2xl font-bold text-light-foreground dark:text-dark-foreground text-center'>
              Create Lost & Found Post
            </h1>
            <p className='text-light-foreground/70 dark:text-dark-foreground/70 mt-1 text-center'>
              Please provide accurate information to help with item recovery
            </p>
          </div>

          <form onSubmit={handleSubmit} className='p-6 space-y-8'>
            {/* Post Type */}
            <div className='grid grid-cols-2 gap-4'>
              <button
                type='button'
                onClick={() => setFormData((prev) => ({ ...prev, postType: 'Lost' }))}
                className={`p-4 rounded-lg border-2 transition-all ${
                  formData.postType === 'Lost'
                    ? 'border-red-500 bg-red-500/10 text-red-500'
                    : 'border-light-border dark:border-dark-border text-light-foreground/70 dark:text-dark-foreground/70 hover:border-red-500/50'
                }`}>
                Lost Item
              </button>
              <button
                type='button'
                onClick={() => setFormData((prev) => ({ ...prev, postType: 'Found' }))}
                className={`p-4 rounded-lg border-2 transition-all ${
                  formData.postType === 'Found'
                    ? 'border-green-500 bg-green-500/10 text-green-500'
                    : 'border-light-border dark:border-dark-border text-light-foreground/70 dark:text-dark-foreground/70 hover:border-green-500/50'
                }`}>
                Found Item
              </button>
            </div>

            {/* Image Preview and URL */}
            <div className='space-y-4'>
              <label className='block text-sm font-medium text-light-foreground dark:text-dark-foreground'>
                <ImageIcon className='w-4 h-4 inline-block mr-2' />
                Item Image
              </label>
              {imagePreview && (
                <div className='relative w-full h-48 rounded-lg overflow-hidden bg-light-muted dark:bg-dark-muted'>
                  <img
                    src={imagePreview}
                    alt='Item preview'
                    className='w-full h-full object-cover'
                    onError={(e) => {
                      e.target.src = '/placeholder.svg?height=192&width=384';
                      toast.error('Failed to load image preview');
                    }}
                  />
                </div>
              )}
              <input
                type='url'
                name='thumbnail'
                value={formData.thumbnail}
                onChange={handleChange}
                placeholder='Enter image URL'
                className='w-full px-4 py-2 rounded-lg border border-light-border dark:border-dark-border bg-light-background dark:bg-dark-background text-light-foreground dark:text-dark-foreground focus:outline-none focus:ring-2 focus:ring-primary'
              />
            </div>

            {/* Title and Description */}
            <div className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-light-foreground dark:text-dark-foreground mb-2'>
                  <FileText className='w-4 h-4 inline-block mr-2' />
                  Title
                </label>
                <input
                  type='text'
                  name='title'
                  value={formData.title}
                  onChange={handleChange}
                  className='w-full px-4 py-2 rounded-lg border border-light-border dark:border-dark-border bg-light-background dark:bg-dark-background text-light-foreground dark:text-dark-foreground focus:outline-none focus:ring-2 focus:ring-primary'
                  placeholder='Enter a descriptive title'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-light-foreground dark:text-dark-foreground mb-2'>
                  <FileText className='w-4 h-4 inline-block mr-2' />
                  Description
                </label>
                <textarea
                  name='description'
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className='w-full px-4 py-2 rounded-lg border border-light-border dark:border-dark-border bg-light-background dark:bg-dark-background text-light-foreground dark:text-dark-foreground focus:outline-none focus:ring-2 focus:ring-primary'
                  placeholder='Provide detailed description of the item'
                />
              </div>
            </div>

            {/* Category and Location */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <label className='block text-sm font-medium text-light-foreground dark:text-dark-foreground mb-2'>
                  <Tag className='w-4 h-4 inline-block mr-2' />
                  Category
                </label>
                <select
                  name='category'
                  value={formData.category}
                  onChange={handleChange}
                  className='w-full px-4 py-2 rounded-lg border border-light-border dark:border-dark-border bg-light-background dark:bg-dark-background text-light-foreground dark:text-dark-foreground focus:outline-none focus:ring-2 focus:ring-primary capitalize'>
                  <option value=''>Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className='block text-sm font-medium text-light-foreground dark:text-dark-foreground mb-2'>
                  <MapPin className='w-4 h-4 inline-block mr-2' />
                  Location
                </label>
                <input
                  type='text'
                  name='location'
                  value={formData.location}
                  onChange={handleChange}
                  className='w-full px-4 py-2 rounded-lg border border-light-border dark:border-dark-border bg-light-background dark:bg-dark-background text-light-foreground dark:text-dark-foreground focus:outline-none focus:ring-2 focus:ring-primary'
                  placeholder='Enter location details'
                />
              </div>
            </div>

            {/* Date */}
            <div>
              <label className='block text-sm font-medium text-light-foreground dark:text-dark-foreground mb-2'>
                <Calendar className='w-4 h-4 inline-block mr-2' />
                Date {formData.postType === 'Lost' ? 'Lost' : 'Found'}
              </label>
              <DatePicker
                selected={formData.date}
                onChange={(date) => setFormData((prev) => ({ ...prev, date }))}
                maxDate={new Date()}
                className='w-full px-4 py-2 rounded-lg border border-light-border dark:border-dark-border bg-light-background dark:bg-dark-background text-light-foreground dark:text-dark-foreground focus:outline-none focus:ring-2 focus:ring-primary'
              />
            </div>

            {/* Contact Information */}
            <div className='space-y-4 bg-light-muted dark:bg-dark-muted p-4 rounded-lg'>
              <h3 className='font-medium text-light-foreground dark:text-dark-foreground'>Contact Information</h3>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm text-light-foreground/70 dark:text-dark-foreground/70 mb-1'>
                    <User className='w-4 h-4 inline-block mr-2' />
                    Name
                  </label>
                  <input
                    type='text'
                    value={user?.displayName}
                    readOnly
                    className='w-full px-4 py-2 rounded-lg border border-light-border dark:border-dark-border bg-light-background/50 dark:bg-dark-background/50 text-light-foreground/70 dark:text-dark-foreground/70'
                  />
                </div>
                <div>
                  <label className='block text-sm text-light-foreground/70 dark:text-dark-foreground/70 mb-1'>
                    <Mail className='w-4 h-4 inline-block mr-2' />
                    Email
                  </label>
                  <input
                    type='email'
                    value={user?.email}
                    readOnly
                    className='w-full px-4 py-2 rounded-lg border border-light-border dark:border-dark-border bg-light-background/50 dark:bg-dark-background/50 text-light-foreground/70 dark:text-dark-foreground/70'
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className='flex items-center justify-end gap-4 pt-4 border-t border-light-border dark:border-dark-border'>
              <Link
                to='/lost-found'
                className='px-6 py-2 text-light-foreground/70 dark:text-dark-foreground/70 hover:text-primary'>
                Cancel
              </Link>
              <button
                type='submit'
                disabled={loading}
                className='px-6 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50'>
                {loading ? (
                  <>
                    <Loader2 className='w-5 h-5 animate-spin' />
                    Creating Post...
                  </>
                ) : (
                  <>
                    <Send className='w-5 h-5' />
                    Create Post
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};
export default AddPost;
