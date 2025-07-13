import { motion } from "framer-motion";

import ItemCard from "@/components/ItemCard";
import ProductFilters from "@/components/ProductFilters";
import ProductFiltersMobile from "@/components/ProductFiltersMobile";
import SortBy from "@/components/SortBy";

import { opacityAnimation } from "@/animations/animations";
import BreadCrumb from "@/components/BreadCrumb";

import useFilteredProducts from "@/hooks/useFilteredProducts";
const Shop = () => {
  const { filteredProducts } = useFilteredProducts();
  return (
    <div className="relative min-h-screen flex flex-col max-lg:flex-col">
      <div className="sticky top-0 px-5 py-2 bg-white-100 flex justify-between items-center mb-4 z-20">
        <div className=" flex flex-col">
          <BreadCrumb filteredCount={filteredProducts.length} />
        </div>

        <div className="hidden max-lg:flex">
          <ProductFiltersMobile />
        </div>

        <div className="flex items-center gap-2 max-lg:hidden cursor-pointer">
          <SortBy />
        </div>
      </div>

      <div className="px-5 flex justify-between items-start">
        <aside className="sticky top-[79px] pr-5 flex-[0.75] flex flex-col max-lg:hidden">
          <ProductFilters />
        </aside>

        <section className="w-full flex-[5] flex flex-col">
          {filteredProducts.length === 0 ? (
            <p>No products found for this filter.</p>
          ) : (
            <motion.div
              className="grid grid-cols-3 max-lg:grid-cols-3 max-md:grid-cols-2 gap-4"
              variants={opacityAnimation}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {filteredProducts.map((product) => (
                <ItemCard key={product.id} product={product} />
              ))}
            </motion.div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Shop;
