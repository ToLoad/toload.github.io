# Change Request Plan

## Change Request ID

`CRQ-20260714-01`

## Baseline

- Last normal deployment commit: `d7e0543`
- Last normal deployment URL: `https://toload.github.io`
- Current branch: `main`
- Remote: `origin https://github.com/ToLoad/toload.github.io.git`
- Current live page status: HTTP `200`

## Current repository snapshot

- 정적 GitHub Pages 사이트가 이미 배포되어 있다.
- 루트에는 `index.html`, `about.html`, `projects.html`, `contact.html`, `games.html`, `styles.css`, `script.js`, `game.js`가 있다.
- `Games` 페이지는 사과게임을 사용한다.
- 현재 사이트는 Home, About, Projects, Contact, Games의 멀티페이지 구조다.

## 사용자 요청 원문

> 스크롤을 내렸을 땐 상단 메뉴가 축소되게 해줘
> 글자를 채워야하는 부분들에는 "안드로이드 개발자"에 맞는 적당한 말들을 만들어서 채워줘
> Home과 About은 통합해도 될것 같아
> Contact는 따로 페이지로 구성하지말고 각 페이지마다 아래에 footer로 보여지면 좋겠어
> 게임에서 게임이 끝났거나 시작전이거나 대기중일 때 보드 판에 색상을 입혀놔서 게임이 진행중이지 않다는 것을 좀 더 명확하게 보여줬으면 좋겠어
> 게임에서 10인 영역을 찾은 후에 사라지고 나서 새로운 영역이 나타날 때 기존에 다른 영역들도 숫자가 바뀌는데 의도한 건지 확인해줘
> 게임에서 새롭게 업데이트 되는 영역들이 좀 더 이펙트가 있으면 좋겠어 어떤 부분이 업데이트되었는지 한 눈에 들어오지 않는 것 같아

## Change Item summary

| ID | 요청 분류 | 요약 | 현재 동작 | 기대 동작 | 위험도 | HITL |
|---|---|---|---|---|---|---|
| CR-001 | UI_UX, RESPONSIVE, NAVIGATION | 스크롤 시 상단 메뉴 축소 | 헤더 높이와 메뉴 크기가 고정 | 스크롤 내릴 때 상단 메뉴가 더 컴팩트해짐 | LOW | 아니오 |
| CR-002 | CONTENT, UI_UX | 안드로이드 개발자용 문구 채우기 | 여러 섹션에 placeholder와 `확정 전 문구`가 남아 있음 | 프로페셔널하고 자연스러운 소개/설명 문구로 채움 | MEDIUM | 예 |
| CR-003 | INFORMATION_ARCHITECTURE, MULTI_PAGE_STRUCTURE, NAVIGATION, REFACTOR | Home과 About 통합 | Home과 About이 분리된 페이지 | 하나의 일관된 진입 구조로 합쳐짐 | HIGH | 예 |
| CR-004 | INFORMATION_ARCHITECTURE, MULTI_PAGE_STRUCTURE, CONTENT, NAVIGATION | Contact를 footer로 이동 | Contact가 별도 페이지와 상단 링크로 존재 | 각 페이지 하단 footer에서 연락 정보 노출 | MEDIUM | 예 |
| CR-005 | GAME_STATE, UI_UX, ACCESSIBILITY | 게임 비활성 상태 보드 tint | 시작 전/일시정지/종료 상태가 텍스트 중심으로만 구분됨 | 비활성 상태가 보드 색상으로 즉시 보임 | LOW-MEDIUM | 아니오 |
| CR-006 | BUG, GAME_LOGIC, SPEC_CHANGE | 10 합 영역 제거 후 다른 숫자가 바뀌는지 확인 | 현재 코드상 열 단위 collapse + 새 값 채움 | 의도된 동작인지 확인 후 규칙 고정 | MEDIUM | 예 |
| CR-007 | GAME_EFFECT, UI_UX, GAME_STATE | 새로 업데이트된 영역 이펙트 추가 | 제거된 영역만 간단한 pop 애니메이션이 있음 | 새로 나타난/갱신된 영역이 한눈에 보이게 강조됨 | LOW-MEDIUM | 아니오 |

## Detailed Change Items

### CR-001 — 스크롤 시 상단 메뉴 축소

