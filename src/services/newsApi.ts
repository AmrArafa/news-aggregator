import { NewsApiResponse } from '../models/newsApi';
/**
 * Please use one of the following keys:
 * '906dbd7b93314ebbb011cfdcb80b5d4b'
 * 'df94539172744352ab8860956466d875'
 * if a key reaches max request limit (100)
 */

const NEWS_API_API_KEY = '906dbd7b93314ebbb011cfdcb80b5d4b';

interface AllNewsRequestParams {
  page: number;
  pageSize: number;
  searchText: string;
  dateFrom: string;
  dateTo: string;
  sources: string;
}

interface TopHeadlinesRequestParams {
  page: number;
  pageSize: number;
  searchText: string;
  category: string;
}

export async function getAllNewsFromNewsApi({
  page,
  pageSize,
  searchText,
  dateFrom,
  dateTo,
  sources,
}: AllNewsRequestParams): Promise<NewsApiResponse> {
  const response = await fetch(
    `/everything?q=${searchText}&from=${dateFrom}&to=${dateTo}&sources=${sources}&language=en&page=${page}&pageSize=${pageSize}`,
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
  page,
  pageSize,
  searchText,
  category,
}: TopHeadlinesRequestParams): Promise<NewsApiResponse> {
  const response = await fetch(
    `/top-headlines?country=us&q=${searchText}&category=${category}&page=${page}&pageSize=${pageSize}`,
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
