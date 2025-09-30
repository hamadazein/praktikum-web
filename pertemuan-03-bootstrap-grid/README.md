# PERTEMUAN 3: BOOTSTRAP 5 - Framework CSS Modern 🚀

## 🏗️ **Filosofi Bootstrap: Standarisasi dan Efisiensi**

Bootstrap adalah seperti **kit konstruksi LEGO untuk web development**. Jika CSS murni adalah seperti membuat setiap komponen dari nol, Bootstrap memberikan **blok-blok siap pakai** yang sudah dioptimasi, diuji, dan terbukti efektif.

### **Analogi: Bootstrap sebagai Arsitektur Modular**

```
CSS Murni = Arsitek yang merancang dari nol
Bootstrap = Menggunakan komponen prefab berkualitas tinggi
Result = Pembangunan lebih cepat dengan kualitas konsisten
```

## 🎯 **Teori Framework vs Custom CSS**

### **Mengapa Framework Diperlukan?**

**Analogi: Memasak vs Restoran Cepat Saji**

```
Custom CSS = Master Chef (kontrol penuh, waktu lama)
├── Kelebihan: Fleksibilitas tak terbatas
├── Kekurangan: Waktu development lama
└── Use Case: Project unik dengan requirement khusus

Bootstrap = Chef Terlatih dengan SOP (standar, cepat)
├── Kelebihan: Konsistensi, speed, best practices
├── Kekurangan: Limited customization
└── Use Case: Business application, prototyping
```

## 📐 **Grid System - Fondasi Layout Modern**

### **Teori 12-Column Grid System**

**Analogi: Sistem Koordinat Kota**

```
Container = Kota (max-width boundaries)
Row = Jalan horizontal (flex container)
Column = Blok bangunan (flex items)
Gutter = Jarak antar bangunan (padding)
```

### **Mathematical Foundation**

```css
/* Bootstrap Grid Mathematical Concept */
.container {
  max-width: 1200px; /* City boundary */
  margin: 0 auto; /* Center the city */
}

.row {
  display: flex; /* Street layout system */
  flex-wrap: wrap; /* Allow building overflow */
  margin: 0 -15px; /* Negative margin for gutters */
}

.col-6 {
  flex: 0 0 50%; /* 6/12 = 50% width */
  max-width: 50%;
  padding: 0 15px; /* Building setback (gutter) */
}
```

### **Responsive Breakpoints - Design untuk Semua Device**

**Analogi: Bangunan yang Bisa Berubah Bentuk**

```scss
// Bootstrap Breakpoint Theory
$breakpoints: (
  xs: 0px,
  // Phone portrait
  sm: 576px,
  // Phone landscape
  md: 768px,
  // Tablet portrait
  lg: 992px,
  // Tablet landscape / Small desktop
  xl: 1200px,
  // Desktop
  xxl: 1400px // Large desktop,
);
```

## 🎨 **Component System - Modular Design**

### **Atomic Design Philosophy dalam Bootstrap**

```
Atoms (Basic elements)
├── Buttons (.btn)
├── Input fields (.form-control)
└── Typography (.h1, .text-primary)

Molecules (Simple combinations)
├── Input groups (.input-group)
├── Button groups (.btn-group)
└── Badges (.badge)

Organisms (Complex components)
├── Navigation bars (.navbar)
├── Cards (.card)
└── Modals (.modal)
```

### **Implementasi Praktis: Profil Mahasiswa**

