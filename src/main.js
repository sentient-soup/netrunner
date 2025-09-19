import './style.css'
import './sketch.js'
import './app.js'

window.addEventListener('DOMContentLoaded', () => {
  if (!window.p5) {
    const el = document.getElementById('p5-status');
    if (el) {
      el.textContent = 'p5.js failed to load (are you offline or is the CDN blocked?).';
      el.style.display = 'block';
    }
    console.error('p5.js not found on window.');
  }
});
