/* ============================================================
   PRESETS — cover style definitions
   Each preset defines: bg, layout (position/align), per-field
   typography defaults, and a decoration recipe.
   ============================================================ */

const FONTS = {
  archivo: '"Archivo Black", sans-serif',
  bricolage: '"Bricolage Grotesque", sans-serif',
  manrope: '"Manrope", sans-serif',
  space: '"Space Grotesk", sans-serif',
  instrument: '"Instrument Serif", serif',
  playfair: '"Playfair Display", serif',
  garamond: '"EB Garamond", serif',
  mono: '"JetBrains Mono", ui-monospace, monospace',
};

const FONT_LABEL = {
  archivo: 'Archivo Black',
  bricolage: 'Bricolage Grotesque',
  manrope: 'Manrope',
  space: 'Space Grotesk',
  instrument: 'Instrument Serif',
  playfair: 'Playfair Display',
  garamond: 'EB Garamond',
  mono: 'JetBrains Mono',
};

const PRESETS = {
  magazine: {
    name: 'Журнал',
    desc: 'Display, плашка',
    bg: { mode: 'solid', color: '#F2EBDC' },
    layout: { position: 'bottom', align: 'left' },
    kicker: { font: 'archivo', size: 3.4, weight: 900, color: '#161616', case: 'upper', tracking: 0.18, lh: 1, plate: '#F2C84B', padded: true },
    title:  { font: 'bricolage', size: 15, weight: 800, color: '#161616', case: 'normal', tracking: -0.025, lh: 0.92 },
    subtitle:{ font: 'manrope', size: 3.4, weight: 500, color: '#3C3A33', case: 'normal', tracking: 0, lh: 1.3 },
    deco: 'magazine',
  },
  book: {
    name: 'Книга',
    desc: 'Классика, серифы',
    bg: { mode: 'solid', color: '#1F3D2E' },
    layout: { position: 'center', align: 'center' },
    kicker: { font: 'garamond', size: 2.6, weight: 500, color: '#C9B66E', case: 'upper', tracking: 0.4, lh: 1, italic: true },
    title:  { font: 'instrument', size: 16, weight: 400, color: '#F4ECDD', case: 'normal', tracking: 0, lh: 1.0 },
    subtitle:{ font: 'garamond', size: 3, weight: 400, color: '#C9B66E', case: 'normal', tracking: 0.02, lh: 1.4, italic: true },
    deco: 'book',
  },
  modern: {
    name: 'Модерн',
    desc: 'Минимал, воздух',
    bg: { mode: 'solid', color: '#F8F7F3' },
    layout: { position: 'center', align: 'left' },
    kicker: { font: 'manrope', size: 2.4, weight: 600, color: '#888680', case: 'upper', tracking: 0.32, lh: 1 },
    title:  { font: 'manrope', size: 10, weight: 200, color: '#1A1A1A', case: 'normal', tracking: -0.04, lh: 1.0 },
    subtitle:{ font: 'manrope', size: 3, weight: 400, color: '#6E6C66', case: 'normal', tracking: 0, lh: 1.4 },
    deco: 'modern',
  },
  brutalist: {
    name: 'Brutalist',
    desc: 'Контраст, гротеск',
    bg: { mode: 'solid', color: '#F2DC1B' },
    layout: { position: 'bottom', align: 'left' },
    kicker: { font: 'mono', size: 2.6, weight: 500, color: '#0A0A0A', case: 'upper', tracking: 0.04, lh: 1 },
    title:  { font: 'archivo', size: 17, weight: 900, color: '#0A0A0A', case: 'upper', tracking: -0.03, lh: 0.86 },
    subtitle:{ font: 'mono', size: 2.6, weight: 500, color: '#0A0A0A', case: 'normal', tracking: 0, lh: 1.4 },
    deco: 'brutalist',
  },
  editorial: {
    name: 'Editorial',
    desc: 'Серифы, контраст',
    bg: { mode: 'solid', color: '#F6F2EA' },
    layout: { position: 'center', align: 'center' },
    kicker: { font: 'manrope', size: 2.2, weight: 700, color: '#9C2B2B', case: 'upper', tracking: 0.35, lh: 1 },
    title:  { font: 'playfair', size: 13, weight: 700, color: '#1A1A1A', case: 'normal', tracking: -0.015, lh: 0.98, italic: true },
    subtitle:{ font: 'garamond', size: 3.2, weight: 400, color: '#4A4742', case: 'normal', tracking: 0.01, lh: 1.4, italic: true },
    deco: 'editorial',
  },
  tech: {
    name: 'Tech',
    desc: 'Линейный, сетка',
    bg: { mode: 'solid', color: '#0B0B0E' },
    layout: { position: 'bottom', align: 'left' },
    kicker: { font: 'mono', size: 2.4, weight: 500, color: '#8B89F7', case: 'normal', tracking: 0.03, lh: 1 },
    title:  { font: 'space', size: 12, weight: 600, color: '#F4F4F6', case: 'normal', tracking: -0.025, lh: 0.98 },
    subtitle:{ font: 'manrope', size: 2.8, weight: 400, color: '#85858E', case: 'normal', tracking: 0, lh: 1.45 },
    deco: 'tech',
  },
  photo: {
    name: 'Photo',
    desc: 'Фото на весь фон',
    bg: { mode: 'photo', seed: 'beauticard-1' },
    layout: { position: 'bottom', align: 'left' },
    kicker: { font: 'manrope', size: 2.4, weight: 600, color: '#FFFFFF', case: 'upper', tracking: 0.3, lh: 1, opacity: 0.85 },
    title:  { font: 'space', size: 11, weight: 700, color: '#FFFFFF', case: 'normal', tracking: -0.02, lh: 1.0 },
    subtitle:{ font: 'manrope', size: 2.9, weight: 500, color: '#FFFFFF', case: 'normal', tracking: 0, lh: 1.4, opacity: 0.85 },
    deco: 'photo',
  },
  gradient: {
    name: 'Gradient',
    desc: 'Мягкий градиент',
    bg: { mode: 'mesh', a: '#FFB1A5', b: '#9D9AFF', c: '#FFE7A6' },
    layout: { position: 'center', align: 'center' },
    kicker: { font: 'manrope', size: 2.4, weight: 600, color: '#FFFFFF', case: 'upper', tracking: 0.32, lh: 1, opacity: 0.9 },
    title:  { font: 'space', size: 13, weight: 700, color: '#FFFFFF', case: 'normal', tracking: -0.025, lh: 1.0 },
    subtitle:{ font: 'manrope', size: 3, weight: 500, color: '#FFFFFF', case: 'normal', tracking: 0, lh: 1.4, opacity: 0.85 },
    deco: 'gradient',
  },
};

