import InputText from "../components/InputText.jsx";
import CTAButton from "../components/CTAButton.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { registerUser } from "../services/oauthService.js";

function RegisterPage() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] = useState({
        email: "",
        name: "",
        password: "",
        confirmPassword: ""
    })
    const [errors, setErrors] = useState({});

    const checkUsernameRequirements = (username) => {
        const minLength = 3;
        const maxLength = 20;
        const hasInvalidChars = /[^a-z0-9_.]/.test(username);
        const hasSpace = /\s/.test(username);
        return username.length >= minLength && username.length <= maxLength && !hasInvalidChars && !hasSpace;
    }

    const checkEmailFormat = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const checkPasswordRequirements = (password) => {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumber;
    }

    const checkPasswordMatch = (password, confirmPassword) => {
        return password === confirmPassword;
    }

    const validateField = (name, value) => {
        switch (name) {
            case "name":
                if (!checkUsernameRequirements(value)) {
                    return "O nome de usuário deve ter entre 3 e 20 caracteres.";
                }
                break;
            case "email":
                if (!checkEmailFormat(value)) {
                    return "Formato de email inválido.";
                }
                break;
            case "password":
                if (!checkPasswordRequirements(value)) {
                    return "A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas e números.";
                }
                break;
            case "confirmPassword":
                if (!checkPasswordMatch(value, form.password)) {
                    return "As senhas não coincidem.";
                }
                break;
            default:
                return "";
        }
        return "";
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));

        // Validar em tempo real
        setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));

        // Validar confirmação de senha em tempo real
        if (name === "password" || name === "confirmPassword") {
            setErrors((prev) => ({
                ...prev,
                confirmPassword: validateField("confirmPassword", name === "confirmPassword" ? value : form.confirmPassword)
            }));
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = {
            email: formData.get("email"),
            name: formData.get("name"),
            password: formData.get("password"),
        };
        setIsLoading(true);
        await registerUser(data);
        setIsLoading(false);
        // Redirecionar ou mostrar mensagem de sucesso
        navigate("/")
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
                        name="email" 
                        placeholder="seu@email.com" 
                        required={true}
                        value={form.email}
                        onChange={handleChange}
                    />
                    {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email}</p>}
                    <InputText 
                        label="Nome" 
                        name="name" 
                        placeholder="juazinh" 
                        required={true} 
                        value={form.name}
                        onChange={handleChange}
                    />
                    {errors.name && <p className="text-red-500 text-sm mb-2">{errors.name}</p>}
                    <InputText 
                        label="Senha" 
                        name="password" 
                        placeholder="Digite uma senha forte" 
                        type="password" 
                        required={true} 
                        value={form.password}
                        onChange={handleChange}
                    />
                    {errors.password && <p className="text-red-500 text-sm mb-2">{errors.password}</p>}
                    <InputText 
                        label="Confirmar senha" 
                        name="confirmPassword" 
                        placeholder="Digite a senha novamente" 
                        type="password" 
                        required={true} 
                        value={form.confirmPassword}
                        onChange={handleChange}
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-sm mb-2">{errors.confirmPassword}</p>}
                    <div className="flex flex-col gap-1.5 m-auto w-fit mt-10">
                        <CTAButton label={isLoading ? "Criando conta..." : "Criar conta"} type="submit" />
                        <Link className="text-xs hover:underline" to="/auth/login">Já tem uma conta? Fazer login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;