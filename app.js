'use strict';

// ---------- Constants ----------

const FONTS = [
  'Inter',
  'Manrope',
  'Montserrat',
  'Roboto',
  'Rubik',
  'Oswald',
  'Playfair Display',
  'Lora',
  'PT Serif',
  'Bebas Neue',
  'Russo One',
  'Yeseva One',
  'Caveat',
];

const GRADIENT_PRESETS = [
  ['#6366f1', '#ec4899'],
  ['#06b6d4', '#3b82f6'],
  ['#f97316', '#ec4899'],
  ['#a855f7', '#ec4899'],
  ['#10b981', '#06b6d4'],
  ['#475569', '#0f172a'],
  ['#fbbf24', '#f97316'],
  ['#0ea5e9', '#22d3ee'],
  ['#7c3aed', '#2563eb'],
  ['#f43f5e', '#fb923c'],
  ['#14b8a6', '#84cc16'],
  ['#1e293b', '#334155'],
];

const SOLID_PRESETS = [
  '#0f172a', '#1e293b', '#4f46e5', '#9333ea',
  '#ec4899', '#ef4444', '#f59e0b', '#22c55e',
  '#0ea5e9', '#06b6d4', '#f8fafc', '#e2e8f0',
];

const ASPECT_RATIOS = {
  '1:1': [1, 1],
  '16:9': [16, 9],
  '9:16': [9, 16],
  '4:5': [4, 5],
  '1.91:1': [1.91, 1],
};

// Templates: clicking one patches the state to match.
const TEMPLATES = [
  {
    name: 'Минимал',
    swatch: 'background: #0f172a; color: #f8fafc;',
    label: 'Минимал',
    patch: {
      bgType: 'solid', solid: '#0f172a',
      font: { family: 'Inter', size: 9, weight: 900, color: '#ffffff', align: 'left',
              lineHeight: 1.1, letterSpacing: -0.03, transform: 'none', italic: false,
              shadow: false, strokeWidth: 0, strokeColor: '#000000' },
      descFont: { size: 38, weight: 400, opacity: 70, gap: 0.9, letterSpacing: 0, italic: false },
      eyebrowFont: { size: 28, opacity: 60, letterSpacing: 0.2 },
      position: 'bottom',
    },
  },
  {
    name: 'Поп',
    swatch: 'background: linear-gradient(135deg,#f97316,#ec4899); color: #fff;',
    label: 'ПОП',
    patch: {
      bgType: 'gradient', gradient: { c1: '#f97316', c2: '#ec4899', c3: null, angle: 135 },
      font: { family: 'Montserrat', size: 13, weight: 900, color: '#ffffff', align: 'center',
              lineHeight: 1.0, letterSpacing: -0.03, transform: 'uppercase', italic: false,
              shadow: false, strokeWidth: 0, strokeColor: '#000000' },
      descFont: { size: 30, weight: 600, opacity: 90, gap: 0.5, letterSpacing: 0.1, italic: false },
      eyebrowFont: { size: 30, opacity: 90, letterSpacing: 0.3 },
      position: 'center',
    },
  },
  {
    name: 'Журнал',
    swatch: 'background: #fef3c7; color: #0f172a;',
    label: 'Журнал',
    patch: {
      bgType: 'solid', solid: '#fef3c7',
      font: { family: 'Playfair Display', size: 11, weight: 900, color: '#0f172a', align: 'center',
              lineHeight: 1.1, letterSpacing: -0.02, transform: 'none', italic: false,
              shadow: false, strokeWidth: 0, strokeColor: '#000000' },
      descFont: { size: 36, weight: 400, opacity: 75, gap: 1.2, letterSpacing: 0.05, italic: true },
      eyebrowFont: { size: 26, opacity: 70, letterSpacing: 0.25 },
      position: 'center',
    },
  },
  {
    name: 'Курсив',
    swatch: 'background: linear-gradient(180deg,#1e293b,#0f172a); color: #fef3c7;',
    label: 'Курсив',
    patch: {
      bgType: 'gradient', gradient: { c1: '#1e293b', c2: '#0f172a', c3: null, angle: 180 },
      font: { family: 'Playfair Display', size: 10, weight: 700, color: '#fef3c7', align: 'center',
              lineHeight: 1.2, letterSpacing: 0, transform: 'none', italic: true,
              shadow: false, strokeWidth: 0, strokeColor: '#000000' },
      descFont: { size: 42, weight: 400, opacity: 80, gap: 1.0, letterSpacing: 0.15, italic: false },
      eyebrowFont: { size: 28, opacity: 60, letterSpacing: 0.3 },
      position: 'center',
    },
  },
  {
    name: 'Бренд',
    swatch: 'background: linear-gradient(135deg,#6366f1,#3b82f6); color: #fff;',
    label: 'Бренд',
    patch: {
      bgType: 'gradient', gradient: { c1: '#6366f1', c2: '#3b82f6', c3: null, angle: 135 },
      font: { family: 'Manrope', size: 10, weight: 700, color: '#ffffff', align: 'left',
              lineHeight: 1.1, letterSpacing: -0.02, transform: 'none', italic: false,
              shadow: false, strokeWidth: 0, strokeColor: '#000000' },
      descFont: { size: 40, weight: 500, opacity: 85, gap: 0.6, letterSpacing: 0, italic: false },
      eyebrowFont: { size: 30, opacity: 75, letterSpacing: 0.25 },
      position: 'bottom',
    },
  },
  {
    name: 'Постер',
    swatch: 'background: linear-gradient(135deg,#92400e,#451a03); color: #fef3c7;',
    label: 'Постер',
    patch: {
      bgType: 'gradient', gradient: { c1: '#92400e', c2: '#451a03', c3: null, angle: 135 },
      font: { family: 'Bebas Neue', size: 14, weight: 700, color: '#fef3c7', align: 'center',
              lineHeight: 0.95, letterSpacing: 0.02, transform: 'uppercase', italic: false,
              shadow: false, strokeWidth: 0, strokeColor: '#000000' },
      descFont: { size: 28, weight: 400, opacity: 80, gap: 0.8, letterSpacing: 0.2, italic: false },
      eyebrowFont: { size: 28, opacity: 75, letterSpacing: 0.35 },
      position: 'center',
    },
  },
];

