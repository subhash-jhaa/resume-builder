import React from 'react';
import { Plus, Trash2, X, MoreVertical, GripVertical, ChevronDown } from 'lucide-react';
import { BLOCK_DEFINITIONS } from '../data/blockDefs';

const SectionHeader = ({ icon: Icon, title, typeLabel }) => (
  <div className="flex items-center gap-2.5 px-4 h-[56px] border-b border-border bg-bg-surface/50 shrink-0 select-none">
    <div className="w-8 h-8 rounded-lg bg-bg-elevated flex items-center justify-center text-blue-500 border border-border shadow-sm">
      <Icon size={16} strokeWidth={2.5} />
    </div>
    <div className="flex flex-col">
      <span className="text-[13px] font-bold text-text-1 leading-tight">{title}</span>
      <span className="text-[10px] text-text-3 font-bold uppercase tracking-widest">{typeLabel}</span>
    </div>
  </div>
);

const Field = ({ label, children }) => (
  <div className="flex flex-col gap-1.5 mb-4 group">
    <label className="text-[11px] font-bold text-text-3 uppercase tracking-wider ml-1 group-focus-within:text-blue-500 transition-colors">{label}</label>
    {children}
  </div>
);

export default function ConfigPanel({ block, onUpdate }) {
  if (!block) {
    return (
      <aside className="border-l border-border bg-bg-overlay backdrop-blur-xl flex flex-col h-screen overflow-hidden">
        <div className="h-full flex flex-col items-center justify-center p-10 text-center gap-4 opacity-40">
          <div className="w-16 h-16 bg-bg-elevated rounded-2xl flex items-center justify-center text-3xl">⚙️</div>
          <div className="flex flex-col gap-1">
            <h4 className="text-[14px] font-bold text-text-1">No section selected</h4>
            <p className="text-[12px] text-text-3 leading-relaxed">Click on a section in the canvas to edit its properties here.</p>
          </div>
        </div>
      </aside>
    );
  }

  const def = BLOCK_DEFINITIONS[block.type];

  // Helper to update deeply
  const handleChange = (field, value) => {
    onUpdate(block.id, { [field]: value });
  };

  const handleItemChange = (idx, field, value) => {
    const newItems = [...block.data.items];
    newItems[idx] = { ...newItems[idx], [field]: value };
    handleChange('items', newItems);
  };

  const addItem = (defaultItem) => {
    handleChange('items', [...(block.data.items || []), defaultItem]);
  };

  const removeItem = (idx) => {
    handleChange('items', block.data.items.filter((_, i) => i !== idx));
  };

  return (
    <aside className="border-l border-border bg-bg-overlay backdrop-blur-xl flex flex-col h-screen overflow-hidden shadow-2xl">
      <SectionHeader icon={def.icon} title={block.data.title || def.label} typeLabel={def.label} />

      <div className="flex-1 overflow-y-auto p-4 scrollbar-hidden">
        {/* Universal Title Field (except header) */}
        {block.type !== 'header' && (
          <Field label="Section Title">
            <input
              className="w-full bg-bg-elevated border border-border rounded-lg p-2.5 text-sm outline-none focus:border-blue-500 transition-colors shadow-inner"
              value={block.data.title || ''}
              onChange={e => handleChange('title', e.target.value)}
              placeholder={`e.g. ${def.label}`}
            />
          </Field>
        )}

        {/* Header Specific */}
        {block.type === 'header' && (
          <>
            <Field label="Full Name">
              <input className="w-full bg-bg-elevated border border-border rounded-lg p-2.5 text-sm outline-none focus:border-blue-500" value={block.data.name} onChange={e => handleChange('name', e.target.value)} />
            </Field>
            <Field label="Professional Title">
              <input className="w-full bg-bg-elevated border border-border rounded-lg p-2.5 text-sm outline-none focus:border-blue-500" value={block.data.title} onChange={e => handleChange('title', e.target.value)} />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Email"><input className="w-full bg-bg-elevated border border-border rounded-lg p-2.5 text-sm outline-none focus:border-blue-500" value={block.data.email} onChange={e => handleChange('email', e.target.value)} /></Field>
              <Field label="Phone"><input className="w-full bg-bg-elevated border border-border rounded-lg p-2.5 text-sm outline-none focus:border-blue-500" value={block.data.phone} onChange={e => handleChange('phone', e.target.value)} /></Field>
            </div>
            <Field label="Website Link">
              <input className="w-full bg-bg-elevated border border-border rounded-lg p-2.5 text-sm outline-none focus:border-blue-500" value={block.data.website} onChange={e => handleChange('website', e.target.value)} placeholder="https://..." />
            </Field>
          </>
        )}

        {/* Summary Specific */}
        {block.type === 'summary' && (
          <Field label="Professional Overview">
            <textarea
              className="w-full bg-bg-elevated border border-border rounded-lg p-3 text-sm outline-none focus:border-blue-500 min-h-[160px] leading-relaxed"
              value={block.data.content}
              onChange={e => handleChange('content', e.target.value)}
            />
          </Field>
        )}

        {/* Experience / Education / Project / Certification List Rendering */}
        {(block.type === 'experience' || block.type === 'education' || block.type === 'project' || block.type === 'certification') && (
          <div className="flex flex-col gap-4">
            {block.data.items?.map((item, idx) => (
              <div key={idx} className="bg-bg-surface/60 border border-border rounded-xl p-4 relative group">
                <button 
                  onClick={() => removeItem(idx)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-lg hover:scale-110 z-10"
                >
                  <X size={12} />
                </button>
                <div className="flex flex-col gap-3">
                  {/* Title / Name Field */}
                  <input
                    className="bg-transparent border-none text-sm font-bold p-0 outline-none placeholder:text-text-3 w-full"
                    value={item.position || item.institution || item.name || ''}
                    placeholder={
                      block.type === 'experience' ? "Position Name" : 
                      block.type === 'education' ? "School/University" : 
                      block.type === 'project' ? "Project Name" : "Certification Name"
                    }
                    onChange={e => handleItemChange(idx, 
                      block.type === 'experience' ? 'position' : 
                      block.type === 'education' ? 'institution' : 'name', 
                      e.target.value
                    )}
                  />

                  {/* Secondary Line (Company / Degree / URL / Issuer) */}
                  <input
                    className="bg-transparent border-none text-[12px] text-text-2 p-0 outline-none placeholder:text-text-3 w-full"
                    value={item.company || item.degree || item.url || item.issuer || ''}
                    placeholder={
                      block.type === 'experience' ? "Company Name" : 
                      block.type === 'education' ? "Degree / Course" : 
                      block.type === 'project' ? "Project URL" : "Issuing Organization"
                    }
                    onChange={e => handleItemChange(idx, 
                      block.type === 'experience' ? 'company' : 
                      block.type === 'education' ? 'degree' : 
                      block.type === 'project' ? 'url' : 'issuer', 
                      e.target.value
                    )}
                  />

                  {/* Dates / Metadata */}
                  <div className="flex gap-2">
                    <input 
                      className="bg-bg-elevated border border-border rounded p-1.5 text-[10px] w-full outline-none focus:border-blue-500" 
                      value={item.from || item.date || ''} 
                      onChange={e => handleItemChange(idx, block.type === 'certification' ? 'date' : 'from', e.target.value)} 
                      placeholder={block.type === 'certification' ? "Date" : "From"} 
                    />
                    {block.type !== 'certification' && (
                      <input 
                        className="bg-bg-elevated border border-border rounded p-1.5 text-[10px] w-full outline-none focus:border-blue-500" 
                        value={item.to || ''} 
                        onChange={e => handleItemChange(idx, 'to', e.target.value)} 
                        disabled={item.current} 
                        placeholder={item.current ? "Present" : "To"} 
                      />
                    )}
                  </div>

                  {/* Description */}
                  <textarea
                    className="w-full bg-bg-elevated border border-border rounded-lg p-2 text-[12px] min-h-[80px] outline-none focus:border-blue-500 leading-relaxed"
                    value={item.description}
                    onChange={e => handleItemChange(idx, 'description', e.target.value)}
                    placeholder="Description of achievements..."
                  />
                </div>
              </div>
            ))}
            <button 
              className="w-full py-2 border-2 border-dashed border-border rounded-xl text-text-3 flex items-center justify-center gap-2 hover:border-blue-500/50 hover:text-blue-500 transition-all font-bold text-[12px]"
              onClick={() => addItem(def.defaultData.items[0])}
            >
              <Plus size={14} /> Add Entry
            </button>
          </div>
        )}

        {/* Skills Specific */}
        {block.type === 'skills' && (
          <div className="flex flex-col gap-4">
            {block.data.items?.map((cat, idx) => (
              <div key={idx} className="bg-bg-surface/60 border border-border rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <input
                    className="bg-transparent border-none text-sm font-bold p-0 outline-none w-full"
                    value={cat.name}
                    onChange={e => handleItemChange(idx, 'name', e.target.value)}
                    placeholder="Category"
                  />
                  <button onClick={() => removeItem(idx)} className="text-text-3 hover:text-red-500 transition-colors"><Trash2 size={13} /></button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {cat.keywords?.map((k, kIdx) => (
                    <div key={kIdx} className="bg-bg-elevated border border-border px-2 py-1 rounded-md text-[10px] flex items-center gap-1.5">
                      {k}
                      <button onClick={() => {
                        const newKw = cat.keywords.filter((_, i) => i !== kIdx);
                        handleItemChange(idx, 'keywords', newKw);
                      }} className="hover:text-red-500">×</button>
                    </div>
                  ))}
                  <input
                    className="bg-bg-base border border-dashed border-border px-2 py-1 rounded-md text-[10px] w-20 outline-none focus:border-blue-500"
                    placeholder="+ Skill"
                    onKeyDown={e => {
                      if (e.key === 'Enter' && e.target.value) {
                        const newKw = [...(cat.keywords || []), e.target.value];
                        handleItemChange(idx, 'keywords', newKw);
                        e.target.value = '';
                      }
                    }}
                  />
                </div>
              </div>
            ))}
            <button className="w-full py-2 border-2 border-dashed border-border rounded-xl text-text-3 text-[12px] font-bold" onClick={() => addItem({ name: "New Category", keywords: [] })}>+ Category</button>
          </div>
        )}

        {/* Rich Text / Image */}
        {block.type === 'richtext' && (
          <Field label="Markdown-like Content">
            <textarea className="w-full bg-bg-elevated border border-border rounded-lg p-3 text-sm outline-none min-h-[240px]" value={block.data.content} onChange={e => handleChange('content', e.target.value)} />
          </Field>
        )}

        {block.type === 'image' && (
          <>
            <Field label="Image URL"><input className="w-full bg-bg-elevated border border-border rounded-lg p-2.5 text-sm" value={block.data.url} onChange={e => handleChange('url', e.target.value)} /></Field>
            <Field label="Caption"><input className="w-full bg-bg-elevated border border-border rounded-lg p-2.5 text-sm" value={block.data.caption} onChange={e => handleChange('caption', e.target.value)} /></Field>
          </>
        )}
      </div>
    </aside>
  );
}