const PRESET_ORDER = ['magazine','book','modern','brutalist','editorial','tech','photo','gradient'];

const ASPECTS = {
  '3:4':  { w: 3, h: 4, label: '3:4',  hint: 'Журнал' },
  '1:1':  { w: 1, h: 1, label: '1:1',  hint: 'Соцсети' },
  '16:9': { w: 16, h: 9, label: '16:9', hint: 'Блог' },
  '9:16': { w: 9, h: 16, label: '9:16', hint: 'Stories' },
};

const POSITIONS = ['top','center','bottom'];
const ALIGNS = ['left','center','right'];

/* ============================================================
   Backgrounds
   ============================================================ */

function BackgroundLayer({ bg, presetDeco }) {
  if (!bg) return null;
  if (bg.mode === 'solid') {
    return <div style={{position:'absolute', inset:0, background: bg.color}} />;
  }
  if (bg.mode === 'gradient') {
    return <div style={{position:'absolute', inset:0,
      background: `linear-gradient(${bg.angle||135}deg, ${bg.a} 0%, ${bg.b} 100%)`
    }} />;
  }
  if (bg.mode === 'mesh') {
    return <div style={{position:'absolute', inset:0,
      background: `
        radial-gradient(at 20% 25%, ${bg.a} 0px, transparent 55%),
        radial-gradient(at 80% 15%, ${bg.c||bg.a} 0px, transparent 50%),
        radial-gradient(at 70% 85%, ${bg.b} 0px, transparent 60%),
        radial-gradient(at 15% 90%, ${bg.b} 0px, transparent 55%),
        linear-gradient(135deg, ${bg.a}, ${bg.b})`,
    }} />;
  }
  if (bg.mode === 'photo') {
    const url = bg.url || `https://picsum.photos/seed/${encodeURIComponent(bg.seed || 'cover')}/900/1200`;
    return (
      <>
        <div style={{position:'absolute', inset:0,
          backgroundImage:`url(${url})`,
          backgroundSize:'cover', backgroundPosition:'center',
        }} />
        {presetDeco !== false && (
          <div style={{position:'absolute', inset:0,
            background:'linear-gradient(180deg, rgba(0,0,0,.05) 0%, rgba(0,0,0,.0) 35%, rgba(0,0,0,.55) 100%)',
          }} />
        )}
      </>
    );
  }
  if (bg.mode === 'pattern') {
    const patterns = {
      dots: `radial-gradient(circle at 1px 1px, ${bg.fg} 1px, transparent 0) 0 0/${bg.scale||16}px ${bg.scale||16}px`,
      grid: `linear-gradient(${bg.fg} 1px, transparent 1px) 0 0/${bg.scale||24}px ${bg.scale||24}px, linear-gradient(90deg, ${bg.fg} 1px, transparent 1px) 0 0/${bg.scale||24}px ${bg.scale||24}px`,
      lines: `repeating-linear-gradient(45deg, ${bg.fg} 0 1px, transparent 1px ${bg.scale||10}px)`,
    };
    return (
      <div style={{position:'absolute', inset:0, background: bg.bg}}>
        <div style={{position:'absolute', inset:0, background: patterns[bg.pattern||'dots']}} />
      </div>
    );
  }
  if (bg.mode === 'blocks') {
    return (
      <div style={{position:'absolute', inset:0, background: bg.bg || '#F2EBDC'}}>
        {(bg.shapes||[]).map((s, i) => (
          <div key={i} style={{
            position:'absolute', left: `${s.x}%`, top:`${s.y}%`,
            width:`${s.w}%`, height:`${s.h}%`,
            background: s.color, borderRadius: s.r === 'circle' ? '50%' : (s.r||0)+'px',
            transform: s.rot ? `rotate(${s.rot}deg)` : 'none',
          }} />
        ))}
      </div>
    );
  }
  return null;
}

