import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import { useAuth } from './hooks/useAuth';


function App() {
  return (
    <AuthProvider>
      <Toaster position="top-center" reverseOrder={false} />
      <Router>
        <Routes>
          {/* Public routes that redirect if logged in */}
          <Route path="/signup" element={<AuthRedirector><SignUp /></AuthRedirector>} />
          <Route path="/signin" element={<AuthRedirector><SignIn /></AuthRedirector>} />
          
          {/* Private route */}
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/signin" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

// Helper component to prevent logged-in users from seeing sign-in/up pages
const AuthRedirector = ({ children }: { children: React.ReactNode }) => {
    const { user, isLoading } = useAuth();
    if (isLoading) return <div>Loading...</div>;
    return user ? <Navigate to="/dashboard" /> : <>{children}</>;
};

export default App;