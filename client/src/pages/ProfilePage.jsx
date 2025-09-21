import ProfileHeader from '../components/ProfileHeader.jsx'
import ProfileStatsBar from '../components/ProfileStatsBar.jsx';
import GameCard from '../components/GameCard.jsx';
import RecentGameCard from '../components/RecentGameCard.jsx';
import PlatinumGameCard from '../components/PlatinumGameCard.jsx';
import ProfileLinks from '../components/ProfileLinks.jsx';
import Navbar from "../components/Navbar.jsx";
import ContainerBox from '../components/ContainerBox.jsx';
import ProfileFriends from '../components/ProfileFriends.jsx';

import { useEffect, useState } from 'react';
import { getUserById } from '../services/userService.js';
import { useParams } from 'react-router-dom'

function ProfilePage() {
    const [user, setUser] = useState(null);
    const { userId } = useParams();

    useEffect(() => {
        console.log("Chamando usuario");
        getUserById(userId).then(setUser)
    });

    return (
        <div className='min-h-screen bg-rich-950 text-platinum font-display'>
            <header className='sticky top-0 z-50'>
                <Navbar />
            </header>
            <main className="m-auto px-8 max-w-[1440px]">
                <ProfileHeader user={user.profile} />
                <div className='flex flex-col lg:flex-row mt-6 gap-6'>
                    <div className='flex flex-col gap-6 w-full'>
                        <ProfileStatsBar />
                        <ContainerBox title="Platinas recentes">
                            <div className='grid grid-cols-2 gap-6 mt-2'>
                            </div>
                            <h3 className='font-semibold text-3xl mt-2 ml-4'>Mais <a href='' className='text-raspberry italic font-extrabold hover:underline'>49</a> jogos</h3>
                        </ContainerBox>
                        <ContainerBox title="Atividades recentes">
                            <RecentGameCard title="The Witcher 3: Wild Hunt" time="127" rating="11" />
                            <RecentGameCard title="The Witcher 3: Wild Hunt" time="127" rating="09" />
                            <RecentGameCard title="The Witcher 3: Wild Hunt" time="127" rating="09" />
                        </ContainerBox>
                    </div>
                    <div className='flex flex-col gap-6 lg:max-w-[468px] w-full'>
                        <ContainerBox title="Links">
                            <ProfileLinks />
                        </ContainerBox>
                        <ContainerBox title="Favoritos">
                            <GameCard title="The Witcher 3: Wild Hunt" time="127" rating="11" />
                            <GameCard title="Cyberpunk 2077" time="150" rating="10" />
                            <GameCard title="Resident Evil 2" time="89" rating="09" />
                        </ContainerBox>
                        <ProfileFriends />
                    </div>
                </div>
            </main>
        </div>
    )
}

export default ProfilePage
