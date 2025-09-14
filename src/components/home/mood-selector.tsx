
import { useState } from "react"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Smile, Zap, Coffee, Mountain, Users, BookOpen } from "lucide-react"

const moods = [
  { id: "relaxed", name: "Relaxed", icon: Coffee, color: "bg-blue-100 text-blue-600", description: "Chill and unwind" },
  {
    id: "adventurous",
    name: "Adventurous",
    icon: Mountain,
    color: "bg-green-100 text-green-600",
    description: "Explore and discover",
  },
  {
    id: "energetic",
    name: "Energetic",
    icon: Zap,
    color: "bg-yellow-100 text-yellow-600",
    description: "Active and dynamic",
  },
  {
    id: "social",
    name: "Social",
    icon: Users,
    color: "bg-purple-100 text-purple-600",
    description: "Connect with others",
  },
  {
    id: "creative",
    name: "Creative",
    icon: BookOpen,
    color: "bg-pink-100 text-pink-600",
    description: "Express and create",
  },
  { id: "happy", name: "Happy", icon: Smile, color: "bg-orange-100 text-orange-600", description: "Pure joy and fun" },
]

export function MoodSelector() {
  const [selectedMoods, setSelectedMoods] = useState<string[]>([])
  const [currentMood, setCurrentMood] = useState<string>('relaxed')

  const toggleMood = (moodId: string) => {
    setSelectedMoods((prev) => (prev.includes(moodId) ? prev.filter((id) => id !== moodId) : [...prev, moodId]))
    setCurrentMood(moodId) // Set the current mood for color changes
  }

  // Simple color mapping
  const getMoodColors = (mood: string) => {
    const colors = {
      relaxed: 'bg-blue-50',
      adventurous: 'bg-green-50', 
      energetic: 'bg-yellow-50',
      social: 'bg-purple-50',
      creative: 'bg-pink-50',
      happy: 'bg-orange-50'
    }
    return colors[mood as keyof typeof colors] || colors.relaxed
  }

  return (
    <section className={`py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${getMoodColors(currentMood)}`}>
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl text-balance">What's Your Weekend Vibe?</h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Select the moods that match how you want to feel this weekend
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 mb-8">
          {moods.map((mood) => {
            const Icon = mood.icon
            const isSelected = selectedMoods.includes(mood.id)

            return (
              <Card
                key={mood.id}
                className={`p-6 cursor-pointer transition-all duration-200 hover:scale-105 ${
                  isSelected ? "ring-2 ring-primary bg-primary/5" : "hover:shadow-lg"
                }`}
                onClick={() => toggleMood(mood.id)}
              >
                <div className="text-center">
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-full ${mood.color} mb-3`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-sm">{mood.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{mood.description}</p>
                </div>
              </Card>
            )
          })}
        </div>

        {selectedMoods.length > 0 && (
          <div className="text-center">
            <Button size="lg" className="px-8">
              Find Activities for My Vibe ({selectedMoods.length} selected)
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
