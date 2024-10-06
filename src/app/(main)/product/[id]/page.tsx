import { getProductById } from "@/lib/getProduct";
import ProductDetails from "../_components/productDetails/ProductDetails";
import { sanitizeProductData } from "@/lib/sanitizeProductData";
import { Suspense } from "react";
import LoadingSpinner from "@/components/shared/loading";

const ProductPage = async ({ params }: { params: { id: string } }) => {
  const id = params.id.split("-").pop();
  const { product } = await getProductById(id as string);
  const productData = sanitizeProductData(product);

  if (!productData) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      {/* Suspense for main product details */}
      <Suspense fallback={<LoadingSpinner />}>
        <ProductDetails productInfo={productData} />
      </Suspense>
    </div>
  );
};

export default ProductPage;
