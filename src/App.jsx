// src/App.jsx
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import { SiteSettingsProvider } from './context/SiteSettingsContext';
import MainLayout from './layouts/MainLayout';
import LoadingScreen from './components/LoadingScreen';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Portfolio from './pages/Portfolio';
import ProjectDetail from './pages/ProjectDetail';
import Vastu from './pages/Vastu';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Contact from './pages/Contact';
import Quote from './pages/Quote';
import Careers from './pages/Careers';
import Reviews from './pages/Reviews';
import NotFound from './pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home />, errorElement: <NotFound /> },
      { path: 'about', element: <About />, errorElement: <NotFound /> },
      { path: 'services', element: <Services />, errorElement: <NotFound /> },
      { path: 'services/:slug', element: <ServiceDetail />, errorElement: <NotFound /> },
      { path: 'portfolio', element: <Portfolio />, errorElement: <NotFound /> },
      { path: 'portfolio/:id', element: <ProjectDetail />, errorElement: <NotFound /> },
      { path: 'vastu', element: <Vastu />, errorElement: <NotFound /> },
      { path: 'blog', element: <Blog />, errorElement: <NotFound /> },
      { path: 'blog/:slug', element: <BlogDetail />, errorElement: <NotFound /> },
      { path: 'contact', element: <Contact />, errorElement: <NotFound /> },
      { path: 'quote', element: <Quote />, errorElement: <NotFound /> },
      { path: 'careers', element: <Careers />, errorElement: <NotFound /> },
      { path: 'reviews', element: <Reviews />, errorElement: <NotFound /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <SiteSettingsProvider>
          <LoadingScreen />
          <RouterProvider router={router} />
        </SiteSettingsProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}
