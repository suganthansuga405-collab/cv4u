import React from 'react';

// Shared Section Component
export const CVSection: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className = '' }) => (
    <section className={`mb-6 print-section ${className}`}>
        <h2 className="text-xl font-bold text-indigo-700 border-b-2 border-indigo-200 pb-1 mb-3">{title}</h2>
        {children}
    </section>
);

// Shared Date Formatter
export const formatDate = (dateString: string) => {
    if (!dateString) return '';
    if (dateString.toLowerCase() === 'present') return 'Present';
    const [year, month] = dateString.split('-');
    const date = new Date(Number(year), Number(month) - 1);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

// Shared Description Formatter
export const formatDescription = (text: string) => {
    return text.split('\n').filter(line => line.trim() !== '').map((line, index) => (
        <p key={index} className="text-gray-700 text-sm mb-1">{line}</p>
    ));
};

export const hexToRgba = (hex: string, alpha: number): string => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};


const iconMap = {
  email: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
  ),
  phone: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0" viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
  ),
  address: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
  ),
  linkedin: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
  ),
};

export type IconType = keyof typeof iconMap;

export const ContactIcon: React.FC<{ type: IconType; text: string; link?: string; className?: string }> = ({ type, text, link, className = '' }) => {
    const content = (
        <div className={`flex items-center gap-2 text-sm ${className}`}>
            {iconMap[type]}
            <span className="truncate">{text}</span>
        </div>
    );

    if (link && text) {
        return <a href={link} target="_blank" rel="noopener noreferrer" className="text-current hover:underline">{content}</a>
    }

    return text ? content : null;
};