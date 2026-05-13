const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-8 py-5 bg-black border-b border-gray-800">
      
      <h1 className="text-2xl font-bold text-blue-500">
        Fidelity AI
      </h1>

      <ul className="hidden md:flex gap-8 text-gray-300 font-medium">
        <li className="hover:text-blue-500 cursor-pointer">Home</li>
        <li className="hover:text-blue-500 cursor-pointer">Investments</li>
        <li className="hover:text-blue-500 cursor-pointer">Analytics</li>
        <li className="hover:text-blue-500 cursor-pointer">Dashboard</li>
      </ul>

      <button className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg font-semibold">
        Get Started
      </button>
      
    </nav>
  )
}

export default Navbar