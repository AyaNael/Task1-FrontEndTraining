document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".menu-links li a");
  const menuIcon = document.querySelector('.menu-icon');
  const menuLinks = document.querySelector('.menu-links');
  const overlay = document.getElementById('drawerOverlay');
  const mainContent = document.querySelector('main');

  // Highlight the correct menu link and load content on first load
  const initialPage = window.location.hash.substring(1) || "contactUs";
  loadPageContent(initialPage);
  updateActiveLink(initialPage);

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
      e.preventDefault(); // Prevent default anchor behavior
      //substring(1) to get the second element after #
      const page = link.getAttribute('href').substring(1); // Get page name from href (e.g. 'contactUs' from '#contactUs')
      loadPageContent(page);  // Load corresponding HTML content
      updateActiveLink(page); // Highlight the active link
      history.pushState(null, "", `#${page}`); // Update the URL hash without reloading
    });
  });

  // Load correct page on hash change (back/forward buttons)

  // Load correct page on hash change (back/forward buttons)
  window.addEventListener('hashchange', () => {
    const hashPage = window.location.hash.substring(1);
    loadPageContent(hashPage);
    updateActiveLink(hashPage);
  });

  // Function to load content dynamically into <main>
  function loadPageContent(page) {
    mainContent.innerHTML = `<p class="loader">Loading...</p>`;
    // Reset class based on page
    mainContent.className = "main-container"; 

    switch (page) {
      case "contactUs":
        mainContent.classList.add("contact-container");
        break;
      case "products":
        mainContent.classList.add("product-container");
        break;
      case "services":
        mainContent.classList.add("services-container");
        break;
      default:
        mainContent.classList.add("default-container");
    }

    fetch(`${page}.html`)
      .then(res => res.text())
      .then(htmlText => {
        mainContent.innerHTML = htmlText;

        // 🟡 بعد ما نحط محتوى products.html داخل <main>
        if (page === "products") {
          fetch("https://dummyjson.com/products/category/laptops")
            .then(res => res.json())
            .then(data => {
              const products = data.products;
              const html = products.map(product => `
              <div class="product-card">
                <img src="${product.thumbnail}" alt="${product.title}" class="product-img">
                <h3>${product.title}</h3>
                <p>${product.description}</p>
                <p><strong>Price:</strong> $${product.price}</p>
                <p><strong>Category:</strong> ${product.category}</p>
                <button>Add to Cart</button>
              </div>
            `).join("");
              const container = document.querySelector(".product-grid");
              if (container) {
                container.innerHTML = html;
              } else {
                mainContent.innerHTML = `<p>.product-grid not found in products.html</p>`;
              }
            })
            .catch(() => {
              mainContent.innerHTML = `<p> Failed to load products from API.</p>`;
            });
        }
      })
      .catch(() => {
        mainContent.innerHTML = `<p>Error loading page "${page}.html"</p>`;
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