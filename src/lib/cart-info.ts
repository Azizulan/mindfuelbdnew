import { CartInfo } from "@/interface/cart";
import { cookies } from "next/headers";
import { getCart } from "./shopify/shopify";

export const getCartInfo = async (): Promise<CartInfo | undefined> => {
  const cartId = cookies().get("cartId")?.value;

  if (!cartId) return;

  const cartInfo = await getCart(cartId);
  return cartInfo as unknown as CartInfo;
};

