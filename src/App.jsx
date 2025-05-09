import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Loader from './components/Loader';
import Header from "./components/Header"
import Footer from "./components/Footer"

function App() {

  const Home = lazy(() => import('./pages/Home'));
  const CreateEmployee = lazy(() => import('./pages/CreateEmployee'));
  const ListEmployees = lazy(() => import('./pages/ListEmployees'));
  const EmployeeDetail = lazy(() => import('./pages/DetailEmployee'));
  const Error404 = lazy(() => import('./components/404'));

  return (
    <>
      <Router>
        <Header />
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/createemployee" element={<CreateEmployee />} />
            <Route path="/listemployees" element={<ListEmployees />} />
            <Route path="/detailemployees" element={<EmployeeDetail />} />
            <Route path="/*" element={<Error404 />} />
          </Routes>
        </Suspense>
        <Footer />
      </Router>
    </>
  )
}

export default App