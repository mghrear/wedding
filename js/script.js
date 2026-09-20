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

  // RSVP form — submits to a Google Apps Script Web App tied to the
  // response sheet. Unlike a raw Google Form embed, this endpoint returns
  // a real, readable JSON response, so success/failure is genuinely known.
  const rsvpForm = document.getElementById('rsvp-form');
  const rsvpThanks = document.getElementById('rsvp-thanks');
  const rsvpError = document.getElementById('rsvp-error');
  if (rsvpForm) {
    const RSVP_ENDPOINT = 'https://script.google.com/macros/s/AKfycbwOcQHhaDZdAwy_Z1acqFo6t5zRBubh_e8KsAvAQ_FAQpMYdUX8SqpjPVPe-z2Y9XO_/exec';
    const submitBtn = rsvpForm.querySelector('button[type="submit"]');

    rsvpForm.addEventListener('submit', (event) => {
      event.preventDefault();
      if (rsvpError) rsvpError.classList.remove('show');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending…';
      }

      const data = new FormData(rsvpForm);
      const params = new URLSearchParams();
      params.set('name', data.get('name') || '');
      params.set('attending', data.get('attending') || '');
      params.set('total', data.get('total') || '');
      params.set('guests', data.get('guests') || '');

      fetch(RSVP_ENDPOINT, { method: 'POST', body: params })
        .then((res) => res.json())
        .then((result) => {
          if (!result || result.result !== 'success') {
            throw new Error((result && result.message) || 'Unexpected response');
          }
          rsvpForm.style.display = 'none';
          if (rsvpThanks) rsvpThanks.classList.add('show');
        })
        .catch(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send RSVP';
          }
          if (rsvpError) rsvpError.classList.add('show');
        });
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
