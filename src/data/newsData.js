import { Globe, TrendingUp, Zap, Star, BookOpen, Calendar, Eye as SportsIcon } from 'lucide-react';

export const categoriesData = [
  { id: 'all', name: 'All News', icon: Globe, color: 'from-blue-500 to-purple-600' },
  { id: 'technology', name: 'Technology', icon: Zap, color: 'from-cyan-500 to-blue-600' },
  { id: 'business', name: 'Business', icon: TrendingUp, color: 'from-green-500 to-emerald-600' },
  { id: 'entertainment', name: 'Entertainment', icon: Star, color: 'from-pink-500 to-rose-600' },
  { id: 'sports', name: 'Sports', icon: SportsIcon, color: 'from-orange-500 to-red-600' },
  { id: 'health', name: 'Health', icon: BookOpen, color: 'from-purple-500 to-indigo-600' },
  { id: 'science', name: 'Science', icon: Calendar, color: 'from-teal-500 to-cyan-600' }
];

export const mockNewsData = [
  {
    id: 1,
    title: "Revolutionary AI Technology Transforms Healthcare Industry",
    summary: "New artificial intelligence breakthrough promises to revolutionize patient care and medical diagnosis with unprecedented accuracy.",
    category: "technology",
    author: "AI News Bot",
    publishedAt: "2024-01-15T10:30:00Z",
    readTime: "3 min read",
    views: 1250,
    tags: ["AI", "Healthcare", "Innovation"],
    featured: true
  },
  {
    id: 2,
    title: "Global Markets Surge Following Tech Earnings Reports",
    summary: "Major technology companies exceed expectations in quarterly earnings, driving significant market gains across all sectors.",
    category: "business",
    author: "Market Analyzer",
    publishedAt: "2024-01-15T09:15:00Z",
    readTime: "4 min read",
    views: 890,
    tags: ["Markets", "Earnings", "Technology"],
    featured: false
  },
  {
    id: 3,
    title: "Breakthrough in Renewable Energy Storage Solutions",
    summary: "Scientists develop new battery technology that could store renewable energy for weeks, solving intermittency challenges.",
    category: "science",
    author: "Science Reporter",
    publishedAt: "2024-01-15T08:45:00Z",
    readTime: "5 min read",
    views: 2100,
    tags: ["Energy", "Battery", "Environment"],
    featured: true
  },
  {
    id: 4,
    title: "Olympic Games Preparation Reaches Final Stages",
    summary: "Athletes from around the world make final preparations as the upcoming Olympic Games approach with record participation.",
    category: "sports",
    author: "Sports Desk",
    publishedAt: "2024-01-15T07:20:00Z",
    readTime: "2 min read",
    views: 650,
    tags: ["Olympics", "Sports", "Athletes"],
    featured: false
  },
  {
    id: 5,
    title: "New Study Reveals Benefits of Mediterranean Diet",
    summary: "Comprehensive research shows Mediterranean diet significantly reduces risk of heart disease and improves cognitive function.",
    category: "health",
    author: "Health Reporter",
    publishedAt: "2024-01-15T06:30:00Z",
    readTime: "4 min read",
    views: 1450,
    tags: ["Diet", "Health", "Research"],
    featured: false
  },
  {
    id: 6,
    title: "Blockbuster Movie Breaks Opening Weekend Records",
    summary: "Latest superhero film shatters box office records with unprecedented opening weekend performance worldwide.",
    category: "entertainment",
    author: "Entertainment News",
    publishedAt: "2024-01-15T05:45:00Z",
    readTime: "3 min read",
    views: 980,
    tags: ["Movies", "Box Office", "Entertainment"],
    featured: false
  }
];

export const rssSourcesData = [
  { name: "TechCrunch", url: "https://techcrunch.com/feed/", category: "technology", status: "active" },
  { name: "BBC News", url: "https://feeds.bbci.co.uk/news/rss.xml", category: "all", status: "active" },
  { name: "Reuters Business", url: "https://www.reuters.com/business", category: "business", status: "active" },
  { name: "ESPN", url: "https://www.espn.com/espn/rss/news", category: "sports", status: "active" },
  { name: "WebMD", url: "https://www.webmd.com/rss/rss.aspx", category: "health", status: "active" }
];