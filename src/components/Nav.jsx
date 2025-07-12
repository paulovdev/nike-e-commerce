import { useState } from "react";
import Link from "next/link";
import { SiNike } from "react-icons/si";
import MegaMenu from "./MegaMenu";
import { menustructure } from "@/data/filterData";
import { BiShoppingBag } from "react-icons/bi";

import useUIStore from "@/store/uiStore";
import { AnimatePresence, motion } from "framer-motion";
import { textSlideAnimation } from "@/animations/animations";
import MobileMenu from "./MobileMenu";
import { FaRegHeart } from "react-icons/fa";
import { useRouter } from "next/router";
import useFilterStore from "@/store/filterStore";

const Nav = () => {
  const [hoveredGender, setHoveredGender] = useState(null);
  const router = useRouter();
  const { toggleMobileMenu, isMobileMenuOpen } = useUIStore();
  const { setGender, setSection, setSubcategory } = useFilterStore();

  const genders = ["men", "women", "kids"];

  return (
    <>
      <nav className="fixed top-0 left-0 w-screen h-fit bg-white-100 border-b border-border-100 flex flex-col items-center z-50 ">
        <div className="relative p-2 w-full bg-black-100 flex items-center justify-center">
          <p className="text-white-100 text-xs font-semibold uppercase">
            Nike UP TO 70% OFF Enjoy the discount on selected products.
          </p>
        </div>
        <div className="relative px-5 w-full flex items-center justify-between max-lg:p-3 pointer-events-none">
          <Link
            href="/"
            className="w-full text-black-100 text-base flex items-start justify-start max-lg:hidden cursor-pointer"
          >
            <SiNike className="text-black-100  pointer-events-auto" size={52} />
          </Link>

          <motion.div
            variants={textSlideAnimation}
            initial="initial"
            animate="animate"
            exit="exit"
            custom={0.1}
            className="hidden flex-col gap-1.5 pointer-events-auto cursor-pointer max-lg:flex"
            onClick={toggleMobileMenu}
          >
            <div className="w-[36px] h-[2px] bg-black-100" />
            <div className="w-[36px] h-[2px] bg-black-100" />
          </motion.div>

          <div className="w-fit z-50 flex max-lg:hidden gap-8">
            {genders.map((gender) => {
              const selectedGenderObj = menustructure.find(
                (item) => item.gender === gender
              );

              return (
                <motion.div
                  key={gender}
                  onHoverStart={() => setHoveredGender(gender)}
                  onHoverEnd={() => setHoveredGender(null)}
                  className="cursor-default pointer-events-auto"
                >
                  <Link
                    href={`/${gender}`}
                    className="relative w-full px-5 text-black-100 font-semibold capitalize flex select-none group"
                    onClick={() => setHoveredGender(null)}
                  >
                    {gender}
                    <div className="absolute -bottom-4 left-0 h-[3px] w-0 bg-black-100 group-hover:w-full transition-all duration-300" />
                  </Link>

                  <AnimatePresence mode="popLayout">
                    {hoveredGender === gender && selectedGenderObj && (
                      <MegaMenu
                        gender={gender}
                        sections={selectedGenderObj.sections}
                        setHoveredGender={setHoveredGender}
                        setGender={setGender}
                        setSection={setSection}
                        setSubcategory={setSubcategory}
                      />
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          <div className="w-full flex gap-8 items-end justify-end">
            <button
              onClick={() => router.push("/favorites")}
              className="relative pointer-events-auto cursor-pointer"
            >
              <FaRegHeart size={24} />
            </button>
            <button
              onClick={() => router.push("/cart")}
              className="relative pointer-events-auto cursor-pointer"
            >
              <BiShoppingBag size={28} className="text-black-100" />
            </button>
          </div>
        </div>
      </nav>
      <AnimatePresence mode="wait">
        {isMobileMenuOpen && <MobileMenu />}
      </AnimatePresence>
    </>
  );
};

export default Nav;
