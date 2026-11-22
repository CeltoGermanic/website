const fs = require('node:fs');
const path = require('node:path');

const images = {
 world: ['Martin Waldseemüller · World map, 1507', 'Woodcut world map by Martin Waldseemüller', 'https://commons.wikimedia.org/wiki/File:Waldseemuller_map_2.jpg', 'Public domain'],
 azores: ['Abraham Ortelius · Acores Insulae', 'Engraved map of the Azores with the islands arranged across the Atlantic', 'https://commons.wikimedia.org/wiki/File:Map_of_the_Azore_Islands_by_Abraham_Ortelius.jpeg', 'Folger Shakespeare Library · Public domain'],
 galicia: ['Fernando Ojea and Joan Blaeu · Gallaecia Regnum', 'Engraved map of Galicia showing its rivers, coastal towns and terrain', 'https://commons.wikimedia.org/wiki/File:Gallaecia,_Regnum_de_Blaeu_(2).jpg', 'Public domain'],
 flanders: ['Willem Blaeu · Flandria et Zeelandia Comitatus', 'Historical map of Flanders and Zeeland with engraved cartouches', 'https://commons.wikimedia.org/wiki/File:Willem_Blaeu,_Flandria_et_Zeelandia_Comitatus_(FL35075134_2537703).jpg', 'Public domain'],
 weser: ['Matthäus Merian · Bremen, 1641', 'Engraved view of Bremen and the Weser', 'https://commons.wikimedia.org/wiki/File:Bremen-1641-Merian.jpg', 'Public domain'],
 plata: ['Willem Blaeu · The province of Río de la Plata', 'Early European map of the Río de la Plata basin, with rivers and place names', 'https://commons.wikimedia.org/wiki/File:Paraguay,_or_the_Province_of_the_Rio_de_la_Plata,_with_the_Adjacent_Regions_Tucamen_and_Santa_Cruz_de_la_Sierra_WDL1101.png', 'Public domain'],
 desterro: ['José Custódio de Sá e Faria · Ilha de Santa Catarina', 'Historical map showing Santa Catarina island, the channel, and the adjacent mainland', 'https://commons.wikimedia.org/wiki/File:Mapa_da_Ilha_de_Santa_Catarina,_com_o_canal_e_a_terra_firme.png', 'Public domain'],
 quran: ['Qur’an folio · 8th–9th century', 'Brown Kufic script and coloured reading marks on a Qur’an folio', 'https://www.metmuseum.org/art/collection/search/453246', 'The Met · Open Access CC0'],
 'quran-1137': ['Qur’an folio · 531 AH / 1137 CE', 'Manuscript folio with eastern Kufic calligraphy and gold illumination', 'https://www.metmuseum.org/art/collection/search/453369', 'The Met · Open Access CC0'],
 islands: ['Wayag, Raja Ampat · Rolandandika', 'Green tropical islands and steep forested slopes in the waters of Raja Ampat', 'https://commons.wikimedia.org/wiki/File:The_Other_Side_of_Wayag_Island.jpg', 'CC BY-SA 4.0 · resized for the web', 'https://creativecommons.org/licenses/by-sa/4.0/']
};

const places = {
 azores:['Azores','family',38.66,-28.07,'The archipelago is a regional reference for Azorean Portuguese heritage.','azorean','https://en.wikipedia.org/wiki/Azores'],
 galicia:['Galicia','family',42.8,-7.9,'A region associated with Galician heritage and an interest in its language and history.','galician','https://en.wikipedia.org/wiki/Galicia_(Spain)'],
 flanders:['Flanders','family',51,4.5,'Modern Flanders provides geographic orientation for the historical region of Flanders.','flemish','https://en.wikipedia.org/wiki/Flanders'],
 plata:['Río de la Plata','history',-35.6667,-55.7833,'A regional landmark for the history of the Charrúa and neighbouring Indigenous peoples.','charrua','https://en.wikipedia.org/wiki/R%C3%ADo_de_la_Plata'],
 florianopolis:['Florianópolis / Desterro','history',-27.59255,-48.5581625,'Formerly Nossa Senhora do Desterro, a point of reference for the history of Azorean settlement in Santa Catarina.','azorean','https://en.wikipedia.org/wiki/Florian%C3%B3polis'],
 bremen:['Bremen','study',53.07583,8.80722,'A Hanseatic port and a point of orientation for the Weser basin.','history','https://en.wikipedia.org/wiki/Bremen'],
 hanover:['Hanover','study',52.36667,9.71667,'A place to study the historical administration and politics of northern Germany.','germanic','https://en.wikipedia.org/wiki/Hanover'],
};
const types = {family:'Heritage region',history:'Historical region',study:'Research interest'};
const views = {
 atlantic:{label:'Atlantic', bounds:[-108,-47,49,65], places:['azores','flanders','galicia','florianopolis','plata'], interval:20},
 europe:{label:'Continental Europe', bounds:[-16,37,18,57], places:['galicia','flanders','bremen','hanover'], interval:5},
 weser:{label:'Lower Weser', bounds:[7.8,52.15,10.35,53.57], places:['bremen','hanover'], interval:0.5},
 brazil:{label:'Santa Catarina', bounds:[-49.8,-28.17,-48.13,-27.13], places:['florianopolis'], interval:0.25}
};

