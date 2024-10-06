import { urlGenerate } from "@/utils/urlGenerate";
import Image from "next/image";
import Link from "next/link";


interface ProductsOnSaleProps {
  allProducts: Array<any>;
}

const ProductsOnSale = ({ allProducts }: ProductsOnSaleProps) => {
  return (
    <div> 
      <h3 className="font-titleFont text-xl font-semibold mb-6 underline underline-offset-4 decoration-[1px]">
        Products on sale
      </h3>
      <div className="flex flex-col gap-2">
        { allProducts && allProducts.length > 0 && allProducts.map((item) => (
          <div
            key={item._id}
            className="flex items-center gap-4 border-b-[1px] border-b-gray-300 py-2"
          >
            <div>
              {/* <img className="w-24" src={item.img.src} alt={item.img} /> */}
              <Image
                className="w-24"
                src={item.img}
                alt={item.productName}
                width={100}
                height={100}
              />
            </div>
            <div className="flex flex-col gap-2 font-titleFont">

            <Link href={`/product/${urlGenerate(item.productName, item._id)}`}>
            <p className="text-base font-medium">{item.productName}</p>
            </Link>
              <p className="text-sm font-semibold">${item.price}</p>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsOnSale;
