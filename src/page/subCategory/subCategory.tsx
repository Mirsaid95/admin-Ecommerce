import { useGetSubCategory } from "../../service/query/useGetSub";
import { inData, textType } from "../../types/dataTypes";
import { useDeleteData } from "../../service/mutation/useDeleteData";
import { useQueryClient } from "@tanstack/react-query";
import { Button, Image,Table,Flex,message,Popconfirm } from "antd";
import { Link } from "react-router-dom";



export const SubCategory = () => {
    const { data, isLoading } = useGetSubCategory();
    const { mutate } = useDeleteData();
    const queryClient = useQueryClient();

    const dataSource = data?.results.map((item: inData) => ({
        id: item.id,
        key: item.id,
        title: item?.title,
        image: item?.image,
        parent: item?.parent,
    }))

    const deleteHandler = (id: number) => {
        mutate(id, {
            onSuccess: () => {
                message.success("Sub Category deleted successfully");
                queryClient.invalidateQueries({ queryKey: ["sub-category"] });
            },
            onError: (error) => {
                message.error(error.message);
            }
        })
    }
    const columns: textType[] = [
        {
            title: "Id",
            dataIndex: "id",
            key: "id"
        },
        {
            title: "Parent",
            dataIndex: "parent",
            key: "parent"
        },
        {
            title: "Image",
            dataIndex: "image",
            key: "image",
            render: (image: string) => <Image src={image} alt="sub-category" width={100} height={100} />
        },
        {
            title: "Name",
            dataIndex: "title",
            key: "title",
            render: (title: string) => (
                <h4 style={{fontSize: "16px", fontWeight: "bold"}}>{title}</h4>
            )
        },
        {
            title: "Action",
            key: "action",
            dataIndex: "action",
            render: (_, record: inData) => (
                <Flex gap={10}>
                    <Link to={`/app/edit-category/${record.id}`}>
                        <Button type="primary">
                            Edit
                        </Button>
                    </Link>
                    <Popconfirm title="Are you sure you want to delete this sub category?" onConfirm={() => deleteHandler(record.id)} okText="Yes" cancelText="No">
                        <Button type="primary" danger>
                            Delete
                        </Button>
                    </Popconfirm>
                </Flex>
            )
        }
           
    ]

    return (
        <div>
            <Link to="/sub-category/create-sub-category">
                <Button type="primary">
                    Create Sub Category
                </Button>
            </Link>
            <Table dataSource={dataSource} columns={columns} loading={isLoading} />
        </div>
    )
}