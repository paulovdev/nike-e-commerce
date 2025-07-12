import { clipAnimation, megaMenuAnimation } from "@/animations/animations";
import { motion } from "framer-motion";
import Image from "next/image";
import Overlay from "./Overlay";
import { useRouter } from "next/router";

const MegaMenu = ({
  gender,
  sections,
  setHoveredGender,
  setGender,
  setSection,
  setSubcategory,
}) => {
  const router = useRouter();

  if (!sections || Object.keys(sections).length === 0) {
    return null;
  }

  // Função para setar filtros globais via Zustand e navegar pra /shop
  const handleClick = (genderVal, sectionVal = null, subcategoryVal = null) => {
    setGender && setGender([genderVal]);
    setSection && setSection(sectionVal ? [sectionVal] : []);
    setSubcategory && setSubcategory(subcategoryVal ? [subcategoryVal] : []);

    setHoveredGender(null);
    router.push("/shop");
  };

  return (
    <>
      <motion.div
        className="absolute top-[53px] left-0 w-screen bg-white-100 z-50 overflow-hidden"
        variants={megaMenuAnimation}
        initial="menuClosed"
        animate="menuOpen"
        exit="menuClosed"
      >
        <div className="w-full h-[30vh] max-w-[1200px] mx-auto flex items-center justify-between">
          <div className="size-full flex items-center justify-center gap-8">
            <div className="w-full h-[150px]">
              <ul className="grid grid-cols-3 ">
                {Object.entries(sections).map(([section, subcategories]) => (
                  <div key={section} className="ml-4 w-[200px]">
                    <button
                      onClick={() => handleClick(gender, section)}
                      className="text-base uppercase block mb-4 cursor-pointer transition-all duration-200 text-black-100 font-semibold"
                    >
                      All {section}
                    </button>

                    {subcategories.map((subcategory) => (
                      <li key={subcategory}>
                        <button
                          onClick={() =>
                            handleClick(gender, section, subcategory)
                          }
                          className="w-full text-base text-start capitalize transition-all duration-200 text-black-100/75 font-semibold cursor-pointer"
                        >
                          {subcategory}
                        </button>
                      </li>
                    ))}
                  </div>
                ))}
              </ul>
            </div>

            <div className="size-full flex items-center justify-center gap-2">
              {[
                "/assets/promos/promo-7-26.jpg",
                "/assets/promos/promo-7-27.avif",
              ].map((src, i) => (
                <motion.figure
                  key={i}
                  variants={clipAnimation}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  custom={0.2 + i * 0.1}
                  className="w-full"
                >
                  <Image
                    src={src}
                    width={1000}
                    height={1000}
                    alt={`Promo ${i + 1}`}
                    className="w-full object-contain"
                  />
                </motion.figure>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <Overlay
        variants={megaMenuAnimation}
        initial="overlayClosed"
        animate="overlayOpen"
        exit="overlayClosed"
        onHoverStart={() => setHoveredGender(null)}
        customClass="top-[9vh]"
      />
    </>
  );
};

export default MegaMenu;
