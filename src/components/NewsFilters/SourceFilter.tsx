import { type ReactElement, type FormEvent } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getSourcesFromNewsApi } from '../../services/newsApi';

interface SourceFilterProps {
  selectedSourceNames: string[];
  setSelectedSourceNames: (sources: string[]) => void;
  selectedSourceIds: string[];
  setSelectedSourceIds: (sources: string[]) => void;
}

export function SourceFilter({
  selectedSourceNames,
  setSelectedSourceNames,
  selectedSourceIds,
  setSelectedSourceIds,
}: SourceFilterProps): ReactElement {
  const {
    data: sources,
    isFetching: isFetchingSources,
    isError: isSourcesError,
    error: sourcesError,
  } = useQuery({
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
      {isSourcesError && (
        <p className="text-lg text-center mt-4 text-red-500">
          Error: {sourcesError.message}
        </p>
      )}
      {!isFetchingSources && sources && (
        <div className="mt-4">
          <p>Sources:</p>
          <form className="border rounded-md h-24 overflow-y-auto">
            <fieldset className="p-2 disabled:bg-gray-200 sm:flex sm:flex-wrap sm:justify-between">
              {sources.map((source) => (
                <div key={source.id} className="mt-1 sm:w-1/4">
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
          {selectedSourceNames?.length > 0 && (
            <p>Selected sources: {selectedSourceNames.join(', ')}</p>
          )}
        </div>
      )}
    </>
  );
}
