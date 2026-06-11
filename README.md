# GGN Solutions Inc. - Worker Accommodation Directory

A simple static website that lists partner hotels, motels, and Airbnb / short-term
rentals near the Lead, SD construction project. Construction crew members can browse
the options and click "Book Now" to go directly to each provider's booking page.

## Project structure

- `index.html` - main page
- `css/style.css` - styling
- `js/app.js` - loads listings and renders the page
- `data/listings.json` - all accommodation listings (edit this file to add/remove/update listings)

## Editing listings

Open `data/listings.json` and edit the `categories` array. Each category (Hotels,
Motels, Airbnb) has a `listings` array. Each listing supports:

- `name` - name of the property
- `description` - short description
- `address` - address or area
- `priceRange` - e.g. "$80 - $120/night"
- `image` - URL to an image (leave empty `""` for a placeholder)
- `bookingUrl` - link to the property's booking page or listing
- `amenities` - optional array of amenity keys shown as icons. Supported keys:
  `wifi`, `breakfast`, `parking`, `hotTub`, `pool`, `gym`, `lounge`, `shuttle`,
  `pets`, `kitchen`, `laundry`, `ac`

You can also edit `siteInfo` to change the company name, project name, and intro text.

## Setting up the complaint/contact form

The "Contact / Complaints" section sends messages by email using
[Formspree](https://formspree.io), a free service that emails form
submissions to you with no backend code needed.

1. Go to https://formspree.io and sign up using **rick@ggnsolution.com**.
2. Click "New Form", give it a name (e.g. "Lead SD Accommodation Complaints"),
   and create it.
3. Formspree will show you an endpoint URL like
   `https://formspree.io/f/abc1234`. Copy the part after `/f/` (e.g. `abc1234`).
4. In `index.html`, find the line:
   ```html
   <form id="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
   and replace `YOUR_FORM_ID` with the ID you copied.
5. Check rick@ggnsolution.com for a confirmation email from Formspree the
   first time someone submits the form, and click the confirmation link to
   activate it. After that, all submissions are emailed automatically.

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
