import { SeasonInfo, ShowArc, SpinOffItem, SpecialItem, Collaborator } from "./types";

// These 15 seasons folders are from the MODERN series (Série Moderna)
export const MODERN_SEASONS: SeasonInfo[] = [
  { number: 1, year: "2005", folderUrl: "https://drive.google.com/drive/folders/1tipC1tw2x85ZZsvaqpeeM_H-sGeTKaTJ" },
  { number: 2, year: "2006", folderUrl: "https://drive.google.com/drive/folders/1qipiTfMf_njXPeAh3N7Ai807OFjWYJpr" },
  { number: 3, year: "2007", folderUrl: "https://drive.google.com/drive/folders/1u0N6xscFNNxPaNABGHEojwQ3mOcJ6oyA" },
  { number: 4, year: "2008", folderUrl: "https://drive.google.com/drive/folders/1mL7cWOpVyK5uUGdpJpBAuOf8OIY7kK3A" },
  { number: 5, year: "2010", folderUrl: "https://drive.google.com/drive/folders/13-AfYtvvTqosPBWPtH1GUiYlnMRrPBCm" },
  { number: 6, year: "2011", folderUrl: "https://drive.google.com/drive/folders/17Y8BdNH-kZ00rXyOdWOAH2UFOLHBP5M7" },
  { number: 7, year: "2012-2013", folderUrl: "https://drive.google.com/drive/folders/1Q6e1qnAeeKmAC8XNck5_B_qweOtvXDHF" },
  { number: 8, year: "2014", folderUrl: "https://drive.google.com/drive/folders/17yrMj9hH16rsZtlyz2h8hE9iIbGO8P4q" },
  { number: 9, year: "2015", folderUrl: "https://drive.google.com/drive/folders/117a3y45-WFqSlkufmdsrmlKfE2whJlUC" },
  { number: 10, year: "2017", folderUrl: "https://drive.google.com/drive/folders/127jqXFzeXG_HR6mH5mq1SNKJ3iro-Fun" },
  { number: 11, year: "2018", folderUrl: "https://drive.google.com/drive/folders/1N3kBIA-gZxtpl6cxQ0B5_V6ytqnz82wf" },
  { number: 12, year: "2020", folderUrl: "https://drive.google.com/drive/folders/1ZJCohUzQF7dq4FBCkoMdgmqT3Jaaty0F" },
  { number: 13, year: "2021 (Flux)", folderUrl: "https://drive.google.com/drive/folders/1VxsceYq6amXMHEZujxy0xAqUhSLHpUXX" },
  { number: 14, year: "2023-2024", folderUrl: "https://drive.google.com/drive/folders/1PtsYIZSOuXIkcS2BQotdUD8Tl_8YznsT" },
  { number: 15, year: "2024 (Nova Era)", folderUrl: "https://drive.google.com/drive/folders/1VTTl8bWjPkCmq18CKytQzU_qqP3sgRa3" }
];

export const SEASON_10_CLASSIC_ARCS: ShowArc[] = [
  {
    id: "s10-frontiers",
    title: "Fronteira no Espaço",
    originalTitle: "Frontier in Space",
    firstAired: "24 de fevereiro a 31 de março de 1973",
    summary: "Uma série de ataques misteriosos coloca os impérios da Terra e de Draconia à beira de uma guerra devastadora.",
    detailedSummary: "Materializando-se em uma nave de carga da Terra no século XXVI, o Doutor e Jo são pegos em meio às tensões entre os impérios da Terra e de Draconia, uma guerra fria que está rapidamente se tornando quente. O Doutor suspeita que uma terceira parte possa estar envolvida, e logo descobre que o Mestre está usando os Ogrons e um dispositivo sônico de hipnose para desencadear um conflito de escala galáctica.",
    episodes: [
      {
        id: "s10-frontiers-e1",
        title: "Episódio 3 (Parte 1)",
        url: "https://drive.google.com/file/d/1bO2DpmooWjC4HH2gDcpd_1IUupTK2kjc/view?usp=sharing"
      },
      {
        id: "s10-frontiers-e2",
        title: "Episódio 3 (Parte 2)",
        url: "https://drive.google.com/file/d/1KWjKzNezyiAlOtKtELI-f_weDnZvSNHn/view?usp=drive_link"
      }
    ],
    poster: "https://files.catbox.moe/6r83y3.png"
  },
  {
    id: "s10-daleks",
    title: "Planeta dos Daleks",
    originalTitle: "Planet of the Daleks",
    firstAired: "7 de abril a 12 de maio de 1973",
    summary: "O Doutor chega a Spiridon, onde os Daleks reúnem uma imensa força secreta de invasão de dez mil Daleks.",
    detailedSummary: "Continuação direta de Fronteira no Espaço. O Terceiro Doutor, ferido, é levado à TARDIS e entra em coma, enviando uma message aos Senhores do Tempo. Eles direcionam a TARDIS para o planeta Spiridon, onde Jo e Thals lutam contra cientistas Daleks que buscam o poder da invisibilidade. Juntos, planejam conter o exército de dez mil Daleks em animação suspensa nos vulcões de gelo.",
    episodes: [
      {
        id: "s10-daleks-e1",
        title: "Episódio 5 (Parte 1)",
        url: "https://drive.google.com/file/d/1r1xCvznhsws3rjq5V0_AHlGcLfMT_ZT1/view?usp=sharing"
      },
      {
        id: "s10-daleks-e2",
        title: "Episódio 5 (Parte 2)",
        url: "https://drive.google.com/file/d/1qpU6VKjoqvUEbkXGT8o2zUhxX2yZ78Om/view?usp=sharing"
      }
    ],
    poster: "https://files.catbox.moe/pje6he.png"
  }
];

