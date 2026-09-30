// ========================================================================== 
// FITROP 2026 - Plataforma Institucional
// Lógica de interactividad, multi-idioma corporativo, directorio y catálogo
// ========================================================================== 

if ("scrollRestoration" in history) history.scrollRestoration = "manual";

document.addEventListener("DOMContentLoaded", () => {
  // Estado de la aplicación
  const state = {
    lang: localStorage.getItem("fitrop_lang") || "es",
    theme: "light",
    activeCategory: "all",
    activePavilion: null,
    searchQuery: "",
    modalOpen: false,
    activeConcertNight: "all",
    adminFilter: "all"
  };
  const standInventory = window.fitropStandInventory;
  let fairPlanCatalog = [];

  // ==========================================================================
  // SPA VIEW ROUTER: "CADA COSA TIENE SU PROPIO LUGAR"
  // Solo muestra la sección activa correspondiente al botón presionado
  // ==========================================================================
  const viewMap = {
    "inicio": ["inicio", "productos", "organizadores"],
    "produccion": ["productos", "produccionContenido"],
    "pabellones": ["pabellones", "venta-espacios"],
    "expositores": ["productos", "expositores"],
    "maquinaria": ["maquinaria"],
    "gastronomia": ["gastronomia"],
    "conciertos": ["conciertos"],
    "programa": ["programa"],
    "croquis": ["croquis"],
    "mapa": ["mapa"]
  };

  function switchView(viewName, updateHistory = true) {
    if (!viewName || viewName === "" || viewName === "#") viewName = "inicio";
    viewName = viewName.replace("#", "").toLowerCase();

    // Si es hash #admin, delegar al manejador secreto
    if (viewName === "admin") {
      window.location.href = "gestion-puestos.html";
      return;
    }

    if (!viewMap[viewName]) {
      viewName = "inicio";
    }

    // 1. Ocultar todas las secciones de vista
    document.querySelectorAll(".page-view-section").forEach(sec => {
      sec.classList.remove("active-view");
    });

    // 2. Mostrar únicamente las secciones correspondientes a la vista activa
    const targetSectionIds = viewMap[viewName] || ["inicio", "organizadores"];
    targetSectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.add("active-view");
    });

    // 3. Actualizar clase activa en enlaces de navegación
    document.querySelectorAll(".nav-link, .mobile-nav-link").forEach(link => {
      const href = link.getAttribute("href");
      if (href === "#" + viewName || (viewName === "inicio" && href === "#inicio")) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    // 4. Desplazar inmediatamente hacia arriba para ver la sección limpia desde el inicio
    window.scrollTo({ top: 0, behavior: "instant" });

    // 5. Cerrar cajón móvil si está abierto
    const mobileDrawer = document.getElementById("mobileDrawer");
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    if (mobileDrawer) mobileDrawer.classList.remove("open");
    if (mobileMenuBtn) mobileMenuBtn.setAttribute("aria-expanded", "false");

    // 6. Actualizar historial de navegación
    if (updateHistory && window.location.hash !== "#" + viewName) {
      history.pushState(null, "", "#" + viewName);
    }
  }

  // Interceptar todos los enlaces internos para cambio de vista sin recarga ni desplazamiento largo
  document.addEventListener("click", (e) => {
    const target = e.target.closest("a");
    if (!target) return;
    const href = target.getAttribute("href");
    if (target.hasAttribute("data-production-detail")) {
      e.preventDefault();
      switchView("produccion");
      requestAnimationFrame(() => document.getElementById("produccionContenido")?.scrollIntoView({ block: "start" }));
      return;
    }
    if (href && href.startsWith("#") && href.length > 1) {
      e.preventDefault();
      const viewId = href.substring(1);
      switchView(viewId);
    }
  });

  // Soporte para botón atrás/adelante del navegador
  window.addEventListener("popstate", () => {
    const currentHash = window.location.hash.replace("#", "") || "inicio";
    switchView(currentHash, false);
  });
  function restoreInitialRouteScroll() {
    const selectedProduct = new URLSearchParams(window.location.search).get("producto");
    if (window.location.hash === "#produccion") {
      const targetId = selectedProduct ? "produccionContenido" : "productos";
      document.getElementById(targetId)?.scrollIntoView({ block: "start", behavior: "instant" });
    } else if (window.location.hash) {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }
  // Restore the route after browser scroll restoration and lazy image layout.
  for (const eventName of ["load", "pageshow"]) {
    window.addEventListener(eventName, () => {
      requestAnimationFrame(() => requestAnimationFrame(restoreInitialRouteScroll));
    }, { once: true });
  }

  // --- 1. Gestión de Tema (Oscuro / Claro) ---
  const htmlEl = document.documentElement;
  const themeToggleBtn = document.getElementById("themeToggleBtn");

  function applyTheme(theme) {
    state.theme = theme;
    htmlEl.setAttribute("data-theme", theme);
    localStorage.setItem("fitrop_theme", theme);
  }

  // Inicializar tema guardado
  applyTheme(state.theme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const nextTheme = state.theme === "dark" ? "light" : "dark";
      applyTheme(nextTheme);
    });
  }

  // --- 2. Motor Multi-idioma (i18n) ---
  function applyLanguage(lang) {
    if (!i18nData[lang]) lang = "es";
    state.lang = lang;
    localStorage.setItem("fitrop_lang", lang);

    const dictionary = i18nData[lang];
    if (dictionary.site_title) {
      document.title = dictionary.site_title;
    }

    // Actualizar botones de idioma activos
    document.querySelectorAll(".lang-seg-btn, .m-lang-btn").forEach(btn => {
      if (btn.getAttribute("data-lang") === lang) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    // Traducir elementos con data-i18n
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (dictionary[key]) {
        el.textContent = dictionary[key];
      }
    });

    // Traducir atributos (placeholders, etc.)
    document.querySelectorAll("[data-i18n-attr]").forEach(el => {
      const pair = el.getAttribute("data-i18n-attr");
      const [attr, key] = pair.split(":");
      if (attr && key && dictionary[key]) {
        el.setAttribute(attr, dictionary[key]);
      }
    });

    // Actualizar componentes dinámicos
    renderPavilionCards();
    renderExhibitors();
    renderMachinery();
    renderGastronomy();
    renderConcerts();
    if (typeof applyPageTranslations === 'function') applyPageTranslations(lang);
  }

  // Asignar listeners a botones de idioma
  document.querySelectorAll(".lang-seg-btn, .m-lang-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const chosenLang = btn.getAttribute("data-lang");
      if (chosenLang) {
        applyLanguage(chosenLang);
      }
      const mobileDrawer = document.getElementById("mobileDrawer");
      if (mobileDrawer) mobileDrawer.classList.remove("open");
    });
  });

  // --- 5. Directorio de Pabellones y Sectores ---
  const pavilionsCardList = document.getElementById("pavilionsCardList");
  const btnResetMapFilter = document.getElementById("btnResetMapFilter");

  function renderPavilionCards() {
    if (!pavilionsCardList) return;
    pavilionsCardList.innerHTML = "";

    fitropData.pavilions.forEach(pav => {
      const card = document.createElement("div");
      card.className = `pavilion-card ${state.activePavilion === pav.id ? 'active' : ''}`;
      card.setAttribute("data-pavilion-id", pav.id);

      card.innerHTML = `
        <div class="pav-card-media">
          <img src="${pav.image}" alt="${pav.name}" class="pav-img">
          <div class="pav-img-overlay"></div>
          <span class="pav-code-badge">${pav.code}</span>
        </div>
        <div class="pav-card-body">
          <div class="pav-card-top">
            <span class="pav-sector-badge">${pav.sector}</span>
          </div>
          <h3 class="pav-card-title">${pav.name}</h3>
          <p class="pav-card-desc">${pav.description}</p>
          <div class="pav-specs-row">
            <div class="pav-spec-item">
              <span class="pav-spec-label">Superficie:</span>
              <span class="pav-spec-val">${pav.surface}</span>
            </div>
            <div class="pav-spec-item">
              <span class="pav-spec-label">Capacidad:</span>
              <span class="pav-spec-val">${pav.standsCount} Stands</span>
            </div>
            <div class="pav-spec-item" style="grid-column: span 2;">
              <span class="pav-spec-label">Ubicación en Recinto:</span>
              <span class="pav-spec-val">${pav.location}</span>
            </div>
          </div>
          <div class="pav-card-action">
            <span>Ver empresas de este sector</span>
            <span>→</span>
          </div>
        </div>
      `;

      card.addEventListener("click", () => {
        selectPavilion(pav.id);
      });

      pavilionsCardList.appendChild(card);
    });
  }

  function selectPavilion(pavId) {
    state.activePavilion = (state.activePavilion === pavId) ? null : pavId;

    // Actualizar clase activa en tarjetas de pabellón
    document.querySelectorAll(".pavilion-card").forEach(c => {
      if (c.getAttribute("data-pavilion-id") === state.activePavilion) {
        c.classList.add("active");
      } else {
        c.classList.remove("active");
      }
    });

    if (state.activePavilion) {
      const pavObj = fitropData.pavilions.find(p => p.id === state.activePavilion);
      const catMap = {
        "pav-agro": "agro",
        "pav-emobility": "emobility",
        "pav-gastronomy": "gastronomy",
        "pav-technology": "technology",
        "pav-indigenous": "indigenous"
      };
      const mappedCategory = catMap[state.activePavilion] || "all";
      setCategoryFilter(mappedCategory, pavObj ? pavObj.name : null);

      const exhibitorsSection = document.getElementById("expositores");
      if (exhibitorsSection) {
        exhibitorsSection.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      setCategoryFilter("all");
    }
  }

  if (btnResetMapFilter) {
    btnResetMapFilter.addEventListener("click", () => {
      state.activePavilion = null;
      document.querySelectorAll(".pavilion-card").forEach(c => c.classList.remove("active"));
      setCategoryFilter("all");
    });
  }

  // --- 6. Directorio de Expositores y Filtros ---
  const exhibitorsGrid = document.getElementById("exhibitorsGrid");
  const exhibitorSearchInput = document.getElementById("exhibitorSearchInput");
  const clearSearchBtn = document.getElementById("clearSearchBtn");
  const filterPills = document.querySelectorAll(".filter-pill");
  const exhibitorsEmptyState = document.getElementById("exhibitorsEmptyState");
  const filterStatusInfo = document.getElementById("filterStatusInfo");
  const filterStatusText = document.getElementById("filterStatusText");
  const btnClearCurrentFilter = document.getElementById("btnClearCurrentFilter");
  const btnResetSearch = document.getElementById("btnResetSearch");

  function setCategoryFilter(category, customLabel = null) {
    state.activeCategory = category;

    filterPills.forEach(pill => {
      if (pill.getAttribute("data-category") === category) {
        pill.classList.add("active");
      } else {
        pill.classList.remove("active");
      }
    });

    if (category !== "all" || customLabel) {
      filterStatusInfo.style.display = "flex";
      filterStatusText.innerHTML = `Sector activo: <strong>${customLabel || category.toUpperCase()}</strong>`;
    } else {
      filterStatusInfo.style.display = "none";
    }

    renderExhibitors();
  }

  filterPills.forEach(pill => {
    pill.addEventListener("click", () => {
      state.activePavilion = null;
      document.querySelectorAll(".pavilion-card").forEach(c => c.classList.remove("active"));
      const cat = pill.getAttribute("data-category");
      setCategoryFilter(cat);
    });
  });

  if (btnClearCurrentFilter) {
    btnClearCurrentFilter.addEventListener("click", () => {
      setCategoryFilter("all");
    });
  }

  if (exhibitorSearchInput) {
    exhibitorSearchInput.addEventListener("input", (e) => {
      state.searchQuery = e.target.value.trim().toLowerCase();
      if (clearSearchBtn) {
        if (state.searchQuery.length > 0) {
          clearSearchBtn.classList.add("visible");
        } else {
          clearSearchBtn.classList.remove("visible");
        }
      }
      renderExhibitors();
    });

    if (clearSearchBtn) {
      clearSearchBtn.addEventListener("click", () => {
        exhibitorSearchInput.value = "";
        state.searchQuery = "";
        clearSearchBtn.classList.remove("visible");
        renderExhibitors();
      });
    }
  }

  if (btnResetSearch) {
    btnResetSearch.addEventListener("click", () => {
      if (exhibitorSearchInput) {
        exhibitorSearchInput.value = "";
        clearSearchBtn.classList.remove("visible");
      }
      state.searchQuery = "";
      setCategoryFilter("all");
    });
  }

  function renderExhibitors() {
    if (!exhibitorsGrid) return;

    const dict = i18nData[state.lang] || i18nData.es;
    const filtered = fitropData.exhibitors.filter(ex => {
      const matchCat = state.activeCategory === "all" || ex.category === state.activeCategory;
      const query = state.searchQuery;
      const matchQuery = !query || 
        ex.name.toLowerCase().includes(query) ||
        ex.standNumber.toLowerCase().includes(query) ||
        ex.pavilion.toLowerCase().includes(query) ||
        ex.highlight.toLowerCase().includes(query) ||
        ex.products.some(p => p.toLowerCase().includes(query));

      return matchCat && matchQuery;
    });

    exhibitorsGrid.innerHTML = "";

    if (filtered.length === 0) {
      exhibitorsEmptyState.style.display = "block";
    } else {
      exhibitorsEmptyState.style.display = "none";
      filtered.forEach(ex => {
        const card = document.createElement("div");
        card.className = "exhibitor-card";

        const productTagsHtml = ex.products.map(p => `<span class="prod-tag">${p}</span>`).join("");

        card.innerHTML = `
          <div class="ex-top">
            <div class="ex-avatar-corp">${ex.initials}</div>
            <div class="ex-badges-col">
              <span class="stand-badge">Stand ${ex.standNumber}</span>
              <span class="featured-tag">${ex.badge}</span>
            </div>
          </div>
          <h3 class="ex-title">${ex.name}</h3>
          <div class="ex-pavilion">${ex.pavilion}</div>
          <p class="ex-desc">${ex.highlight}</p>
          <div class="ex-product-tags">${productTagsHtml}</div>
          <div class="ex-footer">
            <span class="ex-origin">${ex.location}</span>
            <button type="button" class="btn-card-action" data-ex-id="${ex.id}">
              ${dict.btn_view_stand_detail} →
            </button>
          </div>
        `;

        card.querySelector(".btn-card-action").addEventListener("click", () => {
          openExhibitorModal(ex);
        });

        exhibitorsGrid.appendChild(card);
      });
    }
  }

  // --- 7. Salón de Electromovilidad y Maquinaria Agrícola ---
  const machineryGrid = document.getElementById("machineryGrid");

  function renderMachinery() {
    if (!machineryGrid) return;
    const dict = i18nData[state.lang] || i18nData.es;
    machineryGrid.innerHTML = "";

    fitropData.electricMachinery.forEach(item => {
      const card = document.createElement("div");
      card.className = "machine-card";

      card.innerHTML = `
        <div class="machine-media">
          <img src="${item.image}" alt="${item.name}" class="machine-img" loading="lazy">
          <div class="machine-img-overlay"></div>
          <span class="machine-badge-overlay">${item.badge}</span>
        </div>
        <div class="machine-header">
          <div>
            <h3 class="machine-name">${item.name}</h3>
            <span class="machine-type">${item.category}</span>
          </div>
        </div>
        <p class="machine-desc">${item.description}</p>
        <div class="machine-specs">
          <div class="spec-row">
            <span class="spec-k">${dict.spec_power}:</span>
            <span class="spec-v">${item.power}</span>
          </div>
          <div class="spec-row">
            <span class="spec-k">${dict.spec_battery}:</span>
            <span class="spec-v">${item.battery}</span>
          </div>
          <div class="spec-row">
            <span class="spec-k">${dict.spec_range}:</span>
            <span class="spec-v">${item.range}</span>
          </div>
          <div class="spec-row">
            <span class="spec-k">${dict.spec_payload}:</span>
            <span class="spec-v">${item.payload}</span>
          </div>
        </div>
        <div class="machine-card-footer">
          <button type="button" class="btn btn-sm btn-electric" data-machine-id="${item.id}">
            <span>${dict.btn_spec_sheet}</span>
            <span>→</span>
          </button>
        </div>
      `;

      card.querySelector("button").addEventListener("click", () => {
        openMachineryModal(item);
      });

      machineryGrid.appendChild(card);
    });
  }

  // --- 8. Muestra Gastronómica y Piscícola ---
  const gastronomyGrid = document.getElementById("gastronomyGrid");

  function renderGastronomy() {
    if (!gastronomyGrid) return;
    gastronomyGrid.innerHTML = "";

    fitropData.gastronomy.forEach(dish => {
      const card = document.createElement("div");
      card.className = "dish-card";

      card.innerHTML = `
        <div class="dish-media">
          <img src="${dish.image}" alt="${dish.name}" class="dish-img" loading="lazy">
          <div class="dish-img-overlay"></div>
          <span class="dish-badge-overlay">${dish.badge}</span>
        </div>
        <div class="dish-body">
          <div class="dish-meta-row">
            <span class="dish-category">${dish.category}</span>
            <span class="dish-origin-tag">Sede: ${dish.origin}</span>
          </div>
          <h3 class="dish-title">${dish.name}</h3>
          <p class="dish-desc">${dish.description}</p>
          <div class="dish-pairing">
            <strong>Maridaje recomendado:</strong> ${dish.pairing}
          </div>
        </div>
      `;

      card.addEventListener("click", () => {
        openGastronomyModal(dish);
      });

      gastronomyGrid.appendChild(card);
    });
  }

  // --- 9. Conciertos y Festivales (Arena San Mateo) ---
  const concertsGrid = document.getElementById("concertsGrid");
  const concertPills = document.querySelectorAll(".concert-pill");

  function renderConcerts() {
    if (!concertsGrid) return;
    const dict = i18nData[state.lang] || i18nData.es;
    concertsGrid.innerHTML = "";

    const filteredConcerts = fitropData.concerts.filter(c => {
      if (state.activeConcertNight === "all") return true;
      return c.night === state.activeConcertNight;
    });

    if (filteredConcerts.length === 0) {
      concertsGrid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 2.5rem; color: var(--text-muted); font-size: 0.95rem;">No hay espectáculos programados para este filtro.</div>`;
      return;
    }

    filteredConcerts.forEach(c => {
      const card = document.createElement("div");
      card.className = "concert-card";
      card.setAttribute("role", "button");
      card.setAttribute("tabindex", "0");
      card.setAttribute("aria-label", `${c.artist} - ${c.nightLabel}`);

      card.innerHTML = `
        <div class="concert-media">
          <img src="${c.image}" alt="${c.artist}" class="artist-img" loading="lazy">
          <div class="concert-img-overlay"></div>
          <span class="concert-badge-overlay">${c.badge}</span>
          <span class="concert-time-badge">${c.time}</span>
        </div>
        <div class="concert-body">
          <span class="concert-night-tag">${c.nightLabel}</span>
          <h3 class="concert-title">${c.artist}</h3>
          <span class="concert-genre">${c.genre}</span>
          <p class="concert-desc">${c.description}</p>
          <div class="concert-card-footer">
            <span style="font-size: 0.74rem; color: var(--corp-emerald-light); font-weight: 700;">
              ${dict.concert_included || "Acceso incluido con entrada general"}
            </span>
            <button type="button" class="btn btn-outline btn-sm">
              <span>${dict.btn_view_artist || "Ver Ficha"}</span>
            </button>
          </div>
        </div>
      `;

      card.addEventListener("click", () => {
        openConcertModal(c);
      });
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openConcertModal(c);
        }
      });

      concertsGrid.appendChild(card);
    });
  }

  // Asignar listeners a botones de filtro por noche
  if (concertPills && concertPills.length > 0) {
    concertPills.forEach(pill => {
      pill.addEventListener("click", () => {
        concertPills.forEach(p => p.classList.remove("active"));
        pill.classList.add("active");
        state.activeConcertNight = pill.getAttribute("data-night") || "all";
        renderConcerts();
      });
    });
  }

  // --- 10. Programa Oficial ---
  const scheduleDaysContainer = document.getElementById("scheduleDaysContainer");

  function renderSchedule() {
    if (!scheduleDaysContainer) return;
    scheduleDaysContainer.innerHTML = "";

    fitropData.schedule.forEach(dayItem => {
      const dayCard = document.createElement("div");
      dayCard.className = "schedule-day-card";

      const eventsHtml = dayItem.events.map(ev => `
        <div class="event-row">
          <span class="event-time">${ev.time}</span>
          <div class="event-details">
            <h4 class="event-title">${ev.title}</h4>
            <span class="event-place">Ubicación: ${ev.place}</span>
          </div>
        </div>
      `).join("");

      dayCard.innerHTML = `
        <div class="day-header">
          <h3 class="day-title">${dayItem.day}</h3>
          <span class="day-badge">${dayItem.badge}</span>
        </div>
        <div class="events-list">
          ${eventsHtml}
        </div>
      `;

      scheduleDaysContainer.appendChild(dayCard);
    });
  }

  // --- 10. Modales Informativos ---
  const appModal = document.getElementById("appModal");
  const modalContent = document.getElementById("modalContent");
  const modalCloseBtn = document.getElementById("modalCloseBtn");

  function openModal(htmlContent) {
    if (!appModal || !modalContent) return;
    modalContent.innerHTML = htmlContent;
    appModal.classList.add("open");
    appModal.setAttribute("aria-hidden", "false");
    state.modalOpen = true;
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    if (!appModal) return;
    appModal.classList.remove("open");
    appModal.setAttribute("aria-hidden", "true");
    state.modalOpen = false;
    document.body.style.overflow = "";
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", closeModal);
  }

  if (appModal) {
    appModal.addEventListener("click", (e) => {
      if (e.target === appModal) closeModal();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && state.modalOpen) {
      closeModal();
    }
  });

  // Modal: Ficha del Expositor
  function openExhibitorModal(ex) {
    const dict = i18nData[state.lang] || i18nData.es;
    const cleanPhone = ex.contact.whatsapp.replace(/[^0-9]/g, '');
    const waText = encodeURIComponent(`Estimados ${ex.name}, les contacto desde el portal oficial de FITROP 2026 para solicitar información comercial.`);

    const html = `
      <div class="modal-header-block">
        <div class="modal-initials-lg">${ex.initials}</div>
        <div>
          <h2 class="modal-title-main">${ex.name}</h2>
          <span class="modal-subtitle">Stand ${ex.standNumber} • ${ex.pavilion}</span>
        </div>
      </div>

      <div class="modal-meta-box">
        <div class="modal-meta-item">
          <span class="modal-meta-label">Municipio / Origen</span>
          <strong>${ex.location}</strong>
        </div>
        <div class="modal-meta-item">
          <span class="modal-meta-label">Categoría Comercial</span>
          <strong>${ex.badge}</strong>
        </div>
        <div class="modal-meta-item">
          <span class="modal-meta-label">Contacto Central</span>
          <strong>${ex.contact.phone}</strong>
        </div>
      </div>

      <p class="modal-body-p">${ex.description}</p>

      <div style="margin-bottom: 1.25rem;">
        <h4 style="font-size: 0.9rem; font-weight: 700; margin-bottom: 0.5rem; text-transform: uppercase; color: var(--corp-emerald-light);">Líneas de Producción en Exhibición:</h4>
        <ul style="padding-left: 1.2rem; color: var(--text-muted); font-size: 0.88rem; line-height: 1.7;">
          ${ex.products.map(p => `<li>${p}</li>`).join("")}
        </ul>
      </div>

      <div class="modal-contact-actions">
        <a href="https://wa.me/${cleanPhone}?text=${waText}" target="_blank" rel="noopener" class="btn btn-whatsapp-action">
          <span>${dict.modal_contact}</span>
        </a>
        <a href="mailto:${ex.contact.email}?subject=Consulta%20Comercial%20FITROP%202026" class="btn btn-outline">
          <span>${dict.modal_email}</span>
        </a>
      </div>
    `;

    openModal(html);
  }

  // Modal: Ficha Técnica de Maquinaria
  function openMachineryModal(m) {
    const html = `
      <div class="modal-banner">
        <img src="${m.image}" alt="${m.name}">
      </div>
      <div class="modal-header-block">
        <div>
          <h2 class="modal-title-main">${m.name}</h2>
          <span class="modal-subtitle">${m.category} • ${m.badge}</span>
        </div>
      </div>

      <div class="modal-meta-box">
        <div class="modal-meta-item">
          <span class="modal-meta-label">Potencia Motor</span>
          <strong>${m.power}</strong>
        </div>
        <div class="modal-meta-item">
          <span class="modal-meta-label">Almacenamiento</span>
          <strong>${m.battery}</strong>
        </div>
        <div class="modal-meta-item">
          <span class="modal-meta-label">Autonomía</span>
          <strong>${m.range}</strong>
        </div>
        <div class="modal-meta-item">
          <span class="modal-meta-label">Capacidad Útil</span>
          <strong>${m.payload}</strong>
        </div>
      </div>

      <p class="modal-body-p">${m.description}</p>

      <div style="margin-bottom: 1.25rem;">
        <h4 style="font-size: 0.9rem; font-weight: 700; margin-bottom: 0.65rem; text-transform: uppercase; color: #38bdf8;">Especificaciones Técnicas para Operación Tropical:</h4>
        <ul style="padding-left: 1.2rem; color: var(--text-muted); font-size: 0.88rem; line-height: 1.7;">
          ${m.features.map(f => `<li>${f}</li>`).join("")}
        </ul>
      </div>

      <div class="modal-contact-actions">
        <a href="https://wa.me/59171720101?text=Deseo%20solicitar%20cotizaci%C3%B3n%20institucional%20para%20${encodeURIComponent(m.name)}" target="_blank" rel="noopener" class="btn btn-electric">
          <span>Solicitar Cotización y Demostración en Terreno</span>
        </a>
      </div>
    `;

    openModal(html);
  }

  // Modal: Ficha Gastronómica
  function openGastronomyModal(dish) {
    const html = `
      <div class="modal-banner">
        <img src="${dish.image}" alt="${dish.name}">
      </div>
      <div class="modal-header-block">
        <div>
          <h2 class="modal-title-main">${dish.name}</h2>
          <span class="modal-subtitle">${dish.origin} • ${dish.badge}</span>
        </div>
      </div>

      <div class="modal-meta-box">
        <div class="modal-meta-item">
          <span class="modal-meta-label">Sector Acuícola / Culinario</span>
          <strong>${dish.category}</strong>
        </div>
      </div>

      <p class="modal-body-p">${dish.description}</p>

      <div style="background: var(--bg-surface-2); padding: 0.85rem 1rem; border-radius: var(--radius-xs); margin-bottom: 1rem; border-left: 3px solid var(--corp-amber);">
        <strong style="color: var(--corp-amber); display: block; font-size: 0.78rem; text-transform: uppercase; margin-bottom: 0.25rem;">Materia Prima y Origen:</strong>
        <p style="font-size: 0.85rem; color: var(--text-muted);">${dish.ingredients}</p>
      </div>

      <div style="background: var(--bg-surface-2); padding: 0.85rem 1rem; border-radius: var(--radius-xs); margin-bottom: 1.25rem;">
        <strong style="color: #38bdf8; display: block; font-size: 0.78rem; text-transform: uppercase; margin-bottom: 0.25rem;">Maridaje Oficial Recomendado:</strong>
        <p style="font-size: 0.85rem; color: var(--text-muted);">${dish.pairing}</p>
      </div>

      <div class="modal-contact-actions">
        <a href="#pabellones" onclick="document.getElementById('appModal').classList.remove('open')" class="btn btn-primary">
          <span>Ver Pabellón Piscícola (03)</span>
        </a>
      </div>
    `;

    openModal(html);
  }

  // Modal: Ficha del Concierto / Artista
  function openConcertModal(c) {
    const dict = i18nData[state.lang] || i18nData.es;
    const cleanPhone = "59171720101";
    const waText = encodeURIComponent(`Estimados organizadores de FITROP 2026, deseo consultar por acreditaciones o reserva de Palco VIP para el concierto de ${c.artist} (${c.date}).`);

    const repertoireHtml = c.repertoire.map(item => `<li>${item}</li>`).join("");

    const html = `
      <div class="modal-banner">
        <img src="${c.image}" alt="${c.artist}">
      </div>
      <div class="modal-header-block">
        <div>
          <h2 class="modal-title-main">${c.artist}</h2>
          <span class="modal-subtitle">${c.genre} • ${c.badge}</span>
        </div>
      </div>

      <div class="modal-meta-box">
        <div class="modal-meta-item">
          <span class="modal-meta-label">Fecha y Horario</span>
          <strong style="color: var(--corp-emerald-light);">${c.date} • ${c.time}</strong>
        </div>
        <div class="modal-meta-item">
          <span class="modal-meta-label">Escenario</span>
          <strong>${c.stage}</strong>
        </div>
        <div class="modal-meta-item">
          <span class="modal-meta-label">Origen / Delegación</span>
          <strong>${c.origin}</strong>
        </div>
        <div class="modal-meta-item">
          <span class="modal-meta-label">Régimen de Entrada</span>
          <strong>Entrada General Ferial</strong>
        </div>
      </div>

      <p class="modal-body-p">${c.description}</p>

      <div style="background: var(--bg-surface-2); padding: 0.9rem 1.15rem; border-radius: var(--radius-xs); margin-bottom: 1.25rem; border-left: 3px solid #38bdf8;">
        <strong style="color: #38bdf8; display: block; font-size: 0.8rem; text-transform: uppercase; margin-bottom: 0.35rem;">Programa y Repertorio Destacado:</strong>
        <ul style="padding-left: 1.2rem; color: var(--text-muted); font-size: 0.88rem; line-height: 1.7; margin: 0;">
          ${repertoireHtml}
        </ul>
      </div>

      <div style="background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.25); padding: 0.85rem 1rem; border-radius: var(--radius-xs); margin-bottom: 1.25rem;">
        <span style="font-size: 0.78rem; font-weight: 700; color: var(--corp-emerald-light); text-transform: uppercase; display: block; margin-bottom: 0.2rem;">Protocolo de Acceso y Mesas VIP:</span>
        <p style="font-size: 0.84rem; color: var(--text-muted); margin: 0; line-height: 1.5;">${c.ticketInfo}</p>
      </div>

      <div class="modal-contact-actions">
        <a href="https://wa.me/${cleanPhone}?text=${waText}" target="_blank" rel="noopener" class="btn btn-whatsapp-action">
          <span>${dict.btn_vip_reserve || "Consultar Palco VIP"}</span>
        </a>
        <a href="#programa" onclick="document.getElementById('appModal').classList.remove('open')" class="btn btn-outline">
          <span>Ver Programa General</span>
        </a>
      </div>
    `;

    openModal(html);
  }

  // Las solicitudes y su activación viven en espacios.html; la gestión se abre directamente en gestion-puestos.html.

  // ==========================================================================
  // MAPA INTERACTIVO DE COCHABAMBA Y EL TRÓPICO FERIAL (FITROP 2026)
  // Geografía Productiva, Sedes Feriales y Conectividad Bioceánica
  // ==========================================================================

  // ==========================================================================
  // MÓDULO DE PRODUCCIÓN OFICIAL Y GALERÍA DE LAS SEIS FEDERACIONES (FITROP)
  // Vocación productiva, cadenas de exportación y fotogalería multimedia (132 fotos)
  // ==========================================================================
  function initProduccionModule() {
    const fedsContainer = document.getElementById("federacionesCardsContainer");
    const galleryGrid = document.getElementById("produccionGalleryGrid");
    const tabFedsBtn = document.getElementById("btnTabFederaciones");
    const tabGaleriaBtn = document.getElementById("btnTabGaleria");
    const panelFeds = document.getElementById("panelFederaciones");
    const panelGaleria = document.getElementById("panelGaleria");
    const galleryFiltersBar = document.getElementById("galleryFiltersBar");

    // Modal elements
    const prodModal = document.getElementById("produccionModal");
    const prodModalImg = document.getElementById("prodModalImg");
    const prodModalTitle = document.getElementById("prodModalTitle");
    const prodModalCategory = document.getElementById("prodModalCategory");
    const prodModalCounter = document.getElementById("prodModalCounter");
    const prodModalClose = document.getElementById("prodModalClose");
    const prodModalPrev = document.getElementById("prodModalPrev");
    const prodModalNext = document.getElementById("prodModalNext");

    if (!fedsContainer && !galleryGrid) return;

    const fedsData = (window.fitropData && window.fitropData.federacionesData) || [];
    const galleryData = (window.fitropData && window.fitropData.produccionGallery) || [];
    const focus = document.getElementById("productFocus");
    const productionSection = document.getElementById("produccionContenido");
    const productStories = {
      cacao: { title: "Cacao: de la planta al grano", description: "Conoce a las personas que cultivan, cosechan, fermentan y secan el cacao del Trópico. Las imágenes siguen el trabajo que convierte el fruto en un producto listo para transformar.", image: "assets/img/produccion/cacao/cacao_13.jpeg", alt: "Productora presenta granos de cacao fermentados" },
      pina: { title: "Piña: cultivar, cosechar y seleccionar", description: "En el campo empieza una cadena de trabajo que continúa con la cosecha, la selección y la preparación de la fruta para su distribución.", image: "assets/img/produccion/pina/pina_03.jpg", alt: "Productor cosecha una piña en el campo" },
      banana: { title: "Banano: del racimo al empaque", description: "Mira las plantaciones, la cosecha y el trabajo de quienes lavan, clasifican y empacan el banano producido en el Trópico.", image: "assets/img/produccion/banana/banana_07.jpg", alt: "Trabajadoras seleccionan y empacan banano" },
      palmito: { title: "Palmito: cosecha y transformación", description: "Las fotografías muestran la materia prima, el procesamiento y a quienes preparan el palmito para su consumo.", image: "assets/img/produccion/palmito/palmito_05.jpg", alt: "Trabajadoras procesan palmito fresco" },
      miel: { title: "Miel: el trabajo de la colmena", description: "Conoce la apicultura y los productos de la colmena presentados por sus propias productoras y productores.", image: "assets/img/produccion/miel/miel_04.jpg", alt: "Productora presenta miel y productos de la colmena" },
      piscicultura: { title: "Piscicultura: criar y cosechar peces", description: "Estas imágenes muestran las piscinas, el cuidado y la cosecha de peces realizada por productores del Trópico.", image: "assets/img/produccion/piscicultura/piscicultura_11.jpg", alt: "Productores cosechan peces en una piscina" },
      frutas: { title: "Frutas tropicales: la cosecha familiar", description: "Cítricos y otras frutas pasan del cultivo a la cosecha y selección gracias al trabajo de las familias productoras.", image: "assets/img/produccion/frutas/frutas_07.jpeg", alt: "Productora presenta frutos tropicales cosechados" },
      dirigentes: { title: "Las personas detrás de FITROP", description: "Fotografías de la presentación de la producción regional, las organizaciones y sus representantes.", image: "assets/img/produccion/dirigentes/dirigentes_02.jpeg", alt: "Representantes presentan la producción del Trópico" }
    };

    let currentActiveCategory = "all";
    let activeFilteredGallery = galleryData;
    let currentModalIndex = 0;

    // Función de limpieza de títulos para garantizar cero nombres de archivo crudos o cadenas de WhatsApp
    function sanitizeTitle(rawTitle, categoryTitle) {
      if (!rawTitle) return categoryTitle || "Registro Fotográfico Oficial";
      let clean = String(rawTitle)
        .replace(/whatsapp\s*image[^\.]*/gi, '')
        .replace(/\.(jpeg|jpg|png|webp)/gi, '')
        .replace(/[_\-]+/g, ' ')
        .trim();
      return clean.length > 2 ? clean : (categoryTitle || "Registro Productivo Oficial");
    }

    // 1. CARRUSEL EN MOVIMIENTO DE LAS SEIS FEDERACIONES (FITROP 2026)
    const carouselWrapper = document.getElementById("fedsCarouselWrapper");
    const carouselProgressTrack = document.getElementById("carouselProgressTrack");
    const fedsTitlesTrack = document.getElementById("fedsTitlesTrack");
    const fedsTitlesViewport = document.getElementById("fedsTitlesViewport");
    const fedsTitlesPrevBtn = document.getElementById("fedsTitlesPrevBtn");
    const fedsTitlesNextBtn = document.getElementById("fedsTitlesNextBtn");
    const carouselPlayPauseBtn = document.getElementById("carouselPlayPauseBtn");
    const carouselStatusText = document.getElementById("carouselStatusText");
    const carouselSlidesTrack = document.getElementById("carouselSlidesTrack");
    const carouselDotsList = document.getElementById("carouselDotsList");
    const carouselCounterBadge = document.getElementById("carouselCounterBadge");
    const carouselPrevBtn = document.getElementById("carouselPrevBtn");
    const carouselNextBtn = document.getElementById("carouselNextBtn");

    let currentSlideIdx = 0;
    let isAutoPlaying = false;
    let isHovered = false;
    const AUTOPLAY_STEP_MS = 5000;
    let timerStart = Date.now();
    let animTimerId = null;

    // Renderizar los 6 Slides del Carrusel
    if (carouselSlidesTrack && fedsData.length > 0) {
      carouselSlidesTrack.innerHTML = fedsData.map((fed, idx) => {
        const matchingPhotos = galleryData.filter(item => 
          fed.previewCategories.includes(item.category)
        ).slice(0, 4);

        const photosHtml = matchingPhotos.map(photo => {
          const cleanTitle = sanitizeTitle(photo.title, photo.categoryTitle);
          return `
            <div class="slide-photo-card" data-photo-id="${photo.id}" title="${cleanTitle}">
              <img src="${photo.file}" alt="${cleanTitle}" loading="lazy">
              <div class="slide-photo-caption">
                <span>${cleanTitle}</span>
              </div>
            </div>
          `;
        }).join("");

        const cropsHtml = fed.crops.map(c => `
          <span class="slide-crop-tag">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="${fed.color}" stroke-width="2.8" style="margin-right: 5px; vertical-align: -1px;"><polyline points="20 6 9 17 4 12"></polyline></svg>
            ${c}
          </span>
        `).join("");

        return `
          <article class="carousel-slide ${idx === 0 ? 'active-slide' : ''}" data-index="${idx}" style="--slide-color: ${fed.color}; --slide-pill-bg: ${fed.color}25; --slide-pill-border: ${fed.color}55; --slide-badge-bg: ${fed.color}20; --slide-badge-border: ${fed.color}50;">
            <div class="slide-hero-header">
              <div class="slide-meta-row">
                <span class="slide-muni-pill">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" style="margin-right: 4px; vertical-align: -1px;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  ${fed.municipality}
                </span>
                <span class="slide-index-pill">Federación ${idx + 1} de ${fedsData.length}</span>
              </div>

              <h3 class="slide-title">
                <span class="slide-fed-num-badge" style="color: ${fed.color}; margin-right: 0.6rem; font-weight: 800;">0${idx + 1}.</span>
                ${fed.name}
              </h3>

              <div class="slide-badge">${fed.badge}</div>

              <p class="slide-description">${fed.description}</p>
            </div>

            <div class="slide-crops-section">
              <span class="slide-crops-title">Rubros y Especialización Productiva Estratégica:</span>
              <div class="slide-crops-grid">
                ${cropsHtml}
              </div>
            </div>

            <div class="slide-gallery-section">
              <div class="slide-gallery-header">
                <span class="slide-gallery-title">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 6px; vertical-align: -2px;"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
                  Registro Fotográfico Oficial en Terreno (${matchingPhotos.length} fotos oficiales)
                </span>
                <button type="button" class="btn-fed-open-gallery fed-nav-arrow-btn" data-category="${fed.previewCategories[0]}" title="Ver todas las fotos en la Fotogalería Oficial">
                  Ver fotos de ${fed.previewCategories[0]} en Fotogalería &rarr;
                </button>
              </div>
              <div class="slide-gallery-grid">
                ${photosHtml}
              </div>
            </div>
          </article>
        `;
      }).join("");

      // Eventos en fotos dentro de cada slide
      carouselSlidesTrack.querySelectorAll(".slide-photo-card").forEach(card => {
        card.addEventListener("click", () => {
          const pid = card.getAttribute("data-photo-id");
          openPhotoById(pid);
        });
      });

      carouselSlidesTrack.querySelectorAll(".btn-fed-open-gallery").forEach(btn => {
        btn.addEventListener("click", () => {
          const cat = btn.getAttribute("data-category");
          switchTab("galeria");
          filterGalleryByCategory(cat);
          const galHeader = document.getElementById("panelGaleria");
          if (galHeader) galHeader.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      });
    }

    // Renderizar Carrusel de Títulos en Movimiento Automático (Duplicado x2 para bucle continuo)
    if (fedsTitlesTrack && fedsData.length > 0) {
      const duplicatedFeds = [...fedsData, ...fedsData];
      fedsTitlesTrack.innerHTML = duplicatedFeds.map((fed, totalIdx) => {
        const realIdx = totalIdx % fedsData.length;
        const muniClean = fed.municipality.split("(")[0].trim();
        return `
          <div class="fed-title-card ${realIdx === 0 ? 'active' : ''}" data-index="${realIdx}" style="--card-color: ${fed.color}; --card-glow: ${fed.color}45;" title="Click para ver ficha de ${fed.name}">
            <div class="fed-card-top">
              <span class="fed-card-num">FED 0${realIdx + 1}</span>
              <span class="fed-card-muni">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" style="margin-right: 2px; vertical-align: -1px;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                ${muniClean}
              </span>
            </div>
            <div class="fed-card-name">${fed.name}</div>
            <div class="fed-card-bottom">
              <span class="fed-card-rubro">${fed.badge}</span>
              <span class="fed-card-status-dot"></span>
            </div>
          </div>
        `;
      }).join("");

      fedsTitlesTrack.querySelectorAll(".fed-title-card").forEach(card => {
        card.addEventListener("click", () => {
          const targetIdx = parseInt(card.getAttribute("data-index"), 10);
          goToSlide(targetIdx, true);
        });
      });
    }

    // Renderizar Indicadores Dots
    if (carouselDotsList && fedsData.length > 0) {
      carouselDotsList.innerHTML = fedsData.map((fed, idx) => `
        <button type="button" class="carousel-dot ${idx === 0 ? 'active' : ''}" data-index="${idx}" aria-label="Ir a federación ${idx + 1}" title="${fed.name}"></button>
      `).join("");

      carouselDotsList.querySelectorAll(".carousel-dot").forEach(dot => {
        dot.addEventListener("click", () => {
          const targetIdx = parseInt(dot.getAttribute("data-index"), 10);
          goToSlide(targetIdx, true);
        });
      });
    }

    // Navegar a un Slide Específico
    function goToSlide(index, manualAction = false) {
      if (!carouselSlidesTrack || fedsData.length === 0) return;
      currentSlideIdx = (index + fedsData.length) % fedsData.length;

      // 1. Mover track con transformación suave
      carouselSlidesTrack.style.transform = `translateX(-${currentSlideIdx * 100}%)`;

      // 2. Actualizar clases de slides activos
      carouselSlidesTrack.querySelectorAll(".carousel-slide").forEach((slide, sIdx) => {
        if (sIdx === currentSlideIdx) {
          slide.classList.add("active-slide");
        } else {
          slide.classList.remove("active-slide");
        }
      });

      // 3. Actualizar Tarjetas del Carrusel de Títulos
      if (fedsTitlesTrack) {
        fedsTitlesTrack.querySelectorAll(".fed-title-card").forEach((card) => {
          const cardIdx = parseInt(card.getAttribute("data-index"), 10);
          card.classList.toggle("active", cardIdx === currentSlideIdx);
        });
      }

      // 4. Actualizar Dots de pie
      if (carouselDotsList) {
        carouselDotsList.querySelectorAll(".carousel-dot").forEach((dot, dIdx) => {
          dot.classList.toggle("active", dIdx === currentSlideIdx);
        });
      }

      // 5. Actualizar Badge de Contador
      if (carouselCounterBadge) {
        carouselCounterBadge.textContent = `${currentSlideIdx + 1} / ${fedsData.length}`;
      }

      // 6. Actualizar resplandor perimetral del contenedor según la federación activa
      const activeFed = fedsData[currentSlideIdx];
      if (carouselWrapper && activeFed) {
        carouselWrapper.style.setProperty("--carousel-accent", activeFed.color);
        carouselWrapper.style.setProperty("--carousel-glow", `${activeFed.color}35`);
      }

      // 7. Reiniciar temporizador si fue acción manual
      timerStart = Date.now();
      if (carouselProgressTrack) {
        carouselProgressTrack.style.width = "0%";
      }
    }

    // Motor de Movimiento Continuo (Carrusel en Movimiento Automático)
    function runMotionLoop() {
      if (isAutoPlaying && !isHovered) {
        const elapsed = Date.now() - timerStart;
        const progress = Math.min(100, (elapsed / AUTOPLAY_STEP_MS) * 100);

        if (carouselProgressTrack) {
          carouselProgressTrack.style.width = `${progress}%`;
        }

        if (elapsed >= AUTOPLAY_STEP_MS) {
          goToSlide(currentSlideIdx + 1, false);
        }
      }
      animTimerId = requestAnimationFrame(runMotionLoop);
    }

    // Inicializar loop
    goToSlide(0);
    // Las seis federaciones se eligen manualmente; la vista ya no cambia sola.

    // Controles de Flechas Superiores e Inferiores
    if (fedsTitlesPrevBtn) {
      fedsTitlesPrevBtn.addEventListener("click", () => goToSlide(currentSlideIdx - 1, true));
    }
    if (fedsTitlesNextBtn) {
      fedsTitlesNextBtn.addEventListener("click", () => goToSlide(currentSlideIdx + 1, true));
    }
    if (carouselPrevBtn) {
      carouselPrevBtn.addEventListener("click", () => goToSlide(currentSlideIdx - 1, true));
    }
    if (carouselNextBtn) {
      carouselNextBtn.addEventListener("click", () => goToSlide(currentSlideIdx + 1, true));
    }

    // Control de Pausa / Reanudación
    function updatePlayPauseUI() {
      if (!carouselPlayPauseBtn) return;
      const pauseIcon = carouselPlayPauseBtn.querySelector(".icon-pause");
      const playIcon = carouselPlayPauseBtn.querySelector(".icon-play");

      if (isAutoPlaying) {
        carouselPlayPauseBtn.classList.remove("paused");
        if (fedsTitlesTrack) fedsTitlesTrack.classList.remove("is-paused");
        if (carouselStatusText) carouselStatusText.textContent = "En movimiento (5s)";
        if (pauseIcon) pauseIcon.style.display = "inline-block";
        if (playIcon) playIcon.style.display = "none";
      } else {
        carouselPlayPauseBtn.classList.add("paused");
        if (fedsTitlesTrack) fedsTitlesTrack.classList.add("is-paused");
        if (carouselStatusText) carouselStatusText.textContent = "Pausado";
        if (pauseIcon) pauseIcon.style.display = "none";
        if (playIcon) playIcon.style.display = "inline-block";
      }
      if (typeof applyPageTranslations === 'function') applyPageTranslations(state.lang);
    }

    if (carouselPlayPauseBtn) {
      carouselPlayPauseBtn.addEventListener("click", () => {
        isAutoPlaying = !isAutoPlaying;
        if (isAutoPlaying) {
          timerStart = Date.now();
        }
        updatePlayPauseUI();
      });
    }

    // Pausa inteligente al interactuar (Mouse Hover)
    if (carouselWrapper) {
      carouselWrapper.addEventListener("mouseenter", () => {
        isHovered = true;
      });
      carouselWrapper.addEventListener("mouseleave", () => {
        isHovered = false;
        timerStart = Date.now();
      });
    }

    // Soporte Táctil (Swipe Gestures)
    let touchStartX = 0;
    let touchEndX = 0;
    if (carouselWrapper) {
      carouselWrapper.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      carouselWrapper.addEventListener("touchend", (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      }, { passive: true });
    }

    function handleSwipe() {
      const diff = touchEndX - touchStartX;
      if (Math.abs(diff) > 45) {
        if (diff < 0) {
          goToSlide(currentSlideIdx + 1, true); // Swipe izquierda -> siguiente
        } else {
          goToSlide(currentSlideIdx - 1, true); // Swipe derecha -> anterior
        }
      }
    }

    // Vincular clics desde el Strip de Federaciones del Hero
    document.querySelectorAll(".hero-fed-pill").forEach(pill => {
      pill.addEventListener("click", () => {
        const fedId = pill.getAttribute("data-fed");
        if (fedId) {
          const targetIdx = fedsData.findIndex(f => f.id === fedId);
          if (targetIdx !== -1) {
            goToSlide(targetIdx, true);
          }
        }
      });
    });

    // 2. Renderizar Fotogalería Oficial
    function renderGallery(items) {
      if (!galleryGrid) return;
      activeFilteredGallery = items;

      if (items.length === 0) {
        galleryGrid.innerHTML = `
          <div class="gallery-empty-state">
            <p>No se encontraron fotografías para la categoría seleccionada.</p>
          </div>
        `;
        if (typeof applyPageTranslations === 'function') applyPageTranslations(state.lang);
        return;
      }

      galleryGrid.innerHTML = items.map((item, idx) => {
        const cleanTitle = sanitizeTitle(item.title, item.categoryTitle);
        return `
        <figure class="gallery-card" data-idx="${idx}" data-category="${item.category}">
          <div class="gallery-img-container">
            <img src="${item.file}" alt="${cleanTitle}" loading="lazy" class="gallery-img">
            <div class="gallery-card-overlay">
              <span class="gallery-category-pill">${item.categoryTitle}</span>
              <h4 class="gallery-card-title">${cleanTitle}</h4>
              <button type="button" class="gallery-zoom-btn" aria-label="Ampliar fotografía">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
              </button>
            </div>
          </div>
          <figcaption class="gallery-card-caption">
            <span class="caption-cat">${item.categoryTitle}</span>
            <span class="caption-title">${cleanTitle}</span>
          </figcaption>
        </figure>
      `;
      }).join("");

      // Attach click listeners to cards
      galleryGrid.querySelectorAll(".gallery-card").forEach(card => {
        card.addEventListener("click", () => {
          const idx = parseInt(card.getAttribute("data-idx"), 10);
          openPhotoByIndex(idx);
        });
      });
      if (typeof applyPageTranslations === 'function') applyPageTranslations(state.lang);
    }

    // Initial gallery render
    renderGallery(galleryData);

    // 3. Filtros de Categorías en la Galería
    function filterGalleryByCategory(category) {
      currentActiveCategory = category;
      if (galleryFiltersBar) {
        galleryFiltersBar.querySelectorAll(".g-filter-btn").forEach(btn => {
          if (btn.getAttribute("data-category") === category) {
            btn.classList.add("active");
          } else {
            btn.classList.remove("active");
          }
        });
      }

      if (category === "all") {
        renderGallery(galleryData);
        if (focus) focus.hidden = true;
        productionSection?.classList.remove("is-product-story");
        const tabText = tabGaleriaBtn?.querySelector("span");
        if (tabText) tabText.textContent = `Fotogalería de la producción (${galleryData.length} fotos)`;
      } else {
        const filtered = galleryData.filter(item => item.category === category);
        const story = productStories[category];
        if (story) filtered.sort((a, b) => Number(b.file === story.image) - Number(a.file === story.image));
        renderGallery(filtered);
        const categoryLabel = galleryFiltersBar?.querySelector(`[data-category="${category}"] span`)?.textContent || category;
        const tabText = tabGaleriaBtn?.querySelector("span");
        if (tabText) tabText.textContent = `Fotos de ${categoryLabel} (${filtered.length})`;
        if (focus && story) {
          document.getElementById("productFocusImage").src = story.image;
          document.getElementById("productFocusImage").alt = story.alt;
          document.getElementById("productFocusTitle").textContent = story.title;
          document.getElementById("productFocusDescription").textContent = story.description;
          document.getElementById("productFocusCount").textContent = `${filtered.length} fotografías de ${filtered[0]?.categoryTitle || "este rubro"}`;
          focus.hidden = false;
          productionSection?.classList.add("is-product-story");
        }
      }
    }

    if (galleryFiltersBar) {
      galleryFiltersBar.querySelectorAll(".g-filter-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const cat = btn.getAttribute("data-category");
          filterGalleryByCategory(cat);
        });
      });
    }

    // 4. Conmutación de Pestañas (Federaciones vs Galería)
    function switchTab(tab) {
      if (tab === "federaciones") {
        if (focus) focus.hidden = true;
        productionSection?.classList.remove("is-product-story");
        if (tabFedsBtn) tabFedsBtn.classList.add("active");
        if (tabGaleriaBtn) tabGaleriaBtn.classList.remove("active");
        if (panelFeds) panelFeds.style.display = "block";
        if (panelGaleria) panelGaleria.style.display = "none";
      } else {
        if (focus && currentActiveCategory !== "all") focus.hidden = false;
        productionSection?.classList.toggle("is-product-story", currentActiveCategory !== "all");
        if (tabGaleriaBtn) tabGaleriaBtn.classList.add("active");
        if (tabFedsBtn) tabFedsBtn.classList.remove("active");
        if (panelGaleria) panelGaleria.style.display = "block";
        if (panelFeds) panelFeds.style.display = "none";
      }
    }

    if (tabFedsBtn) {
      tabFedsBtn.addEventListener("click", () => switchTab("federaciones"));
    }
    if (tabGaleriaBtn) {
      tabGaleriaBtn.addEventListener("click", () => switchTab("galeria"));
    }

    const requestedProduct = new URLSearchParams(window.location.search).get("producto");
    if (requestedProduct && galleryData.some(item => item.category === requestedProduct)) {
      filterGalleryByCategory(requestedProduct);
      switchTab("galeria");
    }

    // 5. Visor Modal / Lightbox Fotográfico
    function openPhotoByIndex(index) {
      if (!activeFilteredGallery || index < 0 || index >= activeFilteredGallery.length) return;
      currentModalIndex = index;
      const photo = activeFilteredGallery[index];
      const cleanTitle = sanitizeTitle(photo.title, photo.categoryTitle);

      if (prodModalImg) prodModalImg.src = photo.file;
      if (prodModalTitle) prodModalTitle.textContent = cleanTitle;
      if (prodModalCategory) prodModalCategory.textContent = photo.categoryTitle;
      if (prodModalCounter) prodModalCounter.textContent = `${index + 1} de ${activeFilteredGallery.length}`;

      if (prodModal) {
        prodModal.classList.add("active");
        prodModal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
      }
    }

    function openPhotoById(photoId) {
      const idx = galleryData.findIndex(item => item.id === photoId);
      if (idx !== -1) {
        activeFilteredGallery = galleryData;
        openPhotoByIndex(idx);
      }
    }

    function closeLightbox() {
      if (prodModal) {
        prodModal.classList.remove("active");
        prodModal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
      }
    }

    function nextPhoto() {
      if (!activeFilteredGallery || activeFilteredGallery.length === 0) return;
      const nextIdx = (currentModalIndex + 1) % activeFilteredGallery.length;
      openPhotoByIndex(nextIdx);
    }

    function prevPhoto() {
      if (!activeFilteredGallery || activeFilteredGallery.length === 0) return;
      const prevIdx = (currentModalIndex - 1 + activeFilteredGallery.length) % activeFilteredGallery.length;
      openPhotoByIndex(prevIdx);
    }

    if (prodModalClose) prodModalClose.addEventListener("click", closeLightbox);
    if (prodModalNext) prodModalNext.addEventListener("click", nextPhoto);
    if (prodModalPrev) prodModalPrev.addEventListener("click", prevPhoto);

    // Cerrar al hacer clic en el fondo oscuro
    if (prodModal) {
      prodModal.addEventListener("click", (e) => {
        if (e.target === prodModal) closeLightbox();
      });
    }

    // Controles por teclado
    window.addEventListener("keydown", (e) => {
      if (!prodModal || !prodModal.classList.contains("active")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextPhoto();
      if (e.key === "ArrowLeft") prevPhoto();
    });
  }

  // ==========================================================================
  // MAPA VECTORIAL OFICIAL DE LAS 16 PROVINCIAS DE COCHABAMBA (FITROP 2026)
  // Integracion directa del mapa interactivo oficial con datos locales y sidebar
  // ==========================================================================
  function initCochabambaMap() {
    const mapStage = document.getElementById("mapStage");
    const svgElement = document.getElementById("svgCochabamba");
    if (!mapStage || !svgElement) return;

    // 1. BASE DE DATOS LOCAL QUE SIMULA LA RESPUESTA DE UNA API REST
    const provinciasAPI = {
      "cercado": {
        nombre: "Cercado",
        capital: "Cochabamba",
        poblacion: "631,841 hab.",
        region: "Región Metropolitana",
        descripcion: "Corazón del departamento y capital gastronómica de Bolivia. Famosa por el Cristo de la Concordia, la Coronilla y su agradable clima primaveral perenne.",
        platos: ["Silpancho", "Pique Macho", "Chicharrón de Cerdo", "Lapping"],
        atractivos: [
          "Monumento al Cristo de la Concordia (Cerro San Pedro)",
          "Colina histórica de San Sebastián (La Coronilla)",
          "Palacio Portales (Fundación Simón I. Patiño)",
          "La Cancha (el mercado a cielo abierto más grande de Sudamérica)"
        ],
        economia: ["Comercio", "Servicios Financieros", "Gastronomía", "Industria Manufacturera"]
      },
      "chapare": {
        nombre: "Chapare",
        capital: "Sacaba (Cabecera) / Villa Tunari (Trópico)",
        poblacion: "263,000 hab.",
        region: "Trópico y Valle Central",
        descripcion: "La provincia Chapare reúne paisajes de valle y trópico, con municipios como Villa Tunari y espacios naturales como el Parque Nacional Carrasco.",
        federaciones: [
          {
            nombre: "Fed. Especial de Trabajadores Campesinos del Trópico (Villa Tunari)",
            color: "#059669",
            desc: "Es un núcleo clave en la producción de coca y el secado de la hoja. Al mismo tiempo, lidera la producción de frutas tropicales (como cítricos y papaya) y ha desarrollado con fuerza el sector de la piscicultura (crianza de tambaquí y pacú) y el turismo comunitario."
          },
          {
            nombre: "Fed. Especial de Yungas de Chapare",
            color: "#047857",
            desc: "Debido a su geografía de transición montañosa, se especializa en el cultivo tradicional de la hoja de coca, producción de miel y cítricos en zonas de ladera."
          }
        ],
        platos: ["Pescado a la Parrilla (Pacú y Tambaquí)", "Ceviche de Palmito", "Surubí al Horno"],
        atractivos: [
          "Parque Nacional Carrasco y paisajes del Trópico",
          "Parque Nacional Machía y Refugio de Fauna Silvestre",
          "Parque Nacional Carrasco y Cavernas del Repechón",
          "Rápidos y Rafting en los ríos Espíritu Santo y San Mateo",
          "Laguna de San Isidro en Sacaba"
        ],
        economia: ["Producción de Hoja de Coca", "Piscicultura (Tambaquí y Pacú)", "Frutas Tropicales", "Ecoturismo Comunitario", "Miel de Ladera"]
      },
      "quillacollo": {
        nombre: "Quillacollo",
        capital: "Quillacollo",
        poblacion: "335,000 hab.",
        region: "Valle Bajo",
        descripcion: "Epicentro de la devoción mariana de Bolivia con la Festividad de la Virgen de Urkupiña. Posee valles fértiles, balnearios termales e historia precolombina.",
        platos: ["Lechón al Horno", "Puchero de Carnaval", "Chicha Tradicional"],
        atractivos: [
          "Santuario de la Virgen de Urkupiña y Calvario de Cota",
          "Aguas Termales de Liriuni",
          "Sitio Arqueológico de las Qollqas de Cotapachi (Incaico)",
          "Parque Nacional Tunari (Sector Cordillera)"
        ],
        economia: ["Comercio Religioso", "Agricultura Valluna", "Lácteos", "Agroindustria"]
      },
      "punata": {
        nombre: "Punata",
        capital: "Punata",
        poblacion: "54,000 hab.",
        region: "Valle Alto",
        descripcion: "Conocida con honor como 'La Perla del Valle'. Célebre por sus panes gigantes de Toco, sus chicherías tradicionales y sus ferias ganaderas de renombre nacional.",
        platos: ["K'awi al Horno", "Rosquete Punateño", "Pan de Toco", "Chicha Valluna Kulli"],
        atractivos: [
          "Templo San Juan Bautista (Monumento Nacional)",
          "Feria de Ganado Tradicional de los martes",
          "Ruta de las haciendas coloniales de Camacho",
          "Molinos de Harina Artesanales"
        ],
        economia: ["Producción de Maíz", "Ganadería Bovina", "Panadería Artesanal", "Chicha"]
      },
      "carrasco": {
        nombre: "Carrasco",
        capital: "Totora",
        poblacion: "135,000 hab.",
        region: "Cono Sur y Trópico Oriental",
        descripcion: "Provincia de contrastes que une la arquitectura colonial empedrada de Totora con la riqueza tropical de Chimoré, Puerto Villarroel y Entre Ríos.",
        federaciones: [
          {
            nombre: "Fed. Especial de Colonizadores de Chimoré (Chimoré)",
            sub: "Sede de la oficina principal",
            color: "#ca8a04",
            desc: "Destaca por la producción masiva de piña de exportación y banano. Alberga importantes plantas procesadoras de lácteos y centros de acopio piscícolas que dan soporte técnico a sus afiliados."
          },
          {
            nombre: "Fed. Especial de Colonizadores de Carrasco Tropical (Puerto Villarroel)",
            color: "#ea580c",
            desc: "Es una potencia en la producción de banano de exportación (enviado principalmente a mercados como Argentina y Chile) y cultivos alternativos como el cacao y el café robusta."
          },
          {
            nombre: "Fed. Agraria Mamoré Bulo Bulo (Entre Ríos)",
            color: "#dc2626",
            desc: "Ubicada en una llanura muy fértil, lidera la producción ganadera (bovina) de la región, además de grandes extensiones de cultivos de arroz, maíz y yuca."
          }
        ],
        platos: ["Uchuku Valluno", "Pescado Frito Amazónico", "Cítricos Frescos"],
        atractivos: [
          "Aeropuerto Internacional Soberanía en Chimoré",
          "Pueblo Colonial de Totora (Ciudad de los Pianos)",
          "Rutas Fluviales en Puerto Villarroel (Río Ichilo)",
          "Ruinas Incas de Incallajta en Pocona",
          "Complejo Petroquímico en Bulo Bulo (Entre Ríos)"
        ],
        economia: ["Piña y Banano de Exportación", "Plantas de Lácteos y Acopio Piscícola", "Ganadería Bovina", "Arroz, Maíz y Yuca", "Cacao y Café Robusta"]
      },
      "tiraque": {
        nombre: "Tiraque",
        capital: "Tiraque",
        poblacion: "42,000 hab.",
        region: "Valles Altos y Trópico Central (Shinahota)",
        descripcion: "Puente natural entre las alturas vallunas y el Trópico central en Shinahota. Gran polo de diversificación agrícola.",
        federaciones: [
          {
            nombre: "Fed. Única de Centrales Unidas (Shinahota)",
            color: "#2563eb",
            desc: "Concentra gran parte de la producción hortícola y frutícola de la zona central, además de la siembra regulada de coca. Ha incursionado fuertemente en proyectos ganaderos y de apoyo a pequeños productores agrícolas."
          }
        ],
        platos: ["Phiri de Trigo", "Habas Pejtu", "Trucha Fresca de Laguna"],
        atractivos: [
          "Santuario de Vida Silvestre en Shinahota",
          "Circuito Ecoturístico de las Tres Lagunas",
          "Caídas de agua de la Yunga de Tiraque",
          "Represa de Totora Khocha",
          "Feria Tradicional de la Papa Nativa"
        ],
        economia: ["Producción Hortícola y Frutícola", "Siembra Regulada de Coca", "Proyectos Ganaderos", "Papas Nativas"]
      },
      "ayopaya": {
        nombre: "Ayopaya",
        capital: "Independencia",
        poblacion: "60,000 hab.",
        region: "Región Andina",
        descripcion: "Zona andina majestuosa y cuna de las republiquetas patriotas. Es el territorio más extenso de las alturas cochabambinas, con valles profundos y nevados.",
        platos: ["Lagwa de Choclo", "Queso Criollo Andino", "Caldo de Gallina Criolla"],
        atractivos: [
          "Pueblo Histórico de Independencia",
          "Bosque de Queñuas milenarias de Cocapata",
          "Río Morochata y aguas termales vírgenes",
          "Rutas de senderismo en la Cordillera del Tunari"
        ],
        economia: ["Papa Holandesa", "Camélidos (Llama y Alpaca)", "Minería de Yeso y Cal"]
      },
      "tapacari": {
        nombre: "Tapacarí",
        capital: "Tapacarí",
        poblacion: "24,000 hab.",
        region: "Región Andina",
        descripcion: "Población histórica por donde transitaban los arrieros hacia Oruro y el mar. Famosa por sus tejidos originarios de telar y sus imponentes cañones rocosos.",
        platos: ["Chairo Cochabambino", "K'jaras al Carbón", "Chuño Phuti"],
        atractivos: [
          "Cañón y Valle del Río Tapacarí",
          "Templo Colonial San Agustín",
          "Talleres de tejido autóctono en comunidades originarias",
          "Paredones geológicos para escalada"
        ],
        economia: ["Trigo", "Cebada", "Crianza de Ovinos", "Artesanía Textil"]
      },
      "bolivar": {
        nombre: "Bolívar",
        capital: "Bolívar",
        poblacion: "7,500 hab.",
        region: "Región Andina Suroeste",
        descripcion: "Municipio de mayor altitud de Cochabamba, situado en la puna brava andina. Baluarte de la resiliencia ancestral, producción de chuño y crianza de camélidos.",
        platos: ["P'esque de Quinua", "Calapurca Andina", "Charque de Llama"],
        atractivos: [
          "Miradores de alta montaña a más de 4,000 msnm",
          "Aguas termales curativas de Chaqui Khocha",
          "Festividad patronal de San Bartolomé",
          "Valles de thola y pastoreo andino"
        ],
        economia: ["Quinua Real", "Papa Amarga para Chuño", "Lana y Fibra de Camélido"]
      },
      "arque": {
        nombre: "Arque",
        capital: "Arque",
        poblacion: "20,000 hab.",
        region: "Región Andina",
        descripcion: "Emplazada en la histórica garganta del Ferrocarril Cochabamba - Oruro. Zona de aguas termales sulfurosas, cañones espectaculares y yacimientos mineros.",
        platos: ["Jatun Lagwa", "Mut'i con Quesillo", "Conejo Lambreado"],
        atractivos: [
          "Puentes y túneles del ferrocarril histórico",
          "Balnearios de Aguas Termales de Arque",
          "Templo Colonial de Tacopaya",
          "Cañones fluviales de gran valor geológico"
        ],
        economia: ["Minería Polimetálica", "Yeso Natural", "Trigo", "Hortalizas de Cañón"]
      },
      "capinota": {
        nombre: "Capinota",
        capital: "Capinota",
        poblacion: "29,000 hab.",
        region: "Valles del Sur",
        descripcion: "Tierra de los vinos y singanis artesanales vallunos, fértil huerta de hortalizas y sede de la gran planta cementera industrial de Coboce en Irpa Irpa.",
        platos: ["Guandul con Papas", "Pichón de Capinota", "Vino Dulce Valluno"],
        atractivos: [
          "Viñedos y bodegas tradicionales familiares",
          "Parroquia San Pablo de Capinota",
          "Complejo Industrial y Ecoturístico de Irpa Irpa",
          "Confluencia de los ríos Arque y Rocha"
        ],
        economia: ["Industria del Cemento (COBOCE)", "Vitivinicultura", "Papa y Zanahoria"]
      },
      "german-jordan": {
        nombre: "Germán Jordán",
        capital: "Cliza",
        poblacion: "34,000 hab.",
        region: "Valle Alto",
        descripcion: "Corazón festivo del Valle Alto. Célebre por el Pichón de Cliza, sus ferias gastronómicas de la Picana y sus ricas tradiciones de la fiesta del Carmen.",
        platos: ["Pichón a la Brasa", "Picana Navideña", "Chicha Cliceña"],
        atractivos: [
          "Mercado de Abasto y Feria del Pichón de Cliza",
          "Templo de Nuestra Señora del Carmen",
          "Ruta campestre de Tolata y Toco",
          "Monumento a los Héroes del Chaco"
        ],
        economia: ["Avicultura y Granja de Pichones", "Maíz Blanco", "Comercio Gastronómico"]
      },
      "esteban-arce": {
        nombre: "Esteban Arce",
        capital: "Tarata",
        poblacion: "37,000 hab.",
        region: "Valle Alto",
        descripcion: "Cuna de próceres y presidentes de Bolivia como Mariano Melgarejo y René Barrientos. Ciudad colonial que preserva conventos históricos y alfarería tradicional.",
        platos: ["Chorizo Tarateño", "Puchero Valluno", "Humintas a la Leña"],
        atractivos: [
          "Convento Franciscano de San José (donde descansa San Severino)",
          "Palacio y Casa del Presidente Melgarejo",
          "Pueblo Alfarero de Huayculi (cerámica artesanal)",
          "Represa de la Angostura en Arbieto"
        ],
        economia: ["Alfarería Tradicional", "Turismo Histórico", "Cereales", "Quesillos"]
      },
      "arani": {
        nombre: "Arani",
        capital: "Arani",
        poblacion: "18,000 hab.",
        region: "Valle Alto",
        descripcion: "La capital del auténtico Pan de Arani y Mama Bella. Se distingue por sus hornos centenarios de barro que producen las célebres chambergas y empanadas.",
        platos: ["Pan de Arani (Mama Qonqachi)", "Chambergas", "Empanadas de Tocuyo"],
        atractivos: [
          "Santuario de la Virgen la Bella (Monumento Nacional)",
          "Hornos Coloniales de pan tradicional",
          "Laguna de Vacas y paisajes lacustres",
          "Templo de San Bartolomé"
        ],
        economia: ["Panadería de Fama Nacional", "Trigo de Altura", "Papa y Haba de Vacas"]
      },
      "mizque": {
        nombre: "Mizque",
        capital: "Mizque",
        poblacion: "26,000 hab.",
        region: "Cono Sur",
        descripcion: "Antigua sede obispal colonial y valle templado bendecido por el Río Mizque. Reconocido por sus cebollas de gran tamaño, su miel y sus cacahuates criollos.",
        platos: ["Uchuku Mizqueño", "Empanadas de Quesillo Dulce", "Sopa de Maní"],
        atractivos: [
          "Catedral Colonial de Mizque y Museo Arqueológico",
          "Cañón del Pucara y avistamiento de la Paraba Frente Roja",
          "Río Mizque y huertas tradicionales",
          "Festival y Fiesta del Señor de Burgos"
        ],
        economia: ["Cebolla de Bulbo", "Maní", "Apicultura (Miel Silvestre)", "Frutas de Valle"]
      },
      "campero": {
        nombre: "Campero",
        capital: "Aiquile",
        poblacion: "35,000 hab.",
        region: "Cono Sur",
        descripcion: "Capital Mundial del Charango y custodia de la música folklórica boliviana. Conectora hacia Sucre y Santa Cruz, rica en paleontología y valles secos.",
        platos: ["Uchuku de Aiquile", "Picante de Pollo Criollo", "Tortillas de Choclo"],
        atractivos: [
          "Feria y Festival Internacional del Charango en Aiquile",
          "Museo del Charango (instrumentos maestros tallados)",
          "Sitios Arqueológicos y huellas paleontológicas",
          "Río Grande y bosques secos interandinos"
        ],
        economia: ["Lutería de Charangos", "Agricultura de Secano", "Trigo", "Pasto Forrajero"]
      },
      "villa-tunari": {
        nombre: "Villa Tunari",
        capital: "Villa Tunari (Chapare)",
        poblacion: "Dato por verificar",
        region: "Trópico de Cochabamba • Letra R",
        color: "#84cc16",
        descripcion: "Municipio del Trópico de Cochabamba conocido por sus paisajes naturales, actividades turísticas y producción regional. Forma parte de la Mancomunidad organizadora de FITROP 2026.",
        platos: ["Surubí a la Brasa", "Pacú al Horno", "Chicharrón de Pescado", "Majadito de Charque", "Jugo de Maracuyá y Açaí"],
        atractivos: [
          "Parque Nacional Carrasco",
          "Parque Nacional Carrasco y Cavernas del Repechón",
          "Parque Machía y Centro de Custodia de Fauna",
          "Ríos San Mateo, Espíritu Santo y Pozas Naturales",
          "Complejos Hoteleros y Balnearios Ecológicos"
        ],
        economia: ["Ecoturismo Internacional", "Piscicultura Tecnificada", "Hotelería y Eventos", "Fruticultura Tropical (Plátano y Cítricos)"],
        federaciones: [
          {
            nombre: "Federación Especial de Trabajadores Campesinos del Trópico de Cochabamba (FETCTC)",
            sub: "Sede Villa Tunari",
            desc: "Co-organizadora de FITROP 2026, impulsora del desarrollo ecoturístico, piscícola e industrial sustentable.",
            color: "#84cc16"
          },
          {
            nombre: "Federación Yungas Chapare",
            sub: "Sede Villa Tunari",
            desc: "Núcleo de productores agroecológicos, cítricos y fruticultura de exportación.",
            color: "#65a30d"
          }
        ]
      },
      "shinahota": {
        nombre: "Shinahota (Capital de la Fruticultura)",
        capital: "Shinahota (Tiraque / Trópico)",
        poblacion: "32,000 hab.",
        region: "Trópico de Cochabamba • Letra T",
        color: "#fbbf24",
        descripcion: "Municipio estratégico del corazón del trópico, destacado por su alta productividad agroindustrial, procesamiento de cítricos, piña, palmito y producción apícola de excelencia.",
        platos: ["Sopa de Bagre", "Pacú a la Parrilla", "Pastel de Palmito", "Dulces Artesanales de Cítricos"],
        atractivos: [
          "Santuario de Vida Silvestre Pozo San Rafael",
          "Complejo Ecoturístico Vinchuta",
          "Río Coni y Playas Naturales",
          "Plantaciones Frutícolas Modelo"
        ],
        economia: ["Cítricos (Naranja, Mandarina)", "Producción y Envasado de Palmito", "Piscicultura Comercial", "Agroindustria Alimentaria"],
        federaciones: [
          {
            nombre: "Federación Centrales Unidas (FCU)",
            sub: "Sede Shinahota",
            desc: "Organización matriz impulsora del polo agroindustrial y de diversificación productiva del trópico.",
            color: "#fbbf24"
          }
        ]
      },
      "chimore": {
        nombre: "Chimoré",
        capital: "Chimoré (Carrasco / Trópico)",
        poblacion: "36,000 hab.",
        region: "Trópico de Cochabamba • Letra I",
        color: "#f97316",
        descripcion: "Sede institucional de la Oficina Principal de la Mancomunidad de Municipios del Trópico de Cochabamba. Centro logístico del oriente cochabambino con el Aeropuerto Internacional Soberanía y moderna planta procesadora de derivados lácteos y frutas.",
        platos: ["Tambaquí Asado", "Chicharrón de Sábalo", "Masaco de Plátano con Queso", "Refrescos de Camu Camu"],
        atractivos: [
          "Oficina Central de la Mancomunidad de Municipios del Trópico",
          "Aeropuerto Internacional de Chimoré 'Soberanía'",
          "Río Chimoré y Puerto Turístico",
          "Centro Tecnológico de Piscicultura"
        ],
        economia: ["Logística y Transporte Aéreo/Terrestre", "Industria Láctea y Derivados", "Procesamiento de Frutas y Palmito", "Comercio Mayorista Regional"],
        federaciones: [
          {
            nombre: "Federación de Comunidades Interculturales de Chimoré",
            sub: "Sede Central Chimoré",
            desc: "Pilar de la Mancomunidad, promotora de la industrialización soberana y la soberanía alimentaria.",
            color: "#f97316"
          }
        ]
      },
      "puerto-villarroel": {
        nombre: "Puerto Villarroel (Polo Fluvial e Ichilo)",
        capital: "Puerto Villarroel (Carrasco)",
        poblacion: "55,000 hab.",
        region: "Trópico de Cochabamba • Letra O",
        color: "#10b981",
        descripcion: "Histórico puerto fluvial sobre el río Ichilo que conecta Cochabamba con Beni, Pando y la cuenca amazónica. Mayor centro piscícola del departamento con granjas de paiche, tambaquí y surubí de alta densidad.",
        platos: ["Paiche a la Criolla", "Paila Marina Tropical", "Sudao de Surubí", "Empanadas de Yuca"],
        atractivos: [
          "Puerto Fluvial sobre el Río Ichilo",
          "Ruta de Navegación Amazónica Ichilo-Mamoré",
          "Mega Piscigranjas de Paiche",
          "Reserva Indígena Yuqui"
        ],
        economia: ["Navegación Fluvial Comercial", "Acuicultura de Alta Escala (Paiche y Tambaquí)", "Producción Bananera de Exportación", "Comercio Fluvial Interdepartamental"],
        federaciones: [
          {
            nombre: "Federación Carrasco Tropical",
            sub: "Sede Puerto Villarroel e Ivirgarzama",
            desc: "Organización territorial clave del eje fluvial y comercial con gran peso agroproductivo y pesquero.",
            color: "#10b981"
          }
        ]
      },
      "entre-rios": {
        nombre: "Entre Ríos (Sede FITROP 2026)",
        capital: "Entre Ríos (Carrasco)",
        poblacion: "42,000 hab.",
        region: "Trópico de Cochabamba • Letra F",
        color: "#ef4444",
        descripcion: "Municipio del Trópico de Cochabamba y sede de FITROP 2026. La feria se realiza en la Plaza 25 de Septiembre del 2 al 4 de octubre.",
        platos: ["Sábalo a la Mordaza", "Parrillada Amazónica", "Sopa de Pescado con Yuca", "Chicha de Maíz Tropical"],
        atractivos: [
          "Complejo Petroquímico de Amoniaco y Urea (Bulo Bulo)",
          "Río Bulo Bulo y Balnearios Naturales",
          "Corredor Bioceánico Comercial",
          "Plaza 25 de Septiembre, sede de FITROP 2026"
        ],
        economia: ["Petroquímica e Hidrocarburos (Urea/Amoniaco)", "Generación Termoeléctrica Nacional", "Silvicultura y Maderas Tropicales", "Agricultura Extensiva y Ganadería"],
        federaciones: [
          {
            nombre: "Federación Sindical de Trabajadores Campesinos de Entre Ríos",
            sub: "Sede Entre Ríos / Bulo Bulo",
            desc: "Fuerza social y productiva guardiana del complejo petroquímico e integradora del corredor bioceánico.",
            color: "#ef4444"
          }
        ]
      }
    };

    // --------------------------------------------------------------------------
    // 2. CONTROLADORES DE ZOOM Y PANEO (ARRASTRE INTERACTIVO MULTI-DISPOSITIVO)
    // --------------------------------------------------------------------------
    const mapLayer = document.getElementById("mapLayer");
    const btnZoomIn = document.getElementById("btnZoomIn");
    const btnZoomOut = document.getElementById("btnZoomOut");
    const btnResetZoom = document.getElementById("btnResetZoom");

    let currentScale = 1.35;
    const minScale = 0.65;
    const maxScale = 4.5;
    const stepScale = 0.3;

    let translateX = 0;
    let translateY = 0;
    let isDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let totalDragDistance = 0;

    function applyTransform(animate = false) {
      if (!mapLayer) return;
      if (animate) {
        mapLayer.style.transition = "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)";
      } else {
        mapLayer.style.transition = "none";
      }
      mapLayer.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentScale})`;
    }

    applyTransform();

    // Zoom In
    if (btnZoomIn) {
      btnZoomIn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (currentScale < maxScale) {
          currentScale = Math.min(maxScale, +(currentScale + stepScale).toFixed(2));
          applyTransform(true);
        }
      });
    }

    // Zoom Out
    if (btnZoomOut) {
      btnZoomOut.addEventListener("click", (e) => {
        e.stopPropagation();
        if (currentScale > minScale) {
          currentScale = Math.max(minScale, +(currentScale - stepScale).toFixed(2));
          if (currentScale <= 1.0) {
            translateX = 0;
            translateY = 0;
          }
          applyTransform(true);
        }
      });
    }

    // Reset Zoom y Centrado
    if (btnResetZoom) {
      btnResetZoom.addEventListener("click", (e) => {
        e.stopPropagation();
        currentScale = 1.0;
        translateX = 0;
        translateY = 0;
        applyTransform(true);
      });
    }

    // ARRASTRE CON RATÓN (DESKTOP DRAGGING)
    if (mapStage) {
      mapStage.addEventListener("mousedown", (e) => {
        // Evitar arrastrar si se pulsa en controles de zoom flotantes
        if (e.target.closest(".map-controls") || e.target.closest(".ctrl-btn")) return;
        e.preventDefault();

        isDragging = true;
        totalDragDistance = 0;
        dragStartX = e.clientX - translateX;
        dragStartY = e.clientY - translateY;
        mapStage.classList.add("is-dragging");
        mapLayer.style.transition = "none";
      });

      window.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        const newX = e.clientX - dragStartX;
        const newY = e.clientY - dragStartY;
        totalDragDistance += Math.abs(newX - translateX) + Math.abs(newY - translateY);
        translateX = newX;
        translateY = newY;
        applyTransform(false);
      });

      window.addEventListener("mouseup", () => {
        if (isDragging) {
          isDragging = false;
          if (mapStage) mapStage.classList.remove("is-dragging");
          if (mapLayer) mapLayer.style.transition = "transform 0.2s ease-out";
        }
      });

      // ZOOM CON RUEDA DEL RATÓN (WHEEL ZOOM HACIA EL CURSOR)
      mapStage.addEventListener("wheel", (e) => {
        e.preventDefault();
        const delta = e.deltaY < 0 ? 1.15 : 0.87;
        const newScale = Math.min(maxScale, Math.max(minScale, +(currentScale * delta).toFixed(3)));
        if (newScale === currentScale) return;

        const rect = mapStage.getBoundingClientRect();
        const cursorRelX = e.clientX - rect.left - rect.width / 2;
        const cursorRelY = e.clientY - rect.top - rect.height / 2;

        const scaleRatio = newScale / currentScale;
        translateX = cursorRelX - (cursorRelX - translateX) * scaleRatio;
        translateY = cursorRelY - (cursorRelY - translateY) * scaleRatio;
        currentScale = newScale;

        applyTransform(false);
      }, { passive: false });

      // ARRASTRE Y PINCH-ZOOM TÁCTIL (MOBILE & TABLET)
      let initialTouchDistance = 0;
      let initialTouchScale = 1.0;

      mapStage.addEventListener("touchstart", (e) => {
        if (e.target.closest(".map-controls") || e.target.closest(".ctrl-btn")) return;
        if (e.touches.length === 1) {
          isDragging = true;
          totalDragDistance = 0;
          dragStartX = e.touches[0].clientX - translateX;
          dragStartY = e.touches[0].clientY - translateY;
          mapLayer.style.transition = "none";
        } else if (e.touches.length === 2) {
          isDragging = false;
          initialTouchDistance = Math.hypot(
            e.touches[0].clientX - e.touches[1].clientX,
            e.touches[0].clientY - e.touches[1].clientY
          );
          initialTouchScale = currentScale;
        }
      }, { passive: true });

      mapStage.addEventListener("touchmove", (e) => {
        if (e.touches.length === 1 && isDragging) {
          const newX = e.touches[0].clientX - dragStartX;
          const newY = e.touches[0].clientY - dragStartY;
          totalDragDistance += Math.abs(newX - translateX) + Math.abs(newY - translateY);
          translateX = newX;
          translateY = newY;
          applyTransform(false);
        } else if (e.touches.length === 2 && initialTouchDistance > 0) {
          const dist = Math.hypot(
            e.touches[0].clientX - e.touches[1].clientX,
            e.touches[0].clientY - e.touches[1].clientY
          );
          const ratio = dist / initialTouchDistance;
          currentScale = Math.min(maxScale, Math.max(minScale, +(initialTouchScale * ratio).toFixed(2)));
          applyTransform(false);
        }
      }, { passive: true });

      mapStage.addEventListener("touchend", () => {
        isDragging = false;
        initialTouchDistance = 0;
        if (mapLayer) mapLayer.style.transition = "transform 0.2s ease-out";
      });
    }

    // 3. TOOLTIP FLOTANTE
    const tooltip = document.getElementById("mapTooltip");

    function showTooltip(e, name, capital) {
      if (!tooltip) return;
      tooltip.innerHTML = `<strong>${name}</strong><br><small style="color: #94a3b8;">Cap: ${capital}</small>`;
      tooltip.classList.add("visible");
      moveTooltip(e);
    }

    function moveTooltip(e) {
      if (!tooltip || !mapStage) return;
      const rect = mapStage.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      tooltip.style.left = `${x}px`;
      tooltip.style.top = `${y}px`;
    }

    function hideTooltip() {
      if (tooltip) tooltip.classList.remove("visible");
    }

    // 4. CONTROL DEL SIDEBAR INFORMATIVO
    const sidebar = document.getElementById("sidebar");
    const sbCloseBtn = document.getElementById("sbCloseBtn");
    const sbRegion = document.getElementById("sbRegion");
    const sbName = document.getElementById("sbName");
    const sbCapital = document.getElementById("sbCapital");
    const sbPopulation = document.getElementById("sbPopulation");
    const sbDesc = document.getElementById("sbDesc");
    const sbDishes = document.getElementById("sbDishes");
    const sbAttractions = document.getElementById("sbAttractions");
    const sbEconomy = document.getElementById("sbEconomy");

    let activeProvincePath = null;
    let activeMuniNode = null;

    function selectProvince(provinceId, pathElement) {
      const data = provinciasAPI[provinceId];
      if (!data) return;

      if (activeProvincePath) {
        activeProvincePath.classList.remove("activa");
        activeProvincePath = null;
      }
      if (activeMuniNode) {
        activeMuniNode.classList.remove("active");
        activeMuniNode = null;
      }

      // 1. Activar nodo de marcador (pin) y capa territorial (polígono)
      const muniNode = document.getElementById("node-" + provinceId);
      if (muniNode) {
        activeMuniNode = muniNode;
        activeMuniNode.classList.add("active");
      }

      const polyEl = pathElement || document.getElementById(provinceId);
      if (polyEl) {
        activeProvincePath = polyEl;
        activeProvincePath.classList.add("activa");
      }

      // 2. Sincronizar botones de la barra superior de municipios
      document.querySelectorAll(".muni-pill-btn").forEach(btn => {
        if (btn.getAttribute("data-muni") === provinceId) {
          btn.classList.add("active");
        } else {
          btn.classList.remove("active");
        }
      });

      if (sbRegion) sbRegion.textContent = data.region;
      if (sbName) sbName.textContent = data.nombre;
      if (sbCapital) sbCapital.textContent = data.capital;
      if (sbPopulation) sbPopulation.textContent = data.poblacion;
      if (sbDesc) sbDesc.textContent = data.descripcion;

      // Inyectar Federaciones si existen
      const sbFedBlock = document.getElementById("sbFederacionesBlock");
      const sbFedList = document.getElementById("sbFederacionesList");
      if (sbFedBlock && sbFedList) {
        if (data.federaciones && data.federaciones.length > 0) {
          sbFedList.innerHTML = data.federaciones.map(f => `
            <div style="background: rgba(255,255,255,0.04); border-left: 3px solid ${f.color}; border-radius: 4px; padding: 0.75rem; border-top: 1px solid rgba(255,255,255,0.06); border-right: 1px solid rgba(255,255,255,0.06); border-bottom: 1px solid rgba(255,255,255,0.06);">
              <strong style="display: block; font-size: 0.85rem; color: #ffffff; margin-bottom: 0.25rem;">${f.nombre}</strong>
              ${f.sub ? `<span style="display: inline-block; font-size: 0.7rem; color: ${f.color}; font-weight: 700; margin-bottom: 0.35rem;">${f.sub}</span>` : ''}
              <p style="font-size: 0.78rem; color: #cbd5e1; line-height: 1.5; margin: 0;">${f.desc}</p>
            </div>
          `).join("");
          sbFedBlock.style.display = "block";
        } else {
          sbFedBlock.style.display = "none";
        }
      }

      // Inyectar Platos Tipicos
      if (sbDishes) {
        sbDishes.innerHTML = data.platos
          .map(dish => `<span class="tag-chip food">${dish}</span>`)
          .join("");
      }

      // Inyectar Atractivos Turisticos
      if (sbAttractions) {
        sbAttractions.innerHTML = data.atractivos
          .map(att => `<li>${att}</li>`)
          .join("");
      }

      // Inyectar Economia
      if (sbEconomy) {
        sbEconomy.innerHTML = data.economia
          .map(eco => `<span class="tag-chip">${eco}</span>`)
          .join("");
      }

      // Abrir la barra lateral con animacion suave
      if (sidebar) {
        sidebar.classList.add("activa");
      }
    }

    function closeSidebar() {
      if (sidebar) {
        sidebar.classList.remove("activa");
      }
      if (activeProvincePath) {
        activeProvincePath.classList.remove("activa");
        activeProvincePath = null;
      }
      if (activeMuniNode) {
        activeMuniNode.classList.remove("active");
        activeMuniNode = null;
      }
      document.querySelectorAll(".muni-pill-btn").forEach(btn => btn.classList.remove("active"));
    }

    if (sbCloseBtn) {
      sbCloseBtn.addEventListener("click", closeSidebar);
    }

    // Cerrar con tecla Escape
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && sidebar && sidebar.classList.contains("activa")) {
        closeSidebar();
      }
    });

    // 5. Vincular escuchadores en nodos de los 5 municipios del Trópico
    document.querySelectorAll(".muni-marker-node").forEach(node => {
      const muniId = node.getAttribute("data-muni");
      const data = provinciasAPI[muniId];
      if (data) {
        node.addEventListener("mouseenter", (e) => {
          showTooltip(e, data.nombre, data.capital);
        });
        node.addEventListener("mousemove", (e) => {
          moveTooltip(e);
        });
        node.addEventListener("mouseleave", () => {
          hideTooltip();
        });
        node.addEventListener("click", (e) => {
          e.stopPropagation();
          if (totalDragDistance > 6) return;
          selectProvince(muniId);
        });
        node.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            selectProvince(muniId);
          }
        });
      }
    });

    // 6. Vincular escuchadores en la barra selectora de píldoras de municipios
    document.querySelectorAll(".muni-pill-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const muniId = btn.getAttribute("data-muni");
        selectProvince(muniId);
      });
    });

    // 7. Vincular escuchadores de eventos en los polígonos del SVG (Municipios y Provincias)
    const municipiosElements = document.querySelectorAll(".municipio, .provincia");
    municipiosElements.forEach(path => {
      const muniId = path.getAttribute("data-muni") || path.getAttribute("id");
      const data = provinciasAPI[muniId];
      const muniName = path.getAttribute("data-name") || (data ? data.nombre : muniId);
      const muniProv = path.getAttribute("data-prov") || (data ? data.capital : "Cochabamba");

      path.addEventListener("mouseenter", (e) => {
        if (isDragging) return;
        showTooltip(e, muniName, data ? data.capital : `Provincia ${muniProv}`);
      });
      path.addEventListener("mousemove", (e) => {
        if (isDragging) {
          hideTooltip();
          return;
        }
        moveTooltip(e);
      });
      path.addEventListener("mouseleave", () => {
        hideTooltip();
      });
      path.addEventListener("click", () => {
        if (totalDragDistance > 6) return;
        if (data) {
          selectProvince(muniId, path);
        } else {
          // Si es un municipio base sin ficha dedicada, buscar provincia madre
          const pName = path.getAttribute("data-prov");
          const pKey = pName ? pName.toLowerCase().replace(/\s+/g, '-') : null;
          if (pKey && provinciasAPI[pKey]) {
            selectProvince(pKey);
          }
        }
      });
    });

    // 8. Vinculacion con los botones y tarjetas de Las Seis Federaciones
    document.querySelectorAll(".btn-fed-locate, .fed-card").forEach(el => {
      el.addEventListener("click", (e) => {
        const card = el.closest(".fed-card") || el;
        const provId = card.getAttribute("data-prov-id") || "chapare";
        selectProvince(provId);
        const mapSection = document.getElementById("cochabambaAppViewport") || document.getElementById("mapa");
        if (mapSection) {
          mapSection.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      });
    });

    // Mostrar completos los cinco municipios al abrir el mapa.
  }

  // ==========================================================================
  // CROQUIS FERIAL INTERACTIVO
  // Sectores y puestos tomados del plano oficial del recinto FITROP 2026.
  // La interfaz (SVG/HTML y estilos) vive en index.html y style.css; este
  // módulo solamente mantiene el estado e interacciones del croquis.
  // ==========================================================================
  function initFairPlan() {
    const fairPlanSearch = document.getElementById("fairPlanSearch");
    const fairPlanClear = document.getElementById("fairPlanClear");
    const fairPlanSearchStatus = document.getElementById("fairPlanSearchStatus");
    const fairPlanSectorList = document.getElementById("fairPlanSectorList");
    const fairPlanDetails = document.getElementById("fairPlanDetails");
    const fairPlanOwnerBanner = document.getElementById("fairPlanOwnerBanner");
    const fairPlanViewport = document.getElementById("fairPlanViewport");
    const fairPlanZoomLayer = document.getElementById("fairPlanZoomLayer");
    const fairPlanReset = document.getElementById("fairPlanReset");
    const fairPlanSvg = document.getElementById("fairPlanSvg");
    const fairMapTooltip = document.getElementById("fairMapTooltip");
    let fairMapTooltipHideTimer = null;
    const fairPlanBlueprintImg = document.getElementById("fairPlanBlueprintImg");
    const btnModeVector = document.getElementById("btnModeVector");
    const btnModeBlueprint = document.getElementById("btnModeBlueprint");
    const fairPlanZoomControls = Array.from(document.querySelectorAll("[data-fair-plan-zoom]"));
    const presetButtons = Array.from(document.querySelectorAll(".fair-preset-btn[data-preset]"));
    const categoryChips = Array.from(document.querySelectorAll(".fair-cat-chip[data-cat]"));

    if (!fairPlanViewport && !fairPlanSectorList) {
      return;
    }

    const fairPlanSectors = [
      {
            "id": "instituciones",
            "num": 1,
            "name": "Instituciones Públicas y Privadas",
            "shortName": "Instituciones",
            "category": "institucional",
            "color": "#3B82F6",
            "stands": 93,
            "location": "Plaza Principal 25 de Septiembre & Sectores A, B, C",
            "zones": "Sector A (29 stands), Sector B (32 stands), Sector C (32 stands)",
            "desc": "Espacios oficiales para ministerios, gobernación, municipios, cooperativas, banca pública y organismos de cooperación internacional.",
            "x": 1468,
            "y": 284,
            "w": 206,
            "h": 190
      },
      {
            "id": "piscicultura",
            "num": 2,
            "name": "Piscicultura y Acuicultura",
            "shortName": "Piscicultura",
            "category": "agro",
            "color": "#06B6D4",
            "stands": 16,
            "location": "Sur de Plaza Principal 25 de Septiembre",
            "zones": "Stands 1 a 16",
            "desc": "Productores de Tambaquí, Pacú, Surubí, alevines, piscinas de geomembrana y alimentos balanceados.",
            "x": 1490,
            "y": 474,
            "w": 140,
            "h": 24,
            "standsRange": "1-16"
      },
      {
            "id": "apicultura",
            "num": 3,
            "name": "Apicultura y Productos de la Colmena",
            "shortName": "Apicultura",
            "category": "agro",
            "color": "#F59E0B",
            "stands": 19,
            "location": "Sur de Piscicultura",
            "zones": "Stands 1 a 19",
            "desc": "Miel pura de monte virgen, propóleo, polen seleccionado, jalea real y derivados apícolas.",
            "x": 1485,
            "y": 512,
            "w": 150,
            "h": 24,
            "standsRange": "1-19"
      },
      {
            "id": "cacao",
            "num": 4,
            "name": "Cacao Criollo Amazónico y Chocolates",
            "shortName": "Cacao",
            "category": "frutas",
            "color": "#B45309",
            "stands": 12,
            "location": "Av. Santa Cruz (Mz 6 Sur)",
            "zones": "Stands 1 a 6",
            "desc": "Cacao fino de aroma, licor de cacao, manteca y chocolates artesanales certificados.",
            "x": 1339,
            "y": 415,
            "w": 32,
            "h": 18,
            "standsRange": "1-12"
      },
      {
            "id": "pina",
            "num": 4,
            "name": "Piña Golden y Tropical",
            "shortName": "Piña",
            "category": "frutas",
            "color": "#F97316",
            "stands": 12,
            "location": "Av. Santa Cruz (Mz 6 Sur)",
            "zones": "Stands 1 a 6",
            "desc": "Piña Cayena Lisa y Golden, derivados deshidratados, néctares y biomasa.",
            "x": 1375,
            "y": 415,
            "w": 32,
            "h": 18,
            "standsRange": "1-12"
      },
      {
            "id": "banano",
            "num": 4,
            "name": "Banano de Exportación y Plátano",
            "shortName": "Banano",
            "category": "frutas",
            "color": "#EAB308",
            "stands": 12,
            "location": "Av. Santa Cruz (Mz 6 Sur)",
            "zones": "Stands 1 a 6",
            "desc": "Asociaciones de bananeros del Trópico, empacadoras, cadenas de frío y fruta fresca calidad exportación.",
            "x": 1411,
            "y": 415,
            "w": 32,
            "h": 18,
            "standsRange": "1-12"
      },
      {
            "id": "pitahaya",
            "num": 4,
            "name": "Pitahaya Roja y Amarilla",
            "shortName": "Pitahaya",
            "category": "frutas",
            "color": "#EC4899",
            "stands": 12,
            "location": "Av. Santa Cruz (Mz 6 Sur)",
            "zones": "Stands 1 a 6",
            "desc": "Fruta del dragón, esquejes seleccionados, pulpa congelada y producción agroecológica.",
            "x": 1303,
            "y": 415,
            "w": 32,
            "h": 18,
            "standsRange": "1-12"
      },
      {
            "id": "palmito",
            "num": 5,
            "name": "Palmito y Conservas Tropicales",
            "shortName": "Palmito",
            "category": "frutas",
            "color": "#84CC16",
            "stands": 38,
            "location": "Av. Santa Cruz (Mz 6 Sur)",
            "zones": "Stands 1 a 6",
            "desc": "Plantas procesadoras de palmito en salmuera, conservas, corazones de palma y derivados.",
            "x": 1267,
            "y": 415,
            "w": 32,
            "h": 18,
            "standsRange": "1-38"
      },
      {
            "id": "hoja-coca",
            "num": 5,
            "name": "Coca Tradicional y Derivados Benéficos",
            "shortName": "Hoja de Coca",
            "category": "agro",
            "color": "#10B981",
            "stands": 20,
            "location": "Av. Santa Cruz (Mz 18 Sur)",
            "zones": "Stands 1 a 19",
            "desc": "Investigación científica, abonos orgánicos, harinas, cosmética y mates tradicionales de la hoja sagrada.",
            "x": 1135,
            "y": 415,
            "w": 106,
            "h": 20,
            "standsRange": "1-20"
      },
      {
            "id": "materiales",
            "num": 6,
            "name": "Materiales de Construcción y Agregados",
            "shortName": "Materiales",
            "category": "industria",
            "color": "#64748B",
            "stands": 12,
            "location": "Sector Sur Mz 36",
            "zones": "Zona A (12 stands)",
            "desc": "Áridos de río, cementos, estructuras de hormigón, ferretería pesada y revestimientos.",
            "x": 1029,
            "y": 417,
            "w": 78,
            "h": 22,
            "standsRange": "1-12"
      },
      {
            "id": "turismo",
            "num": 7,
            "name": "Turismo, Ecoturismo y Hotelería",
            "shortName": "Turismo",
            "category": "servicios",
            "color": "#14B8A6",
            "stands": 31,
            "location": "Calle La Paz (Sector A)",
            "zones": "Zona A (15), Zona B (16)",
            "desc": "Operadores turísticos del Parque Carrasco, cabañas ecológicas, deportes de aventura y hotelería.",
            "x": 1107,
            "y": 446,
            "w": 18,
            "h": 116,
            "standsRange": "1-31"
      },
      {
            "id": "juegos",
            "num": 22,
            "name": "Juegos Infantiles y Recreación Familiar",
            "shortName": "Juegos Infantiles",
            "category": "recreacion",
            "color": "#A855F7",
            "stands": 48,
            "location": "Calle Sector Juegos Infantiles (Mz 18 y 6)",
            "zones": "Puestos 1-48",
            "desc": "Sector de juegos infantiles, atracciones mecánicas, inflables y puestos familiares.",
            "x": 1130,
            "y": 286,
            "w": 320,
            "h": 16,
            "standsRange": "1-48"
      },
      {
            "id": "maquinaria",
            "num": 14,
            "name": "Maquinaria Pesada, Vehículos y Tractores",
            "shortName": "Maquinaria Pesada",
            "category": "maquinaria",
            "color": "#EA580C",
            "stands": 110,
            "location": "Sector Sur (Bajo Manzanas 17, 5 y 4)",
            "zones": "Zona A (110 stands oficiales: 1 a 110)",
            "desc": "Sector Maquinarias y Vehículos Importados con 110 puestos oficiales, tractores agrícolas, cosechadoras, camiones pesados e implementos.",
            "x": 1130,
            "y": 574,
            "w": 440,
            "h": 26,
            "standsRange": "1-110"
      },
      {
            "id": "empresarial",
            "num": 16,
            "name": "Sector Empresarial y Corporativo",
            "shortName": "Empresarial",
            "category": "comercio",
            "color": "#2563EB",
            "stands": 67,
            "location": "Av. Panamericana (Banda Central)",
            "zones": "Zona A (36), Zona B (31)",
            "desc": "Empresas de telecomunicaciones, consultoras de ingeniería, banca privada, aseguradoras y software agroindustrial.",
            "x": 970,
            "y": 550,
            "w": 220,
            "h": 34,
            "standsRange": "1-67"
      },
      {
            "id": "industrial",
            "num": 17,
            "name": "Sector Industrial y Manufactura",
            "shortName": "Parque Industrial",
            "category": "industria",
            "color": "#475569",
            "stands": 105,
            "location": "Av. Panamericana (Tramo Oeste Central)",
            "zones": "Zona A (33), Zona B (36), Zona C (36)",
            "desc": "Metalmecánica, plásticos, envases bio-degradables, maquinaria de procesamiento de alimentos e insumos fabriles.",
            "x": 690,
            "y": 550,
            "w": 270,
            "h": 34,
            "standsRange": "1-105"
      },
      {
            "id": "bienes-raices",
            "num": 18,
            "name": "Bienes Raíces y Proyectos Urbanísticos",
            "shortName": "Bienes Raíces",
            "category": "comercio",
            "color": "#0284C7",
            "stands": 24,
            "location": "Av. Panamericana",
            "zones": "Zona A (24 stands)",
            "desc": "Desarrollos urbanos en el Trópico, quintas ecológicas, parcelas productivas y condominios campestres.",
            "x": 520,
            "y": 615,
            "w": 160,
            "h": 34,
            "standsRange": "1-24"
      },
      {
            "id": "artesanos",
            "num": 19,
            "name": "Artesanías de los Pueblos Indígenas",
            "shortName": "Artesanos",
            "category": "artesania",
            "color": "#D97706",
            "stands": 72,
            "location": "Av. Panamericana (Paseo Artesanal)",
            "zones": "Zona A (36), Zona B (36)",
            "desc": "Tejidos en fibra vegetal, tallados en madera noble, artesanía Yuracaré, Yuqui y comunidades originarias.",
            "x": 320,
            "y": 615,
            "w": 190,
            "h": 34,
            "standsRange": "1-72"
      },
      {
            "id": "comerciantes",
            "num": 20,
            "name": "Comercio General y Bazar Internacional",
            "shortName": "Comercio General",
            "category": "comercio",
            "color": "#4F46E5",
            "stands": 84,
            "location": "Av. Panamericana (Extremo Oeste)",
            "zones": "Zona A (36), Zona B (36), Zona C (12)",
            "desc": "Indumentaria técnica para campo, calzado de trabajo, herramientas de ferretería y artículos para el hogar.",
            "x": 110,
            "y": 615,
            "w": 200,
            "h": 34,
            "standsRange": "1-84"
      },
      {
            "id": "mobiliario",
            "num": 15,
            "name": "Mobiliario y Madera Sostenible",
            "shortName": "Mobiliario & Madera",
            "category": "industria",
            "color": "#78350F",
            "stands": 36,
            "location": "Av. Panamericana (Entorno Este)",
            "zones": "Zona A (36 stands)",
            "desc": "Carpintería industrial, muebles de maderas certificadas del Trópico (Mara, Roble, Tajibo), pisos y aberturas.",
            "x": 1200,
            "y": 550,
            "w": 90,
            "h": 34,
            "standsRange": "1-36"
      },
      {
            "id": "plantines",
            "num": 11,
            "name": "Plantines, Viveros y Reforestación",
            "shortName": "Plantines y Viveros",
            "category": "agro",
            "color": "#15803D",
            "stands": 51,
            "location": "Av. Panamericana (Banda Sur Este)",
            "zones": "Zona A (12), Zona B (10), Zona C (16), Zona D (13)",
            "desc": "Viveros certificados de cítricos, plantines de cacao injertado, árboles maderables, orquídeas y flores exóticas.",
            "x": 1295,
            "y": 535,
            "w": 95,
            "h": 50,
            "standsRange": "1-51"
      },
      {
            "id": "ganaderia",
            "num": 9,
            "name": "Ganadería Bovina y Especies Menores",
            "shortName": "Ganadería",
            "category": "ganaderia",
            "color": "#92400E",
            "stands": 81,
            "location": "Av. Panamericana (Extremo Este Sector Ganadero)",
            "zones": "Ganado Norte (26), Ganado Sur (55)",
            "desc": "Pistas de juzgamiento, corrales de Nelore, Gyr lechero, Brahman, porcinos, ovinos de pelo y remates de élite.",
            "x": 1395,
            "y": 520,
            "w": 120,
            "h": 85,
            "standsRange": "1-81"
      },
      {
            "id": "plaza-comidas",
            "num": 21,
            "name": "Gran Plaza de Comidas y Gastronomía",
            "shortName": "Plaza de Comidas",
            "category": "gastronomia",
            "color": "#EF4444",
            "stands": 141,
            "location": "Av. Panamericana (Barrios Jordán y Petrolero)",
            "zones": "Zona A (141 stands gastronómicos con mesas)",
            "desc": "Pescados fritos (Pacú, Tambaquí, Surubí), platos típicos del Trópico, jugos de frutas amazónicas, helados artesanales.",
            "x": 1000,
            "y": 610,
            "w": 280,
            "h": 70,
            "standsRange": "1-141"
      }
];

    fairPlanSectors.forEach(sector => {
      const inventorySector = standInventory?.getSector(sector.id);
      if (!inventorySector) return;
      sector.stands = inventorySector.stands;
      if (inventorySector.number) sector.num = inventorySector.number;
      sector.location = inventorySector.location;
      sector.sellable = inventorySector.sellable !== false;
      sector.standsRange = `1-${inventorySector.stands}`;
      if (sector.sellable) {
        sector.zones = inventorySector.zones.map(([first, last, zone]) => `${zone}: ${first}–${last}`).join(" · ");
      }
    });
    fairPlanCatalog = standInventory?.sellableCatalog || fairPlanSectors.filter(sector => sector.sellable);
    const sectorsById = new Map(fairPlanSectors.map(sector => [sector.id, sector]));
    const listButtonsById = new Map();
    let activeSectorId = null;
    let selectedStandNumber = null;
    let currentCategoryFilter = "all";
    let currentQuery = "";
    let zoomScale = 1;
    let blueprintMode = false;
    let cameraCenter = { x: 0.5, y: 0.5 };
    let cameraReady = false;
    let fittingOverview = false;
    const minZoom = 0.08;
    const maxZoom = 12;
    const zoomFactor = 1.25;

    // Preset bounding boxes / scroll focus coordinates in the 1600x950 coordinate space
    const cameraPresets = {
      all: { x: 1040, y: 475, zoom: 0.82 },
      manzanas: { x: 1400, y: 450, zoom: 0.7 },
      panamericana: { x: 800, y: 580, zoom: 1.5 },
      plaza: { x: 1565, y: 390, zoom: 1.5 },
      manzana4: { x: 1568, y: 610, zoom: 1.6 },
      manzana3: { x: 1850, y: 610, zoom: 1.5 },
      santacruz: { x: 1300, y: 350, zoom: 1.4 },
      maquinaria: { x: 1350, y: 580, zoom: 1.6 },
      comidas: { x: 1140, y: 645, zoom: 1.8 },
      ganaderia: { x: 1450, y: 560, zoom: 1.8 }
    };
    const sectorArtwork = {
      instituciones: "#cadSectorA", piscicultura: "#cadPisciculturaSur", apicultura: "#cadApiculturaSur",
      comerciantes: "#stripComerciantesA", artesanos: "#stripArtesanosA", "bienes-raices": "#stripBienesRaices",
      industrial: "#stripIndustrialB", empresarial: "#stripEmpresarialA", mobiliario: "#stripMobiliarioMadera",
      maquinaria: "#cadSectorMaquinariasVehiculos", plantines: "#stripPlantinesViveros",
      ganaderia: "#stripSectorGanaderia", "plaza-comidas": "#stripPlazaComidas"
    };

    function normalizeFairPlanText(value) {
      return String(value || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLocaleLowerCase("es")
        .trim();
    }

    function tropicalCategoryColor(category) {
      return {
        institucional: "#a25f4e",
        agro: "#3c7b50",
        frutas: "#b18437",
        industria: "#9c713d",
        servicios: "#4f8e88",
        recreacion: "#aa6f60",
        maquinaria: "#b36a4a",
        comercio: "#477c60",
        artesania: "#ab813c",
        ganaderia: "#8d7445",
        gastronomia: "#b95546"
      }[category] || "#397a55";
    }

    // Render Side Details Inspector with Interactive Stand Lot Matrix
    function renderDetails(sector) {
      if (!fairPlanDetails) return;

      fairPlanDetails.replaceChildren();
      fairPlanDetails.setAttribute("aria-live", "polite");
      fairPlanDetails.setAttribute("aria-atomic", "true");

      const card = document.createElement("article");
      card.className = "fair-plan-details-card";

      if (!sector) {
        if (fairPlanOwnerBanner) fairPlanOwnerBanner.hidden = true;
        const header = document.createElement("div");
        header.className = "fair-details-empty-state";
        header.innerHTML = `
          <div class="empty-icon-wrap" style="width:48px;height:48px;border-radius:12px;background:rgba(16,185,129,0.15);display:flex;align-items:center;justify-content:center;margin-bottom:0.75rem;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
          </div>
          <h3 class="fair-plan-details-title" style="color:#294b38;font-size:1.15rem;font-weight:800;margin-bottom:0.5rem;">Explora el Recinto FITROP 2026</h3>
          <p class="fair-plan-details-copy" style="color:#536956;font-size:0.85rem;line-height:1.6;">
            Haz clic en un sector del croquis ilustrado o selecciónalo en la lista para ver su cantidad de stands y ubicación en el recinto.
          </p>
          <div style="margin-top:1rem;padding:0.75rem;border-radius:8px;background:#f1f0e4;border:1px solid #cbd5c0;font-size:0.75rem;color:#506650;">
            💡 <strong>Consejo:</strong> Usa los filtros de categoría superiores o arrastra el ratón para navegar por las calles de Entre Ríos.
          </div>
        `;
        card.append(header);
        fairPlanDetails.append(card);
        return;
      }

      // Specific Sector Selected Header
      const header = document.createElement("div");
      header.className = "fair-details-header";
      const categoryColor = tropicalCategoryColor(sector.category);
      header.innerHTML = `
        <div style="display:flex;align-items:center;justify-content:space-between;gap:0.5rem;margin-bottom:0.5rem;">
          <span style="display:inline-flex;align-items:center;gap:0.35rem;padding:0.2rem 0.6rem;border-radius:6px;background:${categoryColor}22;border:1px solid ${categoryColor}66;color:${categoryColor};font-size:0.72rem;font-weight:900;text-transform:uppercase;">
            SECTOR ${sector.num}
          </span>
          <span style="color:#667a65;font-size:0.72rem;font-weight:700;text-transform:uppercase;">
            ${sector.category.toUpperCase()}
          </span>
        </div>
        <h3 class="fair-plan-details-title" style="color:#294b38;font-size:1.2rem;font-weight:900;line-height:1.25;margin:0 0 0.4rem 0;">
          ${sector.name}
        </h3>
        <p class="fair-plan-details-copy" style="color:#536956;font-size:0.84rem;line-height:1.5;margin:0 0 0.85rem 0;">
          ${sector.desc || "Espacio oficial de exposición según el plano maestro arquitectónico de FITROP 2026."}
        </p>
      `;
      card.append(header);

      if (sector.sellable === false) {
        if (fairPlanOwnerBanner) fairPlanOwnerBanner.hidden = true;
        const note = document.createElement("p");
        note.className = "fair-plan-details-copy";
        note.textContent = "Área de Juegos Infantiles visible en el croquis. Sus 48 espacios no están incluidos en los 1.034 puestos de venta.";
        card.append(note);
        fairPlanDetails.append(card);
        return;
      }

      // Technical Metrics Grid
      const metricsGrid = document.createElement("div");
      metricsGrid.style.cssText = "display:grid;grid-template-columns:1fr 1fr;gap:0.5rem;margin-bottom:0.85rem;";
      const sectorInventory = standInventory?.summary(fairPlanCatalog, sector.id);
      metricsGrid.innerHTML = `
        <div style="padding:0.6rem;border-radius:8px;background:#f3f1e7;border:1px solid #cbd5c0;">
          <span style="display:block;color:#607363;font-size:0.68rem;font-weight:700;text-transform:uppercase;">Puestos del sector</span>
          <strong style="color:#397a55;font-size:1.3rem;font-weight:900;">${sector.stands}</strong>
          <small style="display:block;color:#627462;font-size:0.67rem;">${sectorInventory?.available || 0} ${(sectorInventory?.available || 0) === 1 ? "disponible confirmado" : "disponibles confirmados"}</small>
        </div>
        <div style="padding:0.6rem;border-radius:8px;background:#f3f1e7;border:1px solid #cbd5c0;">
          <span style="display:block;color:#607363;font-size:0.68rem;font-weight:700;text-transform:uppercase;">Ubicación</span>
          <strong style="color:#294b38;font-size:0.8rem;font-weight:800;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;">${sector.location}</strong>
        </div>
      `;
      card.append(metricsGrid);

      // Zones badge
      if (sector.zones) {
        const zoneBadge = document.createElement("div");
        zoneBadge.style.cssText = "padding:0.4rem 0.65rem;border-radius:6px;background:#e9efe1;border:1px solid #b1c5a7;color:#41664b;font-size:0.74rem;font-weight:700;margin-bottom:0.85rem;";
        zoneBadge.innerHTML = `📍 <strong>Distribución:</strong> ${sector.zones}`;
        card.append(zoneBadge);
      }

      // Interactive Stand Lot Grid Simulation (#1 to #N)
      const matrixCard = document.createElement("div");
      matrixCard.className = "fair-stand-matrix-card";
      
      const matrixHeader = document.createElement("div");
      matrixHeader.className = "matrix-header";
      matrixHeader.innerHTML = `
        <span class="matrix-title">Puestos del sector (${sector.stands})</span>
        <div class="matrix-legend">
          <span class="matrix-legend-item"><span class="matrix-legend-dot unassigned"></span> Por confirmar</span>
          <span class="matrix-legend-item"><span class="matrix-legend-dot available"></span> Disponible</span>
          <span class="matrix-legend-item"><span class="matrix-legend-dot pending"></span> En proceso de compra</span>
          <span class="matrix-legend-item"><span class="matrix-legend-dot reserved"></span> Reservado</span>
          <span class="matrix-legend-item"><span class="matrix-legend-dot sold"></span> Vendido</span>
          <span class="matrix-legend-item"><span class="matrix-legend-dot blocked"></span> Fuera de venta</span>
        </div>
      `;
      matrixCard.append(matrixHeader);

      const lotGrid = document.createElement("div");
      lotGrid.className = "stand-lot-grid";
      let ctaBtn;
      const standSearch = document.createElement("input");
      standSearch.type = "search";
      standSearch.className = "stand-matrix-search";
      standSearch.placeholder = "Buscar número o titular";
      standSearch.setAttribute("aria-label", "Buscar puesto por número o titular");
      matrixCard.append(standSearch);

      // Availability comes only from the inventory edited by the administrator.
      selectedStandNumber = selectedStandNumber ||
        Array.from({ length: sector.stands }, (_, index) => index + 1)
          .find(number => standInventory?.getStatus(sector.id, number) === "available") || 1;

      for (let i = 1; i <= sector.stands; i++) {
        const status = standInventory?.getStatus(sector.id, i) || "unassigned";
        const lotBtn = document.createElement("button");
        lotBtn.type = "button";
        lotBtn.className = `stand-lot-btn status-${status} ${i === selectedStandNumber ? 'selected' : ''}`;
        lotBtn.textContent = `#${i}`;
        const record = standInventory?.getRecord(sector.id, i);
        const owner = record?.buyerName && ["reserved", "sold"].includes(status) ? ` · ${record.buyerName}` : "";
        lotBtn.title = `${standInventory?.getCode(sector.id, i) || `Puesto #${i}`} · ${standInventory?.labels[status] || "Por confirmar"}${owner}`;
        lotBtn.setAttribute("aria-label", lotBtn.title);
        lotBtn.dataset.search = `${i} ${standInventory?.getCode(sector.id, i) || ""} ${record?.buyerName || ""} ${record?.organization || ""}`.toLocaleLowerCase("es");
        lotBtn.setAttribute("aria-pressed", String(i === selectedStandNumber));
        lotBtn.addEventListener("click", () => {
          selectedStandNumber = i;
          Array.from(lotGrid.querySelectorAll(".stand-lot-btn")).forEach(btn => {
            btn.classList.toggle("selected", btn === lotBtn);
            btn.setAttribute("aria-pressed", String(btn === lotBtn));
          });
          updateSelectedStandBar();
          ctaBtn.href = `espacios.html?sector=${sector.id}&stand=${selectedStandNumber}#solicitud`;
          ctaBtn.hidden = !(standInventory?.getStatus(sector.id, selectedStandNumber) === "available");
          ctaBtn.style.display = ctaBtn.hidden ? "none" : "flex";
        });
        lotGrid.append(lotBtn);
      }
      matrixCard.append(lotGrid);
      standSearch.addEventListener("input", () => {
        const query = normalizeFairPlanText(standSearch.value.replace(/^#/, ""));
        lotGrid.querySelectorAll(".stand-lot-btn").forEach(button => {
          button.hidden = Boolean(query) && !normalizeFairPlanText(button.dataset.search).includes(query);
        });
      });

      // Selected Stand Bar & Direct CTA
      const selectedStandBar = document.createElement("div");
      selectedStandBar.className = "fair-stand-selected-bar";
      
      function updateSelectedStandBar() {
        const record = standInventory?.getRecord(sector.id, selectedStandNumber);
        const status = record?.status || "unassigned";
        const available = status === "available";
        const owner = record?.buyerName && ["reserved", "sold"].includes(status) ? record.buyerName : "";
        selectedStandBar.replaceChildren();
        const info = document.createElement("div");
        info.className = "stand-sel-info";
        const title = document.createElement("strong");
        title.className = "stand-sel-title";
        title.textContent = `${standInventory?.getCode(sector.id, selectedStandNumber) || `Puesto #${selectedStandNumber}`} · ${standInventory?.labels[status] || "Por confirmar"}`;
        const zone = document.createElement("span");
        zone.className = "stand-sel-dims";
        zone.textContent = `Zona ${standInventory?.getZone(sector.id, selectedStandNumber) || "Por confirmar"} · ${sector.location}`;
        const holder = document.createElement("span");
        holder.className = "stand-sel-owner";
        holder.textContent = owner ? `Titular: ${owner}${record.organization ? ` · ${record.organization}` : ""}` : "Sin titular registrado";
        info.append(title, zone, holder);
        selectedStandBar.append(info);
        if (fairPlanOwnerBanner) {
          fairPlanOwnerBanner.hidden = false;
          fairPlanOwnerBanner.className = `fair-plan-owner-banner status-${status}`;
          fairPlanOwnerBanner.replaceChildren();
          const codeLabel = document.createElement("strong");
          codeLabel.textContent = standInventory?.getCode(sector.id, selectedStandNumber) || `Puesto #${selectedStandNumber}`;
          const summary = document.createElement("span");
          summary.textContent = `${sector.shortName} · ${standInventory?.labels[status] || "Por confirmar"} · ${owner ? `Titular: ${owner}` : "Sin titular registrado"}`;
          fairPlanOwnerBanner.append(codeLabel, summary);
        }
        if (available) {
          const link = document.createElement("a");
          link.className = "stand-sel-action";
          link.href = `espacios.html?sector=${sector.id}&stand=${selectedStandNumber}#solicitud`;
          link.textContent = "Comprar este puesto →";
          selectedStandBar.append(link);
        }
        refreshPhysicalStandNumbers();
      }
      updateSelectedStandBar();
      matrixCard.append(selectedStandBar);

      card.append(matrixCard);

      // Big CTA button
      ctaBtn = document.createElement("a");
      ctaBtn.href = `espacios.html?sector=${sector.id}&stand=${selectedStandNumber || 1}#solicitud`;
      ctaBtn.hidden = !(standInventory?.getStatus(sector.id, selectedStandNumber) === "available");
      ctaBtn.className = "fair-plan-details-btn";
      ctaBtn.style.cssText = "display:flex;align-items:center;justify-content:center;gap:0.5rem;margin-top:1rem;padding:0.8rem 1.2rem;border-radius:10px;background:var(--corp-emerald,#059669);color:#ffffff;font-size:0.86rem;font-weight:800;text-decoration:none;box-shadow:0 4px 15px rgba(5,150,105,0.4);transition:transform 0.2s;";
      ctaBtn.style.display = ctaBtn.hidden ? "none" : "flex";
      ctaBtn.innerHTML = `
        <span>Comprar puesto de ${sector.shortName}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
      `;
      card.append(ctaBtn);

      fairPlanDetails.append(card);
    }

    // Sync SVG Vector Sector highlight and list button active state
    function syncActiveSector() {
      const svgSectors = Array.from(document.querySelectorAll(".vector-sector"));
      svgSectors.forEach(elem => {
        const sid = elem.getAttribute("data-sector-id");
        const isActive = sid === activeSectorId;
        elem.classList.toggle("active", isActive);
        if (isActive) {
          // Bring to front
          elem.parentNode.appendChild(elem);
        }
      });

      listButtonsById.forEach((button, sectorId) => {
        const isActive = sectorId === activeSectorId;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
        button.toggleAttribute("aria-current", isActive);
        if (isActive) {
          const buttonBounds = button.getBoundingClientRect();
          const listBounds = fairPlanSectorList.getBoundingClientRect();
          if (buttonBounds.top < listBounds.top) {
            fairPlanSectorList.scrollTop += buttonBounds.top - listBounds.top;
          } else if (buttonBounds.bottom > listBounds.bottom) {
            fairPlanSectorList.scrollTop += buttonBounds.bottom - listBounds.bottom;
          }
        }
      });
      refreshPhysicalStandNumbers();
    }

    function selectSector(sectorId, standNumber = null, focusArtwork = true) {
      const sector = sectorsById.get(sectorId);
      if (!sector) return;

      activeSectorId = sector.id;
      selectedStandNumber = Number.isSafeInteger(Number(standNumber)) && Number(standNumber) >= 1 && Number(standNumber) <= sector.stands
        ? Number(standNumber) : null;
      syncActiveSector();
      renderDetails(sector);

      // Smooth pan and zoom focus to the sector
      if (focusArtwork && fairPlanViewport && sector.x !== undefined && sector.y !== undefined) {
        if (blueprintMode) setPlanMode(false);
        const artwork = sectorArtwork[sector.id] ? document.querySelector(sectorArtwork[sector.id]) : null;
        if (artwork) {
          const rect = artwork.getBoundingClientRect();
          const svgRect = fairPlanSvg.getBoundingClientRect();
          const { baseW, baseH } = getBaseDimensions();
          focusPoint(
            ((rect.left + rect.width / 2 - svgRect.left) / svgRect.width) * baseW,
            ((rect.top + rect.height / 2 - svgRect.top) / svgRect.height) * baseH,
            ["instituciones", "maquinaria", "plaza-comidas"].includes(sector.id) ? 2.2 : 3.5
          );
        } else {
          focusPoint(sector.x + (sector.w || 50) / 2, sector.y + (sector.h || 40) / 2, 2.4);
        }
      }
    }

    function clearSelection() {
      activeSectorId = null;
      selectedStandNumber = null;
      syncActiveSector();
      renderDetails(null);
    }

    function keepFairMapTooltipOpen() {
      if (fairMapTooltipHideTimer !== null) {
        window.clearTimeout(fairMapTooltipHideTimer);
        fairMapTooltipHideTimer = null;
      }
    }

    function hideFairMapTooltipSoon() {
      keepFairMapTooltipOpen();
      fairMapTooltipHideTimer = window.setTimeout(() => {
        if (fairMapTooltip) fairMapTooltip.style.display = "none";
        fairMapTooltipHideTimer = null;
      }, 120);
    }

    // Stable SVG dimensions keep small labels sharp at every zoom level.
    function getBaseDimensions() {
      const baseW = fairPlanSvg.viewBox.baseVal.width;
      const blueprintRatio = fairPlanBlueprintImg?.naturalWidth
        ? fairPlanBlueprintImg.naturalHeight / fairPlanBlueprintImg.naturalWidth
        : 950 / 2080;
      const baseH = blueprintMode ? baseW * blueprintRatio : fairPlanSvg.viewBox.baseVal.height;
      return { baseW, baseH };
    }

    function sizePlan() {
      const { baseW, baseH } = getBaseDimensions();
      const width = baseW * zoomScale;
      const height = baseH * zoomScale;
      const plan = blueprintMode ? fairPlanBlueprintImg : fairPlanSvg;
      fairPlanZoomLayer.style.width = `${width}px`;
      fairPlanZoomLayer.style.height = `${height}px`;
      plan.style.width = `${width}px`;
      plan.style.height = `${height}px`;
      fairPlanZoomControls.forEach(control => {
        const command = control.getAttribute("data-fair-plan-zoom");
        control.disabled = (command === "in" && zoomScale >= maxZoom)
          || (command === "out" && zoomScale <= minZoom);
      });
      return { width, height };
    }

    function rememberCamera() {
      if (!fairPlanViewport.clientWidth || !fairPlanViewport.clientHeight) return;
      const { baseW, baseH } = getBaseDimensions();
      cameraCenter = {
        x: (fairPlanViewport.scrollLeft + fairPlanViewport.clientWidth / 2) / (baseW * zoomScale),
        y: (fairPlanViewport.scrollTop + fairPlanViewport.clientHeight / 2) / (baseH * zoomScale)
      };
    }

    function centerPlan(x, y) {
      const { width, height } = sizePlan();
      fairPlanViewport.scrollLeft = x * width - fairPlanViewport.clientWidth / 2;
      fairPlanViewport.scrollTop = y * height - fairPlanViewport.clientHeight / 2;
      cameraReady = true;
      rememberCamera();
    }

    function focusPoint(targetX, targetY, scale) {
      if (!fairPlanViewport || !fairPlanSvg || !fairPlanViewport.clientWidth) return;
      fittingOverview = false;
      zoomScale = Math.min(maxZoom, Math.max(minZoom, scale));
      const { baseW, baseH } = getBaseDimensions();
      centerPlan(targetX / baseW, targetY / baseH);
    }

    function showOverview() {
      if (!fairPlanViewport.clientWidth || !fairPlanViewport.clientHeight) return;
      fittingOverview = true;
      const { baseW, baseH } = getBaseDimensions();
      zoomScale = Math.min(maxZoom, Math.max(minZoom, Math.min(
        fairPlanViewport.clientWidth / baseW,
        fairPlanViewport.clientHeight / baseH
      )));
      centerPlan(0.5, 0.5);
    }

    function applyZoom(nextScale, anchorX = fairPlanViewport.clientWidth / 2, anchorY = fairPlanViewport.clientHeight / 2) {
      if (!fairPlanViewport.clientWidth) return;
      const pointX = (fairPlanViewport.scrollLeft + anchorX) / zoomScale;
      const pointY = (fairPlanViewport.scrollTop + anchorY) / zoomScale;
      zoomScale = Math.min(maxZoom, Math.max(minZoom, nextScale));
      fittingOverview = false;
      sizePlan();
      fairPlanViewport.scrollLeft = pointX * zoomScale - anchorX;
      fairPlanViewport.scrollTop = pointY * zoomScale - anchorY;
      rememberCamera();
      if (fairMapTooltip) fairMapTooltip.style.display = "none";
    }

    function filterSectors() {
      const normalizedQuery = normalizeFairPlanText(currentQuery);
      
      const visibleSectors = fairPlanSectors.filter(sector => {
        const matchesCategory = (currentCategoryFilter === "all") || (sector.category === currentCategoryFilter);
        const searchableText = normalizeFairPlanText(`${sector.name} ${sector.shortName} ${sector.id} ${sector.num} ${sector.location}`);
        const matchesSearch = !normalizedQuery || searchableText.includes(normalizedQuery);
        return matchesCategory && matchesSearch;
      });

      const visibleSectorIds = new Set(visibleSectors.map(s => s.id));

      // Filter sidebar list
      listButtonsById.forEach((button, sectorId) => {
        const isVisible = visibleSectorIds.has(sectorId);
        button.hidden = !isVisible;
        button.classList.toggle("is-filtered-out", !isVisible);
      });

      // Filter SVG vector sectors
      const svgSectors = Array.from(document.querySelectorAll(".vector-sector"));
      svgSectors.forEach(elem => {
        const sid = elem.getAttribute("data-sector-id");
        const isVisible = visibleSectorIds.has(sid);
        elem.classList.toggle("dimmed", !isVisible);
      });

      if (activeSectorId && !visibleSectorIds.has(activeSectorId)) {
        clearSelection();
      }

      if (fairPlanClear) {
        fairPlanClear.disabled = !currentQuery;
        fairPlanClear.setAttribute("aria-disabled", String(!currentQuery));
      }

      // Status text
      if (fairPlanSearchStatus) {
        const count = visibleSectors.length;
        if (!currentQuery && currentCategoryFilter === "all") {
          fairPlanSearchStatus.textContent = `${fairPlanSectors.length} áreas del croquis · ${standInventory?.totalSellable?.toLocaleString("es-BO") || "1.034"} puestos en venta.`;
        } else {
          fairPlanSearchStatus.textContent = `${count} ${count === 1 ? 'sector encontrado' : 'sectores encontrados'}.`;
        }
      }
    }

    function renderSectorList() {
      if (!fairPlanSectorList) return;

      fairPlanSectorList.replaceChildren();
      fairPlanSectorList.setAttribute("aria-label", "Sectores del recinto ferial FITROP");

      fairPlanSectors.forEach(sector => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "fair-plan-sector-item";
        button.setAttribute("data-sector-id", sector.id);
        button.setAttribute("aria-pressed", "false");
        button.setAttribute("aria-label", sector.sellable === false ? `${sector.name}, área recreativa` : `${sector.name}, ${sector.stands} puestos`);

        button.style.setProperty('--sector-color', tropicalCategoryColor(sector.category));

        const nameSpan = document.createElement("span");
        nameSpan.className = "fair-plan-sector-name";
        nameSpan.textContent = `Sector ${sector.num}: ${sector.shortName}`;

        const countSpan = document.createElement("span");
        countSpan.className = "fair-plan-sector-count";
        const counts = sector.sellable ? standInventory?.summary(fairPlanCatalog, sector.id) : null;
        countSpan.textContent = sector.sellable === false ? "Área recreativa" : `${sector.stands} puestos${counts?.available ? ` · ${counts.available} ${counts.available === 1 ? "disponible" : "disponibles"}` : ""}`;

        button.append(nameSpan, countSpan);
        button.addEventListener("click", () => selectSector(sector.id));
        fairPlanSectorList.append(button);
        listButtonsById.set(sector.id, button);
      });
    }

    // Bind Vector Sectors (SVG elements)
    function bindSvgSectors() {
      const svgSectors = Array.from(document.querySelectorAll(".vector-sector"));
      
      svgSectors.forEach(elem => {
        const sid = elem.getAttribute("data-sector-id");
        const sector = sectorsById.get(sid);
        if (!sector) return;

        // Click to inspect
        elem.addEventListener("click", (e) => {
          e.stopPropagation();
          selectSector(sid);
        });

        // Tooltip on Hover
        elem.addEventListener("mouseenter", (e) => {
          if (!fairMapTooltip) return;
          keepFairMapTooltipOpen();
          
          const numEl = document.getElementById("tooltipNum");
          const catEl = document.getElementById("tooltipCat");
          const nameEl = document.getElementById("tooltipName");
          const locEl = document.getElementById("tooltipLoc");
          const standsEl = document.getElementById("tooltipStands");

          if (numEl) numEl.textContent = `Sector ${sector.num}`;
          if (catEl) catEl.textContent = sector.category.toUpperCase();
          if (nameEl) nameEl.textContent = sector.name;
          if (locEl) locEl.textContent = `📍 ${sector.location}`;
          if (standsEl) {
            const counts = sector.sellable ? standInventory?.summary(fairPlanCatalog, sector.id) : null;
            standsEl.textContent = sector.sellable === false ? "Área recreativa" : `${sector.stands} puestos · ${counts?.available || 0} ${(counts?.available || 0) === 1 ? "disponible confirmado" : "disponibles confirmados"}`;
          }

          // Position tooltip relative to viewport
          const rect = elem.getBoundingClientRect();
          const vpRect = fairPlanViewport.getBoundingClientRect();

          const posX = rect.left + rect.width / 2 - vpRect.left + fairPlanViewport.scrollLeft;
          const posY = rect.top - vpRect.top - 10 + fairPlanViewport.scrollTop;

          fairMapTooltip.style.left = `${posX}px`;
          fairMapTooltip.style.top = `${posY}px`;
          fairMapTooltip.style.display = "block";
        });

        elem.addEventListener("mouseleave", () => {
          hideFairMapTooltipSoon();
        });
      });

      // Bind CAD lot badges and manzana badges
      const lotBadges = Array.from(document.querySelectorAll(".cad-lot-badge"));
      lotBadges.forEach(badge => {
        const lotNum = badge.getAttribute("data-lot");
        const manzanaNum = badge.getAttribute("data-manzana") || badge.closest(".cad-manzana")?.getAttribute("data-manzana") || "109";
        const isSouthRow = Boolean(badge.closest("#cadFinalSouthRow, #cadFinalSouthExtension"));
        
        badge.addEventListener("mouseenter", () => {
          if (!fairMapTooltip) return;
          keepFairMapTooltipOpen();
          const numEl = document.getElementById("tooltipNum");
          const catEl = document.getElementById("tooltipCat");
          const nameEl = document.getElementById("tooltipName");
          const locEl = document.getElementById("tooltipLoc");
          const standsEl = document.getElementById("tooltipStands");

          if (numEl) numEl.textContent = `Lote ${lotNum}`;
          if (catEl) catEl.textContent = `MANZANA ${manzanaNum}`;
          if (nameEl) nameEl.textContent = `Manzana ${manzanaNum} · Lote #${lotNum}`;
          if (locEl) locEl.textContent = isSouthRow
            ? "📍 Sector sur, debajo de la Av. Panamericana"
            : "📍 Calle Trinidad / Independencia / Esteban Arce";
          if (standsEl) standsEl.textContent = isSouthRow ? "Parcela del croquis" : "Parcela asignable de stand";

          const rect = badge.getBoundingClientRect();
          const vpRect = fairPlanViewport.getBoundingClientRect();
          const posX = rect.left + rect.width / 2 - vpRect.left + fairPlanViewport.scrollLeft;
          const posY = rect.top - vpRect.top - 10 + fairPlanViewport.scrollTop;

          fairMapTooltip.style.left = `${posX}px`;
          fairMapTooltip.style.top = `${posY}px`;
          fairMapTooltip.style.display = "block";
        });

        badge.addEventListener("mouseleave", () => {
          hideFairMapTooltipSoon();
        });

        badge.addEventListener("click", (e) => {
          e.stopPropagation();
          if (fairPlanDetails) {
            fairPlanDetails.innerHTML = `
              <div class="fair-plan-details-card">
                <span class="fair-plan-details-kicker">Parcela Arquitectónica Oficial</span>
                <h3>Manzana ${manzanaNum} · Lote #${lotNum}</h3>
                <p><strong>Ubicación:</strong> ${isSouthRow ? "Sector sur, debajo de la Av. Panamericana." : "Sector Norte (Entre Calle Trinidad y Calle Independencia)."}</p>
                ${isSouthRow ? "" : `<p><strong>Frentes:</strong> Vías de acceso de 12.00m (Calle Esteban Arce / Av. Murillo de 20m).</p>
                <div style="margin: 1rem 0; padding: 0.8rem; background: rgba(37,99,235,0.08); border-left: 3px solid #2563eb; border-radius: 4px;">
                  <span style="font-size:0.85rem; color:#345a43; font-weight:600;">Estado por confirmar con el equipo comercial.</span>
                </div>
                <a class="fair-plan-details-btn" href="espacios.html?manzana=${manzanaNum}&lote=${lotNum}#solicitud" style="display:flex;align-items:center;justify-content:center;gap:0.5rem;padding:0.8rem 1.2rem;border-radius:10px;background:#059669;color:#ffffff;font-size:0.86rem;font-weight:800;text-decoration:none;">
                  <span>Ver puestos habilitados para compra</span>
                  &rarr;
                </a>`}
              </div>
            `;
          }
        });
      });

      const manBadges = Array.from(document.querySelectorAll(".manzana-badge, .cad-manzana-badge"));
      manBadges.forEach(badge => {
        const block = badge.closest(".cad-manzana");
        const mNum = badge.getAttribute("data-manzana") || block?.getAttribute("data-manzana") || "Oficial";
        const isSouthRow = Boolean(badge.closest("#cadFinalSouthRow, #cadFinalSouthExtension"));
        badge.addEventListener("click", (e) => {
          e.stopPropagation();
          if (block && !blueprintMode) {
            const rect = block.getBoundingClientRect();
            const svgRect = fairPlanSvg.getBoundingClientRect();
            const { baseW, baseH } = getBaseDimensions();
            focusPoint(
              ((rect.left + rect.width / 2 - svgRect.left) / svgRect.width) * baseW,
              ((rect.top + rect.height / 2 - svgRect.top) / svgRect.height) * baseH,
              Math.max(zoomScale, 3.5)
            );
          }
          if (fairPlanDetails) {
            fairPlanDetails.innerHTML = `
              <div class="fair-plan-details-card">
                <span class="fair-plan-details-kicker">Bloque Maestro</span>
                <h3>Manzana ${mNum}</h3>
                <p>${isSouthRow ? "Manzana ubicada al sur de la Av. Panamericana." : "Bloque con parcelas numeradas y vías de circulación."}</p>
                <p>Amplíe el croquis para consultar los números de sus lotes.</p>
              </div>
            `;
          }
        });
      });
    }

    // Drag with mouse or touch; pinch and wheel zoom keep the same map point under the gesture.
    function bindDragToPan() {
      if (!fairPlanViewport) return;
      const pointers = new Map();
      let dragged = false;
      let suppressClickUntil = 0;

      fairPlanViewport.addEventListener("pointerdown", (e) => {
        if (e.button !== 0 || e.target.closest("button, a")) return;
        if (!pointers.size) {
          dragged = false;
          suppressClickUntil = 0;
        }
        pointers.set(e.pointerId, { x: e.clientX, y: e.clientY, startX: e.clientX, startY: e.clientY });
        e.target.setPointerCapture(e.pointerId);
      });

      fairPlanViewport.addEventListener("pointermove", (e) => {
        const previous = pointers.get(e.pointerId);
        if (!previous) return;
        const before = Array.from(pointers.values());
        const next = { ...previous, x: e.clientX, y: e.clientY };
        pointers.set(e.pointerId, next);
        const after = Array.from(pointers.values());
        if (after.length >= 2) {
          const oldDistance = Math.hypot(before[0].x - before[1].x, before[0].y - before[1].y);
          const newDistance = Math.hypot(after[0].x - after[1].x, after[0].y - after[1].y);
          const rect = fairPlanViewport.getBoundingClientRect();
          const oldX = (before[0].x + before[1].x) / 2 - rect.left - fairPlanViewport.clientLeft;
          const oldY = (before[0].y + before[1].y) / 2 - rect.top - fairPlanViewport.clientTop;
          const newX = (after[0].x + after[1].x) / 2 - rect.left - fairPlanViewport.clientLeft;
          const newY = (after[0].y + after[1].y) / 2 - rect.top - fairPlanViewport.clientTop;
          if (oldDistance > 0) applyZoom(zoomScale * newDistance / oldDistance, oldX, oldY);
          fairPlanViewport.scrollLeft += oldX - newX;
          fairPlanViewport.scrollTop += oldY - newY;
          dragged = true;
        } else {
          if (!dragged && Math.hypot(next.x - next.startX, next.y - next.startY) < 4) return;
          fairPlanViewport.scrollLeft -= next.x - previous.x;
          fairPlanViewport.scrollTop -= next.y - previous.y;
          dragged = true;
        }
        e.preventDefault();
        fittingOverview = false;
        fairPlanViewport.style.cursor = "grabbing";
        if (fairMapTooltip) fairMapTooltip.style.display = "none";
        rememberCamera();
      });

      function finishPointer(e) {
        if (!pointers.delete(e.pointerId)) return;
        if (dragged) suppressClickUntil = performance.now() + 400;
        if (!pointers.size) fairPlanViewport.style.cursor = "grab";
        if (e.target.hasPointerCapture(e.pointerId)) e.target.releasePointerCapture(e.pointerId);
      }
      fairPlanViewport.addEventListener("pointerup", finishPointer);
      fairPlanViewport.addEventListener("pointercancel", finishPointer);
      fairPlanViewport.addEventListener("lostpointercapture", finishPointer);
      fairPlanViewport.addEventListener("click", (e) => {
        if (dragged && performance.now() < suppressClickUntil) {
          e.preventDefault();
          e.stopPropagation();
        }
      }, true);
      fairPlanViewport.addEventListener("dragstart", e => e.preventDefault());
      fairPlanViewport.addEventListener("scroll", rememberCamera, { passive: true });

      fairPlanViewport.addEventListener("keydown", (e) => {
        if (e.target !== fairPlanViewport) return;
        if (["+", "=", "-", "0"].includes(e.key)) {
          e.preventDefault();
          if (e.key === "0") showOverview();
          else applyZoom(e.key === "-" ? zoomScale / zoomFactor : zoomScale * zoomFactor);
        }
      });

      fairPlanViewport.addEventListener("wheel", (e) => {
        if (!e.deltaY) return;
        e.preventDefault();
        const rect = fairPlanViewport.getBoundingClientRect();
        const units = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? fairPlanViewport.clientHeight : 1;
        const factor = Math.exp(Math.max(-0.45, Math.min(0.45, -e.deltaY * units * 0.002)));
        applyZoom(zoomScale * factor,
          e.clientX - rect.left - fairPlanViewport.clientLeft,
          e.clientY - rect.top - fairPlanViewport.clientTop);
      }, { passive: false });
    }

    // Clicking a compact stand block zooms far enough to read its numbering.
    function bindCompactStallZoom() {
      const compactBlocks = document.querySelectorAll(
        "#cadStripComerciantesArtesanos > g[id^='strip']:not(#stripPasarelaCrossing):not(#stripPlazaComidas), #stripPlazaComidas > g[class^='plaza-pabellon'], #cadSectorMaquinariasVehiculos > g[transform]"
      );
      compactBlocks.forEach(block => {
        block.setAttribute("tabindex", "0");
        block.setAttribute("role", "button");
        block.setAttribute("aria-label", "Ampliar puestos de este sector del croquis");

        const focusBlock = () => {
          if (blueprintMode) setPlanMode(false);
          const rect = block.getBoundingClientRect();
          const svgRect = fairPlanSvg.getBoundingClientRect();
          const { baseW, baseH } = getBaseDimensions();
          focusPoint(
            ((rect.left + rect.width / 2 - svgRect.left) / svgRect.width) * baseW,
            ((rect.top + rect.height / 2 - svgRect.top) / svgRect.height) * baseH,
            Math.max(zoomScale, 6.5)
          );
        };

        block.addEventListener("click", focusBlock);
        block.addEventListener("keydown", event => {
          if (event.key !== "Enter" && event.key !== " ") return;
          event.preventDefault();
          focusBlock();
        });
      });
    }

    function refreshPhysicalStandNumbers() {
      document.querySelectorAll("#fairPlanSvg text.inventory-svg-stand").forEach(label => {
        const sectorId = label.dataset.inventorySector;
        const number = Number(label.dataset.inventoryNumber);
        const record = standInventory?.getRecord(sectorId, number);
        const status = record?.status || "unassigned";
        const owner = record?.buyerName && ["reserved", "sold"].includes(status) ? ` · Titular: ${record.buyerName}` : "";
        label.classList.remove("status-unassigned", "status-available", "status-pending", "status-reserved", "status-sold", "status-blocked");
        label.classList.add(`status-${status}`);
        label.classList.toggle("inventory-selected", activeSectorId === sectorId && selectedStandNumber === number);
        label.setAttribute("aria-label", `${standInventory?.getCode(sectorId, number)} · ${standInventory?.labels[status]}${owner}`);
        let title = label.querySelector("title");
        if (!title) {
          title = document.createElementNS("http://www.w3.org/2000/svg", "title");
          label.prepend(title);
        }
        title.textContent = label.getAttribute("aria-label");
      });
    }

    function drawPlantinesInventory() {
      if (standInventory?.getSector("plantines")?.stands !== 38) return;
      const parent = document.getElementById("stripPlantinesViveros");
      if (!parent || document.getElementById("plantinesInventoryLayout")) return;
      parent.classList.add("inventory-corrected");
      const ns = "http://www.w3.org/2000/svg";
      const layout = document.createElementNS(ns, "g");
      layout.id = "plantinesInventoryLayout";
      const zones = [
        { name: "A", first: 1, count: 12, columns: 6, x: 2, y: 0, cell: 6.7, labelY: 24 },
        { name: "B", first: 13, count: 10, columns: 5, x: 48, y: 8, cell: 7.5, labelY: 33 },
        { name: "C", first: 23, count: 16, columns: 4, x: 94, y: 0, cell: 6.7, labelY: 50 }
      ];
      zones.forEach(zone => {
        const group = document.createElementNS(ns, "g");
        group.classList.add("plantines-inventory-zone");
        for (let index = 0; index < zone.count; index++) {
          const x = zone.x + (index % zone.columns) * zone.cell;
          const y = zone.y + Math.floor(index / zone.columns) * 12;
          const rect = document.createElementNS(ns, "rect");
          rect.setAttribute("x", String(x));
          rect.setAttribute("y", String(y));
          rect.setAttribute("width", String(zone.cell - .5));
          rect.setAttribute("height", "7.2");
          rect.setAttribute("rx", ".6");
          const number = document.createElementNS(ns, "text");
          number.setAttribute("x", String(x + (zone.cell - .5) / 2));
          number.setAttribute("y", String(y + 5));
          number.setAttribute("text-anchor", "middle");
          number.textContent = String(zone.first + index);
          group.append(rect, number);
        }
        const caption = document.createElementNS(ns, "text");
        caption.classList.add("plantines-inventory-caption");
        caption.setAttribute("x", String(zone.x + zone.columns * zone.cell / 2));
        caption.setAttribute("y", String(zone.labelY));
        caption.setAttribute("text-anchor", "middle");
        caption.textContent = `Zona ${zone.name}`;
        group.append(caption);
        layout.append(group);
      });
      parent.append(layout);
    }

    function drawGanaderiaExtra() {
      if (standInventory?.getSector("ganaderia")?.stands !== 81) return;
      const south = document.getElementById("ganadoSur");
      if (!south || document.getElementById("ganadoSurExtra")) return;
      const ns = "http://www.w3.org/2000/svg";
      const extra = document.createElementNS(ns, "g");
      extra.id = "ganadoSurExtra";
      for (let number = 51; number <= 55; number++) {
        const x = 112 + (number - 51) * 6.6;
        const rect = document.createElementNS(ns, "rect");
        rect.setAttribute("x", String(x));
        rect.setAttribute("y", "41");
        rect.setAttribute("width", "6.2");
        rect.setAttribute("height", "7");
        const label = document.createElementNS(ns, "text");
        label.setAttribute("x", String(x + 3.1));
        label.setAttribute("y", "46");
        label.setAttribute("text-anchor", "middle");
        label.setAttribute("font-size", "2.2");
        label.textContent = String(number);
        extra.append(rect, label);
      }
      south.append(extra);
    }

    function bindPhysicalStandNumbers() {
      const groups = [
        ["instituciones", "#cadSectorA, #cadSectorB, #cadSectorC", 0],
        ["piscicultura", "#cadPisciculturaSur", 0], ["apicultura", "#cadApiculturaSur", 0],
        ["artesanos", "#stripArtesanosA, #stripArtesanosB", 0], ["bienes-raices", "#stripBienesRaices", 0],
        ["comerciantes", "#stripComerciantesA, #stripComerciantesB, #stripComerciantesC", 0],
        ["industrial", "#stripIndustrialA, #stripIndustrialB, #stripIndustrialC", 0],
        ["empresarial", "#stripEmpresarialA, #stripEmpresarialB", 0],
        ["mobiliario", "#stripMobiliarioMadera", 0], ["maquinaria", "#cadSectorMaquinariasVehiculos", 0],
        ["plaza-comidas", "#stripPlazaComidas", 0], ["plantines", "#plantinesInventoryLayout", 0],
        ["ganaderia", "#ganadoNorte", 0], ["ganaderia", "#ganadoSur", 26]
      ];
      for (const [sectorId, selector, offset] of groups) {
        const max = standInventory?.getSector(sectorId)?.stands || 0;
        document.querySelectorAll(selector).forEach(group => {
          group.querySelectorAll("text").forEach(label => {
            const raw = label.textContent.trim();
            if (!/^\d{1,3}$/.test(raw)) return;
            const number = Number(raw) + offset;
            if (number < 1 || number > max) return;
            label.classList.add("inventory-svg-stand");
            label.dataset.inventorySector = sectorId;
            label.dataset.inventoryNumber = String(number);
            label.setAttribute("role", "button");
            label.setAttribute("tabindex", "0");
            label.addEventListener("click", event => {
              event.stopPropagation();
              selectSector(sectorId, number, false);
            });
            label.addEventListener("keydown", event => {
              if (event.key !== "Enter" && event.key !== " ") return;
              event.preventDefault();
              selectSector(sectorId, number, false);
            });
          });
        });
      }
      refreshPhysicalStandNumbers();
    }

    // Preset Focus Buttons
    presetButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        presetButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const presetKey = btn.getAttribute("data-preset");
        const preset = cameraPresets[presetKey];
        if (presetKey === "all") {
          showOverview();
        } else if (preset) {
          if (blueprintMode) setPlanMode(false);
          focusPoint(preset.x, preset.y, preset.zoom);
        }
      });
    });

    // Category Chips
    categoryChips.forEach(chip => {
      chip.addEventListener("click", () => {
        categoryChips.forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        currentCategoryFilter = chip.getAttribute("data-cat") || "all";
        filterSectors();
      });
    });

    // Each drawing keeps its own proportions, without overlapping the two plans.
    function setPlanMode(useBlueprint) {
      blueprintMode = useBlueprint;
      btnModeVector.classList.toggle("active", !useBlueprint);
      btnModeBlueprint.classList.toggle("active", useBlueprint);
      btnModeVector.setAttribute("aria-pressed", String(!useBlueprint));
      btnModeBlueprint.setAttribute("aria-pressed", String(useBlueprint));
      fairPlanBlueprintImg.style.display = useBlueprint ? "block" : "none";
      fairPlanSvg.style.display = useBlueprint ? "none" : "block";
      if (fairMapTooltip) fairMapTooltip.style.display = "none";
      showOverview();
    }

    if (btnModeVector && btnModeBlueprint) {
      btnModeVector.addEventListener("click", () => setPlanMode(false));
      btnModeBlueprint.addEventListener("click", () => setPlanMode(true));
      fairPlanBlueprintImg.addEventListener("load", () => {
        if (blueprintMode) showOverview();
      });
    }

    // Search and Clear Inputs
    if (fairPlanSearch) {
      fairPlanSearch.addEventListener("input", event => {
        currentQuery = event.target.value;
        filterSectors();
      });
      fairPlanSearch.addEventListener("keydown", event => {
        if (event.key === "Escape" && fairPlanSearch.value) {
          fairPlanSearch.value = "";
          currentQuery = "";
          filterSectors();
        }
      });
    }

    if (fairPlanClear) {
      fairPlanClear.addEventListener("click", () => {
        if (fairPlanSearch) fairPlanSearch.value = "";
        currentQuery = "";
        filterSectors();
        if (fairPlanSearch) fairPlanSearch.focus();
      });
    }

    // Zoom Controls (+ / - / Reset)
    fairPlanZoomControls.forEach(control => {
      control.addEventListener("click", event => {
        event.preventDefault();
        const command = String(control.getAttribute("data-fair-plan-zoom") || "").toLowerCase();
        if (["in", "+", "plus", "zoom-in"].includes(command)) {
          applyZoom(zoomScale * zoomFactor);
        } else if (["out", "-", "minus", "zoom-out"].includes(command)) {
          applyZoom(zoomScale / zoomFactor);
        } else if (["reset", "0", "default"].includes(command)) {
          showOverview();
        }
      });
    });

    if (fairPlanReset) {
      fairPlanReset.addEventListener("click", (e) => {
        e.preventDefault();
        presetButtons.forEach(b => b.classList.toggle("active", b.getAttribute("data-preset") === "all"));
        showOverview();
      });
    }

    // Initial Execution
    renderSectorList();
    renderDetails(null);
    window.addEventListener("fitrop:inventory-change", () => {
      fairPlanSectors.forEach(sector => {
        const count = listButtonsById.get(sector.id)?.querySelector(".fair-plan-sector-count");
        if (!count) return;
        const available = sector.sellable ? standInventory?.summary(fairPlanCatalog, sector.id).available || 0 : 0;
        count.textContent = sector.sellable === false ? "Área recreativa" : `${sector.stands} puestos${available ? ` · ${available} ${available === 1 ? "disponible" : "disponibles"}` : ""}`;
      });
      if (activeSectorId) renderDetails(sectorsById.get(activeSectorId));
      refreshPhysicalStandNumbers();
    });
    bindSvgSectors();
    bindDragToPan();
    bindCompactStallZoom();
    drawPlantinesInventory();
    drawGanaderiaExtra();
    bindPhysicalStandNumbers();
    filterSectors();
    const requestedStand = new URLSearchParams(window.location.search);
    if (requestedStand.has("sector") && sectorsById.has(requestedStand.get("sector"))) {
      selectSector(requestedStand.get("sector"), requestedStand.get("stand"));
    } else if (requestedStand.has("manzana") && requestedStand.has("lote")) {
      const manzana = requestedStand.get("manzana");
      const lote = requestedStand.get("lote");
      const badge = Array.from(document.querySelectorAll(".cad-lot-badge")).find(element =>
        element.getAttribute("data-lot") === lote &&
        (element.getAttribute("data-manzana") || element.closest(".cad-manzana")?.getAttribute("data-manzana") || "109") === manzana
      );
      if (badge) badge.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    }

    // Also initialize when navigation reveals the previously hidden croquis.
    if (fairPlanViewport && fairPlanSvg) {
      const resizeObserver = new ResizeObserver(() => {
        if (!fairPlanViewport.clientWidth || !fairPlanViewport.clientHeight) return;
        if (fittingOverview) showOverview();
        else centerPlan(cameraReady ? cameraCenter.x : 0.5, cameraReady ? cameraCenter.y : 0.5);
      });
      resizeObserver.observe(fairPlanViewport);
    }

  }

  // ==========================================================================
  // AGENTE 3: NAVEGACIÓN MÓVIL (OFF-CANVAS DRAWER ACCESIBLE)
  // ==========================================================================
  function initMobileNavigation() {
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const mobileDrawer = document.getElementById("mobileDrawer");
    const mobileDrawerOverlay = document.getElementById("mobileDrawerOverlay");

    if (!mobileMenuBtn || !mobileDrawer) return;

    function openDrawer() {
      mobileMenuBtn.classList.add("active");
      mobileMenuBtn.setAttribute("aria-expanded", "true");
      mobileDrawer.classList.add("open");
      if (mobileDrawerOverlay) mobileDrawerOverlay.classList.add("active");
      document.body.style.overflow = "hidden";
    }

    function closeDrawer() {
      mobileMenuBtn.classList.remove("active");
      mobileMenuBtn.setAttribute("aria-expanded", "false");
      mobileDrawer.classList.remove("open");
      if (mobileDrawerOverlay) mobileDrawerOverlay.classList.remove("active");
      document.body.style.overflow = "";
    }

    mobileMenuBtn.addEventListener("click", () => {
      const isOpen = mobileDrawer.classList.contains("open");
      if (isOpen) closeDrawer();
      else openDrawer();
    });

    if (mobileDrawerOverlay) {
      mobileDrawerOverlay.addEventListener("click", closeDrawer);
    }

    document.querySelectorAll(".mobile-nav-link").forEach(link => {
      link.addEventListener("click", () => {
        closeDrawer();
      });
    });

    document.querySelectorAll(".m-lang-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const lang = btn.getAttribute("data-lang");
        if (lang) {
          applyLanguage(lang);
          closeDrawer();
        }
      });
    });
  }

  // ==========================================================================
  // AGENTE 4: CINEMÁTICA Y ANIMACIONES FLUIDAS (ANIME.JS & DESIGN SPELLS)
  // ==========================================================================
  function initKineticAnimations() {
    const prefersReducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // 1. Efecto Shimmer y Glow en tarjetas interactivas (Design Spells)
    document.querySelectorAll(".stat-card, .pavilion-card, .exhibitor-card, .fed-card, .concert-card, .pricing-card").forEach(el => {
      el.classList.add("spell-glow-card");
    });

    document.querySelectorAll(".btn-primary, .nav-link-cta").forEach(el => {
      el.classList.add("spell-btn-shine");
    });

    const heroPill = document.querySelector(".hero-pill-badge");
    if (heroPill) heroPill.classList.add("spell-pulse-badge");

    // 2. Si Anime.js está disponible, orquestar entrada del Hero
    if (typeof anime !== "undefined") {
      anime.timeline({ easing: "easeOutExpo" })
        .add({
          targets: ".hero-pill-badge",
          opacity: [0, 1],
          translateY: [-20, 0],
          duration: 800
        })
        .add({
          targets: ".hero-headline",
          opacity: [0, 1],
          translateY: [30, 0],
          duration: 1000
        }, "-=600")
        .add({
          targets: ".hero-subtext",
          opacity: [0, 1],
          translateY: [20, 0],
          duration: 900
        }, "-=700")
        .add({
          targets: ".hero-organizers-showcase",
          opacity: [0, 1],
          scale: [0.96, 1],
          duration: 800
        }, "-=600")
        .add({
          targets: ".hero-cta-group .btn",
          opacity: [0, 1],
          translateY: [15, 0],
          delay: anime.stagger(100),
          duration: 700
        }, "-=600")
        .add({
          targets: ".hero-countdown-box",
          opacity: [0, 1],
          translateY: [20, 0],
          duration: 800
        }, "-=500")
        .add({
          targets: ".stats-strip .stat-card",
          opacity: [0, 1],
          translateY: [25, 0],
          delay: anime.stagger(80),
          duration: 800
        }, "-=600");

      // 3. Contadores Numéricos Cinéticos con IntersectionObserver
      const counterEls = document.querySelectorAll(".counter[data-target]");
      if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, obs) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const el = entry.target;
              const targetVal = parseFloat(el.getAttribute("data-target")) || 0;
              const obj = { val: 0 };
              anime({
                targets: obj,
                val: targetVal,
                round: 1,
                easing: "easeOutExpo",
                duration: 2200,
                update: function() {
                  el.textContent = obj.val.toLocaleString();
                }
              });
              obs.unobserve(el);
            }
          });
        }, { threshold: 0.3 });

        counterEls.forEach(el => observer.observe(el));
      }
    }
  }

  // Inicializar componentes
  applyLanguage(state.lang);
  const initialView = window.location.hash.replace('#', '') || 'inicio';
  switchView(initialView, false);
  renderSchedule();
  renderConcerts();
  initProduccionModule();
  initCochabambaMap();
  initFairPlan();
  initMobileNavigation();
  // La identidad editorial usa transiciones discretas; evita ocultar el contenido al cargar.
});

