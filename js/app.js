const PLACEHOLDER_IMAGE =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='260' height='160'><rect width='100%25' height='100%25' fill='%23ddd'/><text x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23999' font-family='Arial' font-size='16'>No Image</text></svg>";

const AMENITY_ICONS = {
  wifi: { icon: "📶", label: "Free WiFi" },
  breakfast: { icon: "🍳", label: "Free Breakfast" },
  parking: { icon: "🅿️", label: "Parking" },
  hotTub: { icon: "♨️", label: "Hot Tub" },
  pool: { icon: "🏊", label: "Pool" },
  gym: { icon: "🏋️", label: "Gym" },
  lounge: { icon: "🍻", label: "Bar/Lounge" },
  shuttle: { icon: "🚐", label: "Shuttle Service" },
  pets: { icon: "🐾", label: "Pet Friendly" },
  kitchen: { icon: "🍽️", label: "Kitchen" },
  laundry: { icon: "🧺", label: "Laundry" },
  ac: { icon: "❄️", label: "Air Conditioning" },
  casino: { icon: "🎰", label: "Casino" },
};

async function loadListings() {
  const response = await fetch("data/listings.json");
  const data = await response.json();
  renderSiteInfo(data.siteInfo);
  renderNav(data.categories);
  renderCategories(data.categories);
  setupScrollReveal();
}

function renderSiteInfo(siteInfo) {
  document.getElementById("company-name").textContent = `${siteInfo.companyName} ${siteInfo.tagline ? "— " + siteInfo.tagline : ""}`;
  document.getElementById("project-name").textContent = siteInfo.projectName;
  document.getElementById("project-subtitle").textContent = siteInfo.subtitle || "";
  document.getElementById("intro-text").textContent = siteInfo.introText;
  document.getElementById("year").textContent = new Date().getFullYear();
  document.title = `${siteInfo.companyName} - ${siteInfo.tagline || "Worker Accommodations"}`;
}

function renderNav(categories) {
  const nav = document.getElementById("category-nav");
  const links = categories.map((cat) => `<a href="#${cat.id}">${cat.title}</a>`);
  links.push('<a href="#contact">Contact / Complaints</a>');
  nav.innerHTML = links.join("");
}

function renderCategories(categories) {
  const container = document.getElementById("listings-container");
  container.innerHTML = categories
    .map((cat) => {
      const cards = cat.listings.map(renderCard).join("");
      return `
        <section class="category-section reveal" id="${cat.id}">
          <div class="section-header">
            <span class="section-icon">${cat.icon || ""}</span>
            <div>
              <h2>${cat.title}</h2>
              ${cat.subtitle ? `<p class="section-subtitle">${cat.subtitle}</p>` : ""}
            </div>
          </div>
          <div class="cards">${cards || "<p>No listings yet.</p>"}</div>
        </section>
      `;
    })
    .join("");
}

function renderCard(listing) {
  const image = listing.image && listing.image.trim() !== "" ? listing.image : PLACEHOLDER_IMAGE;
  return `
    <div class="card reveal">
      <div class="card-image">
        <img src="${image}" alt="${listing.name}" />
        ${listing.priceRange ? `<span class="price-badge">${listing.priceRange}</span>` : ""}
      </div>
      <div class="card-body">
        <h3>${listing.name}</h3>
        <p class="address">${listing.address || ""}</p>
        <p class="description">${listing.description || ""}</p>
        ${renderAmenities(listing.amenities)}
        <a class="book-btn" href="${listing.bookingUrl}" target="_blank" rel="noopener noreferrer">
          View &amp; Book <span class="book-btn-arrow">&rarr;</span>
        </a>
      </div>
    </div>
  `;
}

function setupScrollReveal() {
  const elements = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  elements.forEach((el) => observer.observe(el));
}

function renderAmenities(amenities) {
  if (!amenities || amenities.length === 0) return "";
  const icons = amenities
    .map((key) => {
      const amenity = AMENITY_ICONS[key];
      if (!amenity) return "";
      return `<span class="amenity" title="${amenity.label}">${amenity.icon} <span class="amenity-label">${amenity.label}</span></span>`;
    })
    .join("");
  return `<div class="amenities">${icons}</div>`;
}

function setupContactForm() {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("contact-status");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    status.textContent = "Sending...";
    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (response.ok) {
        status.textContent = "Thanks! Your message has been sent.";
        form.reset();
      } else {
        status.textContent = "Something went wrong. Please try again.";
      }
    } catch (error) {
      status.textContent = "Something went wrong. Please try again.";
    }
  });
}

function setupHeroFade() {
  const hero = document.querySelector(".hero");
  const heroBg = document.querySelector(".hero-bg");
  const fadeDistance = window.innerHeight * 0.85;
  const maxBlur = 3;

  function onScroll() {
    const progress = Math.min(1, window.scrollY / fadeDistance);
    const opacity = Math.max(0, 1 - progress);
    hero.style.opacity = opacity;
    hero.style.pointerEvents = opacity < 0.05 ? "none" : "auto";
    heroBg.style.filter = `blur(${progress * maxBlur}px)`;
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

loadListings();
setupContactForm();
setupHeroFade();
