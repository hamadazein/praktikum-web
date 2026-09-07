export const presets = {
  profile: {
    name: "Profil pertamaku",
    category: "HTML + CSS",
    description:
      "Ganti nama, tulis bio singkat, dan pilih warna favoritmu. Buat profil ini terasa seperti kamu.",
    html: '<article class="profile">\n  <span class="avatar">a.</span>\n  <span class="badge">Sedang bertumbuh</span>\n  <h1>Halo, aku Aulia.</h1>\n  <p>Calon web developer dengan banyak ide<br>dan rasa ingin tahu yang besar.</p>\n  <div class="skills"><span>HTML</span><span>CSS</span><span>Kreativitas</span></div>\n  <button id="hello">Sapa aku ↗</button>\n  <p id="message" role="status"></p>\n</article>',
    css: "* { box-sizing: border-box; }\nbody {\n  margin: 0; min-height: 100vh; padding: 24px;\n  display: grid; place-items: center;\n  background: #f0edff; color: #25263c;\n  font-family: system-ui, sans-serif;\n}\n.profile {\n  width: min(100%, 380px); padding: 32px;\n  background: white; border-radius: 14px;\n  text-align: center;\n}\n.avatar {\n  display: grid; place-items: center;\n  width: 76px; height: 76px; margin: 0 auto 20px;\n  border-radius: 50%; background: #5046e5;\n  color: white; font-size: 34px; font-weight: 700;\n}\n.badge { color: #6654a7; font-size: 12px; }\nh1 { font-size: 28px; letter-spacing: -1px; }\np { color: #646579; line-height: 1.8; font-size: 14px; }\n.skills { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; margin: 24px 0; }\n.skills span { background: #f0edff; border-radius: 5px; padding: 6px 9px; font-size: 11px; }\nbutton { background: #5046e5; color: white; border: 0; padding: 12px 22px; border-radius: 7px; cursor: pointer; font: inherit; }\nbutton:hover { background: #3932b9; }",
    js: 'const button = document.querySelector("#hello");\nconst message = document.querySelector("#message");\n\nbutton.addEventListener("click", () => {\n  message.textContent = "Halo juga! Senang bisa belajar bareng.";\n  console.log("Sapaan berhasil dikirim.");\n});',
  },
  counter: {
    name: "Penghitung interaktif",
    category: "JavaScript",
    description:
      "Pelajari event dan perubahan DOM. Coba tambahkan batas minimum atau ubah langkah hitungnya.",
    html: '<main>\n  <span class="label">SATU KLIK, SATU PERUBAHAN</span>\n  <h1>Hal kecil, bisa berarti.</h1>\n  <div class="counter">\n    <button id="minus" aria-label="Kurangi">−</button>\n    <output id="value" aria-live="polite">0</output>\n    <button id="plus" aria-label="Tambah">+</button>\n  </div>\n  <button id="reset">Mulai lagi</button>\n</main>',
    css: "body {\n  margin: 0; min-height: 100vh; display: grid;\n  place-items: center; padding: 20px; box-sizing: border-box;\n  font-family: system-ui, sans-serif;\n  color: #25263c; background: #f0edff;\n}\nmain { text-align: center; }\n.label { font-size: 10px; letter-spacing: 2px; color: #645d87; }\nh1 { font-size: 28px; }\n.counter { display: flex; align-items: center; gap: 28px; margin: 30px 0; justify-content: center; }\n.counter button { width: 48px; height: 48px; border: 1px solid #d2ccea; border-radius: 12px; background: white; color: #5046e5; font-size: 28px; cursor: pointer; }\noutput { font-size: 72px; font-weight: 700; color: #5046e5; min-width: 100px; }\n#reset { font: inherit; border: 0; background: transparent; color: #645d87; text-decoration: underline; cursor: pointer; padding: 10px; }",
    js: 'let count = 0;\nconst output = document.querySelector("#value");\nconst render = () => { output.textContent = count; };\n\ndocument.querySelector("#plus").addEventListener("click", () => {\n  count += 1;\n  render();\n});\ndocument.querySelector("#minus").addEventListener("click", () => {\n  count -= 1;\n  render();\n});\ndocument.querySelector("#reset").addEventListener("click", () => {\n  count = 0;\n  render();\n});',
  },
  async: {
    name: "Eksperimen async",
    category: "Async / Await",
    description:
      "Simulasikan pemuatan data tanpa koneksi internet. Ubah durasi dan coba jalur gagal untuk memahami try/catch.",
    html: '<main>\n  <span class="badge">EKSPERIMEN ASYNC</span>\n  <h1>Data butuh perjalanan.</h1>\n  <p>Simulasi promise lokal, tanpa API eksternal.</p>\n  <label><input id="fail" type="checkbox"> Coba simulasi gagal</label>\n  <button id="load">Muat data</button>\n  <output id="result" aria-live="polite">Siap untuk mencoba.</output>\n</main>',
    css: "body { margin: 0; min-height: 100vh; padding: 24px; box-sizing: border-box; display: grid; place-items: center; font-family: system-ui, sans-serif; background: #e2f5e9; color: #254835; }\nmain { max-width: 380px; width: 100%; }\n.badge { font-size: 11px; letter-spacing: 2px; }\nh1 { font-size: 32px; line-height: 1.2; }\np { font-size: 14px; line-height: 1.8; }\nlabel { display: block; font-size: 13px; margin: 22px 0; }\nbutton { display: block; border: 0; background: #286441; color: white; padding: 12px 22px; border-radius: 7px; font: inherit; cursor: pointer; }\nbutton:disabled { opacity: .6; cursor: wait; }\noutput { display: block; padding: 20px; background: #ffffffaa; border-radius: 8px; margin-top: 22px; font-size: 14px; }",
    js: 'const button = document.querySelector("#load");\nconst output = document.querySelector("#result");\n\nfunction requestData(shouldFail) {\n  return new Promise((resolve, reject) => {\n    setTimeout(() => {\n      if (shouldFail) reject(new Error("Data belum tersedia. Coba lagi!"));\n      else resolve({ message: "Data berhasil tiba. Kamu sudah memahami promise!" });\n    }, 1200);\n  });\n}\n\nbutton.addEventListener("click", async () => {\n  button.disabled = true;\n  output.textContent = "Sedang memuat…";\n  try {\n    const data = await requestData(document.querySelector("#fail").checked);\n    output.textContent = data.message;\n    console.log(data);\n  } catch (error) {\n    output.textContent = error.message;\n    console.warn(error.message);\n  } finally {\n    button.disabled = false;\n  }\n});',
  },
  practice: {
    name: "Kode dari latihanmu",
    category: "HTML + CSS",
    description:
      "Kode latihan yang kamu bawa dari modul. Ubah satu hal, jalankan, dan bandingkan hasilnya.",
    html: "<h1>Halaman pertamaku</h1>\n<p>Buka file praktik pada modul HTML atau CSS untuk membawa kode ke sini.</p>",
    css: "body { font-family: system-ui, sans-serif; padding: 32px; color: #202239; }",
    js: "",
  },
};
