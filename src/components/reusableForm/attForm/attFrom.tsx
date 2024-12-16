import { Form, Input, Button, Card, Space, Skeleton } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { AttributeData, FormData } from "../../../types/dataTypes";
import { FormListFieldData, FormListOperation } from "antd/lib/form/FormList";

export const AttForm: React.FC<FormData> = ({ data, isLoading, submit }) => {
    const [form] = Form.useForm();

    const initialValues = {
        attribute: data?.attribute?.map((item: AttributeData) => ({
            title: item.title,
            value: item.value,
        }))
    };

    return (
        <>
            {isLoading ? <Skeleton /> : (
                <Form 
                    form={form} 
                    initialValues={initialValues} 
                    onFinish={submit}
                    labelCol={{ span: 6 }} 
                    wrapperCol={{ span: 6 }} 
                    name="dynamic-form-item" 
                    autoComplete="off"
                >
                    <Form.List name="attribute">
                        {(fields: FormListFieldData[], 
                          { add, remove }: FormListOperation) => (
                            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                                {fields.map((field: FormListFieldData) => (
                                    <Card 
                                        key={field.key} 
                                        title={`Item ${field.name + 1}`}
                                        extra={<CloseOutlined onClick={() => remove(field.name)} />}
                                        style={{ marginBottom: '16px' }}
                                    >
                                        <Form.Item 
                                            name={[field.name, "title"]} 
                                            label="Name" 
                                            rules={[{required: true, message: "Please enter title"}]}
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item  
                                            label="Attribute" 
                                            rules={[{required: true, message: "Please enter value"}]}
                                        >
                                            <Form.List name={[field.name, "value"]}>
                                                {(subFields: FormListFieldData[], 
                                                  { add: addSub, remove: removeSub }: FormListOperation) => (
                                                    <div style={{ paddingLeft: '24px' }}>
                                                        {subFields.map((subField: FormListFieldData) => (
                                                            <Space 
                                                                key={subField.key} 
                                                                style={{ display: 'flex', marginBottom: '8px' }}
                                                            >
                                                                <Form.Item 
                                                                    name={[subField.name, "title"]} 
                                                                    noStyle 
                                                                    rules={[{required: true, message: "Please enter title"}]}
                                                                >
                                                                    <Input placeholder="Title" />
                                                                </Form.Item>
                                                                <CloseOutlined 
                                                                    onClick={() => removeSub(subField.name)}
                                                                    style={{ cursor: 'pointer' }}
                                                                />
                                                            </Space>
                                                        ))}
                                                        <Button 
                                                            type="primary" 
                                                            onClick={() => addSub()} 
                                                            block
                                                            style={{ marginTop: '8px' }}
                                                        >
                                                            Add
                                                        </Button>
                                                    </div>
                                                )}
                                            </Form.List>
                                        </Form.Item>
                                    </Card>
                                ))}
                                <Button 
                                    type="primary" 
                                    onClick={() => add()} 
                                    block
                                    style={{ marginBottom: '16px' }}
                                >
                                    Add item
                                </Button>
                            </div>
                        )}
                    </Form.List>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>Submit</Button>
                    </Form.Item>
                </Form>
            )}
        </>
    );
};

