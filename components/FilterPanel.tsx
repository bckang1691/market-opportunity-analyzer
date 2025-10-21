'use client'

import { FilterOptions, Category } from '@/lib/types'
import { formatCurrency } from '@/lib/utils'
import { Filter, X, ArrowUpDown } from 'lucide-react'
import { useState } from 'react'

interface FilterPanelProps {
  filters: FilterOptions
  onFiltersChange: (filters: FilterOptions) => void
}

const categories: Category[] = [
  'Productivity',
  'Marketing',
  'Developer Tools',
  'E-commerce',
  'SaaS',
  'AI/ML',
  'Social Media',
  'Finance',
  'Education',
  'Health',
]

const devTimeOptions = [
  { label: '전체', value: null },
  { label: '3일 이하', value: 3 },
  { label: '5일 이하', value: 5 },
  { label: '7일 이하', value: 7 },
  { label: '10일 이하', value: 10 },
]

const sortOptions = [
  { label: 'ROI 점수', value: 'roi' as const },
  { label: '월 수익', value: 'revenue' as const },
  { label: '개발 시간', value: 'devTime' as const },
  { label: '시장 크기', value: 'marketSize' as const },
]

export default function FilterPanel({ filters, onFiltersChange }: FilterPanelProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  const handleRevenueChange = (index: 0 | 1, value: number) => {
    const newRange: [number, number] = [...filters.revenueRange]
    newRange[index] = value
    onFiltersChange({ ...filters, revenueRange: newRange })
  }

  const handleCategoryToggle = (category: Category) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category]
    onFiltersChange({ ...filters, categories: newCategories })
  }

  const handleDevTimeChange = (value: number | null) => {
    onFiltersChange({ ...filters, devTimeMax: value })
  }

  const handleSortChange = (sortBy: FilterOptions['sortBy']) => {
    onFiltersChange({ ...filters, sortBy })
  }

  const handleSortOrderToggle = () => {
    onFiltersChange({
      ...filters,
      sortOrder: filters.sortOrder === 'desc' ? 'asc' : 'desc',
    })
  }

  const handleReset = () => {
    onFiltersChange({
      revenueRange: [0, 5000],
      devTimeMax: null,
      categories: [],
      sortBy: 'roi',
      sortOrder: 'desc',
    })
  }

  const activeFiltersCount =
    (filters.revenueRange[0] > 0 || filters.revenueRange[1] < 5000 ? 1 : 0) +
    (filters.devTimeMax ? 1 : 0) +
    filters.categories.length

  return (
    <div className="rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/80">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">필터</h2>
          {activeFiltersCount > 0 && (
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
              {activeFiltersCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {activeFiltersCount > 0 && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
              aria-label="Reset filters"
            >
              <X className="h-4 w-4" />
              초기화
            </button>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="rounded-lg p-1.5 text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
            aria-label={isExpanded ? 'Collapse filters' : 'Expand filters'}
          >
            <Filter className={`h-5 w-5 transition-transform ${isExpanded ? 'rotate-0' : 'rotate-180'}`} />
          </button>
        </div>
      </div>

      {/* Filter Content */}
      {isExpanded && (
        <div className="space-y-6 p-4">
          {/* Sort By */}
          <div>
            <label className="mb-3 flex items-center justify-between text-sm font-medium text-gray-700 dark:text-gray-300">
              <span>정렬 기준</span>
              <button
                onClick={handleSortOrderToggle}
                className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20"
                aria-label={`Sort order: ${filters.sortOrder === 'desc' ? 'Descending' : 'Ascending'}`}
              >
                <ArrowUpDown className="h-3 w-3" />
                {filters.sortOrder === 'desc' ? '내림차순' : '오름차순'}
              </button>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSortChange(option.value)}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    filters.sortBy === option.value
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Revenue Range */}
          <div>
            <label className="mb-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
              월 수익 범위
            </label>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600 dark:text-gray-400">최소:</span>
                <input
                  type="range"
                  min="0"
                  max="5000"
                  step="100"
                  value={filters.revenueRange[0]}
                  onChange={(e) => handleRevenueChange(0, parseInt(e.target.value))}
                  className="flex-1"
                  aria-label="Minimum revenue"
                />
                <span className="min-w-[80px] text-sm font-medium text-gray-900 dark:text-white">
                  {formatCurrency(filters.revenueRange[0])}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600 dark:text-gray-400">최대:</span>
                <input
                  type="range"
                  min="0"
                  max="5000"
                  step="100"
                  value={filters.revenueRange[1]}
                  onChange={(e) => handleRevenueChange(1, parseInt(e.target.value))}
                  className="flex-1"
                  aria-label="Maximum revenue"
                />
                <span className="min-w-[80px] text-sm font-medium text-gray-900 dark:text-white">
                  {formatCurrency(filters.revenueRange[1])}
                </span>
              </div>
            </div>
          </div>

          {/* Dev Time */}
          <div>
            <label className="mb-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
              개발 시간
            </label>
            <div className="grid grid-cols-3 gap-2">
              {devTimeOptions.map((option) => (
                <button
                  key={option.label}
                  onClick={() => handleDevTimeChange(option.value)}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    filters.devTimeMax === option.value
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <label className="mb-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
              카테고리
              {filters.categories.length > 0 && (
                <span className="ml-2 text-xs text-gray-500">
                  ({filters.categories.length} 선택됨)
                </span>
              )}
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryToggle(category)}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                    filters.categories.includes(category)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
