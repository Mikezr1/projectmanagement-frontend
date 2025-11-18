import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ProjectList from './pages/ProjectListPage';
import LandingPage from './pages/LandingPage';
import LoginForm from './pages/LoginPage_Odemian';
 
 
function App() {
 
  const queryClient = new QueryClient();
 
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/projects" element={<ProjectList />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}
 
export default App