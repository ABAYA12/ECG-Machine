import React from 'react';
import { Button } from '@/components/ui/button';
import ECGChart from './ECGChart';
import MetricsPanel from './MetricsPanel';

interface ResultsPageProps {
  data: {
    chart_data: { time: number[]; voltage: number[] };
    metrics: {
      heart_rate: number;
      qrs_duration: number;
      arrhythmia_count: number;
    };
  };
  onBackToHome: () => void;
}

const ResultsPage: React.FC<ResultsPageProps> = ({ data, onBackToHome }) => {
  const handleZoomIn = () => {
    // This will be handled by the ECGChart component
    console.log('Zoom in clicked');
  };

  const handleResetZoom = () => {
    // This will be handled by the ECGChart component
    console.log('Reset zoom clicked');
  };

  const handleDownload = () => {
    // This will be handled by the individual components
    console.log('Download clicked');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold text-blue-900">
              Electrocardiogram Machine
            </div>
            <Button
              onClick={onBackToHome}
              variant="outline"
              className="text-blue-900 border-blue-900 hover:bg-blue-50"
              aria-label="Back to Home"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Your ECG Analysis Results
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chart Section */}
          <div className="lg:col-span-2">
            <ECGChart
              data={data.chart_data}
              onZoomIn={handleZoomIn}
              onResetZoom={handleResetZoom}
              onDownload={handleDownload}
            />
          </div>
          
          {/* Metrics Panel */}
          <div className="lg:col-span-1">
            <MetricsPanel
              metrics={data.metrics}
              onDownload={handleDownload}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResultsPage;