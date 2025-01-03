import { motion } from 'framer-motion';
import { AlertCircle, Home, ArrowLeft } from 'lucide-react';
import { Link, useNavigate, useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <div className='min-h-screen bg-light-background dark:bg-dark-background flex items-center justify-center p-4'>
      <div className='max-w-md w-full'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='bg-light-card dark:bg-dark-card rounded-lg shadow-xl p-8 text-center'>
          <div className='w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6'>
            <AlertCircle className='w-12 h-12 text-red-500' />
          </div>

          <h1 className='text-3xl font-bold text-light-foreground dark:text-dark-foreground mb-2'>
            Oops! Something went wrong
          </h1>

          <p className='text-xl text-light-foreground/70 dark:text-dark-foreground/70 mb-6'>
            {error?.statusText || error?.message || 'Sorry, an unexpected error occurred'}
          </p>

          {error?.status === 404 ? (
            <p className='text-light-foreground/70 dark:text-dark-foreground/70 mb-8'>
              The page you're looking for doesn't exist or has been moved.
            </p>
          ) : (
            <p className='text-light-foreground/70 dark:text-dark-foreground/70 mb-8'>
              Don't worry, it's not your fault. Please try again later.
            </p>
          )}

          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <button
              onClick={() => navigate(-1)}
              className='inline-flex items-center justify-center px-6 py-3 bg-light-muted dark:bg-dark-muted hover:bg-light-border dark:hover:bg-dark-border text-light-foreground dark:text-dark-foreground rounded-lg transition-colors'>
              <ArrowLeft className='w-5 h-5 mr-2' />
              Go Back
            </button>
            <Link
              to='/'
              className='inline-flex items-center justify-center px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors'>
              <Home className='w-5 h-5 mr-2' />
              Return Home
            </Link>
          </div>
        </motion.div>

        {/* Error Details (only in development) */}
        {process.env.NODE_ENV === 'development' && error?.stack && (
          <div className='mt-8 p-4 bg-light-card dark:bg-dark-card rounded-lg shadow-xl overflow-auto'>
            <pre className='text-sm text-light-foreground/70 dark:text-dark-foreground/70 whitespace-pre-wrap'>
              {error.stack}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
