const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-toggle]");
const heroCarousel = document.querySelector("[data-hero-carousel]");
const heroCarouselDots = document.querySelector("[data-hero-carousel-dots]");
const searchPanel = document.querySelector(".search-panel");
const scrollTopButton = document.querySelector("[data-scroll-top]");
const quoteForm = document.querySelector(".quote-form");
const quoteFeedback = document.querySelector("[data-quote-feedback]");
const equipmentDrawer = document.querySelector("[data-equipment-drawer]");
const equipmentDrawerPanel = equipmentDrawer?.querySelector(".equipment-drawer__panel");
const equipmentDrawerContent = document.querySelector("[data-equipment-drawer-content]");
const photoViewer = document.querySelector("[data-photo-viewer]");
const photoViewerDialog = photoViewer?.querySelector(".photo-viewer__dialog");
const photoViewerMedia = photoViewer?.querySelector(".photo-viewer__media");
const photoViewerImage = document.querySelector("[data-photo-viewer-image]");
const photoViewerTitle = document.querySelector("[data-photo-viewer-title]");
const photoViewerCount = document.querySelector("[data-photo-viewer-count]");
const photoViewerPrev = document.querySelector("[data-photo-viewer-prev]");
const photoViewerNext = document.querySelector("[data-photo-viewer-next]");
let lastFocusedElement = null;
let lastPhotoFocusedElement = null;
let photoViewerImages = [];
let photoViewerIndex = 0;
let catalogState = null;

const imageSizes = {
  "aspirador-industrial.png": [1292, 1217],
  "alisadora-de-concreto.png": [1254, 1254],
  "betoneira150L.png": [1211, 1299],
  "betoneira400L.png": [1254, 1254],
  "Bomba-centrifuga-a-gasolina.png": [1254, 1254],
  "bomba-de-mangote.png": [1254, 1254],
  "bomba-mangote.png": [1254, 1254],
  "bomba-submersivel.png": [1254, 1254],
  "compactador-solo-tipo-sapo-gasolina.png": [1086, 1448],
  "compressor-de-ar-10-PCM.png": [1254, 1254],
  "compressor-de-ar-15-PCM.png": [1254, 1254],
  "compressor-de-ar-40-PCM.png": [1254, 1254],
  "corrente-oregon-21bpx-motosserra.png": [1536, 1024],
  "cortadora-de-ceramica-e-porcelanato.png": [1254, 1254],
  "desbastadora-de-piso.png": [1254, 1254],
  "disco-de-corte-diamantado.png": [1254, 1254],
  "enceradeira-industrial.png": [1024, 1536],
  "escora.png": [1254, 1254],
  "esmerilhadeira.png": [1254, 1254],
  "escada-multiarticular.png": [1254, 1254],
  "escada-extensivel-20degraus.png": [1254, 1254],
  "escada_extensivel_37degraus.svg": [1254, 1254],
  "diagonal-andaime.png": [1254, 1254],
  "escada-andaime.png": [1254, 1254],
  "forcado-duplo.png": [1254, 1254],
  "forcado-simples.png": [1254, 1254],
  "furadeira-de-impacto.png": [1254, 1254],
  "guincho-coluna-100kg.png": [1254, 1254],
  "guincho-coluna-200kg.png": [1254, 1254],
  "guincho-coluna-350kg.png": [1254, 1254],
  "guarda-corpo-andaime.png": [1254, 1254],
  "lavadora-de-alta-pressao-profissional.png": [1180, 1333],
  "lixadeira-de-parede.png": [1536, 1024],
  "lixadeira-orbital.png": [1402, 1122],
  "longarina.png": [1254, 1254],
  "mangote-vibrador.png": [789, 923],
  "mangueira-bomba-dagua-20m.png": [1273, 1236],
  "motor-mangote-36.png": [1329, 1183],
  "motor-mangote-45.png": [1333, 1180],
  "motosserra-gasolina.png": [1254, 1254],
  "mîsturador-eletrico.png": [1254, 1254],
  "oleo-para-motor-de-2-tempos.png": [1254, 1254],
  "fresadora-de-piso-a-gasolina.png": [1254, 1254],
  "piso-metalico-andaime.png": [1254, 1254],
  "pistola-finca-pino.png": [1254, 1254],
  "pistola-finca-pino1.png": [1254, 1254],
  "placa-vibratoria.png": [1254, 1254],
  "politriz-de-piso-monofasica.png": [1254, 1254],
  "perfurador-solo-gasolina .png": [1086, 1448],
  "ponteira.png": [1254, 1254],
  "Produto-Sem-Imagem-600-x-600px.jpg": [600, 600],
  "quadro-andaime.png": [1254, 1254],
  "roda-andaime.png": [1254, 1254],
  "sapata-ajustavel-andaime.png": [1122, 1402],
  "sapata-fixa-andaime.png": [1254, 1254],
  "serra-de-bancada.png": [1254, 1254],
  "serra-de-marmore.png": [1254, 1254],
  "talha-manual1T.png": [1254, 1254],
  "talha-manual2T.png": [1254, 1254],
  "talhadeira.png": [1024, 1536],
  "tabuas-de-pinus-3m.png": [1254, 1254],
  "triturador de entulho.png": [1448, 1086],
  "torre-andaime.png": [1122, 1402],
  "travessa-andaime.png": [1122, 1402],
  "bg-Slide-Andaime-LOCTUBO.png": [1684, 934],
  "bg-Slide-Equipamentos.png": [1684, 934],
  "bg-Slide-Equipamentos-concretagem.png": [1685, 934],
  "isotipo loctubo.png": [55, 123],
  "loctubo-logo.png": [93, 83]
};

const applyImagePerformanceAttributes = (image) => {
  const rawFileName = image.currentSrc.split("/").pop() || image.src.split("/").pop();
  const fileName = decodeURIComponent(rawFileName);
  const dimensions = imageSizes[fileName] || [320, 320];

  if (!image.hasAttribute("decoding")) {
    image.decoding = "async";
  }

  if (!image.hasAttribute("width")) {
    image.width = dimensions[0];
  }

  if (!image.hasAttribute("height")) {
    image.height = dimensions[1];
  }

  if (!image.hasAttribute("sizes")) {
    image.sizes = image.closest(".hero-carousel")
      ? "100vw"
      : "(min-width: 78rem) 25vw, (min-width: 58rem) 33vw, (min-width: 42rem) 50vw, 100vw";
  }

  if (!image.hasAttribute("srcset") && image.src) {
    image.srcset = `${image.src} ${dimensions[0]}w`;
  }

  if (!image.closest(".hero-carousel") && !image.closest(".site-header") && !image.hasAttribute("loading")) {
    image.loading = "lazy";
  }
};

document.querySelectorAll("img").forEach(applyImagePerformanceAttributes);

const setHeaderState = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 12);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

const setScrollTopState = () => {
  scrollTopButton?.classList.toggle("is-visible", window.scrollY > 560);
};

setScrollTopState();
window.addEventListener("scroll", setScrollTopState, { passive: true });

scrollTopButton?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

if (menuButton) {
  const menu = document.querySelector(menuButton.dataset.menuToggle);
  const desktopMenuQuery = window.matchMedia("(min-width: 58rem)");

  const closeMenu = () => {
    menu?.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    header?.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  };

  menuButton.addEventListener("click", () => {
    const isOpen = menu?.classList.toggle("is-open") ?? false;
    menuButton.setAttribute("aria-expanded", String(isOpen));
    header?.classList.toggle("is-open", isOpen);
    document.body.classList.toggle("menu-open", isOpen);
  });

  menu?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu?.classList.contains("is-open")) {
      closeMenu();
      menuButton.focus();
    }
  });

  const handleDesktopMenuChange = (event) => {
    if (event.matches) closeMenu();
  };

  if (typeof desktopMenuQuery.addEventListener === "function") {
    desktopMenuQuery.addEventListener("change", handleDesktopMenuChange);
  } else if (typeof desktopMenuQuery.addListener === "function") {
    desktopMenuQuery.addListener(handleDesktopMenuChange);
  }
}

const placeholderImage = "assets/imagens-catalogo/Produto-Sem-Imagem-600-x-600px.jpg";
// Manutencao rapida: adicione aqui o nome exato do equipamento para deixar indisponivel.
// Em itens objeto, tambem funciona usar available: false ou className: "is-unavailable".
const unavailableEquipmentNames = new Set([
  "Guincho de coluna 100 kg",
  "Guincho de coluna 200 kg",
  "Guincho de coluna 350 kg",
  "Talha manual 1 t",
  "Talha manual 2 t",
  "Perfurador de solo a gasolina",
  "Compactador de solo tipo sapo a gasolina",
  "Betoneira 150 litros",
  "Alisadora de concreto",
  "Misturador elétrico",
  "Politriz de piso monofásica",
  "Desbastadora de piso",
  "Fresadora de piso a gasolina",
  "Bomba centrífuga a gasolina",
  "Bomba de mangote",
  "Enceradeira industrial",
  "Lavadora de alta pressão profissional",
  "Serra de bancada",
  "Furadeira de impacto",
  "Lixadeira orbital",
  "Triturador de entulho",
  // "Martelete rompedor 30 kg"
]);

const createSizeConfigurator = (options) => ({
  title: "Escolha o tamanho",
  fields: [
    {
      label: "Tamanho",
      options
    }
  ]
});

