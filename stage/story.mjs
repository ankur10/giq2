// The whole demo as data: every word the audience reads and every step the presenter clicks.
// All companies and figures are fictional.
export const cast = {person: 'Maya', initials: 'MR', company: 'Norvane', companyInitials: 'NV', rival: 'Kestrow Group', startup: 'Thalic Cooling', customer: 'Arden Compute'};
export const closing = 'We see growth before it happens.';

// Step fields: screen and focus say where the camera looks ("screen:region"); cursor actions and
// carry are timed in seconds from the start of the step; cameraAt delays the camera move.
// arrivals are cards that fly in from the direction of the screen they came from.
// duration is the target when a presenter narrates live; min is how long the step's own
// visuals take, which the narrated version uses as a floor.
export const acts = [
  {id: 'open', name: 'Cold open', steps: [
    {id: 'clock', min: 5, screen: 'inbox', focus: null, label: '', clock: '', duration: 8},
    {id: 'notify', min: 4, screen: 'inbox', focus: null, label: '', clock: '', duration: 12},
  ]},
  {id: 'finds', name: 'It finds you', steps: [
    {id: 'digest', min: 5, screen: 'radar', focus: 'mail-top', spot: false, label: 'Radar', clock: '6:43', duration: 10, cameraAt: 0.9, cursor: [{at: 0.1, to: 'inbox:notification', click: true}]},
    {id: 'headline', min: 4, screen: 'radar', focus: 'story-0', label: 'Radar', clock: '6:43', duration: 10, cursor: [{at: 1.6, to: 'radar:story-0-title'}]},
    {id: 'briefing', min: 5, screen: 'briefing', focus: 'reader', label: 'Your Briefing', clock: '6:44', duration: 10, cameraAt: 0.8, cursor: [{at: 0.1, to: 'radar:story-0-title', click: true}], carry: {from: 'radar:story-0-title', to: 'briefing:reader-title'}},
    {id: 'meaning', min: 4, screen: 'briefing', focus: 'relevance', label: 'Your Briefing', clock: '6:44', duration: 12},
  ]},
  {id: 'around', name: 'What’s really going on?', steps: [
    {id: 'ecosystem', min: 6, screen: 'markets', focus: 'ecosystem', spot: false, label: 'Markets', clock: '6:51', duration: 10, pre: 'briefing', cameraAt: 2.3, cursor: [{at: 1.3, to: 'briefing:nav-markets', click: true}]},
    {id: 'field', min: 12, screen: 'markets', focus: 'ecosystem', spot: false, label: 'Markets', clock: '6:52', duration: 15},
    {id: 'market', min: 4.5, screen: 'markets', focus: 'inspector', label: 'Markets', clock: '6:53', duration: 12},
    {id: 'presence', min: 6.5, screen: 'competitors', focus: 'presence', label: 'Competitors', clock: '6:56', duration: 12, pre: 'markets', cameraAt: 2.3, cursor: [{at: 1.3, to: 'markets:nav-competitors', click: true}]},
    {id: 'benchmark', min: 6, screen: 'benchmark', focus: 'chart', label: 'Benchmarking', clock: '6:59', duration: 12, cameraAt: 0.9, cursor: [{at: 0.2, to: 'competitors:compare-financials', click: true}]},
  ]},
  {id: 'ask', name: 'Ask', steps: [
    {id: 'question', min: 9.5, screen: 'ask', focus: 'composer', label: 'Ask GrowthIQ', clock: '7:05', duration: 12, pre: 'benchmark', cameraAt: 2.3, cursor: [{at: 1.3, to: 'benchmark:nav-ask', click: true}, {at: 4.4, to: 'ask:query', click: true}]},
    {id: 'answer', min: 10, screen: 'answer', focus: 'answer', label: 'Ask GrowthIQ', clock: '7:06', duration: 16, cameraAt: 0.9, cursor: [{at: 0.2, to: 'ask:send', click: true}]},
    {id: 'sources', min: 8, screen: 'answer', focus: 'evidence', label: 'Ask GrowthIQ', clock: '7:07', duration: 12, arrivals: [{at: 2.2, from: 'briefing', to: 'answer:evidence-0'}, {at: 3.2, from: 'markets', to: 'answer:evidence-1'}, {at: 4.2, from: 'competitors', to: 'answer:evidence-2'}]},
    {id: 'research', min: 7, screen: 'answer', focus: 'research', label: 'Ask GrowthIQ', clock: '7:08', duration: 12, pre: 'answer', cameraAt: 3, cursor: [{at: 1.4, to: 'answer:tab-research', click: true}]},
  ]},
  {id: 'deeper', name: 'Go deeper', steps: [
    {id: 'flag', min: 7, screen: 'answer', focus: 'open-question', label: 'Ask GrowthIQ', clock: '7:12', duration: 10, pre: 'answer', cameraAt: 3, cursor: [{at: 1.4, to: 'answer:tab-answer', click: true}]},
    {id: 'expert', min: 10, screen: 'expert', focus: 'expert-form', label: 'Ask Domain Expert', clock: '7:14', duration: 13, cameraAt: 0.6, carry: {from: 'answer:open-question-text', to: 'expert:details'}, cursor: [{at: 6.5, to: 'expert:submit', click: true}]},
    {id: 'customers', min: 8.5, screen: 'customers', focus: 'customer-list', label: 'Customers', clock: '7:20', duration: 12, pre: 'expert', cameraAt: 2.3, cursor: [{at: 1.3, to: 'expert:nav-customers', click: true}, {at: 4.6, to: 'customers:filter', click: true}]},
  ]},
  {id: 'real', name: 'Make it real', steps: [
    {id: 'studio', min: 6, screen: 'studio', focus: 'starts', label: 'Intelligence Studio', clock: '8:05', duration: 10, pre: 'customers', cameraAt: 2.3, cursor: [{at: 1.3, to: 'customers:nav-studio', click: true}]},
    {id: 'brief', min: 6.5, screen: 'studio', focus: 'deliverable', label: 'Intelligence Studio', clock: '8:07', duration: 10, pre: 'studio', cameraAt: 2.8, cursor: [{at: 1.2, to: 'studio:start-0', click: true}]},
    {id: 'build', min: 13.5, screen: 'pack', focus: null, label: 'Intelligence Studio', clock: '8:30', duration: 16},
    {id: 'pack', min: 5.5, screen: 'pack', focus: null, label: 'Intelligence Studio', clock: '9:00', duration: 10},
  ]},
  {id: 'close', name: 'Close', steps: [
    {id: 'tracker', min: 6, screen: 'radarapp', focus: 'tracker-row', label: 'Radar', clock: '9:00', duration: 10, cameraAt: 0.3, cursor: [{at: 2.4, to: 'radarapp:resume', click: true}]},
    {id: 'morning', min: 5, screen: 'all', focus: null, label: '', clock: '9:00', duration: 8},
    {id: 'end', min: 8, screen: 'all', focus: null, label: '', clock: '', duration: 10},
  ]},
];
export const steps = acts.flatMap((act, index) => act.steps.map(step => ({...step, act: index})));
// 'all' is not a screen: it asks the camera to show every screen at once.
export const screens = ['inbox', 'radar', 'briefing', 'markets', 'competitors', 'benchmark', 'ask', 'answer', 'expert', 'customers', 'studio', 'pack', 'radarapp'];

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

