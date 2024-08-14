import { CaretDown } from "@phosphor-icons/react/dist/ssr";

function Filters() {
  const filtersType = ["Shoe", "Style", "Size", "Brand"];
  return (
    <div className="font-sans hidden sm:block mt-10">
      <div className="p-4 md:p-8 flex items-start justify-center gap-3 flex-col">
        <p className="text-sm md:text-base font-extrabold">SORT</p>
        <div className="flex items-center justify-between gap-2 w-full">
          <p className=" text-xs md:text-sm text-[#818181]">What&apos;s new</p>
          <CaretDown
            size={28}
            className="hover:text-[#585858] text-[#818181] transition-colors  w-2 sm:w-4"
          />
        </div>
      </div>
      <div className="p-4 md:p-8 flex items-start justify-center gap-3 flex-col bg-[#f3eff0]">
        <p className="text-xs md:text-base font-extrabold">FILTER</p>
        {filtersType.map((filter) => {
          return (
            <div
              className="flex items-center justify-between gap-2 w-full bg-white p-1 rounded-sm"
              key={filter}
            >
              <p className=" text-xs md:text-sm text-[#818181]">{filter}</p>
              <CaretDown
                size={28}
                className="hover:text-[#585858] text-[#818181] transition-colors  w-2 md:w-4"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Filters;
