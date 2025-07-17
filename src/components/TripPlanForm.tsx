"use client"

import type React from "react"
import { useState } from "react"
import { MapPin, Calendar, Users, IndianRupee, Plane, AlertCircle } from "lucide-react"
import type { TripFormData } from "../types/trip"

interface TripPlanFormProps {
  onSubmit: (data: TripFormData) => void
  isLoading: boolean
}

interface FormErrors {
  origin?: string
  destination?: string
  departureDate?: string
  returnDate?: string
  budget?: string
}

const TripPlanForm: React.FC<TripPlanFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<TripFormData>({
    origin: "",
    destination: "",
    departureDate: "",
    returnDate: "",
    travelers: 1,
    budget: "",
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.origin.trim()) {
      newErrors.origin = "Origin city is required"
    }

    if (!formData.destination.trim()) {
      newErrors.destination = "Destination is required"
    }

    if (!formData.departureDate) {
      newErrors.departureDate = "Departure date is required"
    } else {
      const today = new Date()
      const departure = new Date(formData.departureDate)
      if (departure < today) {
        newErrors.departureDate = "Departure date cannot be in the past"
      }
    }

    if (!formData.returnDate) {
      newErrors.returnDate = "Return date is required"
    } else if (formData.departureDate && formData.returnDate) {
      const departure = new Date(formData.departureDate)
      const returnDate = new Date(formData.returnDate)
      if (returnDate <= departure) {
        newErrors.returnDate = "Return date must be after departure date"
      }
    }

    if (!formData.budget) {
      newErrors.budget = "Budget range is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Mark all fields as touched
    const allFields = ["origin", "destination", "departureDate", "returnDate", "budget"]
    setTouched(allFields.reduce((acc, field) => ({ ...acc, [field]: true }), {}))

    if (validateForm()) {
      onSubmit(formData)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "travelers" ? Number.parseInt(value) : value,
    }))

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    validateForm()
  }

  const getTodayDate = () => {
    return new Date().toISOString().split("T")[0]
  }

  const getMinReturnDate = () => {
    if (formData.departureDate) {
      const departure = new Date(formData.departureDate)
      departure.setDate(departure.getDate() + 1)
      return departure.toISOString().split("T")[0]
    }
    return getTodayDate()
  }

  const budgetOptions = [
    {
      value: "budget",
      label: "Budget (₹20,000 - ₹50,000)",
      description: "Affordable accommodations and local transport",
    },
    {
      value: "mid-range",
      label: "Mid-range (₹50,000 - ₹1,00,000)",
      description: "Comfortable hotels and mixed transport",
    },
    { value: "luxury", label: "Luxury (₹1,00,000+)", description: "Premium accommodations and private transport" },
  ]

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 border border-[#E3E1DD] max-w-4xl mx-auto relative overflow-hidden">
      {/* Curved background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-gradient-to-br from-[#EBE8DF] to-[#E9E9DF] rounded-full opacity-30"></div>
        <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-gradient-to-tr from-[#266267]/10 to-[#24424D]/10 rounded-full"></div>
        <div className="absolute top-1/2 right-8 w-24 h-24 bg-gradient-to-bl from-[#F0B46B]/20 to-[#E87851]/20 rounded-full"></div>
      </div>

      <div className="relative">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#266267] to-[#24424D] rounded-2xl mb-4 shadow-lg">
            <Plane className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-[#24424D] mb-2">Plan Your Perfect Trip</h2>
          <p className="text-[#283F45]/70 text-lg">Let AI create your personalized travel itinerary</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[#24424D] text-sm font-semibold mb-2">
                <MapPin className="inline w-4 h-4 mr-2 text-[#266267]" />
                From
              </label>
              <input
                type="text"
                name="origin"
                value={formData.origin}
                onChange={handleChange}
                onBlur={() => handleBlur("origin")}
                placeholder="Enter origin city (e.g., Mumbai, Delhi)"
                className={`w-full px-4 py-3 border-2 rounded-2xl bg-[#EBE8DF]/20 text-[#24424D] placeholder-[#283F45]/50 focus:outline-none focus:ring-2 focus:ring-[#266267] focus:border-[#266267] transition-all duration-300 ${
                  touched.origin && errors.origin
                    ? "border-[#E87851] bg-[#E87851]/5"
                    : "border-[#E3E1DD] hover:border-[#266267]/50"
                }`}
                required
                aria-describedby={errors.origin ? "origin-error" : undefined}
              />
              {touched.origin && errors.origin && (
                <p id="origin-error" className="mt-1 text-sm text-[#E87851] flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.origin}
                </p>
              )}
            </div>

            <div>
              <label className="block text-[#24424D] text-sm font-semibold mb-2">
                <MapPin className="inline w-4 h-4 mr-2 text-[#F0B46B]" />
                To
              </label>
              <input
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                onBlur={() => handleBlur("destination")}
                placeholder="Enter destination (e.g., Goa, Kerala)"
                className={`w-full px-4 py-3 border-2 rounded-2xl bg-[#EBE8DF]/20 text-[#24424D] placeholder-[#283F45]/50 focus:outline-none focus:ring-2 focus:ring-[#F0B46B] focus:border-[#F0B46B] transition-all duration-300 ${
                  touched.destination && errors.destination
                    ? "border-[#E87851] bg-[#E87851]/5"
                    : "border-[#E3E1DD] hover:border-[#F0B46B]/50"
                }`}
                required
                aria-describedby={errors.destination ? "destination-error" : undefined}
              />
              {touched.destination && errors.destination && (
                <p id="destination-error" className="mt-1 text-sm text-[#E87851] flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.destination}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[#24424D] text-sm font-semibold mb-2">
                <Calendar className="inline w-4 h-4 mr-2 text-[#266267]" />
                Departure Date
              </label>
              <input
                type="date"
                name="departureDate"
                value={formData.departureDate}
                onChange={handleChange}
                onBlur={() => handleBlur("departureDate")}
                min={getTodayDate()}
                className={`w-full px-4 py-3 border-2 rounded-2xl bg-[#EBE8DF]/20 text-[#24424D] focus:outline-none focus:ring-2 focus:ring-[#266267] focus:border-[#266267] transition-all duration-300 ${
                  touched.departureDate && errors.departureDate
                    ? "border-[#E87851] bg-[#E87851]/5"
                    : "border-[#E3E1DD] hover:border-[#266267]/50"
                }`}
                required
                aria-describedby={errors.departureDate ? "departure-error" : undefined}
              />
              {touched.departureDate && errors.departureDate && (
                <p id="departure-error" className="mt-1 text-sm text-[#E87851] flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.departureDate}
                </p>
              )}
            </div>

            <div>
              <label className="block text-[#24424D] text-sm font-semibold mb-2">
                <Calendar className="inline w-4 h-4 mr-2 text-[#E87851]" />
                Return Date
              </label>
              <input
                type="date"
                name="returnDate"
                value={formData.returnDate}
                onChange={handleChange}
                onBlur={() => handleBlur("returnDate")}
                min={getMinReturnDate()}
                className={`w-full px-4 py-3 border-2 rounded-2xl bg-[#EBE8DF]/20 text-[#24424D] focus:outline-none focus:ring-2 focus:ring-[#E87851] focus:border-[#E87851] transition-all duration-300 ${
                  touched.returnDate && errors.returnDate
                    ? "border-[#E87851] bg-[#E87851]/5"
                    : "border-[#E3E1DD] hover:border-[#E87851]/50"
                }`}
                required
                aria-describedby={errors.returnDate ? "return-error" : undefined}
              />
              {touched.returnDate && errors.returnDate && (
                <p id="return-error" className="mt-1 text-sm text-[#E87851] flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.returnDate}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[#24424D] text-sm font-semibold mb-2">
                <Users className="inline w-4 h-4 mr-2 text-[#24424D]" />
                Number of Travelers
              </label>
              <select
                name="travelers"
                value={formData.travelers}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-[#E3E1DD] rounded-2xl bg-[#EBE8DF]/20 text-[#24424D] focus:outline-none focus:ring-2 focus:ring-[#24424D] focus:border-[#24424D] hover:border-[#24424D]/50 transition-all duration-300"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? "Traveler" : "Travelers"}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[#24424D] text-sm font-semibold mb-2">
                <IndianRupee className="inline w-4 h-4 mr-2 text-[#F0B46B]" />
                Budget Range
              </label>
              <select
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                onBlur={() => handleBlur("budget")}
                className={`w-full px-4 py-3 border-2 rounded-2xl bg-[#EBE8DF]/20 text-[#24424D] focus:outline-none focus:ring-2 focus:ring-[#F0B46B] focus:border-[#F0B46B] transition-all duration-300 ${
                  touched.budget && errors.budget
                    ? "border-[#E87851] bg-[#E87851]/5"
                    : "border-[#E3E1DD] hover:border-[#F0B46B]/50"
                }`}
                required
                aria-describedby={errors.budget ? "budget-error" : undefined}
              >
                <option value="">Select your budget range</option>
                {budgetOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {touched.budget && errors.budget && (
                <p id="budget-error" className="mt-1 text-sm text-[#E87851] flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.budget}
                </p>
              )}
              {formData.budget && (
                <p className="mt-1 text-sm text-[#283F45]/70">
                  {budgetOptions.find((opt) => opt.value === formData.budget)?.description}
                </p>
              )}
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#266267] to-[#24424D] text-white py-4 px-6 rounded-2xl font-semibold text-lg hover:from-[#266267]/90 hover:to-[#24424D]/90 focus:outline-none focus:ring-4 focus:ring-[#266267]/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-2xl"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                  Generating Your Trip Plan...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <Plane className="w-5 h-5 mr-2" />
                  Generate Trip Plan
                </div>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TripPlanForm
