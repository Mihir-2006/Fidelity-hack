const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-800 text-white px-8 py-10 mt-20">

      <div className="flex flex-col md:flex-row items-center justify-between gap-6">

        <div>
          <h2 className="text-2xl font-bold text-blue-500">
            Fidelity AI
          </h2>

          <p className="text-gray-400 mt-2">
            Detect hesitation. Recover intent. Increase conversions.
          </p>
        </div>

        <div className="flex gap-8 text-gray-400">
          <p className="hover:text-blue-500 cursor-pointer">
            Home
          </p>

          <p className="hover:text-blue-500 cursor-pointer">
            Dashboard
          </p>

          <p className="hover:text-blue-500 cursor-pointer">
            Analytics
          </p>
        </div>

      </div>

    </footer>
  )
}

export default Footer