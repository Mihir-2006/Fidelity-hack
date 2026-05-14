import { BrowserRouter, Routes, Route } from "react-router-dom"

// Existing pages — unchanged
import Home         from "./pages/Home"
import Login        from "./pages/Login"
import Investments  from "./pages/Investments"
import DashboardPage from "./pages/DashboardPage"
import ProtectedRoute from "./components/ProtectedRoute"

// New pages — Phase 1
import Signup          from "./pages/Signup"
import Insurance       from "./pages/Insurance"
import Retirement      from "./pages/Retirement"
import Compare         from "./pages/Compare"
import Profile         from "./pages/Profile"
import Recommendations from "./pages/Recommendations"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Existing routes — preserved */}
        <Route path="/"            element={<Home />} />
        <Route path="/investments" element={<Investments />} />
        <Route path="/login"       element={<Login />} />
        <Route path="/dashboard"   element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />

        {/* New routes — Phase 1 */}
        <Route path="/signup"          element={<Signup />} />
        <Route path="/insurance"       element={<Insurance />} />
        <Route path="/retirement"      element={<Retirement />} />
        <Route path="/compare"         element={<Compare />} />
        <Route path="/profile"         element={<Profile />} />
        <Route path="/recommendations" element={<Recommendations />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App