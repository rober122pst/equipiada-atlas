import InputText from "../components/InputText.jsx";
import CTAButton from "../components/CTAButton.jsx";
import { Link, replace } from "react-router-dom";
import { GoogleAuthButton } from "../components/GoogleAuthButton.jsx";
import { SteamAuthButton } from "../components/SteamAuthButton.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";

function LoginPage() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "",
        password: ""
    })
    const [errors, setErrors] = useState({});
    const { login, isLoggedIn } = useAuth();

    useEffect(() => {
        if(isLoggedIn) navigate('/', { replace: true });
    }, [isLoggedIn, navigate])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            email: form.email,
            password: form.password,
        };

        try {
            await login(data);
            navigate("/");
        } catch (error) {
            console.error(error)
            setErrors((prev) => ({ ...prev, credentials: error.response.data?.message || 'Erro desconhecido' }));
        }
    };

    return (
        <div className="bg-rich-950 min-h-screen text-platinum font-display">
            <div className="flex flex-col items-center justify-center min-h-screen w-[400px] m-auto">
                <div>
                    <h1 className="text-[40px] font-black italic text-raspberry">LOGO</h1>
                </div>
                <form className="w-full" onSubmit={handleSubmit}>
                    <InputText 
                        label="Email"
                        onChange={handleChange}
                        value={form.email}
                        required={true}
                        name="email"
                    />
                    <InputText 
                        label="Senha" 
                        type="password"
                        onChange={handleChange}
                        value={form.password}
                        required={true}
                        name="password"
                    />
                    {errors.credentials && <p className="text-red-500 text-sm mb-2">{errors.credentials}</p>}
                    <div className="flex flex-col gap-1.5 m-auto w-fit mt-10">
                        <CTAButton 
                            label="Entrar" 
                            type="submit" 
                        />
                        <Link className="text-xs hover:underline" to="/auth/register">Não tem uma conta? Registrar-se</Link>
                    </div>
                </form>
                <div className="flex gap-2 mt-6">
                    <GoogleAuthButton />
                    <SteamAuthButton />
                </div>
            </div>
        </div>
    );
}

export default LoginPage;