```html
<!DOCTYPE html>
<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Profil Nazriel Rahman Al'afath</title>
    <!-- Bootstrap CSS CDN -->
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
      rel="stylesheet"
    />
    <link
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
      rel="stylesheet"
    />
  </head>
  <body class="bg-light">
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container">
        <a class="navbar-brand fw-bold" href="#">
          <i class="fas fa-user-graduate me-2"></i>
          Nazriel Rahman Al'afath
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <a class="nav-link active" href="#profile">Profil</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#education">Pendidikan</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#skills">Keahlian</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#contact">Kontak</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="container my-5">
      <!-- Profile Header -->
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <div class="card shadow-lg border-0 rounded-3">
            <div class="card-body p-5 text-center">
              <img
                src="https://via.placeholder.com/150"
                alt="Nazriel Rahman Al'afath"
                class="rounded-circle mb-4 border border-primary border-3"
                style="width: 150px; height: 150px; object-fit: cover;"
              />
              <h1 class="card-title text-primary mb-3">
                Nazriel Rahman Al'afath
              </h1>
              <p class="text-muted fs-5 mb-4">
                <i class="fas fa-id-card me-2"></i>NIM: 2025001001
              </p>
              <p class="text-muted fs-5 mb-4">
                <i class="fas fa-university me-2"></i>Teknik Informatika
              </p>
              <div class="d-flex justify-content-center gap-3">
                <a href="#contact" class="btn btn-primary btn-lg">
                  <i class="fas fa-envelope me-2"></i>Hubungi Saya
                </a>
                <a href="#" class="btn btn-outline-primary btn-lg">
                  <i class="fas fa-download me-2"></i>Download CV
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Skills Section -->
      <div class="row mt-5">
        <div class="col-12">
          <h2 class="text-center text-primary mb-5">
            <i class="fas fa-code me-2"></i>Keahlian Teknis
          </h2>
        </div>

        <!-- Programming Languages -->
        <div class="col-md-4 mb-4">
          <div class="card h-100 border-0 shadow-sm">
            <div class="card-body text-center">
              <div
                class="bg-primary bg-gradient rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                style="width: 60px; height: 60px;"
              >
                <i class="fab fa-js-square text-white fa-2x"></i>
              </div>
              <h5 class="card-title text-primary">Programming</h5>
              <div class="mb-3">
                <span class="badge bg-secondary me-1">JavaScript</span>
                <span class="badge bg-secondary me-1">Python</span>
                <span class="badge bg-secondary me-1">Java</span>
                <span class="badge bg-secondary me-1">C++</span>
              </div>
              <div class="progress mb-2">
                <div class="progress-bar bg-primary" style="width: 85%"></div>
              </div>
              <small class="text-muted">Advanced - 85%</small>
            </div>
          </div>
        </div>

        <!-- Web Development -->
        <div class="col-md-4 mb-4">
          <div class="card h-100 border-0 shadow-sm">
            <div class="card-body text-center">
              <div
                class="bg-success bg-gradient rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                style="width: 60px; height: 60px;"
              >
                <i class="fas fa-globe text-white fa-2x"></i>
              </div>
              <h5 class="card-title text-success">Web Development</h5>
              <div class="mb-3">
                <span class="badge bg-secondary me-1">HTML5</span>
                <span class="badge bg-secondary me-1">CSS3</span>
                <span class="badge bg-secondary me-1">Bootstrap</span>
                <span class="badge bg-secondary me-1">React</span>
              </div>
              <div class="progress mb-2">
                <div class="progress-bar bg-success" style="width: 90%"></div>
              </div>
              <small class="text-muted">Expert - 90%</small>
            </div>
          </div>
        </div>

        <!-- Database -->
        <div class="col-md-4 mb-4">
          <div class="card h-100 border-0 shadow-sm">
            <div class="card-body text-center">
              <div
                class="bg-warning bg-gradient rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                style="width: 60px; height: 60px;"
              >
                <i class="fas fa-database text-white fa-2x"></i>
              </div>
              <h5 class="card-title text-warning">Database</h5>
              <div class="mb-3">
                <span class="badge bg-secondary me-1">MySQL</span>
                <span class="badge bg-secondary me-1">PostgreSQL</span>
                <span class="badge bg-secondary me-1">MongoDB</span>
                <span class="badge bg-secondary me-1">Redis</span>
              </div>
              <div class="progress mb-2">
                <div class="progress-bar bg-warning" style="width: 75%"></div>
              </div>
              <small class="text-muted">Intermediate - 75%</small>
            </div>
          </div>
        </div>
      </div>

      <!-- Contact Section -->
      <div class="row mt-5">
        <div class="col-12">
          <h2 class="text-center text-primary mb-5">
            <i class="fas fa-address-book me-2"></i>Informasi Kontak
          </h2>
        </div>
        <div class="col-lg-8 mx-auto">
          <div class="card border-0 shadow-lg">
            <div class="card-body p-5">
              <div class="row">
                <div class="col-md-6 mb-3">
                  <div class="d-flex align-items-center">
                    <div
                      class="bg-primary bg-gradient rounded-circle d-inline-flex align-items-center justify-content-center me-3"
                      style="width: 50px; height: 50px;"
                    >
                      <i class="fas fa-envelope text-white"></i>
                    </div>
                    <div>
                      <h6 class="mb-1 text-primary">Email</h6>
                      <p class="mb-0 text-muted">nazriel.rahman@email.com</p>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 mb-3">
                  <div class="d-flex align-items-center">
                    <div
                      class="bg-success bg-gradient rounded-circle d-inline-flex align-items-center justify-content-center me-3"
                      style="width: 50px; height: 50px;"
                    >
                      <i class="fas fa-phone text-white"></i>
                    </div>
                    <div>
                      <h6 class="mb-1 text-success">Telepon</h6>
                      <p class="mb-0 text-muted">+62 812-3456-7890</p>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 mb-3">
                  <div class="d-flex align-items-center">
                    <div
                      class="bg-info bg-gradient rounded-circle d-inline-flex align-items-center justify-content-center me-3"
                      style="width: 50px; height: 50px;"
                    >
                      <i class="fab fa-linkedin text-white"></i>
                    </div>
                    <div>
                      <h6 class="mb-1 text-info">LinkedIn</h6>
                      <p class="mb-0 text-muted">
                        linkedin.com/in/nazriel-rahman
                      </p>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 mb-3">
                  <div class="d-flex align-items-center">
                    <div
                      class="bg-dark bg-gradient rounded-circle d-inline-flex align-items-center justify-content-center me-3"
                      style="width: 50px; height: 50px;"
                    >
                      <i class="fab fa-github text-white"></i>
                    </div>
                    <div>
                      <h6 class="mb-1 text-dark">GitHub</h6>
                      <p class="mb-0 text-muted">github.com/nazriel-rahman</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="bg-dark text-white py-4 mt-5">
      <div class="container text-center">
        <p class="mb-0">
          &copy; 2025 Nazriel Rahman Al'afath.
          <span class="text-muted">Dibuat dengan</span>
          <i class="fas fa-heart text-danger"></i>
          <span class="text-muted">dan Bootstrap 5</span>
        </p>
      </div>
    </footer>

    <!-- Bootstrap JavaScript -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
  </body>
</html>
```