const catalogCategories = [
  {
    id: "andaimes-tubulares",
    label: "Andaimes",
    eyebrow: "Acesso e trabalho em altura",
    title: "Andaimes",
    description: "Quadros, diagonais, travessas, pisos metálicos, rodapés, sapatas, rodas, escadas e guarda-corpos para diferentes necessidades de acesso e trabalho em altura.",
    items: [
      {
        name: "Andaime",
        description: "Torre de andaime tubular para acesso e trabalho em altura, indicada para obras, reformas e manutenções que precisam de plataforma elevada com montagem modular e estável.",
        manual: "assets/docs/manual-instrucoes/manual_andaime.pdf",
        images: [
          { src: "assets/imagens-catalogo/torre-andaime.png", alt: "Torre de andaime" }
        ]
      },
      {
        name: "Quadro para andaime",
        description: "Quadro tubular para composição da estrutura vertical do andaime, usado como base de montagem para formar módulos de acesso e apoio em altura.",
        configurator: createSizeConfigurator([
          "0,4 x 1,0 m",
          "0,4 x 1,5 m",
          "1,0 x 1,0 m",
          "1,0 x 2,0 m",
          "Reforçado 1,5 m",
          "Simples 1,0 x 1,5 m"
        ]),
        images: [
          { src: "assets/imagens-catalogo/quadro-andaime.png", alt: "Quadro para andaime" }
        ]
      },
      {
        name: "Diagonal para andaime",
        description: "Diagonal para travamento e contraventamento do andaime, ajudando a dar rigidez à estrutura durante a montagem e o uso na obra.",
        configurator: createSizeConfigurator([
          "1,0 m",
          "1,5 m",
          "1,8 m",
          "2,0 m"
        ]),
        images: [
          { src: "assets/imagens-catalogo/diagonal-andaime.png", alt: "Diagonal para andaime" }
        ]
      },
      {
        name: "Travessa para andaime",
        description: "Travessa tubular para ligação entre quadros de andaime, utilizada para estabilizar módulos e apoiar a composição da plataforma de trabalho.",
        configurator: createSizeConfigurator([
          "1,0 m - apoio",
          "1,5 m - apoio",
          "Simples 1,0 m",
          "Simples 1,5 m",
          "Simples 2,0 m"
        ]),
        images: [
          { src: "assets/imagens-catalogo/travessa-andaime.png", alt: "Travessa para andaime" }
        ]
      },
      {
        name: "Piso metálico para andaime",
        description: "Piso metálico para formar a plataforma de trabalho do andaime, oferecendo superfície de apoio resistente para circulação e execução de serviços em altura.",
        configurator: createSizeConfigurator([
          "1,0 x 0,27 m",
          "1,5 x 0,37 m",
          "2,0 x 0,37 m"
        ]),
        images: [
          { src: "assets/imagens-catalogo/piso-metalico-andaime.png", alt: "Piso metálico para andaime" }
        ]
      },
      {
        name: "Tábuas de Pinus 3 m",
        summary: "Tábuas de apoio para uso em obra, organização de passagens e composições provisórias.",
        description: "As tábuas de Pinus 3 m são indicadas para apoio em rotinas de obra, passagens provisórias, proteção de superfícies e composições temporárias conforme a necessidade do canteiro. São uma solução prática para organizar frentes de trabalho e auxiliar serviços de montagem, acabamento e circulação.",
        images: [
          { src: "assets/imagens-catalogo/tabuas-de-pinus-3m.png", alt: "Tábuas de Pinus 3 metros" }
        ]
      },
      {
        name: "Guarda-corpo para andaime",
        description: "Guarda-corpo para proteção periférica em andaimes, indicado para aumentar a segurança da área de trabalho elevada conforme a configuração da montagem.",
        configurator: createSizeConfigurator([
          "2,0 m com rodapé e porta",
          "2,0 m com rodapé sem porta",
          "2,0 m com rodapé sem porta e encaixe",
          "1,0 m com rodapé e porta",
          "1,0 m com rodapé sem porta",
          "1,0 m com rodapé sem porta e encaixe",
          "1,5 m com rodapé e porta",
          "1,5 m com rodapé sem porta",
          "1,5 m com rodapé sem porta e encaixe",
          "Rodapé metálico 1,0 m",
          "Rodapé metálico 1,5 m"
        ]),
        images: [
          { src: "assets/imagens-catalogo/guarda-corpo-andaime.png", alt: "Guarda-corpo para andaime" }
        ]
      },
      {
        name: "Sapata fixa para andaime",
        description: "Sapata fixa para apoio de andaimes tubulares, usada na base da estrutura para distribuir carga e manter o conjunto apoiado no piso.",
        images: [
          { src: "assets/imagens-catalogo/sapata-fixa-andaime.png", alt: "Sapata fixa para andaime" }
        ]
      },
      {
        name: "Sapata ajustável para andaime",
        description: "Sapata ajustável para nivelamento da base do andaime, indicada para compensar pequenas variações do piso e auxiliar na montagem alinhada da estrutura.",
        images: [
          { src: "assets/imagens-catalogo/sapata-ajustavel-andaime.png", alt: "Sapata ajustável para andaime" }
        ]
      },
      {
        name: "Roda para andaime",
        description: "Roda para andaime móvel, indicada para deslocamento controlado de torres em áreas de trabalho, sempre conforme as condições de uso e segurança da obra.",
        images: [
          { src: "assets/imagens-catalogo/roda-andaime.png", alt: "Roda para andaime" }
        ]
      },
      {
        name: "Escada para andaime",
        description: "Escada para acesso ao andaime, utilizada para subir e descer entre níveis da estrutura com mais praticidade durante serviços em altura.",
        configurator: createSizeConfigurator([
          "2,0 x 0,35 m"
        ]),
        images: [
          { src: "assets/imagens-catalogo/escada-andaime.png", alt: "Escada para andaime" }
        ]
      }
    ]
  },
  {
    id: "escadas",
    label: "Acesso e Elevação",
    eyebrow: "Acesso em altura e içamento",
    title: "Acesso e Elevação",
    description: "Escadas, guinchos de coluna e talhas para obras, reformas e manutenções que precisam de acesso, içamento e movimentação de cargas com praticidade.",
    items: [
      {
        name: "Escada extensível 37 degraus",
        summary: "Escada extensível para acesso em altura em serviços de obra, reforma e manutenção.",
        images: [
          { src: "assets/imagens-catalogo/escada_extensivel_37degraus.svg", alt: "Ilustração da escada extensível 37 degraus" }
        ]
      },
      {
        name: "Escada extensível 20 degraus",
        summary: "Escada extensível para acesso prático em altura em obras, reformas e manutenções.",
        description: "Escada extensível indicada para acesso em altura em obras, reformas e manutenções, oferecendo alcance prático para serviços rápidos com montagem simples.",
        images: [
          { src: "assets/imagens-catalogo/escada-extensivel-20degraus.png", alt: "Escada extensível 20 degraus" }
        ]
      },
      {
        name: "Escada multiarticular",
        summary: "Escada articulada para diferentes posições de trabalho em obras e manutenções.",
        images: [
          { src: "assets/imagens-catalogo/escada-multiarticular.png", alt: "Escada multiarticular" }
        ]
      },
      {
        name: "Guincho de coluna 100 kg",
        summary: "Guincho de coluna para içamento vertical de materiais leves no canteiro de obra.",
        description: "Guincho de coluna para içamento vertical de materiais leves, indicado para apoio em obras e reformas com mais agilidade no transporte de carga entre pavimentos.",
        images: [
          { src: "assets/imagens-catalogo/guincho-coluna-100kg.png", alt: "Guincho de coluna 100 kg" }
        ]
      },
      {
        name: "Guincho de coluna 200 kg",
        summary: "Guincho de coluna para elevar materiais em obras com operação prática e segura.",
        description: "Guincho de coluna para elevação vertical de cargas de até 200 kg, ideal para movimentar materiais em canteiros de obra com operação prática e segura.",
        images: [
          { src: "assets/imagens-catalogo/guincho-coluna-200kg.png", alt: "Guincho de coluna 200 kg" }
        ]
      },
      {
        name: "Guincho de coluna 350 kg",
        summary: "Guincho de coluna de maior capacidade para movimentação vertical de cargas na obra.",
        description: "Guincho de coluna de maior capacidade para içamento vertical de materiais na obra, ajudando a reduzir esforço manual e acelerar a movimentação de cargas.",
        images: [
          { src: "assets/imagens-catalogo/guincho-coluna-350kg.png", alt: "Guincho de coluna 350 kg" }
        ]
      },
      {
        name: "Talha manual 1 t",
        summary: "Talha manual para içamento e posicionamento controlado de cargas de até 1 tonelada.",
        description: "Talha manual com capacidade para 1 tonelada, indicada para içamento e posicionamento controlado de cargas em serviços de montagem, manutenção e obra.",
        images: [
          { src: "assets/imagens-catalogo/talha-manual1T.png", alt: "Talha manual 1 tonelada" }
        ]
      },
      {
        name: "Talha manual 2 t",
        summary: "Talha manual para movimentação e içamento de cargas mais pesadas com controle manual.",
        description: "Talha manual com capacidade para 2 toneladas, indicada para movimentação e içamento de cargas mais pesadas com controle manual e apoio seguro na operação.",
        images: [
          { src: "assets/imagens-catalogo/talha-manual2T.png", alt: "Talha manual 2 toneladas" }
        ]
      }
    ]
  },
  {
    id: "escoramento",
    label: "Escoramento",
    eyebrow: "Estrutura e concretagem",
    title: "Escoramento",
    description: "Peças para escoramento, reescoramento e montagem de torres metálicas com ajuste ao projeto da obra.",
    items: [
      {
        name: "Escoramento metálico",
        description: "Sistema de escoramento metálico para apoio de formas, lajes e vigas durante concretagem, cura ou reescoramento, com montagem ajustada conforme a necessidade da obra.",
        images: [
          { src: "assets/imagens-catalogo/escoramento-metalico.png", alt: "Escoramento metálico" }
        ]
      },
      {
        name: "Forcado duplo",
        description: "Peça de apoio para receber duas longarinas no sistema de escoramento, auxiliando no alinhamento e na distribuição das cargas conforme o projeto da obra.",
        images: [
          { src: "assets/imagens-catalogo/forcado-duplo.png", alt: "Forcado duplo para escoramento" }
        ]
      },
      {
        name: "Forcado simples",
        description: "Peça de apoio para uma longarina ou viga no escoramento de lajes e vigas, indicada para ajuste de nivelamento e apoio das formas.",
        images: [
          { src: "assets/imagens-catalogo/forcado-simples.png", alt: "Forcado simples para escoramento" }
        ]
      },
      {
        name: "Longarina",
        description: "Perfil metálico usado como elemento de apoio e distribuição de carga em sistemas de escoramento e reescoramento de lajes e vigas.",
        configurator: createSizeConfigurator([
          "Comprimento 2,0 m",
          "Comprimento 3,0 m",
          "Comprimento 4,0 m"
        ]),
        images: [
          { src: "assets/imagens-catalogo/longarina.png", alt: "Longarina para escoramento" }
        ]
      },
      {
        name: "Escora",
        description: "Escora metálica regulável para apoio pontual de formas, vigas e lajes durante concretagem, cura ou reescoramento.",
        configurator: createSizeConfigurator([
          "3,50 m",
          "4,0 m"
        ]),
        images: [
          { src: "assets/imagens-catalogo/escora.png", alt: "Escora metálica regulável" }
        ]
      }
    ]
  },
  {
    id: "demolicao",
    label: "Demolição",
    eyebrow: "Rompedores elétricos",
    title: "Demolição",
    description: "Marteletes rompedores para demolição leve, média e pesada em paredes, pisos e lajes.",
    items: [
      {
        name: "Martelete rompedor 6 kg",
        description: "O martelete rompedor 6kg é indicado para serviços de demolição, perfuração e remoção em concreto, alvenaria e superfícies resistentes, oferecendo potência, precisão e alto desempenho na construção civil. Compacto e versátil, o equipamento é ideal para reformas, instalações elétricas e hidráulicas, abertura de canaletas e pequenos rompimentos, garantindo mais agilidade e eficiência na execução do trabalho. Com estrutura robusta, fácil manuseio e excelente desempenho operacional, o martelete rompedor proporciona mais produtividade, conforto e segurança para diferentes tipos de obra.",
        images: [{ src: "assets/imagens-catalogo/martelete-rompedor-6kg.png", alt: "Martelete rompedor 6 kg" }]
      },
      {
        name: "Martelete rompedor 11 kg",
        description: "O martelete rompedor 11kg é ideal para serviços pesados de demolição e rompimento em concreto, pisos, lajes, asfaltos e estruturas de alta resistência. Com elevada força de impacto e alto desempenho operacional, o equipamento garante mais rapidez e eficiência em obras de construção civil, reformas e infraestrutura. Robusto, resistente e de fácil operação, o martelete de 11kg é indicado para trabalhos intensivos que exigem potência e produtividade, proporcionando maior rendimento, redução do esforço operacional e excelente desempenho no canteiro de obras.",
        images: [{ src: "assets/imagens-catalogo/martelete-rompedor-11kg.png", alt: "Martelete rompedor 11 kg" }]
      },
      {
        name: "Martelete rompedor 18 kg",
        description: "O martelete rompedor 18kg é indicado para demolições pesadas e serviços de alto impacto em concreto, asfalto, pisos industriais, lajes e estruturas de grande resistência. Com elevada potência e força de rompimento, o equipamento oferece máximo desempenho em obras de construção civil, infraestrutura e reformas de grande porte, garantindo mais rapidez e eficiência na execução dos trabalhos. Robusto, resistente e preparado para operações intensivas, o martelete de 18kg proporciona alta produtividade, redução do esforço operacional e excelente desempenho mesmo nas aplicações mais exigentes.",
        images: [{ src: "assets/imagens-catalogo/martelete-rompedor-18kg.png", alt: "Martelete rompedor 18 kg" }]
      },
      {
        name: "Martelete rompedor 30 kg",
        description: "O martelete rompedor 30kg é a escolha ideal para demolições pesadas e trabalhos de grande impacto em concreto armado, asfalto, fundações, pisos industriais e estruturas de alta resistência. Desenvolvido para operações intensivas, o equipamento oferece extrema potência e alta capacidade de rompimento, garantindo máxima eficiência e produtividade em obras de construção civil, infraestrutura e manutenção pesada. Com estrutura robusta e desempenho superior, o martelete de 30kg proporciona mais agilidade na execução dos serviços, redução do tempo de trabalho e excelente rendimento mesmo nas aplicações mais exigentes.",
        images: [{ src: "assets/imagens-catalogo/martelete-rompedor-30kg.png", alt: "Martelete rompedor 30 kg" }]
      },
      {
        name: "Triturador de entulho",
        summary: "Equipamento para reduzir resíduos de obra e facilitar descarte, transporte e reaproveitamento.",
        description: "O triturador de entulho é indicado para processar resíduos de construção civil, como restos de alvenaria, concreto e cerâmica, reduzindo o volume do material no canteiro. Ajuda a organizar a frente de trabalho, facilitar o transporte e apoiar rotinas de descarte ou reaproveitamento conforme a necessidade da obra.",
        images: [
          { src: "assets/imagens-catalogo/triturador de entulho.png", alt: "Triturador de entulho" }
        ]
      },
      {
        name: "Ponteira",
        summary: "Acessório para martelete rompedor em abertura, quebra e remoção de concreto.",
        description: "A ponteira é indicada para uso com marteletes rompedores em serviços de demolição, abertura de pontos, quebra localizada e remoção de concreto ou alvenaria. Ajuda a concentrar o impacto em uma área menor, oferecendo mais precisão em intervenções de obra e manutenção.",
        configurator: createSizeConfigurator([
          "400 mm",
          "500 mm"
        ]),
        images: [{ src: "assets/imagens-catalogo/ponteira.png", alt: "Ponteira para martelete rompedor" }]
      },
      {
        name: "Talhadeira",
        summary: "Acessório para martelete rompedor em remoções, rasgos e acabamentos de demolição.",
        description: "A talhadeira é indicada para uso com marteletes rompedores em remoção de revestimentos, abertura de canaletas, rasgos e ajustes em concreto ou alvenaria. O formato em lâmina ajuda a distribuir o impacto para cortes e destacamentos com mais controle.",
        configurator: createSizeConfigurator([
          "400 mm",
          "500 mm"
        ]),
        images: [{ src: "assets/imagens-catalogo/talhadeira.png", alt: "Talhadeira para martelete rompedor" }]
      }
    ]
  },
  {
    id: "ferramentas-eletricas",
    label: "Ferramentas elétricas",
    eyebrow: "Corte, fixação e apoio",
    title: "Ferramentas elétricas",
    description: "Ferramentas para cortes, fixação e apoio em etapas de obra, reforma e manutenção.",
    items: [
      {
        name: "Esmerilhadeira",
        description: "A esmerilhadeira é um equipamento versátil e indispensável para cortes, desbastes, lixamentos e acabamentos em metais, concreto, pedras e diversos materiais da construção civil. Compacta, potente e de fácil manuseio, ela oferece alto desempenho e precisão em serviços de serralheria, reformas, manutenção e obras em geral. Indicada para trabalhos que exigem agilidade e eficiência, a esmerilhadeira proporciona excelente acabamento, maior produtividade e segurança nas operações, atendendo desde pequenos ajustes até aplicações mais intensivas.",
        images: [{ src: "assets/imagens-catalogo/esmerilhadeira.png", alt: "Esmerilhadeira" }]
      },
      {
        name: "Serra mármore",
        description: "A serra mármore é ideal para cortes precisos e eficientes em materiais como porcelanato, cerâmica, mármore, granito, concreto e alvenaria. Compacta, potente e de fácil manuseio, o equipamento proporciona excelente acabamento e alto desempenho em obras, reformas e instalações, garantindo mais agilidade e precisão nos cortes. Indicada para profissionais da construção civil e acabamentos, a serra mármore oferece praticidade, segurança e produtividade em diferentes tipos de aplicação.",
        images: [
          { src: "assets/imagens-catalogo/serra-de-marmore.png", alt: "Serra mármore" }
        ]
      },
      {
        name: "Cortadora de cerâmica e porcelanato",
        summary: "Cortadora para cortes retos e precisos em revestimentos cerâmicos e porcelanatos.",
        description: "A cortadora de cerâmica e porcelanato é indicada para cortes retos, limpos e precisos em pisos e revestimentos. É uma solução prática para assentamento, reformas e acabamento, ajudando a reduzir quebras, melhorar o aproveitamento das peças e dar mais produtividade à instalação.",
        images: [
          { src: "assets/imagens-catalogo/cortadora-de-ceramica-e-porcelanato.png", alt: "Cortadora de cerâmica e porcelanato" }
        ]
      },
      {
        name: "Disco de corte diamantado",
        summary: "Disco diamantado para cortes em materiais de obra, conforme a ferramenta compatível.",
        description: "O disco de corte diamantado é indicado para cortes em materiais como concreto, cerâmica, porcelanato, pedra e alvenaria, conforme a aplicação e a ferramenta utilizada. É um acessório essencial para serviços de acabamento, ajustes de peças e cortes precisos em obra.",
        images: [
          { src: "assets/imagens-catalogo/disco-de-corte-diamantado.png", alt: "Disco de corte diamantado" }
        ]
      },
      {
        name: "Serra de bancada",
        images: [{ src: "assets/imagens-catalogo/serra-de-bancada.png", alt: "Serra de bancada" }]
      },
      {
        name: "Pistola finca-pino",
        description: "A pistola finca pino é ideal para fixações rápidas, seguras e eficientes em concreto, aço e alvenaria, proporcionando mais agilidade e praticidade em obras e instalações. Indicada para fixação de perfis, suportes, conduítes, forros, estruturas metálicas e diversos componentes da construção civil, o equipamento oferece alto desempenho e precisão, reduzindo o tempo de execução e o esforço operacional. Compacta, resistente e de fácil manuseio, a pistola finca pino garante produtividade, firmeza nas fixações e excelente desempenho em aplicações profissionais.",
        images: [
          { src: "assets/imagens-catalogo/pistola-finca-pino.png", alt: "Pistola finca-pino" },
          { src: "assets/imagens-catalogo/pistola-finca-pino1.png", alt: "Pistola finca-pino" }
        ]
      },
      {
        name: "Furadeira de impacto",
        description: "Furadeira de impacto indicada para perfurações em alvenaria, concreto, madeira e metal, conforme a broca utilizada. É uma ferramenta versátil para obras, reformas e instalações, oferecendo praticidade em fixações, montagem de estruturas, passagem de conduítes e serviços de manutenção.",
        images: [
          { src: "assets/imagens-catalogo/furadeira-de-impacto.png", alt: "Furadeira de impacto" }
        ]
      },
      {
        name: "Lixadeira orbital",
        description: "Lixadeira orbital indicada para acabamento, nivelamento e preparação de superfícies em madeira, massa corrida, pintura e pequenos reparos. Ajuda a remover imperfeições e deixar a superfície mais uniforme antes da pintura, verniz ou acabamento final.",
        images: [
          { src: "assets/imagens-catalogo/lixadeira-orbital.png", alt: "Lixadeira orbital" }
        ]
      },
      {
        name: "Motosserra à gasolina",
        summary: "Motosserra para cortes em madeira, poda pesada e apoio em serviços externos.",
        description: "A motosserra à gasolina é indicada para cortes em madeira, poda pesada, limpeza de áreas e apoio em serviços externos onde mobilidade e autonomia são importantes. O equipamento oferece bom desempenho para frentes de trabalho sem ponto de energia próximo, sempre com operação orientada e uso dos acessórios de segurança adequados.",
        images: [
          { src: "assets/imagens-catalogo/motosserra-gasolina.png", alt: "Motosserra à gasolina" }
        ]
      },
      {
        name: "Corrente Oregon 21BPX para motosserra",
        summary: "Corrente para motosserra indicada para reposição e manutenção do corte.",
        description: "A corrente Oregon 21BPX para motosserra é indicada para manter o corte eficiente em serviços com madeira. É um acessório de reposição para operações que exigem bom rendimento, acabamento regular e manutenção correta do conjunto de corte.",
        images: [
          { src: "assets/imagens-catalogo/corrente-oregon-21bpx-motosserra.png", alt: "Corrente Oregon 21BPX para motosserra" }
        ]
      },
      {
        name: "Óleo para motor de 2 tempos",
        summary: "Óleo para mistura e lubrificação de equipamentos com motor 2 tempos.",
        description: "O óleo para motor de 2 tempos é indicado para preparo da mistura e manutenção adequada de equipamentos a gasolina que utilizam esse tipo de motor. Ajuda a proteger componentes internos, reduzir desgaste e manter o equipamento operando com mais confiabilidade durante o serviço.",
        images: [
          { src: "assets/imagens-catalogo/oleo-para-motor-de-2-tempos.png", alt: "Óleo para motor de 2 tempos" }
        ]
      }
    ]
  },
  {
    id: "concreto",
    label: "Concretagem",
    eyebrow: "Preparo e adensamento",
    title: "Concretagem",
    description: "Equipamentos para preparo, mistura, adensamento e acabamento do concreto em lajes, vigas, pilares, pisos e sapatas.",
    items: [
      {
        name: "Betoneira 400 litros",
        description: "A betoneira 400L é ideal para o preparo eficiente de concreto, argamassa e massa em obras de pequeno, médio e grande porte. Com alta capacidade de mistura e excelente desempenho, o equipamento garante maior produtividade, uniformidade dos materiais e agilidade na execução dos serviços. Robusta, resistente e de fácil operação, a betoneira é indicada para construções, reformas, fundações, calçadas e diversas aplicações da construção civil, proporcionando mais praticidade, economia de tempo e qualidade no canteiro de obras.",
        images: [
          { src: "assets/imagens-catalogo/betoneira400L.png", alt: "Betoneira 400 litros" }
        ]
      },
      {
        name: "Mangote vibrador",
        description: "O mangote vibrador é essencial para garantir a compactação e o adensamento correto do concreto, eliminando bolhas de ar e evitando falhas estruturais durante a concretagem. Indicado para obras de pequeno, médio e grande porte, o equipamento proporciona maior resistência, uniformidade e qualidade no acabamento de pilares, vigas, lajes, fundações e estruturas em concreto armado. Robusto, eficiente e de fácil operação, o mangote vibrador contribui para mais produtividade, segurança e durabilidade nas etapas de concretagem da obra.",
        configurator: createSizeConfigurator([
          "36",
          "45"
        ]),
        images: [{ src: "assets/imagens-catalogo/mangote-vibrador.png", alt: "Mangote vibrador de imersão para concreto" }]
      },
      {
        name: "Motor Mangote 36",
        summary: "Motor para acionamento de mangote vibrador 36 em concretagens.",
        description: "O motor para mangote 36 é indicado para acionar o vibrador de imersão em serviços de concretagem, ajudando no adensamento correto do concreto em pilares, vigas, lajes e fundações. É uma opção prática para obras que precisam combinar produtividade, mobilidade e acabamento estrutural mais uniforme.",
        images: [
          { src: "assets/imagens-catalogo/motor-mangote-36.png", alt: "Motor para mangote 36" }
        ]
      },
      {
        name: "Motor Mangote 45",
        summary: "Motor para acionamento de mangote vibrador 45 em concretagens.",
        description: "O motor para mangote 45 é indicado para acionar o vibrador de imersão em concretagens que exigem adensamento eficiente e contínuo. Ajuda a eliminar bolhas de ar, melhorar o preenchimento das formas e aumentar a qualidade final de peças estruturais em concreto.",
        images: [
          { src: "assets/imagens-catalogo/motor-mangote-45.png", alt: "Motor para mangote 45" }
        ]
      },
      {
        name: "Betoneira 150 litros",
        summary: "Betoneira compacta para preparo de concreto e argamassa em obras e reformas menores.",
        description: "A betoneira 150L é indicada para preparo de concreto, argamassa e massa em obras menores, reformas e serviços de manutenção. Compacta e prática, ajuda a manter a mistura uniforme, reduz o esforço manual e melhora a produtividade no canteiro.",
        images: [
          { src: "assets/imagens-catalogo/betoneira150L.png", alt: "Betoneira 150 litros" }
        ]
      },
      {
        name: "Alisadora de concreto",
        summary: "Equipamento para acabamento e alisamento de pisos de concreto recém-executados.",
        description: "A alisadora de concreto é indicada para acabamento de pisos de concreto, ajudando a nivelar, alisar e melhorar a qualidade da superfície após a concretagem. É ideal para obras que precisam de acabamento mais uniforme, produtivo e profissional.",
        images: [
          { src: "assets/imagens-catalogo/alisadora-de-concreto.png", alt: "Alisadora de concreto" }
        ]
      },
      {
        name: "Misturador elétrico",
        summary: "Misturador elétrico para massas, argamassas, tintas e outros materiais de obra.",
        description: "O misturador elétrico é indicado para preparar argamassas, massas, tintas, rejuntes e outros materiais com mais agilidade e uniformidade. É uma opção prática para reformas, acabamentos e serviços que exigem mistura constante e bem incorporada.",
        images: [
          { src: "assets/imagens-catalogo/mîsturador-eletrico.png", alt: "Misturador elétrico" }
        ]
      },
      {
        name: "Desbastadora de piso",
        summary: "Equipamento para regularização, remoção de imperfeições e preparo de pisos.",
        description: "A desbastadora de piso é indicada para remover irregularidades, resíduos e camadas superficiais, preparando pisos de concreto para acabamento, pintura, revestimento ou recuperação. Ajuda a dar mais produtividade e padronização ao preparo da superfície.",
        images: [
          { src: "assets/imagens-catalogo/desbastadora-de-piso.png", alt: "Desbastadora de piso" }
        ]
      },
      {
        name: "Fresadora de piso a gasolina",
        summary: "Fresadora para remoção e preparo de superfícies de concreto e pavimentos.",
        description: "A fresadora de piso a gasolina é indicada para remoção de revestimentos, regularização e preparo de superfícies de concreto ou pavimentos. Robusta e produtiva, auxilia em serviços de recuperação, nivelamento e preparação de bases para novas etapas da obra.",
        images: [
          { src: "assets/imagens-catalogo/fresadora-de-piso-a-gasolina.png", alt: "Fresadora de piso a gasolina" }
        ]
      },
      {
        name: "Politriz de piso monofásica",
        summary: "Politriz para acabamento, polimento e recuperação de pisos de concreto.",
        description: "A politriz de piso monofásica é indicada para acabamento, polimento e recuperação de superfícies de concreto, granilite e pisos industriais. É uma opção prática para obras e reformas que precisam melhorar o nivelamento, remover marcas superficiais e preparar o piso para acabamento ou tratamento final.",
        images: [
          { src: "assets/imagens-catalogo/politriz-de-piso-monofasica.png", alt: "Politriz de piso monofásica" }
        ]
      },
      {
        name: "Lixadeira de parede",
        summary: "Lixadeira para preparo de paredes, tetos e superfícies antes da pintura.",
        description: "A lixadeira de parede é indicada para nivelar massa corrida, remover pequenas imperfeições e preparar paredes e tetos para pintura ou acabamento. Ajuda a reduzir esforço manual e entregar uma superfície mais uniforme em reformas, obras e serviços de manutenção.",
        images: [
          { src: "assets/imagens-catalogo/lixadeira-de-parede.png", alt: "Lixadeira de parede" }
        ]
      }
    ]
  },
  {
    id: "compactacao",
    label: "Compactação e Escavação",
    eyebrow: "Preparo de base",
    title: "Compactação e Escavação",
    description: "Equipamentos para compactar solo, abrir perfurações e preparar bases, valas, fundações leves e áreas de circulação da obra.",
    items: [
      {
        name: "Placa vibratória",
        description: "A placa vibratória é um equipamento essencial para serviços de compactação em obras de construção civil, garantindo maior firmeza, nivelamento e estabilidade do solo. Indicada para compactar areia, brita, cascalho, solo granular e pavimentos intertravados, ela oferece alto desempenho em aplicações como preparação de terrenos, assentamento de pisos, calçadas, valas e pequenas fundações. Com operação prática, estrutura robusta e excelente eficiência, a placa vibratória proporciona acabamento uniforme, reduz falhas na compactação e contribui para mais agilidade, segurança e produtividade na execução da obra.",
        manual: "assets/docs/manual-instrucoes/manual_placa-vibratoria.pdf",
        images: [
          { src: "assets/imagens-catalogo/placa-vibratoria.png", alt: "Placa vibratória" }
        ]
      },
      {
        name: "Perfurador de solo a gasolina",
        summary: "Equipamento para perfuração de solo em fundações, cercas, mourões e serviços externos.",
        description: "O perfurador de solo é a solução ideal para perfurações rápidas, precisas e eficientes em diversos tipos de terreno. Indicado para instalação de cercas, mourões, postes, estacas, plantio e fundações leves, o equipamento oferece alto desempenho com menor esforço operacional, agilizando os serviços em obras, áreas rurais e projetos de paisagismo. Com estrutura robusta, fácil manuseio e excelente capacidade de perfuração, o perfurador de solo proporciona mais produtividade, praticidade e segurança na execução do trabalho.",
        images: [
          { src: "assets/imagens-catalogo/perfurador-solo-gasolina .png", alt: "Perfurador de solo a gasolina" }
        ]
      },
      {
        name: "Compactador de solo tipo sapo a gasolina",
        summary: "Compactador tipo sapo para valas, bases, aterros e áreas com acesso mais estreito.",
        description: "O compactador de solo tipo sapinho é ideal para compactação de solos em áreas estreitas e de difícil acesso, oferecendo alto desempenho e eficiência em obras de construção civil, saneamento e infraestrutura. Indicado para compactar solos argilosos, valas, fundações, calçadas e reparos de pavimentação, o equipamento possui forte impacto vertical, garantindo excelente densidade e estabilidade do terreno. Robusto, resistente e de fácil operação, o sapinho proporciona maior precisão na compactação, reduz retrabalhos e contribui para mais produtividade, segurança e qualidade na execução da obra.",
        images: [
          { src: "assets/imagens-catalogo/compactador-solo-tipo-sapo-gasolina.png", alt: "Compactador de solo tipo sapo a gasolina" }
        ]
      }
    ]
  },
  {
    id: "drenagem-agua",
    label: "Drenagem de Água",
    eyebrow: "Remoção e transferência",
    title: "Drenagem de Água",
    description: "Bombas para drenagem, transferência e esgotamento de água em obras, valas, caixas, poços e áreas alagadas.",
    items: [
      {
        name: "Bomba centrífuga a gasolina",
        summary: "Bomba a gasolina para transferência e drenagem de água em locais sem energia elétrica.",
        description: "A bomba centrífuga a gasolina é indicada para transferência, drenagem e esgotamento de água em obras, áreas externas, valas e reservatórios. Por não depender de energia elétrica no ponto de uso, oferece praticidade em frentes de trabalho afastadas ou com acesso limitado à rede.",
        images: [
          { src: "assets/imagens-catalogo/Bomba-centrifuga-a-gasolina.png", alt: "Bomba centrífuga a gasolina" }
        ]
      },
      {
        name: "Bomba de mangote",
        summary: "Bomba de mangote para remoção de água em valas, poços e áreas de difícil acesso.",
        description: "A bomba de mangote é indicada para drenagem e remoção de água em valas, poços, caixas e pontos de difícil acesso. É uma solução prática para apoiar serviços de obra, manutenção e esgotamento temporário com boa mobilidade no canteiro.",
        images: [
          { src: "assets/imagens-catalogo/bomba-de-mangote.png", alt: "Bomba de mangote" },
          { src: "assets/imagens-catalogo/bomba-mangote.png", alt: "Bomba de mangote em detalhe" }
        ]
      },
      {
        name: "Mangueira bomba d'água 20 m",
        summary: "Mangueira de 20 m para apoio em drenagem, esgotamento e transferência de água.",
        description: "A mangueira para bomba d'água 20 m é indicada para conduzir água em serviços de drenagem, esgotamento e transferência no canteiro de obras. Auxilia na conexão entre bomba e ponto de descarte, trazendo mais alcance e praticidade para áreas alagadas, valas, poços e reservatórios.",
        images: [
          { src: "assets/imagens-catalogo/mangueira-bomba-dagua-20m.png", alt: "Mangueira para bomba d'água 20 metros" }
        ]
      },
      {
        name: "Bomba submersível",
        summary: "Bomba submersível para esgotamento de água em áreas alagadas, poços e reservatórios.",
        description: "A bomba submersível é indicada para esgotamento e drenagem de água em áreas alagadas, poços, caixas, reservatórios e ambientes de obra. Compacta e eficiente, auxilia na retirada rápida de água acumulada e no controle de pontos de alagamento.",
        images: [
          { src: "assets/imagens-catalogo/bomba-submersivel.png", alt: "Bomba submersível" }
        ]
      }
    ]
  },
  {
    id: "limpeza",
    label: "Limpeza e Pintura",
    eyebrow: "Limpeza, lavagem e pintura",
    title: "Limpeza e Pintura",
    description: "Equipamentos para limpeza pesada, lavagem de superfícies, acabamento de pisos e apoio em serviços de pintura e manutenção.",
    items: [
      {
        name: "Aspirador industrial",
        description: "O aspirador industrial é ideal para limpeza pesada e remoção eficiente de resíduos sólidos e líquidos em obras, indústrias, oficinas e ambientes comerciais. Com alta capacidade de sucção e excelente desempenho, o equipamento facilita a limpeza de poeira, entulhos, serragem, água e diversos tipos de resíduos, proporcionando mais praticidade, agilidade e organização no ambiente de trabalho. Robusto, resistente e de fácil operação, o aspirador industrial contribui para maior produtividade, segurança e eficiência nas atividades de limpeza e manutenção.",
        images: [
          { src: "assets/imagens-catalogo/aspirador-industrial.png", alt: "Aspirador industrial" }
        ]
      },
      {
        name: "Compressor de ar 10 PCM",
        description: "Compressor de ar indicado para serviços leves de pintura, limpeza com ar comprimido, calibragem e acionamento de ferramentas pneumáticas de menor consumo. É uma opção prática para reformas, manutenção e apoio em acabamentos que precisam de mobilidade e operação simples.",
        images: [
          { src: "assets/imagens-catalogo/compressor-de-ar-10-PCM.png", alt: "Compressor de ar 10 PCM" }
        ]
      },
      {
        name: "Compressor de ar 15 PCM",
        description: "Compressor de ar com maior reserva de desempenho para pintura, pulverização, limpeza técnica e uso com ferramentas pneumáticas em obras, oficinas e serviços de manutenção. Ajuda a manter pressão estável em aplicações de rotina com mais produtividade.",
        images: [
          { src: "assets/imagens-catalogo/compressor-de-ar-15-PCM.png", alt: "Compressor de ar 15 PCM" }
        ]
      },
      {
        name: "Compressor de ar 40 PCM",
        description: "Compressor de ar de alta capacidade para serviços mais exigentes de pintura, jateamento leve, limpeza industrial e alimentação de ferramentas pneumáticas. Indicado para frentes de trabalho que precisam de maior vazão e operação contínua com robustez.",
        images: [
          { src: "assets/imagens-catalogo/compressor-de-ar-40-PCM.png", alt: "Compressor de ar 40 PCM" }
        ]
      },
      {
        name: "Lavadora de alta pressão profissional",
        description: "Lavadora de alta pressão profissional indicada para remoção de sujeira pesada em pisos, fachadas, calçadas, máquinas, equipamentos e áreas externas. Facilita a limpeza com jato concentrado, reduzindo esforço manual e agilizando a preparação de superfícies.",
        images: [
          { src: "assets/imagens-catalogo/lavadora-de-alta-pressao-profissional.png", alt: "Lavadora de alta pressão profissional" }
        ]
      },
      {
        name: "Enceradeira industrial",
        description: "Enceradeira industrial para limpeza, lavagem, polimento e conservação de pisos em obras, comércios, condomínios e áreas de grande circulação. Pode ser usada com acessórios adequados para remover sujeira, recuperar brilho e melhorar o acabamento da superfície.",
        images: [
          { src: "assets/imagens-catalogo/enceradeira-industrial.png", alt: "Enceradeira industrial" }
        ]
      }
    ]
  }
];

