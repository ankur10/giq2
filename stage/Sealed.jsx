import React, {forwardRef, useImperativeHandle, useLayoutEffect, useRef, useState} from 'react';
import {createPortal} from 'react-dom';

const cache = new Map();

// The product's stylesheets target the document. Inside a sealed scope the same rules must
// target the scope's host instead, and font faces are declared once by the stage itself.
function rewrite(css) {
  return css
    .replace(/@font-face\s*\{[^}]*\}/g, '')
    .replace(/:root(\[[^\]]+\])/g, ':host($1)')
    .replace(/:root/g, ':host')
    .replace(/(^|[},])\s*html\s*,\s*body\s*\{/g, '$1:host{')
    .replace(/(^|[},])\s*(?:html|body)\s*\{/g, '$1:host{');
}

export async function loadSheets(names) {
  await Promise.all(names.filter(name => !cache.has(name)).map(async name => {
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(rewrite(await (await fetch(name)).text()));
    cache.set(name, sheet);
  }));
}

// Renders children in an isolated style scope that uses the named product stylesheets untouched,
// so screens whose stylesheets disagree about variable names can share one page.
export const Sealed = forwardRef(function Sealed({sheets, extra = '', children, ...rest}, ref) {
  const host = useRef(null);
  const [root, setRoot] = useState(null);
  useLayoutEffect(() => {
    const shadow = host.current.shadowRoot || host.current.attachShadow({mode: 'open'});
    const own = new CSSStyleSheet();
    own.replaceSync(extra);
    shadow.adoptedStyleSheets = [...sheets.map(name => cache.get(name)), own];
    setRoot(shadow);
  }, []);
  useImperativeHandle(ref, () => root, [root]);
  return <div ref={host} {...rest}>{root && createPortal(children, root)}</div>;
});
