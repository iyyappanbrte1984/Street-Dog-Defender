
import React, { useState } from 'react';

const faqs = [
  {
    q: "Is the ultrasonic sound safe for humans?",
    a: "Yes. The 25kHz frequency is well above the human auditory range (limit of 20kHz). It is effectively silent to people, including infants and the elderly. It has no long-term biological impact on human hearing."
  },
  {
    q: "Is it humane for the dogs?",
    a: "Absolutely. Our goal is coexistence. The sound is startling and uncomfortable for aggressive dogs, creating a 'silent wall' that makes them want to leave the area. It causes zero physical pain or injury, unlike stones, sticks, or chemical sprays."
  },
  {
    q: "How does the panic detection prevent false alarms?",
    a: "The device uses a 'Dead Man' logic. Before the deterrent is emitted, the device vibrates intensely on your wrist. If you simply tap the button within 1 second, it cancels. It also cross-references heart-rate with movement to distinguish between exercise and panic."
  },
  {
    q: "How long does the battery last?",
    a: "On a full USB-C charge, the device lasts up to 7 days in monitoring mode. Frequent deterrent activations will reduce this, but for typical daily use, weekly charging is sufficient."
  },
  {
    q: "Is it legal to use in public?",
    a: "Yes. Our device complies with animal welfare guidelines as it is non-lethal and non-contact. It is designed to be a passive defensive measure, much like a whistle or a flashlight."
  }
];

export const FAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-extrabold text-slate-900 mb-4 uppercase tracking-tight">Common Questions</h2>
        <p className="text-xl text-slate-600">Everything you need to know about safety and compliance.</p>
      </div>

      <div className="space-y-4">
        {faqs.map((f, i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <button 
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
            >
              <span className="text-lg font-bold text-slate-900">{f.q}</span>
              <svg 
                className={`w-6 h-6 text-orange-600 transition-transform ${openIdx === i ? 'rotate-180' : ''}`} 
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openIdx === i && (
              <div className="px-6 pb-6 text-slate-600 leading-relaxed animate-fade-in">
                {f.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
