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

You can also edit `siteInfo` to change the company name, project name, and intro text.

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
