<?php
  $pageTitle = "PHP Dasar";
  $studentName = "Salsa";
  $semester = 3;
  $skills = ["HTML", "CSS", "Tailwind", "Git"];

  $skillBadges = array_map(function ($skill) {
    return strtoupper($skill);
  }, $skills);

  $attendance = 92;
  $uts = 84;
  $uas = 88;

  function calculateFinalScore(float $attendance, float $uts, float $uas): float {
    return ($attendance * 0.2) + ($uts * 0.35) + ($uas * 0.45);
  }

  $finalScore = calculateFinalScore($attendance, $uts, $uas);
?>
<!DOCTYPE html>
<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><?php echo $pageTitle; ?> | Praktikum Web</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&display=swap"
      rel="stylesheet"
    />
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
      body {
        font-family: 'Plus Jakarta Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        background: #020617;
        color: #f8fafc;
      }
      pre {
        white-space: pre-wrap;
        word-break: break-word;
      }
    </style>
  </head>
  <body class="min-h-screen bg-slate-950">
    <div class="relative mx-auto max-w-5xl px-6 py-16">
      <header class="mb-10 rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-blue-900/30">
        <p class="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-emerald-200">
          Pertemuan 05 • PHP Dasar
        </p>
        <h1 class="mt-6 text-4xl font-semibold text-white">Mengenal Sintaks dan Struktur PHP</h1>
        <p class="mt-4 text-slate-300">
          File ini mencontohkan bagaimana PHP digunakan untuk menghasilkan HTML dinamis. Jalankan melalui server lokal untuk melihat hasilnya: `php -S localhost:8000` kemudian buka file ini di browser.
        </p>
      </header>

      <section class="mb-12 grid gap-6 lg:grid-cols-2">
        <article class="rounded-3xl border border-white/5 bg-slate-900/70 p-6 shadow-lg shadow-slate-900/40">
          <h2 class="text-xl font-semibold text-white">Profil Dinamis Mahasiswa</h2>
          <p class="mt-2 text-sm text-slate-400">Data di bawah ini berasal dari variabel PHP.</p>
          <dl class="mt-4 space-y-3 text-sm text-slate-300">
            <div class="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
              <dt class="font-medium text-slate-400">Nama</dt>
              <dd class="font-semibold text-white"><?php echo htmlspecialchars($studentName); ?></dd>
            </div>
            <div class="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
              <dt class="font-medium text-slate-400">Semester</dt>
              <dd class="font-semibold text-white"><?php echo $semester; ?></dd>
            </div>
            <div class="rounded-2xl bg-white/5 px-4 py-4">
              <dt class="font-medium text-slate-400">Skills</dt>
              <dd class="mt-2 flex flex-wrap gap-2">
                <?php foreach ($skillBadges as $badge): ?>
                  <span class="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-blue-200">
                    <?php echo htmlspecialchars($badge); ?>
                  </span>
                <?php endforeach; ?>
              </dd>
            </div>
          </dl>
        </article>

        <article class="rounded-3xl border border-blue-500/40 bg-blue-500/10 p-6 shadow-xl shadow-blue-900/30">
          <h2 class="text-xl font-semibold text-white">Fungsi Penilaian</h2>
          <p class="mt-2 text-sm text-blue-100">
            Perhitungan nilai akhir menggunakan fungsi PHP dengan type hint. Ubah nilai input dan refresh halaman untuk melihat perbedaan.
          </p>
          <div class="mt-4 grid gap-3 text-sm text-blue-100">
            <div class="flex items-center justify-between rounded-2xl bg-blue-500/20 px-4 py-3">
              <span>Absensi</span>
              <span><?php echo $attendance; ?>%</span>
            </div>
            <div class="flex items-center justify-between rounded-2xl bg-blue-500/20 px-4 py-3">
              <span>UTS</span>
              <span><?php echo $uts; ?></span>
            </div>
            <div class="flex items-center justify-between rounded-2xl bg-blue-500/20 px-4 py-3">
              <span>UAS</span>
              <span><?php echo $uas; ?></span>
            </div>
            <div class="rounded-2xl bg-emerald-500/20 px-4 py-4 text-emerald-100">
              <p class="text-sm uppercase tracking-[0.3em] text-emerald-400">Nilai Akhir</p>
              <p class="mt-2 text-3xl font-semibold text-white"><?php echo number_format($finalScore, 2); ?></p>
            </div>
          </div>
        </article>
      </section>

      <section class="mb-12 rounded-3xl border border-white/10 bg-slate-900/70 p-8 shadow-lg shadow-slate-900/40">
        <h2 class="text-2xl font-semibold text-white">Potongan Kode Utama</h2>
        <p class="mt-3 text-sm text-slate-300">
          Pahami bagaimana HTML dan PHP bekerja berdampingan. PHP memproses logika terlebih dahulu, kemudian output-nya ditanamkan ke struktur HTML.
        </p>
        <div class="mt-6 space-y-6">
          <details class="group rounded-2xl border border-white/5 bg-slate-950/60 p-5" open>
            <summary class="cursor-pointer text-sm font-semibold text-white">
              Variabel, Array, dan Fungsi `calculateFinalScore`
            </summary>
            <pre class="mt-3 overflow-x-auto rounded-2xl bg-black/70 p-4 text-sm text-emerald-300"><?php echo htmlspecialchars("$" . "skills = ['HTML', 'CSS', 'Tailwind', 'Git'];\n\nfunction calculateFinalScore(float $attendance, float $uts, float $uas): float {\n  return ($attendance * 0.2) + ($uts * 0.35) + ($uas * 0.45);\n}\n"); ?></pre>
          </details>

          <details class="group rounded-2xl border border-white/5 bg-slate-950/60 p-5">
            <summary class="cursor-pointer text-sm font-semibold text-white">Looping `foreach` untuk Badge</summary>
            <pre class="mt-3 overflow-x-auto rounded-2xl bg-black/70 p-4 text-sm text-indigo-200"><?php echo htmlspecialchars("<?php foreach ($skillBadges as $badge): ?>\n  <span class='badge'><?php echo htmlspecialchars($badge); ?></span>\n<?php endforeach; ?>"); ?></pre>
          </details>
        </div>
      </section>

      <section class="mb-12 rounded-3xl border border-emerald-400/30 bg-emerald-500/10 p-8 shadow-lg shadow-emerald-900/30">
        <h2 class="text-2xl font-semibold text-white">Praktikum: Copy → Modify → Analisa</h2>
        <ol class="mt-4 list-decimal space-y-3 pl-6 text-sm text-emerald-100">
          <li>Copy file ini menjadi `01-php-dasar-mod.php`.</li>
          <li>Ubah daftar skill menjadi 5 item dan tambahkan logika untuk menandai skill favorit.</li>
          <li>Tambahkan fungsi baru bernama `getGrade($score)` yang mengonversi nilai akhir menjadi huruf (A/B/C).</li>
          <li>Analisa perbedaan output sebelum dan sesudah perubahan, catat pada catatan praktikum.</li>
        </ol>
      </section>

      <section class="rounded-3xl border border-white/10 bg-slate-900/70 p-8 shadow-lg shadow-slate-900/40">
        <h2 class="text-2xl font-semibold text-white">Checklist Best Practice</h2>
        <ul class="mt-4 space-y-3 text-sm text-slate-300">
          <li>Gunakan <code>htmlspecialchars()</code> saat menampilkan input pengguna.</li>
          <li>Jangan gabungkan logika kompleks ke dalam HTML. Bungkus dalam fungsi atau gunakan file terpisah.</li>
          <li>Aktifkan error reporting selama pengembangan: <code>error_reporting(E_ALL);</code>.</li>
          <li>Gunakan nama variabel bermakna dan konsisten (`$finalScore`, bukan `$fs`).</li>
        </ul>
      </section>
    </div>

    <script src="../back-button.js"></script>
  </body>
</html>
