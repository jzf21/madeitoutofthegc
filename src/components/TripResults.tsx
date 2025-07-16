"use client"

import type React from "react"
import {
  MapPin,
  Calendar,
  Plane,
  Hotel,
  IndianRupee,
  Clock,
  Star,
  Lightbulb,
  ChevronRight,
  ExternalLink,
  CalendarDays,
  Route,
} from "lucide-react"
import type { TripPlan } from "../types/trip"

interface TripResultsProps {
  tripPlan: TripPlan
}

const TripResults: React.FC<TripResultsProps> = ({ tripPlan }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const formatCurrency = (amount: string) => {
    return amount.replace(/₹/g, "").replace(/,/g, "")
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Trip Summary Header */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-xl p-8 border border-blue-100">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg">
            <Plane className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-3">Your Perfect Trip Plan</h2>
          <div className="flex items-center justify-center text-gray-700 mb-4">
            <MapPin className="w-5 h-5 mr-2 text-blue-500" />
            <span className="text-xl font-semibold">
              {tripPlan.trip_summary.origin} → {tripPlan.trip_summary.destination}
            </span>
          </div>
          <div className="flex items-center justify-center space-x-6 text-gray-600 mb-4">
            <div className="flex items-center bg-white/70 px-4 py-2 rounded-lg">
              <Calendar className="w-4 h-4 mr-2 text-green-500" />
              <span className="font-medium">{formatDate(tripPlan.trip_summary.dates.departure)}</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
            <div className="flex items-center bg-white/70 px-4 py-2 rounded-lg">
              <Calendar className="w-4 h-4 mr-2 text-orange-500" />
              <span className="font-medium">{formatDate(tripPlan.trip_summary.dates.return)}</span>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-4 text-gray-600">
            <div className="flex items-center">
              <CalendarDays className="w-4 h-4 mr-2 text-purple-500" />
              <span>{tripPlan.trip_summary.duration}</span>
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="inline-flex items-center bg-gradient-to-r from-emerald-500 to-blue-500 px-8 py-4 rounded-xl shadow-lg">
            <IndianRupee className="w-6 h-6 mr-2 text-white" />
            <span className="text-white font-bold text-xl">Total Cost: {tripPlan.total_estimated_cost.amount}</span>
          </div>
          <p className="text-gray-600 mt-3 text-lg">{tripPlan.total_estimated_cost.per_person} per person</p>
        </div>
      </div>

      {/* Travel Details */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
            <Plane className="w-5 h-5 text-blue-600" />
          </div>
          Travel Details
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Route className="w-5 h-5 mr-2 text-blue-600" />
              Outbound Journey
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Operator:</span>
                <span className="text-gray-900 font-semibold">{tripPlan.travel.outbound.operator}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Route:</span>
                <span className="text-gray-900">{tripPlan.travel.outbound.route_details}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Duration:</span>
                <span className="text-gray-900">{tripPlan.travel.outbound.duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Price:</span>
                <span className="text-gray-900 font-semibold">{tripPlan.travel.outbound.price_range}</span>
              </div>
              <a
                href={tripPlan.travel.outbound.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors mt-2"
              >
                Book Now
                <ExternalLink className="w-4 h-4 ml-1" />
              </a>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Route className="w-5 h-5 mr-2 text-purple-600" />
              Return Journey
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Operator:</span>
                <span className="text-gray-900 font-semibold">{tripPlan.travel.return.operator}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Route:</span>
                <span className="text-gray-900">{tripPlan.travel.return.route_details}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Duration:</span>
                <span className="text-gray-900">{tripPlan.travel.return.duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Price:</span>
                <span className="text-gray-900 font-semibold">{tripPlan.travel.return.price_range}</span>
              </div>
              <a
                href={tripPlan.travel.return.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-purple-600 hover:text-purple-800 font-medium transition-colors mt-2"
              >
                Book Now
                <ExternalLink className="w-4 h-4 ml-1" />
              </a>
            </div>
          </div>
        </div>

        {/* Alternative Options */}
        {tripPlan.travel.alternative_options && tripPlan.travel.alternative_options.length > 0 && (
          <div className="border-t border-gray-200 pt-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center mr-2">
                <Route className="w-4 h-4 text-green-600" />
              </div>
              Alternative Travel Options
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tripPlan.travel.alternative_options.map((option, idx) => (
                <div key={idx} className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-medium">Mode:</span>
                      <span className="text-gray-900 font-semibold">{option.mode}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-medium">Duration:</span>
                      <span className="text-gray-900">{option.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-medium">Cost:</span>
                      <span className="text-gray-900 font-semibold">{option.cost}</span>
                    </div>
                    <div className="mt-3">
                      <span className="text-gray-600 font-medium">Pros/Cons:</span>
                      <p className="text-gray-700 text-sm mt-1">{option.pros_cons}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Accommodation */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
            <Hotel className="w-5 h-5 text-orange-600" />
          </div>
          Recommended Hotels
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {tripPlan.accommodation.recommended_hotels.map((hotel, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-200 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-1">{hotel.name}</h4>
                  <p className="text-gray-600 flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {hotel.location}
                  </p>
                </div>
                <div className="flex items-center bg-yellow-100 px-2 py-1 rounded-lg">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  <span className="text-gray-900 font-semibold text-sm">{hotel.rating}</span>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-600 font-medium">Price per night:</span>
                  <span className="text-gray-900 font-bold text-lg">{hotel.price_per_night}</span>
                </div>
              </div>

              <div className="mb-4">
                <h5 className="text-gray-700 font-medium mb-2">Amenities:</h5>
                <div className="flex flex-wrap gap-2">
                  {hotel.amenities.map((amenity, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-white/80 rounded-full text-xs text-gray-700 border border-gray-200"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>

              <a
                href={hotel.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-orange-600 hover:text-orange-800 font-medium transition-colors"
              >
                View Hotel
                <ExternalLink className="w-4 h-4 ml-1" />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Daily Itinerary */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
            <Clock className="w-5 h-5 text-green-600" />
          </div>
          Daily Itinerary
        </h3>

        <div className="space-y-6">
          {Object.entries(tripPlan.daily_itinerary).map(([day, details], index) => (
            <div key={day} className="relative">
              {index !== Object.keys(tripPlan.daily_itinerary).length - 1 && (
                <div className="absolute left-6 top-16 w-0.5 h-full bg-gradient-to-b from-blue-300 to-purple-300"></div>
              )}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-4 shadow-lg">
                      <span className="text-white font-bold">{index + 1}</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{day.replace("_", " ").toUpperCase()}</h4>
                      <p className="text-gray-600">{formatDate(details.date)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      {details.estimated_cost}
                    </span>
                  </div>
                </div>
                <div className="ml-16">
                  <ul className="space-y-3">
                    {details.activities.map((activity, idx) => (
                      <li key={idx} className="flex items-start text-gray-700">
                        <ChevronRight className="w-4 h-4 mr-2 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span>{activity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Expense Breakdown */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mr-3">
            <IndianRupee className="w-5 h-5 text-emerald-600" />
          </div>
          Expense Breakdown
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(tripPlan.expense_breakdown).map(([category, details]) => (
            <div
              key={category}
              className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-6 border border-emerald-200"
            >
              <div className="flex justify-between items-start mb-3">
                <h4 className="text-gray-900 font-semibold capitalize text-lg">{category.replace("_", " ")}</h4>
                <span className="text-emerald-700 font-bold text-xl">{details.amount}</span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{details.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Travel Tips */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
            <Lightbulb className="w-5 h-5 text-yellow-600" />
          </div>
          Travel Tips
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tripPlan.travel_tips.map((tip, index) => (
            <div
              key={index}
              className="flex items-start bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200"
            >
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mr-4 shadow-lg">
                <span className="text-white font-bold text-sm">{index + 1}</span>
              </div>
              <p className="text-gray-700 leading-relaxed">{tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TripResults
