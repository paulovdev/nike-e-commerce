import { ChevronDown, ChevronUp } from "lucide-react";

const FilterSection = ({ title, isOpen, onToggle, children }) => {
  return (
    <div className="py-5 border-b border-border-100 select-none">
      <div
        onClick={onToggle}
        className="flex justify-between items-center cursor-pointer"
      >
        <h3 className="text-black-100 text-base font-bold capitalize">
          {title}
        </h3>
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </div>
      {isOpen && <div className="my-2 ">{children}</div>}
    </div>
  );
};

export default FilterSection;
