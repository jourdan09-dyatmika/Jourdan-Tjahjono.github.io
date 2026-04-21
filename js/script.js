// ========================================
// MAIN JAVASCRIPT
// ========================================

document.addEventListener("DOMContentLoaded", () => {
  // Initialize all components
  initCursor();
  initNavigation();
  initPageTransition();
  initMobileMenu();
  initScrollAnimations();
  initCountUp();
  initPortfolioFilter();
  initLightbox();
  initMagneticButtons();
  initFormSubmit();
});

// ========================================
// CUSTOM CURSOR
// ========================================
function initCursor() {
  const cursor = document.querySelector(".cursor");
  const follower = document.querySelector(".cursor-follower");

  if (!cursor || !follower) return;

  let posX = 0,
    posY = 0;
  let mouseX = 0,
    mouseY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursor.style.left = mouseX - 5 + "px";
    cursor.style.top = mouseY - 5 + "px";
  });

  // Smooth follower
  const updateFollower = () => {
    posX += (mouseX - posX) * 0.1;
    posY += (mouseY - posY) * 0.1;

    follower.style.left = posX - 20 + "px";
    follower.style.top = posY - 20 + "px";

    requestAnimationFrame(updateFollower);
  };
  updateFollower();

  // Hover effects
  const hoverElements = document.querySelectorAll(
    "a, button, .gallery-item, .service-card, .featured-item",
  );

  hoverElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.classList.add("hover");
      follower.classList.add("hover");
    });

    el.addEventListener("mouseleave", () => {
      cursor.classList.remove("hover");
      follower.classList.remove("hover");
    });
  });
}

// ========================================
// NAVIGATION
// ========================================
function initNavigation() {
  const nav = document.getElementById("mainNav");

  if (!nav) return;

  // Scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  });

  // Page transition on link click
  const links = document.querySelectorAll('a[href$=".html"]');

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");

      // Skip if it's anchor or external
      if (href.startsWith("#") || href.startsWith("http")) return;

      e.preventDefault();

      const transition = document.querySelector(".page-transition");
      transition.classList.add("active");

      setTimeout(() => {
        window.location.href = href;
      }, 800);
    });
  });
}

// ========================================
// PAGE TRANSITION
// ========================================
function initPageTransition() {
  const transition = document.querySelector(".page-transition");

  // Close transition on page load
  window.addEventListener("load", () => {
    setTimeout(() => {
      transition.classList.remove("active");
    }, 800);
  });
}

// ========================================
// MOBILE MENU
// ========================================
function initMobileMenu() {
  const toggle = document.getElementById("menuToggle");
  const menu = document.getElementById("mobileMenu");

  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    toggle.classList.toggle("active");
    menu.classList.toggle("active");
    document.body.style.overflow = menu.classList.contains("active")
      ? "hidden"
      : "";
  });

  // Close on link click
  const mobileLinks = menu.querySelectorAll(".mobile-link");

  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      toggle.classList.remove("active");
      menu.classList.remove("active");
      document.body.style.overflow = "";
    });
  });
}

// ========================================
// SCROLL ANIMATIONS
// ========================================
function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        // Trigger skill bars
        if (entry.target.classList.contains("skill-item")) {
          const fill = entry.target.querySelector(".skill-fill");
          if (fill) {
            fill.style.width = fill.dataset.width + "%";
          }
        }
      }
    });
  }, observerOptions);

  const scrollElements = document.querySelectorAll("[data-scroll]");

  scrollElements.forEach((el) => {
    observer.observe(el);
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));

      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// ========================================
// COUNT UP ANIMATION
// ========================================
function initCountUp() {
  const counters = document.querySelectorAll(".stat-number[data-count]");

  if (!counters.length) return;

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.dataset.count);
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
          current += increment;

          if (current < target) {
            counter.textContent = Math.floor(current) + "+";
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target + "+";
          }
        };

        updateCounter();
        observer.unobserve(counter);
      }
    });
  }, observerOptions);

  counters.forEach((counter) => {
    observer.observe(counter);
  });
}

// ========================================
// PORTFOLIO FILTER
// ========================================
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");

  if (!filterBtns.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Update active state
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;

      // Filter items
      galleryItems.forEach((item) => {
        const category = item.dataset.category;

        if (filter === "all" || category === filter) {
          item.style.display = "block";
          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "scale(1)";
          }, 50);
        } else {
          item.style.opacity = "0";
          item.style.transform = "scale(0.8)";
          setTimeout(() => {
            item.style.display = "none";
          }, 300);
        }
      });
    });
  });
}

// ========================================
// LIGHTBOX
// ========================================
function initLightbox() {
  const lightbox = document.getElementById("lightbox");
  const galleryItems = document.querySelectorAll(".gallery-item");

  if (!lightbox || !galleryItems.length) return;

  const lightboxImg = lightbox.querySelector(".lightbox-image");
  const lightboxCaption = lightbox.querySelector(".lightbox-caption h3");
  const lightboxCategory = lightbox.querySelector(".lightbox-caption p");
  const closeBtn = lightbox.querySelector(".lightbox-close");
  const prevBtn = lightbox.querySelector(".lightbox-prev");
  const nextBtn = lightbox.querySelector(".lightbox-next");

  let currentIndex = 0;
  let visibleItems = [];

  // Open lightbox
  galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      // Get visible items
      visibleItems = Array.from(galleryItems).filter(
        (item) => item.style.display !== "none",
      );

      currentIndex = visibleItems.indexOf(item);

      const img = item.querySelector("img");
      const title = item.querySelector(".gallery-info h3").textContent;
      const category = item.querySelector(".gallery-category").textContent;

      lightboxImg.src = img.src;
      lightboxCaption.textContent = title;
      lightboxCategory.textContent = category;

      lightbox.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  // Close lightbox
  const closeLightbox = () => {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
  };

  closeBtn.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Navigation
  const showImage = (index) => {
    const item = visibleItems[index];
    const img = item.querySelector("img");
    const title = item.querySelector(".gallery-info h3").textContent;
    const category = item.querySelector(".gallery-category").textContent;

    lightboxImg.src = img.src;
    lightboxCaption.textContent = title;
    lightboxCategory.textContent = category;
  };

  prevBtn.addEventListener("click", () => {
    currentIndex =
      (currentIndex - 1 + visibleItems.length) % visibleItems.length;
    showImage(currentIndex);
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % visibleItems.length;
    showImage(currentIndex);
  });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;

    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") {
      currentIndex =
        (currentIndex - 1 + visibleItems.length) % visibleItems.length;
      showImage(currentIndex);
    }
    if (e.key === "ArrowRight") {
      currentIndex = (currentIndex + 1) % visibleItems.length;
      showImage(currentIndex);
    }
  });
}

// ========================================
// MAGNETIC BUTTONS
// ========================================
function initMagneticButtons() {
  const magneticBtns = document.querySelectorAll(".magnetic");

  magneticBtns.forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "translate(0, 0)";
    });
  });
}

// ========================================
// FORM SUBMIT
// ========================================
function initFormSubmit() {
  const form = document.getElementById("contactForm");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Show success message
    alert(
      `Thank you, ${data.name}! Your message has been sent. I'll get back to you soon.`,
    );

    // Reset form
    form.reset();
  });
}

// ========================================
// PARALLAX EFFECT (Optional)
// ========================================
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll(".parallax");

  parallaxElements.forEach((el) => {
    const speed = el.dataset.speed || 0.5;
    el.style.transform = `translateY(${scrolled * speed}px)`;
  });
});
