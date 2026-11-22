'use strict';

function setPressed(buttons, chosen) {
  buttons.forEach((button) => button.setAttribute('aria-pressed', String(chosen(button))));
}

function initAtlas(atlas) {
  const viewButtons = [...atlas.querySelectorAll('[data-atlas-view]')];
  const placeButtons = [...atlas.querySelectorAll('[data-place]')];
  const maps = [...atlas.querySelectorAll('[data-view]')];
  const entries = [...atlas.querySelectorAll('[data-place-entry]')];
  const prompt = atlas.querySelector('[data-place-prompt]');
  let currentPlace = '';

  function selectPlace(id) {
    currentPlace = id;
    prompt.hidden = Boolean(id);
    entries.forEach((entry) => { entry.hidden = entry.dataset.placeEntry !== id; });
    setPressed(placeButtons, (button) => button.dataset.place === id);
  }

  viewButtons.forEach((button) => button.addEventListener('click', () => {
    const view = button.dataset.atlasView;
    setPressed(viewButtons, (other) => other === button);
    maps.forEach((map) => { map.hidden = map.dataset.view !== view; });
    if (!placeButtons.some((place) => place.dataset.place === currentPlace && !place.closest('[hidden]'))) {
      selectPlace('');
    }
  }));
  placeButtons.forEach((button) => button.addEventListener('click', () => selectPlace(button.dataset.place)));
  atlas.querySelector('[data-interactive]').hidden = false;
}

function initTimeline(timeline) {
  const controls = timeline.querySelector('[data-timeline-controls]');
  const buttons = [...controls.querySelectorAll('button')];
  const entries = [...timeline.querySelectorAll('[data-time-region]')];
  const output = timeline.querySelector('output');
  buttons.forEach((button) => button.addEventListener('click', () => {
    const region = button.dataset.timeFilter;
    setPressed(buttons, (other) => other === button);
    entries.forEach((entry) => { entry.hidden = region !== 'all' && entry.dataset.timeRegion !== region; });
    output.textContent = entries.filter((entry) => !entry.hidden).length + archiveText(" timeline entries shown.", " registros exibidos na linha do tempo.");
  }));
  controls.hidden = false;
}

function initCabinet(cabinet) {
  const plates = window.archivePlates;
  if (!plates) return;
  const menu = cabinet.querySelector('select');
  const image = cabinet.querySelector('[data-plate-image]');
  const viewport = cabinet.querySelector('[data-plate-viewport]');
  const credit = cabinet.querySelector('[data-plate-credit]');
  const status = cabinet.querySelector('[data-zoom-status]');
  const zoomIn = cabinet.querySelector('[data-zoom="in"]');
  const zoomOut = cabinet.querySelector('[data-zoom="out"]');
  const reset = cabinet.querySelector('[data-zoom="reset"]');
  let level = 100;

  function zoom(value, keepCentre = true) {
    const previous = level;
    const oldX = viewport.scrollLeft + viewport.clientWidth / 2;
    const oldY = viewport.scrollTop + viewport.clientHeight / 2;
    level = Math.max(100, Math.min(300, value));
    image.style.width = level + '%';
    status.value = level + '%';
    zoomOut.disabled = level === 100;
    zoomIn.disabled = level === 300;
    reset.disabled = level === 100;
    if (keepCentre) {
      viewport.scrollLeft = oldX * level / previous - viewport.clientWidth / 2;
      viewport.scrollTop = oldY * level / previous - viewport.clientHeight / 2;
    } else {
      viewport.scrollTop = 0;
      viewport.scrollLeft = 0;
    }
  }

  menu.addEventListener('change', () => {
    const [title, alt, url] = plates[menu.value];
    image.src = 'assets/images/' + menu.value + '.webp';
    image.alt = alt;
    credit.href = url;
    credit.textContent = title;
    zoom(100, false);
  });
  zoomIn.addEventListener('click', () => zoom(level + 50));
  zoomOut.addEventListener('click', () => zoom(level - 50));
  reset.addEventListener('click', () => zoom(100, false));
  zoom(100, false);
  cabinet.querySelector('[data-cabinet-tools]').hidden = false;
}

function initStudy(study) {
  const buttons = [...study.querySelectorAll('[data-period]')];
  const descriptions = [...study.querySelectorAll('[data-period-info]')];
  function select(index) {
    setPressed(buttons, (button) => Number(button.dataset.period) === index);
    descriptions.forEach((description, current) => { description.hidden = current !== index; });
  }
  buttons.forEach((button) => button.addEventListener('click', () => select(Number(button.dataset.period))));
  select(0);
}

