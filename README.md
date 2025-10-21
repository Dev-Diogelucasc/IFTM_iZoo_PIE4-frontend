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

## 🚀 Tecnologias Utilizadas

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

```
IFTM_iZoo_PIE4-frontend/
├── public/                     # Arquivos públicos (imagens, favicon, etc)
├── src/
│   ├── assets/                 # Recursos visuais e ícones (ex: green-house.png)
│   ├── components/             # Componentes reutilizáveis da interface
│   │   ├── footer/             # Rodapé da aplicação
│   │   │   └── Footer.jsx
│   │   ├── navBar/             # Barra de navegação
│   │   │   └── NavBar.jsx
│   │   ├── sideBar/            # Menu lateral
│   │   │   └── SideBar.jsx
│   │   ├── scannerQr/          # Leitor de QR Code
│   │   │   └── ScannerQr.jsx
│   │   └── ProtectedRoute/     # Proteção de rotas privadas
│   │       └── ProtectedRoute.jsx
│   │
│   ├── context/                # Contextos globais da aplicação
│   │   └── AuthContext.jsx
│   │
│   ├── pages/                  # Páginas principais do sistema
│   │   ├── address/            # Cadastro e atualização de endereços
│   │   │   ├── Address.jsx
│   │   │   ├── RegisterAddress.jsx
│   │   │   └── UpdateAddress.jsx
│   │   ├── auth/               # Autenticação de usuários
│   │   │   ├── login/          # Tela de login
│   │   │   │   └── Login.jsx
│   │   │   ├── register/       # Tela de cadastro de usuário
│   │   │   │   └── Register.jsx
│   │   │   ├── recoverpassword/# Recuperação de senha
│   │   │   │   └── RecoverPassword.jsx
│   │   │   └── resetPassword/  # Redefinição de senha
│   │   │       └── ResetPassword.jsx
│   │   ├── dashboard/          # Painel principal
│   │   │   └── Dashboard.jsx
│   │   ├── home/               # Página inicial
│   │   │   ├── Home.jsx
│   │   │   └── FeatureCard.jsx
│   │   ├── inspections/        # Módulo de inspeções
│   │   │   ├── CheckInspection.jsx
│   │   │   └── CreateInspection.jsx
│   │   ├── mapping/            # Módulo de mapeamento
│   │   │   └── Mapping.jsx
│   │   ├── presentation/       # Página de apresentação institucional
│   │   │   └── Presentation.jsx
│   │   ├── reports/            # Relatórios do sistema
│   │   │   └── Reports.jsx
│   │   └── users/              # Gestão de usuários
│   │       ├── Users.jsx
│   │       └── UpdateUsers.jsx
│   │
│   ├── services/               # Comunicação com a API backend
│   │   └── api.js
│   │
│   ├── utils/                  # Funções utilitárias (helpers)
│   ├── App.jsx                 # Componente raiz
│   ├── App.css                 # Estilos globais
│   ├── main.jsx                # Ponto de entrada principal
│   └── index.css               # Configuração base de estilos
│
├── vite.config.js              # Configuração do Vite
├── eslint.config.js            # Regras de lint
├── package.json                # Dependências e scripts do projeto
├── README.md                   # Documentação principal
└── vercel.json                 # Configuração de deploy (Vercel)

