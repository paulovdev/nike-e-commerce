import React from "react";
import { motion } from "framer-motion";
import { textSlideAnimation } from "@/animations/animations";
import Link from "next/link";
import useUIStore from "@/store/uiStore";

const slugify = (str) =>
  str
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");

const MobileMenuSubcategory = ({
  selectedGender,
  selectedSection,
  activeSubcategory,
  menuStructure,
}) => {
  const { closeMobileMenu } = useUIStore();

  const currentSubcategories =
    menuStructure[selectedGender]?.[selectedSection] || [];

  return (
    <ul key="subcat" className="flex flex-col">
      <li className="h-fit overflow-hidden">
        <motion.div
          variants={textSlideAnimation}
          initial="initial"
          animate="animate"
          exit="exit"
          custom={0.1}
        >
          <Link
            href={`/shop/${selectedGender}/${selectedSection}`}
            onClick={closeMobileMenu}
            className={`text-exl font-bold uppercase leading-[1.35] ${
              !activeSubcategory ? "text-black-100" : "text-black-100/50"
            }`}
          >
            All {selectedSection}
          </Link>
        </motion.div>
      </li>

      {currentSubcategories.map((subcat, i) => {
        const sectionSlug = slugify(subcat);
        const isActiveSubCategory = activeSubcategory === sectionSlug;

        return (
          <li key={subcat} className="h-fit overflow-hidden">
            <motion.div
              variants={textSlideAnimation}
              initial="initial"
              animate="animate"
              exit="exit"
              custom={0.1 + (i + 1) * 0.05}
            >
              <Link
                href={`/shop/${selectedGender}/${selectedSection}/${sectionSlug}`}
                onClick={closeMobileMenu}
                className={`text-exl font-bold uppercase leading-[1.35] ${
                  isActiveSubCategory ? "text-black-100" : "text-black-100/50"
                }`}
              >
                {subcat}
              </Link>
            </motion.div>
          </li>
        );
      })}
    </ul>
  );
};

export default MobileMenuSubcategory;
