import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoFilterSharp } from "react-icons/io5";

import { X } from "lucide-react";
import { filterAnimation } from "@/animations/animations";
import ProductFilters from "./ProductFilters";
import Overlay from "./Overlay";

const ProductFiltersMobile = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="hidden max-lg:block cursor-pointer">
        {/*Filter Button */}
        <button
          className="w-22 h-10 bg-white-100 border border-border-100 rounded-full flex items-center justify-center"
          onClick={() => setOpen(true)}
        >
          <IoFilterSharp size={22} className="text-black-100" />
        </button>
      </div>
      <AnimatePresence mode="wait">
        {open && (
          <div className="fixed w-screen h-[100dvh] inset-0 flex items-center justify-between z-100">
            <motion.div
              className="relative size-full bg-white-100 z-50 select-none flex-[3] flex flex-col max-h-screen"
              variants={filterAnimation}
              initial="menuClosed"
              animate={open && "menuOpen"}
              exit="menuClosed"
            >
              <div
                className="fixed bottom-0 w-full h-[50px] bg-black-100  flex items-center justify-center z-50"
                onClick={() => setOpen(false)}
              >
                <p className="text-white-100 text-base font-semibold">Apply</p>
              </div>

              <div className="py-10 px-5">
                <ProductFilters />
              </div>
            </motion.div>
            <Overlay
              onClick={() => setOpen(false)}
              variants={filterAnimation}
              initial="menuClosed"
              animate={open && "menuOpen"}
              exit="menuClosed"
            />
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductFiltersMobile;
