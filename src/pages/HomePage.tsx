import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TripPlanForm from '../components/TripPlanForm';
import { TripFormData, TripPlan } from '../types/trip';
import { generateTripId, saveTripPlan, getTripPlans } from '../utils/tripStorage';
import { MapPin, Calendar, Loader, CheckCircle } from 'lucide-react';
import Navbar from '../components/NavBar';
import { useAuth } from '../components/AuthContext';

const STEP_LABELS = [
  'Fetching flight details...',
  'Fetching hotel details...',
  'Combining results...'
];

function StepProgressModal({ step, visible }: { step: number; visible: boolean }) {
  if (!visible) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-2xl shadow-2xl p-8 min-w-[320px] flex flex-col items-center">
        <Loader className="w-10 h-10 text-blue-500 animate-spin mb-4" />
        <ol className="space-y-3 mb-4 w-full">
          {STEP_LABELS.map((label, idx) => (
            <li key={label} className="flex items-center">
              {step > idx ? (
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
              ) : idx === step ? (
                <Loader className="w-5 h-5 text-blue-500 animate-spin mr-2" />
              ) : (
                <span className="w-5 h-5 mr-2 inline-block rounded-full border-2 border-gray-300" />
              )}
              <span className={idx === step ? 'font-semibold text-blue-700' : 'text-gray-700'}>{label}</span>
            </li>
          ))}
        </ol>
        <span className="text-gray-500 text-sm">Generating your trip plan...</span>
      </div>
    </div>
  );
}

const HomePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [progressStep, setProgressStep] = useState<number | null>(null);
  const [previousTrips, setPreviousTrips] = useState<TripPlan[]>([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    setPreviousTrips(getTripPlans());
  }, []);

  const handleFormSubmit = async (formData: TripFormData) => {
    if (!user || !user.id) {
      alert('You must be logged in to generate a trip plan.');
      return;
    }
    setIsLoading(true);
    setProgressStep(0);
    // Animate steps
    for (let i = 0; i < STEP_LABELS.length; i++) {
      setProgressStep(i);
      // eslint-disable-next-line no-await-in-loop
      await new Promise(res => setTimeout(res, 900));
    }
    try {
      const user_prompt = `i want to travel from ${formData.origin} to ${formData.destination} dates ${formData.departureDate} to ${formData.returnDate} with a group of ${formData.travelers}`;
      const baseUrl = import.meta.env.VITE_API_URL || 'https://ai-travel-agent-d8wv.onrender.com';
      const url = `${baseUrl}/api/v1/generate-plan-aggressive`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_prompt, user_id: user.id }),
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
      setProgressStep(null);
      navigate(`/trip/${tripPlan.id}`);
    } catch (error) {
      setProgressStep(null);
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
      <StepProgressModal step={progressStep ?? 0} visible={progressStep !== null} />
      <Navbar/>
      {/* Header */}
      <div className="text-center mb-12 my-8 ">
        <h1 className="text-5xl md:text-6xl font-bold text-black mb-4 tracking-tight">
          AI Trip Planner
        </h1>
        <p className="text-xl text-black/70 max-w-2xl mx-auto leading-relaxed">
          Create your perfect travel itinerary with AI-powered recommendations, 
          detailed cost breakdowns, and personalized experiences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Trip Planning Form */}
        <div>
          <h2 className="text-2xl font-bold text-black mb-6">Plan New Trip</h2>
          <div className="">
            <TripPlanForm onSubmit={handleFormSubmit} isLoading={isLoading} />
          </div>
        </div>

        {/* Previous Trips */}
        <div>
          <h2 className="text-2xl font-bold text-black mb-6">Previous Trips</h2>
          {previousTrips.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 text-center">
              <p className="text-black/60">No trips planned yet. Create your first trip!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {previousTrips.slice().reverse().map((trip) => (
                <div
                  key={trip.id}
                  className="bg-white rounded-2xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-all duration-200 cursor-pointer"
                  onClick={() => navigate(`/trip/${trip.id}`)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-blue-400" />
                      <span className="text-black font-semibold">
                        {trip.trip_summary.origin} → {trip.trip_summary.destination}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-black/60" />
                      <span className="text-black/60 text-sm">
                        {formatDate(trip.trip_summary.dates.departure)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-black/80 text-sm">{trip.trip_summary.duration}</span>
                    <span className="text-green-600 font-medium">
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