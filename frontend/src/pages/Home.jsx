import Navbar from "../components/Navbar"
import Features from "../components/Features"
import Footer from "../components/Footer"
import { useNavigate } from "react-router-dom"

const Home = () => {

  const navigate = useNavigate()

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="text-center py-32">

        <h1 className="text-6xl font-bold">
          Detect Investor Hesitation
          Before Drop-Off
        </h1>

        <p className="text-gray-400 mt-6 text-xl">
          Fidelity Investor Intent Intelligence Engine
        </p>

        <div className="flex justify-center gap-6 mt-10">

          <button
            onClick={() => navigate("/investments")}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold"
          >
            Explore Plans
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="border border-gray-700 hover:border-blue-500 px-6 py-3 rounded-xl font-semibold"
          >
            View Dashboard
          </button>

        </div>

      </section>

      <Features />

      <Footer />
    </div>
  )
}

export default Home