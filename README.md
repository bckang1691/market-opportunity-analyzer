# 💡 Market Opportunity Analyzer

**Find Your Next $10K Side Project in Minutes**

실시간 ROI 분석으로 수익성 있는 사이드 프로젝트 기회를 발견하세요. Chrome 확장 프로그램, Reddit 트렌드, Product Hunt에서 검증된 아이디어를 분석합니다.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=for-the-badge&logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

## ✨ 주요 기능

- 🎯 **실시간 ROI 분석**: 수익, 개발 시간, 시장 규모를 기반으로 ROI 점수 계산
- 📊 **인터랙티브 차트**: Recharts를 사용한 데이터 시각화
- 🔍 **스마트 필터링**: 수익 범위, 개발 시간, 카테고리별 필터링
- 🎨 **다크 모드**: 시스템 환경설정 감지 및 토글 기능
- 📱 **반응형 디자인**: 모바일, 태블릿, 데스크톱 최적화
- ⚡ **빠른 성능**: Next.js 14 App Router 사용
- ♿ **접근성**: ARIA 레이블 및 키보드 네비게이션 지원

## 🚀 빠른 시작

### 필수 요구사항

- Node.js 18.0 이상
- npm 또는 yarn

### 설치 방법

```bash
# 저장소 클론
git clone https://github.com/yourusername/market-opportunity-analyzer.git
cd market-opportunity-analyzer

# 의존성 설치
npm install
# 또는
yarn install

# 환경 변수 설정
cp .env.example .env.local

# 개발 서버 실행
npm run dev
# 또는
yarn dev
```

