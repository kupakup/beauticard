/* ============================================================
   Right panel — Style / Text / Typography / Background / Templates
   ============================================================ */

const { useState, useEffect, useRef } = React;

/* ---------- Icons ---------- */
const Icon = ({ name, sm, lg }) => {
  const cls = `ico${sm?' ico-sm':''}${lg?' ico-lg':''}`;
  const paths = {
    'plus':       <><path d="M8 3v10M3 8h10"/></>,
    'search':     <><circle cx="7" cy="7" r="4.5"/><path d="m10.5 10.5 3 3"/></>,
    'image':      <><rect x="2" y="2" width="12" height="12" rx="1.5"/><circle cx="6" cy="6" r="1.2"/><path d="m2.5 12 3.5-3.5 4 4 1.5-1.5 2.5 2.5"/></>,
    'upload':     <><path d="M8 11V3m0 0L5 6m3-3 3 3"/><path d="M3 12v1.5h10V12"/></>,
    'undo':       <><path d="M5 6h6.5a2.5 2.5 0 0 1 0 5H6"/><path d="m5 6 2-2M5 6l2 2"/></>,
    'redo':       <><path d="M11 6H4.5a2.5 2.5 0 0 0 0 5H10"/><path d="m11 6-2-2M11 6 9 8"/></>,
    'history':    <><circle cx="8" cy="8" r="5.5"/><path d="M8 5v3l2 1.5"/></>,
    'download':   <><path d="M8 3v8m0 0L5 8m3 3 3-3"/><path d="M3 12v1.5h10V12"/></>,
    'sparkles':   <><path d="M8 2v3m0 6v3m-6-6h3m6 0h3M4 4l1.5 1.5M10.5 10.5 12 12M12 4l-1.5 1.5M5.5 10.5 4 12"/></>,
    'check':      <><path d="m3 8 3.5 3.5L13 5"/></>,
    'chevron':    <><path d="m6 4 4 4-4 4"/></>,
    'chevron-d':  <><path d="m4 6 4 4 4-4"/></>,
    'align-l':    <><path d="M2 4h12M2 8h8M2 12h12M2 16h6"/></>,
    'align-c':    <><path d="M2 4h12M4 8h8M2 12h12"/></>,
    'align-r':    <><path d="M2 4h12M6 8h8M2 12h12"/></>,
    'pos-t':      <><rect x="2" y="2" width="12" height="12" rx="1"/><rect x="4" y="4" width="8" height="3" fill="currentColor" stroke="none"/></>,
    'pos-c':      <><rect x="2" y="2" width="12" height="12" rx="1"/><rect x="4" y="6.5" width="8" height="3" fill="currentColor" stroke="none"/></>,
    'pos-b':      <><rect x="2" y="2" width="12" height="12" rx="1"/><rect x="4" y="9" width="8" height="3" fill="currentColor" stroke="none"/></>,
    'square':     <><rect x="2.5" y="2.5" width="11" height="11" rx="1"/></>,
    'square-9-16':<><rect x="4" y="2" width="8" height="12" rx="1"/></>,
    'square-3-4': <><rect x="3" y="2" width="10" height="12" rx="1"/></>,
    'square-16-9':<><rect x="2" y="4" width="12" height="8" rx="1"/></>,
    'close':      <><path d="m4 4 8 8M12 4l-8 8"/></>,
    'random':     <><path d="M2 4h2l8 8h2M2 12h2l8-8h2"/><path d="m12 2 2 2-2 2M12 14l2-2-2-2"/></>,
    'duplicate':  <><rect x="5" y="5" width="9" height="9" rx="1"/><path d="M11 5V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h2"/></>,
    'palette':    <><path d="M8 14a6 6 0 1 1 6-6c0 1.5-1 2-2.5 2H10a1.5 1.5 0 0 0-1 2.5L9.5 13a1 1 0 0 1-1.5 1Z"/><circle cx="5" cy="6.5" r=".8" fill="currentColor"/><circle cx="8" cy="5" r=".8" fill="currentColor"/><circle cx="11" cy="6.5" r=".8" fill="currentColor"/></>,
    'gradient':   <><rect x="2" y="2" width="12" height="12" rx="1.5"/><path d="M2 14 14 2" stroke="currentColor" opacity=".4"/></>,
    'blocks':     <><rect x="2" y="2" width="5.5" height="5.5"/><rect x="8.5" y="2" width="5.5" height="5.5"/><rect x="2" y="8.5" width="5.5" height="5.5"/><circle cx="11.25" cy="11.25" r="2.75"/></>,
    'pattern':    <><circle cx="4" cy="4" r=".8" fill="currentColor"/><circle cx="8" cy="4" r=".8" fill="currentColor"/><circle cx="12" cy="4" r=".8" fill="currentColor"/><circle cx="4" cy="8" r=".8" fill="currentColor"/><circle cx="8" cy="8" r=".8" fill="currentColor"/><circle cx="12" cy="8" r=".8" fill="currentColor"/><circle cx="4" cy="12" r=".8" fill="currentColor"/><circle cx="8" cy="12" r=".8" fill="currentColor"/><circle cx="12" cy="12" r=".8" fill="currentColor"/></>,
    'menu':       <><path d="M2 4h12M2 8h12M2 12h12"/></>,
    'bold':       <><path d="M4 2.5h4a2.5 2.5 0 0 1 0 5H4Zm0 5h5a2.5 2.5 0 0 1 0 5H4Z" fill="currentColor" stroke="none"/></>,
    'type':       <><path d="M3 4V3h10v1M8 3v10M5 13h6"/></>,
  };
  return <svg className={cls} viewBox="0 0 16 16">{paths[name]}</svg>;
};

