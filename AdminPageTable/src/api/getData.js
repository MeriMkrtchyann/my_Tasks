import axios from 'axios'

const getData = async ( url ) => {
  
  const accessToken = localStorage.getItem('access_token');

    try{
      if (url && accessToken ){
        const data = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return data.data
      }
      return null
    }
    catch(error){
      console.log(error)
    }
}


export {getData}