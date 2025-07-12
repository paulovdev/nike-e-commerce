import { useRouter } from "next/router";
import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import products from "@/data/products";
import ProductCard from "@/components/ProductCard";
import ProductFilters from "@/components/ProductFilters";
import ProductFiltersMobile from "@/components/ProductFiltersMobile";
import SortBy from "@/components/SortBy";
import useFilterStore from "@/store/filterStore";
import { opacityAnimation } from "@/animations/animations";
import useFavoritesStore from "@/store/favoritesStore.js";
import BreadCrumb from "@/components/BreadCrumb";

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
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Shop;
