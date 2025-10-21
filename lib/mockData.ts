import { Opportunity, Platform } from './types'
import { calculateROI, calculateCompetitionScore, calculateDemandScore, getCompetitionLevel, calculateMonthlyRevenue } from './roiCalculator'

// Mock data for Chrome Extensions
export const chromeExtensionsData: Opportunity[] = [
  {
    id: 'chrome-1',
    title: 'LinkedIn Auto-Connect Pro',
    description:
      'Automate LinkedIn connection requests with personalized messages. Save 10+ hours per week on networking.',
    revenue: 2500,
    devTime: 5,
    marketSize: 8,
    category: 'Marketing',
    source: 'chrome',
    roiScore: 0,
    users: 15000,
    tags: ['LinkedIn', 'Automation', 'Networking', 'B2B'],
  },
  {
    id: 'chrome-2',
    title: 'GitHub Star Manager',
    description:
      'Organize and categorize your GitHub stars with tags, notes, and search functionality.',
    revenue: 1800,
    devTime: 4,
    marketSize: 7,
    category: 'Developer Tools',
    source: 'chrome',
    roiScore: 0,
    users: 8500,
    tags: ['GitHub', 'Developer', 'Productivity'],
  },
  {
    id: 'chrome-3',
    title: 'Price Tracker for E-commerce',
    description:
      'Track prices across Amazon, eBay, and other sites. Get alerts when prices drop.',
    revenue: 3200,
    devTime: 6,
    marketSize: 9,
    category: 'E-commerce',
    source: 'chrome',
    roiScore: 0,
    users: 45000,
    tags: ['Shopping', 'Price Tracking', 'Savings'],
  },
  {
    id: 'chrome-4',
    title: 'Meeting Notes AI',
    description:
      'Auto-generate meeting notes from Google Meet with AI-powered summaries and action items.',
    revenue: 4500,
    devTime: 8,
    marketSize: 9,
    category: 'AI/ML',
    source: 'chrome',
    roiScore: 0,
    users: 22000,
    tags: ['AI', 'Meetings', 'Productivity', 'Google Meet'],
  },
]

// Mock data for Reddit Trends
export const redditTrendsData: Opportunity[] = [
  {
    id: 'reddit-1',
    title: 'Notion Invoice Generator',
    description:
      'Pain point: Freelancers struggle to create professional invoices in Notion. Generate beautiful invoices directly from Notion databases.',
    revenue: 1200,
    devTime: 3,
    marketSize: 6,
    category: 'Productivity',
    source: 'reddit',
    roiScore: 0,
    subscribers: 125000,
    painPoint: 'No easy way to generate invoices from Notion',
    tags: ['Notion', 'Invoicing', 'Freelance'],
  },
  {
    id: 'reddit-2',
    title: 'Subreddit Analytics Dashboard',
    description:
      'Pain point: r/SaaS users want to track their subreddit growth. Comprehensive analytics for subreddit moderators.',
    revenue: 1800,
    devTime: 5,
    marketSize: 7,
    category: 'Marketing',
    source: 'reddit',
    roiScore: 0,
    subscribers: 89000,
    painPoint: 'Limited analytics for subreddit growth',
    tags: ['Reddit', 'Analytics', 'Community'],
  },
  {
    id: 'reddit-3',
    title: 'Stripe Payment Link Builder',
    description:
      'Pain point: r/Entrepreneur users find Stripe dashboard confusing. Visual builder for creating beautiful payment links.',
    revenue: 2200,
    devTime: 4,
    marketSize: 8,
    category: 'Finance',
    source: 'reddit',
    roiScore: 0,
    subscribers: 3200000,
    painPoint: 'Stripe payment links are hard to customize',
    tags: ['Stripe', 'Payments', 'No-code'],
  },
  {
    id: 'reddit-4',
    title: 'Content Repurposing Tool',
    description:
      'Pain point: Creators waste time reformatting content. Turn blog posts into Twitter threads, LinkedIn posts, and more.',
    revenue: 2800,
    devTime: 6,
    marketSize: 8,
    category: 'Social Media',
    source: 'reddit',
    roiScore: 0,
    subscribers: 450000,
    painPoint: 'Manual content repurposing takes too long',
    tags: ['Content', 'Social Media', 'Automation'],
  },
]

// Mock data for Product Hunt
export const productHuntData: Opportunity[] = [
  {
    id: 'ph-1',
    title: 'AI Email Categorizer',
    description:
      'Automatically categorize and prioritize emails using AI. Integrates with Gmail and Outlook.',
    revenue: 3000,
    devTime: 7,
    marketSize: 9,
    category: 'AI/ML',
    source: 'producthunt',
    roiScore: 0,
    upvotes: 1250,
    tags: ['AI', 'Email', 'Productivity', 'Gmail'],
  },
  {
    id: 'ph-2',
    title: 'Micro-SaaS Idea Validator',
    description:
      'Validate your SaaS idea before building. Get market insights, competition analysis, and revenue estimates.',
    revenue: 1500,
    devTime: 5,
    marketSize: 7,
    category: 'SaaS',
    source: 'producthunt',
    roiScore: 0,
    upvotes: 890,
    tags: ['Validation', 'Market Research', 'Startup'],
  },
  {
    id: 'ph-3',
    title: 'Screenshot to Code',
    description:
      'Upload a screenshot and get clean HTML/CSS code. Perfect for developers and designers.',
    revenue: 3500,
    devTime: 9,
    marketSize: 8,
    category: 'Developer Tools',
    source: 'producthunt',
    roiScore: 0,
    upvotes: 2100,
    tags: ['AI', 'Developer', 'Design', 'Code Generation'],
  },
  {
    id: 'ph-4',
    title: 'Focus Timer with Spotify',
    description:
      'Pomodoro timer that automatically plays focus music from Spotify. Track your productivity streaks.',
    revenue: 1000,
    devTime: 3,
    marketSize: 6,
    category: 'Productivity',
    source: 'producthunt',
    roiScore: 0,
    upvotes: 675,
    tags: ['Pomodoro', 'Spotify', 'Focus', 'Music'],
  },
  {
    id: 'ph-5',
    title: 'Health Habit Tracker for Devs',
    description:
      'Track water intake, posture breaks, and eye rest. Gamified health tracking for developers.',
    revenue: 800,
    devTime: 4,
    marketSize: 5,
    category: 'Health',
    source: 'producthunt',
    roiScore: 0,
    upvotes: 540,
    tags: ['Health', 'Habits', 'Wellness', 'Developer'],
  },
]

// Calculate ROI for all opportunities
const allOpportunities = [
  ...chromeExtensionsData,
  ...redditTrendsData,
  ...productHuntData,
].map((opp) => ({
  ...opp,
  roiScore: calculateROI(opp.revenue, opp.marketSize, opp.devTime),
}))

export { allOpportunities }

// Export combined mock data
export const mockOpportunities: Opportunity[] = allOpportunities
