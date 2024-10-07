"use client";

import { removeItem, updateItemQuantity } from "@/app/actions/cart";
import { useAppDispatch } from "@/hooks/redux.hooks";
import { CartProduct } from "@/interface/cart";
import { decreaseQuantity, increaseQuantity } from "@/redux/product";
import Image from "next/image";
import { useEffect, useState, useTransition } from "react";
import { ImCross } from "react-icons/im";
import { toast } from "sonner";

interface ItemCardProps {
  item: CartProduct;
}

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  const [quantity, setQuantity] = useState<number>(item.quantity);
  const [isPending, startTransition] = useTransition();
  const dispatch = useAppDispatch();

  useEffect(() => {
    setQuantity(item.quantity);
  }, [item.quantity]);

  const handleDeleteItem = async (id: string) => {
    const res = await removeItem(id);

    if (res?.code !== 200) {
      toast.error("Failed to remove item");
      return;
    }

    toast.success("Item removed from cart");
  };

  const handleIncreaseQuantity = (itemId: string, variantId: string) => {
    startTransition(async () => {
      try {
        const updatedQuantity = quantity + 1;
        const res = await updateItemQuantity({
          lineId: itemId,
          variantId: variantId,
          quantity: updatedQuantity,
        });

        if (res?.code !== 200) {
          toast.error("Failed to increase quantity");
          return;
        }

        setQuantity(updatedQuantity);
        dispatch(increaseQuantity({ _id: itemId }));
        toast.success("Quantity increased");
      } catch (error) {
        toast.error(
          `Error increasing quantity: ${
            error instanceof Error ? error.message : String(error)
          }`
        );
      }
    });
  };

  const handleDecreaseQuantity = (itemId: string, variantId: string) => {
    if (quantity > 1) {
      startTransition(async () => {
        try {
          const updatedQuantity = quantity - 1;
          const res = await updateItemQuantity({
            lineId: itemId,
            variantId: variantId,
            quantity: updatedQuantity,
          });

          if (res?.code !== 200) {
            toast.error("Failed to decrease quantity");
            return;
          }

          setQuantity(updatedQuantity);

          dispatch(decreaseQuantity({ _id: itemId }));
          toast.success("Quantity decreased");
        } catch (error) {
          toast.error(
            `Error decreasing quantity: ${
              error instanceof Error ? error.message : String(error)
            }`
          );
        }
      });
    } else {
      toast.error("Quantity cannot be less than 1");
    }
  };

  const itemPrice = Number(item.price);

  return (
    <div className="w-full grid grid-cols-5 mb-4 border py-2">
      <div className="flex col-span-5 mdl:col-span-2 items-center gap-4 ml-4">
        <ImCross
          onClick={() => handleDeleteItem(item.id)}
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
            onClick={() => handleDecreaseQuantity(item.id, item.variantId)}
            className="w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300"
          >
            -
          </span>
          <p>{quantity}</p>
          <span
            onClick={() => handleIncreaseQuantity(item.id, item.variantId)}
            className="w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300"
          >
            +
          </span>
        </div>
        <div className="w-1/3 flex items-center font-titleFont font-bold text-lg">
          <p>৳{(quantity * itemPrice).toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
