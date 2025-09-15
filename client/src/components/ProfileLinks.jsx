import { FaSteam, FaSpotify, FaInstagram } from "react-icons/fa";

function ProfileLinks() {
    return (
        <div className="flex flex-col gap-3 p-2.5">
            <a className="flex items-end gap-2 text-xl" href="https://store.steampowered.com/" target="_blank"><FaSteam className="text-4xl text-raspberry" /> rb87</a>
            <a className="flex items-end gap-2 text-xl" href="https://spotify.com/" target="_blank"><FaSpotify className="text-4xl text-raspberry" /> Rober122</a>
            <a className="flex items-end gap-2 text-xl" href="https://instagram.com" target="_blank"><FaInstagram className="text-4xl text-raspberry" /> @rober122.87</a>
        </div>
    );
}

export default ProfileLinks;