import { Box, Button, Typography } from "@mui/material"
import airobot from '../../public/airobot.png'
import CustomizedInput from "../components/shared/CustomizedInput"
import { IoMdLogIn } from "react-icons/io";
import { userAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const Signup = () => {

  const navigate=useNavigate();
  const auth=userAuth();

  const handleSubmit=async(e : React.FormEventHandler<HTMLFormElement> )=>{
      e.preventDefault();
      const formData=new FormData(e.currentTarget);
      const name=formData.get('name') as string;
      const email=formData.get('email') as string;
      const password=formData.get('password') as string;

      try {
        toast.loading("SignIn In..!!",{id:"login"})
        await auth?.signup(name,email,password);
        toast.success("SignUp Succesfull..!!",{id:"login"})
        navigate('/chat');
      } catch (error) {
        toast.error("SignUp Failed..!!",{id:"login"})
      }
  };


  useEffect(()=>{
    if(auth?.user){
      return navigate('/chat');
    }
  },[auth])
  return (
    <div>
      <Box width={'80%'} height={'80%'} display={'flex'} flex={1}>
        <Box padding={8} mt={8} display={{md:'flex',sm:'none',xs:'none'}}>
          <img src={airobot} alt="robot" />
        </Box>
        <Box display={'flex'} flex={{xs:1,md:0.5}} justifyContent={'center'} alignItems={'center'} padding={2} ml={'auto'} mt={16}>
          <form onSubmit={handleSubmit} style={{margin:'auto', padding:'8px',border:'none',borderRadius:'10px',boxShadow:'10px 10px 20px #000'}}>
            <Box sx={{display:'flex',flexDirection:'column',justifyContent:'center'}}>
              <Typography variant="h4" textAlign={'center'} padding={2} fontWeight={600}>Signup</Typography>

              <CustomizedInput type="text" name="name" label="Name"></CustomizedInput>
              <CustomizedInput type="email" name="email" label="Email"></CustomizedInput>
              <CustomizedInput type="password" name="password" label="Password"></CustomizedInput>
              <Button type="submit" 
              sx={{px:2,py:1,mt:2, width:'430px',borderRadius:'2px',
                backgroundColor:'#00fffc',
                ":hover":{
                  backgroundColor:"white",
                  color:"black"
                }
              }} endIcon={<IoMdLogIn />}>Signup</Button>
            </Box>
          </form>
        </Box>
      </Box>
    </div>
  )
}

export default Signup;
