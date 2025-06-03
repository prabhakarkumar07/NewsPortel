import React from 'react';
import { Rss } from 'lucide-react';

const Footer = ({ categories, rssSources }) => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-blue-900 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Rss className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">NewsFlow AI</span>
            </div>
            <p className="text-gray-300 text-sm">
              Automated news aggregation powered by artificial intelligence. Stay informed with the latest stories from trusted sources.
            </p>
          </div>
          
          <div>
            <span className="font-semibold mb-4 block">Categories</span>
            <div className="space-y-2 text-sm">
              {categories.slice(1, 5).map((category) => (
                <p key={category.id} className="text-gray-300 hover:text-white cursor-pointer transition-colors">
                  {category.name}
                </p>
              ))}
            </div>
          </div>
          
          <div>
            <span className="font-semibold mb-4 block">Features</span>
            <div className="space-y-2 text-sm text-gray-300">
              <p>AI-Powered Categorization</p>
              <p>Real-time RSS Aggregation</p>
              <p>Smart Content Summarization</p>
              <p>Subscription Management</p>
            </div>
          </div>
          
          <div>
            <span className="font-semibold mb-4 block">RSS Sources</span>
            <div className="space-y-2 text-sm text-gray-300">
              {rssSources.slice(0, 4).map((source, index) => (
                <p key={index}>{source.name}</p>
              ))}
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} NewsFlow AI. Automated news aggregation platform.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;