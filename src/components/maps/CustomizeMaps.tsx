"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps"

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"

interface TravelMemory {
  id: string
  coordinates: [number, number]
  title: string
  description: string
  date: string
  createdAt: Date
}

// Simulated localStorage for Claude.ai (replace with real localStorage in your environment)
const storage = {
  setItem: (key: string, value: string) => {
    // In your environment, use: localStorage.setItem(key, value)
    (window as any)._memoryStorage = (window as any)._memoryStorage || {}
    ;(window as any)._memoryStorage[key] = value
  },
  getItem: (key: string) => {
    // In your environment, use: localStorage.getItem(key)
    return (window as any)._memoryStorage?.[key] || null
  },
  removeItem: (key: string) => {
    // In your environment, use: localStorage.removeItem(key)
    if ((window as any)._memoryStorage) {
      delete (window as any)._memoryStorage[key]
    }
  }
}

export default function CustomizeMap() {
  const [memories, setMemories] = useState<TravelMemory[]>([])
  const [showForm, setShowForm] = useState(false)
  const [selectedCoordinates, setSelectedCoordinates] = useState<[number, number] | null>(null)
  const [editingMemory, setEditingMemory] = useState<TravelMemory | null>(null)
  const [showPreviewMarker, setShowPreviewMarker] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
  })

  // Load memories from storage on component mount
  useEffect(() => {
    const storedMemories = storage.getItem('travelMemories')
    if (storedMemories) {
      try {
        const parsedMemories = JSON.parse(storedMemories).map((memory: any) => ({
          ...memory,
          createdAt: new Date(memory.createdAt)
        }))
        setMemories(parsedMemories)
      } catch (error) {
        console.error('Error loading memories from storage:', error)
      }
    }
  }, [])

  // Save memories to storage whenever memories change
  useEffect(() => {
    if (memories.length > 0) {
      storage.setItem('travelMemories', JSON.stringify(memories))
    } else {
      storage.removeItem('travelMemories')
    }
  }, [memories])

  const handleMapClick = (event: any) => {
    if (showForm || showPreviewMarker) return // Don't add new points while form is open or preview is showing

    // Get the raw coordinates from the event
    const rawCoordinates = event.coordinates as [number, number]
    
    // Convert from map projection coordinates to actual lat/lng
    // React Simple Maps uses a different coordinate system
    const longitude = rawCoordinates[0]
    const latitude = rawCoordinates[1]
    
    console.log('Clicked coordinates:', { longitude, latitude })
    
    const coordinates: [number, number] = [longitude, latitude]
    setSelectedCoordinates(coordinates)
    setShowPreviewMarker(true)
    setEditingMemory(null)
    
    // Show the popup after a brief delay to let user see the marker placement
    setTimeout(() => {
      setFormData({ title: "", description: "", date: "" })
      setShowForm(true)
    }, 500)
  }

  const handleMarkerClick = (memory: TravelMemory) => {
    if (showForm) return // Prevent clicking existing markers while form is open
    
    setEditingMemory(memory)
    setFormData({
      title: memory.title,
      description: memory.description,
      date: memory.date,
    })
    setSelectedCoordinates(memory.coordinates)
    setShowPreviewMarker(false)
    setShowForm(true)
  }

  const handleSubmit = () => {
    if (!selectedCoordinates || !formData.title.trim() || !formData.description.trim()) {
      return
    }

    if (editingMemory) {
      // Update existing memory
      setMemories((prev) =>
        prev.map((memory) => 
          memory.id === editingMemory.id 
            ? { ...memory, ...formData } 
            : memory
        ),
      )
    } else {
      // Add new memory
      const newMemory: TravelMemory = {
        id: Date.now().toString(),
        coordinates: selectedCoordinates,
        title: formData.title,
        description: formData.description,
        date: formData.date,
        createdAt: new Date(),
      }
      setMemories((prev) => [...prev, newMemory])
    }

    handleCloseForm()
  }



  const handleDelete = () => {
    if (editingMemory) {
      setMemories((prev) => prev.filter((memory) => memory.id !== editingMemory.id))
      handleCloseForm()
    }
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setSelectedCoordinates(null)
    setEditingMemory(null)
    setShowPreviewMarker(false)
    setFormData({ title: "", description: "", date: "" })
  }

  const clearAllMemories = () => {
    setMemories([])
    storage.removeItem('travelMemories')
    handleCloseForm()
  }

  return (
    <div className="w-full h-screen bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-white/95 backdrop-blur-sm border-b border-orange-200 p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-1">Interactive Travel Journal</h1>
            <p className="text-gray-600">Click anywhere on the map to add your travel memories</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              <span className="font-semibold">{memories.length}</span> memories saved
            </div>
            {memories.length > 0 && (
              <button
                onClick={clearAllMemories}
                className="px-3 py-1 text-sm border border-red-300 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors duration-200 flex items-center space-x-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                <span>Clear All</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="pt-20 h-full">
        <ComposableMap
          projection="geoNaturalEarth1"
          projectionConfig={{
            scale: 120,
            center: [0, 0],
          }}
          className="w-full h-full cursor-crosshair"
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#f8fafc"
                  stroke="#e2e8f0"
                  strokeWidth={0.5}
                  onClick={handleMapClick}
                  style={{
                    default: { outline: "none" },
                    hover: { outline: "none", fill: "#f1f5f9", cursor: "crosshair" },
                    pressed: { outline: "none" },
                  }}
                />
              ))
            }
          </Geographies>

          {/* Travel Memory Markers */}
          {memories.map((memory) => (
            <Marker key={memory.id} coordinates={memory.coordinates} onClick={() => handleMarkerClick(memory)}>
              <g className="cursor-pointer">
                {/* Marker Pin */}
                <path
                  d="M0,-20 C-5,-20 -10,-15 -10,-10 C-10,-5 0,0 0,0 C0,0 10,-5 10,-10 C10,-15 5,-20 0,-20 Z"
                  fill="#10b981"
                  stroke="#059669"
                  strokeWidth="1"
                  className="drop-shadow-lg hover:scale-110 transition-transform duration-200"
                />
                {/* Marker Dot */}
                <circle cx="0" cy="-10" r="3" fill="white" />
                {/* Memory Icon */}
                <text x="0" y="-7" textAnchor="middle" fontSize="8" fill="#059669" className="font-bold">
                  ★
                </text>
              </g>
            </Marker>
          ))}

          {/* Preview marker for new location */}
          {selectedCoordinates && showPreviewMarker && !editingMemory && (
            <Marker coordinates={selectedCoordinates}>
              <g>
                <path
                  d="M0,-20 C-5,-20 -10,-15 -10,-10 C-10,-5 0,0 0,0 C0,0 10,-5 10,-10 C10,-15 5,-20 0,-20 Z"
                  fill="#f59e0b"
                  stroke="#d97706"
                  strokeWidth="1"
                  className="animate-pulse drop-shadow-lg"
                />
                <circle cx="0" cy="-10" r="3" fill="white" />
                <text x="0" y="-7" textAnchor="middle" fontSize="8" fill="#d97706" className="font-bold">
                  +
                </text>
              </g>
            </Marker>
          )}
        </ComposableMap>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-30 p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-md animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                {editingMemory ? (
                  <>
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    <h2 className="text-lg font-semibold text-gray-800">Edit Memory</h2>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    <h2 className="text-lg font-semibold text-gray-800">Add New Memory</h2>
                  </>
                )}
              </div>
              <button
                onClick={handleCloseForm}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Location Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., Paris, France"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    autoFocus
                  />
                </div>

                {/* Show coordinates for verification */}
                {selectedCoordinates && (
                  <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                    <strong>Coordinates:</strong> {selectedCoordinates[1].toFixed(4)}°N, {Math.abs(selectedCoordinates[0]).toFixed(4)}°{selectedCoordinates[0] >= 0 ? 'E' : 'W'}
                  </div>
                )}

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Travel Description *
                  </label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Share your travel experience, what you did, how you felt..."
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>

                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                    Travel Date
                  </label>
                  <input
                    type="text"
                    id="date"
                    value={formData.date}
                    onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                    placeholder="e.g., June 2023, Summer 2022"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="flex justify-between pt-4">
                  {editingMemory && (
                    <button
                      type="button"
                      onClick={handleDelete}
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 flex items-center space-x-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      <span>Delete</span>
                    </button>
                  )}
                  <div className="flex space-x-2 ml-auto">
                    <button
                      type="button"
                      onClick={handleCloseForm}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                    >
                      {editingMemory ? "Update" : "Save"} Memory
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      {memories.length === 0 && !showForm && !showPreviewMarker && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-gray-200 max-w-sm text-center">
          <svg className="w-8 h-8 text-blue-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <p className="text-sm text-gray-600">Click anywhere on the map to start adding your travel memories!</p>
        </div>
      )}

      {/* Memory List */}
      {memories.length > 0 && (
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-gray-200 max-w-xs max-h-64 overflow-y-auto">
          <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
            <svg className="w-4 h-4 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Your Memories ({memories.length})
          </h4>
          <div className="space-y-2">
            {memories
              .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
              .map((memory) => (
                <div
                  key={memory.id}
                  onClick={() => handleMarkerClick(memory)}
                  className="cursor-pointer p-2 rounded border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <div className="font-medium text-sm text-gray-800 truncate">{memory.title}</div>
                  <div className="text-xs text-gray-500 truncate">{memory.description.substring(0, 50)}...</div>
                  {memory.date && <div className="text-xs text-blue-600 mt-1">{memory.date}</div>}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}