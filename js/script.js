document.addEventListener("DOMContentLoaded", function () {
  // Preloader
  const preloader = document.querySelector(".preloader");

  // Hide preloader when page is loaded
  window.addEventListener("load", function () {
    preloader.classList.add("fade-out");
    setTimeout(() => {
      preloader.style.display = "none";
    }, 500);
  });

  // Navbar scroll effect
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: "smooth",
        });

        // Close mobile menu when a link is clicked
        const navbarCollapse = document.querySelector(".navbar-collapse");
        if (navbarCollapse.classList.contains("show")) {
          const bsCollapse = new bootstrap.Collapse(navbarCollapse);
          bsCollapse.hide();
        }
      }
    });
  });

  // Back to top button
  const backToTopButton = document.querySelector(".back-to-top");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      backToTopButton.classList.add("active");
    } else {
      backToTopButton.classList.remove("active");
    }
  });

  backToTopButton.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Animate stats counter
  const statNumbers = document.querySelectorAll(".stat-number");
  if (statNumbers.length > 0) {
    const animateStats = () => {
      statNumbers.forEach((stat) => {
        const target = parseInt(stat.getAttribute("data-count"));
        const duration = 2000; // Animation duration in ms
        const step = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
          current += step;
          if (current < target) {
            stat.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
          } else {
            stat.textContent = target;
          }
        };

        updateCounter();
      });
    };

    // Intersection Observer to trigger animation when stats are in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateStats();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    document
      .querySelector(".about-stats")
      .querySelectorAll(".stat-number")
      .forEach((stat) => {
        observer.observe(stat);
      });
  }

  // Initialize carousels
  const productCarousel = new bootstrap.Carousel(
    document.getElementById("productsCarousel"),
    {
      interval: 5000,
      wrap: true,
    }
  );

  const testimonialCarousel = new bootstrap.Carousel(
    document.getElementById("testimonialCarousel"),
    {
      interval: 6000,
      wrap: true,
    }
  );

  // Add animation classes when elements come into view
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(
      ".service-card, .product-card, .collection-card, .testimonial-card"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(
              "animate__animated",
              "animate__fadeInUp"
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach((element) => {
      observer.observe(element);
    });
  };

  // Run animation function after page load
  setTimeout(animateOnScroll, 500);
});
