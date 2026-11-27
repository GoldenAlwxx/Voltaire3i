// ── Toast ────────────────────────────────────────────────────
const toast = document.createElement('div');
toast.className = 'toast';
toast.innerHTML = '<span class="toast-spinner"></span><span class="toast-msg"></span>';
document.body.appendChild(toast);
let toastTimer = null;

function showToast(msg, duration = 2800) {
  toast.querySelector('.toast-msg').textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), duration);
}

// ── Gallery ─────────────────────────────────────────────────
const numberedWhatsAppPhotos = (timestamp, lastNumber) => [
  `${timestamp}.jpeg`,
  ...Array.from({ length: lastNumber }, (_, index) => `${timestamp} (${index + 1}).jpeg`)
];

function gallerySectionId(title) {
  return `gallery-${title.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')}`;
}

const gallerySections = [
  {
    title: 'Curs Porto',
    folder: 'Curs Porto',
    searchKeywords: 'mobilitate mobilitati mobility mobilities',
    photos: numberedWhatsAppPhotos('WhatsApp Image 2026-11-24 at 7.05.13 PM', 6)
  },
  {
    title: 'Job Shadowing',
    folder: 'Job Shadowing',
    searchKeywords: 'mobilitate mobilitati mobility mobilities',
    photos: [
      ...numberedWhatsAppPhotos('WhatsApp Image 2026-11-24 at 7.07.19 PM', 36),
      ...numberedWhatsAppPhotos('WhatsApp Image 2026-11-24 at 7.07.20 PM', 5)
    ]
  },
  {
    title: 'Vizită Pregătitoare',
    folder: 'Vizita Pregatitoare',
    searchKeywords: 'mobilitate mobilitati mobility mobilities',
    photos: [
      ...numberedWhatsAppPhotos('WhatsApp Image 2026-11-24 at 7.03.44 PM', 2),
      ...numberedWhatsAppPhotos('WhatsApp Image 2026-11-24 at 7.03.45 PM', 4)
    ]
  },
  {
    title: 'Activitate Cruset Gorj',
    folder: 'Diseminari/Activitate Cruset Gorj',
    searchKeywords: 'diseminare diseminari dissemination',
    photos: [
      ...numberedWhatsAppPhotos('WhatsApp Image 2026-11-24 at 7.09.38 PM', 1),
      ...numberedWhatsAppPhotos('WhatsApp Image 2026-11-24 at 7.09.39 PM', 4)
    ]
  },
  {
    title: 'Erasmus Days 2025',
    folder: 'Diseminari/Erasmus Days 2025',
    searchKeywords: 'diseminare diseminari dissemination',
    photos: numberedWhatsAppPhotos('WhatsApp Image 2026-11-24 at 7.11.23 PM', 8)
  },
  {
    title: 'Erasmus Days 2026',
    folder: 'Diseminari/Erasmus Days 2026',
    searchKeywords: 'diseminare diseminari dissemination',
    photos: [
      ...numberedWhatsAppPhotos('WhatsApp Image 2026-11-24 at 7.12.22 PM', 14),
      ...numberedWhatsAppPhotos('WhatsApp Image 2026-11-24 at 7.12.23 PM', 4)
    ]
  },
  {
    title: 'Ghercesti',
    folder: 'Diseminari/Ghercesti',
    searchKeywords: 'diseminare diseminari dissemination',
    photos: [
      ...numberedWhatsAppPhotos('WhatsApp Image 2026-11-24 at 7.20.59 PM', 0),
      ...numberedWhatsAppPhotos('WhatsApp Image 2026-11-24 at 7.21.00 PM', 2)
    ]
  },
  {
    title: 'Simpozion International "NOI ABORDĂRI EDUCAȚIONALE PRIN PROIECTELE ERASMUS", 10 februarie 2026',
    folder: 'Diseminari/Simpozion International NOI ABORDĂRI EDUCAȚIONALE PRIN PROIECTELE ERASMUS 10 februarie 2026',
    searchKeywords: 'diseminare diseminari dissemination',
    photos: [
      ...numberedWhatsAppPhotos('WhatsApp Image 2026-11-24 at 7.14.29 PM', 5),
      ...numberedWhatsAppPhotos('WhatsApp Image 2026-11-24 at 7.14.30 PM', 0)
    ]
  },
  {
    title: 'Masa rotunda Nationala Management Politici si Strategii Educationale Europene 12 martie 2026',
    folder: 'Diseminari/Masa rotunda Nationala Management Politici si Strategii Educationale Europene 12 martie 2026',
    searchKeywords: 'diseminare diseminari dissemination',
    photos: [
      ...numberedWhatsAppPhotos('WhatsApp Image 2026-11-26 at 10.47.40 AM', 3),
      ...numberedWhatsAppPhotos('WhatsApp Image 2026-11-26 at 10.47.41 AM', 3)
    ]
  },
  {
    title: 'Workshop iunie 2026',
    folder: 'Diseminari/Workshop iunie 2026',
    searchKeywords: 'diseminare diseminari dissemination',
    photos: [
      ...numberedWhatsAppPhotos('WhatsApp Image 2026-11-24 at 7.13.25 PM', 3),
      ...numberedWhatsAppPhotos('WhatsApp Image 2026-11-24 at 7.13.26 PM', 1)
    ]
  },
  {
    title: 'Workshop membrii Asociatiei',
    folder: 'Diseminari/Workshop membrii Asociatiei',
    searchKeywords: 'diseminare diseminari dissemination',
    photos: [
      ...numberedWhatsAppPhotos('WhatsApp Image 2026-11-24 at 7.10.33 PM', 0),
      ...numberedWhatsAppPhotos('WhatsApp Image 2026-11-24 at 7.10.34 PM', 7)
    ]
  }
];

