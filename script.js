// Small client script: smooth scrolling for anchor links and section navigation
document.addEventListener('click', function(e){
  const a = e.target.closest('a');
  if(!a) return;
  const href = a.getAttribute('href')||'';
  if(href.startsWith('#')){
    const id = href.slice(1);
    const target = document.getElementById(id);
    if(target){
      e.preventDefault();
      showSection(id);
      if (a.closest('.menu-dropdown')) {
        menuDropdown.classList.remove('show');
        menuBtn.setAttribute('aria-expanded','false');
        menuBtn.classList.remove('open');
      }
    }
  }
});

// Dropdown menu + show/hide sections logic
const menuBtn = document.getElementById('menuBtn');
const menuDropdown = document.getElementById('menuDropdown');
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

function showSection(id) {
  if (transitioning) return;

  const sections = document.querySelectorAll('main .section, main .hero');
  const incoming = document.getElementById(id);
  const outgoing = Array.from(sections).find(s => !s.classList.contains('hidden'));

  if (!incoming || incoming === outgoing) return;

  // No outgoing section — just show directly
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

  // Step 1 — fade out outgoing
  outgoing.classList.add('section-exit');
  requestAnimationFrame(() => {
    requestAnimationFrame(() => outgoing.classList.add('section-exit-active'));
  });

  // Use setTimeout instead of transitionend — more reliable
  setTimeout(() => {
    outgoing.classList.add('hidden');
    outgoing.classList.remove('section-exit', 'section-exit-active');

    // Step 2 — show skeleton, scroll into view
    incoming.classList.remove('hidden');
    const skeleton = buildSkeleton(incoming);
    incoming.scrollIntoView({ behavior: 'smooth' });

    // Step 3 — hold skeleton, then swap in real content
    setTimeout(() => {
      removeSkeleton(incoming, skeleton);
      incoming.classList.add('section-enter');
      requestAnimationFrame(() => {
        requestAnimationFrame(() => incoming.classList.add('section-enter-active'));
      });
      setTimeout(() => {
        incoming.classList.remove('section-enter', 'section-enter-active');
        transitioning = false;
      }, 400);
    }, 900);

  }, 300); // matches exit transition duration
}

// Ensure landing shows only `despre` on load
document.addEventListener('DOMContentLoaded', function(){
  const sections = document.querySelectorAll('main .section, main .hero');
  sections.forEach(s => {
    if (s.id !== 'despre') s.classList.add('hidden');
    else s.classList.remove('hidden');
  });
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
  { title:"Scopul Proiectului", description:"Metode de motivare și automotivare", keywords:"scop obiective motivare automotivare dezvoltare educatie", action:{ type:"section", label:"Vezi Scop", target:"despre" } },
  { title:"Reducerea Diferențelor Sociale", description:"Diminuarea decalajelor socio-profesionale", keywords:"diferente sociale profesionale incluziune echitate", action:{ type:"section", label:"Vezi Scop", target:"despre" } },
  // ── CRITERII ─────────────────────────────────
  { title:"Criterii de Selecție", description:"Condiții generale de participare", keywords:"criterii selectie conditii participare membri", action:{ type:"section", label:"Vezi Criterii", target:"despre" } },
  { title:"Nivel Engleză A2", description:"Competență lingvistică minimă", keywords:"engleza a2 limba engleza nivel limba", action:{ type:"section", label:"Vezi Criterii", target:"despre" } },
  { title:"Membri Activi ai Asociației", description:"Doar membri activi pot participa", keywords:"membri activi asociatie participare eligibil", action:{ type:"section", label:"Vezi Criterii", target:"despre" } },
  { title:"Formatori de Adulți", description:"Cadre implicate în educația adulților", keywords:"formatori adulti trainer educatie adulti", action:{ type:"section", label:"Vezi Criterii", target:"despre" } },
  { title:"Categorii Dezavantajate", description:"Incluziune socială și acces egal", keywords:"dezavantajate incluziune social grup vulnerabil", action:{ type:"section", label:"Vezi Criterii", target:"despre" } },
  // ── MOBILITĂȚI ───────────────────────────────
  { title:"Mobilitate Job Shadowing", description:"Bune practici în educația adulților", keywords:"job shadowing mobilitate observare educatie adulti", action:{ type:"download", label:"Descarcă PDF", href:"mobilities/Mobilitate-Job-Shadowing.pdf" } },
  { title:"Mobilitate Portugalia", description:"Antreprenoriat social și comunitate", keywords:"portugalia mobilitate antreprenoriat social comunitate curs", action:{ type:"download", label:"Descarcă PDF", href:"mobilities/Mobilitate-Curs-Portugalia.pdf" } },
  { title:"Mobilitate Malta", description:"În curând", keywords:"malta mobilitate curs upcoming soon", action:null },
  { title:"Vizită Pregătitoare", description:"Activitate pregătitoare proiect", keywords:"vizita pregatitoare mobilitate pregatire", action:null },
  // ── ASOCIAȚIE ────────────────────────────────
  { title:"Asociația Voltaire", description:"Părinți și profesori Voltaire", keywords:"asociatie voltaire liceu parinti profesori 2017", action:{ type:"section", label:"Vezi Asociația", target:"asociatia" } },
  { title:"Cine Suntem", description:"Istoric și structură", keywords:"cine suntem istoric organizare membri", action:{ type:"section", label:"Vezi Asociația", target:"asociatia" } },
  { title:"Parteneriate", description:"Colaborări instituționale", keywords:"parteneriate colaborare minister inspectorat scoli", action:{ type:"section", label:"Vezi Asociația", target:"asociatia" } },
  { title:"Competențe Cheie UE", description:"Dezvoltare conform UE", keywords:"competente cheie ue european dezvoltare invatare", action:{ type:"section", label:"Vezi Asociația", target:"asociatia" } },
  // ── DOCUMENTE ────────────────────────────────
  { title:"Prezentare PowerPoint", description:"Asociația Voltaire (EN)", keywords:"pptx powerpoint prezentare download engleza", action:{ type:"download", label:"Descarcă PPTX", href:"resources/PPT-uri/prezentare_asociatia_parintilor_si_profesorilor_voltaire-limba_engleza.pptx" } },
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
        : `<button class="btn search-result-btn" data-section="${item.action.target}">${item.action.label}</button>`
      : `<span class="btn btn-muted search-result-btn" style="opacity:0.5;cursor:default">În curând</span>`
    }
  </div>`;
}

function renderResults(query) {
  const results = searchQuery(query);
  if (!query.trim() && results.length === 0) {
    resultsBox.classList.remove('show');
    return;
  }
  if (results.length === 0) {
    resultsBox.innerHTML = `<p class="search-no-results">Niciun rezultat pentru „${query}"</p>`;
  } else {
    resultsBox.innerHTML = results.map(buildResultHTML).join('');
  }
  resultsBox.classList.add('show');
  resultsBox.querySelectorAll('button[data-section]').forEach(btn => {
    btn.addEventListener('click', () => {
      showSection(btn.getAttribute('data-section'));
      searchInput.value = '';
      renderResults('');
    });
  });
}

searchInput.addEventListener('input', () => renderResults(searchInput.value));
searchBtn.addEventListener('click', () => renderResults(searchInput.value));
searchInput.addEventListener('keydown', e => { if (e.key === 'Enter') renderResults(searchInput.value); });