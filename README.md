# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

```
IFTM_iZoo_PIE4-frontend
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ public
│  ├─ green-house.png
│  ├─ orange-house.png
│  ├─ red-house.png
│  └─ vite.svg
├─ README.md
├─ src
│  ├─ App.css
│  ├─ App.jsx
│  ├─ assets
│  │  └─ react.svg
│  ├─ components
│  │  ├─ footer
│  │  │  └─ Footer.jsx
│  │  ├─ navBar
│  │  │  └─ NavBar.jsx
│  │  ├─ ProtectedRoute
│  │  │  └─ ProtectedRoute.jsx
│  │  ├─ scannerQr
│  │  │  └─ ScannerQr.jsx
│  │  └─ sideBar
│  │     └─ SideBar.jsx
│  ├─ contexts
│  │  └─ AuthContext.jsx
│  ├─ index.css
│  ├─ main.jsx
│  ├─ pages
│  │  ├─ address
│  │  │  ├─ Address.jsx
│  │  │  ├─ registerAddress
│  │  │  │  └─ RegisterAddress.jsx
│  │  │  └─ updateAddress
│  │  │     └─ UpdateAddress.jsx
│  │  ├─ auth
│  │  │  ├─ login
│  │  │  │  └─ Login.jsx
│  │  │  ├─ recoverpassword
│  │  │  │  └─ RecoverPassword.jsx
│  │  │  ├─ register
│  │  │  │  └─ Register.jsx
│  │  │  └─ resetPassword
│  │  │     └─ ResetPassword.jsx
│  │  ├─ dashboard
│  │  │  └─ Dashboard.jsx
│  │  ├─ home
│  │  │  ├─ FeatureCard
│  │  │  │  └─ FeatureCard.jsx
│  │  │  └─ Home.jsx
│  │  ├─ inspections
│  │  │  ├─ CheckInspection.jsx
│  │  │  ├─ Consult.jsx
│  │  │  └─ CreateInspection.jsx
│  │  ├─ mapping
│  │  │  └─ Mapping.jsx
│  │  ├─ presentation
│  │  │  └─ Presentation.jsx
│  │  ├─ reports
│  │  │  └─ Reports.jsx
│  │  └─ users
│  │     ├─ updateUsers
│  │     │  └─ UpdateUsers.jsx
│  │     └─ Users.jsx
│  ├─ services
│  │  └─ api.js
│  └─ utils
├─ vercel.json
└─ vite.config.js

```