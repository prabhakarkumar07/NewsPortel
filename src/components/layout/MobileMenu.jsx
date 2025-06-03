import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Settings, Rss, LogIn, UserPlus, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MobileMenu = ({
  isOpen,
  searchQuery,
  setSearchQuery,
  simulateContentAggregation,
  isLoading,
  setIsAdminMode,
  currentUser,
  onLogout,
  onLoginClick,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white/95 backdrop-blur-sm border-b border-gray-200"
        >
          <div className="container mx-auto px-4 py-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={simulateContentAggregation}
                disabled={isLoading}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white"
              >
                <Rss className="w-4 h-4 mr-2" />
                {isLoading ? 'Updating...' : 'Refresh'}
              </Button>
              {currentUser && currentUser.role === 'admin' && (
                <Button
                  variant="outline"
                  onClick={() => setIsAdminMode(prev => !prev)}
                  className="flex-1"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Admin
                </Button>
              )}
            </div>
            {currentUser ? (
              <Button onClick={onLogout} className="w-full bg-red-500 hover:bg-red-600 text-white">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            ) : (
              <div className="flex space-x-2">
                <Button onClick={onLoginClick} variant="outline" className="flex-1">
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </Button>
                <Button onClick={() => { /* Assuming onSignupClick is passed or handled */ }} className="flex-1 bg-green-500 hover:bg-green-600 text-white">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;