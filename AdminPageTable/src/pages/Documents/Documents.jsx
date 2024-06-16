import { IdCard } from "./IdCard"
import { NonBiometricPassport } from "./NonBiometricPassport"


const Documents = () => {

    return(
        <div style={{display: 'flex' , gap:20}}>
          <IdCard/>
          <NonBiometricPassport/>
        </div>
      )
  }

  export {Documents}