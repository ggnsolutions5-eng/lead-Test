# GGN Solutions Inc. - Worker Housing Marketplace

A static, Expedia-style website where workers on the FFDG (Fermi Forward Discovery
Group) construction project in Lead, SD can browse partner hotels and short-term
furnished houses/apartments managed by GGN Solutions Inc., and click "View & Book"
to book and pay directly with each provider.

## Project structure

- `index.html` - main page
- `css/style.css` - styling
- `js/app.js` - loads listings and renders the page
- `data/listings.json` - all accommodation listings (edit this file to add/remove/update listings)

## Editing listings

Open `data/listings.json` and edit the `categories` array. Each category (Hotels &
Resorts, Houses & Apartments) has a `listings` array. Each listing supports:

- `name` - name of the property
- `description` - short description
- `address` - address or area
- `priceRange` - e.g. "$80 - $120/night"
- `image` - URL to an image (leave empty `""` for a placeholder)
- `bookingUrl` - link to the property's booking page or listing
- `amenities` - optional array of amenity keys shown as icons. Supported keys:
  `wifi`, `breakfast`, `parking`, `hotTub`, `pool`, `gym`, `lounge`, `shuttle`,
  `pets`, `kitchen`, `laundry`, `ac`, `casino`

You can also edit `siteInfo` to change the company name, tagline, project name,
and intro text.

### Note on Airbnb listings

Airbnb blocks automated tools from reading listing photos/details, so the three
house/apartment listings currently use a placeholder image. To use real photos,
download the photo from the Airbnb listing yourself and either host it
elsewhere (e.g. an `images/` folder in this repo) and set `image` to that path,
or paste a direct image URL.

## Complaint/contact form

The "Contact / Complaints" section sends messages by email using
[Formspree](https://formspree.io), a free service that emails form
submissions with no backend code needed. The form is wired to endpoint
`https://formspree.io/f/mpqejrnj`, which delivers to rick@ggnsolution.com.

The first time someone submits the form, Formspree sends a confirmation
email to rick@ggnsolution.com - click the activation link in that email to
start receiving submissions automatically.

## Running locally

Because the page loads `data/listings.json` via `fetch`, it needs to be served over
HTTP (opening `index.html` directly with `file://` will not load the data due to
browser security restrictions). From this folder, run:

```
npx serve .
```

or, with Python installed:

```
python -m http.server 8000
```

Then open the printed URL (e.g. http://localhost:8000) in your browser.

## Deploying

This is a static site, so it can be hosted for free on GitHub Pages, Netlify, or
Vercel - just point the host at this folder.