// ---------- State ----------

const state = {
  eyebrow: '',
  text: '',
  description: '',
  font: {
    family: 'Inter',
    size: 8,
    weight: 700,
    color: '#ffffff',
    align: 'center',
    lineHeight: 1.2,
    shadow: false,
    letterSpacing: -0.01,
    transform: 'none',
    italic: false,
    strokeWidth: 0,
    strokeColor: '#000000',
  },
  descFont: {
    size: 45,
    weight: 400,
    opacity: 85,
    gap: 0.6,
    letterSpacing: 0,
    italic: false,
  },
  eyebrowFont: { size: 32, opacity: 80, letterSpacing: 0.15 },
  bgType: 'gradient',
  gradient: { c1: '#6366f1', c2: '#ec4899', c3: null, angle: 135 },
  solid: '#6366f1',
  image: { src: null, blur: 0, overlay: 0.3, overlayColor: '#000000', attribution: null },
  position: 'center',
  aspect: '1:1',
  outputSize: 1080,
};

// ---------- Element refs ----------

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

const els = {
  eyebrowInput: $('#eyebrow-input'),
  textInput: $('#text-input'),
  descInput: $('#desc-input'),
  preview: $('#preview'),
  previewBg: $('#preview-bg'),
  previewBgImg: $('#preview-bg-img'),
  previewOverlay: $('#preview-overlay'),
  previewContent: $('#preview-content'),
  previewText: $('#preview-text'),
  previewEyebrow: $('#preview-eyebrow'),
  previewTitle: $('#preview-title'),
  previewDesc: $('#preview-desc'),
  previewSize: $('#preview-size'),
  previewMeta: $('#preview-meta'),

  templates: $('#templates'),

  bgGroup: $('#bg-type-group'),
  panelGradient: $('#panel-gradient'),
  panelSolid: $('#panel-solid'),
  panelImage: $('#panel-image'),

  gradC1: $('#grad-c1'),
  gradC2: $('#grad-c2'),
  gradC3: $('#grad-c3'),
  gradC3Enabled: $('#grad-c3-enabled'),
  gradAngle: $('#grad-angle'),
  gradAngleVal: $('#grad-angle-val'),
  gradPresets: $('#grad-presets'),

  solidColor: $('#solid-color'),
  solidColorText: $('#solid-color-text'),
  solidPresets: $('#solid-presets'),

  imgFile: $('#img-file'),
  imgUrl: $('#img-url'),
  imgOverlay: $('#img-overlay'),
  imgOverlayVal: $('#img-overlay-val'),
  imgOverlayColor: $('#img-overlay-color'),
  imgBlur: $('#img-blur'),
  imgBlurVal: $('#img-blur-val'),

  unsplashKeyBlock: $('#unsplash-key-block'),
  unsplashKey: $('#unsplash-key'),
  unsplashKeySave: $('#unsplash-key-save'),
  unsplashKeyEdit: $('#unsplash-key-edit'),
  unsplashSearchBlock: $('#unsplash-search-block'),
  unsplashQuery: $('#unsplash-query'),
  unsplashSearch: $('#unsplash-search'),
  unsplashResults: $('#unsplash-results'),
  unsplashStatus: $('#unsplash-status'),
  unsplashAttribution: $('#unsplash-attribution'),

  fontFamily: $('#font-family'),
  fontSize: $('#font-size'),
  fontSizeVal: $('#font-size-val'),
  fontWeightGroup: $('#font-weight-group'),
  fontColor: $('#font-color'),
  fontColorText: $('#font-color-text'),
  fontAlignGroup: $('#font-align-group'),
  fontPosGroup: $('#font-pos-group'),
  lineHeight: $('#line-height'),
  lineHeightVal: $('#line-height-val'),
  textShadow: $('#text-shadow'),
  letterSpacing: $('#letter-spacing'),
  letterSpacingVal: $('#letter-spacing-val'),
  transformGroup: $('#transform-group'),
  textItalic: $('#text-italic'),
  strokeWidth: $('#stroke-width'),
  strokeWidthVal: $('#stroke-width-val'),
  strokeColor: $('#stroke-color'),

  descSize: $('#desc-size'),
  descSizeVal: $('#desc-size-val'),
  descWeightGroup: $('#desc-weight-group'),
  descOpacity: $('#desc-opacity'),
  descOpacityVal: $('#desc-opacity-val'),
  descGap: $('#desc-gap'),
  descGapVal: $('#desc-gap-val'),
  descLetterSpacing: $('#desc-letter-spacing'),
  descLetterSpacingVal: $('#desc-letter-spacing-val'),
  descItalic: $('#desc-italic'),

  aspectGroup: $('#aspect-group'),
  sizeGroup: $('#size-group'),
  downloadPng: $('#download-png'),
  downloadJpg: $('#download-jpg'),
  downloadStatus: $('#download-status'),
};

