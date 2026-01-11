import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import 'bootstrap/dist/css/bootstrap.css'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFoundPage from './components/NotFoundPage.tsx'
import About from './pages/About.tsx'
import Education from './pages/Education.tsx'
import Experience from './pages/Experience.tsx'
import Projects from './pages/Projects.tsx'
import SkillsPage from './pages/SkillsPage.tsx'
import Certificates from './pages/Certificates.tsx'
import Languages from './pages/Languages.tsx'
import Blog from './pages/Blog.tsx'
import Contact from './pages/Contact.tsx'

const router = createBrowserRouter([
  {
    path: "/portfolio",
    element: <App />,
    children: [
      {path: "/portfolio/about", element: <About />},
      {path: "/portfolio/education", element: <Education />},
      {path: "/portfolio/experience", element: <Experience />},
      {path: "/portfolio/projects", element: <Projects />},
      {path: "/portfolio/skills", element: <SkillsPage />},
      {path: "/portfolio/certificates", element: <Certificates />},
      {path: "/portfolio/languages", element: <Languages />},
      {path: "/portfolio/blog", element: <Blog />},
      {path: "/portfolio/contact", element: <Contact />},
      {path: "*", element: <NotFoundPage />},
    ],
  },

]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
