import {
  icon,
  escapeHTML as e,
  moduleLink,
  exerciseLink,
  moduleProgress,
  empty,
} from "./ui.mjs";
import { resumeExercise } from "./state.mjs";

export function moduleCard(module, catalog, state, featured = false) {
  const done = moduleProgress(module, catalog, state);
  return `<article class="module-card ${module.color} ${featured ? "featured" : ""}" data-module-card="${module.id}"><a href="${moduleLink(module.id)}" class="module-card-link"><div class="module-art"><span class="module-number">MODUL ${module.id}</span><span class="module-level">${module.level}</span><span class="tech-symbol" aria-hidden="true">${e(module.symbol)}</span>${module.id === "01" ? '<div class="art-html" aria-hidden="true"><i></i><i></i><div><b></b><b></b><b></b></div></div>' : module.id === "02" ? '<div class="art-css" aria-hidden="true"><i></i><i></i><i></i><i></i></div>' : '<span class="art-shape" aria-hidden="true"></span>'}<span class="art-caption">${module.subtitle}</span></div><div class="module-copy"><div class="module-category">${module.category}<span>${icon("clock", 12)} ±${module.minutes} menit baca</span></div><h3>${module.title}</h3><p>${module.description}</p><div class="module-meta"><span>${icon("code", 15)} ${module.count} latihan</span><span>${done ? `${done}/${module.count} selesai` : "Buka modul"} ${icon("arrow", 16)}</span></div>${done ? `<progress value="${done}" max="${module.count}" aria-label="Progres ${module.title}"></progress>` : ""}</div></a><button class="save-card ${state.saved.includes(module.id) ? "is-saved" : ""}" data-save="${module.id}" aria-label="${state.saved.includes(module.id) ? "Hapus simpanan" : "Simpan"} ${module.title}" aria-pressed="${state.saved.includes(module.id)}">${icon("bookmark", 17)}</button></article>`;
}
export function moduleRow(module, catalog, state) {
  const done = moduleProgress(module, catalog, state);
  return `<a class="module-row ${module.color}" href="${moduleLink(module.id)}" data-module-card="${module.id}"><span class="row-number">${module.id}</span><span class="row-symbol" aria-hidden="true">${e(module.symbol)}</span><div class="row-copy"><h3>${module.title}</h3><p>${module.subtitle}</p></div><span class="row-count">${module.count} latihan</span><span class="row-state">${done ? done + "/" + module.count : "Belum dimulai"}</span>${icon("arrow", 17)}</a>`;
}
export function homeView(catalog, state) {
  const next = resumeExercise(catalog.exercises, state);
  const nextModule = catalog.modules.find(
    (module) => module.id === next.module,
  );
  const completed = catalog.exercises.filter((item) =>
    state.completed.includes(item.id),
  ).length;
  return `<div class="home"><section class="hero container"><div class="hero-copy"><div class="hero-label"><span class="status-dot"></span> RUANG PRAKTIK WEB, UNTUK SEMUA</div><h1>Dari belajar,<br>jadi <span>berkarya.</span><span class="headline-spark" aria-hidden="true">✳</span></h1><p>Ide besarmu dimulai dari satu baris kode.<br>Belajar, bereksperimen, dan bangun website<br class="wide-only"> pertamamu—selangkah demi selangkah.</p><div class="hero-actions"><a class="button primary large" href="${state.last ? exerciseLink(next) : moduleLink("01")}">${state.last ? "Lanjutkan praktikum" : "Mulai praktikum"} ${icon("arrow", 19)}</a><a class="button text" href="#/modules">Jelajahi modul ${icon("chevron", 16)}</a></div><div class="hero-perks"><span>${icon("check", 14)} Gratis selamanya</span><span>${icon("check", 14)} Tanpa daftar</span><span>${icon("check", 14)} Bahasa Indonesia</span></div></div>
    <div class="hero-experiment"><div class="orbit orbit-one" aria-hidden="true"></div><div class="orbit orbit-two" aria-hidden="true"></div><span class="floating-tag tag-structure">${icon("code", 17)} dari baris pertama</span><div class="demo-browser"><div class="browser-toolbar"><span class="window-dots"><i></i><i></i><i></i></span><span>${icon("globe", 11)} karya-pertamaku.web</span>${icon("external", 12)}</div><div id="demo-canvas" class="demo-canvas" data-stage="js"><div class="demo-navigation"><span>hello<span class="accent-dot">.</span></span><span>about &nbsp; work &nbsp; say hi ↗</span></div><div class="demo-body"><div class="demo-greeting">Sedang belajar, terus bertumbuh.</div><div class="demo-layout"><div><h2>Halo, aku<br><span>web developer.</span></h2><p>Membuat hal kecil<br>dengan rasa ingin tahu yang besar.</p><button id="demo-like" aria-label="Beri semangat pada demo">${icon("heart", 14)} <span>Kasih semangat</span><span id="demo-count">0</span></button></div><div class="demo-art" aria-hidden="true"><span class="art-flower">✳</span><span class="art-dot"></span><span class="art-bracket">{ }</span></div></div><div class="demo-footer"><span>HTML · CSS · secangkir ide</span><span>made with curiosity ↗</span></div></div></div></div><div class="floating-code"><div><span class="code-dot"></span> index.html</div><code><span>&lt;h1&gt;</span>Halo, dunia!<span>&lt;/h1&gt;</span><br><span>&lt;p&gt;</span>Aku siap berkarya.<span>&lt;/p&gt;</span></code></div><span class="floating-tag tag-success">${icon("check", 15)} sampai jadi nyata</span><div class="demo-switch"><span>Lihat prosesnya</span><div role="group" aria-label="Tahap membangun website"><button data-stage="html" aria-pressed="false">1 <span>HTML</span></button><button data-stage="css" aria-pressed="false">2 <span>CSS</span></button><button class="active" data-stage="js" aria-pressed="true">3 <span>JavaScript</span></button></div></div><p class="demo-caption" id="demo-caption" aria-live="polite">Sekarang hidup! Coba klik “Kasih semangat”.</p></div></section>
    <div class="learning-strip"><div class="container"><p><strong>Belajar yang terasa<br>seperti membuat sesuatu.</strong></p><span>${icon("book", 23)}<span><strong>7 modul terarah</strong><small>Dari fondasi ke aplikasi</small></span></span><span>${icon("terminal", 23)}<span><strong>28 latihan nyata</strong><small>Kode yang bisa kamu coba</small></span></span><span>${icon("trophy", 23)}<span><strong>Belajar sesuai ritmemu</strong><small>Simpan setiap kemajuan</small></span></span></div></div>
    <section class="curriculum container" aria-labelledby="curriculum-title"><div class="section-title"><div><span class="section-label">Perjalanan belajarmu</span><h2 id="curriculum-title">Skill besar, langkah kecil.</h2><p>Mulai dari dasar. Selesaikan satu hal. Rayakan progresmu.</p></div><a href="#/modules" class="text-link">Lihat semua modul ${icon("arrow", 17)}</a></div><div class="curriculum-layout"><div><div class="featured-grid">${catalog.modules
      .slice(0, 2)
      .map((module) => moduleCard(module, catalog, state, true))
      .join(
        "",
      )}</div><div class="next-modules"><div class="list-heading"><h3>Selanjutnya dalam perjalananmu</h3><span>Terbuka untuk dieksplorasi</span></div>${catalog.modules
      .slice(2)
      .map((module) => moduleRow(module, catalog, state))
      .join(
        "",
      )}</div></div><aside class="learning-aside"><div class="today-card"><div class="today-heading"><span class="today-icon">${icon("route", 20)}</span><span>LANGKAHMU HARI INI</span></div><h3>${state.last ? "Lanjut dari sini." : "Yuk, mulai dari sini."}</h3><p>${state.last ? "Setiap percobaan membawamu selangkah lebih jauh." : "Satu halaman sederhana bisa jadi awal dari banyak hal hebat."}</p><div class="today-lesson"><span class="today-number">${nextModule.id}</span><div><strong>${nextModule.title}</strong><span>${state.last ? e(next.title) : "Bangun halaman pertamamu"}</span></div></div><a class="button primary" href="${state.last ? exerciseLink(next) : moduleLink("01")}">${state.last ? "Lanjutkan langkahmu" : "Buka modul pertama"} ${icon("arrow", 17)}</a><div class="progress-caption"><span>Progres praktikmu</span><strong>${completed} / 28</strong></div><progress max="28" value="${completed}" aria-label="Progres praktikum keseluruhan"></progress><a href="#/progress" class="aside-progress-link">Lihat perjalananmu ${icon("arrow", 13)}</a></div><div class="tip-card"><span>${icon("spark", 22)}</span><blockquote>“Cara terbaik memahami kode adalah dengan mengubahnya.”</blockquote><p>Coba satu perubahan kecil.<br>Lihat apa yang terjadi.</p><a href="#/playground" class="text-link">Buka playground ${icon("arrow", 15)}</a></div><a class="saved-shortcut" href="#/saved">${icon("bookmark", 19)}<span>Modul tersimpan<small>${state.saved.length} modul untuk nanti</small></span>${icon("chevron", 15)}</a></aside></div></section>
    <section class="playground-banner container"><div class="banner-copy"><span>${icon("bolt", 18)} Punya ide? Langsung coba.</span><h2>Ruang untuk salah.<br>Ruang untuk <em>jadi bisa.</em></h2><p>Tulis HTML, CSS, dan JavaScript. Lihat hasilnya langsung.<br>Tanpa instalasi, tanpa takut merusak apa pun.</p><a class="button light" href="#/playground">Masuk playground ${icon("arrow", 18)}</a></div><div class="banner-visual" aria-hidden="true"><span class="giant-brace">{</span><div class="banner-code"><span>const</span> kamu = {<br>&nbsp; rasaInginTahu: <b>Infinity</b>,<br>&nbsp; langkahPertama: <i>'hari ini'</i><br>};<br><br>kamu.<b>mulai()</b>;</div><span class="giant-brace">}</span></div></section>
    <section class="projects-preview container"><div class="section-title"><div><h2>Belajar yang jadi karya.</h2><p>Tantangan kecil untuk menguji ide besarmu.</p></div><a class="text-link" href="#/projects">Semua tantangan ${icon("arrow", 17)}</a></div><div class="challenge-grid">${challengeCards()}</div></section></div>`;
}

