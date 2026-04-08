/* ==========================================
   WBM CONTRACTING - MAIN JAVASCRIPT
   ========================================== */

document.addEventListener('DOMContentLoaded', function () {
  // Initialize AOS
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 600,
      once: true,
      offset: 80,
    });
  }

  // Set current year in footer
  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Initialize components
  initNavbar();
  initHeroCarousel();
  initTabs();
  initProjectFilter();
  initContactForm();
  initModalForm();
});

/* ---- NAVBAR ---- */
function initNavbar() {
  const navbar = document.getElementById('mainNavbar');
  if (!navbar) return;

  // Check if we're on the homepage
  const isHomePage = window.location.pathname === '/' ||
    window.location.pathname.endsWith('index.html') ||
    window.location.pathname === '/index.html';

  function handleScroll() {
    if (window.scrollY > 50 || !isHomePage) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  // Initial check
  if (!isHomePage) {
    navbar.classList.add('scrolled');
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll();

  // Close mobile menu on link click
  document.querySelectorAll('#navbarNav .nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      const collapse = document.getElementById('navbarNav');
      const bsCollapse = bootstrap.Collapse.getInstance(collapse);
      if (bsCollapse) bsCollapse.hide();
    });
  });
}

/* ---- HERO CAROUSEL ---- */
function initHeroCarousel() {
  const slides = document.querySelectorAll('.hero-slide');
  const indicators = document.querySelectorAll('.hero-indicator');
  const titleEl = document.getElementById('heroTitle');
  const subtitleEl = document.getElementById('heroSubtitle');
  const descEl = document.getElementById('heroDescription');

  if (!slides.length) return;

  const slideData = [
    {
      title: 'Luxury Developments',
      subtitle: 'That Enhance Life & Work',
      description: 'Complete interior solutions for commercial, retail, and office spaces',
    },
    {
      title: 'Innovation & Quality',
      subtitle: 'In Every Project We Deliver',
      description: 'Modern design trends with smart construction practices',
    },
    {
      title: 'Your Trusted Partner',
      subtitle: 'For Superior Workmanship',
      description: 'Known for innovation, reliability, and exceptional results',
    },
  ];

  let currentSlide = 0;
  let autoTimer;

  function goToSlide(index) {
    slides.forEach(function (s) { s.classList.remove('active'); });
    indicators.forEach(function (i) { i.classList.remove('active'); });

    currentSlide = index;
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');

    // Update text with animation
    if (titleEl && subtitleEl && descEl) {
      titleEl.style.opacity = '0';
      subtitleEl.style.opacity = '0';
      descEl.style.opacity = '0';
      titleEl.style.transform = 'translateY(20px)';
      subtitleEl.style.transform = 'translateY(20px)';
      descEl.style.transform = 'translateY(20px)';

      setTimeout(function () {
        titleEl.textContent = slideData[currentSlide].title;
        subtitleEl.textContent = slideData[currentSlide].subtitle;
        descEl.textContent = slideData[currentSlide].description;

        titleEl.style.opacity = '1';
        titleEl.style.transform = 'translateY(0)';
        setTimeout(function () {
          subtitleEl.style.opacity = '1';
          subtitleEl.style.transform = 'translateY(0)';
        }, 100);
        setTimeout(function () {
          descEl.style.opacity = '1';
          descEl.style.transform = 'translateY(0)';
        }, 200);
      }, 300);
    }
  }

  function nextSlide() {
    goToSlide((currentSlide + 1) % 3);
  }

  function prevSlide() {
    goToSlide((currentSlide - 1 + 3) % 3);
  }

  function startAutoPlay() {
    autoTimer = setInterval(nextSlide, 5000);
  }

  function resetAutoPlay() {
    clearInterval(autoTimer);
    startAutoPlay();
  }

  // Arrows
  var prevBtn = document.getElementById('heroPrev');
  var nextBtn = document.getElementById('heroNext');
  if (prevBtn) prevBtn.addEventListener('click', function () { prevSlide(); resetAutoPlay(); });
  if (nextBtn) nextBtn.addEventListener('click', function () { nextSlide(); resetAutoPlay(); });

  // Indicators
  indicators.forEach(function (ind) {
    ind.addEventListener('click', function () {
      goToSlide(parseInt(this.dataset.slide));
      resetAutoPlay();
    });
  });

  // Add transition styles
  if (titleEl) {
    titleEl.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    subtitleEl.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    descEl.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
  }

  startAutoPlay();
}

