import { create } from "zustand";

const useFavoritesStore = create((set, get) => ({
  favorites: [],

  addFavorite: (product) => {
    if (!product || !product.id) return;
    set((state) => {
      if (state.favorites.find((p) => p.id === product.id)) return state;
      return { favorites: [...state.favorites, product] };
    });
  },

  removeFavorite: (productId) =>
    set((state) => ({
      favorites: state.favorites.filter((p) => p.id !== productId),
    })),

  toggleFavorite: (product) => {
    if (!product || !product.id) return;

    const { favorites } = get();
    const isFav = favorites.find((p) => p.id === product.id);

    if (isFav) {
      set({
        favorites: favorites.filter((p) => p.id !== product.id),
      });
    } else {
      set({
        favorites: [...favorites, product],
      });
    }
  },

  isFavorite: (productId) => {
    const { favorites } = get();
    return favorites.some((p) => p.id === productId);
  },
}));

export default useFavoritesStore;
