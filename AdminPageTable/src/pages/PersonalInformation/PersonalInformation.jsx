import { useEffect } from "react";
import OtherInfo from "./OtherInfo";
import PersonalInfo from "./PersonalInfo";
import { useGetUserByIdMutation } from "../../api/apiSlice";

const PersonalInformation = () => {
    const [userDetails] = useGetUserByIdMutation()
    const userId = localStorage.getItem("userId")
  
    useEffect(()=>{
      userDetails({ userId })
    },[userId,userDetails])
  
    return(
        <div style={{display: 'flex' , gap:20}}>
          <PersonalInfo />
          <OtherInfo />
        </div>
      )
  }

  export {PersonalInformation}