export const SEASON_12_CLASSIC_ARCS: ShowArc[] = [
  {
    id: "s12-robot",
    title: "Robô",
    originalTitle: "Robot",
    firstAired: "28 de dezembro de 1974 a 18 de janeiro de 1975",
    summary: "Após sua regeneração, o Quarto Doutor adapta-se ao seu novo corpo enquanto investiga um protótipo perigoso.",
    detailedSummary: "Primeira aventura do Quarto Doutor (Tom Baker). Ele se recupera com a ajuda de Sarah Jane, do Brigadeiro Lethbridge-Stewart e do Dr. Harry Sullivan. Investigando o roubo de planos para uma arma desintegradora, o grupo se depara com o protótipo de robô K1, construído com metal vivo pelo Professor Kettlewell, programado por cientistas extremistas para conspirar com códigos de mísseis nucleares.",
    episodes: [
      {
        id: "s12-robot-e1",
        title: "Robô (Episódio Completo)",
        url: "https://drive.google.com/file/d/1_TAO4CznGXopmvneLG5ht2ltFHLAuFG3/view?usp=sharing"
      }
    ],
    poster: "https://files.catbox.moe/8pqwj3.png"
  },
  {
    id: "s12-ark",
    title: "A Arca Espacial",
    originalTitle: "The Ark in Space",
    firstAired: "25 de janeiro a 15 de fevereiro de 1975",
    summary: "Milhares de anos no futuro, o que resta da humanidade repousa em sono criogênico, ameaçada pelos insetos Wirrn.",
    detailedSummary: "O Doutor, Sarah Jane e Harry Sullivan chegam à Estação Nerva, abrigo de criogênia da raça humana. Eles descobrem que o local foi invadido pelos terríveis insetos parasitas Wirrn, que vagam no frio do espaço e planejam colonizar a nave usando os últimos seres humanos adormecidos como casulo de procriação. Um conto sombrio que influenciou obras-primas como Alien.",
    episodes: [
      {
        id: "s12-ark-e1",
        title: "A Arca Espacial (Episódio Completo)",
        url: "https://drive.google.com/file/d/1Ck73rlIvdyKkRLQM9Eh4IKMc8MFrQdRK/view?usp=sharing"
      }
    ],
    poster: "https://files.catbox.moe/la4ex6.png"
  },
  {
    id: "s12-sontaran",
    title: "O Experimento Sontaran",
    originalTitle: "The Sontaran Experiment",
    firstAired: "22 de fevereiro a 1º de março de 1975",
    summary: "O Major Sontaran Styre realiza testes brutais em humanos capturados na Terra recuperada.",
    detailedSummary: "Descendo da estação Nerva para investigar a superfície terrestre há muito tempo deserta, o Doutor, Harry e Sarah encontram astronautas sobreviventes sendo mantidos reféns pelo Major Styre, um impiedoso guerreiro Sontaran. Styre realiza experimentos de sadismo científico para testar os limites biológicos humanos e preparar uma invasão militar do império clone de Sontar.",
    episodes: [
      {
        id: "s12-sontaran-e1",
        title: "O Experimento Sontaran (Episódio Completo)",
        url: "https://drive.google.com/file/d/1jGVO_A3uvG-HpSfgya73kVN0sd1siM8p/view?usp=sharing"
      }
    ],
    poster: "https://files.catbox.moe/hw6gg8.png"
  },
  {
    id: "s12-genesis",
    title: "Gênese dos Daleks",
    originalTitle: "Genesis of the Daleks",
    firstAired: "8 de março a 12 de abril de 1975",
    summary: "Convocado a Skaro pelos Senhores do Tempo, o Doutor enfrenta seu maior dilema moral face a Davros.",
    detailedSummary: "Enviado de volta ao passado de Skaro pelos Senhores do Tempo, o Doutor tem a missão de evitar a criação dos Daleks. Lá, ele testemunha a sangrenta guerra de mil anos entre Kaleds e Thals e conhece o cientista louco Davros. O Doutor enfrenta o dilema fundamental: ele tem o direito ético de extinguir os Daleks antes que cometam as atrocidades do futuro?",
    episodes: [
      {
        id: "s12-genesis-e1",
        title: "Gênese dos Daleks (Parte 1)",
        url: "https://drive.google.com/file/d/18ka-wvcslCs1xOljUwiW2CeEZomhE4uc/view?usp=sharing"
      },
      {
        id: "s12-genesis-e2",
        title: "Gênese dos Daleks (Parte 2)",
        url: "https://drive.google.com/file/d/1wahmHap5k-GIQzbgd11VHci5JzQiy0aJ/view?usp=sharing"
      }
    ],
    poster: "https://files.catbox.moe/nuyfc7.png"
  },
  {
    id: "s12-revenge",
    title: "A Vingança dos Cybermen",
    originalTitle: "Revenge of the Cybermen",
    firstAired: "19 de abril a 10 de maio de 1975",
    summary: "Os Cybermen planejam chocar a estação Nerva com o planeta de ouro Voga, letal para os ciborgues.",
    detailedSummary: "Retornando à Estação Nerva com o Anel do Tempo, os viajantes descobrem que a estação foi atacada por Cybermen em busca de aniquilar Voga, o lendário Planeta de Ouro. O ouro é fatal para o sistema respiratório dos Cybermen, que tentam lançar a estação como um foguete nuclear em rota de colisão contra o planeta para neutralizar a ameaça.",
    episodes: [
      {
        id: "s12-revenge-e1",
        title: "A Vingança dos Cybermen (Episódio Completo)",
        url: "https://drive.google.com/file/d/1h6dJk01RjyeFQF8igtbBpazLCHOPf7pj/view?usp=sharing"
      }
    ],
    poster: "https://files.catbox.moe/ebpbci.jpeg"
  }
];

