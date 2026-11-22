
const azores = ['Casa dos Açores and the settlement of Santa Catarina · ALESC', 'https://alesc.sc.gov.br/tv/noticia/pgm-208-ponto-org-casa-dos-acores-museu-etnografico-biguacu-11-04-23/'];
const galician = ['History of the Galician language · Consello da Cultura Galega', 'https://consellodacultura.gal/especiais/loia/historia.php?id=45&idioma=1'];
const diaspora = ['Historias de ida e volta · Arquivo da Emigración Galega', 'https://consellodacultura.gal/especiais/historias-de-ida-e-volta/'];
const iberia = ['Bycroft et al. · Genetic differentiation in Iberia (2019)', 'https://doi.org/10.1038/s41467-018-08272-w'];
const batches = ['Galician population structure and batch effects · GALOMICS reanalysis (2026)', 'https://pubmed.ncbi.nlm.nih.gov/42466104/'];
const flanders = ['Historic Centre of Brugge · UNESCO', 'https://whc.unesco.org/en/list/996'];
const charrua = ['Paso de Salsipuedes · Uruguay’s National Human Rights Institution', 'https://www.gub.uy/institucion-nacional-derechos-humanos-uruguay/comision-nacional-honoraria-sitios-memoria/sitios-memoria/paso-salsipuedes-territorio-masacre'];
const descendants = ['Open letter from the Asociación de Descendientes de la Nación Charrúa (2021)', 'https://www.gub.uy/institucion-nacional-derechos-humanos-uruguay/sites/institucion-nacional-derechos-humanos-uruguay/files/documentos/publicaciones/18_ADENCH.pdf'];
const memory = ['Los charrúas en la historia uruguaya · Uruguay’s National Accounting Office exhibit', 'https://patrimonio.servicios.cgn.gub.uy/exhibits/show/los-charr--as-en-la-historia-u'];
const uruguayDNA = ['Lindo et al. · Genomic prehistory of the Indigenous peoples of Uruguay (2022)', 'https://doi.org/10.1093/pnasnexus/pgac047'];