- 사용자 요청 원문: `스크롤을 내렸을 땐 상단 메뉴가 축소되게 해줘`
- 요청 요약: 상단 sticky 메뉴가 스크롤 시 더 작고 조용하게 접히는 UX를 추가한다.
- 요청 분류: `UI_UX`, `RESPONSIVE`, `NAVIGATION`
- 현재 동작: 헤더는 sticky이지만 크기와 밀도가 고정이다.
- 기대 동작: 아래로 스크롤하면 로고/내비게이션/패딩이 축소되고, 위로 돌아오면 원래 상태로 복귀한다.
- 재현 방법: 임의 페이지에서 아래로 스크롤한다.
- 근거 자료: 현재 live site와 `styles.css`의 sticky header 스타일.
- 수정 대상 기능: 공통 header/nav.
- 예상 수정 파일: `styles.css`, `script.js`, 각 페이지의 공통 header 마크업.
- 변경 허용 범위: 헤더 높이, 패딩, 글자 크기, 그림자, 축약 상태 클래스.
- 변경 금지 범위: 메뉴 링크 제거, 페이지 구조 전체 재작성, 게임 로직 변경.
- 선행 작업: 공통 header 구조가 페이지별로 일관된지 확인.
- 후속 작업: 반응형 breakpoint에서 축소 상태가 깨지지 않는지 점검.
- 다른 Change Item과의 의존성: `CR-003`, `CR-004` 이후 공통 헤더가 정리되면 적용이 쉬움.
- 완료 기준: 스크롤 전/후 header 크기가 시각적으로 구분되고, 모든 링크가 정상 동작한다.
- 검증 방법: desktop/mobile에서 스크롤 top/bottom 비교, 콘솔 오류 확인.
- 회귀 테스트: nav 탭, skip link, sticky 동작, 모바일 터치 범위.
- 위험도: `LOW`
- 배포 필요 여부: `YES`
- 확인 메모: 없음

### CR-002 — 안드로이드 개발자용 문구 채우기

- 사용자 요청 원문: `글자를 채워야하는 부분들에는 "안드로이드 개발자"에 맞는 적당한 말들을 만들어서 채워줘`
- 요청 요약: 비어 있는 소개/설명 문구를 안드로이드 개발자 톤에 맞게 채운다.
- 요청 분류: `CONTENT`, `UI_UX`
- 현재 동작: 여러 섹션에 placeholder, `확정 전 문구`, 내용 빈칸이 있다.
- 기대 동작: 안드로이드 개발자라는 역할을 반영한 자연스러운 소개 문장과 섹션 설명이 들어간다.
- 재현 방법: 각 페이지를 열어 placeholder 텍스트를 확인한다.
- 근거 자료: 현재 HTML 파일의 placeholder와 `확정 전 문구` 표현.
- 수정 대상 기능: 프로필 소개, 프로젝트 설명, About/Projects/Contact 문구.
- 예상 수정 파일: `index.html`, `about.html`, `projects.html`, `contact.html`, 필요 시 `styles.css`.
- 변경 허용 범위: 일반적인 자기소개 문구, 기술 스택 표현, 섹션 제목 보강.
- 변경 금지 범위: 확인되지 않은 경력, 회사명, 수상, 프로젝트 실적, 실제 연락처를 임의 생성하는 것.
- 선행 작업: Home/About 구조가 어떻게 합쳐질지 결정.
- 후속 작업: Contact footer에 들어갈 실제 노출 수준을 결정.
- 다른 Change Item과의 의존성: `CR-003`, `CR-004`와 내용 배치가 연결됨.
- 완료 기준: 모든 placeholder가 역할에 맞는 문장으로 대체되거나 `확정 전 문구`로 명확히 남는다.
- 검증 방법: 각 페이지를 열어 텍스트 누락/과장 여부를 검수.
- 회귀 테스트: 가독성, 모바일 줄바꿈, 장문 텍스트 오버플로.
- 위험도: `MEDIUM`
- 배포 필요 여부: `YES`
- 확인 메모: 실제 이름, 실제 경력, 실제 프로젝트, 실제 연락처

### CR-003 — Home과 About 통합

