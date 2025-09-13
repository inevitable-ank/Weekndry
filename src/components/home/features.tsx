import { Card, CardContent } from "@/components/ui/Card"
import { Calendar, Palette, Share2, Smartphone, Clock, Users } from "lucide-react"

const features = [
  {
    icon: Calendar,
    title: "Smart Scheduling",
    description: "Drag and drop activities into your perfect weekend timeline",
  },
  {
    icon: Palette,
    title: "Mood-Based Planning",
    description: "Choose your vibe and get personalized activity recommendations",
  },
  {
    icon: Share2,
    title: "Share & Export",
    description: "Create beautiful weekend posters to share with friends",
  },
  {
    icon: Smartphone,
    title: "Mobile Friendly",
    description: "Plan on the go with our responsive mobile experience",
  },
  {
    icon: Clock,
    title: "Time Management",
    description: "Balance activities with realistic time estimates",
  },
  {
    icon: Users,
    title: "Group Planning",
    description: "Collaborate with friends and family on weekend plans",
  },
]

export function Features() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl text-balance">
            Everything You Need for Perfect Weekends
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Powerful features designed to make weekend planning effortless and fun
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-200">
                <CardContent className="p-6">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
