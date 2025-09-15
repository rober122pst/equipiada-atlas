import testGameImage from '../assets/the_witcher_3.jpg';
import { LuClock, LuTrophy } from "react-icons/lu";

function GameCard(props) {
    let ratingColor = 'text-gray';

    if (props.rating > 10) {
        ratingColor = 'text-cocoa-brown';
    }else if (props.rating == 10) {
        ratingColor = 'text-raspberry';
    }

    return (
        <div className='flex items-center gap-2.5 p-2.5'>
            <div>
                <img className="h-[125px] w-[189px] rounded-lg object-cover" src={testGameImage} alt="Game cover" />
            </div>
            <div>
                <h5 className='font-semibold text-2xl tracking-tight'>{props.title}</h5>
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
    )
}

export default GameCard;