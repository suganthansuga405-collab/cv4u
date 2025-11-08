import React from 'react';
import { CVData, PersonalDetails, Experience, Education } from '../types';
import { SectionWrapper } from './SectionWrapper';
import { AIAssistButton } from './AIAssistButton';
import { enhanceTextWithAI } from '../services/geminiService';

interface CVFormProps {
  cvData: CVData;
  onDataChange: <K extends keyof CVData>(section: K, data: CVData[K]) => void;
}

const CVForm: React.FC<CVFormProps> = ({ cvData, onDataChange }) => {
  
  const handlePersonalDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onDataChange('personalDetails', { ...cvData.personalDetails, [name]: value });
  };
  
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onDataChange('personalDetails', { ...cvData.personalDetails, profilePicture: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    onDataChange('personalDetails', { ...cvData.personalDetails, profilePicture: '' });
  };

  const handleSummaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onDataChange('summary', e.target.value);
  };
  
  const handleExperienceChange = (id: string, field: keyof Omit<Experience, 'id'>, value: string) => {
    const newExperience = cvData.experience.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    onDataChange('experience', newExperience);
  };

  const addExperience = () => {
    const newExp: Experience = { id: crypto.randomUUID(), jobTitle: '', company: '', startDate: '', endDate: '', description: '' };
    onDataChange('experience', [...cvData.experience, newExp]);
  };

  const removeExperience = (id: string) => {
    onDataChange('experience', cvData.experience.filter(exp => exp.id !== id));
  };

  const handleEducationChange = (id: string, field: keyof Omit<Education, 'id'>, value: string) => {
    const newEducation = cvData.education.map(edu =>
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    onDataChange('education', newEducation);
  };

  const addEducation = () => {
    const newEdu: Education = { id: crypto.randomUUID(), degree: '', school: '', startDate: '', endDate: '' };
    onDataChange('education', [...cvData.education, newEdu]);
  };

  const removeEducation = (id: string) => {
    onDataChange('education', cvData.education.filter(edu => edu.id !== id));
  };
  
  const handleSkillsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onDataChange('skills', e.target.value);
  };

  const enhanceSummary = async () => {
    const enhanced = await enhanceTextWithAI(
      "You are a professional resume writer. Rewrite the following summary to be more concise, professional, and impactful for a CV. Use strong action verbs.",
      cvData.summary
    );
    if(enhanced) onDataChange('summary', enhanced);
  };
  
  const enhanceExperienceDescription = async (id: string, currentDescription: string) => {
    const enhanced = await enhanceTextWithAI(
      "You are a professional resume writer. Rewrite the following job description bullet points for a CV. Make them more impactful by using the STAR (Situation, Task, Action, Result) method where possible and starting each point with a strong action verb. Ensure the output is a list of bullet points starting with '•'.",
      currentDescription
    );
    if(enhanced) handleExperienceChange(id, 'description', enhanced);
  };
  
  return (
    <div className="space-y-8">
      <SectionWrapper title="Personal Details">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Full Name" name="fullName" value={cvData.personalDetails.fullName} onChange={handlePersonalDetailsChange} />
          <Input label="Job Title" name="jobTitle" value={cvData.personalDetails.jobTitle} onChange={handlePersonalDetailsChange} />
          <Input label="Email" name="email" type="email" value={cvData.personalDetails.email} onChange={handlePersonalDetailsChange} />
          <Input label="Phone" name="phone" type="tel" value={cvData.personalDetails.phone} onChange={handlePersonalDetailsChange} />
          <Input label="Address" name="address" value={cvData.personalDetails.address} onChange={handlePersonalDetailsChange} className="sm:col-span-2" />
          <Input label="LinkedIn Profile URL" name="linkedin" value={cvData.personalDetails.linkedin} onChange={handlePersonalDetailsChange} className="sm:col-span-2" />
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Profile Picture</label>
            <div className="mt-1 flex items-center">
              {cvData.personalDetails.profilePicture ? (
                <img src={cvData.personalDetails.profilePicture} alt="Profile" className="w-16 h-16 rounded-full object-cover" />
              ) : (
                <span className="inline-block h-16 w-16 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700">
                  <svg className="h-full w-full text-gray-300 dark:text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </span>
              )}
              <div className="ml-4 flex items-center gap-2">
                <input type="file" accept="image/*" id="photo-upload" className="hidden" onChange={handlePhotoUpload} />
                <label htmlFor="photo-upload" className="cursor-pointer bg-white dark:bg-gray-700 py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                  Upload
                </label>
                {cvData.personalDetails.profilePicture && (
                  <button onClick={removePhoto} type="button" className="text-sm text-red-600 dark:text-red-400 hover:underline">Remove</button>
                )}
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>
      
      <SectionWrapper title="Professional Summary">
        <div className="relative">
          <textarea
            value={cvData.summary}
            onChange={handleSummaryChange}
            rows={5}
            className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            placeholder="Write a brief summary of your career and skills..."
          />
          <AIAssistButton onClick={enhanceSummary} />
        </div>
      </SectionWrapper>
      
      <SectionWrapper title="Work Experience">
        {cvData.experience.map((exp) => (
          <div key={exp.id} className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800/50 relative mb-4">
            {cvData.experience.length > 1 && (
              <button onClick={() => removeExperience(exp.id)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
              </button>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Job Title" value={exp.jobTitle} onChange={(e) => handleExperienceChange(exp.id, 'jobTitle', e.target.value)} />
              <Input label="Company" value={exp.company} onChange={(e) => handleExperienceChange(exp.id, 'company', e.target.value)} />
              <Input label="Start Date" type="month" value={exp.startDate} onChange={(e) => handleExperienceChange(exp.id, 'startDate', e.target.value)} />
              <Input label="End Date" type="month" value={exp.endDate} onChange={(e) => handleExperienceChange(exp.id, 'endDate', e.target.value)} />
              <div className="sm:col-span-2 relative">
                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                <textarea
                  value={exp.description}
                  onChange={(e) => handleExperienceChange(exp.id, 'description', e.target.value)}
                  rows={6}
                  className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  placeholder="Describe your responsibilities and achievements. Start each point with a '•'."
                />
                <AIAssistButton onClick={() => enhanceExperienceDescription(exp.id, exp.description)} />
              </div>
            </div>
          </div>
        ))}
        <button onClick={addExperience} className="w-full text-indigo-600 dark:text-indigo-400 font-semibold py-2 px-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-700 transition">
          + Add Experience
        </button>
      </SectionWrapper>
      
      <SectionWrapper title="Education">
        {cvData.education.map((edu) => (
          <div key={edu.id} className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800/50 relative mb-4">
            {cvData.education.length > 1 && (
              <button onClick={() => removeEducation(edu.id)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
              </button>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Degree / Course" value={edu.degree} onChange={(e) => handleEducationChange(edu.id, 'degree', e.target.value)} />
              <Input label="School / University" value={edu.school} onChange={(e) => handleEducationChange(edu.id, 'school', e.target.value)} />
              <Input label="Start Date" type="month" value={edu.startDate} onChange={(e) => handleEducationChange(edu.id, 'startDate', e.target.value)} />
              <Input label="End Date" type="month" value={edu.endDate} onChange={(e) => handleEducationChange(edu.id, 'endDate', e.target.value)} />
            </div>
          </div>
        ))}
        <button onClick={addEducation} className="w-full text-indigo-600 dark:text-indigo-400 font-semibold py-2 px-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-700 transition">
          + Add Education
        </button>
      </SectionWrapper>
      
      <SectionWrapper title="Skills">
        <textarea
          value={cvData.skills}
          onChange={handleSkillsChange}
          rows={4}
          className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          placeholder="List your skills, separated by commas..."
        />
      </SectionWrapper>
    </div>
  );
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input: React.FC<InputProps> = ({ label, className, ...props }) => (
  <div className={className}>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
    <input
      {...props}
      className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
    />
  </div>
);

export default CVForm;