## 🔧 **Utility Classes - Atomic CSS Philosophy**

### **Spacing System - Mathematical Progression**

```css
/* Bootstrap Spacing Scale (rem-based) */
.m-0 {
  margin: 0;
} /* 0rem */
.m-1 {
  margin: 0.25rem;
} /* 4px */
.m-2 {
  margin: 0.5rem;
} /* 8px */
.m-3 {
  margin: 1rem;
} /* 16px */
.m-4 {
  margin: 1.5rem;
} /* 24px */
.m-5 {
  margin: 3rem;
} /* 48px */

/* Directional spacing */
.mt-3 {
  margin-top: 1rem;
}
.me-3 {
  margin-end: 1rem;
} /* margin-right in LTR */
.mb-3 {
  margin-bottom: 1rem;
}
.ms-3 {
  margin-start: 1rem;
} /* margin-left in LTR */
```

### **Flexbox Utilities - Layout Control**

```html
<!-- Flex Container -->
<div class="d-flex justify-content-between align-items-center">
  <div>Logo</div>
  <div>Navigation</div>
  <div>CTA Button</div>
</div>

<!-- Responsive Flexbox -->
<div class="d-flex flex-column flex-md-row">
  <!-- Stack di mobile, horizontal di tablet+ -->
</div>
```

## 🎨 **Design System dalam Bootstrap**

### **Color Palette dengan Semantic Meaning**

```html
<!-- Semantic Colors -->
<button class="btn btn-primary">Primary Action</button>
<!-- Main brand color -->
<button class="btn btn-secondary">Secondary</button>
<!-- Neutral actions -->
<button class="btn btn-success">Success</button>
<!-- Positive actions -->
<button class="btn btn-danger">Danger</button>
<!-- Destructive actions -->
<button class="btn btn-warning">Warning</button>
<!-- Caution actions -->
<button class="btn btn-info">Info</button>
<!-- Informational -->

<!-- Text Colors -->
<p class="text-primary">Important information</p>
<p class="text-success">Success message</p>
<p class="text-danger">Error message</p>
<p class="text-muted">Secondary information</p>
```

### **Typography Scale**

```html
<!-- Display Headings -->
<h1 class="display-1">Display 1</h1>
<!-- Extra large -->
<h1 class="display-4">Display 4</h1>
<!-- Large but readable -->

<!-- Standard Headings -->
<h1>Heading 1</h1>
<h2>Heading 2</h2>
<h3>Heading 3</h3>

<!-- Body Text -->
<p class="lead">Lead paragraph - stands out</p>
<p>Regular paragraph text</p>
<small class="text-muted">Small supporting text</small>
```

## 📱 **Responsive Design Patterns**

### **Mobile-First Grid Examples**

```html
<!-- Profile Layout yang Responsif -->
<div class="row">
  <!-- Di mobile: full width, di tablet+: 8 kolom, centered -->
  <div class="col-12 col-md-8 col-lg-6 mx-auto">
    <div class="card">
      <div class="card-body">
        <!-- Card content -->
      </div>
    </div>
  </div>
</div>

<!-- Skills Grid -->
<div class="row">
  <!-- Mobile: 1 kolom, Tablet: 2 kolom, Desktop: 3 kolom -->
  <div class="col-12 col-md-6 col-lg-4 mb-4">
    <div class="card"><!-- Skill 1 --></div>
  </div>
  <div class="col-12 col-md-6 col-lg-4 mb-4">
    <div class="card"><!-- Skill 2 --></div>
  </div>
  <div class="col-12 col-md-6 col-lg-4 mb-4">
    <div class="card"><!-- Skill 3 --></div>
  </div>
</div>
```

