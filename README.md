# MSi demo website

Story site + simulated product demo for MSi (Smart Medical Records).
All patient data in `src/data.ts` is synthetic. No real patient data, PINFL or clinic records.

## Run locally
    npm install
    npm run dev          # http://localhost:5173

## Build
    npm run build        # static site in dist/
    SINGLE=1 npx vite build --outDir dist-single   # one self-contained index.html

## Put it online (Vercel, about 2 minutes)
Option A: `npx vercel` in this folder, accept the defaults (framework: Vite), then `npx vercel --prod`.
Option B: push this folder to GitHub, then on vercel.com choose New Project, import the repo, Deploy.
Option C (no account setup): open https://app.netlify.com/drop and drag the `dist` folder onto the page.
To use msi.ooou.uz, add the domain in the Vercel project's Domains settings and add the CNAME record it shows at your DNS provider.

## Where to edit
- Texts in EN / RU / UZ: `src/i18n.tsx`
- Synthetic documents, facts and lab values: `src/data.ts`
- Story sections: `src/components/Story.tsx`
- Interactive demo: `src/components/Demo.tsx`

## Deploy on the ooou.uz server
The built site is committed in `dist/`, so the server only needs to serve that folder:

    git clone https://github.com/Sarvardev035/MedicalSi /var/www/msi.ooou.uz-src
    # web root = /var/www/msi.ooou.uz-src/dist
    # update later: cd /var/www/msi.ooou.uz-src && git pull
