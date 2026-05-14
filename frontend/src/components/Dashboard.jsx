import { useTracking } from "../context/TrackingContext"

const Dashboard = () => {

  console.log("NEW DASHBOARD RUNNING")

  const {
  events,
  score,
  hesitation,
  getNudgeMessage
} = useTracking()

  const users = [
    {
      name: "Rahul Sharma",
      persona: "Researcher",
      score: 15,
      status: "High Intent",
    },

    {
      name: "Priya Mehta",
      persona: "Beginner",
      score: score,
      status: "Hesitant",
    },

    {
      name: "Aman Verma",
      persona: "Serious Investor",
      score: score,
      status: "Converted",
    },
  ]

  return (

    <section className="bg-black text-white px-8 py-24">

      <div className="text-center mb-16">

        <h2 className="text-5xl font-bold">
          Admin Intelligence Dashboard
        </h2>

        <p className="text-gray-400 text-lg mt-5 max-w-3xl mx-auto">
          Monitor investor behavior, trigger intelligent nudges, and analyze conversion performance in real-time.
        </p>

      </div>

      {/* Top Stats */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
          <h3 className="text-gray-400 text-lg">
            Total Users
          </h3>

          <p className="text-5xl font-bold mt-4 text-blue-500">
            1,248
          </p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
          <h3 className="text-gray-400 text-lg">
            High Intent Users
          </h3>

          <p className="text-5xl font-bold mt-4 text-green-500">
            342
          </p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
          <h3 className="text-gray-400 text-lg">
            Conversion Rate
          </h3>

          <p className="text-5xl font-bold mt-4 text-yellow-400">
            18%
          </p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
          <h3 className="text-gray-400 text-lg">
            Nudges Triggered
          </h3>

          <p className="text-5xl font-bold mt-4 text-purple-400">
            586
          </p>
        </div>
        </div>

      

      {/* User Table */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 overflow-x-auto">

        <div className="flex items-center justify-between mb-8">

          <h3 className="text-3xl font-bold">
            Investor Journey Tracking
          </h3>

          <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold">
            Run Engine
          </button>

        </div>

        <table className="w-full text-left">

          <thead>
            <tr className="border-b border-gray-800 text-gray-400">
              <th className="pb-4">Investor</th>
              <th className="pb-4">Persona</th>
              <th className="pb-4">Behavior Score</th>
              <th className="pb-4">Status</th>
            </tr>
          </thead>

          <tbody>

            {users.map((user, index) => (
              <tr
                key={index}
                className="border-b border-gray-800"
              >
                <td className="py-6">
                  {user.name}
                </td>

                <td className="py-6">
                  <span className="bg-gray-800 px-4 py-2 rounded-lg">
                    {user.persona}
                  </span>
                </td>

                <td className="py-6 text-blue-500 font-bold">
                  {user.score}
                </td>
                <td className="px-6 py-4 font-semibold">
                 {
                 user.score > 90
                 ? "🔥 High Intent"
                  : user.score > 50
                  ? "🟡 Hesitant"
                  : "✅ Healthy"
                 }

                 </td>
                 <td className="py-6 text-blue-400">

  {
    user.score > 90
      ? "Premium Advisor Consultation"
      : user.score > 50
      ? "Educational Recovery Nudge"
      : "No Action Needed"
  }

</td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>
      {/* Live Investor Activity */}

<div className="mt-20">

  <h2 className="text-4xl font-bold mb-8">
    Live Investor Activity
  </h2>

  <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">

    <table className="w-full">

      <thead className="bg-gray-800 text-gray-300">

        <tr>

          <th className="text-left px-6 py-4">
            Action
          </th>

          <th className="text-left px-6 py-4">
            Investment Plan
          </th>

          <th className="text-left px-6 py-4">
            Timestamp
          </th>

          <th className="text-left px-6 py-4">
               AI Recommendation
           </th>

        </tr>

      </thead>

      <tbody>

        {events.length === 0 ? (

          <tr>

            <td
              colSpan="3"
              className="text-center py-10 text-gray-500"
            >
              No investor activity yet.
            </td>

          </tr>

        ) : (

          events.map((event, index) => (

            <tr
              key={index}
              className="border-t border-gray-800"
            >

              <td className="px-6 py-4">
                {event.action}
              </td>

              <td className="px-6 py-4 text-blue-400">
                {event.plan}
              </td>

              <td className="px-6 py-4 text-gray-400">
                {event.timestamp}
              </td>

            </tr>

          ))

        )}

      </tbody>

    </table>

  </div>

</div>





    </section>
  )
}

export default Dashboard