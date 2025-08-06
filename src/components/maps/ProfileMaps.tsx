import type React from "react"

import { useState } from "react"
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps"

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"

interface TravelLocation {
  id: string
  name: string
  coordinates: [number, number]
  note: string
  image: string
  date: string
  country: string
}

const travelLocations: TravelLocation[] = [
  {
    id: "paris",
    name: "Paris",
    coordinates: [2.3522, 48.8566],
    note: "Climbed the Eiffel Tower at sunset. The city of lights truly lives up to its name! Had the most amazing croissants at a local café.",
    image: "/placeholder.svg?height=120&width=180",
    date: "June 2023",
    country: "France",
  },
  {
    id: "tokyo",
    name: "Tokyo",
    coordinates: [139.6917, 35.6895],
    note: "Cherry blossoms in full bloom! Visited Senso-ji Temple and experienced the bustling energy of Shibuya crossing. Sushi was incredible.",
    image: "/placeholder.svg?height=120&width=180",
    date: "April 2023",
    country: "Japan",
  },
  {
    id: "newyork",
    name: "New York",
    coordinates: [-74.006, 40.7128],
    note: "Broadway shows, Central Park walks, and the best pizza slices! The city that never sleeps showed me why it's so special.",
    image: "/placeholder.svg?height=120&width=180",
    date: "September 2023",
    country: "USA",
  },
  {
    id: "sydney",
    name: "Sydney",
    coordinates: [151.2093, -33.8688],
    note: "Opera House tour and harbor bridge climb! Bondi Beach was perfect for surfing. Australian wildlife at Taronga Zoo was amazing.",
    image: "/placeholder.svg?height=120&width=180",
    date: "December 2022",
    country: "Australia",
  },
  {
    id: "london",
    name: "London",
    coordinates: [-0.1276, 51.5074],
    note: "Afternoon tea, Big Ben, and rainy days that somehow made everything more charming. The British Museum was absolutely fascinating.",
    image: "/placeholder.svg?height=120&width=180",
    date: "August 2023",
    country: "United Kingdom",
  },
  {
    id: "rio",
    name: "Rio de Janeiro",
    coordinates: [-43.1729, -22.9068],
    note: "Christ the Redeemer statue was breathtaking! Copacabana beach, samba dancing, and the most vibrant culture I've ever experienced.",
    image: "/placeholder.svg?height=120&width=180",
    date: "February 2023",
    country: "Brazil",
  },
]

export default function ProfileMaps() {
  const [hoveredLocation, setHoveredLocation] = useState<TravelLocation | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (event: React.MouseEvent) => {
    setMousePosition({ x: event.clientX, y: event.clientY })
  }

  return (
    <div className="w-full h-screen bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-white/90 backdrop-blur-sm border-b border-orange-200 p-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">My Travel Adventures</h1>
          <p className="text-gray-600">Hover over the markers to see my travel memories</p>
        </div>
      </div>

      {/* Map Container */}
      <div className="pt-20 h-full" onMouseMove={handleMouseMove}>
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 140,
            center: [0, 20],
          }}
          className="w-full h-full"
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#dcd88f"
                  stroke="#e5e7eb"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: "none" },
                    hover: { outline: "none", fill: "#e0a530" },
                    pressed: { outline: "none" },
                  }}
                />
              ))
            }
          </Geographies>

          {/* Travel Markers */}
          {travelLocations.map((location) => (
            <Marker
              key={location.id}
              coordinates={location.coordinates}
              onMouseEnter={() => setHoveredLocation(location)}
              onMouseLeave={() => setHoveredLocation(null)}
            >
              <g className="cursor-pointer">
                {/* Marker Pin */}
                <path
                  d="M0,-20 C-5,-20 -10,-15 -10,-10 C-10,-5 0,0 0,0 C0,0 10,-5 10,-10 C10,-15 5,-20 0,-20 Z"
                  fill="#ef4444"
                  stroke="#dc2626"
                  strokeWidth="1"
                  className="drop-shadow-lg hover:scale-110 transition-transform duration-200"
                />
                {/* Marker Dot */}
                <circle cx="0" cy="-10" r="3" fill="white" />
                {/* Pulsing Animation */}
                <circle
                  cx="0"
                  cy="-10"
                  r="8"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="2"
                  opacity="0.6"
                  className="animate-ping"
                />
              </g>
            </Marker>
          ))}
        </ComposableMap>
      </div>

      {/* Hover Card */}
      {hoveredLocation && (
        <div
          className="fixed z-30 pointer-events-none"
          style={{
            left: mousePosition.x + 20,
            top: mousePosition.y - 100,
            transform: mousePosition.x > window.innerWidth - 300 ? "translateX(-100%)" : "none",
          }}
        >
          <div className="bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden max-w-sm">
            {/* Image */}
            <div className="relative h-32 overflow-hidden">
              <img
                src={hoveredLocation.image || "/placeholder.svg"}
                alt={hoveredLocation.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                {hoveredLocation.date}
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-lg text-gray-800">{hoveredLocation.name}</h3>
                <span className="text-sm text-gray-500">{hoveredLocation.country}</span>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{hoveredLocation.note}</p>

              {/* Decorative Elements */}
              <div className="flex items-center justify-center mt-3 space-x-2">
                <div className="w-6 h-0.5 bg-orange-300"></div>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#f59e0b">
                  <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" />
                </svg>
                <div className="w-6 h-0.5 bg-orange-300"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-gray-200">
        <h4 className="font-semibold text-gray-800 mb-2">Travel Destinations</h4>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <div className="w-4 h-4 bg-red-500 rounded-full"></div>
          <span>Visited Locations ({travelLocations.length})</span>
        </div>
      </div>

      {/* Stats */}
      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-gray-200">
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-600">{travelLocations.length}</div>
          <div className="text-sm text-gray-600">Countries Visited</div>
        </div>
      </div>
    </div>
  )
}
