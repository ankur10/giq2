import React from 'react';

// Icon paths copied from the product's app.js so stage screens draw the same glyphs.
const paths = {
  home: 'm3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z',
  search: 'M17 10.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Zm-1 5.5 5 5',
  ask: 'M5 4h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-5 3V6a2 2 0 0 1 1-2ZM8 9h9M8 13h6',
  market: 'M4 20h16M6 16v-4m6 4V8m6 8V4m-14 4 6-4 5 2 5-3',
  competitor: 'M5 21V8h6v13M13 21V3h6v18M3 21h18M7 11h2m-2 4h2m6-8h2m-2 4h2m-2 4h2',
  customers: 'M12 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM3 20v-2a6 6 0 0 1 12 0v2M16 5a3 3 0 0 1 0 6m2 4a5 5 0 0 1 3 5',
  signals: 'M3 12h4l3-8 4 16 3-8h4',
  support: 'M4 13v-1a8 8 0 0 1 16 0v6a3 3 0 0 1-3 3h-5M2 14a2 2 0 0 1 4 0v3a2 2 0 0 1-4 0Zm16 0a2 2 0 0 1 4 0v3a2 2 0 0 1-4 0Z',
  arrow: 'M4 12h15m-6-6 6 6-6 6', chevron: 'm9 5 7 7-7 7', down: 'm6 9 6 6 6-6', check: 'm5 12 4 4L19 6',
  calendar: 'M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm2-2v4m10-4v4M3 10h18',
  document: 'M6 3h8l4 4v14H6zM14 3v5h4M9 12h6m-6 4h6',
  mail: 'M5 5h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm-2 1 9 7 9-7',
  g: 'M18 6a8 8 0 1 0 1 11v-5h-7',
  list: 'M9 5h12M9 12h12M9 19h12M3 5h1m-1 7h1m-1 7h1', branch: 'M9 2h6v5H9zM2 17h6v5H2zm14 0h6v5h-6zM12 7v5H5v5m7-5h7v5',
  sort: 'M8 3v18m-4-4 4 4 4-4m4-14v18m-4-14 4-4 4 4', info: 'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-1v6m0-10v.1',
  attachment: 'm8 13 7-7a3 3 0 0 1 4 4L9 20a5 5 0 0 1-7-7L12 3', mic: 'M9 5a3 3 0 0 1 6 0v7a3 3 0 0 1-6 0ZM5 10v2a7 7 0 0 0 14 0v-2M12 19v3m-4 0h8',
  download: 'M12 3v12m-5-5 5 5 5-5M4 17v4h16v-4', plus: 'M12 5v14M5 12h14', external: 'M14 3h7v7m0-7L10 14M10 5H4v15h15v-6',
};
export const Icon = ({name}) => <svg viewBox="0 0 24 24" aria-hidden="true"><path d={paths[name] || paths.document}/></svg>;
