<?php
  session_start();

  if (!isset($_SESSION['messages'])) {
    $_SESSION['messages'] = [];
  }

  $errors = [];
  $successMessage = null;
  $formData = [
    'name' => '',
    'email' => '',
    'subject' => '',
    'message' => '',
  ];

  if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $formData['name'] = trim($_POST['name'] ?? '');
    $formData['email'] = trim($_POST['email'] ?? '');
    $formData['subject'] = trim($_POST['subject'] ?? '');
    $formData['message'] = trim($_POST['message'] ?? '');

    if ($formData['name'] === '') {
      $errors['name'] = 'Nama wajib diisi.';
    }

    if ($formData['email'] === '') {
      $errors['email'] = 'Email wajib diisi.';
    } elseif (!filter_var($formData['email'], FILTER_VALIDATE_EMAIL)) {
      $errors['email'] = 'Format email tidak valid.';
    }

    if ($formData['subject'] === '') {
      $errors['subject'] = 'Topik pesan wajib diisi.';
    }

    if ($formData['message'] === '') {
      $errors['message'] = 'Pesan tidak boleh kosong.';
    } elseif (strlen($formData['message']) < 20) {
      $errors['message'] = 'Tuliskan pesan minimal 20 karakter agar jelas.';
    }

    if (empty($errors)) {
      $savedMessage = [
        'name' => htmlspecialchars($formData['name']),
        'email' => htmlspecialchars($formData['email']),
        'subject' => htmlspecialchars($formData['subject']),
        'message' => nl2br(htmlspecialchars($formData['message'])),
        'created_at' => date('d M Y, H:i'),
      ];

      $_SESSION['messages'][] = $savedMessage;

      $successMessage = 'Pesan berhasil dikirim dan tersimpan di sesi.';
      $formData = ['name' => '', 'email' => '', 'subject' => '', 'message' => ''];
    }
  }

  $history = array_reverse($_SESSION['messages']);
