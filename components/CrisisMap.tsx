import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// --- ICONS ---
const createIcon = (color: string) => new L.Icon({
  iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const Icons = {
  red: createIcon('red'),
  orange: createIcon('orange'),
  green: createIcon('green'),
  blue: createIcon('blue'),
  user: createIcon('violet')
};

// --- DATA ---
const CENTER_POS: [number, number] = [11.6643, 78.1460];
const USER_POS: [number, number] = [11.6620, 78.1420];

const INCIDENTS = [
  { id: 1, type: 'Stray Dog Attack', pos: [11.6665, 78.1485] as [number, number], status: 'Critical', desc: 'Pack of 4 aggressive dogs.', icon: Icons.red, distance: '0.8 km' },
  { id: 2, type: 'Rabies Alert', pos: [11.6620, 78.1440] as [number, number], status: 'Warning', desc: 'Foaming mouth symptoms.', icon: Icons.orange, distance: '0.3 km' },
  { id: 3, type: 'Injury Report', pos: [11.6590, 78.1500] as [number, number], status: 'Investigating', desc: 'Cyclist chased.', icon: Icons.blue, distance: '1.2 km' },
];

const generateRoute = (destination: string) => {
  const seed = destination.length;
  const path = [USER_POS];
  path.push([USER_POS[0] + (seed * 0.0001), USER_POS[1] + (seed * 0.0002)]);
  path.push([USER_POS[0] + (seed * 0.0003), USER_POS[1] - (seed * 0.0001)]);
  path.push([USER_POS[0] + (seed * 0.0005), USER_POS[1] + (seed * 0.0003)]);
  return path as [number, number][];
};

const MapController = ({ center, zoom }: { center: [number, number], zoom: number }) => {
  const map = useMap();
  useEffect(() => { 
    if (center) map.flyTo(center, zoom, { duration: 1.5, easeLinearity: 0.25 });
  }, [center, zoom, map]);
  return null;
};

export const CrisisMap: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'monitor' | 'navigate' | 'share'>('monitor');
  const [destination, setDestination] = useState('');
  const [isRouting, setIsRouting] = useState(false);
  const [routePath, setRoutePath] = useState<[number, number][]>([]);
  const [mapCenter, setMapCenter] = useState<[number, number]>(CENTER_POS);
  const [zoomLevel, setZoomLevel] = useState(15);
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);

  const handleLocateIncident = (inc: any) => {
    setMapCenter(inc.pos);
    setZoomLevel(17);
    setSelectedCardId(inc.id);
  };

  const handleCalculateRoute = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRouting(true);
    setRoutePath([]);
    setTimeout(() => {
      const newPath = generateRoute(destination);
      setRoutePath(newPath);
      setMapCenter(newPath[newPath.length - 1]);
      setZoomLevel(16);
      setIsRouting(false);
    }, 1000);
  };

  const handleShare = () => {
    const text = `🚨 Safe City Alert: Tracking a safe path via SDD.`;
    navigator.clipboard.writeText(text);
    alert('Link copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-20 relative overflow-hidden flex flex-col h-screen font-sans">
      
      {/* --- SIDEBAR PANEL (DARK MODE) --- */}
      <div className="absolute top-24 right-6 z-[500] w-full max-w-sm pointer-events-none flex flex-col gap-4 h-[calc(100vh-120px)]">
        
        {/* The Card Container - NOW DARK AGAIN */}
        <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-700 shadow-2xl rounded-3xl p-5 pointer-events-auto flex flex-col max-h-full">
          
          {/* Top Tabs */}
          <div className="flex bg-slate-800 p-1 rounded-xl mb-4 shrink-0 border border-slate-700">
            {['monitor', 'navigate', 'share'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab as any)} 
                className={`flex-1 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-all ${activeTab === tab ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* TAB 1: INTELLIGENCE MONITOR */}
          {activeTab === 'monitor' && (
            <div className="overflow-y-auto pr-2 custom-scrollbar space-y-3">
              
              {/* Stats Row */}
              <div className="grid grid-cols-2 gap-3 mb-2">
                <div className="bg-slate-800 p-3 rounded-2xl border border-slate-700 text-center">
                  <div className="text-2xl font-black text-red-500">{INCIDENTS.length}</div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase">Active Threats</div>
                </div>
                <div className="bg-slate-800 p-3 rounded-2xl border border-slate-700 text-center">
                  <div className="text-2xl font-black text-green-500">82</div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase">Safe Zones</div>
                </div>
              </div>

              <div className="text-xs font-bold text-slate-500 uppercase ml-1 mb-1">Live Incident Feed</div>
              
              {/* THE CARDS (Dark Theme) */}
              {INCIDENTS.map((inc) => (
                <div 
                  key={inc.id}
                  onClick={() => handleLocateIncident(inc)}
                  className={`group relative p-4 rounded-2xl border transition-all cursor-pointer hover:shadow-lg hover:shadow-blue-900/20 ${selectedCardId === inc.id ? 'bg-slate-800 border-blue-500 ring-1 ring-blue-500' : 'bg-slate-800/50 border-slate-700 hover:bg-slate-800 hover:border-slate-600'}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-wide ${inc.status === 'Critical' ? 'bg-red-500/20 text-red-400' : inc.status === 'Warning' ? 'bg-orange-500/20 text-orange-400' : 'bg-blue-500/20 text-blue-400'}`}>
                      {inc.status}
                    </div>
                    <div className="text-xs font-mono text-slate-400 flex items-center gap-1">
                      <span>📍 {inc.distance}</span>
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-white text-sm mb-1 group-hover:text-blue-400 transition-colors">{inc.type}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{inc.desc}</p>
                  
                  {/* Hover Action */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                      ➔
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: NAVIGATION */}
          {activeTab === 'navigate' && (
            <div className="animate-fade-in space-y-4">
              <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700">
                <label className="text-[10px] font-bold text-slate-500 uppercase mb-2 block">Destination</label>
                <div className="flex items-center gap-3 bg-slate-900 p-3 rounded-xl border border-slate-600 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all shadow-sm">
                  <span className="text-lg">🏁</span>
                  <input 
                    type="text" 
                    placeholder="Search location..." 
                    className="w-full bg-transparent outline-none text-sm font-medium text-white placeholder-slate-500"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  />
                </div>
              </div>
              <button 
                onClick={handleCalculateRoute}
                disabled={!destination || isRouting} 
                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-xl font-bold text-sm shadow-xl shadow-blue-900/20 disabled:opacity-50 transition-transform active:scale-[0.98] flex items-center justify-center gap-2"
              >
                {isRouting ? 'Calculating...' : 'Find Safe Path'}
              </button>
            </div>
          )}

          {/* TAB 3: SHARE */}
          {activeTab === 'share' && (
             <div className="space-y-4 animate-fade-in">
               <div className="p-6 bg-green-900/20 border border-green-500/30 rounded-2xl text-center">
                 <div className="w-12 h-12 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">📡</div>
                 <h3 className="font-bold text-green-400">Tracking Active</h3>
                 <p className="text-xs text-green-200/50 mt-1">Guardians can view your live location.</p>
               </div>
               <button onClick={handleShare} className="w-full bg-slate-800 hover:bg-slate-700 text-white py-4 rounded-xl font-bold text-sm shadow-xl flex items-center justify-center gap-2 transition-transform active:scale-[0.98] border border-slate-700">
                 Copy Secure Link
               </button>
             </div>
          )}

        </div>
      </div>

      {/* --- MAIN MAP --- */}
      <div className="flex-1 relative z-0">
        <MapContainer 
          center={CENTER_POS} 
          zoom={15} 
          style={{ height: '100%', width: '100%' }}
          zoomControl={false} 
        >
          {/* Light Mode Map Tiles (Standard) */}
          <TileLayer
            attribution='&copy; OpenStreetMap'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapController center={mapCenter} zoom={zoomLevel} />
          
          <Marker position={USER_POS} icon={Icons.user}><Popup>You</Popup></Marker>

          {INCIDENTS.map((inc) => (
            <React.Fragment key={inc.id}>
              <Marker position={inc.pos} icon={inc.icon}>
                <Popup>
                  <strong className="uppercase text-xs font-bold text-slate-900">{inc.type}</strong>
                  <p className="text-sm m-0 font-medium text-slate-700">{inc.desc}</p>
                </Popup>
              </Marker>
              {inc.status === 'Critical' && <Circle center={inc.pos} radius={150} pathOptions={{ color: 'red', fillColor: 'red', fillOpacity: 0.1, stroke: false }} />}
            </React.Fragment>
          ))}

          {routePath.length > 0 && (
            <>
              <Polyline positions={routePath} color="#2563eb" weight={6} opacity={0.8} />
              <Marker position={routePath[routePath.length-1]} icon={Icons.green} />
            </>
          )}
        </MapContainer>
      </div>
    </div>
  );
};