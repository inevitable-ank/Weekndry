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
          <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
            <Button size="lg" className="h-12 px-8 text-base font-semibold">
              Start Planning
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="secondary" size="lg" className="h-12 px-8 text-base bg-transparent">
              <Calendar className="mr-2 h-5 w-5" />
              View Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Activities Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">50k+</div>
              <div className="text-sm text-muted-foreground">Weekends Planned</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">98%</div>
              <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
