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
import { Sun, Moon, Eye, Trash2 } from 'lucide-react';
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
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  const [selectedId, setSelectedId] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [isLightMode, setIsLightMode] = useState(() => {
    return localStorage.getItem('resume-theme') === 'light';
  });
  const [activeId, setActiveId] = useState(null);
  const [activeType, setActiveType] = useState(null);
  const [overIndex, setOverIndex] = useState(-1);
  const [hasStarted, setHasStarted] = useState(false);

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
    setActiveId(active.id);
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
    setActiveId(null);
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

  const updateBlock = (id, partialData) => {
    setBlocks(prev => prev.map(b =>
      b.id === id ? { ...b, data: { ...b.data, ...partialData } } : b
    ));
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
      <div className="grid grid-cols-[260px_1fr_280px] h-screen overflow-hidden relative font-sans bg-bg-base text-text-1">
        <Palette onClearAll={handleClearAll} />

        <div className="flex flex-col h-screen overflow-hidden min-w-0 bg-bg-base">
          {/* Top Header Bar */}
          <header className="h-[56px] bg-bg-overlay backdrop-blur-md border-b border-border px-5 flex items-center justify-between gap-3 shrink-0 z-10">
            <div className="flex items-center gap-3 cursor-pointer transition-all hover:opacity-80 hover:-translate-y-px select-none" onClick={() => setHasStarted(false)} title="Return to Landing Page">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-[0_4px_12px_rgba(59,130,246,0.3)] shrink-0">
                <svg viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg" width="18" height="18">
                  <path d="M6 2h8l6 6v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" fill="white" fillOpacity="0.35" stroke="white" strokeWidth="1.8" strokeLinejoin="round" />
                  <path d="M14 2v6h6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  <line x1="8" y1="13" x2="16" y2="13" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  <line x1="8" y1="17" x2="13" y2="17" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <span className="text-base font-bold tracking-tight text-text-1">Resume<span className="text-blue-500">Builder</span></span>
            </div>

            <div className="flex items-center gap-2 flex-1 justify-center">
              <span className="text-[12px] text-text-2 bg-bg-elevated border border-border py-0.5 px-2.5 rounded-full font-medium">
                {blocks.length} section{blocks.length !== 1 ? 's' : ''}
              </span>
              {selectedBlock && (
                <span className="text-[12px] text-blue-500 bg-blue-500/10 border border-blue-500/30 py-0.5 px-2.5 rounded-full font-medium">
                  Editing: {BLOCK_DEFINITIONS[selectedBlock.type]?.label}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {blocks.length > 0 && (
                <button 
                  className="h-[34px] px-3 bg-transparent border border-border rounded-md text-text-2 text-[12px] font-medium cursor-pointer transition-all hover:border-red-500 hover:text-red-500 flex items-center gap-2" 
                  onClick={handleClearAll}
                >
                  <Trash2 size={13} strokeWidth={2} /> Clear All
                </button>
              )}

              <button 
                className="h-[34px] px-4 bg-gradient-to-br from-blue-500 to-blue-600 border-none rounded-md text-white text-[13px] font-semibold flex items-center gap-2 cursor-pointer transition-all hover:brightness-110 hover:-translate-y-px hover:shadow-[0_6px_16px_rgba(59,130,246,0.4)] shadow-[0_4px_12px_rgba(59,130,246,0.3)] relative overflow-hidden" 
                onClick={() => setShowPreview(true)}
              >
                <Eye size={14} strokeWidth={2} />
                Preview & Export
              </button>
            </div>
          </header>

          <Canvas
            blocks={blocks}
            selectedId={selectedId}
            onSelect={setSelectedId}
            onRemove={handleRemove}
            placeholderIndex={activeType ? overIndex : -1}
          />
        </div>

        <ConfigPanel block={selectedBlock} onUpdate={handleUpdate} />

        <PreviewModal
          show={showPreview}
          blocks={blocks}
          onClose={() => setShowPreview(false)}
        />

        <DragOverlay dropAnimation={dropAnimationConfig}>
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
