import React from 'react';

export const HeaderBlock = ({ data }) => (
  <div className="text-center mb-5 pb-4 border-b border-slate-200">
    <h1 className="text-3xl font-extrabold m-0 mb-1 text-slate-900 tracking-tight uppercase">
      {data.name}
    </h1>
    <h2 className="text-[15px] font-semibold m-0 mb-3 text-blue-600 uppercase tracking-widest">
      {data.title}
    </h2>
    <div className="flex justify-center gap-3 text-xs text-slate-500 flex-wrap">
      {data.email && <span>✉️ {data.email}</span>}
      {data.phone && <span>📞 {data.phone}</span>}
      {data.location && <span>📍 {data.location}</span>}
      {data.website && <a href={data.website} className="text-blue-600 no-underline hover:underline">🌐 {data.website.replace(/^https?:\/\//, '')}</a>}
    </div>
  </div>
);

export const SummaryBlock = ({ data }) => (
  <div className="mb-4">
    {data.title && <h3 className="text-[14px] font-bold text-slate-900 border-b border-slate-200 pb-1 mb-2 uppercase tracking-wider">{data.title}</h3>}
    <p className="text-[13px] text-slate-700 leading-relaxed opacity-95">{data.content}</p>
  </div>
);

export const ExperienceBlock = ({ data }) => (
  <div className="mb-4">
    {data.title && <h3 className="text-[16px] font-bold text-slate-900 border-b border-slate-200 pb-1 mb-3 uppercase tracking-wider">{data.title}</h3>}
    <div className="flex flex-col gap-3.5">
      {data.items?.map((item, idx) => (
        <div key={idx}>
          <div className="flex justify-between items-start mb-0.5">
            <div>
              <strong className="text-[15px] text-slate-900">{item.position}</strong>
              <span className="text-[14px] text-slate-700 opacity-80"> at {item.company}</span>
            </div>
            <div className="text-xs text-slate-500 font-medium whitespace-nowrap">
              {item.from} — {item.to}
            </div>
          </div>
          {item.location && <div className="text-xs text-slate-500 italic mb-1">{item.location}</div>}
          <p className="text-[13px] text-slate-700 leading-relaxed whitespace-pre-wrap opacity-95">{item.description}</p>
        </div>
      ))}
    </div>
  </div>
);

export const EducationBlock = ({ data }) => (
  <div className="mb-6">
    {data.title && <h3 className="text-[18px] font-bold text-slate-900 border-b border-slate-200 pb-2 mb-4 uppercase tracking-wider">{data.title}</h3>}
    <div className="flex flex-col gap-4">
      {data.items?.map((item, idx) => (
        <div key={idx}>
          <div className="flex justify-between items-start mb-1">
            <strong className="text-[16px] text-slate-900">{item.institution}</strong>
            <div className="text-[14px] text-slate-500 font-medium whitespace-nowrap">
              {item.from} — {item.to}
            </div>
          </div>
          <div className="text-[15px] text-slate-900 font-medium mb-1 opacity-95">{item.degree}</div>
          {item.location && <div className="text-[14px] text-slate-500 italic mb-1">{item.location}</div>}
          {item.description && <p className="text-[14px] text-slate-500 leading-relaxed">{item.description}</p>}
        </div>
      ))}
    </div>
  </div>
);

export const SkillsBlock = ({ data }) => (
  <div className="mb-4">
    {data.title && <h3 className="text-[14px] font-bold text-slate-900 border-b border-slate-200 pb-1 mb-2 uppercase tracking-wider">{data.title}</h3>}
    <div className="flex flex-col gap-2">
      {data.items?.map((item, idx) => (
        <div key={idx} className="flex flex-col">
          {item.name && <strong className="text-[12px] text-slate-900 mb-1 uppercase opacity-80">{item.name}:</strong>}
          <div className="flex flex-wrap gap-1">
            {item.keywords?.map((keyword, kidx) => (
              <span key={kidx} className="bg-slate-50 text-slate-800 border border-slate-200 px-2 py-0.5 rounded text-[11px] font-medium">
                {keyword}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const ProjectBlock = ({ data }) => (
  <div className="mb-6">
    {data.title && <h3 className="text-[18px] font-bold text-slate-900 border-b border-slate-200 pb-2 mb-4 uppercase tracking-wider">{data.title}</h3>}
    <div className="flex flex-col gap-4">
      {data.items?.map((item, idx) => (
        <div key={idx}>
          <div className="flex gap-3 items-baseline mb-1">
            <strong className="text-[16px] text-slate-900">{item.name}</strong>
            {item.url && <a href={item.url} className="text-[13px] text-blue-600 no-underline hover:underline">{item.url}</a>}
          </div>
          <p className="text-[14px] text-slate-700 leading-relaxed whitespace-pre-wrap opacity-95">{item.description}</p>
        </div>
      ))}
    </div>
  </div>
);

export const RichTextBlock = ({ data }) => (
  <div className="mb-6">
    {data.title && <h3 className="text-[18px] font-bold text-slate-900 border-b border-slate-200 pb-2 mb-3 uppercase tracking-wider">{data.title}</h3>}
    <div className="text-[15px] text-slate-700 leading-relaxed opacity-95 prose prose-slate" dangerouslySetInnerHTML={{ __html: data.content }} />
  </div>
);

export const ImageBlock = ({ data }) => (
  <div className="mb-6 text-center">
    {data.url && (
      <img 
        src={data.url} 
        alt={data.alt || 'Resume Image'} 
        className="max-w-full max-h-[200px] object-cover rounded-lg border border-slate-200 mx-auto" 
      />
    )}
    {data.caption && <div className="text-[13px] text-slate-500 mt-2 italic">{data.caption}</div>}
  </div>
);

export const CertificationBlock = ({ data }) => (
  <div className="mb-5">
    {data.title && <h3 className="text-[14px] font-bold text-slate-900 border-b border-slate-200 pb-1 mb-2 uppercase tracking-wider">{data.title}</h3>}
    <div className="flex flex-col gap-2.5">
      {data.items?.map((item, idx) => (
        <div key={idx}>
          <div className="flex justify-between items-start mb-0.5">
            <strong className="text-[13px] text-slate-900">{item.name}</strong>
            <div className="text-[11px] text-slate-500 font-medium">
              {item.date}
            </div>
          </div>
          <div className="text-[12px] text-slate-900 font-medium mb-0.5 opacity-95">{item.issuer}</div>
          {item.description && <p className="text-[12px] text-slate-500 leading-tight">{item.description}</p>}
        </div>
      ))}
    </div>
  </div>
);

export const BLOCK_RENDERERS = {
  header: HeaderBlock,
  summary: SummaryBlock,
  experience: ExperienceBlock,
  education: EducationBlock,
  skills: SkillsBlock,
  project: ProjectBlock,
  richtext: RichTextBlock,
  image: ImageBlock,
  certification: CertificationBlock,
};
