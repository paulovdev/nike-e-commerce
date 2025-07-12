import { colors } from "@/data/filterData";
import useFilterStore from "@/store/filterStore";
import { toggleArrayValue } from "@/utils/utils";

const ColorFilter = () => {
  const { selectedColors, setColors } = useFilterStore();
  return (
    <div className="my-6 w-full grid grid-cols-3 gap-6">
      {colors.map(({ name, code }) => (
        <div
          key={name}
          className="flex flex-col items-center justify-center gap-2 cursor-pointer"
        >
          <button
            title={name}
            onClick={() =>
              setColors(toggleArrayValue(selectedColors, name.toLowerCase()))
            }
            className={`w-4 h-4 rounded-full p-4 border ${
              selectedColors.includes(name.toLowerCase())
                ? "border-black-100 border-1"
                : "border-border-100"
            } transition-all duration-200`}
            style={{ backgroundColor: code }}
          />
          <p className="text-sm font-medium capitalize">{name}</p>
        </div>
      ))}
    </div>
  );
};

export default ColorFilter;