const galleryContainer = document.getElementById('gallery-groups');
if (galleryContainer) {
  gallerySections.forEach(({ title, folder, photos }) => {
    const group = document.createElement('section');
    group.className = 'gallery-group';
    group.id = gallerySectionId(title);

    const heading = document.createElement('h3');
    heading.textContent = title;
    group.appendChild(heading);

    const grid = document.createElement('div');
    grid.className = 'gallery-grid';
    photos.forEach((photo, index) => {
      const figure = document.createElement('figure');
      figure.className = 'gallery-item';

      const photoButton = document.createElement('button');
      photoButton.className = 'gallery-photo-button';
      photoButton.type = 'button';
      photoButton.setAttribute('aria-label', `Mărește fotografia ${index + 1} din ${title}`);
      photoButton.dataset.galleryIndex = String(document.querySelectorAll('.gallery-photo-button').length);

      const image = document.createElement('img');
      const encodedFolder = folder.split('/').map(encodeURIComponent).join('/');
      image.src = `Gallery/${encodedFolder}/${encodeURIComponent(photo)}`;
      image.alt = `${title} – fotografie ${index + 1}`;
      image.loading = 'lazy';
      image.decoding = 'async';
      photoButton.appendChild(image);
      figure.appendChild(photoButton);
      grid.appendChild(figure);
    });

    group.appendChild(grid);
    galleryContainer.appendChild(group);
  });
}

// ── Gallery lightbox ─────────────────────────────────────────
const galleryLightbox = document.getElementById('gallery-lightbox');
const lightboxImage = document.getElementById('gallery-lightbox-image');
const lightboxCaption = document.getElementById('gallery-lightbox-caption');
const lightboxCounter = document.getElementById('gallery-lightbox-counter');
const galleryPhotoButtons = Array.from(document.querySelectorAll('.gallery-photo-button'));
let currentGalleryIndex = -1;
let previousBodyOverflow = '';

function updateGalleryLightbox() {
  const photoButton = galleryPhotoButtons[currentGalleryIndex];
  if (!photoButton) return;

  const image = photoButton.querySelector('img');
  const groupTitle = photoButton.closest('.gallery-group').querySelector('h3').textContent;
  lightboxImage.src = image.currentSrc || image.src;
  lightboxImage.alt = image.alt;
  lightboxCaption.textContent = image.alt;
  lightboxCounter.textContent = `${currentGalleryIndex + 1} / ${galleryPhotoButtons.length}`;
  galleryLightbox.setAttribute('aria-label', `${groupTitle}, fotografie ${currentGalleryIndex + 1} din ${galleryPhotoButtons.length}`);
}

function openGalleryLightbox(index) {
  if (!galleryLightbox || index < 0 || index >= galleryPhotoButtons.length) return;

  currentGalleryIndex = index;
  updateGalleryLightbox();
  previousBodyOverflow = document.body.style.overflow;
  document.body.style.overflow = 'hidden';
  galleryLightbox.showModal();
}

function closeGalleryLightbox() {
  if (galleryLightbox?.open) galleryLightbox.close();
}

function cycleGalleryLightbox(direction) {
  currentGalleryIndex = (currentGalleryIndex + direction + galleryPhotoButtons.length) % galleryPhotoButtons.length;
  updateGalleryLightbox();
}

galleryContainer?.addEventListener('click', event => {
  const photoButton = event.target.closest('.gallery-photo-button');
  if (!photoButton) return;
  openGalleryLightbox(Number(photoButton.dataset.galleryIndex));
});

