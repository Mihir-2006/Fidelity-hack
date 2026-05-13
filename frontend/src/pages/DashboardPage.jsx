import Navbar from "../components/Navbar"
import Dashboard from "../components/Dashboard"
import Footer from "../components/Footer"

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-black text-white">

      <Navbar />

      <div className="text-center py-24">

        <h1 className="text-6xl font-bold">
          Admin Intelligence Dashboard
        </h1>

        <p className="text-gray-400 mt-5 text-xl">
          Monitor investor intent, behavior analytics, and conversion intelligence.
        </p>

      </div>

      <Dashboard />

      <Footer />

    </div>
  )
}

export default DashboardPage