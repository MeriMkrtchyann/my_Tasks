import { UserOutlined } from "@ant-design/icons"
import { Button, Card, Flex, Form, Input, Space, message } from "antd"
import { Controller, useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import { selectActiveAdmin } from "../../../redux/slices/activeAdmin/activeAdminSlice"

const PersonalAdminInfo = () => {

    const { firstname , lastname } = useSelector(selectActiveAdmin)
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
            title={<><UserOutlined /> Անձնական տվյալներ</>}
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
                    name='name'
                    control={control}
                    defaultValue={firstname}
                    render={({ field }) => (
                        <Form.Item
                            label="Անուն"
                            labelCol={{ span: 24 }}
                            htmlFor="name"
                        >
                            <Input {...field}  id="name" />
                        </Form.Item>
                    )}
                />
                <Controller
                    name='surname'
                    control={control}
                    defaultValue={lastname}
                    render={({ field }) => (
                        <Form.Item
                            label="Ազգանուն"
                            labelCol={{ span: 24 }}
                            htmlFor="surname"
                        >
                            <Input {...field}  id="surname"  />
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

export { PersonalAdminInfo } 