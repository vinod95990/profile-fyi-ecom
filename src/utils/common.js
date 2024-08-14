import { exchangeRate } from "../Constants";
import { toast } from "react-toastify";

export function convertToRupees(priceInUSD) {
  return Math.ceil(priceInUSD) * exchangeRate;
}

export function calculateDiscountedPrice(originalPrice, discountPercent) {
  const discountedPrice = originalPrice * (1 - discountPercent / 100);
  return Math.ceil(discountedPrice);
}

export function addToCartNotification(itemName) {
  return toast(`Successfully added ${itemName} to cart!`);
}

export function reduceFromCartNotification(itemName) {
  return toast(`Successfully reduced ${itemName} from cart!`);
}

export function removeFromCartNotification(itemName) {
  return toast(`Successfully removed ${itemName} from cart!`);
}

export function minimumOrderQuantityReached(minimumOrderQuantity) {
  return toast.error(
    `Minimum order quantity for this item is ${minimumOrderQuantity}.`
  );
}
