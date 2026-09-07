import { createStore } from "./state.mjs";
import { icon, empty, toast } from "./ui.mjs";
import {
  homeView,
  modulesView,
  moduleCard,
  savedView,
  progressView,
  projectsView,
  moduleView,
} from "./views.mjs";
import { loadModule } from "./learning.mjs";
import { playgroundView, initPlayground } from "./playground.mjs";

const store = createStore();
let catalog,
  controller,
  currentRoute = "",
  firstRender = true,
  focusSearchOnRender = false;
const app = document.querySelector("#app");
const preferences = () => {
  const state = store.get();
  document.documentElement.classList.toggle("large-text", state.largeText);
  document.documentElement.classList.toggle(
    "reduce-motion",
    state.reduceMotion,
  );
};
preferences();

function shell() {
  app.innerHTML = `<header class="site-header"><div class="container header-inner"><a class="brand" href="#/" aria-label="Praktika, beranda"><span class="brand-mark">${icon("code", 21)}</span>praktika<span class="brand-dot">.</span></a><nav id="primary-nav" class="primary-nav" aria-label="Navigasi utama"><a href="#/" data-nav="home">Beranda</a><a href="#/modules" data-nav="modules">Modul belajar</a><a href="#/projects" data-nav="projects">Tantangan</a><a href="#/playground" data-nav="playground">Playground<span class="nav-dot"></span></a></nav><div class="header-actions"><button id="open-search" class="header-search" aria-label="Cari materi">${icon("search", 18)}<span>Cari…</span><kbd>/</kbd></button><a href="#/saved" class="icon-button header-saved" aria-label="Modul tersimpan">${icon("bookmark", 19)}</a><button id="open-settings" class="icon-button" aria-label="Pengaturan kenyamanan belajar">${icon("settings", 19)}</button><a class="button secondary progress-link" href="#/progress">${icon("chart", 17)} Progresku</a><button id="menu-toggle" class="icon-button menu-toggle" aria-label="Buka navigasi" aria-expanded="false" aria-controls="primary-nav">${icon("menu", 22)}</button></div></div></header><main id="main" tabindex="-1"></main><footer class="site-footer"><div class="container footer-main"><div><a class="brand" href="#/">praktika<span class="brand-dot">.</span></a><p>Baris pertama. Kemungkinan tak terbatas.</p></div><nav aria-label="Navigasi footer"><a href="#/modules">Modul belajar</a><a href="#/playground">Playground</a><a href="#/saved">Tersimpan</a><a href="https://github.com/hamadazein/praktikum-web" target="_blank" rel="noopener noreferrer">Kode sumber ${icon("external", 13)}<span class="sr-only"> (tab baru)</span></a></nav></div><div class="container footer-bottom"><span>Dibuat untuk rasa ingin tahu yang tidak pernah habis.</span><span>Belajar terbuka, tumbuh bersama. ${icon("spark", 14)}</span></div></footer><dialog id="settings-dialog" aria-labelledby="settings-title"><div class="dialog-heading"><div><span class="section-label">Nyaman dengan caramu</span><h2 id="settings-title">Ruang belajar untukmu.</h2></div><button class="icon-button" id="close-settings" aria-label="Tutup pengaturan">${icon("close")}</button></div><p class="settings-intro">Sesuaikan tampilan agar kamu bisa fokus pada hal yang sedang dipelajari.</p><label class="preference-row"><span><strong>Teks lebih besar</strong><small>Perbesar tulisan di seluruh ruang belajar.</small></span><input type="checkbox" id="large-text" role="switch"></label><label class="preference-row"><span><strong>Kurangi animasi</strong><small>Tampilan lebih tenang saat berinteraksi.</small></span><input type="checkbox" id="reduce-motion" role="switch"></label><p class="settings-note">Preferensi, progres, dan draft disimpan pada browser ini.</p></dialog>`;
  const menu = document.querySelector("#menu-toggle");
  const closeMenu = () => {
    menu.setAttribute("aria-expanded", "false");
    menu.setAttribute("aria-label", "Buka navigasi");
    document.querySelector("#primary-nav").classList.remove("open");
  };
  menu.addEventListener("click", () => {
    const open = menu.getAttribute("aria-expanded") !== "true";
    menu.setAttribute("aria-expanded", String(open));
    menu.setAttribute("aria-label", open ? "Tutup navigasi" : "Buka navigasi");
    document.querySelector("#primary-nav").classList.toggle("open", open);
  });
  document.querySelector("#primary-nav").addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
  const settings = document.querySelector("#settings-dialog");
  document.querySelector("#open-settings").addEventListener("click", () => {
    document.querySelector("#large-text").checked = store.get().largeText;
    document.querySelector("#reduce-motion").checked = store.get().reduceMotion;
    settings.showModal();
  });
  document
    .querySelector("#close-settings")
    .addEventListener("click", () => settings.close());
  [
    ["large-text", "largeText"],
    ["reduce-motion", "reduceMotion"],
  ].forEach(([id, key]) =>
    document.querySelector("#" + id).addEventListener("change", (event) => {
      store.preference(key, event.target.checked);
      preferences();
      if (!store.persistent)
        toast("Preferensi aktif untuk sesi ini; penyimpanan browser diblokir.");
    }),
  );
  document.querySelector("#open-search").addEventListener("click", openSearch);
  document.querySelector(".skip-link").addEventListener("click", (event) => {
    event.preventDefault();
    document.querySelector("#main").focus();
    document.querySelector("#main").scrollIntoView();
  });
  document.addEventListener("keydown", (event) => {
    const editing = event.target.closest(
      "input,textarea,select,[contenteditable=true]",
    );
    if (
      ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") ||
      (event.key === "/" && !editing && !event.ctrlKey && !event.metaKey)
    ) {
      if (document.querySelector("dialog[open]")) return;
      event.preventDefault();
      openSearch();
    }
  });
  document.querySelector("#main").addEventListener("click", (event) => {
    const button = event.target.closest("[data-save]");
    if (!button) return;
    const id = button.dataset.save;
    store.bookmark(id);
    const saved = store.get().saved.includes(id);
    document.querySelectorAll(`[data-save="${id}"]`).forEach((item) => {
      item.setAttribute("aria-pressed", String(saved));
      item.classList.toggle("is-saved", saved);
      const module = catalog.modules.find((item) => item.id === id);
      item.setAttribute(
        "aria-label",
        item.id === "save-module"
          ? saved
            ? "Hapus simpanan"
            : "Simpan modul"
          : `${saved ? "Hapus simpanan" : "Simpan"} ${module.title}`,
      );
      if (item.id === "save-module")
        item.innerHTML =
          icon("bookmark", 16) + (saved ? " Tersimpan" : " Simpan modul");
    });
    toast(
      store.persistent
        ? saved
          ? "Modul disimpan. Kembali kapan pun kamu siap."
          : "Modul dihapus dari simpanan."
        : "Simpanan tersedia untuk sesi ini. Penyimpanan browser diblokir.",
    );
    if (currentRoute === "/saved") {
      document.querySelector("#main").innerHTML = savedView(
        catalog,
        store.get(),
      );
      document.querySelector("#main").focus({ preventScroll: true });
    }
    const shortcut = document.querySelector(".saved-shortcut small");
    if (shortcut)
      shortcut.textContent = `${store.get().saved.length} modul untuk nanti`;
  });
}

