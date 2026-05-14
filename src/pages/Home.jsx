// src/pages/Home.jsx
import { Helmet } from 'react-helmet-async';
import HeroSlider from '../sections/HeroSlider';
import StatsCounter from '../sections/StatsCounter';
import ServicesPreview from '../sections/ServicesPreview';
import FeaturedProjects from '../sections/FeaturedProjects';
import ConstructionProcess from '../sections/ConstructionProcess';
import WhyChooseUs from '../sections/WhyChooseUs';
import Testimonials from '../sections/Testimonials';
import TeamSection from '../sections/TeamSection';
import CostCalculator from '../sections/CostCalculator';
import FAQSection from '../sections/FAQSection';
import BlogPreview from '../sections/BlogPreview';
import CTABanner from '../sections/CTABanner';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>BuildCraft Construction | Premium Architecture & Construction in Maharashtra</title>
        <meta name="description" content="BuildCraft is Maharashtra's premier construction company offering architecture, bungalow design, interior design, renovation, Vastu consultancy, and turnkey construction services." />
      </Helmet>
      <HeroSlider />
      <StatsCounter />
      <ServicesPreview />
      <FeaturedProjects />
      <ConstructionProcess />
      <WhyChooseUs />
      <Testimonials />
      <CostCalculator />
      <TeamSection />
      <FAQSection />
      <BlogPreview />
      <CTABanner />
    </>
  );
}
