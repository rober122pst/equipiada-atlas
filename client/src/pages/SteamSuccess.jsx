import { useEffect, useState } from "react";
import axios from "axios";

const SteamSuccess = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // permite enviar cookies HttpOnly
        const res = await axios.get("http://localhost:1987/auth/me", {
          withCredentials: true
        });
        setUser(res.data.user);
      } catch (err) {
        console.error("Erro ao buscar usuário:", err);
        setError("Não foi possível carregar os dados do usuário.");
      }
    };

    fetchUser();
  }, []);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!user) return <p>Carregando...</p>;

  return (
    <div className="m-auto text-center mt-10">
      <h1>Olá, {user.name}!</h1>
      <p>Login Steam realizado com sucesso.</p>
    </div>
  );
};

export default SteamSuccess;