galleryLightbox?.querySelector('[data-lightbox-close]').addEventListener('click', closeGalleryLightbox);
galleryLightbox?.querySelector('[data-lightbox-previous]').addEventListener('click', () => cycleGalleryLightbox(-1));
galleryLightbox?.querySelector('[data-lightbox-next]').addEventListener('click', () => cycleGalleryLightbox(1));
galleryLightbox?.addEventListener('click', event => {
  if (event.target === galleryLightbox) closeGalleryLightbox();
});
galleryLightbox?.addEventListener('close', () => {
  document.body.style.overflow = previousBodyOverflow;
  currentGalleryIndex = -1;
});
document.addEventListener('keydown', event => {
  if (!galleryLightbox?.open) return;
  if (event.key === 'Escape') {
    event.preventDefault();
    closeGalleryLightbox();
  } else if (event.key === 'ArrowLeft') {
    event.preventDefault();
    cycleGalleryLightbox(-1);
  } else if (event.key === 'ArrowRight') {
    event.preventDefault();
    cycleGalleryLightbox(1);
  }
});

// ── Anchor clicks + download toast ───────────────────────────
document.addEventListener('click', function(e) {
  const a = e.target.closest('a');
  if (!a) return;
  const href = a.getAttribute('href') || '';

  // Download toast
  if (a.hasAttribute('download') && href) {
    showToast('Se descarcă...');
  }

  if (href.startsWith('#')) {
    const id = href.slice(1);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      showSection(id);
      if (a.closest('.menu-dropdown')) {
        menuDropdown.classList.remove('show');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.classList.remove('open');
      }
    }
  }
});

// Dropdown menu + show/hide sections logic
const menuBtn = document.getElementById('menuBtn');
const menuDropdown = document.getElementById('menuDropdown');
const siteHeader = document.querySelector('.site-header');
let lastHeaderScrollY = window.scrollY;
let headerScrollDirection = 0;
let headerScrollDistance = 0;
let headerScrollScheduled = false;

window.addEventListener('scroll', function() {
  if (headerScrollScheduled) return;
  headerScrollScheduled = true;

  window.requestAnimationFrame(() => {
    headerScrollScheduled = false;
    const currentScrollY = window.scrollY;
    const delta = currentScrollY - lastHeaderScrollY;

    if (currentScrollY <= (siteHeader?.offsetHeight || 0) || menuDropdown?.classList.contains('show')) {
      siteHeader?.classList.remove('header-hidden');
      headerScrollDirection = 0;
      headerScrollDistance = 0;
    } else if (delta !== 0) {
      const direction = Math.sign(delta);
      if (direction !== headerScrollDirection) {
        headerScrollDirection = direction;
        headerScrollDistance = 0;
      }

      headerScrollDistance += Math.abs(delta);
      if (direction > 0 && headerScrollDistance >= 8) {
        siteHeader?.classList.add('header-hidden');
      } else if (direction < 0 && headerScrollDistance >= 4) {
        siteHeader?.classList.remove('header-hidden');
      }
    }

    lastHeaderScrollY = currentScrollY;
  });
}, { passive: true });

function toggleMenu(){
  const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
  menuBtn.setAttribute('aria-expanded', String(!expanded));
  menuDropdown.classList.toggle('show');
  menuBtn.classList.toggle('open');
}
menuBtn && menuBtn.addEventListener('click', function(e){
  e.stopPropagation();
  toggleMenu();
});

// Close menu when clicking outside
document.addEventListener('click', function(){
  if(menuDropdown && menuDropdown.classList.contains('show')){
    menuDropdown.classList.remove('show');
    menuBtn.setAttribute('aria-expanded','false');
    menuBtn.classList.remove('open');
  }
});

// Menu link handlers
document.querySelectorAll('#menuDropdown a[data-target]').forEach(a => {
  a.addEventListener('click', function(e){
    e.preventDefault();
    const target = a.getAttribute('data-target');
    showSection(target);
    menuDropdown.classList.remove('show');
    menuBtn.setAttribute('aria-expanded','false');
    menuBtn.classList.remove('open');
  });
});

// ── Section transitions ──────────────────────────────────────
let transitioning = false;

