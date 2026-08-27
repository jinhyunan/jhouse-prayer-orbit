const dates = ['2/25 · 수', '2/26 · 목', '2/27 · 금', '2/28 · 토'];

export const SPLASH_MS = 10000;
export const SPLASH_OUT_MS = 900;

export function splashMarkup() {
  return `<div id="appSplash" style="position:absolute;inset:0;z-index:9999;border-radius:inherit">
  <video class="sp-video" src="assets/splash.mp4" poster="assets/splash-poster.webp"
         autoplay muted playsinline loop preload="auto"></video>
  <div class="sp-dim"></div>
  <div class="sp-text">
    <img class="sp-church" src="assets/poster/church.svg" alt="MYUNGSUNG CHURCH 2026 9월 특별새벽집회">
    <img class="sp-dates" src="assets/poster/dates.svg" alt="9월 1일 화요일부터 9월 5일 토요일까지">
    <img class="sp-title" src="assets/poster/title.svg" alt="미래를 말씀하시는 하나님 · 사도행전 13장 21-23절">
    <img class="sp-times" src="assets/poster/times.svg" alt="1부 05:40 2부 07:30 3부 08:30 · TV 생중계 C Channel · youtube.com/onlylord">
    <img class="sp-logo" src="assets/poster/logo.svg" alt="명성교회">
  </div>
</div>`;
}

export function dismissSplash() {
  const el = document.getElementById('appSplash');
  if (!el || el.dataset.out) return;
  el.dataset.out = '1';
  el.classList.add('sp-out');
  setTimeout(() => el.remove(), SPLASH_OUT_MS);
}

export function entryDestinations() {
  return [
    { title: 'J-HOUSE의 새벽', detail: '9월 특별새벽집회', screen: 'login' },
    { title: '출석체크', detail: '가정별 출석을 기록합니다', screen: 'login' },
    { title: '함께하는 새벽', detail: '함께 모인 새벽을 봅니다', screen: 'stats' }
  ];
}

export function createAppModel() {
  return { screen: 'home', theme: 'dark', statsTab: 'overview', notice: '', dates,
    attendance: Object.fromEntries(dates.map((date) => [date, { '안진현': [], '이소연': [] }])) };
}

export function navigate(model, screen) {
  model.screen = screen;
  model.notice = '';
  return model;
}

export function toggleSession(model, date, person, session) {
  const sessions = model.attendance[date][person];
  model.attendance[date][person] = sessions.includes(session) ? sessions.filter((item) => item !== session) : [...sessions, session];
}

export function selectStatsTab(model, tab) {
  model.statsTab = tab;
}

const copy = {
  home: () => portalHome(),
  login: () => form('출석 체크', '등록된 가정으로 시작합니다.', '가정으로 들어가기', 'attendance'),
  register: () => form('신규 가정 등록', '입력한 내용은 실제로 저장되지 않는 시안입니다.', '등록하고 시작하기', 'attendance', true),
  admin: () => `
    ${back('관리자')}
    <section class="panel reveal"><p class="eyebrow">ADMIN ONLY</p><h2>출석 기록</h2><p class="muted">이 화면은 관리자 로그의 정보 구조를 보여주는 시안입니다.</p>
      <button class="wide-button" data-admin>관리자 화면 열기</button>
      <div class="log-preview"><span>06:04</span><span>새벽 1교구</span><span>12명 기록</span></div><div class="log-preview"><span>06:11</span><span>다음세대</span><span>7명 기록</span></div>
    </section>`,
};

function portalHome() {
  return `<section class="portal-home reveal"><p class="portal-kicker">J-HOUSE · DAWN 2026</p><h1>새벽을<br>함께 엽니다.</h1><p class="portal-lede">9월 특별새벽집회 · 9.1 — 9.5</p><nav class="dawn-destinations" aria-label="특별새벽집회 메뉴">${entryDestinations().map((item, index) => `<button class="dawn-destination" data-go="${item.screen}"><span class="destination-number">0${index + 1}</span><strong>${item.title}</strong><small>${item.detail}</small><i>›</i></button>`).join('')}</nav></section>`;
}

function attendance(model) {
  const total = Object.values(model.attendance).flatMap((day) => Object.values(day)).flat().length;
  return `${back('출석 체크')}<section class="family reveal"><p class="eyebrow">FAMILY</p><h2>안진현 · 이소연</h2><p>새벽 1교구 <span>${total}회 기록</span></p></section><section class="attendance-list">${dates.map((date) => `<article class="day-card"><div class="day-title"><strong>${date}</strong><span>${Object.values(model.attendance[date]).flat().length ? '기록 중' : '아직 기록 없음'}</span></div>${['안진현', '이소연'].map((person) => `<div class="person-row"><b>${person}</b><div class="sessions">${['1부', '2부', '3부', '온라인'].map((session) => `<button class="session ${model.attendance[date][person].includes(session) ? 'active' : ''}" data-session="${date}|${person}|${session}">${session}</button>`).join('')}</div></div>`).join('')}</article>`).join('')}</section><button class="save-button" data-save>변경사항 저장</button>${model.notice ? `<p class="saved center">${model.notice}</p>` : ''}`;
}

