import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserProvider from "./context/UserProvider";
import UsersListPage from "./pages/UsersListPage";
import UserProfilePage from "./pages/UserProfilePage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./App.css";
import "./styles/layout.css";
import "./styles/pages.css";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <div className="app-shell">
          <Navbar />
          <Routes>
            <Route path="/" element={<UsersListPage />} />
            <Route path="/users/:id" element={<UserProfilePage />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
