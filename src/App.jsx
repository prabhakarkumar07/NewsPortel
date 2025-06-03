import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';
import { toast } from '@/components/ui/use-toast';
import Header from '@/components/layout/Header';
import MobileMenu from '@/components/layout/MobileMenu';
import AdminDashboard from '@/components/admin/AdminDashboard';
import HeroSection from '@/components/sections/HeroSection';
import CategoriesSection from '@/components/sections/CategoriesSection';
import FeaturedNewsSection from '@/components/sections/FeaturedNewsSection';
import NewsGridSection from '@/components/sections/NewsGridSection';
import Footer from '@/components/layout/Footer';
import AuthModal from '@/components/auth/AuthModal';
import { categoriesData, mockNewsData, rssSourcesData } from '@/data/newsData';
import { formatDate, getCategoryIcon, getCategoryColor } from '@/lib/utils';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [news, setNews] = useState(mockNewsData);
  const [isLoading, setIsLoading] = useState(false);
  const [subscriptions, setSubscriptions] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [currentUser, setCurrentUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login'); 

  useEffect(() => {
    const savedSubscriptions = localStorage.getItem('newsSubscriptions');
    if (savedSubscriptions) {
      setSubscriptions(JSON.parse(savedSubscriptions));
    }
    const loggedInUser = localStorage.getItem('currentUser');
    if (loggedInUser) {
      setCurrentUser(JSON.parse(loggedInUser));
    }
  }, []);

  const filteredNews = news.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (article.tags && article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  const featuredNews = news.filter(article => article.featured);

  const handleSubscribe = (categoryId) => {
    if (!currentUser) {
      toast({ title: "Login Required", description: "Please login to subscribe.", variant: "destructive" });
      openAuthModal('login');
      return;
    }
    const category = categoriesData.find(cat => cat.id === categoryId);
    if (!subscriptions.includes(categoryId)) {
      const newSubscriptions = [...subscriptions, categoryId];
      setSubscriptions(newSubscriptions);
      localStorage.setItem('newsSubscriptions', JSON.stringify(newSubscriptions));
      toast({
        title: "Subscribed!",
        description: `You'll receive notifications for ${category.name} articles.`,
      });
    } else {
      const newSubscriptions = subscriptions.filter(sub => sub !== categoryId);
      setSubscriptions(newSubscriptions);
      localStorage.setItem('newsSubscriptions', JSON.stringify(newSubscriptions));
      toast({
        title: "Unsubscribed",
        description: `You won't receive notifications for ${category.name} articles anymore.`,
      });
    }
  };

  const simulateContentAggregation = () => {
    setIsLoading(true);
    toast({
      title: "Aggregating Content",
      description: "Fetching latest news from RSS sources...",
    });

    setTimeout(() => {
      setLastUpdated(new Date());
      setIsLoading(false);
      toast({
        title: "Content Updated!",
        description: "Successfully aggregated latest news articles.",
      });
    }, 3000);
  };

  const handleLogin = (email, password) => {
    // Simulate login
    if (email === "admin@example.com" && password === "admin123") {
      console.log("Login attempt:", email, password);
      const user = { email, role: 'admin', name: 'Admin User' };
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      toast({ title: "Login Successful", description: "Welcome back, Admin!" });
      setShowAuthModal(false);
      setIsAdminMode(true); // Automatically enter admin mode for admin user
    } else if (email === "user@example.com" && password === "user123") {
      const user = { email, role: 'user', name: 'Regular User' };
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      toast({ title: "Login Successful", description: `Welcome back, ${user.name}!` });
      setShowAuthModal(false);
    }
     else {
      toast({ title: "Login Failed", description: "Invalid email or password.", variant: "destructive" });
    }
  };

  const handleSignup = (name, email, password) => {
    // Simulate signup
    const newUser = { email, role: 'user', name };
    setCurrentUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    toast({ title: "Signup Successful", description: `Welcome, ${name}!` });
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    setIsAdminMode(false); // Exit admin mode on logout
    toast({ title: "Logged Out", description: "You have been successfully logged out." });
  };

  const openAuthModal = (mode) => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Toaster />
      
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        simulateContentAggregation={simulateContentAggregation}
        isLoading={isLoading}
        isAdminMode={isAdminMode}
        setIsAdminMode={setIsAdminMode}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        currentUser={currentUser}
        onLogout={handleLogout}
        onLoginClick={() => openAuthModal('login')}
        onSignupClick={() => openAuthModal('signup')}
      />

      <MobileMenu
        isOpen={isMenuOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        simulateContentAggregation={simulateContentAggregation}
        isLoading={isLoading}
        setIsAdminMode={setIsAdminMode}
        currentUser={currentUser}
        onLogout={handleLogout}
        onLoginClick={() => openAuthModal('login')}
      />

      <AnimatePresence>
        {showAuthModal && (
          <AuthModal
            mode={authMode}
            setMode={setAuthMode}
            onClose={() => setShowAuthModal(false)}
            onLogin={handleLogin}
            onSignup={handleSignup}
          />
        )}
      </AnimatePresence>

      <AdminDashboard
        isOpen={isAdminMode && currentUser?.role === 'admin'}
        rssSources={rssSourcesData}
        news={news}
        setNews={setNews}
        featuredCount={featuredNews.length}
        lastUpdated={lastUpdated}
        formatDate={formatDate}
        categoriesData={categoriesData}
      />

      <main className="container mx-auto px-4 py-8">
        <HeroSection onSubscribeClick={() => {
          if (!currentUser) {
            openAuthModal('login');
          } else {
            toast({ title: "Subscribed!", description: "You'll get general updates."});
          }
        }} />

        <CategoriesSection
          categories={categoriesData}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          subscriptions={subscriptions}
          handleSubscribe={handleSubscribe}
          news={news}
          lastUpdated={lastUpdated}
          formatDate={formatDate}
        />

        {featuredNews.length > 0 && selectedCategory === 'all' && (
          <FeaturedNewsSection
            featuredNews={featuredNews}
            getCategoryIcon={getCategoryIcon}
            getCategoryColor={getCategoryColor}
            formatDate={formatDate}
            categories={categoriesData}
          />
        )}

        <NewsGridSection
          filteredNews={filteredNews}
          isLoading={isLoading}
          selectedCategory={selectedCategory}
          categories={categoriesData}
          getCategoryIcon={getCategoryIcon}
          getCategoryColor={getCategoryColor}
          formatDate={formatDate}
        />
      </main>

      <Footer categories={categoriesData} rssSources={rssSourcesData} />
    </div>
  );
}

export default App;