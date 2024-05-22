
import axios from "axios";

export const loginUser=async(email:string,password:string)=>{
   try {
     const res = await axios.post("/user/login", { email, password });
     const data = await res.data;
     return data;
   } catch (error) {
      (error);
   }
}

export const signupUser=async(name:string,email:string,password:string)=>{
   try {
     const res = await axios.post("/user/signup", {name, email, password });
     const data = await res.data;
     return data;
   } catch (error) {
      (error);
   }
}

export const checkAuthStatus = async () => {
  try {
    const res = await axios.get("/user/auth-status");
    const data = await res.data;
    return data;
  } catch (error) {
    (error);
  }
};

export const sendMessageRequest=async(message:string)=>{
  try {
    const res=await axios.post("/chat/new",{message});

    const data=await res.data;

    return data;

  } catch (error) {
    (error);
  }
}


export const getChats=async()=>{
  try {
    const res=await axios.get("/chat/allchats");

    const data=await res.data;

    return data;

  } catch (error) {
    (error);
  }
}


export const logoutUser=async()=>{
  try {
    const res=await axios.get("/user/logout");

    const data=await res.data;

    return data;

  } catch (error) {
    (error);
  }
}