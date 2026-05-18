// src/pages/ProjectDetail.jsx
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiMapPin, FiClock, FiUser } from 'react-icons/fi';
import { FaRupeeSign } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { getDocumentById, getDocuments } from '../firebase/firestore';
import CTABanner from '../sections/CTABanner';

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [otherProjects, setOtherProjects] = useState([]);

  useEffect(() => {
    setLoading(true);
    getDocumentById('portfolio', id)
      .then(data => {
        setProject(data || null);
      })
      .catch(() => setProject(null))
      .finally(() => setLoading(false));

    getDocuments('portfolio', { sortBy: 'createdAt', sortOrder: 'desc', limitTo: 4 })
      .then(data => setOtherProjects(data))
      .catch(() => setOtherProjects([]));
  }, [id]);


  if (loading) return <div className="min-h-screen flex items-center justify-center bg-dark pt-20 text-white">Loading...</div>;

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark pt-20">
        <div className="text-center">
          <h2 className="text-white font-heading text-3xl mb-4">Project not found</h2>
          <Link to="/portfolio" className="btn-gold">Back to Portfolio</Link>
        </div>
      </div>
    );
  }

  const details = [
    { icon: FiMapPin, label: 'Location', value: project.location },
    { icon: FiClock, label: 'Duration', value: project.duration },
    { icon: FaRupeeSign, label: 'Budget', value: project.budget },
    { icon: FiUser, label: 'Client', value: project.client },
  ];

  return (
    <>
      <Helmet>
        <title>{project.title} | BuildCraft Portfolio</title>
        <meta name="description" content={project.description} />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-dark/95 via-dark/80 to-dark/30" />
        </div>
        <div className="container-custom relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-2xl">
            <Link to="/portfolio" className="inline-flex items-center gap-2 text-gold text-sm mb-6 hover:gap-3 transition-all">
              <FiArrowLeft size={14} /> Back to Portfolio
            </Link>
            <span className="tag mb-4 inline-block">{project.categoryLabel}</span>
            <h1 className="font-heading text-5xl font-bold text-white mb-3">{project.title}</h1>
            <p className="text-gray-300 text-lg">{project.description}</p>
          </motion.div>
        </div>
      </section>

      {/* Project Details */}
      <section className="section-py bg-dark">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Main Image */}
              <div className="rounded-2xl overflow-hidden mb-8">
                <img src={project.image} alt={project.title} className="w-full h-[400px] object-cover" />
              </div>

              {/* Photo Gallery (Extra Images) */}
              {project.images && project.images.length > 1 && (
                <div className="mb-12">
                  <h3 className="font-heading text-2xl font-bold text-white mb-6">Gallery</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {project.images.map((img, index) => {
                      if (img === project.image && index === 0) return null; // Skip main image if it's the first in array
                      return (
                        <div key={index} className="rounded-xl overflow-hidden h-40 group cursor-pointer border border-white/5">
                          <img src={img} alt={`${project.title} - ${index + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <h2 className="font-heading text-3xl font-bold text-white mb-4">About This Project</h2>
              <p className="text-gray-400 leading-relaxed mb-6">{project.description}</p>
              <p className="text-gray-400 leading-relaxed">
                This project showcases our commitment to delivering exceptional quality and craftsmanship. Every aspect was carefully planned and executed to meet the client's vision while adhering to the highest construction standards.
              </p>

              {/* Materials */}
              <div className="mt-8 p-6 glass-card rounded-xl">
                <h3 className="text-white font-semibold mb-3">Materials Used</h3>
                <p className="text-gray-400 text-sm">{project.materials}</p>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="glass-card-gold p-8 rounded-2xl sticky top-28">
                <h3 className="font-heading text-xl font-bold text-white mb-6">Project Details</h3>
                <div className="space-y-5">
                  {details.map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-start gap-3 pb-4 border-b border-white/5 last:border-0">
                      <Icon size={16} className="text-gold mt-0.5 shrink-0" />
                      <div>
                        <p className="text-gray-500 text-xs mb-0.5">{label}</p>
                        <p className="text-white text-sm font-medium">{value}</p>
                      </div>
                    </div>
                  ))}
                  <div className="pb-4 border-b border-white/5">
                    <p className="text-gray-500 text-xs mb-1">Area</p>
                    <p className="text-white text-sm font-medium">{project.area}</p>
                  </div>
                </div>
                <Link to="/contact" className="btn-gold w-full justify-center mt-8">
                  Start Your Project
                </Link>
              </div>
            </div>
          </div>

          {/* Related Projects */}
            <div className="mt-20">
              <h3 className="font-heading text-2xl font-bold text-white mb-8">Other Projects</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {otherProjects.filter(p => p.id !== project.id).slice(0, 3).map(p => (
                  <Link key={p.id} to={`/portfolio/${p.id}`} className="group project-card rounded-xl overflow-hidden bg-dark-200 border border-white/5 hover:border-gold/30 transition-all duration-400 hover:shadow-gold block">
                    <div className="h-44 overflow-hidden">
                      <img src={p.image || (p.images && p.images[0])} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="p-4">
                    <h4 className="text-white font-semibold text-sm group-hover:text-gold transition-colors">{p.title}</h4>
                    <p className="text-gray-500 text-xs mt-1">{p.location}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
