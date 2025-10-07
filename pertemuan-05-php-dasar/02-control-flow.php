<?php
  $className = "Pemrograman Web";
  $students = [
    [
      'name' => 'Rafi',
      'attendance' => 95,
      'assignments' => [85, 90, 87],
    ],
    [
      'name' => 'Nadia',
      'attendance' => 88,
      'assignments' => [92, 91, 94],
    ],
    [
      'name' => 'Putri',
      'attendance' => 77,
      'assignments' => [70, 75, 78],
    ],
  ];

  function calculateAverage(array $scores): float {
    if (count($scores) === 0) {
      return 0;
    }

    return array_sum($scores) / count($scores);
  }

  function evaluatePerformance(float $attendance, float $averageAssignment): string {
    if ($attendance >= 90 && $averageAssignment >= 85) {
      return 'Excellent';
    }

    if ($attendance >= 80 && $averageAssignment >= 75) {
      return 'Good';
    }

    if ($attendance >= 70 && $averageAssignment >= 65) {
      return 'Need Improvement';
    }

    return 'Critical';
  }

  $summaries = [];

  foreach ($students as $student) {
    $averageAssignment = calculateAverage($student['assignments']);
    $performance = evaluatePerformance($student['attendance'], $averageAssignment);

    $summaries[] = [
      'name' => $student['name'],
      'attendance' => $student['attendance'],
      'averageAssignment' => $averageAssignment,
      'performance' => $performance,
    ];
  }
