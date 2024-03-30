import type { NewsApiArticle } from '../../models/newsApi';

export function NewsCard({
  article,
}: {
  article: NewsApiArticle;
}): React.ReactElement {
  const { url, urlToImage, title, description, source } = article;
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-md">
      <a href={url} target="_blank">
        <img
          className="h-48 w-full object-cover rounded-t-xl"
          src={urlToImage}
          alt={title}
        />
        <div className="p-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-gray-500 mt-2">{description}</p>
          <p className="text-sm text-gray-400 mt-4 italic">
            <span className="block">Source: {source.name}</span>
            <span>Date Published: {article.publishedAt.split('T')[0]}</span>
          </p>
        </div>
      </a>
    </div>
  );
}
