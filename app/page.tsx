'use client'

import { useState, useEffect, useMemo } from 'react'
import { Opportunity, FilterOptions, ChartData } from '@/lib/types'
import { mockOpportunities } from '@/lib/mockData'
import OpportunityCard from '@/components/OpportunityCard'
import FilterPanel from '@/components/FilterPanel'
import TrendChart from '@/components/TrendChart'
import DarkModeToggle from '@/components/DarkModeToggle'
import { TrendingUp, DollarSign, Target, Rocket, Loader2 } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

export default function Home() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filters, setFilters] = useState<FilterOptions>({
    revenueRange: [0, 5000],
    devTimeMax: null,
    categories: [],
    sortBy: 'roi',
    sortOrder: 'desc',
  })

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setOpportunities(mockOpportunities)
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  // Filter and sort opportunities
  const filteredOpportunities = useMemo(() => {
    let filtered = opportunities.filter((opp) => {
      // Revenue range filter
      if (opp.revenue < filters.revenueRange[0] || opp.revenue > filters.revenueRange[1]) {
        return false
      }

      // Dev time filter
      if (filters.devTimeMax && opp.devTime > filters.devTimeMax) {
        return false
      }

      // Category filter
      if (filters.categories.length > 0 && !filters.categories.includes(opp.category)) {
        return false
      }

      return true
    })

    // Sort (type-safe mapping)
    filtered.sort((a, b) => {
      const getKeyValue = (item: Opportunity) => {
        switch (filters.sortBy) {
          case 'roi':
            return item.roiScore
          case 'revenue':
            return item.revenue
          case 'devTime':
            return item.devTime
          case 'marketSize':
            return item.marketSize
          default:
            return 0
        }
      }

      const aValue = getKeyValue(a)
      const bValue = getKeyValue(b)

      if (filters.sortOrder === 'desc') {
        return bValue - aValue
      } else {
        return aValue - bValue
      }
    })

    return filtered
  }, [opportunities, filters])

  // Calculate statistics
  const stats = useMemo(() => {
    if (filteredOpportunities.length === 0) {
      return {
        totalOpportunities: 0,
        avgROI: 0,
        bestCategory: 'N/A',
        totalRevenue: 0,
      }
    }

    const avgROI = Math.round(
      filteredOpportunities.reduce((sum, opp) => sum + opp.roiScore, 0) /
        filteredOpportunities.length
    )

    const categoryScores: Record<string, number> = {}
    filteredOpportunities.forEach((opp) => {
      categoryScores[opp.category] = (categoryScores[opp.category] || 0) + opp.roiScore
    })

    const bestCategory =
      Object.entries(categoryScores).sort(([, a], [, b]) => b - a)[0]?.[0] || 'N/A'

    const totalRevenue = filteredOpportunities.reduce((sum, opp) => sum + opp.revenue, 0)

    return {
      totalOpportunities: filteredOpportunities.length,
      avgROI,
      bestCategory,
      totalRevenue,
    }
  }, [filteredOpportunities])

  // Generate chart data
  const chartData = useMemo((): ChartData[] => {
    const categoryData: Record<string, { roi: number; count: number }> = {}

    filteredOpportunities.forEach((opp) => {
      if (!categoryData[opp.category]) {
        categoryData[opp.category] = { roi: 0, count: 0 }
      }
      categoryData[opp.category].roi += opp.roiScore
      categoryData[opp.category].count += 1
    })

    return Object.entries(categoryData)
      .map(([name, data]) => ({
        name,
        roi: Math.round(data.roi / data.count),
        opportunities: data.count,
      }))
      .sort((a, b) => b.roi - a.roi)
      .slice(0, 6)
  }, [filteredOpportunities])

  return (
    <main className="container mx-auto px-4 py-8 md:py-12">
      {/* Header */}
      <header className="mb-12 text-center">
        <div className="mb-6 flex items-center justify-center gap-4">
          <div className="animate-fade-in">
            <h1 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent md:text-6xl dark:from-blue-400 dark:to-purple-400">
              Market Opportunity Analyzer
            </h1>
          </div>
          <div className="animate-scale-in">
            <DarkModeToggle />
          </div>
        </div>
        <p className="animate-slide-up text-lg text-gray-600 md:text-xl dark:text-gray-300">
          💡 Find Your Next <span className="font-bold text-green-600 dark:text-green-400">$10K Side Project</span> in Minutes
        </p>
        <p className="mt-2 animate-slide-up text-sm text-gray-500 animation-delay-100 dark:text-gray-400">
          실시간 ROI 분석으로 최고의 사이드 프로젝트 기회를 발견하세요
        </p>
      </header>

      {/* Stats Cards */}
      {!isLoading && (
        <div className="mb-8 grid gap-4 md:grid-cols-3 animate-fade-in">
          <div className="glass glass-dark group relative overflow-hidden rounded-xl p-6 transition-all hover:scale-105">
            <div className="absolute right-4 top-4 opacity-10 transition-opacity group-hover:opacity-20">
              <Rocket className="h-16 w-16" />
            </div>
            <div className="relative">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Target className="h-4 w-4" />
                <span>전체 기회</span>
              </div>
              <div className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                {stats.totalOpportunities}
              </div>
              <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                총 {opportunities.length}개 중
              </div>
            </div>
          </div>

          <div className="glass glass-dark group relative overflow-hidden rounded-xl p-6 transition-all hover:scale-105">
            <div className="absolute right-4 top-4 opacity-10 transition-opacity group-hover:opacity-20">
              <TrendingUp className="h-16 w-16" />
            </div>
            <div className="relative">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <TrendingUp className="h-4 w-4" />
                <span>평균 ROI</span>
              </div>
              <div className="mt-2 text-3xl font-bold text-blue-600 dark:text-blue-400">
                {stats.avgROI}
              </div>
              <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                점수 기준
              </div>
            </div>
          </div>

          <div className="glass glass-dark group relative overflow-hidden rounded-xl p-6 transition-all hover:scale-105">
            <div className="absolute right-4 top-4 opacity-10 transition-opacity group-hover:opacity-20">
              <DollarSign className="h-16 w-16" />
            </div>
            <div className="relative">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <DollarSign className="h-4 w-4" />
                <span>최고 카테고리</span>
              </div>
              <div className="mt-2 text-2xl font-bold text-purple-600 dark:text-purple-400">
                {stats.bestCategory}
              </div>
              <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                ROI 기준 최고
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chart */}
      {!isLoading && filteredOpportunities.length > 0 && (
        <div className="mb-8 animate-fade-in">
          <TrendChart data={chartData} />
        </div>
      )}

      {/* Main Content */}
      <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
        {/* Filter Panel */}
        <aside className="animate-slide-up animation-delay-200">
          <div className="sticky top-4">
            <FilterPanel filters={filters} onFiltersChange={setFilters} />
          </div>
        </aside>

        {/* Opportunities Grid */}
        <section>
          {isLoading ? (
            <div className="flex min-h-[400px] items-center justify-center">
              <div className="text-center">
                <Loader2 className="mx-auto h-12 w-12 animate-spin text-blue-600 dark:text-blue-400" />
                <p className="mt-4 text-gray-600 dark:text-gray-400">기회를 분석하는 중...</p>
              </div>
            </div>
          ) : filteredOpportunities.length === 0 ? (
            <div className="glass glass-dark flex min-h-[400px] flex-col items-center justify-center rounded-xl p-12 text-center">
              <Target className="mb-4 h-16 w-16 text-gray-400 dark:text-gray-600" />
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                필터에 맞는 기회가 없습니다
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                필터 조건을 조정해보세요
              </p>
            </div>
          ) : (
            <>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {filteredOpportunities.length}개의 기회 발견
                </h2>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  예상 총 수익: <span className="font-semibold text-green-600 dark:text-green-400">{formatCurrency(stats.totalRevenue)}</span>/월
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {filteredOpportunities.map((opportunity, index) => (
                  <div
                    key={opportunity.id}
                    className="animate-scale-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <OpportunityCard opportunity={opportunity} />
                  </div>
                ))}
              </div>
            </>
          )}
        </section>
      </div>

      {/* Footer */}
      <footer className="mt-16 border-t border-gray-200 pt-8 text-center dark:border-gray-800">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          💡 ROI 계산식: (월 수익 × 시장 크기) ÷ 개발 시간
        </p>
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-500">
          Market Opportunity Analyzer © 2025 | Made with ❤️ for entrepreneurs
        </p>
      </footer>
    </main>
  )
}
