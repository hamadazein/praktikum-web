<?php
  $lessons = [
    [
      'title' => 'PHP Dasar & Sintaks',
      'file' => '01-php-dasar.php',
      'description' => 'Memahami variabel, array, fungsi, dan integrasi PHP dengan HTML.',
      'tags' => ['PHP', 'Fundamental', 'Sintaks'],
    ],
    [
      'title' => 'Control Flow & Data Struktur',
      'file' => '02-control-flow.php',
      'description' => 'Mengelola logika menggunakan kondisional, looping, dan array multidimensi.',
      'tags' => ['Logic', 'Array', 'Function'],
    ],
    [
      'title' => 'Form Handling & Validasi',
      'file' => '03-form-handling.php',
      'description' => 'Membangun form aman dengan validasi server-side dan penyimpanan sesi.',
      'tags' => ['Form', 'Validation', 'Session'],
    ],
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
      <header class="mb-12 rounded-3xl border border-white/10 bg-slate-900/80 p-10 shadow-2xl shadow-blue-900/30">
        <p class="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-emerald-200">
          Pertemuan 05
        </p>
        <h1 class="mt-6 text-4xl font-semibold text-white">PHP Dasar: Dari Sintaks hingga Form Handling</h1>
        <p class="mt-4 text-slate-300">
          Gunakan halaman ini sebagai peta materi. Jalankan project di server lokal untuk mengeksplorasi setiap file PHP dan perhatikan bagaimana logika server menghasilkan output dinamis.
        </p>
      </header>

      <section class="grid gap-6 md:grid-cols-2">
        <?php foreach ($lessons as $lesson): ?>
          <a
            href="<?php echo $lesson['file']; ?>"
            class="card group relative flex flex-col gap-4 rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-xl shadow-slate-900/40 transition hover:border-emerald-400/50 hover:bg-slate-900/90"
          >
            <div>
              <h2 class="text-xl font-semibold text-white group-hover:text-emerald-300"><?php echo htmlspecialchars($lesson['title']); ?></h2>
              <p class="mt-3 text-sm text-slate-300"><?php echo htmlspecialchars($lesson['description']); ?></p>
            </div>
            <div class="flex flex-wrap gap-2 text-xs text-emerald-200">
              <?php foreach ($lesson['tags'] as $tag): ?>
                <span class="rounded-full border border-emerald-400/40 bg-emerald-500/15 px-3 py-1 font-semibold uppercase tracking-[0.25em]">
                  <?php echo htmlspecialchars($tag); ?>
                </span>
              <?php endforeach; ?>
            </div>
            <span class="mt-auto text-xs font-semibold uppercase tracking-[0.3em] text-emerald-200">Buka materi →</span>
          </a>
        <?php endforeach; ?>
      </section>
    </div>

    <script src="../back-button.js"></script>
  </body>
</html>
