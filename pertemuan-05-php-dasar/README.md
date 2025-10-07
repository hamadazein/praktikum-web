# PERTEMUAN 5: FUNDAMENTAL PHP – SERVER-SIDE FIRST STEPS 🐘

## 🔭 Gambaran Besar

Setelah membangun antarmuka dengan HTML, CSS, dan Tailwind, saatnya memahami **logika di sisi server**. PHP memungkinkan aplikasi web menerima input, memproses data, menyimpan informasi, hingga mengirimkan respons dinamis kembali ke browser.

### 📡 Cara Kerja PHP Secara Sederhana

```
Client (Browser) → Mengirim request ke server → PHP dijalankan → Server merespon HTML/CSS/JS → Browser menampilkan hasil
```

Berbeda dengan JavaScript yang berjalan di browser, PHP **dievaluasi terlebih dahulu di server**. Output-nya adalah HTML biasa yang kemudian dikirim ke browser. Karena itu, semua contoh di modul ini perlu dijalankan menggunakan server lokal (XAMPP/Laragon/Docker) agar kode PHP dieksekusi dengan benar.

---

## ⚙️ Setup Lingkungan Kerja

1. **Install web server + PHP**
   - Pilihan populer: [XAMPP](https://www.apachefriends.org/index.html), [Laragon](https://laragon.org/), atau [Devilbox](https://devilbox.readthedocs.io/).
2. **Letakkan project** di dalam direktori yang dipantau server, contoh XAMPP: `C:/xampp/htdocs/praktikum-web`.
3. **Aktifkan Apache** (dan MySQL bila dibutuhkan nanti) lalu akses melalui browser: `http://localhost/praktikum-web`.
4. Jika ingin menjalankan cepat tanpa instalasi, gunakan PHP built-in server:

```powershell
cd C:\Users\Kaprodi TI\Downloads\praktikum-web\praktikum-web
php -S localhost:8000
```

Lalu buka `http://localhost:8000` di browser.

---

## 🧱 Fondasi Sintaks PHP

```php
<?php
  echo "Hello, PHP!";
?>
```

- Setiap file PHP bisa mengandung HTML + blok `<?php ... ?>`.
- Statement diakhiri dengan `;`.
- String bisa menggunakan tanda petik tunggal `'...'` atau ganda `"..."`.

**Output:**
```
Hello, PHP!
```

> 💡 Gunakan `echo` untuk mencetak ke browser, `var_dump()` untuk debugging struktur data.

---

## 📦 Variabel & Tipe Data

- Variabel diawali `$`, case-sensitive.
- Tidak perlu deklarasi tipe karena PHP bertipe dinamis.

```php
<?php
$name = "Aisyah";
$age = 20;
$isActive = true;
$skills = ["HTML", "CSS", "Tailwind"];

var_dump($name, $age, $isActive, $skills);
?>
```

### Konversi Otomatis (Type Juggling)
PHP akan mencoba mengonversi tipe sesuai konteks. Tetap waspada agar tidak memunculkan bug, misalnya saat menambahkan string ke angka.

```php
<?php
$total = "100" + 20; // hasil 120
$invalid = "100px" + 20; // hasil 120 dengan warning
?>
```

> ✅ Best practice: gunakan casting eksplisit `(int)`, `(float)`, `(string)` ketika memproses input pengguna.

---

## 🔁 Kontrol Alur Program

### Kondisional
```php
<?php
$nilai = 86;

if ($nilai >= 90) {
  $predikat = "A";
} elseif ($nilai >= 80) {
  $predikat = "B";
} else {
  $predikat = "C";
}

echo "Predikat: {$predikat}";
?>
```

### Looping
```php
<?php
$students = ["Budi", "Siti", "Rani"];

for ($i = 0; $i < count($students); $i++) {
  echo $students[$i] . "<br>";
}

echo "<hr>";

foreach ($students as $index => $student) {
  echo ($index + 1) . ". $student<br>";
}
?>
```

---

## 🧠 Fungsi & Reusable Logic

```php
<?php
function calculateFinalScore(float $attendance, float $uts, float $uas): float {
  return ($attendance * 0.2) + ($uts * 0.35) + ($uas * 0.45);
}

$score = calculateFinalScore(90, 85, 88);
echo "Nilai akhir: " . number_format($score, 2);
?>
```

- Gunakan *type hint* (PHP 7+) untuk menulis kode lebih eksplisit.
- Manfaatkan `return` untuk mengembalikan hasil dan mengurangi duplikasi kode.

---

## 📮 Superglobal & Input Pengguna

| Superglobal | Deskripsi Singkat |
|-------------|-------------------|
| `$_GET`     | Data dari query string (URL) |
| `$_POST`    | Data dari form method POST |
| `$_REQUEST` | Kombinasi GET + POST + COOKIE (hindari jika bisa) |
| `$_SERVER`  | Informasi server & request |
| `$_SESSION` | Menyimpan data per sesi user |
| `$_COOKIE`  | Menyimpan data di browser |

```php
<?php
// http://localhost/praktikum-web/hello.php?name=Yusuf
$name = $_GET['name'] ?? 'Guest';
echo "Halo, " . htmlspecialchars($name);
?>
```

> ⚠️ Selalu amankan input: gunakan `htmlspecialchars()` untuk output HTML, `intval()` atau `filter_var()` saat memproses angka/email.

---

## 📝 Studi Kasus: Form Kontak Mini

1. **Tampilkan form HTML** dengan field nama, email, dan pesan.
2. Pada submit:
   - Validasi data kosong.
   - Sanitasi input.
   - Simpan ke array sederhana (nanti dapat diganti database).
   - Tampilkan ringkasan di halaman yang sama.

Contoh implementasi lengkap ada di `03-form-handling.php`.

---

## 🧪 Alur Praktikum (Copy → Modify → Analisa)

1. **Copy** file contoh (`01-php-dasar.php`, `02-control-flow.php`, `03-form-handling.php`).
2. **Modify**: ubah nilai, tambah fitur kecil (misalnya field baru, validasi tambahan).
3. **Analisa**: catat apa yang berubah pada output dan mengapa.
4. **Eksperimen lanjutan**:
   - Tambahkan fungsi baru.
   - Simpan data form ke file `.txt` menggunakan `file_put_contents`.
   - Tampilkan pesan error spesifik jika validasi gagal.

---

## ✅ Best Practices PHP Pemula

- **Pisahkan logika dan presentasi** sejak dini (kontrol gunakan fungsi atau file terpisah).
- **Gunakan camelCase** untuk variabel dan fungsi (`$totalScore`, `formatCurrency`).
- **Aktifkan error reporting** saat belajar:
  ```php
  ini_set('display_errors', 1);
  ini_set('display_startup_errors', 1);
  error_reporting(E_ALL);
  ```
- **Validasi & sanitasi semua input** sebelum dipakai.
- **Komentari bagian penting** menggunakan `//` atau `/** */`.
- **Gunakan `.env` atau file konfigurasi terpisah** untuk kredensial saat masuk ke materi database.

---

## 🎯 Checklist Penguasaan

- [ ] Mengatur lingkungan server lokal & menjalankan file PHP.
- [ ] Memahami perbedaan PHP vs JavaScript (server vs client).
- [ ] Menulis variabel, tipe data, dan operasi dasar.
- [ ] Menggunakan kondisional dan looping untuk logika bisnis.
- [ ] Membuat fungsi sendiri dan menerapkan type hint.
- [ ] Mengambil input user (`$_GET`, `$_POST`) dan melakukan sanitasi.
- [ ] Menangani form sederhana dan menampilkan output dinamis.

> 📬 Jika semua poin sudah dicentang, lanjutkan ke materi berikutnya: **PHP + MySQL** untuk penyimpanan data permanen.
