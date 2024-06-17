import { useEffect } from "react";
import OtherInfo from "./OtherInfo";
import PersonalInfo from "./PersonalInfo";
import { useSelector } from "react-redux";
import { useGetUserByIdMutation } from "../../api/apiSlice";
import { selectUserId } from "../../../redux/slices/usersDetails/usersDetailsSlice";

const PersonalInformation = () => {
    const [userDetails] = useGetUserByIdMutation()
    const userId = useSelector(selectUserId);
   
  
    useEffect(()=>{
      const userId = localStorage.getItem("userId")
      userDetails({ userId })
    },[])

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