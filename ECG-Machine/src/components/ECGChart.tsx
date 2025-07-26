import React, { useEffect, useRef } from 'react';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

Chart.register(...registerables);

interface ECGChartProps {
  data: { time: number[]; voltage: number[] };
  onZoomIn: () => void;
  onResetZoom: () => void;
  onDownload: () => void;
}

const ECGChart: React.FC<ECGChartProps> = ({ data, onZoomIn, onResetZoom, onDownload }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);
  const zoomLevelRef = useRef<number>(1);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Destroy existing chart
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const config: ChartConfiguration = {
      type: 'line',
      data: {
        labels: data.time,
        datasets: [{
          label: 'ECG Signal',
          data: data.voltage,
          borderColor: '#1B4965',
          backgroundColor: 'rgba(27, 73, 101, 0.1)',
          borderWidth: 2,
          pointRadius: 0,
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Electrocardiogram (ECG) Signal',
            font: { size: 16 }
          },
          legend: { display: false },
          zoom: {
            zoom: {
              wheel: { enabled: true },
              pinch: { enabled: true },
              mode: 'x',
            },
            pan: {
              enabled: true,
              mode: 'x',
            }
          }
        },
        scales: {
          x: {
            title: { display: true, text: 'Time (s)' }
          },
          y: {
            title: { display: true, text: 'Voltage (mV)' },
            min: -1,
            max: 2
          }
        },
        animation: {
          duration: 1000,
          easing: 'easeInOutQuad'
        }
      }
    };

    chartRef.current = new Chart(ctx, config);

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [data]);

  const handleZoomIn = () => {
    if (chartRef.current) {
      zoomLevelRef.current *= 1.5;
      chartRef.current.zoom(1.5);
    }
  };

  const handleResetZoom = () => {
    if (chartRef.current) {
      zoomLevelRef.current = 1;
      chartRef.current.resetZoom();
    }
  };

  const handleDownload = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.download = 'ecg-chart.png';
      link.href = canvasRef.current.toDataURL();
      link.click();
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="h-96 mb-4">
        <canvas ref={canvasRef} aria-label="ECG Chart" />
      </div>
      <div className="flex gap-2 justify-center">
        <button
          onClick={handleZoomIn}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          aria-label="Zoom In"
        >
          Zoom In
        </button>
        <button
          onClick={handleResetZoom}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          aria-label="Reset Zoom"
        >
          Reset Zoom
        </button>
        <button
          onClick={handleDownload}
          className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
          aria-label="Download Results"
        >
          Download Results
        </button>
      </div>
    </div>
  );
};

export default ECGChart;