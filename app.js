const dates = ['2/25 · 수', '2/26 · 목', '2/27 · 금', '2/28 · 토'];

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
  home: () => `
    <section class="hero reveal">
      <p class="eyebrow">J-HOUSE · 2026</p>
      <h1>특별새벽기도</h1>
      <p class="lede">하루의 첫 시간을 함께 엽니다.<br>2.25 WED — 2.28 SAT</p>
    </section>
    <nav class="portal-actions reveal delay" aria-label="주요 기능">
      <button class="portal-card primary" data-go="login"><span>01</span><strong>출석 체크</strong><i>›</i></button>
      <button class="portal-card" data-go="stats"><span>02</span><strong>출석 현황</strong><i>›</i></button>
    </nav>
    <button class="quiet-link" data-go="admin">관리자</button>`,
  login: () => form('출석 체크', '등록된 가정으로 시작합니다.', '가정으로 들어가기', 'attendance'),
  register: () => form('신규 가정 등록', '입력한 내용은 실제로 저장되지 않는 시안입니다.', '등록하고 시작하기', 'attendance', true),
  admin: () => `
    ${back('관리자')}
    <section class="panel reveal"><p class="eyebrow">ADMIN ONLY</p><h2>출석 기록</h2><p class="muted">이 화면은 관리자 로그의 정보 구조를 보여주는 시안입니다.</p>
      <button class="wide-button" data-admin>관리자 화면 열기</button>
      <div class="log-preview"><span>06:04</span><span>새벽 1교구</span><span>12명 기록</span></div><div class="log-preview"><span>06:11</span><span>다음세대</span><span>7명 기록</span></div>
    </section>`,
};

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

function render(model) {
  const root = document.querySelector('#app');
  const screen = model.screen === 'attendance' ? attendance(model) : model.screen === 'stats' ? stats(model) : (copy[model.screen]?.() ?? copy.home());
  root.innerHTML = `<div class="shell"><header class="masthead"><button class="wordmark" data-go="home">✦ J-HOUSE</button><button class="menu" data-theme aria-label="테마 변경">${model.theme === 'dark' ? '◐' : '◑'}</button></header><div class="device">${screen}</div><footer>J-HOUSE SPECIAL DAWN PRAYER · PROTOTYPE</footer></div>`;
  document.documentElement.dataset.theme = model.theme;
  root.querySelectorAll('[data-go]').forEach((button) => button.addEventListener('click', () => { navigate(model, button.dataset.go); render(model); }));
  root.querySelector('[data-theme]').addEventListener('click', () => { model.theme = model.theme === 'dark' ? 'light' : 'dark'; render(model); });
  root.querySelector('[data-admin]')?.addEventListener('click', () => { root.querySelector('.panel').insertAdjacentHTML('beforeend', '<p class="saved">시안 모드 — 연결된 로그는 없습니다.</p>'); });
  root.querySelectorAll('[data-session]').forEach((button) => button.addEventListener('click', () => { toggleSession(model, ...button.dataset.session.split('|')); render(model); }));
  root.querySelector('[data-save]')?.addEventListener('click', () => { model.notice = '시안 모드에서 변경을 표시했습니다. 실제 데이터는 저장되지 않습니다.'; render(model); });
  root.querySelectorAll('[data-tab]').forEach((button) => button.addEventListener('click', () => { selectStatsTab(model, button.dataset.tab); render(model); }));
}

if (typeof document !== 'undefined') render(createAppModel());
