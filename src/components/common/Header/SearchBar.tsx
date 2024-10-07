"use client";

import { FaSearch, FaTimes } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { urlGenerate } from "@/utils/urlGenerate";
import Image from "next/image";

interface Product {
  id: string;
  title: string;
  image: {
    originalSrc: string;
  };
  description: string;
  price: string; // Assuming price is a string in Shopify API response
}

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setFilteredProducts([]);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      if (searchQuery.length > 0) {
        setLoading(true);
        try {
          const response = await fetch("/api/shopifySearch", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ query: searchQuery }),
          });
          const data = await response.json();
          setFilteredProducts(data.products);
        } catch (error) {
          console.error("Failed to fetch products:", error);
          toast("Failed to fetch products");
        } finally {
          setLoading(false);
        }
      } else {
        setFilteredProducts([]);
      }
    };
    fetchProducts();
  }, [searchQuery]);

  return (
    <div className="relative w-full lg:w-[600px] h-[50px] text-base text-primeColor bg-white flex items-center gap-2 justify-between px-6 rounded-xl shadow-lg border border-gray-200">
      <input
        className="flex-1 h-full outline-none placeholder:text-[#C4C4C4] placeholder:text-[14px]"
        type="text"
        onChange={handleSearch}
        value={searchQuery}
        placeholder="Search your products here"
      />
      {searchQuery ? (
        <FaTimes className="w-5 h-5 cursor-pointer" onClick={clearSearch} />
      ) : (
        <FaSearch className="w-5 h-5" />
      )}
      {searchQuery && (
        <div className="absolute top-[60px] left-0 z-50 w-full bg-white shadow-2xl rounded-lg overflow-y-auto max-h-96">
          {loading ? (
            <div className="p-4 text-center">Loading...</div>
          ) : filteredProducts && filteredProducts.length > 0 ? (
            filteredProducts.map((item) => (
              <div
                onClick={() => {
                  const productId = item.id.split("/").pop();
                  if (productId) {
                    router.push(`/product/${urlGenerate(item.title, productId)}`);
                    setSearchQuery("");
                  }
                }}
                key={item.id}
                className="flex items-center gap-3 p-3 hover:bg-gray-100 transition-all duration-150"
              >
                <Image
                  className="rounded-lg"
                  src={item.image.originalSrc}
                  alt="productImg"
                  width={80}
                  height={80}
                />
                <div className="flex flex-col">
                  <p className="font-semibold text-lg">{item.title}</p>
                  <p className="text-xs text-gray-500 truncate">{item.description}</p>
                  <p className="text-sm text-primeColor font-semibold">৳{item.price}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center">No products found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
