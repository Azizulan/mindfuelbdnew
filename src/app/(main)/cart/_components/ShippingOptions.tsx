import React from 'react';

interface ShippingOptionsProps {
  selectedShipping: string;
  handleShippingChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  shippingCharges: { [key: string]: number };
}

const ShippingOptions: React.FC<ShippingOptionsProps> = ({
  selectedShipping,
  handleShippingChange,
  shippingCharges,
}) => {
  return (
    <div className="flex flex-col gap-4 mt-6">
      <h2 className="text-xl font-semibold">Select Shipping Option:</h2>
      <div className="flex flex-col gap-2">
        {Object.entries(shippingCharges).map(([key]) => (
          <label key={key} className="flex items-center gap-2">
            <input
              type="radio"
              name="shipping"
              value={key}
              checked={selectedShipping === key}
              onChange={handleShippingChange}
            />
            <span className="text-lg font-medium">
              {key === "insideDhaka" && "ঢাকা মেট্রোপলিটনের মধ্যে — ৳60.00"}
              {key === "surroundingDhaka" && "সাভার, আশুলিয়া, নারায়ণগঞ্জ, দোহার — ৳100.00"}
              {key === "outsideDhaka" && "ঢাকা সিটির বাইরে সারা বাংলাদেশে — ৳115.00"}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default ShippingOptions;
