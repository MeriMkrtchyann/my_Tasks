import LoginForm from "../components/login/LoginForm";
import styled from '@emotion/styled';

const LoginConteyner = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width:  100wh;
    height: 100vh;
    background-color : #c0c0c0;
`

const LoginFormConteyner = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color:white;
    border: 1px solid white;
    border-radius: 2rem;
    padding: 50px;
`
export default function LoginPage(setActiveAdmin) {
    return (
       <LoginConteyner>
            <LoginFormConteyner>
                <div>
                    <LoginForm setActiveAdmin={setActiveAdmin}/>
                </div>
            </LoginFormConteyner>
        </LoginConteyner>
    )
}
     
