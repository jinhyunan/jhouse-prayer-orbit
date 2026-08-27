import assert from 'node:assert/strict';
import test from 'node:test';
import {
  createAppModel,
  entryDestinations,
  navigate,
  selectStatsTab,
  splashMarkup,
  SPLASH_MS,
  SPLASH_OUT_MS,
  toggleSession
} from '../app.js';

test('renders the home screen model', () => {
  const model = createAppModel();

  assert.equal(model.screen, 'home');
});

test('navigates from home to login', () => {
  const model = createAppModel();

  navigate(model, 'login');

  assert.equal(model.screen, 'login');
});

test('toggles a person attendance session', () => {
  const model = createAppModel();

  toggleSession(model, '2/25 · 수', '안진현', '1부');

  assert.equal(model.attendance['2/25 · 수']['안진현'].includes('1부'), true);
});

test('selects a statistics tab', () => {
  const model = createAppModel();

  selectStatsTab(model, 'streak');

  assert.equal(model.statsTab, 'streak');
});

test('offers the three requested dawn destinations', () => {
  assert.deepEqual(entryDestinations().map((item) => item.title), ['J-HOUSE의 새벽', '출석체크', '함께하는 새벽']);
});

test('uses the exact handed-off splash assets and timeline', () => {
  const markup = splashMarkup();

  assert.equal(SPLASH_MS, 10000);
  assert.equal(SPLASH_OUT_MS, 900);
  assert.match(markup, /id="appSplash"/);
  assert.match(markup, /src="assets\/splash\.mp4"/);
  assert.match(markup, /poster="assets\/splash-poster\.webp"/);
  assert.match(markup, /autoplay muted playsinline loop preload="auto"/);
  for (const name of ['church', 'dates', 'title', 'times', 'logo']) {
    assert.match(markup, new RegExp(`assets/poster/${name}\\.svg`));
  }
});
