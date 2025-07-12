import { MdKeyboardArrowDown } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import { opacityAnimation } from "@/animations/animations";
const SortByDesktop = ({
  sortOrders,
  sortOrder,
  setSortOrder,
  setOrderDrop,
  orderDrop,
}) => {
  return (
    <>
      <div
        className="flex items-center gap-2 max-lg:hidden"
        onClick={() => setOrderDrop(!orderDrop)}
      >
        <p className="w-full text-base text-black-100 font-bold">Sort By</p>
        <MdKeyboardArrowDown
          size={32}
          className={`text-black-100 ${
            orderDrop ? "rotate-180" : ""
          } transition-all duration-200`}
        />
      </div>
      <div className="max-lg:hidden">
        <AnimatePresence>
          {orderDrop && (
            <>
              <motion.div
                className="absolute -left-38 p-5 w-62 h-fit rounded-[.25rem] bg-white-100 border border-border-100 z-50 "
                variants={opacityAnimation}
                initial="initial"
                animate="animateCustom"
                exit="exitCustom"
                custom={0.3}
                onClick={() => setOrderDrop(false)}
              >
                {sortOrders.map((order) => {
                  const isActive = sortOrder === order.order;
                  return (
                    <p
                      className={`text-base  ${
                        isActive
                          ? "text-black-100 font-bold"
                          : "text-black-100/75 font-medium"
                      } cursor-pointer`}
                      onClick={() => setSortOrder(order.order)}
                    >
                      {order.title}
                    </p>
                  );
                })}
              </motion.div>
              <div
                className="fixed inset-0 w-screen h-screen z-40"
                onClick={() => setOrderDrop(false)}
              />
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default SortByDesktop;
