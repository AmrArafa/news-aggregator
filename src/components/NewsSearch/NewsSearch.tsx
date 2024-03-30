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
    <form className="flex mt-4">
      <input
        type="search"
        placeholder="Search news..."
        onChange={handleSearchTextChange}
        value={searchText}
        className="border rounded-md p-2 grow"
      />
    </form>
  );
}
