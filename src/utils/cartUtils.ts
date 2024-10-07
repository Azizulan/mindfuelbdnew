/* eslint-disable @typescript-eslint/no-explicit-any */
// cartUtils.ts
import { CartInfo, TransformedCartInfo } from "@/interface/cart";

export const transformCartData = (cartInfo: CartInfo): TransformedCartInfo => {
  if (!cartInfo || !cartInfo.lines) {
    return { totalItems: 0, products: [] };
  }

  return {
    totalItems: cartInfo.totalQuantity,
    totalCost: cartInfo.cost?.totalAmount?.amount,
    currency: cartInfo.cost?.totalAmount?.currencyCode,
    products: cartInfo.lines.map((line: any) => ({
      id: line.id,
      variantId: line.merchandise.id,
      title: line.merchandise.product.title,
      variant: line.merchandise.selectedOptions
        ?.map((option: any) => option.value)
        .join(", "),
      quantity: line.quantity,
      price: line?.merchandise?.product?.priceRange?.minVariantPrice?.amount,
      totalCost: line.cost?.totalAmount?.amount,
      image: line.merchandise.product.featuredImage?.url,
    })),
  };
};
