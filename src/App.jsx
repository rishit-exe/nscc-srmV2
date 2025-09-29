import { lazy, Suspense, Component } from 'react'
import './App.css'

// FIXME: Implement React.lazy() for all heavy components
// Following the fixme requirement to lazy load ALL major components including Hero
const Hero = lazy(() => import('./components/Hero'))
const AboutUs = lazy(() => import('./components/AboutUs'))
const Domains = lazy(() => import('./components/Domains'))
const Events = lazy(() => import('./components/events/Events'))
const Sponsers = lazy(() => import('./components/Sponsers'))
const Journey  = lazy(() => import('./components/Journey'))
const OurTeam = lazy(() => import('./components/OurTeam'))
const Gallery = lazy(() => import('./components/gallery/Gallery'))
const FollowUs = lazy(() => import('./components/FollowUs/FollowUs'))
const Footer = lazy(() => import('./components/Footer/Footer'))
const RecruitmentPopup = lazy(() => import('./components/RecruitmentPopup'))

// FIXME: Add proper ComponentSkeleton for better loading UX
const ComponentSkeleton = ({ name, height = "h-64" }) => (
  <div className={`${height} bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse rounded-lg mx-auto max-w-7xl px-4`}>
    <div className="flex items-center justify-center h-full">
      <div className="text-center space-y-4">
        <div className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <div className="text-blue-400 text-lg font-medium">
          Loading {name}...
        </div>
        <div className="text-gray-400 text-sm">
          Optimizing performance
        </div>
      </div>
    </div>
  </div>
)

// FIXME: Add Error Boundary for lazy loaded components
class LazyComponentErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Lazy component loading error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-64 bg-red-900/20 border border-red-500/30 rounded-lg mx-auto max-w-7xl px-4 py-8">
          <div className="text-center space-y-4">
            <div className="text-red-400 text-lg font-medium">
              ⚠️ Component failed to load
            </div>
            <div className="text-gray-400 text-sm">
              {this.props.componentName} could not be loaded. Please refresh the page.
            </div>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}


export default function App() {
  return (
    <>
      {/* FIXME: Hero component now lazy loaded with Suspense boundary */}
      <LazyComponentErrorBoundary componentName="Hero">
        <Suspense fallback={<ComponentSkeleton name="Hero Section" height="h-screen" />}>
          <Hero />
        </Suspense>
      </LazyComponentErrorBoundary>
      
      {/* FIXME: AboutUs with error boundary and skeleton */}
      <LazyComponentErrorBoundary componentName="About Us">
        <Suspense fallback={<ComponentSkeleton name="About Us" height="h-96" />}>
          <AboutUs />
        </Suspense>
      </LazyComponentErrorBoundary>
      
      {/* FIXME: Domains with proper Suspense boundary */}
      <div id="domains">
        <LazyComponentErrorBoundary componentName="Domains">
          <Suspense fallback={<ComponentSkeleton name="Domains" height="h-80" />}>
            <Domains />
          </Suspense>
        </LazyComponentErrorBoundary>
      </div>
      
      {/* FIXME: Events with error handling */}
      <div id="events">
        <LazyComponentErrorBoundary componentName="Events">
          <Suspense fallback={<ComponentSkeleton name="Events" height="h-96" />}>
            <Events />
          </Suspense>
        </LazyComponentErrorBoundary>
      </div>

      {/* FIXME: Journey lazy loaded */}
      <LazyComponentErrorBoundary componentName="Journey">
        <Suspense fallback={<ComponentSkeleton name="Journey" height="h-64" />}>
          <Journey />
        </Suspense>
      </LazyComponentErrorBoundary>
      
      {/* FIXME: Sponsors lazy loaded */}
      <LazyComponentErrorBoundary componentName="Sponsors">
        <Suspense fallback={<ComponentSkeleton name="Sponsors" height="h-64" />}>
          <Sponsers />
        </Suspense>
      </LazyComponentErrorBoundary>
      
      {/* FIXME: OurTeam with Suspense as per requirements */}
      <div id="team">
        <LazyComponentErrorBoundary componentName="Our Team">
          <Suspense fallback={<ComponentSkeleton name="Our Team" height="h-screen" />}>
            <OurTeam />
          </Suspense>
        </LazyComponentErrorBoundary>
      </div>
      
      {/* FIXME: Gallery with ComponentSkeleton as per requirements */}
      <LazyComponentErrorBoundary componentName="Gallery">
        <Suspense fallback={<ComponentSkeleton name="Gallery" height="h-96" />}>
          <Gallery />
        </Suspense>
      </LazyComponentErrorBoundary>
      
      {/* FIXME: Footer with lazy loading */}
      <div id="contact">
        <LazyComponentErrorBoundary componentName="Footer">
          <Suspense fallback={<ComponentSkeleton name="Footer" height="h-64" />}>
            <Footer />
          </Suspense>
        </LazyComponentErrorBoundary>
      </div>
      
      {/* FIXME: Commented components also lazy loaded when needed */}
      {/* <LazyComponentErrorBoundary componentName="Follow Us">
        <Suspense fallback={<ComponentSkeleton name="Follow Us" height="h-32" />}>
          <FollowUs />
        </Suspense>
      </LazyComponentErrorBoundary> */}
      
      {/* <LazyComponentErrorBoundary componentName="Recruitment">
        <Suspense fallback={<ComponentSkeleton name="Recruitment Popup" height="h-64" />}>
          <RecruitmentPopup />
        </Suspense>
      </LazyComponentErrorBoundary> */}
    </>
  )
}
