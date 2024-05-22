import { Routes,Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Chat from "./pages/Chat"
import NotFound from "./pages/NotFound"
import Header from "./components/Header"
import { userAuth } from "./context/AuthContext"

const App = () => {
  const auth=userAuth();
  return (
    <>
    <Header></Header>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
     {   auth?.isLoggedIn && auth?.user && <Route path="/chat" element={<Chat></Chat>}></Route>}
        <Route path="*" element={<NotFound></NotFound>}></Route>
      </Routes>
    </>
  )
}

export default App
