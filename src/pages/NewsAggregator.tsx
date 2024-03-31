import { type ReactElement, useState, MouseEvent } from 'react';
import { Articles } from '../components/Articles';
import { TopHeadlines } from '../components/TopHeadlines';

type Tab = 'headlines' | 'all-news';

export function NewsAggregator(): ReactElement {
  const [tab, setTab] = useState<Tab>('headlines');

  function handleTabClick(event: MouseEvent<HTMLButtonElement>): void {
    setTab(event.currentTarget.id as Tab);
  }

  const headlinesTabIsActive = tab === 'headlines';
  const allNewsTabIsActive = tab === 'all-news';

  const activeTabStyle = 'font-semibold underline';

  return (
    <div className="p-5 container mx-auto">
      <h1 className="text-3xl text-center font-bold">News Aggregator</h1>
      <div className="flex justify-center mt-4 divide-x divide-black text-lg">
        <button
          id="headlines"
          onClick={handleTabClick}
          className={`px-2 ${headlinesTabIsActive ? activeTabStyle : ''}`}
        >
          Top Headlines
        </button>
        <button
          id="all-news"
          onClick={handleTabClick}
          className={`px-2 ${allNewsTabIsActive ? activeTabStyle : ''}`}
        >
          All News
        </button>
      </div>
      {headlinesTabIsActive && <TopHeadlines />}
      {allNewsTabIsActive && <Articles />}
    </div>
  );
}
