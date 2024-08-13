function CartItemsSummary(props) {
  const { itemsInCart } = props;
  let totalAmount = 0;
  return itemsInCart?.length > 0 ? (
    <div className="shadow-md rounded-xl flex items-center flex-col gap-3 bg-white p-4 transition-all w-52 h-32 sm:h-[150px] sm:w-80 overflow-auto">
      {itemsInCart.map((product) => {
        totalAmount +=
          product.quantity *
          (product?.discountedPriceInRupee || product?.priceInRupee);
        return (
          <div
            className="grid grid-cols-2 items-center w-full "
            key={product.id}
          >
            <h1 className="text-[#363636] text-xs sm:text-sm text-start text-wrap break-words font-bold pr-3">
              {product?.title}
            </h1>
            <div className="flex flex-col items-end gap-1">
              <p className="text-[#363636] text-sm sm:text-base font-bold">
                {product.quantity *
                  (product?.discountedPriceInRupee ||
                    product?.priceInRupee)}{" "}
                ₹ {`(x${product.quantity})`}
              </p>
            </div>
          </div>
        );
      })}

      <div className="grid grid-cols-2 items-center justify-center w-full py-2 border-t-2 border-[#363636]">
        <p className="text-[#363636] text-sm sm:text-base font-extrabold">
          Total
        </p>
        <div className="flex flex-col items-end gap-1">
          <p className="text-[#363636] text-base sm:text-lg font-extrabold">
            {totalAmount} ₹
          </p>
        </div>{" "}
      </div>
    </div>
  ) : (
    <p className="font-mono text-lg font-bold bg-white rounded-lg transition-all w-40 shadow-md p-2">
      Cart is empty
    </p>
  );
}

export default CartItemsSummary;