const normalizeSlug = (value) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const catalogFeaturedItemOrder = [
  "Andaime",
  "Escoramento metálico",
  "Escada multiarticular",
  "Martelete rompedor 30 kg",
  "Betoneira 400 litros",
  "Politriz de piso monofásica",
  "Placa vibratória",
  "Compactador de solo tipo sapo a gasolina",
  "Bomba submersível",
  "Aspirador industrial",
  "Enceradeira industrial",
  "Lavadora de alta pressão profissional",
  "Compressor de ar 40 PCM",
  "Serra de bancada",
  "Lixadeira orbital",
  "Esmerilhadeira"
];

const catalogFeaturedItemRank = new Map(
  catalogFeaturedItemOrder.map((name, index) => [normalizeSlug(name), index])
);

const getCatalogItemImages = (category, item) => {
  if (item.images) return item.images;
  if (category.imageSet) return category.imageSet;

  return [{ src: placeholderImage, alt: `Imagem ilustrativa de ${item.name || item}` }];
};

const normalizeCatalogItem = (rawItem) =>
  typeof rawItem === "string" ? { name: rawItem } : rawItem;

const isCatalogItemAvailable = (item) =>
  item.available !== false &&
  item.status !== "indisponivel" &&
  item.status !== "unavailable" &&
  !String(item.className || "").split(/\s+/).includes("is-unavailable") &&
  !unavailableEquipmentNames.has(item.name);

