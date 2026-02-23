/**
 * 关于页面组件
 */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Twitter, Mail, MapPin, Calendar } from 'lucide-react';

const Navbar = ({ isScrolled, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const navItems = [
    { name: '首页', href: '/' },
    { name: '文章', href: '/blog' },
    { name: '关于', href: '/about', active: true },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/80 backdrop-blur-md border-b border-gray-100 py-4' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-3xl mx-auto px-6 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-bold tracking-tighter"
        >
          <a href="/">DESIGNER<span className="text-gray-400">.BLOG</span></a>
        </motion.div>

        <div className="hidden md:flex space-x-8 text-sm font-medium">
          {navItems.map((item, index) => (
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
};

const MobileMenu = ({ isOpen }) => {
  const navItems = [
    { name: '首页', href: '/' },
    { name: '文章', href: '/blog' },
    { name: '关于', href: '/about' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="fixed top-16 left-0 w-full bg-white z-40 border-b border-gray-100 md:hidden overflow-hidden"
        >
          <div className="flex flex-col p-6 space-y-4">
            {navItems.map((item) => (
              <a key={item.name} href={item.href} className="text-lg font-medium">{item.name}</a>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="max-w-3xl mx-auto px-6 py-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
      <p>© {currentYear} 陈志贤. Built with Astro & Tailwind.</p>
      <div className="flex space-x-6 mt-4 md:mt-0">
        <a href="/blog" className="hover:text-black transition-colors">← 返回文章列表</a>
      </div>
    </footer>
  );
};

export default function About() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#1a1a1a] font-sans selection:bg-black selection:text-white">
      <Navbar
        isScrolled={isScrolled}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      <MobileMenu isOpen={isMobileMenuOpen} />

      <main className="max-w-3xl mx-auto px-6 pt-32 pb-20">
        {/* 头像和基本信息 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-16"
        >
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-xl flex-shrink-0">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
              alt="头像"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">陈志贤</h1>
            <p className="text-gray-500 text-lg mb-6">全栈开发者 / 设计师</p>

            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>中国 · 北京</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>从事开发 5+ 年</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 个人简介 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="prose prose-lg prose-gray max-w-none mb-16
            prose-p:text-gray-600 prose-p:leading-relaxed
            prose-headings:font-bold prose-headings:tracking-tight"
        >
          <h2>关于我</h2>
          <p>
            你好！我是陈志贤，一名热爱技术和设计的开发者。我热衷于构建高性能、易用且美观的数字产品。
          </p>
          <p>
            我的专业领域包括前端开发（React、TypeScript、Astro）、UI/UX 设计，以及全栈开发。
            我相信优秀的产品是技术、设计和用户体验的完美结合。
          </p>
          <p>
            在工作之余，我喜欢研究新技术、阅读技术书籍，也会写一些技术博客来记录学习心得。
            如果你也有相似的兴趣，欢迎一起交流！
          </p>
        </motion.div>

        {/* 技能标签 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h3 className="text-lg font-bold mb-4">技能栈</h3>
          <div className="flex flex-wrap gap-3">
            {['React', 'TypeScript', 'Astro', 'Next.js', 'Tailwind CSS', 'Node.js', 'Figma', 'UI/UX'].map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 bg-gray-100 text-gray-600 text-sm font-medium rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>

        {/* 联系方式 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-lg font-bold mb-4">联系方式</h3>
          <div className="flex gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            >
              <Github size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            >
              <Twitter size={20} />
            </a>
            <a
              href="mailto:hello@example.com"
              className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            >
              <Mail size={20} />
            </a>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
