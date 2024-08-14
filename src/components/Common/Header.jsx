import {
  Anchor,
  Basket,
  HouseSimple,
  CaretRight,
} from "@phosphor-icons/react/dist/ssr";
import { useCallback, useState } from "react";
import CartItemsSummary from "./CartItemsSummary";
import { debounce } from "lodash";
import { useRouter } from "next/navigation";
import { ecomRoutes } from "@/src/Constants";

function Header(props) {
  // itemsInBag -> count of items in cart to be shown in header
  const { itemsInCart = [], currPage } = props;
  const [showCart, setShowCart] = useState(false);
  const router = useRouter();

  const handleMouseLeave = useCallback(() => setShowCart(false), []);

  const handleRedirectToCart = () => {
    router.push(`/${ecomRoutes.cart}`);
  };

  function getHeaderItem() {
    switch (currPage) {
      case ecomRoutes.cart:
        return (
          <>
            <div className="py-2 px-6 sm:py-6 sm:px-11 bg-black  transition-all h-full cursor-pointer">
              <HouseSimple
                size={30}
                weight="fill"
                onClick={() => {
                  router.push("/");
                }}
                className="text-white hover:text-[#c1c1c1] w-5 sm:w-8"
              />
            </div>
          </>
        );
      //home page
      default:
        return (
          <div
            className="relative h-full"
            onMouseEnter={() => setShowCart(true)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="py-2 px-6 sm:py-6 sm:px-11 bg-black  transition-all h-full cursor-pointer">
              {itemsInCart?.length > 0 ? (
                <div
                  className="flex items-center gap-1"
                  onClick={handleRedirectToCart}
                >
                  <p className="text-[#bd4f44] text-base sm:text-xl hover:underline">
                    {itemsInCart?.length || 0}{" "}
                    <span className="text-white text-sm sm:text-base">
                      IN BAG
                    </span>
                  </p>
                  <CaretRight
                    size={30}
                    className="text-white hover:text-[#c1c1c1] w-5 sm:w-6"
                  />
                </div>
              ) : (
                <Basket
                  size={30}
                  weight="fill"
                  className="text-white hover:text-[#c1c1c1] w-5 sm:w-8"
                />
              )}
            </div>
            {showCart && (
              <div className="absolute top-3/4 right-1/4  z-10 rounded-xl">
                <CartItemsSummary itemsInCart={itemsInCart} />
              </div>
            )}
          </div>
        );
    }
  }

  return (
    <div className="flex justify-between w-full">
      <div className="flex items-center gap-4">
        <div className="p-2 bg-black sm:p-6">
          <Anchor size={30} weight="fill" className="text-white w-5 sm:w-8" />
        </div>
        <p className="font-extrabold text-xl sm:text-3xl text-black font-mono">
          {" "}
          Sails.
        </p>
      </div>
      {getHeaderItem()}
    </div>
  );
}

export default Header;
