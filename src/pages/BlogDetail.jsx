// src/pages/BlogDetail.jsx
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiClock, FiTag, FiCalendar } from 'react-icons/fi';
import { FaFacebookF, FaTwitter, FaWhatsapp, FaLinkedinIn } from 'react-icons/fa';
import { getDocuments } from '../firebase/firestore';
import CTABanner from '../sections/CTABanner';

export default function BlogDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [allBlogs, setAllBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDocuments('blogs', { filters: [{ field: 'published', op: '==', value: true }] })
      .then(data => {
        setAllBlogs(data);
        const found = data.find(b => b.slug === slug);
        setPost(found || null);
      })
      .catch(() => { setPost(null); setAllBlogs([]); })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen bg-dark pt-32 flex items-center justify-center">
      <div className="text-gold animate-pulse text-lg">Loading article...</div>
    </div>
  );

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark pt-20">
        <div className="text-center px-4">
          <div className="text-8xl font-heading font-bold text-gradient-gold mb-4">404</div>
          <h2 className="text-white font-heading text-3xl font-bold mb-3">Article Not Found</h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            The blog article you're looking for doesn't exist or may have been moved.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/blog" className="btn-gold">Browse All Articles</Link>
            <Link to="/" className="btn-outline">Go Home</Link>
          </div>
        </div>
      </div>
    );
  }

  const excerpt = post.shortDesc || post.excerpt || '';
  const content = post.content || '';
  const related = allBlogs.filter(b => b.slug !== slug && b.category === post.category).slice(0, 3);
  const otherBlogs = allBlogs.filter(b => b.slug !== slug).slice(0, 3);
  const shareUrl = encodeURIComponent(`https://buildcraft.in/blog/${slug}`);
  const shareTitle = encodeURIComponent(post.title);
  const tags = post.tags || [];

  return (
    <>
      <Helmet>
        <title>{post.title} | BuildCraft Blog</title>
        <meta name="description" content={excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={excerpt} />
        <meta property="og:image" content={post.image} />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-dark/80 via-dark/70 to-dark" />
        </div>
        <div className="container-custom relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
            <Link to="/blog" className="inline-flex items-center gap-2 text-gold text-sm mb-6 hover:gap-3 transition-all">
              <FiArrowLeft size={14} /> Back to Blog
            </Link>
            <div className="flex flex-wrap gap-3 mb-5">
              <span className="tag">{post.category}</span>
              {tags.map(tag => (
                <span key={tag} className="flex items-center gap-1 text-[10px] text-gray-400 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
                  <FiTag size={9} /> {tag}
                </span>
              ))}
            </div>
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                {post.authorImage
                  ? <img src={post.authorImage} alt={post.author} className="w-9 h-9 rounded-full border-2 border-gold/30 object-cover" />
                  : <div className="w-9 h-9 rounded-full bg-gold/20 border-2 border-gold/30 flex items-center justify-center text-gold font-bold">{(post.author || 'A')[0]}</div>
                }
                <div>
                  <p className="text-white font-medium text-sm leading-none">{post.author}</p>
                  <p className="text-gray-500 text-xs">Author</p>
                </div>
              </div>
              {post.date && <span className="flex items-center gap-1.5"><FiCalendar size={13} className="text-gold" />{post.date}</span>}
              <span className="flex items-center gap-1.5"><FiClock size={13} className="text-gold" />{post.readTime || '5 min read'}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="section-py bg-dark">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Article */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="rounded-2xl overflow-hidden mb-10">
                <img src={post.image} alt={post.title} className="w-full h-72 object-cover" />
              </div>

              {/* Excerpt */}
              {excerpt && (
                <p className="text-xl text-gray-300 leading-relaxed mb-8 border-l-4 border-gold pl-6 italic">
                  {excerpt}
                </p>
              )}

              {/* Article Body — render rich text content from DB */}
              <div 
                className="rich-text"
                dangerouslySetInnerHTML={{ __html: content }}
              />

              {/* Share Section */}
              <div className="mt-12 pt-8 border-t border-white/5">
                <p className="text-white font-medium mb-4">Share this article</p>
                <div className="flex gap-3">
                  {[
                    { icon: FaFacebookF, href: `https://facebook.com/sharer/sharer.php?u=${shareUrl}`, color: 'bg-blue-600/10 border-blue-600/30 text-blue-400 hover:bg-blue-600/20' },
                    { icon: FaTwitter, href: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`, color: 'bg-sky-500/10 border-sky-500/30 text-sky-400 hover:bg-sky-500/20' },
                    { icon: FaWhatsapp, href: `https://wa.me/?text=${shareTitle}%20${shareUrl}`, color: 'bg-green-500/10 border-green-500/30 text-green-400 hover:bg-green-500/20' },
                    { icon: FaLinkedinIn, href: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`, color: 'bg-blue-700/10 border-blue-700/30 text-blue-400 hover:bg-blue-700/20' },
                  ].map(({ icon: Icon, href, color }) => (
                    <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                      className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${color}`}>
                      <Icon size={14} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Author Card */}
              <div className="mt-10 glass-card p-6 rounded-2xl flex gap-5 items-start">
                {post.authorImage
                  ? <img src={post.authorImage} alt={post.author} className="w-16 h-16 rounded-full border-2 border-gold/30 object-cover shrink-0" />
                  : <div className="w-16 h-16 rounded-full bg-gold/20 border-2 border-gold/30 flex items-center justify-center text-gold text-2xl font-bold shrink-0">{(post.author || 'A')[0]}</div>
                }
                <div>
                  <p className="text-white font-semibold font-heading text-lg mb-0.5">{post.author}</p>
                  <p className="text-gold text-xs mb-3">Expert at BuildCraft Construction</p>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    A seasoned professional at BuildCraft with deep expertise in {(post.category || '').toLowerCase()}. Passionate about sharing knowledge that helps clients make informed decisions about their projects.
                  </p>
                </div>
              </div>
            </motion.article>

            {/* Sidebar */}
            <aside className="space-y-8">
              {/* Related Posts */}
              <div className="glass-card p-6 rounded-2xl">
                <h3 className="font-heading text-lg font-bold text-white mb-5 pb-3 border-b border-white/5">Related Articles</h3>
                <div className="space-y-4">
                  {(related.length > 0 ? related : otherBlogs).map(b => (
                    <Link key={b.id} to={`/blog/${b.slug}`} className="flex gap-3 group hover:opacity-80 transition-opacity">
                      <img src={b.image} alt={b.title} className="w-16 h-16 rounded-lg object-cover shrink-0" />
                      <div>
                        <p className="text-white text-xs font-medium leading-snug mb-1 group-hover:text-gold transition-colors line-clamp-2">{b.title}</p>
                        <span className="text-gray-500 text-xs flex items-center gap-1">
                          <FiClock size={10} className="text-gold" />{b.readTime || '5 min read'}
                        </span>
                      </div>
                    </Link>
                  ))}
                  {related.length === 0 && otherBlogs.length === 0 && (
                    <p className="text-gray-500 text-sm">No related articles yet.</p>
                  )}
                </div>
              </div>

              {/* Categories */}
              <div className="glass-card p-6 rounded-2xl">
                <h3 className="font-heading text-lg font-bold text-white mb-5 pb-3 border-b border-white/5">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {[...new Set(allBlogs.map(b => b.category).filter(Boolean))].map(cat => (
                    <Link key={cat} to="/blog"
                      className="px-3 py-1.5 text-xs border border-white/10 text-gray-400 rounded-lg hover:border-gold/40 hover:text-gold transition-all">
                      {cat}
                    </Link>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="glass-card-gold p-6 rounded-2xl text-center">
                <h4 className="font-heading text-white font-bold text-lg mb-2">Start Your Project</h4>
                <p className="text-gray-400 text-sm mb-4">Get a free consultation from our experts today.</p>
                <Link to="/contact" className="btn-gold w-full justify-center text-xs">Contact Us</Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
