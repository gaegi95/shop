# 🖥️ DeskSet — 프리미엄 데스크테리어 전문 E-Commerce 플랫폼

> **React + Vite 기반의 고성능 SPA 쇼핑몰 플랫폼**  
> 실시간 결제 연동(Toss Payments v2), 3단계 역할 기반 대시보드(소비자/입점사/시스템 관리자), 그리고 GitHub Pages에서의 정적 SPA 라우팅 한계를 극복한 독립형 URL 라우팅 아키텍처가 구현되어 있습니다.

---

## 🚀 배포 링크
* 🏠 **쇼핑몰 메인 서비스**: [https://gaegi95.github.io/shop/](https://gaegi95.github.io/shop/)
* 🔒 **최상위 시스템 관리자 포털**: [https://gaegi95.github.io/shop/admin](https://gaegi95.github.io/shop/admin)

---

## 🛠️ 핵심 기술 스택 (Tech Stack)

* **Frontend Core**: React 18, Vite (초고속 빌드 환경)
* **Styling & UX**: Vanilla CSS (테크웨어 느낌의 Glassmorphism 및 Neon Glow 테마)
* **State Management & Routing**: 
  - React Context API (전역 상태 관리)
  - Custom SPA Path Router (브라우저 History API 동기화 및 404 Redirect Handler 우회 기법 적용)
* **Payment Integration**: Toss Payments v2 공식 Client SDK (샌드박스 연동)
* **Deployment**: GitHub Pages, `gh-pages` 자동화 파이프라인

---

## ✨ 핵심 구현 기능 (Key Features)

### 1. 💳 토스페이먼츠 v2 공식 실시간 결제 연동
* **공식 Toss Payments SDK**를 탑재하여 실제 카드 결제창 호출 및 처리 프로세스 완벽 연동.
* 테스트 샌드박스 환경을 사용하여 실제 결제 승인/실패 콜백 처리 및 주문 생성 완료 흐름 검증.
* 개인정보 및 API 키 노출 없이 안전하게 작동하는 **Public Sandbox Credentials** 설계.

### 2. 👥 3단계 역할 기반 독립 대시보드 (Role-Based Access Control)
사용자 역할(Role)에 따라 완전히 다른 UI/UX 인터페이스와 비즈니스 로직을 제공합니다.

| 역할 (Role) | 주요 기능 및 화면 | 테마 및 디자인 컨셉 |
| :--- | :--- | :--- |
| **Consumer (소비자)** | 상품 둘러보기, 카트 담기, 주문/배송 추적, 토스 실시간 결제, 1:1 고객 문의, 리뷰 작성 | 프리미엄 럭셔리 다크 (Minimal & Tech) |
| **Seller (입점 파트너)** | 실시간 매출 통계(네온 차트), 상품 등록/삭제/재고 관리, 입점 심사 신청 상태 추적 | 네온 그린 테크 (Partner Portal) |
| **Admin (시스템 관리자)** | 독립 로그인 벽, 회원 정지/복구 권한 제어, 입점 심사 승인, 신고 상품/리뷰 관리, 고객 센터 공지사항 고정 및 1:1 문의 답변 | 럭셔리 퍼플 테크 (System Administration) |

### 3. 🔒 주소창 연동형 독립 `/admin` 라우팅 & 보안 벽
* 브라우저 주소창에 `/admin`을 직접 입력하여 진입 시 비인증 사용자의 대시보드 진입을 차단하는 **독립형 로그인 가로채기(Security Wall)** 구현.
* 관리자 로그인 시 자동으로 주소창이 `/admin`으로 실시간 업데이트되며, 관리자 로그아웃 혹은 메인으로 복귀 시 지저분한 주소 경로를 실시간으로 지워주는 **URL Clean-up 동기화** 완성.

### 4. 🌐 정적 호스팅(GitHub Pages) SPA 404 라우팅 극복
* GitHub Pages와 같은 정적 서버 환경에서 SPA 새로고침 시 발생하는 **404 Not Found 에러를 완벽하게 영구 차단**했습니다.
* **SPA Redirect Trick** 적용:
  - `404.html`로 유입되는 비정상 접근 주소를 쿼리 파라미터로 즉시 치환하여 `index.html`로 중계.
  - 리액트 마운트 직전 브라우저 History API(`replaceState`)를 통해 주소창을 깔끔한 `/shop/admin` 정형 주소로 복구하여 로드.
  - `#` 해시 기법 없이도 완벽하게 깔끔한 정식 도메인 주소 체계 구현 완료.

---

## 💻 로컬에서 실행하는 방법 (How to Run Locally)

깃 클론 후 아래 명령어를 입력하여 로컬 개발 환경에서 즉시 구동해 보실 수 있습니다.

```bash
# 1. 의존성 패키지 설치
npm install

# 2. 로컬 개발 서버 실행 (Vite HMR 지원)
npm run dev

# 3. 배포용 빌드 및 깃허브 배포
npm run deploy
```

---

## 🛡️ 개인정보 보호 및 보안성 검증
* 본 프로젝트의 소스코드 및 가상 더미 데이터(기본 배송지 등)는 깃허브 공개 배포를 위해 **모두 가상/익명화(`010-0000-0000` 등) 처리**되어 공개 포트폴리오로 매우 안전합니다.
