import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GiPlantsAndAnimals } from "react-icons/gi";
import { Link } from "react-router-dom";
import { resetPassword, verifyToken } from "../../../services/api";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassord] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const location = useLocation();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    if(!code) {
      setError("Informe o código recebido por e-mail")
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    try {
      await verifyToken({ token: code });
      await resetPassword({ email, token: code, novaSenha: password });
      navigate("/");
    } catch (error) {
      console.error("Erro ao validar token:", error);
      setError("Código inválido.");
    } finally {
      setLoading(false);
    }

    setLoading(true);

  };

  useEffect(() => {
    // Preenche os campos se vierem cadastro
    if (location.state?.email) {
      setEmail(location.state.email);
    }
    if (location.state?.code) {
      setCode(location.state.code);
    }
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-6">
          <GiPlantsAndAnimals size={48} className="text-green-700" />
          <h1 className="text-2xl font-semibold text-gray-800">Izoo</h1>
        </div>

        <div className="bg-white border border-stone-200 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-stone-800 mb-2">
            Esqueceu a senha?
          </h2>
          <p className="text-sm text-stone-500 mb-6">
            Informe seu e-mail para receber o código de recuperação.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                E-mail
              </label>
              <input
                type="email"
                required
                className="w-full px-4 py-2 rounded-md border border-stone-200 bg-stone-50 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-green-300"
                placeholder="Digite seu Email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Código
              </label>
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                className="w-48 px-4 py-2 rounded-md border border-stone-200 bg-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-300 tracking-widest text-center"
                placeholder="••••••"
                aria-label="Senha lógica"
                onChange={(e) => setCode(e.target.value)}
                value={code}
              />
              <p className="mt-1 text-xs text-stone-400">
                Digite o código de 6 dígitos recebido.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Nova Senha
              </label>
              <input
                type="password"
                required
                className="w-full px-4 py-2 rounded-md border border-stone-200 bg-stone-50 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-green-300"
                placeholder="Digite sua Nova Senha"
                autoComplete="email"
                onChange={(e) => setPassord(e.target.value)}
                value={password}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Confirme sua Senha
              </label>
              <input
                type="password"
                required
                className="w-full px-4 py-2 rounded-md border border-stone-200 bg-stone-50 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-green-300"
                placeholder="Digite sua Senha Novamente"
                autoComplete="email"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />
            </div>
            {message && <p className="text-sm text-green-600">{message}</p>}
            {error && <p className="text-sm text-red-600">{error}</p>}

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="w-full py-2 px-4 bg-green-700 hover:bg-green-800 cursor-pointer text-white font-semibold rounded-md shadow-sm"
                disabled={loading}
              >
                {loading
                  ? !code
                    ? "Enviando..."
                    : "Verificando..."
                  : !code
                  ? "Enviar"
                  : "Verificar código"}
              </button>
            </div>

            <div className="text-center mt-3">
              <Link
                to="/login"
                className="text-sm text-green-600 hover:underline"
              >
                Voltar ao login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
