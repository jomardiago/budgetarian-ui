import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { lazy, Suspense } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './views/auth/Login';
import Register from './views/auth/Register';
import Header from './components/Header';
import Permission from './components/permission/Permission';
import Loading from './components/Loading';
import { ToastContainer } from 'react-toastify';

const Groceries = lazy(() => import('@/views/groceries/Groceries'));
const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <QueryClientProvider client={queryClient}>
        <Header />
        <Suspense
          fallback={
            <div className="pt-8">
              <Loading />
            </div>
          }
        >
          <Routes>
            <Route
              path="/"
              element={
                <Permission roles={['logged-in']} noAccess={<Navigate to="/login" />}>
                  <Groceries />
                </Permission>
              }
            />
            <Route
              path="/login"
              element={
                <Permission roles={['logged-in']} noAccess={<Login />}>
                  <Navigate to="/" />
                </Permission>
              }
            />
            <Route
              path="/register"
              element={
                <Permission roles={['logged-in']} noAccess={<Register />}>
                  <Navigate to="/" />
                </Permission>
              }
            />
          </Routes>
        </Suspense>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
