import { Button, Checkbox, Form, Input  } from 'antd';
import { useForm } from "react-hook-form"
import styled from '@emotion/styled';
import "antd/dist/reset.css";
// import axios from 'axios';
import { useDispatch } from 'react-redux' 
import { updateEmail } from '../../../redux/slices/activeUser/activeUserSlice';
import { useNavigate } from 'react-router-dom';


const Conteyner = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between
`

export default function LoginForm (){ 
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate()
  
const onFinish = async (values) => {
  dispatch(updateEmail(values.email))
  localStorage.setItem('activeUserEmail', values.email);
  navigate("/admin")

  // try{
  //   const response = await axios.post("/api/admin/login", values)
  //   dispatch(updateEmail(values.email))
  //   localStorage.setItem('activeUserEmail', values.email);
  //   navigate("/admin")
  //   console.log(response.data)
  // }catch(error){
  //   console.error(error.message);
  // }
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const onSubmit = (data) => console.log(data)

  return(
    <div>
      <div style={{textAlign:"center"}}>
        <img src="../../../public/logo.svg" alt="Logo" style={{ width: '100px', textAlign:"center" }} />
        <h2>Մուտք</h2>
      </div>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        name="loginForm"
        wrapperCol={{
          span: 24,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Էլ․ փոստ"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24, 
          }}
          style={{
            display: 'block',
          }}
        >
          <Input 
            {...register("email", { required: true })} 
          />
        </Form.Item>
        <Form.Item
          label="Գաղտնաբառ"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          labelCol={{
            span: 24, 
          }}
          wrapperCol={{
            span: 24, 
          }}
        >
          <Input.Password 
            {...register("password", { required: true })} 
          />
        </Form.Item>
        <Conteyner>
          <Form.Item
            name="remember"
            valuePropName="checked"
          >
            <Checkbox>Հիշել</Checkbox>
          </Form.Item>
          <Form.Item
            name="forgotPassword?"
          >
            <Button type="link">Մոռացե՞լ եք գաղտնաբառը</Button>
          </Form.Item>
        </Conteyner>
        <Button
          type="primary"
          htmlType="submit"
          block
        >
          Մուտք
        </Button>
      </Form>
    </div> 
  )
}