function stats(model) {
  const tabs = [['overview', '종합'], ['daily', '일자별'], ['detail', '상세'], ['streak', '연속']];
  const views = {
    overview: '<p class="eyebrow">OVERVIEW</p><h2>이번 집회, 함께 모인 시간</h2><div class="metric"><b>86</b><span>가정 출석</span></div><div class="bars"><p>새벽 1교구 <i style="width:88%"></i><em>32</em></p><p>새벽 2교구 <i style="width:67%"></i><em>24</em></p><p>다음세대 <i style="width:48%"></i><em>17</em></p></div>',
    daily: '<p class="eyebrow">DAILY</p><h2>일자별 기록</h2><div class="bars"><p>2/25 · 수 <i style="width:78%"></i><em>68</em></p><p>2/26 · 목 <i style="width:92%"></i><em>81</em></p><p>2/27 · 금 <i style="width:73%"></i><em>64</em></p><p>2/28 · 토 <i style="width:57%"></i><em>50</em></p></div>',
    detail: '<p class="eyebrow">DETAIL</p><h2>소속별 상세</h2><div class="stat-list"><p>새벽 1교구 <b>32 가정</b></p><p>새벽 2교구 <b>24 가정</b></p><p>다음세대 <b>17 가정</b></p></div>',
    streak: '<p class="eyebrow">STREAK</p><h2>연속 출석</h2><div class="stat-list"><p>안진현 · 이소연 <b>4일</b></p><p>김하늘 · 박소망 <b>4일</b></p><p>이은혜 · 최민준 <b>3일</b></p></div>'
  };
  return `${back('출석 현황')}<div class="tabs">${tabs.map(([key,label]) => `<button class="${model.statsTab === key ? 'active' : ''}" data-tab="${key}">${label}</button>`).join('')}</div><section class="panel reveal stats-panel">${views[model.statsTab]}</section>`;
}

function form(title, detail, action, target, register = false) {
  return `${back(title)}<section class="panel reveal"><p class="eyebrow">${register ? 'NEW FAMILY' : 'WELCOME BACK'}</p><h2>${title}</h2><p class="muted">${detail}</p>
    <label>이름<input placeholder="이름을 입력하세요" ${register ? '' : 'value="안진현"'}></label>
    <label>전화번호 뒷자리<input inputmode="numeric" placeholder="0000" ${register ? '' : 'value="1234"'}></label>
    ${register ? '<label>소속<select><option>새벽 1교구</option><option>다음세대</option></select></label>' : ''}
    <button class="wide-button" data-go="${target}">${action}<i>›</i></button>
    ${register ? '' : '<button class="text-button" data-go="register">처음이신가요? 신규 등록</button>'}
  </section>`;
}

function back(title) { return `<header class="subhead"><button aria-label="이전" data-go="home">←</button><strong>${title}</strong><span></span></header>`; }

function render(model, includeSplash = false) {
  const root = document.querySelector('#app');
  const screen = model.screen === 'attendance' ? attendance(model) : model.screen === 'stats' ? stats(model) : (copy[model.screen]?.() ?? copy.home());
  root.innerHTML = `${includeSplash ? splashMarkup() : ''}<div class="shell"><header class="masthead"><button class="wordmark" data-go="home">✦ J-HOUSE</button><button class="menu" data-theme aria-label="테마 변경">${model.theme === 'dark' ? '◐' : '◑'}</button></header><div class="device">${screen}</div><footer>J-HOUSE SPECIAL DAWN PRAYER · PROTOTYPE</footer></div>`;
  document.documentElement.dataset.theme = model.theme;
  root.querySelectorAll('[data-go]').forEach((button) => button.addEventListener('click', () => { navigate(model, button.dataset.go); render(model); }));
  root.querySelector('[data-theme]')?.addEventListener('click', () => { model.theme = model.theme === 'dark' ? 'light' : 'dark'; render(model); });
  root.querySelector('[data-admin]')?.addEventListener('click', () => { root.querySelector('.panel').insertAdjacentHTML('beforeend', '<p class="saved">시안 모드 — 연결된 로그는 없습니다.</p>'); });
  root.querySelectorAll('[data-session]').forEach((button) => button.addEventListener('click', () => { toggleSession(model, ...button.dataset.session.split('|')); render(model); }));
  root.querySelector('[data-save]')?.addEventListener('click', () => { model.notice = '시안 모드에서 변경을 표시했습니다. 실제 데이터는 저장되지 않습니다.'; render(model); });
  root.querySelectorAll('[data-tab]').forEach((button) => button.addEventListener('click', () => { selectStatsTab(model, button.dataset.tab); render(model); }));
}

if (typeof document !== 'undefined') {
  render(createAppModel(), true);
  setTimeout(dismissSplash, SPLASH_MS);
}
