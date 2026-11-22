const images = {
 world: ['Martin Waldseemüller · Mapa-múndi, 1507','Mapa-múndi em xilogravura de Martin Waldseemüller'],
 azores: ['Abraham Ortelius · Acores Insulae','Mapa gravado dos Açores com as ilhas distribuídas pelo Atlântico'],
 galicia: ['Fernando Ojea e Joan Blaeu · Gallaecia Regnum','Mapa gravado da Galícia com rios, cidades costeiras e relevo'],
 flanders: ['Willem Blaeu · Flandria et Zeelandia Comitatus','Mapa histórico de Flandres e Zelândia com cartelas gravadas'],
 weser: ['Matthäus Merian · Bremen, 1641','Vista gravada da cidade de Bremen e do rio Weser'],
 plata: ['Willem Blaeu · A província do Rio da Prata','Mapa europeu antigo da bacia do Rio da Prata com rios e nomes de lugares'],
 desterro: ['José Custódio de Sá e Faria · Ilha de Santa Catarina','Mapa histórico da ilha de Santa Catarina, do canal e da terra firme'],
 quran: ['Fólio do Alcorão · séculos VIII–IX','Escrita cúfica marrom e marcas coloridas de leitura em um fólio do Alcorão'],
 'quran-1137': ['Fólio do Alcorão · 531 AH / 1137 EC','Fólio manuscrito com caligrafia cúfica oriental e iluminura dourada'],
 islands: ['Wayag, Raja Ampat · Rolandandika','Ilhas tropicais verdes com encostas íngremes e arborizadas nas águas de Raja Ampat']
};
const places = {
 azores:["Açores","O arquipélago é uma referência regional da herança portuguesa açoriana."],
 galicia:["Galícia","Uma região associada à herança galega e ao interesse pela sua língua e história."],
 flanders:["Flandres","A Flandres atual serve de referência geográfica para a região histórica."],
 plata:["Rio da Prata","Referência regional para a história dos charruas e dos povos indígenas vizinhos."],
 florianopolis:["Florianópolis / Desterro","Antiga Nossa Senhora do Desterro, referência para a história do povoamento açoriano em Santa Catarina."],
 bremen:["Bremen","Porto hanseático e referência geográfica para a bacia do Weser."],
 hanover:["Hanôver","Um lugar para estudar a história política e administrativa do norte alemão."],
};
const dates = {
 world:['Mapa-múndi de Waldseemüller','Um dos primeiros mapas-múndi europeus representa o Atlântico entre as Américas, a Europa e a África.'],
 weser:['Bremen e o Weser','A gravura de Merian mostra a cidade comercial e o rio que a atravessa.'],
 azores:['Povoamento açoriano em Desterro','O primeiro grupo do povoamento açoriano organizado em Santa Catarina chegou às águas de Desterro.'],
 charrua:['Salsipuedes','Forças do Estado uruguaio atacaram o povo charrua em Salsipuedes, hoje um sítio de memória.']
};
const periods = [
 ['Mesolítico','É o período com menos amostras no estudo. Essa escassez limita as comparações dentro do próprio período.'],
 ['Neolítico','O estudo acompanha a chegada de ascendência associada a agricultores da Anatólia e mudanças posteriores ligadas a caçadores-coletores.'],
 ['Idade do Cobre','As amostras ajudam a estabelecer uma referência anterior à difusão da ascendência relacionada às populações das estepes na Península Ibérica.'],
 ['Idade do Bronze','Os autores relatam grandes mudanças na ascendência genômica e nas linhagens paternas depois de aproximadamente 2000 a.C.'],
 ['Idade do Ferro','As amostras abrangem grupos de línguas diferentes, o que dificulta associar uma língua a uma única história genética.'],
 ['Período histórico','É o grupo com mais amostras. Os indivíduos mais recentes ajudam a entender o fluxo gênico envolvendo o Mediterrâneo e o norte da África.']
];
module.exports = { images, places, dates, periods };
