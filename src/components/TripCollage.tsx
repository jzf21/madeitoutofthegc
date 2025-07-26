import type React from "react"
import { useState, useRef } from "react"
import { X, Save, Share2, Download, Plus, Loader2 } from "lucide-react"
import { useAuth } from "../contexts/AuthContext"

interface TripImage {
  id: string
  file: File | null
  url: string
  caption: string
  date: string
}

interface TripCollageProps {
  isEditing?: boolean
}

const TripCollage: React.FC<TripCollageProps> = ({ isEditing = true }) => {
  const { user } = useAuth()
  const [tripTitle, setTripTitle] = useState("My Amazing Journey")
  const [tripSubtitle, setTripSubtitle] = useState("A world of wonders")
  const [description, setDescription] = useState(
    "Embarked on a journey through ancient temples, bustling markets, from towering mountains to the serene Li River, China offers endless treasures to explore."
  )
  const [images, setImages] = useState<TripImage[]>([
    {
      id: "1",
      file: null,
      url: "/placeholder.svg?height=300&width=400",
      caption: "",
      date: "September 2024",
    },
  ])

  const [isSaving, setIsSaving] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSaveCollage = async () => {
    setIsSaving(true)

    // Filter out any placeholder images that don't have a file to upload.
    const imagesToUpload = images.filter(img => img.file)

    if (imagesToUpload.length === 0) {
      alert("Please add at least one new photo to save.")
      setIsSaving(false)
      return
    }

    try {
      // Create FormData properly
      const formData = new FormData()
      formData.append("title", tripTitle)
      formData.append("subtitle", tripSubtitle)
      formData.append("description", description)
      formData.append("user_id", user.id)

      // Append image files and their metadata
      imagesToUpload.forEach((image, index) => {
        // Append the actual file
        if (image.file) {
          formData.append("images", image.file, image.file.name)
        }
        // Append metadata
        formData.append("captions", image.caption || "")
        formData.append("dates", image.date || "")
      })

      // Debug: Log FormData contents
      console.log("FormData contents:")
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value)
      }

      const response = await fetch("http://localhost:8000/api/v1/collage/collages", {
        method: "POST",
        body: formData,
        // Don't set Content-Type header - let browser set it with boundary
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error("Server response:", errorText)
        
        let errorData
        try {
          errorData = JSON.parse(errorText)
        } catch {
          errorData = { detail: errorText }
        }
        
        throw new Error(errorData.detail || `Server error: ${response.status}`)
      }

      const result = await response.json()
      alert(`Collage saved successfully! ID: ${result.collage_id}`)
      
      // Optionally reset form or redirect
      console.log("Save successful:", result)
      
    } catch (error) {
      console.error("Error saving collage:", error)
      alert(`An error occurred: ${error.message}`)
    } finally {
      setIsSaving(false)
    }
  }
  
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    Array.from(files).forEach((file) => {
      if (images.length >= 5) return

      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert(`File ${file.name} is not an image`)
        return
      }

      // Validate file size (e.g., 10MB limit)
      const maxSize = 10 * 1024 * 1024 // 10MB
      if (file.size > maxSize) {
        alert(`File ${file.name} is too large. Maximum size is 10MB.`)
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const newImage: TripImage = {
          id: Date.now().toString() + Math.random(),
          file,
          url: e.target?.result as string,
          caption: "",
          date: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
        }
        setImages((prev) => [...prev, newImage])
      }
      reader.onerror = () => {
        alert(`Error reading file ${file.name}`)
      }
      reader.readAsDataURL(file)
    })

    // Reset the input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id))
  }

  const updateImageCaption = (id: string, caption: string) => {
    setImages((prev) => prev.map((img) => (img.id === id ? { ...img, caption } : img)))
  }

  const updateImageDate = (id: string, date: string) => {
    setImages((prev) => prev.map((img) => (img.id === id ? { ...img, date } : img)))
  }

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
        {isEditing && (
          <div className="mb-8 bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-[#E3E1DD] shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-[#24424D]">Create Your Trip Collage</h2>
              <div className="flex gap-2">
                <button
                   onClick={handleSaveCollage}
                   disabled={isSaving}
                   className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#266267] to-[#24424D] text-white rounded-xl hover:from-[#266267]/90 hover:to-[#24424D]/90 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                 >
                   {isSaving ? (
                     <Loader2 className="w-4 h-4 animate-spin" />
                   ) : (
                     <Save className="w-4 h-4" />
                   )}
                   {isSaving ? "Saving..." : "Save"}
                 </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-[#F0B46B] text-white rounded-xl hover:bg-[#F0B46B]/90 transition-all duration-300 shadow-lg hover:shadow-xl">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-[#E87851] text-white rounded-xl hover:bg-[#E87851]/90 transition-all duration-300 shadow-lg hover:shadow-xl">
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#24424D] text-sm font-semibold mb-2">Trip Title</label>
                <input
                  type="text"
                  value={tripTitle}
                  onChange={(e) => setTripTitle(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-[#E3E1DD] rounded-xl bg-[#EBE8DF]/20 text-[#24424D] focus:outline-none focus:ring-2 focus:ring-[#266267] focus:border-[#266267] transition-all duration-300"
                  placeholder="Enter trip title"
                />
              </div>
              <div>
                <label className="block text-[#24424D] text-sm font-semibold mb-2">Subtitle</label>
                <input
                  type="text"
                  value={tripSubtitle}
                  onChange={(e) => setTripSubtitle(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-[#E3E1DD] rounded-xl bg-[#EBE8DF]/20 text-[#24424D] focus:outline-none focus:ring-2 focus:ring-[#266267] focus:border-[#266267] transition-all duration-300"
                  placeholder="Enter subtitle"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-[#24424D] text-sm font-semibold mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border-2 border-[#E3E1DD] rounded-xl bg-[#EBE8DF]/20 text-[#24424D] focus:outline-none focus:ring-2 focus:ring-[#266267] focus:border-[#266267] transition-all duration-300 resize-none"
                placeholder="Write about your journey..."
              />
            </div>
          </div>
        )}

        {/* Collage Area */}
        <div className="bg-gradient-to-br from-[#EBE8DF]/80 to-[#E9E9DF]/80 backdrop-blur-sm rounded-3xl p-12 border border-[#E3E1DD]/50 shadow-2xl relative overflow-hidden min-h-[800px]">
          {/* Paper texture overlay */}
          <div className="absolute inset-0 opacity-30 bg-gradient-to-br from-transparent via-[#EBE8DF]/20 to-[#E9E9DF]/20"></div>

          {/* Handwritten note area */}
          <div className="absolute top-8 left-8 max-w-xs">
            <div className="bg-white/90 p-4 rounded-lg shadow-lg transform -rotate-2 border border-[#E3E1DD]">
              <div className="text-[#24424D] text-sm leading-relaxed font-handwriting">
                {isEditing ? (
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-transparent border-none outline-none resize-none text-sm leading-relaxed"
                    rows={4}
                    placeholder="Add a personal note..."
                  />
                ) : (
                  <p className="italic">{description}</p>
                )}
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-8 relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold text-[#24424D] mb-2 tracking-tight">
              {isEditing ? (
                <input
                  type="text"
                  value={tripTitle}
                  onChange={(e) => setTripTitle(e.target.value)}
                  className="bg-transparent border-none outline-none text-center w-full"
                />
              ) : (
                tripTitle
              )}
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

          {/* Images Grid */}
          <div className="flex flex-wrap justify-center items-center gap-8 relative z-10">
            {images.map((image, index) => {
              const layout = getImageLayout(index, images.length)
              return (
                <div
                  key={image.id}
                  className={`relative bg-white p-4 shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-3xl ${layout.rotation} ${getSizeClasses(layout.size)}`}
                  style={{
                    filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.1))",
                  }}
                >
                  {isEditing && (
                    <button
                      onClick={() => removeImage(image.id)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-[#E87851] text-white rounded-full flex items-center justify-center hover:bg-[#E87851]/80 transition-colors z-10"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}

                  <div className="w-full h-4/5 bg-[#EBE8DF]/20 rounded-lg overflow-hidden mb-3">
                    <img
                      src={image.url || "/placeholder.svg"}
                      alt={image.caption || "Trip photo"}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="text-center">
                    {isEditing ? (
                      <>
                        <input
                          type="text"
                          value={image.caption}
                          onChange={(e) => updateImageCaption(image.id, e.target.value)}
                          placeholder="Add caption..."
                          className="w-full text-sm text-[#24424D] bg-transparent border-none outline-none text-center mb-1"
                        />
                        <input
                          type="text"
                          value={image.date}
                          onChange={(e) => updateImageDate(image.id, e.target.value)}
                          className="w-full text-xs text-[#283F45]/70 bg-transparent border-none outline-none text-center"
                        />
                      </>
                    ) : (
                      <>
                        {image.caption && <p className="text-sm text-[#24424D] mb-1">{image.caption}</p>}
                        <p className="text-xs text-[#283F45]/70">{image.date}</p>
                      </>
                    )}
                  </div>
                </div>
              )
            })}

            {/* Add Image Button */}
            {isEditing && images.length < 5 && (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="w-48 h-60 bg-white/50 border-2 border-dashed border-[#266267]/30 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-white/70 hover:border-[#266267]/50 transition-all duration-300 transform hover:scale-105"
              >
                <Plus className="w-8 h-8 text-[#266267]/50 mb-2" />
                <p className="text-[#266267]/70 text-sm font-medium">Add Photo</p>
                <p className="text-[#283F45]/50 text-xs mt-1">{5 - images.length} remaining</p>
              </div>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>
      </div>
    </div>
  )
}

export default TripCollage