?>
<!DOCTYPE html>
<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Form Handling PHP | Praktikum Web</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
      body {
        font-family: 'Plus Jakarta Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        background: #020617;
        color: #f1f5f9;
      }
      textarea {
        resize: vertical;
        min-height: 120px;
      }
    </style>
  </head>
  <body class="min-h-screen bg-slate-950">
    <div class="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-16 lg:flex-row">
      <section class="w-full rounded-3xl border border-white/10 bg-slate-900/80 p-10 shadow-2xl shadow-slate-900/40 lg:w-3/5">
        <p class="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-emerald-200">
          Pertemuan 05 • Form Handling
        </p>
        <h1 class="mt-6 text-3xl font-semibold text-white">Mengolah Input Pengguna dengan Aman</h1>
        <p class="mt-4 text-sm text-slate-300">
          Form ini menyimpan pesan ke sesi menggunakan PHP. Validasi dasar memastikan data bersih sebelum ditampilkan kembali. Cobalah mengosongkan field atau menulis email tidak valid untuk melihat pesan error.
        </p>

        <?php if (!empty($successMessage)): ?>
          <div class="mt-6 rounded-2xl border border-emerald-400/40 bg-emerald-500/20 px-4 py-3 text-sm text-emerald-100">
            <?php echo $successMessage; ?>
          </div>
        <?php endif; ?>

        <form method="POST" class="mt-8 space-y-6 text-sm">
          <div>
            <label for="name" class="mb-2 block font-semibold text-white">Nama Lengkap</label>
            <input
              id="name"
              name="name"
              type="text"
              value="<?php echo htmlspecialchars($formData['name']); ?>"
              class="w-full rounded-2xl border <?php echo isset($errors['name']) ? 'border-rose-400/60' : 'border-white/10'; ?> bg-slate-950/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
              placeholder="Tulis nama lengkapmu"
              autocomplete="name"
              required
            />
            <?php if (isset($errors['name'])): ?>
              <p class="mt-2 text-xs font-medium text-rose-300"><?php echo $errors['name']; ?></p>
            <?php endif; ?>
          </div>

          <div>
            <label for="email" class="mb-2 block font-semibold text-white">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value="<?php echo htmlspecialchars($formData['email']); ?>"
              class="w-full rounded-2xl border <?php echo isset($errors['email']) ? 'border-rose-400/60' : 'border-white/10'; ?> bg-slate-950/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
              placeholder="contoh: mahasiswa@kampus.ac.id"
              autocomplete="email"
              required
            />
            <?php if (isset($errors['email'])): ?>
              <p class="mt-2 text-xs font-medium text-rose-300"><?php echo $errors['email']; ?></p>
            <?php endif; ?>
          </div>

          <div>
            <label for="subject" class="mb-2 block font-semibold text-white">Topik Pesan</label>
            <input
              id="subject"
              name="subject"
              type="text"
              value="<?php echo htmlspecialchars($formData['subject']); ?>"
              class="w-full rounded-2xl border <?php echo isset($errors['subject']) ? 'border-rose-400/60' : 'border-white/10'; ?> bg-slate-950/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
              placeholder="Misal: Saran materi praktikum"
              required
            />
            <?php if (isset($errors['subject'])): ?>
              <p class="mt-2 text-xs font-medium text-rose-300"><?php echo $errors['subject']; ?></p>
            <?php endif; ?>
          </div>

          <div>
            <label for="message" class="mb-2 block font-semibold text-white">Pesan</label>
            <textarea
              id="message"
              name="message"
              class="w-full rounded-2xl border <?php echo isset($errors['message']) ? 'border-rose-400/60' : 'border-white/10'; ?> bg-slate-950/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
              placeholder="Tulis pesan lengkapmu"
              required
            ><?php echo htmlspecialchars($formData['message']); ?></textarea>
            <p class="mt-2 text-xs text-slate-400">Minimal 20 karakter agar pesan mudah dipahami.</p>
            <?php if (isset($errors['message'])): ?>
              <p class="mt-2 text-xs font-medium text-rose-300"><?php echo $errors['message']; ?></p>
            <?php endif; ?>
          </div>

          <button
            type="submit"
            class="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-950 transition hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
          >
            Kirim Pesan
          </button>
        </form>
      </section>

      <aside class="w-full rounded-3xl border border-white/10 bg-slate-900/60 p-8 shadow-2xl shadow-slate-900/40 lg:w-2/5">
        <h2 class="text-xl font-semibold text-white">Logika di Balik Layar</h2>
        <ul class="mt-4 space-y-3 text-sm text-slate-300">
          <li><strong>Session</strong> menyimpan riwayat pesan antar refresh (<code>$_SESSION['messages']</code>).</li>
          <li><strong>Validasi server-side</strong> memastikan data aman meski JavaScript dimatikan.</li>
          <li><strong>Sanitasi</strong> memakai <code>htmlspecialchars</code> agar tidak disisipi script.</li>
          <li>Pesan berhasil akan muncul di panel "Riwayat Pesan" secara realtime.</li>
        </ul>

        <div class="mt-8 rounded-3xl border border-white/5 bg-black/50 p-6">
          <h3 class="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Riwayat Pesan</h3>
          <?php if (count($history) === 0): ?>
            <p class="mt-4 text-xs text-slate-500">Belum ada pesan tersimpan. Kirim melalui form di samping.</p>
          <?php else: ?>
            <ul class="mt-4 space-y-4 text-xs text-slate-200">
              <?php foreach ($history as $message): ?>
                <li class="rounded-2xl border border-white/10 bg-slate-800/70 p-4">
                  <div class="flex items-center justify-between text-[0.7rem] uppercase tracking-[0.3em] text-slate-400">
                    <span><?php echo $message['created_at']; ?></span>
                    <span><?php echo $message['subject']; ?></span>
                  </div>
                  <p class="mt-3 text-sm font-semibold text-white"><?php echo $message['name']; ?> • <?php echo $message['email']; ?></p>
                  <p class="mt-2 leading-relaxed text-slate-200"><?php echo $message['message']; ?></p>
                </li>
              <?php endforeach; ?>
            </ul>
          <?php endif; ?>
        </div>

        <div class="mt-8 rounded-3xl border border-emerald-400/30 bg-emerald-500/10 p-6 text-xs text-emerald-100">
          <h3 class="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">Eksperimen Lanjutan</h3>
          <ol class="mt-3 list-decimal space-y-2 pl-5">
            <li>Simpan data ke file `.json` menggunakan `file_put_contents`.</li>
            <li>Kirim email notifikasi (simulasi) dengan `mail()` atau library PHPMailer.</li>
            <li>Tambahkan checkbox "Setujui kebijakan" dan validasi statusnya.</li>
            <li>Implementasikan CAPTCHA sederhana (angka acak) untuk latihan keamanan.</li>
          </ol>
        </div>
      </aside>
    </div>

    <script src="../back-button.js"></script>
  </body>
</html>
