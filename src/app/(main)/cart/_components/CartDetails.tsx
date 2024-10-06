"use client";

import { useAppDispatch } from "@/hooks/redux.hooks";
import { TransformedCartInfo } from "@/interface/cart";
import { resetCart } from "@/redux/product";
import { useEffect, useState } from "react";
import CartSummary from "./CartSummary";
import ShippingOptions from "./ShippingOptions";
import ItemList from "./ItemList";
import EmptyCart from "./EmptyCart";

const shippingCharges = {
  insideDhaka: 60,
  surroundingDhaka: 100,
  outsideDhaka: 115,
};

interface CartInfoProps {
  cartInfo: TransformedCartInfo;
  checkOutUrl: string;
}

const CartDetails: React.FC<CartInfoProps> = ({ cartInfo, checkOutUrl }) => {
  const dispatch = useAppDispatch();
  const [cartData, setCartData] = useState<TransformedCartInfo>(cartInfo);

  const [totalAmt, setTotalAmt] = useState<number>(0);
  const [shippingCharge, setShippingCharge] = useState<number>(shippingCharges.insideDhaka);
  const [selectedShipping, setSelectedShipping] = useState<string>('insideDhaka');

  useEffect(() => {
    setCartData(cartInfo);
  }, [cartInfo]);

  const handleResetCart = () => {
    dispatch(resetCart());
    setCartData({ totalItems: 0, totalCost: undefined, currency: undefined, products: [] });
    setTotalAmt(0);
    setShippingCharge(shippingCharges.insideDhaka);
  };

  useEffect(() => {
    if (cartData.products.length > 0) {
      const price = cartData.products.reduce(
        (acc, item) => acc + (Number(item.price) || 0) * item.quantity,
        0
      );
      setTotalAmt(price);
      setShippingCharge(shippingCharges[selectedShipping as keyof typeof shippingCharges]);
    } else {
      setTotalAmt(0);
      setShippingCharge(0);
    }
  }, [cartData.products, selectedShipping]);

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const shippingOption = e.target.value as keyof typeof shippingCharges;
    setSelectedShipping(shippingOption);
    setShippingCharge(shippingCharges[shippingOption]);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {cartData.products.length > 0 ? (
        <div className="pb-20">
          <ItemList cartData={cartData} />

          <button
            onClick={handleResetCart}
            className="py-2 px-10 bg-red-500 text-white font-semibold uppercase mb-4 hover:bg-red-700 duration-300"
          >
            Reset Cart
          </button>

          <ShippingOptions
            selectedShipping={selectedShipping}
            handleShippingChange={handleShippingChange}
            shippingCharges={shippingCharges}
          />

          <CartSummary
            totalAmt={totalAmt}
            shippingCharge={shippingCharge}
            checkOutUrl={checkOutUrl}
          />
        </div>
      ) : (
        <EmptyCart />
      )}
    </div>
  );
};

export default CartDetails;
