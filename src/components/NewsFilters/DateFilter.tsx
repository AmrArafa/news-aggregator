import type { ChangeEvent, ReactElement } from 'react';

interface DateFilterProps {
  dateFrom: string;
  setDateFrom: (dateFrom: string) => void;
  dateTo: string;
  setDateTo: (dateTo: string) => void;
  defaultDateFrom: string;
  defaultDateTo: string;
}

export function DateFilter({
  dateFrom,
  setDateFrom,
  dateTo,
  setDateTo,
  defaultDateFrom,
  defaultDateTo,
}: DateFilterProps): ReactElement {
  function handleDateFromChange(event: ChangeEvent<HTMLInputElement>): void {
    setDateFrom(event.target.value);
  }

  function handleDateToChange(
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    setDateTo(event.target.value);
  }

  return (
    <div className="mt-4">
      <form className="flex justify-between items-center sm:justify-normal sm:gap-4">
        <div>
          <label htmlFor="date-from">From:</label>
          <input
            className="border rounded-md p-2"
            type="date"
            id="date-from"
            max={defaultDateFrom}
            onChange={handleDateFromChange}
            value={dateFrom}
          />
        </div>
        <div>
          <label htmlFor="date-to">To:</label>
          <input
            className="border rounded-md p-2"
            type="date"
            id="date-to"
            max={defaultDateTo}
            onChange={handleDateToChange}
            value={dateTo}
          />
        </div>
      </form>
    </div>
  );
}
