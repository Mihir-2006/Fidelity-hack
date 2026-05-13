import { createContext, useContext, useState } from "react"

const TrackingContext = createContext()

export const TrackingProvider = ({ children }) => {

  const [events, setEvents] = useState([])

  const trackEvent = (action, plan) => {

    const newEvent = {
      action,
      plan,
      timestamp: new Date().toLocaleString(),
    }

    setEvents((prev) => [newEvent, ...prev])

    console.log("Tracked Event:", newEvent)
  }

  return (
    <TrackingContext.Provider
      value={{
        events,
        trackEvent,
      }}
    >
      {children}
    </TrackingContext.Provider>
  )
}

export const useTracking = () => useContext(TrackingContext)