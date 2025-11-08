import React, { useState, useCallback } from 'react';
import { CVData, Template, FontFamily } from './types';
import CVForm from './components/CVForm';
import CVPreview from './components/CVPreview';
import { downloadCvAsPdf } from './services/pdfService';

const initialCVData: CVData = {
  personalDetails: {
    fullName: 'Samantha Williams',
    jobTitle: 'Senior Analyst',
    email: 'samantha.williams@example.com',
    phone: '(555) 789-1234',
    address: 'New York, NY, 10001',
    linkedin: 'linkedin.com/in/samanthawilliams',
    profilePicture: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  summary: 'Senior Analyst with 5+ years of experience in data analysis, business intelligence, and process optimization. Skilled in driving operational efficiency, forecasting, and building data-driven strategies to support business decisions and improvements. Strong communicator focused on results.',
  experience: [
    {
      id: crypto.randomUUID(),
      jobTitle: 'Senior Analyst',
      company: 'Loom & Lantern Co.',
      startDate: '2021-07',
      endDate: 'Present',
      description: '• Spearhead data analysis and reporting for key business functions, identifying trends and providing insights to improve profitability.\n• Conduct in-depth market analysis and competitive benchmarking to inform strategic decisions, resulting in a 15% increase in market share within one year.\n• Develop predictive models to forecast sales performance and customer behavior, contributing to more accurate budgeting and resource allocation.',
    },
    {
      id: crypto.randomUUID(),
      jobTitle: 'Business Analyst',
      company: 'Willow & Wren Ltd.',
      startDate: '2017-08',
      endDate: '2021-05',
      description: '• Analyzed and interpreted large datasets to identify business opportunities and recommend process improvements, leading to a 20% reduction in operational costs.\n• Created detailed financial models and dashboards to track key performance indicators (KPIs), enabling data-driven decision-making across departments.',
    },
  ],
  education: [
    {
      id: crypto.randomUUID(),
      degree: 'Bachelor of Science in Economics',
      school: 'New York University',
      startDate: '2013-09',
      endDate: '2017-05',
    },
  ],
  skills: 'Project Management, Data-driven Decision Making, SQL & Excel, Financial Analysis, Business Intelligence tools, Statistical Modeling',
};

const colorPalette = ['#a58a74', '#0d9488', '#4f46e5', '#be185d', '#57534e']; // Taupe, Teal, Indigo, Pink, Stone

const App: React.FC = () => {
  const [cvData, setCvData] = useState<CVData>(initialCVData);
  const [template, setTemplate] = useState<Template>('professional');
  const [font, setFont] = useState<FontFamily>('lato');
  const [accentColor, setAccentColor] = useState<string>(colorPalette[0]);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDataChange = useCallback(<K extends keyof CVData>(section: K, data: CVData[K]) => {
    setCvData(prev => ({
      ...prev,
      [section]: data,
    }));
  }, []);
  
  const handleDownloadPdf = async () => {
    setIsDownloading(true);
    await downloadCvAsPdf('cv-preview', `${cvData.personalDetails.fullName.replace(/\s/g, '_')}_CV`);
    setIsDownloading(false);
  };

  return (
    <div className="min-h-screen font-sans text-gray-800 dark:text-gray-200">
      <header className="bg-white dark:bg-gray-800 shadow-md p-4 no-print">
        <div className="container mx-auto flex justify-between items-center flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <svg xmlns="http://www.w.org/2000/svg" className="h-8 w-8 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 11-2 0V4H6v12a1 1 0 11-2 0V4zm10.293 9.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414L10 14.586l2.293-2.293z" clipRule="evenodd" />
            </svg>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AI CV Builder</h1>
          </div>
          <div className="flex items-center space-x-4 flex-wrap gap-4">
             <div className="flex items-center space-x-2">
                <label htmlFor="font" className="text-sm font-medium text-gray-700 dark:text-gray-300">Font:</label>
                <select
                    id="font"
                    value={font}
                    onChange={(e) => setFont(e.target.value as FontFamily)}
                    className="rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                    <option value="roboto">Roboto</option>
                    <option value="lato">Lato</option>
                    <option value="montserrat">Montserrat</option>
                    <option value="merriweather">Merriweather</option>
                </select>
            </div>
            <div className="flex items-center space-x-2">
                <label htmlFor="template" className="text-sm font-medium text-gray-700 dark:text-gray-300">Template:</label>
                <select
                    id="template"
                    value={template}
                    onChange={(e) => setTemplate(e.target.value as Template)}
                    className="rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                    <option value="professional">Elegant</option>
                    <option value="modern">Creative</option>
                    <option value="classic">Minimalist</option>
                </select>
            </div>
            <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Color:</label>
                <div className="flex space-x-1">
                    {colorPalette.map(color => (
                        <button key={color} title={color} onClick={() => setAccentColor(color)} className={`w-6 h-6 rounded-full focus:outline-none ring-offset-2 dark:ring-offset-gray-800 ${accentColor === color ? 'ring-2 ring-gray-900 dark:ring-white' : ''}`} style={{ backgroundColor: color }} />
                    ))}
                </div>
            </div>
            <button
              onClick={handleDownloadPdf}
              disabled={isDownloading}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg flex items-center space-x-2 transition-colors disabled:bg-indigo-400 disabled:cursor-not-allowed"
            >
              {isDownloading ? (
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM3 5a1 1 0 00-1 1v12a1 1 0 001 1h14a1 1 0 001-1V6a1 1 0 00-1-1h-3.586a1 1 0 01-.707-.293l-1.414-1.414A1 1 0 009.586 3H7a1 1 0 00-1 1v1H3zm13 2H4v10h12V7z" />
                </svg>
              )}
              <span>{isDownloading ? 'Downloading...' : 'Download PDF'}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 lg:p-8 grid grid-cols-1 lg:grid-cols-2 lg:gap-8">
        <div className="no-print">
          <CVForm cvData={cvData} onDataChange={handleDataChange} />
        </div>
        <div className="print-container">
          <CVPreview cvData={cvData} template={template} font={font} accentColor={accentColor} />
        </div>
      </main>
    </div>
  );
};

export default App;