/* ============================================================
   Decorations per preset
   ============================================================ */

function Decoration({ presetId, deco = {}, mute }) {
  if (mute) return null;
  const d = {
    brand: deco.brand ?? 'BEAUTICARD',
    issue: deco.issue ?? '№ 24',
    date: deco.date ?? 'МАЙ · 2026',
    badge: deco.badge ?? 'НОВОЕ',
    tagline: deco.tagline ?? 'ДИЗАЙН · КУЛЬТУРА · ТЕХНО',
    readTime: deco.readTime ?? 'ЧТЕНИЕ · 8 МИН',
  };
  if (presetId === 'magazine') {
    return (
      <>
        <div style={{position:'absolute', top:'5cqi', left:'5cqi', display:'flex', gap:'1.5cqi',
          fontFamily: FONTS.mono, fontSize:'1.8cqi', color:'#161616', letterSpacing:'.05em'}}>
          {d.issue && <span style={{padding:'.6cqi 1.4cqi', background:'#161616', color:'#F2EBDC', fontWeight:600, borderRadius:'2px'}}>{d.issue}</span>}
          {d.date && <span style={{padding:'.6cqi 0', fontWeight:500}}>{d.date}</span>}
        </div>
        {d.tagline && <div style={{position:'absolute', right:'5cqi', top:'5cqi',
          fontFamily: FONTS.mono, fontSize:'1.6cqi', color:'#161616', writingMode:'vertical-rl',
          letterSpacing:'.18em', fontWeight:500}}>
          {d.tagline}
        </div>}
        <div style={{position:'absolute', left:'5cqi', right:'5cqi', bottom:'4.5cqi', height:'1px', background:'#161616', opacity:.2}} />
      </>
    );
  }
  if (presetId === 'book') {
    return (
      <>
        <div style={{position:'absolute', inset:'4cqi', border:'1px solid rgba(244,236,221,.25)', borderRadius:'1px', pointerEvents:'none'}} />
        <div style={{position:'absolute', top:'5cqi', left:0, right:0, textAlign:'center',
          fontFamily: FONTS.garamond, fontSize:'1.8cqi', color:'#C9B66E', letterSpacing:'.5em', fontWeight:500}}>
          ✦   ✦   ✦
        </div>
        {d.date && <div style={{position:'absolute', bottom:'5cqi', left:0, right:0, textAlign:'center',
          fontFamily: FONTS.garamond, fontSize:'1.8cqi', color:'#C9B66E', letterSpacing:'.4em', fontWeight:500}}>
          {d.date}
        </div>}
      </>
    );
  }
  if (presetId === 'modern') {
    return (
      <>
        <div style={{position:'absolute', top:'5cqi', left:'5cqi', right:'5cqi', display:'flex', justifyContent:'space-between',
          fontFamily: FONTS.manrope, fontSize:'1.8cqi', color:'#8A8780', fontWeight:600, letterSpacing:'.04em'}}>
          <span>{d.brand}</span><span>{d.issue}</span>
        </div>
        <div style={{position:'absolute', bottom:'5cqi', left:'5cqi', right:'5cqi', display:'flex', justifyContent:'space-between',
          fontFamily: FONTS.manrope, fontSize:'1.6cqi', color:'#9C9A93', fontWeight:500}}>
          <span>{d.tagline}</span><span>{d.date}</span>
        </div>
      </>
    );
  }
  if (presetId === 'brutalist') {
    return (
      <>
        <div style={{position:'absolute', top:0, left:0, right:0, height:'6cqi', background:'#0A0A0A'}} />
        <div style={{position:'absolute', top:'1.4cqi', left:'4cqi', right:'4cqi', display:'flex', justifyContent:'space-between',
          color:'#F2DC1B', fontFamily:FONTS.mono, fontSize:'1.8cqi', fontWeight:600, letterSpacing:'.06em'}}>
          <span>★ {d.issue} ★</span><span>{d.date}</span>
        </div>
        {d.badge && <>
          <div style={{position:'absolute', right:'4cqi', top:'10cqi', width:'14cqi', height:'14cqi',
            background:'#E2231A', borderRadius:'50%'}} />
          <div style={{position:'absolute', right:'5cqi', top:'14cqi', width:'12cqi', textAlign:'center',
            color:'#F2DC1B', fontFamily:FONTS.archivo, fontSize:'2.4cqi', lineHeight:'1', letterSpacing:'-.02em'}}>
            {d.badge}
          </div>
        </>}
      </>
    );
  }
  if (presetId === 'editorial') {
    return (
      <>
        {d.brand && <div style={{position:'absolute', top:'5cqi', left:0, right:0, textAlign:'center',
          fontFamily: FONTS.manrope, fontSize:'1.8cqi', color:'#1A1A1A', letterSpacing:'.4em', fontWeight:600}}>
          {d.brand}
        </div>}
        <div style={{position:'absolute', top:'9cqi', left:'30%', right:'30%', height:'1px', background:'#1A1A1A', opacity:.4}} />
        {d.tagline && <div style={{position:'absolute', bottom:'5cqi', left:0, right:0, textAlign:'center',
          fontFamily: FONTS.garamond, fontSize:'1.8cqi', color:'#7A7670', fontStyle:'italic'}}>
          {d.tagline}
        </div>}
      </>
    );
  }
  if (presetId === 'tech') {
    return (
      <>
        <div style={{position:'absolute', inset:0,
          background:`linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px) 0 0/100% 4cqi,
                      linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px) 0 0/4cqi 100%`,
          opacity:.6}} />
        <div style={{position:'absolute', top:'5cqi', left:'5cqi', right:'5cqi', display:'flex', justifyContent:'space-between', alignItems:'center',
          fontFamily: FONTS.mono, fontSize:'1.8cqi', color:'#85858E', fontWeight:500}}>
          <span style={{color:'#8B89F7'}}>● {d.brand}</span>
          <span>{d.date}</span>
        </div>
        <div style={{position:'absolute', bottom:'5cqi', left:'5cqi', right:'5cqi', display:'flex', justifyContent:'space-between',
          fontFamily: FONTS.mono, fontSize:'1.6cqi', color:'#5A5A63'}}>
          <span>{d.issue} →</span><span>{d.readTime}</span>
        </div>
      </>
    );
  }
  if (presetId === 'photo') {
    return (
      <div style={{position:'absolute', top:'5cqi', left:'5cqi', right:'5cqi', display:'flex', justifyContent:'space-between',
        fontFamily: FONTS.manrope, fontSize:'1.8cqi', color:'#fff', opacity:.8, fontWeight:600, letterSpacing:'.18em'}}>
        <span>{d.brand}</span><span>{d.issue}</span>
      </div>
    );
  }
  if (presetId === 'gradient') {
    return (
      <div style={{position:'absolute', top:'5cqi', left:0, right:0, textAlign:'center',
        fontFamily: FONTS.manrope, fontSize:'1.8cqi', color:'#fff', opacity:.85, fontWeight:600, letterSpacing:'.3em'}}>
        ◇   {d.brand}   ◇
      </div>
    );
  }
  return null;
}

