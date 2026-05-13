import Navbar from "../components/Navbar"
import Features from "../components/Features"
import Plans from "../components/Plans"
import Analytics from "../components/Analytics"
import Nudges from "../components/Nudges"
import Footer from "../components/Footer"

const Home = () => {
  return (
    <div className="min-h-screen bg-black text-white">

      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden flex flex-col items-center justify-center text-center px-6 py-36">

        <div className="absolute w-[500px] h-[500px] bg-blue-600 opacity-20 blur-[120px] rounded-full"></div>

        <h1 className="text-6xl md:text-7xl font-bold max-w-5xl leading-tight">
          Detect Investor Hesitation Before Drop-Off
        </h1>

        <p className="text-gray-400 text-xl mt-8 max-w-3xl">
          Fidelity Investor Intent Intelligence Engine predicts hesitation,
          identifies behavioral risk, and triggers explainable personalized nudges.
        </p>

        <div className="flex gap-5 mt-10">

          <button className="bg-blue-600 hover:bg-blue-500 transition duration-300 hover:scale-105 px-8 py-4 rounded-xl text-lg font-semibold">
            Explore Plans
          </button>

          <button className="border border-gray-700 hover:border-blue-500 px-8 py-4 rounded-xl text-lg font-semibold">
            View Dashboard
          </button>

        </div>

      </section>

      <Features />
      <Plans />
      <Analytics />
      <Nudges />
      <Footer />

    </div>
  )
}

export default Home