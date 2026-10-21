/* Example outputs for the GrowthIQ agents in the H.B. Fuller workspace.
   Every figure, event and customer here is illustrative. Customers are invented; competitor
   events other than captured signals are examples, not reports of real events.
   Each output: the call, a signature view, what changed since the last run, evidence,
   next actions (agent ids or routes), run history, and the product pages it appears on. */
window.GROWTHIQ_AGENT_EXAMPLES = {
  "signal-triage": {
    call: "2 signals need action today: Sika closes the Akkim deal, and Henkel adds infrastructure protection.",
    confidence: "High", lastRun: "Today, 06:30", nextRun: "Tomorrow, 06:30", status: "Live",
    changed: ["3 new signals since yesterday", "Sika–Akkim moved from Watch to Act after the deal closed"],
    view: { type: "table", cols: ["Signal", "Relevance to you", "Market it touches", "Market size", "Call"], pills: [1, 4],
      rows: [
        ["Sika completes Akkim acquisition", "High", "Adhesives & sealants, Turkey", "$1.1B", "Act"],
        ["Henkel expands infrastructure protection", "High", "Protective coatings, infrastructure", "$2.4B", "Act"],
        ["EU packaging recycling rule update", "Medium", "Packaging adhesives, EU", "$3.0B", "Watch"],
        ["Tea-leaf bioadhesive research", "Low", "Bioadhesives", "$0.6B", "Watch"],
        ["Chip design licensing deal", "Low", "Not one of your markets", "–", "Ignore"]
      ], note: "Relevance is a rating, judged from the markets and companies each signal names. Market size is the size of the market it touches, not money at stake.",
      source: "Live Signals; market sizes from MnM market models (illustrative)" },
    evidence: [["Sika completes Akkim acquisition", "Live Signals · Competitor"], ["Adhesives & sealants market, Turkey", "MnM market model · Table 12"], ["Henkel expands infrastructure protection", "Live Signals · Competitor"]],
    actions: [["Run Competitor Move on Sika", "agent/competitor-move"], ["Add to a Stakeholder Brief", "agent/stakeholder-brief"], ["Open Live Signals", "signals"]],
    history: [["Yesterday", "1 Act, 3 Watch"], ["Mon", "No signals needed action"], ["Fri", "2 Act, 2 Watch"]],
    products: ["feed", "home"]
  },
  "market-shift-radar": {
    call: "Bioadhesives growth is accelerating: MnM has raised its outlook in each of the last two report editions.",
    confidence: "High", lastRun: "1 Oct", nextRun: "1 Nov", status: "Ready",
    changed: ["2026 edition: bioadhesives CAGR revised up from 8.4% to 8.6%", "Bonding films revised down for the second edition running"],
    view: { type: "timeline", unit: "Five-year CAGR (%)", source: "MnM report editions, 2020–2026 (illustrative values)", labels: ["2019 ed.", "2020 ed.", "2021 ed.", "2022 ed.", "2023 ed.", "2024 ed.", "2025 ed.", "2026 ed."],
      series: [
        { label: "Bioadhesives", values: [7.4, 7.6, 7.6, 7.8, 7.9, 8.2, 8.4, 8.6], tone: "up" },
        { label: "Antimicrobial coatings", values: [10.2, 10.3, 10.4, 10.6, 10.6, 10.7, 10.8, 10.8], tone: "neutral" },
        { label: "Bonding films", values: [8.9, 8.9, 8.8, 8.7, 8.6, 8.4, 8.3, 8.2], tone: "down" }
      ], marks: [{ i: 5, label: "Bio-based mandates" }, { i: 7, label: "Latest edition" }] },
    evidence: [["Bioadhesives market, each report edition", "MnM report archive"], ["Bonding films market, 2024–2030", "MnM report · Table 4"]],
    actions: [["Trace the demand effect", "agent/demand-tracer"], ["Scout the opportunity", "agent/opportunity-scout"], ["Send up a Stakeholder Brief", "agent/stakeholder-brief"]],
    history: [["1 Sep", "No structural shift"], ["1 Aug", "Antimicrobial coatings steadied"]],
    products: ["markets"]
  },
  "customer-shift": {
    call: "Corvex Automotive is moving fast into EV battery packs; demand for your structural adhesives there is likely to rise.",
    confidence: "Medium", lastRun: "Mon, 07:00", nextRun: "Next Mon", status: "Live",
    changed: ["Corvex announced a battery-pack plant (new)", "Northway Hygiene closed a diaper line in Ohio"],
    view: { type: "board", source: "Radar monitors on your key customers' news, filings and plants (illustrative events)", tiles: [
      { label: "Corvex Automotive", sub: "EV battery-pack plant", dir: "up", delta: "+ demand", note: "New plant, 2027" },
      { label: "Brightline Packaging", sub: "E-commerce volumes", dir: "up", delta: "+ demand", note: "Q3 volumes up 9%" },
      { label: "Solara Modules", sub: "Capacity expansion", dir: "up", delta: "+ demand", note: "Second line" },
      { label: "Kestrel Building Products", sub: "Housing slowdown", dir: "flat", delta: "No change", note: "Guidance held" },
      { label: "Meridian MedTech", sub: "Wearables launch", dir: "up", delta: "+ demand", note: "New patch line" },
      { label: "Northway Hygiene", sub: "Line closure", dir: "down", delta: "− demand", note: "Ohio line closed" },
      { label: "Harbor Electronics", sub: "Restructuring", dir: "down", delta: "− demand", note: "Cost programme" },
      { label: "Alder Woodworks", sub: "No moves", dir: "flat", delta: "No change", note: "Quiet" }
    ] },
    evidence: [["Corvex battery-pack plant announcement", "Monitor · Key customer plants"], ["Northway Hygiene line closure", "Monitor · Key customer news"]],
    actions: [["See Corvex's customers", "agent/customers-customers"], ["Send up a Stakeholder Brief", "agent/stakeholder-brief"], ["Watch Corvex", "agent/watch"]],
    history: [["Last Mon", "Brightline volumes up"], ["2 weeks ago", "No significant moves"]],
    products: ["customers"]
  },
  "competitor-move": {
    call: "Sika's Akkim deal makes it a stronger rival in Turkish construction adhesives. Defend in building materials first.",
    confidence: "High", lastRun: "Today, 09:10", nextRun: "On the next move", status: "Ready",
    changed: ["New move: Sika completes Akkim acquisition", "Overlap with you rises in 2 segments"],
    view: { type: "grid", source: "Competitor presence grid and Live Signals", cols: ["Construction", "Building materials", "Packaging", "Hygiene", "Auto"],
      rows: [
        { label: "H.B. Fuller", cells: ["Yes", "Yes", "Yes", "Yes", "Yes"] },
        { label: "Sika (after Akkim)", cells: ["Yes", "New", "No", "No", "Yes"] },
        { label: "Henkel", cells: ["Yes", "Yes", "Yes", "Yes", "Yes"] }
      ],
      responses: ["Defend key building-materials accounts in Turkey", "Accelerate sealant range for regional distributors", "Partner with a local distributor"] },
    evidence: [["Sika completes Akkim acquisition", "Live Signals · Competitor"], ["Market presence by segment", "GrowthIQ competitor presence"], ["Turkey adhesives & sealants market", "MnM market model · Table 12"]],
    actions: [["Assess the first response", "agent/opportunity-assessment"], ["Send up a Stakeholder Brief", "agent/stakeholder-brief"], ["Open Competitors", "competitors"]],
    history: [["3 weeks ago", "Henkel infrastructure protection deal"]],
    products: ["competitors"]
  },
  "demand-tracer": {
    call: "EV battery growth reaches you through pack-bonding adhesives, a market of yours growing 11% a year.",
    confidence: "Medium", lastRun: "12 Oct", nextRun: "On a new change", status: "Ready",
    changed: ["EV battery forecast raised 4%", "Pack bonding added as a step"],
    view: { type: "path", source: "MnM market forecasts, 2025–2030, and the connected-markets map (illustrative values)", steps: [
      { label: "EV battery production", sub: "Where the change starts", value: "21% CAGR", tone: "up" },
      { label: "Battery pack assembly", sub: "Connected market", value: "18% CAGR", tone: "up" },
      { label: "Thermal interface materials", sub: "Connected market", value: "14% CAGR", tone: "up" },
      { label: "Structural & pack-bonding adhesives", sub: "Your market", value: "11% CAGR", tone: "up" },
      { label: "H.B. Fuller", sub: "Present in 2 of these segments", value: "Exposed", tone: "you" }
    ] },
    evidence: [["EV battery market, 2025–2030", "MnM market model · Table 3"], ["Connected markets: battery packs", "MnM connected markets"]],
    actions: [["Scout opportunities on the path", "agent/opportunity-scout"], ["Size pack-bonding adhesives", "agent/market-sizer"]],
    history: [["Aug", "Path first traced"]],
    products: ["ecosystem"]
  },
  "customers-customers": {
    call: "3 of your 8 key customers sell into end markets that are accelerating; 1 is exposed to a shrinking one.",
    confidence: "Medium", lastRun: "1 Oct", nextRun: "1 Jan", status: "Ready",
    changed: ["Corvex moved to growing (EV share up)", "Northway moved to shrinking"],
    view: { type: "chain", left: [
        { label: "EV assembly", growth: "+18%" }, { label: "E-commerce parcels", growth: "+9%" }, { label: "Solar installations", growth: "+12%" },
        { label: "Adult incontinence", growth: "+5%" }, { label: "Baby care (mature)", growth: "−2%" }, { label: "New housing", growth: "+1%" }
      ], mid: [
        { label: "Corvex Automotive", dir: "up" }, { label: "Brightline Packaging", dir: "up" }, { label: "Solara Modules", dir: "up" },
        { label: "Northway Hygiene", dir: "down" }, { label: "Kestrel Building Products", dir: "flat" }
      ], right: { label: "H.B. Fuller" },
      links: [[0, 0, 3], [1, 1, 3], [2, 2, 2], [3, 3, 1], [4, 3, 2], [5, 4, 2]], source: "End-market growth from MnM forecasts; customer revenue splits from annual reports where disclosed (illustrative)" },
    evidence: [["End-market forecasts for each customer", "MnM market models"], ["Customer strategy statements", "Monitor · Key customer earnings calls"]],
    actions: [["Watch with Customer Shift", "agent/customer-shift"], ["Scout opportunities in growing end markets", "agent/opportunity-scout"]],
    history: [["1 Jul", "2 customers in growing end markets"]],
    products: ["customers"]
  },
  "opportunity-scout": {
    call: "Top opportunity: bio-based packaging adhesives. Fast-growing, sizeable, and only one rival is there.",
    confidence: "Medium", lastRun: "14 Oct", nextRun: "Next planning cycle", status: "Ready",
    changed: ["EV battery bonding entered the top 3 after MnM raised its forecast", "Antimicrobial coatings fell: Henkel entered, now 5 rivals"],
    view: { type: "field", x: { label: "Market growth (CAGR %, MnM)", min: 0, max: 14, ticks: true }, y: { label: "Market size, 2026 ($B, MnM)", min: 0, max: 5 }, size: "number of your competitors already present (fewer is better)",
      points: [
        { label: "Bio-based packaging adhesives", x: 10.5, y: 3.1, r: 9, tone: "up", tag: "1 rival" },
        { label: "EV battery bonding", x: 12.4, y: 2.2, r: 15, tone: "up", tag: "3 rivals", prev: { x: 11.6, y: 1.9 } },
        { label: "Medical wearable adhesives", x: 8.6, y: 1.4, r: 12, tone: "up", tag: "2 rivals" },
        { label: "Antimicrobial coatings", x: 10.8, y: 4.6, r: 21, tone: "neutral", tag: "5 rivals" },
        { label: "Solar module encapsulants", x: 6.8, y: 2.6, r: 12, tone: "neutral", tag: "2 rivals" },
        { label: "Bonding films", x: 8.2, y: 0.9, r: 18, tone: "down", tag: "4 rivals" }
      ], source: "Growth and size from MnM market models; rivals counted from the competitor presence grid (illustrative)" },
    evidence: [["Bioadhesives market, 2025–2030", "MnM report · Table 2"], ["Market sizes by application", "MnM market models"], ["Rivals present by segment", "GrowthIQ competitor presence"]],
    actions: [["Assess the top opportunity", "agent/opportunity-assessment"], ["Size it in detail", "agent/market-sizer"], ["Add to the Growth Portfolio", "agent/growth-portfolio"]],
    history: [["Jul", "Top: antimicrobial coatings"]],
    products: ["markets"]
  },
  "market-sizer": {
    call: "Your slice of bio-based packaging adhesives is $410M today, growing 10.5% a year. Recycling mandates move it most.",
    confidence: "Medium", lastRun: "14 Oct", nextRun: "On a forecast update", status: "Ready",
    changed: ["Size up $18M after MnM's Q2 revision"],
    view: { type: "dial", source: "MnM report, Table 7; sensitivity needs MnM model drivers to be exposed (illustrative)", value: "$410M", label: "2026 market for your slice", sub: "10.5% CAGR to 2030",
      bars: [{ label: "Recycling mandates", value: .9, note: "±$62M" }, { label: "E-commerce parcel growth", value: .6, note: "±$41M" }, { label: "Bio-based price premium", value: -.4, note: "±$27M" }, { label: "Substitution from tapes", value: -.2, note: "±$12M" }] },
    evidence: [["Bioadhesives market by application", "MnM report · Table 7"], ["Packaging adhesives by region", "KnowledgeStore · Table 21"]],
    actions: [["Test the recycling assumption", "agent/assumption-tester"], ["Assess the opportunity", "agent/opportunity-assessment"]],
    history: [["Jul", "$392M"]],
    products: ["markets"]
  },
  "technology-scout": {
    call: "Debond-on-demand adhesives are 2–3 years from scale and could reopen recyclable packaging for you.",
    confidence: "Medium", lastRun: "1 Oct", nextRun: "1 Jan", status: "Ready",
    changed: ["Debond-on-demand moved from lab to pilot"],
    view: { type: "stages", source: "MnM technology research and research-publication monitors (illustrative)", stages: ["Research", "Pilot", "Early adoption", "Scale"], items: [
      { label: "Debond-on-demand adhesives", stage: 1, date: "2027–28", note: "Opportunity" },
      { label: "Bio-based hot melts", stage: 2, date: "Now", note: "Opportunity" },
      { label: "Solvent-free laminating", stage: 3, date: "Now", note: "Threat to legacy lines" },
      { label: "Tea-leaf bioadhesives", stage: 0, date: "2029+", note: "Watch" }
    ] },
    evidence: [["Debond-on-demand pilot announcements", "Monitor · Research publications"], ["Packaging adhesives technology roadmap", "MnM technology research"]],
    actions: [["Trace the demand effect", "agent/demand-tracer"], ["Scout the opportunity", "agent/opportunity-scout"]],
    history: [["Jul", "Bio-based hot melts reached early adoption"]],
    products: ["markets"]
  },
  "living-landscape": {
    call: "2 changes in your competitive landscape this week; Henkel now overlaps you in every segment.",
    confidence: "High", lastRun: "Mon", nextRun: "Next Mon", status: "Live",
    changed: ["Henkel entered infrastructure protection", "ITW still absent from hygiene"],
    view: { type: "grid", source: "Competitor presence grid; changes from Radar monitors", cols: ["CPG & F&B", "Hygiene", "Packaging", "Construction", "Building materials", "Auto", "Medical", "Industrial"],
      rows: [
        { label: "H.B. Fuller", cells: ["Yes", "Yes", "Yes", "Yes", "Yes", "Yes", "Yes", "Yes"] },
        { label: "3M", cells: ["Yes", "No", "Yes", "Yes", "Yes", "Yes", "Yes", "Yes"] },
        { label: "Arkema", cells: ["Yes", "Yes", "Yes", "Yes", "Yes", "Yes", "Yes", "Yes"] },
        { label: "Dow", cells: ["Yes", "Yes", "Yes", "Yes", "Yes", "Yes", "Yes", "Yes"] },
        { label: "Henkel", cells: ["Yes", "Yes", "Yes", "New", "Yes", "Yes", "Yes", "Yes"] },
        { label: "ITW", cells: ["Yes", "No", "Yes", "Yes", "No", "Yes", "Yes", "Yes"] }
      ] },
    evidence: [["Market presence by segment", "GrowthIQ competitor presence"], ["Henkel expands infrastructure protection", "Live Signals"]],
    actions: [["Run Competitor Move on Henkel", "agent/competitor-move"], ["Open Competitors", "competitors"]],
    history: [["Last Mon", "No changes"]],
    products: ["competitors"]
  },
  "opportunity-assessment": {
    call: "Go: bio-based packaging adhesives. 4 of 5 criteria rate High; the verdict depends on recycling mandates arriving by 2028.",
    confidence: "Medium", lastRun: "15 Oct", nextRun: "If a condition changes", status: "Ready",
    changed: ["Verdict moved from Not yet to Go", "Customer pull rated High (was Medium)"],
    view: { type: "criteria", verdict: "Go", rule: "Go when at least 4 of 5 criteria are High and none is Low. Your rule; change it any time.",
      rows: [
        ["Market growth", "High", "10.5% a year to 2030 (MnM report, Table 7)"],
        ["Market size", "High", "$3.1B in 2026; your slice $410M (Market Sizer)"],
        ["Customer pull", "High", "3 key customers sell into accelerating end markets (Customers' Customers)"],
        ["Competitive gap", "Medium", "1 of 5 rivals present today; Henkel has new pages live (Launch Watch)"],
        ["Right to win", "High", "Existing hot-melt lines and converter relationships (your input)"]
      ],
      flips: ["If EU recycling mandates slip beyond 2028, market growth drops to Medium and the verdict becomes Not yet.", "If Henkel launches first, competitive gap drops to Low and the verdict becomes Not yet."],
      source: "Ratings from the agents and reports named in each row (illustrative)" },
    evidence: [["Market growth and size", "Market Sizer"], ["Customer pull", "Customers' Customers"], ["Competitive gap", "Living Landscape · Launch Watch"]],
    actions: [["Test the assumptions", "agent/assumption-tester"], ["Run a pre-mortem", "agent/pre-mortem"], ["Add to the Growth Portfolio", "agent/growth-portfolio"]],
    history: [["2 Oct", "Not yet: 3 of 5 High"], ["Sep", "Not yet: 3 of 5 High"]],
    products: []
  },
  "entry-route": {
    call: "Partner, then buy: license a bio-resin now, and keep two specialist formulators on a shortlist to acquire.",
    confidence: "Medium", lastRun: "15 Oct", nextRun: "On a deal in the space", status: "Ready",
    changed: ["One shortlisted formulator raised a Series B"],
    view: { type: "table", cols: ["Option", "Route", "What we know", "Fit"], pills: [3],
      rows: [
        ["Bio-resin licence", "Partner", "2 resin producers license to adhesive makers; terms not disclosed", "High"],
        ["Formulator A (bio hot melts)", "Buy", "Private; Series B in September; 3 converter customers named publicly", "High"],
        ["Formulator B (water-based)", "Buy", "Private; revenue not disclosed; strong in labels", "Medium"],
        ["Build in-house", "Build", "Needs bio-based hot-melt capability you do not have today", "Low"],
        ["Regional distributor", "Partner", "Covers converters in southern Europe", "Medium"]
      ], note: "Fit is a rating, judged from the facts in each row. Revenue is shown only where disclosed.",
      source: "MnM company coverage and deal news (illustrative)" },
    evidence: [["Company profiles of candidates", "MnM company coverage"], ["Deals in bio-based adhesives", "Deal Radar"]],
    actions: [["Watch the shortlist", "agent/watch"], ["Send up a Stakeholder Brief", "agent/stakeholder-brief"]],
    history: [], products: []
  },
  "assumption-tester": {
    call: "One critical assumption is refuted: Brightline will not switch to bio-based adhesives before 2028.",
    confidence: "Medium", lastRun: "16 Oct", nextRun: "On request", status: "Ready",
    changed: ["Assumption 2 refuted: 71% of simulated respondents disagreed", "Sent to an MnM analyst"],
    view: { type: "scoreboard", source: "Agreement among 24 simulated respondents in Synthetic Interviews; not a probability", rows: [
      { claim: "Recycling mandates take effect in the EU by 2028", verdict: "Confirmed", score: 84 },
      { claim: "Brightline switches to bio-based adhesives before 2028", verdict: "Refuted", score: 71, lane: "Sent to an MnM analyst" },
      { claim: "Bio-resin reaches cost parity by 2029", verdict: "At odds", score: 52 },
      { claim: "Henkel will not launch first", verdict: "At odds", score: 48 }
    ] },
    evidence: [["Synthetic interviews (24 respondents)", "Synthetic Interviews"], ["Analyst request #2201", "Ask Domain Expert"]],
    actions: [["Re-run the assessment", "agent/opportunity-assessment"], ["Ask a domain expert", "domain-expert"]],
    history: [["2 Oct", "All 4 assumptions open"]],
    products: []
  },
  "pre-mortem": {
    call: "The likeliest failure is a price war with Henkel in packaging. Its warning sign is already lit: a Henkel trademark filing.",
    confidence: "Medium", lastRun: "16 Oct", nextRun: "Warning signs watched daily", status: "Live",
    changed: ["Warning sign lit: Henkel filed a bio-based adhesive trademark"],
    view: { type: "scoreboard", source: "Risks ranked by your team and the agent; warning signs checked by Radar monitors", rows: [
      { claim: "1. Price war with Henkel in packaging", verdict: "Warning lit", lane: "Sign: Henkel files a bio-based adhesive trademark (seen Thursday)" },
      { claim: "2. Brightline slow to adopt bio-based adhesives", verdict: "Warning lit", lane: "Sign: assumption refuted by Assumption Tester" },
      { claim: "3. EU recycling mandates delayed", verdict: "Quiet", lane: "Sign: consultation extended beyond Q2 2026" },
      { claim: "4. Bio-resin supply shortfall", verdict: "Quiet", lane: "Sign: a resin producer announces allocation" }
    ] },
    evidence: [["Henkel trademark filing", "Monitor · Competitor announcements"], ["EU packaging rules", "Regulation Watch"]],
    actions: [["Turn warning signs into watches", "agent/watch"], ["Test the riskiest assumption", "agent/assumption-tester"]],
    history: [], products: []
  },
  "customer-voice": {
    call: "Converters' most-mentioned need is adhesives that pass recycling tests without slowing their lines.",
    confidence: "Medium", lastRun: "9 Oct", nextRun: "On request", status: "Ready",
    changed: ["Line speed rose to the second most-mentioned need (was fourth)"],
    view: { type: "rank", unit: "Mentions across 42 converter interviews and buyer surveys", rows: [
      { label: "Passes recycling tests", count: 31, note: "“Our customers now ask for recyclability certificates.”" },
      { label: "No loss of line speed", count: 24, note: "“A slower line costs more than the adhesive.”" },
      { label: "Lower-energy curing", count: 12 },
      { label: "Fewer product variants to stock", count: 7 }
    ], source: "MnM primary research interviews and surveys (source to confirm; illustrative counts)" },
    evidence: [["Converter interviews", "MnM primary research (to confirm)"], ["Packaging adhesives buyer survey", "MnM primary research (to confirm)"]],
    actions: [["Scout opportunities for the top need", "agent/opportunity-scout"]],
    history: [], products: []
  },
  "stakeholder-brief": {
    call: "Recommend: pursue bio-based packaging adhesives, partner-then-buy, decision needed by 30 November.",
    confidence: "Medium", lastRun: "17 Oct", nextRun: "When evidence changes", status: "Sent",
    changed: ["Evidence updated: one assumption refuted since the brief was sent"],
    view: { type: "brief", source: "Each figure links to its MnM table or agent", title: "Bio-based packaging adhesives: go, with a partner-then-buy route",
      figures: [["$410M", "Your slice, 2026", "MnM report · Table 7"], ["10.5%", "Growth a year to 2030", "MnM report · Table 7"], ["4 of 5", "Criteria rated High", "Opportunity Assessment"]],
      points: ["Fastest-growing sizeable market with only one rival present", "Recycling mandates are the swing factor; 84% of simulated respondents expect them by 2028", "Brightline's switch is slower than assumed; an MnM analyst is checking"],
      ask: "Approve a partnering budget and a shortlist review by 30 November." },
    evidence: [["Each figure links to its source", "MnM tables and agents"]],
    actions: [["Add to the Growth Portfolio", "agent/growth-portfolio"], ["Open My Work", "work"]],
    history: [["17 Oct", "Sent to the leadership team"]],
    products: ["work"]
  },
  "growth-portfolio": {
    call: "5 growth bets: 3 on track, 1 at risk, 1 needs a decision this month.",
    confidence: "High", lastRun: "Mon", nextRun: "Next Mon", status: "Live",
    changed: ["EV battery bonding moved from On track to At risk", "Bio-based packaging needs a decision"],
    view: { type: "board", source: "Status from each bet's latest agent run and the watches on it", tiles: [
      { label: "Bio-based packaging adhesives", sub: "Decision by 30 Nov", dir: "flat", delta: "Needs decision", note: "Verdict: Go" },
      { label: "EV battery bonding", sub: "Henkel launch risk", dir: "down", delta: "At risk", note: "Was on track" },
      { label: "Medical wearable adhesives", sub: "Pilot with Meridian", dir: "up", delta: "On track", note: "Pilot running" },
      { label: "Solar encapsulants", sub: "Customer trials", dir: "up", delta: "On track", note: "2 trials live" },
      { label: "Antimicrobial coatings", sub: "Gap narrowing", dir: "up", delta: "On track", note: "Watching Henkel" }
    ] },
    evidence: [["Each bet links to the agent run behind it", "GrowthIQ agents"], ["MnM research drawn on this quarter", "27 reports"]],
    actions: [["Open the bet that needs a decision", "agent/opportunity-assessment"], ["Open My Work", "work"]],
    history: [["Last Mon", "4 on track, 1 needs decision"]],
    products: ["work"]
  },
  "growth-score": {
    call: "Two of your three growth factors improved this month; competitive position weakened.",
    confidence: "Medium", lastRun: "1 Oct", nextRun: "1 Nov", status: "Ready",
    changed: ["Customer demand improved: 3 customers' end markets accelerated", "Competitive position weakened: Henkel overlaps you in every segment"],
    view: { type: "board", source: "Market Shift Radar, Customers' Customers and Living Landscape, this month against last", tiles: [
      { label: "Market momentum", sub: "2 of your 4 markets revised up", dir: "up", delta: "Improving", note: "Bioadhesives, antimicrobial coatings" },
      { label: "Customer demand", sub: "3 of 8 key customers in accelerating end markets", dir: "up", delta: "Improving", note: "Was 2 of 8" },
      { label: "Competitive position", sub: "Henkel now present in all 8 segments", dir: "down", delta: "Worsening", note: "2 new overlaps this month" }
    ] },
    evidence: [["Market momentum", "Market Shift Radar"], ["Customer demand", "Customers' Customers"], ["Competitive position", "Living Landscape"]],
    actions: [["Open the factor that weakened", "agent/living-landscape"], ["Scout opportunities", "agent/opportunity-scout"]],
    history: [["1 Sep", "1 improving, 2 steady"], ["1 Aug", "All steady"]],
    products: ["feed"]
  },
  "watch": {
    call: "2 triggers fired this week; one affects the bio-based packaging decision.",
    confidence: "High", lastRun: "Live", nextRun: "Always on", status: "Live",
    changed: ["Henkel trademark filing fired a Pre-mortem warning", "Corvex plant fired a Customer Shift alert"],
    view: { type: "stages", source: "Triggers set on other agents' calls", stages: ["Fired", "Reviewed", "Acted"], items: [
      { label: "Henkel files a bio-based adhesive trademark", stage: 0, date: "Thu", note: "Affects: bio-based packaging (Go → review)" },
      { label: "Corvex announces battery-pack plant", stage: 1, date: "Mon", note: "Affects: EV battery bonding" },
      { label: "MnM raises bioadhesives forecast", stage: 2, date: "1 Oct", note: "Affects: Opportunity Scout ranking" }
    ] },
    evidence: [["27 monitors running", "Radar"]],
    actions: [["Open Radar", "radar"], ["Re-run the assessment", "agent/opportunity-assessment"]],
    history: [["Last week", "1 trigger fired"]],
    products: ["radar"]
  },
  "hiring-signals": {
    call: "3M and Henkel are both hiring for battery-pack bonding; Henkel's pace doubled this month.",
    confidence: "Medium", lastRun: "Mon", nextRun: "Next Mon", status: "Live",
    changed: ["Henkel: 14 battery-bonding roles (was 7)", "Corvex hiring adhesive process engineers"],
    view: { type: "grid", source: "Open roles counted on careers pages; roles mapped to MnM technologies (illustrative counts)", heat: true, cols: ["Battery bonding", "Bio-based", "Medical", "Solar", "Digital"],
      rows: [
        { label: "Henkel", cells: [14, 6, 3, 2, 5] },
        { label: "3M", cells: [9, 2, 7, 1, 4] },
        { label: "Arkema", cells: [3, 8, 1, 4, 1] },
        { label: "Corvex (customer)", cells: [6, 0, 0, 0, 2] }
      ] },
    evidence: [["Careers pages watched weekly", "Monitor · Competitor careers"], ["Roles mapped to MnM technologies", "MnM technology taxonomy"]],
    actions: [["Run Competitor Move on Henkel", "agent/competitor-move"], ["Open Competitors", "competitors"]],
    history: [["Last Mon", "Henkel 7 roles"]],
    products: ["competitors"]
  },
  "launch-watch": {
    call: "Henkel added 3 bio-based packaging product pages before any announcement.",
    confidence: "Medium", lastRun: "Today", nextRun: "As pages change", status: "Live",
    changed: ["3 new Henkel pages", "Arkema updated its solar encapsulant range"],
    view: { type: "stages", source: "Rivals' sitemaps and product pages, watched daily (illustrative events)", stages: ["Page seen", "Announced", "In market"], items: [
      { label: "Henkel: bio-based laminating range", stage: 0, date: "Today", note: "Packaging · your segment" },
      { label: "Arkema: solar encapsulant update", stage: 1, date: "Tue", note: "Solar · adjacent" },
      { label: "3M: medical wearable tape", stage: 2, date: "Sep", note: "Medical · your segment" }
    ] },
    evidence: [["Henkel sitemap changes", "Monitor · Competitor product pages"]],
    actions: [["Run Competitor Move", "agent/competitor-move"], ["Update the landscape", "agent/living-landscape"]],
    history: [["Last week", "1 new page"]],
    products: ["competitors"]
  },
  "deal-radar": {
    call: "$420M flowed into bio-based materials next to your markets this quarter, mostly upstream resins.",
    confidence: "Medium", lastRun: "Mon", nextRun: "Next Mon", status: "Live",
    changed: ["2 new rounds in bio-resins", "Formulator A raised a Series B"],
    view: { type: "path", source: "Funding and deal news; amounts where disclosed (illustrative)", steps: [
      { label: "Bio-resin producers", sub: "$260M · 4 rounds", value: "Upstream", tone: "up" },
      { label: "Specialty formulators", sub: "$110M · 3 deals", value: "Next to you", tone: "up" },
      { label: "Packaging adhesives", sub: "$50M · 1 acquisition", value: "Your market", tone: "you" },
      { label: "Converters", sub: "$0", value: "Downstream", tone: "neutral" }
    ] },
    evidence: [["Funding rounds in bio-based materials", "Monitor · Funding rounds"], ["Connected markets", "MnM connected markets"]],
    actions: [["Choose an entry route", "agent/entry-route"], ["Scout the technology", "agent/technology-scout"]],
    history: [["Last quarter", "$180M"]],
    products: ["ecosystem"]
  },
  "regulation-watch": {
    call: "EU packaging recycling rules move to adoption in 2026; 3 of your packaging segments are affected.",
    confidence: "Medium", lastRun: "Mon", nextRun: "Next Mon", status: "Live",
    changed: ["EU rule moved from consultation to adoption"],
    view: { type: "stages", source: "Regulators' and standards bodies' pages (illustrative)", stages: ["Proposed", "In consultation", "Adopted", "In force"], items: [
      { label: "EU packaging recyclability rules", stage: 2, date: "2026", note: "Packaging · flexible, labels, cartons" },
      { label: "US state PFAS restrictions", stage: 1, date: "2027", note: "Coatings · food contact" },
      { label: "Low-VOC limits for construction", stage: 0, date: "2028", note: "Construction · sealants" }
    ] },
    evidence: [["Regulator pages", "Monitor · Regulator pages"], ["Affected segments", "MnM market structure"]],
    actions: [["Feed Market Shift Radar", "agent/market-shift-radar"], ["Run a pre-mortem", "agent/pre-mortem"]],
    history: [], products: ["markets"]
  },
  "capacity-tracker": {
    call: "Announced hot-melt capacity outpaces demand from 2027: expect price pressure in packaging.",
    confidence: "Medium", lastRun: "1 Oct", nextRun: "1 Nov", status: "Ready",
    changed: ["2 plant announcements in Asia", "Surplus now starts a year earlier"],
    view: { type: "bars", source: "Disclosed plant capacities (12 of 19 announcements give one) against MnM volume forecast (illustrative)", labels: ["2025", "2026", "2027", "2028", "2029"],
      series: [{ label: "Announced capacity (kt)", values: [780, 845, 980, 1060, 1090] }],
      line: { label: "MnM demand forecast (kt)", values: [810, 860, 915, 970, 1030] } },
    evidence: [["Plant announcements", "Monitor · Capacity changes"], ["Hot-melt adhesives demand", "MnM market model · Table 5"]],
    actions: [["Feed Market Shift Radar", "agent/market-shift-radar"], ["Run Competitor Move", "agent/competitor-move"]],
    history: [["1 Sep", "Surplus from 2028"]],
    products: ["markets"]
  }
};

