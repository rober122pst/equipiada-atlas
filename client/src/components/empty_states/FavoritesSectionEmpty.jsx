import { FaPlus } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import { useParams } from 'react-router-dom';

export function FavoritesSectionEmpty() {
    const { user } = useAuth();
    const { userId } = useParams();

    if (user && user.id !== userId) {
        return <></>
    }

    return (
        <button className='flex items-center relative h-[90px] w-[90px] rounded-lg mt-3 bg-rich-900 cursor-pointer hover:opacity-75 duration-300 ease-in-out'>
            <FaPlus className='text-rich-950/70 align-middle text-center w-full text-5xl' />
        </button>
    );
}