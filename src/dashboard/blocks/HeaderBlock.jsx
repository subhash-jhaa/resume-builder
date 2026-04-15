import React from 'react';

export const HeaderBlock = ({ data }) => (
  <div style={{ textAlign: 'center', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid var(--paper-border)' }}>
    <h1 style={{ fontSize: '30px', fontWeight: '800', margin: '0 0 4px 0', color: 'var(--paper-text)', letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
      {data.name}
    </h1>
    <h2 style={{ fontSize: '15px', fontWeight: '600', margin: '0 0 12px 0', color: 'var(--blue-500)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
      {data.title}
    </h2>
    <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', fontSize: '12px', color: 'var(--text-3)', flexWrap: 'wrap' }}>
      {data.email && <span>✉️ {data.email}</span>}
      {data.phone && <span>📞 {data.phone}</span>}
      {data.location && <span>📍 {data.location}</span>}
      {data.website && <a href={data.website} style={{ color: 'var(--blue-500)', textDecoration: 'none' }}>🌐 {data.website.replace(/^https?:\/\//, '')}</a>}
    </div>
  </div>
);
