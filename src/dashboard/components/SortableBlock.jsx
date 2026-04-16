import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Pencil, Trash2 } from 'lucide-react';
import { BLOCK_DEFINITIONS } from '../data/blockDefs';

export default function SortableBlock({ block, selected, onSelect, onRemove }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id });

  const def = BLOCK_DEFINITIONS[block.type];
  
  // If the block type is unknown (e.g. from outdated local storage), 
  // skip rendering to prevent crashing the entire application.
  if (!def) return null;

  const Icon = def.icon;

  let previewText = '';
  if (block.type === 'header') {
    previewText = block.data.name && block.data.title
      ? `${block.data.name} · ${block.data.title}`
      : block.data.name || 'No name set';
  } else if (block.type === 'summary') {
    const content = block.data.content || '';
    previewText = content.substring(0, 65) + (content.length > 65 ? '…' : '') || 'No content yet';
  } else if (block.data.items?.length) {
    previewText = `${block.data.items.length} entr${block.data.items.length === 1 ? 'y' : 'ies'}`;
  } else if (block.data.title) {
    previewText = block.data.title;
  } else {
    previewText = 'Click to configure…';
  }

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 50 : 1,
        touchAction: 'none',
      }}
      className={`flex items-center gap-3.5 p-3.5 mb-2 bg-bg-elevated border rounded-xl cursor-point transition-all duration-200 group ${selected ? 'border-blue-500 ring-1 ring-blue-500' : 'border-border hover:border-blue-500/30'} ${isDragging ? 'opacity-0' : 'opacity-100'}`}
      onClick={() => onSelect(block.id)}
    >
      {/* Drag Handle */}
      <div
        className="w-6 h-8 flex items-center justify-center text-text-3 cursor-grab hover:text-text-1 group active:cursor-grabbing transition-colors"
        {...attributes}
        {...listeners}
        onClick={e => e.stopPropagation()}
      >
        <GripVertical size={16} strokeWidth={2} />
      </div>

      {/* Type Badge */}
      <div
        className="flex items-center gap-2 px-2.5 py-1 rounded-lg border text-[11px] font-bold uppercase tracking-wider"
        style={{ backgroundColor: `${def.color}18`, color: def.color, borderColor: `${def.color}30` }}
      >
        <Icon size={12} strokeWidth={2.5} />
        <span>{def.label}</span>
      </div>

      {/* Preview text */}
      <div className="flex-1 truncate text-sm text-text-2 font-medium">{previewText}</div>

      {/* Actions */}
      <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transform translate-x-1 group-hover:translate-x-0 transition-all">
        <button
          className="w-7 h-7 rounded-lg bg-bg-surface border border-border text-text-2 flex items-center justify-center transition-all hover:bg-white hover:text-black hover:scale-105"
          onClick={(e) => { e.stopPropagation(); onSelect(block.id); }}
          title="Edit section"
        >
          <Pencil size={12} strokeWidth={2.5} />
        </button>
        <button
          className="w-7 h-7 rounded-lg bg-bg-surface border border-border text-text-2 flex items-center justify-center transition-all hover:bg-red-500 hover:text-white hover:border-red-500 hover:scale-105"
          onClick={(e) => { e.stopPropagation(); onRemove(block.id); }}
          title="Remove section"
        >
          <Trash2 size={12} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}
