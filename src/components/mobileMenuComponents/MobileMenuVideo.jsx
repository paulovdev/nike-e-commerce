import { clipAnimation } from "@/animations/animations";
import { motion } from "framer-motion";

const MobileMenuVideo = () => {
  return (
    <motion.video
      variants={clipAnimation}
      initial="initial"
      animate="animate"
      exit="exit"
      custom={0.1}
      src="/assets/home/welcome.mp4"
      width={1000}
      height={1000}
      className="h-[275px] object-cover"
      autoPlay
      muted
    />
  );
};

export default MobileMenuVideo;
