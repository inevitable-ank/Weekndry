// Enhanced maps/geocoding with location recommendations for activities

export interface GeocodeResult {
  displayName: string;
  lat: number;
  lon: number;
}

export interface LocationRecommendation {
  name: string;
  address: string;
  lat: number;
  lon: number;
  type: string;
  rating?: number;
  description?: string;
}

export interface ActivityLocationQuery {
  activityName: string;
  category: string;
  userLocation?: { lat: number; lon: number };
}

// Activity-specific location search terms
const ACTIVITY_LOCATION_MAPPING: Record<string, string[]> = {
  // Specific activities
  'Brunch with Friends': ['brunch restaurant', 'cafe', 'breakfast place', 'coffee shop'],
  'Hiking Trail': ['hiking trail', 'nature park', 'mountain trail', 'walking path'],
  'Movie Night': ['cinema', 'movie theater', 'film center', 'multiplex'],
  'Reading Session': ['library', 'bookstore', 'coffee shop', 'quiet cafe'],
  'Picnic in Park': ['park', 'garden', 'recreation area', 'public space'],
  'Yoga Class': ['yoga studio', 'fitness center', 'wellness center', 'gym'],
  'City Walk': ['city center', 'downtown', 'shopping district', 'tourist area'],
  'Board Games': ['board game cafe', 'game center', 'community center', 'cafe'],
  
  // Additional common activities
  'Coffee Date': ['coffee shop', 'cafe', 'coffee house', 'espresso bar'],
  'Beach Day': ['beach', 'coastal area', 'seaside', 'waterfront'],
  'Museum Visit': ['museum', 'art gallery', 'cultural center', 'exhibition'],
  'Shopping': ['shopping mall', 'shopping center', 'downtown', 'market'],
  'Concert': ['concert hall', 'music venue', 'theater', 'auditorium'],
  'Art Gallery': ['art gallery', 'museum', 'cultural center', 'exhibition space'],
  'Spa Day': ['spa', 'wellness center', 'beauty salon', 'relaxation center'],
  'Sports Game': ['stadium', 'sports complex', 'arena', 'sports center'],
  'Farmers Market': ['farmers market', 'local market', 'food market', 'community market'],
  'Book Club': ['library', 'bookstore', 'coffee shop', 'community center'],
  'Photography': ['scenic viewpoint', 'landmark', 'park', 'tourist attraction'],
  'Cooking Class': ['cooking school', 'culinary center', 'kitchen studio', 'food academy'],
  'Wine Tasting': ['winery', 'wine bar', 'tasting room', 'vineyard'],
  'Art Workshop': ['art studio', 'creative center', 'workshop space', 'art school'],
  'Dance Class': ['dance studio', 'dance school', 'fitness center', 'community center'],
  'Swimming': ['swimming pool', 'aquatic center', 'beach', 'water park'],
  'Cycling': ['bike trail', 'cycling path', 'park', 'recreation area'],
  'Fishing': ['fishing spot', 'lake', 'river', 'fishing pier'],
  'Camping': ['campground', 'national park', 'nature reserve', 'outdoor area'],
  'Skiing': ['ski resort', 'ski area', 'mountain', 'winter sports center'],
  
  // Category-based fallbacks
  'food': ['restaurant', 'cafe', 'food court', 'dining'],
  'outdoor': ['park', 'garden', 'trail', 'outdoor space'],
  'entertainment': ['entertainment center', 'theater', 'cinema', 'arcade'],
  'learning': ['library', 'museum', 'cultural center', 'bookstore'],
  'social': ['community center', 'social club', 'meeting place', 'cafe'],
  'fitness': ['gym', 'fitness center', 'sports complex', 'wellness center'],
  'travel': ['tourist attraction', 'landmark', 'scenic spot', 'viewpoint'],
  'relaxation': ['spa', 'wellness center', 'quiet park', 'meditation center']
};

