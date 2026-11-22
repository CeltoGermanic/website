# Between Continents

A static personal archive with 20 pages in each of two languages. Open **index.html** to read it locally. No backend, package installation, external asset requests or build step is required to read the saved site.

To serve the site over HTTP, run this from the archive directory and open the address printed by Python.

```text
python -m http.server 8000 --bind 127.0.0.1
```

## Publish with GitHub Pages

Place the contents of this directory at the root of a GitHub repository. In the repository’s **Settings → Pages**, select **Deploy from a branch**, then choose your branch and **/(root)**. Keep the directory structure and the .nojekyll file. All internal links are relative and work under a repository subpath.

## Maintain the archive

- **tools/heritage.cjs** and **tools/reading.cjs** hold editorial content.
- **tools/exhibits.cjs** holds map, family, image and study data. The Natural Earth JSON files supply land outlines.
- **tools/build.cjs** holds the page templates and regenerates the HTML, search index and locator graphics. Use Node.js and run `node tools/build.cjs` after editing these files. Commit the generated files with their sources.
- **assets/css** and **assets/js** hold the shared styles and browser-side behavior. The site runs from disk with JavaScript enabled.
- **sources.html** records image credits. Individual pages have their own reading lists. Font license files are in **assets/fonts**.
- **AGENTS.md** records permanent editorial and development requirements.


## Languages

The home page asks visitors to choose English or Brazilian Portuguese. A header link switches to the same page and section in the other language, and the browser remembers the choice for the main entry page. Each language has its own static HTML pages. Portuguese filenames end in .pt.html, with localized metadata, a search index and exhibit labels.

Edit the Portuguese articles in tools/pt-heritage.cjs and tools/pt-reading.cjs. Shared phrases and exhibit data are in tools/pt-ui.cjs and tools/pt-exhibits.cjs. Keep each article's sections in the same order in both languages and rebuild after changing either edition.


## Family privacy

The genealogy shares Weber and broad heritage branches. The atlas and timeline use regional and public historical information. Keep personal family records and genetic results out of this folder and distributed ZIPs.
