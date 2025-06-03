import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';

const CategoriesSection = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  subscriptions,
  handleSubscribe,
  news,
  lastUpdated,
  formatDate,
}) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mb-12"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Categories</h3>
        <div className="text-sm text-gray-600">
          Last updated: {formatDate(lastUpdated.toISOString())}
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {categories.map((category) => {
          const IconComponent = category.icon;
          const isSelected = selectedCategory === category.id;
          const isSubscribed = subscriptions.includes(category.id);
          
          return (
            <motion.div
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative p-4 rounded-2xl cursor-pointer transition-all duration-300 ${
                isSelected 
                  ? `bg-gradient-to-br ${category.color} text-white shadow-lg` 
                  : 'bg-white hover:shadow-md border border-gray-200'
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <div className="text-center">
                <IconComponent className={`w-8 h-8 mx-auto mb-2 ${isSelected ? 'text-white' : 'text-gray-600'}`} />
                <p className={`font-semibold text-sm ${isSelected ? 'text-white' : 'text-gray-800'}`}>
                  {category.name}
                </p>
                <p className={`text-xs mt-1 ${isSelected ? 'text-white/80' : 'text-gray-500'}`}>
                  {news.filter(article => category.id === 'all' || article.category === category.id).length} articles
                </p>
              </div>
              
              {category.id !== 'all' && (
                <Button
                  size="sm"
                  variant={isSubscribed ? "secondary" : "outline"}
                  className={`absolute -top-2 -right-2 w-6 h-6 p-0 rounded-full ${
                    isSubscribed ? 'bg-green-500 text-white' : 'bg-white border-gray-300'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSubscribe(category.id);
                  }}
                >
                  <Bell className="w-3 h-3" />
                </Button>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
};

export default CategoriesSection;