const pages = {
 heritage: {
  title: 'Heritage', category: 'Family & place',
  intro: 'Five histories meet in my family. They extend from the Azores and the northwest Iberian borderlands to the North Sea, Santa Catarina and the Río de la Plata.',
  image: 'azores',
  sections: [
   ["Five strands of family history", "<p>My maternal heritage is predominantly Azorean Portuguese and also includes Galician ancestry. Weber is the surname of my Germanic and Flemish paternal line. Charrúa heritage is another part of my family memory.</p>", ['azorean','galician','germanic','flemish','charrua']],
   ["Ancestry atlas", "<p>Explore the regions that frame my heritage and the places I study. Markers identify broad heritage regions, historical landmarks and research interests.</p>", [], 'atlas'],
   ["Family memory and regional history", "<p>I share broad ancestral connections and the surname Weber. Public historical sources give context for the regions, peoples and cultures that shaped this history.</p>", ['genealogy','history']],
  ]
 },
 azorean: {
  title:'Azorean Heritage', category:'Heritage / Maternal family', image:'azores',
  intro:'My maternal Portuguese ancestry is predominantly Azorean. The history of Desterro, now Florianópolis, offers regional context for that heritage.',
  sections:[
   ['Nine islands in the Atlantic', '<p>The Azores form three island groups. Flores and Corvo lie to the west. Faial, Pico, São Jorge, Graciosa and Terceira form the central group. São Miguel and Santa Maria lie to the east. The islands’ position mattered to Portuguese Atlantic navigation, and their ports connected island life with ocean trade and imperial shipping.</p>'],
   ['Nossa Senhora do Desterro', '<p>In 1748 the first group in the organized Azorean settlement of Santa Catarina arrived off Desterro. Further voyages brought island families to communities on and around the Ilha de Santa Catarina, and some settlers eventually moved farther south. These movements form part of the regional history of Azorean heritage in Brazil.</p><p>Portuguese Crown settlement took place on lands with longstanding Indigenous histories. The vocabulary of “settlement” describes one phase of occupation and should be read alongside that longer history.</p>', ['charrua']],
   ['Island practices in southern Brazil', '<p>Coastal fishing, vernacular building, religious festivals and bobbin lace help explain the distinctive Azorean presence in the region. These practices changed in Brazil as families adapted to local materials, economies and neighbours. The Casa dos Açores in Biguaçu offers a place to trace that living material culture.</p>'],
   ["Sources for Azorean migration", "<p>Public collections in Santa Catarina preserve land grants and passenger material from the colonial era. Read alongside records from the Azores, these sources help researchers distinguish regional settlement patterns from individual voyages.</p>", ['genealogy','genetics']],
  ],sources:[azores]
 },
 galician: {
  title:'Galician Heritage', category:'Heritage / Maternal family',image:'galicia',
  intro:'Galicia is part of my maternal family history and a strong cultural and historical interest. The surviving details of that family connection are limited.',
  sections:[
   ["A connection to Galicia", "<p>Galicia is part of my maternal heritage. The borderlands between Galicia and northern Portugal offer wider historical context for studying the region and its languages.</p>"],
   ['A shared medieval language', '<p>Northwestern Iberia spans histories of Roman Gallaecia, medieval kingdoms and a long Portuguese–Galician frontier. Medieval Galician-Portuguese lyric travelled across that frontier. Galician and Portuguese developed their own literary histories as their institutions diverged.</p><p>Galego lives in conversation, publishing, song and education. The nineteenth-century <em lang="gl">Rexurdimento</em> and the work of writers such as Rosalía de Castro belong to a longer story of public literary renewal. Language and place both matter to Galician identity.</p>', ['languages']],
   ['Migration and diaspora', '<p>Brazil was one of several American destinations for migrants from Galicia. The Galician cultural archive documents associations abroad that maintained connections across the Atlantic. Migration records, correspondence and local associations can tell different parts of that history. The general diaspora is context for my interest and remains separate from my own family’s itinerary.</p>'],
   ['Reading a genetic comparison', '<p>Closeness to a Galician reference in G25 describes proximity within a selected dataset. It cannot establish descent from a particular place or assign a cultural identity.</p><p>Research on Iberian variation, including a reanalysis of fine-scale patterns within Galicia, illustrates the influence of sample selection and technical batches on apparent clusters.</p>', ['genetics']]
  ],sources:[galician,diaspora,iberia,batches]
 },
 germanic: {
  title:'The Weber Line', category:'Heritage / Paternal family', image:'weser',
  intro:'Weber is my paternal family surname. The history of German-speaking regions in Europe and southern Brazil gives context to this heritage.',
  sections:[
   ["Southwestern German territories", "<p>The Odenwald is an example of the changing historical geography of southwestern Germany. Regions, states and church jurisdictions evolved over time, so the same place can appear under different administrative names in historical sources.</p>"],
   ["The Weser and northern trade", "<p>The Weser basin and ports such as Bremen are useful for studying trade and settlement in northern German territories. River transport connected inland settlements to North Sea commerce. Hanover and Lower Saxony offer other points of reference for the region’s political history.</p>", ['heritage','history']],
   ["Santa Catarina", "<p>German-speaking communities form a distinct part of Santa Catarina’s immigration history. Language, community institutions and historical archives provide ways to study how settlers and their descendants adapted to southern Brazil.</p>", ['flemish','genealogy']],
   ["Patrilineal inheritance", "<p>Y-DNA follows one paternal line. That makes it relevant to some genealogical questions, within a much narrower scope than autosomal ancestry or the family tree as a whole.</p>", ['genetics']],
  ]
 },
 flemish: {
  title:'Flemish Heritage', category:'Heritage / Paternal family',image:'flanders',
  intro:'Flemish-Germanic heritage is part of my paternal family history. Flanders has a distinct history in the Low Countries.',
  sections:[
   ['Historical Flanders', '<p>The medieval County of Flanders was part of the Low Countries. Its borders shifted and its territory differed from that of the modern Flemish Region. Clothmaking helped cities such as Bruges and Ghent develop large urban markets. Bruges linked Flemish commerce to Hanseatic merchants and other North Sea networks.</p>'],
   ['Language, trade and identity', '<p>Flemish commonly refers to Dutch as used in Flanders and to regional varieties associated with it. Dutch and German both belong to the West Germanic language family. Historical Flanders also contained areas where Romance varieties were spoken. Linguistic kinship and sustained commercial contact are useful contexts for Flemish–German connections. Flemish identity has its own history in the Low Countries.</p>', ['languages','history']],
   ['Movement across borders', '<p>Merchants, artisans and religious communities moved through and out of the Low Countries over several centuries. Trade brought Flemish and German-speaking communities into contact, while political and religious changes also shaped migration. These are broad historical patterns. They provide context for studying Flemish heritage in a wider European setting.</p>', ['genealogy']]
  ],sources:[flanders]
 },
 charrua: {
  title:'My Charrúa Heritage',category:'Heritage / Río de la Plata',image:'plata',
  intro:'Charrúa heritage is part of my family memory. I explore that connection through the history of the Río de la Plata and the voices of Charrúa descendants.',
  sections:[
   ["Family memory", "<p>The connection I share here comes from family history. Keeping this heritage visible means learning about Charrúa history, listening to descendants and recognising the continuity of Indigenous communities in the region.</p>", ['genealogy','genetics']],
   ['Reading the historical term “bugre”', '<p>In Brazil the word <em lang="pt">bugre</em> was an externally imposed label for Indigenous people and often carried derogatory force. It was applied to different peoples and never supplied the name of one Indigenous nation. I use Charrúa as the specific identification preserved in my family history.</p>'],
   ['Across the Río de la Plata', '<p>Charrúa history belongs to a region that now spans Uruguay and parts of southern Brazil and northeastern Argentina. The Río de la Plata basin and adjoining grasslands supported diverse Indigenous communities, with shifting alliances and ways of living. Today’s borders came later. Colonial records used labels inconsistently, and neighbouring peoples had distinct histories of their own.</p><p>European colonization brought land seizure, livestock expansion, new trade and warfare. Indigenous people adapted to these changes as they defended territory and negotiated survival. In independent Uruguay, state forces attacked Charrúa people at Salsipuedes in 1831. Survivors faced forced removal, exploitation and marginalization.</p>'],
   ['Survival, memory and continuity', '<p>Descendants and organizations continue to preserve family memory and press for recognition. Charrúa organizations participated in the campaign to recognize Paso de Salsipuedes as a site of memory. Their own accounts are an essential part of understanding what happened and what survives.</p>', ['history','heritage']]
  ],sources:[charrua,descendants,memory,uruguayDNA,['Dicionário Priberam · bugre','https://dicionario.priberam.org/bugre']]
 },
 genealogy: {
  title:'Genealogy',category:'Names, records & family memory',
  intro:'Weber is the family surname shared in this archive. This page brings together broad heritage branches and historical events that help place them in context.',
  sections:[
   ["Family branches", "<p>Expand each branch to explore its cultural and historical context.</p>", [], 'tree'],
   ["Regional timeline", "<p>Filter dated events by region. The dates refer to public historical events and objects.</p>", [], 'timeline'],
   ["Weber heritage in Santa Catarina", "<p>The Weber surname represents the Germanic and Flemish paternal side of my family history. The cultural history of Santa Catarina provides a wider setting for exploring these connections.</p>", ['germanic','flemish']],
   ["Sources and interpretation", "<p>Family memory and historical sources can illuminate different parts of the past. The public sources here explain regional history and help distinguish it from personal genealogy.</p>", ['azorean','galician','charrua']]
  ],sources:[azores,charrua,['Waldseemüller’s 1507 world map · Library of Congress','https://www.loc.gov/item/2003626426/']]
 }
};

module.exports = { pages, sources: { azores, galician, diaspora, iberia, batches, flanders, charrua, descendants, memory, uruguayDNA } };
