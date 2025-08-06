
interface Collage {
  id: number
  user_id: number
  username?: string
  title: string
  subtitle: string
  description: string
  created_at: string
}

interface currentCollageData extends Collage {
  images?: TripImage[]
}
interface TripImage {
  id: number
  collage_id: number
  image_url: string
  caption?: string
  date?: string
}

export const CollagePage = (props: currentCollageData) => {
    const currentCollageData: currentCollageData = props as currentCollageData
     const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
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