import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import products from "@/data/products";
import useCartStore from "@/store/cartStore";
import { AiOutlinePlus } from "react-icons/ai";

import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { opacityAnimation, textSlideAnimation } from "@/animations/animations";
import { motion } from "framer-motion";
import { TbRulerMeasure } from "react-icons/tb";
import {
  MdCheck,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";
import useFavoritesStore from "@/store/favoritesStore";
import { IoIosArrowRoundBack } from "react-icons/io";
import Image from "next/image";

const ProductDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedImage, setSelectedImage] = useState("");

  const addItem = useCartStore((state) => state.addItem);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const favorites = useFavoritesStore((state) => state.favorites);

  useEffect(() => {
    if (!id) return;
    const prod = products.find((p) => p.id === id);
    setProduct(prod);
    if (prod && prod.images.length > 0) {
      setSelectedImage(prod.images[0]); // imagem inicial
    }
  }, [id]);

  if (!product) return <p>Loading...</p>;

  const isFavorite = favorites.some((p) => p.id === product.id);

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
    <motion.main
      className="size-full p-5"
      variants={opacityAnimation}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="relative max-w-[1000px] w-full mx-auto min-h-screen p-top-l p-5 flex gap-8 max-lg:flex-col">
        {/* IMAGENS */}
        <div className="sticky top-[125px] h-screen flex-[1.5] flex flex-col">
          <div className="relative w-full">
            <Image
              src={selectedImage}
              width={1200}
              height={1200}
              alt={product.name}
              className="w-full object-cover border border-border-100 rounded-[.25rem]"
            />
            <div className="absolute bottom-0 right-0 p-5 flex items-center gap-2">
              <span className="w-10 h-10 p-2 rounded-full bg-white-200  flex items-center justify-center">
                <MdKeyboardArrowLeft size={26} className="text-black-100" />
              </span>
              <span className="w-10 h-10 p-2 rounded-full bg-white-200 flex items-center justify-center">
                <MdKeyboardArrowRight size={26} className="text-black-100" />
              </span>
            </div>
          </div>

          {/* Thumbnails Scrollable with Snap */}
          <div className="mt-2 flex gap-2 overflow-x-auto snap-x snap-mandatory">
            {product.images.map((img, i) => (
              <div
                key={i}
                className="snap-start shrink-0"
                onClick={() => setSelectedImage(img)}
              >
                <Image
                  src={img}
                  width={120}
                  height={120}
                  alt={`${product.name} image ${i + 1}`}
                  className={`w-[100px] h-[100px] border object-cover rounded-[.25rem] cursor-pointer transition-all duration-200 
                  ${
                    img === selectedImage
                      ? "border-black-100"
                      : "border-border-100"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* DETALHES */}
        <div className="h-full flex-[1] flex flex-col max-lg:relative">
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
              <IoIosArrowRoundBack size={24} className="text-black-100" />
              <p className="text-black-100 text-base font-bold">Back</p>
            </motion.button>
          </div>

          <div className="mb-12">
            <h1 className="text-sl text-black-100 font-bold">{product.name}</h1>
            <p className="mb-4 text-base text-black-100/75 font-semibold capitalize">
              {product.section}
            </p>
            <p className="text-base text-black-100 font-semibold">
              ${product.price}
            </p>
          </div>

          {/* CORES */}
          <div className="mb-4">
            <span className="text-base text-black-100 font-bold">
              Select Color
            </span>
            <div className="mb-8 w-full grid grid-cols-8 gap-2 mt-2">
              {product.color.map((color) => (
                <div
                  key={color}
                  className="relative flex flex-col items-center justify-center gap-2 cursor-pointer"
                >
                  <button
                    title={color}
                    onClick={() => setSelectedColor(color)}
                    className="w-4 h-4 rounded-full p-5 border border-border-100 cursor-pointer transition-all duration-200 "
                    style={{ backgroundColor: color }}
                  />
                  {selectedColor === color && (
                    <div className="absolute">
                      <MdCheck
                        size={20}
                        className="text-white-100 mix-blend-exclusion"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* TAMANHOS */}
          <div className="w-full mb-4 h-fit flex justify-between items-center overflow-hidden">
            <p className="w-full text-base text-black-100 font-bold">
              Select size
            </p>
            <div className="w-full flex items-center justify-end gap-2">
              <TbRulerMeasure size={16} className="text-black-100" />
              <span className="text-base text-black-100 font-bold cursor-pointer">
                Size Guide
              </span>
            </div>
          </div>

          <div className="mb-8 w-full grid grid-cols-3 gap-2 max-ds:grid-cols-4 max-lg:grid-cols-6 max-md:grid-cols-5">
            {product.sizes.map((size) => (
              <button
                key={size}
                className={`border w-full rounded-[0.25rem] py-3 text-base flex items-center justify-center transition-all duration-200 ${
                  selectedSize === size
                    ? "border-black-100"
                    : "border-border-100"
                }`}
                onClick={() => setSelectedSize(size)}
              >
                <p
                  className={`text-md font-semibold ${
                    selectedSize === size ? "text-black-100" : "text-black-200"
                  }`}
                >
                  {size}
                </p>
              </button>
            ))}
          </div>

          <div className="mb-8 max-w-[300px] mx-auto w-full flex justify-center items-center gap-2">
            <p className="text-black-100 text-md font-medium text-center">
              4 interest-free payments of $37.50 with
              <span className="font-bold">Klarna</span>
              <span className="underline"> Learn More</span>
            </p>
          </div>

          {/* BOTÕES */}
          <div className="mb-8 w-full flex items-center gap-2">
            <button
              onClick={handleAddToCart}
              className="w-full h-[50px] px-6 py-2 bg-black-100 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-black-200"
            >
              <p className="text-white-100 text-md font-semibold">Add to Bag</p>
            </button>
            <button
              onClick={() => toggleFavorite(product)}
              aria-label={
                isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"
              }
              className="w-full h-[50px] px-6 py-2 bg-white-100 border border-border-100 rounded-full flex items-center justify-center"
            >
              {isFavorite ? (
                <FaHeart size={18} className="text-red-500" />
              ) : (
                <FaRegHeart size={18} className="text-red-500" />
              )}
            </button>
          </div>

          {/* DESCRIÇÃO */}
          <div className="mb-12 ">
            <h2 className="mb-2 text-base text-black-100 font-bold">
              Description
            </h2>
            <p className="text-base text-black-100/75 font-medium tracking-[-.3px]">
              {product.description}
            </p>
          </div>

          <div className="mb-4">
            <p className="mb-1 text-base text-black-100 font-bold">Shipping</p>
            <p className="text-base text-black-100/75 font-medium">
              You'll see our shipping options at checkout.
            </p>
          </div>

          <div className="mb-12">
            <p className="mb-1 text-base text-black-100 font-bold">
              Free Pickup
            </p>
            <p className="text-base text-black-100/75 font-medium underline">
              Find a Store
            </p>
          </div>

          <div className="mb-12 w-full h-[100px] p-5 bg-gray-100 flex items-center justify-center">
            <p className="text-black-100 text-base font-semibold text-center">
              This product is made with at least 65% recycled polyester fibers
            </p>
          </div>

          <div className="mb-12">
            <p className="text-base text-black-100/75 font-medium">
              We took our iconic smooth-on-both-sides fleece and delivered a
              heavyweight version that's our thickest and warmest yet. These
              open-hem pants have a pin tuck detail running down the sides and
              an exaggerated, oversized fit.
            </p>
          </div>

          <div className="mb-12 pl-5">
            <ol className="list-disc">
              <li className="text-black-100 text-base font-semibold">
                Shown: White/Black/Black
              </li>
              <li className="text-black-100 text-base font-semibold">
                Style: DX5089-103
              </li>
            </ol>
          </div>

          <div className="mb-6">
            <p className="text-base text-black-100 font-bold underline underline-offset-4">
              View Product Details
            </p>
          </div>

          <div className="">
            <div className="w-full py-3 border-t border-border-100 flex items-center justify-between cursor-pointer">
              <p className="text-sl text-black-100 font-medium">
                Shipping & Returns
              </p>
              <MdOutlineKeyboardArrowDown size={32} />
            </div>
            <div className="w-full py-3 border-t border-border-100 flex items-center justify-between cursor-pointer">
              <p className="text-sl text-black-100 font-medium">
                How This Was Made
              </p>
              <MdOutlineKeyboardArrowDown size={32} />
            </div>
            <div className="w-full py-3 border-t border-border-100 flex items-center justify-between cursor-pointer">
              <p className="text-sl text-black-100 font-medium">Reviews (95)</p>
              <MdOutlineKeyboardArrowDown size={32} />
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <div className="">
          <h2 className="mb-1 text-sl font-medium text-black-100">
            How Others Are Wearing It
          </h2>
          <p className="mb-2 text-base font-normal text-black-100 tracking-[-.3px]">
            Upload your photo or mention @Nike on Instagram for a chance to be
            featured.
          </p>
          <button className="mb-6 w-[200px] h-[35px] bg-white-200 border border-border-100 rounded-full flex items-center justify-center">
            Upload your photo
          </button>
        </div>
        <div className="size-full flex items-center justify-between gap-2">
          {gram.map((item) => (
            <div className="size-full flex flex-col ">
              <Image
                src={item.img}
                width={1000}
                height={1000}
                alt=""
                className="mb-2 w-full h-[350px] object-cover bg-black-200 rounded-[.5rem]"
              />
              <p className="text-base text-black-100 font-bold">{item.name}</p>
            </div>
          ))}

          <div className="size-full flex flex-col ">
            <div className="mb-8 p-5 w-full h-[350px]  bg-white-200 rounded-[.5rem] border border-border-100 flex items-center justify-center">
              <div className="flex flex-col items-center justify-center gap-4">
                <p className="max-w-[250px] text-sl text-black-100 font-medium text-center leading-[1.1]">
                  Be one of the first to show your style
                </p>
                <div className="w-10 h-10 p-2 bg-black-200 rounded-full flex items-center justify-center">
                  <AiOutlinePlus size={20} className="text-white-200" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
};

const gram = [
  { name: "@piroca", img: "/assets/gram/img-1.webp" },
  { name: "@piroca", img: "/assets/gram/img-2.webp" },
  { name: "@piroca", img: "/assets/gram/img-3.webp" },
];

export default ProductDetailPage;
