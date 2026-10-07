import test from 'node:test';
import assert from 'node:assert/strict';
import {createDirector, actionForKey} from '../director.mjs';
import {beats} from '../story.mjs';

test('starts on the first beat with no progress', () => {
  const d = createDirector({beats});
  assert.deepEqual(d.state(), {beat: 0, id: 'question', progress: 0, count: 6});
});
test('next and back move one beat and stop at the ends', () => {
  const d = createDirector({beats});
  assert.equal(d.back(), false);
  for (let i = 0; i < 5; i++) assert.equal(d.next(), true);
  assert.equal(d.state().id, 'pullback');
  assert.equal(d.next(), false);
  d.back();
  assert.equal(d.state().id, 'brief');
});
test('progress runs to 1 and holds; it never advances the beat without input', () => {
  const d = createDirector({beats});
  d.tick(5);
  assert.equal(d.state().progress, 0.5);
  d.tick(500);
  assert.deepEqual([d.state().beat, d.state().progress], [0, 1]);
});
test('changing beat resets progress and notifies subscribers', () => {
  const d = createDirector({beats});
  const seen = [];
  d.subscribe(s => seen.push(s.id));
  d.tick(3); d.next();
  assert.equal(d.state().progress, 0);
  d.jump(4); d.jump(99); d.restart();
  assert.deepEqual(seen, ['world', 'brief', 'pullback', 'question']);
});
test('autoplay advances at the end of each beat and stops on the last', () => {
  const d = createDirector({beats, autoplay: true});
  d.tick(10);
  assert.equal(d.state().id, 'world');
  for (let i = 0; i < 100; i++) d.tick(5);
  assert.deepEqual([d.state().id, d.state().progress], ['pullback', 1]);
});
test('start options open a chosen beat at a chosen progress', () => {
  const d = createDirector({beats, start: 2, startProgress: 1});
  assert.deepEqual([d.state().id, d.state().progress], ['lenses', 1]);
});
test('keys map to actions', () => {
  for (const k of ['PageDown', 'ArrowRight', ' ']) assert.deepEqual(actionForKey(k), {type: 'next'});
  for (const k of ['PageUp', 'ArrowLeft']) assert.deepEqual(actionForKey(k), {type: 'back'});
  assert.deepEqual(actionForKey('r'), {type: 'restart'});
  assert.deepEqual(actionForKey('F'), {type: 'fullscreen'});
  assert.deepEqual(actionForKey('3'), {type: 'jump', beat: 2});
  assert.equal(actionForKey('7'), null);
  assert.equal(actionForKey('x'), null);
});
