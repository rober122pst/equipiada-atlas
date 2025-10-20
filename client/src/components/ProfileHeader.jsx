function Profile({ name, uProf }) {
    function countFriends() {
        return uProf.friends.length || 0;
    }

    function countFollowers() {
        return uProf.followers?.length || 0;
    }

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
                after:from-rich-950/90
                after:via-rich-950/70
                after:to-rich-950/50
            ">
                <img className="object-cover w-full h-full" src={uProf.bannerURL ? uProf.bannerURL : 'https://placehold.co/1920x1080/14171F/E0055D.webp?text=LoGG'} alt="banner" />
            </div>
            <div className="flex justify-between items-end w-full z-10 px-12">
                <div id="profile-info" className="flex gap-4">
                    <div id="profile-pic" className="h-[155px] w-[155px] border-3 rounded-3xl overflow-hidden border-raspberry">
                        <img className="object-cover w-full h-full" src={uProf.profPicURL ? uProf.profPicURL : 'https://placehold.co/155x155/14171F/E0055D.webp?text=LoGG'} alt="Profile-pic" />
                    </div>
                    <div className="flex flex-col justify-around">
                        <h1 className="font-semibold text-6xl">{name}</h1>
                        <div className="flex gap-4">
                            <div>
                                <p className="font-bold text-gray">Seguidores</p>
                                <p className="text-raspberry font-semibold text-[20px]">{countFollowers()}</p>
                            </div>
                            <div>
                                <p className="font-bold text-gray">Amigos</p>
                                <p className="text-raspberry font-semibold text-[20px]">{countFriends()}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <button className="px-6 py-2 rounded-lg bg-raspberry text-[20px] hover:bg-raspberry/80 transition">Seguir</button>
                    <button className="px-6 py-2 rounded-lg bg-rich-900 text-[20px] whitespace-nowrap hover:bg-rich-900/70 transition">Adicionar amigo</button>
                </div>
            </div>
        </div>
    );
}

export default Profile;