// Figures below are invented for the story and are labelled as illustrative on screen.
export const illustrative = 'Illustrative figures';
export const markets = {title: 'Market explorer', subtitle: 'Explore your ecosystem. Find the next opportunity.',
  segments: ['Industrial pumps', 'Heat exchangers', 'Flow control', 'Aftermarket services'],
  // [market, CAGR %, TAM in USD billions]
  rows: [['Data-centre liquid cooling', 24.6, 9.8], ['Hydrogen electrolyser systems', 19.2, 3.1], ['District heating', 6.7, 11.4], ['Industrial heat exchangers', 5.1, 18.2], ['Industrial pumps', 4.3, 62]],
  selected: 0, mapped: 31,
  inspector: 'Cooling for high-density computing, where air can no longer remove the heat. It depends on pumps, heat exchangers and flow control.'};
// The 3D field in act 2: the path a need takes to reach Norvane, among its connected markets.
export const field = {
  nodes: [
    {name: 'Norvane', role: 'company', pos: [0, 0, 0]},
    {name: 'AI data centres', role: 'market', pos: [-6.4, 2.0, -1.2]},
    {name: 'Liquid cooling', role: 'market', pos: [-4.2, 0.9, 0.6]},
    {name: 'Pumps and heat exchange', role: 'market', pos: [-2.1, 0.3, 0.1]},
    {name: 'District heating', role: 'market', pos: [5.4, 2.5, -1.3]},
    {name: 'Hydrogen', role: 'market', pos: [4.3, -2.6, 1.0]},
    {name: 'Water treatment', role: 'market', pos: [-5.2, -3.0, 0.4]},
  ],
  path: ['AI data centres', 'Liquid cooling', 'Pumps and heat exchange', 'Norvane'],
};
export const competitors = {title: 'Competitor intelligence', subtitle: 'Understand your peers. See where you overlap.',
  companies: ['Norvane', 'Kestrow Group', 'Vantec Thermal', 'Halberg Flow'],
  // One row per market; one yes/no per company, in the order above.
  presence: [['Industrial pumps', [1, 1, 0, 1]], ['Industrial heat exchangers', [1, 1, 1, 0]], ['District heating', [1, 0, 1, 1]], ['Data-centre liquid cooling', [0, 1, 1, 0]]],
  lit: 'Data-centre liquid cooling', note: 'Kestrow Group: present since the Thalic Cooling acquisition.'};
export const benchmark = {title: 'Competitor benchmarking', subtitle: 'A clearer perspective on financial performance.', metric: 'Total revenue',
  rows: [['Kestrow Group', 4120], ['Vantec Thermal', 2860], ['Norvane', 2310], ['Halberg Flow', 1940]], lit: 'Norvane'};
