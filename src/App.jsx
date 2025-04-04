import './utils/style/global.scss'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import CreateEmployee from "./pages/CreateEmployee"
import ListEmployees from "./pages/ListEmployees"
import Error404 from "./components/404"
import Header from "./components/Header"
import Footer from "./components/Footer"

function App() {

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createemployee" element={<CreateEmployee />} />
          <Route path="/listemployees" element={<ListEmployees />} />
          <Route path="/*" element={<Error404 />} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App