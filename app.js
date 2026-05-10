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

// ---------- State ----------

const state = {
  text: '',
  description: '',
  descFont: { size: 45, weight: 400, opacity: 85, gap: 0.6 },
  bgType: 'gradient',
  gradient: { c1: '#6366f1', c2: '#ec4899', c3: null, angle: 135 },
  solid: '#6366f1',
  image: { src: null, blur: 0, overlay: 0.3, overlayColor: '#000000', attribution: null },
  font: {
    family: 'Inter',
    size: 8,
    weight: 700,
    color: '#ffffff',
    align: 'center',
    lineHeight: 1.2,
    shadow: false,
  },
  position: 'center',
  aspect: '1:1',
  outputSize: 1080,
};

// ---------- Element refs ----------

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

const els = {
  textInput: $('#text-input'),
  descInput: $('#desc-input'),
  preview: $('#preview'),
  previewBg: $('#preview-bg'),
  previewOverlay: $('#preview-overlay'),
  previewContent: $('#preview-content'),
  previewText: $('#preview-text'),
  previewTitle: $('#preview-title'),
  previewDesc: $('#preview-desc'),
  previewSize: $('#preview-size'),
  previewMeta: $('#preview-meta'),

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

  descSize: $('#desc-size'),
  descSizeVal: $('#desc-size-val'),
  descWeightGroup: $('#desc-weight-group'),
  descOpacity: $('#desc-opacity'),
  descOpacityVal: $('#desc-opacity-val'),
  descGap: $('#desc-gap'),
  descGapVal: $('#desc-gap-val'),

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
  // text
  els.previewTitle.textContent = state.text || ' ';
  els.previewDesc.textContent = state.description || '';
  els.previewDesc.style.display = state.description ? 'block' : 'none';

  // font (shared by title and description; description inherits)
  els.previewText.style.fontFamily = `'${state.font.family}', system-ui, sans-serif`;
  els.previewText.style.fontWeight = state.font.weight;
  els.previewText.style.color = state.font.color;
  els.previewText.style.textAlign = state.font.align;
  els.previewText.style.lineHeight = state.font.lineHeight;
  els.previewText.style.textShadow = state.font.shadow
    ? '0 2px 12px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.6)'
    : 'none';

  // text size — % of preview's smaller side, computed from actual rect
  const rect = els.preview.getBoundingClientRect();
  const minDim = Math.min(rect.width, rect.height);
  const titlePx = (state.font.size * minDim) / 100;
  els.previewTitle.style.fontSize = `${titlePx}px`;
  // description: relative size, custom weight/opacity/gap
  els.previewDesc.style.fontSize = `${(titlePx * state.descFont.size) / 100}px`;
  els.previewDesc.style.fontWeight = state.descFont.weight;
  els.previewDesc.style.opacity = state.descFont.opacity / 100;
  els.previewDesc.style.marginTop = `${state.descFont.gap}em`;
  els.previewDesc.style.lineHeight = '1.35';

  // background
  els.previewBg.style.backgroundImage = '';
  els.previewBg.style.backgroundColor = '';
  els.previewBg.style.background = '';
  els.previewBg.style.filter = '';
  els.previewBg.style.inset = '0';

  if (state.bgType === 'gradient') {
    const colors = [state.gradient.c1, state.gradient.c2];
    if (state.gradient.c3) colors.push(state.gradient.c3);
    els.previewBg.style.background = `linear-gradient(${state.gradient.angle}deg, ${colors.join(
      ', '
    )})`;
  } else if (state.bgType === 'solid') {
    els.previewBg.style.background = state.solid;
  } else if (state.bgType === 'image' && state.image.src) {
    els.previewBg.style.backgroundImage = `url("${state.image.src}")`;
    if (state.image.blur > 0) {
      els.previewBg.style.filter = `blur(${state.image.blur}px)`;
      // overscale to hide blur edges
      els.previewBg.style.inset = `-${state.image.blur * 2}px`;
    } else {
      els.previewBg.style.inset = '0';
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

  // position
  els.previewContent.style.alignItems =
    state.position === 'top'
      ? 'flex-start'
      : state.position === 'bottom'
      ? 'flex-end'
      : 'center';

  // aspect
  const [w, h] = ASPECT_RATIOS[state.aspect];
  els.preview.style.aspectRatio = `${w} / ${h}`;

  // size meta
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

// ---------- Listeners ----------

function bindAll() {
  // text
  els.textInput.value = state.text || els.textInput.value;
  state.text = els.textInput.value;
  els.textInput.addEventListener('input', () => {
    state.text = els.textInput.value;
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

  // aspect
  els.aspectGroup.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-aspect]');
    if (!btn) return;
    state.aspect = btn.dataset.aspect;
    setSegActive(els.aspectGroup, state.aspect, 'aspect');
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

  // Show photo immediately, then swap to data-URL once fetched so html2canvas can capture it.
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
    const scale = targetW / rect.width;

    const canvas = await html2canvas(els.preview, {
      scale,
      useCORS: true,
      allowTaint: false,
      backgroundColor: format === 'jpg' ? '#ffffff' : null,
      logging: false,
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
  bindAll();

  // observe preview size to recompute font-size
  const ro = new ResizeObserver(scheduleRender);
  ro.observe(els.preview);

  render();
}

init();
