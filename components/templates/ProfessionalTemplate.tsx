import React from 'react';
import { CVData } from '../../types';
import { formatDate, formatDescription, ContactIcon, hexToRgba } from './common';

interface TemplateProps {
  cvData: CVData;
  accentColor: string;
}

const ProfessionalTemplate: React.FC<TemplateProps> = ({ cvData, accentColor }) => {
  const { personalDetails, summary, experience, education, skills } = cvData;

  const skillsList = skills.split(',').map(skill => skill.trim());
  const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h2 className="text-sm font-bold uppercase tracking-wider pb-1 mb-3 border-b-2" style={{ borderColor: accentColor }}>{children}</h2>
  );

  return (
    <div id="cv-preview" className="bg-white shadow-lg rounded-lg max-w-4xl mx-auto w-full origin-top scale-90 lg:scale-100 transition-transform duration-300 text-gray-800">
      <header className="p-8 flex items-center space-x-6" style={{ backgroundColor: hexToRgba(accentColor, 0.1) }}>
        {personalDetails.profilePicture && (
            <div className="w-28 h-28 rounded-full overflow-hidden shrink-0 ring-4 ring-white shadow-md">
                <img src={personalDetails.profilePicture} alt="Profile" className="w-full h-full object-cover" />
            </div>
        )}
        <div>
            <h1 className="text-4xl font-bold tracking-wide">{personalDetails.fullName}</h1>
            <p className="text-xl font-light mt-1" style={{ color: accentColor }}>{personalDetails.jobTitle}</p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600 mt-3">
                <span>{personalDetails.address}</span>
                <a href={`mailto:${personalDetails.email}`} className="hover:underline" style={{ color: accentColor }}>{personalDetails.email}</a>
                <span>{personalDetails.phone}</span>
            </div>
        </div>
      </header>
      
      <div className="flex">
        <aside className="w-1/3 p-6 border-r border-gray-200">
          <section className="mb-6">
            <SectionTitle>Summary</SectionTitle>
            <p className="text-sm text-gray-700 leading-relaxed">{summary}</p>
          </section>
          <section>
            <SectionTitle>Skills</SectionTitle>
            <div className="text-sm text-gray-700 space-y-1">
              {skillsList.map((skill, index) => (
                skill && <p key={index}>• {skill}</p>
              ))}
            </div>
          </section>
        </aside>

        <main className="w-2/3 p-6">
          <section className="mb-6 print-section">
            <SectionTitle>Experience</SectionTitle>
            {experience.map(exp => (
              <div key={exp.id} className="mb-4 last:mb-0">
                <div className="flex justify-between items-baseline flex-wrap">
                  <h3 className="text-base font-semibold">{exp.jobTitle}</h3>
                  <p className="text-xs font-medium text-gray-500">{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</p>
                </div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">{exp.company}</h4>
                <div className="text-sm text-gray-700 leading-relaxed">{formatDescription(exp.description)}</div>
              </div>
            ))}
          </section>
        
          <section className="print-section">
            <SectionTitle>Education</SectionTitle>
            {education.map(edu => (
              <div key={edu.id} className="mb-2 last:mb-0">
                <div className="flex justify-between items-baseline flex-wrap">
                  <h3 className="text-base font-semibold">{edu.degree}</h3>
                  <p className="text-xs font-medium text-gray-500">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
                </div>
                <h4 className="text-sm font-medium text-gray-600">{edu.school}</h4>
              </div>
            ))}
          </section>
        </main>
      </div>
    </div>
  );
};

export default ProfessionalTemplate;