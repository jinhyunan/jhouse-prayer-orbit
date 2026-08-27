import assert from 'node:assert/strict';
import test from 'node:test';
import { createAppModel, navigate, selectStatsTab, toggleSession } from '../app.js';

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
