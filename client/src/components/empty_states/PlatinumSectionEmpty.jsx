import { FaPlus } from "react-icons/fa";
import { useParams } from 'react-router-dom'
import { useAuth } from "../../contexts/AuthContext";
import CTAButton from "../CTAButton";

export function PlatinumSectionEmpty() {
    const { userId } = useParams();
    const { user, isLoggedIn } = useAuth();

    return (
        isLoggedIn && user?.id === userId ? (
        <>
            <span className="text-gray">
                Adicione sua primeira platina!      
            </span>
            <button className='flex items-center relative w-1/2 h-[177px] rounded-lg mt-3 bg-rich-900 cursor-pointer hover:opacity-75 duration-300 ease-in-out'>
                <FaPlus className='text-rich-950/70 align-middle text-center w-full text-6xl' />
            </button>
        </>
        ) : (
            <div className="flex justify-center items-center flex-col w-full text-center align-middle">
                <span className="font-medium text-gray">Este usuário não registrou nenhuma platina ainda 😓</span>
                <p className="text-sm my-1.5">Siga-o para não perder as novidades!</p>
                <CTAButton label="Seguir" />
            </div>
        )
    );
}