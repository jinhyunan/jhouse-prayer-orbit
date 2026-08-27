import assert from 'node:assert/strict';
import test from 'node:test';
import { createAppModel, dawnEntry, entryDestinations, navigate, selectStatsTab, toggleSession } from '../app.js';

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

test('uses J-HOUSE September dawn gathering copy on the entry screen', () => {
  const entry = dawnEntry();

  assert.equal(entry.church, 'J-HOUSE');
  assert.equal(entry.date, '2026.9.1 (화) ~ 9.5 (토)');
  assert.match(entry.theme, /미래를 말씀하시는 하나님/);
  assert.match(entry.verse, /사도행전 13:21~23/);
});

test('offers the three requested dawn destinations', () => {
  assert.deepEqual(entryDestinations().map((item) => item.title), ['J-HOUSE의 새벽', '출석체크', '함께하는 새벽']);
});
