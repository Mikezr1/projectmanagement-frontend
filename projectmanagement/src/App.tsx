// import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ProjectListPage from './pages/ProjectListPage';
import LandingPage from './pages/LandingPage';
import LoginForm from './pages/LoginPage_Odemian';
import { PrivateRoute } from './PrivateRoute';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import TaskDetailPage from "./pages/TaskDetailPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import NavBar from "./components/NavBar";


function App() {

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <NavBar /> 
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          {/* Protected routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/projects" element={<ProjectListPage />} />
            <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
            <Route path="/projects/:projectId/tasks/:taskId" element={<TaskDetailPage />} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App

