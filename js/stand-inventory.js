/* Browser-local inventory. Each sellable stand has one record and public owner. */
(function () {
  "use strict";

  const STORAGE_KEY = "fitrop_stand_inventory_v2";
  const LEGACY_KEY = "fitrop_stand_inventory_v1";
  const STATUSES = ["unassigned", "available", "pending", "reserved", "sold", "blocked"];
  const LABELS = {
    unassigned: "Por confirmar",
    available: "Disponible",
    pending: "En proceso de compra",
    reserved: "Reservado",
    sold: "Vendido",
    blocked: "Fuera de venta"
  };
  const CATALOG = [
    { id: "instituciones", name: "Instituciones", stands: 93 },
    { id: "piscicultura", name: "Piscicultura", stands: 16 },
    { id: "apicultura", name: "Apicultura", stands: 19 },
    { id: "cacao", name: "Cacao", stands: 12 },
    { id: "pina", name: "Piña", stands: 12 },
    { id: "banano", name: "Banano", stands: 12 },
    { id: "pitahaya", name: "Pitahaya", stands: 12 },
    { id: "palmito", name: "Palmito", stands: 12 },
    { id: "hoja-coca", name: "Hoja de coca", stands: 38 },
    { id: "materiales", name: "Materiales y agregados", stands: 20 },
    { id: "turismo", name: "Turismo y hotelería", stands: 30 },
    { id: "juegos", name: "Juegos infantiles", stands: 48, sellable: false },
    { id: "maquinaria", name: "Maquinaria y vehículos", stands: 110 },
    { id: "empresarial", name: "Empresarial", stands: 67 },
    { id: "industrial", name: "Industrial", stands: 105 },
    { id: "bienes-raices", name: "Bienes raíces", stands: 24 },
    { id: "artesanos", name: "Artesanos", stands: 72 },
    { id: "comerciantes", name: "Comerciantes", stands: 84 },
    { id: "mobiliario", name: "Mobiliario y madera", stands: 36 },
    { id: "plantines", name: "Plantines y viveros", stands: 38 },
    { id: "ganaderia", name: "Ganadería", stands: 81 },
    { id: "plaza-comidas", name: "Plaza de comidas", stands: 141 }
  ];
  const META = {
    instituciones: { code: "INS", location: "Plaza 25 de Septiembre", zones: [[1,29,"A"],[30,61,"B"],[62,93,"C"]] },
    piscicultura: { code: "PSI", location: "Plaza 25 de Septiembre", zones: [[1,16,"A"]] },
    apicultura: { code: "A-P", location: "Frente a Plaza 25 de Septiembre", zones: [[1,19,"A"]] },
    banano: { code: "F-B", location: "Av. Santa Cruz", zones: [[1,12,"A"]] },
    pina: { code: "F-PN", location: "Av. Santa Cruz", zones: [[1,12,"A"]] },
    cacao: { code: "F-CH", location: "Av. Santa Cruz", zones: [[1,12,"A"]] },
    pitahaya: { code: "F-PH", location: "Av. Santa Cruz", zones: [[1,12,"A"]] },
    palmito: { number: 4, code: "F-P", location: "Av. Santa Cruz", zones: [[1,12,"A"]] },
    "hoja-coca": { number: 4, code: "H-C", location: "Av. Santa Cruz", zones: [[1,38,"A"]] },
    materiales: { code: "AR-AG", location: "Av. Santa Cruz", zones: [[1,20,"A"]] },
    turismo: { code: "T-H", location: "Calles La Paz y Sucre", zones: [[1,16,"A"],[17,30,"B"]] },
    ganaderia: { code: "G", location: "Av. Panamericana", zones: [[1,26,"Norte"],[27,81,"Sur"]] },
    plantines: { code: "PV", location: "Av. Panamericana", zones: [[1,12,"A"],[13,22,"B"],[23,38,"C"]] },
    maquinaria: { code: "MVI", location: "Av. Panamericana, frente a bancos B/ Litoral", zones: [[1,110,"A"]] },
    mobiliario: { code: "MM", location: "Av. Panamericana", zones: [[1,36,"A"]] },
    empresarial: { code: "EMP", location: "Av. Panamericana", zones: [[1,18,"A"],[19,49,"B"],[50,67,"A"]] },
    industrial: { code: "IND", location: "Av. Panamericana", zones: [[1,15,"A"],[16,33,"B"],[35,51,"C"],[52,69,"D"],[70,87,"C"],[88,105,"A"]] },
    "bienes-raices": { code: "BR", location: "Av. Panamericana", zones: [[1,24,"A"]] },
    artesanos: { code: "ART", location: "Av. Panamericana", zones: [[1,18,"A"],[19,54,"B"],[55,72,"A"]] },
    comerciantes: { code: "CO", location: "Av. Panamericana", zones: [[1,18,"A"],[19,36,"B"],[37,48,"C"],[49,66,"B"]] },
    "plaza-comidas": { code: "P-C", location: "Av. Panamericana, barrios Jordán y Petrolero", zones: [[1,141,"A"]] },
    juegos: { number: 20, code: "J-I", location: "Calle La Paz y Segunda Independencia", zones: [[1,48,"A"]] }
  };
  CATALOG.forEach(sector => Object.assign(sector, META[sector.id]));
  const CATALOG_BY_ID = new Map(CATALOG.map(sector => [sector.id, sector]));
  const SELLABLE_CATALOG = CATALOG.filter(sector => sector.sellable !== false);
  const TOTAL_SELLABLE = SELLABLE_CATALOG.reduce((sum, sector) => sum + sector.stands, 0);

  function load() {
    try {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      if (data && typeof data === "object" && !Array.isArray(data)) return data;
      const old = JSON.parse(localStorage.getItem(LEGACY_KEY) || "{}");
      const migrated = {};
      for (const [key, status] of Object.entries(old)) {
        const [sectorId, numberText] = key.split(":");
        const sector = CATALOG_BY_ID.get(sectorId);
        const number = Number(numberText);
        if (sector && sector.sellable !== false && Number.isSafeInteger(number) && number >= 1 && number <= sector.stands && STATUSES.includes(status)) {
          migrated[key] = { status };
        }
      }
      return migrated;
    } catch (_) {
      return {};
    }
  }

  let entries = load();
  let adminMode = false;
  const keyFor = (sectorId, number) => `${sectorId}:${number}`;
  const clean = (value, max) => String(value || "").trim().slice(0, max);

  function getRecord(sectorId, number) {
    const entry = entries[keyFor(sectorId, number)] || {};
    return {
      status: STATUSES.includes(entry.status) ? entry.status : "unassigned",
      buyerName: clean(entry.buyerName, 100),
      organization: clean(entry.organization, 100),
      phone: clean(entry.phone, 40),
      notes: clean(entry.notes, 300),
      updatedAt: entry.updatedAt || ""
    };
  }
  function getStatus(sectorId, number) { return getRecord(sectorId, number).status; }
  function getSector(sectorId) { return CATALOG_BY_ID.get(sectorId) || null; }
  function getZone(sectorId, number) {
    return getSector(sectorId)?.zones.find(([first, last]) => number >= first && number <= last)?.[2] || "Por confirmar";
  }
  function getCode(sectorId, number) {
    const sector = getSector(sectorId);
    if (!sector) return String(number);
    if (sectorId === "ganaderia") {
      const north = number <= 26;
      return `${north ? "GN" : "GS"}-${String(north ? number : number - 26).padStart(2, "0")}`;
    }
    return `${sector.code}-${String(number).padStart(3, "0")}`;
  }

  function hydrate(data) {
    if (!data || typeof data !== "object" || Array.isArray(data)) return;
    if (JSON.stringify(entries) === JSON.stringify(data)) return;
    entries = data;
    window.dispatchEvent(new CustomEvent("fitrop:inventory-change"));
  }
  async function refresh() {
    if (adminMode) return false;
    try {
      const response = await fetch("/api/inventory", { cache: "no-store" });
      if (!response.ok) return false;
      hydrate((await response.json()).inventory);
      return true;
    } catch (_) { return false; }
  }
  function setAdminMode(value) { adminMode = Boolean(value); }

  function summary(catalog = SELLABLE_CATALOG, sectorId) {
    const result = Object.fromEntries(STATUSES.map(status => [status, 0]));
    result.total = 0;
    for (const sector of catalog) {
      if (sectorId && sector.id !== sectorId) continue;
      for (let number = 1; number <= sector.stands; number++) {
        result[getStatus(sector.id, number)]++;
        result.total++;
      }
    }
    return result;
  }
  function exportData() {
    const rows = [];
    for (const sector of SELLABLE_CATALOG) {
      for (let number = 1; number <= sector.stands; number++) {
        rows.push({ sector: sector.name, sectorId: sector.id, number, code: getCode(sector.id, number), zone: getZone(sector.id, number), location: sector.location, ...getRecord(sector.id, number) });
      }
    }
    return rows;
  }

  window.addEventListener("focus", refresh);
  window.fitropStandInventory = { getRecord, getStatus, getSector, getZone, getCode, hydrate, refresh, setAdminMode, summary, exportData, labels: LABELS, statuses: STATUSES, catalog: CATALOG, sellableCatalog: SELLABLE_CATALOG, totalSellable: TOTAL_SELLABLE };
  refresh();
  setInterval(() => { if (document.visibilityState === "visible") refresh(); }, 15000);
})();
