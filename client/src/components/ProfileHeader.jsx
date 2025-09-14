function Profile() {
    return (
        <div className="flex items-end w-full h-[400px] relative">
            <div id="profile-banner" className="
                w-full 
                h-[326px] 
                rounded-3xl 
                overflow-hidden 
                absolute left-0 
                top-0
                after:content-['']
                after:absolute
                after:inset-0
                after:bg-gradient-to-t
                after:from-night-950/90
                after:via-night-950/70
                after:to-night-950/50
            ">
                <img className="object-cover w-full h-full" src="/banner.jpg" alt="banner" />
            </div>
            <div className="flex justify-between items-end w-full z-10 px-12">
                <div id="profile-info" className="flex gap-4">
                    <div id="profile-pic" className="h-[155px] w-[155px] border-3 rounded-3xl overflow-hidden border-raspberry">
                        <img className="object-cover w-full h-full" src="/profile-pic-test.jpg" alt="Profile-pic" />
                    </div>
                    <div className="flex flex-col justify-around">
                        <h1 className="font-semibold text-6xl">Username</h1>
                        <div className="flex gap-4">
                            <div>
                                <p className="font-bold text-gray">Seguidores</p>
                                <p className="text-raspberry font-semibold text-[20px]">121</p>
                            </div>
                            <div>
                                <p className="font-bold text-gray">Amigos</p>
                                <p className="text-raspberry font-semibold text-[20px]">24</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <button className="px-6 py-2 rounded-lg bg-raspberry text-[20px] hover:bg-raspberry/80 transition">Seguir</button>
                    <button className="px-6 py-2 rounded-lg bg-night-900 text-[20px] whitespace-nowrap hover:bg-night-900/70 transition">Adicionar amigo</button>
                </div>
            </div>
        </div>
    );
}

export default Profile;