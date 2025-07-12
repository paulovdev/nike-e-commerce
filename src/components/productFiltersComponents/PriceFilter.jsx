import { priceRanges } from "@/data/filterData";
import useFilterStore from "@/store/filterStore";

const PriceFilter = () => {
  const { priceRange, setPriceRange } = useFilterStore();

  const handlePriceChange = (value) => {
    const [min, max] = value.split("-").map(Number);
    setPriceRange([min, max]);
  };
  return (
    <div className="my-2">
      {priceRanges.map(({ label, value }) => (
        <label
          key={value}
          className="flex items-center gap-2 mb-1 cursor-pointer"
        >
          <input
            type="radio"
            name="priceFilter"
            className="w-5 h-5 accent-black-200 border border-border-100 "
            checked={priceRange[0] === Number(value.split("-")[0]) && priceRange[1] === Number(value.split("-")[1])}
            onChange={() => handlePriceChange(value)}
          />
          <p className="pl-1 text-black-100 text-base font-medium capitalize">
            {label}
          </p>
        </label>
      ))}
    </div>
  );
};

export default PriceFilter;
