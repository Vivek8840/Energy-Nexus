import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import MobileNav from './MobileNav';
import PageTransition from '@/components/ui/PageTransition';

const Layout: React.FC = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  React.useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50/80 via-white/90 to-secondary-50/80 dark:from-dark-900 dark:via-dark-800 dark:to-primary-900/20 flex flex-col relative overflow-hidden">
      {/* Eco-futuristic background elements */}
      <div className="absolute inset-0 bg-gradient-to-tr from-accent-50/20 via-transparent to-secondary-50/20 dark:from-accent-900/10 dark:via-transparent dark:to-secondary-900/10 pointer-events-none" />
      {/* Subtle energy particles */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-primary-400 rounded-full animate-pulse" />
        <div className="absolute top-1/3 right-1/3 w-0.5 h-0.5 bg-secondary-400 rounded-full animate-pulse delay-1000" />
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-accent-400 rounded-full animate-pulse delay-500" />
        <div className="absolute bottom-1/4 right-1/4 w-0.5 h-0.5 bg-primary-300 rounded-full animate-pulse delay-1500" />
      </div>
      {/* Header - Fixed at top */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
        className="relative z-20"
      >
        <Header onMenuClick={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      </motion.div>

      <div className="flex flex-1 min-h-0">
        {/* Sidebar on the left */}
        <motion.div
          animate={{
            width: isSidebarOpen ? (isSidebarCollapsed ? 80 : 250) : 0
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="overflow-hidden flex-shrink-0"
        >
          <Sidebar
            onClose={closeSidebar}
            isOpen={isSidebarOpen}
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          />
        </motion.div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Page Content */}
          <main className="flex-1 overflow-auto">
            <AnimatePresence mode="wait">
              <PageTransition key={location.pathname} className="h-full">
                <div className="h-full p-4 sm:p-6 lg:p-8">
                  <Outlet />
                </div>
              </PageTransition>
            </AnimatePresence>
          </main>

          {/* Mobile Bottom Navigation */}
          {isMobile && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
            >
              <MobileNav />
            </motion.div>
          )}
        </div>
      </div>

      {/* Footer - Fixed at bottom */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
        className="relative z-10"
      >
        <Footer />
      </motion.div>
    </div>
  );
};

export default Layout;
