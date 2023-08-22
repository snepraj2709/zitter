import { Searchbar } from "../search/Searchbar";

export function PageHeader({ page }) {
  return (
    <div className="sticky top-0 left-0 flex justify-between md:justify-around border-b border-gray-200 w-full backdrop-blur-md z-10">
      <h2 className="font-bold text-lg text-center m-3">{page}</h2>
      <Searchbar className="w-1/2" />
    </div>
  );
}