function position(bounds, lon, lat) {
 const [west,south,east,north] = bounds;
 return [(lon-west)/(east-west),(north-lat)/(north-south)];
}

function writeBasemaps(root) {
 const land = require('./natural-earth-land.json');
 const detail = require('./natural-earth-regional.json');
 for (const [key,view] of Object.entries(views)) {
  const bounds = view.bounds;
  const [west,south,east,north] = bounds;
  const width = 840;
  const height = key === 'atlantic' ? 514 : 450;
  const project = (lon,lat) => position(bounds,lon,lat)
   .map((value,index) => (value * (index === 0 ? width : height)).toFixed(1)).join(',');
  const rings = detail[key] || land.features.flatMap(({geometry}) =>
   geometry.type === 'MultiPolygon' ? geometry.coordinates.flat() : geometry.coordinates);
  let outline = '';
  for (const ring of rings) {
   if (ring.every(([x]) => x < west) || ring.every(([x]) => x > east)
    || ring.every(([,y]) => y < south) || ring.every(([,y]) => y > north)) continue;
   outline += 'M' + ring.map(([lon,lat]) => project(lon,lat)).join('L') + 'Z';
  }
  let guides = '';
  for (let x = Math.ceil(west / view.interval) * view.interval; x < east; x += view.interval)
   guides += 'M' + project(x,south) + 'L' + project(x,north);
  for (let y = Math.ceil(south / view.interval) * view.interval; y < north; y += view.interval)
   guides += 'M' + project(west,y) + 'L' + project(east,y);
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+width+' '+height+'">'
   + '<rect width="100%" height="100%" fill="#141f20"/>'
   + '<path d="'+outline+'" fill="#28352d" fill-rule="evenodd" stroke="#697b68" stroke-width="1.1"/>'
   + '<path d="'+guides+'" fill="none" stroke="#9abaab" stroke-opacity=".18" stroke-dasharray="3 5"/>'
   + '<text x="24" y="33" fill="#c8bca4" font-size="18" font-family="serif">N</text><path d="M29 40l-5 13 5-3 5 3z" fill="#c8bca4"/>'
   + '</svg>';
  fs.writeFileSync(path.join(root,'assets','images','atlas-'+key+'.svg'),svg);
 }
}

const dates = [
 [1507,'europe','world','Waldseemüller’s world map','An early European world map depicts the Atlantic between the Americas and Europe and Africa.'],
 [1641,'europe','weser','Bremen and the Weser','Merian’s engraving shows the trading city and its river setting.'],
 [1748,'south-america','azores','Azorean settlement at Desterro','The first group in the organized Azorean settlement of Santa Catarina arrived off Desterro.'],
 [1831,'south-america','charrua','Salsipuedes','Uruguayan state forces attacked Charrúa people at Salsipuedes, now a site of memory.']
];
const periods = [
 ['Mesolithic',4,'The smallest period group in this study. That scarcity limits comparisons within the period.'],
 ['Neolithic',44,'The study traces the arrival of Anatolian farmer-related ancestry and later changes involving hunter-gatherer-related ancestry.'],
 ['Copper Age',47,'These samples help set a baseline before ancestry related to steppe populations became widespread in Iberia.'],
 ['Bronze Age',53,'The authors report major changes in genome-wide ancestry and in paternal lineages after roughly 2000 BCE.'],
 ['Iron Age',24,'Sampling spans groups with different languages, complicating efforts to equate language with one genetic history.'],
 ['Historical period',99,'The largest period group. Later samples illuminate gene flow involving the Mediterranean and North Africa.']
];

module.exports = {images, places, types, views, position, writeBasemaps, dates, periods};

