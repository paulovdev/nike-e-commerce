import React from "react";
import useFilterStore from "@/store/filterStore";

const capitalize = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

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

  const hasAnyFilter =
    gender.length > 0 || section.length > 0 || subcategory.length > 0;

  // FAVORITES
  if (favoritesOnly) {
    return (
      <div className="">
        <h2 className="text-sl text-black-100 font-semibold">
          Favorites ({filteredCount})
        </h2>
      </div>
    );
  }

  // ALL PRODUCTS
  if (!hasAnyFilter) {
    return (
      <div className="">
        <h2 className="text-sl text-black-100 font-semibold">
          All Products ({filteredCount})
        </h2>
      </div>
    );
  }

  // Formatar breadcrumb: Shop / gender / section / subcategory
  const formattedGender = gender.map(capitalize);
  const formattedSection = section.length > 0 ? capitalize(section[0]) : "";
  const formattedSubcategory =
    subcategory.length > 0 ? capitalize(subcategory[0]) : "";

  // Construção do breadcrumb
  const breadcrumbItems = [
    "Shop",
    ...formattedGender,
    ...(formattedSection ? [formattedSection] : []),
    ...(formattedSubcategory ? [formattedSubcategory] : []),
  ];

  const handleClick = (index) => {
    if (index === 0) {
      // Clique em Shop → resetar tudo
      setGender([]);
      setSection([]);
      setSubcategory([]);
    } else if (index <= gender.length) {
      // Clique em um gênero → manter só ele
      const clickedGender = formattedGender[index - 1];
      setGender([clickedGender.toLowerCase()]);
      setSection([]);
      setSubcategory([]);
    } else if (index === gender.length + 1) {
      // Clique em section
      setSection([formattedSection.toLowerCase()]);
      setSubcategory([]);
    } else if (index === gender.length + 2) {
      // Clique em subcategory
      setSubcategory([formattedSubcategory.toLowerCase()]);
    }
  };

  // Construção do título principal
  const titleParts = [];
  if (formattedSubcategory) titleParts.push(formattedSubcategory);
  if (formattedSection) titleParts.push(formattedSection);

  let title = titleParts.join(" ");
  if (formattedGender.length > 0) {
    const gendersString =
      formattedGender.length === 1
        ? formattedGender[0]
        : formattedGender.slice(0, -1).join(", ") +
          " & " +
          formattedGender.slice(-1);
    title += ` for ${gendersString}`;
  }

  return (
    <div className="">
      {/* Breadcrumb completo */}
      <nav className="flex items-center gap-2 flex-wrap">
        {breadcrumbItems.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <button
              onClick={() => handleClick(index)}
              className="text-md text-black-100 font-bold capitalize tracking-[-.3px] hover:underline transition"
            >
              {item}
            </button>
            {index < breadcrumbItems.length - 1 && (
              <span className="text-md text-black-100 font-bold">/</span>
            )}
          </div>
        ))}
      </nav>

      {/* Título principal */}
      <h2 className="text-sl text-black-100 font-semibold mt-2 capitalize">
        {title} ({filteredCount})
      </h2>
    </div>
  );
};

export default BreadCrumb;
