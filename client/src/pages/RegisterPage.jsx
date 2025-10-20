import InputText from "../components/InputText.jsx";
import CTAButton from "../components/CTAButton.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { GoogleAuthButton } from "../components/GoogleAuthButton.jsx";
import { SteamAuthButton } from "../components/SteamAuthButton.jsx";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useAuth } from "../contexts/AuthContext.jsx";

function RegisterPage() {
    const navigate = useNavigate();
    const { register, isLoggedIn } = useAuth();
    const [form, setForm] = useState({
        email: "",
        name: "",
        password: "",
        confirmPassword: ""
    })
    const [errors, setErrors] = useState({});
    const [isRequesting, setIsRequesting] = useState(false);

    useEffect(() => {
        if(isLoggedIn) navigate('/', { replace: true });
    }, [isLoggedIn, navigate])

    const checkUsernameRequirements = (username) => {
        const minLength = 3;
        const maxLength = 20;
        return username.length >= minLength && username.length <= maxLength;
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

        setErrors({});
        setIsRequesting(true);
        
        const newErrors = {};
        Object.keys(form).forEach((field) => {
            const error = validateField(field, form[field]);
            if (error) newErrors[field] = error;
        });

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return; // Envia sem erros

        const data = {
            email: form.email,
            name: form.name,
            password: form.password,
        };

        try {
            await register(data)
            navigate("/");
        } catch (error) {
            setErrors((prev) => ({ ...prev, email: error.response.data.message }));
        } finally {
            setIsRequesting(false);
        }
    };

    return (
        <div className="bg-rich-950 text-platinum font-display">
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-90px-114px)] w-[400px] m-auto">
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
                        <CTAButton 
                            label={isRequesting ? <AiOutlineLoading3Quarters className="animate-spin" /> : "Criar conta" }
                            type="submit"
                            disabled={
                                Object.values(errors).some((err) => err) ||
                                Object.values(form).some((val) => !val) ||
                                isRequesting
                            }
                        />
                        <Link className="text-xs hover:underline" to="/login">Já tem uma conta? Fazer login</Link>
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

export default RegisterPage;
