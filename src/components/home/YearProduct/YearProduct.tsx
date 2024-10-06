import ShopNow from "../../designLayouts/buttons/ShopNow";
import React from "react";

import Image from "next/image";
import Link from "next/link";
const YearProduct = () => {
  return (
    <>
      <div className="w-full h-80 mb-20 bg-[#f3f3f3] md:bg-transparent relative font-titleFont">
        <Image
          className="w-full h-full object-cover hidden md:inline-block"
          src={"/images/BannerImage.jpg"}
          alt="productOfTheYear"
          width={1000}
          height={1000}
        />
        <div className="w-full md:w-2/3 xl:w-1/2 h-80 absolute px-4 md:px-0 top-0 right-0 flex flex-col items-start gap-6 justify-center">
          <Link href="/shop">
            <ShopNow />
          </Link>
        </div>
      </div>
    </>
  );
};

export default YearProduct;