const createProductCard = (category, rawItem) => {
  const item = normalizeCatalogItem(rawItem);
  const isAvailable = isCatalogItemAvailable(item);
  const images = getCatalogItemImages(category, item);
  const detailId = item.detailId || `produto-${category.id}-${normalizeSlug(item.name)}`;
  const card = document.createElement("a");
  card.className = ["product-card", item.className || "", isAvailable ? "" : "is-unavailable"].filter(Boolean).join(" ");
  card.href = `#${detailId}`;
  card.dataset.catalogCategory = category.id;
  card.dataset.catalogTag = category.label;
  card.dataset.detailCategory = category.label;
  card.dataset.detailTitle = item.name;
  card.dataset.available = String(isAvailable);
  if (item.configurator) {
    card.dataset.configurator = JSON.stringify(item.configurator);
  }
  if (item.manual) {
    card.dataset.manual = item.manual;
  }
  card.dataset.detailDescription =
    item.description ||
    `${item.name} para locação na categoria ${category.label}. Informe quantidade, prazo e local da obra para receber orientação sobre disponibilidade e frete.`;
  card.dataset.detailSpecs = JSON.stringify(item.specs || [
    `Categoria: ${category.label}`,
    isAvailable ? "Disponibilidade sob consulta" : "Indisponível no momento",
    "Entrega combinada com frete"
  ]);

  const media = document.createElement("div");
  media.className = "product-card__media card-carousel";
  media.setAttribute("data-card-carousel", "");

  images.forEach((image, index) => {
    const element = document.createElement("img");
    element.className = index === 0 ? "card-carousel__image is-active" : "card-carousel__image";
    element.src = image.src;
    element.alt = image.alt || item.name;
    applyImagePerformanceAttributes(element);
    media.append(element);
  });

  const dots = document.createElement("span");
  dots.className = "card-carousel__dots";
  dots.setAttribute("data-card-carousel-dots", "");
  dots.setAttribute("aria-hidden", "true");
  media.append(dots);

  const tag = document.createElement("span");
  tag.className = "product-card__tag";
  tag.textContent = isAvailable ? category.label : "Indisponível";

  const title = document.createElement("h4");
  title.textContent = item.name;

  const description = document.createElement("p");
  description.textContent = item.summary || category.description;

  card.append(media, tag, title, description);
  return card;
};

