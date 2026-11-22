const { sources } = require('./heritage.cjs');
const quran = ['Qur’an · Sūrat al-Ikhlāṣ (112)', 'https://quran.com/112'];
const umayyad = ['The Art of the Umayyad Period · The Met', 'https://www.metmuseum.org/essays/the-art-of-the-umayyad-period-661-750'];
const abbasid = ['The Art of the Abbasid Period · The Met', 'https://www.metmuseum.org/essays/the-art-of-the-abbasid-period-750-1258'];
const bukhari = ['Ṣaḥīḥ al-Bukhārī · Arabic text and English translations', 'https://sunnah.com/bukhari'];
const muslim = ['Ṣaḥīḥ Muslim · Arabic text and English translations', 'https://sunnah.com/muslim'];
const princeton = ['Manuscripts of the Islamic World · Princeton University Library', 'https://library.princeton.edu/services/special-collections/global-collections'];
const gothic = ['Codex Argenteus · Uppsala University Library', 'https://www.uu.se/4.724082a918a25ff33a2314da.html'];
const olalde = ['Olalde et al. · Ancient Iberian genomic time transect (2019)', 'https://doi.org/10.1126/science.aav4040'];
const vahaduo = ['Vahaduo · coordinate comparison tools', 'https://vahaduo.github.io/'];
const atlasSource = ['Waldseemüller’s 1507 world map · Library of Congress', 'https://www.loc.gov/item/2003626426/'];
const islandSource = ['Far Cry 3 · Ubisoft', 'https://www.ubisoft.com/en-sg/games/far-cry-3'];

