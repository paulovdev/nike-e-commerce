import { useMemo } from "react";
import products from "@/data/products";
import useFilterStore from "@/store/filterStore";
import useFavoritesStore from "@/store/favoritesStore";

const useFilteredProducts = () => {
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

  const filtered = useMemo(() => {
    let filteredList = [...products];

    if (favoritesOnly) {
      const favoriteIds = new Set(favorites.map((p) => p.id));
      filteredList = filteredList.filter((p) => favoriteIds.has(p.id));
    }

    if (gender.length)
      filteredList = filteredList.filter((p) =>
        gender.includes(p.gender.toLowerCase())
      );

    if (section.length)
      filteredList = filteredList.filter((p) =>
        section.includes(p.section.toLowerCase())
      );

    if (subcategory.length)
      filteredList = filteredList.filter((p) =>
        subcategory.includes(p.subcategory.toLowerCase())
      );

    if (color.length)
      filteredList = filteredList.filter((p) =>
        p.color.some((c) => color.includes(c.toLowerCase()))
      );

    if (size.length)
      filteredList = filteredList.filter((p) =>
        p.sizes.some((s) => size.includes(s.toLowerCase()))
      );

    if (price[0] !== 0 || price[1] !== 1000) {
      filteredList = filteredList.filter(
        (p) => p.price >= price[0] && p.price <= price[1]
      );
    }

    return filteredList;
  }, [
    gender,
    section,
    subcategory,
    color,
    size,
    price,
    favoritesOnly,
    favorites,
  ]);

  const sorted = useMemo(() => {
    const sortedList = [...filtered];
    switch (sortOrder) {
      case "price-asc":
        return sortedList.sort((a, b) => a.price - b.price);
      case "price-desc":
        return sortedList.sort((a, b) => b.price - a.price);
      case "name-asc":
        return sortedList.sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc":
        return sortedList.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return sortedList;
    }
  }, [filtered, sortOrder]);

  return { filteredProducts: sorted };
};

export default useFilteredProducts;
