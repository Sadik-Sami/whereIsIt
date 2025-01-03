import { useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, Search } from 'lucide-react';
import useAuthContext from '../hooks/useAuthContext';
import SEO from '../components/SEO';
import { FcGoogle } from 'react-icons/fc';

export default function Login() {
  const { signIn, signInWithGoogle } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const from = location?.state || '/';
  console.log(from);
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
      const result = await signIn(formData.email, formData.password);
      if (result.user) {
        toast.success(`Welcome Back ${result?.user?.displayName}`);
        navigate(from);
      }
    } catch (error) {
      console.error('Login error:', error);
      let errorMessage = 'Login failed. Please try again.';

      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email. Please check your email or register.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password. Please try again.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address.';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed attempts. Please try again later.';
      }

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      const result = await signInWithGoogle();
      if (result.user) {
        toast.success(`Welcome Back ${result?.user?.displayName}`);
        navigate(from);
      }
    } catch (error) {
      console.error('Google login error:', error);
      toast.error('Failed to login. Please try again.');
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <>
      <SEO title='Login' description='Sign in to your WhereIsIt account to manage your lost and found items.' />
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
                {/* <div className='flex justify-end'>
                  <Link
                    to='/forgot-password'
                    className='text-sm text-primary hover:text-primary-dark transition-colors mt-2'>
                    Forgot password?
                  </Link>
                </div> */}
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
                disabled={googleLoading}
                className='w-full py-3 px-4 bg-light-muted dark:bg-dark-muted text-light-foreground dark:text-dark-foreground rounded-lg transition-colors hover:bg-light-border dark:hover:bg-dark-border flex items-center justify-center gap-2 disabled:opacity-50'>
                {googleLoading ? (
                  <>
                    <div className='w-5 h-5 border-2 border-primary/20 border-t-primary rounded-full animate-spin' />
                    Connecting...
                  </>
                ) : (
                  <>
                    <FcGoogle />
                    Sign in with Google
                  </>
                )}
              </button>
            </form>

            <p className='mt-8 text-center text-sm text-light-foreground/70 dark:text-dark-foreground/70'>
              Don't have an account?{' '}
              <NavLink
                to='/register'
                state={from}
                className='font-medium text-primary hover:text-primary-dark transition-colors'>
                Sign up
              </NavLink>
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
}
