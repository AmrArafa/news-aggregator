import { type FormEvent, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  getAllNewsFromNewsApi,
  getTopHeadlinesFromNewsApi,
} from './services/newsApi';
import { NewsCard } from './components/NewsCard';

export function NewsAggregator(): React.ReactElement {
  const [searchText, setSearchText] = useState('');

  const {
    data: allArticles,
    isFetching: isFetchingAllArticles,
    refetch: refetchNews,
  } = useQuery({
    queryKey: ['newsApiNews'],
    queryFn: () => getAllNewsFromNewsApi({ searchText }),
    select: (data) => data.articles,
    enabled: false,
    refetchOnWindowFocus: false,
  });

  const { data: topHeadlines, isFetching: isFetchingTopHeadlines } = useQuery({
    queryKey: ['newsApiNews'],
    queryFn: () => getTopHeadlinesFromNewsApi(),
    select: (data) => data.articles,
    enabled: searchText.length === 0 && allArticles === undefined,
    refetchOnWindowFocus: false,
  });

  function handleSearchTextChange(
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    setSearchText(event.target.value);
  }

  function handleSearch(event: FormEvent): void {
    event.preventDefault();
    refetchNews();
  }

  return (
    <div className="p-5">
      <h1 className="text-3xl text-center">News Aggregator</h1>
      <form className="flex mt-4" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search news..."
          onChange={handleSearchTextChange}
          value={searchText}
          className="border rounded-md p-2 grow"
        />
        <button
          className="border rounded-md p-2 ms-2 disabled:text-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed"
          disabled={searchText.length === 0}
        >
          Search
        </button>
      </form>
      <h2 className="mt-4 text-lg">Filters:</h2>
      {(isFetchingAllArticles || isFetchingTopHeadlines) && <p>Loading...</p>}
      {!isFetchingAllArticles && allArticles && (
        <div className="mt-5 grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {allArticles.map((article) => (
            <NewsCard key={article.title} article={article} />
          ))}
        </div>
      )}
      {!isFetchingTopHeadlines && topHeadlines && !allArticles && (
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
