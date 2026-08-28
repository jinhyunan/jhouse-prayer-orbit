# J-HOUSE Orbit Prayer Prototype Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a deployable, interactive visual prototype that preserves the J-HOUSE special dawn prayer attendance app's primary flows while applying the Orbit design system.

**Architecture:** A dependency-free static site holds an accessible single-page prototype in `index.html`, with style and application state separated into `styles.css` and `app.js`. It models the original screens with safe fixture data; integration calls remain deliberately absent so the visual proposal cannot alter live attendance data.

**Tech Stack:** HTML, CSS, vanilla JavaScript, Node built-in test runner, GitHub Pages.

**Spec:** `/Users/jh/Documents/temp/orbit-name-design/DESIGN.md`; original app reference: `/Users/jh/Documents/resources/references/save_to_home/260223_index_html.txt`.

## Global Constraints

- Default UI is Orbit dark: `#0a0a0b` canvas, `#f2f1ee` primary text, `#a3a2a0` secondary, and `#6e6d6b` metadata.
- Preserve the original app's home, sign-in, registration, attendance, statistics, and administrator entry flows as a visual prototype.
- No Google Apps Script calls, live credentials, or production attendance writes are permitted in the prototype.
- The primary narrow-screen design must work from 320px upward; desktop may become a centered device preview.
- Tests must use Node built-ins only and must fail before `app.js` is added.

---

### Task 1: Establish a testable static application shell

**Files:**
- Create: `package.json`
- Create: `test/app.test.js`
- Create: `index.html`

**Interfaces:**
- Consumes: browser `document` and `window`.
- Produces: a document with `#app` and screen templates identified by `data-screen`.

- [ ] **Step 1: Write the failing test**

```js
test('renders the home screen model', () => {
  const model = createAppModel();
  assert.equal(model.screen, 'home');
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`

Expected: FAIL because `app.js` and `createAppModel` do not exist.

- [ ] **Step 3: Create the minimal page shell**

```html
<main id="app" aria-live="polite"></main>
<script type="module" src="app.js"></script>
```

- [ ] **Step 4: Run test to verify it passes after Task 2 adds the model**

Run: `npm test`

Expected: PASS.

### Task 2: Implement Orbit tokens and the home/identity surface

**Files:**
- Create: `styles.css`
- Create: `app.js`
- Modify: `index.html`
- Modify: `test/app.test.js`

**Interfaces:**
- Consumes: `createAppModel()` and `navigate(screen)` exported from `app.js`.
- Produces: home screen actions that set the active screen to `login`, `stats`, or `admin`.

- [ ] **Step 1: Add failing navigation assertions**

```js
const model = createAppModel();
navigate(model, 'login');
assert.equal(model.screen, 'login');
```

- [ ] **Step 2: Run the test and confirm it fails because `navigate` is absent**

Run: `npm test`

Expected: FAIL with an export or reference error for `navigate`.

- [ ] **Step 3: Implement the minimal model, renderer, and Orbit styling**

```js
export function navigate(model, screen) {
  model.screen = screen;
  return model;
}
```

Implement an Orbit masthead, the event name and date, two framed action surfaces, and a compact menu/theme toggle. Use 20px rounded framed objects with `rgba(255,255,255,.12)` rings.

- [ ] **Step 4: Run tests**

Run: `npm test`

Expected: PASS.

### Task 3: Build interactive attendance and registration prototype states

**Files:**
- Modify: `app.js`
- Modify: `styles.css`
- Modify: `test/app.test.js`

**Interfaces:**
- Consumes: `toggleSession(model, date, person, session)`.
- Produces: a rendered `attendance` screen with family data and per-session state.

- [ ] **Step 1: Add a failing toggle assertion**

```js
const model = createAppModel();
toggleSession(model, '2/25', '홍길동', '1부');
assert.equal(model.attendance['2/25']['홍길동'].includes('1부'), true);
```

- [ ] **Step 2: Run the test and confirm it fails because `toggleSession` is absent**

Run: `npm test`

Expected: FAIL with a reference error for `toggleSession`.

- [ ] **Step 3: Implement toggling and render the interaction states**

```js
export function toggleSession(model, date, person, session) {
  const sessions = model.attendance[date][person];
  model.attendance[date][person] = sessions.includes(session)
    ? sessions.filter((item) => item !== session)
    : [...sessions, session];
}
```

Render login/register forms, fixture-family sign-in behavior, attendance summaries, four day objects, session buttons, and a non-persistent “저장됨” response.

- [ ] **Step 4: Run tests**

Run: `npm test`

Expected: PASS.

### Task 4: Add statistics and administrator visual states

**Files:**
- Modify: `app.js`
- Modify: `styles.css`
- Modify: `test/app.test.js`

**Interfaces:**
- Consumes: `selectStatsTab(model, tab)`.
- Produces: static but switchable overview, daily, detail, streak, and administrator screens.

- [ ] **Step 1: Add a failing stats-tab assertion**

```js
const model = createAppModel();
selectStatsTab(model, 'streak');
assert.equal(model.statsTab, 'streak');
```

- [ ] **Step 2: Run the test and confirm it fails because `selectStatsTab` is absent**

Run: `npm test`

Expected: FAIL with a reference error for `selectStatsTab`.

- [ ] **Step 3: Implement tab state and information-forward rendering**

```js
export function selectStatsTab(model, tab) {
  model.statsTab = tab;
}
```

Use fixture counts, CSS bars, and a compact activity log; do not introduce chart dependencies.

- [ ] **Step 4: Run tests**

Run: `npm test`

Expected: PASS.

### Task 5: Verify and publish the prototype

**Files:**
- Create: `README.md`
- Create: `.github/workflows/pages.yml`

**Interfaces:**
- Consumes: checked-in static files.
- Produces: a GitHub Pages artifact on pushes to `main`.

- [ ] **Step 1: Add a failing structure check**

```js
assert.match(readFileSync('index.html', 'utf8'), /id="app"/);
```

- [ ] **Step 2: Run tests to confirm the intended check runs**

Run: `npm test`

Expected: PASS after preceding tasks; this is a guard against a broken deployable shell.

- [ ] **Step 3: Add deployment workflow and handoff documentation**

Use `actions/upload-pages-artifact@v3` and `actions/deploy-pages@v4`, with workflow permissions `pages: write` and `id-token: write`. Document that GitHub Pages must be enabled once in repository Settings if GitHub rejects the initial deployment.

- [ ] **Step 4: Verify locally and remotely**

Run: `npm test && python3 -m http.server 4173`

Expected: test suite passes; the page loads at `http://localhost:4173`.

Commit and push the repository, then check the Actions workflow and Pages deployment status.

## Self-Review

- Orbit dark palette, warm three-step text ladder, framed objects, responsive device-centered layout, and controlled reveal are covered in Task 2.
- The original home, registration/login, attendance, stats, and admin information architecture are covered across Tasks 2–4.
- Prototype-only/no live data policy is enforced in the global constraints and implementation scope.
- Deployment is covered in Task 5.
- Placeholder scan: no TODO/TBD or undeclared implementation dependency remains.
