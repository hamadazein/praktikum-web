# PERTEMUAN 4: TAILWIND CSS - Framework CSS Utility-First

## **Filosofi Tailwind CSS: Utility-First untuk Pengembangan Cepat**

Jika CSS tradisional adalah **menulis dari nol**, maka Tailwind CSS adalah **menggunakan blok-blok siap pakai** yang dapat dikombinasikan untuk membangun desain yang indah dan responsif dengan cepat. Tailwind mengubah cara kita menulis CSS dari pendekatan komponen ke pendekatan utility-first.

### **Analogi: Tailwind CSS sebagai Lego Digital**

```
CSS Tradisional = Mengukir patung dari batu (lambat, detail)
Tailwind CSS = Menyusun Lego (cepat, fleksibel, dapat digunakan ulang)
Utility Classes = Blok Lego dengan fungsi spesifik
Components = Kombinasi blok untuk membuat struktur kompleks
```

## **Teori Tailwind CSS: Utility-First Framework**

### **Tailwind CSS: CSS yang Mudah dan Cepat**

**Analogi: Tailwind sebagai Perpustakaan Gaya Siap Pakai**

```html
<!-- CSS Tradisional -->
<style>
.custom-button {
  background-color: #3b82f6;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  border: none;
  cursor: pointer;
}
.custom-button:hover {
  background-color: #2563eb;
}
</style>
<button class="custom-button">Click Me</button>

<!-- Tailwind CSS -->
<button class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
  Click Me
</button>

// Perbandingan Pendekatan
CSS Tradisional = Menulis kelas custom untuk setiap komponen
Tailwind CSS = Mengombinasikan utility classes yang sudah ada
```

## **Konsep Dasar Tailwind CSS**

### **1. Utility-First Approach**

Tailwind CSS menggunakan pendekatan utility-first, di mana setiap kelas memiliki satu tujuan spesifik:

```html
<!-- CSS Tradisional -->
<style>
.card {
  background-color: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
</style>
<div class="card">Content</div>

<!-- Tailwind CSS -->
<div class="bg-white rounded-lg p-6 shadow-lg">Content</div>
```

### **2. Core Concepts**

#### **Spacing System**
Tailwind menggunakan sistem spacing yang konsisten:

- **Margin**: `m-{size}` (m-1, m-2, m-4, m-8, dll)
- **Padding**: `p-{size}` (p-1, p-2, p-4, p-8, dll)
- **Specific sides**: `mt-4` (margin-top), `px-6` (padding horizontal)

#### **Responsive Design**
Tailwind memiliki breakpoint bawaan:

- `sm:` - 640px ke atas
- `md:` - 768px ke atas  
- `lg:` - 1024px ke atas
- `xl:` - 1280px ke atas
- `2xl:` - 1536px ke atas

```html
<div class="text-sm md:text-lg lg:text-xl">
  Responsive text size
</div>
```

#### **Color System**
Tailwind menyediakan palet warna yang komprehensif:

```html
<!-- Background Colors -->
<div class="bg-red-500">Red background</div>
<div class="bg-blue-600">Blue background</div>

<!-- Text Colors -->
<p class="text-green-700">Green text</p>

<!-- Border Colors -->
<div class="border-2 border-purple-400">Purple border</div>
```

### **3. Layout & Flexbox**

#### **Flexbox Utilities**
```html
<!-- Container -->
<div class="flex justify-center items-center">
  <div>Centered content</div>
</div>

<!-- Responsive flex -->
<div class="flex flex-col md:flex-row">
  <div class="flex-1">Item 1</div>
  <div class="flex-1">Item 2</div>
</div>
```

#### **Grid System**
```html
<!-- Basic Grid -->
<div class="grid grid-cols-3 gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

<!-- Responsive Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div>Card 1</div>
  <div>Card 2</div>
  <div>Card 3</div>
</div>
```

### **4. Typography**

```html
<!-- Font Sizes -->
<h1 class="text-4xl font-bold">Main Title</h1>
<h2 class="text-2xl font-semibold">Subtitle</h2>
<p class="text-base text-gray-700">Body text</p>

<!-- Font Weights -->
<p class="font-thin">Thin text</p>
<p class="font-normal">Normal text</p>
<p class="font-bold">Bold text</p>

<!-- Text Alignment -->
<p class="text-left">Left aligned</p>
<p class="text-center">Center aligned</p>
<p class="text-right">Right aligned</p>
```

### **5. Spacing & Sizing**

#### **Width & Height**
```html
<!-- Fixed sizes -->
<div class="w-64 h-32">Fixed size</div>

<!-- Responsive sizes -->
<div class="w-full md:w-1/2 lg:w-1/3">Responsive width</div>

<!-- Percentage based -->
<div class="w-1/4">25% width</div>
<div class="w-1/2">50% width</div>
<div class="w-3/4">75% width</div>
```

