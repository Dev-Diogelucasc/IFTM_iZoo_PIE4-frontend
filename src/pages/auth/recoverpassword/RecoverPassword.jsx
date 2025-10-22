import { useState } from "react";
import { GiPlantsAndAnimals } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import { requestPassword } from "../../../services/api";
import { ToastContainer, toast } from "react-toastify";

const RecoverPassword = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const notify = () => toast(`Código enviado para e-mail: ${email}`);
  const notifyResend = () => toast(`Código reenviado para e-mail: ${email}`);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      await requestPassword({ email });
      setMessage("Token enviado para o seu e-mail.");
    } catch (error) {
      console.error("Erro ao solicitar token:", error);
      setError("Erro ao solicitar token.");
    } finally {
      setLoading(false);
    }

    setLoading(true);
    try {
      // await verifyToken({ token: code });
      navigate("/reset-password", { state: { email } });
    } catch (error) {
      console.error("Erro ao validar token:", error);
      setError("Código inválido.");
    } finally {
      setLoading(false);
    }
  };

  // const handleResend = async () => {
  //   setError("");
  //   setMessage("");
  //   setLoading(true);
  //   try {
  //     await requestPassword({ email });
  //     setMessage("Token reenviado. Verifique seu e-mail.");
  //   } catch (err) {
  //     console.error("Erro ao reenviar token:", err);
  //     setError("Falha ao reenviar token.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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
                className="w-full px-4 py-2 rounded-md border border-stone-200 bg-stone-50 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-green-400"
                placeholder="Digite seu Email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                disabled={loading}
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
                className="w-48 px-4 py-2 rounded-md border border-stone-200 bg-white placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-amber-300 tracking-widest text-center"
                placeholder="••••••"
                aria-label="Senha lógica"
                onChange={(e) => setCode(e.target.value)}
                value={code}
                disabled={loading}
              />
              <p className="mt-1 text-xs text-stone-400">
                Deixe vazio e clique em Enviar para receber o código. Informe o
                código e clique em Verificar código.
              </p>
            </div>

            {message && <p className="text-sm text-green-600">{message}</p>}
            {error && <p className="text-sm text-red-600">{error}</p>}

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="w-full py-2 px-4 bg-green-700 hover:bg-green-800 cursor-pointer text-white font-semibold rounded-md shadow-sm"
                disabled={loading}
                onClick={() => notify()}
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

            <div className="flex justify-between mt-2">
              {/* <button
                type="button"
                onClick={() => {
                  handleResend()
                  notifyResend()
                }}
                disabled={loading}
                className="text-sm text-stone-600 hover:underline"
              >
                Reenviar código
              </button> */}
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
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default RecoverPassword;
