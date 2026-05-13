import Navbar from "../components/Navbar"
import Plans from "../components/Plans"
import Footer from "../components/Footer"

const Investments = () => {
  return (
    <div className="min-h-screen bg-black text-white">

      <Navbar />

      <div className="text-center py-24">

        <h1 className="text-6xl font-bold">
          Investment Plans
        </h1>

        <p className="text-gray-400 mt-5 text-xl">
          Explore SIPs, Mutual Funds, Insurance, and Retirement Plans.
        </p>

      </div>

      <Plans />

      <Footer />

    </div>
  )
}

export default Investments