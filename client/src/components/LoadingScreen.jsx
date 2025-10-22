import { PacmanLoader } from 'react-spinners';

export default function LoadingScreen() {
    return (
        <div className="fixed top-0 left-0 z-60 flex flex-col items-center justify-center min-h-screen w-full bg-rich-950">
            <PacmanLoader color="#E0055D" size={50} />
        </div>
    );
}