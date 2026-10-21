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
    view: { type: "field", x: { label: "Relevance to your markets", min: 0, max: 1 }, y: { label: "Revenue at stake ($M)", min: 0, max: 400 },
      points: [
        { label: "Sika completes Akkim acquisition", x: .88, y: 310, r: 18, tone: "down", tag: "Act", prev: { x: .7, y: 220 } },
        { label: "Henkel expands infrastructure protection", x: .74, y: 240, r: 15, tone: "down", tag: "Act" },
        { label: "Bio-based tea-leaf adhesive research", x: .52, y: 60, r: 10, tone: "up", tag: "Watch" },
        { label: "EU packaging recycling rule update", x: .61, y: 140, r: 12, tone: "neutral", tag: "Watch" },
        { label: "Chip design licensing deal", x: .12, y: 20, r: 7, tone: "neutral", tag: "Ignore" }
      ] },
    evidence: [["Sika completes Akkim acquisition", "Live Signals · Competitor"], ["Adhesives & sealants market size, Turkey", "MnM market model · Table 12"], ["Henkel expands infrastructure protection", "Live Signals · Competitor"]],
    actions: [["Run Competitor Move on Sika", "agent/competitor-move"], ["Add to a Stakeholder Brief", "agent/stakeholder-brief"], ["Open Live Signals", "signals"]],
    history: [["Yesterday", "1 Act, 3 Watch"], ["Mon", "No signals needed action"], ["Fri", "2 Act, 2 Watch"]],
    products: ["feed", "home"]
  },
  "market-shift-radar": {
    call: "Bioadhesives growth is accelerating: MnM has raised its 2030 outlook twice in four quarters.",
    confidence: "High", lastRun: "1 Oct", nextRun: "1 Nov", status: "Ready",
    changed: ["Bioadhesives CAGR revised up from 7.9% to 8.6%", "Bonding films flattened; second downward revision"],
    view: { type: "timeline", unit: "% CAGR", labels: ["Q3 24", "Q4 24", "Q1 25", "Q2 25", "Q3 25", "Q4 25", "Q1 26", "Q2 26"],
      series: [
        { label: "Bioadhesives", values: [7.6, 7.6, 7.8, 7.9, 7.9, 8.2, 8.4, 8.6], tone: "up" },
        { label: "Antimicrobial coatings", values: [10.2, 10.3, 10.4, 10.6, 10.6, 10.7, 10.8, 10.8], tone: "neutral" },
        { label: "Bonding films", values: [8.9, 8.9, 8.8, 8.7, 8.6, 8.4, 8.3, 8.2], tone: "down" }
      ], marks: [{ i: 5, label: "Bio-based mandates" }, { i: 7, label: "Raised again" }] },
    evidence: [["Bioadhesives market, forecast revisions", "MnM market model · revision log"], ["Bonding films market, 2024–2030", "MnM report · Table 4"]],
    actions: [["Trace the demand effect", "agent/demand-tracer"], ["Scout the opportunity", "agent/opportunity-scout"], ["Send up a Stakeholder Brief", "agent/stakeholder-brief"]],
    history: [["1 Sep", "No structural shift"], ["1 Aug", "Antimicrobial coatings steadied"]],
    products: ["markets"]
  },
  "customer-shift": {
    call: "Corvex Automotive is moving fast into EV battery packs; demand for your structural adhesives there is likely to rise.",
    confidence: "Medium", lastRun: "Mon, 07:00", nextRun: "Next Mon", status: "Live",
    changed: ["Corvex announced a battery-pack plant (new)", "Northway Hygiene closed a diaper line in Ohio"],
    view: { type: "board", tiles: [
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
    view: { type: "grid", cols: ["Construction", "Building materials", "Packaging", "Hygiene", "Auto"],
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
    call: "EV battery growth will reach you in about 18 months through thermal-interface and pack-bonding adhesives.",
    confidence: "Medium", lastRun: "12 Oct", nextRun: "On a new change", status: "Ready",
    changed: ["EV battery forecast raised 4%", "Pack bonding added as a step"],
    view: { type: "path", steps: [
      { label: "EV battery production", sub: "Change starts here", value: "+21% a year", tone: "up" },
      { label: "Battery pack assembly", sub: "6–9 months later", value: "+18%", tone: "up" },
      { label: "Thermal interface materials", sub: "9–12 months", value: "+14%", tone: "up" },
      { label: "Structural & pack-bonding adhesives", sub: "12–18 months", value: "+11%", tone: "up" },
      { label: "H.B. Fuller", sub: "Your segments", value: "~$40M at stake", tone: "you" }
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
      links: [[0, 0, 3], [1, 1, 3], [2, 2, 2], [3, 3, 1], [4, 3, 2], [5, 4, 2]] },
    evidence: [["End-market forecasts for each customer", "MnM market models"], ["Customer strategy statements", "Monitor · Key customer earnings calls"]],
    actions: [["Watch with Customer Shift", "agent/customer-shift"], ["Scout opportunities in growing end markets", "agent/opportunity-scout"]],
    history: [["1 Jul", "2 customers in growing end markets"]],
    products: ["customers"]
  },
  "opportunity-scout": {
    call: "Top opportunity: bio-based adhesives for e-commerce packaging. Strong on all three factors.",
    confidence: "Medium", lastRun: "14 Oct", nextRun: "Next planning cycle", status: "Ready",
    changed: ["EV battery bonding entered the top 3", "Antimicrobial coatings fell: Henkel gap closed"],
    view: { type: "field", x: { label: "Market growth (CAGR %)", min: 0, max: 14 }, y: { label: "Customer demand (index)", min: 0, max: 100 }, size: "Competitive gap",
      points: [
        { label: "Bio-based packaging adhesives", x: 10.5, y: 82, r: 22, tone: "up" },
        { label: "EV battery bonding", x: 12.4, y: 71, r: 18, tone: "up", prev: { x: 11.2, y: 55 } },
        { label: "Medical wearable adhesives", x: 8.6, y: 68, r: 14, tone: "up" },
        { label: "Antimicrobial coatings", x: 10.8, y: 38, r: 8, tone: "neutral", prev: { x: 10.6, y: 50 } },
        { label: "Solar module encapsulants", x: 6.8, y: 56, r: 11, tone: "neutral" },
        { label: "Bonding films", x: 8.2, y: 31, r: 6, tone: "down" }
      ] },
    evidence: [["Bioadhesives market, 2025–2030", "MnM report · Table 2"], ["Customer demand index", "Customers' Customers"], ["Competitive gap by segment", "GrowthIQ competitor presence"]],
    actions: [["Assess the top opportunity", "agent/opportunity-assessment"], ["Size it in detail", "agent/market-sizer"], ["Add to the Growth Portfolio", "agent/growth-portfolio"]],
    history: [["Jul", "Top: antimicrobial coatings"]],
    products: ["markets"]
  },
  "market-sizer": {
    call: "Your slice of bio-based packaging adhesives is $410M today, growing 10.5% a year. Recycling mandates move it most.",
    confidence: "Medium", lastRun: "14 Oct", nextRun: "On a forecast update", status: "Ready",
    changed: ["Size up $18M after MnM's Q2 revision"],
    view: { type: "dial", value: "$410M", label: "2026 market for your slice", sub: "10.5% CAGR to 2030",
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
    view: { type: "stages", stages: ["Research", "Pilot", "Early adoption", "Scale"], items: [
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
    view: { type: "grid", cols: ["CPG & F&B", "Hygiene", "Packaging", "Construction", "Building materials", "Auto", "Medical", "Industrial"],
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
    call: "Go: bio-based packaging adhesives. It flips to Not yet if recycling mandates slip beyond 2028.",
    confidence: "Medium", lastRun: "15 Oct", nextRun: "If a condition changes", status: "Ready",
    changed: ["Verdict moved from Not yet to Go", "Customer demand factor improved"],
    view: { type: "dial", value: "Go", label: "Verdict", sub: "Score 74 / 100 · threshold 65",
      bars: [{ label: "Recycling mandates by 2028", value: .85, note: "Would flip to Not yet" }, { label: "Brightline adopts bio-based", value: .55, note: "−9 points" }, { label: "Henkel launches first", value: -.5, note: "−7 points" }, { label: "Bio-resin cost parity", value: .3, note: "+4 points" }] },
    evidence: [["Market growth and size", "Market Sizer"], ["Customer demand", "Customers' Customers"], ["Competitive gap", "Living Landscape"]],
    actions: [["Test the assumptions", "agent/assumption-tester"], ["Run a pre-mortem", "agent/pre-mortem"], ["Add to the Growth Portfolio", "agent/growth-portfolio"]],
    history: [["2 Oct", "Not yet (61)"], ["Sep", "Not yet (58)"]],
    products: []
  },
  "entry-route": {
    call: "Partner, then buy: license a bio-resin and shortlist two specialist formulators to acquire by 2027.",
    confidence: "Medium", lastRun: "15 Oct", nextRun: "On a deal in the space", status: "Ready",
    changed: ["One shortlisted formulator raised a Series B"],
    view: { type: "field", x: { label: "Strategic fit", min: 0, max: 1 }, y: { label: "Revenue ($M)", min: 0, max: 120 }, size: "Ease of deal",
      points: [
        { label: "Formulator A (bio hot melts)", x: .82, y: 64, r: 16, tone: "up" },
        { label: "Formulator B (water-based)", x: .71, y: 38, r: 13, tone: "up" },
        { label: "Bio-resin licence", x: .65, y: 0, r: 18, tone: "neutral" },
        { label: "Regional distributor", x: .4, y: 92, r: 9, tone: "neutral" }
      ] },
    evidence: [["Company profiles of candidates", "MnM company coverage"], ["Deals in bio-based adhesives", "Deal Radar"]],
    actions: [["Watch the shortlist", "agent/watch"], ["Send up a Stakeholder Brief", "agent/stakeholder-brief"]],
    history: [], products: []
  },
  "assumption-tester": {
    call: "One critical assumption is refuted: Brightline will not switch to bio-based adhesives before 2028.",
    confidence: "Medium", lastRun: "16 Oct", nextRun: "On request", status: "Ready",
    changed: ["Assumption 2 refuted (agreement 71%)", "Sent to an MnM analyst"],
    view: { type: "scoreboard", rows: [
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
    call: "The likeliest failure is a price war with Henkel in packaging; watch their bio-based launch dates.",
    confidence: "Medium", lastRun: "16 Oct", nextRun: "Warning signs watched daily", status: "Live",
    changed: ["Warning sign lit: Henkel filed a bio-based adhesive trademark"],
    view: { type: "scoreboard", rows: [
      { claim: "Price war with Henkel in packaging", verdict: "Warning lit", score: 68, lane: "Henkel trademark filing" },
      { claim: "Recycling mandates delayed", verdict: "Quiet", score: 34 },
      { claim: "Bio-resin supply shortfall", verdict: "Quiet", score: 29 },
      { claim: "Brightline slow to adopt", verdict: "Warning lit", score: 61, lane: "Assumption refuted" }
    ] },
    evidence: [["Henkel trademark filing", "Monitor · Competitor announcements"], ["EU packaging rules", "Regulation Watch"]],
    actions: [["Turn warning signs into watches", "agent/watch"], ["Test the riskiest assumption", "agent/assumption-tester"]],
    history: [], products: []
  },
  "customer-voice": {
    call: "Converters' top unmet need is adhesives that pass recycling tests without slowing their lines.",
    confidence: "Medium", lastRun: "9 Oct", nextRun: "On request", status: "Ready",
    changed: ["Line speed rose to the second need"],
    view: { type: "field", x: { label: "How often it comes up", min: 0, max: 1 }, y: { label: "How strongly", min: 0, max: 1 },
      points: [
        { label: "Passes recycling tests", x: .86, y: .82, r: 18, tone: "up" },
        { label: "No loss of line speed", x: .74, y: .77, r: 15, tone: "up", prev: { x: .55, y: .6 } },
        { label: "Lower energy curing", x: .5, y: .55, r: 11, tone: "neutral" },
        { label: "Fewer SKUs", x: .32, y: .4, r: 8, tone: "neutral" }
      ] },
    evidence: [["Converter interviews", "Synthetic Interviews · 18 respondents"], ["Packaging adhesives buyer survey", "MnM primary research (to confirm)"]],
    actions: [["Scout opportunities for the top need", "agent/opportunity-scout"]],
    history: [], products: []
  },
  "stakeholder-brief": {
    call: "Recommend: pursue bio-based packaging adhesives, partner-then-buy, decision needed by 30 November.",
    confidence: "Medium", lastRun: "17 Oct", nextRun: "When evidence changes", status: "Sent",
    changed: ["Evidence updated: one assumption refuted since the brief was sent"],
    view: { type: "brief", title: "Bio-based packaging adhesives: go, with a partner-then-buy route",
      figures: [["$410M", "Your slice, 2026", "Market Sizer"], ["10.5%", "Growth a year to 2030", "MnM report · Table 7"], ["74/100", "Assessment score", "Opportunity Assessment"]],
      points: ["Strongest opportunity on all three Growth Equation factors", "Recycling mandates are the swing factor; confirmed by AI panel (84%)", "Brightline's switch is slower than assumed; an MnM analyst is checking"],
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
    view: { type: "board", tiles: [
      { label: "Bio-based packaging adhesives", sub: "Decision by 30 Nov", dir: "flat", delta: "Needs decision", note: "$3.1M pipeline influenced" },
      { label: "EV battery bonding", sub: "Henkel launch risk", dir: "down", delta: "At risk", note: "Was on track" },
      { label: "Medical wearable adhesives", sub: "Pilot with Meridian", dir: "up", delta: "On track", note: "$1.2M pipeline" },
      { label: "Solar encapsulants", sub: "Customer trials", dir: "up", delta: "On track", note: "2 trials live" },
      { label: "Antimicrobial coatings", sub: "Gap narrowing", dir: "up", delta: "On track", note: "Watching Henkel" }
    ] },
    evidence: [["Each bet links to the agent run behind it", "GrowthIQ agents"], ["MnM research drawn on this quarter", "$149,950 across 27 reports"]],
    actions: [["Open the bet that needs a decision", "agent/opportunity-assessment"], ["Open My Work", "work"]],
    history: [["Last Mon", "4 on track, 1 needs decision"]],
    products: ["work"]
  },
  "growth-score": {
    call: "Your Growth Score is 68, up 3: customer demand improved; competitive position slipped.",
    confidence: "Medium", lastRun: "1 Oct", nextRun: "1 Nov", status: "Ready",
    changed: ["+3 since September", "Competitive position −2 (Henkel)"],
    view: { type: "dial", level: true, value: "68", label: "Growth Score", sub: "out of 100 · +3 since last month",
      bars: [{ label: "Market momentum", value: .71, note: "71" }, { label: "Customer demand", value: .74, note: "74 (+6)" }, { label: "Competitive position", value: .58, note: "58 (−2)" }],
      trend: [61, 62, 64, 63, 65, 65, 68] },
    evidence: [["Market momentum", "Market Shift Radar"], ["Customer demand", "Customers' Customers"], ["Competitive position", "Living Landscape"]],
    actions: [["Open the factor that fell", "agent/living-landscape"], ["Scout opportunities", "agent/opportunity-scout"]],
    history: [["1 Sep", "65"], ["1 Aug", "65"]],
    products: ["feed"]
  },
  "watch": {
    call: "2 triggers fired this week; one affects the bio-based packaging decision.",
    confidence: "High", lastRun: "Live", nextRun: "Always on", status: "Live",
    changed: ["Henkel trademark filing fired a Pre-mortem warning", "Corvex plant fired a Customer Shift alert"],
    view: { type: "stages", stages: ["Fired", "Reviewed", "Acted"], items: [
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
    view: { type: "grid", heat: true, cols: ["Battery bonding", "Bio-based", "Medical", "Solar", "Digital"],
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
    view: { type: "stages", stages: ["Page seen", "Announced", "In market"], items: [
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
    view: { type: "path", steps: [
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
    view: { type: "stages", stages: ["Proposed", "In consultation", "Adopted", "In force"], items: [
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
    view: { type: "bars", labels: ["2025", "2026", "2027", "2028", "2029"],
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
