// Inject a single floating "scroll to top" button per page
(function () {
  if (window.__stt_injected) return;
  window.__stt_injected = true;

  const BUTTON_ID = 'stt-button';

  // Create button
  const btn = document.createElement('button');
  btn.id = BUTTON_ID;
  btn.type = 'button';
  btn.title = 'Scroll to top';
  btn.setAttribute('aria-label', 'Scroll to top');
  // Use extension image as button icon (falls back to a text arrow if not available)
  // Note: content scripts use chrome.runtime.getURL to reference packaged resources.
  try {
    const img = document.createElement('img');
    img.src = (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.getURL)
      ? chrome.runtime.getURL('up-arrow.svg')
      : '';
    img.alt = '';
    img.width = 22;
    img.height = 22;
    img.style.pointerEvents = 'none';
    btn.appendChild(img);
  } catch (e) {
    // fallback to a simple arrow character
    btn.innerText = '↑';
  }

  // Click -> smooth scroll to top
  btn.addEventListener('click', () => {
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) {
      // Fallback
      window.scrollTo(0, 0);
    }
    btn.blur();
  });

  // Show/hide depending on scroll position
  function updateVisibility() {
    if (window.scrollY > 300) btn.classList.add('stt-visible');
    else btn.classList.remove('stt-visible');
  }

  // Avoid interfering with page load: append when body is available
  function appendWhenReady() {
    if (document.body) {
      document.body.appendChild(btn);
      updateVisibility();
      window.addEventListener('scroll', updateVisibility, { passive: true });
      window.addEventListener('resize', updateVisibility);
    } else {
      requestAnimationFrame(appendWhenReady);
    }
  }

  appendWhenReady();

  // Make button reachable by keyboard: show when focused
  btn.addEventListener('focus', () => btn.classList.add('stt-visible'));
  btn.addEventListener('blur', () => updateVisibility());

  // Provide a small escape hatch for pages that need to remove it
  window.__removeScrollToTopButton = function () {
    try {
      window.removeEventListener('scroll', updateVisibility);
      window.removeEventListener('resize', updateVisibility);
      if (btn.parentNode) btn.parentNode.removeChild(btn);
      delete window.__stt_injected;
      delete window.__removeScrollToTopButton;
    } catch (e) {
      // ignore
    }
  };
})();
