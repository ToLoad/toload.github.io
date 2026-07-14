# MEMORY

## Goal

- GitHub Pages용 프로페셔널 웹사이트를 완성한다.
- 반응형으로 데스크톱과 모바일을 모두 지원한다.
- 상단 `Games` 탭을 구현한다.
- 키보드와 모바일 터치로 조작 가능한 사과게임을 구현한다.
- GitHub Pages에 최초 배포한다.
- Step 1의 `[게임 추가 기능:]` 요구사항을 반영한다.

## Required Deliverables

- 프로젝트 루트의 `index.html`
- `styles.css`
- `script.js`
- 필요한 경우 별도 `game.js`
- 필요한 이미지 및 정적 `assets`
- `AORR.md`
- `MEMORY.md`

## Current Scope

- 정적 HTML
- CSS
- JavaScript
- 프로페셔널 웹사이트 콘텐츠
- 반응형 레이아웃
- `Games` 탭
- 사과게임
- GitHub Pages 배포

## Out of Scope

- 백엔드 서버
- 데이터베이스
- 로그인 및 회원가입
- 결제
- 사용자 개인정보 수집
- 별도 승인 없는 외부 API
- 별도 승인 없는 프레임워크 전환

## Current State

- 현재 상태: `DEPLOYED`
- 완료한 루프: 저장소 확인, `AORR.md` 작성, `MEMORY.md` 작성, 정적 사이트 기본 구조 1회 실행, 사과게임 포함 본 구현 및 로컬 검증, GitHub Pages 최초 배포
- 다음 루프: [사람 확인 필요] 추가 콘텐츠 보강 또는 후속 개선
- 현재 Retry 횟수: `0`
- 현재 오류 fingerprint: `NONE`
- Blocker: `NONE`
- 마지막 정상 상태: GitHub Pages `https://toload.github.io`가 200 응답을 반환하고 페이지 내용이 최신 구현을 반영한 상태

## Guardrails

- 기존 개인 콘텐츠를 임의로 삭제하지 않는다.
- 확인되지 않은 경력이나 프로젝트 정보를 생성하지 않는다.
- 테스트를 삭제하거나 완화하지 않는다.
- 토큰을 출력하지 않는다.
- 토큰을 HTML, CSS, JavaScript에 저장하지 않는다.
- 토큰을 Git에 커밋하지 않는다.
- `github_token.txt`를 커밋하지 않는다.
- `env_settings.txt`를 커밋하지 않는다.
- 백엔드 기능을 추가하지 않는다.
- 대규모 리팩토링을 하지 않는다.
- 테스트를 통과시키기 위해 기능을 제거하지 않는다.

## Acceptance Criteria

- 루트 `index.html`이 존재한다.
- 로컬 정적 서버에서 정상 로드된다.
- CSS와 JavaScript가 정상 로드된다.
- 콘솔 오류가 없다.
- 모바일 및 데스크톱에서 레이아웃이 정상이다.
- `Games` 탭이 정상 이동된다.
- 사과게임이 정상 실행된다.
- 키보드 조작이 정상이다.
- 모바일 터치 조작이 정상이다.
- 점수 및 재시작이 정상이다.
- GitHub Pages에서 HTTP 200 응답을 받는다.
- 배포된 사이트에서도 동일 기능이 정상 동작한다.

## Retry Policy

- 하나의 오류당 최대 3회만 재시도한다.
- 동일 오류 fingerprint가 2회 반복되면 중지한다.
- 한 번의 Retry에서는 하나의 원인만 수정한다.
- Retry마다 동일 Verifier를 재실행한다.

## HITL Conditions

- 개인 프로필 내용이 불명확하다.
- 기존 콘텐츠 삭제가 필요하다.
- 요구사항이 충돌한다.
- GitHub 저장소 권한이 부족하다.
- GitHub Pages 설정 변경이 필요하다.
- 외부 서비스 추가가 필요하다.
- Retry 한계에 도달했다.
- 사과게임의 정확한 장르와 조작 방식이 미확정이다.

## Tool Policy

- Codex는 작업 제어, 파일 수정, 테스트 실행을 담당한다.
- 가능하면 Claude Code CLI를 독립 Verifier로 사용한다.
- 실제 사용한 Claude 모델명을 기록한다.
- 토큰 값은 어떠한 실행 기록에도 남기지 않는다.

## Execution Log Template

- Loop ID
- 시작 시각
- 목표
- 시작 상태
- 가설
- Act
- 변경 파일
- Verifier
- 테스트 결과
- exit code
- 오류 fingerprint
- Retry 횟수
- 종료 상태
- 다음 작업
- 사람 확인 필요 항목

## Latest Execution Log

- Loop ID: `3`
- 시작 시각: `2026-07-14 14:03:59 +09:00`
- 목표: GitHub Pages 배포를 완료하고 배포 URL이 최신 구현을 반영하는지 확인하기
- 시작 상태: `DEPLOY_APPROVAL_REQUIRED`
- 가설: 커밋과 푸시 후 GitHub Pages가 자동으로 최신 정적 사이트를 제공할 것이다
- Act: commit, push, GitHub Pages HTTP 검증, 배포 내용 검증
- 변경 파일: `MEMORY.md`
- Verifier: `git status`, `git remote -v`, `git commit`, `git push`, `Invoke-WebRequest https://toload.github.io`
- Claude 모델명: `claude-sonnet-5`
- 테스트 결과: GitHub Pages `200`, 최신 페이지 내용에 `ToLoad`, `Games`, `사과게임` 반영 확인
- exit code: `0`
- 오류 fingerprint: `NONE`
- Retry 횟수: `0`
- 종료 상태: `DEPLOYED`
- 다음 작업: [사람 확인 필요] 실제 프로필 콘텐츠 보강 또는 추가 개선
- 사람 확인 필요 항목: 실제 프로필 이름/소개/경력/프로젝트/연락처, 후속 개선 범위

## Deployment Log

- Commit hash: `f2654ac`
- Push result: `main -> main`
- Deployment address: `https://toload.github.io`
- HTTP response: `200`
- Deployed site check: `ToLoad`, `Games`, `사과게임` 반영 확인
