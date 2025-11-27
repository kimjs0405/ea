# 엘림교회 웹사이트

엘림교회 공식 웹사이트입니다. 로그인, 게시판, 주보 업로드 기능이 실시간으로 작동합니다.

## 주요 기능

- ✅ 관리자 로그인 기능 (실시간 인증)
- ✅ 게시판 (CRUD 기능 - 실시간 동기화)
- ✅ 주보 업로드 및 관리 (실시간 반영)
- ✅ 행사앨범 관리 (실시간 업로드)
- ✅ 설교영상 (YouTube 연동)
- ✅ 실시간 데이터베이스 동기화 (Supabase)

## 기술 스택

- Frontend: HTML, CSS, JavaScript
- Backend: Netlify Functions
- Data Storage: GitHub API (JSON 파일)
- Hosting: Netlify
- Version Control: GitHub

## 빠른 시작

**전체 배포 가이드는 [`DEPLOYMENT_GUIDE.md`](./DEPLOYMENT_GUIDE.md)를 참고하세요.**

### 1. 저장소 클론

```bash
git clone <repository-url>
cd 엘림교회
```

### 2. 의존성 설치

```bash
npm install
```

### 3. GitHub Personal Access Token 생성

1. GitHub → Settings → Developer settings → Personal access tokens
2. "Generate new token (classic)" 클릭
3. 토큰 이름 입력 (예: "Netlify Data Storage")
4. `repo` 권한 선택
5. 토큰 생성 및 **안전하게 보관** (자세한 내용은 [`github-setup.md`](./github-setup.md) 참고)

### 4. Netlify 환경 변수 설정

Netlify 대시보드에서 다음 환경 변수를 설정하세요:

- `GITHUB_TOKEN`: GitHub Personal Access Token
- `GITHUB_REPO`: 저장소 이름 (형식: `username/elim-church`)
- `GITHUB_BRANCH`: 브랜치 이름 (기본: `main`)
- `ADMIN_ID`: 관리자 아이디 (예: `admin123`)
- `ADMIN_PASSWORD`: 관리자 비밀번호 (예: `SecurePass123!`)

### 5. 배포

자세한 배포 방법은 [`DEPLOYMENT_GUIDE.md`](./DEPLOYMENT_GUIDE.md)를 참고하세요.

### 6. 로컬 개발

```bash
npm run dev
```

## 상세 가이드

- **[배포 가이드](./DEPLOYMENT_GUIDE.md)**: GitHub와 Netlify를 사용한 완전한 배포 가이드
- **[GitHub 설정](./github-setup.md)**: GitHub API 설정 및 Personal Access Token 생성 가이드

## 사용 방법

### 관리자 로그인

- 환경 변수에 설정한 아이디와 비밀번호 사용
- 로그인 후 게시판에서 글쓰기, 수정, 삭제 가능
- 관리자 페이지(`admin.html`)에서 주보 및 앨범 관리 가능

### 게시판 사용

1. 게시판 페이지에서 게시글 확인
2. 관리자 로그인 후 글쓰기 버튼 클릭
3. 제목과 내용 입력 후 저장
4. 게시글 수정/삭제 가능

### 주보 업로드

1. 관리자 페이지 접속
2. "주보광고 관리" 섹션에서 "새 주보 추가" 클릭
3. 제목, 날짜, 내용, 이미지 입력
4. 저장 후 메인 페이지에 자동 반영

## 파일 구조

```
엘림교회/
├── index.html              # 메인 페이지
├── admin.html              # 관리자 페이지
├── board.html              # 게시판 페이지
├── sermons.html            # 설교영상 페이지
├── script.js               # 프론트엔드 JavaScript
├── api.js                  # API 클라이언트
├── style.css               # 스타일시트
├── netlify/
│   └── functions/
│       └── api.js          # Netlify Functions (백엔드 API)
├── package.json            # Node.js 의존성
├── netlify.toml            # Netlify 설정
├── DEPLOYMENT_GUIDE.md     # 배포 가이드
├── SUPABASE_SETUP.md       # Supabase 설정 가이드
└── README.md               # 이 파일
```

## 문제 해결

### API 호출 실패

- GitHub 환경 변수가 올바르게 설정되었는지 확인
- GitHub Personal Access Token에 `repo` 권한이 있는지 확인
- Netlify Functions 로그 확인
- 브라우저 콘솔에서 에러 확인

### 데이터가 표시되지 않음

- GitHub 저장소에 데이터 파일들이 있는지 확인 (`posts-data.json`, `bulletins-data.json`, `albums-data.json`)
- GitHub API 응답 확인
- Netlify Functions 로그 확인

### 이미지가 표시되지 않음

- 이미지 URL이 올바른지 확인
- CORS 설정 확인 (외부 이미지 서버)

## 라이선스

MIT

## 문의

문제가 발생하거나 질문이 있으시면 이슈를 등록해주세요.

