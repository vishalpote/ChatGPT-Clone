import { Avatar, Box, Typography } from "@mui/material"
import openai from '../../../public/openai.png'
import { userAuth } from "../../context/AuthContext";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

function extractFromMessage(message:string){
  if(message.includes('```')){
    const blocks=message.split('```');
    return blocks;
  }
}

function iscodeBlock(str:sring){
  if(str.includes('=') || 
    str.includes(';') || 
    str.includes('[') || 
    str.includes(']') || 
    str.includes('{') || 
    str.includes('}') || 
    str.includes('#') || 
    str.includes('//') 
){
  return true;
}
return false;
}

const ChatItem = ({content,role}:{content:string,role:'user' | 'assistant'}) => {
    const auth=userAuth();
    const messagesBlocks=extractFromMessage(content);
  return (
    <>
      {
        role==="assistant" ? 
            <Box sx={{display:'flex',p:2,bgcolor:'#004d5612',my:2,gap:2,my:2}}>
                <Avatar sx={{ml:0}}>
                    <img src={openai} alt="openai" width={'30px'}/>
                </Avatar>
                <Box> {
                    !messagesBlocks && (
                      <Typography sx={{fontSize:'20px'}}>{content}</Typography>
                    )}

                    {
                      messagesBlocks && messagesBlocks.length && messagesBlocks.map((block)=>
                         iscodeBlock(block) ? <SyntaxHighlighter style={coldarkDark} language="javascript">{block}</SyntaxHighlighter> :<Typography sx={{fontSize:'20px'}}>{block}</Typography>)
                    }
                  </Box>
            </Box>
        :
            <Box sx={{display:'flex',p:2,bgcolor:'#004d56',gap:2}}>
                <Avatar sx={{ml:0,bgcolor:'black',color:"white"}}>
                    {auth?.user?.name[0]}
                </Avatar>
                <Box> {
                    !messagesBlocks && (
                      <Typography sx={{fontSize:'20px'}}>{content}</Typography>
                    )}

                    {
                      messagesBlocks && messagesBlocks.length && messagesBlocks.map((block)=>
                         iscodeBlock(block) ? <SyntaxHighlighter style={coldarkDark} language="javascript">{block}</SyntaxHighlighter> :<Typography sx={{fontSize:'20px'}}>{block}</Typography>)
                    }
                  </Box>
            </Box>
      }
    </>
  )
}

export default ChatItem
