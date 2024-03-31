import { type ReactElement, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import { getAllNewsFromNewsApi } from '../../services/newsApi';
import { getDefaultDateFrom, getDefaultDateTo } from '../../utils/dateUtils';
import { PAGE_SIZE } from '../../utils/constants';
import { NewsCard } from '../NewsCard';
import { NewsSearch } from '../NewsSearch';
import { DateFilter, SourceFilter } from '../NewsFilters';
import { Pagination } from '../Pagination';

export function Articles(): ReactElement {
  const defaultDateFrom = getDefaultDateFrom();
  const defaultDateTo = getDefaultDateTo();

  const [searchText, setSearchText] = useState('');
  const [dateFrom, setDateFrom] = useState(defaultDateFrom);
  const [dateTo, setDateTo] = useState(defaultDateTo);
  const [selectedSourceIds, setSelectedSourceIds] = useState<string[]>([]);
  const [selectedSourceNames, setSelectedSourceNames] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearchText = useDebounce(searchText, 500);

  const canFetchAllArticles =
    dateFrom !== '' &&
    dateTo !== '' &&
    (debouncedSearchText !== '' || selectedSourceIds.length > 0);

  const {
    data: allArticlesData,
    isFetching: isFetchingAllArticles,
    isError: isArticlesError,
    error: articlesError,
  } = useQuery({
    queryKey: [
      'newsApiNews',
      debouncedSearchText,
      dateFrom,
      dateTo,
      selectedSourceIds,
      currentPage,
    ],
    queryFn: () =>
      getAllNewsFromNewsApi({
        page: currentPage,
        pageSize: PAGE_SIZE,
        searchText: debouncedSearchText,
        dateFrom,
        dateTo,
        sources: selectedSourceIds.join(','),
      }),
    enabled: canFetchAllArticles,
    refetchOnWindowFocus: false,
  });

  const isLoading = isFetchingAllArticles;

  const isEmpty = !isLoading && allArticlesData?.articles?.length === 0;

  const canShowArticles =
    !isLoading && !isEmpty && allArticlesData && !isArticlesError;

  const totalResults = allArticlesData?.totalResults ?? 0;

  const showNote = searchText === '' && selectedSourceIds.length === 0;

  return (
    <div>
      <NewsSearch searchText={searchText} setSearchText={setSearchText} />
      {showNote && (
        <p className="text-sm mt-2 text-gray-400 italic">
          Note: Please type a keyword in the search box or select a source to
          display news.
        </p>
      )}
      <h2 className="text-lg font-semibold mt-4">Filters:</h2>
      <DateFilter
        dateFrom={dateFrom}
        setDateFrom={setDateFrom}
        dateTo={dateTo}
        setDateTo={setDateTo}
        defaultDateFrom={defaultDateFrom}
        defaultDateTo={defaultDateTo}
      />
      <SourceFilter
        selectedSourceNames={selectedSourceNames}
        setSelectedSourceNames={setSelectedSourceNames}
        selectedSourceIds={selectedSourceIds}
        setSelectedSourceIds={setSelectedSourceIds}
      />
      {isLoading && <p className="text-lg text-center mt-4">Loading news...</p>}
      {isArticlesError && (
        <p className="text-lg text-red-500 text-center mt-4">
          Error: {articlesError.message}
        </p>
      )}
      {isEmpty && (
        <p className="text-lg text-center mt-4">
          No articles found. Please try different filters or use different
          keywords in search.
        </p>
      )}
      {canShowArticles && (
        <div className="mt-5 grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {allArticlesData.articles?.map((article) => {
            if (article.title === '[Removed]') return null;
            return <NewsCard key={article.publishedAt} article={article} />;
          })}
        </div>
      )}
      <Pagination
        totalItems={totalResults}
        currentPage={totalResults === 0 ? 0 : currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
