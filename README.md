# Cyril Forot portfolio

A one-page portfolio with a bottle that empties as you scroll. Plain HTML, CSS and JavaScript: no build step, no dependencies, separate from the Astro project.

## Run it

Double-click `index.html`, or from this folder run `npx serve` and open the address it prints.
Any static host works for publishing (Vercel, Netlify, GitHub Pages): upload the whole folder.

## Where things live

```
index.html          Page shell (bottle, header, main, footer). Rarely edited.
content/site.js     ALL text, links, images and sections. This is the file you edit.
css/styles.css      Colours and fonts are the tokens at the top (:root). Layout below.
js/render.js        Turns content/site.js into the page. One function per section type.
js/carousel.js      Hero photo carousel.
js/bottle.js        Bottle animation (draining, slosh, bubbles).
assets/images/      Your photos.
assets/bottle/      Bottle cut-outs (full, empty, mask).
```

## Everyday changes (all in `content/site.js`)

**Change the summary.** Edit `hero.summary`. The yellow "TO UPDATE" box shows while `hero.summaryToUpdate` exists. Delete that line when you are happy with the text.

**Add a section.** Copy a whole object inside `sections`, paste it where you want it on the page and change it. Four types exist:

| type | use it for | items |
|---|---|---|
| `cards` | a grid of photo cards | `image, alt, badge, title, text, link?` |
| `about` | text next to a portrait | `paragraphs`, `image` |
| `stories` | a big photo story plus small highlight cards | `kind: 'photo'` or `'highlight'` |
| `quotes` | recommendations | `text, name, role` |

Give the section a unique `id`. If it has a `nav` label, it also gets a link in the header.

**Add a card.** Add one line to the `items` of the `cards` section.

**Add a photo.** Put the file in `assets/images/` and write its path (`assets/images/my-photo.jpg`). Keep photos under about 500 KB. Phone photos are much larger and should be resized first.

**Show a yellow "TO UPDATE" note** on a story card: add `todo: 'What is missing'` to the item.

**Remove a section.** Delete its object from `sections`.

## A brand-new kind of section

Add a function to the `sections` object in `js/render.js` (copy `quotes` as a starting point), then use its name as `type` in `content/site.js`. Add its CSS to `css/styles.css`.

## The bottle

`assets/bottle/bottle-full.png`, `bottle-empty.png` and `bottle-mask.png` must keep the same size. To use another bottle photo, all three need to be remade. Ask Claude to do it.
The beer level moves between `TOP0` and `TOP1` at the top of `js/bottle.js`.

## Checks before sending

- Search `content/site.js` for `todo` and `summaryToUpdate`: both mark text that still needs your input.
- Open the page on your phone: the bottle shrinks into a narrow rail on small screens.
