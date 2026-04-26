import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserProvider from "./context/UserProvider";
import UsersListPage from "./pages/UsersListPage";
import UserProfilePage from "./pages/UserProfilePage";
import "./App.css";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UsersListPage />} />
          <Route path="/users/:id" element={<UserProfilePage />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;