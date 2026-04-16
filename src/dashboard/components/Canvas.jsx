import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import SortableBlock from './SortableBlock';

export default function Canvas({ blocks, selectedId, onSelect, onRemove, placeholderIndex }) {
  const { setNodeRef } = useDroppable({
    id: 'canvas',
  });

  return (
    <div 
      ref={setNodeRef} 
      className="flex-1 overflow-y-auto px-4 py-8 lg:p-8 flex justify-center items-start bg-bg-base scrollbar-hidden"
    >
      <div className="w-full max-w-4xl min-h-[60vh] flex flex-col gap-2">
        {blocks.length === 0 && placeholderIndex === -1 ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh] text-center gap-3 p-10 border-2 border-dashed border-border rounded-2xl bg-bg-surface/50">
            <div className="w-16 h-16 bg-bg-elevated rounded-2xl flex items-center justify-center text-3xl mb-2">
              📄
            </div>
            <h3 className="text-lg font-bold text-text-1">Your canvas is empty</h3>
            <p className="text-[14px] text-text-3 max-w-[280px]">
              Drag components from the left panel to start building your professional resume.
            </p>
          </div>
        ) : (
          <SortableContext
            items={blocks.map(b => b.id)}
            strategy={verticalListSortingStrategy}
          >
            {blocks.map((block, idx) => (
              <React.Fragment key={block.id}>
                {placeholderIndex === idx && (
                  <div className="h-16 border-2 border-dashed border-blue-500/30 rounded-xl bg-blue-500/5 animate-pulse mb-2" />
                )}
                <SortableBlock
                  block={block}
                  selected={selectedId === block.id}
                  onSelect={onSelect}
                  onRemove={onRemove}
                />
              </React.Fragment>
            ))}
            {placeholderIndex === blocks.length && (
              <div className="h-16 border-2 border-dashed border-blue-500/30 rounded-xl bg-blue-500/5 animate-pulse mb-2" />
            )}
          </SortableContext>
        )}
      </div>
    </div>
  );
}
