import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, ListChecks, Users, Newspaper, PlusCircle, Edit, Trash2, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';

const AdminDashboard = ({
  isOpen,
  rssSources,
  news,
  setNews,
  featuredCount,
  lastUpdated,
  formatDate,
  categoriesData,
}) => {
  const [activeTab, setActiveTab] = useState('posts');
  const [showPostModal, setShowPostModal] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [postForm, setPostForm] = useState({ title: '', summary: '', category: '', content: '', tags: '', imageUrl: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostForm(prev => ({ ...prev, [name]: value }));
  };

  const handleTagChange = (e) => {
    setPostForm(prev => ({ ...prev, tags: e.target.value }));
  };

  const handleSubmitPost = () => {
    if (!postForm.title || !postForm.summary || !postForm.category || !postForm.content) {
      toast({ title: "Error", description: "Please fill all required fields.", variant: "destructive" });
      return;
    }
    const newPost = {
      id: editingPost ? editingPost.id : Date.now(),
      ...postForm,
      tags: postForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      author: "Admin",
      publishedAt: new Date().toISOString(),
      readTime: `${Math.ceil(postForm.content.split(' ').length / 200)} min read`,
      views: editingPost ? editingPost.views : 0,
      featured: editingPost ? editingPost.featured : false,
    };

    if (editingPost) {
      setNews(prevNews => prevNews.map(p => p.id === editingPost.id ? newPost : p));
      toast({ title: "Post Updated", description: "The news post has been successfully updated." });
    } else {
      setNews(prevNews => [newPost, ...prevNews]);
      toast({ title: "Post Created", description: "The new post has been successfully created." });
    }
    setShowPostModal(false);
    setEditingPost(null);
    setPostForm({ title: '', summary: '', category: '', content: '', tags: '', imageUrl: '' });
  };

  const handleEditPost = (post) => {
    setEditingPost(post);
    setPostForm({
      title: post.title,
      summary: post.summary,
      category: post.category,
      content: `Full content for "${post.title}" would be loaded here. This is a placeholder.`, // Placeholder for full content
      tags: post.tags.join(', '),
      imageUrl: post.imageUrl || '',
    });
    setShowPostModal(true);
  };

  const handleDeletePost = (postId) => {
    setNews(prevNews => prevNews.filter(p => p.id !== postId));
    toast({ title: "Post Deleted", description: "The post has been successfully deleted." });
  };
  
  const mockUsers = [
    { id: 1, name: "Admin User", email: "admin@example.com", role: "admin", joined: "2023-01-01" },
    { id: 2, name: "Regular User", email: "user@example.com", role: "user", joined: "2023-02-15" },
    { id: 3, name: "Jane Doe", email: "jane@example.com", role: "user", joined: "2023-03-10" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'posts':
        return (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Manage Posts</h3>
              <Button onClick={() => { setEditingPost(null); setPostForm({ title: '', summary: '', category: '', content: '', tags: '', imageUrl: '' }); setShowPostModal(true); }}>
                <PlusCircle className="w-4 h-4 mr-2" /> Create New Post
              </Button>
            </div>
            <div className="space-y-3">
              {news.map(post => (
                <div key={post.id} className="glass-effect p-3 rounded-md flex justify-between items-center">
                  <div>
                    <p className="font-medium">{post.title}</p>
                    <p className="text-xs text-gray-300">{categoriesData.find(c=>c.id === post.category)?.name || 'Uncategorized'} - {formatDate(post.publishedAt)}</p>
                  </div>
                  <div className="space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleEditPost(post)}><Edit className="w-3 h-3 mr-1" /> Edit</Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDeletePost(post.id)}><Trash2 className="w-3 h-3 mr-1" /> Delete</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'categories':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">Manage Categories</h3>
            <div className="space-y-2">
              {categoriesData.filter(c => c.id !== 'all').map(cat => (
                <div key={cat.id} className="glass-effect p-3 rounded-md flex justify-between items-center">
                  <p className="font-medium">{cat.name}</p>
                  <div className="space-x-2">
                     <Button variant="outline" size="sm" onClick={() => toast({title: "Edit Category", description: "Category editing coming soon!"})}><Edit className="w-3 h-3 mr-1" /> Edit</Button>
                  </div>
                </div>
              ))}
            </div>
             <Button className="mt-4" onClick={() => toast({title: "New Category", description: "Category creation coming soon!"})}>
                <PlusCircle className="w-4 h-4 mr-2" /> Create New Category
              </Button>
          </div>
        );
      case 'users':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">Manage Users</h3>
             <div className="space-y-3">
              {mockUsers.map(user => (
                <div key={user.id} className="glass-effect p-3 rounded-md flex justify-between items-center">
                  <div>
                    <p className="font-medium">{user.name} ({user.role})</p>
                    <p className="text-xs text-gray-300">{user.email} - Joined: {formatDate(user.joined)}</p>
                  </div>
                   <Button variant="outline" size="sm" onClick={() => toast({title: "Manage User", description: "User management coming soon!"})}><Settings className="w-3 h-3 mr-1" /> Manage</Button>
                </div>
              ))}
            </div>
          </div>
        );
      case 'settings':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-2">General Settings</h3>
            <div className="glass-effect rounded-lg p-4 mb-6">
                <h4 className="font-semibold mb-2">RSS Sources</h4>
                <div className="space-y-2">
                  {rssSources.map((source, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span>{source.name}</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        source.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                      }`}>
                        {source.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="glass-effect rounded-lg p-4 mb-6">
                <h4 className="font-semibold mb-2">Content Stats</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Total Articles:</span>
                    <span className="font-bold">{news.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Featured:</span>
                    <span className="font-bold">{featuredCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Updated:</span>
                    <span className="font-bold">{formatDate(lastUpdated.toISOString())}</span>
                  </div>
                </div>
              </div>
              <div className="glass-effect rounded-lg p-4">
                <h4 className="font-semibold mb-2">AI Processing</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Auto-categorization:</span>
                    <span className="text-green-400 font-bold">Active</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Content Summarization:</span>
                    <span className="text-green-400 font-bold">Active</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duplicate Detection:</span>
                    <span className="text-green-400 font-bold">Active</span>
                  </div>
                </div>
              </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 text-white shadow-xl"
          >
            <div className="container mx-auto px-4 py-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center">
                  <Settings className="w-6 h-6 mr-3" />
                  Admin Panel
                </h2>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6">
                <nav className="md:w-1/4 space-y-2">
                  {[
                    { id: 'posts', label: 'Manage Posts', icon: Newspaper },
                    { id: 'categories', label: 'Manage Categories', icon: Tag },
                    { id: 'users', label: 'Manage Users', icon: Users },
                    { id: 'settings', label: 'General Settings', icon: ListChecks },
                  ].map(tab => (
                    <Button
                      key={tab.id}
                      variant={activeTab === tab.id ? 'secondary' : 'ghost'}
                      className={`w-full justify-start text-left ${activeTab === tab.id ? 'bg-white/20 text-white' : 'hover:bg-white/10 hover:text-white text-indigo-100'}`}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      <tab.icon className="w-4 h-4 mr-2" />
                      {tab.label}
                    </Button>
                  ))}
                </nav>
                <div className="md:w-3/4 glass-effect rounded-lg p-6 min-h-[300px]">
                  {renderContent()}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Dialog open={showPostModal} onOpenChange={setShowPostModal}>
        <DialogContent className="sm:max-w-[600px] bg-white text-gray-900">
          <DialogHeader>
            <DialogTitle>{editingPost ? 'Edit Post' : 'Create New Post'}</DialogTitle>
            <DialogDescription>
              {editingPost ? 'Update the details of the news post.' : 'Fill in the details for the new news post.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">Title</Label>
              <Input id="title" name="title" value={postForm.title} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="summary" className="text-right">Summary</Label>
              <Textarea id="summary" name="summary" value={postForm.summary} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">Category</Label>
              <select id="category" name="category" value={postForm.category} onChange={handleInputChange} className="col-span-3 p-2 border rounded-md">
                <option value="">Select Category</option>
                {categoriesData.filter(c => c.id !== 'all').map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="content" className="text-right">Full Content</Label>
              <Textarea id="content" name="content" value={postForm.content} onChange={handleInputChange} className="col-span-3 h-32" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tags" className="text-right">Tags</Label>
              <Input id="tags" name="tags" value={postForm.tags} onChange={handleTagChange} className="col-span-3" placeholder="e.g., AI, Tech, Innovation" />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="imageUrl" className="text-right">Image URL</Label>
              <Input id="imageUrl" name="imageUrl" value={postForm.imageUrl} onChange={handleInputChange} className="col-span-3" placeholder="Optional image URL" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPostModal(false)}>Cancel</Button>
            <Button onClick={handleSubmitPost}>{editingPost ? 'Save Changes' : 'Create Post'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AdminDashboard;