'use strict';

(() => {
  const locale = document.documentElement.lang;
  const storageKey = 'between-continents-language';
  const valid = (language) => language === 'en' || language === 'pt-BR';
  const current = new URL(location.href);
  const explicit = current.searchParams.get('lang');
  const dialog = document.querySelector('[data-language-dialog]');
  const links = [...document.querySelectorAll('[data-language-choice]')];
  const initial = new Map(links.map((link) => [link, new URL(link.href)]));

  function readChoice() {
    try {
      return localStorage.getItem(storageKey);
    } catch {
      return null;
    }
  }

  function remember(language) {
    try {
      localStorage.setItem(storageKey, language);
    } catch {
      // Static navigation still works when storage is unavailable.
    }
  }

  function targetFor(link) {
    const target = new URL(initial.get(link));
    target.searchParams.set('lang', link.dataset.languageChoice);
    target.hash = location.hash;
    return target;
  }

  function syncLinks() {
    links.forEach((link) => { link.href = targetFor(link).href; });
  }

  if (explicit === locale) {
    remember(explicit);
    current.searchParams.delete('lang');
    try {
      history.replaceState(history.state, '', current.href);
    } catch {
      // Some browsers restrict changing file URLs.
    }
  }

  syncLinks();
  addEventListener('hashchange', syncLinks);

  links.forEach((link) => link.addEventListener('click', (event) => {
    if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const choice = link.dataset.languageChoice;
    remember(choice);
    if (choice === locale && dialog?.open) {
      event.preventDefault();
      dialog.close();
      document.querySelector('.language-switch')?.focus();
    }
  }));

  if (!dialog || explicit === locale) return;
  const saved = readChoice();
  if (!valid(saved)) {
    dialog.showModal();
  } else if (saved !== locale) {
    const selected = dialog.querySelector('[data-language-choice="' + saved + '"]');
    location.replace(targetFor(selected).href);
  }
})();

