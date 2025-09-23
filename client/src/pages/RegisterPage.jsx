import InputText from "../components/InputText.jsx";
import CTAButton from "../components/CTAButton.jsx";
import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "../services/oauthService.js";

function RegisterPage() {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = {
            email: formData.get("email"),
            name: formData.get("name"),
            password: formData.get("password"),
        };
        console.log(data);
        await registerUser(data);
        // Redirecionar ou mostrar mensagem de sucesso
        navigate("/")
    }
    return (
        <div className="bg-rich-950 min-h-screen text-platinum font-display">
            <div className="flex flex-col items-center justify-center min-h-screen w-[400px] m-auto">
                <div>
                    <h1 className="text-[40px] font-black italic text-raspberry">LOGO</h1>
                </div>
                <form className="w-full" onSubmit={handleSubmit}>
                    <InputText label="Email" name="email" placeholder="seu@email.com" required={true} />
                    <InputText label="Nome" name="name" placeholder="juazinh" required={true} />
                    <InputText label="Senha" name="password" placeholder="Digite uma senha forte" type="password" required={true} />
                    <InputText label="Confirmar senha" name="confirmPassword" placeholder="Digite a senha novamente" type="password" required={true} />
                    <div className="flex flex-col gap-1.5 m-auto w-fit mt-10">
                        <CTAButton label="Criar conta" type="submit" />
                        <Link className="text-xs hover:underline" to="/auth/login">Já tem uma conta? Fazer login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;