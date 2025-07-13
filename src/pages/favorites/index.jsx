import FavoriteItem from "@/components/favoritesComponents/FavoriteItem";
import EmptyFavorites from "@/components/favoritesComponents/EmptyFavorites";
import FavoritesSidebar from "@/components/favoritesComponents/FavoritesSidebar";
import useFavoritesStore from "@/store/favoritesStore";

const FavoritesPage = () => {
  const favorites = useFavoritesStore((state) => state.favorites);

  return (
    <main className="max-w-[1000px] h-full mx-auto flex items-center justify-center max-lg:flex-col">
      <div className="size-full p-top-l p-5 flex-[3] self-start flex flex-col items-start justify-start">
        <h1 className="mb-12 text-black-100 text-xl font-semibold">
          Favorites
        </h1>

        {favorites.length === 0 ? (
          <EmptyFavorites />
        ) : (
          <div className="w-full h-fit overflow-hidden flex flex-col gap-6">
            {favorites.map((item) => (
              <FavoriteItem key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>

      <FavoritesSidebar />
    </main>
  );
};

export default FavoritesPage;
