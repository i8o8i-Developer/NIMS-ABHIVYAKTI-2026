import React, { useState, useEffect } from "react";
import { FestiveTicker } from "@/Components/Ui/FestiveTicker";
import { Navbar } from "@/Components/Ui/Navbar";
import { Footer } from "@/Components/Ui/Footer";
import { FloatingBackgroundElements } from "@/Components/Ui/FloatingBackgroundElements";
import { Api } from "@/Lib/Api";
import {
  Image as ImageIcon,
  Sparkles,
  Camera,
  X,
  Maximize2,
  Calendar,
  Share2,
} from "lucide-react";

interface GalleryImage {
  id: number;
  title: string;
  category: string;
  image_url: string;
  caption: string;
  event_year: number;
}

const FALLBACK_GALLERY: GalleryImage[] = [
  {
    id: 1,
    title: "Official Abhivyakti 2026 Grand Crest",
    category: "Ceremonies",
    image_url: "/Abhivyakti.png",
    caption: "The Official Emblazon Of NIMS Abhivyakti Cultural Championship.",
    event_year: 2026,
  },
  {
    id: 2,
    title: "NIMS University 26 Glorious Years",
    category: "Ceremonies",
    image_url: "/Nims26Years.png",
    caption: "Celebrating Over A Quarter Century Of Educational And Cultural Leadership.",
    event_year: 2026,
  },
  {
    id: 3,
    title: "Student Council Directorate Assembly",
    category: "Ceremonies",
    image_url: "/STUDENT-COUNCIL-LOGO.png",
    caption: "Student Council Organizers Steering The Cultural Festival.",
    event_year: 2026,
  },
  {
    id: 4,
    title: "Rajeshwari Auditorium Stage Inauguration",
    category: "Competitions",
    image_url: "/IMG-20261006-WA0125.png",
    caption: "Grand Stage Lighting And Sound Check For The Dance Elimination Rounds.",
    event_year: 2026,
  },
  {
    id: 5,
    title: "National Accreditations & NAAC A+ Honor",
    category: "Ceremonies",
    image_url: "/NimsAccreditations.png",
    caption: "Academic And Institutional Excellence Recognized Nationally.",
    event_year: 2026,
  },
];

export const GalleryPage: React.FC = () => {
  const [items, setItems] = useState<GalleryImage[]>(FALLBACK_GALLERY);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeImage, setActiveImage] = useState<GalleryImage | null>(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await Api.get("/gallery/");
        if (res.data?.results && res.data.results.length > 0) {
          setItems(res.data.results);
        }
      } catch {
        // Fallback
      }
    };
    fetchGallery();
  }, []);

  const categories = ["All", "Ceremonies", "Competitions", "Stage Highlights", "Winners"];

  const filteredItems = items.filter(
    (item) => selectedCategory === "All" || item.category.toLowerCase() === selectedCategory.toLowerCase()
  );

  return (
    <div className="min-h-screen bg-[#070104] text-amber-50 relative selection:bg-amber-500 selection:text-black antialiased overflow-x-hidden">
      <FloatingBackgroundElements />
      <FestiveTicker />
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest mb-3">
            <Camera className="w-3.5 h-3.5" />
            <span>Festival Media Archive</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-black text-white">
            Visual Highlights & Memories
          </h1>
          <p className="text-xs sm:text-sm text-rose-200/80 mt-2 leading-relaxed">
            Relive The Electric Energy, Majestic Stage Spectacles, And Victorious Moments Captured By The NIMS Media Council.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto pb-2 custom-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? "bg-amber-500 text-black shadow-md shadow-amber-500/20"
                  : "bg-[#0d0104] text-rose-200/70 hover:text-white border border-rose-950"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((img) => (
            <div
              key={img.id}
              onClick={() => setActiveImage(img)}
              className="group relative rounded-2xl overflow-hidden bg-[#0d0104] border border-rose-950 hover:border-amber-500/40 transition-all cursor-pointer shadow-xl flex flex-col"
            >
              <div className="h-56 w-full bg-[#070102] flex items-center justify-center p-4 relative overflow-hidden">
                <img
                  src={img.image_url}
                  alt={img.title}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#120205] via-transparent to-transparent opacity-60" />
                <span className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/60 text-amber-300 border border-amber-500/30">
                  {img.category}
                </span>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                    {img.title}
                  </h3>
                  <p className="text-xs text-rose-300/70 mt-1 line-clamp-2">{img.caption}</p>
                </div>
                <div className="mt-3 pt-2 border-t border-rose-950/60 flex items-center justify-between text-[11px] text-amber-400/80">
                  <span>Year {img.event_year}</span>
                  <span className="flex items-center gap-1 group-hover:underline">
                    <span>Enlarge</span>
                    <Maximize2 className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Lightbox */}
        {activeImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
            <div className="w-full max-w-3xl rounded-3xl bg-[#170306] border border-amber-500/40 p-6 shadow-2xl relative">
              <button
                onClick={() => setActiveImage(null)}
                className="absolute top-5 right-5 p-2 rounded-xl bg-rose-950/60 text-rose-300 hover:text-white hover:bg-rose-900/60 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="max-h-[60vh] flex items-center justify-center mb-6 p-4 bg-[#0a0103] rounded-2xl border border-rose-950">
                <img
                  src={activeImage.image_url}
                  alt={activeImage.title}
                  className="max-h-[50vh] max-w-full object-contain mx-auto"
                />
              </div>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  {activeImage.category}
                </span>
                <span className="text-xs text-rose-400 font-semibold">Abhivyakti {activeImage.event_year}</span>
              </div>

              <h2 className="text-xl font-serif font-black text-white">{activeImage.title}</h2>
              <p className="text-xs sm:text-sm text-rose-200/80 mt-1.5 leading-relaxed">
                {activeImage.caption}
              </p>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};
export default GalleryPage;
