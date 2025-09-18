import { LuClock, LuGamepad, LuFlag, LuMedal, LuTrophy } from "react-icons/lu";

function ProfileStatsBar() {
    return (
        <div className="flex justify-around items-center p-4 border-2 rounded-2xl border-rich-900 w-full h-[116px]">
            <a href="" className="flex gap-3 items-center">
                <LuClock className="text-raspberry text-5xl" />
                <div>
                    <h1 className="text-3xl font-semibold tracking-tight">3.758h</h1>
                    <p className="font-medium text-[11px] text-gray">Tempo de jogo</p>
                </div>
            </a>
            <a href="" className="flex gap-2 items-center">
                <LuGamepad className="text-raspberry text-5xl" />
                <div>
                    <h1 className="text-3xl font-semibold tracking-tight">999</h1>
                    <p className="font-medium text-[11px] text-gray">Jogos</p>
                </div>
            </a>
            <a href="" className="flex gap-2 items-center">
                <LuFlag className="text-raspberry text-5xl" />
                <div>
                    <h1 className="text-3xl font-semibold tracking-tight">81</h1>
                    <p className="font-medium text-[11px] text-gray">Zerados</p>
                </div>
            </a>
            <a href="" className="flex gap-2 items-center">
                <LuMedal className="text-raspberry text-5xl" />
                <div>
                    <h1 className="text-3xl font-semibold tracking-tight">20</h1>
                    <p className="font-medium text-[11px] text-gray">Completados</p>
                </div>
            </a>
            <a href="" className="flex gap-2 items-center">
                <LuTrophy className="text-raspberry text-5xl" />
                <div>
                    <h1 className="text-3xl font-semibold tracking-tight">53</h1>
                    <p className="font-medium text-[11px] text-gray">Platinas</p>
                </div>
            </a>
        </div>
    );
}

export default ProfileStatsBar;