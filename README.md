# Manga BR Search Engine

---

An webapp which searches through the most popular manga readers in Brazil to find the most updated one for a specific manga.

Made by [Eduardo Henrique](https://github.com/ed-henrique) (BACKEND) and [Rosialdo Vidinho](https://github.com/Rosialdo) (FRONTEND).

---

## Table of Contents

- [Goals and Limitations](#goals-and-limitations)
- [Problems Encountered](#problems-encountered)
- [Demo](#demo)

---

## Goals and Limitations

✅ means done.

🚧 means doing.

❌ means won't do.

- ✅ Created the crawlers for the following sites:
  - [BRMangas](https://brmangas.net)
  - [MangaHost](https://mangahosted.com) (WIP)
  - [MangaToon](https://mangatoon.mobi) (WIP)
  - [Mangalivre](https://mangalivre.net) (WIP)
- ✅ Use proxies
- ✅ Created DB (MongoDB)
- ✅ Send multiple requests at once
- ✅ Using Puppeteer for JS Rendering
- ✅ Created list of relevant sites to use

&nbsp;

- 🚧 Create backup DB
- 🚧 Update DB on demand
- 🚧 Change crawler structure
- 🚧 Set random timer to requests
- 🚧 Integrate backend and frontend
- 🚧 Creating crawlers for a lot of sites
- 🚧 Create search bar to take user input
- 🚧 Creating frontend for the site using React
- 🚧 Create responsive dropdown menu for series type selection
- 🚧 Creating an RESTful API using Express so the user can read from DB without having access to it

&nbsp;

- ❌ Read manga through site
  - It will only redirect the user to another manga site
- ❌ Update DB daily
  - We are deciding if this is viable right now, but as it is, it will hinder our progress, so we will postpone this feature

---

## Problems Encountered

### Problems

1. Updating DB daily;
2. Updating DB without reconstructing it from scratch;

Possible Solutions:

1. Make the update process faster and less resource-heavy;
2. Only update series that changed values;

### Solved Problems

1. Bypassing Cloudflare;
2. Only updating DB after going through every series in a site;

Solutions:

1. Using Puppeteer Stealth Plugin;
2. Update for every visited page in the site;

---

## Demo

WIP

---
