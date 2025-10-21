import { NextResponse } from 'next/server'
import { productHuntData } from '@/lib/mockData'
import { calculateROI } from '@/lib/utils'

export async function GET() {
  try {
    // Calculate ROI for each opportunity
    const opportunities = productHuntData.map((opp) => ({
      ...opp,
      roiScore: calculateROI(opp.revenue, opp.marketSize, opp.devTime),
    }))

    // Sort by upvotes (trending)
    const sorted = opportunities.sort((a, b) => (b.upvotes || 0) - (a.upvotes || 0))

    return NextResponse.json({
      success: true,
      data: sorted,
      count: sorted.length,
      totalUpvotes: sorted.reduce((sum, opp) => sum + (opp.upvotes || 0), 0),
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch Product Hunt opportunities',
      },
      { status: 500 }
    )
  }
}
