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
    },
    setItemsInCart,
  } = props;

  const handleAddToCart = () => {
    setItemsInCart((prev) => {
      // Find the item in the cart by its ID
      const itemInCart = find(prev, { id });

      if (itemInCart) {
        // Item already in cart, check quantity
        if (itemInCart.quantity < minimumOrderQuantity) {
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
          alert(
            `Minimum order quantity for this item is ${minimumOrderQuantity}.`
          );
          return prev;
        }
      } else {
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
          },
        ];
      }
    });
  };

  const handleRemoveFromCart = () => {
    setItemsInCart((prevItemsInCart) =>
      prevItemsInCart.filter((item) => item.id !== id)
    );
  };

  const handleSubtractQuantity = () => {
    setItemsInCart((prevItemsInCart) => {
      const itemIndex = prevItemsInCart.findIndex((item) => item.id === id);

      if (itemIndex !== -1 && prevItemsInCart[itemIndex].quantity > 1) {
        return prevItemsInCart.map((item, index) =>
          index === itemIndex ? { ...item, quantity: item.quantity - 1 } : item
        );
      } else {
        return prevItemsInCart; // prevent quantity to go below 1
      }
    });
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

        <div className="flex items-center justify-between gap-1 w-full">
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
          className="hover:text-[#363636] transition-colors"
          onClick={handleRemoveFromCart}
        />
        <Plus
          size={32}
          weight="fill"
          className="hover:text-[#363636] transition-colors"
          onClick={handleAddToCart}
        />

        <Minus
          size={32}
          weight="fill"
          className="hover:text-[#363636] transition-colors"
          onClick={handleSubtractQuantity}
        />
      </div>
    </div>
  );
}

export default ProductInDetail;
