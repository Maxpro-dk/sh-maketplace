import { useNavigate } from "react-router";
import AddItemInterface from "../components/AddItem";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import ItemsList from "../components/ItemsList";
import { useEffect, useState } from "react";


export default function MyProducts() {
  const [isNewItem, setIsNewItem] =  useState(false);

 
  return (
    <>
      <PageMeta
        title="React.js Ecommerce Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Ecommerce Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
       <PageBreadcrumb pageTitle="Mes  Biens" />
       <div className="flex  items-end">
          <AddItemInterface onItemAdded={() => { 
            setIsNewItem(!isNewItem);
            console.log("product  saved now");
            
            }} />
       </div>
       
      <div className="grid grid-cols-12 gap-4 md:gap-6">
          <div className="col-span-12">
               <ItemsList itemChanged={isNewItem}  typeItem='uncertified' />
          </div>
      </div>
    </>
  );
}
