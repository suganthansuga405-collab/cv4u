import React from 'react';
import { CVData } from '../../types';
import { formatDate, formatDescription, ContactIcon, hexToRgba } from './common';

interface TemplateProps {
  cvData: CVData;
  accentColor: string;
}

const ModernTemplate: React.FC<TemplateProps> = ({ cvData, accentColor }) => {
  const { personalDetails, summary, experience, education, skills } = cvData;

  const skillsList = skills.split(',').map(skill => skill.trim());

  return (
    <div id="cv-preview" className="bg-white shadow-lg rounded-lg max-w-4xl mx-auto w-full origin-top scale-90 lg:scale-100 transition-transform duration-300 flex text-gray-800">
      <div className="w-8" style={{ backgroundColor: accentColor }}></div>
      <div className="flex-1 flex">
        {/* Left Sidebar */}
        <aside className="w-1/3 p-6 border-r border-gray-200">
           {personalDetails.profilePicture && (
            <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden ring-4" style={{ borderColor: accentColor }}>
                <img src={personalDetails.profilePicture} alt="Profile" className="w-full h-full object-cover" />
            </div>
           )}
          <div className="relative text-center mb-10">
              <div 
                className="absolute -inset-x-2 -inset-y-1 transform -rotate-2 mx-auto w-max px-4" 
                style={{ backgroundColor: hexToRgba(accentColor, 0.3) }}
              />
              <div className="relative">
                <h1 className="text-3xl font-bold text-gray-900">{personalDetails.fullName}</h1>
                <p className="text-base text-gray-700 font-medium mt-1">{personalDetails.jobTitle}</p>
              </div>
          </div>
          
          <div className="space-y-6">
              <div>
                  <h2 className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: accentColor }}>Details</h2>
                  <div className="text-sm space-y-2 text-gray-600">
                      <ContactIcon type="email" text={personalDetails.email} link={`mailto:${personalDetails.email}`} />
                      <ContactIcon type="phone" text={personalDetails.phone} link={`tel:${personalDetails.phone}`} />
                      <ContactIcon type="address" text={personalDetails.address} />
                      <ContactIcon type="linkedin" text={personalDetails.linkedin} link={`https://${personalDetails.linkedin}`} />
                  </div>
              </div>
              <div>
                  <h2 className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: accentColor }}>Skills</h2>
                  <ul className="flex flex-wrap gap-2">
                      {skillsList.map((skill, index) => (
                          skill && <li key={index} className="text-white text-xs font-semibold px-3 py-1 rounded-md" style={{ backgroundColor: accentColor }}>{skill}</li>
                      ))}
                  </ul>
              </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="w-2/3 p-8">
           <section className="mb-6 print-section">
              <h2 className="text-xl font-bold border-b-2 pb-2 mb-3" style={{ borderColor: accentColor }}>Summary</h2>
              <p className="text-gray-700 text-sm">{summary}</p>
           </section>

           <section className="mb-6 print-section">
              <h2 className="text-xl font-bold border-b-2 pb-2 mb-3" style={{ borderColor: accentColor }}>Experience</h2>
              {experience.map(exp => (
                <div key={exp.id} className="mb-4 last:mb-0">
                  <div className="flex justify-between items-baseline flex-wrap">
                    <h3 className="text-base font-semibold">{exp.jobTitle}</h3>
                    <p className="text-xs font-medium text-gray-500">{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</p>
                  </div>
                  <h4 className="text-sm font-medium italic mb-2" style={{ color: accentColor }}>{exp.company}</h4>
                  <div className="text-sm">{formatDescription(exp.description)}</div>
                </div>
              ))}
           </section>
          
           <section className="print-section">
              <h2 className="text-xl font-bold border-b-2 pb-2 mb-3" style={{ borderColor: accentColor }}>Education</h2>
              {education.map(edu => (
                <div key={edu.id} className="mb-2 last:mb-0">
                  <div className="flex justify-between items-baseline flex-wrap">
                    <h3 className="text-base font-semibold">{edu.degree}</h3>
                    <p className="text-xs font-medium text-gray-500">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
                  </div>
                  <h4 className="text-sm font-medium text-gray-600 italic">{edu.school}</h4>
                </div>
              ))}
          </section>
        </main>
      </div>
    </div>
  );
};

export default ModernTemplate;