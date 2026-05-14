import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useTracking } from "../context/TrackingContext"
import { Menu, X, TrendingUp } from "lucide-react"

const Navbar = () => {
  const { user, logout }  = useAuth()
  const { score, persona } = useTracking()
  const navigate           = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    setMenuOpen(false)
    navigate("/")
  }

  const navLinks = [
    { to: "/",              label: "Home"        },
    { to: "/investments",   label: "Investments" },
    { to: "/insurance",     label: "Insurance"   },
    { to: "/retirement",    label: "Retirement"  },
    { to: "/compare",       label: "Compare"     },
    ...(user ? [{ to: "/profile",         label: "Profile"     },
                { to: "/recommendations", label: "Nudges"      }] : []),
    ...(user?.role === "admin" ? [{ to: "/dashboard", label: "Dashboard" }] : []),
  ]

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-black border-b border-gray-800 sticky top-0 z-50">

      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <TrendingUp className="text-blue-500" size={22} />
        <span className="text-xl font-bold text-white">Fidelity <span className="text-blue-500">AI</span></span>
      </Link>

      {/* Desktop nav */}
      <ul className="hidden md:flex gap-6 text-gray-300 font-medium text-sm">
        {navLinks.map(({ to, label }) => (
          <li key={to}>
            <Link to={to} className="hover:text-blue-400 transition">
              {label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Right side — score chip + auth btn */}
      <div className="hidden md:flex items-center gap-4">
        {user && (
          <div className="flex items-center gap-2 bg-gray-900 border border-gray-800 px-3 py-1.5 rounded-full text-sm">
            <span className="text-gray-400">Score:</span>
            <span className="font-bold text-blue-400">{score}</span>
            <span className="text-gray-600">|</span>
            <span className="text-xs">{persona.icon} {persona.label}</span>
          </div>
        )}

        {!user ? (
          <Link
            to="/login"
            className="bg-blue-600 hover:bg-blue-500 px-5 py-2 rounded-lg font-semibold text-sm transition"
          >
            Login
          </Link>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-600/20 border border-red-600/40 hover:bg-red-600/30 text-red-400 px-5 py-2 rounded-lg font-semibold text-sm transition"
          >
            Logout
          </button>
        )}
      </div>

      {/* Mobile hamburger */}
      <button
        className="md:hidden text-gray-400 hover:text-white transition"
        onClick={() => setMenuOpen((p) => !p)}
        aria-label="Toggle menu"
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-gray-950 border-b border-gray-800 px-6 py-4 space-y-3 md:hidden z-50">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to} to={to}
              onClick={() => setMenuOpen(false)}
              className="block text-gray-300 hover:text-blue-400 py-2 border-b border-gray-800 last:border-0 transition"
            >
              {label}
            </Link>
          ))}
          {user && (
            <div className="flex items-center gap-2 py-2 text-sm">
              <span className="text-gray-500">Score: <span className="text-blue-400 font-bold">{score}</span></span>
              <span className="text-gray-600">·</span>
              <span>{persona.icon} {persona.label}</span>
            </div>
          )}
          <div className="pt-2">
            {!user ? (
              <Link to="/login" onClick={() => setMenuOpen(false)}
                className="block w-full text-center bg-blue-600 hover:bg-blue-500 py-3 rounded-xl font-semibold transition">
                Login
              </Link>
            ) : (
              <button onClick={handleLogout}
                className="w-full bg-red-600/20 border border-red-600/40 text-red-400 py-3 rounded-xl font-semibold transition">
                Logout
              </button>
            )}
          </div>
        </div>
      )}

    </nav>
  )
}

export default Navbar