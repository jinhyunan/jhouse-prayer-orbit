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

`main`에 푸시하면 GitHub Pages 워크플로가 실행됩니다. 저장소가 비공개이므로 GitHub 계정 요금제/조직 정책상 private Pages 사용이 허용되어야 합니다. 허용되지 않으면 로컬 미리보기는 계속 가능하며, 별도 인증형 프리뷰 호스트를 연결하면 됩니다.
