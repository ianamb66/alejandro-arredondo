import { useEffect, useState } from "react";

// --- ESTILOS CSS GLOBALES Y ANIMACIONES ---
const globalStyles = `
@import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');

:root {
  --bg-color: #050505;
  --text-color: #f4f4f4;
  --accent-color: #ff3300;
  --border-color: rgba(244, 244, 244, 0.3);
}

body {
  background-color: var(--bg-color);
  color: var(--text-color);
  font-family: 'Space Mono', monospace;
  margin: 0;
  overflow-x: hidden;
}

.tech-border { border: 1px solid var(--border-color); }
.tech-border-b { border-bottom: 1px solid var(--border-color); }
.tech-border-r { border-right: 1px solid var(--border-color); }
.tech-border-t { border-top: 1px solid var(--border-color); }

/* Animaciones */
@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
.animate-blink { animation: blink 1s step-end infinite; }

@keyframes marquee { 0% { transform: translateX(0%); } 100% { transform: translateX(-100%); } }
.animate-marquee { display: inline-block; white-space: nowrap; animation: marquee 20s linear infinite; }

@keyframes scanline { 0% { transform: translateY(-100%); } 100% { transform: translateY(100vh); } }
.scanline-effect {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 10px;
  background: rgba(255, 255, 255, 0.1);
  opacity: 0.4;
  pointer-events: none;
  animation: scanline 8s linear infinite;
  z-index: 50;
}

/* Utilidades de diseño */
.inverted { background-color: var(--text-color); color: var(--bg-color); }
.inverted-accent { background-color: var(--accent-color); color: #fff; }

/* Scrollbar personalizado */
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: var(--bg-color); border-left: 1px solid var(--border-color); }
::-webkit-scrollbar-thumb { background: var(--text-color); }
`;

