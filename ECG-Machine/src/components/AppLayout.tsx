import React, { useState } from 'react';
import LandingPage from './LandingPage';
import ResultsPage from './ResultsPage';
import FileUploadModal from './FileUploadModal';
import APIConnectionModal from './APIConnectionModal';

const AppLayout: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'landing' | 'results'>('landing');
  const [ecgData, setEcgData] = useState<any>(null);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [apiModalOpen, setApiModalOpen] = useState(false);

  const handleUploadClick = () => {
    setUploadModalOpen(true);
  };

  const handleAPIClick = () => {
    setApiModalOpen(true);
  };

  const handleDataReceived = (data: any) => {
    setEcgData(data);
    setCurrentPage('results');
  };

  const handleBackToHome = () => {
    setCurrentPage('landing');
    setEcgData(null);
  };

  return (
    <>
      {currentPage === 'landing' ? (
        <LandingPage
          onUploadClick={handleUploadClick}
          onAPIClick={handleAPIClick}
        />
      ) : (
        <ResultsPage
          data={ecgData}
          onBackToHome={handleBackToHome}
        />
      )}
      
      <FileUploadModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        onUpload={handleDataReceived}
      />
      
      <APIConnectionModal
        isOpen={apiModalOpen}
        onClose={() => setApiModalOpen(false)}
        onConnect={handleDataReceived}
      />
    </>
  );
};

export default AppLayout;