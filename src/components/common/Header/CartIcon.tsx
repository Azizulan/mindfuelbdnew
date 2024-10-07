import { getCartInfo } from "@/lib/cart-info";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";

const CartIcon = async () => {
  const products = await getCartInfo();
  const cartCount = products?.lines.length;

  return (
    <Link href="/cart">
      <div className="relative cursor-pointer">
        <FaShoppingCart />
        <span className="absolute font-titleFont top-3 -right-2 text-xs w-4 h-4 flex items-center justify-center rounded-full bg-primeColor text-white">
          {cartCount !== undefined && cartCount > 0 ? cartCount : 0}
        </span>
      </div>
    </Link>
  );
};

export default CartIcon;