// ---------- Helpers ----------

function hex2rgba(hex, alpha) {
  const m = hex.replace('#', '').match(/.{1,2}/g);
  if (!m || m.length < 3) return `rgba(0,0,0,${alpha})`;
  const [r, g, b] = m.slice(0, 3).map((h) => parseInt(h, 16));
  return `rgba(${r},${g},${b},${alpha})`;
}

function isValidHex(s) {
  return /^#?[0-9a-fA-F]{6}$/.test(s);
}

function setSegActive(group, value, attr) {
  group.querySelectorAll('button').forEach((b) => {
    b.classList.toggle('active', b.dataset[attr] === String(value));
  });
}

function setBgImage(src) {
  const img = els.previewBgImg;
  if (img.dataset.currentSrc === src) return;
  img.dataset.currentSrc = src;
  img.onerror = function () {
    // CORS-restricted external URL: drop crossorigin so it at least displays
    if (img.crossOrigin) {
      img.onerror = null;
      img.removeAttribute('crossorigin');
      img.src = src;
    }
  };
  if (src.startsWith('data:')) {
    img.removeAttribute('crossorigin');
  } else {
    img.setAttribute('crossorigin', 'anonymous');
  }
  img.src = src;
}

// Google Fonts stylesheets are cross-origin: JS can't read their CSSOM rules,
// which breaks html-to-image's auto font embedding. Fetch the CSS ourselves
// (CORS is allowed for fetch) and pass it as fontEmbedCSS.
let cachedFontCSS = null;
async function getFontCSS() {
  if (cachedFontCSS !== null) return cachedFontCSS;
  try {
    const links = Array.from(
      document.querySelectorAll('link[rel="stylesheet"][href*="fonts.googleapis.com"]')
    );
    const texts = await Promise.all(
      links.map((l) =>
        fetch(l.href, { mode: 'cors' })
          .then((r) => (r.ok ? r.text() : ''))
          .catch(() => '')
      )
    );
    cachedFontCSS = texts.join('\n');
  } catch {
    cachedFontCSS = '';
  }
  return cachedFontCSS;
}

const loadedFonts = new Set();
function loadFont(family) {
  if (loadedFonts.has(family)) return;
  loadedFonts.add(family);
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href =
    `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, '+')}` +
    `:wght@400;700;900&display=swap&subset=cyrillic,latin`;
  document.head.appendChild(link);
}

// ---------- Render ----------