/* ============================================================
   CoverPreview — renders the actual cover
   ============================================================ */

function fieldStyle(field) {
  if (!field) return {};
  return {
    fontFamily: FONTS[field.font] || FONTS.manrope,
    fontSize: `${field.size}cqi`,
    fontWeight: field.weight,
    color: field.color,
    textTransform: field.case === 'upper' ? 'uppercase' : field.case === 'lower' ? 'lowercase' : 'none',
    letterSpacing: `${field.tracking||0}em`,
    lineHeight: field.lh,
    fontStyle: field.italic ? 'italic' : 'normal',
    opacity: field.opacity != null ? field.opacity : 1,
    textAlign: field.align,
    margin: 0,
  };
}

function CoverPreview({ presetId, content, deco, overrides, bgOverride, layoutOverride, hideDeco, aspect }) {
  const preset = PRESETS[presetId];
  const bg = bgOverride || preset.bg;
  const layout = { ...preset.layout, ...(layoutOverride||{}) };

  // Merge each field's preset defaults with overrides + global align
  const mk = (key) => ({ ...preset[key], align: layout.align, ...(overrides?.[key]||{}) });
  const k = mk('kicker'), t = mk('title'), s = mk('subtitle');

  const justify = layout.position === 'top' ? 'flex-start' : layout.position === 'center' ? 'center' : 'flex-end';
  const items   = layout.align === 'left' ? 'flex-start' : layout.align === 'center' ? 'center' : 'flex-end';
  const pad = '7cqi';

  const kickerEl = content.kicker && (
    k.plate ? (
      <span style={{
        display:'inline-block',
        background: k.plate,
        padding:'.8cqi 1.6cqi',
        ...fieldStyle(k),
        textAlign: 'left',
      }}>{content.kicker}</span>
    ) : (
      <div style={fieldStyle(k)}>{content.kicker}</div>
    )
  );

  return (
    <div className="cover" style={{ aspectRatio: ASPECTS[aspect].w + '/' + ASPECTS[aspect].h, width:'100%', height:'100%' }}>
      <BackgroundLayer bg={bg} presetDeco={!hideDeco && bg.mode === 'photo'} />
      <Decoration presetId={presetId} deco={deco} mute={hideDeco} />
      <div style={{
        position:'absolute', inset:0,
        padding: pad,
        display:'flex', flexDirection:'column',
        justifyContent: justify,
        alignItems: items,
        gap:'2cqi',
        zIndex: 2,
      }}>
        {/* spacer for top deco when content is at top */}
        {layout.position === 'top' && <div style={{height: presetId==='brutalist' ? '6cqi' : '4cqi'}} />}
        <div style={{display:'flex', flexDirection:'column', gap: '2.4cqi', alignItems: items, maxWidth:'92%'}}>
          {kickerEl}
          {content.title && <h1 style={{ ...fieldStyle(t), maxWidth:'100%' }}>{content.title}</h1>}
          {content.subtitle && <div style={{ ...fieldStyle(s), maxWidth: presetId==='editorial'?'70%':'90%' }}>{content.subtitle}</div>}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  PRESETS, PRESET_ORDER, ASPECTS, POSITIONS, ALIGNS, FONTS, FONT_LABEL,
  CoverPreview,
});