const pages = {
 about:{
  title:'About', category:'A personal introduction',
  intro:'I’m Brazilian and Muslim. This site brings together the family histories I inherited, the faith I practice and the subjects I keep returning to.',
  sections:[
   ['Family and place','<p>Santa Catarina is an important point of reference in my family history. My mother’s side carries predominantly Azorean Portuguese ancestry and a Galician connection. The Weber surname belongs to my paternal line, with Germanic and Flemish heritage. My Charrúa heritage also has a place of its own in this archive.</p>',['heritage','charrua','genealogy']],
   ['Faith and study','<p>Islam is central to my life. I identify with the Athari creed and strive to follow the Salaf al-Ṣāliḥ. Studying the early generations, Arabic religious terms and the ways narrations were transmitted helps me understand the tradition I seek to follow.</p>',['islam','athari','scholarship']],
   ['Other things I return to','<p>I’m drawn to historical maps, population genetics, languages and the practical side of computing. Old manuscripts sit comfortably in this collection alongside local AI and games. Counter-Strike 2’s HvH scene and the tropical exploration of Far Cry 3 are very different sides of my interest in digital culture.</p>',['history','genetics','languages','technology','gaming']]
  ]
 },
 islam:{
  title:'Islam & My Faith',category:'Faith & learning',image:'quran',
  intro:'I am Muslim. I identify with the Athari creed, <em>al-ʿAqīdah al-Athariyyah</em>, and strive to follow the Salaf al-Ṣāliḥ as closely as possible.',
  sections:[
   ['Tawḥīd','<p lang="ar" dir="rtl" class="arabic">التَّوْحِيد</p><p>Tawḥīd, the affirmation of Allah’s oneness and His exclusive right to worship, is at the heart of Islam. The short sūrah al-Ikhlāṣ is a starting point for reading how the Qur’an expresses divine oneness.</p>'],
   ['The early generations','<p>Salaf al-Ṣāliḥ means the righteous predecessors. The earliest Muslim generations include the Ṣaḥābah, the Companions of the Prophet Muhammad ﷺ, and the Tābiʿūn, who learned from the Companions. Their place in the transmission of knowledge informs the way I approach Islamic history and religious study.</p>',['athari','islamic-history']],
   ['The study of transmitted knowledge','<p>Hadith collections, classical works of creed, scholarly biographies and commentaries preserve different aspects of the Islamic scholarly tradition. Comparing a manuscript page with an edition opens questions about transmission, scribes, and how the book was read across generations.</p>',['scholarship','languages']]
  ],sources:[quran,bukhari,muslim,princeton]
 },
 athari:{
  title:'The Athari Creed',category:'Islam / ʿAqīdah',image:'quran-1137',
  intro:'Al-ʿAqīdah al-Athariyyah names the creed I identify with. Its emphasis on revelation and transmitted reports shapes how I approach learning.',
  sections:[
   ['Revelation and the transmitted tradition','<p lang="ar" dir="rtl" class="arabic">العقيدة الأثرية</p><p>The word <em>athar</em> can refer to a transmitted report. In an Athari approach, the Qur’an and authentic Sunnah provide the basis for belief, with particular attention to the understanding of the early Muslims. In questions about Allah’s attributes, a characteristic formulation affirms what revelation says while withholding claims about the modality, <em>bilā kayf</em>.</p>'],
   ['Ahl al-Ḥadīth','<p>Ahl al-Ḥadīth designates scholars associated with transmitting, evaluating and drawing on hadith. Aḥmad ibn Ḥanbal is an important figure in the history of hadith and traditionalist theology. The label describes a historical scholarly orientation with regional and individual variation.</p>'],
   ['Classical debates','<p>The ninth-century <em>miḥnah</em> under the Abbasids brought disputes about the createdness of the Qur’an into relation with state authority. Aḥmad ibn Ḥanbal’s resistance became a landmark in traditionalist memory. Later debates about divine attributes and the role of <em>kalām</em>, or dialectical theology, produced a wide body of argument and commentary.</p><p>For a reading path, Aḥmad’s attributed <em>Uṣūl al-Sunnah</em>, al-Barbahārī’s <em>Sharḥ al-Sunnah</em> and Ibn Qudāmah’s <em>Lumʿat al-Iʿtiqād</em> offer examples of different periods and forms of traditionalist creed writing. Editions, attributions and commentary deserve attention when reading them.</p>',['scholarship','islamic-history']]
  ],sources:[quran,['Aḥmad ibn Ḥanbal · Encyclopaedia Iranica','https://www.iranicaonline.org/articles/ahmad-b-hanbal/'],abbasid]
 },
 'islamic-history':{
  title:'Early Islamic History',category:'Islam / The early generations',image:'quran',
  intro:'I’m interested in the relationship between the early Muslim community, the changing political world of the caliphates, and the preservation of religious knowledge.',
  sections:[
   ['The Prophet ﷺ and his Companions','<p>The Prophet Muhammad ﷺ conveyed the Qur’an and taught the early Muslim community. The Hijrah from Mecca to Medina in 622 marks a turning point and provides the epoch of the Islamic calendar. The Companions transmitted what they had heard and seen, and students of the next generation learned from them in different centres.</p>'],
   ['The first caliphates','<dl class="ledger"><div><dt>632–661 · Rashidun</dt><dd>The period of Abū Bakr, ʿUmar, ʿUthmān and ʿAlī saw territorial expansion, major changes in government and internal conflict.</dd></div><div><dt>661–750 · Umayyads</dt><dd>Damascus became the centre of a caliphate extending across a wide range of linguistic and political regions. Arabic assumed a growing role in administration.</dd></div><div><dt>750–1258 · Abbasids in Iraq</dt><dd>Baghdad was founded in 762. Court patronage and the movement of scholars and books helped make Iraq a centre of classical Islamic civilization. The sack of Baghdad in 1258 ended the Abbasid caliphate there.</dd></div></dl>'],
   ['A geography of teaching','<p>Medina, Mecca, Kufa, Basra, Damascus and later Baghdad figure in the movement of students and transmitters. The Tābiʿūn and later generations learned in teaching circles, travelled to hear reports, and passed knowledge on by oral instruction and writing. Biographical and hadith works let readers trace parts of those networks.</p><p>The Ahl al-Ḥadīth and debates over theology belong in this intellectual history alongside political chronology. Collecting reports, weighing their transmission and writing commentaries continued across changes in political rule.</p>',['athari','scholarship','history']]
  ],sources:[bukhari,umayyad,abbasid]
 },
 scholarship:{
  title:'Classical Scholarship',category:'Islam / The manuscript library',image:'quran-1137',
  intro:'A reading room for Arabic religious literature, the sciences of hadith and the manuscripts that preserve them.',
  sections:[
   ['Hadith and its sciences','<p>A hadith has a chain of transmitters, the <em>isnād</em>, and a report text, the <em>matn</em>. Scholars considered continuity, narrator reliability, anomalous wording and hidden defects. Biographical dictionaries preserve information about teachers, students, dates and reliability. Comparing routes of transmission can clarify why one reading or judgement differs from another.</p>'],
   ['Books and commentaries','<dl class="ledger"><div><dt>Hadith collections</dt><dd><em>Ṣaḥīḥ al-Bukhārī</em> and <em>Ṣaḥīḥ Muslim</em> collect reports and organize them in ways that reward attention to their chapter structures.</dd></div><div><dt>Creed and method</dt><dd>Read early works of ʿaqīdah alongside historical accounts of their authors and the questions they addressed. Ibn al-Ṣalāḥ’s <em>Muqaddimah</em> offers a later systematic treatment of hadith terminology.</dd></div><div><dt>Commentary and biography</dt><dd>Ibn Ḥajar’s <em>Fatḥ al-Bārī</em>, al-Nawawī’s commentary on Muslim and al-Dhahabī’s <em>Siyar Aʿlām al-Nubalāʾ</em> point toward different ways to read a collection or follow a scholarly life.</dd></div></dl>', ['athari']],
   ['From codex to digital facsimile','<p>A manuscript preserves a physical history of copying and reading. Compare colophons, marginal notes, scripts and folio order before treating different copies as interchangeable. Digitization improves access, while shelfmarks, page references and a record of the edition help readers verify quotations.</p><p>The Qur’an folio shown here is dated 1137 CE and uses eastern Kufic with some elements of naskh. Its catalog record gives the object number and the related colophon evidence. Princeton’s collection offers additional examples across the languages of the Islamic world.</p>',['languages']]
  ],sources:[bukhari,muslim,princeton,['Qur’an manuscript folio, dated 1137 CE · The Met','https://www.metmuseum.org/art/collection/search/453369']]
 },
 history:{
  title:'Historical Interests',category:'Reading across periods',image:'world',
  intro:'I’m drawn to the way maps, archaeology, books and administrative records preserve different accounts of the same places.',
  sections:[
   ['Europe from antiquity to the Middle Ages','<p>Roman roads, cities and inscriptions illuminate imperial expansion and local life in Iberia. Later archaeology and written records raise different questions about late antique migrations, Germanic-speaking peoples and medieval societies. Political labels, burial customs, language and biological ancestry can each move at a different pace.</p><p>In the medieval north, the Hanseatic League connects my interest in Bremen and the Weser to a larger trade network. Flanders adds the history of textiles, urban institutions and North Sea exchange. In Iberia, borderlands and multilingual manuscripts show how cultural institutions operated across political frontiers.</p>',['galician','germanic','flemish','genetics']],
   ['Indigenous history and colonial encounters','<p>I follow the histories of Indigenous peoples in southern Brazil and the Río de la Plata with particular attention to Charrúa history. Archaeological traces, colonial terms, demographic estimates and living community memory have different limits. Accounts of colonization should include displacement, coerced labour and Indigenous decisions and survival.</p>',['charrua']],
   ['Islamic intellectual history','<p>The caliphates provide a political chronology, while the history of Ahl al-Ḥadīth and the movement of scholars show how learning travelled. Manuscript catalogues make it possible to follow a text through successive copies and trace part of its reception.</p>',['islamic-history','scholarship']],
   ['Historical map cabinet','<p>Change plates and zoom to examine the linework. Each map reflects the period, knowledge and aims of its maker. The ancestry atlas uses a separate modern basemap for locating places.</p>',['heritage'],'cabinet']
  ],sources:[atlasSource,sources.flanders,sources.memory,umayyad,abbasid,olalde]
 },
 genetics:{
  title:'Population Genetics',category:'Data & interpretation',
  intro:'I use population genetics to ask questions about demographic history and to give family research a broader context. Genetic similarity, genealogical descent and cultural identity answer different questions.',
  sections:[
   ['G25, PCA and Vahaduo','<p>PCA summarizes patterns of variation in a set of data. G25 coordinates provide a 25-dimensional representation used in hobbyist comparisons. A two-axis view can hide differences present on other axes. Vahaduo can compare distances and fit reference mixtures in coordinate space. Distances and model weights depend on the references, coordinate scaling and the model used.</p><p>A synthetic reference is a calculated average or weighted combination of other references. It can help explore a hypothesis. Its apparent fit does not establish that a discrete historical population with that exact profile existed.</p>'],
   ['Compare coordinates privately','<p>Paste a target and reference rows as label followed by 25 comma-separated coordinates. Use the same G25 scaling for all rows. The explorer ranks full 25-dimensional Euclidean distances and plots axes 1 and 2. Values stay in this browser tab.</p>', [], 'coordinates'],
   ['Ancient Iberia in the published record','<p>Olalde and colleagues reported genome-wide data from 271 ancient Iberians across six periods. Select a period to compare coverage and read its context. These are study sample counts.</p>', [], 'study'],
   ['Across Iberia and northern Europe','<p>Iberian research and later work on batch effects show why fine-scale similarities need independent checks. For the Azores, island-level samples and settlement histories matter. A pooled Portuguese reference may obscure differences among islands or between an island and the mainland.</p><p>Germanic and Flemish population history both intersect with migration, neighbouring communities and regional continuity. Linguistic and historical labels have a different scope from reference sets. Y-DNA describes one direct paternal line, with a much narrower scope than autosomal data.</p>',['azorean','galician','germanic','flemish']],
   ['Indigenous ancestry and archaeogenetics','<p>My Charrúa connection comes from family history. Genetic ancestry estimates are a distinct kind of evidence. The ancient genomes studied in Uruguay by Lindo and colleagues document two individuals from one site and raise questions about earlier demographic movements. They cannot stand in for an entire Indigenous people or establish a family relationship.</p>',['charrua','genealogy']]
  ],sources:[olalde,sources.iberia,sources.batches,sources.uruguayDNA,vahaduo]
 },
 languages:{
  title:'Languages & Linguistics',category:'Words across time',image:'galicia',
  intro:'Portuguese and English are part of the linguistic landscape of this site. Arabic, Galician, Gothic and the historical Germanic languages are particular subjects of interest.',
  sections:[
   ['Arabic terminology','<p>Vocalization and context matter when studying Arabic religious vocabulary. These terms link the language page to the texts and traditions discussed in the Islamic archive.</p><dl class="ledger terms"><div><dt lang="ar" dir="rtl">تَوْحِيد</dt><dd><em>Tawḥīd</em> · affirmation of Allah’s oneness.</dd></div><div><dt lang="ar" dir="rtl">عَقِيدَة</dt><dd><em>ʿAqīdah</em> · creed.</dd></div><div><dt lang="ar" dir="rtl">إِسْنَاد</dt><dd><em>Isnād</em> · chain of transmission.</dd></div><div><dt lang="ar" dir="rtl">مَتْن</dt><dd><em>Matn</em> · the report text.</dd></div></dl>',['islam','scholarship']],
   ['Galician and Portuguese','<p>Galician and Portuguese histories meet in medieval lyric and diverge across later borders and institutions. I’m interested in how modern speakers use related forms, such as Galician <em lang="gl">noite</em> and Portuguese <em lang="pt">noite</em>, and how translation handles differences beneath apparent similarity.</p>',['galician']],
   ['Gothic and historical Germanic','<p>Gothic is an attested East Germanic language. The <em>Codex Argenteus</em> preserves much of a Gothic translation of the Gospels in a sixth-century manuscript. Old English, Old High German and Old Norse provide other points of comparison for inflection, regular sound correspondences and inherited vocabulary.</p><p>In historical linguistics an asterisk can mark a reconstructed form, such as Proto-Germanic <em>*fōt-</em> in comparisons with English <em>foot</em> and Gothic <em>fōtus</em>. A reconstruction is inferred from evidence. A manuscript reading is attested evidence with its own spelling and transmission history.</p>']
  ],sources:[sources.galician,gothic,princeton]
 },
 technology:{
  title:'Technology & Computing',category:'Software, hardware & experiments',
  intro:'I’m interested in how things work: how browsers render a page, how local models fit into memory, and how a game’s feel depends on the machine running it.',
  sections:[
   ['A small web','<p>HTML gives a document its structure, CSS gives it a reading rhythm, and JavaScript adds interaction where it helps. I like the independence of a site that can be kept as files, read offline and moved between hosts. Git records the history of changes, while GitHub can serve as a place to keep and publish them.</p><p>Python is useful for working with source lists, cleaning tabular data and exploring historical or genetic datasets. The question that interests me is how to make the result easy for someone else to inspect.</p>'],
   ['Local AI and model formats','<p>Running large language models locally brings the trade-offs into view. Ollama offers a local runtime, and GGUF packages weights and model metadata in an ecosystem commonly used for quantized inference. Memory requirements depend on the weights, context length and runtime. Comparing output quality, tokens per second and memory use gives a fuller picture than comparing model file sizes alone.</p>'],
   ['Hardware and gaming technology','<p>CPU scheduling, GPU memory, cooling, storage and display refresh affect different workloads in different ways. For games, frame pacing and input latency can matter as much as average frame rate. Software experiments are most informative when a change is isolated and the same scenario can be repeated.</p>',['gaming']]
  ],sources:[['Ollama with GGUF · Hugging Face Hub documentation','https://huggingface.co/docs/hub/en/ollama'],['GitHub Pages documentation','https://docs.github.com/en/pages']]
 },
 gaming:{
  title:'Gaming & Digital Culture',category:'Games & communities',image:'islands',
  intro:'Counter-Strike 2’s HvH scene and Far Cry 3’s island atmosphere are two very different reasons games belong in this archive.',
  sections:[
   ['Counter-Strike 2 · Hack vs Hack','<p>My main interest in CS2 is HvH, or Hack vs Hack. It is a subculture of custom environments where participants expect modified play. Its communities build a shared vocabulary around configurations, rules, server styles, map habits and the way different updates change the scene.</p><p>Configuration culture includes the sharing and comparison of presets and preferences. The technical questions I follow include how client and server state diverge, how tick timing and latency affect what players observe, and how custom server rules reshape movement and positioning. Map geometry, peeking and round pacing remain part of how players read a match. These interests sit alongside ordinary Counter-Strike customization, including HUDs, visual settings and binds.</p>'],
   ['Far Cry 3 · The Rook Islands','<p>Tropical shorelines, dense vegetation and steep interior ridges make exploration central to the game’s atmosphere. The contrast between a clear coastal horizon and short sightlines under the canopy makes moving around the fictional Rook Islands its own pleasure. The photograph above shows Wayag in Indonesia as a visual companion to the game’s setting.</p>'],
   ['The collection','<div class="collection"><div><h3>Fortnite</h3><p>A changing play space shaped by movement and player creativity.</p></div><div><h3>Grand Theft Auto V</h3><p>Free exploration through a dense city and its surrounding countryside.</p></div><div><h3>Rainbow Six Siege</h3><p>Destructible environments and precise use of space.</p></div><div><h3>Red Dead Redemption 2</h3><p>Slow travel, landscape and attention to everyday detail.</p></div><div><h3>Dying Light</h3><p>Parkour routes and the pressure of a changing day–night cycle.</p></div><div><h3>The Forest</h3><p>Survival, shelter building and uneasy exploration.</p></div><div><h3>Watch Dogs 2</h3><p>An open-world take on digital culture and urban infrastructure.</p></div></div>']
  ],sources:[['Counter-Strike 2 · Valve','https://www.counter-strike.net/cs2'],islandSource]
 }
};
module.exports = pages;
