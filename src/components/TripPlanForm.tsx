import React, { useState } from 'react';
import { MapPin, Calendar, Users, IndianRupee, Plane } from 'lucide-react';

interface TripFormData {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  travelers: number;
  budget: string;
}

interface TripPlanFormProps {
  onSubmit: (data: TripFormData) => void;
  isLoading: boolean;
}

const TripPlanForm: React.FC<TripPlanFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<TripFormData>({
    origin: '',
    destination: '',
    departureDate: '',
    returnDate: '',
    travelers: 1,
    budget: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="backdrop-blur-sm bg-white/10 rounded-2xl p-8 border border-white/20 shadow-xl">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full mb-4">
          <Plane className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Plan Your Perfect Trip</h2>
        <p className="text-white/70">Let AI create your personalized travel itinerary</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-white/90 text-sm font-medium mb-2">
              <MapPin className="inline w-4 h-4 mr-2" />
              From
            </label>
            <input
              type="text"
              name="origin"
              value={formData.origin}
              onChange={handleChange}
              placeholder="Enter origin city"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm"
              required
            />
          </div>
          
          <div>
            <label className="block text-white/90 text-sm font-medium mb-2">
              <MapPin className="inline w-4 h-4 mr-2" />
              To
            </label>
            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              placeholder="Enter destination"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-white/90 text-sm font-medium mb-2">
              <Calendar className="inline w-4 h-4 mr-2" />
              Departure Date
            </label>
            <input
              type="date"
              name="departureDate"
              value={formData.departureDate}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm"
              required
            />
          </div>
          
          <div>
            <label className="block text-white/90 text-sm font-medium mb-2">
              <Calendar className="inline w-4 h-4 mr-2" />
              Return Date
            </label>
            <input
              type="date"
              name="returnDate"
              value={formData.returnDate}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-white/90 text-sm font-medium mb-2">
              <Users className="inline w-4 h-4 mr-2" />
              Number of Travelers
            </label>
            <select
              name="travelers"
              value={formData.travelers}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                <option key={num} value={num} className="bg-gray-800">
                  {num} {num === 1 ? 'Traveler' : 'Travelers'}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-white/90 text-sm font-medium mb-2">
              <IndianRupee className="inline w-4 h-4 mr-2" />
              Budget Range
            </label>
            <select
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm"
              required
            >
              <option value="" className="bg-gray-800">Select budget range</option>
              <option value="budget" className="bg-gray-800">Budget (₹20,000 - ₹50,000)</option>
              <option value="mid-range" className="bg-gray-800">Mid-range (₹50,000 - ₹1,00,000)</option>
              <option value="luxury" className="bg-gray-800">Luxury (₹1,00,000+)</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
              Generating Your Trip Plan...
            </div>
          ) : (
            'Generate Trip Plan'
          )}
        </button>
      </form>
    </div>
  );
};

export default TripPlanForm;