import type { ReactElement, ChangeEvent } from 'react';

interface NewsSearchProps {
  searchText: string;
  setSearchText: (searchText: string) => void;
}

export function NewsSearch({
  searchText,
  setSearchText,
}: NewsSearchProps): ReactElement {
  function handleSearchTextChange(event: ChangeEvent<HTMLInputElement>): void {
    setSearchText(event.target.value);
  }

  return (
    <form className="mt-4 sm:w-1/2 sm:mx-auto">
      <input
        type="search"
        placeholder="Search news..."
        onChange={handleSearchTextChange}
        value={searchText}
        className="border rounded-md p-2 w-full"
      />
    </form>
  );
}
