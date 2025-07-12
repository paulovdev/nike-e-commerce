import React from "react";
import { motion } from "framer-motion";
import { textSlideAnimation } from "@/animations/animations";

const MobileMenuGender = ({ setSelectedGender, setStep, menuStructure }) => {
  return (
    <div key="gender" className="flex flex-col">
      {Object.keys(menuStructure).map((gender) => (
        <div className="h-fit overflow-hidden" key={gender}>
          <motion.button
            variants={textSlideAnimation}
            initial="initial"
            animate="animate"
            exit="exit"
            custom={0.1}
            onClick={() => {
              setSelectedGender(gender);
              setStep("section");
            }}
            className="text-black-100 text-exl font-bold leading-[1.35] uppercase"
          >
            {gender}
          </motion.button>
        </div>
      ))}
    </div>
  );
};

export default MobileMenuGender;
