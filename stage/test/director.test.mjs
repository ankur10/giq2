import test from 'node:test';
import assert from 'node:assert/strict';
import {createDirector, actionForKey} from '../director.mjs';

const steps = [
  {id: 'a1', act: 0, duration: 10}, {id: 'a2', act: 0, duration: 4},
  {id: 'b1', act: 1, duration: 6}, {id: 'b2', act: 1, duration: 6}, {id: 'b3', act: 1, duration: 6},
  {id: 'c1', act: 2, duration: 5},
];
const at = d => d.state().id;

test('starts on the first step with no progress', () => {
  assert.deepEqual(createDirector({steps}).state(), {step: 0, id: 'a1', act: 0, seconds: 0, progress: 0, count: 6});
});
test('next and back move one step and stop at the ends', () => {
  const d = createDirector({steps});
  assert.equal(d.back(), false);
  for (let i = 0; i < 5; i++) assert.equal(d.next(), true);
  assert.equal(at(d), 'c1');
  assert.equal(d.next(), false);
  d.back();
  assert.equal(at(d), 'b3');
});
test('progress runs to 1 and holds; it never advances without input', () => {
  const d = createDirector({steps});
  d.tick(5);
  assert.deepEqual([d.state().progress, d.state().seconds], [0.5, 5]);
  d.tick(500);
  assert.deepEqual([d.state().step, d.state().progress, d.state().seconds], [0, 1, 10]);
});
test('skip forward lands on the first step of the next act and stops at the last act', () => {
  const d = createDirector({steps});
  d.next(); d.skip(1);
  assert.equal(at(d), 'b1');
  d.skip(1);
  assert.equal(at(d), 'c1');
  assert.equal(d.skip(1), false);
});
test('skip back goes to the start of this act, then to the previous act', () => {
  const d = createDirector({steps, start: 4});
  d.skip(-1);
  assert.equal(at(d), 'b1');
  d.skip(-1);
  assert.equal(at(d), 'a1');
  assert.equal(d.skip(-1), false);
});
test('act jumps to the first step of an act and ignores acts that do not exist', () => {
  const d = createDirector({steps});
  d.act(2);
  assert.equal(at(d), 'c1');
  assert.equal(d.act(9), false);
  assert.equal(at(d), 'c1');
});
test('changing step resets progress and notifies subscribers', () => {
  const d = createDirector({steps});
  const seen = [];
  d.subscribe(s => seen.push(s.id));
  d.tick(3); d.next();
  assert.equal(d.state().progress, 0);
  d.jump(4); d.jump(99); d.restart();
  assert.deepEqual(seen, ['a2', 'b3', 'c1', 'a1']);
});
test('autoplay advances at the end of each step and stops on the last', () => {
  const d = createDirector({steps, autoplay: true});
  d.tick(10);
  assert.equal(at(d), 'a2');
  for (let i = 0; i < 100; i++) d.tick(5);
  assert.deepEqual([at(d), d.state().progress], ['c1', 1]);
});
test('start options open a chosen step at a chosen progress', () => {
  const d = createDirector({steps, start: 2, startProgress: 1});
  assert.deepEqual([at(d), d.state().progress], ['b1', 1]);
});
test('keys map to actions', () => {
  for (const k of ['PageDown', 'ArrowRight', ' ']) assert.deepEqual(actionForKey(k), {type: 'next'});
  for (const k of ['PageUp', 'ArrowLeft']) assert.deepEqual(actionForKey(k), {type: 'back'});
  assert.deepEqual(actionForKey(']'), {type: 'skip', direction: 1});
  assert.deepEqual(actionForKey('['), {type: 'skip', direction: -1});
  assert.deepEqual(actionForKey('r'), {type: 'restart'});
  assert.deepEqual(actionForKey('F'), {type: 'fullscreen'});
  assert.deepEqual(actionForKey('3'), {type: 'act', act: 2});
  assert.equal(actionForKey('8'), null);
  assert.equal(actionForKey('x'), null);
});
test('seek puts the demo where a clock says it should be', () => {
  const d = createDirector({steps});
  const seen = [];
  d.subscribe(s => seen.push(s.id));
  d.seek(3);
  assert.deepEqual([at(d), d.state().seconds], ['a1', 3]);
  d.seek(10 + 4 + 2.5);
  assert.deepEqual([at(d), d.state().seconds], ['b1', 2.5]);
  d.seek(10.5);
  assert.deepEqual([at(d), d.state().seconds], ['a2', 0.5]);
  d.seek(9999);
  assert.deepEqual([at(d), d.state().progress], ['c1', 1]);
  assert.deepEqual(seen, ['b1', 'a2', 'c1']);
});
