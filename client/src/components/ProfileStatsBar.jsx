import { LuClock, LuGamepad, LuFlag, LuMedal, LuTrophy } from "react-icons/lu";

function ProfileStatsBar({ userGames }) {
    return (
        <div className="flex bg-gradient-to-br from-rich-900/40 to-transparent justify-around items-center p-4 border-2 rounded-2xl border-rich-900 w-full h-[116px]">
            <a href="" className="flex gap-2 items-center">
                <LuClock className="text-raspberry text-5xl" />
                <div>
                    <h1 className="text-3xl font-semibold tracking-tight">{userGames.reduce((total, game) => total + game.steam.playtimeForever, 0)}h</h1>
                    <p className="font-medium text-[11px] text-gray">Tempo de jogo</p>
                </div>
            </a>
            <a href="" className="flex gap-2 items-center">
                <LuGamepad className="text-raspberry text-5xl" />
                <div>
                    <h1 className="text-3xl font-semibold tracking-tight">{userGames.length}</h1>
                    <p className="font-medium text-[11px] text-gray">Jogos</p>
                </div>
            </a>
            <a href="" className="flex gap-2 items-center">
                <LuFlag className="text-raspberry text-5xl" />
                <div>
                    <h1 className="text-3xl font-semibold tracking-tight">{userGames.filter(game => game.timesCompleted > 0).length}</h1>
                    <p className="font-medium text-[11px] text-gray">Zerados</p>
                </div>
            </a>
            <a href="" className="flex gap-2 items-center">
                <LuMedal className="text-raspberry text-5xl" />
                <div>
                    <h1 className="text-3xl font-semibold tracking-tight">{userGames.filter(game => game.completedTimestamps.length > 0).length}</h1>
                    <p className="font-medium text-[11px] text-gray">Completados</p>
                </div>
            </a>
            <a href="" className="flex gap-2 items-center">
                <LuTrophy className="text-raspberry text-5xl" />
                <div>
                    <h1 className="text-3xl font-semibold tracking-tight">{userGames.filter(game => game.steam.isPlatinum).length}</h1>
                    <p className="font-medium text-[11px] text-gray">Platinas</p>
                </div>
            </a>
        </div>
    );
}

export default ProfileStatsBar;