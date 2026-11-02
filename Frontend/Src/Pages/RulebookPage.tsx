import React from "react";
import { FestiveTicker } from "@/Components/Ui/FestiveTicker";
import { Navbar } from "@/Components/Ui/Navbar";
import { Footer } from "@/Components/Ui/Footer";
import { FloatingBackgroundElements } from "@/Components/Ui/FloatingBackgroundElements";
import {
  BookOpen,
  ShieldCheck,
  Award,
  Clock,
  AlertTriangle,
  Scale,
  Printer,
  ChevronRight,
  FileCheck,
} from "lucide-react";

export const RulebookPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0e0204] text-amber-50 relative selection:bg-amber-500 selection:text-black">
      <FloatingBackgroundElements />
      <FestiveTicker />
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>NIMS Cultural Fest Directorate</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-black text-white">
            Official Championship Rulebook
          </h1>
          <p className="text-sm text-rose-200/80 mt-3 leading-relaxed">
            Standard Operating Procedures, Scoring Rubrics, Points Matrix, And Code Of Conduct For Abhivyakti 2026.
          </p>

          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              onClick={() => window.print()}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold transition-all flex items-center gap-2 shadow-lg shadow-amber-500/20"
            >
              <Printer className="w-4 h-4" />
              <span>Print Official Rulebook</span>
            </button>
          </div>
        </div>

        {/* Section 1: Championship Points Engine */}
        <section className="mb-12 p-8 rounded-3xl bg-[#170306] border border-rose-950/80 shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <Award className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold font-serif text-white">
              1. Championship Points Formula
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-rose-200/80 leading-relaxed mb-6">
            The Abhivyakti Rolling Champions Trophy Is Conferred On The NIMS Institute Or College Amassing The Highest Cumulative Score Across All 15 Cultural Competitions.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-5 rounded-2xl bg-[#1e0409] border border-amber-500/40">
              <span className="text-3xl">🥇</span>
              <h3 className="text-sm font-black text-amber-300 mt-2">First Place (Gold)</h3>
              <p className="text-2xl font-mono font-black text-white mt-1">40 Points</p>
              <p className="text-[11px] text-rose-300/60 mt-1">Awarded Per Competition</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#1e0409] border border-zinc-400/40">
              <span className="text-3xl">🥈</span>
              <h3 className="text-sm font-black text-zinc-300 mt-2">Second Place (Silver)</h3>
              <p className="text-2xl font-mono font-black text-white mt-1">25 Points</p>
              <p className="text-[11px] text-rose-300/60 mt-1">Awarded Per Competition</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#1e0409] border border-amber-800/40">
              <span className="text-3xl">🥉</span>
              <h3 className="text-sm font-black text-amber-500 mt-2">Third Place (Bronze)</h3>
              <p className="text-2xl font-mono font-black text-white mt-1">15 Points</p>
              <p className="text-[11px] text-rose-300/60 mt-1">Awarded Per Competition</p>
            </div>
          </div>
        </section>

        {/* Section 2: Standard Evaluation Rubric */}
        <section className="mb-12 p-8 rounded-3xl bg-[#170306] border border-rose-950/80 shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <Scale className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold font-serif text-white">
              2. Standard Four-Pillar Jury Rubric
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-rose-200/80 leading-relaxed mb-6">
            All Official Competitions Are Evaluated By An Independent Em献nelled Jury Using A Standardized 100-Point Scoring Matrix (25 Points Per Criterion).
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#1c0308] border border-rose-950/80">
              <span className="text-xs font-black text-amber-400">Pillar 1 (25 Pts)</span>
              <h4 className="text-sm font-bold text-white mt-1">Originality & Artistic Creativity</h4>
              <p className="text-xs text-rose-300/70 mt-1">
                Unique Interpretation, Innovative Choreography, Concept Depth, And Inventive Visual Composition.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#1c0308] border border-rose-950/80">
              <span className="text-xs font-black text-amber-400">Pillar 2 (25 Pts)</span>
              <h4 className="text-sm font-bold text-white mt-1">Technical Execution & Precision</h4>
              <p className="text-xs text-rose-300/70 mt-1">
                Pitch Accuracy, Rhythm, Brushwork, Craftsmanship, Structural Balance, Or Vocal Range.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#1c0308] border border-rose-950/80">
              <span className="text-xs font-black text-amber-400">Pillar 3 (25 Pts)</span>
              <h4 className="text-sm font-bold text-white mt-1">Stage Presence & Impact</h4>
              <p className="text-xs text-rose-300/70 mt-1">
                Audience Engagement, Poise, Expression, Theatrical Projection, And Confidence.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#1c0308] border border-rose-950/80">
              <span className="text-xs font-black text-amber-400">Pillar 4 (25 Pts)</span>
              <h4 className="text-sm font-bold text-white mt-1">Time Discipline & Code Adherence</h4>
              <p className="text-xs text-rose-300/70 mt-1">
                Strict Adherence To Stipulated Time Windows, Clean Stage Clearance, And Decorum.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Event-Specific Regulations */}
        <section className="mb-12 p-8 rounded-3xl bg-[#170306] border border-rose-950/80 shadow-xl space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <FileCheck className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold font-serif text-white">
              3. Event-Specific Guidelines
            </h2>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-[#1d0409] border border-rose-950">
              <h3 className="text-sm font-bold text-amber-300">Dance - Solo, Duet & Group (Round 1 & 2)</h3>
              <p className="text-xs text-rose-200/80 mt-1.5 leading-relaxed">
                • Track Audio Must Be Submitted On A Pen Drive In MP3 Format At The Control Desk 1 Hour Prior. <br />
                • Time Limits: Solo (3-4 Mins), Duet (4-5 Mins), Group (6-8 Mins). Exceeding Time Results In 5 Points Penalty Per Minute. <br />
                • Flammable Items, Glass, Powder, Or Hazardous Props Are Strictly Prohibited On Stage.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#1d0409] border border-rose-950">
              <h3 className="text-sm font-bold text-amber-300">Singing - Solo, Duet & Group (Round 1 & 2)</h3>
              <p className="text-xs text-rose-200/80 mt-1.5 leading-relaxed">
                • Backing Karaoke Tracks Or Up To Two Live Acoustic Accompanists Permitted. <br />
                • Auto-Tune Or Vocal Enhancement Modules Are Forbidden; Natural Mic Feeds Only. <br />
                • Explicit Or Vulgar Lyrics Will Attract Immediate Disqualification By The Jury.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#1d0409] border border-rose-950">
              <h3 className="text-sm font-bold text-amber-300">Fashion Upcycling & Kick Drip</h3>
              <p className="text-xs text-rose-200/80 mt-1.5 leading-relaxed">
                • Base Garments Or Sneakers Must Be Brought By Participants; Upcycling Work Must Be Executed Live During The Allotted Duration. <br />
                • Pre-Fabricated Or Readymade Garments Presented Without On-Site Crafting Are Disqualified.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#1d0409] border border-rose-950">
              <h3 className="text-sm font-bold text-amber-300">AI Art & Digital Innovation</h3>
              <p className="text-xs text-rose-200/80 mt-1.5 leading-relaxed">
                • Prompts Must Be Formulated Live On Assigned Lab Terminals. <br />
                • Participants Must Document Their Prompt Logic, Seeds, And Iterative Refinements For Jury Examination.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Code of Conduct */}
        <section className="p-8 rounded-3xl bg-[#170306] border border-rose-950/80 shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold font-serif text-white">
              4. Code Of Conduct & Discipline
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-rose-200/80 leading-relaxed">
            All Participants And Contingent Leaders Must Maintain Utmost Respect And Decorum Towards Jury Members, Organizers, Fellow Competitors, And University Property. Misconduct, Defamation, Or Vandalism Will Lead To Instant Forfeiture Of Points And Disciplinary Referral To The University Proctorial Board.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
};
export default RulebookPage;
