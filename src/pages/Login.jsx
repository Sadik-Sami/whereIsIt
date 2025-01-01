import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, Search } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import useAuthContext from '../hooks/useAuthContext';

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { signIn, signInWithGoogle } = useAuthContext();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const from = location.state || '/';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signIn();
      toast.success('Logged in successfully!');
      navigate(from);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      toast.success('Logged in with Google successfully!');
      navigate(from);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className='min-h-screen bg-light-background dark:bg-dark-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full'>
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
            <h1 className='text-2xl font-bold text-light-foreground dark:text-dark-foreground'>Welcome Back</h1>
            <p className='text-light-foreground/70 dark:text-dark-foreground/70 mt-2'>
              Sign in to your account to continue
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className='space-y-6'>
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
            </div>

            <button
              type='submit'
              disabled={loading}
              className='w-full py-3 px-4 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50'>
              {loading ? (
                <>
                  <div className='w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin' />
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn className='w-5 h-5' />
                  Sign in
                </>
              )}
            </button>

            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <div className='w-full border-t border-light-border dark:border-dark-border' />
              </div>
              <div className='relative flex justify-center text-sm'>
                <span className='px-2 bg-light-card dark:bg-dark-card text-light-foreground/70 dark:text-dark-foreground/70'>
                  Or continue with
                </span>
              </div>
            </div>

            <button
              type='button'
              onClick={handleGoogleLogin}
              className='w-full py-3 px-4 bg-light-muted dark:bg-dark-muted text-light-foreground dark:text-dark-foreground rounded-lg transition-colors hover:bg-light-border dark:hover:bg-dark-border flex items-center justify-center gap-2'>
              <FcGoogle />
              Sign in with Google
            </button>
          </form>

          <p className='mt-8 text-center text-sm text-light-foreground/70 dark:text-dark-foreground/70'>
            Don't have an account?{' '}
            <Link to='/register' className='font-medium text-primary hover:text-primary-dark transition-colors'>
              Sign up
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
