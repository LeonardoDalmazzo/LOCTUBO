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
  "betoneira.png": [800, 960],
  "compressor-de-ar.png": [1254, 1254],
  "esmerilhadeira.png": [1254, 1254],
  "mangote-vibrador.png": [789, 923],
  "pistola-finca-pino.png": [1254, 1254],
  "placa-vibratoria.png": [1254, 1254],
  "Produto-Sem-Imagem-600-x-600px.jpg": [600, 600],
  "serra-de-bancada.png": [1254, 1254],
  "serra-de-marmore.png": [1254, 1254],
  "bg-Slide-Andaime-LOCTUBO.png": [1684, 934],
  "bg-Slide-Equipamentos.png": [1684, 934],
  "bg-Slide-Equipamentos-concretagem.png": [1685, 934],
  "bg-andaimeLocTuboLogoMarca.png": [1774, 887],
  "isotipo loctubo.png": [55, 123],
  "loctubo-logo.png": [93, 83]
};

const applyImagePerformanceAttributes = (image) => {
  const fileName = image.currentSrc.split("/").pop() || image.src.split("/").pop();
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
  "Ferramentas a bateria"
  // "Martelete rompedor 30 kg"
]);

const catalogCategories = [
  {
    id: "andaimes-tubulares",
    label: "Andaimes tubulares",
    eyebrow: "Acesso e trabalho em altura",
    title: "Andaimes tubulares",
    description: "Quadros, pranchas, sapatas, rodas, escadas e guarda-corpos para montar a configuração conforme a altura e a área de trabalho.",
    items: [
      {
        name: "Andaime tubular",
        summary: "Monte a configuração com quadros, pranchas, sapatas, rodas, escadas e guarda-corpos.",
        description: "Selecione o tipo de montagem, tamanho da base e quantidade de peças para solicitar um orçamento mais preciso.",
        images: [
          { src: "assets/imagens-catalogo/andaime-torre.png", alt: "Andaime tubular tipo torre" },
          { src: "assets/imagens-catalogo/svg/escada.svg", alt: "Escada para andaime" },
          { src: "assets/imagens-catalogo/svg/guarda%20corpo.svg", alt: "Guarda-corpo para andaime" },
          { src: "assets/imagens-catalogo/svg/piso_metálico.svg", alt: "Piso metálico para andaime" },
          { src: "assets/imagens-catalogo/svg/travessa_andaime.svg", alt: "Travessa para andaime" },
          { src: "assets/imagens-catalogo/svg/quadro_andaime.svg", alt: "Quadro para andaime" },
          { src: "assets/imagens-catalogo/svg/roda%20.svg", alt: "Roda para andaime" },
          { src: "assets/imagens-catalogo/svg/sapata_fixa.svg", alt: "Sapata fixa para andaime" },
          { src: "assets/imagens-catalogo/svg/sapata_ajustavel.svg", alt: "Sapata ajustável para andaime" },
          { src: "assets/imagens-catalogo/svg/diagonal_andaime.svg", alt: "Diagonal para andaime" }
        ],
        configurator: {
          title: "Monte seu andaime",
          fields: [
            {
              label: "Tipo de montagem",
              name: "tipo",
              options: ["Torre", "Fachadeiro", "A definir com a equipe"]
            },
            {
              label: "Base desejada",
              name: "base",
              options: ["1,0 x 1,0 m", "1,0 x 1,5 m", "1,0 x 2,0 m", "1,5 x 1,5 m", "2,0 x 2,0 m", "A definir"]
            },
            {
              label: "Altura aproximada",
              name: "altura",
              options: ["A definir", "2 m", "4 m", "6 m", "8 m", "10 m ou mais"]
            }
          ],
          pieces: [
            "Quadro 0,40 x 1,0",
            "Quadro 0,40 x 1,5",
            "Quadro 1,0 x 1,0",
            "Quadro 1,0 x 1,5",
            "Quadro 1,0 x 2,0",
            "Prancha metálica 2,0",
            "Prancha metálica 1,5",
            "Prancha metálica 1,0",
            "Sapata ajustável",
            "Sapata fixa",
            "Rodas emborrachadas",
            "Escada",
            "Guarda-corpo 2,0",
            "Guarda-corpo 1,5",
            "Guarda-corpo 1,0"
          ]
        }
      }
    ]
  },
  {
    id: "escadas",
    label: "Escadas",
    eyebrow: "Acesso em altura",
    title: "Escadas",
    description: "Escadas para obras, reformas e manutenções que precisam de acesso rápido, versátil e seguro.",
    items: [
      {
        name: "Escada extensível 37 degraus",
        summary: "Escada extensível para acesso em altura em serviços de obra, reforma e manutenção.",
        images: [
          { src: "assets/imagens-catalogo/svg/escada_extensivel_37degraus.svg", alt: "Ilustração da escada extensível 37 degraus" }
        ]
      },
      {
        name: "Escada multiarticular",
        summary: "Escada articulada para diferentes posições de trabalho em obras e manutenções.",
        images: [
          { src: "assets/imagens-catalogo/svg/escada_multiarticular.svg", alt: "Ilustração da escada multiarticular" }
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
        summary: "Configure torres, escoras, sapatas, forcados e longarinas conforme o projeto.",
        description: "Informe o tipo de escoramento e as peças desejadas para a equipe orientar a composição ideal.",
        images: [
          { src: "assets/imagens-catalogo/escoramento-metalico.png", alt: "Escoramento metálico" },
          { src: "assets/imagens-catalogo/escoramento-metalico2.png", alt: "Escoramento metálico em obra" }
        ],
        configurator: {
          title: "Monte seu escoramento",
          fields: [
            {
              label: "Tipo de escoramento",
              name: "tipo",
              options: ["Torre metálica", "Escora pontual", "Sistema misto", "A definir com a equipe"]
            },
            {
              label: "Altura aproximada",
              name: "altura",
              options: ["A definir", "Até 3,50 m", "Até 4,20 m", "Acima de 4,20 m"]
            },
            {
              label: "Aplicação",
              name: "aplicacao",
              options: ["Laje", "Viga", "Reescoramento", "A definir"]
            }
          ],
          pieces: [
            "Quadro reforçado 1,0 x 1,5",
            "Quadro 1,0 x 1,0",
            "Quadro 0,40 x 1,0",
            "Quadro 0,40 x 1,5",
            "Sapata ajustável 30 cm",
            "Forcado ajustável 30 cm",
            "Escora metálica 3,50",
            "Escora metálica 4,20",
            "Forcado metálico simples",
            "Forcado metálico duplo",
            "Longarina metálica 2 m",
            "Longarina metálica 3 m",
            "Longarina metálica 4 m"
          ]
        }
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
        name: "Martelete rompedor 5 kg",
        detailId: "martelete-6",
        images: [
          { src: "assets/imagens-catalogo/martelete-rompedor-5kg.png", alt: "Martelete rompedor 5 kg" },
          { src: "assets/imagens-catalogo/p-martelete-eletrico-rompedor-bosch-5.8-kg-6.0-kg-gsh-5-ce-225-2.jpg", alt: "Martelete rompedor 5 kg em detalhe" },
          { src: "assets/imagens-catalogo/p-martelete-eletrico-rompedor-bosch-5.8-kg-6.0-kg-gsh-5-ce-225-3.jpg", alt: "Martelete rompedor 5 kg com acessório" }
        ]
      },
      {
        name: "Martelete rompedor 6 kg",
        images: [
          { src: "assets/imagens-catalogo/svg/martelete_6Kg.svg", alt: "Ilustração do martelete rompedor 6 kg" }
        ]
      },
      {
        name: "Martelete rompedor 11 kg",
        images: [
          { src: "assets/imagens-catalogo/svg/matelete_11kg.svg", alt: "Ilustração do martelete rompedor 11 kg" }
        ]
      },
      {
        name: "Martelete rompedor 10 kg",
        detailId: "martelete-10",
        images: [
          { src: "assets/imagens-catalogo/martelete-rompedor-10kg.png", alt: "Martelete rompedor 10 kg" }
        ]
      },
      {
        name: "Martelete rompedor 18 kg",
        detailId: "martelete-18",
        images: [
          { src: "assets/imagens-catalogo/martelete-rompedor-18kg.png", alt: "Martelete rompedor 18 kg" },
          { src: "assets/imagens-catalogo/p-martelete-eletrico-demolidor-bosch-18.5-kg-gsh-16-28-professional-227-2.jpg", alt: "Martelete rompedor 18 kg em detalhe" },
          { src: "assets/imagens-catalogo/p-martelete-eletrico-demolidor-bosch-18.5-kg-gsh-16-28-professional-227-3.jpg", alt: "Martelete rompedor 18 kg inclinado" }
        ]
      },
      {
        name: "Martelete rompedor 30 kg",
        detailId: "martelete-30",
        images: [
          { src: "assets/imagens-catalogo/svg/martelete_30Kg.svg", alt: "Ilustração do martelete rompedor 30 kg" }
        ]
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
        images: [{ src: "assets/imagens-catalogo/esmerilhadeira.png", alt: "Esmerilhadeira" }]
      },
      {
        name: "Serra mármore",
        images: [
          { src: "assets/imagens-catalogo/svg/serra_mamore.svg", alt: "Ilustração da serra mármore" },
          { src: "assets/imagens-catalogo/serra-de-marmore.png", alt: "Serra mármore" }
        ]
      },
      {
        name: "Serra de bancada",
        images: [{ src: "assets/imagens-catalogo/serra-de-bancada.png", alt: "Serra de bancada" }]
      },
      {
        name: "Pistola finca-pino",
        images: [
          { src: "assets/imagens-catalogo/svg/pistola_finca_pino.svg", alt: "Ilustração da pistola finca-pino" },
          { src: "assets/imagens-catalogo/pistola-finca-pino.png", alt: "Pistola finca-pino" }
        ]
      },
      {
        name: "Compressor de ar",
        images: [{ src: "assets/imagens-catalogo/compressor-de-ar.png", alt: "Compressor de ar" }]
      }
    ]
  },
  {
    id: "ferramentas-bateria",
    label: "Ferramentas a bateria",
    eyebrow: "Mobilidade no canteiro",
    title: "Ferramentas a bateria",
    description: "Opções a bateria para serviços que precisam de mobilidade e agilidade no canteiro.",
    items: ["Ferramentas a bateria"]
  },
  {
    id: "concreto",
    label: "Concreto",
    eyebrow: "Preparo e adensamento",
    title: "Concreto",
    description: "Equipamentos para preparo, mistura e adensamento do concreto em lajes, vigas, pilares e sapatas.",
    items: [
      {
        name: "Betoneira 400 litros",
        detailId: "betoneira-400",
        images: [
          { src: "assets/imagens-catalogo/svg/betoneira_400L.svg", alt: "Ilustração da betoneira 400 litros" },
          { src: "assets/imagens-catalogo/betoneira.png", alt: "Betoneira 400 litros" }
        ]
      },
      {
        name: "Mangote vibrador",
        detailId: "mangote-vibrador",
        images: [{ src: "assets/imagens-catalogo/mangote-vibrador.png", alt: "Mangote vibrador de imersão para concreto" }]
      }
    ]
  },
  {
    id: "compactacao",
    label: "Compactação",
    eyebrow: "Preparo de base",
    title: "Compactação",
    description: "Equipamento para compactar solo, base e áreas de circulação antes de assentamentos ou concretagem.",
    items: [
      {
        name: "Placa vibratória",
        images: [
          { src: "assets/imagens-catalogo/svg/placa_vibratoria.svg", alt: "Ilustração da placa vibratória" },
          { src: "assets/imagens-catalogo/placa-vibratoria.png", alt: "Placa vibratória" }
        ]
      },
      {
        name: "Perfurador de solo a gasolina",
        summary: "Equipamento para perfuração de solo em fundações, cercas, mourões e serviços externos.",
        images: [
          { src: "assets/imagens-catalogo/svg/Perfurador_solo_gasolina%20.svg", alt: "Ilustração do perfurador de solo a gasolina" }
        ]
      },
      {
        name: "Compactador de solo tipo sapo a gasolina",
        summary: "Compactador tipo sapo para valas, bases, aterros e áreas com acesso mais estreito.",
        images: [
          { src: "assets/imagens-catalogo/svg/Compactador_solo_tipo%20sapo_gasolina.svg", alt: "Ilustração do compactador de solo tipo sapo a gasolina" }
        ]
      }
    ]
  },
  {
    id: "limpeza",
    label: "Limpeza",
    eyebrow: "Organização da obra",
    title: "Limpeza",
    description: "Equipamento para limpeza pesada e apoio na organização do canteiro.",
    items: [
      {
        name: "Aspirador industrial",
        images: [
          { src: "assets/imagens-catalogo/svg/aspirador_industrial.svg", alt: "Ilustração do aspirador industrial" },
          { src: "assets/imagens-catalogo/aspirador-industrial.png", alt: "Aspirador industrial" }
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

const showCatalogCard = (card) => {
  if (!catalogState || !card) return;

  catalogState.filter = "todos";
  const cards = catalogState.cards;
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
  const filteredCards = cards.filter((card) => state.filter === "todos" || card.dataset.catalogCategory === state.filter);
  const totalPages = Math.max(1, Math.ceil(filteredCards.length / pageSize));

  state.page = Math.min(Math.max(state.page, 1), totalPages);

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
    const fields = document.createElement("div");
    fields.className = "equipment-configurator__fields";

    configurator.fields.forEach((field) => {
      const label = document.createElement("label");
      const select = document.createElement("select");
      select.dataset.configField = field.label;

      (field.options || []).forEach((optionLabel) => {
        const option = document.createElement("option");
        option.textContent = optionLabel;
        select.append(option);
      });

      label.append(field.label, select);
      fields.append(label);
    });

    form.append(fields);
  }

  if (Array.isArray(configurator.pieces) && configurator.pieces.length > 0) {
    const pieces = document.createElement("div");
    pieces.className = "equipment-configurator__pieces";

    configurator.pieces.forEach((piece) => {
      const label = document.createElement("label");
      const input = document.createElement("input");

      input.type = "number";
      input.min = "0";
      input.step = "1";
      input.inputMode = "numeric";
      input.value = "0";
      input.dataset.configPiece = piece;

      label.append(piece, input);
      pieces.append(label);
    });

    form.append(pieces);
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
    .map((field) => ({
      name: field.dataset.configPiece,
      quantity: Number(field.value || 0)
    }))
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

  detail.append(intro, specList);
  if (configurator) detail.append(configurator);
  detail.append(quoteLink);
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
        quoteLink.before(configurator);
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

    if (details.length < 10) {
      focusInvalidField(
        quoteForm.querySelector("textarea[name='detalhes']"),
        "Descreva medidas, quantidade ou prazo com um pouco mais de detalhe."
      );
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
      `Detalhes: ${details}`
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
    configInput.value = getConfiguratorSummary(trigger.closest(".equipment-detail"));
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