- 사용자 요청 원문: `Home과 About은 통합해도 될것 같아`
- 요청 요약: Home/About의 분리 구조를 하나의 일관된 정보 구조로 합친다.
- 요청 분류: `INFORMATION_ARCHITECTURE`, `MULTI_PAGE_STRUCTURE`, `NAVIGATION`, `REFACTOR`
- 현재 동작: `index.html`과 `about.html`이 별도 페이지다.
- 기대 동작: Home과 About이 하나의 진입 구조로 통합되고, 내비게이션도 그에 맞게 바뀐다.
- 재현 방법: 상단 nav에서 Home과 About을 각각 눌러 현재 서로 다른 페이지로 이동되는지 확인한다.
- 근거 자료: 현재 파일 구조와 상단 nav 링크.
- 수정 대상 기능: 페이지 구조, nav, active state 처리.
- 예상 수정 파일: `index.html`, `about.html`, `script.js`, `styles.css`.
- 변경 허용 범위: 기존 About 내용의 Home 이관, 불필요한 중복 제거, 내비게이션 조정.
- 변경 금지 범위: Projects/Games 페이지를 뒤섞는 것, 외부 라우팅 도입, 서버 의존 구조 도입.
- 선행 작업: CR-002에서 사용할 소개 문구의 배치 방향 결정.
- 후속 작업: Contact footer와의 공통 레이아웃 정리.
- 다른 Change Item과의 의존성: `CR-004`와 공통 헤더/푸터 구조를 공유할 가능성이 높음.
- 완료 기준: 사용자가 Home/About을 별개 진입점으로 인식하지 않아도 되는 단일 구조가 완성됨.
- 검증 방법: nav 클릭, 브라우저 뒤로가기, 페이지 제목/헤딩 검수.
- 회귀 테스트: Projects/Games 링크, 모바일 nav, 404 여부.
- 위험도: `HIGH`
- 배포 필요 여부: `YES`
- 확인 메모: About을 완전히 제거할지, 섹션 앵커/리디렉션으로 남길지

### CR-004 — Contact를 footer로 이동

- 사용자 요청 원문: `Contact는 따로 페이지로 구성하지말고 각 페이지마다 아래에 footer로 보여지면 좋겠어`
- 요청 요약: Contact 페이지를 없애고 공통 footer로 연락 정보를 노출한다.
- 요청 분류: `INFORMATION_ARCHITECTURE`, `MULTI_PAGE_STRUCTURE`, `CONTENT`, `NAVIGATION`
- 현재 동작: `contact.html`이 별도 페이지로 존재하고 nav에서 접근한다.
- 기대 동작: 각 페이지 하단에 footer가 보이고, 연락 정보가 그 안에 들어간다.
- 재현 방법: 현재 nav에서 Contact를 누르면 별도 페이지로 이동되는지 확인한다.
- 근거 자료: 현재 파일 구조와 live site nav.
- 수정 대상 기능: 공통 footer, Contact 콘텐츠 배치, nav 링크 정책.
- 예상 수정 파일: `contact.html`, `index.html`, `about.html`, `projects.html`, `games.html`, `styles.css`, `script.js`(공통 활성 상태가 필요할 경우).
- 변경 허용 범위: footer 공통화, 연락처/외부 링크 배치.
- 변경 금지 범위: 백엔드 폼 추가, 외부 연락 서비스 강제 도입.
- 선행 작업: CR-003에서 공통 레이아웃 정책을 정리.
- 후속 작업: 모든 페이지에서 footer 공간과 모바일 스크롤 끝 처리 확인.
- 다른 Change Item과의 의존성: `CR-003`과 strongly related.
- 완료 기준: 모든 페이지 하단에 동일한 연락 footer가 보이고, 별도 Contact 페이지 탐색이 필요하지 않다.
- 검증 방법: 각 페이지 접속 후 footer 확인, Contact 링크 정책 확인.
- 회귀 테스트: 페이지 높이, 모바일 하단 여백, anchor 링크.
- 위험도: `MEDIUM`
- 배포 필요 여부: `YES`
- 확인 메모: footer에 넣을 실제 연락 정보의 공개 범위, contact.html 유지 여부

### CR-005 — 게임 비활성 상태 보드 tint

