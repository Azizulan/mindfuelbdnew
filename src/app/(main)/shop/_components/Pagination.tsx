"use client";

import ProductCard from "@/components/product/ProductCards";
import { ProductsList } from "@/interface";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import React from "react";

// Component to display current items
const Items = ({ currentItems }: { currentItems: ProductsList[] }) => (
  <>
    {currentItems && currentItems.length > 0 && currentItems?.map((item) => (
      <div key={item._id} className="w-full">
        <ProductCard {...item} />
      </div>
    ))}
  </>
);

const Pagination = ({
  itemsPerPage,
  products,
}: {
  itemsPerPage: number;
  products: ProductsList[];
}) => {
  const [itemOffset, setItemOffset] = useState<number>(0);
  const items = products;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Handles page click and sets the new item offset
  const handlePageClick = (event: { selected: number }) => {
    const newOffset = event.selected * itemsPerPage;
    setItemOffset(newOffset);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mdl:gap-4 lg:gap-10">
        <Items currentItems={currentItems} />
      </div>

      <div className="flex flex-col mdl:flex-row justify-center mdl:justify-between items-center">
        <ReactPaginate
          nextLabel=""
          previousLabel=""
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          pageLinkClassName="w-9 h-9 border-[1px] border-lightColor hover:border-gray-500 duration-300 flex justify-center items-center"
          pageClassName="mr-6"
          containerClassName="flex text-base font-semibold font-titleFont py-10"
          activeClassName="bg-black text-white"
        />
        <p className="text-base font-normal text-lightText">
          Products from {itemOffset + 1} to {endOffset} of {items.length}
        </p>
      </div>
    </div>
  );
};

export default Pagination;
