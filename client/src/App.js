import Topbar from "./components/Topbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import Register from "./pages/Register";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";


function App() {
  const {user} = useContext(AuthContext)
  console.log("appf", user)
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={user ? <Home/> : <Login/> }/>
        <Route  path="/login" element={user ? <Navigate to="/" />: <Login/>}/>
        <Route  path="/register" element={user ? <Navigate to="/" />: <Register/>}/>
        <Route  path="/profile/:username" element={<Profile/>}/>

      </Routes>
    </BrowserRouter>
    );
}

export default App;
