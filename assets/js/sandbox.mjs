export function buildDocument(draft, { preview = true, token = "" } = {}) {
  const css = String(draft.css || "").replace(/<\/style/gi, "<\\/style");
  const js = String(draft.js || "").replace(/<\/script/gi, "<\\/script");
  const bridge = `(()=>{const send=(kind,text)=>parent.postMessage({source:'praktika-preview',token:${JSON.stringify(token)},kind,text:String(text).slice(0,2000)},'*');window.addEventListener('error',e=>send('error',e.message));window.addEventListener('unhandledrejection',e=>send('error',e.reason?.message||e.reason));for(const kind of ['log','warn','error']){const original=console[kind];console[kind]=(...args)=>{original.apply(console,args);send(kind,args.map(value=>{try{return typeof value==='string'?value:JSON.stringify(value)}catch{return String(value)}}).join(' '));}}})();`;
  const csp = `<meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data:; font-src data:; connect-src 'none'; form-action 'none'; base-uri 'none';">`;
  return `<!doctype html><html lang="id"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Karya Praktika</title>${preview ? csp : ""}<style>${css}</style>${preview ? `<script>${bridge}</script>` : ""}</head><body>${draft.html || ""}<script>${js}</script></body></html>`;
}