export const ask = {title: 'Ask GrowthIQ', subtitle: 'From a question to a clearer business decision.', question: 'Should Norvane enter data-centre liquid cooling?',
  prompts: [['Where to Play', 'Explore market opportunities.', 'market'], ['How to Win', 'Understand your competitive position.', 'competitor'], ['Customer Disruptions', 'Explore changes affecting customers.', 'customers'], ['Business Disruptions', 'Understand changes in your business environment.', 'signals']]};
export const answer = {
  tabs: ['Answer', 'Sources', 'Connected Market', 'Deep Research', 'News', 'Key Competitors'],
  heading: 'Yes, as a component supplier first.',
  intro: 'Data-centre liquid cooling is growing far faster than Norvane’s core markets, and it runs on pumps and heat exchange. Norvane can enter credibly by supplying coolant-distribution components before committing to full systems.',
  points: [
    ['The market', 'Growing at about 25% a year, against 4% for industrial pumps.'],
    ['The competition', 'Kestrow Group has bought its way in. Vantec Thermal is already present.'],
    ['The open question', 'Whether Norvane’s pumps meet the heat loads of dense AI racks has not been established.'],
  ],
  evidence: [['Your Briefing', 'Kestrow Group acquires Thalic Cooling'], ['Markets', 'Data-centre liquid cooling: size and growth'], ['Competitors', 'Market presence and financial comparison']],
  research: {heading: 'Research scope', summary: 'Review the approach and deliverables before generating a report.', chapters: [
    ['Market definition and size', 3], ['Demand drivers: AI rack density', 2], ['Technology: direct-to-chip and immersion', 3], ['Competitive landscape', 2], ['Entry options for Norvane', 3], ['Risks and dependencies', 2]]},
};
export const expert = {title: 'Ask Domain Expert', subtitle: 'Connect with a human expert on the questions that matter to your business.',
  heading: 'What would you like an expert’s perspective on?', lead: 'Share your question and the business decision behind it.',
  subject: 'Can our pumps handle AI rack heat loads?', region: 'Data-centre liquid cooling', details: answer.points[2][1], email: radar.to,
  sent: ['Request sent', 'Your question is with the domain expert team. Replies go to ' + radar.to + '.'],
  guide: ['Bring the question.', 'Add expert judgment.', 'Ask for a domain expert’s perspective on a market, an industry or a business decision.']};
export const customers = {title: 'Customer intelligence', subtitle: 'Your customer workspace, powered by SalesPlay.', filter: 'Building data centres',
  // [customer, what they are, what Norvane supplies, latest signal]
  rows: [['Arden Compute', 'Data-centre builder', 'Industrial pumps', 'Two new data-centre campuses announced'], ['Brightmoor Chemicals', 'Speciality chemicals', 'Heat exchangers', 'Plant upgrade under review'], ['Calloway Water', 'Water utility', 'Industrial pumps', 'Five-year framework renewed'],
    ['Fennick Foods', 'Food processing', 'Flow control', 'New line commissioned'], ['Halden Energy', 'District heating', 'Heat exchangers', 'Network extension approved'], ['Tresco Paper', 'Pulp and paper', 'Industrial pumps', 'Maintenance contract extended']],
  match: 'Arden Compute'};
export const studio = {title: 'Intelligence Studio', subtitle: 'Research, model and build your next strategic work product.',
  // Names, outputs and outlines follow the product's own capability list in studio-data.js.
  starts: [
    {doc: 'Market model', name: 'Build a market model', output: 'Excel workbook', blurb: 'Size an opportunity. Explore the segments behind it.', subject: 'Data-centre liquid cooling', label: 'Market or industry', outline: ['Market size & CAGR forecasts', 'Product & geography segmentation', 'Applications & end users', 'Excel-ready market data']},
    {doc: 'Competitor profile', name: 'Research a competitor', output: 'Research study', blurb: 'Understand positioning, revenue and strategy.', subject: 'Kestrow Group', label: 'Competitor', outline: ['Revenue', 'Positioning', 'SWOT', 'Strategy']},
    {doc: 'Market-entry strategy', name: 'Develop a market-entry strategy', output: 'Research study', blurb: 'Evaluate entry models, partners and market risks.', subject: 'Norvane in data-centre liquid cooling', label: 'Target market', outline: ['Entry models', 'Partnerships', 'Regulatory factors', 'Risk mitigation']},
  ],
  context: 'From Ask GrowthIQ: ' + answer.intro, capabilities: 22,
  pack: {title: 'Board pack', subtitle: 'Data-centre liquid cooling', time: 'Ready at 9:00'}};
export const tracker = {title: 'Radar', subtitle: 'Stay informed about what matters to you.', scope: 'Data-centre liquid cooling', kind: 'Topics', focus: 'Deals, capacity announcements and new entrants', frequency: 'Daily', schedule: radar.schedule, email: radar.to};
