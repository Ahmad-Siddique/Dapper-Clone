import React from 'react';
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Testimonials | DapperClone',
  description: 'See what our clients say about us.',
};

const testimonials = [
  {
    id: 1,
    company: "TECHFLOW",
    name: "Sarah Johnson",
    role: "CTO at TechFlow",
    content: "The adoption rate has been remarkable, with more than 80% of TechFlow's engineering team incorporating it into their workflow and a level of engagement that is unparalleled compared with other dev tools.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    id: 2,
    company: "STARTUPX",
    name: "Michael Chen",
    role: "Founder",
    content: "We've seen a dramatic shift in how we handle our search infrastructure. The precision and speed are exactly what we needed to scale our operations effectively.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    id: 3,
    company: "CREATIVECORP",
    name: "Emily Davis",
    role: "Product Manager",
    content: "It's rare to find a tool that balances power with simplicity so well. My team was able to integrate it within days and the results were immediate.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    id: 4,
    company: "BRANDIFY",
    name: "David Wilson",
    role: "Director of Marketing",
    content: "The insights we gather now are far more actionable. It's not just about search, it's about understanding our data in a way we couldn't before.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    id: 5,
    company: "INNOVATEDAILY",
    name: "Jessica Brown",
    role: "CEO",
    content: "A game changer for our legal tech stack. The accuracy is impressive, and the support team has been fantastic to work with throughout the process.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150"
  }
];

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-[#1c1c1c] text-[#e5e5e5] font-sans selection:bg-indigo-500/30">
        
        <div className="relative">
            {/* Sticky Heading Section - Matches DeepJudge style: Centered, Large Serif, Dark Background */}
            <div className="sticky top-0 h-screen flex flex-col items-center justify-center -z-0 overflow-hidden px-4">
                <h1 className="text-6xl md:text-8xl font-serif text-center leading-tight tracking-tight text-[#f0f0f0]">
                    What people say<br />
                    about TechEyerie
                </h1>
            </div>

            {/* Scrollable Cards Section */}
            {/* Cards slide over the sticky header. Added padding top to ensure they start entering after some detail. */}
            <div className="relative z-10 flex flex-col items-center gap-6 pb-32 pt-[20vh] px-4 w-full">
                {testimonials.map((t) => (
                    <div 
                        key={t.id} 
                        className="w-full max-w-xl bg-[#e6e6e2] text-[#1a1a1a] p-8 md:p-12 rounded-[2rem] shadow-xl transition-transform duration-300 hover:scale-[1.01] font-suisse font-light"
                    >
                        {/* Company Name */}
                        <div className="mb-8">
                            <h4 className="text-xs font-bold tracking-widest uppercase text-gray-600">{t.company}</h4>
                        </div>

                        {/* Quote */}
                        <blockquote className="text-xl md:text-2xl leading-relaxed mb-12 font-light">
                            "{t.content}"
                        </blockquote>

                        {/* Profile Footer */}
                        <div className="flex items-center justify-between border-t border-gray-300/50 pt-8">
                            <div className="flex items-center gap-4">
                                <img 
                                    src={t.image} 
                                    alt={t.name} 
                                    className="w-12 h-12 rounded-lg object-cover grayscale"
                                />
                                <div>
                                    <h5 className="font-bold text-sm">{t.name}</h5>
                                    <p className="text-xs text-gray-600">{t.role}</p>
                                </div>
                            </div>
                            
                            {/* Arrow Icon Circle */}
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm cursor-pointer hover:bg-black hover:text-white transition-colors duration-300">
                                <ArrowRight className="w-5 h-5" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
             {/* End Spacer */}
            <div className="relative z-10 h-[20vh] bg-[#1c1c1c]"></div>
        </div>
    </div>
  );
}