### **Responsive Utilities**

```html
<!-- Show/Hide berdasarkan breakpoint -->
<div class="d-none d-md-block">Hanya tampil di tablet+</div>
<div class="d-block d-md-none">Hanya tampil di mobile</div>

<!-- Text alignment responsif -->
<h1 class="text-center text-md-start">Center di mobile, left di tablet+</h1>

<!-- Spacing responsif -->
<div class="p-2 p-md-4 p-lg-5">Padding bertambah seiring ukuran layar</div>
```

## 💡 **Best Practices dan Common Patterns**

### **Component Composition**

```html
<!-- Card Pattern untuk berbagai konten -->
<div class="card">
  <div class="card-header">
    <h5 class="card-title mb-0">Card Title</h5>
  </div>
  <div class="card-body">
    <p class="card-text">Card content goes here</p>
    <a href="#" class="btn btn-primary">Action</a>
  </div>
  <div class="card-footer text-muted">Footer information</div>
</div>

<!-- Button Group Pattern -->
<div class="btn-group" role="group">
  <input type="radio" class="btn-check" name="options" id="option1" />
  <label class="btn btn-outline-primary" for="option1">Option 1</label>

  <input type="radio" class="btn-check" name="options" id="option2" />
  <label class="btn btn-outline-primary" for="option2">Option 2</label>
</div>
```

### **Accessibility Best Practices**

```html
<!-- Proper semantic structure -->
<nav class="navbar" role="navigation" aria-label="Main navigation">
  <!-- Navigation content -->
</nav>

<!-- Form accessibility -->
<div class="mb-3">
  <label for="email" class="form-label">Email address</label>
  <input
    type="email"
    class="form-control"
    id="email"
    aria-describedby="emailHelp"
    required
  />
  <div id="emailHelp" class="form-text">
    We'll never share your email with anyone else.
  </div>
</div>

<!-- Button accessibility -->
<button
  type="button"
  class="btn btn-primary"
  aria-label="Close modal"
  data-bs-dismiss="modal"
>
  <i class="fas fa-times" aria-hidden="true"></i>
</button>
```

## 🎓 **Analisis dan Refleksi Teoritis**

### **Pertanyaan Kritis:**

1. **Mengapa** 12-column grid system menjadi standar?
2. **Bagaimana** Bootstrap mempengaruhi web design trends?
3. **Kapan** sebaiknya tidak menggunakan framework?
4. **Bagaimana** balance antara consistency dan uniqueness?

### **Design Philosophy Bootstrap:**

- **Mobile First**: Mulai dari constraint terbesar (mobile)
- **Progressive Enhancement**: Layer fitur dari basic ke advanced
- **Semantic HTML**: Structure yang meaningful
- **Accessibility**: Inclusive design untuk semua user

### **Real-world Applications:**

- **Dashboard**: Admin panels dengan consistent components
- **E-commerce**: Product grids dan shopping interfaces
- **Corporate**: Business websites dengan professional look
- **Portfolio**: Showcase projects dengan responsive galleries

## 🚀 **Evolution ke Framework Modern**

### **Dari Bootstrap ke Component-Based Frameworks**

```javascript
// React Bootstrap
import { Container, Row, Col, Card, Button } from "react-bootstrap";

function ProfileCard({ name, nim, major }) {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="shadow-lg">
            <Card.Body className="text-center">
              <Card.Title>{name}</Card.Title>
              <Card.Text>NIM: {nim}</Card.Text>
              <Card.Text>{major}</Card.Text>
              <Button variant="primary">Hubungi Saya</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
```

### **Customization dengan CSS Variables**

```css
:root {
  --bs-primary: #667eea;
  --bs-secondary: #764ba2;
  --bs-font-family-base: "Inter", sans-serif;
}

/* Custom component */
.profile-card {
  background: linear-gradient(135deg, var(--bs-primary), var(--bs-secondary));
  border-radius: 20px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
}
```

## 🌟 **Kesimpulan Transformatif**

Bootstrap mengajarkan kita bahwa **good design is systematic design**. Framework ini membuktikan bahwa:

1. **Constraints Enable Creativity** - Batasan yang tepat justru memicu inovasi
2. **Consistency Builds Trust** - User merasa nyaman dengan pattern familiar
3. **Community Drives Standards** - Open source menghasilkan best practices
4. **Mobile-First is Future-Proof** - Responsive design adalah keharusan

**Philosophy**: "Bootstrap bukan tentang membuat semua website sama, tapi tentang memberikan vocabulary design yang universal untuk berkomunikasi dengan user secara efektif."

Dengan memahami Bootstrap secara mendalam, Anda tidak hanya belajar CSS framework, tapi juga **systematic thinking** yang akan berguna dalam setiap aspect of development! 🎨🚀

Bootstrap 5.3.0 (Latest)
