import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface MetricsPanelProps {
  metrics: {
    heart_rate: number;
    qrs_duration: number;
    arrhythmia_count: number;
  };
  onDownload: () => void;
}

const MetricsPanel: React.FC<MetricsPanelProps> = ({ metrics, onDownload }) => {
  const handleDownload = () => {
    const reportData = {
      timestamp: new Date().toISOString(),
      metrics: {
        heart_rate: `${metrics.heart_rate} BPM`,
        qrs_duration: `${metrics.qrs_duration} ms`,
        arrhythmia_count: metrics.arrhythmia_count,
      },
      summary: "ECG analysis shows stable heart rhythm with minor irregularities. Consult a cardiologist for further evaluation."
    };

    const jsonString = JSON.stringify(reportData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ecg-metrics-report.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-blue-900">Heart Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600 mb-2">
            {metrics.heart_rate} BPM
          </div>
          <p className="text-sm text-gray-600">
            Average heart rate from ECG data.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-blue-900">QRS Duration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600 mb-2">
            {metrics.qrs_duration} ms
          </div>
          <p className="text-sm text-gray-600">
            Duration of QRS complex, indicating ventricular depolarization.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-blue-900">Arrhythmia Count</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600 mb-2">
            {metrics.arrhythmia_count}
          </div>
          <p className="text-sm text-gray-600">
            Number of detected irregular heartbeats.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-blue-900">Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-700">
            Your ECG shows a stable heart rhythm with minor irregularities. 
            Consult a cardiologist for further evaluation.
          </p>
        </CardContent>
      </Card>

      <Button 
        onClick={handleDownload}
        className="w-full bg-teal-600 hover:bg-teal-700"
        aria-label="Download Results"
      >
        Download Results
      </Button>
    </div>
  );
};

export default MetricsPanel;