브라우저에서 [http://localhost:3001](http://localhost:3001)을 열어 앱을 확인하세요.

## 📁 프로젝트 구조

```
market-opportunity-analyzer/
├── app/
│   ├── api/
│   │   ├── chrome-extensions/    # Chrome 확장 프로그램 데이터 API
│   │   │   └── route.ts
│   │   ├── reddit-trends/         # Reddit 트렌드 데이터 API
│   │   │   └── route.ts
│   │   └── producthunt/           # Product Hunt 데이터 API
│   │       └── route.ts
│   ├── globals.css               # 전역 스타일
│   ├── layout.tsx                # 루트 레이아웃
│   └── page.tsx                  # 메인 대시보드
├── components/
│   ├── DarkModeToggle.tsx        # 다크 모드 토글
│   ├── FilterPanel.tsx           # 필터 패널
│   ├── OpportunityCard.tsx       # 기회 카드
│   └── TrendChart.tsx            # 트렌드 차트
├── lib/
│   ├── mockData.ts               # 샘플 데이터
│   ├── types.ts                  # TypeScript 타입 정의
│   └── utils.ts                  # 유틸리티 함수 (ROI 계산 등)
├── public/                       # 정적 파일
├── .env.local                    # 환경 변수
├── next.config.js                # Next.js 설정
├── tailwind.config.ts            # Tailwind CSS 설정
├── tsconfig.json                 # TypeScript 설정
└── package.json                  # 프로젝트 의존성
```

## 🔌 API 엔드포인트

### 1. Chrome Extensions
```http
GET /api/chrome-extensions
```

**응답 예시:**
```json
{
  "success": true,
  "data": [
    {
      "id": "chrome-1",
      "title": "LinkedIn Auto-Connect Pro",
      "revenue": 2500,
      "devTime": 5,
      "marketSize": 8,
      "roiScore": 400,
      "category": "Marketing",
      "users": 15000
    }
  ],
  "count": 4
}
```

### 2. Reddit Trends
```http
GET /api/reddit-trends
```

**응답 예시:**
```json
{
  "success": true,
  "data": [
    {
      "id": "reddit-1",
      "title": "Notion Invoice Generator",
      "revenue": 1200,
      "devTime": 3,
      "marketSize": 6,
      "roiScore": 240,
      "category": "Productivity",
      "subscribers": 125000,
      "painPoint": "No easy way to generate invoices from Notion"
    }
  ],
  "count": 4,
  "sources": ["r/SaaS", "r/Entrepreneur", "r/microsaas"]
}
```

### 3. Product Hunt
```http
GET /api/producthunt
```

**응답 예시:**
```json
{
  "success": true,
  "data": [
    {
      "id": "ph-1",
      "title": "AI Email Categorizer",
      "revenue": 3000,
      "devTime": 7,
      "marketSize": 9,
      "roiScore": 386,
      "category": "AI/ML",
      "upvotes": 1250
    }
  ],
  "count": 5,
  "totalUpvotes": 5455
}
```

## 💰 ROI 계산 공식

ROI 점수는 다음 공식으로 계산됩니다:

```
ROI Score = (월 수익 × 시장 크기) ÷ 개발 시간
```

### 예시:
- **월 수익**: $2,500
- **시장 크기**: 8/10
- **개발 시간**: 5일

```
ROI = (2500 × 8) ÷ 5 = 4,000 ÷ 5 = 400
```

### ROI 등급:
- 🟢 **높음 (>100)**: 매우 수익성 있는 기회
- 🟡 **중간 (50-100)**: 괜찮은 기회
- 🔴 **낮음 (<50)**: 신중하게 고려 필요

## 🎨 스타일링 가이드

### Glassmorphism 효과
```tsx
<div className="glass glass-dark">
  {/* 콘텐츠 */}
</div>
```

### ROI 배지 색상
- **높음**: 초록색 (`bg-green-100 text-green-800`)
- **중간**: 노란색 (`bg-yellow-100 text-yellow-800`)
- **낮음**: 빨간색 (`bg-red-100 text-red-800`)

### 애니메이션
```tsx
<div className="animate-fade-in">페이드 인</div>
<div className="animate-slide-up">슬라이드 업</div>
<div className="animate-scale-in">스케일 인</div>
```

## 📦 주요 의존성

| 패키지 | 버전 | 용도 |
|--------|------|------|
| Next.js | ^14.2.18 | React 프레임워크 |
| React | ^18.3.1 | UI 라이브러리 |
| TypeScript | ^5.7.2 | 타입 안전성 |
| Tailwind CSS | ^3.4.17 | 유틸리티 기반 CSS |
| Recharts | ^3.3.0 | 차트 라이브러리 |
| Lucide React | ^0.546.0 | 아이콘 라이브러리 |
| clsx | ^2.1.1 | 클래스 이름 유틸리티 |
| tailwind-merge | ^2.5.5 | Tailwind 클래스 병합 |

## 🚀 배포

### Vercel에 배포 (권장)

1. [Vercel](https://vercel.com)에 계정 생성
2. GitHub 저장소 연결
3. 프로젝트 설정:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

4. 환경 변수 설정:
   ```
   PORT=3001
   NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
   ```

5. 배포 버튼 클릭!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/market-opportunity-analyzer)

### 다른 플랫폼

```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm run start
```

## 🔧 개발 스크립트

```bash
# 개발 서버 실행 (포트 3001)
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm run start

# 린트 실행
npm run lint

# 코드 포맷팅
npm run format
```

## 🎯 사용 시나리오

### 1. 사이드 프로젝트 찾기
- ROI 점수로 정렬하여 가장 수익성 있는 기회 확인
- 개발 시간 필터로 빠르게 만들 수 있는 프로젝트 찾기

### 2. 시장 트렌드 분석
- 카테고리별 차트로 인기 있는 시장 파악
- 여러 소스(Chrome, Reddit, Product Hunt)의 데이터 비교

### 3. 수익 예측
- 월 수익 범위 필터로 목표 수익에 맞는 프로젝트 선택
- 시장 크기 지표로 성장 가능성 평가

## 🤝 기여하기

기여를 환영합니다! 다음 단계를 따라주세요:

1. 저장소 포크
2. 기능 브랜치 생성 (`git checkout -b feature/AmazingFeature`)
3. 변경사항 커밋 (`git commit -m 'Add some AmazingFeature'`)
4. 브랜치에 푸시 (`git push origin feature/AmazingFeature`)
5. Pull Request 생성

## 📝 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 🙏 감사의 말

- [Next.js](https://nextjs.org/) - 놀라운 React 프레임워크
- [Tailwind CSS](https://tailwindcss.com/) - 유틸리티 기반 CSS 프레임워크
- [Recharts](https://recharts.org/) - 강력한 차트 라이브러리
- [Lucide](https://lucide.dev/) - 아름다운 오픈소스 아이콘

## 📧 연락처

프로젝트 링크: [https://github.com/yourusername/market-opportunity-analyzer](https://github.com/yourusername/market-opportunity-analyzer)

---

⭐ 이 프로젝트가 도움이 되었다면 별표를 눌러주세요!

Made with ❤️ for entrepreneurs and side project builders