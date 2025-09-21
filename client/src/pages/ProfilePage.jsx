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
import { getUserGames } from '../services/userGamesService.js';
import { getGameById } from '../services/gamesService.js';
import { useParams } from 'react-router-dom'

function ProfilePage() {
    const [user, setUser] = useState(null);
    const [userGames, setUserGames] = useState(null);
    const [gamesData, setGamesData] = useState(null);

    const { userId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await getUserById(userId);
                setUser(userData);
                const userGamesData = await getUserGames(userId);
                setUserGames(userGamesData);
                const gamesPromises = userGamesData.map(ug => getGameById(ug.gameId));
                const gamesResults = await Promise.all(gamesPromises);
                setGamesData(gamesResults);
                console.log(userGames)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [userId]);

    useEffect(() => {
        if (user) {
            document.title = `${user.name} | LoGG`;
        }
    }, [user]);

    return (
        <div className='min-h-screen bg-rich-950 text-platinum font-display'>
            <header className='sticky top-0 z-50'>
                <Navbar />
            </header>
            <main className="m-auto px-8 max-w-[1440px]">
                {user ? (<><ProfileHeader name={user.name} uProf={user.profile} />
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
                            {userGames && userGames.length > 0 ? (
                                gamesData && gamesData.map((game, index) => (
                                    userGames[index].favorite && <GameCard key={game.id} ug={userGames[index]} game={game} />
                                ))
                            ) : (<p className='mt-2'>Nenhum jogo favorito encontrado.</p>
                            )}
                        </ContainerBox>
                        <ProfileFriends />
                    </div>
                </div></>) : (<p>Carregando...</p>)}
            </main>
        </div>
    )
}

export default ProfilePage
