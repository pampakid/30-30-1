// src/components/HelloWorld.tsx
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';

const HelloWorld = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        // Using the exact URL we see working in the browser
        const response = await fetch('http://127.0.0.1:5000/api/hello', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMessage(data.message);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error 
          ? `Failed to fetch: ${err.message}`
          : 'Failed to fetch message from server';
        setError(errorMessage);
        console.error('Error details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessage();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>30 Apps in 30 Days</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center space-x-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <p>Loading message...</p>
            </div>
          ) : error ? (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : (
            <p className="text-lg font-medium">{message}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default HelloWorld;