const catalogRowsPerPage = 4;

const getGridColumnCount = (grid) => {
  if (!grid) return 1;

  const templateColumns = window.getComputedStyle(grid).gridTemplateColumns;
  const columns = templateColumns.split(" ").filter(Boolean);
  return Math.max(1, columns.length);
};

const getCatalogPageSize = (grid) => Math.max(4, getGridColumnCount(grid) * catalogRowsPerPage);

const syncCatalogPageSize = (state) => {
  if (!state?.grid) return;

  const nextPageSize = getCatalogPageSize(state.grid);
  if (state.pageSize === nextPageSize) return;

  const currentStartIndex = Math.max(0, (state.page - 1) * (state.pageSize || nextPageSize));
  state.pageSize = nextPageSize;
  state.page = Math.floor(currentStartIndex / nextPageSize) + 1;
};

const setCatalogFilter = (state, filter) => {
  state.filter = filter;
  state.page = 1;
  renderCatalogPage(state);
};

const getCatalogOriginalIndex = (card) => Number(card.dataset.catalogIndex || 0);

const getCatalogFeaturedRank = (card) => {
  const titleSlug = normalizeSlug(card.dataset.detailTitle || "");
  return catalogFeaturedItemRank.has(titleSlug)
    ? catalogFeaturedItemRank.get(titleSlug)
    : Number.MAX_SAFE_INTEGER;
};

const getCatalogCardsForFilter = (state) => {
  const filteredCards = state.cards.filter((card) => (
    state.filter === "todos" || card.dataset.catalogCategory === state.filter
  ));

  if (state.filter !== "todos") return filteredCards;

  return filteredCards.slice().sort((firstCard, secondCard) => {
    const rankDifference = getCatalogFeaturedRank(firstCard) - getCatalogFeaturedRank(secondCard);
    if (rankDifference !== 0) return rankDifference;

    return getCatalogOriginalIndex(firstCard) - getCatalogOriginalIndex(secondCard);
  });
};

const applyCatalogCardOrder = (state, orderedCards) => {
  const orderedCardIndexes = new Map(orderedCards.map((card, index) => [card, index]));

  state.cards.forEach((card, index) => {
    const order = orderedCardIndexes.has(card) ? orderedCardIndexes.get(card) : state.cards.length + index;
    card.style.order = String(order);
  });
};

const showCatalogCard = (card) => {
  if (!catalogState || !card) return;

  catalogState.filter = "todos";
  const cards = getCatalogCardsForFilter(catalogState);
  const cardIndex = cards.indexOf(card);

  if (cardIndex >= 0) {
    syncCatalogPageSize(catalogState);
    catalogState.page = Math.floor(cardIndex / catalogState.pageSize) + 1;
  }

  renderCatalogPage(catalogState);
};

