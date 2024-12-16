import { Button, Form, Input, message, Upload, Select, UploadFile } from "antd";
import { useGetData } from "../../../service/query/useGetData";
import { FormData, FormValues, inData } from "../../../types/dataTypes";
import { UploadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

export const SubForm: React.FC<FormData> = ({
    data, 
    isLoading, 
    defaultFileList, 
    isParentCategory,
    submit,
    requireParentCategory = true
}) => {
    const { data: categoryData } = useGetData()
    const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || []);
    const [form] = Form.useForm<FormValues>();

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
    }

    return (
        <Form 
            form={form} 
            onFinish={handleSubmit} 
            initialValues={data} 
            requiredMark={false}
            layout="vertical"
        >
            {requireParentCategory && (
                <Form.Item 
                    name="parent" 
                    label="Parent Category" 
                    rules={[{ required: requireParentCategory, message: "Please select a parent category" }]}
                >
                    <Select 
                        options={categoryData?.result?.map((item: inData) => ({ 
                            label: item.title, 
                            value: item.id 
                        }))} 
                        placeholder="Select parent category"
                    />
                </Form.Item>
            )}
            
            <Form.Item 
                name="title" 
                label="Title" 
                rules={[{ required: true, message: "Please enter a title" }]}
            >
                <Input placeholder="Enter title" />
            </Form.Item>

            <Form.Item 
                name="image" 
                label="Image" 
                valuePropName="fileList" 
                rules={[{ 
                    required: isParentCategory, 
                    validator: async (_, value) => {
                        if (isParentCategory && (!value || !value.length)) {
                            throw new Error('Image is required for parent category!');
                        }
                    }
                }]}
            >
                <Upload 
                    listType="picture-card" 
                    beforeUpload={() => false} 
                    accept="image/*" 
                    onChange={({fileList: newFileList}) => {
                        setFileList(newFileList)
                        form.setFieldValue('image', newFileList)
                    }}
                    maxCount={1}
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
    )   
}
