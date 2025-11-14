import './App.css'
import LoginPage from "./pages/LoginPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
//import ProjectList from './pages/ProjectListPage';
// import LandingPage from './pages/LandingPage';
import Test from './pages/Test';
 
 
function App() {
 
  const queryClient = new QueryClient();
 
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} /> 
          <Route path='/test' element={<Test />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}
 
export default App
