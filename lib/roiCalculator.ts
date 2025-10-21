import { Competition, Opportunity } from './types'

/**
 * Calculate ROI Score with competition factor
 * 
 * ROI Formula:
 * ROI = (Monthly Revenue Potential) / (Development Cost)
 * 
 * Monthly Revenue = averagePrice × demandScore × 30 (days)
 * Development Cost = devTime × dailyOpportunityCost × competitionMultiplier
 * 
 * Assumptions:
 * - Daily opportunity cost: $200/day
 * - Competition multiplier: low=1, medium=1.5, high=2.5
 * 
 * @param averagePrice - Average price per order/project in USD
 * @param demandScore - Demand score (1-100)
 * @param devTime - Development time in days
 * @param competition - Competition level
 * @returns ROI score
 */
export function calculateROI(
  averagePrice: number,
  demandScore: number,
  devTime: number,
  competition: Competition
): number {
  if (devTime === 0) return 0

  // Competition multipliers
  const competitionMultiplier = {
    low: 1,
    medium: 1.5,
    high: 2.5,
  }[competition]

  // Daily opportunity cost (what you could earn doing other work)
  const dailyOpportunityCost = 200

  // Monthly revenue potential
  // demandScore represents how many orders/projects you could get per month
  const monthlyRevenue = averagePrice * (demandScore / 10)

  // Development cost adjusted by competition
  const developmentCost = devTime * dailyOpportunityCost * competitionMultiplier

  // Calculate ROI
  const roi = (monthlyRevenue / developmentCost) * 100

  return Math.round(roi)
}

/**
 * Calculate competition score based on platform-specific metrics
 */
export function calculateCompetitionScore(opportunity: Opportunity): number {
  let totalScore = 0
  let platformCount = 0

  const { dataPoints } = opportunity

  // Fiverr: More sellers = higher competition
  if (dataPoints.fiverr) {
    const { sellerCount, gigCount } = dataPoints.fiverr
    const fiverrScore = Math.min(100, (sellerCount / gigCount) * 50)
    totalScore += fiverrScore
    platformCount++
  }

  // Upwork: More proposals = higher competition
  if (dataPoints.upwork) {
    const { proposalCount } = dataPoints.upwork
    const upworkScore = Math.min(100, proposalCount / 5)
    totalScore += upworkScore
    platformCount++
  }

  // Kmong: Direct competition level
  if (dataPoints.kmong) {
    const competitionMap = { low: 20, medium: 50, high: 80 }
    totalScore += competitionMap[dataPoints.kmong.competitionLevel]
    platformCount++
  }

  // Freelancer: More bids = higher competition
  if (dataPoints.freelancer) {
    const { bidCount } = dataPoints.freelancer
    const freelancerScore = Math.min(100, bidCount / 3)
    totalScore += freelancerScore
    platformCount++
  }

  // Chrome: High user count = high competition (saturated market)
  if (dataPoints.chrome) {
    const { users } = dataPoints.chrome
    const chromeScore = users > 100000 ? 70 : users > 50000 ? 50 : 30
    totalScore += chromeScore
    platformCount++
  }

  return platformCount > 0 ? Math.round(totalScore / platformCount) : 50
}

/**
 * Calculate demand score based on platform-specific metrics
 */
export function calculateDemandScore(opportunity: Opportunity): number {
  let totalScore = 0
  let platformCount = 0

  const { dataPoints } = opportunity

  // Fiverr: Orders per month
  if (dataPoints.fiverr) {
    const { ordersPerMonth } = dataPoints.fiverr
    const fiverrScore = Math.min(100, (ordersPerMonth / 10) * 10)
    totalScore += fiverrScore
    platformCount++
  }

  // Upwork: Job postings
  if (dataPoints.upwork) {
    const { jobPostings } = dataPoints.upwork
    const upworkScore = Math.min(100, (jobPostings / 5) * 10)
    totalScore += upworkScore
    platformCount++
  }

  // Kmong: Orders per month
  if (dataPoints.kmong) {
    const { ordersPerMonth } = dataPoints.kmong
    const kmongScore = Math.min(100, (ordersPerMonth / 8) * 10)
    totalScore += kmongScore
    platformCount++
  }

  // Freelancer: Project count
  if (dataPoints.freelancer) {
    const { projectCount } = dataPoints.freelancer
    const freelancerScore = Math.min(100, (projectCount / 20) * 10)
    totalScore += freelancerScore
    platformCount++
  }

  // Product Hunt: Upvotes indicate demand
  if (dataPoints.producthunt) {
    const { upvotes } = dataPoints.producthunt
    const phScore = Math.min(100, (upvotes / 20) * 10)
    totalScore += phScore
    platformCount++
  }

  // Reddit: Subscribers indicate market size
  if (dataPoints.reddit) {
    const { subscribers } = dataPoints.reddit
    const redditScore = subscribers > 1000000 ? 90 : subscribers > 500000 ? 70 : 50
    totalScore += redditScore
    platformCount++
  }

  // Chrome: User count indicates demand
  if (dataPoints.chrome) {
    const { users } = dataPoints.chrome
    const chromeScore = Math.min(100, (users / 1000) * 10)
    totalScore += chromeScore
    platformCount++
  }

  return platformCount > 0 ? Math.round(totalScore / platformCount) : 50
}

/**
 * Determine competition level from competition score
 */
export function getCompetitionLevel(score: number): Competition {
  if (score < 40) return 'low'
  if (score < 70) return 'medium'
  return 'high'
}

/**
 * Calculate monthly revenue potential
 */
export function calculateMonthlyRevenue(
  averagePrice: number,
  demandScore: number
): number {
  // Assume you can capture a portion of the demand based on demand score
  // Higher demand score = more potential orders
  const estimatedOrders = demandScore / 10
  return Math.round(averagePrice * estimatedOrders)
}

/**
 * Get ROI color class for UI
 */
export function getROIColorClass(roi: number): string {
  if (roi > 200) return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950'
  if (roi >= 100) return 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-950'
  return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950'
}

/**
 * Get competition color class for UI
 */
export function getCompetitionColorClass(competition: Competition): string {
  const colors = {
    low: 'text-green-600 dark:text-green-400',
    medium: 'text-yellow-600 dark:text-yellow-400',
    high: 'text-red-600 dark:text-red-400',
  }
  return colors[competition]
}