- 사용자 요청 원문: `게임에서 게임이 끝났거나 시작전이거나 대기중일 때 보드 판에 색상을 입혀놔서 게임이 진행중이지 않다는 것을 좀 더 명확하게 보여줬으면 좋겠어`
- 요청 요약: 게임 시작 전, 대기, 종료, 일시정지 같은 상태에서 보드 배경을 더 명확히 구분한다.
- 요청 분류: `GAME_STATE`, `UI_UX`, `ACCESSIBILITY`
- 현재 동작: 상태 문구는 있지만 보드 자체는 활성/비활성이 비슷해 보인다.
- 기대 동작: 진행 중이 아닐 때 보드 전체 또는 오버레이가 색으로 비활성 상태를 암시한다.
- 재현 방법: 게임 시작 전, pause, game over 상태를 본다.
- 근거 자료: `games.html`, `game.js`, 현재 `game-panel` 스타일.
- 수정 대상 기능: 게임 보드 상태 표현, 상태별 클래스.
- 예상 수정 파일: `game.js`, `styles.css`, 필요 시 `games.html`.
- 변경 허용 범위: 상태별 tint, overlay, 메시지 강조.
- 변경 금지 범위: 게임 규칙 변경, 입력 방식 변경.
- 선행 작업: 현재 game state machine 이름과 상태 전이를 확인.
- 후속 작업: 상태 전환 애니메이션과 접근성 대비 검증.
- 다른 Change Item과의 의존성: `CR-006`, `CR-007`의 게임 상태 구분과 함께 보면 좋다.
- 완료 기준: 시작 전/대기/종료 시 보드가 즉시 비활성처럼 인식된다.
- 검증 방법: 각 상태로 진입해 색상/대비 차이 확인.
- 회귀 테스트: 입력 가능 상태에서 조작성, 모바일 화면, 점수판 가독성.
- 위험도: `LOW-MEDIUM`
- 배포 필요 여부: `YES`
- 확인 메모: tint 강도와 색감 선호

### CR-006 — 10 합 영역 제거 후 숫자 변화가 의도된 동작인지 확인

- 사용자 요청 원문: `게임에서 10인 영역을 찾은 후에 사라지고 나서 새로운 영역이 나타날 때 기존에 다른 영역들도 숫자가 바뀌는데 의도한 건지 확인해줘`
- 요청 요약: 제거 후 숫자/영역 갱신 규칙이 의도된 것인지 확인하고, 필요하면 규칙을 고정한다.
- 요청 분류: `BUG`, `GAME_LOGIC`, `SPEC_CHANGE`
- 현재 동작: 코드상 `collapseBoard()`는 열 단위로 비어 있는 칸만 새 값으로 채우고 있다.
- 기대 동작: 사용자가 기대하는 규칙이 무엇인지 확인 후, 그 규칙대로 숫자 갱신이 동작해야 한다.
- 재현 방법: 합이 10인 영역을 제거하고 보드를 관찰한다.
- 근거 자료: `game.js`의 `collapseBoard()` 구현과 `renderBoard()` 재호출 흐름.
- 수정 대상 기능: 보드 갱신 규칙, possibly animation/transition.
- 예상 수정 파일: `game.js`, 필요 시 `styles.css`.
- 변경 허용 범위: collapse/refresh 규칙 설명, 새 칸 생성 방식 조정.
- 변경 금지 범위: 게임 전체 재작성, 점수 규칙의 무단 변경.
- 선행 작업: 실제 원하는 규칙을 사람 확인으로 확정.
- 후속 작업: CR-007의 업데이트 이펙트 설계.
- 다른 Change Item과의 의존성: `CR-007`은 이 규칙이 확정되어야 정확히 붙일 수 있다.
- 완료 기준: “의도된 동작” 여부가 문서화되고, 코드 동작이 그 규칙과 일치한다.
- 검증 방법: before/after 보드 상태 비교, 동일 행/열 값 추적.
- 회귀 테스트: 점수 증가, 재시작, 터치/키보드 조작.
- 위험도: `MEDIUM`
- 배포 필요 여부: `YES`
- 확인 메모: 셀 이동을 의도한 것인지, 새 칸만 갱신할 것인지

### CR-007 — 새롭게 업데이트되는 영역 이펙트 추가

