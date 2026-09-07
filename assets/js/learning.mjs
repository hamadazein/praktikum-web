import { marked } from "../vendor/marked.mjs";
import DOMPurify from "../vendor/purify.mjs";
import {
  icon,
  escapeHTML as e,
  toast,
  download,
  moduleLink,
  exerciseLink,
} from "./ui.mjs";
import { gradeQuiz } from "./state.mjs";
const bundles = new Map();
export async function getBundle(id, signal) {
  if (bundles.has(id)) return bundles.get(id);
  const response = await fetch(`assets/data/module-${id}.json`, { signal });
  if (!response.ok) throw Error("Materi gagal dimuat");
  const bundle = await response.json();
  bundles.set(id, bundle);
  return bundle;
}

export async function loadModule(module, catalog, store, tab, params, signal) {
  const panel = document.querySelector("#module-panel");
  try {
    const bundle = await getBundle(module.id, signal);
    if (signal.aborted) return;
    if (tab === "practice")
      renderPractice(panel, module, catalog, bundle, store, params, signal);
    else if (tab === "quiz") renderQuiz(panel, module, store, signal);
    else renderGuide(panel, module, bundle, signal);
  } catch (error) {
    if (error.name === "AbortError") return;
    panel.innerHTML = `<div class="error-state" role="alert"><h2>Materi belum bisa dimuat.</h2><p>Periksa koneksi, lalu coba kembali. Progres belajarmu tetap ada.</p><button class="button primary" id="retry-module">Coba lagi ${icon("reset", 17)}</button></div>`;
    panel
      .querySelector("button")
      .addEventListener("click", () =>
        loadModule(module, catalog, store, tab, params, signal),
      );
  }
}

function renderGuide(panel, module, bundle, signal) {
  panel.innerHTML = `<div class="guide-layout"><aside class="guide-sidebar"><div class="objectives"><h2>Setelah modul ini,<br>kamu bisa…</h2><ul>${module.objectives.map((text) => `<li>${icon("check", 15)}<span>${text}</span></li>`).join("")}</ul></div><div class="table-contents"><h2>Dalam panduan ini</h2><nav id="contents" aria-label="Daftar isi panduan"></nav></div><a class="button primary" href="${moduleLink(module.id)}?tab=practice">Langsung praktik ${icon("arrow", 16)}</a></aside><div class="guide-reading"><div class="reading-toolbar"><span>${icon("book", 16)} Pahami konsepnya, lalu coba sendiri.</span><button class="button compact" id="focus-reading" aria-pressed="false">Mode fokus ${icon("grid", 14)}</button></div><article class="prose"></article><div class="guide-next"><span>${icon("bolt", 25)}</span><div><h2>Sudah dapat gambarannya?</h2><p>Waktunya mencoba. Buka file latihan dan ubah satu hal kecil.</p></div><a class="button primary" href="${moduleLink(module.id)}?tab=practice">Buka file praktik ${icon("arrow", 16)}</a></div></div></div>`;
  const article = panel.querySelector(".prose");
  article.innerHTML = DOMPurify.sanitize(marked.parse(bundle.markdown), {
    USE_PROFILES: { html: true },
    FORBID_TAGS: ["style", "form", "input", "button", "textarea", "iframe"],
  });
  if (article.firstElementChild?.tagName === "H1")
    article.firstElementChild.remove();
  article.querySelectorAll("h1").forEach((node) => {
    const h2 = document.createElement("h2");
    h2.textContent = node.textContent;
    node.replaceWith(h2);
  });
  const toc = panel.querySelector("#contents");
  const slug = (text) =>
    text
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s-]/gu, "")
      .trim()
      .replace(/\s+/g, "-");
  const counts = new Map();
  article.querySelectorAll("h2,h3,h4").forEach((heading) => {
    const base = slug(heading.textContent) || "bagian";
    const count = counts.get(base) || 0;
    counts.set(base, count + 1);
    heading.id = base + (count ? "-" + count : "");
    if (heading.tagName === "H2") {
      const button = document.createElement("button");
      button.textContent = heading.textContent.replace(/^[^\p{L}\p{N}]+/u, "");
      button.addEventListener("click", () => {
        heading.tabIndex = -1;
        heading.focus({ preventScroll: true });
        heading.scrollIntoView({ block: "start" });
      });
      toc.append(button);
    }
  });
  const base = new URL(module.folder + "/README.md", document.baseURI);
  article.querySelectorAll("img").forEach((image) => {
    if (image.getAttribute("src"))
      image.src = new URL(image.getAttribute("src"), base).href;
    image.loading = "lazy";
    image.alt ||= "Ilustrasi materi";
  });
  article.querySelectorAll("a[href]").forEach((link) => {
    const href = link.getAttribute("href");
    if (href.startsWith("#"))
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const target = article.querySelector(
          `[id="${CSS.escape(href.slice(1))}"]`,
        );
        target?.scrollIntoView();
      });
    else {
      link.href = new URL(href, base).href;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
  });
  article.querySelectorAll("table").forEach((table) => {
    const wrapper = document.createElement("div");
    wrapper.className = "table-wrap";
    wrapper.tabIndex = 0;
    wrapper.setAttribute("role", "region");
    wrapper.setAttribute(
      "aria-label",
      "Tabel materi, gulir untuk kolom lainnya",
    );
    table.before(wrapper);
    wrapper.append(table);
  });
  article.querySelectorAll("pre").forEach((pre) => {
    const code = pre.querySelector("code");
    if (!code) return;
    const wrapper = document.createElement("div");
    wrapper.className = "code-block";
    const language = code.className.replace("language-", "") || "kode";
    const bar = document.createElement("div");
    bar.className = "code-bar";
    bar.innerHTML = `<span>${e(language)}</span><button aria-label="Salin kode ${e(language)}">${icon("copy", 13)} Salin</button>`;
    bar
      .querySelector("button")
      .addEventListener("click", () => copyCode(code.textContent, code));
    pre.before(wrapper);
    wrapper.append(bar, pre);
  });
  panel.querySelector("#focus-reading").addEventListener(
    "click",
    (event) => {
      const enabled = document.body.classList.toggle("reading-focus");
      event.currentTarget.setAttribute("aria-pressed", String(enabled));
      event.currentTarget.innerHTML = `${enabled ? "Keluar mode fokus" : "Mode fokus"} ${icon("grid", 14)}`;
    },
    { signal },
  );
}

