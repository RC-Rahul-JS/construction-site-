// src/sections/BlogPreview.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiClock, FiTag } from 'react-icons/fi';
import SectionTitle from '../components/SectionTitle';
import { blogs } from '../data/blog';

export default function BlogPreview() {
  const featured = blogs.slice(0, 3);
  return (
    <section className="section-py bg-dark">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <SectionTitle
            tag="Our Blog"
            title={<>Latest <span className="text-gradient-gold">Insights</span></>}
            subtitle="Expert tips, design trends, and construction knowledge from our team."
          />
          <Link to="/blog" className="btn-outline shrink-0 self-start lg:self-auto mb-14 lg:mb-0">
            All Articles <FiArrowRight size={16} />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {featured.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-dark-200 rounded-2xl overflow-hidden border border-white/5 hover:border-gold/20
              transition-all duration-400 group hover:-translate-y-1 hover:shadow-gold"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-200 to-transparent" />
                <span className="absolute top-4 left-4 tag text-[10px]">{post.category}</span>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                  <span className="flex items-center gap-1">
                    <FiClock size={11} className="text-gold" />
                    {post.readTime}
                  </span>
                  <span>{post.date}</span>
                </div>

                <h3 className="font-heading text-white font-semibold text-base leading-tight mb-3
                group-hover:text-gold transition-colors duration-300 line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-gray-500 text-xs leading-relaxed mb-5 line-clamp-2">
                  {post.excerpt}
                </p>

                {/* Author + Read */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex items-center gap-2">
                    <img
                      src={post.authorImage}
                      alt={post.author}
                      className="w-7 h-7 rounded-full object-cover border border-gold/30"
                    />
                    <span className="text-gray-400 text-xs">{post.author}</span>
                  </div>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="text-gold text-xs font-semibold flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    Read <FiArrowRight size={11} />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
