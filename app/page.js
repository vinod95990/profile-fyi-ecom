"use client";
import Header from "@/src/components/Common/Header";
import ProductCard from "@/src/components/Common/ProductCard";
import Searchbar from "@/src/components/Common/Searchbar";
import { useCart } from "@/src/context";
import { convertToRupees } from "@/src/utils/common";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function Home() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const { itemsInCart, setItemsInCart } = useCart();

  const fetchProducts = async ({ queryKey }) => {
    const [, { page, searchTerm }] = queryKey;

    const url = searchTerm
      ? `https://dummyjson.com/products/search?q=${searchTerm}&limit=10&skip=${
          (page - 1) * 10
        }`
      : `https://dummyjson.com/products?limit=10&skip=${(page - 1) * 10}`;

    const response = await fetch(url);
    return response.json();
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", { page, searchTerm }],
    queryFn: fetchProducts,
    keepPreviousData: true,
  });

  if (isError) return <div>Error fetching data</div>;

  return (
    <div>
      <div>
        <Header itemsInCart={itemsInCart} />
      </div>

      <div className="flex flex-col gap-4 items-center sm:flex-row sm:items-start py-20 ">
        <div className="sm:w-1/5">
          <div className="flex items-center gap-3 font-mono px-7">
            <p className="text-[#d6d6d6]">Shop</p>
            <p className="text-[#d6d6d6]"> {`>`}</p>
            <p className="text-black"> Home</p>
          </div>
        </div>

        <div className="w-full px-6 sm:w-4/5">
          <Searchbar setSearchTerm={setSearchTerm} />
          {isLoading ? (
            <p className="font-mono text-lg  mt-10">Fetching...</p>
          ) : (
            <div className="grid  grid-cols-1 justify-items-center  md:grid-cols-2 lg:grid-cols-3 p-3 sm:p-0   gap-4 mt-10">
              {data?.products?.length > 0 ? (
                data.products.map((product) => {
                  return (
                    <ProductCard
                      product={product}
                      key={product.id}
                      setItemsInCart={setItemsInCart}
                    />
                  );
                })
              ) : (
                <></>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
