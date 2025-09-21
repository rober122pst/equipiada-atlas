import testGameImage from '../assets/the_witcher_3.jpg';
import { LuClock } from "react-icons/lu";

function GameCard({ ug, game }) {
    let ratingColor = 'text-gray';

    
    function calcRatingAverage() {
        let average = Object.values(ug.rating).reduce((a, b) => a + b, 0) / Object.values(ug.rating).length;
        if (ug.favorite && average === 10) { average += 1; }
        return average;
    }
    
    if (calcRatingAverage() > 10) {
        ratingColor = 'text-cocoa-brown';
    }else if (calcRatingAverage() == 10) {
        ratingColor = 'text-raspberry';
    }

    return (
        <div className='flex items-center gap-2.5 p-2.5'>
            <div>
                <img className="h-[90px] w-[90px] rounded-lg object-cover" src={game.coverURL} alt="Game cover" />
            </div>
            <div>
                <h5 className='font-semibold text-2xl tracking-tight'>{game.title}</h5>
                <p className='flex gap-1 items-center text-sm text-gray mt-1'>
                    <span><LuClock /></span>{ug.steam.playtimeForever}h jogadas
                </p>
                <strong className={`font-extrabold italic text-2xl ${ratingColor}`} >
                    {calcRatingAverage().toFixed(1)}
                </strong>
            </div>
        </div>
    )
}

export default GameCard;