export async function copyCode(text, element) {
  try {
    await navigator.clipboard.writeText(text);
    toast("Kode disalin. Coba ubah jadi versimu!");
  } catch {
    if (element) {
      const range = document.createRange();
      range.selectNodeContents(element);
      const selection = getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }
    toast("Pilih kode, lalu tekan Ctrl+C untuk menyalin.");
  }
}

function renderPractice(panel, module, catalog, bundle, store, params, signal) {
  const exercises = catalog.exercises.filter(
    (item) => item.module === module.id,
  );
  const state = store.get();
  panel.innerHTML = `<div class="practice-layout"><section class="practice-main"><div class="practice-intro"><h2>Coba. Ubah. Pahami.</h2><p>Buka kodenya, jalankan, lalu coba modifikasi. Tandai latihan setelah kamu selesai mempraktikkannya.</p></div><div class="practice-list">${exercises.map((item, index) => `<article class="practice-row ${state.completed.includes(item.id) ? "completed" : ""}" id="practice-${item.id}"><span class="practice-number">${String(index + 1).padStart(2, "0")}</span><div class="practice-details"><div class="practice-row-title"><h3>${e(item.title)}</h3>${item.project ? '<span class="tag">Studi kasus</span>' : ""}</div><span class="file-name">${e(item.path.split("/").pop())}</span><div class="practice-actions"><button class="button compact secondary" data-source="${item.id}" aria-label="Lihat kode ${e(item.title)}">${icon("code", 15)} Lihat kode</button>${item.language === "php" ? '<span class="runtime-note">' + icon("terminal", 13) + " Jalankan di server PHP</span>" : `<a class="button compact" href="${item.path}" target="_blank" rel="noopener noreferrer">Buka demo ${icon("external", 14)}<span class="sr-only"> (tab baru)</span></a>`}</div></div><button class="completion-button ${state.completed.includes(item.id) ? "done" : ""}" data-complete="${item.id}" aria-pressed="${state.completed.includes(item.id)}">${icon("check", 16)} ${state.completed.includes(item.id) ? "Sudah selesai" : "Tandai selesai"}</button></article>`).join("")}</div><div class="practice-finish"><span>${icon("spark", 21)}</span><div><h3>Sudah mencoba? Cek pemahamanmu.</h3><p>Satu pertanyaan singkat untuk menghubungkan praktik dan konsep.</p></div><a class="text-link" href="${moduleLink(module.id)}?tab=quiz">Mulai kuis ${icon("arrow", 17)}</a></div></section><aside class="challenge-note"><span class="challenge-note-icon">${icon("bolt", 24)}</span><span class="section-label">Tantangan modul</span><h2>Ubah jadi versimu.</h2><p>${module.challenge}</p><ul>${module.objectives.map((text) => `<li>${icon("check", 14)} ${text}</li>`).join("")}</ul><a class="button primary" href="#/playground">Coba di playground ${icon("arrow", 16)}</a>${module.id === "05" ? '<p class="practice-footnote">Untuk PHP, unduh file dan jalankan pada server lokal. Playground mendukung HTML, CSS, dan JavaScript.</p>' : '<p class="practice-footnote">Beberapa demo asli menggunakan library atau API eksternal dan membutuhkan internet.</p>'}</aside></div>`;
  panel.querySelectorAll("[data-source]").forEach((button) =>
    button.addEventListener("click", () =>
      openSource(
        exercises.find((item) => item.id === button.dataset.source),
        bundle,
        signal,
      ),
    ),
  );
  panel.querySelectorAll("[data-complete]").forEach((button) =>
    button.addEventListener("click", () => {
      const id = button.dataset.complete;
      const done = !store.get().completed.includes(id);
      store.complete(id, done);
      store.visit(id);
      button.classList.toggle("done", done);
      button.setAttribute("aria-pressed", String(done));
      button.innerHTML = `${icon("check", 16)} ${done ? "Sudah selesai" : "Tandai selesai"}`;
      button.closest(".practice-row").classList.toggle("completed", done);
      const count = exercises.filter((item) =>
        store.get().completed.includes(item.id),
      ).length;
      document.querySelector(".module-tab-progress span").textContent =
        `${count}/${module.count} selesai`;
      document.querySelector(".module-tab-progress progress").value = count;
      toast(
        store.persistent
          ? done
            ? "Satu langkah maju! Latihanmu sudah dicatat."
            : "Latihan ditandai untuk dicoba lagi."
          : "Progres tercatat untuk sesi ini. Penyimpanan browser sedang diblokir.",
      );
    }),
  );
  const requested = exercises.find(
    (item) => item.id === params.get("exercise"),
  );
  if (requested) {
    store.visit(requested.id);
    requestAnimationFrame(() => {
      if (!signal.aborted)
        document
          .querySelector(`#practice-${requested.id}`)
          ?.scrollIntoView({ block: "center" });
    });
  }
}

