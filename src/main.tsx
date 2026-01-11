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
      {path: "/", element: <App />},
      {path: "/about", element: <About />},
      {path: "/education", element: <Education />},
      {path: "/experience", element: <Experience />},
      {path: "/projects", element: <Projects />},
      {path: "/skills", element: <SkillsPage />},
      {path: "/certificates", element: <Certificates />},
      {path: "/languages", element: <Languages />},
      {path: "/blog", element: <Blog />},
      {path: "/contact", element: <Contact />},
      {path: "*", element: <NotFoundPage />},
    ],
  },

]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