function buildSkeleton(section) {
  const overlay = document.createElement('div');
  overlay.className = 'skeleton-overlay';
  const id = section.id;

  if (id === 'mobilities') {
    const grid = document.createElement('div');
    grid.style.cssText = 'display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:22px;width:100%';
    for (let i = 0; i < 4; i++) {
      const card = document.createElement('div');
      card.style.cssText = 'display:flex;flex-direction:column;gap:10px;';
      card.innerHTML = `
        <div class="skeleton-block" style="height:170px;width:100%;border-radius:var(--radius-lg) var(--radius-lg) 0 0"></div>
        <div style="padding:16px;display:flex;flex-direction:column;gap:10px;">
          <div class="skeleton-block" style="height:20px;width:70%"></div>
          <div class="skeleton-block" style="height:14px;width:100%"></div>
          <div class="skeleton-block" style="height:14px;width:85%"></div>
          <div class="skeleton-block" style="height:14px;width:60%"></div>
          <div class="skeleton-block" style="height:36px;width:100%;margin-top:8px"></div>
        </div>`;
      grid.appendChild(card);
    }
    overlay.appendChild(grid);
  } else if (id === 'despre') {
    overlay.innerHTML = `
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center;padding:40px 0">
        <div style="display:flex;flex-direction:column;gap:14px">
          <div class="skeleton-block" style="height:14px;width:40%"></div>
          <div class="skeleton-block" style="height:48px;width:90%"></div>
          <div class="skeleton-block" style="height:48px;width:75%"></div>
          <div class="skeleton-block" style="height:48px;width:82%"></div>
          <div class="skeleton-block" style="height:16px;width:95%;margin-top:8px"></div>
          <div class="skeleton-block" style="height:16px;width:80%"></div>
        </div>
        <div class="skeleton-block" style="height:320px;width:100%;border-radius:var(--radius-xl)"></div>
      </div>
      <div style="display:flex;flex-direction:column;gap:14px;margin-top:8px">
        <div class="skeleton-block" style="height:20px;width:55%"></div>
        <div class="skeleton-block" style="height:16px;width:100%"></div>
        <div class="skeleton-block" style="height:16px;width:90%"></div>
        <div class="skeleton-block" style="height:16px;width:75%"></div>
        <div class="skeleton-block" style="height:16px;width:85%"></div>
      </div>`;
  } else if (id === 'asociatia') {
    overlay.innerHTML = `
      <div style="display:flex;flex-direction:column;gap:14px">
        <div class="skeleton-block" style="height:36px;width:70%"></div>
        <div class="skeleton-block" style="height:16px;width:90%"></div>
        <div class="skeleton-block" style="height:1px;width:100%;margin:8px 0"></div>
        <div class="skeleton-block" style="height:24px;width:30%"></div>
        <div class="skeleton-block" style="height:16px;width:100%"></div>
        <div class="skeleton-block" style="height:16px;width:95%"></div>
        <div class="skeleton-block" style="height:16px;width:88%"></div>
        <div class="skeleton-block" style="height:16px;width:92%"></div>
        <div class="skeleton-block" style="height:48px;width:260px;margin-top:12px"></div>
      </div>`;
  } else if (id === 'mai-multe') {
    overlay.innerHTML = `
      <div style="display:flex;flex-direction:column;gap:14px;width:100%">
        <div class="skeleton-block" style="height:32px;width:40%"></div>
        <div style="display:flex;justify-content:center;width:100%;padding:20px 0;background:var(--white);border:1px solid var(--border);border-radius:var(--radius-lg);box-shadow:var(--shadow-md)">
          <div class="skeleton-block" style="width:min(100%,338px);height:600px;border-radius:var(--radius-lg)"></div>
        </div>
        <div class="skeleton-block" style="height:1px;width:100%;margin:12px 0;border-radius:0"></div>
        <div style="display:flex;align-items:center;gap:12px;width:100%;padding:22px 26px;background:var(--white);border:1px solid var(--border);border-radius:var(--radius-lg);box-shadow:var(--shadow-sm)">
          <div class="skeleton-block" style="height:24px;width:40%;max-width:400px"></div>
          <div class="skeleton-block" style="height:43px;width:138px;flex-shrink:0;margin-left:12px;border-radius:var(--radius-md)"></div>
        </div>
        <div style="display:flex;align-items:center;gap:12px;width:100%;padding:22px 26px;background:var(--white);border:1px solid var(--border);border-radius:var(--radius-lg);box-shadow:var(--shadow-sm)">
          <div class="skeleton-block" style="height:24px;width:40%;max-width:400px"></div>
          <div class="skeleton-block" style="height:43px;width:138px;flex-shrink:0;margin-left:12px;border-radius:var(--radius-md)"></div>
        </div>
      </div>`;
  } else if (id === 'galerie') {
    const gallery = document.createElement('div');
    gallery.style.cssText = 'display:flex;flex-direction:column;gap:36px;width:100%';
    for (let groupIndex = 0; groupIndex < 3; groupIndex++) {
      const group = document.createElement('div');
      group.style.cssText = 'display:flex;flex-direction:column;gap:16px';
      group.innerHTML = `
        <div class="skeleton-block" style="height:24px;width:220px"></div>
        <div class="gallery-grid">
          ${Array.from({ length: 6 }, () => '<div class="skeleton-block" style="aspect-ratio:4/3;border-radius:var(--radius-lg)"></div>').join('')}
        </div>`;
      gallery.appendChild(group);
    }
    overlay.appendChild(gallery);
  } else if (id === 'contact') {
    overlay.innerHTML = `
      <div style="display:flex;flex-direction:column;gap:14px">
        <div class="skeleton-block" style="height:32px;width:25%"></div>
        <div class="skeleton-block" style="height:16px;width:55%"></div>
        <div class="skeleton-block" style="height:420px;width:100%;border-radius:var(--radius-lg)"></div>
        <div class="skeleton-block" style="height:64px;width:100%;border-radius:var(--radius-lg)"></div>
        <div class="skeleton-block" style="height:64px;width:100%;border-radius:var(--radius-lg)"></div>
      </div>`;
  } else {
    overlay.innerHTML = `
      <div style="display:flex;flex-direction:column;gap:14px">
        <div class="skeleton-block" style="height:32px;width:40%"></div>
        <div class="skeleton-block" style="height:16px;width:100%"></div>
        <div class="skeleton-block" style="height:16px;width:85%"></div>
        <div class="skeleton-block" style="height:16px;width:72%"></div>
      </div>`;
  }

  section.classList.add('section-content-hidden');
  section.appendChild(overlay);
  return overlay;
}

