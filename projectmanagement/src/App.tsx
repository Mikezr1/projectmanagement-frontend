import './App.css'
import LoginPage from "./pages/LoginPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ProjectListPage from './pages/ProjectListPage';
import LandingPage from './pages/LandingPage';
 
 
function App() {
 
  const queryClient = new QueryClient();
 
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/* <Route path="/" element={<LandingPage />} /> */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/projects" element={<ProjectListPage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}
 
export default App