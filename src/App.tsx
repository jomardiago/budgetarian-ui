import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Groceries from '@/views/groceries/Groceries';
import Layout from '@/components/Layout';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <ToastContainer />
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Groceries />
        </Layout>
      </QueryClientProvider>
    </>
  );
}

export default App;
