import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import Groceries from '@/views/groceries/Groceries';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './views/auth/Login';
import Register from './views/auth/Register';
import Header from './components/Header';

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <QueryClientProvider client={queryClient}>
        <Header />
        <Routes>
          <Route path="/" element={<Groceries />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
