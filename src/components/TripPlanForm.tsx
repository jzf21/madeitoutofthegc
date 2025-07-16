

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
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg">
          <Plane className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Plan Your Perfect Trip</h2>
        <p className="text-gray-600 text-lg">Let AI create your personalized travel itinerary</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              <MapPin className="inline w-4 h-4 mr-2 text-blue-500" />
              From
            </label>
            <input
              type="text"
              name="origin"
              value={formData.origin}
              onChange={handleChange}
              onBlur={() => handleBlur("origin")}
              placeholder="Enter origin city (e.g., Mumbai, Delhi)"
              className={`w-full px-4 py-3 border-2 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                touched.origin && errors.origin ? "border-red-500 bg-red-50" : "border-gray-200 hover:border-gray-300"
              }`}
              required
              aria-describedby={errors.origin ? "origin-error" : undefined}
            />
            {touched.origin && errors.origin && (
              <p id="origin-error" className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.origin}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              <MapPin className="inline w-4 h-4 mr-2 text-purple-500" />
              To
            </label>
            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              onBlur={() => handleBlur("destination")}
              placeholder="Enter destination (e.g., Goa, Kerala)"
              className={`w-full px-4 py-3 border-2 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors ${
                touched.destination && errors.destination
                  ? "border-red-500 bg-red-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              required
              aria-describedby={errors.destination ? "destination-error" : undefined}
            />
            {touched.destination && errors.destination && (
              <p id="destination-error" className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.destination}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              <Calendar className="inline w-4 h-4 mr-2 text-green-500" />
              Departure Date
            </label>
            <input
              type="date"
              name="departureDate"
              value={formData.departureDate}
              onChange={handleChange}
              onBlur={() => handleBlur("departureDate")}
              min={getTodayDate()}
              className={`w-full px-4 py-3 border-2 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                touched.departureDate && errors.departureDate
                  ? "border-red-500 bg-red-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              required
              aria-describedby={errors.departureDate ? "departure-error" : undefined}
            />
            {touched.departureDate && errors.departureDate && (
              <p id="departure-error" className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.departureDate}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              <Calendar className="inline w-4 h-4 mr-2 text-orange-500" />
              Return Date
            </label>
            <input
              type="date"
              name="returnDate"
              value={formData.returnDate}
              onChange={handleChange}
              onBlur={() => handleBlur("returnDate")}
              min={getMinReturnDate()}
              className={`w-full px-4 py-3 border-2 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                touched.returnDate && errors.returnDate
                  ? "border-red-500 bg-red-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              required
              aria-describedby={errors.returnDate ? "return-error" : undefined}
            />
            {touched.returnDate && errors.returnDate && (
              <p id="return-error" className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.returnDate}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              <Users className="inline w-4 h-4 mr-2 text-indigo-500" />
              Number of Travelers
            </label>
            <select
              name="travelers"
              value={formData.travelers}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:border-gray-300 transition-colors"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? "Traveler" : "Travelers"}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              <IndianRupee className="inline w-4 h-4 mr-2 text-emerald-500" />
              Budget Range
            </label>
            <select
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              onBlur={() => handleBlur("budget")}
              className={`w-full px-4 py-3 border-2 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
                touched.budget && errors.budget ? "border-red-500 bg-red-50" : "border-gray-200 hover:border-gray-300"
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
              <p id="budget-error" className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.budget}
              </p>
            )}
            {formData.budget && (
              <p className="mt-1 text-sm text-gray-600">
                {budgetOptions.find((opt) => opt.value === formData.budget)?.description}
              </p>
            )}
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
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
  )
}

export default TripPlanForm