/* ---------- Reusable controls ---------- */
function Slider({ value, onChange, min=0, max=100, step=1, suffix='', label, showVal=true }) {
  return (
    <div className="field">
      {label && <div className="field-label"><span>{label}</span>{showVal && <span className="val">{value}{suffix}</span>}</div>}
      <input className="slider" type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(parseFloat(e.target.value))}/>
    </div>
  );
}

function Seg({ value, onChange, options }) {
  return (
    <div className="seg" role="radiogroup">
      {options.map(o => (
        <button key={o.value} className="seg-btn" aria-pressed={value === o.value}
          onClick={() => onChange(o.value)} title={o.title}>
          {o.icon || o.label}
        </button>
      ))}
    </div>
  );
}

/* ---------- Color palettes ---------- */
const COLOR_PALETTE = [
  '#FFFFFF','#F2EBDC','#F8F7F3','#F2DC1B','#FFB1A5','#9D9AFF','#5552E0','#0A0A0A',
  '#161616','#1F3D2E','#3B5BDB','#0B5394','#16A34A','#E2231A','#C9B66E','#7B3FBF',
];
const TEXT_COLOR_PALETTE = [
  '#0A0A0A','#161616','#3C3A33','#5C5A53','#9B9A95','#FFFFFF','#F4ECDD','#C9B66E',
  '#5552E0','#3B5BDB','#16A34A','#E2231A','#9C2B2B','#1F3D2E','#F2C84B','#8B89F7',
];

function ColorChips({ value, onChange, palette = COLOR_PALETTE }) {
  return (
    <div className="chips">
      {palette.map(c => (
        <button key={c} className="chip" style={{background:c}}
          aria-pressed={value === c} onClick={() => onChange(c)} title={c}/>
      ))}
    </div>
  );
}

/* ============================================================
   Tab: Style — preset cards
   ============================================================ */
