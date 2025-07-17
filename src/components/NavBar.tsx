import type React from "react"
import { useState } from "react"
import { Plane, Settings, LogOut, Menu, X, MapPin, Calendar, Heart, CreditCard } from "lucide-react"
import RegisterForm from "./RegisterForm"
import LoginForm from "./LoginForm"
import { useAuth } from "../contexts/AuthContext"

const Navbar: React.FC = () => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [isLoginMode, setIsLoginMode] = useState(true)
  const { user, isLoggedIn, logout } = useAuth()

  const handleLogout = () => {
    logout()
    setShowProfileDropdown(false)
  }

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown)
  }

  const navLinks = [
    { name: "Explore", href: "#", icon: MapPin },
    { name: "My Trips", href: "#", icon: Calendar },
    { name: "Favorites", href: "#", icon: Heart },
  ]

  return (
    <>
      <nav className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-[#266267] to-[#24424D] rounded-xl flex items-center justify-center mr-3 shadow-lg">
                  <Plane className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-[#24424D]">TripPlanner</span>
              </div>
            </div>


            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="flex items-center text-gray-600 hover:text-blue-600 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-blue-50"
                  >
                    <link.icon className="w-4 h-4 mr-2" />
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Desktop Auth Section */}
            <div className="hidden md:block">
              {isLoggedIn && user ? (
                <div className="relative">
                  <button
                    onClick={toggleProfileDropdown}
                    className="flex items-center space-x-3 text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg p-2"
                  >
                    <img
                      src={typeof user.avatar === 'string' && user.avatar ? user.avatar : "/placeholder.svg"}
                      alt={typeof user.first_name === 'string' && user.first_name ? user.first_name : "User"}
                      className="w-8 h-8 rounded-full border-2 border-gray-200"
                    />
                    <span className="text-sm font-medium">{String(user.first_name || user.username || user.email || "User")}</span>
                  </button>

                  {/* Profile Dropdown */}
                  {showProfileDropdown && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{String(user.first_name || user.username || user.email || "User")}</p>
                        <p className="text-sm text-gray-500">{String(user.email || "")}</p>
                      </div>
                      <div className="py-2">
                        <a
                          href="#"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                        >
                          <Plane className="w-4 h-4 mr-3" />
                          My Profile
                        </a>
                        <a
                          href="#"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                        >
                          <Calendar className="w-4 h-4 mr-3" />
                          My Bookings
                        </a>
                        <a
                          href="#"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                        >
                          <CreditCard className="w-4 h-4 mr-3" />
                          Payment Methods
                        </a>
                        <a
                          href="#"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                        >
                          <Settings className="w-4 h-4 mr-3" />
                          Settings
                        </a>
                        <hr className="my-2 border-gray-100" />
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700"
                        >
                          <LogOut className="w-4 h-4 mr-3" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => {
                      setIsLoginMode(true)
                      setShowLoginModal(true)
                    }}
                    className="text-[#283F45] hover:text-[#24424D] px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-[#EBE8DF]/30"
                  >
                    Sign In
                  </button>
                   <button
                    onClick={() => {
                      setIsLoginMode(false)
                      setShowLoginModal(true)
                      
                    }}
                    className="w-full bg-gradient-to-r from-[#266267] to-[#24424D] text-white px-3 py-2 rounded-xl text-base font-medium hover:from-[#266267]/90 hover:to-[#24424D]/90 transition-all duration-300"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg p-2"
              >
                {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {showMobileMenu && (
          <div className="md:hidden border-t border-gray-100">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="flex items-center text-gray-600 hover:text-blue-600 hover:bg-blue-50 block px-3 py-2 rounded-lg text-base font-medium transition-colors"
                >
                  <link.icon className="w-5 h-5 mr-3" />
                  {link.name}
                </a>
              ))}

              {isLoggedIn && user ? (
                <div className="border-t border-gray-100 pt-4 mt-4">
                  <div className="flex items-center px-3 py-2 mb-2">
                    <img
                      src={typeof user.avatar === 'string' && user.avatar ? user.avatar : "/placeholder.svg"}
                      alt={typeof user.first_name === 'string' && user.first_name ? user.first_name : "User"}
                      className="w-10 h-10 rounded-full border-2 border-gray-200 mr-3"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{String(user.first_name || user.username || user.email || "User")}</p>
                      <p className="text-sm text-gray-500">{String(user.email || "")}</p>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="flex items-center text-gray-600 hover:text-gray-900 hover:bg-gray-50 block px-3 py-2 rounded-lg text-base font-medium"
                  >
                    <Plane className="w-5 h-5 mr-3" />
                    My Profile
                  </a>
                  <a
                    href="#"
                    className="flex items-center text-gray-600 hover:text-gray-900 hover:bg-gray-50 block px-3 py-2 rounded-lg text-base font-medium"
                  >
                    <Settings className="w-5 h-5 mr-3" />
                    Settings
                  </a>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-lg text-base font-medium"
                  >
                    <LogOut className="w-5 h-5 mr-3" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="border-t border-gray-100 pt-4 mt-4 space-y-2">
                  <button
                    onClick={() => {
                      setIsLoginMode(true)
                      setShowLoginModal(true)
                      setShowMobileMenu(false)
                    }}
                    className="w-full text-left text-gray-600 hover:text-gray-900 hover:bg-gray-50 block px-3 py-2 rounded-lg text-base font-medium"
                  >
                    Sign In
                  </button>
                     <button
                    onClick={() => {
                      setIsLoginMode(false)
                      setShowLoginModal(true)
                      setShowMobileMenu(false)
                    }}
                    className="w-full bg-gradient-to-r from-[#266267] to-[#24424D] text-white px-3 py-2 rounded-xl text-base font-medium hover:from-[#266267]/90 hover:to-[#24424D]/90 transition-all duration-300"
                  >
                    Sign Up
                  </button>
                  
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Login/Signup Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plane className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {isLoginMode ? "Welcome Back" : "Create Account"}
                </h2>
                <p className="text-gray-600">
                  {isLoginMode ? "Sign in to your account" : "Start planning your perfect trip"}
                </p>
              </div>
              {isLoginMode? <LoginForm/>:<RegisterForm/>}
              <div className="mt-2 text-center">
                <p className="text-gray-600">
                  {isLoginMode ? "Don't have an account?" : "Already have an account?"}{" "}
                  <button
                    onClick={() => setIsLoginMode(!isLoginMode)}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    {isLoginMode ? "Sign up" : "Sign in"}
                  </button>
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowLoginModal(false)}
              className="z-50 absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-lg p-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Backdrop for dropdown */}
      {showProfileDropdown && <div className="fixed inset-0 z-40" onClick={() => setShowProfileDropdown(false)} />}
    </>
  )
}

export default Navbar
