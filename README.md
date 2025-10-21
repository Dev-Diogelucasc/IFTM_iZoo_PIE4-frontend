<h1 align="center"> iZoo Frontend</h1>

<p align="center">
  <strong>Interface web desenvolvida em React para o sistema iZoo - Projeto Integrador PIE4 (IFTM)</strong>
</p>

<p align="center">
  <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-18.2.0-61dafb?style=flat&logo=react&logoColor=white"></a>
  <a href="https://vitejs.dev/"><img src="https://img.shields.io/badge/Vite-5.0+-646CFF?style=flat&logo=vite&logoColor=white"></a>
  <a href="https://www.npmjs.com/"><img src="https://img.shields.io/badge/npm-10+-CB3837?style=flat&logo=npm&logoColor=white"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/Licença-MIT-green.svg?style=flat"></a>
</p>

---

## 📖 Sobre o Projeto

O **iZoo Frontend** é a interface web do projeto **PIE4 - Instituto Federal do Triângulo Mineiro (IFTM)**, desenvolvida para facilitar a interação com o sistema **iZoo**, uma plataforma voltada à **gestão, exibição e controle de informações sobre zoológicos**.

O objetivo é oferecer uma experiência fluida e intuitiva, com **design responsivo**, **componentização** e **boas práticas de desenvolvimento frontend moderno**.

---

## Tecnologias Utilizadas

Este projeto foi construído com as seguintes ferramentas e bibliotecas:

| Categoria                           | Tecnologia / Biblioteca                                                                                                                             | Descrição                                          |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| 💻 **Framework principal**          | [React](https://react.dev/)                                                                                                                         | Biblioteca para construção da interface do usuário |
| ⚡ **Ambiente de build**             | [Vite](https://vitejs.dev/)                                                                                                                         | Ferramenta de build rápida e moderna               |
| 🧭 **Roteamento**                   | [React Router DOM](https://reactrouter.com/)                                                                                                        | Gerencia rotas e navegação entre páginas           |
| 🎨 **Estilização**                  | [Tailwind CSS](https://tailwindcss.com/)                                                                                                            | Framework CSS utilitário para design responsivo    |
| 🧱 **Ícones**                       | [React Icons](https://react-icons.github.io/react-icons/)                                                                                           | Coleção de ícones de várias bibliotecas            |
| 📡 **Requisições HTTP**             | [Axios](https://axios-http.com/)                                                                                                                    | Cliente HTTP para consumo de APIs                  |
| 🧭 **Mapas Interativos**            | [Leaflet](https://leafletjs.com/) e [React Leaflet](https://react-leaflet.js.org/)                                                                  | Exibição de mapas e localização                    |
| 🔍 **Leitura de Códigos de Barras** | [React Barcode Scanner](https://www.npmjs.com/package/@thewirv/react-barcode-scanner)                                                               | Leitor de códigos de barras via câmera             |
| 🔲 **QR Code**                      | [React QR Code](https://www.npmjs.com/package/react-qr-code)                                                                                        | Geração de QR Codes dinâmicos                      |
| 🔔 **Notificações**                 | [React Toastify](https://fkhadra.github.io/react-toastify/introduction)                                                                             | Exibição de alertas e mensagens de feedback        |
| 🌐 **CORS**                         | [CORS](https://www.npmjs.com/package/cors)                                                                                                          | Middleware para controle de acessos via API        |
| 🧹 **Lint e Qualidade de Código**   | [ESLint](https://eslint.org/), [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)                                 | Garantem boas práticas e padronização do código    |
| 💡 **Types e Tipagens**             | `@types/react`, `@types/react-dom`                                                                                                                  | Tipagens auxiliares para desenvolvimento           |
| 🧩 **Dev Tools**                    | [Vite Plugin React](https://www.npmjs.com/package/@vitejs/plugin-react), [React Refresh](https://www.npmjs.com/package/eslint-plugin-react-refresh) | Suporte ao hot reload e otimização do build        |

## 🧠 Principais Recursos Técnicos

- Sistema de leitura de **código de barras** para identificação rápida de animais ou itens.
- Geração de **QR Codes dinâmicos** com informações detalhadas.
- Visualização geográfica através de **mapas interativos (Leaflet)**.
- Feedbacks instantâneos com **notificações (React Toastify)**.
- Interface **totalmente responsiva** desenvolvida com Tailwind CSS.
- Integração com **API backend iZoo**.


## 📁 Estrutura de Pastas

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
