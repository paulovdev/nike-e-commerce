import React, { useEffect, useState } from "react";
import { MdCheck, MdOutlineKeyboardArrowDown } from "react-icons/md";
import useFilterStore from "@/store/filterStore";
import { colorsData, priceData, sizes, menustructure } from "@/data/filterData";
import useFavoritesStore from "@/store/favoritesStore.js";

const toggleArrayValue = (arr, value) =>
  arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];

const ProductFilters = () => {
  const {
    gender,
    setGender,
    section,
    setSection,
    subcategory,
    setSubcategory,
    color,
    setColor,
    size,
    setSize,
    price,
    setPrice,
  } = useFilterStore();
  const { favorites } = useFavoritesStore();

  const [open, setOpen] = useState({
    color: true,
    gender: true,
    section: true,
    subcategory: false,
    price: false,
    size: false,
  });

  const toggleOpen = (key) =>
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));

  const selectedGender = new Set(gender.map((g) => g.toLowerCase()));
  const selectedSection = new Set(section.map((s) => s.toLowerCase()));
  const selectedSubcategory = new Set(subcategory.map((s) => s.toLowerCase()));
  const selectedColor = new Set(color.map((c) => c.toLowerCase()));
  const selectedSize = new Set(size);

  const handleToggle = (current, value, setter, single = false) => {
    const lowerValue = value.toLowerCase();
    const alreadySelected = current.includes(lowerValue);

    const updated = single
      ? alreadySelected
        ? [] // ← desmarcar se já estava selecionado
        : [lowerValue]
      : toggleArrayValue(current, lowerValue);

    setter(updated);
  };

  const handlePriceChange = (value) => {
    const [min, max] = value.split("-").map(Number);
    const [currentMin, currentMax] = price;

    const isSame = currentMin === min && currentMax === max;

    // Se clicou no mesmo valor → volta para "All Prices"
    if (isSame) {
      setPrice([0, 9999]);
    } else {
      setPrice([min, max]);
    }
  };

  // Dinâmico: genders, sections e subcategories
  const genderOptions = menustructure.map((group) => group.gender);

  const sectionOptionsSet = new Set();
  const subcategoryOptionsSet = new Set();

  menustructure.forEach((group) => {
    if (gender.length === 0 || selectedGender.has(group.gender)) {
      const genderSections = group.sections;
      for (const [sectionName, subcats] of Object.entries(genderSections)) {
        sectionOptionsSet.add(sectionName);

        if (gender.length > 0) {
          subcats.forEach((subcat) => subcategoryOptionsSet.add(subcat));
        }
      }
    }
  });

  const sectionOptions = Array.from(sectionOptionsSet);
  const subcategoryOptions = Array.from(subcategoryOptionsSet);

  useEffect(() => {
    if (gender.length === 0) {
      setSubcategory([]);
    }
  }, [gender]);

  return (
    <div className="pr-4 overflow-y-scroll h-screen flex flex-col max-lg:overflow-y-hidden">
      <div className="relative">
        {/* Favorites */}
        <div className="pt-4 pb-8">
          <div className="w-full flex items-center justify-between cursor-pointer">
            <p className="text-base text-black-100 font-bold">
              Favorites {favorites.length > 0 && `(${favorites.length})`}
            </p>
            <div className="relative inline-block w-12 h-6">
              <input
                type="checkbox"
                checked={useFilterStore.getState().favoritesOnly}
                onChange={useFilterStore.getState().toggleFavoritesOnly}
                className="peer appearance-none w-12 h-6 bg-slate-100 rounded-full checked:bg-black-100 cursor-pointer transition-colors duration-300"
              />
              <label className="absolute top-0.5 left-0.5 w-5 h-5 bg-white-100 rounded-full border border-border-100 shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-border-100 cursor-pointer"></label>
            </div>
          </div>
        </div>

        {/* Colors */}
        <div className="py-4">
          <div
            className=" w-full flex items-center justify-between cursor-pointer"
            onClick={() => toggleOpen("color")}
          >
            <p className="text-base text-black-100 font-bold">
              Colors {color.length > 0 && `(${color.length})`}
            </p>
            <MdOutlineKeyboardArrowDown
              size={28}
              className={`text-black-100 transition-transform ${
                open.color ? "rotate-180" : ""
              }`}
            />
          </div>
          {open.color && (
            <div className="mt-4 w-full grid grid-cols-3 gap-6">
              {colorsData.map(({ color: colorName, code }) => {
                const isChecked = selectedColor.has(colorName.toLowerCase());
                return (
                  <div
                    key={colorName}
                    onClick={() => handleToggle(color, colorName, setColor)}
                    className="flex flex-col items-center justify-center gap-2 cursor-pointer"
                  >
                    <button
                      title={colorName}
                      className="w-4 h-4 rounded-full p-4 border border-border-100 cursor-pointer transition-all duration-200"
                      style={{ backgroundColor: code }}
                    />
                    <p className="text-sm font-medium capitalize">
                      {colorName}
                    </p>
                    {isChecked && (
                      <div
                        className={`absolute flex items-center justify-center mix-blend-exclusion`}
                      >
                        <MdCheck
                          size={20}
                          className="relative text-white-100 -top-3"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className="w-full h-[0.5px] bg-border-100 "></div>

        {/* Sizes */}
        <div className="py-4">
          <div
            className="w-full flex items-center justify-between cursor-pointer"
            onClick={() => toggleOpen("size")}
          >
            <p className="text-base text-black-100 font-bold">
              Sizes {size.length > 0 && `(${size.length})`}
            </p>
            <MdOutlineKeyboardArrowDown
              size={28}
              className={`text-black-100 transition-transform ${
                open.size ? "rotate-180" : ""
              }`}
            />
          </div>
          {open.size && (
            <div className="mt-4 grid grid-cols-3 gap-2">
              {sizes.map((s) => {
                const isActive = selectedSize.has(s.toLowerCase());
                return (
                  <button
                    key={s}
                    onClick={() => handleToggle(size, s, setSize)}
                    className={`border rounded-[0.25rem] py-3 text-base flex items-center justify-center cursor-pointer transition-all duration-200 ${
                      isActive ? "border-black-100" : "border-border-100"
                    }`}
                  >
                    <p className="text-md font-bold">{s}</p>
                  </button>
                );
              })}
            </div>
          )}
        </div>
        <div className="w-full h-[0.5px] bg-border-100 "></div>
        {/* Gender */}
        <div className="py-4">
          <div
            className="w-full flex items-center justify-between cursor-pointer"
            onClick={() => toggleOpen("gender")}
          >
            <p className="text-base text-black-100 font-bold">
              Gender {gender.length > 0 && `(${gender.length})`}
            </p>
            <MdOutlineKeyboardArrowDown
              size={28}
              className={`text-black-100 transition-transform ${
                open.gender ? "rotate-180" : ""
              }`}
            />
          </div>

          {open.gender && (
            <div className="mt-2 flex flex-col items-start gap-1">
              {genderOptions.map((g) => {
                const value = g.toLowerCase();
                const isActive = selectedGender.has(value);

                return (
                  <label
                    key={g}
                    className="flex items-center gap-2 text-base capitalize cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={isActive}
                      onChange={() => handleToggle(gender, g, setGender)}
                      className="form-checkbox accent-black-100 w-4 h-4"
                    />
                    <span
                      className={`${
                        isActive
                          ? "text-black-100 font-bold"
                          : "text-black-100/75 font-medium"
                      }`}
                    >
                      {g}
                    </span>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        <div className="w-full h-[0.5px] bg-border-100 "></div>

        {/* Section */}
        {sectionOptions.length > 0 && (
          <>
            <div className="py-4">
              <div
                className="w-full flex items-center justify-between cursor-pointer"
                onClick={() => toggleOpen("section")}
              >
                <p className="text-base text-black-100 font-bold">
                  Product Type {section.length > 0 && ` (Selected)`}
                </p>
                <MdOutlineKeyboardArrowDown
                  size={28}
                  className={`text-black-100 transition-transform ${
                    open.section ? "rotate-180" : ""
                  }`}
                />
              </div>

              {open.section && (
                <div className="mt-2 flex flex-col items-start gap-1">
                  {sectionOptions.map((sec) => {
                    const value = sec.toLowerCase();
                    const isActive = selectedSection.has(value);

                    return (
                      <label
                        key={sec}
                        className="flex items-center gap-2 text-base capitalize cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={isActive}
                          onChange={() =>
                            handleToggle(section, sec, setSection, true)
                          }
                          className="form-checkbox accent-black-100 w-4 h-4"
                        />

                        <span
                          className={`${
                            isActive
                              ? "text-black-100 font-bold"
                              : "text-black-100/75 font-medium"
                          }`}
                        >
                          {sec}
                        </span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="w-full h-[0.5px] bg-border-100"></div>
          </>
        )}

        {/* Subcategory */}
        {subcategoryOptions.length > 0 && (
          <>
            <div className="py-4">
              <div
                className="w-full flex items-center justify-between cursor-pointer"
                onClick={() => toggleOpen("subcategory")}
              >
                <p className="text-base text-black-100 font-bold">
                  Categories
                  {subcategory.length > 0 && ` (Selected)`}
                </p>
                <MdOutlineKeyboardArrowDown
                  size={28}
                  className={`text-black-100 transition-transform ${
                    open.subcategory ? "rotate-180" : ""
                  }`}
                />
              </div>

              {open.subcategory && (
                <div className="mt-2 flex flex-col items-start gap-1">
                  {subcategoryOptions.map((sub) => {
                    const value = sub.toLowerCase();
                    const isActive = selectedSubcategory.has(value);

                    return (
                      <label
                        key={sub}
                        className="flex items-center gap-2 text-base capitalize cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={isActive}
                          onChange={() =>
                            handleToggle(subcategory, sub, setSubcategory, true)
                          }
                          className="form-checkbox accent-black-100 w-4 h-4"
                        />

                        <span
                          className={`${
                            isActive
                              ? "text-black-100 font-bold"
                              : "text-black-100/75 font-medium"
                          }`}
                        >
                          {sub}
                        </span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="w-full h-[0.5px] bg-border-100" />
          </>
        )}

        {/* Price */}
        <div className="py-4">
          <div
            className=" w-full flex items-center justify-between cursor-pointer"
            onClick={() => toggleOpen("price")}
          >
            <p className="text-base text-black-100 font-bold">
              Shop by Price{" "}
              {price[0] !== 0 || price[1] !== 0 ? "(Selected)" : ""}
            </p>
            <MdOutlineKeyboardArrowDown
              size={28}
              className={`text-black-100 transition-transform ${
                open.price ? "rotate-180" : ""
              }`}
            />
          </div>
          {open.price && (
            <div>
              {priceData.map(({ label, value }) => {
                const [min, max] = value.split("-").map(Number);
                const isChecked = price[0] === min && price[1] === max;

                return (
                  <label
                    key={value}
                    className="mt-2 flex items-center gap-2 mb-1 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      onChange={() => handlePriceChange(value)}
                      checked={isChecked}
                      className="form-checkbox accent-black-100 w-4 h-4"
                    />
                    <p className="pl-1 text-black-100 text-base font-medium capitalize">
                      {label}
                    </p>
                  </label>
                );
              })}
            </div>
          )}
        </div>
        <div className="w-full h-[0.5px] bg-border-100 "></div>
      </div>
    </div>
  );
};

export default ProductFilters;
