import { ReusableForm } from "../reusableForm";
import { useCreateData } from "../../service/mutation/useCreateData";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { message, Form, Tabs } from "antd";
import { FormValues } from "../../types/dataTypes";

export const CategoryAddTab = () => {
    const { mutate, data: categoryData } = useCreateData();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<string>("1");

    const handleSubmit = (values: FormValues) => {
        try {
            const formData = new FormData();
            formData.append("title", values.title);
            
            if (!values.image?.[0]?.originFileObj) {
                message.error("Image is required for parent category!");
                return;
            }
            
            formData.append("image", values.image[0].originFileObj);

            mutate(formData, {
                onSuccess: () => {
                    message.success("Category created successfully");
                    form.resetFields();
                    setActiveTab("2");
                },
                onError: (error: any) => {
                    message.error(error?.response?.data?.status || "Failed to create category");
                }
            });

        } catch (error) {
            message.error("An error occurred while processing the form");
        }
    };

    const handleSubmitSub = (values: FormValues) => {
        try {
            const formData = new FormData();
            formData.append("title", values.title);
            
            if (!values.image || !values.image[0]?.originFileObj) {
                message.error("Image is required!");
                return;
            }
            
            formData.append("image", values.image[0].originFileObj);

            if (categoryData?.id) {
                formData.append("parent", categoryData.id.toString());
            } else {
                message.error("Parent category is required");
                return;
            }

            mutate(formData, {
                onSuccess: () => {
                    message.success("Sub category created successfully");
                    form.resetFields();
                    navigate("/app/category");
                },
                onError: (error: any) => {
                    const errorMessage = error.response?.data?.status || "Failed to create sub category";
                    message.error(errorMessage);
                }
            });

        } catch (error) {
            message.error("An error occurred while creating sub category");
        }
    };

    const tabItems = [
        {
            key: "1",
            label: <span style={{ fontSize: '18px', fontWeight: 600 }}>Category</span>,
            children: <ReusableForm 
                submit={handleSubmit} 
                formForCreate={form} 
                isParentCategory={true}
            />
        },
        {
            key: "2",
            label: <span style={{ fontSize: '18px', fontWeight: 600 }}>Sub Category</span>,
            disabled: !categoryData?.id,
            children: <ReusableForm 
                submit={handleSubmitSub} 
                formForCreate={form}
                isParentCategory={false}
            />
        }
    ];

    return (
        <>
            <Tabs 
                items={tabItems} 
                activeKey={activeTab}
                onChange={setActiveTab}
            />
        </>
    );
}