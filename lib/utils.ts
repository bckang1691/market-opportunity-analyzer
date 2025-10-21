import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Utility function for merging Tailwind CSS classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Calculate ROI Score using the formula: (revenue × marketSize) / devTime
export function calculateROI(
  revenue: number,
  marketSize: number,
  devTime: number
): number {
  if (devTime === 0) return 0
  return Math.round((revenue * marketSize) / devTime)
}

// Get ROI color based on score
export function getROIColor(roiScore: number): string {
  if (roiScore >= 100) return 'text-green-600 dark:text-green-400'
  if (roiScore >= 50) return 'text-yellow-600 dark:text-yellow-400'
  return 'text-red-600 dark:text-red-400'
}

// Get ROI badge color
export function getROIBadgeColor(roiScore: number): string {
  if (roiScore >= 100)
    return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
  if (roiScore >= 50)
    return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
  return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
}

// Format currency
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

// Format number with K/M suffix
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

// Get category color
export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    Productivity: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    Marketing: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
    'Developer Tools':
      'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400',
    'E-commerce': 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400',
    SaaS: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400',
    'AI/ML': 'bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-400',
    'Social Media': 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400',
    Finance: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
    Education: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
    Health: 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400',
  }
  return colors[category] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
}

// Get source icon
export function getSourceIcon(source: string): string {
  const icons: Record<string, string> = {
    chrome: '🔌',
    reddit: '🚀',
    producthunt: '🎯',
  }
  return icons[source] || '💡'
}
