// TypeScript interfaces for the Freelance Market Opportunity Analyzer

export type Platform = 'fiverr' | 'upwork' | 'kmong' | 'freelancer' | 'producthunt' | 'reddit' | 'chrome'

export type Competition = 'low' | 'medium' | 'high'

export type TrendDirection = 'up' | 'stable' | 'down'

export type Category =
  | 'Productivity'
  | 'Marketing'
  | 'Developer Tools'
  | 'E-commerce'
  | 'SaaS'
  | 'AI/ML'
  | 'Social Media'
  | 'Finance'
  | 'Education'
  | 'Health'
  | 'Automation'
  | 'Design'

// Platform-specific data structures
export interface FiverrData {
  gigCount: number
  averagePrice: number
  ordersPerMonth: number
  sellerCount: number
  topSellerRevenue: number
}

export interface UpworkData {
  jobPostings: number
  averageRate: number // Hourly or project rate
  proposalCount: number
  hireRate: number // Percentage
}

export interface KmongData {
  serviceCount: number
  averagePrice: number // in KRW
  ordersPerMonth: number
  competitionLevel: Competition
}

export interface FreelancerData {
  projectCount: number
  averageBudget: number
  bidCount: number
  completionRate: number
}

export interface ProductHuntData {
  upvotes: number
  comments: number
  rank: number
}

export interface RedditData {
  subscribers: number
  painPoint: string
  postCount: number
  sentiment: 'positive' | 'neutral' | 'negative'
}

export interface ChromeData {
  users: number
  rating: number
  reviews: number
}

// Main Opportunity interface
export interface Opportunity {
  id: string
  title: string
  description: string
  platforms: Platform[] // Can be found on multiple platforms
  averagePrice: number // USD
  monthlyRevenue: number // Estimated monthly revenue potential
  devTime: number // Development time in days
  competition: Competition
  competitionScore: number // 1-100
  demandScore: number // 1-100
  trendDirection: TrendDirection
  roiScore: number // Calculated ROI
  category: Category
  tags: string[]
  
  // Platform-specific data
  dataPoints: {
    fiverr?: FiverrData
    upwork?: UpworkData
    kmong?: KmongData
    freelancer?: FreelancerData
    producthunt?: ProductHuntData
    reddit?: RedditData
    chrome?: ChromeData
  }
  
  // Additional fields
  techStack?: string[]
  actionPlan?: string
  createdAt: string
  updatedAt: string
}

export interface FilterOptions {
  platforms: Platform[] // Multi-select platforms
  priceRange: [number, number] // Min and max price
  roiThreshold: number // Minimum ROI score
  competitionLevels: Competition[] // Filter by competition
  devTimeMax: number | null // Maximum development time in days
  categories: Category[]
  sortBy: 'roi' | 'price' | 'demand' | 'competition' | 'revenue'
  sortOrder: 'asc' | 'desc'
}

export interface StatCard {
  title: string
  value: string | number
  change?: string
  icon: string
}

export interface ChartData {
  name: string
  roi: number
  opportunities: number
}
