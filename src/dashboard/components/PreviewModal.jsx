import React from 'react';
import { BLOCK_RENDERERS } from '../blocks';

export default function PreviewModal({ show, blocks, onClose }) {
  if (!show) return null;

  return (
    <>
      {/* Print Styles */}
      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }
            .print-area, .print-area * {
              visibility: visible;
            }
            .print-area {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              padding: 0;
              margin: 0;
              box-shadow: none !important;
            }
            .modal-content {
              box-shadow: none !important;
              max-width: 100% !important;
              width: 100% !important;
              padding: 0 !important;
              background-color: white !important;
            }
            .no-print {
              display: none !important;
            }
          }
        `}
      </style>

      <div 
        className="fixed inset-0 bg-black/85 backdrop-blur-sm z-[1000] flex items-center justify-center p-5 md:p-10"
        onClick={onClose}
      >
        <div 
          className="bg-[#111113] w-full max-w-[1000px] h-full flex flex-col rounded-2xl border border-white/10 overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)]" 
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Action Bar */}
          <div className="h-[64px] bg-[#18181b] border-b border-white/10 px-6 flex items-center justify-between shrink-0 no-print">
            <h2 className="text-[14px] sm:text-lg font-bold text-white tracking-tight truncate mr-2">Preview & Export</h2>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => window.print()} 
                className="h-10 px-3 md:px-5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg text-white text-sm font-bold flex items-center gap-2 hover:brightness-110 shadow-lg shadow-blue-500/20 transition-all shrink-0"
              >
                <span>🖨️</span>
                <span className="hidden sm:inline">Print / Save PDF</span>
                <span className="inline sm:hidden">Print</span>
              </button>
              <button 
                onClick={onClose} 
                className="h-10 px-4 bg-transparent border border-white/10 rounded-lg text-white/60 text-sm font-medium hover:bg-white/5 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
          
          {/* Resume Document Area */}
          <div className="flex-1 overflow-y-auto p-4 md:p-12 flex justify-center bg-[#050505] scrollbar-hidden">
            <div className="print-area bg-white text-[#1e293b] w-[210mm] min-h-[297mm] p-[15mm_20mm] shadow-2xl relative grid grid-cols-[1fr_240px] gap-[30px] self-start leading-normal text-sm font-sans origin-top transform scale-[var(--preview-scale,1)] lg:scale-100" style={{ '--preview-scale': 'calc(100vw / 230mm)' }}>
              {blocks.length === 0 ? (
                <div className="col-span-2 flex items-center justify-center h-[200px] text-slate-400 font-medium">
                  Your resume is entirely empty.
                </div>
              ) : (() => {
                const headerBlock = blocks.find(b => b.type === 'header');
                const sidebarTypes = ['summary', 'skills', 'certification', 'image'];
                const mainBlocks = blocks.filter(b => b.type !== 'header' && !sidebarTypes.includes(b.type));
                const sidebarBlocks = blocks.filter(b => sidebarTypes.includes(b.type));

                const renderBlock = (block) => {
                  const Renderer = BLOCK_RENDERERS[block.type];
                  return Renderer ? <Renderer key={block.id} data={block.data} /> : null;
                };

                return (
                  <>
                    {/* Header Group */}
                    {headerBlock && (
                      <div className="col-span-2">
                        {renderBlock(headerBlock)}
                      </div>
                    )}

                    {/* Main Content Column */}
                    <div className="flex flex-col gap-5">
                      {mainBlocks.map(renderBlock)}
                    </div>

                    {/* Sidebar Column */}
                    <div className="flex flex-col gap-6 pt-1 border-l border-slate-100 pl-8">
                      {sidebarBlocks.map(renderBlock)}
                    </div>
                  </>
                );
              })()}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
