import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const Login = () => {
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")

const { login } = useAuth()

  const [role, setRole] = useState("user")

  const navigate = useNavigate()
  

  const handleLogin = () => {

login(name, email, role)
  if (role === "admin") {
    navigate("/dashboard")
  } else {
    navigate("/investments")
  }
}

  return (

    <div className="bg-black text-white min-h-screen flex items-center justify-center px-6">

      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-10 w-full max-w-md">

        <h1 className="text-4xl font-bold mb-8 text-center">
          Fidelity AI Login
        </h1>
        <input
        type="text"
        placeholder="Enter Name"
        value={name}
          onChange={(e) => setName(e.target.value)}
           className="w-full mb-5 p-4 rounded-xl bg-gray-800 border border-gray-700"
        />

        <input
        type="email"
         placeholder="Enter Email"
         value={email}
         onChange={(e) => setEmail(e.target.value)}
           className="w-full mb-5 p-4 rounded-xl bg-gray-800 border border-gray-700"
        />

        <input
          type="password"
          placeholder="Enter Password"
          className="w-full mb-6 p-4 rounded-xl bg-gray-800 border border-gray-700"
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full mb-6 p-4 rounded-xl bg-gray-800 border border-gray-700"
        >

          <option value="user">
            Investor/User
          </option>

          <option value="admin">
            Admin
          </option>

        </select>

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-xl font-semibold"
        >
          Login
        </button>

      </div>

    </div>
  )
}

export default Login