/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { 
  Play, 
  Tv, 
  Home, 
  Compass, 
  Sparkles, 
  Users, 
  X, 
  Maximize2, 
  ExternalLink, 
  Info, 
  ArrowUp, 
  ArrowDown, 
  ArrowLeft, 
  ArrowRight, 
  CornerDownLeft, 
  HelpCircle,
  FolderOpen,
  Film
} from "lucide-react";
import { 
  MODERN_SEASONS, 
  SEASON_10_CLASSIC_ARCS, 
  SEASON_12_CLASSIC_ARCS, 
  SPINOFFS, 
  SPECIALS, 
  COLLABORATORS 
} from "./data";
import { ShowArc, Episode, SpinOffItem, SpecialItem, SeasonInfo } from "./types";

export default function App() {
  // Navigation states
  const [focusZone, setFocusZone] = useState<"sidebar" | "content" | "modal">("content");
  const [activeSidebar, setActiveSidebar] = useState<number>(0);
  const [activeRow, setActiveRow] = useState<number>(0);
  const [activeCol, setActiveCol] = useState<number>(0);
  
  // Selected detail modal
  const [selectedArc, setSelectedArc] = useState<ShowArc | null>(null);
  const [selectedSpinOff, setSelectedSpinOff] = useState<SpinOffItem | null>(null);
  const [selectedSpecial, setSelectedSpecial] = useState<SpecialItem | null>(null);
  const [selectedSeason, setSelectedSeason] = useState<SeasonInfo | null>(null);
  const [modalFocusedIndex, setModalFocusedIndex] = useState<number>(0); // Options within modal

  // Iframe player stream
  const [playingStream, setPlayingStream] = useState<string | null>(null);

  // References for scrolling lists
  const rowRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const sidebarItems = [
    { id: 0, label: "Série Clássica", icon: Film },
    { id: 1, label: "Série Moderna", icon: Tv },
    { id: 2, label: "Spin-offs", icon: Compass },
    { id: 3, label: "Especiais & Bônus", icon: Sparkles },
    { id: 4, label: "Créditos & QR", icon: Users }
  ];

  // Helper to retrieve rows configuration based on selected sidebar tab
  const getContentRows = () => {
    switch (activeSidebar) {
      case 0: // Série Clássica
        return [
          { name: "Temporada 10 (1973) — Arcos Clássicos", length: SEASON_10_CLASSIC_ARCS.length, type: "classic-s10" },
          { name: "Temporada 12 (1974-1975) — Arcos Clássicos", length: SEASON_12_CLASSIC_ARCS.length, type: "classic-s12" }
        ];
      case 1: // Série Moderna
        return [
          { name: "Série Moderna — Temporadas 1 a 15 (Pastas GDrive)", length: MODERN_SEASONS.length, type: "modern-seasons" },
          { name: "Especiais de 60 Anos (2023)", length: 3, type: "specials-60" } // manual index to Specials
        ];
      case 2: // Spin-offs
        return [
          { name: "Sarah Jane's Alien Files (2010)", length: 1, type: "spinoff-sja" },
          { name: "Torchwood (Temporadas 1 a 4)", length: 1, type: "spinoff-torchwood" }
        ];
      case 3: // Especiais & Extras
        return [
          { name: "Especiais, Reconstruções e Filmes", length: SPECIALS.length, type: "specials" }
        ];
      case 4: // Créditos e QR
        return [
          { name: "Desenvolvimento e Legendagem", length: 1 + COLLABORATORS.length, type: "credits" } // 1 QR card + 5 Collaborators
        ];
      default:
        return [];
    }
  };

  const currentRows = getContentRows();
  const maxRows = currentRows.length;

  // Auto-scroll row containers when active column changes
  useEffect(() => {
    const activeRowId = `row-${activeSidebar}-${activeRow}`;
    const rowEl = rowRefs.current[activeRowId];
    if (rowEl) {
      const activeChild = rowEl.children[activeCol] as HTMLElement;
      if (activeChild) {
        rowEl.scrollTo({
          left: activeChild.offsetLeft - 120,
          behavior: "smooth"
        });
      }
    }
  }, [activeCol, activeRow, activeSidebar]);

  // Handle keyboard events (D-Pad representation)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent scrolling page when interacting with TV UI
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space", "Enter"].includes(e.key)) {
        e.preventDefault();
      }

      triggerActionKey(e.key);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [focusZone, activeSidebar, activeRow, activeCol, modalFocusedIndex, playingStream]);

  // Core navigation processor (shared with Virtual Remote)
  const triggerActionKey = (key: string) => {
    if (playingStream) {
      if (key === "Escape" || key === "Backspace" || key === "Enter") {
        setPlayingStream(null);
      }
      return;
    }

    // Direct Remote Control Buttons for switching tabs (Abas) using 1-5 or Channel Up/Down or Tab
    if (["1", "2", "3", "4", "5"].includes(key)) {
      const idx = parseInt(key) - 1;
      if (idx >= 0 && idx < sidebarItems.length) {
        setActiveSidebar(idx);
        setActiveRow(0);
        setActiveCol(0);
        setFocusZone("content");
        return;
      }
    }

    if (key === "ChannelUp" || key === "Tab") {
      setActiveSidebar(prev => (prev > 0 ? prev - 1 : sidebarItems.length - 1));
      setActiveRow(0);
      setActiveCol(0);
      setFocusZone("content");
      return;
    }

    if (key === "ChannelDown") {
      setActiveSidebar(prev => (prev < sidebarItems.length - 1 ? prev + 1 : 0));
      setActiveRow(0);
      setActiveCol(0);
      setFocusZone("content");
      return;
    }

    // Direct Remote Control Buttons for switching seasons/categories (Temporadas) using Page Up/Down
    if (key === "PageUp") {
      if (maxRows > 0) {
        setActiveRow(prev => (prev > 0 ? prev - 1 : maxRows - 1));
        setActiveCol(0);
        setFocusZone("content");
      }
      return;
    }

    if (key === "PageDown") {
      if (maxRows > 0) {
        setActiveRow(prev => (prev < maxRows - 1 ? prev + 1 : 0));
        setActiveCol(0);
        setFocusZone("content");
      }
      return;
    }

    if (focusZone === "modal") {
      handleModalNavigation(key);
      return;
    }

    if (focusZone === "sidebar") {
      handleSidebarNavigation(key);
    } else if (focusZone === "content") {
      handleContentNavigation(key);
    }
  };

  // Navigation within detailed modals
  const handleModalNavigation = (key: string) => {
    if (key === "Escape" || key === "Backspace") {
      closeAllModals();
      return;
    }

    let optionsCount = 2; // Default: Play, Close
    if (selectedArc) {
      optionsCount = selectedArc.episodes.length + 1; // Episodes list + Close
    } else if (selectedSpinOff) {
      optionsCount = (selectedSpinOff.episodes?.length || 0) + 1;
    } else if (selectedSpecial) {
      optionsCount = (selectedSpecial.episodes?.length || 0) > 0 
        ? (selectedSpecial.episodes?.length || 0) + 1 
        : 2; // URL + Close
    }

    if (key === "ArrowUp") {
      setModalFocusedIndex(prev => (prev > 0 ? prev - 1 : optionsCount - 1));
    } else if (key === "ArrowDown") {
      setModalFocusedIndex(prev => (prev < optionsCount - 1 ? prev + 1 : 0));
    } else if (key === "Enter") {
      triggerModalAction();
    }
  };

  const triggerModalAction = () => {
    if (selectedArc) {
      if (modalFocusedIndex < selectedArc.episodes.length) {
        playVideoUrl(selectedArc.episodes[modalFocusedIndex].url);
      } else {
        closeAllModals();
      }
    } else if (selectedSpinOff) {
      const epCount = selectedSpinOff.episodes?.length || 0;
      if (modalFocusedIndex < epCount) {
        const ep = selectedSpinOff.episodes![modalFocusedIndex];
        // If it's a blogspot, open in a new window, else play
        if (ep.url.includes("blogspot.com")) {
          window.open(ep.url, "_blank");
        } else {
          playVideoUrl(ep.url);
        }
      } else {
        closeAllModals();
      }
    } else if (selectedSpecial) {
      if (modalFocusedIndex === 0) {
        if (selectedSpecial.url) {
          if (selectedSpecial.url.includes("drive.google.com")) {
            playVideoUrl(selectedSpecial.url);
          } else {
            window.open(selectedSpecial.url, "_blank");
          }
        }
      } else {
        closeAllModals();
      }
    } else if (selectedSeason) {
      if (modalFocusedIndex === 0) {
        window.open(selectedSeason.folderUrl, "_blank");
      } else {
        closeAllModals();
      }
    }
  };

  const playVideoUrl = (url: string) => {
    // If it's a folder, open in a new window, not an iframe
    if (url.includes("drive.google.com/drive/folders") || url.includes("blogspot.com")) {
      window.open(url, "_blank");
      return;
    }

    // Convert standard view link to embed preview
    let embedUrl = url;
    if (url.includes("drive.google.com")) {
      embedUrl = url.replace(/\/view\?usp=.*|\/view.*/, "/preview");
    }
    setPlayingStream(embedUrl);
  };

  // Left sidebar navigation
  const handleSidebarNavigation = (key: string) => {
    if (key === "ArrowUp") {
      setActiveSidebar(prev => (prev > 0 ? prev - 1 : sidebarItems.length - 1));
      setActiveRow(0);
      setActiveCol(0);
    } else if (key === "ArrowDown") {
      setActiveSidebar(prev => (prev < sidebarItems.length - 1 ? prev + 1 : 0));
      setActiveRow(0);
      setActiveCol(0);
    } else if (key === "ArrowRight" || key === "Enter") {
      if (currentRows.length > 0) {
        setFocusZone("content");
      }
    }
  };

  // Grid/Carousel navigation
  const handleContentNavigation = (key: string) => {
    if (currentRows.length === 0) return;
    const currentRowSpec = currentRows[activeRow];
    const rowMaxCols = currentRowSpec?.length || 1;

    if (key === "ArrowLeft") {
      if (activeCol === 0) {
        setFocusZone("sidebar");
      } else {
        setActiveCol(prev => prev - 1);
      }
    } else if (key === "ArrowRight") {
      if (activeCol < rowMaxCols - 1) {
        setActiveCol(prev => prev + 1);
      }
    } else if (key === "ArrowUp") {
      if (activeRow > 0) {
        setActiveRow(prev => prev - 1);
        const newRowCols = currentRows[activeRow - 1]?.length || 1;
        if (activeCol >= newRowCols) {
          setActiveCol(newRowCols - 1);
        }
      }
    } else if (key === "ArrowDown") {
      if (activeRow < maxRows - 1) {
        setActiveRow(prev => prev + 1);
        const newRowCols = currentRows[activeRow + 1]?.length || 1;
        if (activeCol >= newRowCols) {
          setActiveCol(newRowCols - 1);
        }
      }
    } else if (key === "Enter") {
      triggerContentSelection();
    }
  };

  const triggerContentSelection = () => {
    const item = getSelectedContentItem();
    if (!item) return;

    setModalFocusedIndex(0);
    setFocusZone("modal");

    if (item.type === "arc") {
      setSelectedArc(item.data as ShowArc);
    } else if (item.type === "spinoff") {
      setSelectedSpinOff(item.data as SpinOffItem);
    } else if (item.type === "special") {
      setSelectedSpecial(item.data as SpecialItem);
    } else if (item.type === "season") {
      setSelectedSeason(item.data as SeasonInfo);
    }
  };

  const closeAllModals = () => {
    setSelectedArc(null);
    setSelectedSpinOff(null);
    setSelectedSpecial(null);
    setSelectedSeason(null);
    setPlayingStream(null);
    setFocusZone("content");
  };

  // Helper mapping active row & active col to correct data object
  const getSelectedContentItem = () => {
    const rowSpec = currentRows[activeRow];
    if (!rowSpec) return null;

    if (rowSpec.type === "classic-s10") {
      return { type: "arc", data: SEASON_10_CLASSIC_ARCS[activeCol] };
    }
    if (rowSpec.type === "classic-s12") {
      return { type: "arc", data: SEASON_12_CLASSIC_ARCS[activeCol] };
    }
    if (rowSpec.type === "modern-seasons") {
      return { type: "season", data: MODERN_SEASONS[activeCol] };
    }
    if (rowSpec.type === "specials-60") {
      // specials 60 years are index 2, 3, 4 of SPECIALS
      return { type: "special", data: SPECIALS[2 + activeCol] };
    }
    if (rowSpec.type === "spinoff-sja") {
      return { type: "spinoff", data: SPINOFFS[0] };
    }
    if (rowSpec.type === "spinoff-torchwood") {
      return { type: "spinoff", data: SPINOFFS[1] };
    }
    if (rowSpec.type === "specials") {
      return { type: "special", data: SPECIALS[activeCol] };
    }
    if (rowSpec.type === "credits") {
      if (activeCol === 0) return { type: "qr", data: null };
      return { type: "collaborator", data: COLLABORATORS[activeCol - 1] };
    }

    return null;
  };

  const activeItem = getSelectedContentItem();

  // Mouse handler to easily select cards
  const selectCardViaMouse = (rowIndex: number, colIndex: number) => {
    setFocusZone("content");
    setActiveRow(rowIndex);
    setActiveCol(colIndex);
    triggerContentSelection();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row relative selection:bg-blue-600 overflow-x-hidden font-sans">
      
      {/* 1. LEFT SIDEBAR (TV Menu Navigation) */}
      <nav 
        id="tv-sidebar"
        className={`w-full md:w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between transition-all duration-300 z-10 p-5 shrink-0 ${
          focusZone === "sidebar" ? "shadow-2xl shadow-blue-900/30 ring-2 ring-blue-500" : ""
        }`}
      >
        <div>
          {/* Logo Brand */}
          <div className="flex items-center space-x-3 mb-8 px-2 py-3">
            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center tardis-glow">
              <span className="font-display font-bold text-xl text-white">D+</span>
            </div>
            <div>
              <h1 className="font-display font-bold text-lg tracking-tight text-white leading-none">DOCTOR+</h1>
              <span className="text-[10px] text-blue-400 font-mono">TV BOX & SMART TV</span>
            </div>
          </div>

          <div className="mb-4 px-2 text-[11px] font-mono tracking-wider text-slate-500 uppercase">
            Menu de Navegação
          </div>

          {/* Nav Items */}
          <div className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isSelected = activeSidebar === item.id;
              const isFocused = focusZone === "sidebar" && isSelected;

              return (
                <button
                  id={`sidebar-item-${item.id}`}
                  key={item.id}
                  onClick={() => {
                    setActiveSidebar(item.id);
                    setActiveRow(0);
                    setActiveCol(0);
                    setFocusZone("content");
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left font-display font-medium text-sm transition-all ${
                    isFocused 
                      ? "bg-blue-600 text-white scale-105 shadow-lg shadow-blue-600/30 ring-2 ring-blue-400" 
                      : isSelected
                        ? "bg-slate-800 text-blue-400 border-l-4 border-blue-500"
                        : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isFocused || isSelected ? "text-white" : "text-slate-400"}`} />
                  <span>{item.label}</span>
                  {isSelected && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Remote Guide Card */}
        <div className="mt-8 p-3 bg-slate-950/50 rounded-xl border border-slate-800">
          <div className="flex items-center space-x-2 text-xs text-blue-400 mb-1">
            <HelpCircle className="w-4 h-4" />
            <span className="font-semibold">Navegação por Controle</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Use as <b>Setas</b> do controle para navegar. Pressione <b>OK (Enter)</b> para confirmar e <b>Voltar (ESC)</b> para fechar os players ou menus.
          </p>
        </div>
      </nav>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-h-screen pb-12 relative overflow-hidden">
        
        {/* Dynamic Interactive TV Hero Banner */}
        <div className="relative w-full h-[320px] md:h-[380px] flex items-end overflow-hidden p-6 md:p-10 border-b border-slate-900">
          <div className="absolute inset-0 bg-slate-950 opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/55 to-transparent z-[1]" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-transparent z-[1]" />
          <div 
            className="absolute inset-0 bg-cover bg-center transition-all duration-700 filter saturate-[0.85]" 
            style={{ 
              backgroundImage: `url('${
                activeSidebar === 1 ? "https://files.catbox.moe/u6yu9c.png" : "https://files.catbox.moe/ebpbci.jpeg"
              }')` 
            }}
          />

          <div className="relative z-[2] max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-blue-950/80 border border-blue-800 text-blue-300 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase mb-4 tracking-wider">
              <Sparkles className="w-3.5 h-3.5 animate-pulse text-blue-400" />
              <span>{activeSidebar === 0 ? "SÉRIE CLÁSSICA" : activeSidebar === 1 ? "SÉRIE MODERNA" : "UNIVERSO DOCTOR+"}</span>
            </div>

            {activeItem && activeItem.data ? (
              <div>
                <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight leading-none mb-2">
                  {(activeItem.data as any).title || `${(activeItem.data as any).number}ª Temporada`}
                </h2>
                {(activeItem.data as any).originalTitle && (
                  <p className="text-sm font-mono text-slate-400 mb-3">
                    Título original: <span className="text-blue-300">{(activeItem.data as any).originalTitle}</span>
                  </p>
                )}
                <p className="text-xs md:text-sm text-slate-300 max-w-2xl font-light line-clamp-3 leading-relaxed mb-4">
                  {(activeItem.data as any).summary || (activeItem.data as any).description || "Navegue pelo conteúdo selecionado e abra diretamente no Google Drive para assistir em alta definição com legendas em português."}
                </p>
              </div>
            ) : (
              <div>
                <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight mb-2">
                  A Revolução Doctor+
                </h2>
                <p className="text-sm text-slate-300 max-w-2xl font-light leading-relaxed mb-4">
                  Selecione os arcos da série clássica, navegue pelas 15 temporadas completas da série moderna, ou assista aos spin-offs Torchwood e Sarah Jane! Tudo com legendas em português brasileiras.
                </p>
              </div>
            )}

            <div className="flex items-center space-x-3 text-xs text-slate-400 font-mono">
              <span className="bg-slate-800/80 px-2 py-0.5 rounded text-slate-300 font-bold">100% GRATUITO</span>
              <span>•</span>
              <span>SEM ANÚNCIOS</span>
              <span>•</span>
              <span className="text-blue-400 font-bold">LEGENDA PT-BR</span>
            </div>
          </div>
        </div>

        {/* Carousel lists for current active tab */}
        <div className="p-6 md:p-8 space-y-8">
          {currentRows.map((rowSpec, rowIndex) => {
            return (
              <div key={rowSpec.type} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-base md:text-lg text-white flex items-center space-x-2">
                    <span className="w-1.5 h-5 bg-blue-500 rounded-full inline-block mr-2"></span>
                    {rowSpec.name}
                  </h3>
                  <span className="text-xs font-mono text-slate-500">
                    Linha {rowIndex + 1} de {currentRows.length}
                  </span>
                </div>

                <div 
                  ref={el => { rowRefs.current[`row-${activeSidebar}-${rowIndex}`] = el; }}
                  className="flex space-x-4 overflow-x-auto no-scrollbar py-2"
                >
                  {/* RENDER ITEMS OF THE ROW */}
                  {rowSpec.type === "classic-s10" && SEASON_10_CLASSIC_ARCS.map((arc, colIdx) => {
                    const isFocused = focusZone === "content" && activeRow === rowIndex && activeCol === colIdx;
                    return (
                      <div
                        key={arc.id}
                        onClick={() => selectCardViaMouse(rowIndex, colIdx)}
                        className={`min-w-[260px] md:min-w-[320px] bg-slate-900 rounded-xl overflow-hidden border border-slate-800 transition-all cursor-pointer ${
                          isFocused 
                            ? "scale-105 border-blue-500 ring-2 ring-blue-500 shadow-xl shadow-blue-500/20 bg-slate-850" 
                            : "hover:border-slate-700"
                        }`}
                      >
                        <div className="h-36 bg-slate-850 relative">
                          <img src={arc.poster} alt={arc.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          <div className="absolute top-2 left-2 bg-blue-600 text-white text-[9px] font-mono px-2 py-0.5 rounded font-bold uppercase">
                            {arc.episodes.length} PARTES
                          </div>
                        </div>
                        <div className="p-4">
                          <h4 className="font-display font-semibold text-white text-sm line-clamp-1">{arc.title}</h4>
                          <span className="text-[11px] font-mono text-blue-400 block mt-0.5">{arc.originalTitle}</span>
                          <p className="text-xs text-slate-400 mt-2 line-clamp-2">{arc.summary}</p>
                        </div>
                      </div>
                    );
                  })}

                  {rowSpec.type === "classic-s12" && SEASON_12_CLASSIC_ARCS.map((arc, colIdx) => {
                    const isFocused = focusZone === "content" && activeRow === rowIndex && activeCol === colIdx;
                    return (
                      <div
                        key={arc.id}
                        onClick={() => selectCardViaMouse(rowIndex, colIdx)}
                        className={`min-w-[260px] md:min-w-[320px] bg-slate-900 rounded-xl overflow-hidden border border-slate-800 transition-all cursor-pointer ${
                          isFocused 
                            ? "scale-105 border-blue-500 ring-2 ring-blue-500 shadow-xl shadow-blue-500/20 bg-slate-850" 
                            : "hover:border-slate-700"
                        }`}
                      >
                        <div className="h-36 bg-slate-850 relative">
                          <img src={arc.poster} alt={arc.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          <div className="absolute top-2 left-2 bg-red-600 text-white text-[9px] font-mono px-2 py-0.5 rounded font-bold uppercase">
                            {arc.episodes.length === 1 ? "FILME COMPLETO" : `${arc.episodes.length} PARTES`}
                          </div>
                        </div>
                        <div className="p-4">
                          <h4 className="font-display font-semibold text-white text-sm line-clamp-1">{arc.title}</h4>
                          <span className="text-[11px] font-mono text-blue-400 block mt-0.5">{arc.originalTitle}</span>
                          <p className="text-xs text-slate-400 mt-2 line-clamp-2">{arc.summary}</p>
                        </div>
                      </div>
                    );
                  })}

                  {rowSpec.type === "modern-seasons" && MODERN_SEASONS.map((season, colIdx) => {
                    const isFocused = focusZone === "content" && activeRow === rowIndex && activeCol === colIdx;
                    return (
                      <div
                        key={season.number}
                        onClick={() => selectCardViaMouse(rowIndex, colIdx)}
                        className={`min-w-[140px] bg-slate-900 border border-slate-800 rounded-xl overflow-hidden cursor-pointer transition-all ${
                          isFocused 
                            ? "scale-105 border-blue-500 ring-2 ring-blue-500 shadow-xl shadow-blue-500/20 bg-slate-850" 
                            : "hover:border-slate-700"
                        }`}
                      >
                        <div className="h-28 bg-gradient-to-br from-blue-950 to-slate-900 flex items-center justify-center relative p-2 text-center">
                          <img 
                            src={season.number === 15 ? "https://files.catbox.moe/u6yu9c.png" : "https://files.catbox.moe/ebpbci.jpeg"} 
                            alt="Modern Season" 
                            className="absolute inset-0 w-full h-full object-cover opacity-25" 
                            referrerPolicy="no-referrer" 
                          />
                          <div className="relative z-10">
                            <span className="text-3xl font-display font-extrabold text-blue-400 block">{season.number}ª</span>
                            <span className="text-[9px] font-mono text-slate-300">TEMPORADA</span>
                          </div>
                        </div>
                        <div className="p-2 text-center bg-slate-950 border-t border-slate-800">
                          <span className="text-[10px] font-mono text-slate-400">{season.year}</span>
                        </div>
                      </div>
                    );
                  })}

                  {rowSpec.type === "specials-60" && [0, 1, 2].map((idx) => {
                    const spec = SPECIALS[2 + idx]; // Index mapping to specials (The Star Beast, Blue Yonder, The Giggle)
                    const isFocused = focusZone === "content" && activeRow === rowIndex && activeCol === idx;
                    return (
                      <div
                        key={spec.id}
                        onClick={() => selectCardViaMouse(rowIndex, idx)}
                        className={`min-w-[240px] md:min-w-[280px] bg-slate-900 border border-slate-800 rounded-xl overflow-hidden cursor-pointer transition-all ${
                          isFocused 
                            ? "scale-105 border-blue-500 ring-2 ring-blue-500 shadow-xl shadow-blue-500/20 bg-slate-850" 
                            : "hover:border-slate-700"
                        }`}
                      >
                        <div className="h-36 bg-slate-850 relative">
                          <img src={spec.poster} alt={spec.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          <div className="absolute top-2 left-2 bg-blue-600 text-white text-[9px] font-mono px-2 py-0.5 rounded font-bold uppercase">
                            ESPECIAL 60 ANOS
                          </div>
                        </div>
                        <div className="p-3">
                          <h4 className="font-display font-semibold text-white text-sm line-clamp-1">{spec.title}</h4>
                          <p className="text-xs text-slate-400 mt-1 line-clamp-2">{spec.description}</p>
                        </div>
                      </div>
                    );
                  })}

                  {rowSpec.type === "spinoff-sja" && (
                    <div
                      onClick={() => selectCardViaMouse(rowIndex, 0)}
                      className={`min-w-[300px] md:min-w-[420px] bg-slate-900 rounded-xl overflow-hidden border border-slate-800 transition-all cursor-pointer flex ${
                        focusZone === "content" && activeRow === rowIndex && activeCol === 0
                          ? "scale-105 border-blue-500 ring-2 ring-blue-500 shadow-xl shadow-blue-500/20 bg-slate-850"
                          : "hover:border-slate-700"
                      }`}
                    >
                      <div className="w-1/3 bg-slate-850 relative">
                        <img src="https://files.catbox.moe/9ia7ps.png" alt="Sarah Jane Files" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="w-2/3 p-4 flex flex-col justify-between">
                        <div>
                          <h4 className="font-display font-semibold text-white text-sm">Sarah Jane's Alien Files</h4>
                          <span className="text-[10px] font-mono text-slate-400 block mt-1">Spin-off de: The Sarah Jane Adventures (6 Episódios)</span>
                          <p className="text-xs text-slate-400 mt-2 line-clamp-3">Conheça tudo sobre os piores vilões extraterrestres através de arquivos secretos de inteligência!</p>
                        </div>
                        <div className="flex items-center space-x-1.5 text-xs text-blue-400 font-semibold mt-2">
                          <Play className="w-3.5 h-3.5" />
                          <span>Selecionar Episódios</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {rowSpec.type === "spinoff-torchwood" && (
                    <div
                      onClick={() => selectCardViaMouse(rowIndex, 0)}
                      className={`min-w-[300px] md:min-w-[420px] bg-slate-900 rounded-xl overflow-hidden border border-slate-800 transition-all cursor-pointer flex ${
                        focusZone === "content" && activeRow === rowIndex && activeCol === 0
                          ? "scale-105 border-blue-500 ring-2 ring-blue-500 shadow-xl shadow-blue-500/20 bg-slate-850"
                          : "hover:border-slate-700"
                      }`}
                    >
                      <div className="w-1/3 bg-slate-850 relative">
                        <img src="https://files.catbox.moe/hnixyi.png" alt="Torchwood" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="w-2/3 p-4 flex flex-col justify-between">
                        <div>
                          <h4 className="font-display font-semibold text-white text-sm">Torchwood (Temporadas 1 a 4)</h4>
                          <span className="text-[10px] font-mono text-slate-400 block mt-1">Série Completa Legendada</span>
                          <p className="text-xs text-slate-400 mt-2 line-clamp-3">A lendária divisão secreta encarregada de defender Cardiff de anomalias temporais.</p>
                        </div>
                        <div className="flex items-center space-x-1.5 text-xs text-blue-400 font-semibold mt-2">
                          <FolderOpen className="w-3.5 h-3.5" />
                          <span>Abrir Temporadas</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {rowSpec.type === "specials" && SPECIALS.map((spec, colIdx) => {
                    const isFocused = focusZone === "content" && activeRow === rowIndex && activeCol === colIdx;
                    return (
                      <div
                        key={spec.id}
                        onClick={() => selectCardViaMouse(rowIndex, colIdx)}
                        className={`min-w-[200px] md:min-w-[240px] bg-slate-900 border border-slate-800 rounded-xl overflow-hidden cursor-pointer transition-all ${
                          isFocused 
                            ? "scale-105 border-blue-500 ring-2 ring-blue-500 shadow-xl shadow-blue-500/20 bg-slate-850" 
                            : "hover:border-slate-700"
                        }`}
                      >
                        <div className="h-36 bg-slate-850 relative">
                          <img src={spec.poster} alt={spec.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          {spec.year && (
                            <div className="absolute bottom-2 right-2 bg-slate-950/80 text-blue-300 text-[9px] font-mono px-2 py-0.5 rounded">
                              {spec.year}
                            </div>
                          )}
                        </div>
                        <div className="p-3">
                          <h4 className="font-display font-semibold text-white text-sm line-clamp-1">{spec.title}</h4>
                          <p className="text-xs text-slate-400 mt-1 line-clamp-2">{spec.description}</p>
                        </div>
                      </div>
                    );
                  })}

                  {rowSpec.type === "credits" && (
                    <>
                      {/* Desktop QR Code Card */}
                      <div
                        onClick={() => selectCardViaMouse(rowIndex, 0)}
                        className={`min-w-[260px] md:min-w-[300px] bg-slate-900 rounded-xl p-4 border border-slate-800 transition-all cursor-pointer flex flex-col justify-between ${
                          focusZone === "content" && activeRow === rowIndex && activeCol === 0
                            ? "scale-105 border-blue-500 ring-2 ring-blue-500 shadow-xl bg-slate-850"
                            : "hover:border-slate-700"
                        }`}
                      >
                        <div className="flex items-center space-x-2.5">
                          <div className="p-2 rounded bg-blue-950 text-blue-400 shrink-0">
                            <Maximize2 className="w-5 h-5 animate-pulse" />
                          </div>
                          <div>
                            <h4 className="font-display font-semibold text-white text-xs">Acesse no Desktop</h4>
                            <p className="text-[10px] text-slate-400">Escaneie o código QR</p>
                          </div>
                        </div>

                        <div className="my-3 flex items-center justify-center bg-white p-2 rounded-lg self-center">
                          <img 
                            src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&color=090d16&data=https://doctor-1058607760161.us-east1.run.app" 
                            alt="QR Link"
                            className="w-20 h-20"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        <p className="text-[9px] text-slate-400 text-center font-mono break-all select-all">
                          doctor-1058607760161.us-east1.run.app
                        </p>
                      </div>

                      {/* Collaborators Cards */}
                      {COLLABORATORS.map((collab, idx) => {
                        const isFocused = focusZone === "content" && activeRow === rowIndex && activeCol === idx + 1;
                        return (
                          <div
                            key={collab.name}
                            onClick={() => selectCardViaMouse(rowIndex, idx + 1)}
                            className={`min-w-[180px] bg-slate-900 p-4 border border-slate-800 rounded-xl flex flex-col justify-between transition-all cursor-pointer ${
                              isFocused 
                                ? "scale-105 border-blue-500 ring-2 ring-blue-500 shadow-xl bg-slate-850" 
                                : "hover:border-slate-700"
                            }`}
                          >
                            <div className="text-blue-500 mb-2">
                              <Users className="w-6 h-6" />
                            </div>
                            <div>
                              <h4 className="font-display font-semibold text-white text-xs leading-tight">{collab.name}</h4>
                              <span className="text-[10px] font-mono text-slate-400 block mt-1">{collab.role}</span>
                            </div>
                          </div>
                        );
                      })}
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </main>

      {/* 3. DYNAMIC DETAIL & EPISODE SELECTOR MODAL (TV FRIENDLY) */}
      {(selectedArc || selectedSpinOff || selectedSpecial || selectedSeason) && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-40 transition-opacity duration-300">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            
            {/* Header poster + title */}
            <div className="relative h-40 md:h-48 bg-slate-950 flex items-end p-5 shrink-0">
              <img 
                src={
                  selectedArc?.poster || 
                  selectedSpinOff?.poster || 
                  selectedSpecial?.poster || 
                  "https://files.catbox.moe/u6yu9c.png"
                } 
                alt="Banner" 
                className="absolute inset-0 w-full h-full object-cover opacity-25" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
              <button 
                onClick={closeAllModals}
                className="absolute top-4 right-4 bg-slate-800/80 hover:bg-slate-700 text-slate-300 p-2 rounded-full border border-slate-700 transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative z-10">
                <span className="text-xs font-mono text-blue-400 uppercase tracking-widest block mb-1">
                  {selectedArc ? "Série Clássica" : selectedSpinOff ? "Spin-off" : selectedSpecial ? "Especial" : "Série Moderna"}
                </span>
                <h3 className="text-xl md:text-2xl font-display font-bold text-white leading-none">
                  {selectedArc?.title || selectedSpinOff?.title || selectedSpecial?.title || `${selectedSeason?.number}ª Temporada (Série Moderna)`}
                </h3>
                {selectedArc?.originalTitle && (
                  <p className="text-xs text-blue-300 font-mono mt-1">
                    {selectedArc.originalTitle}
                  </p>
                )}
              </div>
            </div>

            {/* Scrollable details */}
            <div className="p-5 overflow-y-auto space-y-4 text-sm text-slate-300 flex-1">
              <p className="font-light text-slate-300">
                {selectedArc?.detailedSummary || selectedSpinOff?.description || selectedSpecial?.description || "Pasta contendo todos os episódios completos da respectiva temporada da série moderna com legendas em português. Selecione abrir para visualizar no Google Drive."}
              </p>

              {selectedArc?.firstAired && (
                <div className="text-[11px] font-mono text-slate-500">
                  Transmissão original: <span className="text-slate-300">{selectedArc.firstAired}</span>
                </div>
              )}

              {/* Action/Episode options */}
              <div className="space-y-2 mt-4 pt-4 border-t border-slate-800">
                <span className="text-xs font-mono tracking-wider text-slate-400 block uppercase mb-2 font-semibold">
                  Opções de Reprodução:
                </span>

                {/* Arc Episódios */}
                {selectedArc?.episodes.map((ep, idx) => {
                  const isItemFocused = modalFocusedIndex === idx;
                  return (
                    <button
                      key={ep.id}
                      onClick={() => playVideoUrl(ep.url)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all ${
                        isItemFocused 
                          ? "bg-blue-600 text-white translate-x-2 font-semibold ring-2 ring-blue-400 shadow-md" 
                          : "bg-slate-950 hover:bg-slate-850 text-slate-300 border border-slate-850"
                      }`}
                    >
                      <Play className="w-4 h-4 text-blue-400 shrink-0" />
                      <div className="flex-1 truncate">
                        <span>{ep.title}</span>
                      </div>
                      {isItemFocused && <span className="text-[10px] font-mono bg-blue-700 text-blue-100 px-1.5 py-0.5 rounded">FOCADO</span>}
                    </button>
                  );
                })}

                {/* Spin-off Episódios */}
                {selectedSpinOff?.episodes?.map((ep, idx) => {
                  const isItemFocused = modalFocusedIndex === idx;
                  return (
                    <button
                      key={ep.id}
                      onClick={() => {
                        if (ep.url.includes("blogspot.com")) {
                          window.open(ep.url, "_blank");
                        } else {
                          playVideoUrl(ep.url);
                        }
                      }}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all ${
                        isItemFocused 
                          ? "bg-blue-600 text-white translate-x-2 font-semibold ring-2 ring-blue-400 shadow-md" 
                          : "bg-slate-950 hover:bg-slate-850 text-slate-300 border border-slate-850"
                      }`}
                    >
                      {ep.url.includes("blogspot.com") ? (
                        <ExternalLink className="w-4 h-4 text-blue-400 shrink-0" />
                      ) : (
                        <Play className="w-4 h-4 text-blue-400 shrink-0" />
                      )}
                      <div className="flex-1 truncate">
                        <span>{ep.title}</span>
                        {ep.url.includes("blogspot.com") && <span className="text-[9px] text-slate-400 ml-2">(Link Externo)</span>}
                      </div>
                      {isItemFocused && <span className="text-[10px] font-mono bg-blue-700 text-blue-100 px-1.5 py-0.5 rounded">FOCADO</span>}
                    </button>
                  );
                })}

                {/* Special Link */}
                {selectedSpecial && !selectedSpecial.episodes && (
                  <button
                    onClick={() => {
                      if (selectedSpecial.url) {
                        if (selectedSpecial.url.includes("drive.google.com")) {
                          playVideoUrl(selectedSpecial.url);
                        } else {
                          window.open(selectedSpecial.url, "_blank");
                        }
                      }
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all ${
                      modalFocusedIndex === 0 
                        ? "bg-blue-600 text-white translate-x-2 font-semibold ring-2 ring-blue-400 shadow-md" 
                        : "bg-slate-950 hover:bg-slate-850 text-slate-300 border border-slate-850"
                    }`}
                  >
                    {selectedSpecial.url?.includes("drive.google.com") ? (
                      <Play className="w-4 h-4 text-blue-400 shrink-0" />
                    ) : (
                      <ExternalLink className="w-4 h-4 text-blue-400 shrink-0" />
                    )}
                    <div className="flex-1 truncate">
                      <span>Assistir Especial / Reconstrução</span>
                    </div>
                    {modalFocusedIndex === 0 && <span className="text-[10px] font-mono bg-blue-700 text-blue-100 px-1.5 py-0.5 rounded">FOCADO</span>}
                  </button>
                )}

                {/* Season Link */}
                {selectedSeason && (
                  <button
                    onClick={() => window.open(selectedSeason.folderUrl, "_blank")}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all ${
                      modalFocusedIndex === 0 
                        ? "bg-blue-600 text-white translate-x-2 font-semibold ring-2 ring-blue-400 shadow-md" 
                        : "bg-slate-950 hover:bg-slate-850 text-slate-300 border border-slate-850"
                    }`}
                  >
                    <FolderOpen className="w-4 h-4 text-blue-400 shrink-0" />
                    <div className="flex-1 truncate">
                      <span>Abrir Pasta Completa da {selectedSeason.number}ª Temporada no Google Drive</span>
                    </div>
                    {modalFocusedIndex === 0 && <span className="text-[10px] font-mono bg-blue-700 text-blue-100 px-1.5 py-0.5 rounded">FOCADO</span>}
                  </button>
                )}

                {/* Close Option */}
                <button
                  onClick={closeAllModals}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all mt-4 ${
                    modalFocusedIndex === (
                      selectedArc 
                        ? selectedArc.episodes.length 
                        : selectedSpinOff 
                          ? (selectedSpinOff.episodes?.length || 0) 
                          : 1
                    )
                      ? "bg-slate-800 text-white ring-2 ring-slate-600" 
                      : "bg-slate-900/40 text-slate-400 hover:text-white"
                  }`}
                >
                  <X className="w-4 h-4 shrink-0" />
                  <span>Fechar Detalhes</span>
                </button>

              </div>
            </div>

          </div>
        </div>
      )}

      {/* 4. FULLSCREEN CINEMATIC TV PLAYER OVERLAY */}
      {playingStream && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col justify-between p-4">
          
          {/* Custom TV stream header with close instructions */}
          <div className="flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent p-4 absolute top-0 left-0 right-0 z-10">
            <div className="flex items-center space-x-3">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
              <h4 className="font-display font-bold text-sm tracking-wide text-white uppercase">Reproduzindo no Player Nativo (Google Drive)</h4>
            </div>
            
            <button
              onClick={() => setPlayingStream(null)}
              className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white font-bold font-display px-4 py-2 rounded-lg border border-red-500 shadow-lg shadow-red-600/30 transition-transform hover:scale-105"
            >
              <X className="w-4 h-4" />
              <span className="text-xs">Fechar Player (Voltar)</span>
            </button>
          </div>

          {/* Fully standard iframe using Drive's official fast viewer */}
          <div className="flex-1 w-full h-full relative bg-slate-950 mt-12 mb-4">
            <iframe
              src={playingStream}
              className="w-full h-full rounded-lg border border-slate-800 shadow-2xl"
              allow="autoplay; fullscreen"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Quick TV Box assistance guidelines */}
          <div className="text-center text-[11px] text-slate-500 font-mono py-1">
            Dica para TV Box: Se o controle remoto não conseguir focar nos botões internos do player, pressione o botão <b>Voltar / Back</b> ou clique no botão superior.
          </div>
        </div>
      )}

      {/* 5. VIRTUAL D-PAD TV REMOTE CONTROL (For easy desktop testing of the TV interface!) */}
      <div className="fixed bottom-6 right-6 z-30 bg-slate-900/95 border-2 border-slate-700 p-4 rounded-3xl shadow-2xl w-48 text-center hidden xl:flex flex-col items-center select-none backdrop-blur">
        <div className="flex items-center justify-center space-x-1.5 mb-3 border-b border-slate-800 pb-2 w-full">
          <Tv className="w-4 h-4 text-blue-400" />
          <span className="font-display font-bold text-xs text-slate-300">Controle Virtual</span>
        </div>

        {/* Dynamic focus zone state feedback */}
        <div className="text-[10px] font-mono text-slate-500 mb-4 uppercase">
          Foco: <span className="text-blue-400 font-bold">{focusZone}</span>
        </div>

        {/* Layout of D-Pad arrows */}
        <div className="relative w-28 h-28 flex items-center justify-center mb-4">
          <div className="absolute inset-0 rounded-full bg-slate-950 border border-slate-800" />
          
          <button 
            onClick={() => triggerActionKey("ArrowUp")}
            className="absolute top-1 p-2 rounded-full bg-slate-800 hover:bg-blue-600 text-white transition active:scale-95 border border-slate-700"
            title="Cima"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
          
          <button 
            onClick={() => triggerActionKey("ArrowLeft")}
            className="absolute left-1 p-2 rounded-full bg-slate-800 hover:bg-blue-600 text-white transition active:scale-95 border border-slate-700"
            title="Esquerda"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          {/* Central SELECT / ENTER Button */}
          <button 
            onClick={() => triggerActionKey("Enter")}
            className="z-10 w-11 h-11 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition active:scale-90 border-2 border-blue-400 flex items-center justify-center shadow-lg shadow-blue-600/50"
            title="Confirmar (OK)"
          >
            OK
          </button>
          
          <button 
            onClick={() => triggerActionKey("ArrowRight")}
            className="absolute right-1 p-2 rounded-full bg-slate-800 hover:bg-blue-600 text-white transition active:scale-95 border border-slate-700"
            title="Direita"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <button 
            onClick={() => triggerActionKey("ArrowDown")}
            className="absolute bottom-1 p-2 rounded-full bg-slate-800 hover:bg-blue-600 text-white transition active:scale-95 border border-slate-700"
            title="Baixo"
          >
            <ArrowDown className="w-4 h-4" />
          </button>
        </div>

        {/* Back, exit, and quick direct control functions */}
        <div className="grid grid-cols-2 gap-2 w-full border-t border-slate-800 pt-3">
          <button
            onClick={() => triggerActionKey("Backspace")}
            className="flex flex-col items-center justify-center bg-slate-850 hover:bg-red-950 text-slate-300 rounded-xl py-1.5 border border-slate-800 transition active:scale-95"
            title="Voltar"
          >
            <span className="text-[10px] font-mono text-slate-500">Voltar</span>
            <span className="text-[11px] font-bold text-red-400">BACK</span>
          </button>

          <button
            onClick={() => {
              setFocusZone("sidebar");
              setActiveRow(0);
              setActiveCol(0);
            }}
            className="flex flex-col items-center justify-center bg-slate-850 hover:bg-blue-950 text-slate-300 rounded-xl py-1.5 border border-slate-800 transition active:scale-95"
            title="Menu Principal"
          >
            <span className="text-[10px] font-mono text-slate-500">Menu</span>
            <span className="text-[11px] font-bold text-blue-400">MENU</span>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2 w-full mt-2">
          <button
            onClick={() => triggerActionKey("ChannelDown")}
            className="flex flex-col items-center justify-center bg-slate-850 hover:bg-indigo-950 text-slate-300 rounded-xl py-1.5 border border-slate-800 transition active:scale-95"
            title="Próxima Aba"
          >
            <span className="text-[10px] font-mono text-slate-500">Mudar Aba</span>
            <span className="text-[11px] font-bold text-indigo-400">ABA ↻</span>
          </button>

          <button
            onClick={() => triggerActionKey("PageDown")}
            className="flex flex-col items-center justify-center bg-slate-850 hover:bg-emerald-950 text-slate-300 rounded-xl py-1.5 border border-slate-800 transition active:scale-95"
            title="Mudar Temporada / Linha"
          >
            <span className="text-[10px] font-mono text-slate-500">Temporada</span>
            <span className="text-[11px] font-bold text-emerald-400">TEMP ↻</span>
          </button>
        </div>
      </div>

    </div>
  );
}
