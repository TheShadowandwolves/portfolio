import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import 'bootstrap/dist/css/bootstrap.css'
import './index.css'
import App from './App.tsx'
import { HashRouter as Router, Routes, Route} from 'react-router-dom'
import NotFoundPage from './components/NotFoundPage.tsx'
// import About from './components/About.tsx'
import Education from './pages/Education.tsx'
import Experience from './pages/Experience.tsx'
import Projects from './pages/Projects.tsx'
import SkillsPage from './pages/SkillsPage.tsx'
import Certificates from './pages/Certificates.tsx'
import Languages from './pages/Languages.tsx'
import Blog from './pages/Blog.tsx'
import Contact from './pages/Contact.tsx'
import Auth from './pages/Auth.tsx'
import Profile from './pages/Profile.tsx'



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        {/* <Route path="/about" element={<About />} /> */}
        <Route path="/education" element={<Education />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/certificates" element={<Certificates />} />
        <Route path="/languages" element={<Languages />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path='/profile' element={<Profile/>}/>
      </Routes>
    </Router>
  </StrictMode>,
)