function parseCoordinateRow(line, location) {
  const parts = line.split(',').map((value) => value.trim());
  const label = parts.shift();
  const values = parts.map(Number);
  if (!label || parts.length !== 25 || parts.some((value, i) =>
    !/^[+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?$/i.test(value) ||
    !Number.isFinite(values[i]) || Math.abs(values[i]) > 1000000)) {
    throw new Error(location + archiveText(" needs a label and 25 finite decimal coordinates.", " precisa de um nome e 25 coordenadas decimais finitas."));
  }
  return { label, values };
}

function formatCoordinate(value) {
  return archiveText(String(value), String(value).replace('.', ','));
}

function plot(canvas, target, references) {
  const context = canvas.getContext('2d');
  if (!context) return;
  const all = [target, ...references];
  const [left, right, top, bottom] = [85, 690, 25, 350];

  function bounds(axis) {
    const values = all.map((point) => point.values[axis]);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const padding = (max - min) * .08 || .002;
    return [min - padding, max + padding];
  }

  const [xmin, xmax] = bounds(0);
  const [ymin, ymax] = bounds(1);
  const x = (value) => left + (value - xmin) / (xmax - xmin) * (right - left);
  const y = (value) => bottom - (value - ymin) / (ymax - ymin) * (bottom - top);
  context.fillStyle = '#141d1a';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.font = '16px monospace';
  context.fillStyle = '#d5d6c9';
  context.strokeStyle = '#495c51';
  context.textAlign = 'center';
  for (let i = 0; i <= 4; i++) {
    const fraction = i / 4;
    const gx = left + (right - left) * fraction;
    const gy = bottom - (bottom - top) * fraction;
    context.beginPath();
    context.moveTo(gx, top);
    context.lineTo(gx, bottom);
    context.moveTo(left, gy);
    context.lineTo(right, gy);
    context.stroke();
    context.fillText(formatCoordinate((xmin + (xmax - xmin) * fraction).toPrecision(3)), gx, bottom + 22);
    context.textAlign = 'right';
    context.fillText(formatCoordinate((ymin + (ymax - ymin) * fraction).toPrecision(3)), left - 7, gy + 5);
    context.textAlign = 'center';
  }
  context.fillText(archiveText("Axis 1", "Eixo 1"), (left + right) / 2, bottom + 48);
  context.save();
  context.translate(15, (top + bottom) / 2);
  context.rotate(-Math.PI / 2);
  context.fillText(archiveText("Axis 2", "Eixo 2"), 0, 0);
  context.restore();

  context.fillStyle = '#9fc9b5';
  references.forEach(({ values }) => {
    context.beginPath();
    context.arc(x(values[0]), y(values[1]), 4.5, 0, 2 * Math.PI);
    context.fill();
  });
  context.fillStyle = '#f0cb88';
  context.fillRect(x(target.values[0]) - 6, y(target.values[1]) - 6, 12, 12);
  canvas.setAttribute('aria-label', archiveText("Scatter plot of axes 1 and 2. Gold square represents the target and green circles represent ", "Gráfico de dispersão dos eixos 1 e 2. O quadrado dourado representa o alvo e os círculos verdes representam as ") + references.length + archiveText(" reference rows. The table provides coordinate values.", " linhas de referência. A tabela mostra os valores das coordenadas."));
}

function initCoordinates(form) {
  const targetInput = form.querySelector('#coordinate-target');
  const refInput = form.querySelector('#coordinate-refs');
  const output = form.querySelector('output');
  const results = form.querySelector('[data-coordinate-results]');
  const body = results.querySelector('tbody');
  const canvas = results.querySelector('canvas');
  const lines = (value) => value.split(/\r?\n/).filter((line) => line.trim());

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    try {
      const targetRows = lines(targetInput.value);
      const referenceRows = lines(refInput.value);
      if (targetRows.length !== 1) throw new Error(archiveText("Provide exactly one target row.", "Informe exatamente uma linha-alvo."));
      if (!referenceRows.length || referenceRows.length > 300) throw new Error(archiveText("Provide between 1 and 300 reference rows.", "Informe entre 1 e 300 linhas de referência."));
      const target = parseCoordinateRow(targetRows[0], archiveText("The target row", "A linha-alvo"));
      const references = referenceRows.map((line, i) => parseCoordinateRow(line, archiveText("Reference row ", "A linha de referência ") + (i + 1)));
      const ranked = references.map((ref) => ({
        ...ref, distance: Math.hypot(...ref.values.map((coord, i) => coord - target.values[i]))
      })).sort((a, b) => a.distance - b.distance);
      const fragment = document.createDocumentFragment();
      ranked.forEach(({ label, distance, values }) => {
        const row = fragment.appendChild(document.createElement('tr'));
        [label, distance.toPrecision(5), values[0], values[1]].forEach((value, i) => {
          row.insertCell().textContent = i === 0 ? value : formatCoordinate(value);
        });
      });
      body.replaceChildren(fragment);
      plot(canvas, target, references);
      results.hidden = false;
      output.value = archiveText("Compared ", "Comparação concluída para ") + references.length + archiveText(" reference ", " linha") + (references.length === 1 ? archiveText("row.", " de referência.") : archiveText("rows.", "s de referência."))
        + archiveText(" Gold square: target. Green circles: references.", " O quadrado dourado indica o alvo e os círculos verdes, as referências.");
    } catch (error) {
      results.hidden = true;
      body.replaceChildren();
      output.value = error.message;
    }
  });

  form.addEventListener('reset', () => {
    results.hidden = true;
    body.replaceChildren();
    canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height);
    output.value = '';
  });
  form.hidden = false;
}

const exhibits = [
  ['[data-atlas]', initAtlas],
  ['[data-timeline]', initTimeline],
  ['[data-cabinet]', initCabinet],
  ['[data-study]', initStudy],
  ['[data-coordinate-form]', initCoordinates]
];
exhibits.forEach(([selector, initialize]) => document.querySelectorAll(selector).forEach(initialize));

