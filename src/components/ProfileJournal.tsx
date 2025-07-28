"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, BookOpen, Calendar, MapPin, User, X, Loader2, Heart } from "lucide-react"
import { useParams } from "react-router-dom"

interface TripImage {
  id: string
  image_url: string
  caption: string
  date: string
  order?: number
}

interface Collage {
  id: number
  user_id: number
  username?: string
  title: string
  subtitle: string
  description: string
  created_at: string
}

interface CollageWithImages extends Collage {
  images?: TripImage[]
}

const ProfileJournalBook: React.FC = () => {
  const params = useParams()
  const username = params?.username as string

  const [collages, setCollages] = useState<Collage[]>([])
  const [currentCollageData, setCurrentCollageData] = useState<CollageWithImages | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [loadingCollage, setLoadingCollage] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(-1) // -1 for closed book, 0+ for pages
  const [isFlipping, setIsFlipping] = useState(false)
  const [bookOpened, setBookOpened] = useState(false)
  const baseUrl = import.meta.env.VITE_API_URL || "https://ai-travel-agent-d8wv.onrender.com"

  // Fetch user's collages list
  useEffect(() => {
    const fetchCollages = async () => {
      try {
        setLoading(true)
        setError(null)

        const endpoint = `${baseUrl}/api/v1/collage/collages/${username}`
        console.log("Fetching collages from endpoint:", endpoint)

        const response = await fetch(endpoint, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })

        if (!response.ok) {
          const errorText = await response.text()
          throw new Error(`Failed to fetch collages: ${response.status} - ${errorText}`)
        }

        const data = await response.json()
        console.log("Fetched collages:", data)
        setCollages(data)
      } catch (err) {
        console.error("Error fetching collages:", err)
        setError(err instanceof Error ? err.message : "Failed to fetch collages")
      } finally {
        setLoading(false)
      }
    }

    if (username) {
      fetchCollages()
    }
  }, [username, baseUrl])

  // Fetch individual collage data when page changes
  useEffect(() => {
    const fetchCollageData = async (collageId: number) => {
      try {
        setLoadingCollage(true)
        const endpoint = `${baseUrl}/api/v1/collage/collages/${username}/${collageId}`
        console.log("Fetching collage data from:", endpoint)

        const response = await fetch(endpoint, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })

        if (!response.ok) {
          throw new Error(`Failed to fetch collage data: ${response.status}`)
        }

        const data = await response.json()
        const collageData = data.collage || data

        setCurrentCollageData({
          ...collageData,
          images: data.images || [],
        })
      } catch (err) {
        console.error("Error fetching collage data:", err)
        setCurrentCollageData(null)
      } finally {
        setLoadingCollage(false)
      }
    }

    if (currentPage >= 1 && collages.length > 0) {
      const collageIndex = currentPage - 1
      if (collages[collageIndex]) {
        fetchCollageData(collages[collageIndex].id)
      }
    }
  }, [currentPage, collages, username, baseUrl])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const openBook = () => {
    setIsFlipping(true)
    setTimeout(() => {
      setBookOpened(true)
      setCurrentPage(0)
      setIsFlipping(false)
    }, 500)
  }

  const closeBook = () => {
    setIsFlipping(true)
    setTimeout(() => {
      setBookOpened(false)
      setCurrentPage(-1)
      setCurrentCollageData(null)
      setIsFlipping(false)
    }, 500)
  }

  const nextPage = () => {
    if (currentPage >= getTotalPages() - 1) return
    setIsFlipping(true)
    setTimeout(() => {
      setCurrentPage(currentPage + 1)
      setIsFlipping(false)
    }, 300)
  }

  const prevPage = () => {
    if (currentPage <= 0) {
      closeBook()
      return
    }
    setIsFlipping(true)
    setTimeout(() => {
      setCurrentPage(currentPage - 1)
      setIsFlipping(false)
    }, 300)
  }

  const getTotalPages = () => {
    return collages.length + 1 // Welcome page + one page per collage
  }

  const renderClosedBook = () => (
    <div
      onClick={openBook}
      className="w-full h-full bg-gradient-to-r from-[#8B4513] via-[#A0522D] to-[#8B4513] rounded-lg shadow-2xl overflow-hidden cursor-pointer hover:shadow-3xl transition-all duration-300 transform hover:scale-105 relative"
    >
      {/* Book spine highlight */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#D2691E]/30 to-transparent"></div>

      {/* Book cover design */}
      <div className="absolute inset-4 bg-gradient-to-br from-[#24424D] via-[#266267] to-[#24424D] rounded shadow-inner flex flex-col items-center justify-center text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-8 right-8 w-32 h-32 border border-white/20 rounded-full"></div>
          <div className="absolute bottom-12 left-12 w-24 h-24 border border-white/20 rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-white/20 rounded-full"></div>
        </div>

        <div className="text-center relative z-10">
          <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8 backdrop-blur-sm">
            <BookOpen className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4 tracking-wide">Welcome to My</h1>
          <h2 className="text-3xl font-bold mb-2 text-[#F0B46B]">Travel Journey</h2>
          <div className="space-y-2 text-white/80 mb-8">
            <div className="flex items-center justify-center">
              <User className="w-5 h-5 mr-2" />
              <span className="text-xl capitalize">{username}</span>
            </div>
            <div className="flex items-center justify-center">
              <Heart className="w-4 h-4 mr-2" />
              <span>{collages.length} Travel Stories</span>
            </div>
          </div>
          <p className="text-white/60 text-lg italic">Click to open and explore</p>
        </div>

        {/* Decorative corner elements */}
        <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-white/30"></div>
        <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-white/30"></div>
        <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-white/30"></div>
        <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-white/30"></div>
      </div>
    </div>
  )

  const renderWelcomePage = () => (
    <div className="w-full h-full bg-gradient-to-br from-[#EBE8DF] to-[#E9E9DF] relative overflow-hidden">
      {/* Paper texture overlay */}
      <div className="absolute inset-0 opacity-30 bg-gradient-to-br from-transparent via-[#EBE8DF]/20 to-[#E9E9DF]/20"></div>

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-16 right-16 w-32 h-32 bg-gradient-to-br from-[#F0B46B]/20 to-[#E87851]/20 rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-tr from-[#266267]/20 to-[#24424D]/20 rounded-full"></div>
      </div>

      <div className="relative z-10 p-12 h-full flex flex-col justify-center">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-[#266267] to-[#24424D] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <User className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-[#24424D] mb-4 capitalize">{username}'s</h1>
          <h2 className="text-3xl font-bold text-[#266267] mb-6">Travel Journal</h2>
          <div className="w-32 h-1 bg-gradient-to-r from-[#F0B46B] to-[#E87851] mx-auto rounded-full mb-8"></div>
        </div>

        <div className="max-w-2xl mx-auto text-center space-y-6">
          <p className="text-xl text-[#283F45] leading-relaxed italic">
            "Every journey begins with a single step, and every story deserves to be told."
          </p>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-[#E3E1DD] shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-[#266267] mb-2">{collages.length}</div>
                <div className="text-[#283F45]/70 text-sm uppercase tracking-wide">Travel Stories</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#F0B46B] mb-2">
                  {new Set(collages.map((c) => new Date(c.created_at).getFullYear())).size}
                </div>
                <div className="text-[#283F45]/70 text-sm uppercase tracking-wide">Years Traveling</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#E87851] mb-2">∞</div>
                <div className="text-[#283F45]/70 text-sm uppercase tracking-wide">Memories Made</div>
              </div>
            </div>
          </div>

          <p className="text-[#283F45]/80 leading-relaxed">
            Welcome to my personal collection of travel adventures. Each page in this journal represents a unique
            journey, filled with discoveries, experiences, and memories that have shaped my understanding of the world.
            Turn the pages to explore these stories with me.
          </p>
        </div>

        {/* Navigation hint */}
        <div className="absolute bottom-8 right-8 text-[#283F45]/50 text-sm">
          <p>Turn the page to begin →</p>
        </div>
      </div>
    </div>
  )

  const renderCollagePage = () => {
    if (loadingCollage) {
      return (
        <div className="w-full h-full bg-gradient-to-br from-[#EBE8DF] to-[#E9E9DF] flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-[#266267]" />
            <p className="text-[#24424D]">Loading story...</p>
          </div>
        </div>
      )
    }

    if (!currentCollageData) {
      return (
        <div className="w-full h-full bg-gradient-to-br from-[#EBE8DF] to-[#E9E9DF] flex items-center justify-center">
          <div className="text-center text-[#283F45]/70">
            <MapPin className="w-12 h-12 mx-auto mb-4" />
            <p>Story not found</p>
          </div>
        </div>
      )
    }

    const images = currentCollageData.images || []

    return (
      <div className="w-full h-full bg-gradient-to-br from-[#EBE8DF] to-[#E9E9DF] relative overflow-hidden">
        {/* Paper texture */}
        <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-transparent via-[#EBE8DF]/20 to-[#E9E9DF]/20"></div>

        <div className="p-8 h-full overflow-y-auto">
          {/* Story Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#24424D] mb-2">{currentCollageData.title}</h1>
            <h2 className="text-xl text-[#283F45]/80 italic mb-4">{currentCollageData.subtitle}</h2>
            <div className="flex items-center justify-center text-[#283F45]/60 text-sm mb-6">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{formatDate(currentCollageData.created_at)}</span>
            </div>
            <div className="w-24 h-px bg-[#266267] mx-auto"></div>
          </div>

          {/* Description */}
          <div className="max-w-3xl mx-auto mb-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-[#E3E1DD] shadow-lg">
              <p className="text-[#283F45] leading-relaxed text-justify indent-8">{currentCollageData.description}</p>
            </div>
          </div>

          {/* Images Grid */}
          {images.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {images.map((image, index) => (
                <div
                  key={image.id}
                  className="bg-white p-4 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
                  style={{
                    transform: `rotate(${((index % 3) - 1) * 2}deg)`,
                  }}
                >
                  <div className="aspect-[4/3] bg-[#EBE8DF]/20 rounded overflow-hidden mb-3">
                    <img
                      src={image.image_url || "/placeholder.svg?height=300&width=400"}
                      alt={image.caption || "Travel photo"}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = "/placeholder.svg?height=300&width=400"
                      }}
                    />
                  </div>
                  <div className="text-center">
                    {image.caption && <p className="text-sm text-[#24424D] font-medium mb-1">{image.caption}</p>}
                    <p className="text-xs text-[#283F45]/70">{image.date}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Page number */}
          <div className="absolute bottom-4 right-6 text-xs text-[#283F45]/50">
            Story {currentPage} of {collages.length}
          </div>
        </div>
      </div>
    )
  }

  const renderCurrentPage = () => {
    if (currentPage === 0) return renderWelcomePage()
    if (currentPage >= 1) return renderCollagePage()
    return null
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === " ") {
        event.preventDefault()
        if (!bookOpened) {
          openBook()
        } else {
          nextPage()
        }
      } else if (event.key === "ArrowLeft" || event.key === "Backspace") {
        event.preventDefault()
        prevPage()
      } else if (event.key === "Escape") {
        if (bookOpened) {
          closeBook()
        }
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [bookOpened, currentPage])

  if (loading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-[#24424D]/90 via-[#266267]/90 to-[#24424D]/90 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="text-center text-white">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4" />
          <p className="text-lg">Loading travel journal...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-[#24424D]/90 via-[#266267]/90 to-[#24424D]/90 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="text-center text-white">
          <BookOpen className="w-16 h-16 mx-auto mb-4 text-white/50" />
          <p className="text-lg font-medium mb-2">Journal not found</p>
          <p className="text-white/70 mb-4">{error}</p>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#24424D]/90 via-[#266267]/90 to-[#24424D]/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      {/* Close button */}
      <button
        onClick={() => window.history.back()}
        className="absolute top-6 right-6 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors z-10"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Book container */}
      <div className="relative max-w-4xl w-full max-h-[100vh] aspect-[3/4]">
        {/* Book shadow */}
        <div className="absolute inset-0 bg-black/20 rounded-lg transform translate-x-2 translate-y-2 blur-xl"></div>

        {/* Book */}
        <div className="relative w-full h-full rounded-lg shadow-2xl overflow-hidden">
          {!bookOpened ? (
            renderClosedBook()
          ) : (
            <>
              {/* Open book background */}
              <div className="w-full h-full bg-gradient-to-r from-[#8B4513] via-[#A0522D] to-[#8B4513] rounded-lg">
                {/* Book spine highlight */}
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#D2691E]/30 to-transparent"></div>

                {/* Page container */}
                <div className="absolute inset-4 bg-white rounded shadow-inner overflow-hidden">
                  {/* Page flip animation */}
                  <div
                    className={`w-full h-full transition-transform duration-300 ${
                      isFlipping ? "scale-95 opacity-80" : "scale-100 opacity-100"
                    }`}
                  >
                    {renderCurrentPage()}
                  </div>
                </div>

                {/* Navigation buttons */}
                <button
                  onClick={prevPage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  onClick={nextPage}
                  disabled={currentPage >= getTotalPages() - 1}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Page indicator */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black/20 rounded-full px-3 py-1">
                  <span className="text-white text-xs">
                    {bookOpened ? `${currentPage + 1} / ${getTotalPages()}` : "Closed"}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Keyboard navigation hint */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white/60 text-sm text-center">
        <p>
          {!bookOpened
            ? "Click the book or press spacebar to open"
            : "Use arrow keys or click buttons to flip pages • Press ESC to close"}
        </p>
      </div>
    </div>
  )
}

export default ProfileJournalBook
