"use client";

import { FaHeart } from "react-icons/fa";
import Link from "next/link";
import { useAppSelector } from "@/hooks/redux.hooks"; // Assuming you're using Redux

const WishlistIcon = () => {
  const wishlistItems = useAppSelector((state) => state.products.wishlist);

  return (
    <Link href="/wishlist">
      <div className="relative">
        <FaHeart />
        <span className="absolute font-titleFont top-3 -right-2 text-xs w-4 h-4 flex items-center justify-center rounded-full bg-black text-white">
          {wishlistItems.length > 0 ? wishlistItems.length : 0}
        </span>
      </div>
    </Link>
  );
};

export default WishlistIcon;
