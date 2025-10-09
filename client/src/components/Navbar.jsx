import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { FaChevronDown } from "react-icons/fa6";

function Navbar() {
    const { isLoggedIn, user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    function UserProfile() {
        return (
            <div className="flex items-center gap-2">
                <img className="h-[45px] w-[45px] border-2 border-raspberry rounded-full" src={user.profile.profPicURL} alt="Profile-pic" />
                <span className="text-[20px]">{user.name}</span>
            </div>
        )
    }

    function MenuNavbar() {
        return (
            <ul className="flex flex-col gap-5 pt-5 sm:flex-row sm:gap-0 sm:items-center sm:pt-0">
                <li>OI</li>       
                <li>OI</li>       
                <li>OI</li>       
                <li>OI</li>       
            </ul>
        );
    }

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    return (
        <header className="px-8 h-[90px] flex items-center justify-between bg-rich-950 transition-all duration-300 ease-in-out">
            <div>
                <h1 className="text-[40px] font-black italic text-raspberry">LOGO</h1>
            </div>
            <div className="flex items-center gap-3">
                {user && isLoggedIn ? <UserProfile /> : "Sair"}
                <button onClick={toggleMenu} className="focus:outline-none p-2 cursor-pointer">
                    <FaChevronDown />
                </button>
                <nav className={`${isOpen ? 'scale-y-0' : 'scale-y-100'} h-48 w-64 bg-rich-900 rounded-b-2xl overflow-hidden fixed top-[90px] right-0 duration-500 ease-out`}>
                    <MenuNavbar />
                </nav>
            </div>
        </header>
    );
}

export default Navbar;