import { motion } from "framer-motion";
import Link from "next/link";
import { Trash } from "lucide-react";
import useFavoritesStore from "@/store/favoritesStore.js";
import { opacityAnimation } from "@/animations/animations";
import { FaHeart } from "react-icons/fa";

const FavoriteItem = ({ item }) => {
  const { id, name, price, gender, image } = item;

  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);

  return (
    <motion.div
      key={id}
      variants={opacityAnimation}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex items-center justify-between border-b border-border-100 pb-4"
    >
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
          <p className="mb-4 text-black-100/75 text-base font-medium capitalize">
            {gender}
          </p>
          <p className="text-black-100 text-base font-bold">${price}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => removeFavorite(id)}
          className="w-10 h-10 bg-white-100 border border-border-100 rounded-full flex items-center justify-center  hover:text-red-500"
          aria-label={`Remove ${name} from favorites`}
        >
          <Trash size={16} className="text-black-100" />
        </button>
        <div className="w-10 h-10 bg-white-100 border border-border-100 rounded-full flex items-center justify-center ">
          <FaHeart size={20} className="text-red-600" />
        </div>
      </div>
    </motion.div>
  );
};

export default FavoriteItem;
