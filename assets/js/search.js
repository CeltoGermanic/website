'use strict';

const query = document.querySelector('#search-query');
const status = document.querySelector('[data-search-status]');
const list = document.querySelector('[data-search-results]');
const original = [...list.children];
const normalize = (value) => value.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase();
const index = window.archiveSearchIndex.map((entry) => ({
  ...entry,
  heading: normalize(entry.title),
  searchable: normalize(entry.title + ' ' + entry.page + ' ' + entry.text)
}));

function matchingSnippet(text, terms) {
  const normalized = normalize(text);
  const starts = terms.map((term) => normalized.indexOf(term)).filter((position) => position >= 0);
  const start = starts.length ? Math.max(0, Math.min(...starts) - 35) : 0;
  const end = start + 185;
  return (start ? '…' : '') + text.slice(start, end).trim() + (end < text.length ? '…' : '');
}

function search() {
  const words = normalize(query.value).trim().split(/\s+/).filter(Boolean);
  if (!words.length) {
    list.replaceChildren(...original);
    status.textContent = archiveText("Browse the archive index or enter a term to search.", "Consulte o índice do arquivo ou digite um termo para buscar.");
    return;
  }
  const found = index.filter(({ searchable }) => words.every((word) => searchable.includes(word)))
    .map((result) => ({ ...result, rank: words.filter((word) => result.heading.includes(word)).length }))
    .sort((a, b) => b.rank - a.rank);
  list.replaceChildren(...found.map(({ title, page, href, text }) => {
    const item = document.createElement('li');
    const link = item.appendChild(document.createElement('a'));
    link.href = href;
    link.textContent = title;
    if (page !== title) {
      const location = item.appendChild(document.createElement('small'));
      location.textContent = ' · ' + page;
    }
    const snippet = item.appendChild(document.createElement('p'));
    snippet.textContent = matchingSnippet(text, words);
    return item;
  }));
  status.textContent = found.length
    ? found.length + (found.length === 1 ? archiveText(" result", " resultado") : archiveText(" results", " resultados"))
    : archiveText("No results. Try a person, place, or broader topic.", "Nenhum resultado. Tente um nome, um lugar ou um tema mais amplo.");
}

query.addEventListener('input', search);
search();