function render() {
  // text content
  els.previewEyebrow.textContent = state.eyebrow || '';
  els.previewEyebrow.style.display = state.eyebrow ? 'block' : 'none';
  els.previewTitle.textContent = state.text || ' ';
  els.previewDesc.textContent = state.description || '';
  els.previewDesc.style.display = state.description ? 'block' : 'none';

  // shared font block (color, alignment, shadow inherited)
  els.previewText.style.fontFamily = `'${state.font.family}', system-ui, sans-serif`;
  els.previewText.style.color = state.font.color;
  els.previewText.style.textAlign = state.font.align;
  els.previewText.style.textShadow = state.font.shadow
    ? '0 2px 12px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.6)'
    : 'none';

  // size baseline — % of preview's smaller side
  const rect = els.preview.getBoundingClientRect();
  const minDim = Math.min(rect.width, rect.height);
  const titlePx = (state.font.size * minDim) / 100;

  // title
  els.previewTitle.style.fontSize = `${titlePx}px`;
  els.previewTitle.style.fontWeight = state.font.weight;
  els.previewTitle.style.fontStyle = state.font.italic ? 'italic' : 'normal';
  els.previewTitle.style.lineHeight = state.font.lineHeight;
  els.previewTitle.style.letterSpacing = `${state.font.letterSpacing}em`;
  els.previewTitle.style.textTransform = state.font.transform;
  if (state.font.strokeWidth > 0) {
    const sw = (state.font.strokeWidth * titlePx) / 100;
    els.previewTitle.style.webkitTextStroke = `${sw}px ${state.font.strokeColor}`;
    els.previewTitle.style.paintOrder = 'stroke fill';
  } else {
    els.previewTitle.style.webkitTextStroke = '';
    els.previewTitle.style.paintOrder = '';
  }

  // description
  els.previewDesc.style.fontSize = `${(titlePx * state.descFont.size) / 100}px`;
  els.previewDesc.style.fontWeight = state.descFont.weight;
  els.previewDesc.style.fontStyle = state.descFont.italic ? 'italic' : 'normal';
  els.previewDesc.style.opacity = state.descFont.opacity / 100;
  els.previewDesc.style.marginTop = `${state.descFont.gap}em`;
  els.previewDesc.style.lineHeight = '1.35';
  els.previewDesc.style.letterSpacing = `${state.descFont.letterSpacing}em`;

  // eyebrow (auto-styled small uppercase kicker)
  els.previewEyebrow.style.fontSize = `${(titlePx * state.eyebrowFont.size) / 100}px`;
  els.previewEyebrow.style.opacity = state.eyebrowFont.opacity / 100;
  els.previewEyebrow.style.letterSpacing = `${state.eyebrowFont.letterSpacing}em`;
  els.previewEyebrow.style.textTransform = 'uppercase';
  els.previewEyebrow.style.fontWeight = '700';
  els.previewEyebrow.style.marginBottom = '0.8em';
  els.previewEyebrow.style.lineHeight = '1.2';

  // background
  els.previewBg.style.backgroundImage = '';
  els.previewBg.style.backgroundColor = '';
  els.previewBg.style.background = '';
  els.previewBg.style.filter = '';
  els.previewBg.style.inset = '0';
  // hide img by default; only show in image mode with a src
  els.previewBgImg.style.display = 'none';
  els.previewBgImg.style.filter = '';
  els.previewBgImg.style.inset = '0';

  if (state.bgType === 'gradient') {
    const colors = [state.gradient.c1, state.gradient.c2];
    if (state.gradient.c3) colors.push(state.gradient.c3);
    els.previewBg.style.background = `linear-gradient(${state.gradient.angle}deg, ${colors.join(
      ', '
    )})`;
  } else if (state.bgType === 'solid') {
    els.previewBg.style.background = state.solid;
  } else if (state.bgType === 'image' && state.image.src) {
    setBgImage(state.image.src);
    els.previewBgImg.style.display = 'block';
    if (state.image.blur > 0) {
      els.previewBgImg.style.filter = `blur(${state.image.blur}px)`;
      els.previewBgImg.style.inset = `-${state.image.blur * 2}px`;
    }
  } else if (state.bgType === 'image') {
    // placeholder pattern when no image yet
    els.previewBg.style.background =
      'repeating-linear-gradient(45deg, #e2e8f0 0 12px, #cbd5e1 12px 24px)';
  }

  // overlay
  if (state.bgType === 'image' && state.image.src) {
    els.previewOverlay.style.background = hex2rgba(state.image.overlayColor, state.image.overlay);
  } else {
    els.previewOverlay.style.background = 'transparent';
  }

  // vertical position (justify-content on a column flex container)
  els.previewContent.style.alignItems = '';
  els.previewContent.style.justifyContent =
    state.position === 'top'
      ? 'flex-start'
      : state.position === 'bottom'
      ? 'flex-end'
      : 'center';

  // size meta — width/height set by fitPreview()
  const [w, h] = ASPECT_RATIOS[state.aspect];
  const outW = Math.round(state.outputSize * (w >= h ? 1 : w / h));
  const outH = Math.round(state.outputSize * (w >= h ? h / w : 1));
  els.previewSize.textContent = `${outW} × ${outH}`;
  els.previewMeta.innerHTML = state.image.attribution || '';
}

// debounce ResizeObserver renders to avoid jank
let renderRaf = null;
function scheduleRender() {
  if (renderRaf) return;
  renderRaf = requestAnimationFrame(() => {
    renderRaf = null;
    render();
  });
}

// Compute preview width/height in pixels so the aspect ratio is always honored,
// even when the preview's natural height would exceed the mobile/desktop cap.
function fitPreview() {
  const wrapper = els.preview.parentElement;
  if (!wrapper) return;
  const cs = getComputedStyle(wrapper);
  const padX = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
  const innerW = Math.max(0, wrapper.clientWidth - padX);
  const vh = window.innerHeight / 100;
  const maxHvh = window.innerWidth < 1024 ? 42 : 70;
  const maxH = maxHvh * vh;

  const [aspW, aspH] = ASPECT_RATIOS[state.aspect];
  const ratio = aspW / aspH;

  let w = innerW;
  let h = w / ratio;
  if (h > maxH) {
    h = maxH;
    w = h * ratio;
  }
  els.preview.style.width = `${Math.floor(w)}px`;
  els.preview.style.height = `${Math.floor(h)}px`;
}

// ---------- Init: populate UI ----------

function initFonts() {
  FONTS.forEach((f) => {
    const opt = document.createElement('option');
    opt.value = f;
    opt.textContent = f;
    opt.style.fontFamily = `'${f}', sans-serif`;
    els.fontFamily.appendChild(opt);
  });
  els.fontFamily.value = state.font.family;
  // preload first few
  FONTS.slice(0, 6).forEach(loadFont);
}

