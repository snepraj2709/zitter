import { Searchbar } from "../search/Searchbar";

function PageHeader({ page }) {
  return (
    <div className="flex flex-row justify-around border-b border-gray-200 pb-2 w-full">
      <h2 className="font-bold text-lg text-center m-3">{page}</h2>
      <Searchbar className="w-1/2" />
    </div>
  );
}

export default PageHeader;
