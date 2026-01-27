import React from "react";

// IMAGE IMPORTS
import leaderImg from "../src/assets/HARSINIDEVI I - X A.jpg";
import member1Img from "../src/assets/SUPRIYA S - IX A.jpg";
import member2Img from "../src/assets/ANUSHKA D N - IX A.jpg";
import member3Img from "../src/assets/KAVIKA M - X A.jpg";
import member4Img from "../src/assets/JASWANTHINI N - X A.jpg";

const TEAM = [
  { name: "Harsinidevi I", className: "Class X-A", role: "LEADER", img: leaderImg },
  { name: "Supriya S", className: "Class IX-A", role: "MEMBER", img: member1Img },
  { name: "Anushka D N", className: "Class IX-A", role: "MEMBER", img: member2Img },
  { name: "Kavika M", className: "Class X-A", role: "MEMBER", img: member3Img },
  { name: "Jaswanthini N", className: "Class X-A", role: "MEMBER", img: member4Img },
];

export const TeamSection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 to-slate-950">
      
      {/* ONE-LINE TITLE */}
      <h2 className="text-center text-3xl md:text-4xl font-extrabold text-white mb-20">
        OUR TEAM – MODEL SCHOOL KADAYAMPATTI
      </h2>

      {/* TEAM ROW */}
      <div className="flex justify-center gap-20 px-10 overflow-x-auto no-scrollbar">

        {TEAM.map((m, i) => {
          const isLeader = m.role === "LEADER";

          return (
            <div key={i} className="flex-shrink-0">

              {/* ROTATING LABEL (NON-BLOCKING) */}
              <div className="relative w-56 h-56 flex items-center justify-center">
                <div className="absolute inset-0 animate-spin-slow pointer-events-none">
                  <svg viewBox="0 0 120 120" className="w-full h-full">
                    <defs>
                      <path
                        id={`circle-${i}`}
                        d="M60,60 m-52,0 a52,52 0 1,1 104,0 a52,52 0 1,1 -104,0"
                      />
                    </defs>
                    <text
                      fontSize="10"
                      fontWeight="bold"
                      fill={isLeader ? "#facc15" : "#60a5fa"}
                      letterSpacing="3"
                    >
                      <textPath href={`#circle-${i}`}>
                        {m.role} • {m.role} • {m.role} •
                      </textPath>
                    </text>
                  </svg>
                </div>

                {/* FLIP CARD (HOVER HERE ONLY) */}
                <div className="w-40 h-40 perspective">
                  <div className="card">

                    {/* FRONT */}
                    <div
                      className={`face front border-4 ${
                        isLeader ? "border-yellow-400" : "border-blue-400"
                      }`}
                    >
                      <img
                        src={m.img}
                        alt={m.name}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>

                    {/* BACK */}
                    <div
                      className={`face back border-4 bg-slate-800 ${
                        isLeader ? "border-yellow-400" : "border-blue-400"
                      }`}
                    >
                      <h3
                        className={`font-bold ${
                          isLeader ? "text-yellow-300" : "text-blue-300"
                        }`}
                      >
                        {m.name}
                      </h3>
                      <p className="text-sm text-slate-200">{m.className}</p>
                      <span className="mt-2 text-xs px-3 py-1 rounded-full bg-white/10 text-white">
                        {m.role}
                      </span>
                    </div>

                  </div>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* CSS */}
      <style>{`
        .perspective {
          perspective: 1000px;
        }

        .card {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.8s ease;
        }

        .card:hover {
          transform: rotateY(180deg);
        }

        .face {
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          backface-visibility: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .back {
          transform: rotateY(180deg);
          text-align: center;
          padding: 12px;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .animate-spin-slow {
          animation: spin 14s linear infinite;
        }

        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { scrollbar-width: none; }
      `}</style>
    </section>
  );
};
