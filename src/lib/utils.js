import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Globe } from 'lucide-react';
import { categoriesData } from '@/data/newsData';

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const getCategoryIcon = (categoryId) => {
  const category = categoriesData.find(cat => cat.id === categoryId);
  return category ? category.icon : Globe;
};

export const getCategoryColor = (categoryId) => {
  const category = categoriesData.find(cat => cat.id === categoryId);
  return category ? category.color : 'from-gray-500 to-gray-600';
};