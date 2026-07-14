# Zoku.thrift — Website Guide

This is your website. It's just 5 files — no installing anything, no
"build step". You open the folder, edit a couple of files, and upload it.

This guide assumes you have never built a website before. Read it once
start to finish before you touch anything.

---

## 1. What's in this folder

```
zoku-thrift/
├── index.html      → the page structure (you'll rarely touch this)
├── style.css        → all the colors, fonts, spacing (the "look")
├── script.js         → makes the filters, search, and pop-up window work
├── products.js       → YOUR PRODUCTS + SHOP SETTINGS — the file you edit
├── README.md         → this guide
└── images/
    ├── levis-501/
    │   ├── front.jpg
    │   ├── back.jpg
    │   └── detail.jpg
    ├── dickies-874/
    │   ├── front.jpg
    │   └── back.jpg
    └── reels/
        ├── reel1.jpg   → thumbnail for the "Latest Drops" section
        ├── reel2.jpg
        └── reel3.jpg
```

**You will spend 95% of your time in two places: the `images/` folder and
`products.js`.** You should almost never need to open `index.html`,
`style.css`, or `script.js`.

---

## 2. See it on your computer (before uploading anywhere)

1. Find the folder you saved these files in.
2. Double-click `index.html`.
3. It opens in your web browser and works immediately — no internet
   connection required except to load the two fonts.

Any time you make a change, save the file and refresh the browser tab to
see the update.

---

## 3. How to add a new product (the important part)

Say you just thrifted a pair of Wrangler jeans and want to list them.

### Step 1 — Make a folder for the photos

Inside the `images/` folder, create a new folder. Use lowercase letters
and hyphens, no spaces:

```
images/wrangler-923/
```

Drop your photos in there. Name them clearly, for example:

```
images/wrangler-923/front.jpg
images/wrangler-923/back.jpg
images/wrangler-923/detail.jpg
```

You can have as many photos per product as you like (2–4 is a good
number). Bigger photos make the page slower to load, so aim for photos
under roughly 500KB each — most phone photos can be shrunk with any free
online "compress image" tool if they're too big.

### Step 2 — Open `products.js`

This file has a list of products. Each product looks like this:

```js
{
  id: 11,
  code: "ZT011",
  name: "Cowboy Cut 923",
  price: 999,
  waist: 32,
  length: 34,
  size: "M",
  brand: "Wrangler",
  description: "Straight fit in a faded indigo wash, no repairs.",
  sold: false,
  dateAdded: "2026-07-15",
  images: [
    "images/wrangler-923/front.jpg",
    "images/wrangler-923/back.jpg",
    "images/wrangler-923/detail.jpg"
  ]
}
```

To add your new product:

1. Copy one whole product block, from the opening `{` to the closing `}`.
2. Paste it just before the final `]` at the bottom of the list — make
   sure there's a comma after the `}` of the product above it.
3. Change the fields:
   - `id` → the next number in the list (never reuse a number)
   - `code` → the next code in the list, e.g. `"ZT011"` — this is the
     short reference customers can mention when they DM you
   - `name`, `brand`, `description` → in plain text, inside quotes
   - `price` → a plain number, no currency symbol, no commas
   - `waist`, `length` → plain numbers, in inches
   - `size` → a short size label in quotes, like `"M"` or `"32"`
   - `sold` → `true` if it's no longer available, otherwise `false`
   - `dateAdded` → today's date as `"YYYY-MM-DD"` (used for "Newest" sorting)
   - `images` → the file paths you created in Step 1
4. Save the file.
5. Refresh `index.html` in your browser. Your new product appears in the
   grid automatically — you don't need to touch any other file, and any
   new waist or size you use will automatically show up in the filter
   dropdowns too.

### Marking something as sold

Find the product in `products.js` and change:

```js
sold: false,
```
to
```js
sold: true,
```

A small "Sold" badge appears on the product automatically, and if a
visitor has the "Available only" filter checked, it disappears from the
grid.

### Removing a product entirely

Delete its whole `{ ... }` block from `products.js` (and remember to
remove the extra comma if it was the last item in the list). You can
leave its images folder in place — it just won't be linked to anything.

---

## 4. Changing the logo and shop name

The logo is text, not an image, so it's easy to change and always looks
sharp. Open `index.html`, find this near the top:

```html
<a href="#home" class="logo" data-nav-link data-view="home">
  <span class="logo__mark">Zoku.thrift</span>
  <span class="logo__sub">Handpicked Vintage Pants</span>
</a>
```

