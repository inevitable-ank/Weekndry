import { Button } from "@/components/ui/Button"
import { ArrowRight, Calendar, Sparkles } from "lucide-react"
import backgroundPattern from "@/assets/abstract-weekend-activities-pattern (2).jpg"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-card to-muted">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <img src={backgroundPattern} alt="" className="w-full h-full object-cover" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-8">
            <Sparkles className="h-4 w-4" />
            Weekend Planning Made Fun
          </div>

          {/* Main heading */}
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl text-balance">
            Design Your
            <span className="text-primary block">Perfect Weekend</span>
          </h1>

          {/* Subheading */}
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground text-pretty">
            Transform your weekends from ordinary to extraordinary. Choose activities, plan meals, set your mood, and
            create unforgettable Saturday-Sunday experiences.
          </p>

          {/* CTA buttons */}
          <div className="mt-10 flex items-center justify-center gap-6 flex-wrap">
            <Button size="lg" className="px-8 py-4 text-base font-semibold rounded-lg">
              <span className="flex items-center gap-3">
                Start Planning
                <ArrowRight className="h-5 w-5" />
              </span>
            </Button>
            <Button variant="secondary" size="lg" className="px-8 py-4 text-base font-medium rounded-lg">
              <span className="flex items-center gap-3">
                <Calendar className="h-5 w-5" />
                View Demo
              </span>
            </Button>
          </div>

        </div>
      </div>
    </section>
  )
}
