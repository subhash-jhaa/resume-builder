import React, { useState, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
} from '@dnd-kit/core';
import {
  arrayMove,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { Sun, Moon, Eye, Trash2, Menu, Settings } from 'lucide-react';
import { BLOCK_DEFINITIONS } from './dashboard/data/blockDefs';
import Palette from './dashboard/components/Palette';
import Canvas from './dashboard/components/Canvas';
import ConfigPanel from './dashboard/components/ConfigPanel';
import PreviewModal from './dashboard/components/PreviewModal';
import LandingPage from './landing/LandingPage';

const STORAGE_KEY = 'resume-builder-blocks';

const dropAnimationConfig = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: { active: { opacity: '0.4' } },
  }),
};

function App() {
  const [blocks, setBlocks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      // Filter out any blocks whose types are no longer in our definitions
      // This prevents crashes when block definitions are changed or reverted
      return Array.isArray(parsed) 
        ? parsed.filter(block => BLOCK_DEFINITIONS[block.type]) 
        : [];
    } catch { return []; }
  });

  const [selectedId, setSelectedId] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [isLightMode, setIsLightMode] = useState(() => {
    return localStorage.getItem('resume-theme') === 'light';
  });
  const [activeType, setActiveType] = useState(null);
  const [overIndex, setOverIndex] = useState(-1);
  const [hasStarted, setHasStarted] = useState(false);
  const [showPalette, setShowPalette] = useState(false);
  const [showConfig, setShowConfig] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('light', isLightMode);
    localStorage.setItem('resume-theme', isLightMode ? 'light' : 'dark');
  }, [isLightMode]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(blocks));
  }, [blocks]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragStart = ({ active }) => {
    if (active.data.current?.isPaletteItem) {
      setActiveType(active.data.current.type);
    }
  };

  const handleDragOver = ({ active, over }) => {
    // Only handled preview positioning for palette items
    if (!active.data.current?.isPaletteItem) {
      setOverIndex(-1);
      return;
    }
    
    if (!over) { setOverIndex(-1); return; }
    
    let index = blocks.findIndex(b => b.id === over.id);
    if (index === -1) index = blocks.length;
    setOverIndex(index);
  };

  const handleDragEnd = ({ active, over }) => {
    setActiveType(null);
    setOverIndex(-1);

    if (!over) return;

    if (active.data.current?.isPaletteItem) {
      const type = active.data.current.type;
      const newBlock = {
        id: crypto.randomUUID(),
        type,
        data: { ...BLOCK_DEFINITIONS[type].defaultData }
      };
      let insertIndex = blocks.findIndex(b => b.id === over.id);
      if (insertIndex === -1) insertIndex = blocks.length;
      const newBlocks = [...blocks];
      newBlocks.splice(insertIndex, 0, newBlock);
      setBlocks(newBlocks);
      setSelectedId(newBlock.id);
      return;
    }

    if (active.id !== over.id) {
      const oldIndex = blocks.findIndex(b => b.id === active.id);
      const newIndex = blocks.findIndex(b => b.id === over.id);
      setBlocks(arrayMove(blocks, oldIndex, newIndex));
    }
  };


  const handleRemove = (id) => {
    setBlocks(blocks.filter(b => b.id !== id));
    if (selectedId === id) setSelectedId(null);
  }

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all sections? This cannot be undone.')) {
      setBlocks([]);
      setSelectedId(null);
    }
  };

  const handleUpdate = (id, partialData) => {
    setBlocks(prev => prev.map(b =>
      b.id === id ? { ...b, data: { ...b.data, ...partialData } } : b
    ));
  };

  const selectedBlock = blocks.find(b => b.id === selectedId);
  const activeDef = activeType ? BLOCK_DEFINITIONS[activeType] : null;

  if (!hasStarted) {
    return (
      <LandingPage 
        onStart={() => setHasStarted(true)} 
        isLightMode={isLightMode}
        onToggleTheme={() => setIsLightMode(!isLightMode)}
      />
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex h-screen overflow-hidden relative font-sans bg-bg-base text-text-1">
        {/* Mobile Backdrop */}
        {(showPalette || showConfig) && (
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[40] transition-opacity duration-300 lg:hidden"
            onClick={() => { setShowPalette(false); setShowConfig(false); }}
          />
        )}

        <div className={`fixed inset-y-0 left-0 z-[50] w-[260px] transform lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out ${showPalette ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
          <Palette onClearAll={handleClearAll} />
        </div>

        <div className="flex flex-col flex-1 h-screen overflow-hidden min-w-0 bg-bg-base">
          {/* Top Header Bar */}
          <header className="h-[56px] bg-bg-overlay backdrop-blur-md border-b border-border px-4 lg:px-5 flex items-center justify-between gap-3 shrink-0 z-10">
            <div className="flex items-center gap-2 lg:gap-3">
              <button 
                onClick={() => setShowPalette(!showPalette)}
                className="lg:hidden w-8 h-8 flex items-center justify-center text-text-2 hover:bg-bg-elevated rounded-md"
              >
                <Menu size={20} />
              </button>
              
              <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => setHasStarted(false)}>
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shrink-0">
                  <svg viewBox="0 0 24 26" fill="none" width="18" height="18">
                    <path d="M6 2h8l6 6v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" fill="white" fillOpacity="0.35" stroke="white" strokeWidth="1.8" />
                    <path d="M14 2v6h6" stroke="white" strokeWidth="1.8" />
                    <line x1="8" y1="13" x2="16" y2="13" stroke="white" strokeWidth="2" />
                  </svg>
                </div>
                <span className="hidden sm:inline text-base font-bold tracking-tight text-text-1">Resume<span className="text-blue-500">Builder</span></span>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-2 flex-1 justify-center">
              <span className="text-[12px] text-text-2 bg-bg-elevated border border-border py-0.5 px-2.5 rounded-full font-medium">
                {blocks.length} sections
              </span>
              {selectedBlock && (
                <span className="text-[12px] text-blue-500 bg-blue-500/10 border border-blue-500/30 py-0.5 px-2.5 rounded-full font-medium truncate max-w-[150px]">
                  Editing: {BLOCK_DEFINITIONS[selectedBlock.type]?.label}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button 
                className="h-[34px] px-3 bg-gradient-to-br from-blue-500 to-blue-600 border-none rounded-md text-white text-[13px] font-semibold flex items-center gap-2 cursor-pointer transition-all hover:brightness-110 shadow-lg" 
                onClick={() => setShowPreview(true)}
              >
                <Eye size={14} strokeWidth={2} />
                <span className="hidden xs:inline">Preview</span>
              </button>

              {selectedId && (
                <button 
                  onClick={() => setShowConfig(!showConfig)}
                  className="lg:hidden w-8 h-8 flex items-center justify-center bg-bg-elevated border border-border text-text-2 hover:text-blue-500 rounded-md"
                >
                  <Settings size={18} />
                </button>
              )}
            </div>
          </header>

          <Canvas
            blocks={blocks}
            selectedId={selectedId}
            onSelect={(id) => { setSelectedId(id); if(id) setShowConfig(true); }}
            onRemove={handleRemove}
            placeholderIndex={activeType ? overIndex : -1}
          />
        </div>

        <div className={`fixed inset-y-0 right-0 z-[50] w-[280px] transform lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out ${showConfig && selectedId ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'} ${!selectedId ? 'lg:hidden' : ''}`}>
          <ConfigPanel block={selectedBlock} onUpdate={handleUpdate} onClose={() => setShowConfig(false)} />
        </div>

        <PreviewModal
          show={showPreview}
          blocks={blocks}
          onClose={() => setShowPreview(false)}
        />

        <DragOverlay dropAnimation={dropAnimationConfig} zIndex={1000}>
          {activeDef ? (
            <div className="bg-bg-elevated border border-blue-500/50 text-blue-500 py-2 px-4 rounded-xl shadow-2xl flex items-center gap-2 font-bold scale-105">
              {activeDef.icon && <activeDef.icon size={16} strokeWidth={2.5} />}
              {activeDef.label}
            </div>
          ) : null}
        </DragOverlay>
      </div>
    </DndContext>
  );
}

export default App;
