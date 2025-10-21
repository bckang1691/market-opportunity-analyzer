import { NextResponse } from 'next/server'
import { redditTrendsData } from '@/lib/mockData'
import { calculateROI } from '@/lib/utils'

export async function GET() {
  try {
    // Calculate ROI for each opportunity
    const opportunities = redditTrendsData.map((opp) => ({
      ...opp,
      roiScore: calculateROI(opp.revenue, opp.marketSize, opp.devTime),
    }))

    return NextResponse.json({
      success: true,
      data: opportunities,
      count: opportunities.length,
      sources: ['r/SaaS', 'r/Entrepreneur', 'r/microsaas'],
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch Reddit trend opportunities',
      },
      { status: 500 }
    )
  }
}
