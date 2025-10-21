import { Opportunity } from './types'
import { 
  calculateROI, 
  calculateCompetitionScore, 
  calculateDemandScore, 
  getCompetitionLevel, 
  calculateMonthlyRevenue 
} from './roiCalculator'

// Raw opportunity data (before ROI calculation)
const rawOpportunities: Omit<Opportunity, 'roiScore' | 'competition' | 'competitionScore' | 'demandScore' | 'monthlyRevenue'>[] = [
  // === FIVERR OPPORTUNITIES ===
  {
    id: 'fiv-1',
    title: 'LinkedIn Automation Chrome Extension',
    description: '링크드인 자동 연결 요청 및 맞춤 메시지 전송. 영업 팀의 시간을 90% 절약하세요.',
    platforms: ['fiverr', 'upwork', 'chrome'],
    averagePrice: 200,
    devTime: 5,
    trendDirection: 'up',
    category: 'Marketing',
    tags: ['LinkedIn', 'Automation', 'Chrome Extension', 'B2B'],
    dataPoints: {
      fiverr: {
        gigCount: 45,
        averagePrice: 200,
        ordersPerMonth: 450,
        sellerCount: 12,
        topSellerRevenue: 15000,
      },
      chrome: {
        users: 8500,
        rating: 4.5,
        reviews: 342,
      },
    },
    techStack: ['JavaScript', 'Chrome Extension API', 'LinkedIn API'],
    actionPlan: '1일: Chrome Extension 기본 구조, 2-3일: LinkedIn 자동화 로직, 4-5일: UI 및 테스트',
    createdAt: '2025-10-15',
    updatedAt: '2025-10-20',
  },
  {
    id: 'fiv-2',
    title: 'Notion Template + Automation Setup',
    description: 'Notion 템플릿 제작 및 자동화 설정 서비스. CRM, 프로젝트 관리, 콘텐츠 캘린더 포함.',
    platforms: ['fiverr', 'kmong'],
    averagePrice: 150,
    devTime: 3,
    trendDirection: 'up',
    category: 'Productivity',
    tags: ['Notion', 'Templates', 'Automation', 'Productivity'],
    dataPoints: {
      fiverr: {
        gigCount: 120,
        averagePrice: 150,
        ordersPerMonth: 280,
        sellerCount: 8,
        topSellerRevenue: 12000,
      },
      kmong: {
        serviceCount: 65,
        averagePrice: 180000, // KRW
        ordersPerMonth: 95,
        competitionLevel: 'medium',
      },
    },
    techStack: ['Notion API', 'Zapier', 'Make.com'],
    actionPlan: '1일: 템플릿 디자인, 2일: 자동화 설정, 3일: 문서화',
    createdAt: '2025-10-12',
    updatedAt: '2025-10-19',
  },
  {
    id: 'fiv-3',
    title: 'Custom API Development',
    description: 'REST API 및 GraphQL API 개발 서비스. 인증, 데이터베이스 통합, 문서화 포함.',
    platforms: ['fiverr', 'upwork', 'freelancer'],
    averagePrice: 400,
    devTime: 7,
    trendDirection: 'stable',
    category: 'Developer Tools',
    tags: ['API', 'Backend', 'Node.js', 'Database'],
    dataPoints: {
      fiverr: {
        gigCount: 180,
        averagePrice: 400,
        ordersPerMonth: 120,
        sellerCount: 15,
        topSellerRevenue: 18000,
      },
      upwork: {
        jobPostings: 85,
        averageRate: 450,
        proposalCount: 45,
        hireRate: 12,
      },
    },
    techStack: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB'],
    actionPlan: '1-2일: API 설계, 3-5일: 구현, 6-7일: 테스트 및 문서화',
    createdAt: '2025-10-10',
    updatedAt: '2025-10-18',
  },
  {
    id: 'fiv-4',
    title: 'Shopify Store Setup & Customization',
    description: 'Shopify 스토어 완벽 설정. 테마 커스터마이징, 앱 통합, SEO 최적화.',
    platforms: ['fiverr', 'upwork'],
    averagePrice: 350,
    devTime: 5,
    trendDirection: 'up',
    category: 'E-commerce',
    tags: ['Shopify', 'E-commerce', 'Web Design', 'SEO'],
    dataPoints: {
      fiverr: {
        gigCount: 95,
        averagePrice: 350,
        ordersPerMonth: 200,
        sellerCount: 18,
        topSellerRevenue: 22000,
      },
    },
    techStack: ['Shopify Liquid', 'HTML/CSS', 'JavaScript'],
    actionPlan: '1-2일: 테마 설정, 3-4일: 커스터마이징, 5일: SEO 및 최적화',
    createdAt: '2025-10-08',
    updatedAt: '2025-10-17',
  },

  // === UPWORK OPPORTUNITIES ===
  {
    id: 'up-1',
    title: 'React Dashboard Development',
    description: '관리자 대시보드 개발. 차트, 테이블, 실시간 데이터 업데이트 기능.',
    platforms: ['upwork', 'freelancer'],
    averagePrice: 3500,
    devTime: 12,
    trendDirection: 'stable',
    category: 'Developer Tools',
    tags: ['React', 'Dashboard', 'TypeScript', 'Charts'],
    dataPoints: {
      upwork: {
        jobPostings: 45,
        averageRate: 3500,
        proposalCount: 230,
        hireRate: 8,
      },
    },
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Recharts'],
    actionPlan: '1-3일: 프로젝트 설정, 4-8일: 핵심 기능 구현, 9-12일: 테스트 및 최적화',
    createdAt: '2025-10-05',
    updatedAt: '2025-10-16',
  },
  {
    id: 'up-2',
    title: 'Chrome Extension Fix/Feature Addition',
    description: '기존 Chrome 확장 프로그램 버그 수정 및 새 기능 추가.',
    platforms: ['upwork', 'fiverr'],
    averagePrice: 800,
    devTime: 4,
    trendDirection: 'up',
    category: 'Developer Tools',
    tags: ['Chrome Extension', 'JavaScript', 'Bug Fix', 'Feature'],
    dataPoints: {
      upwork: {
        jobPostings: 120,
        averageRate: 800,
        proposalCount: 35,
        hireRate: 15,
      },
    },
    techStack: ['JavaScript', 'Chrome Extension API', 'Manifest V3'],
    actionPlan: '1일: 분석, 2-3일: 구현, 4일: 테스트',
    createdAt: '2025-10-11',
    updatedAt: '2025-10-19',
  },
  {
    id: 'up-3',
    title: 'WordPress Plugin Development',
    description: '맞춤형 WordPress 플러그인 개발. 결제 게이트웨이, 회원 관리 등.',
    platforms: ['upwork', 'freelancer'],
    averagePrice: 2200,
    devTime: 8,
    trendDirection: 'stable',
    category: 'Developer Tools',
    tags: ['WordPress', 'PHP', 'Plugin', 'WooCommerce'],
    dataPoints: {
      upwork: {
        jobPostings: 65,
        averageRate: 2200,
        proposalCount: 120,
        hireRate: 10,
      },
    },
    techStack: ['PHP', 'WordPress API', 'MySQL', 'JavaScript'],
    actionPlan: '1-2일: 플러그인 구조, 3-6일: 기능 구현, 7-8일: 테스트',
    createdAt: '2025-10-07',
    updatedAt: '2025-10-18',
  },

  // === KMONG (크몽) OPPORTUNITIES ===
  {
    id: 'km-1',
    title: '엑셀 자동화 매크로',
    description: '엑셀 VBA 매크로로 반복 작업 자동화. 데이터 처리, 보고서 생성 등.',
    platforms: ['kmong'],
    averagePrice: 150, // ~150,000 KRW converted
    devTime: 3,
    trendDirection: 'up',
    category: 'Automation',
    tags: ['Excel', 'VBA', 'Macro', 'Automation'],
    dataPoints: {
      kmong: {
        serviceCount: 42,
        averagePrice: 150000,
        ordersPerMonth: 85,
        competitionLevel: 'low',
      },
    },
    techStack: ['Excel VBA', 'Python (optional)'],
    actionPlan: '1일: 요구사항 분석, 2일: 매크로 개발, 3일: 테스트 및 문서화',
    createdAt: '2025-10-14',
    updatedAt: '2025-10-20',
  },
  {
    id: 'km-2',
    title: '노션 템플릿 제작',
    description: '프로젝트 관리, 일정 관리, 독서 노트 등 Notion 템플릿 제작.',
    platforms: ['kmong', 'fiverr'],
    averagePrice: 80, // ~80,000 KRW
    devTime: 2,
    trendDirection: 'up',
    category: 'Productivity',
    tags: ['Notion', 'Template', 'Productivity', 'Organization'],
    dataPoints: {
      kmong: {
        serviceCount: 128,
        averagePrice: 80000,
        ordersPerMonth: 200,
        competitionLevel: 'medium',
      },
    },
    techStack: ['Notion'],
    actionPlan: '1일: 템플릿 디자인, 2일: 테스트 및 가이드 작성',
    createdAt: '2025-10-16',
    updatedAt: '2025-10-20',
  },
  {
    id: 'km-3',
    title: '파이썬 데이터 수집 봇',
    description: '웹 스크래핑 및 데이터 수집 자동화 봇. 엑셀/CSV 저장 기능.',
    platforms: ['kmong', 'upwork'],
    averagePrice: 200, // ~200,000 KRW
    devTime: 5,
    trendDirection: 'stable',
    category: 'Automation',
    tags: ['Python', 'Scraping', 'Bot', 'Data Collection'],
    dataPoints: {
      kmong: {
        serviceCount: 56,
        averagePrice: 200000,
        ordersPerMonth: 65,
        competitionLevel: 'medium',
      },
    },
    techStack: ['Python', 'BeautifulSoup', 'Selenium', 'Pandas'],
    actionPlan: '1-2일: 스크래핑 로직, 3-4일: 데이터 처리, 5일: 테스트',
    createdAt: '2025-10-09',
    updatedAt: '2025-10-17',
  },

  // === FREELANCER.COM OPPORTUNITIES ===
  {
    id: 'fr-1',
    title: 'Python Script Automation',
    description: '파이썬 스크립트로 다양한 작업 자동화. 파일 처리, API 통합 등.',
    platforms: ['freelancer', 'upwork'],
    averagePrice: 250,
    devTime: 3,
    trendDirection: 'up',
    category: 'Automation',
    tags: ['Python', 'Automation', 'Scripting', 'API'],
    dataPoints: {
      freelancer: {
        projectCount: 200,
        averageBudget: 250,
        bidCount: 45,
        completionRate: 85,
      },
    },
    techStack: ['Python', 'Requests', 'Pandas'],
    actionPlan: '1일: 요구사항 분석, 2일: 스크립트 개발, 3일: 테스트',
    createdAt: '2025-10-13',
    updatedAt: '2025-10-19',
  },
  {
    id: 'fr-2',
    title: 'Logo Design & Branding',
    description: '전문 로고 디자인 및 브랜딩 패키지. 색상 팔레트, 폰트 가이드 포함.',
    platforms: ['freelancer', 'fiverr'],
    averagePrice: 180,
    devTime: 4,
    trendDirection: 'stable',
    category: 'Design',
    tags: ['Logo', 'Design', 'Branding', 'Graphics'],
    dataPoints: {
      freelancer: {
        projectCount: 320,
        averageBudget: 180,
        bidCount: 85,
        completionRate: 90,
      },
    },
    techStack: ['Adobe Illustrator', 'Figma', 'Photoshop'],
    actionPlan: '1일: 컨셉 개발, 2-3일: 디자인 제작, 4일: 최종 수정',
    createdAt: '2025-10-10',
    updatedAt: '2025-10-18',
  },

  // === PRODUCT HUNT OPPORTUNITIES ===
  {
    id: 'ph-1',
    title: 'AI Email Categorizer',
    description: 'AI로 이메일을 자동 분류하고 우선순위를 정해주는 도구. Gmail/Outlook 통합.',
    platforms: ['producthunt', 'chrome'],
    averagePrice: 3000,
    devTime: 14,
    trendDirection: 'up',
    category: 'AI/ML',
    tags: ['AI', 'Email', 'Productivity', 'Gmail'],
    dataPoints: {
      producthunt: {
        upvotes: 1250,
        comments: 145,
        rank: 3,
      },
    },
    techStack: ['Python', 'OpenAI API', 'Gmail API', 'React'],
    actionPlan: '1-4일: AI 모델 훈련, 5-10일: 통합 구현, 11-14일: UI 및 테스트',
    createdAt: '2025-10-17',
    updatedAt: '2025-10-20',
  },
  {
    id: 'ph-2',
    title: 'Micro-SaaS Idea Validator',
    description: 'SaaS 아이디어 검증 도구. 시장 분석, 경쟁 분석, 수익 예측 제공.',
    platforms: ['producthunt'],
    averagePrice: 1500,
    devTime: 10,
    trendDirection: 'up',
    category: 'SaaS',
    tags: ['Validation', 'Market Research', 'Startup', 'Analytics'],
    dataPoints: {
      producthunt: {
        upvotes: 890,
        comments: 78,
        rank: 5,
      },
    },
    techStack: ['Next.js', 'TypeScript', 'OpenAI API', 'Database'],
    actionPlan: '1-3일: 데이터 수집 시스템, 4-7일: 분석 엔진, 8-10일: UI 및 테스트',
    createdAt: '2025-10-15',
    updatedAt: '2025-10-19',
  },

  // === REDDIT OPPORTUNITIES ===
  {
    id: 'rd-1',
    title: 'Stripe Payment Link Builder',
    description: 'Stripe 결제 링크를 비주얼하게 생성하는 노코드 빌더. 커스터마이징 옵션 다수.',
    platforms: ['reddit'],
    averagePrice: 2200,
    devTime: 8,
    trendDirection: 'up',
    category: 'Finance',
    tags: ['Stripe', 'Payments', 'No-code', 'SaaS'],
    dataPoints: {
      reddit: {
        subscribers: 3200000,
        painPoint: 'Stripe 대시보드가 너무 복잡하고 결제 링크 커스터마이징이 어려움',
        postCount: 245,
        sentiment: 'positive',
      },
    },
    techStack: ['React', 'Stripe API', 'Next.js'],
    actionPlan: '1-2일: UI 빌더, 3-5일: Stripe 통합, 6-8일: 고급 기능 및 테스트',
    createdAt: '2025-10-12',
    updatedAt: '2025-10-18',
  },
  {
    id: 'rd-2',
    title: 'Content Repurposing Tool',
    description: '블로그 글을 트위터 스레드, LinkedIn 포스트 등 여러 형식으로 자동 변환.',
    platforms: ['reddit', 'producthunt'],
    averagePrice: 2800,
    devTime: 10,
    trendDirection: 'up',
    category: 'Social Media',
    tags: ['Content', 'Social Media', 'Automation', 'AI'],
    dataPoints: {
      reddit: {
        subscribers: 450000,
        painPoint: '콘텐츠를 여러 플랫폼에 맞게 재작성하는데 시간이 너무 많이 걸림',
        postCount: 189,
        sentiment: 'positive',
      },
    },
    techStack: ['Next.js', 'OpenAI API', 'Social Media APIs'],
    actionPlan: '1-3일: AI 변환 로직, 4-7일: 플랫폼 통합, 8-10일: UI 및 테스트',
    createdAt: '2025-10-14',
    updatedAt: '2025-10-19',
  },

  // === CHROME WEB STORE OPPORTUNITIES ===
  {
    id: 'ch-1',
    title: 'YouTube Transcript Summarizer',
    description: 'AI로 YouTube 동영상 트랜스크립트를 자동 요약. 핵심 내용 추출.',
    platforms: ['chrome'],
    averagePrice: 1800,
    devTime: 6,
    trendDirection: 'up',
    category: 'AI/ML',
    tags: ['YouTube', 'AI', 'Productivity', 'Summarization'],
    dataPoints: {
      chrome: {
        users: 25000,
        rating: 4.7,
        reviews: 512,
      },
    },
    techStack: ['JavaScript', 'Chrome Extension API', 'OpenAI API'],
    actionPlan: '1-2일: Extension 구조, 3-4일: AI 통합, 5-6일: UI 및 테스트',
    createdAt: '2025-10-12',
    updatedAt: '2025-10-20',
  },
  {
    id: 'ch-2',
    title: 'Amazon Price Tracker',
    description: '아마존 제품 가격 추적 및 알림. 가격 히스토리 차트 제공.',
    platforms: ['chrome'],
    averagePrice: 3200,
    devTime: 8,
    trendDirection: 'stable',
    category: 'E-commerce',
    tags: ['Amazon', 'Shopping', 'Price Tracking', 'Deals'],
    dataPoints: {
      chrome: {
        users: 50000,
        rating: 4.6,
        reviews: 892,
      },
    },
    techStack: ['JavaScript', 'Chrome Extension API', 'Database'],
    actionPlan: '1-3일: 스크래핑 로직, 4-6일: 데이터 저장 및 알림, 7-8일: UI',
    createdAt: '2025-10-10',
    updatedAt: '2025-10-18',
  },
]

