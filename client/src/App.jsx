import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage.jsx";
import ProfilePageRober from "./pages/ProfilePageRober.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ProfilePage />} />
                <Route path="/rober122" element={<ProfilePageRober />} />
            </Routes>
        </Router>
    )
}

export default App
