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

  return (
    <div className="space-y-8 max-w-6xl mx-auto relative">
      {/* Background decorative elements */}
      {/* <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-br from-[#EBE8DF] to-[#E9E9DF] rounded-full opacity-20"></div>
        <div className="absolute top-1/3 left-8 w-24 h-24 bg-gradient-to-tr from-[#F0B46B]/20 to-[#E87851]/20 rounded-full"></div>
        <div className="absolute bottom-1/4 right-16 w-40 h-40 bg-gradient-to-bl from-[#266267]/10 to-[#24424D]/10 rounded-full"></div>
      </div> */}

      {/* Trip Summary Header */}
      <div className="bg-white rounded-3xl shadow-2xl p-8 border border-[#E3E1DD] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#EBE8DF]/20 via-white to-[#E9E9DF]/20"></div>
        <div className="relative">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#266267] to-[#24424D] rounded-2xl mb-4 shadow-lg">
              <Plane className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-[#24424D] mb-3">Your Perfect Trip Plan</h2>
            <div className="flex items-center justify-center text-[#283F45] mb-4">
              <MapPin className="w-5 h-5 mr-2 text-[#266267]" />
              <span className="text-xl font-semibold">
                {tripPlan.trip_summary.origin} → {tripPlan.trip_summary.destination}
              </span>
            </div>
            <div className="flex items-center justify-center space-x-6 text-[#283F45]/80 mb-4">
              <div className="flex items-center bg-[#EBE8DF]/50 px-4 py-2 rounded-2xl border border-[#E3E1DD]">
                <Calendar className="w-4 h-4 mr-2 text-[#266267]" />
                <span className="font-medium">{formatDate(tripPlan.trip_summary.dates.departure)}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-[#283F45]/50" />
              <div className="flex items-center bg-[#EBE8DF]/50 px-4 py-2 rounded-2xl border border-[#E3E1DD]">
                <Calendar className="w-4 h-4 mr-2 text-[#E87851]" />
                <span className="font-medium">{formatDate(tripPlan.trip_summary.dates.return)}</span>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-4 text-[#283F45]/70">
              <div className="flex items-center">
                <CalendarDays className="w-4 h-4 mr-2 text-[#F0B46B]" />
                <span>{tripPlan.trip_summary.duration}</span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center bg-gradient-to-r from-[#F0B46B] to-[#E87851] px-8 py-4 rounded-2xl shadow-lg">
              <IndianRupee className="w-6 h-6 mr-2 text-white" />
              <span className="text-white font-bold text-xl">Total Cost: {tripPlan.total_estimated_cost.amount}</span>
            </div>
            <p className="text-[#283F45]/70 mt-3 text-lg">{tripPlan.total_estimated_cost.per_person} per person</p>
          </div>
        </div>
      </div>

      {/* Travel Details */}
      <div className="bg-white rounded-3xl shadow-2xl p-8 border border-[#E3E1DD] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#266267]/10 to-[#24424D]/10 rounded-full -translate-y-8 translate-x-8"></div>

        <h3 className="text-2xl font-bold text-[#24424D] mb-6 flex items-center relative">
          <div className="w-8 h-8 bg-[#266267]/10 rounded-xl flex items-center justify-center mr-3">
            <Plane className="w-5 h-5 text-[#266267]" />
          </div>
          Travel Details
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-[#266267]/5 to-[#24424D]/5 rounded-2xl p-6 border border-[#266267]/20">
            <h4 className="text-lg font-semibold text-[#24424D] mb-4 flex items-center">
              <Route className="w-5 h-5 mr-2 text-[#266267]" />
              Outbound Journey
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-[#283F45]/70 font-medium">Operator:</span>
                <span className="text-[#24424D] font-semibold">{tripPlan.travel.outbound.operator}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#283F45]/70 font-medium">Route:</span>
                <span className="text-[#24424D]">{tripPlan.travel.outbound.route_details}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#283F45]/70 font-medium">Duration:</span>
                <span className="text-[#24424D]">{tripPlan.travel.outbound.duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#283F45]/70 font-medium">Price:</span>
                <span className="text-[#24424D] font-semibold">{tripPlan.travel.outbound.price_range}</span>
              </div>
              <a
                href={tripPlan.travel.outbound.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-[#266267] hover:text-[#24424D] font-medium transition-colors mt-2"
              >
                Book Now
                <ExternalLink className="w-4 h-4 ml-1" />
              </a>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#F0B46B]/10 to-[#E87851]/10 rounded-2xl p-6 border border-[#F0B46B]/30">
            <h4 className="text-lg font-semibold text-[#24424D] mb-4 flex items-center">
              <Route className="w-5 h-5 mr-2 text-[#E87851]" />
              Return Journey
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-[#283F45]/70 font-medium">Operator:</span>
                <span className="text-[#24424D] font-semibold">{tripPlan.travel.return.operator}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#283F45]/70 font-medium">Route:</span>
                <span className="text-[#24424D]">{tripPlan.travel.return.route_details}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#283F45]/70 font-medium">Duration:</span>
                <span className="text-[#24424D]">{tripPlan.travel.return.duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#283F45]/70 font-medium">Price:</span>
                <span className="text-[#24424D] font-semibold">{tripPlan.travel.return.price_range}</span>
              </div>
              <a
                href={tripPlan.travel.return.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-[#E87851] hover:text-[#E87851]/80 font-medium transition-colors mt-2"
              >
                Book Now
                <ExternalLink className="w-4 h-4 ml-1" />
              </a>
            </div>
          </div>
        </div>

        {/* Alternative Options */}
        {tripPlan.travel.alternative_options && tripPlan.travel.alternative_options.length > 0 && (
          <div className="border-t border-[#E3E1DD] pt-6">
            <h4 className="text-lg font-semibold text-[#24424D] mb-4 flex items-center">
              <div className="w-6 h-6 bg-[#F0B46B]/20 rounded-lg flex items-center justify-center mr-2">
                <Route className="w-4 h-4 text-[#F0B46B]" />
              </div>
              Alternative Travel Options
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tripPlan.travel.alternative_options.map((option, idx) => (
                <div key={idx} className="bg-[#EBE8DF]/30 rounded-2xl p-4 border border-[#E3E1DD]">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-[#283F45]/70 font-medium">Mode:</span>
                      <span className="text-[#24424D] font-semibold">{option.mode}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#283F45]/70 font-medium">Duration:</span>
                      <span className="text-[#24424D]">{option.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#283F45]/70 font-medium">Cost:</span>
                      <span className="text-[#24424D] font-semibold">{option.cost}</span>
                    </div>
                    <div className="mt-3">
                      <span className="text-[#283F45]/70 font-medium">Pros/Cons:</span>
                      <p className="text-[#283F45] text-sm mt-1">{option.pros_cons}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Accommodation */}
      <div className="bg-white rounded-3xl shadow-2xl p-8 border border-[#E3E1DD] relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-[#F0B46B]/10 to-[#E87851]/10 rounded-full -translate-x-12 translate-y-12"></div>

        <h3 className="text-2xl font-bold text-[#24424D] mb-6 flex items-center relative">
          <div className="w-8 h-8 bg-[#F0B46B]/20 rounded-xl flex items-center justify-center mr-3">
            <Hotel className="w-5 h-5 text-[#F0B46B]" />
          </div>
          Recommended Hotels
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {tripPlan.accommodation.recommended_hotels.map((hotel, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-[#EBE8DF]/30 to-[#E9E9DF]/30 rounded-2xl p-6 border border-[#E3E1DD] hover:shadow-lg transition-all duration-300 hover:scale-[1.02] relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#F0B46B]/20 to-[#E87851]/20 rounded-full -translate-y-4 translate-x-4"></div>

              <div className="flex items-start justify-between mb-4 relative">
                <div>
                  <h4 className="text-lg font-semibold text-[#24424D] mb-1">{hotel.name}</h4>
                  <p className="text-[#283F45]/70 flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {hotel.location}
                  </p>
                </div>
                <div className="flex items-center bg-[#F0B46B]/20 px-2 py-1 rounded-xl border border-[#F0B46B]/30">
                  <Star className="w-4 h-4 text-[#F0B46B] mr-1" />
                  <span className="text-[#24424D] font-semibold text-sm">{hotel.rating}</span>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[#283F45]/70 font-medium">Price per night:</span>
                  <span className="text-[#24424D] font-bold text-lg">{hotel.price_per_night}</span>
                </div>
              </div>

              <div className="mb-4">
                <h5 className="text-[#283F45] font-medium mb-2">Amenities:</h5>
                <div className="flex flex-wrap gap-2">
                  {hotel.amenities.map((amenity, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-white/80 rounded-full text-xs text-[#283F45] border border-[#E3E1DD]"
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
                className="inline-flex items-center text-[#266267] hover:text-[#24424D] font-medium transition-colors"
              >
                View Hotel
                <ExternalLink className="w-4 h-4 ml-1" />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Daily Itinerary */}
      <div className="bg-white rounded-3xl shadow-2xl p-8 border border-[#E3E1DD] relative overflow-hidden">
        <div className="absolute top-8 right-8 w-24 h-24 bg-gradient-to-bl from-[#266267]/10 to-[#24424D]/10 rounded-full"></div>

        <h3 className="text-2xl font-bold text-[#24424D] mb-6 flex items-center relative">
          <div className="w-8 h-8 bg-[#266267]/10 rounded-xl flex items-center justify-center mr-3">
            <Clock className="w-5 h-5 text-[#266267]" />
          </div>
          Daily Itinerary
        </h3>

        <div className="space-y-6">
          {Object.entries(tripPlan.daily_itinerary).map(([day, details], index) => (
            <div key={day} className="relative">
              {index !== Object.keys(tripPlan.daily_itinerary).length - 1 && (
                <div className="absolute left-6 top-16 w-0.5 h-full bg-gradient-to-b from-[#266267]/30 to-[#24424D]/30 rounded-full"></div>
              )}
              <div className="bg-gradient-to-br from-[#EBE8DF]/20 to-[#E9E9DF]/20 rounded-2xl p-6 border border-[#E3E1DD] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#F0B46B]/10 to-[#E87851]/10 rounded-full -translate-y-6 translate-x-6"></div>

                <div className="flex items-center justify-between mb-4 relative">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#266267] to-[#24424D] rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                      <span className="text-white font-bold">{index + 1}</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-[#24424D]">{day.replace("_", " ").toUpperCase()}</h4>
                      <p className="text-[#283F45]/70">{formatDate(details.date)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="bg-[#F0B46B]/20 text-[#24424D] px-3 py-1 rounded-full text-sm font-medium border border-[#F0B46B]/30">
                      {details.estimated_cost}
                    </span>
                  </div>
                </div>
                <div className="ml-16">
                  <ul className="space-y-3">
                    {details.activities.map((activity, idx) => (
                      <li key={idx} className="flex items-start text-[#283F45]">
                        <ChevronRight className="w-4 h-4 mr-2 text-[#266267] mt-0.5 flex-shrink-0" />
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
      <div className="bg-white rounded-3xl shadow-2xl p-8 border border-[#E3E1DD] relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-[#F0B46B]/10 to-[#E87851]/10 rounded-full translate-x-8 translate-y-8"></div>

        <h3 className="text-2xl font-bold text-[#24424D] mb-6 flex items-center relative">
          <div className="w-8 h-8 bg-[#F0B46B]/20 rounded-xl flex items-center justify-center mr-3">
            <IndianRupee className="w-5 h-5 text-[#F0B46B]" />
          </div>
          Expense Breakdown
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(tripPlan.expense_breakdown).map(([category, details]) => (
            <div
              key={category}
              className="bg-gradient-to-br from-[#EBE8DF]/30 to-[#E9E9DF]/30 rounded-2xl p-6 border border-[#E3E1DD] hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="flex justify-between items-start mb-3">
                <h4 className="text-[#24424D] font-semibold capitalize text-lg">{category.replace("_", " ")}</h4>
                <span className="text-[#266267] font-bold text-xl">{details.amount}</span>
              </div>
              <p className="text-[#283F45]/70 text-sm leading-relaxed">{details.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Travel Tips */}
      <div className="bg-white rounded-3xl shadow-2xl p-8 border border-[#E3E1DD] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-28 h-28 bg-gradient-to-br from-[#F0B46B]/10 to-[#E87851]/10 rounded-full -translate-x-8 -translate-y-8"></div>

        <h3 className="text-2xl font-bold text-[#24424D] mb-6 flex items-center relative">
          <div className="w-8 h-8 bg-[#F0B46B]/20 rounded-xl flex items-center justify-center mr-3">
            <Lightbulb className="w-5 h-5 text-[#F0B46B]" />
          </div>
          Travel Tips
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tripPlan.travel_tips.map((tip, index) => (
            <div
              key={index}
              className="flex items-start bg-gradient-to-br from-[#EBE8DF]/20 to-[#E9E9DF]/20 rounded-2xl p-6 border border-[#E3E1DD] hover:shadow-lg transition-all duration-300 hover:scale-[1.02] relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-[#F0B46B]/20 to-[#E87851]/20 rounded-full -translate-y-2 translate-x-2"></div>

              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-[#F0B46B] to-[#E87851] rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                <span className="text-white font-bold text-sm">{index + 1}</span>
              </div>
              <p className="text-[#283F45] leading-relaxed">{tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TripResults
