import AddToCartButton from "@/components/product/AddToCartButton";
import LoadingSpinner from "@/components/shared/loading";
import { IProduct } from "@/interface";
import React, { Suspense } from "react";

interface ProductInfoProps {
  productInfo: IProduct;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ productInfo }) => {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-4xl font-semibold">{productInfo?.title}</h2>
      <p className="text-xl font-semibold">৳{productInfo?.price}</p>
      <div
        dangerouslySetInnerHTML={{
          __html: `<p className="text-base text-gray-600">${productInfo?.description}</p>`,
        }}
      ></div>
      <p className="text-sm">Be the first to leave a review.</p>
      <p className="font-medium text-lg">
        <span className="font-normal">Stock:</span>{" "}
        {productInfo?.quantity > 0 ? (
          <span className="text-green-500">In stock</span>
        ) : (
          <span className="text-red-500">Out of stock</span>
        )}
      </p>

      {/* Suspense Boundary for AddToCartButton */}
      <Suspense fallback={<LoadingSpinner />}>
        <AddToCartButton
          className="w-full py-4 bg-primeColor hover:bg-black duration-300 text-white text-lg font-titleFont"
          variantId={Number(productInfo?.variantId)}
        >
          Add to Cart
        </AddToCartButton>
      </Suspense>
    </div>
  );
};

export default ProductInfo;
