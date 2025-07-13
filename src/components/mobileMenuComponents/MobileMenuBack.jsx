import { motion } from "framer-motion";
import { textSlideAnimation } from "@/animations/animations";
import { IoIosArrowRoundBack } from "react-icons/io";

const MobileMenuBack = ({ handleBack }) => {
  return (
    <div className="mb-4 h-fit overflow-hidden">
      <motion.button
        onClick={handleBack}
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
  );
};

export default MobileMenuBack;
