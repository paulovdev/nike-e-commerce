const FilterActions = ({ onApply, onClear }) => {
  return (
    <div className="flex gap-2 ">
      <button
        onClick={onApply}
        className="w-full h-[40px] px-6 py-2 bg-black-100 rounded-full flex items-center justify-center cursor-pointer"
      >
        <p className="text-white-100 text-md font-bold truncate ">
          Apply Filters
        </p>
      </button>
      <button
        onClick={onClear}
        className="w-full h-[40px] px-6 py-2 bg-white-100 border border-border-100 rounded-full flex items-center justify-center cursor-pointer"
      >
        <p className="text-black-100 text-md font-bold">Clear</p>
      </button>
    </div>
  );
};

export default FilterActions;