- 사용자 요청 원문: `게임에서 새롭게 업데이트 되는 영역들이 좀 더 이펙트가 있으면 좋겠어 어떤 부분이 업데이트되었는지 한 눈에 들어오지 않는 것 같아`
- 요청 요약: 새로 등장하거나 갱신된 셀/영역이 눈에 띄게 하이라이트되도록 한다.
- 요청 분류: `GAME_EFFECT`, `UI_UX`, `GAME_STATE`
- 현재 동작: 제거된 영역에는 간단한 애니메이션이 있으나, 새로 생긴 영역 변화는 충분히 두드러지지 않는다.
- 기대 동작: 갱신된 셀 또는 갱신된 그룹이 짧은 이펙트로 강조된다.
- 재현 방법: 10 합 영역을 제거한 직후 보드 변화를 관찰한다.
- 근거 자료: 현재 `game.js`/`styles.css`에 있는 pop 위주의 애니메이션.
- 수정 대상 기능: 갱신 셀 강조 애니메이션, 색/그림자/트랜지션.
- 예상 수정 파일: `game.js`, `styles.css`.
- 변경 허용 범위: pulse, glow, fade-in, shimmer 같은 짧은 효과.
- 변경 금지 범위: 과도한 애니메이션으로 플레이를 방해하는 것.
- 선행 작업: CR-006의 갱신 규칙 확정.
- 후속 작업: 모바일에서도 과하지 않은지 검증.
- 다른 Change Item과의 의존성: `CR-006` 이후에 실제 변화 대상을 정확히 알 수 있다.
- 완료 기준: 새로 갱신된 셀/영역을 1초 이내에 쉽게 식별할 수 있다.
- 검증 방법: 변경 직후 시각적 강조가 있는지 확인.
- 회귀 테스트: 입력 지연, 레이아웃 이동, 색 대비, 콘솔 오류.
- 위험도: `LOW-MEDIUM`
- 배포 필요 여부: `YES`
- 확인 메모: 이펙트 강도와 스타일 선호

## Ordered execution plan

1. CR-003 — Home/About 통합 여부와 구조 정책 결정
2. CR-004 — Contact footer 공통화
3. CR-002 — Android developer용 문구 채우기
4. CR-006 — 10 합 영역 갱신 규칙 확인
5. CR-005 — 게임 비활성 상태 tint
6. CR-001 — 스크롤 시 상단 메뉴 축소
7. CR-007 — 갱신 영역 이펙트 추가

## Loop plan

| Loop ID | Connected Change Item | Target | Input | Act | Observe | Reason | Verifier | Completion Criteria | Retry Policy | Stop | HITL | Expected files | Predecessor | Next Loop | Status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| L-001 | CR-003 + CR-004 | 현재 정보 구조와 공통 레이아웃 정책 확정 | current site, nav, AORR, MEMORY, live URL | 현재 멀티페이지 구조와 고정 contact page를 구조적으로 정리 | broken links, nav consistency, footer placement risk | 구조 변경은 다른 작업의 전제이기 때문 | 브라우저/HTML 검수 | 통합 방향이 문서화되고 링크 정책이 명확함 | one root cause only | structural plan finalized | about/contact alias policy (확정 전) | `index.html`, `about.html`, `contact.html`, shared layout files | none | L-002 | READY |
| L-002 | CR-002 | Android developer용 콘텐츠 초안 작성 | current placeholders, page contents | placeholder text를 역할 기반 문구로 채움 | factual claims, tone, length, wrapping | 콘텐츠가 구조 이후에 배치되어야 충돌이 적음 | manual content review | placeholder가 유의미한 문장으로 채워짐 | one content cluster only | content draft accepted | actual personal facts | HTML content files | L-001 | L-003 | HITL_REQUIRED |
| L-003 | CR-006 | 게임 10 합 후 숫자 변화 규칙 확정 | game.js behavior, user observation | current collapse behavior를 검증/문서화 | board value stability, column collapse, new cell generation | game logic ambiguity must be resolved before effects | browser playthrough + code inspection | intended rule is confirmed and reproducible | one game rule only | same fingerprint repeated twice or user confirms rule | whether cell shifting is intended | `game.js` | L-002 | L-004 | HITL_REQUIRED |
| L-004 | CR-005 | 게임 비활성 상태 tint | current game states | board overlay/state class 추가 | visual distinction of idle/paused/gameover | improves clarity before visual polish | browser state check | inactive states are immediately visible | one state family only | passes on desktop/mobile | tint strength | `game.js`, `styles.css` | L-003 | L-005 | READY |
| L-005 | CR-001 | 상단 메뉴 축소 | sticky header, scroll behavior | scroll listener and compact header class | nav shrinking, focus, mobile layout | visible UX improvement after structural settle | browser scroll check | top menu shrinks/restores without breaking nav | one visual behavior only | scroll animation stable | none | `script.js`, `styles.css` | L-004 | L-006 | READY |
| L-006 | CR-007 | 갱신 영역 이펙트 | confirmed game update rule | highlight updated cells/regions | animation clarity, jank, readability | effect depends on confirmed update rule | browser game test | updated region is easy to spot once per update | one effect family only | no layout shift or lag | effect style intensity | `game.js`, `styles.css` | L-005 | none | READY |