export const SPINOFFS: SpinOffItem[] = [
  {
    id: "spinoff-sja",
    title: "Sarah Jane's Alien Files",
    originalTitle: "Sarah Jane's Alien Files",
    description: "Os companheiros de Sarah Jane, Clyde e Rani, registram arquivos no supercomputador Sr. Smith contendo detalhes táticos sobre as ameaças alienígenas já combatidas, preparando o terreno contra invasões da Terra.",
    poster: "https://files.catbox.moe/9ia7ps.png",
    episodes: [
      { id: "sja-e1", title: "Sarah Jane's Alien Files — Episódio 1", url: "https://drive.google.com/file/d/1XP-7fk_Ua6w97OQkgzLWpIi3io-LKgLC/view?usp=sharing" },
      { id: "sja-e2", title: "Sarah Jane's Alien Files — Episódio 2", url: "https://drive.google.com/file/d/1bW-GXh3zgK37Hy38PzIVRacuk-auiI8j/view?usp=sharing" },
      { id: "sja-e3", title: "Sarah Jane's Alien Files — Episódio 3", url: "https://drive.google.com/file/d/1uGvOFcRIiP65I_XAzdUBIIwU-e-gljnu/view?usp=sharing" },
      { id: "sja-e4", title: "Sarah Jane's Alien Files — Episódio 4", url: "https://drive.google.com/file/d/1Hrh9NmTNk84wVa3NEHhZz-ByfYQ4blW0/view?usp=sharing" },
      { id: "sja-e5", title: "Sarah Jane's Alien Files — Episódio 5", url: "https://drive.google.com/file/d/1AhKqeHVSugiJFMqFMdz5EhL5-9jHpBta/view?usp=sharing" },
      { id: "sja-e6", title: "Sarah Jane's Alien Files — Episódio 6", url: "https://drive.google.com/file/d/1CfUp5nlGzU92pUDAwcxA8_tylYjiJ-Xa/view?usp=sharing" }
    ]
  },
  {
    id: "spinoff-torchwood",
    title: "Torchwood",
    originalTitle: "Torchwood",
    description: "Equipe liderada pelo Capitão Jack Harkness investiga e defende a Terra contra ameaças alienígenas e fendas temporais no seio de Cardiff. Séries de ficção científica mais maduras e sombrias do universo expandido.",
    poster: "https://files.catbox.moe/hnixyi.png",
    episodes: [
      { id: "tw-s1", title: "Torchwood — Temporada 1 (Legendado)", url: "https://mahblue6.blogspot.com/2020/02/torchwood-1-temporada-legendada.html" },
      { id: "tw-s2", title: "Torchwood — Temporada 2 (Pasta GDrive)", url: "https://drive.google.com/drive/folders/1u-f74z9jtNNh0yUe4XeR6GR7bx70X1TD?usp=sharing" },
      { id: "tw-s3", title: "Torchwood — Temporada 3 (Legendado)", url: "https://mahblue6.blogspot.com/2020/02/torchwood-3-temporada-legendada.html" },
      { id: "tw-s4", title: "Torchwood — Temporada 4 (Legendado)", url: "https://mahblue6.blogspot.com/2020/02/torchwood-4-temporada-legendada.html" }
    ]
  }
];

