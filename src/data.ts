export type PlantId = 'succulent' | 'fern' | 'pothos' | 'snakePlant' | 'orchid'

export interface PlantDefinition {
  id: PlantId
  name: string
  scientificName: string
  lightRange: [number, number]
  careTip: string
}

export const plants: PlantDefinition[] = [
  {
    id: 'succulent',
    name: 'Succulent',
    scientificName: 'Various succulent species',
    lightRange: [300, 1000],
    careTip: 'Succulents prefer bright, indirect light and can tolerate a few hours of direct sun.'
  },
  {
    id: 'fern',
    name: 'Fern',
    scientificName: 'Nephrolepis exaltata',
    lightRange: [100, 300],
    careTip: 'Ferns thrive in bright, indirect light and should be kept out of direct harsh sun.'
  },
  {
    id: 'pothos',
    name: 'Pothos',
    scientificName: 'Epipremnum aureum',
    lightRange: [100, 300],
    careTip: 'Pothos thrives in indirect light and tolerates low-light corners.'
  },
  {
    id: 'snakePlant',
    name: 'Snake Plant',
    scientificName: 'Sansevieria trifasciata',
    lightRange: [100, 500],
    careTip: 'Snake plants tolerate low light but do best in bright, indirect light for steady growth.'
  },
  {
    id: 'orchid',
    name: 'Orchid',
    scientificName: 'Phalaenopsis spp.',
    lightRange: [200, 500],
    careTip: 'Orchids prefer bright, indirect light and should avoid direct midday sun.'
  }
]

export type WindowDirection = 'north' | 'south' | 'east' | 'west'
export type DistanceTier = 'near' | 'mid' | 'far'

export interface LightLookupKey {
  direction: WindowDirection
  distance: DistanceTier
}

export const lightLookup: Record<PlantId, Record<WindowDirection, Record<DistanceTier, number>>> = {
  succulent: {
    north: { near: 300, mid: 150, far: 75 },
    south: { near: 800, mid: 450, far: 250 },
    east: { near: 600, mid: 300, far: 150 },
    west: { near: 600, mid: 300, far: 150 }
  },
  fern: {
    north: { near: 180, mid: 120, far: 80 },
    south: { near: 260, mid: 180, far: 120 },
    east: { near: 240, mid: 170, far: 110 },
    west: { near: 240, mid: 170, far: 110 }
  },
  pothos: {
    north: { near: 150, mid: 110, far: 70 },
    south: { near: 280, mid: 180, far: 120 },
    east: { near: 220, mid: 150, far: 90 },
    west: { near: 220, mid: 150, far: 90 }
  },
  snakePlant: {
    north: { near: 140, mid: 100, far: 60 },
    south: { near: 380, mid: 240, far: 140 },
    east: { near: 320, mid: 200, far: 110 },
    west: { near: 320, mid: 200, far: 110 }
  },
  orchid: {
    north: { near: 200, mid: 140, far: 90 },
    south: { near: 420, mid: 280, far: 180 },
    east: { near: 360, mid: 240, far: 140 },
    west: { near: 360, mid: 240, far: 140 }
  }
}

export const directionLabels: Record<WindowDirection, string> = {
  north: 'North',
  south: 'South',
  east: 'East',
  west: 'West'
}

export const distanceLabels: Record<DistanceTier, { title: string; description: string }> = {
  near: { title: 'Near Window (≤1 m)', description: 'Can touch the glass when arm extended.' },
  mid: { title: 'Mid-Room (1–3 m)', description: 'A few steps away from the window.' },
  far: { title: 'Far from Window (>3 m)', description: 'Deeper into the room, away from direct light.' }
}
