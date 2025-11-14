import './App.css'
import LoginPage from "./pages/LoginPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


function App() {

  const queryClient = new QueryClient();

  return (
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<LoginPage />} /> 
    //     <Route path='/test' element={<Test />} />
    //   </Routes>
    // </Router>
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


