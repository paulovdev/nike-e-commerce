import { sortOrders } from "@/data/filterData";
import useFilterStore from "@/store/filterStore";

import { useState } from "react";
import SortByDesktop from "./sortByComponents/SortByDesktop";
import SortByMobile from "./sortByComponents/SortByMobile";

const SortBy = () => {
  const { sortOrder, setSortOrder } = useFilterStore();
  const [orderDrop, setOrderDrop] = useState(false);

  return (
    <div className="relative size-fit select-none">
      <SortByDesktop
        sortOrders={sortOrders}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        orderDrop={orderDrop}
        setOrderDrop={setOrderDrop}
      />

      <SortByMobile
        sortOrders={sortOrders}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />
    </div>
  );
};

export default SortBy;
