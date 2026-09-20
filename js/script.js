// Mobile nav toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => links.classList.remove('open'));
    });
  }

  // Countdown to the wedding date
  const countdownEl = document.querySelector('.countdown');
  if (countdownEl) {
    const weddingDate = new Date(countdownEl.dataset.date).getTime();
    const daysEl = document.getElementById('cd-days');
    const hoursEl = document.getElementById('cd-hours');
    const minsEl = document.getElementById('cd-mins');
    const secsEl = document.getElementById('cd-secs');

    const tick = () => {
      const now = Date.now();
      const diff = Math.max(0, weddingDate - now);
      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const mins = Math.floor((diff % 3600000) / 60000);
      const secs = Math.floor((diff % 60000) / 1000);
      if (daysEl) daysEl.textContent = days;
      if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
      if (minsEl) minsEl.textContent = String(mins).padStart(2, '0');
      if (secsEl) secsEl.textContent = String(secs).padStart(2, '0');
    };
    tick();
    setInterval(tick, 1000);
  }

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach((item) => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach((openItem) => {
        if (openItem !== item) {
          openItem.classList.remove('open');
          openItem.querySelector('.faq-answer').style.maxHeight = null;
        }
      });
      item.classList.toggle('open', !isOpen);
      answer.style.maxHeight = !isOpen ? answer.scrollHeight + 'px' : null;
    });
  });

  // RSVP form — submits to Google Forms via a hidden iframe so the page
  // never navigates away, then swaps in a thank-you message.
  const rsvpForm = document.getElementById('rsvp-form');
  const rsvpFrame = document.querySelector('iframe[name="rsvp-hidden-frame"]');
  const rsvpThanks = document.getElementById('rsvp-thanks');
  if (rsvpForm && rsvpFrame && rsvpThanks) {
    let submitted = false;
    rsvpForm.addEventListener('submit', () => {
      submitted = true;
      const btn = rsvpForm.querySelector('button[type="submit"]');
      if (btn) {
        btn.disabled = true;
        btn.textContent = 'Sending…';
      }
    });
    rsvpFrame.addEventListener('load', () => {
      if (!submitted) return;
      rsvpForm.style.display = 'none';
      rsvpThanks.classList.add('show');
    });
  }

  // Gallery lightbox
  const lightbox = document.querySelector('.lightbox');
  if (lightbox) {
    const lightboxImg = lightbox.querySelector('img');
    document.querySelectorAll('.gallery-grid figure img').forEach((img) => {
      img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('open');
      });
    });
    lightbox.addEventListener('click', () => lightbox.classList.remove('open'));
  }
});
