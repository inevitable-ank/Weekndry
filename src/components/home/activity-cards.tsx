import { Card, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Clock, MapPin, Plus } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useSchedule } from "@/store/scheduleStore"
import type { Activity } from "@/types/activity"
import mountainHikers from "@/assets/mountain-hikers (1).png"
import cookingPasta from "@/assets/cooking-pasta-in-modern-kitchen (1).jpg"
import movieSetup from "@/assets/cozy-living-room-with-movie-setup (1).jpg"
import artGallery from "@/assets/modern-art-gallery-with-paintings (1).jpg"
import beachVolleyball from "@/assets/beach-volleyball-game-with-friends (1).jpg"
import readingNook from "@/assets/cozy-reading-nook-with-books-and-coffee (1).jpg"

const activities: (Activity & { image: string; tags: string[] })[] = [
  {
    id: "home-1",
    name: "Morning Hike",
    description: "Explore scenic trails and breathe fresh air",
    durationMinutes: 150,
    location: "Outdoor",
    category: "outdoor",
    icon: "🥾",
    mood: "energetic",
    energyLevel: 4,
    image: mountainHikers,
    tags: ["Energetic", "Adventurous"],
  },
  {
    id: "home-2",
    name: "Cooking Class",
    description: "Learn to make delicious homemade pasta",
    durationMinutes: 210,
    location: "Kitchen",
    category: "food",
    icon: "🍝",
    mood: "creative",
    energyLevel: 3,
    image: cookingPasta,
    tags: ["Creative", "Social"],
  },
  {
    id: "home-3",
    name: "Movie Marathon",
    description: "Cozy up with your favorite film series",
    durationMinutes: 300,
    location: "Home",
    category: "entertainment",
    icon: "🎬",
    mood: "relaxed",
    energyLevel: 1,
    image: movieSetup,
    tags: ["Relaxed", "Happy"],
  },
  {
    id: "home-4",
    name: "Art Gallery Visit",
    description: "Discover local artists and exhibitions",
    durationMinutes: 150,
    location: "Gallery",
    category: "entertainment",
    icon: "🎨",
    mood: "creative",
    energyLevel: 2,
    image: artGallery,
    tags: ["Creative", "Social"],
  },
  {
    id: "home-5",
    name: "Beach Volleyball",
    description: "Play with friends under the sun",
    durationMinutes: 150,
    location: "Beach",
    category: "fitness",
    icon: "🏐",
    mood: "energetic",
    energyLevel: 4,
    image: beachVolleyball,
    tags: ["Energetic", "Social"],
  },
  {
    id: "home-6",
    name: "Reading Corner",
    description: "Dive into that book you've been meaning to read",
    durationMinutes: 90,
    location: "Home",
    category: "learning",
    icon: "📚",
    mood: "calm",
    energyLevel: 1,
    image: readingNook,
    tags: ["Relaxed", "Creative"],
  },
]

export function ActivityCards() {
  const navigate = useNavigate();
  const { addActivity } = useSchedule();

  const handleBrowseAllActivities = () => {
    navigate('/planner');
  };

  const handleAddToWeekend = (activity: Activity) => {
    // Add to Saturday morning by default, user can move it later
    addActivity(activity, 'Saturday', 'morning');
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl text-balance">Popular Weekend Activities</h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Discover activities that match your mood and interests
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {activities.map((activity) => (
            <Card key={activity.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={activity.image || "/placeholder.svg"}
                  alt={activity.name}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground capitalize">{activity.category}</Badge>
              </div>

              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">{activity.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{activity.description}</p>

                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {activity.durationMinutes} min
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {activity.location}
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {activity.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Button className="w-full" size="sm" onClick={() => handleAddToWeekend(activity)}>
                  <span className="flex items-center justify-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add to Weekend
                  </span>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="secondary" size="lg" onClick={handleBrowseAllActivities}>
            Browse All Activities
          </Button>
        </div>
      </div>
    </section>
  )
}
