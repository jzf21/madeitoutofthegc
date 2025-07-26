import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Loader2 } from "lucide-react"
import { useAuth } from "../contexts/AuthContext"
import { useParams } from "react-router-dom"

interface TripImage {
  id: string
  file: File | null
  url: string
  caption: string
  date: string
  order?: number
}

interface TripCollageProps {
  isEditing?: boolean
}

const TripCollageView: React.FC<TripCollageProps> = ({ isEditing = false }) => {
  const { name,id } = useParams<{ name: string, id: string }>()
  const { user } = useAuth()
  
  const [tripTitle, setTripTitle] = useState("My Amazing Journey")
  const [tripSubtitle, setTripSubtitle] = useState("A world of wonders")
  const [description, setDescription] = useState(
    "Embarked on a journey through ancient temples, bustling markets, from towering mountains to the serene Li River, China offers endless treasures to explore."
  )
  const [images, setImages] = useState<TripImage[]>([])
  
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  


  const fetchCollage = async () => {
    try {
      

      console.log("Fetching collage with ID:", id, "for user:")

      // Fixed the endpoint URL (removed extra brace)
      const endpoint = `http://localhost:8000/api/v1/collage/collages/${name}/${id}`
      console.log("Fetching from endpoint:", endpoint)

      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      
      console.log("Response status:", response.status)
      console.log("Response headers:", response.headers)
      
      if (!response.ok) {
        const errorText = await response.text()
        console.error("Error response:", errorText)
        throw new Error(`Failed to fetch collage: ${response.status} - ${errorText}`)
      }
      
      const data = await response.json()
      console.log("Fetched collage data:", data)
      return data
      
    } catch (error) {
      console.error("Error fetching collage:", error)
      setError(error instanceof Error ? error.message : 'Failed to fetch collage')
      return null
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setError(null)
      
      try {
        const collageData = await fetchCollage()
        
        if (collageData) {
          console.log("Processing collage data:", collageData)
          
          // Handle different possible response structures
          const collage = collageData.collage || collageData
          console.log("Collage data structure:", collage)
          console.log("Collage images:", collageData.images)
          
          // Set basic collage info
          setTripTitle(collage.title || "My Amazing Journey")
          setTripSubtitle(collage.subtitle || "A world of wonders")
          setDescription(collage.description || "Embarked on a journey through ancient temples, bustling markets, from towering mountains to the serene Li River, China offers endless treasures to explore.")
          setImages(collageData.images || []) // Reset images before processing new ones
          // Process images
          
        } else {
          console.log("No collage data received")
          setError("Collage not found")
        }
      } catch (err) {
        console.error("Error in fetchData:", err)
        setError(err instanceof Error ? err.message : 'Failed to load collage')
      } finally {
        setIsLoading(false)
      }
    }

    // Only fetch if we have user and id
    if ( id) {
      fetchData()
    } else {
      setIsLoading(false)
    }
  }, [user, id]) // Dependencies: refetch when user or id changes


  
 

  const getImageLayout = (index: number, total: number) => {
    const layouts = {
      1: [{ size: "large", rotation: "rotate-1" }],
      2: [
        { size: "large", rotation: "rotate-1" },
        { size: "medium", rotation: "-rotate-2" },
      ],
      3: [
        { size: "large", rotation: "rotate-1" },
        { size: "medium", rotation: "-rotate-2" },
        { size: "small", rotation: "rotate-3" },
      ],
      4: [
        { size: "large", rotation: "rotate-1" },
        { size: "medium", rotation: "-rotate-2" },
        { size: "small", rotation: "rotate-3" },
        { size: "small", rotation: "-rotate-1" },
      ],
      5: [
        { size: "large", rotation: "rotate-1" },
        { size: "medium", rotation: "-rotate-2" },
        { size: "small", rotation: "rotate-3" },
        { size: "small", rotation: "-rotate-1" },
        { size: "small", rotation: "rotate-2" },
      ],
    }

    const layout = layouts[total as keyof typeof layouts] || layouts[5]
    return layout[index] || { size: "small", rotation: "rotate-1" }
  }

  const getSizeClasses = (size: string) => {
    switch (size) {
      case "large":
        return "w-80 h-96"
      case "medium":
        return "w-64 h-80"
      case "small":
        return "w-48 h-60"
      default:
        return "w-48 h-60"
    }
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#EBE8DF] via-[#E9E9DF] to-[#EBE8DF] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-[#266267]" />
          <p className="text-[#24424D]">Loading your collage...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#EBE8DF] via-[#E9E9DF] to-[#EBE8DF] flex items-center justify-center">
        <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-[#E3E1DD] shadow-lg">
          <p className="text-red-600 mb-4">Error: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-[#266267] text-white rounded-xl hover:bg-[#266267]/90 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EBE8DF] via-[#E9E9DF] to-[#EBE8DF] p-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-[#F0B46B]/10 to-[#E87851]/10 rounded-full"></div>
        <div className="absolute bottom-32 left-16 w-24 h-24 bg-gradient-to-tr from-[#266267]/10 to-[#24424D]/10 rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-bl from-[#EBE8DF] to-[#E9E9DF] rounded-full opacity-50"></div>
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        
        {/* Collage Area */}
        <div className="bg-gradient-to-br from-[#EBE8DF]/80 to-[#E9E9DF]/80 backdrop-blur-sm rounded-3xl p-12 border border-[#E3E1DD]/50 shadow-2xl relative overflow-hidden min-h-[800px]">
          {/* Paper texture overlay */}
          <div className="absolute inset-0 opacity-30 bg-gradient-to-br from-transparent via-[#EBE8DF]/20 to-[#E9E9DF]/20"></div>

          {/* Handwritten note area */}
          <div className="absolute top-8 left-8 max-w-xs">
            <div className="bg-white/90 p-4 rounded-lg shadow-lg transform -rotate-2 border border-[#E3E1DD]">
              <div className="text-[#24424D] text-sm leading-relaxed font-handwriting">
                
                  <p className="italic mb-2">{description}</p>
                  <p className="text-xs mt-2 text-[#283F45]/70"></p>
              
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-8 relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold text-[#24424D] mb-2 tracking-tight">
              {tripTitle}
            </h1>
            <p className="text-xl text-[#283F45]/70 italic">
              {isEditing ? (
                <input
                  type="text"
                  value={tripSubtitle}
                  onChange={(e) => setTripSubtitle(e.target.value)}
                  className="bg-transparent border-none outline-none text-center w-full italic"
                />
              ) : (
                tripSubtitle
              )}
            </p>
          </div>



            {/* {images.length === 0 ? (
              <div className="text-center text-[#24424D]/60">
                <p>No images found in this collage.</p>
              </div>
            ) : (
              images.map((image, index) => {
                const layout = getImageLayout(index, images.length)
                return (
                  <div
                    key={image.id}
                    className={`relative bg-white p-4 shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-3xl ${layout.rotation} ${getSizeClasses(layout.size)}`}
                    style={{
                      filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.1))",
                    }}
                  >
                    <div className="w-full h-4/5 bg-[#EBE8DF]/20 rounded-lg overflow-hidden mb-3">
                      <img
                        src={image.url}
                        alt={image.caption || "Trip photo"}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = "/placeholder.svg?height=300&width=400"
                        }}
                      />
                    </div>

                    <div className="text-center">
                      {image.caption && (
                        <p className="text-sm text-[#24424D] mb-1">
                          {image.caption}
                        </p>
                      )}
                      <p className="text-xs text-[#283F45]/70">{image.date}</p>
                    </div>
                  </div>
                )
              })
            )} */}
          {/* Images Grid */}
          <div className="flex flex-wrap justify-center items-center gap-8 relative z-10">
            {images.length === 0 && !isEditing ? (
              <div className="text-center text-[#24424D]/60">
                <p>No images found in this collage.</p>
              </div>
            ) : (
              images.map((image, index) => {
                const layout = getImageLayout(index, images.length)
                return (
                  <div
                    key={image.id}
                    className={`relative bg-white p-4 shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-3xl ${layout.rotation} ${getSizeClasses(layout.size)}`}
                    style={{
                      filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.1))",
                    }}
                  >
                   

                    <div className="w-full h-4/5 bg-[#EBE8DF]/20 rounded-lg overflow-hidden mb-3">
                      <img
                        src={image.image_url || "/placeholder.svg"}
                        alt={image.caption || "Trip photo"}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          console.error("Image failed to load:", image.url)
                          const target = e.target as HTMLImageElement
                          target.src = "/placeholder.svg?height=300&width=400"
                        }}
                      />
                    </div>

                    <div className="text-center">
                      
                        <>
                          {image.caption && <p className="text-sm text-[#24424D] mb-1">{image.caption}</p>}
                          <p className="text-xs text-[#283F45]/70">{image.date}</p>
                        </>
          
                    </div>
                  </div>
                )
              })
            )}

            {/* Add Image Button */}
            
          </div>

          
        </div>
      </div>
    </div>
  )
}

export default TripCollageView