import { type ReactElement, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import { getTopHeadlinesFromNewsApi } from '../../services/newsApi';
import { NewsCard } from '../NewsCard';
import { NewsSearch } from '../NewsSearch';
import { CategoryFilter } from '../NewsFilters';
import { Pagination } from '../Pagination';
import { PAGE_SIZE } from '../../utils/constants';
import { Category } from '../../models/newsApi';

export function TopHeadlines(): ReactElement {
  const [searchText, setSearchText] = useState('');
  const [category, setCategory] = useState<Category>('general');
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearchText = useDebounce(searchText, 500);

  const {
    data: topHeadlinesData,
    isFetching: isFetchingTopHeadlines,
    isError: isTopHeadlinesError,
    error: topHeadlinesError,
  } = useQuery({
    queryKey: [
      'newsApiTopHeadlines',
      debouncedSearchText,
      category,
      currentPage,
    ],
    queryFn: () =>
      getTopHeadlinesFromNewsApi({
        page: currentPage,
        pageSize: PAGE_SIZE,
        searchText: debouncedSearchText,
        category,
      }),
    refetchOnWindowFocus: false,
  });

  const isLoading = isFetchingTopHeadlines;

  const isEmpty = !isLoading && topHeadlinesData?.articles?.length === 0;

  const canShowHeadlines =
    !isLoading && !isEmpty && topHeadlinesData && !isTopHeadlinesError;

  const totalResults = topHeadlinesData?.totalResults ?? 0;

  return (
    <div>
      <NewsSearch searchText={searchText} setSearchText={setSearchText} />
      <CategoryFilter setCategory={setCategory} />
      {isLoading && <p className="text-lg text-center mt-4">Loading news...</p>}
      {isTopHeadlinesError && (
        <p className="text-lg text-red-500 text-center mt-4">
          Error: {topHeadlinesError.message}
        </p>
      )}
      {isEmpty && (
        <p className="text-lg text-center mt-4">
          No articles found. Please try different filters or use different
          keywords in search.
        </p>
      )}
      {canShowHeadlines && (
        <div className="mt-5 grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {topHeadlinesData.articles?.map((article) => {
            if (article.title === '[Removed]') return null;
            return <NewsCard key={article.title} article={article} />;
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
