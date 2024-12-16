import { Form, Input, Button, Upload, UploadFile, Spin } from "antd"
import { UploadOutlined } from "@ant-design/icons"
import { FormData, FormValues } from "../../types/dataTypes"
import { useEffect, useState } from "react";

export const ReusableForm: React.FC<FormData> = ({
    data,
    isLoading,
    defaultFileList,
    submit,
    isParentCategory = false
}) => {
    const [form] = Form.useForm<FormValues>();
    const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || []);

    useEffect(() => {
        if (data) {
            form.setFieldsValue({
                title: data.title,
            });

            if (data.image) {
                setFileList([{
                    uid: "-1",
                    status: "done",
                    url: data.image,
                    name: 'image'
                }]);
            }
        }
    }, [form, data]);

    const handleSubmit = (values: any) => {
        if (isParentCategory && !fileList.length) {
            form.setFields([{
                name: 'image',
                errors: ['Image is required for parent category!']
            }]);
            return;
        }

        if (submit) {
            const formData = {
                ...values,
                image: fileList
            };
            submit(formData);
        }
    };

    return (
        <>
            {isLoading ? (
                <Spin />
            ) : (
                <Form
                    form={form}
                    onFinish={handleSubmit}
                    initialValues={data}
                    layout="vertical"
                    requiredMark={false}
                >
                    <Form.Item
                        label={<span style={{ fontSize: '18px', fontWeight: 600 }}>Title</span>}
                        name="title"
                        rules={[{ required: true, message: "Title is required" }]}
                    >
                        <Input
                            placeholder="Enter title"
                            style={{ width: '400px', height: 40 }}
                        />
                    </Form.Item>

                    <Form.Item
                        label={<span style={{ fontSize: '18px', fontWeight: 600 }}>Image</span>}
                        name="image"
                        rules={[
                            { 
                                required: isParentCategory,
                                validator: async (_, value) => {
                                    if (isParentCategory && (!value || !fileList.length)) {
                                        throw new Error('Image is required for parent category!');
                                    }
                                }
                            }
                        ]}
                    >
                        <Upload
                            listType="picture-card"
                            maxCount={1}
                            fileList={fileList}
                            beforeUpload={() => false}
                            accept="image/*"
                            onChange={({ fileList: newFileList }) => {
                                setFileList(newFileList);
                                form.setFieldValue('image', newFileList);
                            }}
                        >
                            {fileList.length === 0 && (
                                <div>
                                    <UploadOutlined />
                                    <div style={{ marginTop: 8 }}>Upload</div>
                                </div>
                            )}
                        </Upload>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={isLoading}
                            style={{ width: "200px" }}
                        >
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            )}
        </>
    );
};
