"use client";

import { ProductsList } from "@/interface";
import { urlGenerate } from "@/utils/urlGenerate";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { BsSuitHeartFill } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineLabelImportant } from "react-icons/md";
import AddToCartButton from "./AddToCartButton";

type ProductCardProps = ProductsList;

const ProductCard: React.FC<ProductCardProps> = (props: any) => {
  const { image, price, _id, title, variantId } = props;

  const router = useRouter();
  const rootId = urlGenerate(title, _id);

  // Navigate to product details page
  const handleProductDetails = () => {
    router.push(`/product/${rootId}`);
  };

  const handleAction = (action: string) => {
    console.log("action", action);
  };

  // Reusable function to render action list items
  const renderActionItem = (
    label: string,
    Icon: React.ReactNode,
    onClick: () => void
  ) => (
    <li
      onClick={onClick}
      className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 cursor-pointer pb-1 duration-300 w-full"
    >
      {label} {Icon}
    </li>
  );

  return (
    <div className="w-full relative group">
      <div className="max-w-80 max-h-80 relative overflow-y-hidden">
        <Image
          className="w-full h-full"
          src={image}
          height={500}
          width={500}
          alt={title}
        />

        {/* Product actions that appear on hover */}
        <div className="w-full h-32 absolute bg-white -bottom-[130px] group-hover:bottom-0 duration-700">
          <ul className="w-full h-full flex flex-col items-end justify-center gap-2 font-titleFont px-2 border-l border-r">
            {/* AddToCartButton Component */}
            <li className="w-full flex justify-end">
              <AddToCartButton
                className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 cursor-pointer pb-1 duration-300 w-full"
                variantId={Number(variantId)}
              >
                <FaShoppingCart className="mr-1" /> Add to Cart
              </AddToCartButton>
            </li>
            {renderActionItem(
              "View Details",
              <MdOutlineLabelImportant />,
              handleProductDetails
            )}
            {renderActionItem("Add to Wish List", <BsSuitHeartFill />, () =>
              handleAction("wishlist")
            )}
          </ul>
        </div>
      </div>

      {/* Product information */}
      <div className="max-w-80 py-6 flex flex-col gap-1 border-[1px] border-t-0 px-4">
        <div className="flex items-center justify-between font-titleFont">
          <h2 className="text-lg text-primeColor font-bold">{title}</h2>
          <p className="text-[#767676] text-[14px]">${price}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

