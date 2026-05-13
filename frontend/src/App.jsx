import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import Investments from "./pages/Investments"
import DashboardPage from "./pages/DashboardPage"

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route
          path="/investments"
          element={<Investments />}
        />

        <Route
          path="/dashboard"
          element={<DashboardPage />}
        />

      </Routes>

    </BrowserRouter>
  )
}

export default App