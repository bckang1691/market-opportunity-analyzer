'use client'

import { ChartData } from '@/lib/types'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface TrendChartProps {
  data: ChartData[]
}

export default function TrendChart({ data }: TrendChartProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white/80 p-6 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/80">
      <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
        ROI vs 기회 분석
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-800" />
          <XAxis
            dataKey="name"
            className="text-xs text-gray-600 dark:text-gray-400"
            tick={{ fill: 'currentColor' }}
          />
          <YAxis
            className="text-xs text-gray-600 dark:text-gray-400"
            tick={{ fill: 'currentColor' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
              padding: '0.75rem',
            }}
            labelStyle={{ color: '#111827', fontWeight: 600 }}
            itemStyle={{ color: '#6b7280' }}
          />
          <Legend
            wrapperStyle={{
              paddingTop: '1rem',
            }}
          />
          <Bar
            dataKey="roi"
            name="평균 ROI"
            fill="#3b82f6"
            radius={[8, 8, 0, 0]}
            className="fill-blue-600 dark:fill-blue-500"
          />
          <Bar
            dataKey="opportunities"
            name="기회 수"
            fill="#8b5cf6"
            radius={[8, 8, 0, 0]}
            className="fill-purple-600 dark:fill-purple-500"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
