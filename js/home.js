/* Homepage interactions retain the existing catalogue and enquiry endpoint. */
(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const video = document.querySelector('.about-home video');
  if (video && reducedMotion.matches) video.pause();
  if (video) {
    video.addEventListener('play', () => video.parentElement.classList.add('is-playing'));
    video.addEventListener('pause', () => video.parentElement.classList.remove('is-playing'));
  }
  const contactForm = document.querySelector('.contect-sec form');
  if (contactForm) contactForm.id = 'contact-enquiry';
  document.querySelector('.newsletter-form')?.addEventListener('submit', event => {
    event.preventDefault();
    contactForm.querySelector('[name="email"]').value = event.currentTarget.elements.email.value;
    contactForm.querySelector('[name="subject"]').value = 'Newsletter enquiry';
    contactForm.querySelector('[name="message"]').value = 'I would like to receive Hi Choice product updates. Please contact me with more information.';
    contactForm.scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth', block: 'center' });
    contactForm.querySelector('[name="name"]').focus({ preventScroll: true });
  });
  document.querySelectorAll('.product-sec .card').forEach(card => {
    const title = card.querySelector('.card-title')?.textContent.trim();
    card.querySelectorAll('img').forEach(img => {
      if (title) img.alt = title;
      img.loading = 'lazy';
      img.decoding = 'async';
    });
  });
  document.querySelectorAll('.Shop-cat .card').forEach(card => {
    card.querySelector('img').alt = card.querySelector('.card-title').textContent.trim();
  });
  if (window.jQuery?.fn.slick) {
    jQuery('.testimonial-slider').slick({
      slidesToShow: 5, slidesToScroll: 1, infinite: true,
      autoplay: !reducedMotion.matches, autoplaySpeed: 5000, speed: 450,
      pauseOnHover: true, pauseOnFocus: true, dots: false,
      prevArrow: '<button class="slick-prev" aria-label="Previous products" type="button"></button>',
      nextArrow: '<button class="slick-next" aria-label="Next products" type="button"></button>',
      responsive: [
        { breakpoint: 1100, settings: { slidesToShow: 4 } },
        { breakpoint: 900, settings: { slidesToShow: 3 } },
        { breakpoint: 600, settings: { slidesToShow: 2 } },
        { breakpoint: 360, settings: { slidesToShow: 1 } }
      ]
    });
    jQuery('.testimonial-slider2').slick({
      slidesToShow: 2, slidesToScroll: 1, infinite: true,
      autoplay: !reducedMotion.matches, autoplaySpeed: 6000, speed: 450,
      pauseOnHover: true, pauseOnFocus: true, dots: false,
      prevArrow: '<button class="slick-prev" aria-label="Previous reviews" type="button"></button>',
      nextArrow: '<button class="slick-next" aria-label="Next reviews" type="button"></button>',
      responsive: [{ breakpoint: 600, settings: { slidesToShow: 1 } }]
    });
  }
})();
