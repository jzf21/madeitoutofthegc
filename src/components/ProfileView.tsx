import type React from "react"
import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { Calendar, Eye, User, ImageIcon } from "lucide-react"
import Layout from "../layouts/Layout"

interface Collage {
  id: number
  user_id: number
  title: string
  subtitle: string
  description: string
  created_at: string
}

const ProfileView: React.FC = () => {
  const { username } = useParams<{ username: string }>()
  const [collages, setCollages] = useState<Collage[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const baseUrl = import.meta.env.VITE_API_URL || "https://ai-travel-agent-d8wv.onrender.com"

  useEffect(() => {
    const fetchCollages = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${baseUrl}/api/v1/collage/collages/${username}`)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        const data = await response.json()
        setCollages(data)
      } catch (err) {
        setError("Failed to fetch collages")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (username) {
      fetchCollages()
    }
  }, [username, baseUrl])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-[#EBE8DF]/30 via-white to-[#E9E9DF]/20 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#266267] mx-auto mb-4"></div>
            <p className="text-[#283F45] text-lg">Loading collages...</p>
          </div>
        </div>
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-[#EBE8DF]/30 via-white to-[#E9E9DF]/20 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-[#E87851]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <ImageIcon className="w-8 h-8 text-[#E87851]" />
            </div>
            <p className="text-[#E87851] text-lg font-medium">{error}</p>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-[#EBE8DF]/30 via-white to-[#E9E9DF]/20 py-12 px-4 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-[#EBE8DF] to-[#E9E9DF] rounded-full opacity-20"></div>
          <div className="absolute bottom-32 left-16 w-24 h-24 bg-gradient-to-tr from-[#F0B46B]/20 to-[#E87851]/20 rounded-full"></div>
          <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-gradient-to-bl from-[#266267]/10 to-[#24424D]/10 rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto relative">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#266267] to-[#24424D] rounded-2xl mb-4 shadow-lg">
              <User className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-[#24424D] mb-2 capitalize">{username}'s Travel Collages</h1>
            <p className="text-[#283F45]/70 text-lg">
              Discover beautiful travel memories and adventures from around the world
            </p>
          </div>

          {collages.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-[#EBE8DF]/50 rounded-full flex items-center justify-center mx-auto mb-6">
                <ImageIcon className="w-12 h-12 text-[#283F45]/50" />
              </div>
              <h3 className="text-xl font-semibold text-[#24424D] mb-2">No collages found</h3>
              <p className="text-[#283F45]/70 mb-6">This user hasn't created any travel collages yet.</p>
              <Link
                to="/collage"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#266267] to-[#24424D] text-white px-6 py-3 rounded-2xl font-medium hover:from-[#266267]/90 hover:to-[#24424D]/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <ImageIcon className="w-4 h-4" />
                Create Your First Collage
              </Link>
            </div>
          ) : (
            <>
              {/* Stats */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-[#E3E1DD] shadow-lg mb-8">
                <div className="flex items-center justify-center gap-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#266267]">{collages.length}</div>
                    <div className="text-[#283F45]/70 text-sm">Total Collages</div>
                  </div>
                  <div className="w-px h-8 bg-[#E3E1DD]"></div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#F0B46B]">
                      {new Set(collages.map((c) => new Date(c.created_at).getFullYear())).size}
                    </div>
                    <div className="text-[#283F45]/70 text-sm">Years Traveling</div>
                  </div>
                </div>
              </div>

              {/* Collages Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {collages.map((collage) => (
                  <div
                    key={collage.id}
                    className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#E3E1DD] hover:shadow-3xl transition-all duration-300 hover:scale-[1.02] relative group"
                  >
                    {/* Curved background elements */}
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-[#EBE8DF] to-[#E9E9DF] rounded-full opacity-30"></div>
                      <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-tr from-[#F0B46B]/10 to-[#E87851]/10 rounded-full"></div>
                    </div>

                    <div className="p-6 relative">
                      {/* Collage Preview Placeholder */}
                      <div className="w-full h-48 bg-gradient-to-br from-[#EBE8DF]/30 to-[#E9E9DF]/30 rounded-2xl mb-4 flex items-center justify-center border border-[#E3E1DD]">
                        <div className="text-center">
                          <ImageIcon className="w-12 h-12 text-[#283F45]/30 mx-auto mb-2" />
                          <p className="text-[#283F45]/50 text-sm">Collage Preview</p>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="space-y-3">
                        <h2 className="text-xl font-bold text-[#24424D] line-clamp-1">{collage.title}</h2>
                        <h3 className="text-md text-[#283F45]/80 font-medium line-clamp-1">{collage.subtitle}</h3>
                        <p className="text-[#283F45]/70 text-sm line-clamp-3 leading-relaxed">{collage.description}</p>

                        {/* Date */}
                        <div className="flex items-center text-[#283F45]/60 text-sm">
                          <Calendar className="w-4 h-4 mr-2" />
                          Created on {formatDate(collage.created_at)}
                        </div>

                        {/* View Button */}
                        <Link
                          to={`/collage/${username}/${collage.id}`}
                          className="inline-flex items-center gap-2 w-full justify-center bg-gradient-to-r from-[#266267] to-[#24424D] text-white py-3 px-4 rounded-2xl font-medium hover:from-[#266267]/90 hover:to-[#24424D]/90 transition-all duration-300 shadow-lg hover:shadow-xl transform group-hover:scale-105 mt-4"
                        >
                          <Eye className="w-4 h-4" />
                          View Collage
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Create New Collage CTA */}
              <div className="text-center mt-12">
                <Link
                  to="/collage"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#F0B46B] to-[#E87851] text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:from-[#F0B46B]/90 hover:to-[#E87851]/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <ImageIcon className="w-5 h-5" />
                  Create New Collage
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default ProfileView