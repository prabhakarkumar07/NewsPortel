import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Bell, Eye } from 'lucide-react';

const HeroSection = ({ onSubscribeClick }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="hero-gradient rounded-3xl p-8 mb-12 text-white relative overflow-hidden"
    >
      <div className="relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold mb-4">
          Stay Informed with
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
            AI-Powered News
          </span>
        </h2>
        <p className="text-xl mb-6 text-blue-100">
          Automatically aggregated, intelligently categorized, and beautifully presented
        </p>
        <div className="flex flex-wrap gap-4">
          <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50" onClick={onSubscribeClick}>
            <Bell className="w-5 h-5 mr-2" />
            Subscribe to Updates
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
            <Eye className="w-5 h-5 mr-2" />
            Explore Categories
          </Button>
        </div>
      </div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32 floating-animation"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24 floating-animation" style={{ animationDelay: '1s' }}></div>
    </motion.section>
  );
};

export default HeroSection;