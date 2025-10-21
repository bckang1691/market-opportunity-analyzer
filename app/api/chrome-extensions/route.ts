import { NextResponse } from 'next/server'
import { chromeExtensionsData } from '@/lib/mockData'
import { calculateROI } from '@/lib/utils'

export async function GET() {
  try {
    // Calculate ROI for each opportunity
    const opportunities = chromeExtensionsData.map((opp) => ({
      ...opp,
      roiScore: calculateROI(opp.revenue, opp.marketSize, opp.devTime),
    }))

    return NextResponse.json({
      success: true,
      data: opportunities,
      count: opportunities.length,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch Chrome extension opportunities',
      },
      { status: 500 }
    )
  }
}
