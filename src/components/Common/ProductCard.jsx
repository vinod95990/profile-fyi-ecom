import Image from "next/image";
import { ShoppingBag } from "@phosphor-icons/react/dist/ssr";
import {
  addToCartNotification,
  calculateDiscountedPrice,
  convertToRupees,
  minimumOrderQuantityReached,
} from "@/src/utils/common";
import { find } from "lodash";
import { toast } from "react-toastify";
import { toastNotificationType } from "@/src/Constants";

function ProductCard(props) {
  const {
    product: {
      id,
      title,
      images,
      price,
      discountPercentage = 0,
      rating,
      availabilityStatus,
      brand = "Unknown",
      minimumOrderQuantity,
      tags,
    },
    setItemsInCart,
  } = props;

  const imageSrc = images[0];
  const priceInRupee = convertToRupees(price);
  const discountedPriceInRupee = calculateDiscountedPrice(
    priceInRupee,
    discountPercentage
  );
  const handleAddToCart = () => {
    let isSuccessful = false;

    setItemsInCart((prev) => {
      // Find the item in the cart by its ID
      const itemInCart = find(prev, { id });

      if (itemInCart) {
        // Item already in cart, check quantity
        if (itemInCart.quantity < minimumOrderQuantity) {
          isSuccessful = toastNotificationType.success;
          return prev.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                quantity: item.quantity + 1,
              };
            }
            return item;
          });
        } else {
          isSuccessful = toastNotificationType.limit;
          return prev;
        }
      } else {
        isSuccessful = toastNotificationType.success;

        // Item not in cart, add new item
        return [
          ...prev,
          {
            id: id,
            title,
            priceInRupee,
            discountedPriceInRupee,
            quantity: 1,
            rating,
            minimumOrderQuantity,
            brand,
            tags,
            availabilityStatus,
            imageSrc,
            discountPercentage,
          },
        ];
      }
    });

    if (isSuccessful == toastNotificationType.limit) {
      minimumOrderQuantityReached(minimumOrderQuantity);

      return;
    }
    if (isSuccessful == toastNotificationType.success) {
      addToCartNotification(title);
    }
  };

  return (
    <div className=" flex flex-col gap-3 items-center justify-center rounded-xl  shadow-md p-4 md:p-2 relative w-[100%] sm:w-80 md:w-72 lg:w-64">
      <div className="flex flex-col items-start text-start justify-center gap-1 w-full">
        <p className="text-[#c1c1c1] text-lg md:text-base text-start text-wrap break-words font-bold pr-3">
          {brand}
        </p>
        <h1 className="text-[#363636] text-xl md:text-lg text-start text-wrap break-words font-extrabold pr-3">
          {title}
        </h1>
      </div>

      <div className="relative w-full flex items-center justify-center">
        <Image
          src={imageSrc}
          width={200}
          height={200}
          alt={title}
          className="transition-all w-[200px] h-[200px]   lg:w-[150px] lg:h-[150px] object-contain hover:scale-125 hover:rotate-3"
        ></Image>
        {discountPercentage && discountPercentage > 0 && (
          <p className="absolute top-0 left-0 bg-slate-950 text-white text-sm sm:text-xs tracking-wider p-1 rounded-md">
            {discountPercentage}% OFF
          </p>
        )}
      </div>

      {/* <Tags tags={tags} /> */}

      {/* FOOTER */}
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col items-start gap-1">
          <p className="bg-[#f5f5f7] text-[#6b6b6b] px-3 py-1 rounded-xl text-sm lg:text-xs font-medium shadow-md">
            {availabilityStatus}
          </p>
          <p className="font-bold text-lg lg:text-base">
            ⭐ {rating.toFixed(1)}
          </p>
        </div>
        {discountPercentage > 0 ? (
          <div className="flex flex-col items-end gap-1">
            <p className="text-[#a3a3a3] line-through text-base lg:text-sm">
              {priceInRupee} ₹
            </p>
            <p className="text-[#363636] text-xl lg:text-lg font-extrabold">
              {discountedPriceInRupee} ₹
            </p>
          </div>
        ) : (
          <p className="text-[#363636] text-xl md:text-lg font-extrabold">
            {priceInRupee} ₹
          </p>
        )}
      </div>

      {/* <button className=" trasnsistion-all border-2 border-[#363636] hover:bg-[#363636] rounded-3xl font-medium text-[#363636] px-4 py-1 hover:text-white	">
          Add to cart
        </button> */}
      <ShoppingBag
        size={40}
        weight="fill"
        className="hover:text-[#c1c1c1] transition-colors absolute top-0 right-0 md:w-9 lg:w-8"
        onClick={handleAddToCart}
      />
    </div>
  );
}

export default ProductCard;