function removeSkeleton(section, overlay) {
  overlay.remove();
  section.classList.remove('section-content-hidden');
}

function showSection(id, anchor) {
  if (transitioning) return;

  const sections = document.querySelectorAll('main .section, main .hero');
  const incoming = document.getElementById(id);
  const outgoing = Array.from(sections).find(s => !s.classList.contains('hidden'));

  const scrollToAnchor = () => {
    const target = (anchor && document.getElementById(anchor)) || incoming;
    if (!target) return;
    const headerHeight = document.querySelector('.site-header')?.offsetHeight || 0;
    const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  // Update active menu link
  document.querySelectorAll('#menuDropdown a[data-target]').forEach(a => {
    a.classList.toggle('active', a.getAttribute('data-target') === id);
  });

  // Push to browser history
  history.pushState({ section: id, anchor: anchor || '' }, '', `#${id}`);

  if (!incoming || incoming === outgoing) {
    scrollToAnchor();
    return;
  }

  if (!outgoing) {
    incoming.classList.remove('hidden');
    incoming.classList.add('section-enter');
    requestAnimationFrame(() => {
      requestAnimationFrame(() => incoming.classList.add('section-enter-active'));
    });
    setTimeout(() => {
      incoming.classList.remove('section-enter', 'section-enter-active');
    }, 400);
    return;
  }

  transitioning = true;

  outgoing.classList.add('section-exit');
  requestAnimationFrame(() => {
    requestAnimationFrame(() => outgoing.classList.add('section-exit-active'));
  });

  setTimeout(() => {
    outgoing.classList.add('hidden');
    outgoing.classList.remove('section-exit', 'section-exit-active');

    incoming.classList.remove('hidden');
    const skeleton = buildSkeleton(incoming);
    incoming.scrollIntoView({ behavior: 'smooth' });

    setTimeout(() => {
      removeSkeleton(incoming, skeleton);
      incoming.classList.add('section-enter');
      requestAnimationFrame(() => {
        requestAnimationFrame(() => incoming.classList.add('section-enter-active'));
      });
      setTimeout(() => {
        incoming.classList.remove('section-enter', 'section-enter-active');
        scrollToAnchor();
        transitioning = false;
      }, 400);
    }, 900);
  }, 300);
}

// ── Back/forward navigation ───────────────────────────────────
window.addEventListener('popstate', function(e) {
  const id = (e.state?.section) || location.hash.slice(1) || 'despre';
  const anchor = e.state?.anchor || '';
  showSection(id, anchor);
});

// ── Auto-generate anchor IDs from headings ───────────────────
function buildAnchorMap() {
  document.querySelectorAll('main h1, main h2, main h3').forEach(el => {
    if (!el.id) {
      el.id = 'anchor-' + el.textContent.trim()
        .toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
    }
  });
}

// Ensure landing shows only `despre` on load
document.addEventListener('DOMContentLoaded', function() {
  buildAnchorMap();

  const sections = document.querySelectorAll('main .section, main .hero');
  const hashId = location.hash.slice(1);
  const startId = (hashId && document.getElementById(hashId)) ? hashId : 'despre';

  sections.forEach(s => {
    if (s.id !== startId) s.classList.add('hidden');
    else s.classList.remove('hidden');
  });

  // Set initial active menu item
  document.querySelectorAll('#menuDropdown a[data-target]').forEach(a => {
    a.classList.toggle('active', a.getAttribute('data-target') === startId);
  });

  // Push initial state
  history.replaceState({ section: startId, anchor: '' }, '', `#${startId}`);

  renderResults('');

  // Restore session search query
  const saved = sessionStorage.getItem('searchQuery');
  if (saved) {
    searchInput.value = saved;
    renderResults(saved);
  }
});

// ── Slogan Typewriter Animation ─────────────────────────────
const slogans = [
  "INCLUDE-I PE TOȚI!",
  "INFORMEAZĂ-I PE TOȚI!",
  "INVESTEȘTE ÎN TOȚI!"
];

const lines = document.querySelectorAll(".slogan");
const sleep = ms => new Promise(r => setTimeout(r, ms));

let translationDetected = false;

const observer = new MutationObserver(() => {
  const translated = Array.from(lines).some((line, i) => {
    const content = line.textContent.trim();
    return content.length > 0 && content !== slogans[i];
  });
  if (translated) {
    translationDetected = true;
    observer.disconnect();
    lines.forEach((line, i) => { line.textContent = slogans[i]; });
  }
});

lines.forEach(line => {
  observer.observe(line, { subtree: true, childList: true, characterData: true });
});

const rand = (min, max) => Math.random() * (max - min) + min;
const randInt = (min, max) => Math.floor(rand(min, max));

const typeDelay = (char, i, text) => {
  if ("!?.,:;".includes(char)) return rand(180, 280);
  if (char === " ")            return rand(80, 140);
  if (i === text.length - 1)  return rand(120, 200);
  return rand(55, 130);
};

const deleteDelay = () => rand(35, 75);

const shouldMakeMistake = () => Math.random() < 0.075;
const WRONG_CHARS = "QWERTYUIOPASDFGHJKLZXCVBNM";
const randomWrongChar = () => WRONG_CHARS[randInt(0, WRONG_CHARS.length)];

const setLine = (line, text, withCursor = true) => {
  const cursor = withCursor
    ? '<span class="cursor"></span>'
    : '<span class="cursor hidden-cursor"></span>';
  observer.disconnect();
  line.innerHTML = text + cursor;
  setTimeout(() => {
    if (!translationDetected) {
      lines.forEach(l => observer.observe(l, { subtree: true, childList: true, characterData: true }));
    }
  }, 0);
};

const typeLine = async (line, text) => {
  let typed = "";
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char !== " " && !"!?.,:;".includes(char) && shouldMakeMistake()) {
      typed += randomWrongChar();
      setLine(line, typed);
      await sleep(rand(80, 150));
      await sleep(rand(120, 260));
      typed = typed.slice(0, -1);
      setLine(line, typed);
      await sleep(rand(60, 110));
    }
    typed += char;
    setLine(line, typed);
    await sleep(typeDelay(char, i, text));
  }
  setLine(line, typed, false);
};

