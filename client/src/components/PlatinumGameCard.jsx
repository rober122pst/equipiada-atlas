import testGameImage from '../assets/the_witcher_3.jpg';
import { LuClock, LuTrophy } from "react-icons/lu";
import PlatIcon from './PlatIcon.jsx';

import games from '../assets/utils/api-test/Games.json';

function getGameById(gameId) {
    return games.find(game => game.appId === gameId);
}

function PlatinumGameCard(props) {
    let ratingColor = 'text-gray';

    if (props.rating > 10) {
        ratingColor = 'text-cocoa-brown';
    }else if (props.rating == 10) {
        ratingColor = 'text-raspberry';
    }

    const game = getGameById(props.id);
    const gameImage = game ? game.bannerUrl : testGameImage;
    return (
        <div className='flex items-center relative w-full h-[177px] rounded-lg overflow-hidden'>
            <PlatIcon size={25} />
            <div className='w-full h-full overflow-hidden rounded-lg'>
                <img className="w-full h-full object-cover" src={gameImage} alt="Game cover" />
            </div>
            <div className='group absolute top-0 left-0 bg-linear-to-r to-rich-950/70 from-rich-950/90 opacity-0 backdrop:blur-5xl p-2.5 w-full h-full hover:opacity-100 transition-opacity cursor-pointer duration-500'>
                <div className='absolute -top-20 left-2.5 w-full h-full group-hover:top-2.5 transition-all duration-500'>
                    <h5 className='font-semibold text-2xl tracking-tight'>{game.title}</h5>
                    <p className='flex gap-1 items-center text-sm text-gray mt-1'>
                        <span><LuClock /></span>{props.time}h jogadas
                    </p>
                    <strong className={`font-extrabold italic text-2xl ${ratingColor}`} >
                        {props.rating}
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