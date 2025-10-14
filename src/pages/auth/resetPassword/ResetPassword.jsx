import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { GiPlantsAndAnimals } from "react-icons/gi";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  const location = useLocation()

    const handleSubmit = async (e) => {
        e.preventDeafault()
    }

    useEffect(() => {
        // Preenche os campos se vierem cadastro
        if (location.state?.loginField) {
          setEmail(location.state.loginField);
        }
        if (location.state?.password) {
          setCode(location.state.password);
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
                onChange={(e) => setEmail(e.target.value)}
                value={email}
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
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
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
