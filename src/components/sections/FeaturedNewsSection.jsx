import React from 'react';
import { motion } from 'framer-motion';
import { User, Clock, Eye, Star } from 'lucide-react';

const FeaturedNewsSection = ({
  featuredNews,
  getCategoryIcon,
  getCategoryColor,
  formatDate,
  categories
}) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="mb-12"
    >
      <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <Star className="w-6 h-6 mr-2 text-yellow-500" />
        Featured Stories
      </h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {featuredNews.slice(0, 2).map((article) => {
          const CategoryIcon = getCategoryIcon(article.category);
          
          return (
            <motion.article
              key={article.id}
              whileHover={{ y: -5 }}
              className="news-card rounded-2xl overflow-hidden"
            >
              <div className="relative h-64">
                <img   
                  className="w-full h-full object-cover"
                  alt={`Featured news about ${article.title}`}
                 src="https://images.unsplash.com/photo-1662485732745-5a841bfe7f65" />
                <div className="absolute top-4 left-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getCategoryColor(article.category)}`}>
                    <CategoryIcon className="w-3 h-3 mr-1" />
                    {categories.find(cat => cat.id === article.category)?.name}
                  </span>
                </div>
                <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded-full text-xs">
                  <Star className="w-3 h-3 inline mr-1" />
                  Featured
                </div>
              </div>
              
              <div className="p-6">
                <h4 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                  {article.title}
                </h4>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {article.summary}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {article.author}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {article.readTime}
                    </span>
                  </div>
                  <span className="flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    {article.views.toLocaleString()}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {article.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">
                    {formatDate(article.publishedAt)}
                  </span>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </motion.section>
  );
};

export default FeaturedNewsSection;