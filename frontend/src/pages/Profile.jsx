import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { useTracking } from "../context/TrackingContext"
import { useAuth } from "../context/AuthContext"
import { usePageTracking } from "../hooks/usePageTracking"
import { User, Activity, TrendingUp, AlertTriangle, Clock } from "lucide-react"

const ScoreGauge = ({ score }) => {
  const clamped = Math.min(100, Math.max(0, score))
  const color =
    clamped >= 80 ? "#22c55e" : clamped >= 50 ? "#facc15" : clamped >= 20 ? "#3b82f6" : "#6b7280"

  return (
    <div className="flex flex-col items-center">
      <svg width="140" height="80" viewBox="0 0 140 80">
        {/* Track */}
        <path d="M 10 70 A 60 60 0 0 1 130 70" fill="none" stroke="#374151" strokeWidth="12" strokeLinecap="round" />
        {/* Fill */}
        <path
          d="M 10 70 A 60 60 0 0 1 130 70"
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={`${(clamped / 100) * 188} 188`}
        />
      </svg>
      <div className="text-4xl font-bold -mt-6" style={{ color }}>{clamped}</div>
      <div className="text-gray-400 text-sm mt-1">/ 100</div>
    </div>
  )
}

const EVENT_ICONS = {
  "Page Visit":     "🌐",
  "Compare Clicked":"⚖️",
  "Invest Clicked": "💰",
  "Form Started":   "📝",
  "Form Completed": "✅",
  "Form Abandoned": "❌",
  "Stayed 3+ Mins": "⏱️",
  "Repeated Exit":  "🚪",
  "Bounce":         "↩️",
}

const Profile = () => {
  usePageTracking("Profile")
  const { user }      = useAuth()
  const {
    score, scoreLabel, persona, conversionProbability, dropoffRisk,
    events, totalTimeSpent, exitCount,
  } = useTracking()

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />

      <section className="px-8 py-16 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Investor Profile</h1>
        <p className="text-gray-400 mb-12">Your real-time behavioral intelligence snapshot</p>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* ── Left: Identity ── */}
          <div className="space-y-6">
            {/* Avatar + identity */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center">
              <div className="w-20 h-20 bg-blue-600/20 border border-blue-600/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="text-blue-400" size={36} />
              </div>
              <h2 className="text-2xl font-bold">{user?.name || "Guest Investor"}</h2>
              <p className="text-gray-400 text-sm mt-1">{user?.email || "—"}</p>
              <span className="inline-block mt-3 bg-blue-600/10 border border-blue-600/30 text-blue-400 text-xs px-3 py-1 rounded-full capitalize">
                {user?.role || "user"}
              </span>
            </div>

            {/* Persona badge */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <h3 className="text-gray-400 text-sm font-medium mb-4 uppercase tracking-wider">Detected Persona</h3>
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-lg font-semibold ${persona.badgeColor}`}>
                <span>{persona.icon}</span>
                <span>{persona.label}</span>
              </div>
              <p className="text-gray-400 text-sm mt-3 leading-6">{persona.description}</p>
            </div>

            {/* Quick stats */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider">Session Stats</h3>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 flex items-center gap-2"><Clock size={14}/> Time Spent</span>
                <span className="font-semibold">{Math.round(totalTimeSpent / 60)}m {totalTimeSpent % 60}s</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 flex items-center gap-2"><Activity size={14}/> Events</span>
                <span className="font-semibold">{events.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 flex items-center gap-2"><AlertTriangle size={14}/> Exits</span>
                <span className="font-semibold">{exitCount}</span>
              </div>
            </div>
          </div>

          {/* ── Centre: Score ── */}
          <div className="space-y-6">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <h3 className="text-gray-400 text-sm font-medium mb-4 uppercase tracking-wider">Behavior Score</h3>
              <ScoreGauge score={score} />
              <div className={`text-center mt-2 font-semibold ${scoreLabel.tailwind}`}>
                {scoreLabel.emoji} {scoreLabel.label}
              </div>
            </div>

            {/* Conversion probability */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <h3 className="text-gray-400 text-sm font-medium mb-4 uppercase tracking-wider">Conversion Probability</h3>
              <div className="flex items-end gap-3 mb-3">
                <span className="text-4xl font-bold text-green-400">{conversionProbability}%</span>
                <TrendingUp className="text-green-400 mb-1" size={20} />
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all duration-700"
                  style={{ width: `${conversionProbability}%` }}
                />
              </div>
            </div>

            {/* Drop-off risk */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <h3 className="text-gray-400 text-sm font-medium mb-4 uppercase tracking-wider">Drop-off Risk</h3>
              <div className="flex items-end gap-3 mb-3">
                <span className="text-4xl font-bold text-red-400">{dropoffRisk}%</span>
                <AlertTriangle className="text-red-400 mb-1" size={20} />
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div
                  className="bg-red-500 h-2 rounded-full transition-all duration-700"
                  style={{ width: `${dropoffRisk}%` }}
                />
              </div>
            </div>
          </div>

          {/* ── Right: Journey timeline ── */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h3 className="text-gray-400 text-sm font-medium mb-5 uppercase tracking-wider">
              Journey Timeline
            </h3>
            {events.length === 0 ? (
              <div className="text-center text-gray-600 py-12">
                <Activity size={40} className="mx-auto mb-3 opacity-40" />
                <p>No events recorded yet.</p>
                <p className="text-sm mt-1">Browse plans to start tracking.</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                {events.map((ev, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-sm flex-shrink-0">
                      {EVENT_ICONS[ev.action] ?? "📌"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-200 truncate">{ev.action}</p>
                      <p className="text-xs text-gray-500">{ev.plan !== "-" ? ev.plan : ""} · {ev.timestamp}</p>
                    </div>
                    {ev.points !== 0 && (
                      <span className={`text-xs font-bold flex-shrink-0 ${ev.points > 0 ? "text-green-400" : "text-red-400"}`}>
                        {ev.points > 0 ? `+${ev.points}` : ev.points}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Profile