/* ---- TABS (About Section) ---- */
function initTabs() {
  var tabBtns = document.querySelectorAll('.tab-btn');
  if (!tabBtns.length) return;

  tabBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var tabId = this.dataset.tab;

      // Update buttons
      tabBtns.forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');

      // Update panes
      document.querySelectorAll('.tab-pane').forEach(function (pane) {
        pane.classList.remove('active');
      });
      var target = document.getElementById('tab-' + tabId);
      if (target) target.classList.add('active');
    });
  });
}

/* ---- PROJECT FILTER ---- */
function initProjectFilter() {
  var filterBtns = document.querySelectorAll('.filter-btn');
  var projectItems = document.querySelectorAll('.project-item');

  if (!filterBtns.length || !projectItems.length) return;

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var filter = this.dataset.filter;

      // Update buttons
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');

      // Filter items
      projectItems.forEach(function (item) {
        if (filter === 'all' || item.dataset.category === filter) {
          item.classList.remove('hidden');
          item.style.display = '';
        } else {
          item.classList.add('hidden');
          item.style.display = 'none';
        }
      });
    });
  });
}

/* ---- CONTACT FORM ---- */
function initContactForm() {
  var form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    submitForm(form, document.getElementById('contactSubmitBtn'));
  });
}

/* ---- MODAL FORM ---- */
function initModalForm() {
  var form = document.getElementById('modalContactForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    submitForm(form, document.getElementById('modalSubmitBtn'), true);
  });
}

/* ---- FORM SUBMISSION ---- */
function submitForm(form, submitBtn, isModal) {
  if (submitBtn.disabled) return;

  var formData = {
    name: form.querySelector('[name="name"]').value,
    email: form.querySelector('[name="email"]').value,
    phone: form.querySelector('[name="phone"]').value,
    subject: form.querySelector('[name="subject"]').value,
    message: form.querySelector('[name="message"]').value,
  };

  // Show loading state
  submitBtn.disabled = true;
  var originalHTML = submitBtn.innerHTML;
  submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';

  var apiUrl = window.location.hostname === 'localhost'
    ? 'http://localhost/wbm/public/api/send-email.php'
    : 'https://wbmcontractingllc.com/api/send-email.php';

  fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  })
    .then(function (res) { return res.json(); })
    .then(function (data) {
      if (data.status === 'success') {
        Swal.fire({
          title: 'Thank You!',
          text: 'Thank you for submitting the form. We will get back to you shortly!',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#D4AF37',
        });
        form.reset();
        if (isModal) {
          var modal = bootstrap.Modal.getInstance(document.getElementById('consultationModal'));
          if (modal) modal.hide();
        }
      } else {
        Swal.fire({
          title: 'Oops!',
          text: data.message || 'Something went wrong. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#D4AF37',
        });
      }
    })
    .catch(function () {
      Swal.fire({
        title: 'Connection Error',
        text: 'Unable to send your message. Please check your internet connection and try again.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#D4AF37',
      });
    })
    .finally(function () {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalHTML;
    });
}

/* ---- CONSULTATION MODAL ---- */
function openConsultationModal() {
  var modal = new bootstrap.Modal(document.getElementById('consultationModal'));
  modal.show();
}

// Make it globally available
window.openConsultationModal = openConsultationModal;

/* ---- SMOOTH SCROLL ---- */
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    var target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
