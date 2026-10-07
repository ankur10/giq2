# Reusable updated-field highlight

Copy `highlight-update.mjs` into the destination repository. It exports `highlightUpdate(element, options)` and requires no dependencies or stylesheets. The existing Ask GrowthIQ composer is a working integration example in `ask-results.jsx`.

The default effect is stationary: pale yellow (`#FFF2BF`) with a subtle gold border (`#C9AE60`), a gentle onset, a short hold and a gradual fade across 4.4 seconds. It returns to the element's computed theme/focus colors. Reduced-motion users get a shorter, color-only cue. Repeated calls on the same element cancel and restart the prior effect. Unsupported browsers safely skip the animation.

## Vanilla JavaScript

```js
import { highlightUpdate } from './highlight-update.mjs';

textarea.value = suggestedQuestion;
textarea.focus({ preventScroll: true });
const cancelHighlight = highlightUpdate(composer);
// Call cancelHighlight() if this view is removed before completion.
```

The function does not set text, focus, resize fields, announce changes or submit forms. Those remain the caller's responsibility. Apply it to the surface that paints the background; an opaque child textarea can obscure the parent highlight.

## React

```jsx
const composer = useRef(null);
const input = useRef(null);
const [draft, setDraft] = useState('');
const [revision, setRevision] = useState(0);

function prepareFollowup(question) {
  setDraft(question);
  setRevision(n => n + 1); // Replays even if the same suggestion is chosen.
}

useEffect(() => {
  if (!revision) return;
  input.current?.focus({ preventScroll: true });
  return highlightUpdate(composer.current); // Cleanup on repeat/unmount.
}, [revision]);
```

Attach `composer` to the enclosing surface and `input` to the controlled textarea. Use a polite live region to announce that the suggestion was added. Keep the full question immediately editable; do not simulate typing or submit automatically.

## Options

```js
highlightUpdate(element, {
  background: '#FFF2BF', // Choose theme-appropriate colors with readable contrast.
  border: '#C9AE60',
  duration: 4400,       // Total milliseconds, including onset and hold.
  reducedMotionDuration: 1400,
});
```

Pass a duration of zero to skip the effect. The host needs a visible border for the border color to appear. No inline styles persist when the effect completes or is cancelled.

## Instructions to give Claude Code

> Integrate `ui/highlight-update.mjs` into the existing recommended-follow-up flow. Preserve the repository's current state management, text, API contracts and submit behavior. After React commits the suggested text, focus the textarea without scrolling and call `highlightUpdate` on its containing surface. Return its cancellation function from the effect. Keep repeated selection replayable and preserve an accessible update announcement. Use theme-appropriate pale-yellow colors; do not add another animation library. Verify text insertion, continued editing, repeated clicks, cleanup on unmount, reduced motion and restoration of focused/theme colors. No request should be sent until the user explicitly submits.
