import AppBar  from "@mui/material/AppBar"
import { Toolbar } from "@mui/material"
import Logo from "./shared/Logo"
import { userAuth } from "../context/AuthContext"
import NavLinks from "./shared/NavLinks"


const Header = () => {
  const auth=userAuth();
  return (
    <>
      <AppBar sx={{bgcolor:"transparent",position:"static",boxShadow:"none"}}>
        <Toolbar sx={{display:'flex'}}>
          <Logo></Logo>
          <div>
            {
              auth?.isLoggedIn ?
              <>
                  <NavLinks to="/chat" bg="#00fffc"text="Go To Chat" textcolor="black"></NavLinks>
                  <NavLinks to="/" bg={"#51538f"} text="Logout" textcolor="white" onClick={auth.logout}></NavLinks>
              </>
              :
              <>
                 <NavLinks to="/login" bg="#00fffc"text="Login" textcolor="black"></NavLinks>
                  <NavLinks to="/signup" bg="#51538f"text="Signup" textcolor="white"></NavLinks>
              </>
            }
          </div>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Header
