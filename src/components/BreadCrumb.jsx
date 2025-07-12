import React from "react";
import useFilterStore from "@/store/filterStore";
import { MdKeyboardArrowRight } from "react-icons/md";

const BreadCrumb = ({ filteredCount }) => {
  const {
    gender,
    section,
    subcategory,
    favoritesOnly,
    setGender,
    setSection,
    setSubcategory,
  } = useFilterStore();

  const path = [...gender, ...section, ...subcategory];

  const handleClick = (index) => {
    if (index === 0) {
      setGender([path[0]]);
      setSection([]);
      setSubcategory([]);
    } else if (index === 1) {
      setSection([path[1]]);
      setSubcategory([]);
    } else if (index === 2) {
      setSubcategory([path[2]]);
    }
  };

  if (favoritesOnly) {
    return (
      <h1 className="text-sl font-medium capitalize">
        Favorites ({filteredCount})
      </h1>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-1 text-sl font-medium capitalize">
      {path.length === 0 ? (
        <span>All Products ({filteredCount})</span>
      ) : (
        <>
          {path.map((item, index) => (
            <div key={index} className="relative flex items-center gap-1 group">
              <button
                onClick={() => handleClick(index)}
                className={"text-black-100 text-sl capitalize "}
              >
                {item}
              </button>
              <div className="absolute -bottom-0 left-0 h-[3px] w-0 bg-black-100 group-hover:w-full transition-all duration-300" />
              {index < path.length - 1 && (
                <MdKeyboardArrowRight size={20} className="text-black-100" />
              )}
            </div>
          ))}
          <span className="text-sl text-black-100 ml-2">({filteredCount})</span>
        </>
      )}
    </div>
  );
};

export default BreadCrumb;
