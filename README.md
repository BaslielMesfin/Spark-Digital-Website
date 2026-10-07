# Spark Digital Website

A complete single-page design prototype with a purple/lime palette, bold typography, and GSAP animation. Sections cover services, selected work, project options, the studio approach, and a project brief form.

## Run locally

```powershell
npm ci
npm run dev -- --port 5173
```

Open http://127.0.0.1:5173/. Build with `npm run build`; preview the build with `npm run preview`.

## Interactions

- One tiny, upright, symmetrical eight-point SVG spark follows the pointer with GSAP smoothing and pulses on clicks. It never blocks controls. The footer toggle remembers the visitor's preference.
- GSAP animates hero text, section entrances, project cards, floating tiles, and the approach carousel.
- Service and project previews open in accessible dialogs. Project option buttons select the corresponding service in the form.
- The validated form downloads a project brief. It does not send email or submit details to a server.
- Responsive mobile navigation, reduced-motion support, and no WebGL renderer in the page.

The selected project visuals come from the existing Timeless Marketing, NRE Employment, and Sisterhood workspace assets. Project pricing uses custom quotes. Contact delivery remains unconnected in this prototype.

## Branding

The supplied Spark Digital logo is stored with a transparent background and rendered in white in the header and footer. The cursor and favicon use a separate vector star inspired by the eight-point symbol inside the logo. Cursor easing and spring inertia remain unchanged.

## Source

- `index.html`: page content
- `src/style.css`: responsive design
- `src/main.js`: GSAP and page interactions
- `public/images/`: project imagery and vector cursor spark

Local browser checks cover cursor tracking, all six detail dialogs, form downloads, approach navigation, and responsive layouts at 320, 390, 768, and 1440 pixels. Local screenshots and machine-specific verification tooling are excluded from Git.
