/**
 * 文章列表页组件
 * 风格：极简、高留白、现代排版
 */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronLeft } from 'lucide-react';

const Navbar = ({ isScrolled, isMobileMenuOpen, setIsMobileMenuOpen }) => (
  <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
    isScrolled ? 'bg-white/80 backdrop-blur-md border-b border-gray-100 py-4' : 'bg-transparent py-6'
  }`}>
    <div className="max-w-5xl mx-auto px-6 flex justify-between items-center">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-xl font-bold tracking-tighter"
      >
        <a href="/">DESIGNER<span className="text-gray-400">.BLOG</span></a>
      </motion.div>

      <div className="hidden md:flex space-x-8 text-sm font-medium">
        {[
          { name: '首页', href: '/' },
          { name: '文章', href: '/blog', active: true },
          { name: '关于', href: '/about' },
        ].map((item, index) => (
          <motion.a
            key={item.name}
            href={item.href}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`hover:text-gray-500 transition-colors ${item.active ? 'text-black' : 'text-gray-400'}`}
          >
            {item.name}
          </motion.a>
        ))}
      </div>

      <div className="md:hidden">
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </div>
  </nav>
);

const MobileMenu = ({ isOpen }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        className="fixed top-16 left-0 w-full bg-white z-40 border-b border-gray-100 md:hidden overflow-hidden"
      >
        <div className="flex flex-col p-6 space-y-4">
          {[
            { name: '首页', href: '/' },
            { name: '文章', href: '/blog' },
            { name: '关于', href: '/about' },
          ].map((item) => (
            <a key={item.name} href={item.href} className="text-lg font-medium">{item.name}</a>
          ))}
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

const TagFilter = ({ tags, activeTag, onTagChange }) => (
  <div className="flex flex-wrap gap-3 mb-12">
    {tags.map((tag) => (
      <button
        key={tag}
        onClick={() => onTagChange(tag)}
        className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
          activeTag === tag
            ? 'bg-black text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        {tag}
      </button>
    ))}
  </div>
);

const PostCard = ({ post, index }) => (
  <motion.article
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.05 }}
    className="group"
  >
    <a href={`/blog/${post.slug}`} className="block">
      <div className="flex flex-col md:flex-row md:items-baseline justify-between border-b border-gray-100 pb-8 hover:border-gray-300 transition-colors">
        <div className="md:max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold uppercase tracking-widest px-2 py-1 bg-gray-100 rounded">{post.tag}</span>
            <span className="text-xs text-gray-400 font-medium">{post.date}</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-gray-600 transition-colors">
            {post.title}
          </h2>
          <p className="text-gray-500 leading-relaxed">
            {post.excerpt}
          </p>
        </div>
        <div className="mt-4 md:mt-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <ChevronLeft size={24} className="text-gray-300 rotate-180" />
        </div>
      </div>
    </a>
  </motion.article>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="max-w-5xl mx-auto px-6 py-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
      <p>© {currentYear} 陈志贤. Built with Astro & Tailwind.</p>
      <div className="flex space-x-6 mt-4 md:mt-0">
        <a href="#" className="hover:text-black transition-colors">RSS Feed</a>
        <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
      </div>
    </footer>
  );
};

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tag: string;
}

interface Props {
  posts: Post[];
  tags: string[];
}

export default function BlogList({ posts, tags }: Props) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTag, setActiveTag] = useState('全部');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredPosts = activeTag === '全部'
    ? posts
    : posts.filter(post => post.tag === activeTag);

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#1a1a1a] font-sans selection:bg-black selection:text-white">
      <Navbar
        isScrolled={isScrolled}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      <MobileMenu isOpen={isMobileMenuOpen} />

      <main className="max-w-5xl mx-auto px-6 pt-32 pb-20">
        {/* 页面标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">全部文章</h1>
          <p className="text-gray-500 text-lg">记录技术探索、设计心得和生活感悟</p>
        </motion.div>

        {/* 标签筛选 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <TagFilter
            tags={tags}
            activeTag={activeTag}
            onTagChange={setActiveTag}
          />
        </motion.div>

        {/* 文章列表 */}
        <div className="space-y-2">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post, index) => (
              <PostCard key={post.slug} post={post} index={index} />
            ))}
          </AnimatePresence>
        </div>

        {/* 空状态 */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <p>暂无文章</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