/* Ready-made monitors, as switched on in Radar for H.B. Fuller. */
window.GROWTHIQ_MONITORS = [
  ["Competitors", "Announcements", "Discovery", "Daily", "Competitor Move · Signal Triage", true],
  ["Competitors", "Product pages and sitemap", "Page changes", "Daily", "Launch Watch · Living Landscape", true],
  ["Competitors", "Careers pages", "Page changes", "Weekly", "Hiring Signals", true],
  ["Competitors", "Results and filings", "Discovery", "On release", "Competitor Move", true],
  ["Competitors", "Pricing and packaging", "Page changes", "Weekly", "Competitor Move", false],
  ["Competitors", "Senior hires and departures", "Discovery", "Weekly", "Competitor Move", false],
  ["Key customers", "News and filings", "Discovery", "Daily", "Customer Shift", true],
  ["Key customers", "Plants and capital spending", "Discovery", "Daily", "Customer Shift · Capacity Tracker", true],
  ["Key customers", "Strategy statements", "Discovery", "Quarterly", "Customers' Customers", true],
  ["Key customers", "Careers pages", "Page changes", "Weekly", "Hiring Signals", false],
  ["Key customers", "Leadership changes", "Discovery", "Weekly", "Customer Shift", false],
  ["Markets", "New entrants and start-ups", "Discovery", "Weekly", "Deal Radar · Living Landscape", true],
  ["Markets", "Capacity changes", "Discovery", "Weekly", "Capacity Tracker", true],
  ["Markets", "Industry bodies", "Page changes", "Weekly", "Market Shift Radar", false],
  ["Markets", "Public funding and tenders", "Discovery", "Weekly", "Opportunity Scout", false],
  ["Technology", "Research publications", "Discovery", "Weekly", "Technology Scout", true],
  ["Technology", "Standards bodies", "Page changes", "Weekly", "Technology Scout · Regulation Watch", false],
  ["Technology", "Start-up funding", "Discovery", "Daily", "Technology Scout · Deal Radar", true],
  ["Regulation", "Rules and consultations", "Discovery", "Daily", "Regulation Watch", true],
  ["Regulation", "Regulator pages", "Page changes", "Weekly", "Regulation Watch", true],
  ["Capital", "Funding rounds", "Discovery", "Daily", "Deal Radar", true],
  ["Capital", "Acquisitions and partnerships", "Discovery", "Daily", "Deal Radar · Entry Route", true],
  ["Events", "Trade shows and conferences", "Discovery", "Weekly", "Launch Watch", false]
];
