import { useMemo } from "react";
import { motion } from "framer-motion";
import products from "@/data/products";
import ItemCard from "@/components/ItemCard";
import ProductFilters from "@/components/ProductFilters";
import ProductFiltersMobile from "@/components/ProductFiltersMobile";
import SortBy from "@/components/SortBy";
import useFilterStore from "@/store/filterStore";
import { opacityAnimation } from "@/animations/animations";
import BreadCrumb from "@/components/BreadCrumb";
import useFavoritesStore from "@/store/favoritesStore";

const Shop = () => {
const {
sortOrder,
gender,
section,
subcategory,
color,
size,
price,
favoritesOnly,
} = useFilterStore();

const favorites = useFavoritesStore((state) => state.favorites);

const filteredProducts = useMemo(() => {
let filtered = [...products];

    if (favoritesOnly) {
      const favoriteIds = new Set(favorites.map((p) => p.id));
      filtered = filtered.filter((p) => favoriteIds.has(p.id));
    }

    if (gender.length)
      filtered = filtered.filter((p) =>
        gender.includes(p.gender.toLowerCase())
      );

    if (section.length)
      filtered = filtered.filter((p) =>
        section.includes(p.section.toLowerCase())
      );

    if (subcategory.length)
      filtered = filtered.filter((p) =>
        subcategory.includes(p.subcategory.toLowerCase())
      );

    if (color.length)
      filtered = filtered.filter((p) =>
        p.color.some((c) => color.includes(c.toLowerCase()))
      );

    if (size.length)
      filtered = filtered.filter((p) =>
        p.sizes.some((s) => size.includes(s.toLowerCase()))
      );

    if (price[0] !== 0 || price[1] !== 1000) {
      filtered = filtered.filter(
        (p) => p.price >= price[0] && p.price <= price[1]
      );
    }

    return filtered;

}, [products, gender, section, subcategory, color, size, price]);

const sortedProducts = useMemo(() => {
const sorted = [...filteredProducts];
switch (sortOrder) {
case "price-asc":
return sorted.sort((a, b) => a.price - b.price);
case "price-desc":
return sorted.sort((a, b) => b.price - a.price);
case "name-asc":
return sorted.sort((a, b) => a.name.localeCompare(b.name));
case "name-desc":
return sorted.sort((a, b) => b.name.localeCompare(a.name));
default:
return sorted;
}
}, [filteredProducts, sortOrder]);

return (
<div className="relative min-h-screen flex flex-col max-lg:flex-col">
<div className="p-top-l px-5 flex justify-between items-center mb-4">
<div className=" flex flex-col">
<BreadCrumb filteredCount={filteredProducts.length} />
</div>

        <div className="hidden max-lg:flex">
          <ProductFiltersMobile />
        </div>

        <div className="flex items-center gap-2 max-lg:hidden cursor-pointer">
          <SortBy sortOrder={sortOrder} />
        </div>
      </div>

      <div className="px-5 flex justify-between items-start">
        <aside className="sticky top-[100px] pr-5 flex-[0.75] flex flex-col max-lg:hidden">
          <ProductFilters />
        </aside>

        <section className="w-full flex-[5] flex flex-col">
          {sortedProducts.length === 0 ? (
            <p>No products found for this filter.</p>
          ) : (
            <motion.div
              className="grid grid-cols-3 max-lg:grid-cols-3 max-md:grid-cols-2 gap-4"
              variants={opacityAnimation}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {sortedProducts.map((product) => (
                <ItemCard key={product.id} product={product} />
              ))}
            </motion.div>
          )}
        </section>
      </div>
    </div>

);
};

export default Shop;

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import products from "@/data/products";
import useCartStore from "@/store/cartStore";
import { ArrowDown } from "lucide-react";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { opacityAnimation, textSlideAnimation } from "@/animations/animations";
import { motion } from "framer-motion";
import { TbRulerMeasure } from "react-icons/tb";
import { MdCheck, MdKeyboardReturn } from "react-icons/md";
import useFavoritesStore from "@/store/favoritesStore";
import { IoIosArrowRoundBack } from "react-icons/io";

