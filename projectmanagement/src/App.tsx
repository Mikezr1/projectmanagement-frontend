// import './App.css'
import LoginPage from "./pages/LoginPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ProjectListPage from './pages/ProjectListPage';
import LandingPage from './pages/LandingPage';
import TaskDetailPage from "./pages/TaskDetailPage";
 
 
function App() {
 
  const queryClient = new QueryClient();
 
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/* <Route path="/" element={<LandingPage />} /> */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/projects" element={<ProjectListPage />} />
          <Route path="/home" element={<LandingPage />} />
          <Route path="/task" element={<TaskDetailPage />} />
          <Route path="/projects/${projectId}/tasks/${taskId}" element={<TaskDetailPage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}
 
<<<<<<< HEAD
export default App
=======
export default App
>>>>>>> eecf7c0f655caa5b13da5f62eddf754152118c6c
