import { type ReactElement, type ChangeEvent } from 'react';
import { Category } from '../../models/newsApi';

interface CategoryFilterProps {
  setCategory: (category: Category) => void;
}

export function CategoryFilter({
  setCategory,
}: CategoryFilterProps): ReactElement {
  function handleCategoryChange(event: ChangeEvent<HTMLSelectElement>): void {
    setCategory(event.target.value as Category);
  }

  return (
    <div className="mt-4">
      <label>Category:</label>
      <select className="border rounded-md p-2" onChange={handleCategoryChange}>
        <option value="general">General</option>
        <option value="business">Business</option>
        <option value="entertainment">Entertainment</option>
        <option value="health">Health</option>
        <option value="science">Science</option>
        <option value="sports">Sports</option>
        <option value="technology">Technology</option>
      </select>
    </div>
  );
}
