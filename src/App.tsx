import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NewsAggregator } from './pages';

const queryClient = new QueryClient();

export default function App(): React.ReactElement {
  return (
    <QueryClientProvider client={queryClient}>
      <NewsAggregator />
    </QueryClientProvider>
  );
}