## Completion criteria for the whole request

- Home/About/Contact 구조 변경에 대한 방향이 명확하다.
- Android developer용 문구의 사실/비사실 범위가 정리된다.
- 게임 보드 상태와 업데이트 규칙이 분명하다.
- 각 루프가 독립적으로 검증 가능하다.
- GitHub Pages 정적 호환성을 유지할 수 있다.

## Human-in-the-loop conditions

- 실제 이름, 경력, 프로젝트, 연락처가 필요한 경우
- About을 삭제/통합할지 redirect/anchor로 남길지 선택이 필요한 경우
- Contact footer에 어떤 정보를 공개할지 선택이 필요한 경우
- 게임 10 합 후 셀 이동/갱신 규칙을 확정해야 하는 경우
- 색, 애니메이션 강도, 헤더 축소 정도를 선택해야 하는 경우

## Current planning status

`DEPLOY_APPROVAL_REQUIRED`

## Execution result summary

| Change Item | Status | Notes |
|---|---|---|
| CR-001 | PASSED | 스크롤 시 상단 메뉴 축소 동작을 스크립트와 스타일로 연결했고, 모의 검증에서 compact 클래스 전환을 확인했다. |
| CR-002 | PASSED | 안드로이드 개발자 톤의 설명 문구로 채웠고, 실제 개인 정보는 확정 전 문구로 유지했다. |
| CR-003 | PASSED | Home과 About을 index 기준으로 통합하고 about.html은 redirect alias로 정리했다. |
| CR-004 | PASSED | Contact를 각 페이지 footer로 이동하고 contact.html은 redirect alias로 정리했다. |
| CR-005 | PASSED | 게임 상태별 tint를 추가해 시작 전/대기/종료 상태가 더 명확해졌다. |
| CR-006 | PASSED | 현재 구현이 합 10 제거 후 남은 칸을 정리하고 새 숫자를 채우는 방식임을 코드와 모의 테스트로 확인했다. |
| CR-007 | PASSED | 갱신된 셀을 `is-updated` 애니메이션으로 강조하도록 구현했다. |

### Change Item artifacts

- 실제 수정 파일:
  - `index.html`
  - `projects.html`
  - `games.html`
  - `about.html`
  - `contact.html`
  - `script.js`
  - `game.js`
  - `styles.css`
- Retry 횟수:
  - `1`
- 완료 또는 중지 이유:
  - 로컬 구현 및 검증 완료, 재배포 승인 대기
- 확인 메모:
  - 실제 이름/경력/연락처/프로젝트 사실 정보
  - About/Contact alias를 유지할지 여부
  - 게임 숫자 갱신 규칙 변경 여부

## Follow-up change items

| ID | 요청 원문 | 요청 요약 | 분류 | 현재 상태 | 비고 |
|---|---|---|---|---|---|
| CR-008 | Home이랑 About이 통합되었는데 메뉴에 아직 About이 남아있어 이 부분 수정이 필요해 | 상단 메뉴에서 About 제거 | `NAVIGATION`, `INFORMATION_ARCHITECTURE` | `PASSED` | 메뉴에서는 제거하고, About은 Home 섹션과 footer/버튼으로만 접근 가능 |
| CR-009 | Contact는 각 페이지 하단에 Footer형태로 들어갔는데 메뉴가 남아있어 메뉴 제거가 필요해 | 상단 메뉴에서 Contact 제거 | `NAVIGATION`, `INFORMATION_ARCHITECTURE` | `PASSED` | footer로만 노출되도록 정리 |
| CR-010 | Contact가 footer형태로 들어갔는데 전형적인 Footer 디자인이 아니야 이 부분 다른 웹사이트들을 참고해서 수정해줘 | 전형적인 footer 스타일로 재디자인 | `UI_UX`, `CONTENT` | `PASSED` | 어두운 배경, 링크 묶음, 연락처 블록, 하단 카피 형태로 변경 |
| CR-011 | 상단 nav bar는 내리면 아예 작게 축소되게하고 좌측엔 아이콘 우측엔 더보기 아이콘만 남기게 해줘, 더보기 아이콘을 누르면 메뉴들이 보이게해줘 | compact header + more-menu | `NAVIGATION`, `UI_UX`, `RESPONSIVE` | `PASSED` | 스크롤 시 compact 모드 전환, 왼쪽 아이콘/오른쪽 더보기 버튼, 메뉴 패널 토글 |
| CR-012 | 하단 Footer는 위쪽 섹션과 동일한 네모난 형태가 아니라 아래에 현재 전체 배경색보다 더 흐린색으로 줄글 형태로 보였으면 좋겠어 | footer를 연한 문단형 strip으로 변경 | `UI_UX`, `CONTENT` | `PASSED` | 박스형 footer shell 제거, 밝은 배경의 문단형 footer flow로 변경 |
| CR-013 | 상단 네비바도 footer처럼 전체영역을 사용하게 해줘 | full-width header band | `UI_UX`, `NAVIGATION`, `RESPONSIVE` | `PASSED` | header를 full-width band로 확장하고 inner shell만 centered |
| CR-014 | 상단 네비바가 축소되었을 땐 배경색이 없게해줘 | compact header transparency | `UI_UX`, `NAVIGATION` | `PASSED` | compact 상태에서 header background와 shadow 제거 |

