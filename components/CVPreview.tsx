import React from 'react';
import { CVData, Template, FontFamily } from '../types';
import ClassicTemplate from './templates/ClassicTemplate';
import ModernTemplate from './templates/ModernTemplate';
import ProfessionalTemplate from './templates/ProfessionalTemplate';

interface CVPreviewProps {
  cvData: CVData;
  template: Template;
  font: FontFamily;
  accentColor: string;
}

const CVPreview: React.FC<CVPreviewProps> = ({ cvData, template, font, accentColor }) => {
  const fontClass = `font-${font}`;

  const renderTemplate = () => {
    const props = { cvData, accentColor };
    switch (template) {
      case 'classic':
        return <ClassicTemplate {...props} />;
      case 'modern':
        return <ModernTemplate {...props} />;
      case 'professional':
        return <ProfessionalTemplate {...props} />;
      default:
        return <ClassicTemplate {...props} />;
    }
  };

  return (
    <div className="sticky top-8">
        <div className={fontClass}>
            {renderTemplate()}
        </div>
    </div>
  );
};

export default CVPreview;