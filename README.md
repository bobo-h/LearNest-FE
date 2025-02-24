# 📌 LearNest 프론트엔드 프로젝트

LearNest는 학습 관리 시스템(LMS)을 위한 프론트엔드 애플리케이션입니다. React와 TypeScript를 기반으로 하며, **컨텍스트 API와 React Query를 조합한 상태 관리**를 핵심으로 하고 있습니다.

## 🚀 기술 스택

- **언어**: TypeScript
- **프레임워크/라이브러리**: React
- **스타일링**: MUI, Emotion (반응형 개선 필요)
- **상태 관리**: **React Query + Context API**
- **라우팅**: React Router
- **HTTP 클라이언트**: Axios
- **리치 텍스트 에디터**: Quill
- **테스트**: React Testing Library, Jest

## 📂 프로젝트 구조

```
📦 프로젝트 루트
├── 📁 src               # 소스 코드 폴더
│   ├── 📁 components    # 공통 UI 컴포넌트
│   ├── 📁 contexts      # 컨텍스트 API 관련 폴더
│   ├── 📁 hooks         # 커스텀 훅
│   ├── 📁 pages         # 페이지 컴포넌트
│   ├── 📁 routes        # 라우트 정의
│   ├── 📁 services      # API 요청 관리
│   ├── 📁 styles        # 스타일링 관련 파일 (반응형 개선 필요)
│   ├── 📁 utils         # 유틸리티 함수
│   ├── App.tsx         # 애플리케이션 엔트리 파일
│   ├── index.tsx        # React 렌더링 엔트리
├── 📁 public            # 정적 파일 폴더
├── .env                 # 환경변수 파일 (Git에서 제외 필요)
├── package.json         # 프로젝트 설정 및 종속성 목록
├── tsconfig.json        # TypeScript 설정 파일
├── README.md            # 프로젝트 문서
```

## ⚙️ 환경변수 설정 (.env 예시)

```env
REACT_APP_LOCAL_BACKEND=http://localhost:3000
REACT_APP_BACKEND_PROXY=http://localhost:5000
REACT_APP_PROD_BACKEND=https://api.learnest.com
REACT_APP_CLOUDINARY_CLOUD_NAME=your_cloud_name
REACT_APP_CLOUDINARY_PRESET=your_preset_name
```

## 📌 설치 및 실행

### 1. 패키지 설치

```sh
npm install
```

### 2. 개발 서버 실행

```sh
npm start
```

### 3. 빌드 및 실행

```sh
npm run build
```

## 📡 주요 기능

- **컨텍스트 API + React Query 기반 상태 관리**: 글로벌 상태 관리 및 데이터 패칭 최적화
- **사용자 인증 및 권한 관리**: JWT를 이용한 로그인 및 역할 기반 접근 관리
- **클래스 및 강의 관리**: 강의, 과제, 피드백 기능 제공
- **반응형 UI 개선 필요**: 현재 MUI 및 Emotion을 활용하였으나 추가 최적화 필요

## 🏗 배포

배포된 애플리케이션을 실행하려면 `build` 폴더를 정적 서버에서 제공해야 합니다.

```sh
npm run build
serve -s build
```