## New visual redesign request

### Request ID

`CRQ-20260714-05`

### User request summary

- 우주 느낌의 포스터형 랜딩으로 바꾸고 싶다.
- 섹션형이 아니라 이미지처럼 강한 비주얼 중심 형태를 원한다.
- 헤더, 본문, footer, 게임 페이지까지 같은 우주 테마 언어를 공유해야 한다.

### Change items

| ID | 요청 원문 | 요청 요약 | 분류 | 현재 상태 | 비고 |
|---|---|---|---|---|---|
| CR-015 | 이런 우주느낌 형태로 | 사이트 전반의 우주 테마 기반을 구축 | `UI_UX`, `REFACTOR`, `RESPONSIVE` | `PASSED` | 색상/배경/광원/타이포 기본 토대 |
| CR-016 | 이런 우주느낌 형태로 | Home을 포스터형 히어로로 재구성 | `UI_UX`, `INFORMATION_ARCHITECTURE` | `BLOCKED` | CR-015 이후 |
| CR-017 | 이런 우주느낌 형태로 | Projects/Games를 비주얼 브라우징형 패널로 전환 | `UI_UX`, `MULTI_PAGE_STRUCTURE` | `BLOCKED` | CR-015 이후 |
| CR-018 | 이런 우주느낌 형태로 | footer와 보조 UI를 우주 테마에 맞게 연동 | `UI_UX`, `CONTENT` | `BLOCKED` | CR-015 이후 |

### Loop order

1. `L-007` 우주 테마 기반 색/배경/광원 설정
2. `L-008` 포스터형 히어로 재구성
3. `L-009` 카드/패널 비주얼 재배치
4. `L-010` footer 및 보조 UI 우주 테마 정렬

### Completion criteria

- 페이지 배경이 우주 느낌의 다크 톤으로 바뀐다.
- 텍스트와 패널이 네온/보라 계열로 통일된다.
- 기존 기능, 링크, 게임 조작은 유지된다.
- 모바일과 데스크톱에서 배경과 대비가 유지된다.

### Risk / HITL

- 위험도: `MEDIUM`
- 확인 메모: 실제로 원하는 우주 톤의 강도, 포스터형 레이아웃 범위, 이미지/일러스트 추가 여부

### Current planning status

`CHANGE_PLANNED`

### Follow-up validation

- 수정 파일:
  - `index.html`
  - `projects.html`
  - `games.html`
  - `styles.css`
- 추가 수정 파일:
  - `script.js`
  - `CHANGE_REQUEST.md`
  - `AORR.md`
  - `MEMORY.md`
- 검증:
  - 로컬 정적 서버에서 페이지 200 응답 확인
  - nav에서 About/Contact 상단 메뉴 제거 확인
  - footer shell 제거 후 footer flow 구조 확인
  - compact header + more-menu 토글 검증
  - more 버튼을 누르지 않으면 메뉴가 보이지 않는지 확인
  - footer가 full-width 배경 band를 쓰는지 확인
  - header가 full-width band를 쓰는지 확인
  - compact 상태에서 header 배경이 투명인지 확인
- Retry 횟수:
  - `1`
- 확인 메모:
  - footer 링크 문구의 추가 조정 여부
  - 더보기 메뉴의 추가 항목 노출 여부