#### **Margin & Padding**
```html
<!-- All sides -->
<div class="m-4 p-6">Margin 4, Padding 6</div>

<!-- Specific sides -->
<div class="mt-8 mb-4 px-6 py-3">
  Margin top 8, bottom 4, padding horizontal 6, vertical 3
</div>

<!-- Responsive spacing -->
<div class="p-4 md:p-8 lg:p-12">
  Responsive padding
</div>
```

### **6. Colors & Backgrounds**

#### **Color Palette**
Tailwind menggunakan sistem warna dengan skala 50-900:

```html
<!-- Light to dark -->
<div class="bg-blue-50">Very light blue</div>
<div class="bg-blue-100">Light blue</div>
<div class="bg-blue-500">Medium blue</div>
<div class="bg-blue-900">Very dark blue</div>

<!-- Text colors -->
<p class="text-red-600">Red text</p>
<p class="text-green-500">Green text</p>
<p class="text-purple-700">Purple text</p>
```

#### **Gradients**
```html
<!-- Linear gradients -->
<div class="bg-gradient-to-r from-blue-500 to-purple-600">
  Left to right gradient
</div>

<div class="bg-gradient-to-br from-green-400 to-blue-500">
  Diagonal gradient
</div>
```

### **7. Borders & Shadows**

#### **Borders**
```html
<!-- Border width -->
<div class="border border-gray-300">1px border</div>
<div class="border-2 border-blue-500">2px border</div>
<div class="border-4 border-red-600">4px border</div>

<!-- Border radius -->
<div class="rounded">Small radius</div>
<div class="rounded-lg">Large radius</div>
<div class="rounded-full">Fully rounded</div>

<!-- Specific sides -->
<div class="border-t-2 border-b-2">Top and bottom border</div>
```

#### **Shadows**
```html
<!-- Shadow variations -->
<div class="shadow-sm">Small shadow</div>
<div class="shadow">Default shadow</div>
<div class="shadow-lg">Large shadow</div>
<div class="shadow-xl">Extra large shadow</div>

<!-- Colored shadows -->
<div class="shadow-lg shadow-blue-500/50">Blue shadow</div>
```

### **8. Hover, Focus & Other States**

```html
<!-- Hover effects -->
<button class="bg-blue-500 hover:bg-blue-700 text-white">
  Hover me
</button>

<!-- Focus effects -->
<input class="border focus:border-blue-500 focus:ring-2 focus:ring-blue-200">

<!-- Active state -->
<button class="bg-green-500 active:bg-green-700">
  Click me
</button>

<!-- Disabled state -->
<button class="bg-gray-500 disabled:opacity-50" disabled>
  Disabled button
</button>
```

## **Utility Classes Penting**

### **Display & Position**

```html
<!-- Display -->
<div class="block">Block element</div>
<div class="inline-block">Inline-block element</div>
<div class="hidden">Hidden element</div>
<div class="flex">Flex container</div>
<div class="grid">Grid container</div>

<!-- Position -->
<div class="relative">Relative position</div>
<div class="absolute top-0 left-0">Absolute position</div>
<div class="fixed top-4 right-4">Fixed position</div>
<div class="sticky top-0">Sticky position</div>
```

### **Flexbox Utilities**

```html
<div class="flex">
  <!-- Justify content -->
  <div class="flex justify-start">Start</div>
  <div class="flex justify-center">Center</div>
  <div class="flex justify-end">End</div>
  <div class="flex justify-between">Space between</div>
  
  <!-- Align items -->
  <div class="flex items-start">Top aligned</div>
  <div class="flex items-center">Center aligned</div>
  <div class="flex items-end">Bottom aligned</div>
</div>
```

### **Grid Utilities**

```html
<!-- Grid columns -->
<div class="grid grid-cols-1">1 column</div>
<div class="grid grid-cols-2">2 columns</div>
<div class="grid grid-cols-3">3 columns</div>
<div class="grid grid-cols-12">12 columns</div>

<!-- Grid gaps -->
<div class="grid grid-cols-3 gap-1">Small gap</div>
<div class="grid grid-cols-3 gap-4">Medium gap</div>
<div class="grid grid-cols-3 gap-8">Large gap</div>

<!-- Column span -->
<div class="grid grid-cols-6">
  <div class="col-span-2">Spans 2 columns</div>
  <div class="col-span-4">Spans 4 columns</div>
</div>
```

## **Best Practices**

### **1. Composition over Configuration**

```html
<!-- Good: Compose utilities -->
<div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
  <h2 class="text-xl font-semibold mb-4">Card Title</h2>
  <p class="text-gray-600">Card content</p>
</div>

<!-- Avoid: Creating too many custom classes -->
<div class="custom-card">
  <h2 class="custom-title">Card Title</h2>
  <p class="custom-content">Card content</p>
</div>
```

### **2. Responsive Design First**

