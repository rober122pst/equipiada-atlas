import testGameImage from '../assets/the_witcher_3.jpg';
import { LuClock } from "react-icons/lu";

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
                <img className="h-[90px] w-[90px] rounded-lg object-cover" src={testGameImage} alt="Game cover" />
            </div>
            <div>
                <h5 className='font-semibold text-2xl tracking-tight'>{props.title}</h5>
                <p className='flex gap-1 items-center text-sm text-gray mt-1'>
                    <span><LuClock /></span>{props.time}h jogadas
                </p>
                <strong className={`font-extrabold italic text-2xl ${ratingColor}`} >
                    {props.rating}
                </strong>
            </div>
        </div>
    )
}

export default GameCard;