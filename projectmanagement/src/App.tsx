import './App.css'
import LoginPage from "./pages/LoginPage";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


function App() {

  const queryClient = new QueryClient();

  return (
          <QueryClientProvider client={queryClient}>
             <Router>
              <Routes>
                <Route path="/" element={<LoginPage />} />
              </Routes>
            </Router>
          </QueryClientProvider>
  )
}

export default App


