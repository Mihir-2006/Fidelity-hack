const users = [
  {
    name: "Rahul Sharma",
    persona: "Researcher",
    score: 78,
    status: "High Intent",
  },
  {
    name: "Priya Mehta",
    persona: "Beginner",
    score: 52,
    status: "Hesitant",
  },
  {
    name: "Aman Verma",
    persona: "Serious Investor",
    score: 91,
    status: "Converted",
  },
]

const Dashboard = () => {
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

                <td className="py-6">
                  {user.status}
                </td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </section>
  )
}

export default Dashboard