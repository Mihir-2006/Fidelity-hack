import { createContext, useContext, useState, useCallback, useMemo } from "react"
import { detectPersona } from "../services/personaEngine"
import { generateTriggerReasons } from "../services/triggerEngine"
import { generateNudge, generateEmailLog } from "../services/nudgeEngine"
import {
  getConversionProbability,
  getDropoffRisk,
  getScoreLabel,
  SCORE_RULES,
} from "../services/scoreEngine"

const TrackingContext = createContext()

export const TrackingProvider = ({ children }) => {
  // ── Core state ────────────────────────────────────────────────
  const [events, setEvents]           = useState([])
  const [score, setScore]             = useState(0)
  const [hesitation, setHesitation]   = useState(false)
  const [exitCount, setExitCount]     = useState(0)
  const [totalTimeSpent, setTotalTimeSpent] = useState(0)
  const [nudgeLogs, setNudgeLogs]     = useState([])

  // ── EXISTING function — signature preserved exactly ───────────
  const getNudgeMessage = () => {
    if (score > 90) return "High-value investor detected. Offer premium consultation."
    if (score > 70) return "Investor shows strong interest. Trigger personalized SIP recovery nudge."
    if (score > 50) return "Investor is comparing plans. Provide educational recommendations."
    return "Low engagement investor."
  }

  // ── EXISTING trackEvent — preserved exactly ───────────────────
  const trackEvent = (action, plan) => {
    let points = 0
    if (action === "Compare Clicked") points = SCORE_RULES.CLICKED_COMPARE
    if (action === "Invest Clicked")  points = SCORE_RULES.INVEST_CLICKED

    const newEvent = {
      action,
      plan,
      page: plan,
      timeSpent: 0,
      timestamp: new Date().toLocaleString(),
      points,
    }

    setEvents((prev) => [newEvent, ...prev])
    setScore((prev) => prev + points)
    if (events.length >= 3) setHesitation(true)
    console.log("Tracked Event:", newEvent)
  }

  // ── NEW: Page tracking ────────────────────────────────────────
  const trackPageVisit = useCallback((page) => {
    const points = SCORE_RULES.VISITED_PLANS
    setEvents((prev) => [
      {
        action: "Page Visit",
        page,
        plan: page,
        timeSpent: 0,
        timestamp: new Date().toLocaleString(),
        points,
      },
      ...prev,
    ])
    setScore((prev) => prev + points)
  }, [])

  const trackTimeSpent = useCallback((page, seconds) => {
    setTotalTimeSpent((prev) => prev + seconds)
    if (seconds >= 180) {
      const points = SCORE_RULES.STAYED_3_MINS
      setEvents((prev) => [
        {
          action: "Stayed 3+ Mins",
          page,
          plan: page,
          timeSpent: seconds,
          timestamp: new Date().toLocaleString(),
          points,
        },
        ...prev,
      ])
      setScore((prev) => prev + points)
    }
  }, [])

  const trackExit = useCallback(() => {
    setExitCount((prev) => {
      const next = prev + 1
      if (next >= 3) {
        setEvents((e) => [
          {
            action: "Repeated Exit",
            page: "Exit",
            plan: "-",
            timeSpent: 0,
            timestamp: new Date().toLocaleString(),
            points: SCORE_RULES.REPEATED_EXITS,
          },
          ...e,
        ])
        setScore((s) => s + SCORE_RULES.REPEATED_EXITS)
        setHesitation(true)
      }
      return next
    })
  }, [])

  const trackBounce = useCallback((page) => {
    setEvents((prev) => [
      {
        action: "Bounce",
        page,
        plan: page,
        timeSpent: 0,
        timestamp: new Date().toLocaleString(),
        points: 0,
      },
      ...prev,
    ])
  }, [])

  // ── NEW: Form tracking ────────────────────────────────────────
  const trackFormStarted = useCallback((formName) => {
    const points = SCORE_RULES.SIGNUP_STARTED
    setEvents((prev) => [
      {
        action: "Form Started",
        page: formName,
        plan: formName,
        timeSpent: 0,
        timestamp: new Date().toLocaleString(),
        points,
      },
      ...prev,
    ])
    setScore((prev) => prev + points)
  }, [])

  const trackFormCompleted = useCallback((formName) => {
    const points = SCORE_RULES.FORM_COMPLETED
    setEvents((prev) => [
      {
        action: "Form Completed",
        page: formName,
        plan: formName,
        timeSpent: 0,
        timestamp: new Date().toLocaleString(),
        points,
      },
      ...prev,
    ])
    setScore((prev) => prev + points)
  }, [])

  const trackFormAbandoned = useCallback((formName) => {
    const points = SCORE_RULES.FORM_ABANDONED
    setEvents((prev) => [
      {
        action: "Form Abandoned",
        page: formName,
        plan: formName,
        timeSpent: 0,
        timestamp: new Date().toLocaleString(),
        points,
      },
      ...prev,
    ])
    setScore((prev) => prev + points)
    setHesitation(true)
  }, [])

  // ── NEW: Derived / computed values (memoised) ─────────────────
  const persona = useMemo(
    () => detectPersona(events, score, totalTimeSpent, exitCount),
    [events, score, totalTimeSpent, exitCount]
  )

  const triggerReasons = useMemo(
    () => generateTriggerReasons(events, score, totalTimeSpent, exitCount),
    [events, score, totalTimeSpent, exitCount]
  )

  const conversionProbability = useMemo(() => getConversionProbability(score), [score])

  const dropoffRisk = useMemo(
    () =>
      getDropoffRisk(
        score,
        exitCount,
        events.some((e) => e.action === "Form Abandoned")
      ),
    [score, exitCount, events]
  )

  const scoreLabel = useMemo(() => getScoreLabel(score), [score])

  // ── NEW: Generate personalised nudges + log them ──────────────
  const generatePersonalizedNudges = useCallback(
    (user) => {
      const nudges = generateNudge(persona.id)
      const logs   = nudges.map((nudge) =>
        generateEmailLog(user, persona, nudge, triggerReasons)
      )
      setNudgeLogs((prev) => [...logs, ...prev])
      return logs
    },
    [persona, triggerReasons]
  )

  return (
    <TrackingContext.Provider
      value={{
        // ── Existing API (unchanged) ──
        events,
        trackEvent,
        score,
        hesitation,
        getNudgeMessage,
        // ── New tracking functions ──
        trackPageVisit,
        trackTimeSpent,
        trackExit,
        trackBounce,
        trackFormStarted,
        trackFormCompleted,
        trackFormAbandoned,
        // ── New computed values ──
        persona,
        triggerReasons,
        conversionProbability,
        dropoffRisk,
        scoreLabel,
        exitCount,
        totalTimeSpent,
        nudgeLogs,
        generatePersonalizedNudges,
      }}
    >
      {children}
    </TrackingContext.Provider>
  )
}

export const useTracking = () => useContext(TrackingContext)