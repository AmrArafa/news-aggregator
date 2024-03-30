import { NewsApiResponse } from '../models/newsApi';

const NEWS_API_API_KEY = '906dbd7b93314ebbb011cfdcb80b5d4b';

export async function getAllNewsFromNewsApi({
  searchText,
}: {
  searchText: string;
}): Promise<NewsApiResponse> {
  const response = await fetch(
    `/everything?q=${searchText}&page=1&pageSize=5`,
    {
      headers: {
        method: 'GET',
        Authorization: `Bearer ${NEWS_API_API_KEY}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch news from News API');
  }

  return response.json() as Promise<NewsApiResponse>;
}

export async function getTopHeadlinesFromNewsApi(): Promise<NewsApiResponse> {
  const response = await fetch(`/top-headlines?country=de&page=1&pageSize=5`, {
    headers: {
      method: 'GET',
      Authorization: `Bearer ${NEWS_API_API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch top headlines from News API');
  }

  return response.json() as Promise<NewsApiResponse>;
}
