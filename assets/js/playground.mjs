import { icon, escapeHTML as e, toast, download } from "./ui.mjs";
import { buildDocument } from "./sandbox.mjs";
import { presets } from "./presets.mjs";
const selectProject = (project) =>
  Object.hasOwn(presets, project) ? project : "profile";

export function playgroundView(project) {
  const selected = selectProject(project),
    preset = presets[selected];
  return `<div class="container playground-page"><div class="playground-heading"><div><span class="section-label">Ruang eksperimenmu</span><h1>Coba idenya.<br><span>Lihat jadinya.</span></h1><p>HTML, CSS, dan JavaScript. Satu tempat untuk menemukan “oh, ternyata!”.</p></div><span class="playground-heading-art" aria-hidden="true">{<i>✳</i>}</span></div><div class="experiment-bar"><label for="experiment">Mulai dari contoh<select id="experiment">${Object.entries(
    presets,
  )
    .map(
      ([id, item]) =>
        `<option value="${id}" ${id === selected ? "selected" : ""}>${item.name}</option>`,
    )
    .join(
      "",
    )}</select></label><p>${preset.description}</p></div><div class="editor-toolbar"><div class="editor-tabs" role="tablist" aria-label="Bahasa kode">${[
    ["html", "HTML"],
    ["css", "CSS"],
    ["js", "JavaScript"],
  ]
    .map(
      ([id, label], index) =>
        `<button id="tab-${id}" role="tab" data-language="${id}" aria-selected="${index === 0}" aria-controls="panel-${id}" tabindex="${index === 0 ? "0" : "-1"}" class="${index === 0 ? "active" : ""}"><span class="language-dot ${id}"></span>${label}</button>`,
    )
    .join(
      "",
    )}</div><div class="editor-actions"><button class="icon-button" id="reset-draft" aria-label="Reset kode" title="Reset kode">${icon("reset", 18)}</button><button class="icon-button" id="download-draft" aria-label="Unduh hasil HTML" title="Unduh hasil HTML">${icon("download", 18)}</button><button class="button primary compact" id="run-code">${icon("play", 15)} Jalankan kode</button></div></div><div class="editor-layout"><section class="code-pane" aria-label="Editor kode">${[
    ["html", "HTML"],
    ["css", "CSS"],
    ["js", "JavaScript"],
  ]
    .map(
      ([id, label], index) =>
        `<div id="panel-${id}" role="tabpanel" aria-labelledby="tab-${id}" ${index ? "hidden" : ""}><label class="sr-only" for="code-${id}">Kode ${label}</label><textarea id="code-${id}" spellcheck="false" autocapitalize="off" autocomplete="off" wrap="off"></textarea></div>`,
    )
    .join(
      "",
    )}<div class="code-status"><span id="draft-status" role="status">Draft tersimpan di browser</span><span>Ctrl + Enter untuk menjalankan</span></div></section><section class="preview-pane" aria-label="Hasil kode"><div class="preview-toolbar"><span><i class="status-dot"></i> Hasil langsung</span><div role="group" aria-label="Ukuran pratinjau"><button data-size="desktop" aria-pressed="true" class="active">Desktop</button><button data-size="mobile" aria-pressed="false">Ponsel</button><button id="stop-preview" aria-label="Hentikan pratinjau" title="Hentikan pratinjau">${icon("close", 14)}</button></div></div><div class="preview-frame"><iframe id="preview" title="Hasil kode HTML, CSS, dan JavaScript" sandbox="allow-scripts" referrerpolicy="no-referrer"></iframe></div></section></div><details class="console-panel" open><summary>${icon("terminal", 16)} Console <span id="console-count">0 pesan</span></summary><div id="console-output" role="log" aria-live="polite"><p class="console-placeholder">Pesan console dan error JavaScript akan tampil di sini.</p></div></details><div class="playground-help">${icon("info", 17)}<p>Pratinjau menjalankan HTML, CSS, dan JavaScript lokal. Untuk mencoba library eksternal, API, atau localStorage, unduh hasil dan jalankan dari server lokal. Draft tidak tersinkron antarperangkat.</p></div><dialog id="reset-dialog" aria-labelledby="reset-title"><form method="dialog"><h2 id="reset-title">Kembali ke contoh awal?</h2><p>Perubahan pada eksperimen ini akan diganti. Unduh karyamu terlebih dahulu jika ingin menyimpannya.</p><div class="dialog-actions"><button class="button secondary" value="cancel">Tetap mengedit</button><button class="button primary" value="reset">Reset kode</button></div></form></dialog></div>`;
}

