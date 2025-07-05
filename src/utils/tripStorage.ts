import { TripPlan } from '../types/trip';

const TRIP_STORAGE_KEY = 'trip_plans';

export const generateTripId = (): string => {
  return `trip_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const saveTripPlan = (tripPlan: TripPlan): void => {
  const existingTrips = getTripPlans();
  existingTrips.push(tripPlan);
  localStorage.setItem(TRIP_STORAGE_KEY, JSON.stringify(existingTrips));
};

export const getTripPlans = (): TripPlan[] => {
  const trips = localStorage.getItem(TRIP_STORAGE_KEY);
  return trips ? JSON.parse(trips) : [];
};

export const getTripPlanById = (id: string): TripPlan | null => {
  const trips = getTripPlans();
  return trips.find(trip => trip.id === id) || null;
};

export const deleteTripPlan = (id: string): void => {
  const trips = getTripPlans();
  const filteredTrips = trips.filter(trip => trip.id !== id);
  localStorage.setItem(TRIP_STORAGE_KEY, JSON.stringify(filteredTrips));
}; 