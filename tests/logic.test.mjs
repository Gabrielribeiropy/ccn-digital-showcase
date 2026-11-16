import test from 'node:test';
import assert from 'node:assert/strict';
import { initialItems } from '../data.mjs';
import { toggleItem, visibleItems } from '../logic.mjs';

test('public view excludes unpublished demo content', () => {
  const shown = visibleItems(initialItems);
  assert.equal(shown.length, 5);
  assert.equal(shown.some(item => item.id === 'archive'), false);
});

test('search and category filters work in both languages', () => {
  assert.deepEqual(visibleItems(initialItems, { category: 'services', query: 'reservas' }).map(item => item.id), ['spaces']);
  assert.deepEqual(visibleItems(initialItems, { category: 'resources', query: 'calendar', language: 'en' }).map(item => item.id), ['calendar']);
});

test('panel preview changes a copy of data without mutating the source', () => {
  const updated = toggleItem(initialItems, 'archive');
  assert.equal(updated.find(item => item.id === 'archive').visible, true);
  assert.equal(initialItems.find(item => item.id === 'archive').visible, false);
  assert.equal(visibleItems(updated).length, 6);
});

test('rejects unknown IDs and categories', () => {
  assert.throws(() => toggleItem(initialItems, 'missing'), TypeError);
  assert.throws(() => visibleItems(initialItems, { category: 'admin' }), TypeError);
});
