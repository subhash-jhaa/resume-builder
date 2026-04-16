import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { GripVertical } from 'lucide-react';
import { BLOCK_DEFINITIONS, PALETTE_ORDER } from '../data/blockDefs';

function PaletteItem({ type }) {
  const def = BLOCK_DEFINITIONS[type];
  const Icon = def.icon;
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `palette-${type}`,
    data: { type, isPaletteItem: true },
  });

  return (
    <div
      ref={setNodeRef}
      className={`flex items-center gap-2.5 p-3 mb-2 bg-bg-elevated border border-border rounded-md cursor-point transition-all hover:border-blue-500/40 hover:bg-bg-surface group ${isDragging ? 'opacity-40' : 'opacity-100'}`}
      style={{ touchAction: 'none' }}
      {...listeners}
      {...attributes}
    >
      <div 
        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" 
        style={{ color: def.color, backgroundColor: `${def.color}15` }}
      >
        <Icon size={15} strokeWidth={2.5} />
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-[13px] font-bold text-text-1 leading-tight">{def.label}</span>
        <span className="text-[11px] text-text-3 truncate">{def.description}</span>
      </div>
      <GripVertical size={14} className="ml-auto text-text-3 opacity-0 group-hover:opacity-100 transition-opacity" strokeWidth={2} />
    </div>
  );
}

export default function Palette({ onClearAll }) {
  return (
    <aside className="border-r border-border bg-bg-overlay backdrop-blur-xl flex flex-col h-full lg:h-screen overflow-hidden">
      <div className="h-14 flex items-center justify-between px-4 border-b border-border bg-bg-surface/50 text-[11px] font-bold uppercase tracking-[0.08em] text-text-3 shrink-0">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => { if(window.innerWidth < 1024) document.querySelector('[onClick*="setShowPalette(false)"]')?.click(); }}
            className="lg:hidden w-8 h-8 flex items-center justify-center text-text-3 hover:text-text-1"
          >
            <GripVertical size={16} />
          </button>
          <span>Components</span>
        </div>
        <button 
          onClick={onClearAll} 
          className="px-2 py-1 border border-border rounded-md hover:border-red-500 hover:text-red-500 transition-colors lowercase font-medium"
          title="Remove all sections"
        >
          Clear
        </button>
      </div>
      <div className="p-3 flex flex-col overflow-y-auto flex-1 h-full scrollbar-hidden">
        {PALETTE_ORDER.map((type) => (
          <PaletteItem key={type} type={type} />
        ))}
      </div>
    </aside>
  );
}
