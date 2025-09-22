import { LuClock, LuTrophy } from "react-icons/lu";
import PlatIcon from './PlatIcon.jsx';
import { calcRatingAverage } from '../assets/utils/ratingUtils.js';

function PlatinumGameCard({ ug, game }) {
    let ratingColor = 'text-gray';

    let rating = calcRatingAverage(ug.rating, ug.favorite);

    if (rating > 10) {
        ratingColor = 'text-cocoa-brown';
    }else if (rating == 10) {
        ratingColor = 'text-raspberry';
    }

    return (
        <div className='flex items-center relative w-full h-[177px] rounded-lg overflow-hidden'>
            <PlatIcon size={25} />
            <div className='w-full h-full overflow-hidden rounded-lg'>
                <img className="w-full h-full object-cover" src={game.bannerURL} alt="Game cover" />
            </div>
            <div className=
                'group absolute top-0 left-0 bg-linear-to-r to-rich-950/70 from-rich-950/90 opacity-0 backdrop:blur-5xl p-2.5 w-full h-full hover:opacity-100 transition-opacity cursor-pointer duration-500'
            >
                <div className='absolute -top-20 left-2.5 w-full h-full group-hover:top-2.5 transition-all duration-500'>
                    <h5 className='font-semibold text-2xl tracking-tight'>{game.title}</h5>
                    <p className='flex gap-1 items-center text-sm text-gray mt-1'>
                        <span><LuClock /></span>{ug.steam.playtimeForever}h jogadas
                    </p>
                    <strong className={`font-extrabold italic text-2xl ${ratingColor}`} >
                        {rating.toFixed(1)}
                    </strong>
                    <p className='flex gap-1 items-center text-sm mt-1'>
                        <span><LuTrophy /></span>1 platina
                    </p>
                </div>
            </div>
        </div>
    )
}

export default PlatinumGameCard;