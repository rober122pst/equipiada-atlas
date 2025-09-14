import ProfileHeader from './components/ProfileHeader.jsx'
import ProfileStatsBar from './components/ProfileStatsBar.jsx';
import ProfileAbout from './components/ProfileAbout.jsx';
import Navbar from "./components/Navbar.jsx";

function App() {
    return (
        <div className='min-h-screen bg-night-950 text-platinum font-display'>
            <header className='sticky top-0 z-50'>
                <Navbar />
            </header>
            <main className="m-auto px-8 max-w-[1440px]">
                <ProfileHeader />
                <div className='flex mt-6 gap-6'>
                    <div className='flex flex-col gap-6 w-full'>
                        <ProfileStatsBar />
                    </div>
                    <div className='flex flex-col gap-6 max-w-[468px] w-full'>
                        <ProfileAbout />
                    </div>
                </div>
            </main>
        </div>
    )
}

export default App