const renderCatalogPage = (state) => {
  syncCatalogPageSize(state);

  const { buttons, cards, emptyMessage, itemFeedback, nextButton, pageIndicator, prevButton } = state;
  const pageSize = state.pageSize || 4;
  const filteredCards = getCatalogCardsForFilter(state);
  const totalPages = Math.max(1, Math.ceil(filteredCards.length / pageSize));

  state.page = Math.min(Math.max(state.page, 1), totalPages);
  applyCatalogCardOrder(state, filteredCards);

  buttons.forEach((button) => {
    const isActive = button.dataset.catalogFilter === state.filter;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  cards.forEach((card) => {
    card.classList.add("is-filtered-out");
  });

  const startIndex = (state.page - 1) * pageSize;
  const visibleCards = filteredCards.slice(startIndex, startIndex + pageSize);

  visibleCards.forEach((card) => {
    card.classList.remove("is-filtered-out");
  });

  const hasItems = filteredCards.length > 0;

  if (emptyMessage) {
    emptyMessage.hidden = hasItems;
  }

  if (itemFeedback) {
    const firstVisible = hasItems ? startIndex + 1 : 0;
    const lastVisible = hasItems ? startIndex + visibleCards.length : 0;
    itemFeedback.textContent = `Visualizando ${firstVisible}-${lastVisible} de ${filteredCards.length} itens`;
  }

  if (pageIndicator) {
    pageIndicator.textContent = `Página ${state.page} / ${totalPages}`;
  }

  state.totalPages = totalPages;
};

const setupCatalog = () => {
  const catalogShell = document.querySelector(".catalog-shell");
  if (!catalogShell) return;

  const filterNav = document.createElement("nav");
  filterNav.className = "catalog-filter";
  filterNav.setAttribute("aria-label", "Filtrar catálogo por categoria");

  const allButton = document.createElement("button");
  allButton.type = "button";
  allButton.className = "is-active";
  allButton.dataset.catalogFilter = "todos";
  allButton.setAttribute("aria-pressed", "true");
  allButton.textContent = "Todos";
  filterNav.append(allButton);

  catalogCategories.forEach((category) => {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.catalogFilter = category.id;
    button.setAttribute("aria-pressed", "false");
    button.textContent = category.label;
    filterNav.append(button);
  });

  const content = document.createElement("div");
  content.className = "catalog-content";

  const grid = document.createElement("div");
  grid.className = "product-grid catalog-grid";

  catalogCategories.forEach((category) => {
    category.items.forEach((item) => grid.append(createProductCard(category, item)));
  });

  content.append(grid);

  const emptyMessage = document.createElement("p");
  emptyMessage.className = "catalog-empty";
  emptyMessage.hidden = true;
  emptyMessage.textContent = "Nenhum item encontrado para este filtro.";

  const pagination = document.createElement("div");
  pagination.className = "catalog-pagination";

  const itemFeedback = document.createElement("span");
  itemFeedback.className = "catalog-pagination__feedback";
  itemFeedback.setAttribute("aria-live", "polite");

  const paginationControls = document.createElement("div");
  paginationControls.className = "catalog-pagination__controls";

  const prevButton = document.createElement("button");
  prevButton.type = "button";
  prevButton.textContent = "Anterior";

  const pageIndicator = document.createElement("span");
  pageIndicator.setAttribute("aria-live", "polite");

  const nextButton = document.createElement("button");
  nextButton.type = "button";
  nextButton.textContent = "Próxima";

  paginationControls.append(prevButton, pageIndicator, nextButton);
  pagination.append(itemFeedback, paginationControls);

  const buttons = Array.from(filterNav.querySelectorAll("[data-catalog-filter]"));
  const cards = Array.from(grid.querySelectorAll("[data-catalog-category]"));
  cards.forEach((card, index) => {
    card.dataset.catalogIndex = String(index);
  });

  const state = {
    buttons,
    cards,
    emptyMessage,
    filter: "todos",
    grid,
    itemFeedback,
    nextButton,
    page: 1,
    pageSize: getCatalogPageSize(grid),
    pageIndicator,
    prevButton,
    totalPages: 1
  };
  catalogState = state;

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      setCatalogFilter(state, button.dataset.catalogFilter);
    });
  });

  prevButton.addEventListener("click", () => {
    state.page = state.page <= 1 ? state.totalPages : state.page - 1;
    renderCatalogPage(state);
    catalogShell.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  nextButton.addEventListener("click", () => {
    state.page = state.page >= state.totalPages ? 1 : state.page + 1;
    renderCatalogPage(state);
    catalogShell.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  let resizeFrame = 0;
  const handleCatalogResize = () => {
    if (resizeFrame) return;

    resizeFrame = window.requestAnimationFrame(() => {
      resizeFrame = 0;
      const previousPageSize = state.pageSize;
      syncCatalogPageSize(state);

      if (state.pageSize !== previousPageSize) {
        renderCatalogPage(state);
      }
    });
  };

  catalogShell.replaceChildren(filterNav, content, emptyMessage, pagination);
  renderCatalogPage(state);
  window.addEventListener("resize", handleCatalogResize);
};

setupCatalog();


if (heroCarousel) {
  const slides = Array.from(heroCarousel.querySelectorAll(".hero-carousel__image"));
  const shouldReduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let activeIndex = 0;
  const dots = [];

  const setActiveSlide = (index) => {
    activeIndex = index;
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === activeIndex);
    });
    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === activeIndex);
    });
  };

  slides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.className = "hero-carousel__dot";
    dot.type = "button";
    dot.setAttribute("aria-label", `Mostrar imagem ${index + 1}`);
    dot.addEventListener("click", () => setActiveSlide(index));
    heroCarouselDots?.append(dot);
    dots.push(dot);
  });

  setActiveSlide(activeIndex);

  if (slides.length > 1 && !shouldReduceMotion) {
    window.setInterval(() => {
      setActiveSlide((activeIndex + 1) % slides.length);
    }, 5200);
  }
}

document.querySelectorAll("[data-card-carousel]").forEach((carousel) => {
  const slides = Array.from(carousel.querySelectorAll(".card-carousel__image"));
  const dotsContainer = carousel.querySelector("[data-card-carousel-dots]");
  const shouldReduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const dots = [];
  let activeIndex = 0;
  let autoAdvanceId = null;

  const setActiveSlide = (index) => {
    activeIndex = index;
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === activeIndex);
    });
    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === activeIndex);
    });
  };

  slides.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.className = index === activeIndex ? "is-active" : "";
    dotsContainer?.append(dot);
    dots.push(dot);
  });

  setActiveSlide(activeIndex);

  const startAutoAdvance = () => {
    if (autoAdvanceId || slides.length <= 1 || shouldReduceMotion) return;

    autoAdvanceId = window.setInterval(() => {
      setActiveSlide((activeIndex + 1) % slides.length);
    }, 3600);
  };

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          startAutoAdvance();
          observer.disconnect();
        }
      },
      { rootMargin: "240px 0px" }
    );

    observer.observe(carousel);
  } else {
    startAutoAdvance();
  }
});

const updatePhotoViewer = () => {
  if (!photoViewerImage || !photoViewerTitle || !photoViewerCount || photoViewerImages.length === 0) return;

  const currentImage = photoViewerImages[photoViewerIndex];
  photoViewerImage.src = currentImage.src;
  photoViewerImage.alt = currentImage.alt;
  photoViewerTitle.textContent = currentImage.title;
  photoViewerCount.textContent = `${photoViewerIndex + 1} de ${photoViewerImages.length}`;

  const hasMultipleImages = photoViewerImages.length > 1;
  photoViewerPrev?.toggleAttribute("disabled", !hasMultipleImages);
  photoViewerNext?.toggleAttribute("disabled", !hasMultipleImages);
};

const getFocusableElements = (container) =>
  Array.from(
    container.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
  ).filter((element) => element.getClientRects().length > 0);

const trapFocus = (container, event) => {
  if (event.key !== "Tab") return false;

  const focusableElements = getFocusableElements(container);
  if (focusableElements.length === 0) {
    event.preventDefault();
    container.focus();
    return true;
  }

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  if (event.shiftKey && document.activeElement === firstElement) {
    event.preventDefault();
    lastElement.focus();
    return true;
  }

  if (!event.shiftKey && document.activeElement === lastElement) {
    event.preventDefault();
    firstElement.focus();
    return true;
  }

  return false;
};

const closePhotoViewer = (restoreFocus = true) => {
  if (!photoViewer) return;

  photoViewer.classList.remove("is-open");
  photoViewer.setAttribute("aria-hidden", "true");
  photoViewer.inert = true;
  document.body.classList.remove("photo-viewer-open");

  if (photoViewerImage) {
    photoViewerImage.removeAttribute("src");
    photoViewerImage.alt = "";
  }

  if (restoreFocus && lastPhotoFocusedElement instanceof HTMLElement) {
    lastPhotoFocusedElement.focus();
  }
};

const showPhotoViewerImage = (index) => {
  if (photoViewerImages.length === 0) return;

  photoViewerIndex = (index + photoViewerImages.length) % photoViewerImages.length;
  updatePhotoViewer();
};

const openPhotoViewer = (images, title, startIndex, trigger) => {
  if (!photoViewer || images.length === 0) return;

  photoViewerImages = images.map((image) => ({
    src: image.src,
    alt: image.alt || title,
    title
  }));
  photoViewerIndex = Math.max(0, startIndex);
  lastPhotoFocusedElement = trigger;

  updatePhotoViewer();
  photoViewer.inert = false;
  photoViewer.classList.add("is-open");
  photoViewer.setAttribute("aria-hidden", "false");
  document.body.classList.add("photo-viewer-open");
  photoViewerDialog?.focus();
};

photoViewerNext?.addEventListener("click", () => {
  showPhotoViewerImage(photoViewerIndex + 1);
});

photoViewerPrev?.addEventListener("click", () => {
  showPhotoViewerImage(photoViewerIndex - 1);
});

document.querySelectorAll("[data-photo-viewer-close]").forEach((trigger) => {
  trigger.addEventListener("click", () => closePhotoViewer());
});

photoViewerMedia?.addEventListener("click", (event) => {
  if (event.target === photoViewerMedia) {
    closePhotoViewer();
  }
});

const closeEquipmentDrawer = (restoreFocus = true) => {
  if (!equipmentDrawer) return;

  equipmentDrawer.classList.remove("is-open");
  equipmentDrawer.setAttribute("aria-hidden", "true");
  equipmentDrawer.inert = true;
  document.body.classList.remove("details-open");

  if (restoreFocus && lastFocusedElement instanceof HTMLElement) {
    lastFocusedElement.focus();
  }
};

const getCardImages = (card) =>
  Array.from(card.querySelectorAll(".card-carousel__image")).map((image) => ({
    src: image.currentSrc || image.src,
    alt: image.alt || card.querySelector("h4")?.textContent?.trim() || "Foto do equipamento"
  }));

