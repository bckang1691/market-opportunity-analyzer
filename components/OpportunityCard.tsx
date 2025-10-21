'use client'

import { Opportunity } from '@/lib/types'
import {
  formatCurrency,
  formatNumber,
  getROIBadgeColor,
  getCategoryColor,
  getSourceIcon,
} from '@/lib/utils'
import {
  TrendingUp,
  Clock,
  DollarSign,
  Users,
  ThumbsUp,
  MessageSquare,
  Target,
} from 'lucide-react'

interface OpportunityCardProps {
  opportunity: Opportunity
}

export default function OpportunityCard({ opportunity }: OpportunityCardProps) {
  const {
    title,
    description,
    revenue,
    devTime,
    marketSize,
    category,
    source,
    roiScore,
    upvotes,
    subscribers,
    users,
    painPoint,
    tags,
  } = opportunity

  const sourceIcon = getSourceIcon(source)

  return (
    <article
      className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 dark:border-gray-800 dark:bg-gray-900/80"
      aria-label={`Opportunity: ${title}`}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-5" />

      <div className="relative p-6">
        {/* Header */}
        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="mb-2 flex items-center gap-2">
              <span className="text-2xl" role="img" aria-label={`${source} source`}>
                {sourceIcon}
              </span>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
            </div>
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${getCategoryColor(category)}`}
            >
              {category}
            </span>
          </div>

          {/* ROI Badge */}
          <div className="flex flex-col items-end gap-1">
            <span
              className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-bold ${getROIBadgeColor(roiScore)}`}
              aria-label={`ROI Score: ${roiScore}`}
            >
              <TrendingUp className="h-4 w-4" />
              {roiScore}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">ROI</span>
          </div>
        </div>

        {/* Description */}
        <p className="mb-4 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
          {description}
        </p>

        {/* Pain Point (for Reddit) */}
        {painPoint && (
          <div className="mb-4 rounded-lg bg-orange-50 p-3 dark:bg-orange-900/20">
            <p className="text-xs font-medium text-orange-800 dark:text-orange-300">
              💡 {painPoint}
            </p>
          </div>
        )}

        {/* Stats Grid */}
        <div className="mb-4 grid grid-cols-2 gap-3">
          {/* Revenue */}
          <div className="flex items-center gap-2 rounded-lg bg-green-50 p-3 dark:bg-green-900/20">
            <DollarSign className="h-4 w-4 text-green-600 dark:text-green-400" />
            <div>
              <div className="text-lg font-bold text-green-700 dark:text-green-300">
                {formatCurrency(revenue)}
              </div>
              <div className="text-xs text-green-600 dark:text-green-400">월 수익</div>
            </div>
          </div>

          {/* Dev Time */}
          <div className="flex items-center gap-2 rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
            <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <div>
              <div className="text-lg font-bold text-blue-700 dark:text-blue-300">
                {devTime}일
              </div>
              <div className="text-xs text-blue-600 dark:text-blue-400">개발 기간</div>
            </div>
          </div>

          {/* Market Size */}
          <div className="flex items-center gap-2 rounded-lg bg-purple-50 p-3 dark:bg-purple-900/20">
            <Target className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            <div>
              <div className="text-lg font-bold text-purple-700 dark:text-purple-300">
                {marketSize}/10
              </div>
              <div className="text-xs text-purple-600 dark:text-purple-400">시장 크기</div>
            </div>
          </div>

          {/* Source-specific metric */}
          <div className="flex items-center gap-2 rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
            {source === 'chrome' && users && (
              <>
                <Users className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                <div>
                  <div className="text-lg font-bold text-gray-700 dark:text-gray-300">
                    {formatNumber(users)}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">사용자</div>
                </div>
              </>
            )}
            {source === 'reddit' && subscribers && (
              <>
                <MessageSquare className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                <div>
                  <div className="text-lg font-bold text-gray-700 dark:text-gray-300">
                    {formatNumber(subscribers)}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">구독자</div>
                </div>
              </>
            )}
            {source === 'producthunt' && upvotes && (
              <>
                <ThumbsUp className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                <div>
                  <div className="text-lg font-bold text-gray-700 dark:text-gray-300">
                    {formatNumber(upvotes)}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">추천</div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}
