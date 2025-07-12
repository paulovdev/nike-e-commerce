import useCartStore from "@/store/cartStore";
import { CircleQuestionMark } from "lucide-react";
import Link from "next/link";

const CartSummary = () => {
  const cartItems = useCartStore((state) => state.cartItems);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="sticky top-0 p-top-l p-5 size-full self-start flex-[2] flex flex-col items-start justify-start">
      <h1 className="mb-12 text-black-100 text-xl font-semibold">Summary</h1>

      <div className="mb-2 w-full flex justify-between items-center mt-4">
        <p className="text-base font-semibold text-black-100 flex items-center gap-2">
          Subtotal
          <CircleQuestionMark size={12} className="text-black-100" />
        </p>
        <p className="text-base font-bold text-black-100">${subtotal}</p>
      </div>

      <div className="mb-2 w-full flex justify-between items-center mt-4">
        <p className="text-base font-semibold text-black-100">
          Estimated Shipping & Handling
        </p>
        <p className="text-base font-bold text-black-100">Free</p>
      </div>

      <div className="mb-4 w-full flex justify-between items-center mt-4">
        <p className="text-base font-semibold text-black-100 flex items-center gap-2">
          Estimated Tax
          <CircleQuestionMark size={12} className="text-black-100" />
        </p>
        <p className="text-base font-bold text-black-100">—</p>
      </div>

      <div className="mb-8 w-full flex justify-between items-center mt-4">
        F<p className="text-base font-semibold text-black-100">Total</p>
        <p className="text-base font-bold text-black-100">${subtotal}</p>
      </div>

      <Link
        href="/checkout"
        className="mb-8 w-full h-[50px] bg-black-100 text-white-100 rounded-full flex items-center justify-center text-md font-semibold"
      >
        Checkout
      </Link>
      <p className="text-black-100/75 text-md font-medium">
        By selecting one of the above payment options, you confirm that you have
        read, understand, and agree to Nike’s Terms of Use, Terms of Sale and
        Return Policy, and acknowledge Nike’s Privacy Policy.
      </p>
    </div>
  );
};

export default CartSummary;
