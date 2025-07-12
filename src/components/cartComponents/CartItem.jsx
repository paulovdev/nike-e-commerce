import useCartStore from "@/store/cartStore";
import { Trash, Minus, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { opacityAnimation } from "@/animations/animations";
import Link from "next/link";

const CartItem = ({ item }) => {
  const {
    id,
    name,
    price,
    gender,
    selectedSize,
    selectedColor,
    quantity,
    image,
  } = item;

  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  return (
    <motion.div
      key={`${id}-${selectedSize}-${selectedColor}`}
      variants={opacityAnimation}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex flex-col items-start justify-start border-b border-border-100 pb-4"
    >
      <div className="mb-8 w-full flex items-center justify-between -4">
        <div className="flex items-center gap-6 flex-1">
          <Link href={`/product/${id}`}>
            <img
              src={image}
              alt={name}
              className="w-30 h-30 object-cover rounded-[0.25rem]"
            />
          </Link>
          <div>
            <h3 className="text-black-100 text-base font-bold">{name}</h3>
            <p className="text-black-100/75 text-md font-medium flex items-center gap-2">
              Size <span className="underline">{selectedSize}</span>
            </p>
            <div className="mb-4 flex items-center gap-2">
              <p className="text-black-100/75 text-md font-medium capitalize">
                {selectedColor}
              </p>
              •
              <p className="text-black-100/75 text-md font-medium capitalize">
                {gender}
              </p>
            </div>
            <p className="text-black-100 text-base font-bold">${price}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {quantity > 1 ? (
            <button
              onClick={() =>
                updateQuantity(
                  id,
                  selectedSize,
                  selectedColor,
                  Math.max(1, quantity - 1)
                )
              }
              className="w-10 h-10 bg-white-100 rounded-full border border-border-100 flex items-center justify-center hover:bg-white-200"
            >
              <Minus size={16} />
            </button>
          ) : (
            <button
              onClick={() => removeItem(id, selectedSize, selectedColor)}
              className="w-10 h-10 bg-white-100 border border-border-100 rounded-full flex items-center justify-center pointer-events-auto text-black-100 hover:text-red-500 "
            >
              <Trash size={16} />
            </button>
          )}
          <input
            readOnly
            value={quantity}
            className="w-10 h-10 text-center rounded-full border border-border-100 text-sm font-bold"
          />
          <button
            onClick={() =>
              updateQuantity(id, selectedSize, selectedColor, quantity + 1)
            }
            className="w-10 h-10 bg-white-100 rounded-full border border-border-100 flex items-center justify-center hover:bg-white-200"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
      <div className="mb-4">
        <p className="text-base font-bold text-black-100 flex items-center gap-2">
          Shipping Arrives Tue, Jul 15 - Mon, Jul 21
        </p>
        <p className="text-black-100/75 text-base font-medium underline flex items-center gap-2">
          Edit Location
        </p>
      </div>
      <div className="mb-4">
        <p className="text-base font-bold text-black-100 flex items-center gap-2">
          Free Pickup
        </p>
        <p className="text-black-100/75 text-base font-medium underline flex items-center gap-2">
          Find a Store
        </p>
      </div>
    </motion.div>
  );
};

export default CartItem;
