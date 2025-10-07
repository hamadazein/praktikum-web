<?php
  $moduleInfo = [
    'title' => 'PHP Dasar',
    'description' => 'Memulai backend development dengan sintaks PHP, control flow, serta penanganan form dan sesi.',
    'prerequisites' => ['HTML', 'CSS', 'Basic Programming Logic'],
    'duration' => '4-6 jam',
    'difficulty' => 'Beginner',
  ];

  $lessons = [
    [
      'title' => 'PHP Dasar & Sintaks',
      'file' => '01-php-dasar.php',
      'description' => 'Memahami variabel, array, fungsi, dan integrasi PHP dengan HTML.',
      'tags' => ['PHP', 'Fundamental', 'Sintaks'],
      'duration' => '90 menit',
      'concepts' => ['Variables', 'Arrays', 'Functions', 'Type Hints'],
    ],
    [
      'title' => 'Control Flow & Data Struktur',
      'file' => '02-control-flow.php',
      'description' => 'Mengelola logika menggunakan kondisional, looping, dan array multidimensi.',
      'tags' => ['Logic', 'Array', 'Function'],
      'duration' => '90 menit',
      'concepts' => ['If/Else', 'Loops', 'Multidimensional Arrays', 'Data Processing'],
    ],
    [
      'title' => 'Form Handling & Validasi',
      'file' => '03-form-handling.php',
      'description' => 'Membangun form aman dengan validasi server-side dan penyimpanan sesi.',
      'tags' => ['Form', 'Validation', 'Session'],
      'duration' => '120 menit',
      'concepts' => ['$_POST/$_GET', 'Validation', 'Sessions', 'Security'],
    ],
  ];

  $setupInstructions = [
    'Install web server (XAMPP/Laragon) atau gunakan PHP built-in server',
    'Letakkan project di direktori yang dapat diakses web server',
    'Pastikan PHP versi 7.4 atau lebih baru',
    'Akses melalui browser dengan localhost',
  ];

  $learningObjectives = [
    'Memahami sintaks dasar PHP dan perbedaannya dengan JavaScript',
    'Mengelola data menggunakan variabel, array, dan struktur kontrol',
    'Membangun form interaktif dengan validasi server-side',
    'Menerapkan keamanan dasar dalam pengolahan input pengguna',
    'Menggunakan session untuk menyimpan data antar request',
  ];
