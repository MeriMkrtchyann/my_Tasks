import { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input, Alert, Space  } from 'antd';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

const Conteyner = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between
`

export default function LoginForm (setActiveAdmin){ 

  const [openButton, setOpenButton] = useState(false);
  const [login , setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [errMess , serErrMess] = useState("");
  const [form] = Form.useForm();
  const navigate = useNavigate()

  useEffect(()=> {
    if (login && login.length > 3 && password && password.length > 3){
      return setOpenButton(true)
    }
    return setOpenButton(false)
  }, [login , password])

  
const onFinish =async (values) => {
  console.log(values)
  try{
    let response = await fetch("/api/admin/login" , {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
    if (response.ok){
      const result = await response.json();
      setLogin("")
      setPassword("")
      form.resetFields();
      console.log(result)
      setActiveAdmin(result)
      navigate("/admin")
    }
  }catch{
    serErrMess("Անվավեր մուտքային տվյալներ")
  }
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

  return(
    <div>
      <div style={{textAlign:"center"}}>
        <img src="../../../public/logo.svg" alt="Logo" style={{ width: '100px', textAlign:"center" }} />
        <h2>Մուտք</h2>
      </div>
      <>
        {errMess && (
          <Space
            direction="vertical"
            style={{
              width: '100%',
            }}
          >
            <Alert
              message={errMess}
              type="error"
              showIcon
              closable
            />
          </Space>
        )}
      </>
      <Form
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
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
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
            value={login}
            onChange={(event) => setLogin(event.target.value)}
          />
        </Form.Item>
        <Form.Item
          label="Գաղտնաբառ"
          name="password"
          value = {password}
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
            value={password}
            onChange={(event) => setPassword(event.target.value)}
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
            disabled={!openButton}
            block
          >
           Մուտք
          </Button>
      </Form>
    </div> 
  )
}

  
  