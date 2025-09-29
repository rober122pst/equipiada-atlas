import { FcGoogle } from "react-icons/fc";

export function GoogleAuthButton() {
    return (
        <div>
            <button 
                className="flex items-center justify-center w-56 gap-1.5 p-2 text-md bg-white shadow-platinum shadow-[0px_10px] text-gray font-medium rounded-md cursor-pointer"               
            >
                <FcGoogle className="text-3xl" />
                Entrar com Google
            </button>
        </div>
    );
}