const deleteLine = async (line, text) => {
  let remaining = text;
  while (remaining.length > 0) {
    const burst = Math.random() < 0.2 ? randInt(2, 4) : 1;
    remaining = remaining.slice(0, Math.max(0, remaining.length - burst));
    setLine(line, remaining);
    await sleep(deleteDelay());
  }
  setLine(line, "", false);
};

(async function run() {
  if (translationDetected) {
    lines.forEach((line, i) => { line.textContent = slogans[i]; });
    return;
  }
  while (true) {
    for (let i = 0; i < slogans.length; i++) {
      if (translationDetected) { lines.forEach((line, j) => { line.textContent = slogans[j]; }); return; }
      await typeLine(lines[i], slogans[i]);
      await sleep(rand(200, 380));
    }
    await sleep(rand(1600, 2200));
    for (let i = slogans.length - 1; i >= 0; i--) {
      if (translationDetected) { lines.forEach((line, j) => { line.textContent = slogans[j]; }); return; }
      await sleep(rand(80, 180));
      await deleteLine(lines[i], slogans[i]);
    }
    await sleep(rand(400, 650));
  }
})();

// ── Search Engine ────────────────────────────────────────────
const searchIndex = [
  // ── PROIECT CORE ─────────────────────────────
  { title:"Proiect Erasmus+", description:"INCLUDE-I PE TOȚI! INFORMEAZĂ-I PE TOȚI! INVESTEȘTE ÎN TOȚI!", keywords:"erasmus proiect include informeaza investeste adu ka122", action:{ type:"section", label:"Vezi Proiect", target:"despre" } },
  { title:"Număr Contract", description:"2024-2-RO01-KA122-ADU-000279325", keywords:"contract numar identificare ka122 adu proiect", action:{ type:"section", label:"Vezi Proiect", target:"despre" } },
  { title:"Perioada Proiectului", description:"01.04.2025 - 30.09.2026", keywords:"perioada durata calendar inceput sfarsit 2025 2026", action:{ type:"section", label:"Vezi Proiect", target:"despre" } },
  { title:"Grant Erasmus+", description:"18.432 EURO finanțare aprobată", keywords:"grant buget finantare euro bani 18432 cost proiect", action:{ type:"section", label:"Vezi Proiect", target:"despre" } },
  // ── SCOP & OBIECTIVE ─────────────────────────
  { title:"Scopul Proiectului", description:"Metode de motivare și automotivare", keywords:"scop obiective motivare automotivare dezvoltare educatie", action:{ type:"section", label:"Vezi Scop", target:"despre", anchor:"anchor-scop" } },
  { title:"Reducerea Diferențelor Sociale", description:"Diminuarea decalajelor socio-profesionale", keywords:"diferente sociale profesionale incluziune echitate", action:{ type:"section", label:"Vezi Scop", target:"despre", anchor:"anchor-scop" } },
  // ── CRITERII ─────────────────────────────────
  { title:"Criterii de Selecție", description:"Condiții generale de participare", keywords:"criterii selectie conditii participare membri", action:{ type:"section", label:"Vezi Criterii", target:"despre", anchor:"anchor-criterii-de-selectie" } },
  { title:"Nivel Engleză A2", description:"Competență lingvistică minimă", keywords:"engleza a2 limba engleza nivel limba", action:{ type:"section", label:"Vezi Criterii", target:"despre", anchor:"anchor-criterii-de-selectie" } },
  { title:"Membri Activi ai Asociației", description:"Doar membri activi pot participa", keywords:"membri activi asociatie participare eligibil", action:{ type:"section", label:"Vezi Criterii", target:"despre", anchor:"anchor-criterii-de-selectie" } },
  { title:"Formatori de Adulți", description:"Cadre implicate în educația adulților", keywords:"formatori adulti trainer educatie adulti", action:{ type:"section", label:"Vezi Criterii", target:"despre", anchor:"anchor-criterii-de-selectie" } },
  { title:"Categorii Dezavantajate", description:"Incluziune socială și acces egal", keywords:"dezavantajate incluziune social grup vulnerabil", action:{ type:"section", label:"Vezi Criterii", target:"despre", anchor:"anchor-criterii-de-selectie" } },
  // ── MOBILITĂȚI ───────────────────────────────
  { title:"Mobilitate Job Shadowing", description:"Bune practici în educația adulților", keywords:"job shadowing mobilitate observare educatie adulti", action:{ type:"download", label:"Descarcă PDF", href:"mobilities/Mobilitate-Job-Shadowing.pdf" } },
  { title:"Mobilitate Portugalia", description:"Antreprenoriat social și comunitate", keywords:"portugalia mobilitate antreprenoriat social comunitate curs", action:{ type:"download", label:"Descarcă PDF", href:"mobilities/Mobilitate-Curs-Portugalia.pdf" } },
  { title:"Mobilitate Malta", description:"Învățare non-formală în medii digitale și hibride", keywords:"malta mobilitate curs formare invatare non-formala digital hibrid facilitare evaluare powerpoint pptx prezentare download", action:{ type:"download", label:"Descarcă PPTX", href:"mobilities/Mobilitate-Curs-Malta.pptx" } },
  { title:"Vizită Pregătitoare", description:"Planificarea mobilității, logistica și participarea incluzivă la Vizela", keywords:"vizita pregatitoare mobilitate pregatire planificare logistica vizela incluziune prezentare powerpoint pptx download", action:{ type:"download", label:"Descarcă PPTX", href:"mobilities/Mobilitate-Vizita-Pregatitoare.pptx" } },
  ...gallerySections.map(({ title, searchKeywords }) => ({
    title,
    description: `Fotografii din ${title}`,
    keywords: `${searchKeywords} poze photos photo fotografie fotografii imagini galerie`,
    action: { type:"section", label:"Vezi pozele", target:"galerie", anchor:gallerySectionId(title) }
  })),
  // ── ASOCIAȚIE ────────────────────────────────
  { title:"Asociația Voltaire", description:"Părinți și profesori Voltaire", keywords:"asociatie voltaire liceu parinti profesori 2017", action:{ type:"section", label:"Vezi Asociația", target:"asociatia" } },
  { title:"Cine Suntem", description:"Istoric și structură", keywords:"cine suntem istoric organizare membri", action:{ type:"section", label:"Vezi Asociația", target:"asociatia", anchor:"anchor-cine-suntem" } },
  { title:"Parteneriate", description:"Colaborări instituționale", keywords:"parteneriate colaborare minister inspectorat scoli", action:{ type:"section", label:"Vezi Asociația", target:"asociatia" } },
  { title:"Competențe Cheie UE", description:"Dezvoltare conform UE", keywords:"competente cheie ue european dezvoltare invatare", action:{ type:"section", label:"Vezi Asociația", target:"asociatia" } },
  // ── DOCUMENTE ────────────────────────────────
  { title:"Prezentare PowerPoint", description:"Asociația Voltaire (EN)", keywords:"pptx powerpoint prezentare download engleza", action:{ type:"download", label:"Descarcă PPTX", href:"resources/PPT-uri/prezentare_asociatia_parintilor_si_profesorilor_voltaire-limba_engleza.pptx" } },
  { title:"Video din Diseminari", description:"Videoclip din 10 noiembrie 2026", keywords:"diseminari video videoclip whatsapp 2026 noiembrie", action:{ type:"section", label:"Vezi Video", target:"mai-multe" } },
  { title:"Prezentare curs AI", description:"Prezentare PowerPoint despre inteligența artificială", keywords:"diseminari pptx powerpoint prezentare curs inteligenta artificiala ai download", action:{ type:"download", label:"Descarcă PPTX", href:"resources/Diseminari%20content/Prezentare_curs_AI_Voltaire.pptx" } },
  // ── CONTACT ──────────────────────────────────
  { title:"Contact Email", description:"euuvoltaire@gmail.com", keywords:"email contact mail gmail", action:{ type:"section", label:"Vezi Contact", target:"contact" } },
  { title:"Facebook", description:"voltaire3i", keywords:"facebook social media pagina voltaire3i", action:{ type:"section", label:"Vezi Contact", target:"contact" } },
  { title:"Locație", description:"Craiova, Dolj, România", keywords:"locatie adresa craiova dolj romania unde", action:{ type:"section", label:"Vezi Contact", target:"contact" } }
];

