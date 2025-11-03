import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button, Card, CardBody, CardHeader } from "@heroui/react";
import { Mail, Lock } from "lucide-react";
import { useAuth } from "../../config/context/AuthContext"; // 1. Importar o hook

export const Auth: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth(); // 2. Pegar a função de login e o estado de loading

  // 3. Corrigir o estado inicial
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Email e senha são obrigatórios.");
      return;
    }

    try {
      await login(email, password); // 6. Chamar a função do contexto
      navigate("/dashboard"); // Sucesso, navega para o dashboard
    } catch (err: any) {
      // 7. Lidar com erros vindos do contexto/api
      setError(err.message || "Erro ao fazer login.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#071021] relative overflow-hidden">
      <div className="absolute w-[600px] h-[600px] bg-blue-700/20 rounded-full blur-[180px] -z-10"></div>

      <Card className="w-full max-w-md bg-[#0b162f]/80 border border-white/10 shadow-lg">
        <CardHeader className="flex flex-col items-center text-center">
          <h1 className="text-2xl font-semibold text-white">Admin Login</h1>
          <p className="text-sm text-gray-400">
            Entre com suas credenciais para acessar o dashboard
          </p>
        </CardHeader>

        {/* 11. Formulário (boa prática) */}
        <CardBody as="form" onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm text-gray-300">Email</label>
            <Input
              startContent={<Mail size={18} className="text-gray-400" />}
              type="email"
              placeholder="admin@example.com"
              className="bg-[#0f1c3a] text-white border border-white/10"
              value={email} // 8. Conectar estado
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-300">Senha</label>
            <Input
              startContent={<Lock size={18} className="text-gray-400" />}
              type="password"
              placeholder="••••••••"
              className="bg-[#0f1c3a] text-white border border-white/10"
              value={password} // 9. Conectar estado
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* 12. Mostrar mensagem de erro */}
          {error && <p className="text-sm text-center text-red-400">{error}</p>}

          <Button
            type="submit" // 13. Definir tipo como submit
            className="w-full bg-[#3b82f6] hover:bg-blue-600 text-white font-medium"
            disabled={isLoading} // 10. Desabilitar botão durante o loading
          >
            {isLoading ? "Entrando..." : "Entrar"}
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};
