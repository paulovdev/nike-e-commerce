import Link from "next/link";

const FavoritesSidebar = () => {
  return (
    <div className="sticky top-0 p-top-l p-5 size-full self-start flex-[2] flex flex-col items-start justify-start">
      <h1 className="mb-12 text-black-100 text-xl font-semibold">
        Explore More
      </h1>
      <p className="text-black-100/75 text-md font-medium mb-6">
        Continue shopping or check out your bag.
      </p>

      <Link
        href="/shop"
        className="mb-4 w-full h-[50px] bg-black-100 text-white-100 rounded-full flex items-center justify-center text-md font-semibold"
      >
        Back to Shop
      </Link>
      <Link
        href="/cart"
        className="w-full h-[50px] bg-white-100 border border-border-100 text-black-100 rounded-full flex items-center justify-center text-md font-semibold"
      >
        Go to Bag
      </Link>
    </div>
  );
};

export default FavoritesSidebar;
