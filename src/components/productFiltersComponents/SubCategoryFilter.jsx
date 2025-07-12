import Link from "next/link";
import { useRouter } from "next/router";
import menuStructure from "@/data/menuStructure";

const SubCategoryFilter = () => {
  const router = useRouter();
  const { slug } = router.query;

  const gender = Array.isArray(slug) && slug.length > 0 ? slug[0] : null;
  const section = Array.isArray(slug) && slug.length > 1 ? slug[1] : null;
  const subcategory = Array.isArray(slug) && slug.length > 2 ? slug[2] : null;

  const currentSubcategories =
    gender && section && menuStructure[gender]?.[section]
      ? menuStructure[gender][section]
      : [];

  if (currentSubcategories.length === 0) return null;

  const isActiveAll = !subcategory;

  return (
    <div className="py-5 border-b border-border-100 select-none">
      <div className="w-fit flex flex-col gap-1">
        <Link
          href={`/shop/${gender}/${section}`}
          className={`text-base capitalize cursor-pointer ${
            isActiveAll
              ? "text-black-100 font-bold"
              : "text-black-100/75 font-medium"
          } cursor-pointer`}
        >
          All  {section}
        </Link>

        {currentSubcategories.map((subcat) => {
          const subcatSlug = subcat.toLowerCase();
          const isActive =
            subcategory === subcatSlug ||
            (!subcategory && subcatSlug === "all");

          return (
            <Link
              key={subcat}
              href={`/shop/${gender}/${section}/${subcatSlug}`}
              className={`text-base capitalize cursor-default ${
                isActive
                  ? "text-black-100 font-bold"
                  : "text-black-100/75 font-medium"
              } cursor-pointer`}
            >
              {subcat}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SubCategoryFilter;
