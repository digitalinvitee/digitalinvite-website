document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  const langButtons = document.querySelectorAll(".lang-btn");
  const translatableElements = document.querySelectorAll("[data-en][data-ka]");

  let currentLang = localStorage.getItem("invite-lang") || "en";

  function menuText() {
    return currentLang === "ka" ? "მენიუ" : "Menu";
  }

  function closeText() {
    return currentLang === "ka" ? "დახურვა" : "Close";
  }

  function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem("invite-lang", lang);

    translatableElements.forEach((element) => {
      const translation = element.getAttribute(`data-${lang}`);

      if (translation) {
        element.innerHTML = translation;
      }
    });

    langButtons.forEach((button) => {
      button.classList.toggle("active", button.dataset.lang === lang);
    });

    document.documentElement.lang = lang === "ka" ? "ka" : "en";

    if (menuBtn && mobileMenu) {
      menuBtn.textContent = mobileMenu.classList.contains("active")
        ? closeText()
        : menuText();
    }
  }

  langButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setLanguage(button.dataset.lang);
    });
  });

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("active");

      menuBtn.textContent = mobileMenu.classList.contains("active")
        ? closeText()
        : menuText();
    });

    document.querySelectorAll(".mobile-menu a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
        menuBtn.textContent = menuText();
      });
    });
  }

  setLanguage(currentLang);

  const header = document.querySelector(".site-header");

  window.addEventListener("scroll", () => {
    if (!header) return;

    if (window.scrollY > 30) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  /* დაემატა .service-card შენს ორიგინალ სიაში */
  const revealElements = document.querySelectorAll(
    ".editorial-text, .benefit-grid > div, .corporate-layout, .section-heading, .portfolio-group, .portfolio-item, .service-card, .package-line, .process-list div, .contact-inner"
  );

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
    }
  );

  revealElements.forEach((element) => {
    element.classList.add("reveal");
    revealObserver.observe(element);
  });

  document.querySelectorAll('a[target="_blank"]').forEach((link) => {
    link.setAttribute("rel", "noopener noreferrer");
  });
});