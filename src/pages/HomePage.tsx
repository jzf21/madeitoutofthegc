import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TripPlanForm from '../components/TripPlanForm';
import { TripFormData, TripPlan } from '../types/trip';
import { generateTripId, saveTripPlan, getTripPlans } from '../utils/tripStorage';
import { Sparkles, MapPin, Calendar} from 'lucide-react';

const HomePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [previousTrips, setPreviousTrips] = useState<TripPlan[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setPreviousTrips(getTripPlans());
  }, []);

  const handleFormSubmit = async (formData: TripFormData) => {
    setIsLoading(true);
    try {
      const user_prompt = `i want to travel from ${formData.origin} to ${formData.destination} dates ${formData.departureDate} to ${formData.returnDate} with a group of ${formData.travelers}`;
      const baseUrl = import.meta.env.VITE_API_URL || 'https://ai-travel-agent-d8wv.onrender.com';
      const url = `${baseUrl}/api/v1/generate-plan-aggressive?user_prompt=${user_prompt}`;
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
      
      const tripData = await response.json();
      const tripPlan: TripPlan = {
        ...tripData,
        id: generateTripId(),
        createdAt: new Date().toISOString(),
      };
      
      saveTripPlan(tripPlan);
      setPreviousTrips(getTripPlans());
      navigate(`/trip/${tripPlan.id}`);
    } catch (error) {
      console.error('Error generating trip plan:', error);
      // You could add error handling UI here
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Trip Planning Form */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Plan New Trip</h2>
          <TripPlanForm onSubmit={handleFormSubmit} isLoading={isLoading} />
        </div>

        {/* Previous Trips */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Previous Trips</h2>
          {previousTrips.length === 0 ? (
            <div className="backdrop-blur-sm bg-white/10 rounded-2xl p-8 border border-white/20 text-center">
              <p className="text-white/60">No trips planned yet. Create your first trip!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {previousTrips.slice().reverse().map((trip) => (
                <div
                  key={trip.id}
                  className="backdrop-blur-sm bg-white/10 rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-200 cursor-pointer"
                  onClick={() => navigate(`/trip/${trip.id}`)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-blue-400" />
                      <span className="text-white font-semibold">
                        {trip.trip_summary.origin} → {trip.trip_summary.destination}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-white/60" />
                      <span className="text-white/60 text-sm">
                        {formatDate(trip.trip_summary.dates.departure)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/80 text-sm">{trip.trip_summary.duration}</span>
                    <span className="text-green-400 font-medium">
                      {trip.total_estimated_cost.amount}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage; 