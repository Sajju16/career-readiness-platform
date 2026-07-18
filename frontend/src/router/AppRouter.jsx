import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from '../context/AuthContext'

// Pages
import Landing from '../pages/Landing'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Dashboard from '../pages/Dashboard'
import CareerGoal from '../pages/CareerGoal'
import ResumeUpload from '../pages/ResumeUpload'
import AnalysisReport from '../pages/AnalysisReport'
import LearningRoadmap from '../pages/LearningRoadmap'
import Profile from '../pages/Profile'

// Layouts
import MainLayout from '../components/layout/MainLayout'

/**
 * ProtectedRoute
 * Restricts access to authenticated users only.
 */
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children
}

/**
 * AppRouter
 * Defines all application routes.
 */
const AppRouter = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes Wrapped in MainLayout */}
          <Route
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/goal" element={<CareerGoal />} />
            <Route path="/career-goal" element={<Navigate to="/goal" replace />} />
            <Route path="/resume" element={<ResumeUpload />} />
            <Route path="/resume-upload" element={<Navigate to="/resume" replace />} />
            <Route path="/report" element={<AnalysisReport />} />
            <Route path="/analysis-report" element={<Navigate to="/report" replace />} />
            <Route path="/roadmap" element={<LearningRoadmap />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default AppRouter
