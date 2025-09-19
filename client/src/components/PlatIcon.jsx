import { LuTrophy } from "react-icons/lu";

function PlatIcon({ size = 24}) {
    return (
        <div className="absolute -top-2 -right-2 p-2.5 bg-cocoa-brown rounded-bl-3xl flex justify-center items-center z-10">
            <LuTrophy className={`text-platinum`} size={size} />
        </div>
    )
}

export default PlatIcon;