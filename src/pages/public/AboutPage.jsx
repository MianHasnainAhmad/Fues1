import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, CheckCircle2, Heart, Sparkles, Shield, ArrowRight } from 'lucide-react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { Button } from '../../components/common/Button';

export const AboutPage = () => {
  return (
    <div className="min-h-screen bg-[#F8F8F5] flex flex-col">
      <Navbar />

      <main className="flex-1 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF0EB] border border-[#FFD8CC] text-[#FF7043] text-xs font-semibold">
              <Flame className="w-3.5 h-3.5" />
              <span>The Fuse Manifesto</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#171717] tracking-tight">
              Why Incomplete Ideas Matter
            </h1>
            <p className="text-lg text-[#525252] max-w-2xl mx-auto leading-relaxed">
              Every transformative product started as a messy hunch. The modern startup ecosystem forces people to pretend they know everything before they begin. We believe that is backwards.
            </p>
          </div>

          {/* Mission Core */}
          <div className="bg-white rounded-3xl border border-[#E8E7E0] p-8 sm:p-12 shadow-sm space-y-8">
            <h2 className="text-2xl font-bold text-[#171717]">The Incubation Fallacy</h2>
            <p className="text-base text-[#525252] leading-relaxed">
              Traditional entrepreneurial culture idolizes the lone visionary with a 40-slide pitch deck and a polished business model. This creates immense impostor syndrome: students, designers, domain specialists, and engineers sit on incredible observations for years because they don't know how to code the backend, design the user experience, or draft the go-to-market strategy.
            </p>
            <p className="text-base text-[#525252] leading-relaxed">
              At the same time, thousands of talented builders are looking for meaningful challenges to tackle on nights and weekends, but get tired of generic todo apps or clones of existing Silicon Valley unicorns.
            </p>

            <div className="p-6 rounded-2xl bg-[#FFF0EB] border border-[#FFD8CC]">
              <p className="text-base sm:text-lg font-bold text-[#FF7043] italic">
                "Fuse is built on a simple truth: What you consider an embarrassing, half-formed sketch is precisely the spark someone else has been looking for."
              </p>
            </div>
          </div>

          {/* Core Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl border border-[#E8E7E0] p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#FFF0EB] text-[#FF7043] flex items-center justify-center font-bold">
                1
              </div>
              <h3 className="text-lg font-bold text-[#171717]">Radical Vulnerability</h3>
              <p className="text-sm text-[#525252] leading-relaxed">
                We celebrate admitting what you don't know. Asking for help is not a weakness; it's the foundation of great architecture.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-[#E8E7E0] p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#F3EFFF] text-[#6C5CE7] flex items-center justify-center font-bold">
                2
              </div>
              <h3 className="text-lg font-bold text-[#171717]">Credit & Reputation</h3>
              <p className="text-sm text-[#525252] leading-relaxed">
                Micro-help shouldn't be forgotten. Contributions are recorded transparently with verifiable peer reviews and reputation points.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-[#E8E7E0] p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#ECFDF5] text-[#059669] flex items-center justify-center font-bold">
                3
              </div>
              <h3 className="text-lg font-bold text-[#171717]">AI as an Amplifier</h3>
              <p className="text-sm text-[#525252] leading-relaxed">
                We don't use AI to replace human creators. We use vector similarity to connect minds that would otherwise never have crossed paths.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center pt-6 space-y-4">
            <h3 className="text-2xl font-bold text-[#171717]">Ready to contribute your rough draft?</h3>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
              <Link to="/register">
                <Button variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
                  Create an Account
                </Button>
              </Link>
              <Link to="/community">
                <Button variant="outline" size="lg">
                  Read Community Charter
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
