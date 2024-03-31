import { type ReactElement, type FormEvent } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getSourcesFromNewsApi } from '../../services/newsApi';

interface SourceFilterProps {
  selectedSourceNames: string[];
  setSelectedSourceNames: (sources: string[]) => void;
  selectedSourceIds: string[];
  setSelectedSourceIds: (sources: string[]) => void;
  searchText: string;
}

export function SourceFilter({
  selectedSourceNames,
  setSelectedSourceNames,
  selectedSourceIds,
  setSelectedSourceIds,
  searchText,
}: SourceFilterProps): ReactElement {
  const { data: sources, isFetching: isFetchingSources } = useQuery({
    queryKey: ['newsApiSources'],
    queryFn: () => getSourcesFromNewsApi(),
    select: (data) => data.sources,
    refetchOnWindowFocus: false,
  });

  function handleSourceSelect(event: FormEvent<HTMLInputElement>): void {
    if (event.currentTarget.checked) {
      setSelectedSourceIds([...selectedSourceIds, event.currentTarget.id]);
      setSelectedSourceNames([
        ...selectedSourceNames,
        event.currentTarget.name,
      ]);
    }

    if (!event.currentTarget.checked) {
      setSelectedSourceIds(
        selectedSourceIds.filter((id) => id !== event.currentTarget.id)
      );
      setSelectedSourceNames(
        selectedSourceNames.filter((name) => name !== event.currentTarget.name)
      );
    }
  }

  return (
    <>
      {isFetchingSources && (
        <p className="text-lg text-center mt-4">Getting sources...</p>
      )}
      {!isFetchingSources && sources && (
        <div className="mt-4">
          <p>Sources:</p>
          <form className="border rounded-md h-24 overflow-y-auto">
            <fieldset
              disabled={searchText.length === 0}
              className="p-2 disabled:bg-gray-200"
            >
              {sources.map((source) => (
                <div key={source.id} className="mt-1">
                  <input
                    type="checkbox"
                    id={source.id}
                    name={source.name}
                    onChange={handleSourceSelect}
                  />
                  <label htmlFor={source.id} className="ms-1">
                    {source.name}
                  </label>
                </div>
              ))}
            </fieldset>
          </form>
          {selectedSourceNames?.length > 0 && searchText.length > 0 && (
            <p>Selected sources: {selectedSourceNames.join(', ')}</p>
          )}
          {searchText.length === 0 && (
            <p className="text-sm mt-2 text-gray-400 italic">
              Note: filtering by source is available when search text is
              provided.
            </p>
          )}
        </div>
      )}
    </>
  );
}
