import { Routes, Route } from "react-router-dom";

import ProfilePage from "./pages/ProfilePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import LoadingScreen from "./components/LoadingScreen.jsx";
import { useAuth } from "./contexts/AuthContext.jsx";

function App() {
  const { isLoading } = useAuth();
  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <div className="min-h-screen bg-rich-950 text-platinum font-display">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/u/:userId" element={<ProfilePage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
