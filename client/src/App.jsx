import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import RsvpsPage from "./pages/RsvpsPage";
import RsvpForm from "./pages/RsvpForm";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar.jsx";

import ProtectedRoute from "./ProtectedRoute";
import { RsvpProvider } from "./context/RsvpContext";


function App() {
  return (
    <AuthProvider>
      <RsvpProvider>
        <BrowserRouter>
          <main className="container mx-auto px-10">
            <Navbar></Navbar>
            <Routes>
              <Route path="/" element={<Home></Home>} />
              <Route path="/login" element={<LoginPage></LoginPage>} />
              <Route path="/register" element={<RegisterPage></RegisterPage>} />
              <Route element={<ProtectedRoute></ProtectedRoute>}>
                <Route path="/rsvps" element={<RsvpsPage></RsvpsPage>} />
                <Route path="/add-rsvp" element={<RsvpForm></RsvpForm>} />
                <Route path="/rsvp/:id" element={<RsvpForm></RsvpForm>} />
                <Route path="/profile" element={<Profile></Profile>} />
              </Route>
            </Routes>
          </main>
        </BrowserRouter>
      </RsvpProvider>
    </AuthProvider>
  )
}

export default App