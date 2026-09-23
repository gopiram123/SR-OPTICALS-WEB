import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Layers, Crown, Clock } from 'lucide-react';

export const StylesSection: React.FC = () => {
  const styles = [
    {
      name: "Classic",
      description: "Timeless silhouettes, intellectual browlines, and enduring elegance.",
      icon: Clock,
      image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=600&q=80",
      color: "from-amber-900/80"
    },
    {
      name: "Modern",
      description: "Clean geometric profiles, architectural bevels, and sleek acetate contours.",
      icon: Layers,
      image: "https://images.unsplash.com/photo-1509695503492-413833d296ae?auto=format&fit=crop&w=600&q=80",
      color: "from-sky-950/80"
    },
    {
      name: "Premium",
      description: "Pure aero-titanium, 24K gold accents, and bespoke handcrafted details.",
      icon: Crown,
      image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80",
      color: "from-brand-950/80"
    },
    {
      name: "Everyday",
      description: "Ultralight, flexible TR90 memory materials built for seamless daily wear.",
      icon: Sparkles,
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=600&q=80",
      color: "from-stone-900/80"
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-cream-200/40 border-t border-cream-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-gold-700">
            Aesthetic Profiles
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-950 mt-2">
            Explore by Style
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base mt-2">
            Select an aesthetic archetype to uncover frames complementing your daily lifestyle and facial symmetry.
          </p>
        </div>

        {/* 4 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {styles.map((item) => {
            const IconComponent = item.icon;
            return (
              <Link
                key={item.name}
                to={`/collections?style=${encodeURIComponent(item.name)}`}
                className="group relative rounded-3xl overflow-hidden bg-white border border-neutral-200 shadow-card hover:shadow-luxury-hover transition-all duration-300 flex flex-col h-80"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${item.color} via-black/40 to-transparent`} />
                </div>

                {/* Card Content */}
                <div className="relative z-10 p-6 flex flex-col justify-between h-full text-white">
                  <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                    <IconComponent className="w-5 h-5" />
                  </div>

                  <div>
                    <h3 className="font-serif text-2xl font-bold text-white mb-1.5">
                      {item.name}
                    </h3>
                    <p className="text-xs text-cream-200/90 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                    <span className="mt-3 inline-block text-[11px] font-bold tracking-wider uppercase text-gold-300 group-hover:underline">
                      View Matching Frames →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
};