const createEquipmentGallery = (card) => {
  const images = getCardImages(card);
  const title = card.querySelector("h4")?.textContent?.trim() || "Foto do equipamento";
  const activeIndex = Math.max(
    0,
    Array.from(card.querySelectorAll(".card-carousel__image")).findIndex((image) => image.classList.contains("is-active"))
  );
  let currentIndex = activeIndex;

  const gallery = document.createElement("section");
  gallery.className = "equipment-gallery";
  gallery.setAttribute("aria-label", `Fotos de ${title}`);

  const viewerButton = document.createElement("button");
  viewerButton.className = "equipment-gallery__viewer";
  viewerButton.type = "button";
  viewerButton.setAttribute("aria-label", `Ampliar foto de ${title}`);

  const mainImage = document.createElement("img");
  applyImagePerformanceAttributes(mainImage);
  viewerButton.append(mainImage);

  const counter = document.createElement("span");
  counter.className = "equipment-gallery__counter";

  const controls = document.createElement("div");
  controls.className = "equipment-gallery__controls";

  const prevButton = document.createElement("button");
  prevButton.type = "button";
  prevButton.textContent = "Anterior";

  const nextButton = document.createElement("button");
  nextButton.type = "button";
  nextButton.textContent = "Próxima";

  controls.append(prevButton, nextButton);

  const thumbnails = document.createElement("div");
  thumbnails.className = "equipment-gallery__thumbs";

  const thumbButtons = images.map((image, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.setAttribute("aria-label", `Ver foto ${index + 1} de ${title}`);

    const thumb = document.createElement("img");
    thumb.src = image.src;
    thumb.alt = "";
    applyImagePerformanceAttributes(thumb);
    button.append(thumb);
    thumbnails.append(button);
    return button;
  });

  const setGalleryImage = (index) => {
    if (images.length === 0) return;

    currentIndex = (index + images.length) % images.length;
    const image = images[currentIndex];
    mainImage.src = image.src;
    mainImage.alt = image.alt;
    counter.textContent = `${currentIndex + 1} de ${images.length}`;
    thumbButtons.forEach((button, buttonIndex) => {
      button.classList.toggle("is-active", buttonIndex === currentIndex);
    });

    const hasMultipleImages = images.length > 1;
    prevButton.toggleAttribute("disabled", !hasMultipleImages);
    nextButton.toggleAttribute("disabled", !hasMultipleImages);
  };

  prevButton.addEventListener("click", () => setGalleryImage(currentIndex - 1));
  nextButton.addEventListener("click", () => setGalleryImage(currentIndex + 1));
  viewerButton.addEventListener("click", () => openPhotoViewer(images, title, currentIndex, viewerButton));
  thumbButtons.forEach((button, index) => {
    button.addEventListener("click", () => setGalleryImage(index));
  });

  gallery.append(viewerButton, counter, controls, thumbnails);
  setGalleryImage(currentIndex);
  return gallery;
};

const getConfiguratorFromCard = (card) => {
  if (!card?.dataset.configurator) return null;

  try {
    return JSON.parse(card.dataset.configurator);
  } catch {
    return null;
  }
};

const createEquipmentConfigurator = (configurator) => {
  if (!configurator) return null;

  const form = document.createElement("section");
  form.className = "equipment-configurator";
  form.setAttribute("aria-label", configurator.title || "Configuração do equipamento");

  const title = document.createElement("h4");
  title.textContent = configurator.title || "Monte sua configuração";
  form.append(title);

  if (Array.isArray(configurator.fields) && configurator.fields.length > 0) {
    const fieldSection = document.createElement("div");
    fieldSection.className = "equipment-configurator__section";

    const fields = document.createElement("div");
    fields.className = "equipment-configurator__fields";

    configurator.fields.forEach((field) => {
      const fieldName = `config-${normalizeSlug(configurator.title || "equipamento")}-${normalizeSlug(field.name || field.label)}`;
      const label = document.createElement("label");
      const select = document.createElement("select");

      label.setAttribute("for", fieldName);
      select.id = fieldName;
      select.dataset.configField = field.label;

      (field.options || []).forEach((optionLabel) => {
        const option = document.createElement("option");
        option.textContent = optionLabel;
        select.append(option);
      });

      label.append(field.label, select);
      fields.append(label);
    });

    fieldSection.append(fields);
    form.append(fieldSection);
  }

  if (Array.isArray(configurator.pieces) && configurator.pieces.length > 0) {
    const pieceSection = document.createElement("div");
    pieceSection.className = "equipment-configurator__section";

    const pieceTitle = document.createElement("h5");
    pieceTitle.textContent = "Peças";
    pieceSection.append(pieceTitle);

    const pieces = document.createElement("div");
    pieces.className = "equipment-configurator__pieces";

    configurator.pieces.forEach((piece, index) => {
      const pieceName = typeof piece === "string" ? piece : piece.label;
      const options = typeof piece === "string" ? [] : piece.options || [];
      const wrapper = document.createElement("div");
      wrapper.className = "equipment-configurator__piece";
      const heading = document.createElement("strong");
      const controls = document.createElement("div");
      const quantityLabel = document.createElement("label");
      const input = document.createElement("input");
      const pieceSlug = normalizeSlug(pieceName || `peca-${index}`);
      const quantityId = `config-${normalizeSlug(configurator.title || "equipamento")}-${pieceSlug}-quantidade`;

      heading.className = "equipment-configurator__piece-name";
      heading.textContent = pieceName;
      controls.className = "equipment-configurator__piece-controls";

      input.type = "number";
      input.min = "0";
      input.step = "1";
      input.inputMode = "numeric";
      input.value = "0";
      input.id = quantityId;
      input.dataset.configPiece = pieceName;

      if (options.length > 0) {
        const sizeLabel = document.createElement("label");
        const sizeLabelText = document.createElement("span");
        const select = document.createElement("select");
        const sizeId = `config-${normalizeSlug(configurator.title || "equipamento")}-${pieceSlug}-tamanho`;

        sizeLabel.setAttribute("for", sizeId);
        sizeLabelText.textContent = "Tamanho";
        select.id = sizeId;
        select.dataset.configPieceSize = pieceName;

        options.forEach((optionLabel) => {
          const option = document.createElement("option");
          option.textContent = optionLabel;
          select.append(option);
        });

        sizeLabel.append(sizeLabelText, select);
        controls.append(sizeLabel);
      }

      const quantityLabelText = document.createElement("span");
      quantityLabel.setAttribute("for", quantityId);
      quantityLabelText.textContent = "Quantidade";
      quantityLabel.append(quantityLabelText, input);

      controls.append(quantityLabel);
      wrapper.append(heading, controls);
      pieces.append(wrapper);
    });

    pieceSection.append(pieces);
    form.append(pieceSection);
  }

  return form;
};

const getConfiguratorSummary = (root) => {
  const configurator = root?.querySelector(".equipment-configurator");
  if (!configurator) return "";

  const fields = Array.from(configurator.querySelectorAll("[data-config-field]"))
    .map((field) => `${field.dataset.configField}: ${field.value}`)
    .filter(Boolean);

  const pieces = Array.from(configurator.querySelectorAll("[data-config-piece]"))
    .map((field) => {
      const size = field
        .closest(".equipment-configurator__piece")
        ?.querySelector("[data-config-piece-size]")
        ?.value;

      return {
        name: size ? `${field.dataset.configPiece} ${size}` : field.dataset.configPiece,
        quantity: Number(field.value || 0)
      };
    })
    .filter((piece) => piece.quantity > 0)
    .map((piece) => `${piece.name}: ${piece.quantity}`);

  const summary = [];
  if (fields.length > 0) summary.push(`Opções: ${fields.join("; ")}`);
  if (pieces.length > 0) summary.push(`Peças: ${pieces.join("; ")}`);

  return summary.join("\n");
};

const createGeneratedEquipmentDetail = (card) => {
  const detail = document.createElement("article");
  detail.className = "equipment-detail";

  const title = card.dataset.detailTitle || card.querySelector("h4")?.textContent?.trim() || "Equipamento";
  const category = card.dataset.detailCategory || "Catálogo";
  const description = card.dataset.detailDescription || "Item disponível para locação. Consulte disponibilidade e condições de entrega.";
  const isAvailable = card?.dataset.available !== "false";
  const manual = card.dataset.manual;
  let specs = [];

  try {
    specs = JSON.parse(card.dataset.detailSpecs || "[]");
  } catch {
    specs = [];
  }

  const intro = document.createElement("div");
  intro.innerHTML = `
    <p class="eyebrow">${category}</p>
    <h3 id="equipment-drawer-title">${title}</h3>
    <p>${description}</p>
  `;

  const specList = document.createElement("ul");
  specList.className = "spec-list";
  specs.forEach((spec) => {
    const item = document.createElement("li");
    item.textContent = spec;
    specList.append(item);
  });

  const configurator = createEquipmentConfigurator(getConfiguratorFromCard(card));
  if (configurator) {
    detail.classList.add("has-configurator");
  }

  const quoteLink = document.createElement("a");
  quoteLink.className = `button button--secondary${isAvailable ? "" : " button--disabled"}`;
  quoteLink.href = isAvailable ? "#orcamento" : "#";
  if (isAvailable) {
    quoteLink.dataset.quoteEquipment = title;
  } else {
    quoteLink.setAttribute("aria-disabled", "true");
  }
  quoteLink.textContent = isAvailable ? "Solicitar orçamento" : "Indisponível";

  const actions = document.createElement("div");
  actions.className = "equipment-detail__actions";
  actions.append(quoteLink);

  if (manual) {
    const manualLink = document.createElement("a");
    manualLink.className = "button button--secondary";
    manualLink.href = manual;
    manualLink.target = "_blank";
    manualLink.rel = "noreferrer";
    manualLink.textContent = "Ver manual";
    actions.append(manualLink);
  }

  detail.append(intro);
  if (configurator) detail.append(configurator);
  detail.append(specList, actions);
  return detail;
};

const openEquipmentDrawer = (detailId, trigger, card) => {
  if (!equipmentDrawer || !equipmentDrawerContent) return;

  const source = document.getElementById(detailId);
  const detail = source ? source.cloneNode(true) : createGeneratedEquipmentDetail(card || trigger);

  if (source) {
    detail.removeAttribute("id");
    detail.classList.remove("is-highlighted");

    const title = detail.querySelector("h3");
    if (title) {
      title.id = "equipment-drawer-title";
    }
  }

  if (card) {
    const isAvailable = card.dataset.available !== "false";
    const quoteLink = detail.querySelector("[data-quote-equipment]");
    const configurator = createEquipmentConfigurator(getConfiguratorFromCard(card));

    if (quoteLink) {
      if (configurator && !detail.querySelector(".equipment-configurator")) {
        detail.classList.add("has-configurator");
        const intro = detail.querySelector("#equipment-drawer-title")?.closest("div");
        (intro || quoteLink).after(configurator);
      }

      if (isAvailable) {
        quoteLink.dataset.quoteEquipment = card.dataset.detailTitle || quoteLink.dataset.quoteEquipment || "";
        quoteLink.classList.remove("button--disabled");
        quoteLink.removeAttribute("aria-disabled");
        quoteLink.textContent = "Solicitar orçamento";
      } else {
        quoteLink.classList.add("button--disabled");
        quoteLink.removeAttribute("data-quote-equipment");
        quoteLink.setAttribute("aria-disabled", "true");
        quoteLink.setAttribute("href", "#");
        quoteLink.textContent = "Indisponível";
      }
    }

    detail.prepend(createEquipmentGallery(card));
  }

  equipmentDrawerContent.replaceChildren(detail);
  lastFocusedElement = trigger;
  equipmentDrawer.inert = false;
  equipmentDrawer.classList.add("is-open");
  equipmentDrawer.setAttribute("aria-hidden", "false");
  document.body.classList.add("details-open");
  equipmentDrawerPanel?.focus();
};

document.querySelectorAll(".product-card[href^='#']").forEach((card) => {
  card.addEventListener("click", (event) => {
    const detailId = card.getAttribute("href")?.slice(1);
    if (!detailId) return;

    event.preventDefault();
    openEquipmentDrawer(detailId, card, card);
  });
});

document.querySelectorAll("[data-equipment-drawer-close]").forEach((trigger) => {
  trigger.addEventListener("click", closeEquipmentDrawer);
});

