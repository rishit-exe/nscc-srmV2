import Hero from './components/Hero'
import AboutUs from './components/AboutUs'
import Domains from './components/Domains'
import Events from './components/events/Events'
import Sponsers from './components/Sponsers'
import OurTeam from './components/OurTeam'
import Gallery from './components/gallery/Gallery'
import FollowUs from './components/FollowUs/FollowUs'
import Footer from './components/Footer/Footer'
import RecruitmentPopup from './components/RecruitmentPopup'
import './App.css'


export default function App() {
  return (
    <>
{/*       <RecruitmentPopup /> */}
      <Hero />
      <AboutUs />
      <div id="domains">
        <Domains />
      </div>
      <div id="events">
        <Events />
      </div>
      <Sponsers />
      <div id="team">
        <OurTeam />
      </div>
      <Gallery />
      {/* <FollowUs /> */}
      <div id="contact">
        <Footer />
      </div>
    </>
  )
}
