import React from "react";

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: "01",
      title: "Threat Detected",
      desc: "Biometric sensors detect sudden heart-rate spikes (>130 BPM) and abnormal movement patterns associated with panic.",
      icon: (
        <svg
          className="w-10 h-10 text-orange-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      )
    },
    {
      number: "02",
      title: "Haptic Verification",
      desc: "A sharp vibration confirms intent. The user has one second to cancel accidental activation.",
      icon: (
        <svg
          className="w-10 h-10 text-orange-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      )
    },
    {
      number: "03",
      title: "Defense Activated",
      desc: "Ultrasonic deterrence, LED disorientation, and GPS SOS alert activate simultaneously.",
      icon: (
        <svg
          className="w-10 h-10 text-orange-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      )
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-20">

      {/* Heading */}
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 uppercase tracking-tight mb-4">
          Autonomous Defense Logic
        </h2>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Intelligent protection that reacts faster than fear.
        </p>
      </div>

      {/* Steps */}
      <div className="grid md:grid-cols-3 gap-10 mb-24">
        {steps.map((step, index) => (
          <div
            key={index}
            className="relative bg-white p-10 rounded-3xl shadow-xl border border-slate-100"
          >
            <span className="absolute top-6 right-8 text-6xl font-black text-slate-100">
              {step.number}
            </span>

            <div className="mb-6 w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center">
              {step.icon}
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              {step.title}
            </h3>

            <p className="text-slate-600 leading-relaxed">
              {step.desc}
            </p>
          </div>
        ))}
      </div>

{/* Comparison Section */}
<div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white bg-slate-900">

  <div className="grid md:grid-cols-2">

    {/* LEFT — Aggressive Street Dog */}
    <div className="relative h-[420px] md:h-[620px] overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1588873281272-355865239564?q=80&w=1600&auto=format&fit=crop"
        alt="Aggressive street dog"
        className="w-full h-full object-cover object-center brightness-75 contrast-125"
      />

      {/* Gradient overlay (NOT solid color) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

      <div className="absolute bottom-8 left-8 z-10">
        <span className="bg-red-600 text-white px-4 py-1 rounded-full text-xs font-black uppercase tracking-wide">
          The Conflict
        </span>
        <h4 className="text-white text-3xl font-black uppercase mt-2">
          Uncontrolled Aggression
        </h4>
      </div>
    </div>

    {/* RIGHT — Calm Deterrence */}
    <div className="relative h-[420px] md:h-[620px] overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=1600&auto=format&fit=crop"
        alt="Dog retreating calmly"
        className="w-full h-full object-cover object-center brightness-90"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>

      <div className="absolute bottom-8 left-8 z-10">
        <span className="bg-emerald-600 text-white px-4 py-1 rounded-full text-xs font-black uppercase tracking-wide">
          The Coexistence
        </span>
        <h4 className="text-white text-3xl font-black uppercase mt-2">
          Silent Deterrence
        </h4>
      </div>
    </div>

  </div>

  {/* VS Badge */}
  <div className="absolute hidden md:flex top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
    <div className="w-20 h-20 rounded-full bg-orange-600 text-white flex items-center justify-center text-2xl font-black border-4 border-white shadow-[0_0_40px_rgba(249,115,22,0.7)]">
      VS
    </div>
  </div>

</div>

      {/* Quote */}
      <div className="mt-14 text-center max-w-3xl mx-auto">
        <p className="text-slate-500 text-lg italic leading-relaxed">
          “This system does not provoke or punish. It establishes a humane safety boundary,
          converting high-risk encounters into controlled, non-violent avoidance.”
        </p>
      </div>

    </section>
  );
};
