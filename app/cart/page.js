"use client";
import Header from "@/src/components/Common/Header";
import ProductInDetail from "@/src/components/Common/ProductInDetail";
import { ecomRoutes } from "@/src/Constants";
import { useCart } from "@/src/context";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { itemsInCart, setItemsInCart } = useCart();

  let totalAmount = 0;
  const handleRedirectToHome = () => {
    router.push(`/`);
  };
  return (
    <div className="relative">
      <div>
        <Header itemsInCart={itemsInCart} currPage={ecomRoutes.cart} />
      </div>

      {itemsInCart?.length > 0 ? (
        <>
          <div className="flex flex-col gap-8 p-6 w-[100%] md:w-[80%] mx-auto">
            {itemsInCart?.length > 0 &&
              itemsInCart.map((product) => {
                totalAmount +=
                  product.quantity *
                  (product?.discountedPriceInRupee || product?.priceInRupee);
                return (
                  <ProductInDetail
                    key={product.id}
                    product={product}
                    setItemsInCart={setItemsInCart}
                  />
                );
              })}
          </div>
          <div className="flex items-center flex-col fixed top-1/3 left-2">
            <p className="text-lg">Total</p>
            <p className="text-white bg-black p-2 rounded-md cursor-pointer">
              {" "}
              {totalAmount} ₹
            </p>
          </div>
        </>
      ) : (
        <p className="text-xl p-10 font-mono ">
          Cart is empty, Go back to{" "}
          <span
            className="text-white bg-black p-2 rounded-md cursor-pointer"
            onClick={handleRedirectToHome}
          >
            homepage
          </span>
        </p>
      )}
    </div>
  );
}
