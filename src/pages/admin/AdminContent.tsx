import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BookOpen, Plus, Trash2, Edit3, CheckCircle2 } from 'lucide-react';
import { BlogPost } from '../../types';

export const AdminContent: React.FC = () => {
  const { blogPosts, addBlogPost, deleteBlogPost } = useApp();

  const [isAddPostOpen, setIsAddPostOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('Elena Vance');
  const [authorRole, setAuthorRole] = useState('Chief Risk Officer');
  const [category, setCategory] = useState('Risk Architecture');
  const [readTime, setReadTime] = useState('5 min read');
  const [tagsStr, setTagsStr] = useState('Risk Management, Drawdown, Rules');

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    addBlogPost({
      title,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      excerpt,
      content,
      author,
      authorRole,
      category,
      readTime,
      tags: tagsStr.split(',').map((t) => t.trim())
    });

    setIsAddPostOpen(false);
    setTitle('');
    setExcerpt('');
    setContent('');
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Content & Research Blog Desk</h1>
          <p className="text-xs text-slate-400 mt-1">
            Publish educational articles, risk breakdowns, and manage firm public research.
          </p>
        </div>

        <button
          onClick={() => setIsAddPostOpen(true)}
          className="px-4 py-2 bg-[#D4AF37] hover:bg-[#E5C158] text-[#0B0F1A] rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>New Research Article</span>
        </button>
      </div>

      <div className="bg-[#131A2A] border border-[#1F293D] rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#1F293D] text-slate-400 bg-[#172033]">
                <th className="py-3.5 px-5 font-semibold">Article Title</th>
                <th className="py-3.5 px-5 font-semibold">Category</th>
                <th className="py-3.5 px-5 font-semibold">Author</th>
                <th className="py-3.5 px-5 font-semibold">Published Date</th>
                <th className="py-3.5 px-5 font-semibold">Read Time</th>
                <th className="py-3.5 px-5 font-semibold text-right">Delete</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1F293D] text-slate-200">
              {blogPosts.map((post) => (
                <tr key={post.id} className="hover:bg-[#1A2234] transition-colors">
                  <td className="py-4 px-5">
                    <div className="font-bold text-white max-w-md truncate">{post.title}</div>
                    <div className="text-[11px] text-slate-400 max-w-sm truncate">{post.excerpt}</div>
                  </td>
                  <td className="py-4 px-5 font-mono text-[#D4AF37]">{post.category}</td>
                  <td className="py-4 px-5 font-mono text-white">{post.author}</td>
                  <td className="py-4 px-5 font-mono text-slate-400">{post.publishedAt}</td>
                  <td className="py-4 px-5 font-mono text-slate-400">{post.readTime}</td>
                  <td className="py-4 px-5 text-right">
                    <button
                      onClick={() => deleteBlogPost(post.id)}
                      className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 rounded-lg transition-colors"
                      title="Delete Article"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal to create post */}
      {isAddPostOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="bg-[#131A2A] border border-[#1F293D] rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
            <div className="p-6 overflow-y-auto space-y-4">
              <h2 className="text-base font-bold text-white">Publish New Research Article</h2>

              <form onSubmit={handleCreatePost} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Title</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-[#0B0F1A] border border-[#1F293D] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-[#0B0F1A] border border-[#1F293D] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="Risk Architecture">Risk Architecture</option>
                      <option value="Market Infrastructure">Market Infrastructure</option>
                      <option value="Trading Psychology">Trading Psychology</option>
                      <option value="Scaling Plans">Scaling Plans</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Author</label>
                    <input
                      type="text"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      className="w-full bg-[#0B0F1A] border border-[#1F293D] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Short Excerpt</label>
                  <input
                    type="text"
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    className="w-full bg-[#0B0F1A] border border-[#1F293D] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Content Body (Markdown supported)</label>
                  <textarea
                    rows={6}
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full bg-[#0B0F1A] border border-[#1F293D] rounded-xl px-3.5 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAddPostOpen(false)}
                    className="px-4 py-2 bg-[#1F293D] text-slate-300 rounded-xl text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#D4AF37] hover:bg-[#E5C158] text-[#0B0F1A] rounded-xl text-xs font-bold transition-colors"
                  >
                    Publish to Site
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
