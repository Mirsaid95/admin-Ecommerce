import Cookies from "js-cookie";
import { Button, Flex, Form, Input, message, Typography, Checkbox } from "antd";
import { LoginPayload, useLogin } from "./service/mutation/useLogin";
import { useNavigate, Link } from "react-router-dom";

const { Title, Text } = Typography;

export const Login = () => {
    const { mutate } = useLogin();
    const navigate = useNavigate();
    const submit = (data: LoginPayload) => {
        mutate(data, {
            onSuccess: (res) => {
                if (res.token) {
                    Cookies.set("Token", res.token);
                    message.success("Login Success");
                    navigate("/app", { replace: true });
                } else {
                    message.error("Token not received");
                }
            },
            onError: (error: any) => {
                if (error.response) {
                    const errorMessage = error.response.data?.message || "Login failed";
                    message.error(errorMessage);
                } else if (error.request) {
                    message.error("Network error. Please check your connection.");
                } else {
                    message.error("An error occurred. Please try again.");
                }
            }
        });
    }
    return (
        <Flex
            justify="center"
            align="center"
            style={{
                minHeight: "100vh",
                background: "#f0f2f5",
                margin: 0,
                padding: 0
            }}
        >
            <Form
                onFinish={submit}
                style={{
                    width: "400px",
                    padding: "30px",
                    borderRadius: "10px",
                    boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
                    background: "white"
                }}
            >
                <div style={{ textAlign: "center", marginBottom: "30px" }}>
                    <Title level={2} style={{ margin: 0, color: "#1677ff" }}>
                        AdminPanel
                    </Title>
                    <Text type="secondary">
                        Welcome
                    </Text>
                </div>

                <Form.Item
                    name="phoneNumber"
                    rules={[{ required: true, message: "Please enter your phone number" }]}
                >
                    <Input
                        autoComplete="off"
                        size="large"
                        style={{
                            borderRadius: "8px",
                            border: "1px solid #d9d9d9",
                        }}
                        placeholder="Phone number"
                    />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{ required: true, message: "Please enter your password" }]}
                >
                    <Input.Password
                        autoComplete="off"
                        size="large"
                        style={{
                            borderRadius: "8px",
                            border: "1px solid #d9d9d9",
                        }}
                        placeholder="Password"
                    />
                </Form.Item>

                <Flex justify="space-between" align="center" style={{ marginBottom: "20px" }}>
                    <Form.Item name="remember" valuePropName="checked" style={{ margin: 0 }}>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                    <Link to="/forgot-password" style={{ color: "#1677ff" }}>
                        Forgot password?
                    </Link>
                </Flex>

                <Form.Item style={{ marginBottom: 0 }}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        size="large"
                        style={{
                            width: "100%",
                            height: "45px",
                            borderRadius: "8px",
                            fontWeight: "500"
                        }}
                    >
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </Flex>
    )
}