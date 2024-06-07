
import styled from '@emotion/styled';
import { LoginForm } from "../components/login/LoginForm"

const LoginContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width:  100wh;
    height: 100vh;
    background-color : #c0c0c0;
`

const LoginFormContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color:white;
    border: 1px solid white;
    border-radius: 2rem;
    padding: 50px;
` 

function LoginPage() {
    return (
       <LoginContainer>
            <LoginFormContainer>
                <div>
                    <LoginForm/>
                </div>
            </LoginFormContainer>
        </LoginContainer>
    )
}
    
export { LoginPage }
