import OtherInfo from "./OtherInfo";
import PersonalInfo from "./PersonalInfo";

const PersonalInformation = (parm) => {

  const { data } = parm
  
    return(
        <div style={{display: 'flex' , gap:20}}>
          <PersonalInfo data={data}/>
          <OtherInfo data={data}/>
        </div>
      )
  }

  export {PersonalInformation}