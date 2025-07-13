import { create } from "zustand";

const useFilterStore = create((set, get) => ({
  sortOrder: "price-asc",
  gender: [],
  section: [],
  subcategory: [],
  color: [],
  size: [],
  price: [0, 1000],
  favoritesOnly: false,

  previousFilters: null,

  setSortOrder: (order) => set({ sortOrder: order }),
  setGender: (gender) => set({ gender }),
  setSection: (section) => set({ section }),
  setSubcategory: (subcategory) => set({ subcategory }),
  setColor: (color) => set({ color }),
  setSize: (size) => set({ size }),
  setPrice: (price) => set({ price }),

  toggleFavoritesOnly: () =>
    set((state) => {
      const isEnabling = !state.favoritesOnly;

      if (isEnabling) {
        return {
          favoritesOnly: true,
          previousFilters: {
            sortOrder: state.sortOrder,
            gender: state.gender,
            section: state.section,
            subcategory: state.subcategory,
            color: state.color,
            size: state.size,
            price: state.price,
          },
          sortOrder: "price-asc",
          gender: [],
          section: [],
          subcategory: [],
          color: [],
          size: [],
          price: [0, 1000],
        };
      } else {
        return {
          favoritesOnly: false,
          ...(state.previousFilters || {
            sortOrder: "price-asc",
            gender: [],
            section: [],
            subcategory: [],
            color: [],
            size: [],
            price: [0, 1000],
          }),
          previousFilters: null,
        };
      }
    }),
}));

export default useFilterStore;
