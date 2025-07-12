import { create } from "zustand";

const useFilterStore = create((set) => ({
  gender: "",
  selectedColors: [],
  selectedSizes: [],
  priceRange: [0, 1000],
  sortOrder: "asc",

  setGender: (gender) => set({ gender }),
  setColors: (colors) => set({ selectedColors: colors }),
  setSizes: (sizes) => set({ selectedSizes: sizes }),
  setPriceRange: (range) => set({ priceRange: range }),
  setSortOrder: (order) => set({ sortOrder: order }),

  resetFilters: () => {
    set({
      gender: "",
      selectedColors: [],
      selectedSizes: [],
      priceRange: [0, 1000],
      sortOrder: "asc",
    });
  },
}));

export default useFilterStore;
