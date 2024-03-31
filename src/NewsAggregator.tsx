import { type ReactElement, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import {
  getAllNewsFromNewsApi,
  getTopHeadlinesFromNewsApi,
} from './services/newsApi';
import { NewsCard } from './components/NewsCard';
import { NewsSearch } from './components/NewsSearch';
import {
  DateFilter,
  CategoryFilter,
  SourceFilter,
} from './components/NewsFilters';
import { getDefaultDateFrom, getDefaultDateTo } from './utils/dateUtils';

export function NewsAggregator(): ReactElement {
  const defaultDateFrom = getDefaultDateFrom();
  const defaultDateTo = getDefaultDateTo();

  const [searchText, setSearchText] = useState('');
  const [dateFrom, setDateFrom] = useState(defaultDateFrom);
  const [dateTo, setDateTo] = useState(defaultDateTo);
  const [category, setCategory] = useState('');
  const [selectedSourceIds, setSelectedSourceIds] = useState<string[]>([]);
  const [selectedSourceNames, setSelectedSourceNames] = useState<string[]>([]);

  const debouncedSearchText = useDebounce(searchText, 500);

  const canFetchAllArticles =
    dateFrom !== '' && dateTo !== '' && debouncedSearchText !== '';

  const canFetchTopHeadlines = selectedSourceIds.length === 0;

  const { data: allArticles, isFetching: isFetchingAllArticles } = useQuery({
    queryKey: [
      'newsApiNews',
      debouncedSearchText,
      dateFrom,
      dateTo,
      selectedSourceIds,
    ],
    queryFn: () =>
      getAllNewsFromNewsApi({
        searchText: debouncedSearchText,
        dateFrom,
        dateTo,
        sources: selectedSourceIds.join(','),
      }),
    select: (data) => data.articles,
    enabled: canFetchAllArticles,
    refetchOnWindowFocus: false,
  });

  const { data: topHeadlines, isFetching: isFetchingTopHeadlines } = useQuery({
    queryKey: ['newsApiTopHeadlines', debouncedSearchText, category],
    queryFn: () =>
      getTopHeadlinesFromNewsApi({ searchText: debouncedSearchText, category }),
    select: (data) => data.articles,
    enabled: canFetchTopHeadlines,
    refetchOnWindowFocus: false,
  });

  const isLoading = isFetchingAllArticles || isFetchingTopHeadlines;

  return (
    <div className="p-5">
      <h1 className="text-3xl text-center font-bold">News Aggregator</h1>
      <NewsSearch searchText={searchText} setSearchText={setSearchText} />
      <DateFilter
        dateFrom={dateFrom}
        setDateFrom={setDateFrom}
        dateTo={dateTo}
        setDateTo={setDateTo}
        defaultDateFrom={defaultDateFrom}
        defaultDateTo={defaultDateTo}
      />
      <CategoryFilter setCategory={setCategory} />
      <SourceFilter
        selectedSourceNames={selectedSourceNames}
        setSelectedSourceNames={setSelectedSourceNames}
        selectedSourceIds={selectedSourceIds}
        setSelectedSourceIds={setSelectedSourceIds}
        searchText={searchText}
      />
      {isLoading && <p className="text-lg text-center mt-4">Loading news...</p>}
      {!isLoading &&
        allArticles?.length === 0 &&
        topHeadlines?.length === 0 && (
          <p className="text-lg text-center mt-4">
            No articles found. Please try different filters or use different
            keywords in search.
          </p>
        )}
      {!isLoading && allArticles && (
        <div className="mt-5 grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {allArticles.map((article) => {
            if (article.title === '[Removed]') return null;
            return <NewsCard key={article.title} article={article} />;
          })}
        </div>
      )}
      {!isLoading && topHeadlines && (
        <div className="mt-5 grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {topHeadlines.map((article) => {
            if (article.title === '[Removed]') return null;
            return <NewsCard key={article.title} article={article} />;
          })}
        </div>
      )}
    </div>
  );
}

export default NewsAggregator;