Change the text inside the two `<span>` tags to whatever you like.

---

## 5. Changing your Instagram username and email

Open `products.js` and look at the very top for this block:

```js
const SHOP_SETTINGS = {
  instagramUsername: "zoku.thrift", // no @ symbol, no spaces
  contactEmail: "zokuthrift@gmail.com",
  reels: [
    { image: "images/reels/reel1.jpg", url: "https://www.instagram.com/zoku.thrift/" },
    { image: "images/reels/reel2.jpg", url: "https://www.instagram.com/zoku.thrift/" },
    { image: "images/reels/reel3.jpg", url: "https://www.instagram.com/zoku.thrift/" }
  ]
};
```

Change `"zoku.thrift"` to your real Instagram username (no `@`, no
spaces), and change the email to your real address. This single edit
updates the "Reserve on Instagram" button on every product, the "Follow"
buttons, **and** the Contact page — you don't need to change it anywhere
else.

### Updating the "Latest Drops" reels

The homepage shows three clickable thumbnails linking to your Instagram
Reels — not embedded video, just fast-loading images. To update them:

1. Save a still image or screenshot from each Reel into
   `images/reels/` as `reel1.jpg`, `reel2.jpg`, `reel3.jpg`.
2. In the `reels` list above, change each `url` to the actual link of
   that Reel on Instagram (open the Reel, tap **Share → Copy Link**).

You can add a fourth or fifth reel the same way — just add another
`{ image: ..., url: ... }` entry to the list.

---

## 6. Editing the About / How To Buy / Contact text

These are plain paragraphs inside `index.html`. Search the file for
`id="about"`, `id="how-to-buy"`, or `id="contact"` and edit the text
between the `<p>` and `</p>` tags. You can't break anything by changing
the words inside those tags, as long as you leave the tags themselves
(the bits in `< >`) untouched.

Note: **About** and **Contact** aren't in the top navigation bar — they
live in the footer, since customers arriving from Instagram mostly just
want to shop. The pages themselves still work exactly the same way.

---

## 7. Replacing images

To replace a product photo, just save a new file with the exact same
name over the old one (for example, drop a new `front.jpg` into
`images/levis-501/`, replacing the old one). Nothing else needs to
change.

To rename an image or use a different filename, update the matching path
inside that product's `images: [ ... ]` list in `products.js`.

---

## 8. Deploying to GitHub

1. Create a free account at [github.com](https://github.com) if you
   don't have one.
2. Click **New repository**. Give it a name, like `zoku-thrift-site`.
   Keep it Public. Click **Create repository**.
3. On the new repository page, click **uploading an existing file**.
4. Drag your whole folder's contents in (`index.html`, `style.css`,
   `script.js`, `products.js`, `README.md`, and the `images` folder).
5. Click **Commit changes**. Your code is now on GitHub.

---

## 9. Deploying to Vercel (making it a live website)

1. Create a free account at [vercel.com](https://vercel.com) — you can
   sign up directly with your GitHub account.
2. Click **Add New → Project**.
3. Choose the GitHub repository you just created (`zoku-thrift-site`).
4. Vercel will show a setup screen. You don't need to change anything —
   this is a static site, so leave the framework setting as "Other" and
   click **Deploy**.
5. After about 30 seconds, Vercel gives you a live link, something like
   `zoku-thrift-site.vercel.app`. That's your website, live on the
   internet.

### Publishing future changes

Every time you edit `products.js` (to add or update a product) or add new
images, upload the changed files to the same GitHub repository (GitHub's
web uploader lets you drag files in again — it will ask if you want to
replace the existing ones). Vercel automatically notices the update and
re-publishes your site within a minute, with nothing else for you to do.

---

## 10. Troubleshooting

**A product doesn't show an image, just a gray box with its name.**
This means the file path in `products.js` doesn't match where the image
actually is. Double check the folder name and file name match exactly,
including capital letters — `Front.jpg` and `front.jpg` are treated as
different files.

**A new product doesn't appear on the site.**
Check `products.js` for a missing comma between product blocks, or a
missing closing `}`. A single missing comma will stop the whole file
from working. Most code editors (even Notepad won't tell you, but VS
Code will) highlight this in red.

**The filters don't show my new brand/size/waist.**
Refresh the page after saving `products.js` — the filters rebuild
themselves from whatever is currently in the file every time the page
loads.

---

That's the whole system. Add a folder of photos, copy-paste-edit one
block in `products.js`, upload, done.
