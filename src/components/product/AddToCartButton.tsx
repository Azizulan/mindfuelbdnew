"use client";

import { addItem } from "@/app/actions/cart";
import { useAppDispatch } from "@/hooks/redux.hooks";
import { addToCart } from "@/redux/product";
import React, { useState, useTransition } from "react";
import { toast } from "sonner";

interface Props {
  className: string;
  children: React.ReactNode;
  variantId: string | number;
}

const AddToCartButton = ({ className, children, variantId }: Props) => {
  const dispatch = useAppDispatch();
  const [isPending, startTransition] = useTransition(); 
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);

    startTransition(async () => {
      try {
        const cartInfo = await addItem(variantId);
        if (cartInfo?.code && cartInfo.code === 200) {
          dispatch(addToCart(cartInfo.data));

          toast.success("Product added to cart");
        } else {
          toast.error("Failed to add product");
        }
      } catch (error) {
        toast.error(`An error occurred: ${error instanceof Error ? error.message : String(error)}`);
      } finally {
        setIsLoading(false);
      }
    });
  };

  return (
    <button className={className} onClick={handleClick} disabled={isLoading || isPending}>
      {children}
    </button>
  );
};

export default AddToCartButton;
