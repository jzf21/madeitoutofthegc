interface TripFormData {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  travelers: number;
  budget: string;
}

export const generateMockTripPlan = (formData: TripFormData) => {
  const getDuration = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} days, ${diffDays - 1} nights`;
  };

  const getBudgetMultiplier = (budget: string) => {
    switch (budget) {
      case 'budget': return 1;
      case 'mid-range': return 1.5;
      case 'luxury': return 2.5;
      default: return 1;
    }
  };

  const multiplier = getBudgetMultiplier(formData.budget);
  const baseCost = 25000 * formData.travelers * multiplier;
  const costRange = `₹${Math.floor(baseCost * 0.8).toLocaleString()} - ₹${Math.floor(baseCost * 1.2).toLocaleString()}`;
  const perPersonCost = `₹${Math.floor(baseCost / formData.travelers).toLocaleString()}`;

  return {
    trip_summary: {
      destination: formData.destination,
      origin: formData.origin,
      dates: {
        departure: formData.departureDate,
        return: formData.returnDate
      },
      duration: getDuration(formData.departureDate, formData.returnDate)
    },
    travel: {
      mode: "flight",
      outbound: {
        transport_type: "airline",
        operator: "IndiGo",
        departure_time: "Morning",
        arrival_time: "Afternoon",
        duration: "2 hours 30 minutes",
        distance: "N/A",
        price_range: `₹${Math.floor(8000 * multiplier).toLocaleString()} - ₹${Math.floor(12000 * multiplier).toLocaleString()}`,
        route_details: `${formData.origin} to ${formData.destination}`
      },
      return: {
        transport_type: "airline",
        operator: "IndiGo",
        departure_time: "Afternoon",
        arrival_time: "Evening",
        duration: "2 hours 30 minutes",
        distance: "N/A",
        price_range: `₹${Math.floor(8000 * multiplier).toLocaleString()} - ₹${Math.floor(12000 * multiplier).toLocaleString()}`,
        route_details: `${formData.destination} to ${formData.origin}`
      },
      alternative_options: [
        {
          mode: "train",
          duration: "18-24 hours",
          cost: `₹${Math.floor(2000 * multiplier).toLocaleString()} - ₹${Math.floor(4000 * multiplier).toLocaleString()}`,
          pros_cons: "Longer duration but more scenic route and budget-friendly"
        }
      ]
    },
    accommodation: {
      recommended_hotels: [
        {
          name: formData.budget === 'luxury' ? "Luxury Resort & Spa" : formData.budget === 'mid-range' ? "Premium Hotel" : "Comfort Inn",
          location: `Central ${formData.destination}`,
          price_per_night: `₹${Math.floor(3000 * multiplier).toLocaleString()} - ₹${Math.floor(5000 * multiplier).toLocaleString()}`,
          rating: formData.budget === 'luxury' ? "5-star" : formData.budget === 'mid-range' ? "4-star" : "3-star",
          amenities: formData.budget === 'luxury' 
            ? ["Spa", "Pool", "Fine Dining", "Concierge", "Wi-Fi", "Fitness Center"]
            : formData.budget === 'mid-range'
            ? ["Restaurant", "Wi-Fi", "Fitness Center", "Bar", "Room Service"]
            : ["Wi-Fi", "Restaurant", "Clean Rooms", "24/7 Reception"]
        },
        {
          name: formData.budget === 'luxury' ? "Heritage Palace Hotel" : formData.budget === 'mid-range' ? "Boutique Hotel" : "Budget Hotel",
          location: `Tourist Area, ${formData.destination}`,
          price_per_night: `₹${Math.floor(2500 * multiplier).toLocaleString()} - ₹${Math.floor(4000 * multiplier).toLocaleString()}`,
          rating: formData.budget === 'luxury' ? "5-star" : formData.budget === 'mid-range' ? "4-star" : "3-star",
          amenities: formData.budget === 'luxury' 
            ? ["Heritage Architecture", "Spa", "Pool", "Fine Dining", "Cultural Programs"]
            : formData.budget === 'mid-range'
            ? ["Wi-Fi", "Restaurant", "Bar", "Parking", "Airport Transfer"]
            : ["Wi-Fi", "Breakfast", "Clean Rooms", "Helpful Staff"]
        }
      ]
    },
    daily_itinerary: {
      day_1: {
        date: formData.departureDate,
        activities: [
          "Arrival and check-in to hotel",
          "Explore local markets and street food",
          "Visit main city attractions",
          "Welcome dinner at local restaurant"
        ],
        estimated_cost: `₹${Math.floor(1500 * multiplier).toLocaleString()}`
      },
      day_2: {
        date: new Date(new Date(formData.departureDate).getTime() + 24*60*60*1000).toISOString().split('T')[0],
        activities: [
          "Morning sightseeing tour",
          "Visit famous landmarks",
          "Lunch at traditional restaurant",
          "Afternoon at leisure",
          "Evening cultural show"
        ],
        estimated_cost: `₹${Math.floor(2000 * multiplier).toLocaleString()}`
      },
      day_3: {
        date: new Date(new Date(formData.departureDate).getTime() + 2*24*60*60*1000).toISOString().split('T')[0],
        activities: [
          "Adventure activities",
          "Nature exploration",
          "Photography opportunities",
          "Local cuisine tasting",
          "Shopping for souvenirs"
        ],
        estimated_cost: `₹${Math.floor(2500 * multiplier).toLocaleString()}`
      },
      day_4: {
        date: new Date(new Date(formData.departureDate).getTime() + 3*24*60*60*1000).toISOString().split('T')[0],
        activities: [
          "Relaxation and spa time",
          "Visit museums and galleries",
          "Farewell lunch",
          "Last-minute shopping",
          "Departure preparation"
        ],
        estimated_cost: `₹${Math.floor(1800 * multiplier).toLocaleString()}`
      }
    },
    expense_breakdown: {
      transportation: {
        amount: `₹${Math.floor(16000 * formData.travelers * multiplier).toLocaleString()}`,
        description: `Round trip flights for ${formData.travelers} ${formData.travelers === 1 ? 'person' : 'people'}`
      },
      accommodation: {
        amount: `₹${Math.floor(12000 * multiplier).toLocaleString()}`,
        description: "Hotel accommodation for entire stay"
      },
      food: {
        amount: `₹${Math.floor(8000 * formData.travelers * multiplier).toLocaleString()}`,
        description: `Meals and dining for ${formData.travelers} ${formData.travelers === 1 ? 'person' : 'people'}`
      },
      activities: {
        amount: `₹${Math.floor(6000 * formData.travelers * multiplier).toLocaleString()}`,
        description: "Sightseeing, tours, and experiences"
      },
      local_transport: {
        amount: `₹${Math.floor(3000 * multiplier).toLocaleString()}`,
        description: "Local transportation and transfers"
      },
      miscellaneous: {
        amount: `₹${Math.floor(5000 * multiplier).toLocaleString()}`,
        description: "Shopping, tips, and miscellaneous expenses"
      }
    },
    total_estimated_cost: {
      amount: costRange,
      per_person: perPersonCost,
      currency: "INR"
    },
    travel_tips: [
      "Book flights and accommodation in advance for better rates",
      "Pack according to the weather conditions of your destination",
      "Keep important documents and copies in separate bags",
      "Learn basic local phrases to enhance your experience",
      "Try authentic local cuisine but be cautious with street food",
      "Respect local customs and traditions",
      "Keep emergency contacts and embassy information handy",
      "Purchase travel insurance for peace of mind"
    ]
  };
};