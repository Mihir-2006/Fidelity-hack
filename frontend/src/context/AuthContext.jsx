import {
  createContext,
  useContext,
  useState,
  useEffect
} from "react"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null)

  useEffect(() => {

    const storedUser =
      localStorage.getItem("fidelityUser")

    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }

  }, [])

  const login = (name, email, role) => {

    const loggedInUser = {
  name,
  email,
  role,
}

    setUser(loggedInUser)

    localStorage.setItem(
      "fidelityUser",
      JSON.stringify(loggedInUser)
    )
  }

  const logout = () => {

    setUser(null)

    localStorage.removeItem("fidelityUser")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)