import { useEffect } from "react";
import { FaSteam, FaSpotify, FaInstagram } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import { useParams } from "react-router-dom";
import CTAButton from "./CTAButton";

function ProfileLinks({ links }) {
    const { user } = useAuth();
    const { userId } = useParams();

    const isOwner = user && user.id === userId;

    useEffect(() => {
        console.log(links);
    }, [links])

    return (
        links ? <div className="flex flex-col gap-3 p-2.5">
            {links.steam && <a className="flex items-end gap-2 text-xl" href={links.steam.url} target="_blank"><FaSteam className="text-4xl text-raspberry" /> {links.steam.name}</a>}
            {links.spotify && <a className="flex items-end gap-2 text-xl" href={links.spotify.url} target="_blank"><FaSpotify className="text-4xl text-raspberry" /> {links.spotify.name}</a>}
            {links.instagram && <a className="flex items-end gap-2 text-xl" href={links.instagram.url} target="_blank"><FaInstagram className="text-4xl text-raspberry" /> {links.instagram.name}</a>}
        </div> : (
            isOwner ? (
                <CTAButton label="Conectar contas" />
            ) : <p>Este usuário não adicionou links ao perfil.</p>
        )
    );
}

export default ProfileLinks;