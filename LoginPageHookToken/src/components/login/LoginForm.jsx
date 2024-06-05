import axios from 'axios';
import { useDispatch } from 'react-redux' 
import { updateUserInfo } from '../../../redux/slices/activeUser/activeUserSlice';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form"
import styled from '@emotion/styled';

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between
`

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    gap : 10px;
`;

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

function LoginForm (){ 

  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = async (values) => {
    try{
      const response = await axios.post("/api/admin/login", values)
      if (response.data.access_token){
        const userData = await axios.get('/api/admin/me', {
          headers: {
            'Authorization': `Bearer ${response.data.access_token}`
          }
        });
        dispatch(updateUserInfo(userData.data))
        localStorage.setItem('access_token', response.data.access_token);
        navigate("/admin")
      }
    }catch(error){
      console.log(error)
    }
  }

    return(
      <div>
        <div style={{textAlign:"center"}}>
          <img src="../../../public/logo.svg" alt="Logo" style={{ width: '100px', textAlign:"center" }} />
          <h2>Մուտք</h2>
        </div>
        <Container>
          <FormContainer onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <label> User Name </label>
              <input 
                type="text" 
                name="userName"
                defaultValue="" 
                {...register("username" , { required: true })}
                aria-invalid={errors.userName ? "true" : "false"} 
              >
              </input>
              {errors.username?.type === 'required' && <p role="alert">User name is required</p>}
            </FormGroup>
            <FormGroup>
              <label> User Password </label>
              <input 
                type="password" 
                name="password"
                defaultValue="" 
                {...register("password" , { required: true })}
              >
              </input>
              {errors.password?.type === 'required' && <p role="alert">Password is required</p>}
            </FormGroup>
            <input type="submit" />
          </FormContainer>
        </Container>
      </div> 
    )
}

export  {LoginForm} 
