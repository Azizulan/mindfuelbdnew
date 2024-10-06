import React from 'react';
import { TransformedCartInfo } from '@/interface/cart';
import ItemCard from './ItemCard';

interface ItemListProps {
  cartData: TransformedCartInfo;
}

const ItemList: React.FC<ItemListProps> = ({ cartData }) => {
  return (
    <div>
      <div className="w-full h-20 bg-[#F5F7F7] text-primeColor hidden lgl:grid grid-cols-5 place-content-center px-6 text-lg font-titleFont font-semibold">
        <h2 className="col-span-2">Product</h2>
        <h2>Price</h2>
        <h2>Quantity</h2>
        <h2>Sub Total</h2>
      </div>
      <div className="mt-5">
        {cartData.products.map((item, index) => (
          <ItemCard key={`${item.id}-${index}`} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ItemList;
