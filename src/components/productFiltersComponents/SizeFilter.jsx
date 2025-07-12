import { sizes } from "@/data/filterData";
import useFilterStore from "@/store/filterStore";
import { toggleArrayValue } from "@/utils/utils";

const SizeFilter = () => {
  const { selectedSizes, setSizes } = useFilterStore();
  return (
    <div className="mt-3 grid grid-cols-3 gap-2">
      {sizes.map((size) => (
        <button
          key={size}
          className={`border border-bb w-full rounded-[0.25rem] py-3 text-base flex items-center justify-center cursor-pointer transition-all duration-200 ${
            selectedSizes.includes(size)
              ? "border-black-100 "
              : "border-border-100"
          }`}
          onClick={() => setSizes(toggleArrayValue(selectedSizes, size))}
        >
          <p className="text-sm font-bold">{size}</p>
        </button>
      ))}
    </div>
  );
};

export default SizeFilter;
