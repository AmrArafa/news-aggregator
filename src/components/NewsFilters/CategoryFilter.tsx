import { type ReactElement, type ChangeEvent } from 'react';

interface CategoryFilterProps {
  setCategory: (category: string) => void;
}

export function CategoryFilter({
  setCategory,
}: CategoryFilterProps): ReactElement {
  function handleCategoryChange(event: ChangeEvent<HTMLSelectElement>): void {
    setCategory(event.target.value);
  }

  return (
    <div className="mt-4">
      <label>Category:</label>
      <select className="border rounded-md p-2" onChange={handleCategoryChange}>
        <option value="">All</option>
        <option value="business">Business</option>
        <option value="entertainment">Entertainment</option>
        <option value="general">General</option>
        <option value="health">Health</option>
        <option value="science">Science</option>
        <option value="sports">Sports</option>
        <option value="technology">Technology</option>
      </select>
    </div>
  );
}
