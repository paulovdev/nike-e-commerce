import useFavoritesStore from "@/store/favoritesStore.js";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { motion } from "framer-motion";
import Image from "next/image";
import { textSlideAnimation } from "@/animations/animations";
import { useRouter } from "next/router";

const ProductCard = ({ product }) => {
  const { id, name, price, image, section, subcategory } = product;
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const isFavorite = useFavoritesStore((state) => state.isFavorite(id));

  const router = useRouter();

  return (
    <div className="flex flex-col items-start justify-start group">
      <div className="relative size-full flex justify-start items-start">
        <motion.figure className="relative mb-4 ">
          <Image
            src={image}
            width={1200}
            height={1200}
            alt={name}
            className=" h-[400px] object-cover border border-border-100 rounded-[.25rem]"
            onClick={() => router.push(`/product/${id}`)}
          />
        </motion.figure>
        <button
          className="absolute top-3 left-3 w-10 h-10 bg-white-100 border border-border-100 rounded-full flex items-center justify-center pointer-events-auto cursor-pointer"
          onClick={() => toggleFavorite(product)}
        >
          {isFavorite ? (
            <FaHeart size={18} className="text-red-500 " />
          ) : (
            <FaRegHeart size={18} className="text-black-100" />
          )}
        </button>
      </div>
      <div
        className="mb-12 h-full flex flex-col items-start justify-end "
        onClick={() => router.push(`/product/${id}`)}
      >
        <div className="mb-1 h-fit overflow-hidden">
          <motion.h2
            className="text-base text-black-100 font-bold"
            variants={textSlideAnimation}
            initial="initial"
            animate="animate"
            exit="exit"
            custom={0.05}
          >
            {name}
          </motion.h2>
        </div>
        <div className="mb-4 h-fit overflow-hidden">
          <motion.h2
            className="text-md text-black-100/75 font-medium capitalize"
            variants={textSlideAnimation}
            initial="initial"
            animate="animate"
            exit="exit"
            custom={0.05}
          >
            {section} <span className="text-sm">•</span> {subcategory}
          </motion.h2>
        </div>
        <div className="mb-4 h-fit overflow-hidden">
          <motion.div
            className="text-base text-black-100 font-bold capitalize"
            variants={textSlideAnimation}
            initial="initial"
            animate="animate"
            exit="exit"
            custom={0.05}
          >
            <p className="">${price}</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
