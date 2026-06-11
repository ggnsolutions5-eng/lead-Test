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
};

async function loadListings() {
  const response = await fetch("data/listings.json");
  const data = await response.json();
  renderSiteInfo(data.siteInfo);
  renderNav(data.categories);
  renderCategories(data.categories);
}

function renderSiteInfo(siteInfo) {
  document.getElementById("company-name").textContent = siteInfo.companyName;
  document.getElementById("project-name").textContent = siteInfo.projectName;
  document.getElementById("intro-text").textContent = siteInfo.introText;
  document.getElementById("year").textContent = new Date().getFullYear();
  document.title = `${siteInfo.companyName} - Worker Accommodations`;
}

function renderNav(categories) {
  const nav = document.getElementById("category-nav");
  nav.innerHTML = categories
    .map((cat) => `<a href="#${cat.id}">${cat.title}</a>`)
    .join("");
}

function renderCategories(categories) {
  const container = document.getElementById("listings-container");
  container.innerHTML = categories
    .map((cat) => {
      const cards = cat.listings.map(renderCard).join("");
      return `
        <section class="category-section" id="${cat.id}">
          <h2>${cat.title}</h2>
          <div class="cards">${cards || "<p>No listings yet.</p>"}</div>
        </section>
      `;
    })
    .join("");
}

function renderCard(listing) {
  const image = listing.image && listing.image.trim() !== "" ? listing.image : PLACEHOLDER_IMAGE;
  return `
    <div class="card">
      <img src="${image}" alt="${listing.name}" />
      <div class="card-body">
        <h3>${listing.name}</h3>
        <p class="address">${listing.address || ""}</p>
        <p class="price">${listing.priceRange || ""}</p>
        <p class="description">${listing.description || ""}</p>
        ${renderAmenities(listing.amenities)}
        <a class="book-btn" href="${listing.bookingUrl}" target="_blank" rel="noopener noreferrer">Book Now</a>
      </div>
    </div>
  `;
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

loadListings();
