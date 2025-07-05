import React from 'react';
import { 
  MapPin, 
  Calendar, 
  Plane, 
  Hotel, 
  IndianRupee, 
  Clock, 
  Star,
  Lightbulb,
  ChevronRight
} from 'lucide-react';

interface TripPlan {
  trip_summary: {
    destination: string;
    origin: string;
    dates: {
      departure: string;
      return: string;
    };
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
      link:string;
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
      link:string;
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
      link:string;
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

interface TripResultsProps {
  tripPlan: TripPlan;
}

const TripResults: React.FC<TripResultsProps> = ({ tripPlan }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-8">
      {/* Trip Summary */}
      <div className="backdrop-blur-sm bg-white/10 rounded-2xl p-8 border border-white/20 shadow-xl">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-white mb-2">Your Perfect Trip Plan</h2>
          <div className="flex items-center justify-center text-white/70 mb-4">
            <MapPin className="w-5 h-5 mr-2" />
            <span className="text-lg">
              {tripPlan.trip_summary.origin} → {tripPlan.trip_summary.destination}
            </span>
          </div>
          <div className="flex items-center justify-center space-x-6 text-white/80">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{formatDate(tripPlan.trip_summary.dates.departure)}</span>
            </div>
            <ChevronRight className="w-4 h-4" />
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{formatDate(tripPlan.trip_summary.dates.return)}</span>
            </div>
          </div>
          <p className="text-white/60 mt-2">{tripPlan.trip_summary.duration}</p>
        </div>
        
        <div className="text-center">
          <div className="inline-flex items-center bg-gradient-to-r from-green-500 to-blue-500 px-6 py-3 rounded-full">
            <IndianRupee className="w-5 h-5 mr-2 text-white" />
            <span className="text-white font-semibold text-lg">
              Total Cost: {tripPlan.total_estimated_cost.amount}
            </span>
          </div>
          <p className="text-white/60 mt-2">
            {tripPlan.total_estimated_cost.per_person} per person
          </p>
        </div>
      </div>

      {/* Travel Details */}
      <div className="backdrop-blur-sm bg-white/10 rounded-2xl p-8 border border-white/20 shadow-xl">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
          <Plane className="w-6 h-6 mr-3" />
          Travel Details
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h4 className="text-lg font-semibold text-white mb-3">Outbound Journey</h4>
            <div className="space-y-2 text-white/80">
              <p><strong>Operator:</strong> {tripPlan.travel.outbound.operator}</p>
              <p><strong>Route:</strong> {tripPlan.travel.outbound.route_details}</p>
              <p><strong>Duration:</strong> {tripPlan.travel.outbound.duration}</p>
              <p><strong>Price:</strong> {tripPlan.travel.outbound.price_range}</p>
              <p><strong><a href={tripPlan.travel.outbound.link}>link</a></strong></p>
            </div>
          </div>
          
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h4 className="text-lg font-semibold text-white mb-3">Return Journey</h4>
            <div className="space-y-2 text-white/80">
              <p><strong>Operator:</strong> {tripPlan.travel.return.operator}</p>
              <p><strong>Route:</strong> {tripPlan.travel.return.route_details}</p>
              <p><strong>Duration:</strong> {tripPlan.travel.return.duration}</p>
              <p><strong>Price:</strong> {tripPlan.travel.return.price_range}</p>
              <p><strong><a href={tripPlan.travel.return.link}>link</a></strong></p>
            </div>
          </div>
        </div>
      </div>
       <div className="backdrop-blur-sm bg-white/10 rounded-2xl p-8 border border-white/20 shadow-xl">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
          <Plane className="w-6 h-6 mr-3" />
          Travel Details
        </h3>
        {tripPlan.travel.alternative_options && tripPlan.travel.alternative_options.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h4 className="text-lg font-semibold text-white mb-3">Alternative Option</h4>
              <div className="space-y-2 text-white/80">
                {tripPlan.travel.alternative_options.map((option, idx) => (
                  <div key={idx} className="mb-4">
                    <p><strong>Mode:</strong> {option.mode}</p>
                    <p><strong>Duration:</strong> {option.duration}</p>
                    <p><strong>Cost:</strong> {option.cost}</p>
                    <p><strong>Pros/Cons:</strong> {option.pros_cons}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Accommodation */}
      <div className="backdrop-blur-sm bg-white/10 rounded-2xl p-8 border border-white/20 shadow-xl">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
          <Hotel className="w-6 h-6 mr-3" />
          Recommended Hotels
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tripPlan.accommodation.recommended_hotels.map((hotel, index) => (
            <div key={index} className="bg-white/5 rounded-xl p-6 border border-white/10">
              <div className="flex items-start justify-between mb-3">
                <h4 className="text-lg font-semibold text-white">{hotel.name}</h4>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  <span className="text-white/80 text-sm">{hotel.rating}</span>
                </div>
              </div>
              <p className="text-white/60 mb-3">{hotel.location}</p>
              <p className="text-white/80 mb-3"><strong>Price:</strong> {hotel.price_per_night} per night</p>
              <div className="flex flex-wrap gap-2">
                {hotel.amenities.map((amenity, idx) => (
                  <span key={idx} className="px-2 py-1 bg-white/10 rounded-full text-xs text-white/80">
                    {amenity}
                  </span>
                ))}
              </div>
              <p>Link:<a href={hotel.link}></a></p>
            </div>
          ))}
        </div>
      </div>

      {/* Daily Itinerary */}
      <div className="backdrop-blur-sm bg-white/10 rounded-2xl p-8 border border-white/20 shadow-xl">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
          <Clock className="w-6 h-6 mr-3" />
          Daily Itinerary
        </h3>
        
        <div className="space-y-4">
          {Object.entries(tripPlan.daily_itinerary).map(([day, details]) => (
            <div key={day} className="bg-white/5 rounded-xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-lg font-semibold text-white">
                  {day.replace('_', ' ').toUpperCase()} - {formatDate(details.date)}
                </h4>
                <span className="text-white/80 text-sm">{details.estimated_cost}</span>
              </div>
              <ul className="space-y-2">
                {details.activities.map((activity, idx) => (
                  <li key={idx} className="flex items-center text-white/80">
                    <ChevronRight className="w-4 h-4 mr-2 text-blue-400" />
                    {activity}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Expense Breakdown */}
      <div className="backdrop-blur-sm bg-white/10 rounded-2xl p-8 border border-white/20 shadow-xl">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
          <IndianRupee className="w-6 h-6 mr-3" />
          Expense Breakdown
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(tripPlan.expense_breakdown).map(([category, details]) => (
            <div key={category} className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-white font-semibold capitalize">
                  {category.replace('_', ' ')}
                </h4>
                <span className="text-white/80 font-medium">{details.amount}</span>
              </div>
              <p className="text-white/60 text-sm">{details.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Travel Tips */}
      <div className="backdrop-blur-sm bg-white/10 rounded-2xl p-8 border border-white/20 shadow-xl">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
          <Lightbulb className="w-6 h-6 mr-3" />
          Travel Tips
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tripPlan.travel_tips.map((tip, index) => (
            <div key={index} className="flex items-start bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex-shrink-0 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <span className="text-white font-bold text-sm">{index + 1}</span>
              </div>
              <p className="text-white/80">{tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TripResults;