function normalizeStr(str) {
  return str.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9 ]/g, " ");
}

function searchQuery(query) {
  const q = normalizeStr(query.trim());
  if (!q) return searchIndex;
  const terms = q.split(/\s+/).filter(Boolean);
  return searchIndex
    .map(item => {
      const haystack = normalizeStr(`${item.title} ${item.description} ${item.keywords}`);
      const score = terms.reduce((acc, term) => {
        if (haystack.includes(term)) acc++;
        if (normalizeStr(item.title).includes(term)) acc++;
        return acc;
      }, 0);
      return { item, score };
    })
    .filter(r => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(r => r.item);
}

const searchInput = document.getElementById('project-search');
const searchBtn = document.querySelector('.search-btn');
const resultsBox = document.getElementById('search-results');

function buildResultHTML(item) {
  return `<div class="search-result-item">
    <div class="search-result-text">
      <strong>${item.title}</strong>
      <span>${item.description}</span>
    </div>
    ${item.action
      ? item.action.type === 'download'
        ? `<a class="btn search-result-btn" href="${item.action.href}" download>${item.action.label}</a>`
        : `<button class="btn search-result-btn" data-section="${item.action.target}" data-anchor="${item.action.anchor || ''}">${item.action.label}</button>`
      : `<span class="btn btn-muted search-result-btn" style="opacity:0.5;cursor:default">În curând</span>`
    }
  </div>`;
}

function updateSearchShadow() {
  const shadow = document.querySelector('.search-panel-shadow');
  if (!shadow) return;
  const atBottom = resultsBox.scrollHeight - resultsBox.scrollTop - resultsBox.clientHeight < 2;
  const overflows = resultsBox.scrollHeight > resultsBox.clientHeight;
  shadow.style.opacity = (overflows && !atBottom) ? '1' : '0';
}

resultsBox.addEventListener('scroll', updateSearchShadow);

function renderResults(query) {
  const results = searchQuery(query);

  if (results.length === 0) {
    resultsBox.innerHTML = query.trim()
      ? `<p class="search-no-results">Niciun rezultat pentru „${query}"</p>`
      : '';
    resultsBox.classList.toggle('show', !!query.trim());
    updateSearchShadow();
    return;
  }

  resultsBox.innerHTML = results.map(buildResultHTML).join('');
  resultsBox.classList.add('show');
  resultsBox.querySelectorAll('button[data-section]').forEach(btn => {
    btn.addEventListener('click', () => {
      const anchor = btn.getAttribute('data-anchor');
      showSection(btn.getAttribute('data-section'), anchor);
      searchInput.value = '';
      renderResults('');
    });
  });
  updateSearchShadow();
}

searchInput.addEventListener('input', () => {
  if (searchInput.value) {
    sessionStorage.setItem('searchQuery', searchInput.value);
  } else {
    sessionStorage.removeItem('searchQuery');
  }
  renderResults(searchInput.value);
});
searchBtn.addEventListener('click', () => {
  sessionStorage.setItem('searchQuery', searchInput.value);
  renderResults(searchInput.value);
});
searchInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    sessionStorage.setItem('searchQuery', searchInput.value);
    renderResults(searchInput.value);
  }
});