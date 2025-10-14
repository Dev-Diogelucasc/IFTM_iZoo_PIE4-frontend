import "./App.css";

// Router
import { Routes, Route } from "react-router-dom";

// Context
import { AuthProvider } from "./contexts/AuthContext";

// Components
import NavBar from "./components/navBar/NavBar";
import Footer from "./components/footer/Footer";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

// Pages
import Register from "./pages/auth/register/Register";
import Login from "./pages/auth/login/Login";
import CheckInspection from "./pages/inspections/CheckInspection";
import CreateInspection from "./pages/inspections/CreateInspection";
import Consult from "./pages/inspections/Consult";
import Reports from "./pages/reports/Reports";
import Mapping from "./pages/mapping/Mapping";
import Users from "./pages/users/Users";
import Home from "./pages/home/Home";
import Dashboard from "./pages/dashboard/Dashboard";
import Address from "./pages/address/Address";
import RecoverPassword from "./pages/auth/recoverpassword/RecoverPassword";

function App() {
  return (
    <AuthProvider>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastro" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/inspecoes/endereco"
            element={
              <ProtectedRoute>
                <CheckInspection />
              </ProtectedRoute>
            }
          />
          <Route
            path="/inspecoes/registar"
            element={
              <ProtectedRoute>
                <CreateInspection />
              </ProtectedRoute>
            }
          />
          <Route
            path="/inspecoes/consultar"
            element={
              <ProtectedRoute>
                <Consult />
              </ProtectedRoute>
            }
          />
          <Route
            path="/relatorios"
            element={
              <ProtectedRoute>
                <Reports />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mapeamento"
            element={
              <ProtectedRoute>
                <Mapping />
              </ProtectedRoute>
            }
          />
          <Route
            path="/endereco"
            element={
              <ProtectedRoute>
                <Address />
              </ProtectedRoute>
            }
          />
          <Route path="/esqueceu_senha" element={<RecoverPassword />} />
          <Route
            path="/usuarios"
            element={
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