export const SPECIALS: SpecialItem[] = [
  {
    id: "spec-evil-daleks",
    title: "The Evil of the Daleks — Animação",
    originalTitle: "The Evil of the Daleks (Animation)",
    description: "Este arco icônico apresenta a 1ª aparição do Imperador Dalek e marca a maior tentativa de Terry Nation de extinguir os Daleks. Resgatado de gravações deletadas nos anos 60 através de uma deslumbrante animação reconstruída.",
    poster: "https://files.catbox.moe/s9hgn6.jpg",
    url: "https://drive.google.com/drive/folders/1n5HHdB8VokzkCv5CqDJxq8nqgUTsnm5w?usp=sharing"
  },
  {
    id: "spec-space-time",
    title: "Uma Aventura no Espaço e Tempo",
    originalTitle: "An Adventure in Space and Time",
    year: "2013",
    description: "A emocionante dramatização de Mark Gatiss para o aniversário de 50 anos de Doctor Who, contando a lendária criação da série pela jovem produtora Verity Lambert, Sydney Newman e o consagrado ator William Hartnell.",
    poster: "https://files.catbox.moe/3a11qz.jpg",
    url: "https://drive.google.com/file/d/1WA-0qMUT-gy2hoQj0HCuN1gUf6g-BDbl/view?usp=sharing"
  },
  {
    id: "spec2023-star-beast",
    title: "A Besta Estelar (Especial 1)",
    originalTitle: "The Star Beast",
    year: "2023",
    description: "O Décimo Quarto Doutor (David Tennant) e Donna Noble se reencontram quando uma nave com Meep, uma criatura enganadora fofa mas perigosa sendo caçada por guerreiros interestelares, despenca na Terra.",
    poster: "https://files.catbox.moe/47bnqg.jpg",
    url: "https://drive.google.com/drive/folders/1jIhkoHIbuqcSKbdk4-lfugs-FILTQHux?usp=sharing"
  },
  {
    id: "spec2023-blue-yonder",
    title: "Wild Blue Yonder (Especial 2)",
    originalTitle: "Wild Blue Yonder",
    year: "2023",
    description: "A TARDIS defeituosa envia o Doutor e Donna para o limite do universo, onde ficam presos em uma nave abandonada jogando gato e rato com duas criaturas misteriosas que copiam e deformam suas aparências.",
    poster: "https://files.catbox.moe/q690wm.jpg",
    url: "https://drive.google.com/drive/folders/1IKGYmE0H2Sk8iXgG0qAZdS6_ihaPeLuD"
  },
  {
    id: "spec2023-giggle",
    title: "A Gargalhada (Especial 3)",
    originalTitle: "The Giggle",
    year: "2023",
    description: "Uma estranha gargalhada transmitida nas TVs enlouquece a humanidade. O Doutor e Donna investigam com a UNIT e se confrontam com o Fabricante de Brinquedos (Toymaker), culminando na fantástica bi-generação.",
    poster: "https://files.catbox.moe/fxit28.jpg",
    url: "https://drive.google.com/drive/folders/1277lXpRMPdbGFCb-v-6i8wn2jvmV07LM?usp=sharing"
  }
];

export const COLLABORATORS: Collaborator[] = [
  { name: "Eduardo Uruguaiano Frasão", role: "Idealização do projeto e Produção" },
  { name: "Loganwk", role: "Conceito da versão reestruturada em episódios" },
  { name: "Universo Who", role: "Equipe de Legendagem oficial em português" },
  { name: "MahBlue Series", role: "Legendagem e organização de links" },
  { name: "JC", role: "Legendagem e organização técnica" }
];
