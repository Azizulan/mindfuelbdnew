"use client";

import Pagination from "./Pagination"; 
import ProductBanner from "@/app/(main)/shop/_components/ProductBanner";
import { ProductsList } from "@/interface";
import { useState } from "react";

interface ProductsDisplayProps {
  products: ProductsList[]
}

const ProductsDisplay = ({ products }: ProductsDisplayProps) => {
  const [itemsPerPage, setItemsPerPage] = useState<number>(12);
  
  const itemsPerPageFromBanner = (itemsPerPage: number) => {
    setItemsPerPage(itemsPerPage);
  };


  return (
    <div className="w-full mdl:w-[80%] lgl:w-[75%] h-full flex flex-col gap-10">
    <ProductBanner itemsPerPageFromBanner={itemsPerPageFromBanner} />
    <Pagination itemsPerPage={itemsPerPage} products={products}  />
  </div>
  )
}

export default ProductsDisplay