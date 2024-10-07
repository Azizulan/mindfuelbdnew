/* eslint-disable */

"use server";

import {
  addToCart,
  createCart,
  getCart,
  removeFromCart,
  updateCart,
} from "@/lib/shopify/shopify";
import { transformCartData } from "@/utils/cartUtils";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

function formatShopifyVariantId(variantId: string): string {
  return Buffer.from(`gid://shopify/ProductVariant/${variantId}`).toString(
    "base64"
  );
}

interface Response {
  data: any;
  error: string | null;
  code: number;
  message: string;
}

export const addItem = async (
  variantId: string | undefined | number
): Promise<Response | null> => {
  let cartId = cookies().get("cartId")?.value;
  let cart;

  if (cartId) {
    cart = await getCart(cartId);
  }

  if (!cartId || !cart) {
    cart = await createCart();
    cartId = cart.id;
    cookies().set("cartId", cartId);
  }

  if (!variantId) {
    return {
      data: null,
      error: "Missing product variant ID",
      code: 400,
      message: "Missing product variant ID",
    };
  }

  const formattedVariantId = formatShopifyVariantId(String(variantId));

  try {
    const response = await addToCart(cartId, [
      { merchandiseId: formattedVariantId, quantity: 1 },
    ]);

    revalidatePath("/cart");

    // @ts-expect-error - TODO: Fix this
    const cartInfo = transformCartData(response);

    return {
      data: cartInfo,
      error: null,
      code: 200,
      message: "Item added to cart",
    };
  } catch (e) {
    console.log(e, "---e \n");
    return {
      data: null,
      error: "Error adding item to cart",
      code: 500,
      message: "Error adding item to cart",
    };
  }
};

export const removeItem = async (lineId: string): Promise<Response> => {
  const cartId = cookies().get("cartId")?.value;

  if (!cartId) {
    return {
      data: null,
      error: "Missing cart ID",
      code: 400,
      message: "Missing cart ID",
    };
  }
  try {
    await removeFromCart(cartId, [lineId]);

    revalidatePath("/cart");

    return {
      data: null,
      error: null,
      code: 200,
      message: "Item removed from cart",
    };
  } catch (e) {
    return {
      data: null,
      error: (e as Error).message || "Error removing item from cart",
      code: 500,
      message: "Error removing item from cart",
    };
  }
};

export const updateItemQuantity = async ({
  lineId,
  variantId,
  quantity,
}: {
  lineId: string;
  variantId: string;
  quantity: number;
}): Promise<Response> => {
  const cartId = cookies().get("cartId")?.value;

  if (!cartId) {
    return {
      data: null,
      error: "Missing cart ID",
      code: 400,
      message: "Missing cart ID",
    };
  }
  try {
    const res = await updateCart(cartId, [
      {
        id: lineId,
        merchandiseId: variantId,
        quantity,
      },
    ]);

    revalidatePath("/cart");

    return {
      data: res,
      error: null,
      code: 200,
      message: "Item quantity updated",
    };
  } catch (e) {
    return {
      data: null,
      error: (e as Error).message || "Error updating item quantity",
      code: 500,
      message: "Error updating item quantity",
    };
  }
};
