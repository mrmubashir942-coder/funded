import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BookOpen, Clock, Tag, ArrowRight, X, User, Share2 } from 'lucide-react';
import { BlogPost } from '../../types';

export const BlogPage: React.FC = () => {
  const { blogPosts } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);

  const categories = ['All', 'Risk Architecture', 'Market Infrastructure', 'Trading Psychology', 'Scaling Plans'];

  const filteredPosts = blogPosts.filter((p) =>
    selectedCategory === 'All' ? true : p.category === selectedCategory
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="text-xs font-bold tracking-wider text-[#D4AF37] uppercase">
          Ryvexia Research & Insights
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Prop Trading Insights & Risk Guides
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Master mathematical edge, market mechanics, and high-stakes psychological discipline from our quantitative risk desk.
        </p>

        {/* Filter Pills */}
        <div className="pt-4 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#1F293D] text-[#D4AF37] border border-[#D4AF37]/30'
                  : 'bg-[#131A2A] text-slate-400 border border-[#1F293D] hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredPosts.map((post) => (
          <article
            key={post.id}
            className="bg-[#131A2A] border border-[#1F293D] hover:border-slate-600 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl transition-all flex flex-col justify-between group cursor-pointer"
            onClick={() => setActiveArticle(post)}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#D4AF37] font-semibold">{post.category}</span>
                <span className="text-slate-500">{post.readTime}</span>
              </div>

              <h2 className="text-xl font-bold text-white group-hover:text-[#D4AF37] transition-colors leading-snug">
                {post.title}
              </h2>

              <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-[#1F293D] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-slate-400 font-mono">
                <span className="font-semibold text-white">{post.author}</span>
                <span>·</span>
                <span>{post.publishedAt}</span>
              </div>

              <span className="text-[#D4AF37] font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Read Article
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* Article Detail Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-[#131A2A] border border-[#1F293D] rounded-2xl w-full max-w-3xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
            <div className="px-6 py-4 bg-[#172033] border-b border-[#1F293D] flex items-center justify-between">
              <span className="text-xs font-mono text-[#D4AF37] font-bold uppercase tracking-wider">
                {activeArticle.category}
              </span>
              <button
                onClick={() => setActiveArticle(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-[#1F293D] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              <div className="space-y-3">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                  {activeArticle.title}
                </h1>
                <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                  <span className="text-white font-semibold">{activeArticle.author}</span>
                  <span>({activeArticle.authorRole})</span>
                  <span>·</span>
                  <span>{activeArticle.publishedAt}</span>
                  <span>·</span>
                  <span>{activeArticle.readTime}</span>
                </div>
              </div>

              <div className="prose prose-invert max-w-none text-slate-200 text-sm leading-relaxed whitespace-pre-line space-y-4">
                {activeArticle.content}
              </div>

              <div className="pt-6 border-t border-[#1F293D] flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  {activeArticle.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 bg-[#0B0F1A] border border-[#1F293D] rounded-lg text-[11px] font-mono text-slate-400"
                    >
                      #{t}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setActiveArticle(null)}
                  className="px-5 py-2 bg-[#D4AF37] hover:bg-[#E5C158] text-[#0B0F1A] font-bold rounded-lg text-xs transition-colors"
                >
                  Back to Articles
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
