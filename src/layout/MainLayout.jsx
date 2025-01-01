import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import ScrollToTop from '../components/ScrollToTop';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
const MainLayout = () => {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <ScrollToTop />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
