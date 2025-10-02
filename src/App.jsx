import "./App.css";

// Router
import { Routes, Route } from "react-router-dom";

// Components
import NavBar from "./components/navBar/NavBar";

// Pages
import Register from "./pages/auth/register/Register";
import Login from "./pages/auth/login/Login";
import RecordInspection from "./pages/inspections/RecordInspection";
import Consult from "./pages/inspections/Consult";
import Reports from "./pages/reports/Reports";
import Mapping from "./pages/mapping/Mapping";
import Users from "./pages/users/Users";
import Home from "./pages/home/Home";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/inspecoes/registar" element={<RecordInspection />} />
        <Route path="/inspecoes/consultar" element={<Consult />} />
        <Route path="/relatorios" element={<Reports />} />
        <Route path="/mapeamento" element={<Mapping />} />
        <Route path="/usuarios" element={<Users />} />
      </Routes>
    </div>
  );
}

export default App;