?>
<!DOCTYPE html>
<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Pertemuan 05 • PHP Dasar</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
      body {
        font-family: 'Plus Jakarta Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        background: #020617;
        color: #f8fafc;
      }
      a.card:hover {
        transform: translateY(-4px);
      }
    </style>
  </head>
  <body class="min-h-screen bg-slate-950">
    <div class="mx-auto max-w-5xl px-6 py-16">
      <header class="mb-12 rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-900/70 p-10 shadow-2xl shadow-emerald-900/30">
        <div class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div class="flex-1">
            <p class="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-emerald-200">
              Pertemuan 05
            </p>
            <h1 class="mt-6 text-4xl font-semibold text-white"><?php echo $moduleInfo['title']; ?>: Server-Side Development</h1>
            <p class="mt-4 text-slate-300"><?php echo $moduleInfo['description']; ?></p>
          </div>
          <div class="flex flex-col gap-3 text-sm">
            <div class="rounded-2xl border border-emerald-400/30 bg-emerald-500/15 px-4 py-2">
              <span class="text-xs uppercase tracking-[0.3em] text-emerald-300">Durasi</span>
              <p class="font-semibold text-white"><?php echo $moduleInfo['duration']; ?></p>
            </div>
            <div class="rounded-2xl border border-blue-400/30 bg-blue-500/15 px-4 py-2">
              <span class="text-xs uppercase tracking-[0.3em] text-blue-300">Level</span>
              <p class="font-semibold text-white"><?php echo $moduleInfo['difficulty']; ?></p>
            </div>
          </div>
        </div>

        <div class="mt-8 grid gap-6 lg:grid-cols-2">
          <div class="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 class="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Prerequisites</h3>
            <ul class="mt-3 space-y-2 text-sm text-slate-300">
              <?php foreach ($moduleInfo['prerequisites'] as $prereq): ?>
                <li class="flex items-center gap-2">
                  <span class="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                  <?php echo htmlspecialchars($prereq); ?>
                </li>
              <?php endforeach; ?>
            </ul>
          </div>
          <div class="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 class="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Learning Objectives</h3>
            <ul class="mt-3 space-y-2 text-sm text-slate-300">
              <?php foreach (array_slice($learningObjectives, 0, 3) as $objective): ?>
                <li class="flex items-start gap-2">
                  <span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400"></span>
                  <span><?php echo htmlspecialchars($objective); ?></span>
                </li>
              <?php endforeach; ?>
            </ul>
          </div>
        </div>
      </header>

      <section class="mb-12 rounded-3xl border border-white/10 bg-slate-900/70 p-8 shadow-xl shadow-slate-900/40">
        <h2 class="text-2xl font-semibold text-white">Setup Environment</h2>
        <p class="mt-3 text-sm text-slate-300">Pastikan environment PHP sudah terkonfigurasi sebelum memulai praktikum:</p>
        <div class="mt-6 grid gap-4 md:grid-cols-2">
          <div class="rounded-2xl border border-amber-400/30 bg-amber-500/10 p-4">
            <h3 class="text-sm font-semibold text-amber-200">Opsi 1: Web Server Package</h3>
            <ul class="mt-3 space-y-2 text-xs text-amber-100">
              <?php foreach (array_slice($setupInstructions, 0, 2) as $instruction): ?>
                <li class="flex items-start gap-2">
                  <span class="mt-1 h-1 w-1 shrink-0 rounded-full bg-amber-300"></span>
                  <span><?php echo htmlspecialchars($instruction); ?></span>
                </li>
              <?php endforeach; ?>
            </ul>
          </div>
          <div class="rounded-2xl border border-blue-400/30 bg-blue-500/10 p-4">
            <h3 class="text-sm font-semibold text-blue-200">Opsi 2: Built-in Server</h3>
            <div class="mt-3 rounded-xl bg-black/50 p-3 text-xs text-blue-100">
              <code>php -S localhost:8000</code>
            </div>
            <p class="mt-2 text-xs text-blue-200">Kemudian buka http://localhost:8000</p>
          </div>
        </div>
      </section>

      <section class="mb-12 grid gap-6 lg:grid-cols-3">
        <?php foreach ($lessons as $index => $lesson): ?>
          <a
            href="<?php echo $lesson['file']; ?>"
            class="card group relative flex flex-col gap-4 rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-xl shadow-slate-900/40 transition hover:border-emerald-400/50 hover:bg-slate-900/90"
          >
            <div class="flex items-center gap-3">
              <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-lg font-bold text-emerald-300">
                <?php echo $index + 1; ?>
              </span>
              <div>
                <h2 class="text-lg font-semibold text-white group-hover:text-emerald-300"><?php echo htmlspecialchars($lesson['title']); ?></h2>
                <p class="text-xs text-slate-400"><?php echo $lesson['duration']; ?></p>
              </div>
            </div>
            
            <p class="text-sm text-slate-300"><?php echo htmlspecialchars($lesson['description']); ?></p>
            
            <div class="space-y-3">
              <div>
                <h4 class="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Konsep Utama</h4>
                <div class="mt-2 flex flex-wrap gap-1">
                  <?php foreach ($lesson['concepts'] as $concept): ?>
                    <span class="rounded-full bg-slate-800/60 px-2 py-1 text-xs text-slate-300">
                      <?php echo htmlspecialchars($concept); ?>
                    </span>
                  <?php endforeach; ?>
                </div>
              </div>
              
              <div>
                <h4 class="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Tags</h4>
                <div class="mt-2 flex flex-wrap gap-2">
                  <?php foreach ($lesson['tags'] as $tag): ?>
                    <span class="rounded-full border border-emerald-400/40 bg-emerald-500/15 px-2 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-200">
                      <?php echo htmlspecialchars($tag); ?>
                    </span>
                  <?php endforeach; ?>
                </div>
              </div>
            </div>
            
            <span class="mt-auto text-xs font-semibold uppercase tracking-[0.3em] text-emerald-200">Mulai pembelajaran →</span>
          </a>
        <?php endforeach; ?>
      </section>

      <section class="rounded-3xl border border-white/10 bg-slate-900/70 p-8 shadow-xl shadow-slate-900/40">
        <h2 class="text-2xl font-semibold text-white">Tujuan Pembelajaran</h2>
        <div class="mt-6 grid gap-4 md:grid-cols-2">
          <?php foreach ($learningObjectives as $index => $objective): ?>
            <div class="flex items-start gap-3 rounded-2xl border border-white/5 bg-white/5 p-4">
              <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-xs font-bold text-emerald-300">
                <?php echo $index + 1; ?>
              </span>
              <p class="text-sm text-slate-300"><?php echo htmlspecialchars($objective); ?></p>
            </div>
          <?php endforeach; ?>
        </div>
      </section>
    </div>

    <script src="../back-button.js"></script>
  </body>
</html>
