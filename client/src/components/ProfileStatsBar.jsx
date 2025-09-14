import { LuClock5 } from "react-icons/lu";

function ProfileStatsBar() {
    return (
        <div className="flex justify-around items-center bg-night-900 p-4 rounded-3xl w-full h-[116px]">
            <div className="flex gap-3 items-center">
                <LuClock5 className="text-raspberry text-5xl" />
                <div>
                    <h1 className="text-3xl font-semibold tracking-tight">3.758h</h1>
                    <p className="font-medium text-[11px] text-gray">Tempo de jogo</p>
                </div>
            </div>
        </div>
    );
}

export default ProfileStatsBar;