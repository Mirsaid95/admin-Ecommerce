import { nanoid } from "nanoid";
import React from "react";
import { Category } from "../page/category/category";
import { CategoryAddTab } from "../components/addTab/categoryAddTab";
import { EditTab } from "../components/editTab/editTab";
import { SubCategory } from "../page/subCategory/subCategory";
import { CreateSubCategory } from "../components/createSub/createSub";

interface RouteType {
    component: React.FC;
    id: string;
    path?: string;
    name: string;
}

export const Routers: RouteType[] = [
    {
        id: nanoid(),
        component: Category,
        name: "Category",
        path: "category"
    },
    {
        id: nanoid(),
        component: CategoryAddTab,
        name: "Create Category",
        path: "create-category"
    },
    {
        id: nanoid(),
        component: SubCategory,
        name: "Sub Category",
        path: "sub-category"
    },
    {
        id: nanoid(),
        component: EditTab,
        name: "Edit Category",
        path: "edit-category/:id"
    },
    {
        id: nanoid(),
        component: CreateSubCategory,
        name: "Create Sub Category",
        path: "sub-category/create-sub-category"
    }   
]; 