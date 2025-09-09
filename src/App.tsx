import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { 
  Button, 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  Badge, 
  ActivityBadge, 
  Modal, 
  ModalHeader, 
  ModalTitle, 
  ModalContent, 
  ModalFooter,
  LoadingSpinner,
  Input
} from './components/ui'

function App() {
  const [count, setCount] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handlePlanActivity = () => {
    setIsLoading(true)
    setTimeout(() => {
      setCount(count + 1)
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="flex justify-center space-x-8 mb-8">
          <a href="https://vite.dev" target="_blank" className="group">
            <img 
              src={viteLogo} 
              className="h-24 w-24 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" 
              alt="Vite logo" 
            />
          </a>
          <a href="https://react.dev" target="_blank" className="group">
            <img 
              src={reactLogo} 
              className="h-24 w-24 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-12 animate-spin-slow" 
              alt="React logo" 
            />
          </a>
        </div>
        
        <h1 className="text-6xl font-bold weekendly-text mb-4">
          Weekendly
        </h1>
        <p className="text-xl text-gray-600 mb-2">
          Your Perfect Weekend Planner
        </p>
        <p className="text-sm text-gray-500">
          Built with Custom UI Components + Tailwind CSS
        </p>
      </div>

      {/* Main Card with Custom Components */}
      <Card className="max-w-md w-full text-center" variant="glass">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-gray-800 mb-2">
            {count}
          </CardTitle>
          <p className="text-gray-600">
            Weekend activities planned
          </p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2 justify-center">
            <ActivityBadge category="food" />
            <ActivityBadge category="entertainment" />
            <ActivityBadge category="outdoor" />
          </div>
          
          <div className="flex space-x-3 justify-center">
            <Button 
              onClick={handlePlanActivity}
              loading={isLoading}
              icon="✨"
              size="lg"
            >
              Plan Activity
            </Button>
            <Button 
              variant="secondary"
              onClick={() => setIsModalOpen(true)}
              icon="⚙️"
            >
              Settings
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Features Preview with Custom Cards */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
        <Card hover className="text-center">
          <div className="text-3xl mb-3">🎯</div>
          <CardTitle className="text-lg">Smart Planning</CardTitle>
          <p className="text-gray-600 text-sm">AI-powered activity suggestions</p>
        </Card>
        
        <Card hover className="text-center">
          <div className="text-3xl mb-3">🎨</div>
          <CardTitle className="text-lg">Beautiful Themes</CardTitle>
          <p className="text-gray-600 text-sm">Customize your weekend vibe</p>
        </Card>
        
        <Card hover className="text-center">
          <div className="text-3xl mb-3">📱</div>
          <CardTitle className="text-lg">Share & Export</CardTitle>
          <p className="text-gray-600 text-sm">Share your perfect weekend</p>
        </Card>
      </div>

      {/* Modal Example */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Weekend Settings"
        size="md"
      >
        <ModalContent>
          <div className="space-y-4">
            <Input 
              label="Weekend Theme"
              placeholder="Choose your vibe..."
              icon="🎨"
            />
            <Input 
              label="Preferred Activities"
              placeholder="What do you love to do?"
              icon="❤️"
            />
            <div className="flex flex-wrap gap-2">
              <Badge variant="primary" removable>Brunch</Badge>
              <Badge variant="success" removable>Hiking</Badge>
              <Badge variant="warning" removable>Movies</Badge>
            </div>
          </div>
        </ModalContent>
        <ModalFooter>
          <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setIsModalOpen(false)}>
            Save Settings
          </Button>
        </ModalFooter>
      </Modal>

      {/* Footer */}
      <div className="mt-12 text-center">
        <p className="text-gray-400 text-sm">
          Beautiful custom components powered by Tailwind CSS
        </p>
      </div>
    </div>
  )
}

export default App
