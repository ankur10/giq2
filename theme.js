/* Runs before styles load to restore the chosen theme without a light flash. */
window.GROWTHIQ_THEMES = (() => {
  const choices=[{"id":"precision","name":"Precision","description":"White · navy · focused blue","canvas":"#f7f8fa","header":"#122b49"},{"id":"advisory","name":"Advisory","description":"Navy · white · precise blue","canvas":"#f7f8f9","header":"#051c2c"},{"id":"mineral","name":"Mineral","description":"Cool gray · intelligence blue","canvas":"#f5f7f9","header":"#172b3a"}];
  const key='growthiq-colour-theme';
  const headerKey='growthiq-header-style';
  let headerStyle='light';
  function applyHeader(value,persist=true){
    headerStyle=value==='dark'?'dark':'light';
    document.documentElement.dataset.header=headerStyle;
    document.querySelectorAll('[data-header-toggle]').forEach(el=>el.setAttribute('aria-pressed',String(headerStyle==='dark')));
    if(persist){try{localStorage.setItem(headerKey,headerStyle)}catch{}}
    apply(document.documentElement.dataset.theme,false);
    return headerStyle;
  }
  function apply(value,persist=true){
    const theme=choices.find(t=>t.id===value)||choices.find(t=>t.id==='advisory');
    document.documentElement.dataset.theme=theme.id;
    document.querySelectorAll('[data-theme-select]').forEach(el=>el.value=theme.id);
    const meta=document.querySelector('meta[name="theme-color"]');
    if(meta)meta.setAttribute('content',headerStyle==='dark'?theme.header:theme.canvas);
    if(persist){try{localStorage.setItem(key,theme.id)}catch{}}
    return theme;
  }
  let saved='advisory';try{saved=localStorage.getItem(key)||saved}catch{}
  // Retired palettes move to the new starting direction; retained choices remain intact.
  if(["grove", "midnight", "evergreen", "graphite", "slate", "atelier", "parchment"].includes(saved))saved='advisory';
  let requested=null;try{requested=new URL(location.href).searchParams.get('theme')}catch{}
  const hasRequestedTheme=choices.some(theme=>theme.id===requested);
  apply(hasRequestedTheme?requested:saved,hasRequestedTheme);
  // Consume comparison links so later manual choices survive reload.
  if(hasRequestedTheme){try{const url=new URL(location.href);url.searchParams.delete('theme');window.history.replaceState(window.history.state,'',url.href)}catch{}}
  let savedHeader='light';try{savedHeader=localStorage.getItem(headerKey)||savedHeader}catch{}
  let requestedHeader=null;try{requestedHeader=new URL(location.href).searchParams.get('header')}catch{}
  const hasRequestedHeader=['light','dark'].includes(requestedHeader);
  applyHeader(hasRequestedHeader?requestedHeader:savedHeader,hasRequestedHeader);
  if(hasRequestedHeader){try{const url=new URL(location.href);url.searchParams.delete('header');window.history.replaceState(window.history.state,'',url.href)}catch{}}
  document.addEventListener('click',event=>{
    const button=event.target.closest?.('[data-header-toggle]');
    if(!button?.hasAttribute('data-header-toggle'))return;
    applyHeader(headerStyle==='dark'?'light':'dark');
    const status=document.getElementById('theme-status');if(status)status.textContent=headerStyle==='dark'?'Dark header enabled.':'Light header enabled.';
  });
  document.addEventListener('change',event=>{
    if(event.target.hasAttribute('data-theme-select')){
      const theme=apply(event.target.value);
      const status=document.getElementById('theme-status');if(status)status.textContent=theme.name+' theme selected. '+theme.description+'.';
    }
  });
  return {choices,apply,applyHeader,header:()=>headerStyle,current:()=>document.documentElement.dataset.theme||'advisory'};
})();
