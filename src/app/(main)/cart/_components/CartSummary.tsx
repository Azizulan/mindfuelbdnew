import React from 'react';
import CheckoutButton from './CheckoutButton';

interface CartSummaryProps {
  totalAmt: number;
  shippingCharge: number;
  checkOutUrl: string;
}

const CartSummary: React.FC<CartSummaryProps> = ({ totalAmt, shippingCharge, checkOutUrl }) => {
  return (
    <div className="max-w-7xl gap-4 flex justify-end mt-4">
      <div className="w-full mdl:w-96 flex flex-col gap-4 p-6 border rounded-md shadow-sm">
        <h1 className="text-2xl font-semibold text-right">Cart Totals</h1>
        <div>
          {["Subtotal", "Shipping Charge", "Total"].map((label, index) => (
            <p
              key={label}
              className={`flex items-center justify-between border-b-[1px] border-gray-400 py-1.5 text-lg px-4 font-medium ${
                index === 2 ? "font-bold" : "font-semibold"
              }`}
            >
              {label}
              <span className="tracking-wide text-lg">
                ৳
                {label === "Subtotal"
                  ? totalAmt.toFixed(2)
                  : label === "Shipping Charge"
                  ? shippingCharge
                  : (totalAmt + shippingCharge).toFixed(2)}
              </span>
            </p>
          ))}
        </div>

        <CheckoutButton checkOutUrl={checkOutUrl} />
      </div>
    </div>
  );
};

export default CartSummary;
