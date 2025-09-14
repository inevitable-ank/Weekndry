# Location Recommendations Feature

## Overview
The location recommendations feature provides intelligent place suggestions for activities in the Weekendly app. When users click the "Find Places" button on any activity card, they get location-specific recommendations based on their current location and the activity type.

## How It Works

### 1. Activity-Specific Mapping
Each activity is mapped to relevant location types:
- **Brunch with Friends** → brunch restaurants, cafes, breakfast places
- **Hiking Trail** → hiking trails, nature parks, mountain trails
- **Movie Night** → cinemas, movie theaters, film centers
- **Reading Session** → libraries, bookstores, quiet cafes
- And many more...

### 2. Location-Aware Search
- Uses the user's current location (from weather service)
- Searches for places near the user's location
- Falls back to general search if location is unavailable

### 3. Smart Recommendations
- Combines multiple search terms for better results
- Removes duplicates and limits to top 5 results
- Provides ratings and descriptions for each location
- Includes both "View on Map" and "Get Directions" options

## Usage

1. **In Planner Page**: Click "Find Places" button on any activity card
2. **Modal Opens**: Shows location recommendations with:
   - Location name and address
   - Rating and description
   - View and Directions buttons
3. **Interact**: Click locations to view on map or get directions

## Technical Implementation

### Files Modified/Created:
- `services/mapsService.ts` - Enhanced with location recommendation logic
- `components/activity/LocationRecommendations.tsx` - New modal component
- `components/activity/ActivityCard.tsx` - Updated to use new feature

### APIs Used:
- OpenStreetMap Nominatim (free, no API key required)
- Google Maps (for directions)
- User's geolocation (via weather service)

### Features:
- ✅ Activity-specific location mapping
- ✅ Location-aware search
- ✅ User-friendly modal interface
- ✅ Map integration
- ✅ Directions integration
- ✅ Error handling and loading states
- ✅ Responsive design

## Example Usage

When a user selects "Brunch with Friends" and clicks "Find Places":
1. System searches for "brunch restaurant", "cafe", "breakfast place" near user's location
2. Returns top 5 relevant locations with descriptions
3. User can view locations on map or get directions
4. All recommendations are contextual to the activity type

This makes the app much more useful by providing actual, actionable location suggestions rather than just generic map searches.
