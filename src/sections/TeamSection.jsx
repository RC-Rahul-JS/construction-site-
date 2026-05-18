// src/sections/TeamSection.jsx
import { motion } from 'framer-motion';
import { FaLinkedinIn, FaInstagram, FaTwitter } from 'react-icons/fa';
import SectionTitle from '../components/SectionTitle';
import { useState, useEffect } from 'react';
import { getDocuments } from '../firebase/firestore';

export default function TeamSection() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDocuments('team', { sortBy: 'order', sortOrder: 'asc' })
      .then(data => {
        setTeam(data);
      })
      .catch(() => setTeam([]))
      .finally(() => setLoading(false));
  }, []);


  if (loading) return <section className="section-py bg-dark-100 text-white text-center">Loading team...</section>;
  return (
    <section className="section-py bg-dark-100">
      <div className="container-custom">
        <SectionTitle
          tag="Our People"
          title={<>Meet Our <span className="text-gradient-gold">Expert Team</span></>}
          subtitle="Passionate professionals bringing decades of expertise to every project we undertake."
          center
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {team.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="group text-center"
            >
              {/* Photo */}
              <div className="relative mb-4 mx-auto w-28 h-28">
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-white/10
                group-hover:border-gold transition-colors duration-400">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                {/* Social overlay */}
                <div className="absolute inset-0 rounded-full bg-gold/80 flex items-center justify-center gap-2
                opacity-0 group-hover:opacity-100 transition-all duration-400">
                  { (member.socialLinks?.linkedin || member.linkedin) && <a href={member.socialLinks?.linkedin || member.linkedin} className="text-dark hover:scale-110 transition-transform">
                    <FaLinkedinIn size={14} />
                  </a> }
                  { (member.socialLinks?.instagram || member.instagram) && <a href={member.socialLinks?.instagram || member.instagram} className="text-dark hover:scale-110 transition-transform">
                    <FaInstagram size={14} />
                  </a> }
                  { (member.socialLinks?.twitter || member.twitter) && <a href={member.socialLinks?.twitter || member.twitter} className="text-dark hover:scale-110 transition-transform">
                    <FaTwitter size={14} />
                  </a> }
                </div>
              </div>

              <h4 className="text-white font-semibold text-sm mb-0.5 group-hover:text-gold transition-colors">
                {member.name}
              </h4>
              <p className="text-gold text-xs font-medium mb-0.5">{member.role}</p>
              <p className="text-gray-600 text-xs">{member.experience} Exp.</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
