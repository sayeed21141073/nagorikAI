# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## GitHub Pages Deployment

This project is configured for a GitHub Pages user site at `https://sayeed21141073.github.io`.

### First-time setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Build and publish:

   ```bash
   npm run deploy
   ```

### Automatic deployment

- GitHub Actions now deploys the site on every push to `main`.
- In GitHub, go to **Settings > Pages** and set **Source** to **GitHub Actions**.

### Firebase checklist

- Enable **Email/Password** and **Google** sign-in in Firebase Authentication.
- Add `sayeed21141073.github.io` to **Authentication > Settings > Authorized domains**.
- Keep `localhost`, `prizex-9a626.firebaseapp.com`, and `prizex-9a626.web.app` authorized for local development.
