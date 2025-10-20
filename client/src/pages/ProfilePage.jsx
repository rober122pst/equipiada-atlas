import ProfileHeader from '../components/ProfileHeader.jsx'
import ProfileStatsBar from '../components/ProfileStatsBar.jsx';
import GameCard from '../components/GameCard.jsx';
import PlatinumGameCard from '../components/PlatinumGameCard.jsx';
import ProfileLinks from '../components/ProfileLinks.jsx';
import Navbar from "../components/Navbar.jsx";
import ContainerBox from '../components/ContainerBox.jsx';
import ProfileFriends from '../components/ProfileFriends.jsx';

import { SkeletonBase } from '../components/skeletons/SkeletonBase.jsx';
import { ProfileHeaderSkeleton } from '../components/skeletons/ProfileHeaderSkeleton.jsx';
import { GameCardSkeleton } from '../components/skeletons/GameCardSkeleton.jsx';
import { ProfileStatsBarSkeleton } from '../components/skeletons/ProfileStatsBarSkeleton.jsx';

import { PlatinumSectionEmpty, FavoritesSectionEmpty } from '../components/empty_states';

import { useEffect, useState } from 'react';
import {  Link, useParams } from 'react-router-dom'
import { useUserGames, useUserProfile } from '../hooks'

function ProfilePage() {
    const { userId } = useParams();
    const { user, loading: loadingUser } = useUserProfile(userId)
    const { userGames, loading: loadingGames } = useUserGames(userId);
    const [favorites, setFavorites] = useState([]);


    useEffect(() => {
        if (user) {
            document.title = `${user.name} | LoGG`;
            console.log(user.profile)
        }
    }, [user]);

    useEffect(() => {
        if (userGames) {
            setFavorites(userGames.filter(ug => ug.favorite).map(ug => ug.game));
        }
    }, [userGames]);

    return (
        <div>
            <main className="m-auto px-8 max-w-[1440px]">
                {!loadingUser ? <ProfileHeader name={user.name} uProf={user.profile} /> : <ProfileHeaderSkeleton />}
                    <div className='flex flex-col lg:flex-row mt-6 gap-6'>
                    <div className='flex flex-col gap-6 w-full'>
                        {!loadingGames ? <ProfileStatsBar userGames={userGames} /> : <ProfileStatsBarSkeleton />}
                        <ContainerBox title="Platinas recentes">
                            {!loadingGames ? (
                                userGames.length > 0 ? (
                                    <>
                                        <div className='grid grid-cols-2 gap-6 mt-2'>
                                            {userGames.map((game) => (
                                                game.steam.isPlatinum && <PlatinumGameCard key={game._id} ug={game} game={game.game} />
                                            ))}
                                        </div>
                                        {userGames.length > 4 && <h3 className='font-semibold text-3xl mt-2 ml-4'>Mais <Link to={`u/${userId}/games`} className='text-raspberry italic font-extrabold hover:underline'>{userGames.length - 4}</Link> jogos</h3>}
                                    </>
                                ) : (
                                    <div className='w-full my-2'>
                                        <PlatinumSectionEmpty />
                                    </div>
                                ) 
                            ) : (
                                <>
                                    <SkeletonBase className='w-full h-[177px]' />
                                    <SkeletonBase className='w-full h-[177px]' />
                                    <SkeletonBase className='w-full h-[177px]' />
                                    <SkeletonBase className='w-full h-[177px]' />
                                </>
                            )}
                        </ContainerBox>
                        <ContainerBox title="Atividades recentes">
                            {!loadingGames ? (
                                userGames.length > 0 ? userGames.map((game) => (
                                    <GameCard key={game._id} ug={game} game={game.game} large details />
                                )) : (
                                    <p className='text-gray'>Nenhuma atividade recente encontrada.</p>   
                                )
                            ) : (
                                <>
                                    <GameCardSkeleton large details />
                                    <GameCardSkeleton large details />
                                    <GameCardSkeleton large details />
                                </>
                            )}
                        </ContainerBox>
                    </div>
                    <div className='flex flex-col gap-6 lg:max-w-[468px] w-full'>
                        <ContainerBox title="Links">
                            {user ? <ProfileLinks links={user.profile.links} /> : <p>Carregando...</p>}
                        </ContainerBox>
                        <ContainerBox title="Favoritos">
                            {!loadingGames ? (
                                favorites.length > 0 ? (
                                    favorites.map((game) => (
                                        <GameCard key={game._id} ug={game} game={game.game} />
                                    ))
                                ) : (
                                    <>
                                        <p className='text-gray'>Nenhum favorito encontrado.</p>
                                        <FavoritesSectionEmpty />
                                    </>
                                )
                            ) : (
                                <>
                                    <GameCardSkeleton />
                                    <GameCardSkeleton />
                                    <GameCardSkeleton />
                                </>
                            )}
                        </ContainerBox>
                        <ProfileFriends />
                    </div>
                </div>
            </main>
        </div>
    )
}

export default ProfilePage
