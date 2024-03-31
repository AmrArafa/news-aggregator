import { NewsApiResponse } from '../models/newsApi';
/**
 * Please use this key ('906dbd7b93314ebbb011cfdcb80b5d4b')
 * if the other one reaches max request limit (100)
 */

const NEWS_API_API_KEY = 'df94539172744352ab8860956466d875';

interface AllNewsRequestParams {
  searchText: string;
  dateFrom: string;
  dateTo: string;
  sources: string;
}

interface TopHeadlinesRequestParams {
  searchText: string;
  category: string;
}

export async function getAllNewsFromNewsApi({
  searchText,
  dateFrom,
  dateTo,
  sources,
}: AllNewsRequestParams): Promise<NewsApiResponse> {
  const response = await fetch(
    `/everything?q=${searchText}&from=${dateFrom}&to=${dateTo}&sources=${sources}&language=en&page=1&pageSize=10`,
    {
      headers: {
        method: 'GET',
        Authorization: `Bearer ${NEWS_API_API_KEY}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error('failed to fetch news from News API');
  }

  return response.json() as Promise<NewsApiResponse>;
}

export async function getTopHeadlinesFromNewsApi({
  searchText,
  category,
}: TopHeadlinesRequestParams): Promise<NewsApiResponse> {
  const response = await fetch(
    `/top-headlines?country=us&q=${searchText}&category=${category}&page=1&pageSize=10`,
    {
      headers: {
        method: 'GET',
        Authorization: `Bearer ${NEWS_API_API_KEY}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error('failed to fetch top headlines from News API');
  }

  return response.json() as Promise<NewsApiResponse>;
}

export async function getSourcesFromNewsApi(): Promise<NewsApiResponse> {
  const response = await fetch('/top-headlines/sources', {
    headers: {
      method: 'GET',
      Authorization: `Bearer ${NEWS_API_API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error('failed to fetch sources from News API');
  }

  return response.json() as Promise<NewsApiResponse>;
}
