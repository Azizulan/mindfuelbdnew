"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { HiOutlineChevronRight } from "react-icons/hi";

const Breadcrumbs = ({ prevLocation, title }: { prevLocation: any; title: any }) => {
  const location = usePathname();
  const [locationPath, setLocationPath] = useState("");
  useEffect(() => {
    setLocationPath(location.split("/")[1]);
  }, [location]);

  return (
    <div className="w-full py-10 xl:py-10 flex flex-col gap-3">
      <h1 className="text-5xl text-primeColor font-titleFont font-bold">
        {title}
      </h1>
      <p className="text-sm font-normal text-lightText capitalize flex items-center">
        <span> {prevLocation === "" ? "Home" : prevLocation}</span>

        <span className="px-1">
          <HiOutlineChevronRight />
        </span>
        <span className="capitalize font-semibold text-primeColor">
          {locationPath}
        </span>
      </p>
    </div>
  );
};

export default Breadcrumbs;
