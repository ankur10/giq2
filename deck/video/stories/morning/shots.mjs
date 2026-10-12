// "One morning", beat by beat. The screens are described in ../../screens.mjs.
import * as S from '../../screens.mjs';
export const beats = [
  {id: 'open', min: 9, ...S.clock},
  {id: 'briefings', min: 8, stamp: '6:44', ...S.briefings},
  {id: 'ask', min: 8, stamp: '6:50', ...S.ask},
  {id: 'answer', min: 11, stamp: '6:55', ...S.answer},
  {id: 'sources', min: 8, stamp: '7:10', ...S.sources},
  {id: 'assumptions', min: 10, stamp: '7:25', ...S.assumptions},
  {id: 'interviews', min: 9, stamp: '7:40', ...S.interviews},
  {id: 'opportunities', min: 10, stamp: '8:20', ...S.opportunities},
  {id: 'studio', min: 11, stamp: '8:35', ...S.studio},
  {id: 'nine', min: 8, headline: '9:00', ...S.field},
  {id: 'experts', min: 8, stamp: 'Monday', ...S.experts},
  {id: 'work', min: 9, stamp: 'Friday', ...S.work},
  {id: 'close', min: 8, ...S.close},
];