export function initPlayground(project, signal) {
  const selected = selectProject(project),
    preset = presets[selected];
  const key = `praktika.draft.${selected}`;
  let initial = { html: preset.html, css: preset.css, js: preset.js };
  try {
    const stored = JSON.parse(localStorage.getItem(key));
    if (
      stored &&
      ["html", "css", "js"].every((id) => typeof stored[id] === "string")
    )
      initial = stored;
  } catch {
    /* Use initial code when storage is malformed or unavailable. */
  }
  if (selected === "practice" && window.praktikaImportedDraft) {
    initial = window.praktikaImportedDraft;
    delete window.praktikaImportedDraft;
  }
  const fields = Object.fromEntries(
    ["html", "css", "js"].map((id) => [
      id,
      document.querySelector("#code-" + id),
    ]),
  );
  for (const id of Object.keys(fields)) fields[id].value = initial[id];
  const value = () =>
    Object.fromEntries(
      Object.entries(fields).map(([id, field]) => [id, field.value]),
    );
  const save = () => {
    try {
      localStorage.setItem(key, JSON.stringify(value()));
      document.querySelector("#draft-status").textContent =
        "Draft tersimpan di browser";
    } catch {
      document.querySelector("#draft-status").textContent =
        "Simpan lewat unduhan; storage tidak tersedia.";
    }
  };
  const frame = document.querySelector("#preview");
  let token = "",
    messageCount = 0;
  const run = (announce = true) => {
    token = crypto.randomUUID();
    messageCount = 0;
    document.querySelector("#console-count").textContent = "0 pesan";
    document.querySelector("#console-output").innerHTML =
      '<p class="console-placeholder">Pesan console dan error JavaScript akan tampil di sini.</p>';
    frame.srcdoc = buildDocument(value(), { token });
    save();
    if (announce) toast("Kode dijalankan. Lihat perubahanmu di pratinjau.");
  };
  window.addEventListener(
    "message",
    (event) => {
      if (
        event.source !== frame.contentWindow ||
        event.data?.source !== "praktika-preview" ||
        event.data.token !== token ||
        !["log", "error", "warn"].includes(event.data.kind) ||
        typeof event.data.text !== "string" ||
        messageCount >= 40
      )
        return;
      const output = document.querySelector("#console-output");
      output.querySelector(".console-placeholder")?.remove();
      const row = document.createElement("p");
      row.className = "console-" + event.data.kind;
      row.textContent = `${event.data.kind === "error" ? "Error: " : event.data.kind === "warn" ? "Info: " : ""}${event.data.text.slice(0, 2000)}`;
      output.append(row);
      document.querySelector("#console-count").textContent =
        `${++messageCount} pesan`;
    },
    { signal },
  );
  run(false);
  Object.values(fields).forEach((field) =>
    field.addEventListener("input", save, { signal }),
  );
  const tabs = Array.from(document.querySelectorAll("[data-language]"));
  const activate = (button) =>
    tabs.forEach((tab) => {
      const active = tab === button;
      tab.classList.toggle("active", active);
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
      document.querySelector("#panel-" + tab.dataset.language).hidden = !active;
    });
  tabs.forEach((button) =>
    button.addEventListener("click", () => activate(button), { signal }),
  );
  document.querySelector(".editor-tabs").addEventListener(
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
            ? tabs.length - 1
            : (index + (event.key === "ArrowRight" ? 1 : -1) + tabs.length) %
              tabs.length;
      activate(tabs[next]);
      tabs[next].focus();
    },
    { signal },
  );
  document
    .querySelector("#run-code")
    .addEventListener("click", () => run(), { signal });
  document.querySelector("#stop-preview").addEventListener(
    "click",
    () => {
      token = "";
      frame.srcdoc = "";
      toast("Pratinjau dihentikan. Kode tetap tersimpan.");
    },
    { signal },
  );
  document.addEventListener(
    "keydown",
    (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
        event.preventDefault();
        run();
      }
    },
    { signal },
  );
  document.querySelector("#experiment").addEventListener(
    "change",
    (event) => {
      location.hash = "#/playground?project=" + event.target.value;
    },
    { signal },
  );
  document.querySelectorAll("[data-size]").forEach((button) =>
    button.addEventListener(
      "click",
      () => {
        document
          .querySelector(".preview-frame")
          .classList.toggle("mobile-size", button.dataset.size === "mobile");
        document.querySelectorAll("[data-size]").forEach((item) => {
          item.classList.toggle("active", item === button);
          item.setAttribute("aria-pressed", String(item === button));
        });
      },
      { signal },
    ),
  );
  document.querySelector("#download-draft").addEventListener(
    "click",
    () => {
      download(
        buildDocument(value(), { preview: false }),
        `praktika-${selected}.html`,
        "text/html",
      );
      toast("Karyamu diunduh sebagai file HTML.");
    },
    { signal },
  );
  const reset = document.querySelector("#reset-dialog");
  document
    .querySelector("#reset-draft")
    .addEventListener("click", () => reset.showModal(), { signal });
  reset.addEventListener(
    "close",
    () => {
      if (reset.returnValue === "reset") {
        for (const id of Object.keys(fields)) fields[id].value = preset[id];
        run();
      }
    },
    { signal },
  );
}