export function challengeCards() {
  return `<a class="challenge-card peach" href="#/playground?project=profile"><div class="challenge-art profile-visual" aria-hidden="true"><span class="profile-avatar">a.</span><div><b></b><i></i><i></i></div><span class="profile-button"></span></div><div class="challenge-copy"><span class="tag">HTML + CSS</span><h3>Kenalkan dirimu lewat kode.</h3><p>Buat kartu profil yang punya karaktermu.</p><span class="text-link">Coba tantangan ${icon("arrow", 16)}</span></div></a><a class="challenge-card lavender" href="#/playground?project=counter"><div class="challenge-art counter-visual" aria-hidden="true"><span>−</span><strong>01</strong><span>+</span></div><div class="challenge-copy"><span class="tag">JavaScript</span><h3>Satu klik, satu perubahan.</h3><p>Hidupkan antarmuka dengan event dan DOM.</p><span class="text-link">Coba tantangan ${icon("arrow", 16)}</span></div></a><a class="challenge-card mint" href="#/playground?project=async"><div class="challenge-art async-visual" aria-hidden="true"><span>request</span><i></i><span>${icon("check", 23)}</span></div><div class="challenge-copy"><span class="tag">Async / Await</span><h3>Menunggu dengan cara baru.</h3><p>Pelajari alur loading, berhasil, dan error.</p><span class="text-link">Coba tantangan ${icon("arrow", 16)}</span></div></a>`;
}