function initGradientPresets() {
  GRADIENT_PRESETS.forEach((pair) => {
    const btn = document.createElement('button');
    btn.className = 'grad-preset';
    btn.style.background = `linear-gradient(135deg, ${pair[0]}, ${pair[1]})`;
    btn.title = `${pair[0]} → ${pair[1]}`;
    btn.addEventListener('click', () => {
      state.gradient.c1 = pair[0];
      state.gradient.c2 = pair[1];
      state.gradient.c3 = null;
      els.gradC1.value = pair[0];
      els.gradC2.value = pair[1];
      els.gradC3Enabled.checked = false;
      els.gradC3.disabled = true;
      els.gradC3.style.opacity = '0.4';
      render();
    });
    els.gradPresets.appendChild(btn);
  });
}

function initSolidPresets() {
  SOLID_PRESETS.forEach((color) => {
    const btn = document.createElement('button');
    btn.className = 'solid-preset';
    btn.style.background = color;
    btn.title = color;
    btn.addEventListener('click', () => {
      state.solid = color;
      els.solidColor.value = color;
      els.solidColorText.value = color.toUpperCase();
      render();
    });
    els.solidPresets.appendChild(btn);
  });
}

function initTemplates() {
  TEMPLATES.forEach((tpl) => {
    const btn = document.createElement('button');
    btn.className = 'template-card';
    btn.setAttribute('style', tpl.swatch);
    btn.textContent = tpl.label;
    btn.title = tpl.name;
    btn.addEventListener('click', () => applyTemplate(tpl));
    els.templates.appendChild(btn);
  });
}

function applyTemplate(tpl) {
  // deep-merge patch onto state
  Object.keys(tpl.patch).forEach((k) => {
    const v = tpl.patch[k];
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      state[k] = Object.assign({}, state[k] || {}, v);
    } else {
      state[k] = v;
    }
  });
  loadFont(state.font.family);
  syncUI();
  fitPreview();
  render();
}

// Push the current state to every input, slider, and seg-btn so a template
// click (or anything else that mutates state directly) is reflected in the UI.
function syncUI() {
  // bg type segment + panels
  setSegActive(els.bgGroup, state.bgType, 'bg');
  els.panelGradient.classList.toggle('hidden', state.bgType !== 'gradient');
  els.panelSolid.classList.toggle('hidden', state.bgType !== 'solid');
  els.panelImage.classList.toggle('hidden', state.bgType !== 'image');

  // gradient
  els.gradC1.value = state.gradient.c1;
  els.gradC2.value = state.gradient.c2;
  els.gradC3Enabled.checked = !!state.gradient.c3;
  els.gradC3.disabled = !state.gradient.c3;
  els.gradC3.style.opacity = state.gradient.c3 ? '1' : '0.4';
  if (state.gradient.c3) els.gradC3.value = state.gradient.c3;
  els.gradAngle.value = state.gradient.angle;
  els.gradAngleVal.textContent = `${state.gradient.angle}°`;

  // solid
  els.solidColor.value = state.solid;
  els.solidColorText.value = state.solid.toUpperCase();

  // font
  els.fontFamily.value = state.font.family;
  els.fontSize.value = state.font.size;
  els.fontSizeVal.textContent = state.font.size.toFixed(1);
  setSegActive(els.fontWeightGroup, state.font.weight, 'weight');
  els.fontColor.value = state.font.color;
  els.fontColorText.value = state.font.color.toUpperCase();
  setSegActive(els.fontAlignGroup, state.font.align, 'align');
  setSegActive(els.fontPosGroup, state.position, 'pos');
  els.lineHeight.value = state.font.lineHeight;
  els.lineHeightVal.textContent = state.font.lineHeight.toFixed(2);
  els.textShadow.checked = state.font.shadow;
  els.letterSpacing.value = state.font.letterSpacing;
  els.letterSpacingVal.textContent = state.font.letterSpacing.toFixed(3);
  setSegActive(els.transformGroup, state.font.transform, 'transform');
  els.textItalic.checked = state.font.italic;
  els.strokeWidth.value = state.font.strokeWidth;
  els.strokeWidthVal.textContent = state.font.strokeWidth.toFixed(2);
  els.strokeColor.value = state.font.strokeColor;

  // description
  els.descSize.value = state.descFont.size;
  els.descSizeVal.textContent = `${state.descFont.size}%`;
  setSegActive(els.descWeightGroup, state.descFont.weight, 'descWeight');
  els.descOpacity.value = state.descFont.opacity;
  els.descOpacityVal.textContent = `${state.descFont.opacity}%`;
  els.descGap.value = state.descFont.gap;
  els.descGapVal.textContent = state.descFont.gap.toFixed(2);
  els.descLetterSpacing.value = state.descFont.letterSpacing;
  els.descLetterSpacingVal.textContent = state.descFont.letterSpacing.toFixed(3);
  els.descItalic.checked = state.descFont.italic;

  // format
  setSegActive(els.aspectGroup, state.aspect, 'aspect');
  setSegActive(els.sizeGroup, state.outputSize, 'size');
}

// ---------- Listeners ----------

