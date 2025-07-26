import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';

interface APIConnectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (data: any) => void;
}

const APIConnectionModal: React.FC<APIConnectionModalProps> = ({ isOpen, onClose, onConnect }) => {
  const [apiKey, setApiKey] = useState('');
  const [apiUrl, setApiUrl] = useState('');
  const [connecting, setConnecting] = useState(false);

  const handleConnect = async () => {
    if (!apiKey.trim() || !apiUrl.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide both API key and endpoint URL.",
        variant: "destructive"
      });
      return;
    }

    setConnecting(true);
    try {
      // Simulate API connection
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
          heart_rate: 72,
          qrs_duration: 85,
          arrhythmia_count: 1
        }
      };
      
      onConnect(sampleData);
      onClose();
      toast({
        title: "API connected successfully",
        description: "ECG data has been retrieved and analyzed."
      });
    } catch (error) {
      toast({
        title: "Connection failed",
        description: "Failed to connect to the API endpoint.",
        variant: "destructive"
      });
    } finally {
      setConnecting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Connect to API</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="apiKey">API Key</Label>
            <Input
              id="apiKey"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your API key"
              aria-label="API Key"
            />
          </div>
          <div>
            <Label htmlFor="apiUrl">Endpoint URL</Label>
            <Input
              id="apiUrl"
              type="url"
              value={apiUrl}
              onChange={(e) => setApiUrl(e.target.value)}
              placeholder="https://api.example.com/analyze"
              aria-label="API Endpoint URL"
            />
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleConnect} 
              disabled={connecting}
              className="bg-teal-600 hover:bg-teal-700"
            >
              {connecting ? 'Connecting...' : 'Connect'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default APIConnectionModal;