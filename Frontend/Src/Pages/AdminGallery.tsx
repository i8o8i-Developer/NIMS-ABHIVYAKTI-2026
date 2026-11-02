import React, { useState, useEffect } from "react";
import { Api } from "@/Lib/Api";
import {
  Image as ImageIcon,
  Plus,
  Trash2,
  Sparkles,
  X,
  ExternalLink,
} from "lucide-react";

export const AdminGallery: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Ceremonies");
  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [year, setYear] = useState(2026);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const res = await Api.get("/gallery/");
      setItems(res.data.results || res.data || []);
    } catch {
      // Fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await Api.post("/gallery/", {
        title,
        category,
        image_url: imageUrl,
        caption,
        event_year: year,
      });
      setShowModal(false);
      fetchGallery();
    } catch {
      alert("Failed To Publish Photo.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete This Photo From Public Gallery?")) return;
    try {
      await Api.delete(`/gallery/${id}/`);
      fetchGallery();
    } catch {
      alert("Failed To Delete.");
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#29050e] via-[#1b0308] to-[#29050e] border border-amber-500/40 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 mb-2">
            <ImageIcon className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Media Archive Deck</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-black text-white">
            Festival Gallery Management
          </h1>
          <p className="text-xs sm:text-sm text-rose-200/80 mt-1">
            Curate Official High-Resolution Photography, Banners, And Stage Memory Snaps.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold transition-all shadow-md shadow-amber-500/20 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Photo To Gallery</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-2xl bg-[#160207] border border-rose-950/80 shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="h-44 w-full bg-[#100204] rounded-xl overflow-hidden mb-3 flex items-center justify-center p-2 border border-rose-950">
                <img src={item.image_url} alt={item.title} className="max-h-full max-w-full object-contain" />
              </div>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  {item.category}
                </span>
                <span className="text-[10px] text-rose-300/70">{item.event_year}</span>
              </div>
              <h3 className="text-sm font-bold text-white truncate">{item.title}</h3>
              <p className="text-xs text-rose-300/70 line-clamp-2 mt-1">{item.caption}</p>
            </div>

            <div className="mt-4 pt-3 border-t border-rose-950/60 flex items-center justify-end">
              <button
                onClick={() => handleDelete(item.id)}
                className="p-1.5 rounded-lg text-rose-400 hover:text-white hover:bg-rose-900/50"
                title="Delete Photo"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md rounded-3xl bg-[#1b0307] border border-amber-500/40 p-6 shadow-2xl relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-rose-950/60 text-rose-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-serif font-black text-white mb-4">Upload Gallery Item</h2>

            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-amber-300/90 mb-1">
                  Photo Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Dance Round 1 Opening Act..."
                  className="w-full px-3.5 py-2 rounded-xl bg-[#140206] border border-rose-950 text-xs text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-amber-300/90 mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#140206] border border-rose-950 text-xs text-white focus:border-amber-500 focus:outline-none"
                >
                  <option value="Ceremonies">Ceremonies</option>
                  <option value="Competitions">Competitions</option>
                  <option value="Stage Highlights">Stage Highlights</option>
                  <option value="Winners">Winners</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-amber-300/90 mb-1">
                  Image URL / Asset Path
                </label>
                <input
                  type="text"
                  required
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="/Abhivyakti.png or https://..."
                  className="w-full px-3.5 py-2 rounded-xl bg-[#140206] border border-rose-950 text-xs text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-amber-300/90 mb-1">
                  Caption / Description
                </label>
                <textarea
                  rows={2}
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#140206] border border-rose-950 text-xs text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider transition-colors mt-2"
              >
                Publish To Media Gallery
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default AdminGallery;

