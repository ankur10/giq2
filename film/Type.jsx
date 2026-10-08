import React, {useEffect, useRef, useState} from 'react';
import {words, question, answer, evidence, pages, productWindow, span} from './score.mjs';
import {pageRects, frameRect} from './line.mjs';

// What the words on screen should be at a given beat. Kept small so the page only re-renders
// when something actually changes.
function view(b) {
  return {
    words: words.filter(w => b >= w.from && b < w.to).map(w => w.id).join(','),
    typed: b < question.from ? 0 : Math.min(question.text.length, Math.ceil(question.text.length * span(b, question.from, question.to))),
    question: b >= 92 && b < question.leave + 1.4, leaving: b >= question.leave,
    answer: b >= answer.from && b < answer.to + 1, answerLeaving: b >= answer.to,
    evidence: evidence.filter(e => b >= e.at).length,
    pages: pages.filter(p => b >= p.at).length, stacked: b >= 136, pagesGone: b >= 146,
    window: b >= productWindow.from && b < productWindow.to,
  };
}
const vh = units => units * 100 + 'vh';
const box = r => ({left: `calc(50% + ${vh(r.x)})`, top: `calc(50% - ${vh(r.y + r.h)})`, width: vh(r.w), height: vh(r.h)});

// Screen-space words, the typed question, the pages and what sits inside the frame. It also
// tells the line where the text cursor and the underline belong, measured from the real text.
export default function Type({beat, anchors}) {
  const [v, setV] = useState(() => view(beat()));
  const typed = useRef(null), answerText = useRef(null);
  useEffect(() => {
    let frame, key = JSON.stringify(v);
    const units = (px, py) => ({x: (px - innerWidth / 2) / innerHeight, y: (innerHeight / 2 - py) / innerHeight});
    const loop = () => {
      const next = view(beat()), nextKey = JSON.stringify(next);
      if (nextKey !== key) { key = nextKey; setV(next); }
      if (typed.current) { const r = typed.current.getBoundingClientRect(); anchors.current.caret = units(r.right + innerHeight * 0.012, (r.top + r.bottom) / 2); }
      if (answerText.current) { const r = answerText.current.getBoundingClientRect(), a = units(r.left, r.bottom + innerHeight * 0.022); anchors.current.underline = {x: a.x, y: a.y, w: r.width / innerHeight}; }
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, []);

  return <div className="film-layer film-type">
    {words.map(w => <p key={w.id} className="film-word" data-place={w.place} data-on={v.words.split(',').includes(w.id)}>{w.text}</p>)}
    <p className="film-question" data-on={v.question && !v.leaving}><span ref={typed}>{question.text.slice(0, v.typed)}</span><span className="film-untyped">{question.text.slice(v.typed)}</span></p>
    <div className="film-answer" data-on={v.answer && !v.answerLeaving}>
      <p><span ref={answerText}>{answer.text}</span></p>
      <ul>{evidence.map((e, i) => <li key={e.text} data-on={i < v.evidence}>{e.text}</li>)}</ul>
    </div>
    <div className="film-pages" data-stacked={v.stacked} data-gone={v.pagesGone}>{pages.map((page, i) => <div key={page.word} className="film-page" data-on={i < v.pages} style={{...box(pageRects[i]), '--shift': vh(-pageRects[i].x - 0.15), '--tilt': (i - 1) * 4 + 'deg'}}>
      <small>{page.kind}</small><b>{page.title}</b><i/><i/><i/><i/><strong>{page.word}</strong></div>)}</div>
    <div className="film-window" data-on={v.window} style={box(frameRect)}><img src={productWindow.image} alt=""/></div>
  </div>;
}