```html
<!-- Mobile first approach -->
<div class="text-sm md:text-base lg:text-lg">
  Responsive text
</div>

<div class="flex flex-col md:flex-row gap-4">
  <div class="w-full md:w-1/2">Content 1</div>
  <div class="w-full md:w-1/2">Content 2</div>
</div>
```

### **3. Consistent Spacing**

```html
<!-- Use consistent spacing scale -->
<div class="space-y-4"> <!-- Consistent vertical spacing -->
  <div class="p-4">Item 1</div>
  <div class="p-4">Item 2</div>
  <div class="p-4">Item 3</div>
</div>
```

### **4. Semantic Color Usage**

```html
<!-- Good: Semantic colors -->
<button class="bg-green-500 hover:bg-green-600">Success</button>
<button class="bg-red-500 hover:bg-red-600">Danger</button>
<button class="bg-blue-500 hover:bg-blue-600">Primary</button>

<!-- Good: Consistent color scheme -->
<div class="text-gray-900 bg-gray-50 border-gray-200">
  Consistent gray theme
</div>
```

## **Komponen Umum**

### **1. Button Variations**

```html
<!-- Primary button -->
<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  Primary
</button>

<!-- Secondary button -->
<button class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
  Secondary
</button>

<!-- Outline button -->
<button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
  Outline
</button>
```

### **2. Card Components**

```html
<!-- Basic card -->
<div class="max-w-sm rounded overflow-hidden shadow-lg">
  <img class="w-full" src="image.jpg" alt="Image">
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2">Card Title</div>
    <p class="text-gray-700 text-base">Card description</p>
  </div>
</div>
```

### **3. Form Elements**

```html
<!-- Input field -->
<div class="mb-4">
  <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
    Username
  </label>
  <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username">
</div>

<!-- Select dropdown -->
<div class="mb-4">
  <label class="block text-gray-700 text-sm font-bold mb-2" for="country">
    Country
  </label>
  <select class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
    <option>Indonesia</option>
    <option>Malaysia</option>
    <option>Singapore</option>
  </select>
</div>
```

### **4. Navigation**

```html
<!-- Top navigation -->
<nav class="bg-white shadow-lg">
  <div class="max-w-6xl mx-auto px-4">
    <div class="flex justify-between">
      <div class="flex space-x-7">
        <div>
          <a href="#" class="flex items-center py-4 px-2">
            <span class="font-semibold text-gray-500 text-lg">Brand</span>
          </a>
        </div>
      </div>
      <div class="hidden md:flex items-center space-x-3">
        <a href="#" class="py-4 px-2 text-gray-500 hover:text-blue-500 transition duration-300">Home</a>
        <a href="#" class="py-4 px-2 text-gray-500 hover:text-blue-500 transition duration-300">About</a>
        <a href="#" class="py-4 px-2 text-gray-500 hover:text-blue-500 transition duration-300">Contact</a>
      </div>
    </div>
  </div>
</nav>
```

## **Setup & Installation**

### **1. CDN (Development)**

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  <!-- Your content -->
</body>
</html>
```

### **2. NPM Installation (Production)**

```bash
# Install Tailwind CSS
npm install -D tailwindcss
npx tailwindcss init

# Configure tailwind.config.js
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [],
}

# Add to your CSS
@tailwind base;
@tailwind components;
@tailwind utilities;

# Build CSS
npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch
```

### **3. Customization**

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'brand-blue': '#1e40af',
        'brand-gray': '#6b7280',
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      }
    }
  }
}
```

## **Latihan Praktik**

### **1. Layout Dasar**
- Membuat header dengan navigation
- Membuat layout 3 kolom responsif
- Membuat footer dengan informasi kontak

### **2. Komponen UI**
- Membuat kartu produk dengan gambar
- Membuat form kontak yang responsif
- Membuat button dengan berbagai variant

### **3. Responsive Design**
- Membuat layout yang berubah di mobile/desktop
- Menggunakan breakpoint untuk typography
- Membuat navigation yang collapse di mobile

### **4. Advanced Features**
- Menggunakan hover dan focus states
- Membuat animasi sederhana dengan transitions
- Menggunakan grid untuk complex layouts

Praktikum ini akan membantu Anda memahami konsep utility-first CSS dan cara membangun interface modern dengan Tailwind CSS yang responsif dan maintainable.

## **File Praktikum**

### **Struktur File:**
```
pertemuan-04-tailwind-css/
├── README.md (Dokumentasi teori)
├── 01-pengenalan-tailwind.html (Pengenalan dan konsep dasar)
└── 02-tailwind-components.html (Komponen dan layout advanced)
```

### **Cara Menjalankan:**
1. Buka file HTML di browser
2. Inspeksi element untuk melihat classes yang digunakan
3. Coba modifikasi classes untuk eksperimen
4. Resize browser untuk melihat responsive behavior

**Selamat belajar Tailwind CSS!**