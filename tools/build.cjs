const fs = require('node:fs');
const path = require('node:path');
const { pages: heritage } = require('./heritage.cjs');
const reading = require('./reading.cjs');
const exhibits = require('./exhibits.cjs');
const ptExhibits = require('./pt-exhibits.cjs');
const ptContent = { ...require('./pt-heritage.cjs'), ...require('./pt-reading.cjs') };
const ptUI = require('./pt-ui.cjs');

const root = path.join(__dirname, '..');
const english = {...heritage, ...reading};

function localizePages() {
 return Object.fromEntries(Object.entries(english).map(([key, page]) => {
  const [title, category, intro, translated] = ptContent[key];
  if (translated.length !== page.sections.length) throw new Error('Section count differs for '+key);
  const sections = page.sections.map(([, , links, exhibit], i) => [...translated[i], links, exhibit]);
  return [key, {...page, title, category, intro, sections}];
 }));
}

function buildLanguage(locale) {
 const portuguese = locale === 'pt-BR';
 const otherLocale = portuguese ? 'en' : 'pt-BR';
 const suffix = portuguese ? '.pt' : '';
 const t = (name) => portuguese ? (ptUI[name] ?? name) : name;
 const pages = portuguese ? localizePages() : english;
 const { position } = exhibits;
 const dates = portuguese ? exhibits.dates.map(([year, region, key]) => [year, region, key, ...ptExhibits.dates[key]]) : exhibits.dates;
 const mapValues = (input, map) => Object.fromEntries(Object.entries(input).map(([key, value]) => [key, map(value,key)]));
 const types = mapValues(exhibits.types, label => t(label));
 const views = mapValues(exhibits.views, view => ({...view, label:t(view.label)}));
 const images = portuguese ? mapValues(exhibits.images, (value, key) => [...ptExhibits.images[key], value[2], t(value[3]), value[4]]) : exhibits.images;
 const places = portuguese ? mapValues(exhibits.places, (value, key) => [ptExhibits.places[key][0], ...value.slice(1,4), ptExhibits.places[key][1], ...value.slice(5)]) : exhibits.places;
 const periods = portuguese ? exhibits.periods.map(([, count], i) => [ptExhibits.periods[i][0], count, ptExhibits.periods[i][1]]) : exhibits.periods;
 const name = t("Between Continents");
 const headline = t("Between Continents, Histories & Generations.");
 const subtitle = t("A personal archive of heritage, faith, history, and intellectual interests.");
 const slug = (value) => value.normalize('NFD').replace(/\p{M}/gu,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
 const clean = (value) => value.replace(/<[^>]*>/g,'');
 const escape = (value) => String(value).replace(/[&<>"']/g, (char) =>
  ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[char]);
 const url = (key, language = locale) => key + (language === 'pt-BR' ? '.pt' : '') + '.html';
 const exhibitAnchors = {tree:'family-tree', timeline:'genealogical-timeline'};
 const sectionId = (key, i) => {
  const [title, , , exhibit] = english[key].sections[i];
  return exhibitAnchors[exhibit] ?? slug(title);
 };
 const htmlLink = (href, label, attributes = '') => '<a href="'+escape(href)+'"'+attributes+'>'+escape(label)+'</a>';
 const pageLink = (key, label = pages[key].title) => htmlLink(url(key),label);
 const file = (image) => 'assets/images/'+image+'.webp';
 const thumb = (image) => 'assets/images/'+image+'-thumb.webp';
 const source = ([label,href]) => htmlLink(href,t(label));
 const searchIcon = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="10.5" cy="10.5" r="5.5"/><path d="m14.5 14.5 4 4"/></svg>';
 const compass = '<svg viewBox="0 0 48 48" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.15"><circle cx="24" cy="24" r="17"/><path d="M24 1.5v45M1.5 24h45M12 12l24 24m0-24L12 36" opacity=".55"/><path d="m24 5 3.6 15.4L43 24l-15.4 3.6L24 43l-3.6-15.4L5 24l15.4-3.6z"/><path d="m24 10 2.3 11.7L38 24l-11.7 2.3L24 38l-2.3-11.7L10 24l11.7-2.3z" fill="currentColor"/></svg>';
 const nav = [
  ['index',t("Home")],['about',t("About")],['heritage',t("Heritage"),['azorean','galician','germanic','flemish','charrua']],
  ['genealogy',t("Genealogy")],['islam',t("Islam"),['athari','islamic-history','scholarship']],['history',t("History")],
  ['genetics',t("Genetics")],['languages',t("Languages")],['technology',t("Technology")],['gaming',t("Gaming")]
 ];

 function languageControl(key) {
  const label = portuguese ? 'Read in English' : 'Ler em português';
  return '<a class="language-switch" href="'+url(key,otherLocale)+'" hreflang="'+otherLocale+'" lang="'+otherLocale
   +'" aria-label="'+label+'" title="'+label+'" data-language-choice="'+otherLocale+'">'+(portuguese?'EN':'PT')+'</a>';
 }

 function chooseLanguage() {
  const items = [['en','en','English'],['pt-BR','pt','Português']];
  return '<dialog class="language-dialog" data-language-dialog aria-labelledby="language-title"><div class="language-panel">'
   +'<div class="language-compass">'+compass+'</div><h2 id="language-title" tabindex="-1" autofocus>English or Portuguese?</h2>'
   +'<p lang="pt-BR">Inglês ou português?</p><div class="language-options">'
   +items.map(([language,flag,label]) => '<a href="'+url('index',language)+'" hreflang="'+language+'" lang="'+language
    +'" data-language-choice="'+language+'"><img src="assets/images/flag-'+flag+'.svg" alt=""><span>'+label+'</span></a>').join('')
   +'</div></div></dialog>';
 }

 function header(active) {
  const menu = nav.map(([key,label,children]) => {
   const branch = key === active || children?.includes(active);
   const link = htmlLink(url(key),label,key === active ? ' aria-current="page"' : '');
   return '<li class="nav-item'+(branch ? ' current' : '')+'">'+link+(children
    ? '<details class="nav-drop"><summary aria-label="'+label+t(' pages')+'"><span aria-hidden="true"></span></summary><ul>'
       +children.map(child => '<li>'+htmlLink(url(child),pages[child].title,
         child === active ? ' aria-current="page"' : '')+'</li>').join('')+'</ul></details>' : '')+'</li>';
  }).join('');
  return '<a class="skip" href="#main">'+t("Skip to content")+'</a><header class="site-header"><div class="wrap masthead">'
   + '<a class="brand" href="'+url('index')+'">'+compass+'<span><b>'+t("Between Continents")+'</b><small>'+t("Personal Archive")+'</small></span></a>'
   + '<button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-nav" hidden>'+t("Menu")+'</button>'
   + '<nav id="primary-nav" aria-label="'+t("Primary")+'"><ul>'+menu+'</ul></nav>'
   + '<a class="search-trigger" href="'+url('search')+'" aria-label="'+t("Search the archive")+'">'+searchIcon+'</a>'+languageControl(active)+'</div></header>';
 }

 function footer() {
  return '<footer class="site-footer"><div class="wrap footer-grid"><div class="brand footer-brand">'+compass
   +'<div><b>'+t("Between Continents")+'</b><small>'+t("A Brazilian personal archive")+'</small></div></div>'
   +'<nav aria-label="'+t("Footer")+'">'+pageLink('about')+pageLink('heritage')+pageLink('genealogy')
   +htmlLink(url('sources'),t("Sources & image credits"))+htmlLink(url('search'),t("Search"))+'</nav></div></footer>';
 }

 function document(key, title, description, content, {image, scripts=[]} = {}) {
  const fullTitle = key === 'index' ? headline : title + ' | ' + name;
  return '<!doctype html>\n<html lang="'+locale+'"><head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n'
   +'<meta name="description" content="'+escape(clean(description))+'">\n<meta name="theme-color" content="#161a18">\n'
   +'<meta property="og:locale" content="'+(portuguese ? 'pt_BR' : 'en_US')+'">\n<meta property="og:type" content="website"><meta property="og:title" content="'+escape(fullTitle)+'">\n'
   +'<meta property="og:description" content="'+escape(clean(description))+'">\n'
   +(image ? '<meta property="og:image" content="'+file(image)+'">\n' : '')
   +'<title>'+escape(fullTitle)+'</title><link rel="icon" href="assets/images/compass.svg" type="image/svg+xml">\n'
   +'<link rel="alternate" hreflang="en" href="'+url(key,'en')+'">\n<link rel="alternate" hreflang="pt-BR" href="'+url(key,'pt-BR')+'">\n'
   +'<link rel="stylesheet" href="assets/css/site.css">\n'
   +['site','language',...scripts].map(script => '<script src="assets/js/'+script+'.js" defer></script>').join('\n')
   +'\n</head><body>\n'+header(key)+'\n<main id="main">'+content+'</main>\n'+footer()+(key === 'index' && !portuguese ? chooseLanguage() : '')+'\n</body></html>\n';
 }

 function figure(key, modifier = '') {
  const [credit,alt,link,license,licenseURL] = images[key];
  return '<figure class="plate '+modifier+'"><img src="'+file(key)+'" alt="'+escape(alt)+'" decoding="async">'
   +'<figcaption>'+htmlLink(link,credit)+' <span>'+ (licenseURL ? htmlLink(licenseURL,license) : escape(license))+'</span></figcaption></figure>';
 }
 const trails = [
  ['azorean',t("Azorean Portuguese"),t("The Atlantic islands and the maternal lines of Desterro."),'azores'],
  ['galician',t("Galician"),t("Family memory, language and the northwestern Iberian borderlands."),'galicia'],
  ['germanic',t("Germanic · Weber"),t("The Weber surname and German-speaking regional history."),'weser'],
  ['flemish',t("Flemish"),t("The Low Countries and the family’s Flemish-Germanic heritage."),'flanders'],
  ['charrua',t("My Charrúa Heritage"),t("Family memory and Indigenous continuity in the Río de la Plata."),'plata']
 ];

 function home() {
  const cards = trails.map(([key,title,desc,image]) => '<a class="heritage-card" href="'+url(key)
   +'"><img src="'+thumb(image)+'" alt="" loading="lazy" decoding="async"><div><h3>'+title+'</h3><p>'+desc+'</p></div></a>').join('');
  const homeEntry = (key,t,d) => '<li><a href="'+url(key)+'"><h3>'+t+'</h3><p>'+d+'</p></a></li>';
  return '<div class="hero"><div class="wrap hero-layout"><div class="hero-copy">'
   +'<p class="eyebrow"><i></i>'+t("A Brazilian personal archive")+'</p>'
   +'<h1>'+t("Between Continents,<br class=\"wide-break\"> Histories <em>&amp;</em><br class=\"wide-break\"> Generations<span>.</span>")+'</h1>'
   +'<p class="hero-sub">'+subtitle+'</p>'
   +'<p class="hero-note">'+t("I’m Brazilian and Muslim. This archive brings together the stories I inherited, the faith I practice, and the subjects I keep returning to.")+'</p>'
   +'<div class="actions"><a class="button primary" href="'+url('heritage')+'#ancestry-atlas">'+t("Explore the ancestry atlas")+'</a><a class="button secondary" href="'+url('about')+'">'+t("About this archive")+'</a></div></div>'
   +'<figure class="hero-art"><div class="hero-map"><img src="'+file('world')+'" alt="'+images.world[1]+'" fetchpriority="high"></div>'
   +'<figcaption>'+htmlLink(images.world[2], t("Waldseemüller world map · 1507"))+'</figcaption></figure></div></div>'
   +'<section class="wrap home-heritage" aria-labelledby="roots"><div class="section-head"><div><p class="eyebrow">'+t("Family &amp; place")+'</p><h2 id="roots">'+t("Ancestral Threads")+'</h2></div>'
   +'<a class="text-link" href="'+url('heritage')+'">'+t("View all heritage")+'</a></div><div class="heritage-grid">'+cards+'</div></section>'
   +'<section class="home-feature"><div class="wrap feature-grid">'
   +'<div class="feature-text"><p class="eyebrow">'+t("Faith &amp; learning")+'</p><h2>'+t("Islam &amp; the<br>Manuscript Library")+'</h2>'
   +'<p>'+t("I identify with the Athari creed and strive to follow the Salaf al-Ṣāliḥ. The library traces the early generations, classical scholarship and the care with which religious knowledge was transmitted.")+'</p>'
   +'<div class="actions"><a class="button primary" href="'+url('islam')+'">'+t("My Muslim identity")+'</a><a class="text-link" href="'+url('scholarship')+'">'+t("Classical scholarship")+'</a></div></div>'
   +figure('quran','feature-plate')+'</div></section>'
   +'<section class="wrap home-reading" aria-labelledby="reading"><div class="section-head"><div><p class="eyebrow">'+t("Research &amp; interests")+'</p><h2 id="reading">'+t("From the Archive")+'</h2></div></div><ul class="entry-list">'
   +homeEntry('genealogy',t("Genealogy"),t("Weber, family branches and a regional timeline."))
   +homeEntry('genetics',t("Population Genetics"),t("G25, ancient DNA and the limits of genetic proximity."))
   +homeEntry('history',t("Historical Interests"),t("Europe, the Río de la Plata and the classical Islamic world."))
   +homeEntry('languages',t("Languages"),t("Arabic terminology, Galician and historical Germanic."))
   +homeEntry('technology',t("Technology"),t("A small web, local AI and computing hardware."))
   +homeEntry('gaming',t("Gaming &amp; Digital Culture"),t("Counter-Strike 2 HvH, Far Cry 3 and the collection."))
   +'</ul></section>';
 }

 function atlas() {
  const first = 'atlantic';
  const controls = Object.entries(views).map(([key,v]) => '<button type="button" data-atlas-view="'+key+'" aria-pressed="'+(key === first)+'">'+v.label+'</button>').join('');
  const legend = Object.entries(types).map(([key,label]) => '<li><span class="symbol '+key+'" aria-hidden="true"></span>'+label+'</li>').join('');
  const maps = Object.entries(views).map(([key,v]) => '<div data-view="'+key+'"'+(key === first ? '' : ' hidden')+'>'
   +'<div class="map-frame"><img src="assets/images/atlas-'+key+'.svg" alt="" loading="lazy">'
   +v.places.map(id => {
    const [label,type,lat,lon] = places[id];
    const [x,y] = position(v.bounds,lon,lat);
    return '<button type="button" class="marker '+type+'" aria-label="'+escape(label)+'" aria-pressed="false" data-place="'+id
     +'" style="--x:'+(x*100).toFixed(2)+'%;--y:'+(y*100).toFixed(2)+'%"><span></span></button>';
   }).join('')+'</div><div class="place-choices" aria-label="'+v.label+t(' places')+'">'
   +v.places.map(id => '<button type="button" data-place="'+id+'" aria-pressed="false">'+escape(places[id][0])+'</button>').join('')
   +'</div></div>').join('');
  const entries = Object.entries(places).map(([id,[label,type,,,desc,page,coord]]) =>
   '<div data-place-entry="'+id+'" hidden><p class="eyebrow">'+types[type]+'</p><h3>'+escape(label)+'</h3><p>'+escape(desc)+'</p>'
   +'<p class="map-links">'+pageLink(page)+' '+htmlLink(coord,t("Locator source"))+'</p></div>').join('');
  const fallback = Object.values(places).map(([label,type,,,description,page]) =>
   '<li><strong>'+escape(label)+'</strong> · '+types[type]+'. '+escape(description)+' '+pageLink(page)+'</li>').join('');
  return '<div class="exhibit atlas" data-atlas><noscript><ul>'+fallback+'</ul></noscript><div data-interactive hidden>'
   +'<div class="control-row" aria-label="'+t("Map regions")+'">'+controls+'</div><ul class="legend">'+legend+'</ul>'
   +maps+'<div class="place-info" aria-live="polite"><p data-place-prompt>'+t("Choose a place to read its connection.")+'</p>'+entries+'</div></div>'
   +'<p class="caption">'+t("Modern locator map")+' · '+htmlLink('https://www.naturalearthdata.com/',t("Natural Earth coastline"))+ ' · '+t('Select markers or place names.')+'</p></div>';
 }

 function tree() {
  const branches = [
   ['Weber',['germanic','flemish']],
   [t('Maternal Azorean and Galician heritage'),['azorean','galician']],
   [t('Charrúa heritage'),['charrua']]
  ];
  return '<div class="exhibit tree">'+branches.map(([label, links], i) =>
   '<details'+(i === 0 ? ' open' : '')+'><summary>'+escape(label)+'</summary><div class="tree-body">'
   +sectionLinks(links)+'</div></details>').join('')+'</div>';
 }

 function timeline() {
  return '<div class="exhibit" data-timeline><div class="control-row" data-timeline-controls hidden aria-label="'+t("Timeline filters")+'">'
   +'<button type="button" aria-pressed="true" data-time-filter="all">'+t("All places")+'</button>'
   +'<button type="button" aria-pressed="false" data-time-filter="europe">'+t("Europe")+'</button>'
   +'<button type="button" aria-pressed="false" data-time-filter="south-america">'+t("South America")+'</button></div>'
   +'<output class="sr-only" data-timeline-status aria-live="polite"></output><ol class="timeline">'
   +dates.map(([date,region,,title,description]) => '<li data-time-region="'+region+'"><time datetime="'+date+'">'+date+'</time><div><h3>'
     +escape(title)+'</h3><p>'+escape(description)+'</p></div></li>').join('')+'</ol></div>';
 }

 function cabinet() {
  const plates = ['world','azores','galicia','flanders','weser','plata','desterro'];
  return '<div class="exhibit cabinet" data-cabinet><div class="cabinet-tools" data-cabinet-tools hidden>'
   +'<label>'+t("Historical plate")+'<select data-plate-select>'+plates.map((k) => '<option value="'+k+'">'+escape(images[k][0])+'</option>').join('')
   +'</select></label><div class="control-row"><button type="button" data-zoom="out" aria-label="'+t("Zoom out")+'">−</button><button type="button" data-zoom="in" aria-label="'+t("Zoom in")+'">+</button><button type="button" data-zoom="reset">'+t("Reset")+'</button></div></div>'
   +'<div data-plate-viewport class="plate-viewport" tabindex="0" role="region" aria-label="'+t("Historical map viewer")+'"><img src="'+file('world')+'" alt="'+images.world[1]+'" data-plate-image loading="lazy"></div>'
   +'<p class="caption" aria-live="polite"><a data-plate-credit href="'+images.world[2]+'">'+images.world[0]+'</a> · <output data-zoom-status>100%</output></p>'
   +'<noscript><ul>'+plates.map((k) => '<li>'+htmlLink(file(k),images[k][0])+'</li>').join('')+'</ul></noscript></div>';
 }

 function study() {
  return '<div class="exhibit study" data-study><p class="caption">'+t("Samples per period")+' · Olalde et al. (2019) · n = 271</p>'
   +'<ul class="study-bars">'+periods.map(([label,count,desc],i) => '<li><button type="button" data-period="'+i+'" aria-pressed="'+(i===0)
   +'" aria-describedby="period-'+i+'" style="--bar:'+count+'%"><span>'+label+'</span><strong>'+count+'</strong></button>'
   +'<p id="period-'+i+'" data-period-info>'+escape(desc)+'</p></li>').join('')+'</ul></div>';
 }

 function coordinates() {
  return '<div class="exhibit coordinates"><noscript><p>'+t("Enable JavaScript to compare coordinates locally.")+'</p></noscript>'
   +'<form data-coordinate-form novalidate hidden><div class="coordinate-inputs"><label for="coordinate-target">'+t("Target row")
   +'<textarea id="coordinate-target" required maxlength="2000" rows="4" spellcheck="false" placeholder="'+t("Target, [25 coordinates]")+'"></textarea></label>'
   +'<label for="coordinate-refs">'+t("Reference rows, one per line")
   +'<textarea id="coordinate-refs" required maxlength="200000" rows="4" spellcheck="false" placeholder="'+t("Reference name, [25 coordinates]")+'"></textarea></label></div>'
   +'<div class="actions"><button class="button primary" type="submit">'+t("Compare coordinates")+'</button><button class="button secondary" type="reset">'+t("Clear")+'</button></div>'
   +'<output class="coordinate-status" role="status"></output><div data-coordinate-results hidden><div class="scatter-wrap"><canvas width="720" height="420" aria-label="'+t("Scatter plot of input axes 1 and 2")+'" role="img"></canvas></div>'
   +'<table><caption>'+t("Ranked Euclidean distance from target")+'</caption><thead><tr><th scope="col">'+t("Reference")+'</th><th scope="col">'+t("Distance")+'</th><th scope="col">'+t("Axis 1")+'</th><th scope="col">'+t("Axis 2")+'</th></tr></thead><tbody></tbody></table></div></form></div>';
 }

 const render = { atlas, tree, timeline, cabinet, coordinates, study };

 function sectionLinks(keys) {
  return keys?.length ? '<ul class="related">'+keys.map(key => '<li>'+pageLink(key)+'</li>').join('')+'</ul>' : '';
 }

 function article(key, page) {
  const parent = nav.find((item) => item[2]?.includes(key));
  const crumbs = '<nav class="breadcrumb" aria-label="'+t("Breadcrumb")+'"><a href="'+url('index')+'">'+t("Archive")+'</a><span>/</span>'
   +(parent ? pageLink(parent[0],parent[1])+'<span>/</span>' : '')+'<span aria-current="page">'+escape(page.title)+'</span></nav>';
  const refs = page.sources?.length ? '<section id="sources" class="article-sources"><h2>'+t("Sources &amp; further reading")+'</h2><ul>'
   +page.sources.map(ref => '<li>'+source(ref)+'</li>').join('')+'</ul></section>' : '';
  const supports = [...new Set(page.sections.map((s) => s[3]).filter(Boolean))];
  const scripts = supports.some((s) => ['atlas','timeline','cabinet','study','coordinates'].includes(s)) ? (supports.includes('cabinet') ? ['plates'+suffix,'exhibits'] : ['exhibits']) : [];
  const context = page.sections.length > 2 ? '<aside class="local-index"><nav aria-label="'+t("On this page")+'"><p class="eyebrow">'+t("On this page")+'</p>'
   + '<ul>'+page.sections.map(([title],i) => '<li>'+htmlLink('#'+sectionId(key,i),title)+'</li>').join('')+
     (refs ? '<li><a href="#sources">'+t("Sources")+'</a></li>' : '')+'</ul></nav></aside>' : '';
  const sections = page.sections.map(([title,copy,links,type],i) => '<section id="'+sectionId(key,i)+'"><h2>'+escape(title)+'</h2>'+copy
   +(type ? render[type]() : '')+sectionLinks(links)+'</section>').join('');
  return document(key,page.title,page.intro,
   '<div class="article-top"><div class="wrap">'+crumbs+'<div class="article-intro'+(page.image ? ' with-image' : '')+'"><div>'
   +'<p class="eyebrow"><i></i>'+escape(page.category)+'</p><h1>'+escape(page.title)+'</h1><p class="standfirst">'+page.intro+'</p></div>'
   +(page.image ? figure(page.image,'article-plate') : '')+'</div></div></div><div class="wrap article-layout">'
   +context+'<article class="article-body">'+sections+refs+'</article></div>',
   {image:page.image,scripts});
 }

 function searchPage() {
  return document('search',t("Search"),t("Find pages and sections in the personal archive."),
   '<div class="wrap utility-page"><p class="eyebrow">'+t("Archive index")+'</p><h1>'+t("Search the Archive")+'</h1>'
   +'<label class="search-label" for="search-query">'+t("Search people, places and topics")+'</label>'
   +'<input id="search-query" type="search" placeholder="'+t("Try Weber, manuscripts or Charrúa")+'" autocomplete="off">'
   +'<p data-search-status aria-live="polite">'+t("Browse the archive index or enter a term to search.")+'</p><ol class="search-results" data-search-results>'
   +Object.entries(pages).map(([key,p])=>'<li>'+pageLink(key)+'<p>'+p.intro+'</p></li>').join('')
   +'</ol></div>',{scripts:['search-index'+suffix,'search']});
 }

 function sourcesPage() {
  const items = Object.entries(images).map(([key,[title,alt,href,license,licenseURL]]) => '<li><img src="'+thumb(key)+'" alt="" loading="lazy"><div>'
   +htmlLink(href,title)+'<p>'+ (licenseURL ? htmlLink(licenseURL,license) : escape(license))+'</p></div></li>').join('');
  return document('sources',t("Sources & image credits"),t("Source notes, visual credits and map data for Between Continents."),
   '<div class="wrap utility-page"><p class="eyebrow">'+t("Archive notes")+'</p><h1>'+t("Sources &amp; Image Credits")+'</h1>'
   +'<p class="standfirst">'+t("Page notes point to the records, catalogues and studies behind each topic. Plate credits identify the source and rights of each image.")+'</p>'
   +'<h2>'+t("Geographic sources")+'</h2><ul class="source-list">'
   +'<li><a href="'+url('heritage')+'#ancestry-atlas">'+t("Locator sources in the ancestry atlas")+'</a></li>'
   +'<li>'+htmlLink('https://www.naturalearthdata.com/about/terms-of-use/',t("Natural Earth land polygons · Public domain"))+'</li></ul>'
   +'<h2>'+t("Maps, manuscripts and photography")+'</h2><ul class="credits">'+items+'</ul>'
   +'<h2>'+t('Language selector flags')+'</h2><ul class="source-list"><li>'
   +source(['Dixie flag · Public domain','https://commons.wikimedia.org/wiki/File:Confederate_Rebel_Flag.svg'])+'</li><li>'
   +source(['Flag of Brazil · Public domain','https://commons.wikimedia.org/wiki/File:Flag_of_Brazil.svg'])+'</li></ul>'+'</div>');
 }

 const write = (key, content) => fs.writeFileSync(path.join(root,url(key)),content);
 if (!portuguese) fs.writeFileSync(path.join(root,'assets/images/compass.svg'),compass.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" color="#b9a371" '));
 write('index',document('index',headline,subtitle,home(),{image:'world'}));
 for (const [key,page] of Object.entries(pages)) write(key,article(key,page));
 write('search',searchPage());
 write('sources',sourcesPage());

 const index = Object.entries(pages).flatMap(([key,p]) => [
  {title:p.title, page:p.title, href:url(key), text:clean(p.intro)},
  ...p.sections.map(([title,copy],i) => ({title, page:p.title, href:url(key)+'#'+sectionId(key,i), text:clean(copy)}))
 ]);
 index.push({title:t("Sources & image credits"),page:t("Archive"),href:url('sources'),text:t("Manuscripts, maps, licenses, visual credits.")});
 fs.writeFileSync(path.join(root,'assets/js/search-index'+suffix+'.js'),'// Generated by tools/build.cjs\nwindow.archiveSearchIndex = '+JSON.stringify(index)+';\n');
 const atlasPlates = Object.fromEntries(['world','azores','galicia','flanders','weser','plata','desterro'].map((k) => [k,images[k].slice(0,3)]));
 fs.writeFileSync(path.join(root,'assets/js/plates'+suffix+'.js'),'// Generated by tools/build.cjs\nwindow.archivePlates = '+JSON.stringify(atlasPlates)+';\n');
 console.log('Built '+(Object.keys(pages).length+3)+' '+locale+' pages.');
}

exhibits.writeBasemaps(root);
buildLanguage('en');
buildLanguage('pt-BR');