function openSource(exercise, bundle, signal) {
  const dialog = document.querySelector("#source-dialog");
  const files = bundle.sources[exercise.id];
  let selected = 0;
  dialog.innerHTML = `<div class="dialog-heading"><div><span class="section-label">Kode latihan</span><h2 id="source-title">${e(exercise.title)}</h2></div><button class="icon-button" id="close-source" aria-label="Tutup kode">${icon("close")}</button></div>${exercise.language === "php" ? `<div class="php-notice">${icon("terminal", 22)}<div><strong>PHP perlu dijalankan di server.</strong><p>Unduh file, buka terminal pada foldernya, lalu jalankan:</p><code>php -S localhost:8000</code><p>Dengan PHP terpasang, buka <code>http://localhost:8000/${files[0].name}</code>. Kode di bawah adalah sumber asli, bukan hasil eksekusi.</p></div></div>` : ""}<div class="source-toolbar"><label class="sr-only" for="source-file">Pilih file sumber</label><select id="source-file">${files.map((file, index) => `<option value="${index}">${e(file.name)}</option>`).join("")}</select><button class="button compact" id="copy-source">${icon("copy", 15)} Salin kode</button><button class="button compact secondary" id="download-source">${icon("download", 15)} Unduh file</button></div><pre class="source-code" tabindex="0" aria-label="Kode sumber ${e(exercise.title)}"><code></code></pre>${exercise.importable ? `<div class="source-footer"><p>Bereksperimen dengan HTML dan CSS tanpa mengubah file asli.</p><button class="button primary" id="import-source">Edit di playground ${icon("arrow", 16)}</button></div>` : ""}`;
  const setCode = () => {
    dialog.querySelector(".source-code code").textContent =
      files[selected].code;
  };
  setCode();
  dialog.querySelector("#source-file").addEventListener("change", (event) => {
    selected = Number(event.target.value);
    setCode();
  });
  dialog
    .querySelector("#copy-source")
    .addEventListener("click", () =>
      copyCode(files[selected].code, dialog.querySelector(".source-code code")),
    );
  dialog
    .querySelector("#download-source")
    .addEventListener("click", () =>
      download(files[selected].code, files[selected].name),
    );
  dialog
    .querySelector("#close-source")
    .addEventListener("click", () => dialog.close());
  dialog.querySelector("#import-source")?.addEventListener("click", () => {
    const doc = new DOMParser().parseFromString(files[0].code, "text/html");
    doc.querySelectorAll("script").forEach((script) => script.remove());
    doc
      .querySelectorAll("link[rel=stylesheet]")
      .forEach((link) => link.remove());
    const styles = [
      ...files
        .filter((file) => file.language === "css")
        .map((file) => file.code),
      ...Array.from(
        doc.querySelectorAll("style"),
        (style) => style.textContent,
      ),
    ].join("\n\n");
    doc.querySelectorAll("style").forEach((style) => style.remove());
    const draft = { html: doc.body.innerHTML.trim(), css: styles, js: "" };
    // In-memory handoff also works when browser storage is unavailable.
    window.praktikaImportedDraft = draft;
    try {
      localStorage.setItem("praktika.draft.practice", JSON.stringify(draft));
    } catch {
      /* The current-session handoff remains available. */
    }
    dialog.close();
    location.hash = "#/playground?project=practice";
  });
  dialog.showModal();
}

