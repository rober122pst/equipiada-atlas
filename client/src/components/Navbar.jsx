import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { FaChevronDown } from "react-icons/fa6";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import CTAButton from "./CTAButton";

function UserProfile({ user }) {
    return (
        <Link to={`u/${user.id}`}>
            <div className="group flex items-center gap-2">
                <img className="h-[45px] w-[45px] border-2 border-raspberry rounded-full" src={user.profile.profPicURL ? user.profile.profPicURL : 'https://placehold.co/45x45/14171F/E0055D.webp?text=LoGG'} alt="Profile-pic" />
                <span className="text-[20px] group-hover:underline">{user.name}</span>
            </div>
        </Link>
    )
}

function MenuNavbar({ user }) {
    return (
        <ul className="flex flex-col gap-4 w-full mx-5">
            <Link to={`u/${user.id}`}><li className="border-transparent border-b-1 hover:border-b-raspberry/70">Perfil</li> </Link>   
            <Link to={`u/${user.id}/configs`}><li className="border-transparent border-b-1 hover:border-b-raspberry/70">Configurações</li></Link>           
            <Link to={`u/${user.id}/games`}><li className="border-transparent border-b-1 hover:border-b-raspberry/70">Biblioteca</li></Link>           
            <a href={`${import.meta.env.VITE_API_KEY}/auth/logout`}><li className="border-transparent border-b-1 hover:border-b-raspberry/70 hover:text-raspberry">Sair</li></a>           
        </ul>
    );
}

function Navbar() {
    const { isLoggedIn, user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef()

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        
        document.addEventListener("mousedown", handleClickOutside);
        
        return () => {
            document.addEventListener("mousedown", handleClickOutside)
        }
    }, []);

    
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    return (
        <header className="sticky top-0 left-0 px-8 h-[90px] w-full flex items-center justify-between bg-rich-950 transition-all duration-300 ease-in-out z-50">
            <div>
                <Link to="/"><h1 className="text-[40px] font-black italic text-raspberry cursor-pointer">LOGO</h1></Link>
            </div>
            <div className="flex items-center gap-5" ref={menuRef}>
                {user && isLoggedIn ?
                <> 
                    <UserProfile user={user} />
                    <button onClick={toggleMenu} className={(isOpen && "rotate-180 ") + "focus:outline-none p-2 cursor-pointer transition-all duration-300 ease-in-out"}>
                        <FaChevronDown />
                    </button>
                    <nav className={`${isOpen ? 'h-48' : 'h-0'} w-64 flex items-center justify-center bg-rich-900 rounded-b-2xl overflow-hidden fixed top-[90px] right-0 duration-300 ease-out`}>
                        <MenuNavbar user={user} />
                    </nav>
                </> :
                <>
                    <Link to='/login'><button className="cursor-pointer">Entrar</button></Link>
                    <Link to='/register'><CTAButton label="Começar agora" /></Link>
                </>
                }
            </div>
        </header>
    );
}

export default Navbar;