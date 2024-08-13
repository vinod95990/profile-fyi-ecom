import { exchangeRate } from "../Constants";
export function convertToRupees(priceInUSD) {
  return Math.ceil(priceInUSD) * exchangeRate;
}

export function calculateDiscountedPrice(originalPrice, discountPercent) {
  const discountedPrice = originalPrice * (1 - discountPercent / 100);
  return Math.ceil(discountedPrice);
}
