# BojoFlix

A professional movie & TV series discovery platform. Browse top-rated content across **American**, **Indian**, and **International** cinema — categorized by **In Theatre** and **OTT** streaming availability. No login required.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8)

## Features

- **Regional Categories** — American, Indian, and International content
- **Viewing Types** — In Theatre (now playing) and OTT (streaming platforms)
- **Audience Ratings** — Sorted by highest audience scores from TMDB
- **Movies & TV Series** — Toggle between films and series on every browse page
- **Detail Pages** — Full info with ratings, synopsis, genres, and where to watch
- **Legal Streaming Links** — Netflix, Prime Video, Disney+, and more via TMDB watch providers
- **External Ratings** — Direct links to IMDb and Rotten Tomatoes
- **Search** — Find any movie or series instantly
- **No Account Required** — Browse freely without sign-up

## Getting Started

### 1. Get a free TMDB API key

1. Create an account at [themoviedb.org](https://www.themoviedb.org/signup)
2. Go to **Settings → API** and request an API key (free, instant for personal use)
3. Copy your **API Key (v3 auth)**

### 2. Configure environment

```bash
cp .env.example .env.local
```

Edit `.env.local` and paste your API key:

```
NEXT_PUBLIC_TMDB_API_KEY=your_actual_api_key_here
```

### 3. Development mode

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build static site (generates `index.html`)

```bash
npm run build
```

This creates:
- **`out/index.html`** — full static site (all pages)
- **`index.html`** — copy at project root for easy access

### 5. Open the static site

You must serve the files over HTTP (browsers block API calls from `file://`):

```bash
npm run serve
```

Then open [http://localhost:3000](http://localhost:3000) (or the port shown by `serve`).

> **Note:** Do not double-click `index.html` to open it directly — use `npm run serve` so movie data loads correctly.

## Project Structure

```
src/
├── app/
│   ├── page.tsx                          # Homepage (→ index.html)
│   ├── browse/[category]/[viewingType]/  # Category listings
│   ├── movie/                            # Movie detail (?id=123)
│   ├── tv/                               # TV series detail (?id=123)
│   └── search/                           # Search page
├── components/                           # UI components
├── lib/tmdb.ts                           # TMDB API client
└── types/                                # TypeScript types

out/                                      # Static build output (after npm run build)
index.html                                # Copy of homepage (after npm run build)
```

## Browse URLs

| Category      | In Theatre                        | OTT                              |
|---------------|-----------------------------------|----------------------------------|
| American      | `/browse/american/theatre`        | `/browse/american/ott`           |
| Indian        | `/browse/indian/theatre`          | `/browse/indian/ott`             |
| International | `/browse/international/theatre`   | `/browse/international/ott`      |

Add `?type=tv` for TV series, e.g. `/browse/indian/ott?type=tv`

## Tech Stack

- **Next.js 15** — App Router, Server Components, ISR
- **TypeScript** — Full type safety
- **Tailwind CSS** — Custom dark theme with brand colors
- **TMDB API** — Movie/TV data, ratings, and watch providers
- **Lucide React** — Icons

## Data Sources

Ratings and metadata are sourced from [The Movie Database (TMDB)](https://www.themoviedb.org/), which aggregates audience ratings similar to IMDb. Detail pages link out to IMDb and Rotten Tomatoes for additional critic/audience scores. Streaming availability comes from TMDB's official watch provider data.

## License

MIT
