function Navbar() {
    function UserProfile() {
        return (
            <div className="flex items-center gap-2">
                <img className="h-[45px] w-[45px] border-2 border-raspberry rounded-full" src="/profile-pic-test.jpg" alt="Profile-pic" />
                <span className="text-[20px]">Username</span>
            </div>
        )
    }

    return (
        <nav className="px-8 h-[90px] flex items-center justify-between bg-rich-950">
            <div>
                <h1 className="text-[40px] font-black italic text-raspberry">LOGO</h1>
            </div>
            <UserProfile />
        </nav>
    );
}

export default Navbar;