?>
<!DOCTYPE html>
<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Control Flow PHP | Praktikum Web</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
      body {
        font-family: 'Plus Jakarta Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        background: #020617;
        color: #f1f5f9;
      }
    </style>
  </head>
  <body class="min-h-screen bg-slate-950">
    <main class="mx-auto max-w-5xl px-6 py-16">
      <header class="mb-12 rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-900/70 p-10 shadow-2xl shadow-blue-900/40">
        <p class="inline-flex items-center gap-2 rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-blue-200">
          Pertemuan 05 • Control Flow
        </p>
        <h1 class="mt-6 text-4xl font-semibold text-white">Mengelola Alur Logika dengan Kondisional & Looping</h1>
        <p class="mt-4 max-w-3xl text-slate-300">
          Contoh ini menunjukkan bagaimana PHP memutuskan hasil evaluasi mahasiswa berdasarkan kehadiran dan nilai tugas. Perhatikan penggunaan fungsi, kondisi `if/elseif`, serta looping `foreach` untuk menghasilkan ringkasan otomatis.
        </p>
      </header>

      <section class="mb-12 rounded-3xl border border-white/10 bg-slate-900/70 p-8 shadow-xl shadow-slate-900/40">
        <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 class="text-2xl font-semibold text-white"><?php echo htmlspecialchars($className); ?></h2>
            <p class="mt-2 text-sm text-slate-400">Jumlah mahasiswa: <?php echo count($summaries); ?></p>
          </div>
          <div class="rounded-full border border-blue-400/30 bg-blue-500/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-blue-200">
            Control Flow + Array
          </div>
        </div>

        <div class="mt-8 overflow-hidden rounded-3xl border border-white/5">
          <table class="min-w-full divide-y divide-white/10 text-sm">
            <thead class="bg-white/5 text-xs uppercase tracking-[0.2em] text-slate-400">
              <tr>
                <th class="px-4 py-3 text-left">Mahasiswa</th>
                <th class="px-4 py-3 text-center">Kehadiran</th>
                <th class="px-4 py-3 text-center">Rata-rata Tugas</th>
                <th class="px-4 py-3 text-center">Evaluasi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-white/5 bg-slate-950/40 text-slate-200">
              <?php foreach ($summaries as $summary): ?>
                <?php
                  $badgeColor = [
                    'Excellent' => 'bg-emerald-500/20 text-emerald-200 border-emerald-400/40',
                    'Good' => 'bg-blue-500/20 text-blue-200 border-blue-400/40',
                    'Need Improvement' => 'bg-amber-500/15 text-amber-200 border-amber-400/40',
                    'Critical' => 'bg-rose-500/20 text-rose-100 border-rose-400/40',
                  ][$summary['performance']] ?? 'bg-slate-500/20 text-slate-200 border-slate-400/30';
                ?>
                <tr class="transition hover:bg-white/5">
                  <td class="px-4 py-3 font-semibold text-white"><?php echo htmlspecialchars($summary['name']); ?></td>
                  <td class="px-4 py-3 text-center"><?php echo $summary['attendance']; ?>%</td>
                  <td class="px-4 py-3 text-center"><?php echo number_format($summary['averageAssignment'], 2); ?></td>
                  <td class="px-4 py-3 text-center">
                    <span class="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-widest <?php echo $badgeColor; ?>">
                      <?php echo htmlspecialchars($summary['performance']); ?>
                    </span>
                  </td>
                </tr>
              <?php endforeach; ?>
            </tbody>
          </table>
        </div>
      </section>

      <section class="mb-12 grid gap-6 lg:grid-cols-2">
        <article class="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-lg shadow-slate-900/30">
          <h3 class="text-lg font-semibold text-white">Analisa Kode Utama</h3>
          <ul class="mt-4 space-y-3 text-sm text-slate-300">
            <li><strong>Fungsi</strong> <code>calculateAverage</code> melindungi dari pembagian dengan nol.</li>
            <li><strong>Branching</strong> di <code>evaluatePerformance</code> memberi label kualitas belajar.</li>
            <li><strong>Looping</strong> `foreach` digunakan untuk menyusun ringkasan mahasiswa.</li>
            <li><strong>Array multidimensi</strong> menyimpan data mahasiswa secara terstruktur.</li>
          </ul>
        </article>
        <article class="rounded-3xl border border-emerald-400/30 bg-emerald-500/10 p-6 shadow-lg shadow-emerald-900/30">
          <h3 class="text-lg font-semibold text-white">Eksperimen Lanjutan</h3>
          <ol class="mt-4 list-decimal space-y-3 pl-6 text-sm text-emerald-100">
            <li>Tambahkan kolom baru bernama "Catatan" yang berisi pesan motivasi sesuai evaluasi.</li>
            <li>Gunakan `switch` untuk menentukan warna badge alih-alih array mapping.</li>
            <li>Implementasikan filter untuk menampilkan mahasiswa dengan kehadiran di bawah 80%.</li>
            <li>Validasi data dengan memastikan nilai tugas berada di 0–100 sebelum diproses.</li>
          </ol>
        </article>
      </section>

      <section class="rounded-3xl border border-white/10 bg-slate-900/70 p-8 shadow-lg shadow-slate-900/40">
        <h2 class="text-2xl font-semibold text-white">Cuplikan Fungsi</h2>
        <div class="mt-6 grid gap-6 md:grid-cols-2">
          <pre class="rounded-2xl bg-black/70 p-5 text-xs text-emerald-300"><?php echo htmlspecialchars("function calculateAverage(array $scores): float {\n  if (count($scores) === 0) {\n    return 0;\n  }\n  return array_sum($scores) / count($scores);\n}"); ?></pre>
          <pre class="rounded-2xl bg-black/70 p-5 text-xs text-indigo-200"><?php echo htmlspecialchars("function evaluatePerformance(float $attendance, float $averageAssignment): string {\n  if ($attendance >= 90 && $averageAssignment >= 85) {\n    return 'Excellent';\n  }\n  if ($attendance >= 80 && $averageAssignment >= 75) {\n    return 'Good';\n  }\n  if ($attendance >= 70 && $averageAssignment >= 65) {\n    return 'Need Improvement';\n  }\n  return 'Critical';\n}"); ?></pre>
        </div>
      </section>
    </main>

    <script src="../back-button.js"></script>
  </body>
</html>
