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

// Show only the selected section (and hide others)
function showSection(id){
  const sections = document.querySelectorAll('main .section, main .hero');
  sections.forEach(s => {
    if(s.id === id || (id === 'despre' && s.id === 'despre')){
      s.classList.remove('hidden');
      s.scrollIntoView({behavior:'smooth'});
    } else {
      s.classList.add('hidden');
    }
  });
}

// Menu link handlers
document.querySelectorAll('#menuDropdown a[data-target]').forEach(a => {
  a.addEventListener('click', function(e){
    e.preventDefault();
    const target = a.getAttribute('data-target');
    showSection(target);
    // close menu
    menuDropdown.classList.remove('show');
    menuBtn.setAttribute('aria-expanded','false');
    menuBtn.classList.remove('open');
  });
});

// Ensure landing shows only `despre` on load
document.addEventListener('DOMContentLoaded', function(){
  showSection('despre');
});
