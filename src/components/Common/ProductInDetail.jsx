import { toastNotificationType } from "@/src/Constants";
import {
  addToCartNotification,
  minimumOrderQuantityReached,
  reduceFromCartNotification,
  removeFromCartNotification,
} from "@/src/utils/common";
import { Minus, Plus, Trash } from "@phosphor-icons/react/dist/ssr";
import { find } from "lodash";

const { default: Image } = require("next/image");
const { default: Tags } = require("./Tags");

function ProductInDetail(props) {
  const {
    product: {
      id,
      title,
      imageSrc,
      priceInRupee,
      discountedPriceInRupee,
      quantity,
      brand,
      availabilityStatus,
      tags,
      rating,
      minimumOrderQuantity,
      discountPercentage,
    },
    setItemsInCart,
  } = props;

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

  const handleRemoveFromCart = () => {
    setItemsInCart((prevItemsInCart) =>
      prevItemsInCart.filter((item) => item.id !== id)
    );

    removeFromCartNotification(title);
  };

  const handleSubtractQuantity = () => {
    let isSuccessful = false;
    setItemsInCart((prevItemsInCart) => {
      const itemIndex = prevItemsInCart.findIndex((item) => item.id === id);

      //item should exists and quantity should be greater than 1, that is item is more than 1
      if (itemIndex !== -1 && prevItemsInCart[itemIndex].quantity > 1) {
        isSuccessful = toastNotificationType.success;
        return prevItemsInCart.map((item, index) =>
          index === itemIndex ? { ...item, quantity: item.quantity - 1 } : item
        );
      } else {
        return prevItemsInCart; // prevent quantity to go below 1
      }
    });

    if (isSuccessful == toastNotificationType.success) {
      reduceFromCartNotification(title);
    }
  };

  return (
    <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-4 justify-items-center items-center rounded-xl shadow-xl w-full">
      <Image
        src={imageSrc}
        width={200}
        height={200}
        alt={title}
        className="transition-all w-[200px] h-[200px]   lg:w-[150px] lg:h-[150px] object-contain hover:scale-125 hover:rotate-3"
      ></Image>

      <div className="flex flex-col items-start justify-center gap-4 font-sans bg-[#f6f6f6] w-full p-8">
        <Tags tags={tags} />
        <div className="flex flex-col items-start text-start justify-center gap-1 w-full ">
          <p className="text-[#c1c1c1] text-base md:text-lg text-start text-wrap break-words font-bold pr-3">
            {brand}
          </p>
          <h1 className="text-[#363636] text-xl md:text-xl text-start text-wrap break-words font-extrabold pr-3">
            {title}
          </h1>
        </div>

        <div className="flex  justify-center items-center gap-3 flex-wrap">
          <p className="font-bold text-base lg:text-lg">
            ⭐ {rating.toFixed(1)}
          </p>
          <p className="bg-[#f5f5f7] text-[#6b6b6b] px-3 py-1 rounded-xl text-sm sm:text-base font-medium shadow-md">
            {availabilityStatus}
          </p>
        </div>

        <div className="flex items-center justify-between gap-1 w-full flex-wrap">
          <p className="text-[#363636] text-lg sm:text-xl font-bold">Price</p>
          {discountedPriceInRupee && discountedPriceInRupee > 0 ? (
            <div className="flex items-center flex-col gap-1">
              <p className="text-[#a3a3a3] line-through text-base ">
                {priceInRupee} ₹
              </p>
              <p className="text-[#363636] text-xl sm:text-2xl  font-bold">
                {discountedPriceInRupee} ₹
              </p>
            </div>
          ) : (
            <p className="text-[#363636] text-xl sm:text-2xl  font-bold">
              {priceInRupee} ₹
            </p>
          )}
        </div>

        <div className="flex items-center justify-between gap-1 w-full flex-wrap">
          <p className="text-[#363636] text-lg sm:text-xl font-bold">
            Quantity
          </p>
          <p className="text-[#363636] text-xl sm:text-2xl  font-bold">
            x {quantity}
          </p>
        </div>

        <div className="flex items-center justify-between gap-1 w-full border-t-2 border-[#e7e7e7] py-2">
          <p className="text-[#363636] text-lg sm:text-xl font-bold">Total</p>
          <p className="text-[#363636] text-xl sm:text-2xl  font-extrabold">
            {discountedPriceInRupee
              ? discountedPriceInRupee * quantity
              : priceInRupee * quantity}{" "}
            ₹
          </p>
        </div>
      </div>

      <div
        className="flex flex-col gap-2 absolute top-2 right-2
 "
      >
        <Trash
          size={32}
          weight="fill"
          className="hover:text-[#585858] transition-colors w-8 sm:w-7"
          onClick={handleRemoveFromCart}
        />
        <Plus
          size={32}
          weight="fill"
          className="hover:text-[#585858] transition-colors  w-8 sm:w-7"
          onClick={handleAddToCart}
        />

        <Minus
          size={32}
          weight="fill"
          className="hover:text-[#585858] transition-colors  w-8 sm:w-7"
          onClick={handleSubtractQuantity}
        />
      </div>

      {discountPercentage && discountPercentage > 0 && (
        <p className="absolute top-0 left-0 bg-slate-950 text-white text-sm sm:text-base tracking-wider p-2">
          {discountPercentage}% OFF
        </p>
      )}
    </div>
  );
}

export default ProductInDetail;
