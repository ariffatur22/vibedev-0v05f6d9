import { KeyboardEvent, useMemo, useState } from 'react'
import {
  PlantId,
  WindowDirection,
  DistanceTier,
  plants,
  lightLookup,
  directionLabels,
  distanceLabels
} from './data'

const verdicts = {
  great: {
    label: 'Great Match',
    icon: '✅',
    color: 'bg-emerald-100 text-emerald-900 border-emerald-200'
  },
  marginal: {
    label: 'Marginal — Consider a Grow Light',
    icon: '⚠️',
    color: 'bg-amber-100 text-amber-900 border-amber-200'
  },
  dark: {
    label: 'Too Dark — Choose a Different Spot',
    icon: '❌',
    color: 'bg-rose-100 text-rose-900 border-rose-200'
  }
} as const

type VerdictKey = keyof typeof verdicts

function App() {
  const [selectedPlant, setSelectedPlant] = useState<PlantId | null>(null)
  const [direction, setDirection] = useState<WindowDirection | null>(null)
  const [distance, setDistance] = useState<DistanceTier | null>(null)

  const plant = selectedPlant ? plants.find((item) => item.id === selectedPlant) : null
  const result = useMemo(() => {
    if (!plant || !direction || !distance) return null

    const fc = lightLookup[plant.id][direction][distance]
    const [min, max] = plant.lightRange
    const verdict: VerdictKey = fc >= max ? 'great' : fc < min ? 'dark' : 'marginal'
    return { fc, verdict }
  }, [plant, direction, distance])

  const handlePlantSelect = (plantId: PlantId) => {
    setSelectedPlant(plantId)
    setDirection(null)
    setDistance(null)
  }

  return (
    <div className="min-h-screen bg-sand text-moss px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <header className="mb-6 rounded-3xl border border-fern/20 bg-white/90 p-6 shadow-sm shadow-fern/10 md:flex md:items-center md:justify-between md:px-8 md:py-7">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-fern/70">PlantLight Guide</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-moss sm:text-4xl">Find the best light for your indoor plant</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-fern/80 sm:text-base">
              Assess room placement with plant-specific light estimates and a simple verdict in seconds.
            </p>
          </div>
        </header>

        <main className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <section className="rounded-3xl border border-fern/20 bg-white/90 p-6 shadow-sm shadow-fern/10">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-moss">1. Choose a plant</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {plants.map((item) => {
                    const isActive = selectedPlant === item.id
                    return (
                      <button
                        key={item.id}
                        type="button"
                        aria-label={`Select ${item.name}`}
                        onClick={() => handlePlantSelect(item.id)}
                        className={`rounded-3xl border p-4 text-left transition-shadow focus:outline-none focus:ring-2 focus:ring-fern/80 ${isActive ? 'border-fern bg-mist shadow-sm' : 'border-fern/20 bg-white hover:border-fern/60 hover:shadow-sm'}`}
                      >
                        <p className="text-base font-semibold text-moss">{item.name}</p>
                        <p className="mt-1 text-sm text-fern/70">{item.scientificName}</p>
                      </button>
                    )
                  })}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-moss">2. Select your window direction</h2>
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {(Object.keys(directionLabels) as WindowDirection[]).map((dir) => {
                    const isActive = direction === dir
                    return (
                      <button
                        key={dir}
                        type="button"
                        aria-label={`Choose ${directionLabels[dir]} window`}
                        onClick={() => setDirection(dir)}
                        onKeyDown={(event: KeyboardEvent<HTMLButtonElement>) => {
                          if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault()
                            setDirection(dir)
                          }
                        }}
                        className={`rounded-3xl border px-4 py-4 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-fern/80 ${isActive ? 'border-fern bg-mist text-moss' : 'border-fern/20 bg-white text-fern/80 hover:border-fern/60'}`}
                      >
                        {directionLabels[dir]}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-moss">3. Choose the distance from the window</h2>
                <div className="mt-4 space-y-3">
                  {(Object.keys(distanceLabels) as DistanceTier[]).map((tier) => {
                    const option = distanceLabels[tier]
                    return (
                      <button
                        key={tier}
                        type="button"
                        aria-label={`Select ${option.title}`}
                        onClick={() => setDistance(tier)}
                        onKeyDown={(event: KeyboardEvent<HTMLButtonElement>) => {
                          if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault()
                            setDistance(tier)
                          }
                        }}
                        className={`flex w-full flex-col gap-1 rounded-3xl border px-4 py-4 text-left transition focus:outline-none focus:ring-2 focus:ring-fern/80 ${distance === tier ? 'border-fern bg-mist shadow-sm' : 'border-fern/20 bg-white hover:border-fern/60'}`}
                      >
                        <span className="text-base font-semibold text-moss">{option.title}</span>
                        <span className="text-sm text-fern/70">{option.description}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </section>

          <aside className="rounded-3xl border border-fern/20 bg-white/90 p-6 shadow-sm shadow-fern/10">
            <h2 className="text-xl font-semibold text-moss">Result</h2>
            <div className="mt-5 space-y-4">
              <div className="rounded-3xl border border-fern/10 bg-mist p-4 text-sm text-fern/80">
                <p className="font-semibold">How it works</p>
                <p className="mt-2">Pick a plant, window direction, and room distance to get an estimated light reading and a placement verdict.</p>
                <p className="mt-2 text-xs text-fern/60">Estimates assume clear glass and average spring/fall light.</p>
              </div>

              {!selectedPlant ? (
                <div className="rounded-3xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                  Select a plant to begin the assessment.
                </div>
              ) : !direction || !distance ? (
                <div className="rounded-3xl border border-sky-200 bg-sky-50 p-4 text-sm text-sky-900">
                  Choose both a window direction and a distance tier to see your verdict.
                </div>
              ) : result ? (
                <div>
                  <div className={`rounded-3xl border p-5 ${verdicts[result.verdict].color} border-current`}>
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-current">Verdict</p>
                    <p className="mt-3 text-2xl font-semibold">{verdicts[result.verdict].icon} {verdicts[result.verdict].label}</p>
                  </div>

                  <div className="mt-4 space-y-3 text-sm text-fern/80">
                    <div className="rounded-3xl border border-fern/10 bg-white p-4">
                      <p className="text-sm uppercase tracking-[0.18em] text-fern/70">Selected plant</p>
                      <p className="mt-2 font-semibold text-moss">{plant.name}</p>
                      <p className="text-sm text-fern/70">{plant.scientificName}</p>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-3xl border border-fern/10 bg-white p-4">
                        <p className="text-sm uppercase tracking-[0.18em] text-fern/70">Window direction</p>
                        <p className="mt-2 font-semibold text-moss">{directionLabels[direction]}</p>
                      </div>
                      <div className="rounded-3xl border border-fern/10 bg-white p-4">
                        <p className="text-sm uppercase tracking-[0.18em] text-fern/70">Distance tier</p>
                        <p className="mt-2 font-semibold text-moss">{distanceLabels[distance].title}</p>
                      </div>
                    </div>
                    <div className="rounded-3xl border border-fern/10 bg-white p-4">
                      <p className="text-sm uppercase tracking-[0.18em] text-fern/70">Estimated light level</p>
                      <p className="mt-2 text-lg font-semibold text-moss">{result.fc} fc <span className="text-xs text-fern/70">(Estimated)</span></p>
                    </div>
                    <div className="rounded-3xl border border-fern/10 bg-white p-4">
                      <p className="text-sm uppercase tracking-[0.18em] text-fern/70">Ideal light range</p>
                      <p className="mt-2 text-lg font-semibold text-moss">{plant.lightRange[0]}–{plant.lightRange[1]} fc</p>
                    </div>
                  </div>
                  <div className="mt-4 rounded-3xl border border-fern/10 bg-white p-4 text-sm text-fern/80">
                    <p className="text-sm uppercase tracking-[0.18em] text-fern/70">Care tip</p>
                    <p className="mt-2 text-base font-medium text-moss">{plant.careTip}</p>
                  </div>
                </div>
              ) : null}
            </div>
          </aside>
        </main>
      </div>
    </div>
  )
}

export default App
