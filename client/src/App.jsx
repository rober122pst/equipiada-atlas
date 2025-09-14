import ProfileHeader from './components/ProfileHeader.jsx'
import Navbar from "./components/Navbar.jsx";

function App() {
    return (
        <div className='min-h-screen bg-night-950 text-platinum font-display'>
            <header>
                <Navbar />
            </header>
            <main className="m-auto px-8 max-w-[1440px]">
                <ProfileHeader />
            </main>
        </div>
    )
}

export default App
