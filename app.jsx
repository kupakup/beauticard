/* ============================================================
   BeautiCard — main app shell
   ============================================================ */

const { useState, useEffect, useRef } = React;

const DEFAULT_CONTENT = {
  kicker: 'ВЫПУСК №24',
  title: 'Тихая революция в дизайне',
  subtitle: 'Как маленькие студии меняют большой рынок',
};

const TABS = [
  { id:'style',    label:'Стиль' },
  { id:'text',     label:'Текст' },
  { id:'type',     label:'Типографика' },
  { id:'bg',       label:'Фон' },
  { id:'tmpl',     label:'Шаблоны' },
];

const ASPECT_ORDER = ['3:4','1:1','16:9','9:16'];

function App() {
  const [tab, setTab] = useState('style');
  const [presetId, setPresetId] = useState('magazine');
  const [aspect, setAspect] = useState('3:4');
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const [bgOverride, setBgOverride] = useState(null);
  const [textOverrides, setTextOverrides] = useState({});
  const [layoutOverride, setLayoutOverride] = useState({});
  const [docName, setDocName] = useState('Тихая революция');
  const [showHistory, setShowHistory] = useState(false);
  const [toast, setToast] = useState(null);

  // History
  const histRef = useRef([{ ts: Date.now(), label: 'Начало работы', snap: snapshot() }]);
  const [histIdx, setHistIdx] = useState(0);

  function snapshot() {
    return JSON.stringify({ presetId, aspect, content, bgOverride, textOverrides, layoutOverride });
  }

  // Track significant changes into history (debounced-ish)
  useEffect(() => {
    const t = setTimeout(() => {
      const snap = snapshot();
      const last = histRef.current[histRef.current.length - 1];
      if (last && last.snap === snap) return;
      const label = describeChange(last, { presetId, content, bgOverride, textOverrides, layoutOverride, aspect });
      const cut = histRef.current.slice(0, histIdx + 1);
      cut.push({ ts: Date.now(), label, snap });
      histRef.current = cut.slice(-30);
      setHistIdx(histRef.current.length - 1);
    }, 350);
    return () => clearTimeout(t);
  // eslint-disable-next-line
  }, [presetId, aspect, content, bgOverride, textOverrides, layoutOverride]);

  function describeChange(prev, cur) {
    if (!prev) return 'Изменение';
    try {
      const p = JSON.parse(prev.snap);
      if (p.presetId !== cur.presetId) return `Стиль → ${PRESETS[cur.presetId].name}`;
      if (p.aspect !== cur.aspect) return `Формат → ${cur.aspect}`;
      if (JSON.stringify(p.bgOverride) !== JSON.stringify(cur.bgOverride)) return 'Изменён фон';
      if (JSON.stringify(p.layoutOverride) !== JSON.stringify(cur.layoutOverride)) return 'Изменено расположение';
      if (JSON.stringify(p.textOverrides) !== JSON.stringify(cur.textOverrides)) return 'Изменена типографика';
      if (p.content.title !== cur.content.title) return 'Изменён заголовок';
      if (p.content.kicker !== cur.content.kicker) return 'Изменена надпись';
      if (p.content.subtitle !== cur.content.subtitle) return 'Изменена подпись';
    } catch {}
    return 'Изменение';
  }

  function restoreSnap(snap) {
    try {
      const s = JSON.parse(snap);
      setPresetId(s.presetId); setAspect(s.aspect); setContent(s.content);
      setBgOverride(s.bgOverride); setTextOverrides(s.textOverrides);
      setLayoutOverride(s.layoutOverride);
    } catch {}
  }

  function undo() {
    if (histIdx <= 0) return;
    const newIdx = histIdx - 1;
    setHistIdx(newIdx);
    restoreSnap(histRef.current[newIdx].snap);
    showToast('Отменено');
  }
  function redo() {
    if (histIdx >= histRef.current.length - 1) return;
    const newIdx = histIdx + 1;
    setHistIdx(newIdx);
    restoreSnap(histRef.current[newIdx].snap);
    showToast('Возвращено');
  }

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(null), 1600);
  }

  // Pre-fetch Google Fonts CSS so html-to-image can embed it (CSSOM access on
  // cross-origin stylesheets is blocked by the browser).
  const fontCssRef = useRef(null);
  async function getFontEmbedCSS() {
    if (fontCssRef.current != null) return fontCssRef.current;
    try {
      const links = Array.from(
        document.querySelectorAll('link[rel="stylesheet"][href*="fonts.googleapis.com"]')
      );
      const texts = await Promise.all(
        links.map(l => fetch(l.href, { mode:'cors' }).then(r => r.ok ? r.text() : '').catch(() => ''))
      );
      fontCssRef.current = texts.join('\n');
    } catch {
      fontCssRef.current = '';
    }
    return fontCssRef.current;
  }

  async function downloadPng() {
    const node = document.querySelector('.cover');
    if (!node || typeof htmlToImage === 'undefined') {
      showToast('Не удалось подготовить файл');
      return;
    }
    showToast('Готовлю PNG…');
    try {
      await document.fonts.ready;
      const rect = node.getBoundingClientRect();
      const a = ASPECTS[aspect];
      const targetW = a.w >= a.h ? 1200 : Math.round(1200 * a.w / a.h);
      const pixelRatio = targetW / rect.width;
      const fontEmbedCSS = await getFontEmbedCSS();
      const blob = await htmlToImage.toBlob(node, { pixelRatio, fontEmbedCSS });
      if (!blob) throw new Error('no blob');
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      const stamp = (docName || 'beauticard').replace(/[^\p{L}\p{N}_\-]+/gu, '-').slice(0, 40) || 'beauticard';
      link.href = url;
      link.download = `${stamp}.png`;
      document.body.appendChild(link); link.click(); document.body.removeChild(link);
      URL.revokeObjectURL(url);
      showToast('Файл скачан');
    } catch (e) {
      console.error(e);
      showToast('Ошибка скачивания');
    }
  }

  // Randomize — pick random style + random small variations
  function randomize() {
    const ids = PRESET_ORDER.filter(p => p !== presetId);
    const next = ids[Math.floor(Math.random() * ids.length)];
    setPresetId(next);
    setTextOverrides({});
    setLayoutOverride({});
    // 50% chance of bg surprise
    if (Math.random() < 0.5) {
      const opts = [
        { mode:'gradient', a:'#FFB1A5', b:'#9D9AFF', angle: 135 },
        { mode:'gradient', a:'#5552E0', b:'#0B0B0E', angle: 160 },
        { mode:'gradient', a:'#1F3D2E', b:'#C9B66E', angle: 145 },
        { mode:'mesh', a:'#FFE7A6', b:'#9D9AFF', c:'#FFB1A5' },
        null,
      ];
      setBgOverride(opts[Math.floor(Math.random()*opts.length)]);
    } else {
      setBgOverride(null);
    }
    showToast('Сгенерирован вариант');
  }

  function applyTemplate(t) {
    setPresetId(t.presetId);
    setContent(t.content);
    setTextOverrides({});
    setLayoutOverride({});
    setBgOverride(null);
    showToast(`Шаблон «${t.name}» применён`);
  }

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e) => {
      const mod = e.metaKey || e.ctrlKey;
      if (mod && e.key === 'z' && !e.shiftKey) { e.preventDefault(); undo(); }
      else if (mod && (e.key === 'y' || (e.shiftKey && e.key === 'Z' || e.shiftKey && e.key === 'z'))) { e.preventDefault(); redo(); }
      else if (mod && e.key === 'r') { e.preventDefault(); randomize(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const aspectMeta = ASPECTS[aspect];
  // Compute pixel size for the preview, fitting in the canvas-mid area
  // The cover-stage is a flex container; we'll let CSS handle sizing via max-h / max-w

  return (
    <div className="app">
      {/* ---------------- Header ---------------- */}
      <header className="hdr">
        <div className="hdr-left">
          <div className="brand">
            <span className="brand-mark">B</span>
            <span>BeautiCard</span>
          </div>
          <span style={{color:'var(--text-4)', padding:'0 4px'}}>/</span>
          <div className="crumb">
            <span>Мои обложки</span>
            <span style={{color:'var(--text-4)'}}>/</span>
            <input value={docName} onChange={e => setDocName(e.target.value)} />
          </div>
        </div>
        <div className="hdr-center">
          <button className="btn ghost icon" title="Отменить (⌘Z)" onClick={undo}
            disabled={histIdx === 0}
            style={{opacity: histIdx===0 ? .4 : 1}}>
            <Icon name="undo"/>
          </button>
          <button className="btn ghost icon" title="Повторить (⌘⇧Z)" onClick={redo}
            disabled={histIdx >= histRef.current.length-1}
            style={{opacity: histIdx>=histRef.current.length-1 ? .4 : 1}}>
            <Icon name="redo"/>
          </button>
          <button className="btn ghost icon" title="История версий"
            onClick={() => setShowHistory(s => !s)}
            aria-pressed={showHistory}>
            <Icon name="history"/>
          </button>
        </div>
        <div className="hdr-right">
          <button className="btn outline" onClick={randomize} title="Сгенерировать вариант (⌘R)">
            <Icon name="random" sm/> Сгенерировать
          </button>
          <button className="btn outline">
            <Icon name="duplicate" sm/> Дублировать
          </button>
          <button className="btn primary" onClick={downloadPng}>
            <Icon name="download" sm/> Скачать PNG
          </button>
        </div>
      </header>

      {/* ---------------- Main ---------------- */}
      <div className="app-main">
        {/* Canvas */}
        <section className="canvas">
          <div className="canvas-top">
            <div className="aspect-tabs">
              <div className="btn-group">
                {ASPECT_ORDER.map(a => (
                  <button key={a} className="btn"
                    aria-pressed={aspect === a}
                    onClick={() => setAspect(a)}
                    title={ASPECTS[a].hint}>
                    <Icon name={
                      a==='1:1'?'square':
                      a==='3:4'?'square-3-4':
                      a==='16:9'?'square-16-9':
                      'square-9-16'
                    } sm/>
                    {ASPECTS[a].label}
                  </button>
                ))}
              </div>
              <span style={{marginLeft:10, fontSize:11.5, color:'var(--text-3)'}}>
                {aspectMeta.hint} · 1200 × {Math.round(1200 * aspectMeta.h / aspectMeta.w)} px
              </span>
            </div>
            <div style={{display:'flex', gap:6, alignItems:'center'}}>
              <span style={{fontSize:11.5, color:'var(--text-3)'}}>Стиль:</span>
              <span style={{fontSize:12, fontWeight:600}}>{PRESETS[presetId].name}</span>
              <span className="dot"/>
              <span style={{fontSize:11.5, color:'var(--text-3)'}}>Авто-сохранено</span>
            </div>
          </div>

          <div className="canvas-mid">
            <div className="cover-stage">
              <CoverWithFit
                aspect={aspect}
                presetId={presetId}
                content={content}
                overrides={textOverrides}
                bgOverride={bgOverride}
                layoutOverride={layoutOverride}
              />
            </div>
          </div>

          <div className="canvas-bot">
            <div style={{display:'flex', gap:14, alignItems:'center'}}>
              <span>100%</span>
              <span className="dot"/>
              <span>Подогнано по экрану</span>
            </div>
            <div style={{display:'flex', gap:14, alignItems:'center'}}>
              <span><span className="kbd">Z</span> отмена</span>
              <span><span className="kbd">R</span> рандом</span>
              <span>3 изменения · {new Date().toLocaleTimeString('ru-RU', {hour:'2-digit', minute:'2-digit'})}</span>
            </div>
          </div>

          {showHistory && (
            <div className="history-pop">
              <div className="hp-hd">
                <h4>История версий</h4>
                <button className="btn ghost icon" onClick={() => setShowHistory(false)}><Icon name="close" sm/></button>
              </div>
              <ul>
                {[...histRef.current].reverse().map((h, i, arr) => {
                  const idx = histRef.current.length - 1 - i;
                  return (
                    <li key={idx} className={idx === histIdx ? 'cur' : ''}
                      onClick={() => { setHistIdx(idx); restoreSnap(h.snap); }}>
                      <span className="h-dot"/>
                      <span className="h-text">{h.label}</span>
                      <span className="h-time">{
                        i === 0 ? 'сейчас' :
                        relativeTime(h.ts)
                      }</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </section>

        {/* Panel */}
        <aside className="panel">
          <div className="panel-tabs" role="tablist">
            {TABS.map(t => (
              <button key={t.id} className="panel-tab"
                aria-selected={tab === t.id}
                onClick={() => setTab(t.id)}>
                {t.label}
              </button>
            ))}
          </div>
          <div className="panel-body">
            {tab === 'style' && <TabStyle presetId={presetId} setPresetId={setPresetId} content={content}/>}
            {tab === 'text' && <TabText content={content} setContent={setContent}/>}
            {tab === 'type' && <TabTypography presetId={presetId}
              overrides={textOverrides} setOverrides={setTextOverrides}
              layoutOverride={layoutOverride} setLayoutOverride={setLayoutOverride}/>}
            {tab === 'bg' && <TabBackground bg={bgOverride} setBg={setBgOverride} presetId={presetId}/>}
            {tab === 'tmpl' && <TabTemplates apply={applyTemplate} content={content} presetId={presetId}/>}
          </div>
          <div className="panel-foot">
            <span style={{fontSize:11.5, color:'var(--text-3)'}}>BeautiCard · v1.4.0</span>
            <button className="btn ghost" style={{fontSize:11.5}}>Помощь</button>
          </div>
        </aside>
      </div>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

function relativeTime(ts) {
  const diff = (Date.now() - ts) / 1000;
  if (diff < 60) return Math.max(1, Math.round(diff)) + ' c';
  if (diff < 3600) return Math.round(diff/60) + ' мин';
  return Math.round(diff/3600) + ' ч';
}

/* CoverWithFit — sizes the cover to fit the available area while preserving aspect ratio */
function CoverWithFit({ aspect, ...rest }) {
  const ref = React.useRef(null);
  const [box, setBox] = React.useState({ w: 0, h: 0 });
  React.useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([e]) => {
      setBox({ w: e.contentRect.width, h: e.contentRect.height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  const a = ASPECTS[aspect];
  const ratio = a.w / a.h;
  let w = box.w, h = box.h;
  if (w / h > ratio) w = h * ratio; else h = w / ratio;
  // Cap so it doesn't get too large on huge screens
  const maxH = 620;
  if (h > maxH) { h = maxH; w = h * ratio; }
  return (
    <div ref={ref} style={{width:'100%', height:'100%', display:'grid', placeItems:'center'}}>
      <div className="cover-frame" style={{ width: w, height: h }}>
        <div className="cover-ruler"/>
        <CoverPreview aspect={aspect} {...rest}/>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
