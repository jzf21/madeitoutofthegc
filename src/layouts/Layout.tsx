import type React from "react"
import Navbar from "../components/NavBar"


interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EBE8DF]/30 via-white to-[#E9E9DF]/20">
      <Navbar />
      <main>{children}</main>
    </div>
  )
}

export default Layout