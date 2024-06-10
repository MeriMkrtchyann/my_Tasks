import { useDispatch } from 'react-redux';
import { updateAdminInfo } from '../../../redux/slices/activeAdmin/activeAdminSlice';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { Button, Form, Input, Checkbox, message } from 'antd';
import styled from '@emotion/styled';
import { getToken } from '../../api/getToken';
import { urls } from '../../config/urls';
import { getData } from '../../api/getData';
import { routes } from '../../config/routes';

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

function LoginForm() {

    const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const username = useWatch({ control, name: 'username', defaultValue: '' });
    const password = useWatch({ control, name: 'password', defaultValue: '' });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const onSubmit = async (values) => {
        try {
            const accessToken = await getToken(urls.login , values);
            if (accessToken) {
                const adminData = await getData(urls.aboutAdmin)
                dispatch(updateAdminInfo(adminData));
                navigate(routes.admin);
            }
        } catch (error) {
            message.error('Login failed. Please check your credentials and try again.');
        }
    };

    return (
        <div>
            <div style={{ textAlign: 'center' }}>
                <img src="../../../public/logo.svg" alt="Logo" style={{ width: '100px', textAlign: 'center' }} />
                <h2>Մուտք</h2>
            </div>
            <Form
                onFinish={handleSubmit(onSubmit)}
                wrapperCol={{ span: 24 }}
                initialValues={{ remember: true }}
                autoComplete="off"
            >
                <Controller
                    name='username'
                    control={control}
                    defaultValue=""
                    rules={{ required: 'Username is required' }}
                    render={({ field, fieldState }) => (
                        <Form.Item
                            label="Էլ․ փոստ"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            validateStatus={fieldState.error ? 'error' : ''}
                            help={fieldState.error?.message}
                        >
                            <Input {...field} />
                        </Form.Item>
                    )}
                />
                <Controller
                    name='password'
                    control={control}
                    defaultValue=""
                    rules={{ required: 'Password is required' }}
                    render={({ field, fieldState }) => (
                        <Form.Item
                            label="Գաղտնաբառ"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            validateStatus={fieldState.error ? 'error' : ''}
                            help={fieldState.error?.message}
                        >
                            <Input.Password {...field} />
                        </Form.Item>
                    )}
                />
                <Container>
                    <Form.Item name="remember" valuePropName="checked">
                        <Checkbox>Հիշել</Checkbox>
                    </Form.Item>
                    <Form.Item>
                        <Button type="link">Մոռացե՞լ եք գաղտնաբառը</Button>
                    </Form.Item>
                </Container>
                <Form.Item>
                    <Button
                        type="primary"
                        loading={isSubmitting}
                        disabled={!username || !password || isSubmitting || errors.username || errors.password}
                        htmlType='submit'
                    >
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export { LoginForm };
