# Manga BR Search Engine

---

An webapp which searches through the most popular manga, anime, novel and webtoon readers in PT-BR/EN-US to find the most updated one for a specific series.

Made by [Eduardo Henrique](https://github.com/ed-henrique) (BACKEND) and [Rosialdo Vidinho](https://github.com/Rosialdo) (FRONTEND).
Node.js support by [Guilherme Bernardo](https://github.com/GuilhermeBn198);

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

&nbsp;

### [Project Related]

- 🚧 Adopt micro commits strategy
  - Commit for atomic changes so that errors and bugs can be resolved faster
- 🚧 Integrate backend and frontend
- 🚧 Creating an RESTful API using Express so the user can read from DB without having access to it

&nbsp;

### [Proxy Related]

- ✅ Use proxies
- ✅ Creating a proxy pool with auto renew to avoid Cloudflare blocking

&nbsp;

### [Crawler Related]

- 🚧 Create crawlers for the following sites:
  - ✅ [BRMangas](https://brmangas.net)
  - ✅ [Manganato](https://manganato.com/)
  - ✅ [Anime-Planet](https://www.anime-planet.com)
  - 🚧 [MangaHost](https://mangahosted.com) (WIP)
  - 🚧 [MangaToon](https://mangatoon.mobi) (WIP)
  - 🚧 [Mangalivre](https://mangalivre.net) (WIP)
- ✅ Send multiple requests at once
- ✅ Using Puppeteer for JS Rendering
- ✅ Created list of relevant sites to use
- 🚧 Change crawler structure
  - As it is, there is a lot of repeated code
- 🚧 Set random timer to requests
- 🚧 Creating crawlers for a lot of sites

&nbsp;

### [DB Related]

- ✅ Created DB (MongoDB)
- 🚧 Create backup DB
- 🚧 Update DB on demand

&nbsp;

### [Frontend Related]

- 🚧 Create search bar to take user input
- 🚧 Creating frontend for the site using React
- 🚧 Create responsive dropdown menu for series type selection

&nbsp;

### [Limitations]

- ❌ Read manga through site
  - It will only redirect the user to another manga site
- ❌ Update DB daily
  - We are deciding if this is viable right now, but as it is, it will hinder our progress, so we will postpone this feature
  - Maybe this will be possible since we discovered a way to request multiple pages at once

---

## Problems Encountered

### Problems

1. Updating DB daily;
2. Updating DB without reconstructing it from scratch;
3. Bypassing Cloudflare;
4. Find an alternative to setTimeOut() for randomly generated time delays to make requests;

Possible Solutions:

1. Make the update process faster and less resource-heavy;
2. Only update series that changed values;
3. Set cookies in Puppeteer to fool Cloudflare;
4. No idea for now;

### Solved Problems

1. Only updating DB after going through every series in a site;
2. Create proxy pool with auto renew;

Solutions:

1. Update for every visited page in the site;
2. Use Webshare builtin proxy renewing tool;

---

## Demo

WIP

---
