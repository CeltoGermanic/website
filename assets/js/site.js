'use strict';

const archiveText = (english, portuguese) => document.documentElement.lang === 'pt-BR' ? portuguese : english;

const nav = document.querySelector('#primary-nav');
const toggle = document.querySelector('.menu-toggle');
const narrow = matchMedia('(max-width: 1250px)');
const dropdowns = [...nav.querySelectorAll('.nav-drop')];

function setMobileMenu(open) {
  toggle.setAttribute('aria-expanded', String(open));
  nav.hidden = narrow.matches && !open;
  if (!open) dropdowns.forEach((item) => { item.open = false; });
}

function syncNavigation() {
  toggle.hidden = !narrow.matches;
  setMobileMenu(false);
}

syncNavigation();
narrow.addEventListener('change', syncNavigation);
toggle.addEventListener('click', () => setMobileMenu(toggle.getAttribute('aria-expanded') === 'false'));

dropdowns.forEach((item) => item.addEventListener('toggle', () => {
  if (!item.open) return;
  dropdowns.filter((other) => other !== item).forEach((other) => { other.open = false; });
}));

document.addEventListener('click', (event) => {
  dropdowns.forEach((item) => {
    if (!item.contains(event.target)) item.open = false;
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  const open = dropdowns.find((item) => item.open);
  if (open) {
    open.open = false;
    open.querySelector('summary').focus();
  } else if (narrow.matches && !nav.hidden) {
    setMobileMenu(false);
    toggle.focus();
  }
});


