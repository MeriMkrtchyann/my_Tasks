import axios from 'axios';
import { useDispatch } from 'react-redux' 
import { updateEmail } from '../../../redux/slices/activeUser/activeUserSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button, Checkbox, Form, Input, Alert, Space   } from 'antd';
import { useForm } from "react-hook-form"
import styled from '@emotion/styled';
import "antd/dist/reset.css";


const Conteyner = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between
`

function LoginForm (){ 

  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate()
  const [error , setError] = useState("")
  
const onFinish = async (values) => {
  dispatch(updateEmail(values.email))
  localStorage.setItem('activeUserEmail', values.email);
  navigate("/admin")
  setError()
  try{
    const response = await axios.post("/api/admin/login", values)
    dispatch(updateEmail(values.email))
    localStorage.setItem('activeUserEmail', values.email);
    navigate("/admin")
    console.log(response.data)
  }catch(error){
    setError("Խնդրում ենք մուտքագրել վավեր տվյալներ")
  }
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
       {error && 
          <Space
            direction="vertical"
            style={{
              width: '100%',
            }}
          >
            <Alert
              message={error}
              type="error"
              showIcon
              closable
            />
          </Space>
        }
        <Form.Item
          label="Էլ․ փոստ"
          name="email"
          rules={[
            {
              required: true,
              message: 'Խնդրում ենք մուտքագրել ձեր էլփոստը',
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
              message: 'Խնդրում ենք մուտքագրել ձեր գաղտնաբառը',
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

export  {LoginForm} 
