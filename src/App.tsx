import './App.css';
import Groceries from '@/views/groceries/Groceries';
import Layout from '@/components/Layout';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Groceries />
        </Layout>
      </QueryClientProvider>
    </>
  );
}

export default App;
