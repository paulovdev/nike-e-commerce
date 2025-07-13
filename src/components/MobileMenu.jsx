import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useFilterStore from "@/store/filterStore";
import { useRouter } from "next/router";
import { menuAnimation, textSlideAnimation } from "@/animations/animations";
import { SiNike } from "react-icons/si";
import { X } from "lucide-react";
import { menustructure } from "@/data/filterData";
import MobileMenuBack from "./mobileMenuComponents/MobileMenuBack";
import MobileMenuVideo from "./mobileMenuComponents/MobileMenuVideo";
import Overlay from "./Overlay";

const MobileMenu = ({ toggleMobileMenu, setToggleMobileMenu }) => {
  const router = useRouter();
  const { setGender, setSection, setSubcategory } = useFilterStore();

  const [step, setStep] = useState("gender");
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);

  const handleBack = () => {
    if (step === "subcat") {
      setStep("section");
      setSelectedSection(null);
    } else if (step === "section") {
      setStep("gender");
      setSelectedGender(null);
    }
  };

  const handleGenderClick = (gender) => {
    setSelectedGender(gender);
    setStep("section");
  };

  const handleSectionClick = (section) => {
    setSelectedSection(section);
    setStep("subcat");
  };

  const handleSelect = (gender, section, subcategory = null) => {
    setGender([gender]);
    setSection([section]);
    setSubcategory(subcategory ? [subcategory] : []);
    setToggleMobileMenu(false);
    router.push("/shop");
  };

  const genderData = menustructure.map((item) => item.gender);
  const sectionData =
    selectedGender &&
    menustructure.find((item) => item.gender === selectedGender)?.sections;
  const subcategories =
    sectionData && selectedSection && sectionData[selectedSection];

  return (
    <div className="fixed inset-0 w-screen h-[100dvh] flex items-center justify-between z-100">
      <motion.div
        className="relative size-full bg-white-100 z-50 select-none flex-[1.5] overflow-y-scroll flex flex-col max-h-screen max-lg:flex-[3]"
        variants={menuAnimation}
        initial="menuClosed"
        animate={toggleMobileMenu && "menuOpen"}
        exit="menuClosed"
      >
        <div className="px-5 py-3 flex items-center justify-end">
          <div
            className="flex items-center gap-2 group cursor-pointer"
            onClick={() => setToggleMobileMenu(false)}
          >
            <p className="text-black-100 text-sm font-bold uppercase">CLOSE</p>
            <X
              size={18}
              className="text-black-100 transition-all duration-500 group-hover:rotate-45"
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <div
            key={step}
            className="pt-5 p-10 flex flex-col gap-2 max-md:p-5 max-md:pt-10"
          >
            <div
              className="mb-4 overflow-hidden group"
              onClick={() => {
                router.push("/");
                setToggleMobileMenu(false);
              }}
            >
              <motion.div
                variants={textSlideAnimation}
                initial="initial"
                animate="animate"
                exit="exit"
                custom={0.1}
              >
                <SiNike
                  className="text-black-100 group-hover:translate-x-1 transition-all duration-200"
                  size={72}
                />
              </motion.div>
            </div>

            {(step === "section" || step === "subcat") && (
              <MobileMenuBack handleBack={handleBack} />
            )}

            <nav className="flex-1">
              {step === "gender" && (
                <div className="flex flex-col items-start text-start">
                  {genderData.map((gender) => (
                    <div
                      className="overflow-hidden"
                      key={gender}
                      onClick={() => handleGenderClick(gender)}
                    >
                      <motion.p
                        variants={textSlideAnimation}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        custom={0.1}
                        className="text-black-100 text-exl font-bold leading-[1.35] uppercase"
                      >
                        {gender}
                      </motion.p>
                    </div>
                  ))}
                </div>
              )}

              {step === "section" && sectionData && (
                <div className="flex flex-col items-start text-start">
                  {Object.entries(sectionData).map(([section, subcats]) => (
                    <div
                      className="overflow-hidden"
                      key={section}
                      onClick={() => handleSectionClick(section)}
                    >
                      <motion.p
                        variants={textSlideAnimation}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        custom={0.1}
                        className="text-black-100 text-exl font-bold leading-[1.35] uppercase"
                      >
                        {section}
                      </motion.p>
                    </div>
                  ))}
                </div>
              )}

              {step === "subcat" && subcategories && (
                <div className="flex flex-col items-start text-start">
                  <div
                    className="overflow-hidden"
                    onClick={() =>
                      handleSelect(selectedGender, selectedSection)
                    }
                  >
                    <motion.p
                      variants={textSlideAnimation}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      custom={0.1}
                      className="text-black-100 text-exl font-bold leading-[1.35] uppercase"
                    >
                      All {selectedSection}
                    </motion.p>
                  </div>

                  {subcategories.map((subcat) => (
                    <div
                      className="overflow-hidden"
                      key={subcat}
                      onClick={() =>
                        handleSelect(selectedGender, selectedSection, subcat)
                      }
                    >
                      <motion.p
                        variants={textSlideAnimation}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        custom={0.1}
                        className="text-black-100 text-exl font-bold leading-[1.35] uppercase"
                      >
                        {subcat}
                      </motion.p>
                    </div>
                  ))}
                </div>
              )}
            </nav>

            <div className="mt-12">
              <MobileMenuVideo />
            </div>
          </div>
        </AnimatePresence>
      </motion.div>

      <div className="relative size-full flex-[1] max-ds:hidden" />
      <div className="relative size-full flex-[1.5] max-md:hidden" />

      <Overlay
        onClick={() => setToggleMobileMenu(false)}
        variants={menuAnimation}
        initial="overlayClosed"
        animate="overlayOpen"
        exit="overlayClosed"
      />
    </div>
  );
};

export default MobileMenu;
