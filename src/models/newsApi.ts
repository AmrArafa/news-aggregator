export interface NewsApiArticle {
  source: {
    id: string;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export interface NewsApiResponse {
  status: string;
  code?: string;
  message?: string;
  articles?: NewsApiArticle[];
  totalResults?: number;
}