export function modulesView(catalog, query = "") {
  return `<div class="container inner-page"><div class="page-heading"><span class="page-symbol">${icon("book", 24)}</span><h1>Selalu ada hal baru<br>untuk dipelajari.</h1><p>Tujuh modul yang saling terhubung. Pilih titik awalmu, atau ikuti dari fondasi pertama.</p></div><div class="catalog-tools"><label class="search-field">${icon("search", 21)}<input type="search" id="catalog-search" placeholder="Cari HTML, box model, promise…" aria-label="Cari modul dan latihan" value="${e(query)}"><kbd>/</kbd></label><div class="filters" role="group" aria-label="Kategori modul">${["Semua", "Fondasi", "Framework", "JavaScript", "Backend"].map((label, index) => `<button class="filter ${index === 0 ? "active" : ""}" data-filter="${label}" aria-pressed="${index === 0}">${label}</button>`).join("")}</div></div><div class="results-heading"><h2>Modul pembelajaran</h2><span id="result-count" aria-live="polite"></span></div><div id="module-results"></div></div>`;
}

export function savedView(catalog, state) {
  const saved = catalog.modules.filter((module) =>
    state.saved.includes(module.id),
  );
  return `<div class="container inner-page"><div class="page-heading"><span class="page-symbol">${icon("bookmark", 24)}</span><h1>Simpan untuk<br>rasa penasaran berikutnya.</h1><p>Modul pilihanmu, siap dipelajari ketika waktunya tiba.</p></div>${saved.length ? `<div class="catalog-grid">${saved.map((module) => moduleCard(module, catalog, state)).join("")}</div>` : empty("Belum ada modul tersimpan.", "Tekan ikon bookmark pada modul yang menarik untuk membuat koleksi belajarmu.")}</div>`;
}