function bindAll() {
  // text
  els.textInput.value = state.text || els.textInput.value;
  state.text = els.textInput.value;
  els.textInput.addEventListener('input', () => {
    state.text = els.textInput.value;
    render();
  });

  // eyebrow
  state.eyebrow = els.eyebrowInput.value;
  els.eyebrowInput.addEventListener('input', () => {
    state.eyebrow = els.eyebrowInput.value;
    render();
  });

  // description
  state.description = els.descInput.value;
  els.descInput.addEventListener('input', () => {
    state.description = els.descInput.value;
    render();
  });

  // bg type
  els.bgGroup.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-bg]');
    if (!btn) return;
    state.bgType = btn.dataset.bg;
    setSegActive(els.bgGroup, state.bgType, 'bg');
    els.panelGradient.classList.toggle('hidden', state.bgType !== 'gradient');
    els.panelSolid.classList.toggle('hidden', state.bgType !== 'solid');
    els.panelImage.classList.toggle('hidden', state.bgType !== 'image');
    render();
  });

  // gradient
  els.gradC1.addEventListener('input', () => { state.gradient.c1 = els.gradC1.value; render(); });
  els.gradC2.addEventListener('input', () => { state.gradient.c2 = els.gradC2.value; render(); });
  els.gradC3.addEventListener('input', () => {
    if (state.gradient.c3 !== null) state.gradient.c3 = els.gradC3.value;
    render();
  });
  els.gradC3Enabled.addEventListener('change', () => {
    const on = els.gradC3Enabled.checked;
    state.gradient.c3 = on ? els.gradC3.value : null;
    els.gradC3.disabled = !on;
    els.gradC3.style.opacity = on ? '1' : '0.4';
    render();
  });
  els.gradAngle.addEventListener('input', () => {
    state.gradient.angle = +els.gradAngle.value;
    els.gradAngleVal.textContent = `${state.gradient.angle}°`;
    render();
  });

  // solid
  els.solidColor.addEventListener('input', () => {
    state.solid = els.solidColor.value;
    els.solidColorText.value = state.solid.toUpperCase();
    render();
  });
  els.solidColorText.addEventListener('input', () => {
    const v = els.solidColorText.value.trim();
    if (isValidHex(v)) {
      const hex = v.startsWith('#') ? v : `#${v}`;
      state.solid = hex.toLowerCase();
      els.solidColor.value = state.solid;
      render();
    }
  });

  // image: tabs
  $$('#panel-image button[data-img-tab]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.imgTab;
      $$('#panel-image button[data-img-tab]').forEach((b) =>
        b.classList.toggle('active', b === btn)
      );
      $('#img-tab-upload').classList.toggle('hidden', tab !== 'upload');
      $('#img-tab-url').classList.toggle('hidden', tab !== 'url');
      $('#img-tab-search').classList.toggle('hidden', tab !== 'search');
      if (tab === 'search') initUnsplashUI();
    });
  });

  // image: file
  els.imgFile.addEventListener('change', () => {
    const file = els.imgFile.files && els.imgFile.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      state.image.src = reader.result;
      state.image.attribution = null;
      render();
    };
    reader.readAsDataURL(file);
  });

  // drag & drop on the upload label
  const dropZone = $('label[for="img-file"]');
  ['dragenter', 'dragover'].forEach((ev) =>
    dropZone.addEventListener(ev, (e) => {
      e.preventDefault();
      dropZone.classList.add('bg-slate-100');
    })
  );
  ['dragleave', 'drop'].forEach((ev) =>
    dropZone.addEventListener(ev, (e) => {
      e.preventDefault();
      dropZone.classList.remove('bg-slate-100');
    })
  );
  dropZone.addEventListener('drop', (e) => {
    const f = e.dataTransfer.files && e.dataTransfer.files[0];
    if (!f || !f.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => {
      state.image.src = reader.result;
      state.image.attribution = null;
      render();
    };
    reader.readAsDataURL(f);
  });

  // image: url
  els.imgUrl.addEventListener('change', () => {
    const url = els.imgUrl.value.trim();
    if (!url) return;
    state.image.src = url;
    state.image.attribution = null;
    render();
  });

  // image: overlay/blur
  els.imgOverlay.addEventListener('input', () => {
    state.image.overlay = +els.imgOverlay.value / 100;
    els.imgOverlayVal.textContent = `${els.imgOverlay.value}%`;
    render();
  });
  els.imgOverlayColor.addEventListener('input', () => {
    state.image.overlayColor = els.imgOverlayColor.value;
    render();
  });
  els.imgBlur.addEventListener('input', () => {
    state.image.blur = +els.imgBlur.value;
    els.imgBlurVal.textContent = `${state.image.blur}px`;
    render();
  });

  // unsplash key
  els.unsplashKeySave.addEventListener('click', () => {
    const key = els.unsplashKey.value.trim();
    if (!key) return;
    localStorage.setItem('unsplash_key', key);
    initUnsplashUI();
  });
  els.unsplashKeyEdit.addEventListener('click', () => {
    localStorage.removeItem('unsplash_key');
    initUnsplashUI();
  });
  els.unsplashSearch.addEventListener('click', searchUnsplash);
  els.unsplashQuery.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') searchUnsplash();
  });

  // font family
  els.fontFamily.addEventListener('change', () => {
    state.font.family = els.fontFamily.value;
    loadFont(state.font.family);
    render();
  });

  // font size
  els.fontSize.addEventListener('input', () => {
    state.font.size = +els.fontSize.value;
    els.fontSizeVal.textContent = state.font.size.toFixed(1);
    render();
  });

  // weight
  els.fontWeightGroup.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-weight]');
    if (!btn) return;
    state.font.weight = +btn.dataset.weight;
    setSegActive(els.fontWeightGroup, state.font.weight, 'weight');
    render();
  });

  // color
  els.fontColor.addEventListener('input', () => {
    state.font.color = els.fontColor.value;
    els.fontColorText.value = state.font.color.toUpperCase();
    render();
  });
  els.fontColorText.addEventListener('input', () => {
    const v = els.fontColorText.value.trim();
    if (isValidHex(v)) {
      const hex = v.startsWith('#') ? v : `#${v}`;
      state.font.color = hex.toLowerCase();
      els.fontColor.value = state.font.color;
      render();
    }
  });

  // alignment
  els.fontAlignGroup.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-align]');
    if (!btn) return;
    state.font.align = btn.dataset.align;
    setSegActive(els.fontAlignGroup, state.font.align, 'align');
    render();
  });

  // position
  els.fontPosGroup.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-pos]');
    if (!btn) return;
    state.position = btn.dataset.pos;
    setSegActive(els.fontPosGroup, state.position, 'pos');
    render();
  });

  // line-height
  els.lineHeight.addEventListener('input', () => {
    state.font.lineHeight = +els.lineHeight.value;
    els.lineHeightVal.textContent = state.font.lineHeight.toFixed(2);
    render();
  });

  // shadow
  els.textShadow.addEventListener('change', () => {
    state.font.shadow = els.textShadow.checked;
    render();
  });

  // letter-spacing (title)
  els.letterSpacing.addEventListener('input', () => {
    state.font.letterSpacing = +els.letterSpacing.value;
    els.letterSpacingVal.textContent = state.font.letterSpacing.toFixed(3);
    render();
  });

  // text transform
  els.transformGroup.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-transform]');
    if (!btn) return;
    state.font.transform = btn.dataset.transform;
    setSegActive(els.transformGroup, state.font.transform, 'transform');
    render();
  });

  // italic
  els.textItalic.addEventListener('change', () => {
    state.font.italic = els.textItalic.checked;
    render();
  });

  // stroke
  els.strokeWidth.addEventListener('input', () => {
    state.font.strokeWidth = +els.strokeWidth.value;
    els.strokeWidthVal.textContent = state.font.strokeWidth.toFixed(2);
    render();
  });
  els.strokeColor.addEventListener('input', () => {
    state.font.strokeColor = els.strokeColor.value;
    render();
  });

  // description: size
  els.descSize.addEventListener('input', () => {
    state.descFont.size = +els.descSize.value;
    els.descSizeVal.textContent = `${state.descFont.size}%`;
    render();
  });
  // description: weight
  els.descWeightGroup.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-desc-weight]');
    if (!btn) return;
    state.descFont.weight = +btn.dataset.descWeight;
    setSegActive(els.descWeightGroup, state.descFont.weight, 'descWeight');
    render();
  });
  // description: opacity
  els.descOpacity.addEventListener('input', () => {
    state.descFont.opacity = +els.descOpacity.value;
    els.descOpacityVal.textContent = `${state.descFont.opacity}%`;
    render();
  });
  // description: gap
  els.descGap.addEventListener('input', () => {
    state.descFont.gap = +els.descGap.value;
    els.descGapVal.textContent = state.descFont.gap.toFixed(2);
    render();
  });
  // description: letter-spacing
  els.descLetterSpacing.addEventListener('input', () => {
    state.descFont.letterSpacing = +els.descLetterSpacing.value;
    els.descLetterSpacingVal.textContent = state.descFont.letterSpacing.toFixed(3);
    render();
  });
  // description: italic
  els.descItalic.addEventListener('change', () => {
    state.descFont.italic = els.descItalic.checked;
    render();
  });

  // aspect
  els.aspectGroup.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-aspect]');
    if (!btn) return;
    state.aspect = btn.dataset.aspect;
    setSegActive(els.aspectGroup, state.aspect, 'aspect');
    fitPreview();
    render();
  });

  // output size
  els.sizeGroup.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-size]');
    if (!btn) return;
    state.outputSize = +btn.dataset.size;
    setSegActive(els.sizeGroup, state.outputSize, 'size');
    render();
  });

  // download
  els.downloadPng.addEventListener('click', () => download('png'));
  els.downloadJpg.addEventListener('click', () => download('jpg'));
}

