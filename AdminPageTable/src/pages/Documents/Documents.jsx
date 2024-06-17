import { IdCard } from "./IdCard"
import { NonBiometricPassport } from "./NonBiometricPassport"


const Documents = (parm) => {

    return(
        <div style={{display: 'flex' , gap:20}}>
          <IdCard data = {parm.data} />
          <NonBiometricPassport data = {parm.data}/>
        </div>
      )
  }

  export {Documents}