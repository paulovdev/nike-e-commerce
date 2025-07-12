const SortByMobile = ({ sortOrders, sortOrder, setSortOrder }) => {
  return (
    <div className="hidden max-lg:block">
      <div className="hidden max-lg:block space-y-2">
        {sortOrders.map((order) => {
          const isActive = sortOrder === order.order;
          return (
            <label
              key={order.order}
              className={`flex items-center gap-2 text-base ${
                isActive
                  ? "text-black-100 font-bold"
                  : "text-black-100/75 font-medium"
              } cursor-pointer`}
            >
              <input
                type="radio"
                name="sortOrder"
                value={order.order}
                onChange={() => setSortOrder(order.order)}
                className="w-5 h-5 accent-black-100"
              />
              {order.title}
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default SortByMobile;
