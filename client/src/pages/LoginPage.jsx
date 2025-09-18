import InputText from "../components/InputText.jsx";
import CTAButton from "../components/CTAButton.jsx";
import { Link } from "react-router-dom";

function LoginPage() {
    return (
        <div className="bg-rich-950 min-h-screen text-platinum font-display">
            <div className="flex flex-col items-center justify-center min-h-screen w-[400px] m-auto">
                <div>
                    <h1 className="text-[40px] font-black italic text-raspberry">LOGO</h1>
                </div>
                <form className="w-full">
                    <InputText label="Email" placeholder="seu@email.com" />
                    <InputText label="Senha" placeholder="Digite uma senha forte" type="password" />
                    <div className="flex flex-col gap-1.5 m-auto w-fit mt-10">
                        <CTAButton label="Entrar" type="submit" />
                        <Link className="text-xs hover:underline" to="/auth/register">Não tem uma conta? Registrar-se</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;