import { useGetSingle } from "../../service/query/useGetSingle";
import { useGetData } from "../../service/query/useGetData";
import { useDeleteData } from "../../service/mutation/useDeleteData";
import { useEditeData } from "../../service/mutation/useEditeData";
import { ReusableForm } from "../reusableForm";
import { textType, FormInData, inData } from "../../types/dataTypes";
import { useNavigate, useParams, Link } from "react-router-dom";
import { message, UploadFile } from "antd";
import { Tabs, Button, Table, Flex, Image, Popconfirm } from "antd";
import { useQueryClient } from "@tanstack/react-query";


export const EditTab = () => {
    const { id } = useParams();
    const { data: categoryData, isLoading } = useGetSingle(Number(id));
    const { mutate: deleteData } = useDeleteData();
    const { mutate } = useEditeData();
    const { data } = useGetData();
    const client = useQueryClient();
    const navigate = useNavigate();

    const handleSubmit = (data: FormInData) => {
        const formData = new FormData();
        formData.append("title", data.title || '');
        if (data?.image?.file) {
            formData.append("image", data.image.file);
        }
        mutate({ id: Number(id), data: formData }, {
            onSuccess: () => {
                message.success("Category edited successfully");
                client.invalidateQueries({ queryKey: ["category"] });
                navigate("/app");
            },
            onError: () => {
                message.error("Failed to edit category");
            }
        })
    }

    const handleDelete = (id: number) => {
        deleteData(Number(id), {
            onSuccess: () => {
                message.success("Category deleted successfully");
                client.invalidateQueries({ queryKey: ["category"] });
                navigate("/category");
            },
            onError: () => {
                message.error("Failed to delete category");
            }
        })
    }
    const defaultFileList: UploadFile[] = categoryData?.image ? [{
        uid: categoryData.image.id,
        name: categoryData.image.name,
        status: "done",
        url: categoryData.image.url
    }] : [];
    const dataSource = data?.results
    ?.filter((item: inData) => item.id === Number(id)).flatMap((item: inData) => item?.children?.map((child: inData) => ({
        key: child.id,
        title: child.title,
        image: child.image,
        id: child.id,
    }))) || [];

    const columns: textType[] = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            width: "80px",
            align: "center"
        },
        {
            title: "Image",
            dataIndex: "image",
            key: "image",
            align: "center",
            render: (image: string) => (
                <Image
                    src={image}
                    alt="Category"
                    style={{ width: 70, height: 70, objectFit: 'cover' }}
                />
            ),
        },
        {
            title: "Name",
            dataIndex: "title",
            key: "title",
            align: "center",
            render: (title: string) => (
                <span style={{ fontSize: 16, fontWeight: 500 }}>
                    {title}
                </span>
            ),
        },
        {
            title: "Action",
            dataIndex: "actions",
            key: "actions",
            align: "center",
            width: "200px",
            render: (_: any, record: inData) => (
                <Flex gap={10} justify="center">
                    <Link to={`/app/edit-category/${record.id}`}>
                        <Button
                            type="primary"
                            style={{ backgroundColor: "#f1cf0f" }}
                        >
                            Edit
                        </Button>
                    </Link>
                    <Popconfirm
                        title="Are you sure you want to delete this category?"
                        description="This action cannot be undone"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Yes"
                        cancelText="No"
                        okButtonProps={{ danger: true }}
                    >
                        <Button
                            type="primary"
                            danger
                        >
                            Delete
                        </Button>
                    </Popconfirm>
                </Flex>
            ),
        },
    ];

    return (
        <>
        <Tabs defaultActiveKey="1"
        items={[
            {
                key: "1",
                label: <span style={{ fontSize: "18px", fontWeight: 600 }}>Edit Category</span>,
                children: <ReusableForm submit={(values) => handleSubmit(values as FormInData)} data={categoryData}  isLoading={isLoading} defaultFileList={defaultFileList} />
            },
            {
                key: "2",
                label: <span style={{ fontSize: "18px", fontWeight: 600 }}>Edit Sub Category</span>,
                children: <Table dataSource={dataSource} columns={columns} loading={isLoading} bordered size="large" />
            }
        ]}>

        </Tabs>
        </>
    )
};