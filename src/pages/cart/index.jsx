import useCartStore from "@/store/cartStore";
import CartItem from "@/components/cartComponents/CartItem";
import CartSummary from "@/components/cartComponents/CartSummary";
import EmptyCart from "@/components/cartComponents/EmptyCart";

const CartPage = () => {
  const cartItems = useCartStore((state) => state.cartItems);

  return (
    <main className="max-w-[1000px] h-full mx-auto flex items-center justify-center max-lg:flex-col">
      <div className="size-full p-top-l p-5 flex-[3] self-start flex flex-col items-start justify-start ">
        <h1 className="mb-12 text-black-100 text-xl font-semibold">Bag</h1>
        {cartItems.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="w-full h-fit overflow-hidden flex flex-col gap-6">
            {cartItems.map((item) => (
              <CartItem
                key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                item={item}
              />
            ))}
          </div>
        )}
      </div>
      <CartSummary />
    </main>
  );
};

export default CartPage;
