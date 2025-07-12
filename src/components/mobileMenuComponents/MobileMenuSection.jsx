import React from "react";
import { motion } from "framer-motion";
import { textSlideAnimation } from "@/animations/animations";

const MobileMenuSection = ({
  selectedGender,
  setSelectedSection,
  setStep,
  menuStructure,
}) => {
  return (
    <div key="section" className="flex flex-col">
      {Object.keys(menuStructure[selectedGender]).map((section) => (
        <div className="h-fit overflow-hidden" key={section}>
          <motion.button
            variants={textSlideAnimation}
            initial="initial"
            animate="animate"
            exit="exit"
            custom={0.1}
            onClick={() => {
              setSelectedSection(section);
              setStep("subcat");
            }}
            className="text-black-100 text-exl font-bold leading-[1.35] uppercase"
          >
            {section}
          </motion.button>
        </div>
      ))}
    </div>
  );
};

export default MobileMenuSection;
