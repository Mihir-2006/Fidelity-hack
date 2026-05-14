import { useState } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { useTracking } from "../context/TrackingContext"
import { useAuth } from "../context/AuthContext"
import { usePageTracking } from "../hooks/usePageTracking"
import { Zap, Mail, MessageSquare, Bell, ChevronRight, Lightbulb, Info } from "lucide-react"
import { NUDGE_TYPES } from "../services/nudgeEngine"

const TYPE_META = {
  [NUDGE_TYPES.EMAIL]:        { icon: Mail,          label: "Email",         color: "text-blue-400",   bg: "bg-blue-600/10 border-blue-600/30"   },
  [NUDGE_TYPES.WHATSAPP]:     { icon: MessageSquare, label: "WhatsApp",      color: "text-green-400",  bg: "bg-green-600/10 border-green-600/30"  },
  [NUDGE_TYPES.NOTIFICATION]: { icon: Bell,          label: "Notification",  color: "text-purple-400", bg: "bg-purple-600/10 border-purple-600/30"},
}

const NudgeCard = ({ nudge }) => {
  const meta = TYPE_META[nudge.nudgeType] ?? TYPE_META[NUDGE_TYPES.EMAIL]
  const Icon = meta.icon
  return (
    <div className={`border rounded-2xl p-6 ${meta.bg}`}>
      <div className="flex items-center gap-2 mb-4">
        <Icon className={meta.color} size={18} />
        <span className={`text-xs font-semibold uppercase tracking-wider ${meta.color}`}>{meta.label}</span>
        {nudge.subject && (
          <span className="ml-auto text-gray-400 text-xs truncate max-w-[180px]">{nudge.subject}</span>
        )}
      </div>
      <p className="text-gray-200 leading-7 mb-4">{nudge.message}</p>
      <button className="flex items-center gap-1 text-sm font-semibold text-blue-400 hover:text-blue-300 transition">
        {nudge.cta} <ChevronRight size={14} />
      </button>
    </div>
  )
}

const Recommendations = () => {
  usePageTracking("Recommendations")
  const { user } = useAuth()
  const {
    persona, triggerReasons, nudgeLogs,
    generatePersonalizedNudges, score, scoreLabel,
  } = useTracking()

  const [generated, setGenerated] = useState(false)
  const [currentNudges, setCurrentNudges] = useState([])

  const handleGenerate = () => {
    const logs = generatePersonalizedNudges(user)
    setCurrentNudges(logs)
    setGenerated(true)
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />

      <section className="px-8 py-16 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-600/30 text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Zap size={16} /> AI-Powered Recommendations
          </div>
          <h1 className="text-5xl font-bold mb-4">Personalized Nudge Center</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Intelligent, explainable nudges generated from your behavioral patterns.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* ── Left: Persona + Trigger reasons ── */}
          <div className="space-y-6">
            {/* Persona */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <h3 className="text-gray-400 text-sm font-medium mb-4 uppercase tracking-wider">Your Profile</h3>
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-base font-semibold mb-3 ${persona.badgeColor}`}>
                {persona.icon} {persona.label}
              </div>
              <p className="text-gray-400 text-sm leading-6">{persona.description}</p>
              <div className="mt-4 flex items-center gap-2">
                <span className="text-gray-500 text-sm">Behavior Score:</span>
                <span className={`font-bold ${scoreLabel.tailwind}`}>{score} {scoreLabel.emoji}</span>
              </div>
            </div>

            {/* Explainable trigger reasons */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <h3 className="text-gray-400 text-sm font-medium mb-4 uppercase tracking-wider flex items-center gap-2">
                <Lightbulb size={14} /> Why This Was Triggered
              </h3>
              {triggerReasons.length === 0 ? (
                <p className="text-gray-600 text-sm">Browse plans to generate trigger signals.</p>
              ) : (
                <div className="space-y-3">
                  {triggerReasons.map((reason, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm">
                      <span className="text-blue-500 mt-0.5 flex-shrink-0">✓</span>
                      <span className="text-gray-300 leading-5">{reason}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Generate button */}
            <button
              onClick={handleGenerate}
              className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-xl font-semibold text-lg transition flex items-center justify-center gap-2"
            >
              <Zap size={20} />
              {generated ? "Re-Generate Nudges" : "Generate My Nudges"}
            </button>
          </div>

          {/* ── Right: Nudge cards ── */}
          <div className="lg:col-span-2 space-y-5">
            {!generated ? (
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-12 text-center">
                <Info className="text-gray-600 mx-auto mb-4" size={48} />
                <h3 className="text-xl font-semibold text-gray-400 mb-2">No nudges yet</h3>
                <p className="text-gray-600 text-sm">
                  Click "Generate My Nudges" to see personalized recovery messages based on your behavior.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold">
                    Your Personalized Nudges
                  </h3>
                  <span className="text-gray-500 text-sm">{currentNudges.length} nudge(s) generated</span>
                </div>
                {currentNudges.map((nudge) => (
                  <NudgeCard key={nudge.id} nudge={nudge} />
                ))}

                {/* Email log preview */}
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mt-4">
                  <h3 className="text-gray-400 text-sm font-medium mb-4 uppercase tracking-wider flex items-center gap-2">
                    <Mail size={14} /> Email Log Preview
                  </h3>
                  {nudgeLogs.slice(0, 3).map((log) => (
                    <div key={log.id} className="border-b border-gray-800 py-3 last:border-0">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{log.subject}</span>
                        <span className="text-xs text-gray-500">{log.timestamp}</span>
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-gray-500">To: {log.email}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${persona.badgeColor}`}>{log.persona}</span>
                        <span className="text-xs text-green-400">✓ {log.status}</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1 italic">Reason: {log.triggerReason}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Recommendations
