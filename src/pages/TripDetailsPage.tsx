import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TripResults from '../components/TripResults';
import { TripPlan } from '../types/trip';
import { getTripPlanById, deleteTripPlan } from '../utils/tripStorage';
import { Sparkles, ArrowLeft, Trash2 } from 'lucide-react';

const TripDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tripPlan, setTripPlan] = useState<TripPlan | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const trip = getTripPlanById(id);
      if (trip) {
        setTripPlan(trip);
      } else {
        // Trip not found, redirect to home
        navigate('/', { replace: true });
      }
      setIsLoading(false);
    }
  }, [id, navigate]);

  const handleDeleteTrip = () => {
    if (tripPlan && window.confirm('Are you sure you want to delete this trip?')) {
      deleteTripPlan(tripPlan.id);
      navigate('/', { replace: true });
    }
  };

  const handleNewTrip = () => {
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="text-center">
          <div className="animate-spin  h-12 w-12 border-b-2 border-white mx-auto"></div>
          <p className="text-black/60 mt-4">Loading trip details...</p>
        </div>
      </div>
    );
  }

  if (!tripPlan) {
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header with navigation */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 text-black px-4 py-2  hover:bg-white/20 transition-all duration-200 font-medium"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </button>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={handleNewTrip}
            className="inline-flex items-center bg-gradient-to-r from-blue-500 to-purple-600 text-black px-6 py-2  hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-medium"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Plan Another Trip
          </button>
          
          <button
            onClick={handleDeleteTrip}
            className="inline-flex items-center bg-red-500/20 backdrop-blur-sm border border-red-500/30 text-red-400 px-4 py-2  hover:bg-red-500/30 transition-all duration-200 font-medium"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Trip
          </button>
        </div>
      </div>

      {/* Trip Details */}
      <TripResults tripPlan={tripPlan} />
    </div>
  );
};

export default TripDetailsPage; 