function openSearch() {
  if (currentRoute === "/modules")
    document.querySelector("#catalog-search").focus();
  else {
    focusSearchOnRender = true;
    location.hash = "#/modules";
  }
}

function initCatalog(params, signal) {
  const input = document.querySelector("#catalog-search");
  let category = params.get("category") || "Semua";
  if (
    !["Semua", "Fondasi", "Framework", "JavaScript", "Backend"].includes(
      category,
    )
  )
    category = "Semua";
  const filter = () => {
    const terms = input.value
      .toLocaleLowerCase("id")
      .trim()
      .split(/\s+/)
      .filter(Boolean);
    const matches = catalog.modules.filter((module) => {
      const haystack = [
        module.title,
        module.description,
        module.subtitle,
        module.tech,
        ...module.objectives,
        ...catalog.exercises
          .filter((item) => item.module === module.id)
          .flatMap((item) => [item.title, item.path]),
      ]
        .join(" ")
        .toLocaleLowerCase("id");
      return (
        (category === "Semua" || module.category === category) &&
        terms.every((term) => haystack.includes(term))
      );
    });
    document.querySelector("#result-count").textContent =
      `${matches.length} dari ${catalog.modules.length} modul`;
    document.querySelector("#module-results").innerHTML = matches.length
      ? `<div class="catalog-grid">${matches.map((module) => moduleCard(module, catalog, store.get())).join("")}</div>`
      : empty(
          "Belum ketemu? Coba kata lain.",
          "Gunakan kata kunci seperti HTML, warna, atau JavaScript. Kamu juga bisa membuka semua modul.",
          '<button class="button primary" id="clear-search">Tampilkan semua modul ' +
            icon("arrow", 17) +
            "</button>",
        );
    document.querySelector("#clear-search")?.addEventListener("click", () => {
      input.value = "";
      category = "Semua";
      filter();
      input.focus();
    });
    document.querySelectorAll("[data-filter]").forEach((button) => {
      const active = button.dataset.filter === category;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    const query = new URLSearchParams();
    if (input.value.trim()) query.set("q", input.value.trim());
    if (category !== "Semua") query.set("category", category);
    history.replaceState(null, "", `#/modules${query.size ? "?" + query : ""}`);
  };
  input.addEventListener("input", filter, { signal });
  document.querySelectorAll("[data-filter]").forEach((button) =>
    button.addEventListener(
      "click",
      () => {
        category = button.dataset.filter;
        filter();
      },
      { signal },
    ),
  );
  filter();
}

function initDemo(signal) {
  let count = 0;
  const canvas = document.querySelector("#demo-canvas");
  const captions = {
    html: "Mulai dari struktur. HTML memberi tempat untuk setiap ide.",
    css: "Tambahkan karakter. CSS mengatur warna, jarak, dan bentuk.",
    js: "Sekarang hidup! Coba klik “Kasih semangat”.",
  };
  document.querySelectorAll("[data-stage]").forEach((button) => {
    if (button.tagName !== "BUTTON") return;
    button.addEventListener(
      "click",
      () => {
        canvas.dataset.stage = button.dataset.stage;
        document.querySelectorAll(".demo-switch button").forEach((item) => {
          const active = item === button;
          item.classList.toggle("active", active);
          item.setAttribute("aria-pressed", String(active));
        });
        document.querySelector("#demo-caption").textContent =
          captions[button.dataset.stage];
        document.querySelector("#demo-like").disabled =
          button.dataset.stage !== "js";
      },
      { signal },
    );
  });
  document.querySelector("#demo-like").addEventListener(
    "click",
    () => {
      document.querySelector("#demo-count").textContent = ++count;
      document.querySelector("#demo-caption").textContent =
        `${count} semangat terkirim! JavaScript mengubah halaman lewat interaksi.`;
    },
    { signal },
  );
}

async function render() {
  const legacy = location.hash.match(/^#pertemuan-(0[1-7])/);
  if (legacy) {
    location.replace("#/module/" + legacy[1]);
    return;
  }
  controller?.abort();
  controller = new AbortController();
  const signal = controller.signal;
  const [rawPath, query = ""] = (location.hash.slice(1) || "/").split("?");
  const path = rawPath.replace(/\/$/, "") || "/";
  const params = new URLSearchParams(query);
  const sameModule = currentRoute === path && path.startsWith("/module/");
  currentRoute = path;
  const main = document.querySelector("#main"),
    state = store.get();
  document.body.classList.remove("reading-focus");
  document.body.dataset.page = path.split("/")[1] || "home";
  let title = "Dari belajar, jadi berkarya.",
    nav = "home";
  if (path === "/") main.innerHTML = homeView(catalog, state);
  else if (path === "/modules") {
    title = "Modul belajar";
    nav = "modules";
    main.innerHTML = modulesView(catalog, params.get("q") || "");
    initCatalog(params, signal);
  } else if (path === "/saved") {
    title = "Modul tersimpan";
    nav = "saved";
    main.innerHTML = savedView(catalog, state);
  } else if (path === "/progress") {
    title = "Perjalanan belajarmu";
    nav = "progress";
    main.innerHTML = progressView(catalog, state);
  } else if (path === "/projects") {
    title = "Tantangan";
    nav = "projects";
    main.innerHTML = projectsView(catalog);
  } else if (path === "/playground") {
    title = "Playground";
    nav = "playground";
    main.innerHTML = playgroundView(params.get("project"));
    initPlayground(params.get("project"), signal);
  } else if (/^\/module\/0[1-7]$/.test(path)) {
    const module = catalog.modules.find(
      (item) => item.id === path.split("/")[2],
    );
    const tab = ["practice", "quiz"].includes(params.get("tab"))
      ? params.get("tab")
      : "guide";
    title = module.title;
    nav = "modules";
    main.innerHTML = moduleView(module, catalog, state, tab);
    const tabs = Array.from(main.querySelectorAll("[role=tab]"));
    tabs.forEach((item, index) => {
      item.id = "module-tab-" + index;
      item.tabIndex = item.getAttribute("aria-selected") === "true" ? 0 : -1;
    });
    main
      .querySelector("#module-panel")
      .setAttribute(
        "aria-labelledby",
        tabs.find((item) => item.getAttribute("aria-selected") === "true").id,
      );
    main.querySelector(".module-tabs").addEventListener(
      "keydown",
      (event) => {
        if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key))
          return;
        event.preventDefault();
        const index = tabs.indexOf(event.target);
        const next =
          event.key === "Home"
            ? 0
            : event.key === "End"
              ? 2
              : (index + (event.key === "ArrowRight" ? 1 : -1) + 3) % 3;
        tabs[next].focus();
        tabs[next].click();
      },
      { signal },
    );
    void loadModule(module, catalog, store, tab, params, signal);
  } else {
    title = "Halaman belum ditemukan";
    nav = "";
    main.innerHTML = `<div class="container inner-page">${empty("Sepertinya kamu tersesat sedikit.", "Halaman ini belum ada. Masih banyak hal menarik untuk dipelajari di katalog modul.")}</div>`;
  }
  if (path === "/") initDemo(signal);
  document.title = `${title} — Praktika`;
  document.querySelectorAll("[data-nav]").forEach((link) => {
    const active = link.dataset.nav === nav;
    link.classList.toggle("active", active);
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
  document
    .querySelector(".header-saved")
    .classList.toggle("active", nav === "saved");
  document
    .querySelector(".progress-link")
    .classList.toggle("active", nav === "progress");
  if (!firstRender) {
    const target = sameModule
      ? main.querySelector(".module-tabs [aria-selected=true]")
      : main;
    target?.focus({ preventScroll: true });
    if (!params.has("exercise")) {
      if (sameModule)
        main.querySelector(".module-tabs").scrollIntoView({ block: "start" });
      else window.scrollTo(0, 0);
    }
  }
  firstRender = false;
  if (focusSearchOnRender && path === "/modules") {
    focusSearchOnRender = false;
    document.querySelector("#catalog-search").focus();
  }
}

async function boot() {
  try {
    const response = await fetch("assets/data/catalog.json");
    if (!response.ok) throw Error("Catalog unavailable");
    catalog = await response.json();
    shell();
    await render();
    window.addEventListener("hashchange", render);
  } catch {
    app.innerHTML = `<main id="main" class="boot" tabindex="-1"><h1>Ruang belajarmu belum termuat.</h1><p>Periksa koneksi lalu muat ulang untuk mencoba lagi.</p><button class="button primary" id="retry-app">Muat ulang</button><a href="https://github.com/hamadazein/praktikum-web">Buka materi asli di GitHub ${icon("external", 15)}</a></main>`;
    document
      .querySelector("#retry-app")
      .addEventListener("click", () => location.reload());
  }
}
void boot();
