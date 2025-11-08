import React from 'react';
import { CVData } from '../../types';
import { formatDate, formatDescription, ContactIcon } from './common';

interface TemplateProps {
  cvData: CVData;
  accentColor: string;
}

const MinimalistSection: React.FC<{ title: string; children: React.ReactNode; accentColor: string;}> = ({ title, children, accentColor }) => (
    <section className="flex mb-6 print-section">
        <div className="w-1/4">
            <h2 className="text-sm font-bold uppercase tracking-wider" style={{ color: accentColor }}>{title}</h2>
        </div>
        <div className="w-3/4">
            {children}
        </div>
    </section>
);


const ClassicTemplate: React.FC<TemplateProps> = ({ cvData, accentColor }) => {
  const { personalDetails, summary, experience, education, skills } = cvData;

  const skillsList = skills.split(',').map(skill => skill.trim()).filter(s => s);

  return (
    <div id="cv-preview" className="bg-white shadow-lg rounded-lg p-10 max-w-4xl mx-auto w-full origin-top scale-90 lg:scale-100 transition-transform duration-300 text-sm">
      <header className="flex justify-between items-start mb-10">
        <div>
            <h1 className="text-4xl font-bold text-gray-800">{personalDetails.fullName}</h1>
            <p className="text-lg text-gray-600 font-medium mt-1">{personalDetails.jobTitle}</p>
        </div>
        <div className="text-right text-gray-600">
            <p>{personalDetails.email}</p>
            <p>{personalDetails.phone}</p>
            <p>{personalDetails.address}</p>
        </div>
      </header>
      
      <main>
        <MinimalistSection title="Summary" accentColor={accentColor}>
          <p className="text-gray-700">{summary}</p>
        </MinimalistSection>
        
        <MinimalistSection title="Experience" accentColor={accentColor}>
          {experience.map(exp => (
            <div key={exp.id} className="mb-4 last:mb-0">
              <div className="flex justify-between items-baseline flex-wrap">
                <h3 className="text-base font-semibold text-gray-800">{exp.jobTitle}</h3>
                <p className="text-xs font-medium text-gray-500">{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</p>
              </div>
              <h4 className="text-sm font-medium text-gray-700 italic mb-2">{exp.company}</h4>
              <div className="text-gray-700 text-sm">{formatDescription(exp.description)}</div>
            </div>
          ))}
        </MinimalistSection>
        
        <MinimalistSection title="Education" accentColor={accentColor}>
          {education.map(edu => (
            <div key={edu.id} className="mb-2 last:mb-0">
              <div className="flex justify-between items-baseline flex-wrap">
                <h3 className="text-base font-semibold text-gray-800">{edu.degree}</h3>
                <p className="text-xs font-medium text-gray-500">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
              </div>
              <h4 className="text-sm font-medium text-gray-600 italic">{edu.school}</h4>
            </div>
          ))}
        </MinimalistSection>

        <MinimalistSection title="Skills" accentColor={accentColor}>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
                {skillsList.map((skill, i) => <li key={i} className="text-gray-700">• {skill}</li>)}
            </ul>
        </MinimalistSection>
      </main>
    </div>
  );
};

export default ClassicTemplate;