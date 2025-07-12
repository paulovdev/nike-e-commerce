import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import products from "@/data/products";
import useCartStore from "@/store/cartStore";
import { ArrowDown } from "lucide-react";
import useFavoritesStore from "@/store/favoritesStore.js";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { opacityAnimation, textSlideAnimation } from "@/animations/animations";
import { motion } from "framer-motion";
import { TbRulerMeasure } from "react-icons/tb";
import { MdCheck, MdKeyboardReturn } from "react-icons/md";

const ProductDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const addItem = useCartStore((state) => state.addItem);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const favorites = useFavoritesStore((state) => state.favorites);

  const isFavorite = product
    ? favorites.some((p) => p.id === product.id)
    : false;

  useEffect(() => {
    if (!id) return;
    const prod = products.find((p) => p.id === id);
    setProduct(prod);
  }, [id]);

  if (!product) return <p>Loading...</p>;

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Por favor, selecione um tamanho");
      return;
    }
    if (!selectedColor) {
      alert("Por favor, selecione uma cor");
      return;
    }
    addItem({ ...product, selectedSize, selectedColor });
    alert("Produto adicionado ao carrinho!");
  };

  return (
    <>
      <motion.main
        className="relative min-h-screen flex flex-col lg:flex-row"
        variants={opacityAnimation}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className="flex-[3] flex flex-col max-lg:order-1">
          <div className="flex flex-col ">
            {product.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`${product.name} image ${i + 1}`}
                className="w-full h-screen object-cover"
              />
            ))}
          </div>

          <motion.div
            className="fixed bottom-5 w-full flex items-center justify-center gap-2 mix-blend-exclusion"
            variants={opacityAnimation}
            initial="initial"
            animate="animate"
            exit="exit"
            custom={0.1}
          >
            <span className="text-white-100 text-[12px] font-azeret uppercase">
              SCROLL
            </span>
            <ArrowDown size={16} className="text-white-100" />
          </motion.div>
        </div>

        <div className="sticky top-0 p-top-l p-5  h-screen flex-[1] flex flex-col max-lg:relative">
          <div className="mb-8 h-fit overflow-hidden">
            <motion.button
              onClick={() => router.push("/shop")}
              variants={textSlideAnimation}
              initial="initial"
              animate="animate"
              exit="exit"
              custom={0.1}
              aria-label="Go back"
              className="w-full overflow-hidden flex items-center gap-2"
            >
              <MdKeyboardReturn size={20} className="text-black-100" />
              <p className="text-black-100 text-sm font-bold uppercase">BACK</p>
            </motion.button>
          </div>
          <div className="mb-4">
            <h1 className="mb-2 text-xl text-black-100 font-bold">
              {product.name}
            </h1>
            <p className="mb-2 text-base text-black-100/75 font-semibold capitalize">
              {product.section}
            </p>
            <p className="mb-12 text-base text-black-100 font-semibold">
              ${product.price}
            </p>
          </div>

          <div className="mb-4">
            <div className="mb-4 overflow-hidden">
              <span className="text-base text-black-100 font-bold">Colors</span>
            </div>
            <div className="mb-8 w-full grid grid-cols-8 gap-2 ">
              {product.color.map((color) => (
                <div className="flex flex-col items-center justify-center gap-2 cursor-pointer">
                  <button
                    key={color}
                    title={color}
                    onClick={() => setSelectedColor(color)}
                    className="w-4 h-4 rounded-full p-4 border border-border-100 cursor-pointer transition-all duration-200"
                    style={{ backgroundColor: color }}
                  />
                  {selectedColor === color && (
                    <div
                      className={`absolute flex items-center justify-center mix-blend-exclusion`}
                    >
                      <MdCheck
                        size={20}
                        className="relative text-white-100 -top-0"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="w-full mb-4 h-fit flex justify-between items-center overflow-hidden">
            <p className="w-full text-base text-black-100 font-bold">
              Select size
            </p>
            <div className="w-full  flex items-center justify-end gap-2">
              <TbRulerMeasure size={16} className="text-black-100" />
              <span className="text-base text-black-100 font-bold cursor-pointer">
                Size Guide
              </span>
            </div>
          </div>
          <div className="mb-8 w-full grid grid-cols-5 gap-2 max-ds:grid-cols-4 max-lg:grid-cols-6 max-md:grid-cols-5">
            {product.sizes.map((size) => (
              <button
                key={size}
                className={`border border-bb w-full rounded-[0.25rem] py-3 text-base flex items-center justify-center transition-all duration-200 ${
                  selectedSize === size
                    ? "border-black-100"
                    : "border-border-100"
                } cursor-pointer`}
                onClick={() => setSelectedSize(size)}
              >
                <p
                  className={`text-sm font-bold ${
                    selectedSize === size ? "text-black-100" : "text-black-200"
                  } transition-all duration-200`}
                >
                  {size}
                </p>
              </button>
            ))}
          </div>

          <div className="mb-8 w-full flex items-center gap-2">
            <button
              onClick={handleAddToCart}
              className="w-full h-[50px] px-6 py-2 bg-black-100 rounded-full  flex items-center justify-center cursor-pointer transition-all duration-200
              hover:bg-black-200"
            >
              <p className="text-white-100 text-md font-semibold transition-all duration-200">
                Add to Bag
              </p>
            </button>
            <button
              onClick={() => toggleFavorite(product)}
              aria-label={
                isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"
              }
              className="w-full h-[50px] px-6 py-2 bg-white-100 border border-border-100 rounded-full flex items-center justify-center cursor-pointer"
            >
              {isFavorite ? (
                <FaHeart size={18} className="text-red-500" />
              ) : (
                <FaRegHeart size={18} className="text-red-500" />
              )}
            </button>
          </div>

          <div>
            <h2 className="mb-2 text-base text-black-100 font-bold">
              Description
            </h2>
            <p className="text-md text-black-100/75 font-medium">
              {product.description}
            </p>
          </div>
        </div>
      </motion.main>
    </>
  );
};

export default ProductDetailPage;
