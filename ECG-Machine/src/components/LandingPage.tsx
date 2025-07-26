import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface LandingPageProps {
  onUploadClick: () => void;
  onAPIClick: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onUploadClick, onAPIClick }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-white">
      {/* Header */}
      <nav className="bg-white shadow-md fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold text-blue-900">
              Electrocardiogram Machine
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-blue-900" aria-label="Home">Home</a>
              <a href="#" className="text-gray-700 hover:text-blue-900" aria-label="Upload Data">Upload Data</a>
              <a href="#" className="text-gray-700 hover:text-blue-900" aria-label="Connect API">Connect API</a>
              <a href="#" className="text-gray-700 hover:text-blue-900" aria-label="About">About</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Visualize Your Heart's Electrical Activity
          </h1>
          <p className="text-xl text-gray-800 mb-8 max-w-3xl mx-auto font-medium">
            Upload ECG data or connect via API to generate precise electrocardiogram diagrams, 
            providing critical insights into heart health for better diagnostics
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={onUploadClick}
              className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-3 text-lg transform hover:scale-105 transition-transform"
              aria-label="Upload ECG File"
            >
              Upload ECG File
            </Button>
            <Button
              onClick={onAPIClick}
              className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 text-lg transform hover:scale-105 transition-transform"
              aria-label="Connect API"
            >
              Connect API
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Why Electrocardiogram Machine?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl text-blue-900">Precise ECG Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Process heart signals to detect patterns like arrhythmias with high accuracy.
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl text-blue-900">Real-Time Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Connect via API for immediate visualization of ECG data.
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl text-blue-900">Intuitive Visuals</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Interactive ECG charts and clear metrics for easy interpretation.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex justify-center space-x-6 mb-4">
            <a href="#" className="hover:text-gray-300">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300">Terms of Use</a>
            <a href="#" className="hover:text-gray-300">Contact Us</a>
          </div>
          <p className="text-gray-400">
            © 2025 Electrocardiogram Machine. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;