import { motion } from "framer-motion";

const Overlay = ({
  onClick,
  variants,
  initial,
  animate,
  exit,
  customClass,
  onHoverStart,
}) => {
  return (
    <motion.div
      className={`fixed w-screen h-screen inset-0 backdrop-blur-md brightness-75 z-40 ${customClass}`}
      onClick={onClick}
      variants={variants}
      initial={initial}
      animate={animate}
      exit={exit}
      onHoverStart={onHoverStart}
    />
  );
};

export default Overlay;
