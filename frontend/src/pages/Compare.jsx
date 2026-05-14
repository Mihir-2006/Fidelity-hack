import { useState } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { useTracking } from "../context/TrackingContext"
import { usePageTracking } from "../hooks/usePageTracking"
import { GitCompare, Check, X } from "lucide-react"

const ALL_PLANS = [
  { id: "sip",        title: "SIP Investment",    returns: "12%",  risk: "Low",      minInvest: "₹500/mo",  liquidity: "High",    taxBenefit: "80C",   lock: "None",       category: "Investment" },
  { id: "mf",         title: "Mutual Funds",       returns: "15%",  risk: "Medium",   minInvest: "₹1,000/mo",liquidity: "High",    taxBenefit: "LTCG",  lock: "None",       category: "Investment" },
  { id: "retirement", title: "NPS",                returns: "11%",  risk: "Low",      minInvest: "₹500/mo",  liquidity: "Low",     taxBenefit: "80CCD", lock: "Till 60 yrs",category: "Retirement" },
  { id: "insurance",  title: "Term Insurance",     returns: "N/A",  risk: "Zero",     minInvest: "₹799/mo",  liquidity: "None",    taxBenefit: "80C",   lock: "Policy term",category: "Insurance"  },
  { id: "ulip",       title: "ULIP",               returns: "12%",  risk: "Medium",   minInvest: "₹5,000/mo",liquidity: "Medium",  taxBenefit: "80C",   lock: "5 years",    category: "Insurance"  },
  { id: "ppf",        title: "PPF",                returns: "7.1%", risk: "Zero",     minInvest: "₹500/yr",  liquidity: "Low",     taxBenefit: "EEE",   lock: "15 years",   category: "Retirement" },
]

const ROWS = [
  { label: "Avg Returns",   key: "returns" },
  { label: "Risk Level",    key: "risk"    },
  { label: "Min Investment",key: "minInvest"},
  { label: "Liquidity",     key: "liquidity"},
  { label: "Tax Benefit",   key: "taxBenefit"},
  { label: "Lock-in Period",key: "lock"    },
  { label: "Category",      key: "category"},
]

const RISK_COLOR = { Zero: "text-green-400", Low: "text-blue-400", Medium: "text-yellow-400", High: "text-red-400" }

const Compare = () => {
  usePageTracking("Compare Plans")
  const { trackEvent } = useTracking()

  const [selected, setSelected] = useState(["sip", "mf"])

  const toggle = (id) => {
    if (selected.includes(id)) {
      if (selected.length > 1) setSelected((p) => p.filter((s) => s !== id))
    } else {
      if (selected.length < 3) {
        setSelected((p) => [...p, id])
        trackEvent("Compare Clicked", ALL_PLANS.find((p) => p.id === id)?.title)
      }
    }
  }

  const activePlans = ALL_PLANS.filter((p) => selected.includes(p.id))

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="text-center px-8 py-16">
        <div className="inline-flex items-center gap-2 bg-purple-600/10 border border-purple-600/30 text-purple-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
          <GitCompare size={16} /> Side-by-Side Analysis
        </div>
        <h1 className="text-5xl font-bold mb-4">Compare Plans</h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          Select up to 3 plans to compare side-by-side and find the best fit for your goals.
        </p>
      </section>

      {/* Plan Selector */}
      <section className="px-8 mb-10">
        <div className="max-w-5xl mx-auto">
          <p className="text-gray-400 text-sm mb-4">
            Select plans to compare ({selected.length}/3 selected):
          </p>
          <div className="flex flex-wrap gap-3">
            {ALL_PLANS.map((p) => (
              <button
                key={p.id}
                onClick={() => toggle(p.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium border transition ${
                  selected.includes(p.id)
                    ? "border-blue-500 bg-blue-600/20 text-blue-400"
                    : "border-gray-700 text-gray-400 hover:border-gray-500"
                }`}
              >
                {selected.includes(p.id) ? <Check size={14} className="inline mr-1" /> : null}
                {p.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="px-8 pb-24">
        <div className="max-w-5xl mx-auto bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left px-6 py-5 text-gray-400 font-medium w-40">Feature</th>
                  {activePlans.map((p) => (
                    <th key={p.id} className="px-6 py-5 text-center">
                      <div className="text-blue-400 font-bold text-lg">{p.title}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row, ri) => (
                  <tr key={row.key} className={`border-b border-gray-800 ${ri % 2 === 0 ? "" : "bg-gray-800/30"}`}>
                    <td className="px-6 py-4 text-gray-400 text-sm font-medium">{row.label}</td>
                    {activePlans.map((p) => (
                      <td key={p.id} className="px-6 py-4 text-center">
                        <span className={`font-semibold ${row.key === "risk" ? (RISK_COLOR[p[row.key]] ?? "text-gray-300") : "text-gray-200"}`}>
                          {p[row.key]}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
                {/* CTA row */}
                <tr>
                  <td className="px-6 py-5 text-gray-400 text-sm">Action</td>
                  {activePlans.map((p) => (
                    <td key={p.id} className="px-6 py-5 text-center">
                      <button
                        onClick={() => trackEvent("Invest Clicked", p.title)}
                        className="bg-blue-600 hover:bg-blue-500 px-5 py-2 rounded-xl text-sm font-semibold transition"
                      >
                        Invest Now
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Compare
