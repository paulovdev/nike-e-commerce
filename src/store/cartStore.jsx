import { create } from "zustand";

const useCartStore = create((set) => ({
  cartItems: [],

  addItem: (item) =>
    set((state) => {
      const quantityToAdd = item.quantity ?? 1;

      const existsIndex = state.cartItems.findIndex(
        (i) =>
          i.id === item.id &&
          i.selectedSize === item.selectedSize &&
          i.selectedColor === item.selectedColor
      );

      if (existsIndex > -1) {
        const updatedItems = [...state.cartItems];
        updatedItems[existsIndex].quantity += quantityToAdd;
        return { cartItems: updatedItems };
      }

      return {
        cartItems: [
          ...state.cartItems,
          {
            ...item,
            quantity: quantityToAdd, 
          },
        ],
      };
    }),

  removeItem: (itemId, size, color) =>
    set((state) => ({
      cartItems: state.cartItems.filter(
        (i) =>
          !(
            i.id === itemId &&
            i.selectedSize === size &&
            i.selectedColor === color
          )
      ),
    })),

  updateQuantity: (itemId, size, color, quantity) =>
    set((state) => {
      const updatedItems = state.cartItems.map((i) => {
        if (
          i.id === itemId &&
          i.selectedSize === size &&
          i.selectedColor === color
        ) {
          return { ...i, quantity };
        }
        return i;
      });
      return { cartItems: updatedItems };
    }),

  clearCart: () => set({ cartItems: [] }),
}));

export default useCartStore;
