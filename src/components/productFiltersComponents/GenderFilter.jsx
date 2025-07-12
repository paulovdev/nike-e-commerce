import { genders } from "@/data/filterData";

const GenderFilter = ( ) => {

  return (
    <div className="my-2 flex flex-col items-start gap-1">
      {genders.map((g) => {
       
        return (
          <button
            key={g}
            onClick={}
            className={`text-base capitalize ${
              isActive
                ? "text-black-100 font-bold"
                : "text-black-100/75 font-medium"
            } cursor-pointer`}
          >
            {g}
          </button>
        );
      })}
    </div>
  );
};

export default GenderFilter;
