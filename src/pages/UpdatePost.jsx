import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import {
  Calendar,
  MapPin,
  ImageIcon,
  FileText,
  Tag,
  Send,
  ArrowLeft,
  Loader2,
  AlertCircle,
  User,
  Mail,
  Save,
} from 'lucide-react';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAuthContext from '../hooks/useAuthContext';

const categories = ['electronics', 'documents', 'pets', 'accessories', 'jewelry', 'wallets', 'keys', 'others'];

export default function UpdatePost() {
  const { user } = useAuthContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [hasChanges, setHasChanges] = useState(false);

  const [formData, setFormData] = useState({
    postType: '',
    thumbnail: '',
    title: '',
    description: '',
    category: '',
    location: '',
    date: new Date(),
    name: '',
    email: '',
  });
  const [initialData, setInitialData] = useState(null);

  // Fetch post data
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axiosSecure.get(`/post/${id}`);
        const postData = response.data.post;
        setFormData({
          ...postData,
          date: new Date(postData.date),
        });
        setInitialData({
          ...postData,
          date: new Date(postData.date),
        });
        setImagePreview(postData.thumbnail);
        setError(null);
      } catch (error) {
        setError('Failed to fetch post data. Please try again.');
        toast.error('Could not load post data');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, axiosSecure]);

  // getting the changed fields
  const getChangedFields = useCallback(() => {
    if (!initialData) return {};

    const changes = {};
    Object.keys(formData).forEach((key) => {
      if (key === 'date') {
        if (formData[key].getTime() !== initialData[key].getTime()) {
          changes[key] = formData[key];
        }
      } else if (formData[key] !== initialData[key]) {
        changes[key] = formData[key];
      }
    });
    return changes;
  }, [formData, initialData]);

  // Updating the state of hasChanges whenever form data changes
  useEffect(() => {
    const changes = getChangedFields();
    setHasChanges(Object.keys(changes).length > 0);
  }, [formData, getChangedFields]);

  // Form validation
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

    // Update image preview when thumbnail URL changes
    if (name === 'thumbnail') {
      setImagePreview(value);
    }
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({ ...prev, date }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const updates = getChangedFields();

    if (Object.keys(updates).length === 0) {
      toast.info('No changes to update');
      return;
    }

    setSubmitting(true);
    const oldData = { ...formData };

    try {
      setInitialData(formData);
      setHasChanges(false);
      const response = await axiosSecure.patch(`/update-post/${id}?email=${user.email}`, updates);
      if (response.data.success) {
        toast.success('Post updated successfully');
        navigate('/my-posts');
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      setFormData(oldData);
      setInitialData(oldData);
      toast.error(error.response?.data?.message || 'Failed to update post');
    } finally {
      setSubmitting(false);
    }
  };
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasChanges]);

  if (loading) {
    return (
      <div className='min-h-screen bg-light-background dark:bg-dark-background flex items-center justify-center'>
        <div className='text-center'>
          <Loader2 className='w-8 h-8 animate-spin text-primary mx-auto mb-4' />
          <p className='text-light-foreground/70 dark:text-dark-foreground/70'>Loading post data...</p>
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
          <Link to='/my-posts' className='inline-flex items-center text-primary hover:text-primary-dark'>
            <ArrowLeft className='w-4 h-4 mr-2' />
            Back to My Posts
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-light-background dark:bg-dark-background py-12'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        <Link
          to='/my-posts'
          className='inline-flex items-center text-light-foreground/70 dark:text-dark-foreground/70 hover:text-primary mb-6'>
          <ArrowLeft className='w-4 h-4 mr-2' />
          Back to My Posts
        </Link>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='bg-light-card dark:bg-dark-card rounded-lg shadow-xl overflow-hidden'>
          <div className='border-b border-light-border dark:border-dark-border p-6'>
            <h1 className='text-2xl font-bold text-light-foreground dark:text-dark-foreground'>Update Post</h1>
            <p className='text-light-foreground/70 dark:text-dark-foreground/70 mt-1'>
              Make changes to your lost or found item post
            </p>
          </div>
          <form onSubmit={handleSubmit} className='p-6 space-y-8'>
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
                onChange={handleDateChange}
                maxDate={new Date()}
                className='w-full px-4 py-2 rounded-lg border border-light-border dark:border-dark-border bg-light-background dark:bg-dark-background text-light-foreground dark:text-dark-foreground focus:outline-none focus:ring-2 focus:ring-primary'
              />
            </div>
            <div className='space-y-4 bg-light-muted dark:bg-dark-muted p-4 rounded-lg'>
              <h3 className='font-medium text-light-foreground dark:text-dark-foreground'>Contact Information</h3>
              <div>
                <label className='block text-sm text-light-foreground/70 dark:text-dark-foreground/70 mb-1'>
                  <User className='w-4 h-4 inline-block mr-2' />
                  Name
                </label>
                <input
                  type='text'
                  value={formData.name}
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
                  value={formData.email}
                  readOnly
                  className='w-full px-4 py-2 rounded-lg border border-light-border dark:border-dark-border bg-light-background/50 dark:bg-dark-background/50 text-light-foreground/70 dark:text-dark-foreground/70'
                />
              </div>
            </div>
            <div className='flex items-center justify-end gap-4 pt-4 border-t border-light-border dark:border-dark-border'>
              <Link
                to='/my-posts'
                className='px-6 py-2 text-light-foreground/70 dark:text-dark-foreground/70 hover:text-primary'>
                Cancel
              </Link>
              <button
                type='submit'
                disabled={submitting || !hasChanges}
                className='px-6 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50'>
                {submitting ? (
                  <>
                    <Loader2 className='w-5 h-5 animate-spin' />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className='w-5 h-5' />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