// Calculate all derived fields
export const mockOpportunities: Opportunity[] = rawOpportunities.map((opp) => {
  const demandScore = calculateDemandScore(opp as Opportunity)
  const competitionScore = calculateCompetitionScore(opp as Opportunity)
  const competition = getCompetitionLevel(competitionScore)
  const monthlyRevenue = calculateMonthlyRevenue(opp.averagePrice, demandScore)
  const roiScore = calculateROI(opp.averagePrice, demandScore, opp.devTime, competition)

  return {
    ...opp,
    demandScore,
    competitionScore,
    competition,
    monthlyRevenue,
    roiScore,
  } as Opportunity
})

// Export by platform for API routes
export const fiverrOpportunities = mockOpportunities.filter(opp => opp.platforms.includes('fiverr'))
export const upworkOpportunities = mockOpportunities.filter(opp => opp.platforms.includes('upwork'))
export const kmongOpportunities = mockOpportunities.filter(opp => opp.platforms.includes('kmong'))
export const freelancerOpportunities = mockOpportunities.filter(opp => opp.platforms.includes('freelancer'))
export const producthuntOpportunities = mockOpportunities.filter(opp => opp.platforms.includes('producthunt'))
export const redditOpportunities = mockOpportunities.filter(opp => opp.platforms.includes('reddit'))
export const chromeOpportunities = mockOpportunities.filter(opp => opp.platforms.includes('chrome'))
