import { Typography } from "@mui/material"
import { Link } from "react-router-dom"
import openai from '../../../public/openai.png'
const Logo = () => {
  return (
    <div style={{display:'flex',marginRight:'auto',alignItems:'center',gap:'8px'}}>
      <Link to={'/'}>
        <img src={openai} alt="openai" width={'30px'} height={'30px'} className="image-inverted"/>
        </Link>
        <Typography sx={{display:{md:"block",sm:"none",xs:"none"},
        mr:"auto",
        fontWeight:800,
        textShadow:'2px 2px 20px #000',
    }}><span style={{fontSize:'20px'}}>Chat</span>GPT</Typography>
    </div>
  )
}

export default Logo
