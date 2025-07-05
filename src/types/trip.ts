export interface TripFormData {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  travelers: number;
  budget: string;
}

export interface TripPlan {
  id: string;
  trip_summary: {
    destination: string;
    origin: string;
    dates: { departure: string; return: string };
    duration: string;
  };
  travel: {
    mode: string;
    outbound: {
      transport_type: string;
      operator: string;
      departure_time: string;
      arrival_time: string;
      duration: string;
      distance: string;
      price_range: string;
      route_details: string;
      link: string;
    };
    return: {
      transport_type: string;
      operator: string;
      departure_time: string;
      arrival_time: string;
      duration: string;
      distance: string;
      price_range: string;
      route_details: string;
      link: string;
    };
    alternative_options: Array<{
      mode: string;
      duration: string;
      cost: string;
      pros_cons: string;
    }>;
  };
  accommodation: {
    recommended_hotels: Array<{
      name: string;
      location: string;
      price_per_night: string;
      rating: string;
      amenities: string[];
      link: string;
    }>;
  };
  daily_itinerary: Record<string, {
    date: string;
    activities: string[];
    estimated_cost: string;
  }>;
  expense_breakdown: Record<string, {
    amount: string;
    description: string;
  }>;
  total_estimated_cost: {
    amount: string;
    per_person: string;
    currency: string;
  };
  travel_tips: string[];
  createdAt: string;
} 