export function progressView(catalog, state) {
  const done = catalog.exercises.filter((item) =>
    state.completed.includes(item.id),
  );
  const percent = Math.round((done.length / catalog.exercises.length) * 100);
  const next = resumeExercise(catalog.exercises, state);
  return `<div class="container inner-page"><div class="page-heading"><span class="page-symbol">${icon("chart", 24)}</span><h1>Kamu sedang bertumbuh.</h1><p>Setiap latihan yang selesai adalah satu langkah nyata. Ini perjalananmu sejauh ini.</p></div><section class="progress-summary"><div class="progress-circle" style="--percent:${percent}%"><strong>${percent}<small>%</small></strong></div><div><h2>${done.length ? "Lihat sejauh apa kamu melangkah." : "Langkah pertamamu menunggu."}</h2><p><strong>${done.length}</strong> latihan selesai <span>·</span> <strong>${state.quizzes.length}</strong> kuis diselesaikan <span>·</span> <strong>${state.saved.length}</strong> modul tersimpan</p><small>Tersimpan pada browser ini. Belajar tanpa akun.</small></div><a class="button primary" href="${exerciseLink(next)}">${done.length ? "Lanjutkan belajar" : "Mulai praktik"} ${icon("arrow", 17)}</a></section><div class="progress-modules">${catalog.modules
    .map((module) => {
      const count = moduleProgress(module, catalog, state);
      return `<a class="progress-module ${module.color}" href="${moduleLink(module.id)}"><span class="row-symbol">${e(module.symbol)}</span><div><h2>${module.title}</h2><p>${count} dari ${module.count} latihan selesai${state.quizzes.includes(module.id) ? " · Kuis selesai" : ""}</p><progress max="${module.count}" value="${count}" aria-label="Progres ${module.title}"></progress></div>${icon("arrow", 18)}</a>`;
    })
    .join("")}</div></div>`;
}

export function projectsView(catalog) {
  const projects = catalog.exercises.filter((item) => item.project);
  return `<div class="container inner-page"><div class="page-heading"><span class="page-symbol">${icon("bolt", 24)}</span><h1>Waktunya membuat<br>sesuatu milikmu.</h1><p>Eksperimen kecil, pemahaman yang lebih dalam. Ambil contoh awal, lalu ubah jadi versimu.</p></div><div class="challenge-grid">${challengeCards()}</div><div class="section-title project-source-title"><div><h2>Pelajari proyek lengkapnya.</h2><p>Studi kasus asli dari materi praktikum, lengkap dengan kode sumber.</p></div></div><div class="source-projects">${projects
    .map((item) => {
      const module = catalog.modules.find(
        (module) => module.id === item.module,
      );
      return `<a href="${exerciseLink(item)}" class="source-project ${module.color}"><span class="row-symbol">${e(module.symbol)}</span><div><span>${module.title}</span><h3>${e(item.title)}</h3><p>Baca kode, jalankan demo, lalu coba modifikasi.</p></div>${icon("arrow", 18)}</a>`;
    })
    .join("")}</div></div>`;
}

export function moduleView(module, catalog, state, tab = "guide") {
  const done = moduleProgress(module, catalog, state);
  const saved = state.saved.includes(module.id);
  return `<div class="container module-page"><a class="back-link" href="#/modules">${icon("back", 17)} Semua modul</a><section class="module-heading ${module.color}"><div><div class="module-eyebrow"><span class="tag">Modul ${module.id}</span><span>${module.category}</span><span>${module.level}</span></div><h1>${module.title}</h1><p>${module.description}</p><div class="module-heading-meta"><span>${icon("code", 16)} ${module.count} latihan</span><span>${icon("clock", 16)} ±${module.minutes} menit baca</span><span>${icon("trophy", 16)} ${module.outcome}</span></div></div><div class="module-heading-side"><span class="large-tech" aria-hidden="true">${e(module.symbol)}</span><button class="button secondary" id="save-module" data-save="${module.id}" aria-label="${saved ? "Hapus simpanan" : "Simpan modul"}" aria-pressed="${saved}">${icon("bookmark", 16)} ${saved ? "Tersimpan" : "Simpan modul"}</button></div></section><div class="module-tabs-wrap"><div class="module-tabs" role="tablist" aria-label="Bagian modul"><a role="tab" href="${moduleLink(module.id)}" aria-selected="${tab === "guide"}" aria-controls="module-panel" class="${tab === "guide" ? "active" : ""}">${icon("book", 17)} Panduan</a><a role="tab" href="${moduleLink(module.id)}?tab=practice" aria-selected="${tab === "practice"}" aria-controls="module-panel" class="${tab === "practice" ? "active" : ""}">${icon("terminal", 17)} File praktik <span>${module.count}</span></a><a role="tab" href="${moduleLink(module.id)}?tab=quiz" aria-selected="${tab === "quiz"}" aria-controls="module-panel" class="${tab === "quiz" ? "active" : ""}">${icon("spark", 17)} Cek pemahaman</a></div><div class="module-tab-progress"><span>${done}/${module.count} selesai</span><progress value="${done}" max="${module.count}" aria-label="Progres modul"></progress></div></div><div id="module-panel" role="tabpanel"><div class="loading-content" aria-label="Memuat materi"><i></i><i></i><i></i></div></div><dialog id="source-dialog" aria-labelledby="source-title"></dialog></div>`;
}
