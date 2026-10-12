// "The answer that changed", beat by beat. The screens are described in ../../screens.mjs.
import * as S from '../../screens.mjs';
export const beats = [
  {id: 'open', min: 9, ...S.clock},
  {id: 'briefings', min: 7, stamp: '6:44', ...S.briefings},
  {id: 'ask', min: 8, stamp: '6:50', ...S.ask},
  {id: 'answer', min: 10, stamp: '6:55', ...S.answer},
  {id: 'sources', min: 7, stamp: '7:10', ...S.sources},
  {id: 'assumptions', min: 10, stamp: '7:25', ...S.assumptions},
  {id: 'interviews', min: 8, stamp: '7:40', ...S.interviews},
  {id: 'verdict', min: 8, stamp: '8:05', ...S.verdict},
  {id: 'opportunities', min: 8, stamp: '8:20', ...S.reshuffled},
  {id: 'studio', min: 11, stamp: '8:35', ...S.studio},
  {id: 'nine', min: 7, headline: '9:00', ...S.field},
  {id: 'experts', min: 8, stamp: 'Monday', ...S.experts},
  {id: 'work', min: 10, stamp: 'Friday', ...S.work},
  {id: 'close', min: 8, ...S.close},
];
// The music falls away when the assumption fails: [beat, seconds into it, seconds long].
export const rests = [['verdict', 2.6, 4.6]];
