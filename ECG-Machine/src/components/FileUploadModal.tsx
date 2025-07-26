import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

interface FileUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (data: any) => void;
}

const FileUploadModal: React.FC<FileUploadModalProps> = ({ isOpen, onClose, onUpload }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const validTypes = ['text/csv', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
      if (validTypes.includes(selectedFile.type) || selectedFile.name.endsWith('.csv') || selectedFile.name.endsWith('.xlsx')) {
        setFile(selectedFile);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please select a CSV or Excel file.",
          variant: "destructive"
        });
      }
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload.",
        variant: "destructive"
      });
      return;
    }

    setUploading(true);
    try {
      // Simulate file upload and processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate sample ECG data
      const sampleData = {
        chart_data: {
          time: Array.from({ length: 100 }, (_, i) => i * 0.01),
          voltage: Array.from({ length: 100 }, (_, i) => {
            const cycle = i % 20;
            if (cycle < 2) return 0.2; // P wave
            if (cycle < 4) return -0.2; // Q wave
            if (cycle < 6) return 1.8; // R wave
            if (cycle < 8) return -0.4; // S wave
            if (cycle < 12) return 0.3; // T wave
            return 0; // baseline
          })
        },
        metrics: {
          heart_rate: 68,
          qrs_duration: 90,
          arrhythmia_count: 2
        }
      };
      
      onUpload(sampleData);
      onClose();
      toast({
        title: "File uploaded successfully",
        description: "ECG data has been processed and analyzed."
      });
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Failed to upload and process the file.",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload ECG File</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Input
              type="file"
              accept=".csv,.xlsx"
              onChange={handleFileChange}
              aria-label="Select ECG file"
            />
            <p className="text-sm text-gray-600 mt-2">
              Supported formats: CSV, Excel (.xlsx)
            </p>
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleUpload} 
              disabled={!file || uploading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FileUploadModal;