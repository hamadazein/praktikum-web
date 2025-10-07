(function () {
  if (typeof window === 'undefined' || !document || !document.body) {
    return;
  }

  const moduleAnchors = {
    'pertemuan-01-fondasi-html': '#pertemuan-01',
    'pertemuan-02-fondasi-css': '#pertemuan-02',
  'pertemuan-03-bootstrap-grid': '#pertemuan-03',
  'pertemuan-04-tailwind-css': '#pertemuan-04',
  'pertemuan-05-php-dasar': '#pertemuan-05',
    'pertemuan-06-javascript-data': '#pertemuan-06',
    'pertemuan-07-javascript-async': '#pertemuan-07',
    'pertemuan-08-js-async-api': '#pertemuan-08',
    'pertemuan-09-php-dasar': '#pertemuan-09',
    'pertemuan-10-php-mysql': '#pertemuan-10',
    'pertemuan-11-crud-intensif': '#pertemuan-11',
    'pertemuan-12-php-session': '#pertemuan-12',
    'pertemuan-13-ajax-integration': '#pertemuan-13',
    'pertemuan-14-finalisasi': '#pertemuan-14',
  };

  const pathSegments = window.location.pathname
    .split('/')
    .map((segment) => segment.trim())
    .filter((segment) => segment.length > 0);

  const moduleFolder = pathSegments.find((segment) => segment.startsWith('pertemuan-'));
  const moduleAnchor = moduleFolder && moduleAnchors[moduleFolder] ? moduleAnchors[moduleFolder] : '';

  const backLink = document.createElement('a');
  backLink.className = 'back-to-index-button';
  backLink.href = `../index.html${moduleAnchor}`;
  backLink.setAttribute('aria-label', 'Kembali ke halaman utama kurikulum');
  backLink.innerHTML = `
    <span class="back-to-index-icon" aria-hidden="true">&#8592;</span>
    <span>Kembali ke Halaman Utama</span>
  `;

  const wrapper = document.createElement('div');
  wrapper.className = 'back-to-index-wrapper';
  wrapper.appendChild(backLink);

  const style = document.createElement('style');
  style.textContent = `
    .back-to-index-wrapper {
      position: fixed;
      right: 1.5rem;
      bottom: 1.5rem;
      z-index: 1000;
      opacity: 0;
      pointer-events: none;
      transform: translateY(12px);
      transition: opacity 200ms ease, transform 200ms ease;
    }

    .back-to-index-button {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.25rem;
      border-radius: 9999px;
      background: linear-gradient(135deg, #f97316, #ec4899);
      color: #f8fafc;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.95rem;
      letter-spacing: 0.02em;
      box-shadow: 0 15px 35px rgba(15, 23, 42, 0.35);
      transition: transform 160ms ease, box-shadow 200ms ease, filter 160ms ease;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .back-to-index-wrapper.is-visible {
      opacity: 1;
      pointer-events: auto;
      transform: translateY(0);
    }

    .back-to-index-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 22px 50px rgba(249, 115, 22, 0.35);
      filter: brightness(1.05);
    }

    .back-to-index-button:focus {
      outline: 3px solid rgba(56, 189, 248, 0.4);
      outline-offset: 2px;
    }

    .back-to-index-icon {
      font-size: 1.1rem;
      line-height: 1;
    }

    @media (prefers-reduced-motion: reduce) {
      .back-to-index-button,
      .back-to-index-button:hover {
        transition: none;
        transform: none;
      }
    }

    @media (max-width: 640px) {
      .back-to-index-wrapper {
        left: 50%;
        right: auto;
        transform: translate(-50%, 12px);
      }

      .back-to-index-wrapper.is-visible {
        transform: translate(-50%, 0);
      }
    }
  `;

  const head = document.head || document.getElementsByTagName('head')[0];
  if (head) {
    head.appendChild(style);
  }

  const body = document.body;
  if (!body) return;

  const firstElement = Array.from(body.childNodes).find(
    (node) => node.nodeType === Node.ELEMENT_NODE || (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length)
  );

  if (firstElement) {
    body.insertBefore(wrapper, firstElement);
  } else {
    body.appendChild(wrapper);
  }

  const docElement = document.documentElement;
  const visibilityThreshold = 200;

  const updateBackButtonVisibility = () => {
    const scrollPosition = window.pageYOffset || docElement.scrollTop || 0;
    const viewportBottom = scrollPosition + window.innerHeight;
    const documentHeight = docElement.scrollHeight;
    const isNearBottom = viewportBottom >= documentHeight - visibilityThreshold;
    wrapper.classList.toggle('is-visible', isNearBottom);
  };

  updateBackButtonVisibility();
  window.addEventListener('scroll', updateBackButtonVisibility, { passive: true });
  window.addEventListener('resize', updateBackButtonVisibility);
})();
