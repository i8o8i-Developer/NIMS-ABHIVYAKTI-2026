import React, { useState, useEffect } from "react";
import { Api } from "@/Lib/Api";
import {
  Image as ImageIcon,
  Plus,
  Trash2,
  Edit,
  Search,
  Filter,
  Sparkles,
  X,
  Star,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Eye,
  Calendar,
  Layers,
} from "lucide-react";

const CATEGORIES = [
  { value: "ALL", label: "All Categories" },
  { value: "DANCE", label: "Classical & Western Dance" },
  { value: "MUSIC", label: "Battle Of The Bands & Vocals" },
  { value: "THEATRE", label: "Theatre & Street Play (Nukkad Natak)" },
  { value: "FASHION", label: "Fashion & Runway Couture" },
  { value: "STAR_NIGHT", label: "Celebrity Star Night & Concerts" },
  { value: "AWARDS", label: "Grand Trophies & Valedictory" },
  { value: "CROWD", label: "Festival Grounds & Atmosphere" },
  { value: "GENERAL", label: "Campus Highlights" },
];

export const AdminGallery: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Modals
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activeItemId, setActiveItemId] = useState<number | null>(null);
  const [deleteConfirmItem, setDeleteConfirmItem] = useState<any | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Form Fields
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("DANCE");
  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [eventYear, setEventYear] = useState("2026");
  const [isFeatured, setIsFeatured] = useState(false);
  const [displayOrder, setDisplayOrder] = useState(0);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const res = await Api.get("/gallery/");
      const data = res.data.results || res.data || [];
      setItems(data);
    } catch {
      showFeedbackMessage("error", "Failed To Load Festival Gallery Media.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const showFeedbackMessage = (type: "success" | "error", message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 4000);
  };

  const openCreateModal = () => {
    setIsEditing(false);
    setActiveItemId(null);
    setTitle("");
    setCategory("DANCE");
    setImageUrl("");
    setCaption("");
    setEventYear("2026");
    setIsFeatured(false);
    setDisplayOrder(items.length);
    setShowModal(true);
  };

  const openEditModal = (item: any) => {
    setIsEditing(true);
    setActiveItemId(item.id);
    setTitle(item.title || "");
    setCategory(item.category || "DANCE");
    setImageUrl(item.image_url || item.final_image_url || "");
    setCaption(item.caption || "");
    setEventYear(item.event_year || "2026");
    setIsFeatured(item.is_featured ?? false);
    setDisplayOrder(item.display_order ?? 0);
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !imageUrl.trim()) {
      showFeedbackMessage("error", "Photo Title and Image URL are required.");
      return;
    }

    const payload = {
      title: title.trim(),
      category,
      image_url: imageUrl.trim(),
      caption: caption.trim(),
      event_year: eventYear.trim(),
      is_featured: isFeatured,
      display_order: Number(displayOrder),
    };

    try {
      if (isEditing && activeItemId) {
        await Api.patch(`/gallery/${activeItemId}/`, payload);
        showFeedbackMessage("success", "Media Details Updated Successfully!");
      } else {
        await Api.post("/gallery/", payload);
        showFeedbackMessage("success", "Media Photo Added To Festival Gallery!");
      }
      setShowModal(false);
      fetchGallery();
    } catch (err: any) {
      showFeedbackMessage("error", "Failed To Save Media Item.");
    }
  };

  const handleToggleFeatured = async (item: any) => {
    try {
      const updatedStatus = !item.is_featured;
      await Api.patch(`/gallery/${item.id}/`, { is_featured: updatedStatus });
      setItems((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, is_featured: updatedStatus } : i))
      );
      showFeedbackMessage(
        "success",
        updatedStatus ? "Marked as Featured Highlight!" : "Removed from Featured Highlights."
      );
    } catch {
      showFeedbackMessage("error", "Failed to update featured flag.");
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirmItem) return;
    try {
      await Api.delete(`/gallery/${deleteConfirmItem.id}/`);
      showFeedbackMessage("success", "Media Photo Removed From Gallery!");
      setDeleteConfirmItem(null);
      fetchGallery();
    } catch {
      showFeedbackMessage("error", "Failed To Delete Media Item.");
    }
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      (item.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.caption || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "ALL" || item.category === selectedCategory;
    const matchesFeatured = !featuredOnly || item.is_featured;
    return matchesSearch && matchesCategory && matchesFeatured;
  });

  const totalItems = items.length;
  const featuredCount = items.filter((i) => i.is_featured).length;
  const starNightCount = items.filter((i) => i.category === "STAR_NIGHT").length;

  return (
    <div className="space-y-6 animate-fade-in text-amber-50">
      {/* Toast Feedback */}
      {feedback && (
        <div
          className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl backdrop-blur-xl border shadow-2xl transition-all animate-bounce ${
            feedback.type === "success"
              ? "bg-emerald-950/90 border-emerald-500/60 text-emerald-200 shadow-emerald-900/50"
              : "bg-rose-950/90 border-rose-500/60 text-rose-200 shadow-rose-900/50"
          }`}
        >
          {feedback.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
          )}
          <span className="text-xs sm:text-sm font-semibold">{feedback.message}</span>
          <button onClick={() => setFeedback(null)} className="ml-2 text-white/60 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header Banner */}
      <div className="p-5 sm:p-7 rounded-3xl bg-gradient-to-r from-[#17030c] via-[#0d0106] to-[#17030c] border border-amber-500/35 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 mb-1.5">
            <ImageIcon className="w-4 h-4" />
            <span className="text-[11px] font-black uppercase tracking-widest text-amber-400">
              Media Archive & Highlights
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-black text-white tracking-wide">
            Festival Gallery Deck
          </h1>
          <p className="text-xs sm:text-sm text-rose-200/80 mt-1 max-w-2xl">
            Curate High-Resolution Photography, Star Night Moments, Stage Memories, And Carousel Features.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 hover:from-amber-400 hover:to-yellow-300 text-black font-serif font-black text-xs sm:text-sm tracking-wide shadow-xl shadow-amber-500/25 transition-all flex items-center justify-center gap-2 shrink-0 active:scale-95"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Upload Media Item</span>
        </button>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl bg-[#120208]/90 border border-amber-500/25 backdrop-blur-xl shadow-lg">
          <p className="text-[11px] font-bold uppercase tracking-wider text-rose-300/80">
            Total Photos
          </p>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-2xl font-serif font-black text-white">{totalItems}</span>
            <span className="text-xs font-mono font-bold text-amber-400">Archived</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#120208]/90 border border-amber-500/25 backdrop-blur-xl shadow-lg">
          <p className="text-[11px] font-bold uppercase tracking-wider text-rose-300/80">
            Featured Highlights
          </p>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-2xl font-serif font-black text-yellow-300">
              {featuredCount}
            </span>
            <span className="text-xs font-mono font-bold text-yellow-400">⭐ Carousel</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#120208]/90 border border-amber-500/25 backdrop-blur-xl shadow-lg">
          <p className="text-[11px] font-bold uppercase tracking-wider text-rose-300/80">
            Star Night & Concerts
          </p>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-2xl font-serif font-black text-purple-300">
              {starNightCount}
            </span>
            <span className="text-xs text-purple-400">🎤 Celeb</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#120208]/90 border border-amber-500/25 backdrop-blur-xl shadow-lg">
          <p className="text-[11px] font-bold uppercase tracking-wider text-rose-300/80">
            Edition Year
          </p>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-2xl font-serif font-black text-white">2026</span>
            <span className="text-xs text-rose-400">Championship</span>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="p-4 rounded-2xl bg-[#120208]/90 border border-amber-500/25 backdrop-blur-xl shadow-lg flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-amber-400/80 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search photos by title or caption..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#140209] border border-amber-500/30 text-xs text-white placeholder-rose-300/40 focus:border-amber-400 focus:outline-none transition-colors shadow-inner"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#140209] border border-amber-500/30 text-xs text-amber-200 focus:border-amber-400 focus:outline-none transition-colors"
          >
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>

          <button
            onClick={() => setFeaturedOnly(!featuredOnly)}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
              featuredOnly
                ? "bg-amber-500/25 border-amber-400 text-amber-300 shadow-sm"
                : "bg-white/5 border-white/10 text-rose-200/80 hover:bg-white/10"
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${featuredOnly ? "fill-amber-400 text-amber-400" : ""}`} />
            <span>Featured Only</span>
          </button>

          {(searchTerm || selectedCategory !== "ALL" || featuredOnly) && (
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("ALL");
                setFeaturedOnly(false);
              }}
              className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-rose-300 text-xs font-semibold transition-colors flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Gallery Cards Grid (Responsive down to 280px) */}
      {loading ? (
        <div className="p-12 text-center">
          <div className="w-10 h-10 border-4 border-amber-500/30 border-t-amber-400 rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs text-rose-200/80 font-serif">Loading Festival Photos...</p>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="p-12 rounded-2xl bg-[#120208] border border-amber-500/20 text-center">
          <ImageIcon className="w-10 h-10 text-amber-500/40 mx-auto mb-3" />
          <p className="text-sm font-serif font-bold text-white">No Gallery Media Found</p>
          <p className="text-xs text-rose-300/70 mt-1">
            {searchTerm || selectedCategory !== "ALL" || featuredOnly
              ? "Try resetting your search or category filter."
              : "Click 'Upload Media Item' to add festival photography."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group rounded-2xl sm:rounded-3xl bg-[#120208]/90 border border-amber-500/25 hover:border-amber-400/50 shadow-xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                {/* Photo Image Banner */}
                <div className="relative aspect-video w-full bg-[#0d0106] overflow-hidden">
                  <img
                    src={item.final_image_url || item.image_url || "/Assets/IMG-20261006-WA0125.png"}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/Assets/IMG-20261006-WA0125.png";
                    }}
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#120208] via-transparent to-black/40" />

                  {/* Top Badges */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-2">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/70 backdrop-blur-md text-amber-300 border border-amber-500/30">
                      {item.category_display || item.category}
                    </span>

                    <button
                      onClick={() => handleToggleFeatured(item)}
                      className={`p-1.5 rounded-full backdrop-blur-md transition-colors ${
                        item.is_featured
                          ? "bg-amber-500 text-black shadow-md shadow-amber-500/50"
                          : "bg-black/60 text-white/70 hover:text-amber-400 border border-white/20"
                      }`}
                      title={item.is_featured ? "Featured on Landing Page" : "Click to Feature"}
                    >
                      <Star className={`w-3.5 h-3.5 ${item.is_featured ? "fill-black" : ""}`} />
                    </button>
                  </div>

                  {/* Zoom Lightbox Button */}
                  <button
                    onClick={() =>
                      setPreviewImage(
                        item.final_image_url || item.image_url || "/Assets/IMG-20261006-WA0125.png"
                      )
                    }
                    className="absolute bottom-2.5 right-2.5 p-2 rounded-xl bg-black/70 backdrop-blur-md text-white hover:text-amber-400 border border-white/20 transition-all opacity-0 group-hover:opacity-100"
                    title="View Full Resolution"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-serif font-black text-white text-base truncate">
                      {item.title}
                    </h3>
                    <span className="text-[10px] font-mono font-bold text-amber-400 shrink-0">
                      {item.event_year}
                    </span>
                  </div>

                  {item.caption && (
                    <p className="text-xs text-rose-200/80 line-clamp-2 leading-relaxed">
                      {item.caption}
                    </p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 sm:p-5 pt-0 flex items-center justify-between gap-2 border-t border-amber-500/10 mt-2">
                <div className="text-[10px] font-mono text-rose-300/50">
                  Order: #{item.display_order}
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => openEditModal(item)}
                    className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/20 transition-colors flex items-center gap-1"
                  >
                    <Edit className="w-3 h-3" />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => setDeleteConfirmItem(item)}
                    className="p-1.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 text-rose-400 border border-rose-800/40 transition-colors"
                    title="Delete Media"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Preview Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fade-in"
          onClick={() => setPreviewImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl border-2 border-amber-500/50 shadow-2xl">
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-3 right-3 p-2 rounded-full bg-black/70 text-white hover:text-amber-400 border border-white/20 transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <img src={previewImage} alt="Preview" className="max-w-full max-h-[85vh] object-contain" />
          </div>
        </div>
      )}

      {/* Add / Edit Media Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-lg rounded-2xl sm:rounded-3xl bg-[#140209] border-2 border-amber-500/40 p-5 sm:p-7 shadow-2xl relative max-h-[90vh] overflow-y-auto custom-scrollbar">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-rose-300 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2.5 text-amber-400 mb-1">
              <ImageIcon className="w-5 h-5" />
              <span className="text-xs font-black uppercase tracking-widest">
                {isEditing ? "Modify Media" : "New Photo Upload"}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-serif font-black text-white">
              {isEditing ? "Edit Gallery Media" : "Add Festival Photograph"}
            </h2>
            <p className="text-xs text-rose-200/80 mt-1 mb-5">
              Specify media details, CDN image link, category tag, and carousel visibility.
            </p>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-amber-300/90 mb-1">
                  Photo Title / Headline *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Battle of the Bands Finals Live"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0105] border border-amber-500/30 focus:border-amber-400 text-xs text-white focus:outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-amber-300/90 mb-1">
                    Arena Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0105] border border-amber-500/30 focus:border-amber-400 text-xs text-white focus:outline-none transition-colors"
                  >
                    {CATEGORIES.filter((c) => c.value !== "ALL").map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-amber-300/90 mb-1">
                    Festival Edition Year
                  </label>
                  <input
                    type="text"
                    value={eventYear}
                    onChange={(e) => setEventYear(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0105] border border-amber-500/30 focus:border-amber-400 text-xs text-white focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-amber-300/90 mb-1">
                  Image URL / Asset Path *
                </label>
                <input
                  type="text"
                  required
                  placeholder="https://... or /Assets/IMG-20261006-WA0125.png"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0105] border border-amber-500/30 focus:border-amber-400 text-xs font-mono text-white focus:outline-none transition-colors"
                />

                {imageUrl && (
                  <div className="mt-2 rounded-xl overflow-hidden border border-amber-500/20 aspect-video max-h-36 bg-[#0a0105]">
                    <img
                      src={imageUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/Assets/IMG-20261006-WA0125.png";
                      }}
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-amber-300/90 mb-1">
                  Photo Caption / Description
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Electric guitar solos under stadium lights at Rajeshwari Grounds."
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0105] border border-amber-500/30 focus:border-amber-400 text-xs text-white focus:outline-none transition-colors resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center pt-1">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-amber-300/90 mb-1">
                    Display Sequence Order
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={displayOrder}
                    onChange={(e) => setDisplayOrder(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0105] border border-amber-500/30 focus:border-amber-400 text-xs font-mono text-white focus:outline-none transition-colors"
                  />
                </div>

                <label className="flex items-center gap-2 cursor-pointer pt-4">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="w-4 h-4 rounded border-amber-500/40 text-amber-500 focus:ring-0 bg-[#0a0105]"
                  />
                  <span className="text-xs font-bold text-white">
                    Feature On Public Landing Page Carousel
                  </span>
                </label>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-rose-200 text-xs font-bold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 hover:from-amber-400 hover:to-yellow-300 text-black font-serif font-black text-xs sm:text-sm tracking-wide shadow-lg shadow-amber-500/25 transition-all"
                >
                  {isEditing ? "Save Modifications" : "Add Photograph"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-md rounded-2xl sm:rounded-3xl bg-[#160209] border-2 border-rose-500/50 p-6 shadow-2xl relative text-center">
            <div className="w-12 h-12 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center mx-auto mb-3">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-serif font-black text-white">
              Delete Gallery Photo?
            </h3>
            <p className="text-xs text-rose-200/80 mt-2">
              Are you sure you want to permanently delete{" "}
              <strong className="text-white">"{deleteConfirmItem.title}"</strong> from the public gallery?
            </p>

            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                onClick={() => setDeleteConfirmItem(null)}
                className="px-4 py-2 rounded-xl bg-white/10 text-white text-xs font-bold hover:bg-white/15 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-colors shadow-lg shadow-rose-900/50"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminGallery;
