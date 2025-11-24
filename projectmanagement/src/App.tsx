import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import './App.css';
import LoginForm from "./pages/LoginPage_Odemian";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ProjectListPage from "./pages/ProjectListPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import TaskDetailPage from "./pages/TaskDetailPage";
import { PrivateRoute } from "./PrivateRoute";

function App() {
  return (
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Protected routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/projects" element={<ProjectListPage />} />
          <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
          <Route
            path="/projects/:projectId/tasks/:taskId"
            element={<TaskDetailPage />}
          />
        </Route>
      </Routes>
  );
}

export default App;