import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { useTracking } from "../context/TrackingContext"
import { usePageTracking } from "../hooks/usePageTracking"
import { User, Mail, Lock, Target, ShieldCheck, CheckCircle } from "lucide-react"

const GOALS = ["Wealth Creation", "Retirement Planning", "Child Education", "Emergency Fund", "Tax Saving"]
const RISK_LEVELS = ["Conservative (Low Risk)", "Moderate (Medium Risk)", "Aggressive (High Risk)"]

const Signup = () => {
  usePageTracking("Signup")
  const navigate   = useNavigate()
  const { trackFormStarted, trackFormCompleted, trackFormAbandoned } = useTracking()

  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "", goal: "", risk: "" })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const formTouched = useRef(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((p) => ({ ...p, [name]: value }))
    if (!formTouched.current) {
      formTouched.current = true
      trackFormStarted("Signup Form")
    }
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim())     e.name     = "Name is required"
    if (!form.email.includes("@")) e.email = "Valid email required"
    if (form.password.length < 6)  e.password = "Min 6 characters"
    if (form.password !== form.confirm) e.confirm = "Passwords do not match"
    if (!form.goal)            e.goal     = "Select an investment goal"
    if (!form.risk)            e.risk     = "Select risk appetite"
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    trackFormCompleted("Signup Form")
    setSubmitted(true)
    setTimeout(() => navigate("/investments"), 2000)
  }

  // Track abandon on nav away if form was touched but not submitted
  const handleNavAway = () => {
    if (formTouched.current && !submitted) trackFormAbandoned("Signup Form")
    navigate("/")
  }

  if (submitted) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <CheckCircle className="text-green-500 mx-auto mb-6" size={72} />
          <h2 className="text-4xl font-bold mb-3">Account Created!</h2>
          <p className="text-gray-400">Redirecting you to investment plans…</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <section className="flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-lg">

          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-600/30 text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-5">
              <ShieldCheck size={16} /> Secure Registration
            </div>
            <h1 className="text-4xl font-bold mb-3">Create Your Account</h1>
            <p className="text-gray-400">Start your investment journey in under 2 minutes</p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-gray-900 border border-gray-800 rounded-2xl p-8 space-y-5"
          >
            {/* Name */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input
                  name="name" value={form.name} onChange={handleChange}
                  placeholder="Rahul Sharma"
                  className="w-full bg-gray-800 border border-gray-700 focus:border-blue-500 rounded-xl pl-11 pr-4 py-3 outline-none transition"
                />
              </div>
              {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input
                  name="email" type="email" value={form.email} onChange={handleChange}
                  placeholder="rahul@example.com"
                  className="w-full bg-gray-800 border border-gray-700 focus:border-blue-500 rounded-xl pl-11 pr-4 py-3 outline-none transition"
                />
              </div>
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input
                    name="password" type="password" value={form.password} onChange={handleChange}
                    placeholder="Min 6 chars"
                    className="w-full bg-gray-800 border border-gray-700 focus:border-blue-500 rounded-xl pl-11 pr-4 py-3 outline-none transition"
                  />
                </div>
                {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input
                    name="confirm" type="password" value={form.confirm} onChange={handleChange}
                    placeholder="Repeat password"
                    className="w-full bg-gray-800 border border-gray-700 focus:border-blue-500 rounded-xl pl-11 pr-4 py-3 outline-none transition"
                  />
                </div>
                {errors.confirm && <p className="text-red-400 text-xs mt-1">{errors.confirm}</p>}
              </div>
            </div>

            {/* Investment Goal */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                <Target size={14} className="inline mr-1" /> Investment Goal
              </label>
              <select
                name="goal" value={form.goal} onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-700 focus:border-blue-500 rounded-xl px-4 py-3 outline-none transition"
              >
                <option value="">Select your primary goal</option>
                {GOALS.map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
              {errors.goal && <p className="text-red-400 text-xs mt-1">{errors.goal}</p>}
            </div>

            {/* Risk Appetite */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">Risk Appetite</label>
              <div className="grid grid-cols-3 gap-3">
                {RISK_LEVELS.map((r) => (
                  <button
                    key={r} type="button"
                    onClick={() => { setForm((p) => ({ ...p, risk: r })); if (!formTouched.current) { formTouched.current = true; trackFormStarted("Signup Form") } }}
                    className={`px-3 py-2 rounded-xl text-xs font-medium border transition ${form.risk === r ? "border-blue-500 bg-blue-600/20 text-blue-400" : "border-gray-700 text-gray-400 hover:border-gray-500"}`}
                  >
                    {r.split(" ")[0]}
                  </button>
                ))}
              </div>
              {errors.risk && <p className="text-red-400 text-xs mt-1">{errors.risk}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-xl font-semibold text-lg transition"
            >
              Create Account
            </button>

            <p className="text-center text-gray-500 text-sm">
              Already have an account?{" "}
              <button type="button" onClick={handleNavAway} className="text-blue-400 hover:underline">
                Sign in
              </button>
            </p>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Signup
