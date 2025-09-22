import { LuClock, LuTrophy } from "react-icons/lu";
import PlatIcon from './PlatIcon.jsx';
import { calcRatingAverage } from '../assets/utils/ratingUtils.js';

function GameCard({ ug, game, large = false, details = false }) {
    let ratingColor = 'text-gray';
    let rating = calcRatingAverage(ug.rating, ug.favorite);

    if (rating > 10) {
        ratingColor = 'text-cocoa-brown';
    }else if (rating == 10) {
        ratingColor = 'text-raspberry';
    }

    return (
        <div className='flex items-center gap-2.5 p-2.5'>
            <div className="relative overflow-hidden">
                {ug.steam.isPlatinum && (<PlatIcon size={13} />)}
                <img className={`${large ? 'h-[125px] w-[189px]' : 'h-[90px] w-[90px]'} rounded-lg object-cover`} src={game.coverURL} alt="Game cover" />
            </div>
            <div>
                <h5 className='font-semibold text-2xl tracking-tight'>{game.title}</h5>
                <p className='flex gap-1 items-center text-sm text-gray mt-1'>
                    <span><LuClock /></span>{ug.steam.playtimeForever}h jogadas
                </p>
                <strong className={`font-extrabold italic text-2xl ${ratingColor}`} >
                    {rating.toFixed(1)}
                </strong>
                {details && (<p className='flex gap-1 items-center text-sm mt-1'>
                    <span><LuTrophy /></span>1 platina
                </p>)}
            </div>
        </div>
    )
}

export default GameCard;