// Public website routing and anonymous page-view configuration.
(() => {
  const host = location.hostname.toLowerCase();
  const custom = host === 'neoulshim.kr' || host === 'www.neoulshim.kr';
  const github = host === 'neoulshim.github.io';
  document.documentElement.dataset.siteHost = custom ? 'custom-domain' : github ? 'github-pages' : 'preview';
  if (custom) {
    for (const a of document.querySelectorAll('a[href]')) {
      const url = new URL(a.href);
      if (url.hostname === 'neoulshim.github.io') {
        const paths = {ScenarioMaster: 'scenariomaster', KingOfRevision: 'kingofrevision'};
        const parts = url.pathname.split('/');
        if (paths[parts[1]]) { parts[1] = paths[parts[1]]; a.href = parts.join('/') + url.search + url.hash; }
      }
      if (!location.pathname.startsWith('/portfolio') && url.hostname === 'thundering-pedestrian-751.notion.site') a.href = '/portfolio/';
    }
  }
  if (!custom && !github) return;
  if (document.getElementById('cloudflare-web-analytics')) return;
  const script = document.createElement('script');
  script.id = 'cloudflare-web-analytics';
  script.type = 'module';
  script.src = 'https://static.cloudflareinsights.com/beacon.min.js';
  script.dataset.cfBeacon = JSON.stringify({token: custom ? '81b9b24929344e8c90393e8775e8f0bf' : '46fad0ec45c24702af8b85af375aa8db', spa:false});
  document.head.appendChild(script);
})();
