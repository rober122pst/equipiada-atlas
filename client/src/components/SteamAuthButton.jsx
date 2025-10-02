import { FaSteam } from "react-icons/fa";

export function SteamAuthButton() {
    return (
        <a href={`${import.meta.env.VITE_API_KEY}/auth/steam`}>
            <button 
                className="flex items-center justify-center w-56 gap-1.5 p-2 text-md bg-[#192433] shadow-[#171D25] shadow-[0px_10px] text-platinum font-medium rounded-md cursor-pointer"               
            >
                <FaSteam className="text-3xl" />
                Entrar com Steam
            </button>
        </a>
    );
}