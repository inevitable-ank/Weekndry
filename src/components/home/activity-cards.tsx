import { Card, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Clock, MapPin, Plus } from "lucide-react"
import mountainHikers from "@/assets/mountain-hikers (1).png"
import cookingPasta from "@/assets/cooking-pasta-in-modern-kitchen (1).jpg"
import movieSetup from "@/assets/cozy-living-room-with-movie-setup (1).jpg"
import artGallery from "@/assets/modern-art-gallery-with-paintings (1).jpg"
import beachVolleyball from "@/assets/beach-volleyball-game-with-friends (1).jpg"
import readingNook from "@/assets/cozy-reading-nook-with-books-and-coffee (1).jpg"

const activities = [
  {
    id: 1,
    title: "Morning Hike",
    description: "Explore scenic trails and breathe fresh air",
    duration: "2-3 hours",
    location: "Outdoor",
    category: "Adventure",
    image: mountainHikers,
    tags: ["Energetic", "Adventurous"],
  },
  {
    id: 2,
    title: "Cooking Class",
    description: "Learn to make delicious homemade pasta",
    duration: "3-4 hours",
    location: "Kitchen",
    category: "Creative",
    image: cookingPasta,
    tags: ["Creative", "Social"],
  },
  {
    id: 3,
    title: "Movie Marathon",
    description: "Cozy up with your favorite film series",
    duration: "4-6 hours",
    location: "Home",
    category: "Relaxation",
    image: movieSetup,
    tags: ["Relaxed", "Happy"],
  },
  {
    id: 4,
    title: "Art Gallery Visit",
    description: "Discover local artists and exhibitions",
    duration: "2-3 hours",
    location: "Gallery",
    category: "Culture",
    image: artGallery,
    tags: ["Creative", "Social"],
  },
  {
    id: 5,
    title: "Beach Volleyball",
    description: "Play with friends under the sun",
    duration: "2-3 hours",
    location: "Beach",
    category: "Sports",
    image: beachVolleyball,
    tags: ["Energetic", "Social"],
  },
  {
    id: 6,
    title: "Reading Corner",
    description: "Dive into that book you've been meaning to read",
    duration: "1-2 hours",
    location: "Home",
    category: "Relaxation",
    image: readingNook,
    tags: ["Relaxed", "Creative"],
  },
]

export function ActivityCards() {
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
                  alt={activity.title}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">{activity.category}</Badge>
              </div>

              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">{activity.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{activity.description}</p>

                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {activity.duration}
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

                <Button className="w-full" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add to Weekend
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="secondary" size="lg">
            Browse All Activities
          </Button>
        </div>
      </div>
    </section>
  )
}
