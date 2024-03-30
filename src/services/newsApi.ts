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
}

interface TopHeadlinesRequestParams {
  searchText: string;
  category: string;
}

export async function getAllNewsFromNewsApi({
  searchText,
  dateFrom,
  dateTo,
}: AllNewsRequestParams): Promise<NewsApiResponse> {
  const response = await fetch(
    `/everything?q=${searchText}&from=${dateFrom}&to=${dateTo}&language=en&page=1&pageSize=5`,
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

export async function getTopHeadlinesFromNewsApi({
  searchText,
  category,
}: TopHeadlinesRequestParams): Promise<NewsApiResponse> {
  const response = await fetch(
    `/top-headlines?country=us&q=${searchText}&category=${category}&page=1&pageSize=5`,
    {
      headers: {
        method: 'GET',
        Authorization: `Bearer ${NEWS_API_API_KEY}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch top headlines from News API');
  }

  return response.json() as Promise<NewsApiResponse>;
}
