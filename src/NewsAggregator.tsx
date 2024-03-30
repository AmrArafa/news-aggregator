import { type ReactElement, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import {
  getAllNewsFromNewsApi,
  getTopHeadlinesFromNewsApi,
} from './services/newsApi';
import { NewsCard } from './components/NewsCard';
import { NewsSearch } from './components/NewsSearch';
import { NewsFilters } from './components/NewsFilters';
import { getDefaultDateFrom, getDefaultDateTo } from './utils/dateUtils';

export function NewsAggregator(): ReactElement {
  const defaultDateFrom = getDefaultDateFrom();
  const defaultDateTo = getDefaultDateTo();

  const [searchText, setSearchText] = useState('');
  const [dateFrom, setDateFrom] = useState(defaultDateFrom);
  const [dateTo, setDateTo] = useState(defaultDateTo);

  const debouncedSearchText = useDebounce(searchText, 500);

  const { data: allArticles, isFetching: isFetchingAllArticles } = useQuery({
    queryKey: ['newsApiNews', debouncedSearchText, dateFrom, dateTo],
    queryFn: () =>
      getAllNewsFromNewsApi({
        searchText: debouncedSearchText,
        dateFrom,
        dateTo,
      }),
    select: (data) => data.articles,
    enabled: debouncedSearchText.length > 0 && dateFrom !== '' && dateTo !== '',
    refetchOnWindowFocus: false,
  });

  const { data: topHeadlines, isFetching: isFetchingTopHeadlines } = useQuery({
    queryKey: ['newsApiTopHeadlines', debouncedSearchText, allArticles],
    queryFn: () => getTopHeadlinesFromNewsApi(),
    select: (data) => data.articles,
    enabled: debouncedSearchText.length === 0 && allArticles === undefined,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="p-5">
      <h1 className="text-3xl text-center font-bold">News Aggregator</h1>
      <NewsSearch searchText={searchText} setSearchText={setSearchText} />
      <NewsFilters
        dateFrom={dateFrom}
        setDateFrom={setDateFrom}
        dateTo={dateTo}
        setDateTo={setDateTo}
        defaultDateFrom={defaultDateFrom}
        defaultDateTo={defaultDateTo}
      />
      {(isFetchingAllArticles || isFetchingTopHeadlines) && (
        <p className="text-lg text-center mt-4">Loading...</p>
      )}
      {!isFetchingAllArticles && allArticles && allArticles.length === 0 && (
        <p className="text-lg text-center mt-4">
          No articles found. Please try different filters.
        </p>
      )}
      {!isFetchingAllArticles && allArticles && (
        <div className="mt-5 grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {allArticles.map((article) => (
            <NewsCard key={article.title} article={article} />
          ))}
        </div>
      )}
      {!isFetchingTopHeadlines &&
        !isFetchingAllArticles &&
        topHeadlines &&
        !allArticles && (
          <div className="mt-5 grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {topHeadlines.map((article) => (
              <NewsCard key={article.title} article={article} />
            ))}
          </div>
        )}
    </div>
  );
}

export default NewsAggregator;
