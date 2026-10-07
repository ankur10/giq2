// The whole demo as data: every word the audience reads and every step the presenter clicks.
// All companies and figures are fictional.
export const cast = {person: 'Maya', initials: 'MR', company: 'Norvane', companyInitials: 'NV', rival: 'Kestrow Group', startup: 'Thalic Cooling', customer: 'Arden Compute'};
export const closing = 'We see growth before it happens.';

// Step fields: screen and focus say where the camera looks ("screen:region"); cursor actions and
// carry are timed in seconds from the start of the step; cameraAt delays the camera move.
export const acts = [
  {id: 'open', name: 'Cold open', steps: [
    {id: 'clock', screen: 'inbox', focus: null, label: '', clock: '', duration: 8},
    {id: 'notify', screen: 'inbox', focus: null, label: '', clock: '', duration: 12},
  ]},
  {id: 'finds', name: 'It finds you', steps: [
    {id: 'digest', screen: 'radar', focus: 'mail-top', spot: false, label: 'Radar', clock: '6:43', duration: 10, cameraAt: 0.9, cursor: [{at: 0.1, to: 'inbox:notification', click: true}]},
    {id: 'headline', screen: 'radar', focus: 'story-0', label: 'Radar', clock: '6:43', duration: 10, cursor: [{at: 1.6, to: 'radar:story-0-title'}]},
    {id: 'briefing', screen: 'briefing', focus: 'reader', label: 'Your Briefing', clock: '6:44', duration: 10, cameraAt: 0.8, cursor: [{at: 0.1, to: 'radar:story-0-title', click: true}], carry: {from: 'radar:story-0-title', to: 'briefing:reader-title'}},
    {id: 'meaning', screen: 'briefing', focus: 'relevance', label: 'Your Briefing', clock: '6:44', duration: 12},
  ]},
];
export const steps = acts.flatMap((act, index) => act.steps.map(step => ({...step, act: index})));
export const screens = ['inbox', 'radar', 'briefing'];

export const inbox = {time: '6:42', day: 'Tuesday', app: 'GrowthIQ Radar', title: '3 things that moved overnight', preview: 'Kestrow Group acquires Thalic Cooling, and two more.'};

const signals = [
  {category: 'Competitor', kind: 'Acquisition', age: '6h ago', title: 'Kestrow Group acquires Thalic Cooling',
    summary: 'Kestrow Group has agreed to buy Thalic Cooling, a maker of direct-to-chip liquid cooling systems for data centres. Kestrow says the deal extends its pumps business into data-centre thermal management.',
    relevance: 'Data centres built for AI run too hot to cool with air. The liquid-cooling market that results depends on pumps and heat exchange, which is Norvane’s core expertise. A direct rival will now be selling into it.'},
  {category: 'Customer', kind: 'Expansion', age: '9h ago', title: 'Arden Compute announces two new data-centre campuses',
    summary: 'Arden Compute plans two new campuses designed for high-density computing.', relevance: 'Arden Compute is an existing Norvane customer for industrial pumps.'},
  {category: 'Market', kind: 'Regulation', age: '14h ago', title: 'New efficiency rules proposed for industrial pump motors',
    summary: 'Draft rules would raise minimum efficiency levels for large pump motors.', relevance: 'Norvane’s current range would need review against the proposed levels.'},
];
export const radar = {subject: 'Your GrowthIQ Radar: 3 things that moved overnight', to: 'maya@norvane.example', time: '6:42', heading: 'Your market, in focus.', summary: 'Three developments worth your attention this morning.', schedule: 'Every day at 6:30', stories: signals};
export const briefing = {title: 'Your growth briefing', subtitle: 'Your perspective on the markets, companies and moves that matter.', range: '1 Sep – 6 Oct 2026', signals,
  watch: [['Markets', '31', 'Industrial pumps, heat exchangers and more'], ['Competitors', '12', 'Kestrow Group and eleven others'], ['Customers', '24', 'Your customer intelligence workspace']]};
