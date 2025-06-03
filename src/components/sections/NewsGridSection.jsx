import React from 'react';
import { motion } from 'framer-motion';
import { User, Clock, Eye, Star, Search, Filter } from 'lucide-react';

const NewsGridSection = ({
  filteredNews,
  isLoading,
  selectedCategory,
  categories,
  getCategoryIcon,
  getCategoryColor,
  formatDate,
}) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-800">
          {selectedCategory === 'all' ? 'Latest News' : `${categories.find(cat => cat.id === selectedCategory)?.name} News`}
        </h3>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Filter className="w-4 h-4" />
          <span>{filteredNews.length} articles</span>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="news-card rounded-2xl overflow-hidden">
              <div className="h-48 shimmer"></div>
              <div className="p-6 space-y-3">
                <div className="h-4 shimmer rounded"></div>
                <div className="h-4 shimmer rounded w-3/4"></div>
                <div className="h-3 shimmer rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map((article, index) => {
            const CategoryIcon = getCategoryIcon(article.category);
            
            return (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="news-card rounded-2xl overflow-hidden"
              >
                <div className="relative h-48">
                  <img   
                    className="w-full h-full object-cover"
                    alt={`News about ${article.title}`}
                   src="https://images.unsplash.com/photo-1662485732745-5a841bfe7f65" />
                  <div className="absolute top-4 left-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getCategoryColor(article.category)}`}>
                      <CategoryIcon className="w-3 h-3 mr-1" />
                      {categories.find(cat => cat.id === article.category)?.name}
                    </span>
                  </div>
                  {article.featured && (
                    <div className="absolute top-4 right-4 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs">
                      <Star className="w-3 h-3 inline mr-1" />
                      Featured
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h4 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2">
                    {article.title}
                  </h4>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.summary}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center">
                        <User className="w-3 h-3 mr-1" />
                        {article.author}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {article.readTime}
                      </span>
                    </div>
                    <span className="flex items-center">
                      <Eye className="w-3 h-3 mr-1" />
                      {article.views.toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {article.tags && article.tags.slice(0, 2).map((tag) => (
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
      )}

      {filteredNews.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-12 h-12 text-gray-400" />
          </div>
          <h4 className="text-xl font-semibold text-gray-600 mb-2">No articles found</h4>
          <p className="text-gray-500">Try adjusting your search or category filter</p>
        </div>
      )}
    </motion.section>
  );
};

export default NewsGridSection;