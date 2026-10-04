/* Presentation metadata only. Capability descriptions and formats come from data.js. */
window.GROWTHIQ_STUDIO = (() => {
  const goals = [
    {id:'growth',name:'Find growth opportunities',short:'Growth opportunities'},
    {id:'competition',name:'Understand the competition',short:'Competition'},
    {id:'strategy',name:'Make a strategic decision',short:'Strategic decisions'},
    {id:'customers',name:'Understand customers & accounts',short:'Customers & accounts'},
    {id:'deliverables',name:'Build a research deliverable',short:'Research deliverables'}
  ];
  const definitions = [
    ['market-model','micro',0,'Build a market model',['growth','deliverables'],'Market or industry','e.g. Bioadhesives Market',['Market size & CAGR forecasts','Product & geography segmentation','Applications & end users','Excel-ready market data']],
    ['company-profile','micro',1,'Create a company profile',['competition','deliverables'],'Company','e.g. 3M Company',['Company financials','Strategic intelligence','Recent developments']],
    ['swot','micro',2,'Develop a SWOT analysis',['competition','strategy'],'Company or market','e.g. H.B. Fuller',['Strengths & weaknesses','Opportunities & threats','Prioritized impacts & actions','Scenarios']],
    ['pestle','micro',3,'Assess the external environment',['strategy'],'Market','e.g. Industrial adhesives',['Political & economic factors','Social & technological factors','Legal & environmental factors','Key impacts & scenario risks']],
    ['strategy-brief','micro',4,'Develop a strategy brief',['strategy','deliverables'],'Strategic question','What decision are you considering?',['Where to play','Why now','Competitor moves','Recommended decision']],
    ['signal-analysis','micro',5,'Analyze a business signal',['strategy','deliverables'],'Signal or development','Paste a signal headline or describe a development',['Business implications','Actions & stakeholders','Potential counter-signals']],
    ['market-data','micro',6,'Populate a market-data template',['growth','deliverables'],'Market or research scope','Describe the market your template covers',['Your market template','Research to populate its data points','Excel output']],
    ['smart-research','deep',0,'Explore a research question',['growth','competition','strategy','customers','deliverables'],'Research question','What would you like to understand?',['Research type selected from your question','Context-led research direction']],
    ['technical-analysis','deep',1,'Assess a market’s technology',['growth'],'Market','Which market or technology?',['Infrastructure & technology stack','Innovation trends','Scalability constraints','Key market enablers']],
    ['tam-expansion','deep',2,'Explore TAM expansion',['growth'],'Market or business','Which market or business?',['New revenue pools','Market growth opportunities','TAM modeling']],
    ['competitor-profile','deep',3,'Research a competitor',['competition'],'Competitor','e.g. 3M Company',['Revenue','Positioning','SWOT','Strategy']],
    ['competitive-landscape','deep',4,'Map the competitive landscape',['competition'],'Market or competitor set','Which market or companies?',['Key players','Financial benchmarking','Strategies & market positioning']],
    ['market-deep-dive','deep',5,'Explore a market in depth',['growth'],'Market','e.g. Bioadhesives Market',['Market trends','Growth drivers','Risks','Forecasts']],
    ['market-entry','deep',6,'Develop a market-entry strategy',['growth','strategy'],'Target market','Which market are you considering entering?',['Entry models','Partnerships','Regulatory factors','Risk mitigation']],
    ['go-to-market','deep',7,'Build a go-to-market strategy',['strategy'],'Product, service or market','What are you taking to market?',['Target segments','Positioning','Pricing strategy','Channel approach']],
    ['go-no-go','deep',8,'Evaluate a go / no-go decision',['strategy'],'Investment or launch decision','What decision needs validation?',['Investment or launch context','Data-driven decision validation']],
    ['voice-of-customer','deep',9,'Understand the voice of the customer',['customers'],'Customer question or audience','Whose needs would you like to understand?',['Customer feedback','Sentiment','Unmet needs']],
    ['account-insights','deep',10,'Research an account',['customers'],'Account or company','Which account?',['Account profile','Key stakeholders']],
    ['partner-analysis','deep',11,'Evaluate acquisition targets & partners',['strategy'],'Company, target or market','Which target or partnership?',['Potential acquisition targets','Target evaluation']],
    ['whitepaper','deep',12,'Develop whitepaper research',['deliverables'],'Research topic','What topic should the research explore?',['In-depth research','Data-backed insights','Executive summary']],
    ['strategic-tam','deep',13,'Develop strategic TAM expansion',['growth','strategy'],'Market or business','Which market or business?',['New revenue pools','Market growth opportunities','Advanced TAM modeling']],
    ['tracker','deep',14,'Track a market or competitors',['competition','deliverables'],'Market or competitive dataset','What would you like to monitor?',['Structured market or competitive dataset','Monitoring over time','Cadenced refresh through the existing service']]
  ];
  const tasks=definitions.map(([id,group,index,name,goals,subjectLabel,placeholder,outline])=>{
    const source=window.GROWTHIQ_DATA.agents[group][index];
    const format=source.metadata.split(' · ').find(v=>['Excel','PPTX','DOC'].includes(v))||'Research';
    return {id,group,index,name,goals,subjectLabel,placeholder,outline,sourceTitle:source.title,description:source.description,metadata:source.metadata,format,output:{Excel:'Excel workbook',PPTX:'PowerPoint presentation',DOC:'Document',Research:'Research study'}[format],requiresTemplate:id==='market-data'};
  });
  return {goals,tasks};
})();
