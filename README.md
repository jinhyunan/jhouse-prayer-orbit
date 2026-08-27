# J-HOUSE 특별새벽기도 · Orbit 시안

기존 Google Apps Script 출석체크의 화면 흐름을 Orbit 디자인 시스템으로 재해석한, 데이터 비연결 인터랙티브 시안입니다.

## 포함된 화면

- 특별새벽기도 홈
- 로그인과 신규 가정 등록
- 가정별 일자/예배 출석 토글
- 출석 현황의 종합·일자별·상세·연속 출석 탭
- 관리자 로그 정보 구조

모든 수치는 fixture이며, 이 저장소에는 Google Apps Script 호출이나 실제 출석 데이터 쓰기 기능이 없습니다.

## 로컬에서 보기

```bash
npm test
python3 -m http.server 4173
```

브라우저에서 `http://localhost:4173`을 엽니다.

## 배포

현재 GitHub 계정 플랜은 private 저장소의 Pages를 지원하지 않아, 배포 워크플로는 수동 실행으로만 보존되어 있습니다. private Pages가 가능한 플랜으로 전환하면 `pages.yml`의 `push` 트리거를 다시 활성화할 수 있습니다. 로컬 미리보기는 계속 가능하며, private를 유지한 외부 URL이 필요하면 별도 인증형 프리뷰 호스트를 연결해야 합니다.