function TabStyle({ presetId, setPresetId, content }) {
  return (
    <>
      <div className="sec">
        <div className="sec-hd"><h3>Стиль обложки</h3><span className="sec-act">8 пресетов</span></div>
        <div className="preset-grid">
          {PRESET_ORDER.map(id => (
            <button key={id} className="preset-card" aria-pressed={presetId === id}
              onClick={() => setPresetId(id)}>
              <div className="preset-thumb">
                <CoverPreview
                  presetId={id}
                  content={content}
                  aspect="1:1"
                  hideDeco
                />
              </div>
              <div className="preset-meta">
                <span className="name">{PRESETS[id].name}</span>
                <span className="tag">{PRESETS[id].desc}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
      <div className="sec">
        <div className="sec-hd"><h3>Соотношение сторон</h3></div>
        <p style={{fontSize:11.5, color:'var(--text-3)', margin:0}}>
          Меняется в верхней панели предпросмотра. Текущий пресет адаптируется к выбранному формату.
        </p>
      </div>
    </>
  );
}

/* ============================================================
   Tab: Text — content + decorations
   ============================================================ */
const DECO_USE = {
  magazine: ['issue', 'date', 'tagline'],
  book:     ['date'],
  modern:   ['brand', 'issue', 'tagline', 'date'],
  brutalist:['issue', 'date', 'badge'],
  editorial:['brand', 'tagline'],
  tech:     ['brand', 'date', 'issue', 'readTime'],
  photo:    ['brand', 'issue'],
  gradient: ['brand'],
};
const DECO_LABELS = {
  brand:    { label:'Бренд / название',   ph:'BEAUTICARD',           max:32 },
  issue:    { label:'Номер выпуска',      ph:'№ 24',                 max:24 },
  date:     { label:'Дата',               ph:'МАЙ · 2026',           max:32 },
  badge:    { label:'Метка (на печати)',  ph:'НОВОЕ',                max:14 },
  tagline:  { label:'Слоган / линия',     ph:'ДИЗАЙН · КУЛЬТУРА',    max:64 },
  readTime: { label:'Метка справа',       ph:'ЧТЕНИЕ · 8 МИН',       max:24 },
};
const DECO_DEFAULTS = {
  brand: 'BEAUTICARD',
  issue: '№ 24',
  date: 'МАЙ · 2026',
  badge: 'НОВОЕ',
  tagline: 'ДИЗАЙН · КУЛЬТУРА · ТЕХНО',
  readTime: 'ЧТЕНИЕ · 8 МИН',
};

function TabText({ content, setContent, deco, setDeco, presetId }) {
  const ch = (k) => (e) => setContent({ ...content, [k]: e.target.value });
  const chDeco = (k) => (e) => setDeco({ ...deco, [k]: e.target.value });
  const usedFields = DECO_USE[presetId] || [];
  return (
    <>
      <div className="sec">
        <div className="sec-hd">
          <h3>Содержание</h3>
          <span className="sec-act" onClick={() => setContent({ kicker:'', title:'', subtitle:'' })}>Очистить</span>
        </div>
        <div className="field">
          <div className="field-label">
            <span>Надпись над заголовком</span>
            <span className="val">{content.kicker.length}/40</span>
          </div>
          <input className="input" value={content.kicker} onChange={ch('kicker')}
            placeholder="ВЫПУСК №24"
            maxLength={40}/>
        </div>
        <div className="field">
          <div className="field-label">
            <span>Заголовок</span>
            <span className="val">{content.title.length}/120</span>
          </div>
          <textarea className="textarea" value={content.title} onChange={ch('title')}
            placeholder="Тихая революция в дизайне"
            maxLength={120} rows={2}/>
        </div>
        <div className="field">
          <div className="field-label">
            <span>Подпись под заголовком</span>
            <span className="val">{content.subtitle.length}/160</span>
          </div>
          <textarea className="textarea" value={content.subtitle} onChange={ch('subtitle')}
            placeholder="Как маленькие студии меняют большой рынок"
            maxLength={160} rows={2}/>
        </div>
      </div>

      <div className="sec">
        <div className="sec-hd">
          <h3>Украшения этого стиля</h3>
          <span className="sec-act" onClick={() => setDeco({...DECO_DEFAULTS})}>По умолчанию</span>
        </div>
        {usedFields.length === 0 ? (
          <p style={{fontSize:11.5, color:'var(--text-3)', margin:0}}>
            В этом стиле украшений нет.
          </p>
        ) : usedFields.map(k => {
          const meta = DECO_LABELS[k];
          return (
            <div className="field" key={k}>
              <div className="field-label">
                <span>{meta.label}</span>
                <span className="val">{(deco[k] || '').length}/{meta.max}</span>
              </div>
              <input className="input" value={deco[k] || ''} onChange={chDeco(k)}
                placeholder={meta.ph} maxLength={meta.max}/>
            </div>
          );
        })}
      </div>
    </>
  );
}

/* ============================================================
   Tab: Typography — per-field controls
   ============================================================ */
const FIELD_KEYS = [
  { key:'kicker',   label:'Надпись',  short:'К', desc:'Над заголовком' },
  { key:'title',    label:'Заголовок', short:'З', desc:'Основной текст' },
  { key:'subtitle', label:'Подпись',  short:'П', desc:'Под заголовком' },
];

function FieldCard({ k, label, desc, short, preset, override, setOverride }) {
  const [open, setOpen] = useState(k === 'title');
  const cur = { ...preset, ...(override||{}) };
  const set = (patch) => setOverride({ ...override, ...patch });

  return (
    <div className="field-card">
      <div className="field-card-hd" onClick={() => setOpen(!open)}>
        <div className="lbl">
          <span className="dotty">{short}</span>
          <span>{label}</span>
          <span style={{color:'var(--text-3)', fontWeight:500, fontSize:11.5}}>· {FONT_LABEL[cur.font]} · {cur.size.toFixed(1)}</span>
        </div>
        <Icon name={open ? 'chevron-d' : 'chevron'} sm/>
      </div>
      {open && (
        <div className="field-card-body">
          <div className="field">
            <div className="field-label"><span>Шрифт</span></div>
            <select className="select" value={cur.font} onChange={e => set({font: e.target.value})}>
              {Object.keys(FONT_LABEL).map(f => <option key={f} value={f}>{FONT_LABEL[f]}</option>)}
            </select>
          </div>
          <div className="row-2">
            <Slider label="Размер" value={cur.size} onChange={v => set({size: v})}
              min={1.5} max={22} step={0.1} suffix="" />
            <div className="field">
              <div className="field-label"><span>Жирность</span><span className="val">{cur.weight}</span></div>
              <select className="select" value={cur.weight} onChange={e => set({weight: parseInt(e.target.value)})}>
                {[200,300,400,500,600,700,800,900].map(w => <option key={w} value={w}>{w}</option>)}
              </select>
            </div>
          </div>
          <Slider label="Высота строки" value={cur.lh} onChange={v => set({lh: v})}
            min={0.8} max={1.8} step={0.01} suffix="" />
          <Slider label="Межбуквенный интервал" value={cur.tracking || 0}
            onChange={v => set({tracking: v})} min={-0.05} max={0.5} step={0.005} suffix="em" />
          <div className="field">
            <div className="field-label"><span>Регистр</span></div>
            <Seg value={cur.case || 'normal'} onChange={v => set({case: v})}
              options={[
                {value:'normal', label:'Aa'},
                {value:'upper', label:'AA'},
                {value:'lower', label:'aa'},
              ]}/>
          </div>
          <div className="field">
            <div className="field-label"><span>Цвет текста</span><code style={{fontSize:10.5,color:'var(--text-3)',fontFamily:'JetBrains Mono, monospace'}}>{cur.color}</code></div>
            <ColorChips value={cur.color} onChange={v => set({color: v})} palette={TEXT_COLOR_PALETTE}/>
          </div>
        </div>
      )}
    </div>
  );
}

function TabTypography({ presetId, overrides, setOverrides, layoutOverride, setLayoutOverride }) {
  const preset = PRESETS[presetId];
  return (
    <>
      <div className="sec">
        <div className="sec-hd">
          <h3>Расположение блока</h3>
          <span className="sec-act" onClick={() => setLayoutOverride({})}>Сбросить</span>
        </div>
        <div className="field">
          <div className="field-label"><span>По вертикали</span></div>
          <Seg value={layoutOverride.position || preset.layout.position}
            onChange={v => setLayoutOverride({...layoutOverride, position: v})}
            options={[
              {value:'top', icon:<Icon name="pos-t"/>, title:'Сверху'},
              {value:'center', icon:<Icon name="pos-c"/>, title:'По центру'},
              {value:'bottom', icon:<Icon name="pos-b"/>, title:'Снизу'},
            ]}/>
        </div>
        <div className="field">
          <div className="field-label"><span>Выравнивание текста</span></div>
          <Seg value={layoutOverride.align || preset.layout.align}
            onChange={v => setLayoutOverride({...layoutOverride, align: v})}
            options={[
              {value:'left', icon:<Icon name="align-l"/>, title:'По левому краю'},
              {value:'center', icon:<Icon name="align-c"/>, title:'По центру'},
              {value:'right', icon:<Icon name="align-r"/>, title:'По правому краю'},
            ]}/>
        </div>
      </div>
      <div className="sec">
        <div className="sec-hd">
          <h3>Настройки полей</h3>
          <span className="sec-act" onClick={() => setOverrides({})}>Сбросить</span>
        </div>
        {FIELD_KEYS.map(f => (
          <FieldCard key={f.key} k={f.key} label={f.label} desc={f.desc} short={f.short}
            preset={preset[f.key]}
            override={overrides[f.key]}
            setOverride={(v) => setOverrides({ ...overrides, [f.key]: v })}/>
        ))}
      </div>
    </>
  );
}

/* ============================================================
   Tab: Background
   ============================================================ */
const BG_MODES = [
  { id:'solid',    label:'Заливка',  icon:'palette' },
  { id:'gradient', label:'Градиент', icon:'gradient' },
  { id:'blocks',   label:'Блоки',    icon:'blocks' },
  { id:'photo',    label:'Фото',     icon:'image' },
  { id:'search',   label:'Сток',     icon:'search' },
  { id:'pattern',  label:'Паттерн',  icon:'pattern' },
];

const PATTERNS = ['dots','grid','lines'];

function TabBackground({ bg, setBg, presetId }) {
  const preset = PRESETS[presetId];
  const eff = bg || preset.bg;
  const mode = (bg && bg.mode === 'search') ? 'search' : (eff.mode || 'solid');

  const switchTo = (newMode) => {
    if (newMode === 'solid')    setBg({ mode:'solid', color: eff.color || '#F2EBDC' });
    if (newMode === 'gradient') setBg({ mode:'gradient', a: eff.a || '#FFB1A5', b: eff.b || '#9D9AFF', angle: 135 });
    if (newMode === 'photo')    setBg({ mode:'photo', seed: 'beauticard-1' });
    if (newMode === 'search')   setBg({ mode:'search', query:'', seed:'beauticard-1' });
    if (newMode === 'pattern')  setBg({ mode:'pattern', bg:'#F8F7F3', fg:'#161616', pattern:'dots', scale: 14 });
    if (newMode === 'blocks')   setBg({ mode:'blocks', bg:'#F2EBDC', shapes:[
      { x:60, y:5,  w:35, h:35, color:'#5552E0', r:'circle' },
      { x:8,  y:55, w:30, h:30, color:'#F2C84B', r:6, rot:-12 },
      { x:55, y:60, w:38, h:24, color:'#E2231A', r:0 },
    ]});
  };

  return (
    <>
      <div className="sec">
        <div className="sec-hd"><h3>Тип фона</h3>{bg && <span className="sec-act" onClick={() => setBg(null)}>К пресету</span>}</div>
        <div className="bg-modes">
          {BG_MODES.map(m => (
            <button key={m.id} className="bg-mode" aria-pressed={mode === m.id}
              onClick={() => switchTo(m.id)}>
              <Icon name={m.icon}/>
              <span>{m.label}</span>
            </button>
          ))}
        </div>

        {mode === 'solid' && (
          <div className="field">
            <div className="field-label"><span>Цвет</span><code style={{fontSize:10.5,color:'var(--text-3)',fontFamily:'JetBrains Mono, monospace'}}>{eff.color}</code></div>
            <ColorChips value={eff.color} onChange={c => setBg({mode:'solid', color: c})}/>
          </div>
        )}

        {mode === 'gradient' && (
          <>
            <div className="field">
              <div className="field-label"><span>Стартовый цвет</span></div>
              <div className="color-row">
                <div className="swatch" style={{background:eff.a}}/>
                <code>{eff.a}</code>
              </div>
              <div style={{height:6}}/>
              <ColorChips value={eff.a} onChange={c => setBg({...eff, a:c})}/>
            </div>
            <div className="field">
              <div className="field-label"><span>Конечный цвет</span></div>
              <div className="color-row">
                <div className="swatch" style={{background:eff.b}}/>
                <code>{eff.b}</code>
              </div>
              <div style={{height:6}}/>
              <ColorChips value={eff.b} onChange={c => setBg({...eff, b:c})}/>
            </div>
            <Slider label="Угол" value={eff.angle||135} onChange={v => setBg({...eff, angle: v})}
              min={0} max={360} step={1} suffix="°" />
          </>
        )}

        {mode === 'photo' && (
          <PhotoUpload eff={eff} setBg={setBg}/>
        )}

        {mode === 'search' && (
          <UnsplashSearch eff={eff} setBg={setBg}/>
        )}

        {mode === 'pattern' && (
          <>
            <div className="field">
              <div className="field-label"><span>Узор</span></div>
              <div className="pattern-grid">
                {PATTERNS.map(p => (
                  <button key={p} className="pattern-card" aria-pressed={eff.pattern === p}
                    onClick={() => setBg({...eff, pattern: p})}
                    style={{
                      background:
                        p === 'dots' ? `${eff.bg} radial-gradient(circle at 1px 1px, ${eff.fg} 1px, transparent 0) 0 0/8px 8px` :
                        p === 'grid' ? `${eff.bg} linear-gradient(${eff.fg} 1px, transparent 1px) 0 0/8px 8px, linear-gradient(90deg, ${eff.fg} 1px, transparent 1px) 0 0/8px 8px` :
                        `${eff.bg} repeating-linear-gradient(45deg, ${eff.fg} 0 1px, transparent 1px 6px)`
                    }}/>
                ))}
              </div>
            </div>
            <Slider label="Масштаб" value={eff.scale||14} onChange={v => setBg({...eff, scale:v})}
              min={4} max={40} step={1} suffix="px"/>
            <div className="field">
              <div className="field-label"><span>Цвет фона</span></div>
              <ColorChips value={eff.bg} onChange={c => setBg({...eff, bg: c})}/>
            </div>
            <div className="field">
              <div className="field-label"><span>Цвет узора</span></div>
              <ColorChips value={eff.fg} onChange={c => setBg({...eff, fg: c})} palette={TEXT_COLOR_PALETTE}/>
            </div>
          </>
        )}

        {mode === 'blocks' && (
          <BlocksEditor eff={eff} setBg={setBg}/>
        )}
      </div>
    </>
  );
}

/* ============================================================
   Tab: Templates
   ============================================================ */
const SAVED_TEMPLATES = [
  { id:'t1', name:'Дизайн-вестник', date:'вчера',
    presetId:'magazine', content:{kicker:'ВЫПУСК №24', title:'Тихая революция в дизайне', subtitle:'Как маленькие студии меняют рынок'} },
  { id:'t2', name:'Серия эссе', date:'2 дня',
    presetId:'book', content:{kicker:'ESSAYS', title:'О тишине', subtitle:'Заметки на полях недели'} },
  { id:'t3', name:'Tech Weekly', date:'3 дня',
    presetId:'tech', content:{kicker:'release · 04.06', title:'Линейный\nи быстрый', subtitle:'Новый редактор уже доступен в beta'} },
  { id:'t4', name:'Lookbook', date:'неделю',
    presetId:'gradient', content:{kicker:'LOOKBOOK', title:'Мягкий май', subtitle:'Палитра, которая возвращает дыхание'} },
  { id:'t5', name:'Editorial', date:'2 нед.',
    presetId:'editorial', content:{kicker:'ESSAY', title:'Anatomy of\na Quiet Year', subtitle:'на полях 2026 года'} },
  { id:'t6', name:'Punch!', date:'месяц',
    presetId:'brutalist', content:{kicker:'NEW DROP', title:'BIG NEWS', subtitle:'и громче не будет'} },
];

function TabTemplates({ apply, content, presetId }) {
  return (
    <>
      <div className="sec">
        <div className="sec-hd">
          <h3>Сохранённые шаблоны</h3>
          <span className="sec-act">+ Сохранить текущий</span>
        </div>
        <div className="tmpl-grid">
          {SAVED_TEMPLATES.map(t => (
            <div key={t.id} className="tmpl-card" onClick={() => apply(t)}>
              <div className="tmpl-thumb">
                <CoverPreview presetId={t.presetId} content={t.content} aspect="1:1" hideDeco/>
              </div>
              <div className="tmpl-meta">
                <span className="name">{t.name}</span>
                <span className="date">{t.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* ============================================================
   Blocks constructor — add / select / drag / recolor / delete
   ============================================================ */
const BLOCK_PALETTE = [
  '#5552E0','#F2C84B','#E2231A','#16A34A','#161616','#FFFFFF',
  '#FFB1A5','#9D9AFF','#1F3D2E','#C9B66E','#3B5BDB','#8B89F7',
];

function BlocksEditor({ eff, setBg }) {
  const shapes = eff.shapes || [];
  const [sel, setSel] = useState(0);
  const stageRef = useRef(null);
  // refs so the once-attached drag listener always reads the latest data
  const dragRef = useRef(null);
  const shapesRef = useRef(shapes);
  const effRef = useRef(eff);
  const setBgRef = useRef(setBg);
  shapesRef.current = shapes;
  effRef.current = eff;
  setBgRef.current = setBg;

  const setShapes = (next) => setBg({ ...eff, shapes: next });
  const updateShape = (i, patch) => {
    const next = shapes.slice();
    next[i] = { ...next[i], ...patch };
    setShapes(next);
  };
  const addShape = (kind) => {
    const base = kind === 'circle'
      ? { x:35, y:30, w:30, h:30, color:'#5552E0', r:'circle' }
      : { x:25, y:35, w:50, h:30, color:'#F2C84B', r:6 };
    const next = shapes.concat([base]);
    setShapes(next);
    setSel(next.length - 1);
  };
  const removeShape = (i) => {
    const next = shapes.slice(); next.splice(i, 1);
    setShapes(next);
    setSel(Math.max(0, i - 1));
  };

  const onDown = (i) => (e) => {
    e.stopPropagation();
    setSel(i);
    const rect = stageRef.current.getBoundingClientRect();
    const s = shapes[i];
    const sxPx = (s.x / 100) * rect.width;
    const syPx = (s.y / 100) * rect.height;
    dragRef.current = { i, dx: e.clientX - sxPx, dy: e.clientY - syPx };
  };

  useEffect(() => {
    const onMove = (e) => {
      const d = dragRef.current;
      if (!d) return;
      const rect = stageRef.current.getBoundingClientRect();
      const s = shapesRef.current[d.i];
      if (!s) return;
      let x = ((e.clientX - d.dx) / rect.width) * 100;
      let y = ((e.clientY - d.dy) / rect.height) * 100;
      x = Math.max(0, Math.min(100 - s.w, x));
      y = Math.max(0, Math.min(100 - s.h, y));
      const next = shapesRef.current.slice();
      next[d.i] = { ...s, x, y };
      setBgRef.current({ ...effRef.current, shapes: next });
    };
    const onUp = () => { dragRef.current = null; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, []);

  const cur = shapes[sel];

  return (
    <>
      <div className="field">
        <div className="field-label">
          <span>Конструктор фигур</span>
          <span className="val">{shapes.length} шт.</span>
        </div>
        <div className="blocks-mini" ref={stageRef} style={{background: eff.bg}}>
          {shapes.map((s, i) => (
            <div key={i}
              className={'lay' + (i === sel ? ' sel' : '')}
              onMouseDown={onDown(i)}
              style={{
                left:`${s.x}%`, top:`${s.y}%`, width:`${s.w}%`, height:`${s.h}%`,
                background:s.color, borderRadius: s.r === 'circle' ? '50%' : (s.r||0)+'px',
                transform: s.rot ? `rotate(${s.rot}deg)` : 'none',
                userSelect:'none',
              }}/>
          ))}
        </div>
        <div className="blocks-pal">
          <button onClick={() => addShape('circle')}><Icon name="plus" sm/> Круг</button>
          <button onClick={() => addShape('rect')}><Icon name="plus" sm/> Прямоугольник</button>
          <button onClick={() => cur && removeShape(sel)}
            disabled={!cur} style={{marginLeft:'auto', opacity: cur ? 1 : 0.4}}>
            Удалить
          </button>
        </div>
      </div>

      {cur && (
        <>
          <div className="field">
            <div className="field-label"><span>Цвет фигуры</span></div>
            <ColorChips value={cur.color} onChange={c => updateShape(sel, {color: c})}/>
          </div>
          <Slider label="Ширина" value={cur.w} onChange={v => updateShape(sel, {w: v})}
            min={5} max={100} step={1} suffix="%"/>
          <Slider label="Высота" value={cur.h} onChange={v => updateShape(sel, {h: v})}
            min={5} max={100} step={1} suffix="%"/>
          <Slider label="Поворот" value={cur.rot||0} onChange={v => updateShape(sel, {rot: v})}
            min={-180} max={180} step={1} suffix="°"/>
          {cur.r !== 'circle' && (
            <Slider label="Скругление" value={cur.r||0} onChange={v => updateShape(sel, {r: v})}
              min={0} max={50} step={1} suffix="px"/>
          )}
        </>
      )}

      <div className="field">
        <div className="field-label"><span>Цвет фона</span></div>
        <ColorChips value={eff.bg} onChange={c => setBg({...eff, bg: c})}/>
      </div>
    </>
  );
}

/* ============================================================
   Photo upload (file or drag-drop, plus the picsum seed swatches)
   ============================================================ */
function PhotoUpload({ eff, setBg }) {
  const inputRef = React.useRef(null);

  const onFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => setBg({ mode:'photo', url: reader.result });
    reader.readAsDataURL(file);
  };

  return (
    <>
      <div className="dropzone"
        onDragOver={e => e.preventDefault()}
        onDrop={e => { e.preventDefault(); onFile(e.dataTransfer.files?.[0]); }}>
        <div><b>Перетащите фото</b> или</div>
        <button className="btn outline" style={{marginTop:8}} onClick={() => inputRef.current?.click()}>
          <Icon name="upload"/> Выбрать файл
        </button>
        <input ref={inputRef} type="file" accept="image/*" style={{display:'none'}}
          onChange={e => onFile(e.target.files?.[0])}/>
        <div className="hint">JPG / PNG / WebP, до 10 МБ</div>
      </div>
      <div style={{height:10}}/>
      <div className="row-3">
        {['beauticard-1','beauticard-2','beauticard-3'].map(seed => (
          <button key={seed} className="preset-card"
            aria-pressed={eff.seed === seed && !eff.url}
            onClick={() => setBg({mode:'photo', seed})}
            style={{padding:0}}>
            <div style={{
              aspectRatio:'1', backgroundImage:`url(https://picsum.photos/seed/${seed}/240/240)`,
              backgroundSize:'cover', backgroundPosition:'center', borderRadius:7
            }}/>
          </button>
        ))}
      </div>
      <div style={{fontSize:11, color:'var(--text-3)', marginTop:8}}>
        Примеры с picsum.photos. Загруженный файл показывается в превью сразу.
      </div>
    </>
  );
}

/* ============================================================
   Unsplash search (real API; user supplies their own Access Key)
   ============================================================ */
function UnsplashSearch({ eff, setBg }) {
  const [key, setKey] = useState(localStorage.getItem('unsplash_key') || '');
  const [showKeyForm, setShowKeyForm] = useState(!key);
  const [query, setQuery] = useState(eff.query || '');
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState('');

  const saveKey = () => {
    const k = key.trim();
    if (!k) return;
    localStorage.setItem('unsplash_key', k);
    setShowKeyForm(false);
    setStatus('Ключ сохранён. Введите запрос.');
  };

  const search = async (q) => {
    const finalQ = (q ?? query).trim();
    const k = localStorage.getItem('unsplash_key');
    if (!k) { setShowKeyForm(true); return; }
    if (!finalQ) return;
    setQuery(finalQ);
    setStatus('Ищу…');
    setResults([]);
    try {
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(finalQ)}&per_page=18&content_filter=high`,
        { headers: { Authorization: `Client-ID ${k}` } }
      );
      if (!res.ok) {
        setStatus(res.status === 401 ? 'Неверный Access Key — обновите.' : `Ошибка ${res.status}`);
        return;
      }
      const data = await res.json();
      if (!data.results || data.results.length === 0) {
        setStatus('Ничего не найдено.');
        return;
      }
      setResults(data.results);
      setStatus(`Найдено: ${data.total}. Клик — выбрать.`);
    } catch (e) {
      setStatus('Сетевая ошибка.');
    }
  };

  const pick = async (photo) => {
    setStatus('Загружаю фото…');
    const utm = '?utm_source=beauticard&utm_medium=referral';
    const attribution = `Photo by ${photo.user.name} on Unsplash`;
    try {
      const r = await fetch(photo.urls.regular, { mode: 'cors' });
      const b = await r.blob();
      const dataUrl = await new Promise((resolve, reject) => {
        const fr = new FileReader();
        fr.onload = () => resolve(fr.result);
        fr.onerror = () => reject(fr.error);
        fr.readAsDataURL(b);
      });
      setBg({ mode:'photo', url: dataUrl, attribution, authorUrl: photo.user.links.html + utm });
      setStatus('Готово.');
    } catch {
      // Fallback: set the URL directly (download may fail due to CORS)
      setBg({ mode:'photo', url: photo.urls.regular, attribution, authorUrl: photo.user.links.html + utm });
      setStatus('Готово (без оффлайн-копии).');
    }
  };

  if (showKeyForm) {
    return (
      <div className="field">
        <p style={{fontSize:11.5, color:'var(--text-3)', margin:'0 0 8px'}}>
          Нужен бесплатный Access Key с{' '}
          <a href="https://unsplash.com/oauth/applications" target="_blank" rel="noopener"
            style={{color:'var(--accent)'}}>unsplash.com/developers</a>. Ключ хранится в вашем браузере.
        </p>
        <input className="input" placeholder="Unsplash Access Key" value={key}
          onChange={e => setKey(e.target.value)} style={{marginBottom:6}}/>
        <button className="btn primary" style={{width:'100%'}} onClick={saveKey}>Сохранить ключ</button>
      </div>
    );
  }

  return (
    <>
      <div className="search-box">
        <Icon name="search"/>
        <input value={query} onChange={e => setQuery(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') search(); }}
          placeholder="Например: горы, минимализм, кофе"/>
        <button className="btn outline" style={{height:22, fontSize:11, padding:'0 8px'}}
          onClick={() => search()}>Найти</button>
      </div>
      <div style={{display:'flex', gap:6, flexWrap:'wrap', marginTop:8}}>
        {['минимализм','горы','офис','кофе','город','природа'].map(q => (
          <button key={q} className="btn outline" style={{height:24, fontSize:11}}
            onClick={() => search(q)}>{q}</button>
        ))}
      </div>
      <div style={{display:'flex', justifyContent:'space-between', marginTop:10}}>
        <span style={{fontSize:11.5, color:'var(--text-3)'}}>{status}</span>
        <span className="sec-act" onClick={() => { localStorage.removeItem('unsplash_key'); setKey(''); setShowKeyForm(true); }}>
          сменить ключ
        </span>
      </div>
      {results.length > 0 && (
        <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:6, marginTop:8, maxHeight:280, overflowY:'auto'}}>
          {results.map(p => (
            <button key={p.id} className="preset-card" style={{padding:0}}
              onClick={() => pick(p)} title={`Photo by ${p.user.name}`}>
              <div style={{
                aspectRatio:'1', backgroundImage:`url(${p.urls.thumb})`,
                backgroundSize:'cover', backgroundPosition:'center', borderRadius:7
              }}/>
            </button>
          ))}
        </div>
      )}
    </>
  );
}

Object.assign(window, {
  Icon, Slider, Seg, ColorChips,
  TabStyle, TabText, TabTypography, TabBackground, TabTemplates,
});