const ProductDetailPage = () => {
const router = useRouter();
const { id } = router.query;

const [product, setProduct] = useState(null);
const [selectedSize, setSelectedSize] = useState("");
const [selectedColor, setSelectedColor] = useState("");

const addItem = useCartStore((state) => state.addItem);
const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
const favorites = useFavoritesStore((state) => state.favorites);

const isFavorite = product
? favorites.some((p) => p.id === product.id)
: false;

useEffect(() => {
if (!id) return;
const prod = products.find((p) => p.id === id);
setProduct(prod);
}, [id]);

if (!product) return <p>Loading...</p>;

const handleAddToCart = () => {
if (!selectedSize) {
alert("Por favor, selecione um tamanho");
return;
}
if (!selectedColor) {
alert("Por favor, selecione uma cor");
return;
}
addItem({ ...product, selectedSize, selectedColor });
alert("Produto adicionado ao carrinho!");
};

return (
<>
<motion.main
className="relative min-h-screen flex flex-col lg:flex-row"
variants={opacityAnimation}
initial="initial"
animate="animate"
exit="exit" >
<div className="flex-[3] flex flex-col max-lg:order-1">
<div className="flex flex-col ">
{product.images.map((img, i) => (
<img
key={i}
src={img}
alt={`${product.name} image ${i + 1}`}
className="w-full h-screen object-cover"
/>
))}
</div>

          <motion.div
            className="fixed bottom-5 w-full flex items-center justify-center gap-2 mix-blend-exclusion"
            variants={opacityAnimation}
            initial="initial"
            animate="animate"
            exit="exit"
            custom={0.1}
          >
            <span className="text-white-100 text-[12px] font-azeret uppercase">
              SCROLL
            </span>
            <ArrowDown size={16} className="text-white-100" />
          </motion.div>
        </div>

        <div className="sticky top-0 p-top-l p-5  h-screen flex-[1] flex flex-col max-lg:relative">
          <div className="mb-8 h-fit overflow-hidden">
            <motion.button
              onClick={() => router.push("/shop")}
              variants={textSlideAnimation}
              initial="initial"
              animate="animate"
              exit="exit"
              custom={0.1}
              aria-label="Go back"
              className="w-full overflow-hidden flex items-center gap-2"
            >
              <IoIosArrowRoundBack size={24} className="text-black-100" />
              <p className="text-black-100 text-base font-bold">Back</p>
            </motion.button>
          </div>
          <div className="mb-4">
            <h1 className="mb-2 text-xl text-black-100 font-bold">
              {product.name}
            </h1>
            <p className="mb-2 text-base text-black-100/75 font-semibold capitalize">
              {product.section}
            </p>
            <p className="mb-12 text-base text-black-100 font-semibold">
              ${product.price}
            </p>
          </div>

          <div className="mb-4">
            <div className="mb-4 overflow-hidden">
              <span className="text-base text-black-100 font-bold">Colors</span>
            </div>
            <div className="mb-8 w-full grid grid-cols-8 gap-2 ">
              {product.color.map((color) => (
                <div className="flex flex-col items-center justify-center gap-2 cursor-pointer">
                  <button
                    key={color}
                    title={color}
                    onClick={() => setSelectedColor(color)}
                    className="w-4 h-4 rounded-full p-4 border border-border-100 cursor-pointer transition-all duration-200"
                    style={{ backgroundColor: color }}
                  />
                  {selectedColor === color && (
                    <div
                      className={`absolute flex items-center justify-center mix-blend-exclusion`}
                    >
                      <MdCheck
                        size={20}
                        className="relative text-white-100 -top-0"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="w-full mb-4 h-fit flex justify-between items-center overflow-hidden">
            <p className="w-full text-base text-black-100 font-bold">
              Select size
            </p>
            <div className="w-full  flex items-center justify-end gap-2">
              <TbRulerMeasure size={16} className="text-black-100" />
              <span className="text-base text-black-100 font-bold cursor-pointer">
                Size Guide
              </span>
            </div>
          </div>
          <div className="mb-8 w-full grid grid-cols-5 gap-2 max-ds:grid-cols-4 max-lg:grid-cols-6 max-md:grid-cols-5">
            {product.sizes.map((size) => (
              <button
                key={size}
                className={`border border-bb w-full rounded-[0.25rem] py-3 text-base flex items-center justify-center transition-all duration-200 ${
                  selectedSize === size
                    ? "border-black-100"
                    : "border-border-100"
                } cursor-pointer`}
                onClick={() => setSelectedSize(size)}
              >
                <p
                  className={`text-sm font-bold ${
                    selectedSize === size ? "text-black-100" : "text-black-200"
                  } transition-all duration-200`}
                >
                  {size}
                </p>
              </button>
            ))}
          </div>

          <div className="mb-8 w-full flex items-center gap-2">
            <button
              onClick={handleAddToCart}
              className="w-full h-[50px] px-6 py-2 bg-black-100 rounded-full  flex items-center justify-center cursor-pointer transition-all duration-200
              hover:bg-black-200"
            >
              <p className="text-white-100 text-md font-semibold transition-all duration-200">
                Add to Bag
              </p>
            </button>
            <button
              onClick={() => toggleFavorite(product)}
              aria-label={
                isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"
              }
              className="w-full h-[50px] px-6 py-2 bg-white-100 border border-border-100 rounded-full flex items-center justify-center cursor-pointer"
            >
              {isFavorite ? (
                <FaHeart size={18} className="text-red-500" />
              ) : (
                <FaRegHeart size={18} className="text-red-500" />
              )}
            </button>
          </div>

          <div>
            <h2 className="mb-2 text-base text-black-100 font-bold">
              Description
            </h2>
            <p className="text-md text-black-100/75 font-medium">
              {product.description}
            </p>
          </div>
        </div>
      </motion.main>
    </>

);
};

export default ProductDetailPage;

import React, { useEffect, useState } from "react";
import { MdCheck, MdOutlineKeyboardArrowDown } from "react-icons/md";

import { colorsData, priceData, sizes, menustructure } from "@/data/filterData";
import useFavoritesStore from "@/store/favoritesStore";
import useFilterStore from "@/store/filterStore";

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
size: false,
gender: true,
section: true,
subcategory: false,
price: false,
});
const selectedGender = new Set(gender.map((g) => g.toLowerCase()));
const selectedSection = new Set(section.map((s) => s.toLowerCase()));
const selectedSubcategory = new Set(subcategory.map((s) => s.toLowerCase()));
const selectedColor = new Set(color.map((c) => c.toLowerCase()));
const selectedSize = new Set(size);
const genderOptions = menustructure.map((group) => group.gender);
const sectionOptionsSet = new Set();
const subcategoryOptionsSet = new Set();
const sectionOptions = Array.from(sectionOptionsSet);
const subcategoryOptions = Array.from(subcategoryOptionsSet);

const toggleOpen = (key) =>
setOpen((prev) => ({ ...prev, [key]: !prev[key] }));

const toggleArrayValue = (arr, value) =>
arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];

const handleToggle = (current, value, setter, single = false) => {
const lowerValue = value.toLowerCase();
const alreadySelected = current.includes(lowerValue);

    const updated = single
      ? alreadySelected
        ? []
        : [lowerValue]
      : toggleArrayValue(current, lowerValue);

    setter(updated);

};

const handlePriceChange = (value) => {
const [min, max] = value.split("-").map(Number);
const [currentMin, currentMax] = price;

    const isSame = currentMin === min && currentMax === max;

    if (isSame) {
      setPrice([0, 9999]);
    } else {
      setPrice([min, max]);
    }

};

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

useEffect(() => {
if (gender.length === 0) {
setSubcategory([]);
}
}, [gender]);

return (
<div className="pr-4 overflow-y-scroll h-screen flex flex-col max-lg:overflow-y-hidden">
<div className="relative">
{/_ Favorites _/}
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
