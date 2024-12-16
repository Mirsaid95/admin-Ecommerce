import { Form, message, Tabs } from "antd";
import { useNavigate } from "react-router-dom";
import { useCreateSub } from "../../service/mutation/useCreateSub";
import { useCreateAttribute } from "../../service/mutation/useCreateAttribute";
import { SubForm } from "../reusableForm/subForm/subForm";
import { AttForm } from "../reusableForm/attForm/attFrom";
import { TpropsType, AttributeData, AttributeValue } from "../../types/dataTypes";
import { RcFile } from "antd/es/upload";
import { useState } from "react";

export const CreateSubCategory = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<string>("1");
    
    const { mutate: createSub, data: createSubData } = useCreateSub();
    const { mutate: createAttribute } = useCreateAttribute();
    
    const subcategoryId = createSubData?.id;

    const handleTabChange = (key: string) => {
        const isInvalidTabChange = 
            (key === "2" && activeTab === "1") || 
            (key === "1" && activeTab === "2");

        if (isInvalidTabChange) {
            message.error("Iltimos, barcha maydonlarni to'ldiring");
            return;
        }
        setActiveTab(key);
    };

    const handleSubcategorySubmit = (values: {
        title: string;
        image: { file: RcFile };
        parent: string;
    }) => {
        const formData = new FormData();
        formData.append("title", values.title);
        
        if (values.image) {
            formData.append("image", values.image.file);
        }
        
        formData.append("parent", values.parent);

        createSub(formData, {
            onSuccess: () => {
                message.success("Subkategoriya muvaffaqiyatli yaratildi");
                form.resetFields();
                setActiveTab("2");
            },
            onError: () => {
                message.error("Subkategoriya yaratishda xatolik yuz berdi");
            },
        });
    };

    const handleAttributeSubmit = (data: AttributeValue) => {
        const formattedData = {
            listen: data?.attributes?.map((item: AttributeData) => ({
                category: [subcategoryId],
                title: item?.title,
                value: item?.value?.map((val: any) => val?.value) || [],
            })),
        };

        createAttribute(formattedData, {
            onSuccess: () => {
                message.success("Atribut muvaffaqiyatli yaratildi");
                navigate("/sub-category");
            },
            onError: () => {
                message.error("Atribut yaratishda xatolik yuz berdi");
            },
        });
    };

    const tabItems: TpropsType[] = [
        {
            key: "1",
            label: <span style={{ fontSize: '18px', fontWeight: 600 }}>Sub category</span>,
            children: 
                <SubForm 
                    formForCreate={form} 
                    submit={handleSubcategorySubmit}
                    requireParentCategory={true}
                    isParentCategory={false}
                />
        },
        {
            key: "2",
            label: <span style={{ fontSize: '18px', fontWeight: 600 }}>Attribute</span>,
            children: (
                <AttForm 
                    data={data} 
                    isLoading={false}
                    submit={handleAttributeSubmit}
                    defaultFileList={[]}
                    isParentCategory={false}
                    formForCreate={form}
                />
            )
        }
    ];

    return (
        <div style={{ padding: '24px' }}>
            <Tabs 
                items={tabItems} 
                activeKey={activeTab} 
                onChange={handleTabChange}
                style={{
                    background: 'white',
                    padding: '24px',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
            />
        </div>
    );
};
