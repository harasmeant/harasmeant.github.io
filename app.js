const buttons = document.querySelectorAll('[data-lang]');
function setLanguage(lang) {
  if (!['es', 'en'].includes(lang)) lang = 'es';
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-es]').forEach(el => { el.innerHTML = el.dataset[lang]; });
  buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.lang === lang)));
  document.title = 'Nicolás Acebal Colli — ' + (lang === 'es' ? 'Diseño y desarrollo' : 'Design & development');
  document.querySelector('meta[name="description"]').content = lang === 'es' ? 'Diseño industrial, desarrollo de producto y programación web. Portfolio de Nicolás Acebal Colli.' : 'Industrial design, product development and web programming. Portfolio of Nicolás Acebal Colli.';
  document.querySelector('nav').setAttribute('aria-label', lang === 'es' ? 'Principal' : 'Main navigation');
  document.querySelector('.hero-art').setAttribute('aria-label', lang === 'es' ? 'Composición conceptual de piezas y planos de diseño industrial' : 'Conceptual composition of industrial design parts and drawings');
  try { localStorage.setItem('portfolio-language', lang); } catch {}
}
buttons.forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.lang)));
let initial = 'es';
try { initial = localStorage.getItem('portfolio-language') || 'es'; } catch {}
setLanguage(initial);
document.getElementById('year').textContent = new Date().getFullYear();
document.querySelector('.print-cv').addEventListener('click', () => window.print());
let expandedBeforePrint = [];
window.addEventListener('beforeprint', () => {
  expandedBeforePrint = [...document.querySelectorAll('details')].map(el => [el, el.open]);
  expandedBeforePrint.forEach(([el]) => { el.open = true; });
});
window.addEventListener('afterprint', () => {
  expandedBeforePrint.forEach(([el, open]) => { el.open = open; });
});
