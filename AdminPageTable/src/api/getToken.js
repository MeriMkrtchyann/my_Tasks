import axios from 'axios'

const getToken = async ( url, values ) => {

    console.log(url ,values)

    try{
      if (url && values ){
        const response = await axios.post(url, values);
        const accessToken = response.data.access_token
        localStorage.setItem('access_token', accessToken);
        return accessToken
      }
      return null
    }
    catch(error){
      console.log(error)
    }
}


export {getToken}