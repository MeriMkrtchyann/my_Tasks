import { KeyOutlined } from "@ant-design/icons"
import { Button, Card, Flex, Form, Input, Space, message } from "antd"
import { Controller, useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import { selectActiveAdmin } from "../../../redux/slices/activeAdmin/activeAdminSlice"


const InputAdminInfo = () => {

    const { email } = useSelector(selectActiveAdmin)
    const data = useSelector(selectActiveAdmin)
    console.log(data)
    const { control, handleSubmit, formState: { isSubmitting } } = useForm();

    const onSubmit = async (values) => {
        try {
            console.log(values)
        } catch (error) {
            message.error('Login failed. Please check your credentials and try again.');
        }
    };
    
    return (
        <Space direction="vertical" size={16} style={{ flex: 1 }}>
        <Card
            title={<><KeyOutlined /> Անձնական տվյալներ</>}
            style={{
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Form
                onFinish={handleSubmit(onSubmit)}
                initialValues={{ remember: true }}
                autoComplete="off"
            >
                <Flex gap="middle">
                <Controller
                    name='email'
                    control={control}
                    defaultValue={email}
                    render={({ field }) => (
                        <Form.Item
                            label="Էլ․ փոստ"
                            labelCol={{ span: 24 }}
                            htmlFor="email"
                        >
                            <Input {...field}  id="email" disabled/>
                        </Form.Item>
                    )}
                />
                <Controller
                    name='password'
                    control={control}
                    render={({ field }) => (
                        <Form.Item
                            label="Գաղտնաբառ"
                            labelCol={{ span: 24 }}
                            htmlFor="password"
                        >
                            <Input.Password {...field}  id="password"  disabled/>
                        </Form.Item>
                    )}
                />
                </Flex>
                <Form.Item>
                    <Button
                        type="primary"
                        loading={isSubmitting}
                        htmlType='submit'
                    >
                        Պահպանել
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    </Space>
    )
}

export { InputAdminInfo }