export async function geocode(query: string): Promise<GeocodeResult[]> {
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`;
    const res = await fetch(url, { headers: { 'Accept-Language': 'en' } });
    if (!res.ok) throw new Error('geocode failed');
    const data = await res.json();
    return (data as any[]).slice(0, 5).map(item => ({
      displayName: item.display_name,
      lat: parseFloat(item.lat),
      lon: parseFloat(item.lon),
    }));
  } catch {
    return [];
  }
}

export async function reverseGeocode(lat: number, lon: number): Promise<string | null> {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
    const res = await fetch(url, { headers: { 'Accept-Language': 'en' } });
    if (!res.ok) throw new Error('reverse failed');
    const data = await res.json();
    return data?.display_name ?? null;
  } catch {
    return null;
  }
}

// Get location recommendations for a specific activity
export async function getActivityLocationRecommendations(
  activityQuery: ActivityLocationQuery
): Promise<LocationRecommendation[]> {
  const { activityName, category, userLocation } = activityQuery;
  
  // Get search terms for this activity
  const searchTerms = ACTIVITY_LOCATION_MAPPING[activityName] || 
                     ACTIVITY_LOCATION_MAPPING[category] || 
                     [activityName.toLowerCase()];
  
  const recommendations: LocationRecommendation[] = [];
  
  // Try each search term
  for (const term of searchTerms.slice(0, 3)) { // Limit to 3 terms to avoid rate limits
    try {
      // Add location context if available
      const query = userLocation 
        ? `${term} near ${userLocation.lat},${userLocation.lon}`
        : term;
        
      const results = await geocode(query);
      
      // Convert to recommendations
      const newRecommendations = results.map((result, index) => ({
        name: extractLocationName(result.displayName),
        address: result.displayName,
        lat: result.lat,
        lon: result.lon,
        type: term,
        rating: Math.max(3, 5 - index * 0.5), // Mock rating based on search order
        description: getLocationDescription(term, activityName)
      }));
      
      recommendations.push(...newRecommendations);
      
      // Add a small delay to respect rate limits
      await new Promise(resolve => setTimeout(resolve, 200));
      
    } catch (error) {
      console.warn(`Failed to search for ${term}:`, error);
    }
  }
  
  // Remove duplicates and limit results
  const uniqueRecommendations = recommendations
    .filter((rec, index, arr) => 
      arr.findIndex(r => r.lat === rec.lat && r.lon === rec.lon) === index
    )
    .slice(0, 5);
  
  return uniqueRecommendations;
}

// Helper function to extract a clean location name
function extractLocationName(displayName: string): string {
  // Try to extract the most relevant part of the address
  const parts = displayName.split(',');
  if (parts.length >= 2) {
    // Return the first two parts (usually name and area)
    return parts.slice(0, 2).join(', ').trim();
  }
  return displayName;
}

// Helper function to generate location descriptions
function getLocationDescription(type: string, activityName: string): string {
  const descriptions: Record<string, string> = {
    'brunch restaurant': 'Perfect spot for a leisurely brunch with friends',
    'cafe': 'Cozy atmosphere ideal for casual meetups',
    'coffee shop': 'Great place for coffee and conversation',
    'hiking trail': 'Scenic trail perfect for outdoor adventure',
    'nature park': 'Beautiful natural setting for outdoor activities',
    'cinema': 'Great place to catch the latest movies',
    'movie theater': 'Comfortable seating and great sound system',
    'library': 'Quiet environment perfect for reading',
    'bookstore': 'Cozy atmosphere with great book selection',
    'park': 'Open space perfect for outdoor activities',
    'yoga studio': 'Peaceful environment for wellness activities',
    'gym': 'Well-equipped facility for fitness activities',
    'city center': 'Vibrant area with lots to explore',
    'board game cafe': 'Fun atmosphere perfect for game nights',
    'beach': 'Beautiful coastal area for relaxation and fun',
    'museum': 'Educational and inspiring cultural experience',
    'shopping mall': 'Great variety of stores and entertainment',
    'concert hall': 'Amazing acoustics for live music',
    'art gallery': 'Inspiring space for art appreciation',
    'spa': 'Relaxing environment for wellness and pampering',
    'stadium': 'Exciting venue for sports and events',
    'farmers market': 'Fresh local produce and community atmosphere',
    'winery': 'Perfect for wine tasting and relaxation',
    'cooking school': 'Hands-on learning in a professional kitchen',
    'dance studio': 'Spacious floor for dance and movement',
    'swimming pool': 'Clean facility for swimming and water activities',
    'bike trail': 'Scenic path perfect for cycling',
    'fishing spot': 'Great location for fishing and relaxation',
    'campground': 'Beautiful natural setting for camping',
    'ski resort': 'Excellent slopes and winter sports facilities'
  };
  
  return descriptions[type] || `Great location for ${activityName.toLowerCase()}`;
}