const App = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [bootSequence, setBootSequence] = useState(true);

  useEffect(() => {
    const timer = setInterval(
      () => setTime(new Date().toLocaleTimeString()),
      1000
    );
    const bootTimer = setTimeout(() => setBootSequence(false), 1500);
    return () => {
      clearInterval(timer);
      clearTimeout(bootTimer);
    };
  }, []);

  if (bootSequence) {
    return (
      <div className="min-h-screen bg-[#050505] text-[#f4f4f4] font-mono flex flex-col items-center justify-center p-4">
        <style>{globalStyles}</style>
        <div className="w-full max-w-md">
          <p className="text-xs mb-2">INITIATING SYSTEM...</p>
          <div className="w-full h-1 bg-gray-800">
            <div
              className="h-full bg-white animate-[pulse_1s_ease-in-out_infinite]"
              style={{ width: "100%" }}
            />
          </div>
          <p className="mt-4 text-sm">LOADING MODULES: RIG_SPEC, SWITCH_CTRL, CINE_LOG</p>
          <p className="mt-2 text-[#ff3300]">SYS.OP: ALEJANDRO ARREDONDO</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative selection:bg-[#ff3300] selection:text-white p-2 md:p-6 lg:p-10">
      <style>{globalStyles}</style>
      <div className="scanline-effect" />

      {/* Main Container - The "Spec Sheet" */}
      <div className="max-w-7xl mx-auto tech-border bg-[#050505] relative overflow-hidden">
        {/* Top Bar - Telemetry */}
        <div className="flex justify-between items-center text-[10px] md:text-xs p-2 tech-border-b uppercase tracking-widest text-gray-400">
          <div>LAT: 19.4326° N / LON: 99.1332° W</div>
          <div className="hidden md:block">
            STATUS: ONLINE
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-blink ml-1" />
          </div>
          <div>{time} SYS_TIME</div>
        </div>

        {/* Header Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 tech-border-b">
          {/* Main Title */}
          <div className="p-6 md:p-10 lg:col-span-2 tech-border-r flex flex-col justify-center relative overflow-hidden group hover:bg-[#111] transition-colors">
            <div className="absolute top-2 left-2 text-[10px] text-gray-500">ID. 001</div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tighter leading-none mb-4">
              Alejandro
              <br />
              <span className="text-gray-400">Arredondo</span>
            </h1>
            <p className="text-sm md:text-base tracking-widest text-[#ff3300] max-w-md">
              OPERADOR DE CÁMARA // TÉCNICO ESPECIALISTA
            </p>
          </div>

          {/* ID Card / Badge */}
          <div className="inverted p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-8">
              <div className="text-xs font-bold leading-tight">
                IDENTIFICACIÓN
                <br />
                PERSONAL
              </div>
              <div className="text-[10px] bg-black text-white px-2 py-1">OP-CAM</div>
            </div>

            <div className="text-xs space-y-4 mb-8">
              <div>
                <span className="opacity-50">[E]</span> contacto@alejandro-arredondo.com
                <br />
                <span className="opacity-50">[T]</span> +52 55 1234 5678
              </div>
              <div>
                <span className="opacity-50">[A]</span> BASE: CIUDAD DE MÉXICO
                <br />
                <span className="opacity-50">[D]</span> DISPONIBILIDAD: INTERNACIONAL
              </div>
            </div>

            <div className="pt-4 border-t border-black/20 flex justify-between items-end">
              <div className="text-[10px]">
                VALIDADO POR:
                <br />
                <strong>A.A. VISUALS</strong>
              </div>

              {/* Fake Barcode */}
              <div className="flex gap-[2px] h-8 items-end">
                {[1, 3, 1, 2, 4, 1, 1, 3, 2, 1, 4].map((w, i) => (
                  <div
                    key={i}
                    className="bg-black"
                    style={{
                      width: w,
                      height: `${Math.random() * 50 + 50}%`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Marquee Divider */}
        <div className="tech-border-b bg-[#ff3300] text-white overflow-hidden py-1 text-xs font-bold tracking-widest uppercase">
          <div className="animate-marquee">
            <span>
              *** DISPONIBLE PARA PRODUCCIONES EN CINE Y TELEVISIÓN * EQUIPO PROPIO DISPONIBLE * MANEJO DE CÁMARAS ARRI, RED, SONY, PANAVISION * EXPERIENCIA EN SETS DE ALTA PRESIÓN *
            </span>
            <span>
              *** DISPONIBLE PARA PRODUCCIONES EN CINE Y TELEVISIÓN * EQUIPO PROPIO DISPONIBLE * MANEJO DE CÁMARAS ARRI, RED, SONY, PANAVISION * EXPERIENCIA EN SETS DE ALTA PRESIÓN *
            </span>
          </div>
        </div>

        {/* Specs & Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 tech-border-b">
          {/* Spec 1 */}
          <div className="p-6 tech-border-r group hover:inverted transition-colors duration-300">
            <div className="flex justify-between items-center mb-6">
              <div className="text-xs border border-current px-1">MOD.01</div>
              <div className="text-2xl">⌖</div>
            </div>
            <h2 className="text-xl md:text-2xl font-bold mb-4 uppercase">
              Especialista
              <br />
              en Rig
            </h2>
            <p className="text-xs text-gray-400 group-hover:text-gray-700 mb-4 h-24">
              Diseño, montaje y operación de sistemas de estabilización complejos.
              Car mounts, grúas, gimbals y configuraciones personalizadas para tomas
              de alto riesgo o movimiento dinámico.
            </p>
            <div className="text-[10px] space-y-1 font-bold">
              <p>+ STEADICAM / TRINITY</p>
              <p>+ VEHÍCULO RUSO</p>
              <p>+ CABLES CAM</p>
            </div>
          </div>

          {/* Spec 2 */}
          <div className="p-6 tech-border-r group hover:inverted transition-colors duration-300">
            <div className="flex justify-between items-center mb-6">
              <div className="text-xs border border-current px-1">MOD.02</div>
              <div className="text-2xl">⚡</div>
            </div>
            <h2 className="text-xl md:text-2xl font-bold mb-4 uppercase">
              Switcheo
              <br />
              en Vivo
            </h2>
            <p className="text-xs text-gray-400 group-hover:text-gray-700 mb-4 h-24">
              Dirección de cámaras en tiempo real y conmutación para transmisiones
              en vivo, eventos masivos y broadcast. Sincronización precisa y toma
              de decisiones en fracciones de segundo.
            </p>
            <div className="text-[10px] space-y-1 font-bold">
              <p>+ MULTICÁMARA (HASTA 12+)</p>
              <p>+ BLACKMAGIC ATEM</p>
              <p>+ CONTROL DE TALLY</p>
            </div>
          </div>

          {/* Abstract Tech Graphic */}
          <div className="p-6 lg:col-span-2 flex flex-col justify-between bg-[#0a0a0a] relative overflow-hidden">
            <div className="absolute top-4 right-4 text-[10px] text-gray-500">DIAGNOSTIC_CHART</div>

            {/* Grid Pattern Background */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />

            <div className="relative z-10 flex gap-4 h-full">
              {/* Left Column Controls */}
              <div className="w-1/3 flex flex-col justify-between">
                <div className="grid grid-cols-3 gap-1 mb-4">
                  {[...Array(9)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-6 border border-gray-600 flex items-center justify-center text-[8px] ${
                        i === 4 || i === 7
                          ? "bg-[#ff3300] text-white border-[#ff3300]"
                          : ""
                      }`}
                    >
                      {i < 10 ? `0${i}` : i}
                    </div>
                  ))}
                </div>

                <div className="text-[8px] text-gray-500 leading-tight">
                  CALIBRACIÓN DE SENSORES:
                  <br />
                  ÓPTICA: NOMINAL
                  <br />
                  ESTABILIZACIÓN: ACTIVA
                  <br />
                  ENLACE: ESTABLE
                </div>
              </div>

              {/* Right Column Graph */}
              <div className="w-2/3 border border-gray-600 p-2 flex flex-col">
                <div className="flex justify-between text-[10px] mb-2 border-b border-gray-700 pb-1">
                  <span>FREQ. DE ONDA</span>
                  <span>HZ.82</span>
                </div>

                <div className="flex-1 relative flex items-center justify-center border border-gray-800">
                  {/* Abstract sine wave graphic */}
                  <svg
                    viewBox="0 0 100 50"
                    className="w-full h-full stroke-[#ff3300] fill-none"
                    strokeWidth="1"
                  >
                    <path
                      d="M 0 25 Q 25 0, 50 25 T 100 25"
                      className="animate-[pulse_2s_infinite]"
                    />
                    <line
                      x1="0"
                      y1="25"
                      x2="100"
                      y2="25"
                      className="stroke-gray-700 stroke-[0.5]"
                      strokeDasharray="2 2"
                    />
                  </svg>
                  <div className="absolute w-2 h-2 bg-white rounded-full animate-ping" />
                </div>

                {/* Audio visualizer bars */}
                <div className="h-6 mt-2 flex items-end gap-[2px]">
                  {[4, 8, 3, 10, 5, 2, 7, 9, 4, 6, 2, 8, 5, 9, 3, 10, 4, 7].map(
                    (h, i) => (
                      <div
                        key={i}
                        className="bg-gray-400 flex-1"
                        style={{ height: `${h * 10}%`, transition: "height 0.2s" }}
                      />
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Experience Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4">
          <div className="p-6 tech-border-r lg:col-span-1 bg-white text-black">
            <h3 className="text-4xl font-bold uppercase leading-none tracking-tighter mb-2">
              Data
              <br />
              Log
            </h3>
            <p className="text-xs font-bold">EXPERIENCIA EN SET</p>

            <div className="mt-8">
              <div className="text-[10px] border-b border-black pb-1 mb-2 font-bold">
                FILTROS APLICADOS:
              </div>
              <div className="text-xs flex gap-2 mb-2">
                <span className="bg-black text-white px-1">1</span> SERIES DE TV
              </div>
              <div className="text-xs flex gap-2">
                <span className="bg-black text-white px-1">2</span> LARGOMETRAJES
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 grid grid-rows-2">
            <div className="p-4 md:p-6 tech-border-b flex flex-col md:flex-row justify-between items-start md:items-center hover:bg-[#111] transition-colors gap-4">
              <div className="flex gap-4 md:gap-8 w-full md:w-auto">
                <div className="text-center">
                  <div className="text-[10px] text-gray-500 mb-1">CATEGORÍA</div>
                  <div className="text-xl md:text-3xl font-bold uppercase">SERIES</div>
                </div>
                <div className="hidden md:block w-[1px] bg-gray-700" />
                <div>
                  <div className="text-[10px] text-gray-500 mb-1">PROYECTOS RECIENTES</div>
                  <div className="text-sm md:text-base font-bold uppercase">
                    Múltiples Plataformas VOD
                  </div>
                  <div className="text-xs text-gray-400">Netflix, Amazon Prime, HBO Max</div>
                </div>
              </div>
              <div className="flex items-center gap-4 text-right">
                <div className="text-xs text-gray-400 max-w-[150px] hidden md:block">
                  Operador de Cámara A/B, Operador de estabilizadores.
                </div>
                <div className="text-3xl md:text-5xl font-light text-[#ff3300]">S1</div>
              </div>
            </div>

            <div className="p-4 md:p-6 flex flex-col md:flex-row justify-between items-start md:items-center hover:bg-[#111] transition-colors gap-4">
              <div className="flex gap-4 md:gap-8 w-full md:w-auto">
                <div className="text-center">
                  <div className="text-[10px] text-gray-500 mb-1">CATEGORÍA</div>
                  <div className="text-xl md:text-3xl font-bold uppercase">CINE</div>
                </div>
                <div className="hidden md:block w-[1px] bg-gray-700" />
                <div>
                  <div className="text-[10px] text-gray-500 mb-1">PROYECTOS RECIENTES</div>
                  <div className="text-sm md:text-base font-bold uppercase">
                    Largometrajes de Ficción
                  </div>
                  <div className="text-xs text-gray-400">Producciones Nacionales e Int.</div>
                </div>
              </div>
              <div className="flex items-center gap-4 text-right">
                <div className="text-xs text-gray-400 max-w-[150px] hidden md:block">
                  Diseño de rigs complejos, persecuciones, grúa.
                </div>
                <div className="text-3xl md:text-5xl font-light text-white">F2</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Terminal */}
        <div className="tech-border-t p-4 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4 bg-black">
          <div className="flex items-center gap-2">
            <span className="text-[#ff3300]">{">"}</span>
            <span>
              SISTEMA CERRADO. ESPERANDO COMANDOS...
              <span className="animate-blink">_</span>
            </span>
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">
              [ INSTAGRAM ]
            </a>
            <a href="#" className="hover:text-white transition-colors">
              [ IMDB ]
            </a>
            <a href="#" className="hover:text-white transition-colors">
              [ DESCARGAR CV.PDF ]
            </a>
          </div>
          <div>© {new Date().getFullYear()} A. ARREDONDO</div>
        </div>
      </div>
    </div>
  );
};

export default App;
