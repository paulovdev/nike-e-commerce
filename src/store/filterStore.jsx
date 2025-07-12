import { create } from "zustand";

const useFilterStore = create((set, get) => ({
  // Estado atual dos filtros
  sortOrder: "price-asc",
  gender: [],
  section: [],
  subcategory: [],
  color: [],
  size: [],
  price: [0, 1000],
  favoritesOnly: false,

  // Estado salvo antes de ativar favoritos
  previousFilters: null,

  // Setters individuais
  setSortOrder: (order) => set({ sortOrder: order }),
  setGender: (gender) => set({ gender }),
  setSection: (section) => set({ section }),
  setSubcategory: (subcategory) => set({ subcategory }),
  setColor: (color) => set({ color }),
  setSize: (size) => set({ size }),
  setPrice: (price) => set({ price }),

  // Toggle de favoritos que salva ou restaura os filtros
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

  // Ainda pode usar essas se quiser resetar manualmente
  resetAllExceptFavorites: () =>
    set((state) => ({
      gender: [],
      section: [],
      subcategory: [],
      color: [],
      size: [],
      price: [0, 1000],
      sortOrder: "price-asc",
      favoritesOnly: state.favoritesOnly,
    })),

  resetAllFilters: () =>
    set({
      gender: [],
      section: [],
      subcategory: [],
      color: [],
      size: [],
      price: [0, 1000],
      sortOrder: "price-asc",
      favoritesOnly: false,
    }),
}));

export default useFilterStore;
