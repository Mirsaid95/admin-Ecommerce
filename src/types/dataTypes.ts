import { FormInstance } from "antd";
import { RcFile, UploadFile } from "antd/es/upload";
import { ReactNode } from "react";

export interface DataTypes {
    count: number;
    next?: string;
    previous?: string;
    results: {
        id: number;
        title: string;
        image: string;
        parent?: {
            image: string;
        }
    }[];
}

export interface CreateData {
    title: string;
    image: string;
}

export interface FormDataType {
    title: string;
    image?: string;
}

export interface FormValues {
    title: string;
    image?: UploadFile[];
}

export interface FormData {
    submit?: (values: FormValues) => void;
    data?: FormDataType;
    formForCreate?: FormInstance;
    isLoading?: boolean;
    defaultFileList?: UploadFile[];
    isParentCategory?: boolean;
}

export interface UserDataTypes {
    key: string,
    name: string,
    age: number,
    phone: number,
    address: string
}

export interface inData {
    children: any;
    id: number;
    title: string;
    image: string;
    key: number;
    description: string;
    parent?: string | null;
    category?: string | number

}

export interface textType {
    title: string;
    dataIndex: string;
    key: string;
    width?: string;
    align?: "left" | "right" | "center";
    render?: (value: any, record: inData) => ReactNode;
}



export interface TpropsType {
    key: string,
    label: string,
    children?: React.FC,
    disabled?: boolean
}

export interface FormInData{
    parnet?: string | boolean,
    title?: string,
    description?: string,
    image?: {file: RcFile},
    is_new?: boolean,
    is_available?: boolean,
    category?: string |  number,
    price?: number,
}

export interface AttributeData {
    category?: string | number[],
    id?: number,
    key?: number,
    title?: string,
    value?: string[],
}
export interface AttributeType {
    title?: string,
    value?: string[],
    categoryId?: string | number,
    attributeId?: string | number,
    attribute_value?:[],
}

export interface AttributeValue {
    title: string;
    attributes?: AttributeData[];
    value?: {
        value?: string;
        valueid?: number;
    }[];
    categoryId?: string | number[];
    attributeId?: string | number[];
    attributeValueId?: string | number[];
}


