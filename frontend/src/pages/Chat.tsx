import { Box, Button, IconButton, Typography } from "@mui/material";
import { userAuth } from "../context/AuthContext";
// import { red } from "@mui/material/colors";
import ChatItem from "../components/chat/ChatItem";
import {IoMdSend} from 'react-icons/io'
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { getChats, sendMessageRequest } from "../helper/api-communicator";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Chat = () => {
  const navigate=useNavigate();

  type Message={
    role:"user" | "assistant",
    content:string
  }


  const inputRef=useRef<HTMLInputElement | null>(null)
  const auth = userAuth();
  
  const [chatmessages,setChatMessages]=useState<Message[]>([])

  const handleSubmit=async()=>{
    const content=inputRef.current?.value as string;
    if(inputRef && inputRef.current){
      inputRef.current.value=""
    }

    const newMessage :Message={
      role:"user",
      content
    }
    setChatMessages((prev)=>[...prev,newMessage])
    const chatData=await sendMessageRequest(content);
    setChatMessages([...chatData.chats]);
  }

  useLayoutEffect(()=>{
    const getchats=async()=>{
      if(auth?.isLoggedIn && auth.user){
        try {
        toast.loading("Loading Chats..!!",{id:"loadchats"});
      const data=await getChats();
      setChatMessages([...data.chats]);
      toast.success("Successfully loaded chats..!!",{id:"loadchats"});
      } catch (error) {
        (error);
        toast.error("Error while loading Chats..!!");
      }
      }
    }
    getchats();
  },[auth]);

  useEffect(()=>{
    if(!auth?.user){
      return navigate('/login');
    }
  },[auth])
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flex: 1,
          width: "100%",
          height: "100%",
          mt: 3,
          gap: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flex: { md: 1, sm: 1, xs: 1 },
            flexDirection: "column",
            px: 3,
          }}
        >
          <Typography
            sx={{ fontSize: "40px", mb: 2, color: "white", mx: "auto",fontWeight:600 }}
          >
            Model GPT-3.5 Turbo
          </Typography>
          <Box
            sx={{
              width: "100vw",
              height: "60vh",
              borderRadius: 3,
              mx: "auto",
              display: "flex",
              flexDirection: "column",
              overflow: "scroll",
              overflowX: "hidden",
              overflowY: "auto",
              scrollBehavior:'smooth'
            }}
          >{chatmessages.map((chat,index)=>(
              <ChatItem content={chat.content} role={chat.role}></ChatItem>
          ))}</Box>
          <div style={{
            width:'95%',padding:'10px', borderRadius:8,backgroundColor:'rgb(17,29,39)',
              display: 'flex', margin:'auto'
            }}>

          <input type="text" ref={inputRef} style={{
            width:'100%',
            backgroundColor:'transparent',
            padding:'10px',
            height:'20px',
            border:'none',
            outline: 'none',
            color:'white',
            fontSize:'20px',
          }} placeholder="Message ChatGPT"/>
          <IconButton onClick={handleSubmit} sx={{mx:1,color:'white'}}><IoMdSend/></IconButton>
        </div>
        </Box>
      </Box>
    </>
  );
};

export default Chat;



  // <Box
  //         sx={{
  //           display: { md: "flex", sm: "none", xs: "none" },
  //           flex: 0.8,
  //           flexDirection: "column",
  //         }}
  //       >
  //         <Box
  //           sx={{
  //             display: "flex",
  //             width: "100%",
  //             height: "60vh",
  //             bgcolor: "rgb(17,29,39)",
  //             borderRadius: 3,
  //             flexDirection: "column",
  //             mx: 3,
  //           }}
  //         >
  //           <Avatar
  //             sx={{
  //               mx: "auto",
  //               my: 2,
  //               bgcolor: "white",
  //               color: "black",
  //               fontWeight: 700,
  //             }}
  //           >
  //             {auth?.user?.name[0]}
  //             {/* {auth?.user?.name.split(" ")[1][0]} */}
  //           </Avatar>
  //           <Typography sx={{ mx: "auto", fontFamily: "work sans" }}>
  //             Hello World!
  //           </Typography>
  //           <Typography
  //             sx={{ mx: "auto", fontFamily: "work sans", my: 4, p: 3 }}
  //           >
  //             Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo quas
  //             iure alias dolor in voluptatum quisquam quibusdam. Dolores,
  //             quaerat excepturi.
  //           </Typography>
  //           <Button
  //             sx={{
  //               width: "200px",
  //               my: "auto",
  //               color: "white",
  //               fontWeight: 700,
  //               bgcolor: red[300],
  //               mx: "auto",
  //               borderRadius: 3,
  //               ":hover": {
  //                 bgcolor: red.A400,
  //               },
  //             }}
  //           >
  //             Clear Conversation
  //           </Button>
  //         </Box>
  //       </Box>