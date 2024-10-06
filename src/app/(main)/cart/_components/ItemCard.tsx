"use client";

import { CartProduct } from "@/interface/cart";

// import { decreaseQuantity, increaseQuantity, removeFromCart } from "@/redux/product";
import Image from "next/image";
import { ImCross } from "react-icons/im";

interface ItemCardProps {
  item: CartProduct;
}

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  const handleDeleteItem = () => {
    console.log("delete item");
  };

  const handleIncreaseQuantity = () => {
    console.log("increase quantity");
  };

  const handleDecreaseQuantity = () => {
    console.log("decrease quantity");
  };

  // Convert price to number to ensure consistency
  const itemPrice = Number(item.price);

  return (
    <div className="w-full grid grid-cols-5 mb-4 border py-2">
      <div className="flex col-span-5 mdl:col-span-2 items-center gap-4 ml-4">
        <ImCross
          onClick={handleDeleteItem}
          className="text-primeColor hover:text-red-500 duration-300 cursor-pointer"
        />
        <Image
          className="w-32 h-32"
          src={item?.image || ""}
          alt="productImage"
          width={100}
          height={100}
        />
        <h1 className="font-titleFont font-semibold">{item?.title || ""}</h1>
      </div>
      <div className="col-span-5 mdl:col-span-3 flex items-center justify-between py-4 mdl:py-0 px-4 mdl:px-0 gap-6 mdl:gap-0">
        <div className="flex w-1/3 items-center text-lg font-semibold">
          ৳{itemPrice.toFixed(2)}
        </div>
        <div className="w-1/3 flex items-center gap-6 text-lg">
          <span
            onClick={handleDecreaseQuantity}
            className="w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300"
          >
            -
          </span>
          <p>{item.quantity}</p>
          <span
            onClick={handleIncreaseQuantity}
            className="w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300"
          >
            +
          </span>
        </div>
        <div className="w-1/3 flex items-center font-titleFont font-bold text-lg">
          <p>৳{(item.quantity * itemPrice).toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;