// ---------- Unsplash ----------

function initUnsplashUI() {
  const key = localStorage.getItem('unsplash_key');
  els.unsplashKeyBlock.classList.toggle('hidden', !!key);
  els.unsplashSearchBlock.classList.toggle('hidden', !key);
  if (key && !els.unsplashResults.dataset.populated) {
    els.unsplashStatus.textContent = 'Введите запрос и нажмите «Найти».';
  }
}

async function searchUnsplash() {
  const key = localStorage.getItem('unsplash_key');
  if (!key) {
    initUnsplashUI();
    return;
  }
  const query = els.unsplashQuery.value.trim();
  if (!query) return;

  els.unsplashStatus.textContent = 'Поиск…';
  els.unsplashResults.innerHTML = '';

  try {
    const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
      query
    )}&per_page=18&content_filter=high`;
    const res = await fetch(url, {
      headers: { Authorization: `Client-ID ${key}` },
    });
    if (!res.ok) {
      const msg =
        res.status === 401
          ? 'Неверный Access Key. Проверьте и обновите.'
          : `Ошибка: ${res.status}`;
      els.unsplashStatus.textContent = msg;
      return;
    }
    const data = await res.json();
    if (!data.results || data.results.length === 0) {
      els.unsplashStatus.textContent = 'Ничего не найдено.';
      return;
    }
    els.unsplashStatus.textContent = `Найдено: ${data.total}. Кликните по фото.`;
    els.unsplashResults.dataset.populated = '1';
    data.results.forEach((photo) => {
      const div = document.createElement('div');
      div.className = 'photo-thumb';
      const img = document.createElement('img');
      img.src = photo.urls.thumb;
      img.alt = photo.alt_description || '';
      img.loading = 'lazy';
      div.appendChild(img);
      div.title = `Photo by ${photo.user.name} on Unsplash`;
      div.addEventListener('click', () => selectUnsplash(photo));
      els.unsplashResults.appendChild(div);
    });
  } catch (err) {
    els.unsplashStatus.textContent = 'Сетевая ошибка. Попробуйте ещё раз.';
  }
}

async function selectUnsplash(photo) {
  const utm = '?utm_source=beauticard&utm_medium=referral';
  const author = `<a href="${photo.user.links.html}${utm}" target="_blank" rel="noopener" class="hover:text-slate-700 underline">${photo.user.name}</a>`;
  const home = `<a href="https://unsplash.com/${utm}" target="_blank" rel="noopener" class="hover:text-slate-700 underline">Unsplash</a>`;
  state.image.attribution = `Photo by ${author} on ${home}`;

  // Show photo immediately, then swap to data-URL once fetched so the canvas snapshot can capture it.
  state.image.src = photo.urls.regular;
  render();
  els.unsplashStatus.textContent = 'Загружаю фото…';

  try {
    const res = await fetch(photo.urls.regular, { mode: 'cors' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const blob = await res.blob();
    const dataUrl = await new Promise((resolve, reject) => {
      const r = new FileReader();
      r.onload = () => resolve(r.result);
      r.onerror = () => reject(r.error);
      r.readAsDataURL(blob);
    });
    state.image.src = dataUrl;
    render();
    els.unsplashStatus.textContent = 'Фото загружено — можно скачивать.';
  } catch (err) {
    console.error(err);
    els.unsplashStatus.textContent = 'Картинка отображается, но скачивание может не сработать из-за CORS.';
  }
}

// ---------- Download ----------

async function download(format) {
  if (typeof htmlToImage === 'undefined') {
    els.downloadStatus.textContent = 'Библиотека снапшота не загрузилась — перезагрузите страницу.';
    return;
  }
  els.downloadStatus.textContent = 'Готовлю изображение…';
  els.downloadPng.disabled = true;
  els.downloadJpg.disabled = true;

  try {
    // ensure fonts ready
    await document.fonts.ready;

    const rect = els.preview.getBoundingClientRect();
    const [w, h] = ASPECT_RATIOS[state.aspect];
    // target dimensions: longer side = outputSize
    const targetW = w >= h ? state.outputSize : Math.round((state.outputSize * w) / h);
    const targetH = w >= h ? Math.round((state.outputSize * h) / w) : state.outputSize;
    const pixelRatio = targetW / rect.width;

    const fontEmbedCSS = await getFontCSS();
    const canvas = await htmlToImage.toCanvas(els.preview, {
      pixelRatio,
      backgroundColor: format === 'jpg' ? '#ffffff' : undefined,
      fontEmbedCSS,
    });

    const mime = format === 'jpg' ? 'image/jpeg' : 'image/png';
    const quality = format === 'jpg' ? 0.92 : undefined;

    canvas.toBlob(
      (blob) => {
        if (!blob) {
          els.downloadStatus.textContent = 'Не удалось создать файл.';
          return;
        }
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        const stamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-');
        a.href = url;
        a.download = `beauticard-${stamp}.${format}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        els.downloadStatus.textContent = `Скачано: ${targetW}×${targetH}`;
      },
      mime,
      quality
    );
  } catch (err) {
    console.error(err);
    els.downloadStatus.textContent =
      'Ошибка. Если фон — внешняя картинка, источник может не разрешать CORS.';
  } finally {
    els.downloadPng.disabled = false;
    els.downloadJpg.disabled = false;
  }
}

// ---------- Bootstrap ----------

function init() {
  state.text = els.textInput.value;

  initFonts();
  initGradientPresets();
  initSolidPresets();
  initTemplates();
  bindAll();

  // observe preview size to recompute font-size
  const ro = new ResizeObserver(scheduleRender);
  ro.observe(els.preview);

  // viewport changes (orientation, browser chrome) → re-fit preview
  window.addEventListener('resize', () => {
    fitPreview();
    scheduleRender();
  });

  fitPreview();
  render();
}

init();
