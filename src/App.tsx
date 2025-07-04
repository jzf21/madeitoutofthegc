import  { useState } from 'react';
import TripPlanForm from './components/TripPlanForm';
import TripResults from './components/TripResults';
// import { generateMockTripPlan } from './utils/mockTripData';
import { Sparkles } from 'lucide-react';

interface TripFormData {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  travelers: number;
  budget: string;
}

// Define the type for the trip plan returned by the backend
interface TripPlan {
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
}

function App() {
  const [tripPlan, setTripPlan] = useState<TripPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (formData: TripFormData) => {
    setIsLoading(true);
    try {
      // Construct user_prompt from formData
      const user_prompt = `i want to travel from ${formData.origin} to ${formData.destination} dates ${formData.departureDate} to ${formData.returnDate} with a group of ${formData.travelers}`;
      const url = `${import.meta.env.VITE_API_URL}/api/v1/generate-trip?user_prompt=${user_prompt}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_prompt }),
      });
      if (!response.ok) {
        throw new Error('Failed to generate trip plan');
      }
      const tripData: TripPlan = await response.json();
      setTripPlan(tripData);
    } catch {
      setTripPlan(null);
    }
    setIsLoading(false);
  };

  const handleNewTrip = () => {
    setTripPlan(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-75"></div>
        <div className="absolute top-40 left-1/2 transform -translate-x-1/2 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-150"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {!tripPlan ? (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
                AI Trip Planner
              </h1>
              <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
                Create your perfect travel itinerary with AI-powered recommendations, 
                detailed cost breakdowns, and personalized experiences
              </p>
            </div>
            
            <TripPlanForm onSubmit={handleFormSubmit} isLoading={isLoading} />
          </div>
        ) : (
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <button
                onClick={handleNewTrip}
                className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-xl hover:bg-white/20 transition-all duration-200 font-medium"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Plan Another Trip
              </button>
            </div>
            
            <TripResults tripPlan={tripPlan} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;