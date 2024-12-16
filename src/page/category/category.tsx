import { Button, Flex, message, Table, Image, Popconfirm } from "antd";
import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteData } from "../../service/mutation/useDeleteData";
import { useGetData } from "../../service/query/useGetData";
import { textType, inData, DataTypes } from "../../types/dataTypes";

export const Category = () => {
    const { data, isLoading } = useGetData();
    const { mutate } = useDeleteData();
    const client = useQueryClient();

    const tableData: inData[] = data?.results?.map((item: DataTypes['results'][0]) => ({
        id: item.id,
        key: item.id,
        title: item.title,
        image: item.image,
        description: '',
        parent: item.parent?.image || null,
        category: null
    })) || [];

    const handleDelete = (id: number) => {
        mutate(id, {
            onSuccess: () => {
                message.success("Category deleted successfully");
                client.invalidateQueries({ queryKey: ['useData'] });
            },
            onError: (error: any) => {
                const errorMessage = error.response?.data?.message || "Failed to delete category";
                message.error(errorMessage);
            }
        });
    };

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
            title: "Actions",
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
        <div>
            <Flex justify="space-between" align="center" style={{ marginBottom: 20 }}>
                <h2>Categories</h2>
                <Link to="/app/create-category">
                    <Button type="primary" size="large">
                        Create Category
                    </Button>
                </Link>
            </Flex>

            <Table 
                columns={columns}
                dataSource={tableData}
                loading={isLoading}
                bordered
                size="large"
                pagination={{
                    pageSize: 10,
                    showSizeChanger: true,
                    showTotal: (total) => `Total ${total} items`
                }}
            />
        </div>
    );
};
