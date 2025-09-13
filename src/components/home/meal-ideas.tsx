import { useState } from "react"
import { Card, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Clock, ChefHat, Plus, ChevronLeft, ChevronRight } from "lucide-react"
import avocadoToast from "@/assets/avocado-toast-with-eggs-and-coffee (1).jpg"
import grilledBurgers from "@/assets/grilled-burgers-with-friends-outdoors (1).jpg"
import homemadePizza from "@/assets/homemade-pizza-making-with-family (1).jpg"
import smoothieBowl from "@/assets/colorful-smoothie-bowl-with-fruits (1).jpg"
import pastaDinner from "@/assets/creamy-pasta-dinner-with-wine (1).jpg"

const meals = [
  {
    id: 1,
    name: "Avocado Toast Brunch",
    description: "Perfect weekend morning fuel",
    prepTime: "15 min",
    difficulty: "Easy",
    image: avocadoToast,
    tags: ["Healthy", "Quick"],
  },
  {
    id: 2,
    name: "BBQ Burger Night",
    description: "Fire up the grill for friends",
    prepTime: "45 min",
    difficulty: "Medium",
    image: grilledBurgers,
    tags: ["Social", "Outdoor"],
  },
  {
    id: 3,
    name: "Homemade Pizza",
    description: "Family fun in the kitchen",
    prepTime: "60 min",
    difficulty: "Medium",
    image: homemadePizza,
    tags: ["Family", "Creative"],
  },
  {
    id: 4,
    name: "Smoothie Bowl",
    description: "Colorful and nutritious start",
    prepTime: "10 min",
    difficulty: "Easy",
    image: smoothieBowl,
    tags: ["Healthy", "Quick"],
  },
  {
    id: 5,
    name: "Pasta Night",
    description: "Comfort food at its finest",
    prepTime: "30 min",
    difficulty: "Easy",
    image: pastaDinner,
    tags: ["Comfort", "Romantic"],
  },
]

export function MealIdeas() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const cardsPerView = 3

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + 1 >= meals.length - cardsPerView + 1 ? 0 : prevIndex + 1
    )
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex - 1 < 0 ? meals.length - cardsPerView : prevIndex - 1
    )
  }


  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl text-balance">Delicious Weekend Meals</h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            From lazy brunches to dinner parties, we've got your weekend covered
          </p>
        </div>

        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-200 hover:scale-110"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-200 hover:scale-110"
          >
            <ChevronRight className="h-6 w-6 text-gray-600" />
          </button>

          {/* Carousel Container */}
          <div className="overflow-hidden relative mx-auto" style={{ width: 'calc(3 * 320px + 2 * 32px)' }}>
            <div 
              className="flex gap-8 transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (320 + 32)}px)`, // 320px card width + 32px gap
                width: `${meals.length * (320 + 32)}px`
              }}
            >
              {meals.map((meal) => (
                <Card 
                  key={meal.id} 
                  className="w-80 flex-shrink-0 hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <div className="aspect-video relative overflow-hidden">
                    <img src={meal.image || "/placeholder.svg"} alt={meal.name} className="w-full h-full object-cover" />
                  </div>

                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{meal.name}</h3>
                    <p className="text-muted-foreground text-sm mb-3">{meal.description}</p>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {meal.prepTime}
                      </div>
                      <div className="flex items-center gap-1">
                        <ChefHat className="h-3 w-3" />
                        {meal.difficulty}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {meal.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <Button className="w-full" size="sm">
                      <span className="flex items-center justify-center gap-2">
                        <Plus className="h-4 w-4" />
                        Add to Plan
                      </span>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: meals.length - cardsPerView + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  currentIndex === index
                    ? 'bg-primary w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-8">
          <Button variant="secondary" size="lg">
            View Recipe Collection
          </Button>
        </div>
      </div>
    </section>
  )
}
