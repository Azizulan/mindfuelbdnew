import Breadcrumbs from "@/components/pageProps/Breadcrumbs";
import { IProduct } from "@/interface";
import { getProducts } from "@/lib/getProduct";
import { sanitizeProductArrayData } from "@/lib/sanitizeProductData";
import Image from "next/image";
import ProductInfo from "./ProductInfo";
import ProductsOnSale from "./ProductsOnSale";

interface ProductDetailsProps {
  productInfo: IProduct;
}

const ProductDetails = async ({ productInfo }: ProductDetailsProps) => {
  const { products } = await getProducts();

  if (!productInfo) {
    return <div>Product not found</div>;
  }

  // first 3 products
  const allProducts =
    products && sanitizeProductArrayData(products).slice(0, 4);

  return (
    <div className="w-full mx-auto border-b-[1px] border-b-gray-300">
      <div className="max-w-container mx-auto px-4">
        <div className="xl:-mt-10 -mt-7">
          <Breadcrumbs prevLocation={"/"} title={"home"} />
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 h-full -mt-5 xl:-mt-8 pb-10 bg-gray-100 p-4">
          <div className="h-full">
            <ProductsOnSale allProducts={allProducts} />
          </div>
          <div className="h-full xl:col-span-2">
            <Image
              className="w-full h-full object-cover"
              src={productInfo?.image}
              alt={productInfo?.title}
              width={700}
              height={700}
            />
          </div>
          <div className="h-full w-full md:col-span-2 xl:col-span-3 xl:p-14 flex flex-col gap-6 justify-center">
            <ProductInfo productInfo={productInfo} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