function renderQuiz(panel, module, store, signal) {
  const passed = store.get().quizzes.includes(module.id);
  panel.innerHTML = `<div class="quiz-layout"><div class="quiz-intro"><span class="page-symbol">${icon("spark", 26)}</span><span class="section-label">Jeda untuk memahami</span><h2>Satu konsep.<br>Satu langkah lebih yakin.</h2><p>Ini ruang untuk belajar, bukan mengejar nilai. Coba jawab, lalu pahami penjelasannya.</p><div class="quiz-note">${icon("info", 18)} Jawaban yang belum tepat bisa dicoba lagi.</div></div><form class="quiz-card" id="quiz-form"><span class="quiz-label">CEK PEMAHAMAN · MODUL ${module.id}</span><fieldset><legend>${e(module.quiz.question)}</legend>${module.quiz.options.map((option, index) => `<label class="quiz-option"><input type="radio" name="answer" value="${index}" aria-label="${e(option)}" required><span class="answer-letter" aria-hidden="true">${String.fromCharCode(65 + index)}</span><span>${e(option)}</span></label>`).join("")}</fieldset><div id="quiz-feedback" role="status" aria-live="polite"></div><button class="button primary" type="submit">Periksa jawaban ${icon("arrow", 17)}</button>${passed ? '<p class="quiz-passed">' + icon("check", 16) + " Kuis ini sudah kamu selesaikan.</p>" : ""}</form></div>`;
  panel.querySelector("form").addEventListener(
    "submit",
    (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const selected = data.has("answer") ? Number(data.get("answer")) : null;
      const result = gradeQuiz(module.quiz, selected);
      if (result.correct) store.passQuiz(module.id);
      const feedback = panel.querySelector("#quiz-feedback");
      feedback.className = `quiz-feedback ${result.correct ? "correct" : "retry"}`;
      feedback.innerHTML = `<strong>${result.correct ? "Tepat sekali. Konsepnya sudah kamu tangkap!" : "Belum tepat. Yuk, pahami lagi."}</strong><p>${e(result.explanation)}</p>${result.correct ? `<a class="text-link" href="${Number(module.id) < 7 ? moduleLink(String(Number(module.id) + 1).padStart(2, "0")) : "#/progress"}">${Number(module.id) < 7 ? "Jelajahi modul berikutnya" : "Lihat progresmu"} ${icon("arrow", 16)}</a>` : ""}`;
    },
    { signal },
  );
}
