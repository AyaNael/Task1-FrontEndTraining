document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".menu-links li a");
  const menuIcon = document.querySelector('.menu-icon');
  const menuLinks = document.querySelector('.menu-links');
  const overlay = document.getElementById('drawerOverlay');
  const mainContent = document.querySelector('main');

  // Highlight the correct menu link and load content on first load
  const currentPath = window.location.pathname.slice(1) || "contactUs";
  loadPageContent(currentPath);
  updateActiveLink(currentPath);

  // Toggle menu open/close when menu icon is clicked (mobile view)
  menuIcon.addEventListener('click', () => {
    menuLinks.classList.toggle('open');       // Slide menu in/out
    overlay.classList.toggle('active');       // Show/hide dark overlay
  });

  // Close menu when overlay is clicked (mobile view)
  overlay.addEventListener('click', () => {
    menuLinks.classList.remove('open');
    overlay.classList.remove('active');
  });

  // Close menu and remove overlay after clicking a link (mobile view)
  menuLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      menuLinks.classList.remove("open");
      overlay.classList.remove("active");
    });
  });

  // When any nav link is clicked
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const page = link.getAttribute('href').replace('/', '');
      history.pushState({ page }, "", `/${page}`); // يغير الرابط بدون إعادة تحميل الصفحة.
      loadPageContent(page);
      updateActiveLink(page);
    });
  });

  // Back/Forward navigation
  window.addEventListener('popstate', (e) => {
    const path = window.location.pathname.slice(1) || "contactUs";
    loadPageContent(path);
    updateActiveLink(path);
  });

  // Function to load content dynamically into <main>
  function loadPageContent(page) {
    mainContent.innerHTML = `<p class="loader">Loading...</p>`;

    if (page === "about") {
      fetch("https://jsonplaceholder.typicode.com/posts/1")
        .then(res => res.json())
        .then(data => {
          mainContent.innerHTML = `
          <section class="about-api">
            <h2>About Us (from API)</h2>
            <h3>${data.title}</h3>
            <p>${data.body}</p>
          </section>
        `;
        })
        .catch(() => {
          mainContent.innerHTML = `<p>Failed to load About info.</p>`;
        });
      return;
    }

    fetch(`${page}.html`)
      .then(res => res.text())
      .then(htmlText => {
        mainContent.innerHTML = htmlText;
      })
      .catch(() => {
        mainContent.innerHTML = `<p>Error loading page "${page}"</p>`;
      });
  }

  // Function to highlight active navigation link
  function updateActiveLink(currentPage) {
    navLinks.forEach(link => {
      const page = link.getAttribute('href').substring(1);
      link.classList.toggle('active-link', page === currentPage);
    });
  }
});
