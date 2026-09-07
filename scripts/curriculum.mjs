export const curriculum = [
  {
    id: "01",
    folder: "pertemuan-01-fondasi-html",
    title: "Fondasi HTML",
    subtitle: "Bangun struktur pertamamu.",
    description:
      "Dari halaman kosong menjadi profil digital. Kenali elemen, susun konten, dan pahami bahasa dasar web.",
    category: "Fondasi",
    tech: "HTML",
    symbol: "</>",
    color: "orange",
    level: "Pemula",
    outcome: "Sebuah halaman profil pribadi",
    objectives: [
      "Menyusun struktur dokumen HTML yang valid.",
      "Menggunakan heading, link, gambar, dan daftar.",
      "Membuat halaman profil dengan konten yang bermakna.",
    ],
    challenge:
      "Buat profilmu dengan satu judul utama, bio singkat, daftar tiga hobi, dan tautan ke karya atau akun GitHub.",
    quiz: {
      question:
        "Elemen mana yang paling tepat untuk judul utama sebuah halaman?",
      options: ["<p> dengan font besar", "<h1>", '<div class="judul">'],
      answer: 1,
      explanation:
        "<h1> memberi makna judul utama pada dokumen. Ukuran teks saja tidak memberikan struktur semantik kepada browser dan pembaca layar.",
    },
    lessons: [
      ["01-struktur-dasar.html", "Struktur HTML dasar"],
      ["02-heading.html", "Heading & hierarki"],
      ["03-paragraf.html", "Paragraf & format teks"],
      ["04-link.html", "Menghubungkan halaman"],
      ["05-gambar.html", "Gambar yang bermakna"],
      ["06-list.html", "Daftar & pengelompokan"],
      ["07-div-container.html", "Container & struktur"],
      ["studi-kasus-profile.html", "Proyek: halaman profil"],
    ],
  },
  {
    id: "02",
    folder: "pertemuan-02-fondasi-css",
    title: "Fondasi CSS",
    subtitle: "Beri karakter pada karyamu.",
    description:
      "Mainkan warna, tipografi, dan ruang. Ubah halaman sederhana menjadi pengalaman yang nyaman dilihat.",
    category: "Fondasi",
    tech: "CSS",
    symbol: "{ }",
    color: "blue",
    level: "Pemula",
    outcome: "Halaman profil dengan gaya sendiri",
    objectives: [
      "Menghubungkan stylesheet dan memilih elemen.",
      "Membedakan margin, border, padding, dan konten.",
      "Menata halaman responsif yang nyaman dibaca.",
    ],
    challenge:
      "Berikan identitas pada profil HTML-mu: atur warna utama, jarak, dan ukuran teks. Pastikan tetap terbaca pada layar ponsel.",
    quiz: {
      question:
        "Bagian box model mana yang memberi ruang antara konten dan border?",
      options: ["Margin", "Padding", "Outline"],
      answer: 1,
      explanation:
        "Padding adalah ruang di dalam border. Margin memberi jarak di luar border, sedangkan outline tidak menambah ruang pada layout.",
    },
    lessons: [
      ["01-css-eksternal.html", "Menghubungkan CSS eksternal"],
      ["02-selector.html", "Selector & specificity"],
      ["03-properti-text.html", "Tipografi & properti teks"],
      ["04-warna-background.html", "Warna & background"],
      ["05-box-model.html", "Mengenal box model"],
      ["06-layout-dasar.html", "Layout dasar"],
      ["studi-kasus-profile-styled.html", "Proyek: profil dengan gaya"],
    ],
  },
  {
    id: "03",
    folder: "pertemuan-03-bootstrap-grid",
    title: "Bootstrap & Grid",
    subtitle: "Susun layout, lebih cepat.",
    description:
      "Bangun halaman responsif dengan grid 12 kolom, komponen, dan utility Bootstrap.",
    category: "Framework",
    tech: "Bootstrap",
    symbol: "B",
    color: "purple",
    level: "Menengah",
    outcome: "Landing page responsif",
    objectives: [
      "Memasang Bootstrap melalui CDN.",
      "Menyusun container, row, dan kolom responsif.",
      "Menggabungkan komponen menjadi landing page.",
    ],
    challenge:
      "Susun landing page dengan navigasi, tiga kartu fitur, dan footer. Buat kartu bertumpuk di layar kecil.",
    quiz: {
      question: "Apa fungsi class col-md-6 pada sistem grid Bootstrap?",
      options: [
        "Lebar 6 piksel di semua layar",
        "Mengisi 6 dari 12 kolom mulai breakpoint md",
        "Membuat 6 baris",
      ],
      answer: 1,
      explanation:
        "col-md-6 mengisi separuh lebar baris mulai breakpoint md. Ukuran layar yang lebih kecil mengikuti aturan grid lain yang diterapkan.",
    },
    lessons: [
      ["01-bootstrap-cdn.html", "Setup Bootstrap via CDN"],
      ["02-grid-system.html", "Grid 12 kolom"],
      ["03-bootstrap-components.html", "Komponen Bootstrap"],
      ["04-bootstrap-utilities.html", "Utilities & helper classes"],
      ["studi-kasus-bootstrap.html", "Proyek: landing page"],
    ],
  },
  {
    id: "04",
    folder: "pertemuan-04-tailwind-css",
    title: "Tailwind CSS",
    subtitle: "Rangkai kelas, wujudkan ide.",
    description:
      "Eksplorasi utility-first untuk merancang komponen yang terasa milikmu. Materi menggunakan Tailwind v3.",
    category: "Framework",
    tech: "Tailwind",
    symbol: "≈",
    color: "cyan",
    level: "Menengah",
    outcome: "Koleksi komponen antarmuka",
    objectives: [
      "Memahami pola utility-first.",
      "Menggabungkan utility untuk spacing, warna, dan layout.",
      "Membuat variasi komponen responsif.",
    ],
    challenge:
      "Buat kartu produk dengan gambar, harga, dan tombol. Tambahkan keadaan hover serta layout yang menyesuaikan layar.",
    quiz: {
      question: "Apa inti pendekatan utility-first?",
      options: [
        "Menulis semua CSS sebagai inline style",
        "Menggabungkan class kecil dengan fungsi spesifik",
        "Memakai satu komponen yang tidak bisa diubah",
      ],
      answer: 1,
      explanation:
        "Utility-first menyusun tampilan melalui class yang punya tugas spesifik, misalnya padding, warna, atau display. Utility dapat digabungkan untuk membentuk komponen.",
    },
    lessons: [
      ["01-pengenalan-tailwind.html", "Pengenalan utility-first"],
      ["02-tailwind-components.html", "Merangkai komponen Tailwind"],
    ],
  },
  {
    id: "05",
    folder: "pertemuan-05-php-dasar",
    title: "Dasar PHP",
    subtitle: "Kenali sisi server.",
    description:
      "Pelajari variabel, logika, fungsi, dan penanganan form. Jalankan contoh dengan server PHP lokal.",
    category: "Backend",
    tech: "PHP",
    symbol: "php",
    color: "violet",
    level: "Menengah",
    outcome: "Form kontak dengan validasi",
    objectives: [
      "Menjalankan PHP melalui server lokal.",
      "Menggunakan variabel, percabangan, loop, dan fungsi.",
      "Memvalidasi input serta mengamankan output HTML.",
    ],
    challenge:
      "Buat form kontak dengan nama, email, dan pesan. Validasi field kosong dan tampilkan hasil dengan htmlspecialchars.",
    quiz: {
      question: "Di mana kode PHP diproses saat pengguna membuka halaman PHP?",
      options: [
        "Di mesin server yang menjalankan PHP",
        "Di CSS browser",
        "Di localStorage pengguna",
      ],
      answer: 0,
      explanation:
        "PHP dieksekusi oleh server. Browser menerima hasilnya, biasanya HTML. Hosting statis seperti GitHub Pages tidak mengeksekusi PHP.",
    },
    lessons: [
      ["01-php-dasar.php", "Sintaks, variabel & tipe data"],
      ["02-control-flow.php", "Control flow & struktur data"],
      ["03-form-handling.php", "Form handling & validasi"],
    ],
  },
  {
    id: "06",
    folder: "pertemuan-06-javascript-data",
    title: "JavaScript & Data",
    subtitle: "Beri ingatan pada aplikasi.",
    description:
      "Kelola data dengan array dan JSON, simpan di browser, lalu bangun to-do app sederhana.",
    category: "JavaScript",
    tech: "JavaScript",
    symbol: "JS",
    color: "yellow",
    level: "Menengah",
    outcome: "To-do app yang menyimpan data",
    objectives: [
      "Mengolah array dan object menjadi data tampilan.",
      "Menggunakan JSON untuk menyimpan dan membaca data.",
      "Membangun to-do app dengan penyimpanan lokal.",
    ],
    challenge:
      "Buat daftar tugas yang bisa ditambah, ditandai selesai, dan dihapus. Simpan datanya ke localStorage saat dijalankan di browser lokal.",
    quiz: {
      question: "Bagaimana cara menyimpan object ke localStorage?",
      options: [
        "Langsung simpan object sebagai nilai",
        "Ubah menjadi string dengan JSON.stringify",
        "Ubah object menjadi elemen <div>",
      ],
      answer: 1,
      explanation:
        "localStorage menyimpan string. Gunakan JSON.stringify saat menyimpan, lalu JSON.parse saat membacanya, dengan penanganan data rusak atau storage yang diblokir.",
    },
    lessons: [
      ["01-data-storage.html", "Data & browser storage"],
      ["02-todo-app.html", "Proyek: to-do app"],
    ],
  },
  {
    id: "07",
    folder: "pertemuan-07-javascript-async",
    title: "Async & API",
    subtitle: "Terhubung, tanpa menunggu.",
    description:
      "Pahami promise, async/await, dan fetch. Tangani loading serta error dengan baik.",
    category: "JavaScript",
    tech: "Async",
    symbol: "↗",
    color: "mint",
    level: "Lanjutan",
    outcome: "Antarmuka data asynchronous",
    objectives: [
      "Memahami promise dan async/await.",
      "Mengambil data dengan fetch dan membaca respons.",
      "Menampilkan keadaan loading, berhasil, serta gagal.",
    ],
    challenge:
      "Bangun tombol pemuat data dengan indikator loading. Tangani kegagalan menggunakan try/catch dan berikan tombol untuk mencoba lagi.",
    quiz: {
      question: "Mengapa respons fetch perlu diperiksa melalui response.ok?",
      options: [
        "Karena fetch selalu melempar error untuk HTTP 404",
        "Karena respons HTTP error masih dapat memenuhi promise fetch",
        "Karena response.ok mengubah respons menjadi JSON",
      ],
      answer: 1,
      explanation:
        "fetch tidak otomatis menolak promise untuk status HTTP seperti 404 atau 500. Periksa response.ok dan tangani kesalahan sebelum memakai data.",
    },
    lessons: [["01-async-programming.html", "Promise, async/await & fetch"]],
  },
];