document.addEventListener("keydown", (event) => {
  if (photoViewer?.classList.contains("is-open") && photoViewerDialog && trapFocus(photoViewerDialog, event)) {
    return;
  }

  if (equipmentDrawer?.classList.contains("is-open") && equipmentDrawerPanel && trapFocus(equipmentDrawerPanel, event)) {
    return;
  }

  if (event.key === "Escape" && photoViewer?.classList.contains("is-open")) {
    closePhotoViewer();
    return;
  }

  if (event.key === "ArrowRight" && photoViewer?.classList.contains("is-open")) {
    showPhotoViewerImage(photoViewerIndex + 1);
    return;
  }

  if (event.key === "ArrowLeft" && photoViewer?.classList.contains("is-open")) {
    showPhotoViewerImage(photoViewerIndex - 1);
    return;
  }

  if (event.key === "Escape" && equipmentDrawer?.classList.contains("is-open")) {
    closeEquipmentDrawer();
  }
});

const onlyNumbers = (value) => value.replace(/\D/g, "");

const formatPhone = (value) => {
  const digits = onlyNumbers(value).slice(0, 11);

  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
};

const formatCep = (value) => {
  const digits = onlyNumbers(value).slice(0, 8);

  if (digits.length <= 5) return digits;
  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
};

const setQuoteFeedback = (message = "") => {
  if (!quoteFeedback) return;

  quoteFeedback.textContent = message;
  quoteFeedback.hidden = message.length === 0;
};

const focusInvalidField = (field, message) => {
  setQuoteFeedback(message);
  field?.setAttribute("aria-invalid", "true");
  field?.focus();
};

const setFieldValidity = (field, isValid) => {
  if (!field) return;
  field.toggleAttribute("aria-invalid", !isValid);
};

let quoteConfigurationDetails = "";

const removeQuoteConfigurationDetails = (details = "") => {
  if (!quoteConfigurationDetails) return details.trim();

  return details.replace(quoteConfigurationDetails, "").replace(/\n{3,}/g, "\n\n").trim();
};

const formatQuoteConfigurationDetails = (equipment, configuration) => {
  if (!configuration) return "";

  return [
    "Montagem selecionada em Detalhes do equipamento:",
    equipment ? `Equipamento: ${equipment}` : "",
    configuration
  ].filter(Boolean).join("\n");
};

const syncQuoteConfigurationDetails = (equipment, configuration) => {
  const detailsInput = quoteForm?.querySelector("textarea[name='detalhes']");
  if (!detailsInput) return;

  const cleanDetails = removeQuoteConfigurationDetails(detailsInput.value);
  quoteConfigurationDetails = formatQuoteConfigurationDetails(equipment, configuration);

  if (!quoteConfigurationDetails) {
    detailsInput.value = cleanDetails;
    return;
  }

  detailsInput.value = [cleanDetails, quoteConfigurationDetails].filter(Boolean).join("\n\n");
  setFieldValidity(detailsInput, true);
};

const populateQuoteEquipmentOptions = (select) => {
  if (!select) return;

  const placeholder = select.querySelector("option[value='']")?.cloneNode(true) || new Option("Selecione uma opção", "");
  select.replaceChildren(placeholder);

  catalogCategories.forEach((category) => {
    const group = document.createElement("optgroup");
    group.label = category.label;

    category.items.forEach((rawItem) => {
      const item = normalizeCatalogItem(rawItem);
      const option = document.createElement("option");
      const isAvailable = isCatalogItemAvailable(item);

      option.value = item.name;
      option.textContent = isAvailable ? item.name : `${item.name} - indisponível`;
      option.disabled = !isAvailable;
      group.append(option);
    });

    select.append(group);
  });
};

if (quoteForm) {
  const phoneInput = quoteForm.querySelector("input[name='telefone']");
  const emailInput = quoteForm.querySelector("input[name='email']");
  const cepInput = quoteForm.querySelector("input[name='cep']");
  const equipmentSelect = quoteForm.querySelector("select[name='equipamento']");
  const periodSelect = quoteForm.querySelector("select[name='periodo']");
  const configInput = document.createElement("input");
  configInput.type = "hidden";
  configInput.name = "configuracao";
  quoteForm.append(configInput);

  quoteFeedback?.setAttribute("hidden", "");
  populateQuoteEquipmentOptions(equipmentSelect);

  equipmentSelect?.addEventListener("change", () => {
    configInput.value = "";
    syncQuoteConfigurationDetails("", "");
  });

  phoneInput?.addEventListener("input", () => {
    phoneInput.value = formatPhone(phoneInput.value);
    const phoneDigits = onlyNumbers(phoneInput.value);
    setFieldValidity(phoneInput, phoneDigits.length === 0 || (phoneDigits.length >= 10 && phoneDigits.length <= 11));
  });

  emailInput?.addEventListener("input", () => {
    setFieldValidity(emailInput, emailInput.value.trim().length === 0 || emailInput.checkValidity());
  });

  cepInput?.addEventListener("input", () => {
    cepInput.value = formatCep(cepInput.value);
    const cepDigits = onlyNumbers(cepInput.value);
    setFieldValidity(cepInput, cepDigits.length === 0 || cepDigits.length === 8);
  });

  quoteForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(quoteForm);
    const name = String(formData.get("nome") || "").trim();
    const phone = String(formData.get("telefone") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const phoneDigits = onlyNumbers(phone);
    const cep = String(formData.get("cep") || "").trim();
    const cepDigits = onlyNumbers(cep);
    const equipment = String(formData.get("equipamento") || "").trim();
    const period = String(formData.get("periodo") || "").trim();
    const configuration = String(formData.get("configuracao") || "").trim();
    const details = String(formData.get("detalhes") || "").trim();
    const detailsForMessage = configuration ? removeQuoteConfigurationDetails(details) : details;

    setQuoteFeedback();
    quoteForm.querySelectorAll("[aria-invalid='true']").forEach((field) => {
      field.removeAttribute("aria-invalid");
    });

    if (name.length < 3) {
      focusInvalidField(quoteForm.querySelector("input[name='nome']"), "Informe seu nome completo.");
      return;
    }

    if (phoneDigits.length < 10 || phoneDigits.length > 11) {
      focusInvalidField(phoneInput, "Informe um telefone com DDD.");
      return;
    }

    if (!emailInput?.checkValidity() || email.length < 5) {
      focusInvalidField(emailInput, "Informe um e-mail válido.");
      return;
    }

    if (!equipment) {
      focusInvalidField(equipmentSelect, "Selecione o equipamento desejado.");
      return;
    }

    if (!period) {
      focusInvalidField(periodSelect, "Selecione o período de locação.");
      return;
    }

    if (cepDigits.length > 0 && cepDigits.length !== 8) {
      focusInvalidField(cepInput, "Informe um CEP válido com 8 números ou deixe o campo em branco.");
      return;
    }

    const message = [
      "Olá, gostaria de solicitar um orçamento pela LocTubo.",
      `Nome: ${name}`,
      `Telefone: ${phone}`,
      `E-mail: ${email}`,
      `Empresa: ${String(formData.get("empresa") || "").trim() || "Não informado"}`,
      `Equipamento: ${equipment}`,
      configuration ? `Configuração:\n${configuration}` : "",
      `Período: ${period}`,
      `CEP: ${cep || "Não informado"}`,
      detailsForMessage ? `Observações: ${detailsForMessage}` : ""
    ].filter(Boolean).join("\n");

    window.location.href = `https://wa.me/5511986740961?text=${encodeURIComponent(message)}`;
  });
}

const normalizeText = (value) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

if (searchPanel) {
  searchPanel.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = searchPanel.querySelector("input[type='search']");
    const term = normalizeText(input?.value.trim() || "");
    const targets = Array.from(document.querySelectorAll(".product-card"));

    targets.forEach((target) => target.classList.remove("is-highlighted"));

    if (!term) {
      document.querySelector("[data-catalog-filter='todos']")?.click();
      document.querySelector("#catalogo")?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    const match = targets.find((target) => normalizeText(target.textContent || "").includes(term));

    if (match) {
      showCatalogCard(match);
      match.classList.add("is-highlighted");
      match.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      document.querySelector("#orcamento")?.scrollIntoView({ behavior: "smooth" });
    }
  });
}

document.addEventListener("click", (event) => {
  const disabledAction = event.target.closest("[aria-disabled='true']");
  if (disabledAction) {
    event.preventDefault();
    return;
  }

  const trigger = event.target.closest("[data-quote-equipment]");
  if (!trigger) return;

  const select = document.querySelector(".quote-form select[name='equipamento']");
  if (select) {
    const equipmentName = trigger.dataset.quoteEquipment || "";
    const option = Array.from(select.options).find((item) => item.value === equipmentName && !item.disabled);

    if (option) {
      select.value = equipmentName;
    }
  }

  const configInput = document.querySelector(".quote-form input[name='configuracao']");
  if (configInput) {
    const configuration = getConfiguratorSummary(trigger.closest(".equipment-detail"));
    configInput.value = configuration;
    syncQuoteConfigurationDetails(trigger.dataset.quoteEquipment || "", configuration);
  }

  closeEquipmentDrawer(false);
});

const revealItems = Array.from(document.querySelectorAll("[data-reveal]"));
const sideRevealSections = Array.from(document.querySelectorAll("[data-process-reveal], [data-side-reveal]"));
const reduceScrollMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let revealTicking = false;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const setRevealProgress = () => {
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

  revealItems.forEach((item, index) => {
    const rect = item.getBoundingClientRect();
    const rawProgress = (viewportHeight - rect.top) / (viewportHeight * 0.72 + rect.height);
    const staggeredProgress = clamp((rawProgress - index * 0.08) / 0.82, 0, 1);
    const easedProgress = 1 - Math.pow(1 - staggeredProgress, 3);

    item.style.setProperty("--reveal-opacity", easedProgress.toFixed(3));
    item.style.setProperty("--reveal-y", `${((1 - easedProgress) * 1.8).toFixed(3)}rem`);
    item.style.setProperty("--reveal-scale", (0.96 + easedProgress * 0.04).toFixed(3));
  });

  revealTicking = false;
};

const requestRevealProgress = () => {
  if (revealTicking) return;

  revealTicking = true;
  window.requestAnimationFrame(setRevealProgress);
};

if (revealItems.length > 0) {
  if (reduceScrollMotion) {
    revealItems.forEach((item) => {
      item.style.setProperty("--reveal-opacity", "1");
      item.style.setProperty("--reveal-y", "0rem");
      item.style.setProperty("--reveal-scale", "1");
    });
  } else {
    setRevealProgress();
    window.addEventListener("scroll", requestRevealProgress, { passive: true });
    window.addEventListener("resize", requestRevealProgress);
  }
}

if (sideRevealSections.length > 0) {
  sideRevealSections.forEach((section) => section.classList.add("is-reveal-ready"));

  if (reduceScrollMotion || !("IntersectionObserver" in window)) {
    sideRevealSections.forEach((section) => section.classList.add("is-visible"));
  } else {
    const sideRevealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.18 });

    sideRevealSections.forEach((section) => sideRevealObserver.observe(section));
  }
}
