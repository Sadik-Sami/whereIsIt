import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ImageIcon, Search } from 'lucide-react';
import useAuthContext from '../hooks/useAuthContext';
import SEO from '../components/SEO';

export default function Register() {
  const { createUser, updateUserProfile } = useAuthContext();
  const location = useLocation();
  const from = location.state || '/';
  console.log(from);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    photoURL: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const isLongEnough = password.length >= 6;

    if (!hasUpperCase) {
      toast.error('Password must contain at least one uppercase letter');
      return false;
    }
    if (!hasLowerCase) {
      toast.error('Password must contain at least one lowercase letter');
      return false;
    }
    if (!isLongEnough) {
      toast.error('Password must be at least 6 characters long');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword(formData.password)) {
      return;
    }

    setLoading(true);
    try {
      const result = await createUser(formData.email, formData.password);
      if (result.user) {
        await updateUserProfile(formData.name, formData.photoURL);
        toast.success(`Welcome To WhereIsIt, ${result.user?.name}`);
        navigate(from);
      }
    } catch (error) {
      console.error('Registration error:', error);
      let errorMessage = 'Registration failed. Please try again.';

      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already registered. Please use a different email or try logging in.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address.';
      } else if (error.code === 'auth/operation-not-allowed') {
        errorMessage = 'Email/password registration is not enabled. Please contact support.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Please choose a stronger password.';
      }

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-light-background dark:bg-dark-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full'>
        <SEO title='Register' description='Register to WhereIsIt to manage your lost and found items' />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='bg-light-card dark:bg-dark-card rounded-lg shadow-xl p-6 md:p-8'>
          {/* Header */}
          <div className='text-center mb-8'>
            <Link to='/' className='inline-block mb-6'>
              <Search className='h-12 w-12 text-primary mx-auto' />
              <h2 className='mt-2 text-3xl font-bold text-light-foreground dark:text-dark-foreground'>WhereIsIt</h2>
            </Link>
            <h1 className='text-2xl font-bold text-light-foreground dark:text-dark-foreground'>Create an Account</h1>
            <p className='text-light-foreground/70 dark:text-dark-foreground/70 mt-2'>
              Join our community to help find lost items
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
              <label className='block text-sm font-medium text-light-foreground dark:text-dark-foreground mb-2'>
                <User className='w-4 h-4 inline-block mr-2' />
                Name
              </label>
              <input
                type='text'
                name='name'
                value={formData.name}
                onChange={handleChange}
                required
                className='w-full px-4 py-2 rounded-lg border border-light-border dark:border-dark-border bg-light-background dark:bg-dark-background text-light-foreground dark:text-dark-foreground focus:outline-none focus:ring-2 focus:ring-primary'
                placeholder='Enter your name'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-light-foreground dark:text-dark-foreground mb-2'>
                <Mail className='w-4 h-4 inline-block mr-2' />
                Email
              </label>
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                required
                className='w-full px-4 py-2 rounded-lg border border-light-border dark:border-dark-border bg-light-background dark:bg-dark-background text-light-foreground dark:text-dark-foreground focus:outline-none focus:ring-2 focus:ring-primary'
                placeholder='Enter your email'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-light-foreground dark:text-dark-foreground mb-2'>
                <ImageIcon className='w-4 h-4 inline-block mr-2' />
                Photo URL
              </label>
              <input
                type='url'
                name='photoURL'
                value={formData.photoURL}
                onChange={handleChange}
                required
                className='w-full px-4 py-2 rounded-lg border border-light-border dark:border-dark-border bg-light-background dark:bg-dark-background text-light-foreground dark:text-dark-foreground focus:outline-none focus:ring-2 focus:ring-primary'
                placeholder='Enter photo URL'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-light-foreground dark:text-dark-foreground mb-2'>
                <Lock className='w-4 h-4 inline-block mr-2' />
                Password
              </label>
              <input
                type='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                required
                className='w-full px-4 py-2 rounded-lg border border-light-border dark:border-dark-border bg-light-background dark:bg-dark-background text-light-foreground dark:text-dark-foreground focus:outline-none focus:ring-2 focus:ring-primary'
                placeholder='Enter your password'
              />
              <p className='mt-2 text-sm text-light-foreground/70 dark:text-dark-foreground/70'>
                Password must contain at least 6 characters, including uppercase and lowercase letters
              </p>
            </div>

            <button
              type='submit'
              disabled={loading}
              className='w-full py-3 px-4 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50'>
              {loading ? (
                <>
                  <div className='w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin' />
                  Creating account...
                </>
              ) : (
                <>
                  <User className='w-5 h-5' />
                  Create Account
                </>
              )}
            </button>
          </form>

          <p className='mt-8 text-center text-sm text-light-foreground/70 dark:text-dark-foreground/70'>
            Already have an account?{' '}
            <Link to='/login' className='font-medium text-primary hover:text-primary-dark transition-colors'>
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
